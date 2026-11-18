/**
 * nfsu2-web backup support. Its runtime/garage.c stores career slots 6-25 beside each profile as GARAGE.DAT:
 * `N2GA`, version 1 (slots 6-10) or version 2 (slots 6-25), FNV-1a 64 of the profile's car part,
 * career/Quick Race/stand-in handles, then native records.
 */
import { checkSave } from './save-file.js';
import {
  EXTENDED_SAVE_SIZE, EXTENDED_SAVE_SIZE_V2, EXTRA_SLOT_RECORD_BASE, EXTRA_SLOT_COUNT_V2,
  PROFILE_SIZE, SLOT_COUNT, SLOT_STRIDE, dataView,
} from './layout.js';
import { gameHash } from './visual.js';
import type { ZipEntry } from './zip.js';

export const GARAGE_FILE = 'GARAGE.DAT';
export const GARAGE_MAGIC = [0x4e, 0x32, 0x47, 0x41];
export const GARAGE_HEADER_SIZE = 32;
export const GARAGE_SIZE = GARAGE_HEADER_SIZE + SLOT_COUNT * SLOT_STRIDE;
export const GARAGE_SIZE_V2 = GARAGE_HEADER_SIZE + EXTRA_SLOT_COUNT_V2 * SLOT_STRIDE;
/** The profile payload starts after the 20CM header and payload metadata. */
export const PROFILE_PAYLOAD_OFF = 36;
/** Length of the payload's car part fingerprinted by nfsu2-web. */
export const PROFILE_CARS_PART_SIZE = 39230;

export type GarageState = 'loaded' | 'missing' | 'stale' | 'invalid';

/** A career profile found in an nfsu2-web backup ZIP. */
export interface BackupProfile {
  name: string;
  folder: string;
  careerEntry: number;
  garageEntry: number;
  garageState: GarageState;
  note: string;
  slotCount?: number;
}

/**
 * FNV-1a 64 of the profile's car part, as nfsu2-web uses to pair GARAGE.DAT with a profile.
 * @param career 54,966-byte career save.
 * @returns Unsigned 64-bit fingerprint.
 */
export function garageFingerprint(career: Uint8Array): bigint {
  if (career.length < PROFILE_PAYLOAD_OFF + PROFILE_CARS_PART_SIZE) throw new RangeError('Career save is too small for a GARAGE.DAT fingerprint.');
  let hash = 0xcbf29ce484222325n;
  for (let i = PROFILE_PAYLOAD_OFF; i < PROFILE_PAYLOAD_OFF + PROFILE_CARS_PART_SIZE; i++) {
    hash ^= BigInt(career[i]);
    hash = (hash * 0x100000001b3n) & 0xffffffffffffffffn;
  }
  return hash;
}

/** Reads the fingerprint stored in GARAGE.DAT. */
export function storedGarageFingerprint(garage: Uint8Array): bigint {
  const v = dataView(garage);
  return BigInt(v.getUint32(8, true)) | (BigInt(v.getUint32(12, true)) << 32n);
}

function setGarageFingerprint(garage: Uint8Array, career: Uint8Array): void {
  const fp = garageFingerprint(career);
  const v = dataView(garage);
  v.setUint32(8, Number(fp & 0xffffffffn), true);
  v.setUint32(12, Number(fp >> 32n), true);
}

/**
 * Checks whether nfsu2-web would load a GARAGE.DAT for this career save.
 * @param garage GARAGE.DAT bytes.
 * @param career Career save bytes.
 * @returns Its state and a message for the page.
 */
export function checkGarage(garage: Uint8Array, career: Uint8Array): { state: Exclude<GarageState, 'missing'>; note: string; slotCount?: number } {
  if (career.length !== PROFILE_SIZE) return { state: 'invalid', note: `Career saves with GARAGE.DAT must be ${PROFILE_SIZE} bytes.` };
  if (garage.length < GARAGE_HEADER_SIZE || GARAGE_MAGIC.some((byte, i) => garage[i] !== byte)) {
    return { state: 'invalid', note: 'GARAGE.DAT does not have a valid N2GA header; extra slots were left unchanged.' };
  }
  const version = dataView(garage).getUint32(4, true);
  if (version !== 1 && version !== 2) {
    return { state: 'invalid', note: `GARAGE.DAT is not an nfsu2-web version 1 or 2 garage; extra slots were left unchanged.` };
  }
  const extraBytes = garage.length - GARAGE_HEADER_SIZE;
  if (extraBytes <= 0 || extraBytes % SLOT_STRIDE !== 0) {
    return { state: 'invalid', note: 'GARAGE.DAT record size is invalid; extra slots were left unchanged.' };
  }
  if (version === 1 && garage.length !== GARAGE_SIZE) {
    return { state: 'invalid', note: 'GARAGE.DAT is not an nfsu2-web version 1 garage; slots 6-10 were left unchanged.' };
  }
  if (version === 2 && garage.length !== GARAGE_SIZE_V2) {
    return { state: 'invalid', note: 'GARAGE.DAT is not an nfsu2-web version 2 garage; slots 6-25 were left unchanged.' };
  }
  if (storedGarageFingerprint(garage) !== garageFingerprint(career)) {
    return { state: 'stale', note: 'GARAGE.DAT belongs to another version of this profile; nfsu2-web would not load extra slots, so they were left unchanged.' };
  }
  const extraSlots = extraBytes / SLOT_STRIDE;
  const totalSlots = SLOT_COUNT + extraSlots;
  return { state: 'loaded', note: `nfsu2-web GARAGE.DAT (v${version}) loaded: slots 6-${totalSlots} are available (${totalSlots} slots total).`, slotCount: totalSlots };
}

/** Joins a career save and its GARAGE.DAT records into the editor's working buffer (10 or 25 slots). */
export function mergeGarage(career: Uint8Array, garage: Uint8Array): Uint8Array {
  const check = checkGarage(garage, career);
  if (check.state !== 'loaded') throw new RangeError(check.note);
  const extraBytes = garage.subarray(GARAGE_HEADER_SIZE);
  const out = new Uint8Array(PROFILE_SIZE + extraBytes.length);
  out.set(career);
  out.set(extraBytes, EXTRA_SLOT_RECORD_BASE);
  return out;
}

/**
 * Rebuilds GARAGE.DAT from the working buffer and final career save.
 * @param original Original GARAGE.DAT; its car-handle header fields are retained.
 * @param working Extended working buffer.
 * @param career Final career bytes, after checksum recalculation.
 * @returns A new GARAGE.DAT with a matching fingerprint.
 */
export function buildGarage(original: Uint8Array, working: Uint8Array, career: Uint8Array): Uint8Array {
  if (working.length <= PROFILE_SIZE) throw new RangeError('The working save has no GARAGE.DAT slots.');
  const extraSize = working.length - EXTRA_SLOT_RECORD_BASE;
  const out = new Uint8Array(GARAGE_HEADER_SIZE + extraSize);
  out.set(original.subarray(0, Math.min(original.length, GARAGE_HEADER_SIZE)));
  for (let i = 0; i < 4; i++) out[i] = GARAGE_MAGIC[i];
  const origVer = original.length >= 8 ? dataView(original).getUint32(4, true) : 1;
  const version = extraSize > 5 * SLOT_STRIDE ? 2 : (origVer || 1);
  dataView(out).setUint32(4, version, true);
  out.set(working.subarray(EXTRA_SLOT_RECORD_BASE, EXTRA_SLOT_RECORD_BASE + extraSize), GARAGE_HEADER_SIZE);
  setGarageFingerprint(out, career);
  return out;
}

/**
 * Creates a brand new default GARAGE.DAT with empty slots (default 25 slots).
 * @param career Career save bytes.
 * @param totalSlots Total slots to support (typically 25).
 * @returns A new GARAGE.DAT ready for use.
 */
export function createDefaultGarage(career: Uint8Array, totalSlots = 25): Uint8Array {
  const extraSlots = totalSlots - SLOT_COUNT;
  if (extraSlots <= 0) throw new RangeError('Total slots must be greater than 5.');
  const size = GARAGE_HEADER_SIZE + extraSlots * SLOT_STRIDE;
  const garage = new Uint8Array(size);
  for (let i = 0; i < 4; i++) garage[i] = GARAGE_MAGIC[i];
  const v = dataView(garage);
  v.setUint32(4, extraSlots > 5 ? 2 : 1, true);
  setGarageFingerprint(garage, career);
  for (let i = 0; i < extraSlots; i++) {
    const slotIndex = SLOT_COUNT + i;
    const recordOff = GARAGE_HEADER_SIZE + i * SLOT_STRIDE;
    v.setUint32(recordOff + 4, gameHash(`CAREER_SLOT_${slotIndex}`), true);
  }
  return garage;
}

/**
 * Finds career profiles in an nfsu2-web save-folder ZIP: `<profile>/<profile>`, normally under `NFS Underground 2/`.
 * @param entries ZIP entries.
 * @returns Valid 20CM profiles and their optional GARAGE.DAT status.
 */
export function findBackupProfiles(entries: ZipEntry[]): BackupProfile[] {
  const profiles: BackupProfile[] = [];
  entries.forEach((entry, careerEntry) => {
    const parts = entry.name.split('/');
    if (parts.length < 2) return;
    const name = parts[parts.length - 1];
    const dir = parts[parts.length - 2];
    if (!name || name !== dir || !checkSave(entry.data).ok) return;
    const folder = parts.slice(0, -1).join('/');
    const garageName = `${folder}/${GARAGE_FILE}`.toLowerCase();
    const garageEntry = entries.findIndex((other) => other.name.toLowerCase() === garageName);
    if (garageEntry < 0) {
      profiles.push({ name, folder, careerEntry, garageEntry, garageState: 'missing', note: 'No GARAGE.DAT: only career slots 1-5 are stored for this profile.', slotCount: SLOT_COUNT });
      return;
    }
    const check = checkGarage(entries[garageEntry].data, entry.data);
    const extraSlots = check.state === 'loaded' ? Math.floor((entries[garageEntry].data.length - GARAGE_HEADER_SIZE) / SLOT_STRIDE) : 0;
    const totalSlots = check.state === 'loaded' ? SLOT_COUNT + extraSlots : SLOT_COUNT;
    profiles.push({ name, folder, careerEntry, garageEntry, garageState: check.state, note: check.note, slotCount: totalSlots });
  });
  return profiles;
}

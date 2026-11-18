"use strict";
(() => {
  // src/data/perf-parts.ts
  var CATEGORIES = [
    { code: "WT", label: "Weight reduction", parts: ["REMOVE_REAR_SEATS", "REMOVE_INTERIOR_PANELS", "LIGHTWEIGHT_WINDOWS", "LIGHTWEIGHT_SEATS", "LIGHTWEIGHT_DOORS", "FOAM_FILLED_INTERIOR"] },
    { code: "TR", label: "Transmission", parts: ["SHORT_THROW_SHIFT_KIT", "LIGHT_FLYWHEEL", "DIFFERENTIAL", "LIMITED_SLIP_DIFFERENTIAL", "HIGH_PERFORMANCE_CLUTCH", "6_SPEED_TRANSMISSION"] },
    { code: "NO", label: "Nitrous", parts: ["DRY_SHOT_OF_NITROUS", "WET_SHOT_OF_NITROUS", "DIRECT_PORT_NITROUS_OXIDE"] },
    { code: "EN", label: "Engine", parts: ["MUFFLER", "COLD_AIR_INTAKE_SYSTEM", "REPLACE_HEADERS", "MILD_CAMSHAFT_AND_CAM_GEARS", "CAT_BACK_EXHAUST_SYSTEM", "HIGH_FLOW_INTAKE_MANIFOLD", "LARGER_DIAMETER_DOWNPIPE", "RACING_CAMSHAFT_AND_GEARS", "PORT_AND_POLISH_HEADS", "BLUEPRINT_THE_BLOCK", "HIGH_FLOW_HEADERS"] },
    { code: "TU", label: "Turbo", parts: ["STAGE_1_TURBO_KIT", "STAGE_2_TURBO_KIT", "STAGE_3_TURBO_KIT"] },
    { code: "SU", label: "Suspension", parts: ["SPORT_SPRINGS_AND_SHOCKS", "STRUT_TOWER_BAR", "PERFORMANCE_SPRINGS_AND_SHOCKS", "FRONT_AND_REAR_SWAY_BARS", "FRONT_AND_REAR_TIE_BARS", "UPGRADE_BUSHINGS", "COIL_OVER_SUSPENSION_SYSTEM", "CAMBER_KIT", "LARGE_DIAMETER_SWAY_BARS"] },
    { code: "BR", label: "Brakes", parts: ["STREET_COMPOUND_BRAKE_PADS", "STEEL_BRAIDED_BRAKE_LINES", "CROSS_DRILLED_ROTORS", "LARGE_DIAMETER_ROTORS", "RACE_COMPOUND_BRAKE_PADS", "CROSS_DRILLED_AND_SLOTTED_ROTORS", "6_PISTON_RACING_CALIPERS"] },
    { code: "EC", label: "Engine control & fuel", parts: ["REMOVE_SPEED_LIMITER", "PERFORMANCE_CHIP", "HIGH_FLOW_FUEL_PUMP", "FUEL_PRESSURE_REGULATOR", "FUEL_RAIL", "FUEL_FILTER", "ENGINE_MANAGEMENT_UNIT", "FUEL_INJECTORS"] },
    { code: "TI", label: "Tires", parts: ["STREET_PERFORMANCE_TIRES", "PRO_PERFORMANCE_TIRES", "EXTREME_PERFORMANCE_TIRES"] },
    { code: "AE", label: "Aero & body", parts: ["FRONT_BUMPER_L1", "FRONT_BUMPER_L2", "FRONT_BUMPER_L3", "SIDESKIRTS_L1", "SIDESKIRTS_L2", "SIDESKIRTS_L3", "REAR_BUMPER_L1", "REAR_BUMPER_L2", "REAR_BUMPER_L3", "SPOILER_L1", "SPOILER_L2", "SPOILER_L3"] }
  ];
  var VERIFIED_INDICES = /* @__PURE__ */ new Set([15, 16]);
  var ITEM_DETAILS = [
    [0, 1, 250],
    [1, 1, 250],
    [2, 2, 1e3],
    [3, 2, 1e3],
    [4, 3, 3e3],
    [5, 3, 1e3],
    [6, 1, 100],
    [7, 1, 400],
    [8, 1, 500, 9, 11],
    [9, 2, 1e3, 8, 11],
    [10, 2, 1500],
    [11, 3, 5e3, 9, 8],
    [12, 1, 750, 13, 14],
    [13, 2, 2e3, 12, 14],
    [14, 3, 4e3, 12, 13],
    [15, 1, 500, 19],
    [16, 1, 250],
    [17, 1, 500, 25],
    [18, 1, 250, 22],
    [19, 2, 1e3, 15],
    [20, 2, 500],
    [21, 2, 500],
    [22, 3, 500, 18],
    [23, 3, 1e3],
    [24, 3, 1500],
    [25, 3, 500, 17],
    [26, 1, 1e3, 27, 28],
    [27, 2, 4e3, 26, 28],
    [28, 3, 8e3, 27, 26],
    [29, 1, 500, 31, 35],
    [30, 1, 250],
    [31, 2, 2e3, 29, 35],
    [32, 2, 1e3, 37],
    [35, 3, 5e3, 29, 31],
    [36, 2, 500],
    [37, 3, 2e3, 32],
    [38, 1, 250, 42],
    [39, 1, 250],
    [40, 1, 500, 41, 43],
    [41, 2, 1500, 40, 43],
    [42, 2, 1e3, 38],
    [43, 3, 3e3, 40, 41],
    [44, 3, 3e3],
    [45, 1, 100],
    [46, 2, 1e3, 51],
    [47, 2, 500],
    [48, 1, 250],
    [49, 1, 250],
    [50, 1, 250],
    [51, 3, 7e3, 46],
    [52, 3, 1e3],
    [53, 1, 500, 54, 55],
    [54, 2, 1500, 53, 55],
    [55, 3, 3e3, 53, 54],
    [56, 1, 0, 57, 58],
    [57, 2, 0, 56, 58],
    [58, 3, 0, 57, 56],
    [59, 1, 0, 60, 61],
    [60, 2, 0, 59, 61],
    [61, 3, 0, 60, 59],
    [62, 1, 0, 63, 64],
    [63, 2, 0, 62, 64],
    [64, 3, 0, 63, 62],
    [65, 1, 0, 66, 67],
    [66, 2, 0, 65, 67],
    [67, 3, 0, 66, 65]
  ];
  var detailsByIndex = new Map(ITEM_DETAILS.map(
    ([index, level, price, ...conflicts]) => [index, { level, price, conflicts }]
  ));
  function humanize(key) {
    return key.split("_").map((word) => /^l\d$/i.test(word) ? word.toUpperCase() : word.charAt(0) + word.slice(1).toLowerCase()).join(" ");
  }
  var PERF_PARTS = [];
  var PERF_CATEGORIES = [];
  for (const category2 of CATEGORIES) {
    const group = { code: category2.code, label: category2.label, indices: [] };
    for (const name of category2.parts) {
      const index = PERF_PARTS.length;
      const details = detailsByIndex.get(index);
      PERF_PARTS.push({
        index,
        key: `${category2.code}_${name}`,
        label: humanize(name),
        category: category2.code,
        verified: VERIFIED_INDICES.has(index),
        active: details !== void 0,
        level: details?.level ?? null,
        price: details?.price ?? null,
        conflicts: details?.conflicts ?? []
      });
      group.indices.push(index);
    }
    PERF_CATEGORIES.push(group);
  }
  var TUNING_PERF_CATEGORIES = PERF_CATEGORIES.filter((category2) => category2.code !== "AE");
  var TUNING_PERF_INDICES = TUNING_PERF_CATEGORIES.flatMap(
    (category2) => category2.indices.filter((index) => PERF_PARTS[index].active)
  );
  var UNIQUE_KEYS = ["WEIGHT_REDUCTION", "TRANSMISSION", "NOS", "ENGINE", "TURBO", "SUSPENSION", "BRAKE", "ECU", "TIRES"];
  var UNIQUE_PERF_PARTS = TUNING_PERF_CATEGORIES.map((category2, index) => ({
    index,
    category: category2.code,
    key: `PERF_CATEGORY_${UNIQUE_KEYS[index]}`,
    label: category2.label
  }));

  // src/model/layout.ts
  var MAGIC = [50, 48, 67, 77];
  var HEADER_SIZE = 28;
  var MONEY_OFF = 41322;
  var MAX_MONEY = 2147483647;
  var NAME_OFF = 53797;
  var NAME_FIELD_SIZE = 32;
  var NAME_MAX_BYTES = 31;
  var SLOT_BASE = 22640;
  var SLOT_STRIDE = 2034;
  var SLOT_COUNT = 5;
  var SLOT_RECORD_REL = -8;
  var SLOT_RECORD_END_REL = SLOT_STRIDE + SLOT_RECORD_REL;
  var PROFILE_SIZE = 54966;
  var EXTRA_SLOT_RECORD_BASE = PROFILE_SIZE;
  var EXTRA_SLOT_COUNT_V2 = 20;
  var MAX_SLOT_COUNT = 25;
  var EXTENDED_SAVE_SIZE = EXTRA_SLOT_RECORD_BASE + SLOT_COUNT * SLOT_STRIDE;
  var EXTENDED_SAVE_SIZE_V2 = EXTRA_SLOT_RECORD_BASE + EXTRA_SLOT_COUNT_V2 * SLOT_STRIDE;
  var CAR_KEY_REL = 700;
  var CAR_TYPE_HASH_REL = 20;
  var SLOT_LOCK_REL = 1064;
  var SLOT_BOUGHT_REL = 1065;
  var CURRENT_STAGE_OFF = 41333;
  var PERF_OFF = 784;
  var VISUAL_OFF = 24;
  var VISUAL_COUNT = 170;
  var UNIQUE_PERF_OFF = 744;
  var PERF_PURCHASE_OFF = 1414;
  function dataView(data) {
    return new DataView(data.buffer, data.byteOffset, data.byteLength);
  }
  function slotBase(slot) {
    if (!Number.isInteger(slot) || slot < 0 || slot >= MAX_SLOT_COUNT) {
      throw new RangeError(`Slot must be 0 to ${MAX_SLOT_COUNT - 1}.`);
    }
    if (slot < SLOT_COUNT) return SLOT_BASE + slot * SLOT_STRIDE;
    return EXTRA_SLOT_RECORD_BASE + (slot - SLOT_COUNT) * SLOT_STRIDE - SLOT_RECORD_REL;
  }
  function slotCount(data) {
    if (data.length <= PROFILE_SIZE) return SLOT_COUNT;
    return SLOT_COUNT + Math.floor((data.length - PROFILE_SIZE) / SLOT_STRIDE);
  }
  function checkedSlotBase(data, slot) {
    const count = slotCount(data);
    if (!Number.isInteger(slot) || slot < 0 || slot >= count) {
      throw new RangeError(`Slot must be 0 to ${count - 1}.`);
    }
    return slotBase(slot);
  }
  function bytesToHex(bytes) {
    return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  }

  // src/model/cars.ts
  var SLOT_BLOCK_OFFSETS = [22640, 22864, 23328];
  var KEY_BLOCK_OFF = 23328;
  function hexToBytes(hex2) {
    return Uint8Array.from(hex2.trim().split(/\s+/), (h) => parseInt(h, 16));
  }
  function parseCarDatabase(raw) {
    return Object.entries(raw).map(([name, blocks], id) => {
      const slotBlocks = blocks.filter((b) => SLOT_BLOCK_OFFSETS.includes(b.off)).map((b) => ({ off: b.off, bytes: hexToBytes(b.hex) }));
      if (slotBlocks.length !== SLOT_BLOCK_OFFSETS.length) {
        throw new Error(`Donor "${name}" is missing slot blocks.`);
      }
      const keyBlock = slotBlocks.find((b) => b.off === KEY_BLOCK_OFF);
      const carBlock = slotBlocks.find((b) => b.off === SLOT_BLOCK_OFFSETS[0]);
      if (carBlock.bytes.length < CAR_TYPE_HASH_REL + 4) {
        throw new Error(`Donor "${name}" is missing its car type hash.`);
      }
      return {
        id,
        name: name.trim(),
        key: bytesToHex(keyBlock.bytes.subarray(keyBlock.bytes.length - 4)),
        hash: dataView(carBlock.bytes).getUint32(CAR_TYPE_HASH_REL, true),
        blocks: slotBlocks
      };
    });
  }
  function buildCarIndex(donors) {
    const index = /* @__PURE__ */ new Map();
    for (const donor of donors) {
      if (donor.hash === 0 || index.has(donor.hash)) continue;
      index.set(donor.hash, donor);
    }
    return index;
  }
  function identifyCar(index, hash) {
    return index.get(hash) ?? null;
  }

  // src/model/checksum.ts
  var POLY = 79764919;
  var TABLE = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i << 24;
    for (let k = 0; k < 8; k++) c = c & 2147483648 ? c << 1 ^ POLY : c << 1;
    TABLE[i] = c >>> 0;
  }
  function nfsu2Crc(data, start = 0, end = data.length) {
    if (end - start < 4) return 0;
    const first = (data[start] << 24 | data[start + 1] << 16 | data[start + 2] << 8 | data[start + 3]) >>> 0;
    let r = ~first >>> 0;
    for (let i = start + 4; i < end; i++) {
      r = ((r << 8 | data[i]) ^ TABLE[r >>> 24]) >>> 0;
    }
    return ~r >>> 0;
  }

  // src/model/save-file.ts
  var HDR_LEN_A = 8;
  var HDR_LEN_B = 12;
  var HDR_CRC_A = 16;
  var HDR_CRC_B = 20;
  var HDR_CRC_H = 24;
  function blockRanges(data) {
    const v = dataView(data);
    const lenA = v.getUint32(HDR_LEN_A, true);
    const lenB = v.getUint32(HDR_LEN_B, true);
    const a = { start: HEADER_SIZE, end: HEADER_SIZE + lenA };
    const b = { start: a.end, end: a.end + lenB };
    return { a, b };
  }
  function checkSave(data) {
    if (data.length < HEADER_SIZE) return { ok: false, error: "File is too small to be a save." };
    if (MAGIC.some((byte, i) => data[i] !== byte)) return { ok: false, error: "Not a 20CM NFSU2 career save." };
    if (dataView(data).getUint16(4, true) !== (data.length & 65535)) {
      return { ok: false, error: "Header size does not match the file length." };
    }
    const { b } = blockRanges(data);
    if (b.end !== data.length) return { ok: false, error: "Block lengths do not match the file length." };
    return { ok: true };
  }
  function verifyChecksums(data) {
    const v = dataView(data);
    const { a, b } = blockRanges(data);
    return {
      blockA: nfsu2Crc(data, a.start, a.end) === v.getUint32(HDR_CRC_A, true),
      blockB: nfsu2Crc(data, b.start, b.end) === v.getUint32(HDR_CRC_B, true),
      header: nfsu2Crc(data, 0, HEADER_SIZE - 4) === v.getUint32(HDR_CRC_H, true)
    };
  }
  function recalculateChecksums(data) {
    const out = data.slice();
    const v = dataView(out);
    const { a, b } = blockRanges(out);
    v.setUint32(HDR_CRC_A, nfsu2Crc(out, a.start, a.end), true);
    v.setUint32(HDR_CRC_B, nfsu2Crc(out, b.start, b.end), true);
    v.setUint32(HDR_CRC_H, nfsu2Crc(out, 0, HEADER_SIZE - 4), true);
    return out;
  }
  function getMoney(data) {
    return dataView(data).getInt32(MONEY_OFF, true);
  }
  function setMoney(data, value) {
    const n = Number(value);
    if (!Number.isInteger(n) || n < 0 || n > MAX_MONEY) {
      throw new RangeError(`Money must be a whole number from 0 to ${MAX_MONEY}.`);
    }
    const out = data.slice();
    dataView(out).setInt32(MONEY_OFF, n, true);
    return out;
  }
  function getName(data) {
    let s2 = "";
    for (let i = 0; i < NAME_FIELD_SIZE; i++) {
      const c = data[NAME_OFF + i];
      if (c === 0) break;
      s2 += String.fromCharCode(c);
    }
    return s2;
  }
  function validateName(name) {
    if (typeof name !== "string" || name.length === 0) return "Name cannot be empty.";
    for (const ch of name) {
      if (ch.charCodeAt(0) > 255) return "Name may only use Latin-1 characters.";
    }
    if (name.length > NAME_MAX_BYTES) return `Name must be at most ${NAME_MAX_BYTES} characters.`;
    return null;
  }
  function setName(data, name) {
    const error = validateName(name);
    if (error) throw new RangeError(error);
    const out = data.slice();
    for (let i = 0; i < NAME_FIELD_SIZE; i++) {
      out[NAME_OFF + i] = i < name.length ? name.charCodeAt(i) : 0;
    }
    return out;
  }

  // src/model/perf.ts
  var PERF_COUNT = PERF_PARTS.length;
  var UNIQUE_PERF_COUNT = UNIQUE_PERF_PARTS.length;
  function validatePartIndex(index) {
    if (!Number.isInteger(index) || index < 0 || index >= PERF_COUNT) {
      throw new RangeError(`Part index must be 0 to ${PERF_COUNT - 1}.`);
    }
  }
  function perfOffset(slot, index) {
    validatePartIndex(index);
    return slotBase(slot) + PERF_OFF + index;
  }
  function perfPurchaseOffset(slot, index) {
    validatePartIndex(index);
    return slotBase(slot) + PERF_PURCHASE_OFF + (index >> 3);
  }
  function getPerfPurchased(data, slot, index) {
    return (dataView(data).getUint8(perfPurchaseOffset(slot, index)) & 1 << (index & 7)) !== 0;
  }
  function uniquePerfOffset(slot, index) {
    if (!Number.isInteger(index) || index < 0 || index >= UNIQUE_PERF_COUNT) {
      throw new RangeError(`Unique index must be 0 to ${UNIQUE_PERF_COUNT - 1}.`);
    }
    return slotBase(slot) + UNIQUE_PERF_OFF + index * 4;
  }
  function getUniquePerfValue(data, slot, index) {
    return dataView(data).getUint32(uniquePerfOffset(slot, index), true);
  }
  function setUniquePerfFlag(data, slot, index, on) {
    const out = data.slice();
    dataView(out).setUint32(uniquePerfOffset(slot, index), on ? 1 : 0, true);
    return out;
  }
  function getPerfFlag(data, slot, index) {
    return data[perfOffset(slot, index)] !== 0;
  }
  function setPerfFlag(data, slot, index, on) {
    const out = data.slice();
    out[perfOffset(slot, index)] = on ? 1 : 0;
    return out;
  }
  function setPerfFlags(data, slot, indices, on) {
    const out = data.slice();
    for (const index of indices) {
      out[perfOffset(slot, index)] = on ? 1 : 0;
    }
    return out;
  }

  // src/data/traffic-cars.ts
  var TRAFFIC_CARS = [
    { hash: 1906549, name: "Taxi", internal: "TAXI" },
    { hash: 2416136565, name: "Sedan 2", internal: "4DR_SEDAN02" },
    { hash: 1135185575, name: "Ambulance", internal: "AMBULANCE" },
    { hash: 2076233495, name: "Taxi 2", internal: "TAXI02" },
    { hash: 2795348340, name: "Panel van", internal: "PANELVAN" },
    { hash: 43255611, name: "Coupe", internal: "COUPE" },
    { hash: 2214323822, name: "Fire truck", internal: "FIRETRUCK" },
    { hash: 2836177499, name: "Parcel van", internal: "PARCELVAN" },
    { hash: 1928428043, name: "Pickup", internal: "PICKUP" },
    { hash: 4068436563, name: "Sedan", internal: "4DR_SEDAN" },
    { hash: 38825, name: "Bus", internal: "BUS" },
    { hash: 57341, name: "SUV", internal: "SUV" },
    { hash: 3942120593, name: "Minivan", internal: "MINIVAN" },
    { hash: 2672691320, name: "Hatchback", internal: "HATCHBACK" },
    { hash: 2867989722, name: "Hatchback 2", internal: "HATCHBACK02" }
  ];

  // src/model/slots.ts
  function isSlotUsed(data, slot) {
    return isCarBought(data, slot);
  }
  function getCarKey(data, slot) {
    const start = slotBase(slot) + CAR_KEY_REL;
    return bytesToHex(data.subarray(start, start + 4));
  }
  function getCarTypeHash(data, slot) {
    return dataView(data).getUint32(slotBase(slot) + CAR_TYPE_HASH_REL, true);
  }
  function setSlotTrafficCar(data, slot, hash) {
    const base = checkedSlotBase(data, slot);
    if (!TRAFFIC_CARS.some((car) => car.hash === hash)) throw new RangeError("Unknown traffic vehicle.");
    if (slotState(data, slot) !== "filled" || !isSlotUsed(data, slot)) {
      throw new RangeError("Traffic experiments require an unlocked, filled car slot.");
    }
    const out = data.slice();
    dataView(out).setUint32(base + CAR_TYPE_HASH_REL, hash, true);
    return out;
  }
  function isSlotLocked(data, slot) {
    return data[slotBase(slot) + SLOT_LOCK_REL] !== 0;
  }
  function isCarBought(data, slot) {
    return data[slotBase(slot) + SLOT_BOUGHT_REL] !== 0;
  }
  function slotState(data, slot) {
    if (isSlotLocked(data, slot)) return "locked";
    return isCarBought(data, slot) ? "filled" : "open";
  }
  function setSlotCar(data, slot, donor) {
    const base = checkedSlotBase(data, slot);
    for (const block of donor.blocks) {
      const rel = block.off - SLOT_BASE;
      if (rel < 0 || rel + block.bytes.length > SLOT_RECORD_END_REL) {
        throw new RangeError("Donor block does not fit inside a car slot.");
      }
    }
    const out = data.slice();
    out.fill(0, base + VISUAL_OFF, base + VISUAL_OFF + VISUAL_COUNT * 4);
    for (const block of donor.blocks) {
      out.set(block.bytes, base + block.off - SLOT_BASE);
    }
    for (const [first, end] of [[64, 68], [77, 93], [97, 153], [154, 159]]) {
      out.fill(0, base + VISUAL_OFF + first * 4, base + VISUAL_OFF + end * 4);
    }
    out.fill(0, base + PERF_OFF, base + PERF_OFF + PERF_COUNT);
    out[base + SLOT_LOCK_REL] = 0;
    out[base + SLOT_BOUGHT_REL] = 1;
    return out;
  }
  function setSlotLocked(data, slot, locked) {
    const out = data.slice();
    out[checkedSlotBase(data, slot) + SLOT_LOCK_REL] = locked ? 1 : 0;
    return out;
  }
  function swapSlots(data, slotA, slotB) {
    const a = checkedSlotBase(data, slotA);
    const b = checkedSlotBase(data, slotB);
    if (slotA === slotB) return data.slice();
    const out = data.slice();
    const blockA = data.slice(a, a + SLOT_RECORD_END_REL);
    out.set(data.subarray(b, b + SLOT_RECORD_END_REL), a);
    out.set(blockA, b);
    return out;
  }

  // src/model/visual.ts
  var NAMES = [
    "BASE",
    "FRONT_BUMPER",
    "REAR_BUMPER",
    "LEFT_SIDE_MIRROR",
    "RIGHT_SIDE_MIRROR",
    "BODY",
    "WIDE_BODY",
    "ROOF",
    "TOP",
    "HOOD",
    "TRUNK",
    "SKIRT",
    "SPOILER",
    "ENGINE",
    "HEADLIGHT",
    "BRAKELIGHT",
    "EXHAUST",
    "DOOR_LEFT",
    "DOOR_RIGHT",
    "DOOR_PANEL_LEFT",
    "DOOR_PANEL_RIGHT",
    "DOOR_SILL_LEFT",
    "DOOR_SILL_RIGHT",
    "FENDER",
    "QUARTER",
    "HOOD_UNDER",
    "TRUNK_UNDER",
    "FRONT_BRAKE",
    "REAR_BRAKE",
    "FRONT_WHEEL",
    "REAR_WHEEL",
    "SPINNER",
    "WING_MIRROR",
    "LICENSE_PLATE",
    "TRUNK_AUDIO",
    ...Array.from({ length: 12 }, (_, i) => `TRUNK_AUDIO_COMP_${i}`),
    "DAMAGE_FRONT",
    "DAMAGE_REAR",
    "DAMAGE_LEFT",
    "DAMAGE_RIGHT",
    "DAMAGE_TOP",
    "DECAL_HOOD",
    "DECAL_FRONT_WINDOW",
    "DECAL_REAR_WINDOW",
    "DECAL_LEFT_DOOR",
    "DECAL_RIGHT_DOOR",
    "DECAL_LEFT_QUARTER",
    "DECAL_RIGHT_QUARTER",
    "WIDEBODY_DECAL_LEFT_DOOR",
    "WIDEBODY_DECAL_RIGHT_DOOR",
    "WIDEBODY_DECAL_LEFT_QUARTER",
    "WIDEBODY_DECAL_RIGHT_QUARTER",
    "BASE_PAINT",
    ...Array.from({ length: 4 }, (_, i) => `VINYL_LAYER${i}`),
    "PAINT_ENGINE",
    "PAINT_SPOILER",
    "PAINT_BRAKE",
    "PAINT_EXHAUST",
    "PAINT_AUDIO",
    "PAINT_RIM",
    "PAINT_SPINNER",
    "PAINT_ROOF",
    "PAINT_MIRROR",
    ...Array.from({ length: 16 }, (_, i) => `VINYL_COLOUR${Math.floor(i / 4)}_${i % 4}`),
    "KIT_CARBON",
    "HOOD_CARBON",
    "DOOR_CARBON",
    "TRUNK_CARBON",
    ...["HOOD", "FRONT_WINDOW", "REAR_WINDOW", "LEFT_DOOR", "RIGHT_DOOR", "LEFT_QUARTER", "RIGHT_QUARTER"].flatMap((where) => Array.from({ length: 8 }, (_, i) => `DECAL_${where}_TEX${i}`)),
    "WINDOW_TINT",
    "NEON",
    "NEON_ENGINE",
    "NEON_CABIN",
    "NEON_TRUNK",
    "CABIN_NEON_FRAME",
    "HEADLIGHT_BULB",
    "DOOR_STYLE",
    "HYDRAULICS",
    "NOS_PURGE",
    "CUSTOM_HUD",
    "HUD_BACKING_COLOUR",
    "HUD_NEEDLE_COLOUR",
    "HUD_CHARACTER_COLOUR",
    "CV",
    "WHEEL_MANUFACTURER",
    "MISC"
  ];
  var TYPES = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    27,
    28,
    28,
    29,
    30,
    31,
    60,
    61,
    61,
    62,
    62,
    63,
    63,
    61,
    61,
    61,
    61,
    62,
    62,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    50,
    50,
    50,
    50,
    48,
    48,
    48,
    48,
    48,
    48,
    48,
    48,
    48,
    ...Array(16).fill(49),
    51,
    51,
    51,
    51,
    ...Array(56).fill(52),
    53,
    54,
    54,
    54,
    54,
    55,
    56,
    57,
    58,
    59,
    64,
    65,
    65,
    65,
    66,
    67,
    68
  ];
  var UG1 = /* @__PURE__ */ new Set([
    54877547,
    1454215,
    56188,
    56320,
    706257,
    22084480,
    43040845,
    46793951,
    1924326675,
    62440586,
    83690786,
    1415244896,
    1963121284,
    2041495532,
    3192403806
  ]);
  var UG2 = /* @__PURE__ */ new Set([
    50476782,
    44233,
    1107,
    1767,
    43118,
    56321,
    43252439,
    1259341578,
    164818934,
    763140957,
    890656793,
    3477362936,
    4152103915
  ]);
  var SUV = /* @__PURE__ */ new Set([35244362, 1629936973, 3480242033]);
  function isVisualColorSlot(slot) {
    return slot === 63 || slot >= 68 && slot <= 92 || slot >= 164 && slot <= 166;
  }
  function paintCategories(slot) {
    if ([63, 69, 75, 76].includes(slot)) return [47885063, 54753874, 58291507];
    if (slot === 68) return [1490382];
    if (slot === 70) return [3596881407];
    if (slot === 71) return [107172080];
    if (slot === 73 || slot === 74) return [55847];
    if (slot >= 77 && slot <= 92) return [65565169];
    return null;
  }
  function colorPalettes(parts) {
    const palettes = /* @__PURE__ */ new Map();
    for (const part of parts) {
      const match = /^(.*?)(\d+)(\D*)$/.exec(part.name);
      const name = match ? `${match[1]}##${match[3]}`.replace(/^HOSES_L3_(?:TEST|COLOR)##$/, "HOSES_L3") : "Colours";
      const order = match ? Number(match[2]) : palettes.get(name)?.length ?? 0;
      const rgb = /^#[0-9a-f]{6}$/i.test(part.color) ? [1, 3, 5].map((i) => parseInt(part.color.slice(i, i + 2), 16)) : null;
      const swatch = {
        hash: part.hash,
        name: part.name,
        number: match ? match[2].padStart(2, "0") : part.name,
        color: part.color,
        ink: rgb && rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 150 ? "#111111" : "#ffffff"
      };
      const entries = palettes.get(name) ?? [];
      entries.push({ swatch, order });
      palettes.set(name, entries);
    }
    return [...palettes].map(([name, entries]) => ({
      name,
      swatches: entries.sort((a, b) => a.order - b.order).map((entry) => entry.swatch)
    }));
  }
  function gameHash(name) {
    let hash = 4294967295;
    for (const c of name.toUpperCase()) hash = Math.imul(hash, 33) + c.charCodeAt(0) >>> 0;
    return hash;
  }
  function category(id) {
    if ([1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 29, 31, 32].includes(id)) return ["BODY", "Body parts"];
    if (id >= 93 && id <= 96) return ["BODY", "Carbon fibre"];
    if (id >= 63 && id <= 76 && (id < 64 || id > 67)) return ["GRAPHICS", "Paint"];
    if (id >= 64 && id <= 67) return ["GRAPHICS", "Vinyl layers"];
    if (id >= 77 && id <= 92) return ["GRAPHICS", "Vinyl colours"];
    if (id >= 105 && id <= 152) return ["GRAPHICS", "Decals"];
    if (id === 153) return ["GRAPHICS", "Window tint"];
    if (id >= 34 && id <= 46) return ["SPECIALTIES", "Trunk audio"];
    if (id >= 154 && id <= 157 || id === 159) return ["SPECIALTIES", "Lighting"];
    if (id >= 160 && id <= 162) return ["SPECIALTIES", "Specialties"];
    if (id >= 163 && id <= 166) return ["SPECIALTIES", "Dials"];
    return null;
  }
  var VISUAL_SLOTS = NAMES.flatMap((name, id) => {
    const cat = category(id);
    return cat ? [{ id, name, label: name.toLowerCase().replaceAll("_", " "), tab: cat[0], category: cat[1] }] : [];
  });
  var VisualCatalog = class {
    constructor(parts, defaults, overrides, carNames) {
      this.parts = parts;
      this.defaults = defaults;
      this.overrides = overrides;
      this.carNames = carNames;
    }
    parts;
    defaults;
    overrides;
    carNames;
    optionCache = /* @__PURE__ */ new Map();
    options(car, slot) {
      if (!Number.isInteger(slot) || slot < 0 || slot >= VISUAL_COUNT) throw new RangeError("Invalid visual slot.");
      if (!this.carNames.has(car)) return [];
      const key = `${car}:${slot}`, cached = this.optionCache.get(key);
      if (cached) return cached;
      const groups = this.overrides.get(`${car}:${slot}`) ?? this.defaults.slice(slot * 2, slot * 2 + 2).map((g2) => g2 === 4294967295 ? car : g2);
      const parts = groups.flatMap((group) => this.parts.filter((p) => p.group === group && p.type === TYPES[slot] && !(UG1.has(p.group) && this.attribute(p, "EXCLUDE_UG1")) && !(UG2.has(p.group) && this.attribute(p, "EXCLUDE_UG2")) && !(SUV.has(p.group) && this.attribute(p, "EXCLUDE_SUV"))));
      this.optionCache.set(key, parts);
      return parts;
    }
    attribute(part, name) {
      return part?.attributes.get(gameHash(name))?.[0] ?? 0;
    }
    selectableOptions(car, slot) {
      const categories = paintCategories(slot);
      return this.options(car, slot).filter((part) => !categories || categories.includes(part.attributes.get(3954196070)?.[0] ?? 0));
    }
    part(car, slot, hash) {
      return this.options(car, slot).find((p) => p.hash === hash);
    }
    hidden(refs, car, slot) {
      if (slot === 69) return false;
      if ((this.part(car, 6, refs[6])?.level ?? 0) > 0 && [1, 2, 5, 11, 23, 24].includes(slot)) return true;
      const key = gameHash(NAMES[slot]);
      return refs.some((hash, i) => hash !== 0 && this.part(car, i, hash)?.attributes.get(3892984674)?.includes(key));
    }
    edit(save, slot, visual, hash) {
      if (!VISUAL_SLOTS.some((s2) => s2.id === visual)) throw new RangeError("This visual slot is derived or not editable.");
      const car = getCarTypeHash(save, slot);
      const refs = readVisual(save, slot);
      const part = this.part(car, visual, hash);
      if (hash !== 0 && !part) throw new RangeError("This part is not compatible with this car and slot.");
      if (hash !== 0 && !this.selectableOptions(car, visual).some((p) => p.hash === hash)) {
        throw new RangeError("This colour belongs to a different paint category.");
      }
      if (this.hidden(refs, car, visual)) throw new RangeError("This slot is hidden by the installed parts.");
      refs[visual] = hash;
      if (visual === 29) refs[30] = hash;
      if (visual === 34) {
        for (let i = 35; i <= 46; i++) refs[i] = this.options(car, i).find((p) => p.level === 0)?.hash ?? 0;
      }
      if (visual === 9) {
        refs[25] = this.part(car, 25, this.attribute(part, "HOODUNDER"))?.hash ?? this.options(car, 25)[0]?.hash ?? 0;
        if (this.attribute(part, "CARBONFIBRE")) this.clearVinyls(refs, car, (p) => p.variant === 20);
      }
      if (visual === 6) {
        const wide = part && part.level !== 0;
        const prefix = `${this.carNames.get(car)}_`;
        const names = ["LEFT", "RIGHT", "PANEL_LEFT", "PANEL_RIGHT", "SILL_LEFT", "SILL_RIGHT"];
        names.forEach((name, i) => {
          const wanted = wide ? gameHash(`${prefix}KITW0${part.variant}_DOOR_${name}`) : 0;
          refs[17 + i] = this.options(car, 17 + i).find((p) => !wanted || p.hash === wanted)?.hash ?? 0;
        });
        if (wide) {
          ["LEFT_DOOR", "RIGHT_DOOR", "LEFT_QUARTER", "RIGHT_QUARTER"].forEach((name, i) => {
            refs[59 + i] = this.part(car, 59 + i, gameHash(`${prefix}WIDE${part.variant}_DECAL_${name}_RECT_MEDIUM`))?.hash ?? 0;
          });
        }
      }
      if ((visual === 6 || visual === 93) && (this.part(car, 93, refs[93])?.level ?? 0) > 0) {
        if ((this.part(car, 6, refs[6])?.level ?? 0) > 0 || visual === 6) this.clearVinyls(refs, car, (p) => p.variant !== 20);
        else this.clearVinyls(refs, car, (p) => [14, 15, 21, 22, 23, 24, 25, 26].includes(p.variant));
      }
      const out = save.slice(), base = checkedSlotBase(out, slot) + VISUAL_OFF;
      refs.forEach((value, i) => dataView(out).setUint32(base + i * 4, value, true));
      if ([1, 2, 6, 11, 12].includes(visual)) {
        const start = checkedSlotBase(out, slot) + PERF_OFF;
        out.fill(0, start + 56, start + 68);
        const wide = (this.part(car, 6, refs[6])?.level ?? 0) > 0;
        for (const [partSlot, first] of [[1, 56], [2, 62], [11, 59], [12, 65]]) {
          const level = wide ? 3 : Math.min(this.part(car, partSlot, refs[partSlot])?.level ?? 0, 3);
          if (level) out[start + first + level - 1] = 1;
        }
      }
      return out;
    }
    clearVinyls(refs, car, predicate) {
      for (let i = 64; i <= 67; i++) {
        const part = this.part(car, i, refs[i]);
        if (part && predicate(part)) refs[i] = 0;
      }
    }
  };
  function readVisual(save, slot) {
    const base = checkedSlotBase(save, slot) + VISUAL_OFF, dv = dataView(save);
    return Array.from({ length: VISUAL_COUNT }, (_, i) => dv.getUint32(base + i * 4, true));
  }
  function parseVisualData(bytes, cars) {
    const dv = dataView(bytes), chunks = /* @__PURE__ */ new Map();
    function walk(start, end) {
      for (let off = start; off < end; ) {
        if (off + 8 > end) throw new Error("Truncated game-data chunk.");
        const id = dv.getUint32(off, true), size = dv.getUint32(off + 4, true), next = off + 8 + size;
        if (next > end) throw new Error("Game-data chunk exceeds its container.");
        if (id & 2147483648) walk(off + 8, next);
        else if (id >= 214531 && id <= 214540) {
          if (chunks.has(id)) throw new Error(`Multiple visual databases are not supported (chunk ${id.toString(16)}).`);
          chunks.set(id, bytes.subarray(off + 8, next));
        }
        off = next;
      }
    }
    walk(0, bytes.length);
    function chunk(id, stride) {
      const result = chunks.get(id);
      if (!result || !result.length || result.length % stride) throw new Error(`Missing or invalid visual chunk ${id.toString(16)}.`);
      return result;
    }
    const header = chunk(214531, 4), rawDescriptors = chunk(214532, 1);
    if (header.length !== 60) throw new Error("Invalid visual database header.");
    const descriptorSize = dataView(header).getUint32(56, true) * 14;
    if (descriptorSize === 0 || descriptorSize > rawDescriptors.length || rawDescriptors.length - descriptorSize > 3) {
      throw new Error("Invalid visual descriptor count.");
    }
    const descriptors = rawDescriptors.subarray(0, descriptorSize), strings = chunk(214534, 1), lists = chunk(214540, 2);
    const attributes = chunk(214533, 8), groups = chunk(214539, 4), tables = chunk(214535, 1);
    if (tables.length < VISUAL_COUNT * 8 || (tables.length - VISUAL_COUNT * 8) % 16) throw new Error("Invalid visual compatibility table.");
    const td = dataView(tables), dd = dataView(descriptors), ld = dataView(lists), ad = dataView(attributes), gd = dataView(groups);
    const defaults = Array.from({ length: VISUAL_COUNT * 2 }, (_, i) => td.getUint32(i * 4, true));
    const overrides = /* @__PURE__ */ new Map();
    for (let off = VISUAL_COUNT * 8; off < tables.length; off += 16) {
      const car = td.getUint32(off, true), slot = td.getUint32(off + 4, true);
      if (slot >= VISUAL_COUNT) throw new Error("Invalid visual override slot.");
      overrides.set(`${car}:${slot}`, [td.getUint32(off + 8, true), td.getUint32(off + 12, true)]);
    }
    const parts = [];
    for (let off = 0; off < descriptors.length; off += 14) {
      const nameOff = dd.getUint16(off + 8, true) * 4, nameEnd = strings.indexOf(0, nameOff);
      const groupOff = descriptors[off + 7] * 4, list = dd.getUint16(off + 10, true);
      if (nameOff >= strings.length || nameEnd < nameOff || groupOff + 4 > groups.length || descriptors[off + 4] > 68) {
        throw new Error("Invalid visual descriptor.");
      }
      const attrs = /* @__PURE__ */ new Map();
      if (list !== 65535) {
        const start = list * 2;
        if (start + 2 > lists.length) throw new Error("Invalid visual attribute list.");
        const count = ld.getUint16(start, true);
        if (start + 2 + count * 2 > lists.length) throw new Error("Truncated visual attribute list.");
        for (let i = 0; i < count; i++) {
          const pos = ld.getUint16(start + 2 + i * 2, true) * 8;
          if (pos + 8 > attributes.length) throw new Error("Invalid visual attribute index.");
          const key = ad.getUint32(pos, true), values = attrs.get(key) ?? [];
          values.push(ad.getUint32(pos + 4, true));
          attrs.set(key, values);
        }
      }
      const rgb = ["RED", "GREEN", "BLUE"].map((name) => attrs.get(gameHash(name))?.[0]);
      parts.push({
        hash: dd.getUint32(off, true),
        name: new TextDecoder("windows-1252").decode(strings.subarray(nameOff, nameEnd)),
        type: descriptors[off + 4],
        level: descriptors[off + 5] >> 5,
        variant: descriptors[off + 5] & 31,
        group: gd.getUint32(groupOff, true),
        attributes: attrs,
        color: rgb.every((n) => n !== void 0 && n <= 255) ? `#${rgb.map((n) => n.toString(16).padStart(2, "0")).join("")}` : ""
      });
    }
    return new VisualCatalog(parts, defaults, overrides, new Map(cars.map((c) => [c.hash, c.name])));
  }

  // src/model/nfsu2-web.ts
  var GARAGE_FILE = "GARAGE.DAT";
  var GARAGE_MAGIC = [78, 50, 71, 65];
  var GARAGE_HEADER_SIZE = 32;
  var GARAGE_SIZE = GARAGE_HEADER_SIZE + SLOT_COUNT * SLOT_STRIDE;
  var GARAGE_SIZE_V2 = GARAGE_HEADER_SIZE + EXTRA_SLOT_COUNT_V2 * SLOT_STRIDE;
  var PROFILE_PAYLOAD_OFF = 36;
  var PROFILE_CARS_PART_SIZE = 39230;
  function garageFingerprint(career) {
    if (career.length < PROFILE_PAYLOAD_OFF + PROFILE_CARS_PART_SIZE) throw new RangeError("Career save is too small for a GARAGE.DAT fingerprint.");
    let hash = 0xcbf29ce484222325n;
    for (let i = PROFILE_PAYLOAD_OFF; i < PROFILE_PAYLOAD_OFF + PROFILE_CARS_PART_SIZE; i++) {
      hash ^= BigInt(career[i]);
      hash = hash * 0x100000001b3n & 0xffffffffffffffffn;
    }
    return hash;
  }
  function storedGarageFingerprint(garage) {
    const v = dataView(garage);
    return BigInt(v.getUint32(8, true)) | BigInt(v.getUint32(12, true)) << 32n;
  }
  function setGarageFingerprint(garage, career) {
    const fp = garageFingerprint(career);
    const v = dataView(garage);
    v.setUint32(8, Number(fp & 0xffffffffn), true);
    v.setUint32(12, Number(fp >> 32n), true);
  }
  function checkGarage(garage, career) {
    if (career.length !== PROFILE_SIZE) return { state: "invalid", note: `Career saves with GARAGE.DAT must be ${PROFILE_SIZE} bytes.` };
    if (garage.length < GARAGE_HEADER_SIZE || GARAGE_MAGIC.some((byte, i) => garage[i] !== byte)) {
      return { state: "invalid", note: "GARAGE.DAT does not have a valid N2GA header; extra slots were left unchanged." };
    }
    const version = dataView(garage).getUint32(4, true);
    if (version !== 1 && version !== 2) {
      return { state: "invalid", note: `GARAGE.DAT is not an nfsu2-web version 1 or 2 garage; extra slots were left unchanged.` };
    }
    const extraBytes = garage.length - GARAGE_HEADER_SIZE;
    if (extraBytes <= 0 || extraBytes % SLOT_STRIDE !== 0) {
      return { state: "invalid", note: "GARAGE.DAT record size is invalid; extra slots were left unchanged." };
    }
    if (version === 1 && garage.length !== GARAGE_SIZE) {
      return { state: "invalid", note: "GARAGE.DAT is not an nfsu2-web version 1 garage; slots 6-10 were left unchanged." };
    }
    if (version === 2 && garage.length !== GARAGE_SIZE_V2) {
      return { state: "invalid", note: "GARAGE.DAT is not an nfsu2-web version 2 garage; slots 6-25 were left unchanged." };
    }
    if (storedGarageFingerprint(garage) !== garageFingerprint(career)) {
      return { state: "stale", note: "GARAGE.DAT belongs to another version of this profile; nfsu2-web would not load extra slots, so they were left unchanged." };
    }
    const extraSlots = extraBytes / SLOT_STRIDE;
    const totalSlots = SLOT_COUNT + extraSlots;
    return { state: "loaded", note: `nfsu2-web GARAGE.DAT (v${version}) loaded: slots 6-${totalSlots} are available (${totalSlots} slots total).`, slotCount: totalSlots };
  }
  function mergeGarage(career, garage) {
    const check = checkGarage(garage, career);
    if (check.state !== "loaded") throw new RangeError(check.note);
    const extraBytes = garage.subarray(GARAGE_HEADER_SIZE);
    const out = new Uint8Array(PROFILE_SIZE + extraBytes.length);
    out.set(career);
    out.set(extraBytes, EXTRA_SLOT_RECORD_BASE);
    return out;
  }
  function buildGarage(original, working, career) {
    if (working.length <= PROFILE_SIZE) throw new RangeError("The working save has no GARAGE.DAT slots.");
    const extraSize = working.length - EXTRA_SLOT_RECORD_BASE;
    const out = new Uint8Array(GARAGE_HEADER_SIZE + extraSize);
    out.set(original.subarray(0, Math.min(original.length, GARAGE_HEADER_SIZE)));
    for (let i = 0; i < 4; i++) out[i] = GARAGE_MAGIC[i];
    const origVer = original.length >= 8 ? dataView(original).getUint32(4, true) : 1;
    const version = extraSize > 5 * SLOT_STRIDE ? 2 : origVer || 1;
    dataView(out).setUint32(4, version, true);
    out.set(working.subarray(EXTRA_SLOT_RECORD_BASE, EXTRA_SLOT_RECORD_BASE + extraSize), GARAGE_HEADER_SIZE);
    setGarageFingerprint(out, career);
    return out;
  }
  function createDefaultGarage(career, totalSlots = 25) {
    const extraSlots = totalSlots - SLOT_COUNT;
    if (extraSlots <= 0) throw new RangeError("Total slots must be greater than 5.");
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
  function findBackupProfiles(entries) {
    const profiles = [];
    entries.forEach((entry, careerEntry) => {
      const parts = entry.name.split("/");
      if (parts.length < 2) return;
      const name = parts[parts.length - 1];
      const dir = parts[parts.length - 2];
      if (!name || name !== dir || !checkSave(entry.data).ok) return;
      const folder = parts.slice(0, -1).join("/");
      const garageName = `${folder}/${GARAGE_FILE}`.toLowerCase();
      const garageEntry = entries.findIndex((other) => other.name.toLowerCase() === garageName);
      if (garageEntry < 0) {
        profiles.push({ name, folder, careerEntry, garageEntry, garageState: "missing", note: "No GARAGE.DAT: only career slots 1-5 are stored for this profile.", slotCount: SLOT_COUNT });
        return;
      }
      const check = checkGarage(entries[garageEntry].data, entry.data);
      const extraSlots = check.state === "loaded" ? Math.floor((entries[garageEntry].data.length - GARAGE_HEADER_SIZE) / SLOT_STRIDE) : 0;
      const totalSlots = check.state === "loaded" ? SLOT_COUNT + extraSlots : SLOT_COUNT;
      profiles.push({ name, folder, careerEntry, garageEntry, garageState: check.state, note: check.note, slotCount: totalSlots });
    });
    return profiles;
  }

  // src/model/zip.ts
  var LOCAL_SIG = 67324752;
  var CENTRAL_SIG = 33639248;
  var END_SIG = 101010256;
  var UTF8_FLAG = 2048;
  var CRC_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      table[n] = c >>> 0;
    }
    return table;
  })();
  function crc32(data) {
    let crc = 4294967295;
    for (const byte of data) crc = CRC_TABLE[(crc ^ byte) & 255] ^ crc >>> 8;
    return (crc ^ 4294967295) >>> 0;
  }
  function isZip(data) {
    return data.length >= 4 && data[0] === 80 && data[1] === 75 && (data[2] === 3 && data[3] === 4 || data[2] === 5 && data[3] === 6);
  }
  function view(data) {
    return new DataView(data.buffer, data.byteOffset, data.byteLength);
  }
  function decodeName(bytes, utf8) {
    return utf8 ? new TextDecoder("utf-8", { fatal: true }).decode(bytes) : String.fromCharCode(...bytes);
  }
  function encodeName(name, utf8) {
    if (utf8) return new TextEncoder().encode(name);
    const out = new Uint8Array(name.length);
    for (let i = 0; i < name.length; i++) {
      const code = name.charCodeAt(i);
      if (code > 255) throw new RangeError(`ZIP entry name ${name} needs UTF-8.`);
      out[i] = code;
    }
    return out;
  }
  async function inflateRaw(raw, size, name) {
    if (typeof DecompressionStream !== "function") throw new Error(`This browser cannot read the deflated entry ${name}.`);
    const stream = new Blob([raw]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    const out = new Uint8Array(await new Response(stream).arrayBuffer());
    if (out.length !== size) throw new Error(`ZIP entry ${name} has the wrong size.`);
    return out;
  }
  async function readZip(data) {
    const v = view(data);
    let end = -1;
    for (let i = data.length - 22; i >= Math.max(0, data.length - 22 - 65535); i--) {
      if (v.getUint32(i, true) === END_SIG) {
        end = i;
        break;
      }
    }
    if (end < 0) throw new Error("Not a ZIP archive.");
    const diskEntries = v.getUint16(end + 8, true);
    const count = v.getUint16(end + 10, true);
    const dirSize = v.getUint32(end + 12, true);
    const dirOffset = v.getUint32(end + 16, true);
    const commentSize = v.getUint16(end + 20, true);
    if (v.getUint16(end + 4, true) !== 0 || v.getUint16(end + 6, true) !== 0 || diskEntries !== count) {
      throw new Error("Split ZIP archives are not supported.");
    }
    if (count === 65535 || dirSize === 4294967295 || dirOffset === 4294967295) throw new Error("ZIP64 archives are not supported.");
    if (dirOffset + dirSize > end || end + 22 + commentSize > data.length) throw new Error("The ZIP directory is damaged.");
    const entries = [];
    let p = dirOffset;
    for (let i = 0; i < count; i++) {
      if (p + 46 > end || v.getUint32(p, true) !== CENTRAL_SIG) throw new Error("The ZIP directory is damaged.");
      const flags = v.getUint16(p + 8, true);
      const method = v.getUint16(p + 10, true);
      const time = v.getUint16(p + 12, true);
      const date = v.getUint16(p + 14, true);
      const crc = v.getUint32(p + 16, true);
      const compressedSize = v.getUint32(p + 20, true);
      const size = v.getUint32(p + 24, true);
      const nameSize = v.getUint16(p + 28, true);
      const extraSize = v.getUint16(p + 30, true);
      const fileCommentSize = v.getUint16(p + 32, true);
      const localOffset = v.getUint32(p + 42, true);
      const utf8 = (flags & UTF8_FLAG) !== 0;
      if (p + 46 + nameSize + extraSize + fileCommentSize > end) throw new Error("The ZIP directory is damaged.");
      const name = decodeName(data.subarray(p + 46, p + 46 + nameSize), utf8);
      if (flags & 1) throw new Error(`ZIP entry ${name} is encrypted.`);
      if (compressedSize === 4294967295 || size === 4294967295 || localOffset === 4294967295) {
        throw new Error("ZIP64 archives are not supported.");
      }
      if (localOffset + 30 > data.length || v.getUint32(localOffset, true) !== LOCAL_SIG) {
        throw new Error(`ZIP entry ${name} is damaged.`);
      }
      const start = localOffset + 30 + v.getUint16(localOffset + 26, true) + v.getUint16(localOffset + 28, true);
      if (start + compressedSize > data.length) throw new Error(`ZIP entry ${name} is damaged.`);
      const raw = data.subarray(start, start + compressedSize);
      let entryData;
      if (method === 0) entryData = raw.slice();
      else if (method === 8) entryData = await inflateRaw(raw, size, name);
      else throw new Error(`ZIP entry ${name} uses unsupported compression method ${method}.`);
      if (entryData.length !== size || crc32(entryData) !== crc) throw new Error(`ZIP entry ${name} failed its CRC check.`);
      entries.push({
        name,
        data: entryData,
        time,
        date,
        utf8,
        versionMadeBy: v.getUint16(p + 4, true),
        internalAttributes: v.getUint16(p + 36, true),
        externalAttributes: v.getUint32(p + 38, true)
      });
      p += 46 + nameSize + extraSize + fileCommentSize;
    }
    return { entries, comment: data.slice(end + 22, end + 22 + commentSize) };
  }
  function dosDateTime(at = /* @__PURE__ */ new Date()) {
    const year = Math.min(2107, Math.max(1980, at.getFullYear()));
    return {
      time: at.getHours() << 11 | at.getMinutes() << 5 | Math.floor(at.getSeconds() / 2),
      date: year - 1980 << 9 | at.getMonth() + 1 << 5 | at.getDate()
    };
  }
  function writeZip(archive) {
    if (archive.entries.length > 65535) throw new RangeError("Too many ZIP entries.");
    const prepared = archive.entries.map((entry) => ({ entry, name: encodeName(entry.name, entry.utf8), crc: crc32(entry.data) }));
    const localSize = prepared.reduce((sum, item) => sum + 30 + item.name.length + item.entry.data.length, 0);
    const centralSize = prepared.reduce((sum, item) => sum + 46 + item.name.length, 0);
    const comment = archive.comment.subarray(0, 65535);
    const out = new Uint8Array(localSize + centralSize + 22 + comment.length);
    const v = view(out);
    const offsets = [];
    let p = 0;
    for (const { entry, name, crc } of prepared) {
      offsets.push(p);
      const flags = entry.utf8 ? UTF8_FLAG : 0;
      v.setUint32(p, LOCAL_SIG, true);
      v.setUint16(p + 4, 20, true);
      v.setUint16(p + 6, flags, true);
      v.setUint16(p + 8, 0, true);
      v.setUint16(p + 10, entry.time, true);
      v.setUint16(p + 12, entry.date, true);
      v.setUint32(p + 14, crc, true);
      v.setUint32(p + 18, entry.data.length, true);
      v.setUint32(p + 22, entry.data.length, true);
      v.setUint16(p + 26, name.length, true);
      v.setUint16(p + 28, 0, true);
      out.set(name, p + 30);
      out.set(entry.data, p + 30 + name.length);
      p += 30 + name.length + entry.data.length;
    }
    const dirOffset = p;
    prepared.forEach(({ entry, name, crc }, i) => {
      const flags = entry.utf8 ? UTF8_FLAG : 0;
      v.setUint32(p, CENTRAL_SIG, true);
      v.setUint16(p + 4, entry.versionMadeBy, true);
      v.setUint16(p + 6, 20, true);
      v.setUint16(p + 8, flags, true);
      v.setUint16(p + 10, 0, true);
      v.setUint16(p + 12, entry.time, true);
      v.setUint16(p + 14, entry.date, true);
      v.setUint32(p + 16, crc, true);
      v.setUint32(p + 20, entry.data.length, true);
      v.setUint32(p + 24, entry.data.length, true);
      v.setUint16(p + 28, name.length, true);
      v.setUint16(p + 36, entry.internalAttributes, true);
      v.setUint32(p + 38, entry.externalAttributes, true);
      v.setUint32(p + 42, offsets[i], true);
      out.set(name, p + 46);
      p += 46 + name.length;
    });
    v.setUint32(p, END_SIG, true);
    v.setUint16(p + 8, prepared.length, true);
    v.setUint16(p + 10, prepared.length, true);
    v.setUint32(p + 12, p - dirOffset, true);
    v.setUint32(p + 16, dirOffset, true);
    v.setUint16(p + 20, comment.length, true);
    out.set(comment, p + 22);
    return out;
  }

  // src/data/unlock-table.ts
  var UNLOCK_CATEGORIES = {
    bodyParts: [
      [1122, 1141],
      [1150, 1157],
      [1434, 1533],
      [1566, 1613],
      [1686, 1713],
      [1718, 1725],
      [1730, 1737]
    ],
    specialities: [
      [1158, 1173],
      [1178, 1181],
      [1186, 1197],
      [1206, 1213],
      [1534, 1565],
      [2010, 2017]
    ],
    graphics: [[1230, 1341]],
    performance: [[1414, 1421]]
  };
  function expandRanges(ranges) {
    const offsets = [];
    for (const [start, end] of ranges) {
      for (let rel = start; rel <= end; rel++) offsets.push(rel);
    }
    return offsets;
  }
  var UNLOCK_CATEGORY_OFFSETS = Object.fromEntries(
    Object.keys(UNLOCK_CATEGORIES).map((name) => [name, expandRanges(UNLOCK_CATEGORIES[name])])
  );
  var UNLOCK_OFFSETS = Object.values(UNLOCK_CATEGORY_OFFSETS).flat().sort((a, b) => a - b);

  // src/model/unlocks.ts
  var UNLOCK_COUNT = UNLOCK_OFFSETS.length;
  var ON = 255;
  var OFF = 0;
  function countOffsets(data, slot, offsets) {
    const base = slotBase(slot);
    let count = 0;
    for (const rel of offsets) {
      if (data[base + rel] === ON) count++;
    }
    return count;
  }
  function writeOffsets(data, slot, offsets, on) {
    const base = slotBase(slot);
    const out = data.slice();
    const value = on ? ON : OFF;
    for (const rel of offsets) {
      out[base + rel] = value;
    }
    return out;
  }
  function countUnlocked(data, slot) {
    return countOffsets(data, slot, UNLOCK_OFFSETS);
  }
  function setUnlocks(data, slot, on) {
    return writeOffsets(data, slot, UNLOCK_OFFSETS, on);
  }

  // src/model/career.ts
  var EVENT_COUNT_OFF = 41337;
  var EVENT_OFF = 41341;
  var EVENT_CAPACITY = 384;
  var STAGE_OFF = 39266;
  var STAGE_STRIDE = 257;
  var SHOP_NAMES = ["", "Performance", "Body", "Paint", "Car dealer", "Specialties"];
  function parseCareerDatabase(bytes, cars) {
    const dv = dataView(bytes);
    const containers = [];
    function walk(start, end) {
      for (let off = start; off < end; ) {
        if (off + 8 > end) throw new Error("Truncated game-data chunk.");
        const id = dv.getUint32(off, true), size = dv.getUint32(off + 4, true), next = off + 8 + size;
        if (next > end) throw new Error("Game-data chunk exceeds its container.");
        if (id === 2147699216) containers.push(bytes.subarray(off + 8, next));
        else if (id & 2147483648) walk(off + 8, next);
        off = next;
      }
    }
    walk(0, bytes.length);
    if (!containers.length) throw new Error("Missing NFSU2 career database in GLOBAL\\GLOBALB.BUN.");
    const chunks = /* @__PURE__ */ new Map();
    const raw = containers[0];
    const cv = dataView(raw);
    for (let off = 0; off < raw.length; ) {
      if (off + 8 > raw.length) throw new Error("Truncated career-data chunk.");
      const id = cv.getUint32(off, true), size = cv.getUint32(off + 4, true), next = off + 8 + size;
      if (next > raw.length || chunks.has(id)) throw new Error("Invalid or duplicate career-data chunk.");
      chunks.set(id, raw.subarray(off + 8, next));
      off = next;
    }
    function table(id, stride) {
      const result = chunks.get(id);
      if (!result || result.length % stride) throw new Error(`Missing or invalid career table ${id.toString(16)}.`);
      return result;
    }
    const strings = table(215581, 1);
    function stringAt(off) {
      const end = strings.indexOf(0, off);
      if (off >= strings.length || end < off) throw new Error("Invalid career string offset.");
      return Array.from(strings.subarray(off, end), (b) => String.fromCharCode(b)).join("");
    }
    const events = /* @__PURE__ */ new Map();
    const eventBytes = table(215569, 136), ev = dataView(eventBytes);
    if (!eventBytes.length) throw new Error("Career database has no event definitions.");
    for (let off = 0; off < eventBytes.length; off += 136) {
      const hash = ev.getUint32(off + 8, true);
      if (!hash || events.has(hash)) throw new Error("Invalid or duplicate career event hash.");
      const stage = eventBytes[off + 55], kind = eventBytes[off + 52];
      if (stage > 5 || kind > 3) throw new Error("Unsupported career event definition.");
      events.set(hash, { hash, name: stringAt(ev.getUint16(off, true)), stage, kind, special: eventBytes[off + 13] === 1 });
    }
    const shops = [];
    const shopBytes = table(215570, 160), sv = dataView(shopBytes);
    const shopHashes = /* @__PURE__ */ new Set();
    for (let off = 0; off < shopBytes.length; off += 160) {
      const hash = sv.getUint32(off + 56, true), type = shopBytes[off + 80];
      if (!hash || shopHashes.has(hash)) throw new Error("Invalid or duplicate shop hash.");
      shopHashes.add(hash);
      if (type < 1 || type > 5) continue;
      const path = shopBytes.subarray(off + 64, off + 80);
      const end = path.indexOf(0);
      const name = Array.from(end < 0 ? path : path.subarray(0, end), (b) => String.fromCharCode(b)).join("");
      const stage = sv.getInt8(off + 157), gate = shopBytes[off + 156];
      if (stage < 0 || stage > 5 || gate > 4) throw new Error(`Unsupported career shop gate: ${name}.`);
      shops.push({
        hash,
        name: `${SHOP_NAMES[type]}: ${name.replace(/\.BIN$/i, "")}`,
        type,
        stage,
        gate,
        discovery: shopBytes[off + 81] !== 0,
        requirement: sv.getUint32(off + 116, true)
      });
    }
    const parts = [];
    const partBytes = table(215580, 40), pv = dataView(partBytes);
    for (let off = 0; off < partBytes.length; off += 40) {
      const item = pv.getInt32(off, true);
      if (item !== off / 40 + 1) throw new Error("Unsupported career part-index sequence.");
      for (let level = 1; level <= 3; level++) {
        const base = off + 4 + (level - 1) * 12;
        const type = pv.getInt8(base + 4);
        if (type < 0 || type > 6) throw new Error("Unsupported career part gate.");
        parts.push({ item, level, type, requirement: pv.getUint32(base + 8, true) });
      }
    }
    const carGates = [];
    const carBytes = table(215583, 12), av = dataView(carBytes);
    for (let off = 0; off < carBytes.length; off += 12) {
      carGates.push({ hash: av.getUint32(off, true), events: [av.getUint32(off + 4, true), av.getUint32(off + 8, true)] });
    }
    const stages = [];
    const stageBytes = table(215576, 80), tv = dataView(stageBytes);
    if (stageBytes.length !== 6 * 80) throw new Error("Career editing requires the six-stage main database.");
    for (let off = 0; off < stageBytes.length; off += 80) {
      const id = stageBytes[off];
      if (id !== stages.length) throw new Error("Unsupported career stage sequence.");
      const finalEvent = tv.getUint32(off + 40, true);
      if (finalEvent && !events.has(finalEvent)) throw new Error("Unknown final-stage event.");
      stages.push({ id, finalEvent });
    }
    const photos = [];
    const photoBytes = table(215574, 64), fv = dataView(photoBytes);
    const photoHashes = /* @__PURE__ */ new Set();
    for (let off = 0; off < photoBytes.length; off += 64) {
      const hash = fv.getUint32(off + 32, true), stage = photoBytes[off + 37];
      if (!hash || photoHashes.has(hash) || events.has(hash) || stage > 5) throw new Error("Invalid career photo goal.");
      photoHashes.add(hash);
      photos.push({ hash, stage });
    }
    return { events, shops, parts, cars, carGates, stages, photos };
  }
  function savedEvents(data) {
    if (data.length < PROFILE_SIZE || data.length > PROFILE_SIZE && (data.length - PROFILE_SIZE) % 2034 !== 0) throw new Error("Unsupported career save size.");
    const dv = dataView(data), count = dv.getUint32(EVENT_COUNT_OFF, true), stage = dv.getUint32(CURRENT_STAGE_OFF, true);
    if (stage > 6) throw new Error("Career access supports stages 0-6 only (6 is post-career).");
    if (count > EVENT_CAPACITY) throw new Error("Career event count exceeds 384.");
    const events = /* @__PURE__ */ new Map();
    for (let i = 0; i < count; i++) {
      const off = EVENT_OFF + i * 8, hash = dv.getUint32(off, true);
      if (!hash || events.has(hash)) throw new Error("Invalid or duplicate saved event hash.");
      events.set(hash, off);
    }
    return events;
  }
  function stageResultCount(data, stage, kind) {
    if (!Number.isInteger(stage) || stage < 0 || stage > 7) throw new RangeError("Invalid result stage.");
    if (data.length < PROFILE_SIZE) throw new Error("Truncated career save.");
    const [rel, size] = kind === "races" ? [0, 35] : kind === "urls" ? [140, 4] : [156, 10];
    const dv = dataView(data), base = STAGE_OFF + stage * STAGE_STRIDE + rel;
    let count = 0;
    for (let i = 0; i < size; i++) if (dv.getUint32(base + i * 4, true) !== 0) count++;
    return count;
  }
  function careerReport(data, db) {
    if (!db.events.size) throw new Error("Career database has no event definitions.");
    const events = savedEvents(data), dv = dataView(data), stage = dv.getUint32(CURRENT_STAGE_OFF, true);
    const complete = (hash) => {
      const off = events.get(hash);
      return off !== void 0 && data[off + 6] === 1;
    };
    function eventReason(hash) {
      return `Complete ${db.events.get(hash)?.name ?? `event 0x${hash.toString(16).toUpperCase()}`}`;
    }
    function countGate(which, required, kind) {
      const count = stageResultCount(data, which, kind);
      return count >= required ? "" : `Stage ${which}: ${count}/${required} ${kind} results`;
    }
    function shopReason(shop, checkDiscovery) {
      if (stage < shop.stage) return `Requires stage ${shop.stage}`;
      if (shop.gate === 1 && !complete(shop.requirement)) return eventReason(shop.requirement);
      if (shop.gate >= 2) {
        const reason = countGate(shop.stage, shop.requirement, shop.gate === 2 ? "sponsors" : shop.gate === 3 ? "races" : "urls");
        if (reason) return reason;
      }
      const off = events.get(shop.hash);
      if (checkDiscovery && shop.discovery && (off === void 0 || data[off + 4] !== 1)) return `Discover ${shop.name}`;
      return "";
    }
    const shops = db.shops.map((shop) => {
      const reason = shopReason(shop, false), off = events.get(shop.hash);
      const discovered = !shop.discovery || off !== void 0 && data[off + 4] === 1;
      return { name: shop.name, hash: shop.hash, passed: !reason, reason, discovered, discoverable: !reason && !discovered };
    });
    const activeStock = dv.getUint32(1188, true);
    if (activeStock > 48) throw new Error("Invalid active stock-car count.");
    const cars = [];
    for (let i = 0; i < activeStock; i++) {
      const index = dv.getInt32(36 + i * 24 + 20, true);
      const car = db.cars.find((car2) => car2.index === index);
      if (!car) throw new Error("Saved stock-car index is absent from this BUN.");
      const gate = db.carGates.find((gate2) => gate2.hash === car.hash);
      const reasons = gate?.events.map((hash) => db.events.has(hash) && !complete(hash) ? eventReason(hash) : "") ?? ["", ""];
      const unique = [...new Set(reasons)];
      const reason = unique.length === 1 ? unique[0] : `Game-region dependent: ${reasons.map((r) => r || "gate passed").join(" / ")}`;
      cars.push({ name: car.name, passed: reasons.every((r) => !r), reason });
    }
    const parts = db.parts.map((part) => {
      let reason = "";
      if (part.type === 1) {
        const shop = db.shops.find((s2) => s2.hash === part.requirement);
        if (!shop) throw new Error(`Unknown shop prerequisite for part ${part.item}.`);
        reason = shopReason(shop, true);
      } else if (part.type >= 2 && part.type <= 4) {
        const which = part.requirement >>> 16, required = part.requirement & 65535;
        reason = countGate(which, required, part.type === 2 ? "races" : part.type === 3 ? "sponsors" : "urls");
      }
      return { name: `Item ${part.item}, level ${part.level}`, passed: !reason, reason };
    });
    const completedEvents = [...db.events.keys()].filter(complete).length;
    const completedStages = db.stages.filter((s2) => data[STAGE_OFF + s2.id * STAGE_STRIDE + 252] !== 0).length;
    const completedPhotos = db.photos.filter((p) => complete(p.hash)).length;
    return { stage, events: events.size, shops, cars, parts, completion: {
      events: completedEvents,
      totalEvents: db.events.size,
      percent: completedEvents / db.events.size * 100,
      stages: completedStages,
      photos: completedPhotos,
      totalPhotos: db.photos.length,
      complete: completedEvents === db.events.size && completedStages === db.stages.length && completedPhotos === db.photos.length && stage === 6
    } };
  }
  function ensureEvent(out, events, hash) {
    const existing = events.get(hash);
    if (existing !== void 0) return existing;
    if (events.size >= EVENT_CAPACITY) throw new Error("Not enough career event slots.");
    const off = EVENT_OFF + events.size * 8;
    out.fill(0, off, off + 8);
    dataView(out).setUint32(off, hash, true);
    events.set(hash, off);
    dataView(out).setUint32(EVENT_COUNT_OFF, events.size, true);
    return off;
  }
  function discoverCareerShops(data, db) {
    const report = careerReport(data, db), events = savedEvents(data);
    const selected = report.shops.filter((shop) => shop.discoverable);
    const needed = selected.filter((shop) => !events.has(shop.hash)).length;
    if (events.size + needed > EVENT_CAPACITY) throw new Error("Not enough event slots to discover eligible shops.");
    const out = data.slice();
    for (const shop of selected) {
      const off = ensureEvent(out, events, shop.hash);
      out[off + 4] = 1;
    }
    return out;
  }
  function setCareerStage(data, stage) {
    savedEvents(data);
    if (!Number.isInteger(stage) || stage < 0 || stage > 6) throw new RangeError("Choose career stage 0-6.");
    const out = data.slice();
    dataView(out).setUint32(CURRENT_STAGE_OFF, stage, true);
    return out;
  }
  function completeCareer(data, db) {
    const events = savedEvents(data);
    if (!db.events.size || db.stages.length !== 6) throw new Error("Full completion requires the main career database.");
    const hashes = /* @__PURE__ */ new Set([...db.events.keys(), ...db.photos.map((p) => p.hash), ...db.shops.filter((s2) => s2.discovery).map((s2) => s2.hash)]);
    const needed = [...hashes].filter((hash) => !events.has(hash)).length;
    if (events.size + needed > EVENT_CAPACITY) throw new Error("Not enough event slots to complete the career.");
    const out = data.slice(), dv = dataView(out);
    for (const event of db.events.values()) {
      const off = ensureEvent(out, events, event.hash);
      out[off + 4] = 1;
      out[off + 6] = 1;
      const [rel, size] = event.kind === 1 ? [140, 4] : event.kind === 2 ? [156, 10] : [0, 35];
      if (event.kind === 0 || event.kind === 3 && event.special) continue;
      const base = STAGE_OFF + event.stage * STAGE_STRIDE + rel;
      for (let i = 0; i < size; i++) {
        const slot = base + i * 4, value = dv.getUint32(slot, true);
        if (value === event.hash) break;
        if (value === 0) {
          dv.setUint32(slot, event.hash, true);
          break;
        }
      }
    }
    for (const photo of db.photos) {
      const off = ensureEvent(out, events, photo.hash);
      out[off + 4] = 2;
      out[off + 6] = 1;
    }
    for (const stage of db.stages) {
      if (stage.finalEvent) {
        const off = events.get(stage.finalEvent);
        if (off === void 0 || out[off + 6] !== 1) throw new Error("Final career goal is missing.");
      }
      const base = STAGE_OFF + stage.id * STAGE_STRIDE;
      out[base + 252] = 1;
      dv.setInt32(base + 253, stage.id, true);
    }
    dv.setUint32(CURRENT_STAGE_OFF, 6, true);
    return discoverCareerShops(out, db);
  }

  // src/data/car-donors-data.ts
  var DEFAULT_DONORS_RAW = {
    "Mitsubishi Lancer Evo VIII": [
      {
        "off": 22640,
        "hex": "5C 1B 9A 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 F6 EF D2 09 10 C2 B1 C2 AF 42 56 35 90 AC AF D8 00 00 00 00 00 00 00 00 8A C9 F0 8F A1 C5 74 20 85 E2 70 0B C8 82 4B 99 26 15 F4 8F 30 A0 51 8F 89 7E 3B 8F BA 9A 26 58 D2 20 38 56 26 1F B4 92 D9 43 05 C6 BE A6 9D 34 3A A5 05 53 0D 14 29 B4 49 C4 66 52 FC 14 AE 9F 0D 7F 24 0B 40 28 23 70 00 00 00 00 00 00 00 00 43 00 DD 8E CD 2A BD C0 E9 11 37 6E E9 11 37 6E F9 A8 AD 6F F9 A8 AD 6F"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 64 A6 C6 C9 55 56 8F 57 96 9B B5 0E 78 85 9E 1D 6B F8 20 2D A8 9E A3 CB BB 10 EE 02 11 BF CA 52 24 65 D4 07 A1 1D E5 20 D4 6E 5F 00 E5 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 4E 11 29 14"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 54 32 35 C4 62 E0 5B C4 C5 F1 91 41 00 00 00 00 20 51 F5 D5 04 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 00 00 00 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 1F B5 00 00 1C 3D 04 00 88 27 6F 00 67 1B 6F 00 4C 0C 15 00 12 10 A4 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Mitsubishi 3000GT": [
      {
        "off": 22640,
        "hex": "F2 3B 96 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 5D 9B 7C 2D D7 A5 61 6A B6 B6 1D 66 B7 3B C5 46 00 00 00 00 00 00 00 00 91 26 44 B9 88 C3 33 74 85 E2 70 0B AF 89 1A 87 2D 72 47 B9 17 9E 10 E3 70 7C FA E2 61 AE 9C 97 99 DB D6 21 8D B8 FD 87 20 0A 82 64 65 BA 13 74 A1 3E 4F 48 54 DA A5 52 F0 8E 6D E1 83 34 8E 0F D4 10 99 8B E7 F2 29 FF 00 00 00 00 00 00 00 00 8A C6 59 2D F4 B9 D2 2E 10 A1 4C DC 10 A1 4C DC 20 38 C3 DD 20 38 C3 DD 00 00 00 00 72 02 0F CE 68 8E A3 53 08 A7 6C 2D 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 EB C5 A6 39 DC 0C BE 26 3D 1D 14 72 5F 71 52 04 32 61 52 EA 2F 55 D2 9A 22 98 F3 B7 38 BC 4F 5F 2B 07 F9 A4 68 5D BA 99 7B A7 DC 93 E7 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 55 57 2F 61"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 A7 32 35 C4 05 E0 5B C4 05 DB 91 41 00 00 00 00 20 51 72 FC D3 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 D4 6F 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 BF BA 00 00 F1 DD 41 00 38 24 78 00 4F 47 70 00 9F 16 38 00 AE F2 A9 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Mitsubishi 3000GT 'NIGEL'": [
      {
        "off": 22640,
        "hex": "F2 3B 96 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 5D 9B 7C 2D D7 A5 61 6A 77 24 65 09 BB 61 41 84 00 00 00 00 00 00 00 00 91 26 44 B9 88 C3 33 74 0E EB D0 44 AF 89 1A 87 9E 47 95 58 17 9E 10 E3 39 9F C6 97 94 85 F0 45 E5 A8 A6 2E DB 7C B9 11 8F B5 A9 56 C0 0C C5 66 A1 3E 4F 48 54 DA A5 52 F0 8E 6D E1 83 34 8E 0F D4 10 99 8B E7 F2 29 FF 00 00 00 00 00 00 00 00 8A C6 59 2D F4 B9 D2 2E 97 86 57 C6 10 A1 4C DC D3 72 8A DC D3 72 8A DC 00 00 00 00 72 02 0F CE 68 8E A3 53 08 A7 6C 2D 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 EB C5 A6 39 DC 0C BE 26 3D 1D 14 72 5F 71 52 04 32 61 52 EA 2F 55 D2 9A 22 98 F3 B7 38 BC 4F 5F 2B 07 F9 A4 68 5D BA 99 7B A7 DC 93 E7 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 55 57 2F 61"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 07 C4 9D C4 DE 1F 19 C4 54 28 9E 41 00 00 00 00 A0 5B 2D 30 DE 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 4F 47 70 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 E6 94 02 00 DE 4A 44 00 86 7D 6C 00 4E 42 75 00 8E 19 6B 00 8C 18 B6 00 00 00 00 00 00 00 00 00 02 CA AC 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Mitsubishi Eclipse GSX ": [
      {
        "off": 22640,
        "hex": "3C C1 5F 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 84 DA 02 75 5E 75 A0 A5 7D A6 45 52 9E CE 3A 84 00 00 00 00 00 00 00 00 58 3F 18 DA 2F F5 8A AF 85 E2 70 0B 56 04 6A 98 F4 8A 1B DA BE CF 67 1E 17 AE 51 1E C8 E5 86 05 20 42 14 C8 B4 65 53 19 27 5C 8D 20 CC F1 FD E1 C8 EB A4 D9 5B 2C B1 0E 57 3D B0 33 CA AF 26 AA 5B 0E 7C 21 4E A1 6C 51 00 00 00 00 00 00 00 00 91 18 65 E9 DB 4C 48 6C F7 33 C2 19 F7 33 C2 19 07 CB 38 1B 07 CB 38 1B 00 00 00 00 59 95 84 0B 68 8E A3 53 EF 39 E2 6A 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 32 41 3F D4 23 DF 24 F2 A4 42 36 59 06 11 0E 8E B9 F5 81 AB 76 27 39 66 49 B3 34 F0 1F 3D 44 AC F2 A4 7D 90 EF 88 DD 78 E2 43 65 57 E4 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 1C 99 96 E5"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 99 32 35 C4 05 E0 5B C4 52 4A 92 41 00 00 00 00 20 51 94 AB D4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 99 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 C2 C2 00 00 70 4E 04 00 78 7C 7D 00 C7 9E 75 00 3A 72 08 00 6A 9C B9 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Mitsubishi Eclipse GSX 'D3' (SPONSOR)": [
      {
        "off": 22640,
        "hex": "3C C1 5F 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 84 DA 02 75 5E 75 A0 A5 63 34 CE 1D 9E CE 3A 84 00 00 00 00 00 00 00 00 58 3F 18 DA 2F F5 8A AF 8B E2 70 0B 56 04 6A 98 45 C2 77 49 BE CF 67 1E BD B2 76 8B 71 85 F0 45 2C CD D7 59 B4 65 53 19 27 5C 8D 20 FE 62 41 8E C8 EB A4 D9 5B 2C B1 0E 57 3D B0 33 CA AF 26 AA 5B 0E 7C 21 4E A1 6C 51 00 00 00 00 00 00 00 00 91 18 65 E9 DB 4C 48 6C 97 86 57 C6 F7 33 C2 19 2F EC 82 70 2F EC 82 70 00 00 00 00 59 95 84 0B 68 8E A3 53 EF 39 E2 6A 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 32 41 3F D4 23 DF 24 F2 A4 42 36 59 06 11 0E 8E B9 F5 81 AB 76 27 39 66 49 B3 34 F0 1F 3D 44 AC F2 A4 7D 90 EF 88 DD 78 E2 43 65 57 E6 2E 39 2D 0F 49 8A A9 FA F6 69 02"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 1C 99 96 E5"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 68 94 C0 C3 76 D1 1B 42 C9 2A 62 41 00 00 00 00 E0 54 3A 22 F7 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "E3 FC B8 20 C9 78 00 00 01 01 01 01 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 77 8F 07 00 CE E6 0E 00 B7 AB 78 00 31 72 86 00 10 42 2A 00 2C 77 E5 00 00 00 00 00 00 00 00 00 1D 66 BD 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Infiniti G35 Coupe": [
      {
        "off": 22640,
        "hex": "6B EB 8D 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 6E A8 00 00 88 85 1D EA 27 B8 16 6E 08 53 FB 27 00 00 00 00 00 00 00 00 02 47 2F 0D 19 F2 82 45 85 E2 70 0B 40 B7 10 E8 9E 92 32 0D A8 CC 5F B4 01 AB 49 B4 32 C5 71 F9 4A DC 0B 1D 9E C7 73 B3 51 FB B9 FE 36 D1 E8 D5 B2 4D C5 73 85 CB DD EC C1 E6 90 13 74 86 1C 86 85 32 D8 75 B8 4A 4D 31 00 00 00 00 00 00 00 00 BB B7 91 C7 45 D1 08 10 61 B8 82 BD 61 B8 82 BD 71 4F F9 BE 71 4F F9 BE 00 00 00 00 C3 19 45 AF 68 8E A3 53 59 BE A2 0E 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 DC 17 35 B0 CD BF 33 54 0E B6 36 7B F0 A1 A6 E7 E3 A3 2C 38 20 08 48 C8 33 A9 1F 94 89 55 C4 F6 9C CA 00 2B 19 C1 C0 C0 4C 81 AF 9B 4F F9 6E 3C 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 C6 96 5D 5C"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 43 32 35 C4 61 E0 5B C4 60 A0 91 41 00 00 00 00 20 51 79 38 D4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 D4 6F 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 65 60 02 00 97 83 43 00 30 F9 79 00 47 1C 72 00 55 1C 3C 00 64 F8 AD 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Infiniti G35 Coupe 'TOM'": [
      {
        "off": 22640,
        "hex": "6B EB 8D 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 6E A8 00 00 88 85 1D EA 8C 40 66 66 91 A8 52 F2 00 00 00 00 00 00 00 00 02 47 2F 0D 19 F2 82 45 85 E2 70 0B 40 B7 10 E8 4A 91 C5 92 A8 CC 5F B4 C2 E7 43 01 D7 85 F0 45 D6 99 1E CB 2C 94 EF F2 61 14 96 8F C0 0C C5 66 B2 4D C5 73 85 CB DD EC C1 E6 90 13 74 86 1C 86 85 32 D8 75 B8 4A 4D 31 00 00 00 00 00 00 00 00 BB B7 91 C7 45 D1 08 10 97 86 57 C6 61 B8 82 BD EC 9B 97 DC EC 9B 97 DC 00 00 00 00 C3 19 45 AF 68 8E A3 53 59 BE A2 0E 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 DC 17 35 B0 CD BF 33 54 0E B6 36 7B F0 A1 A6 E7 E3 A3 2C 38 20 08 48 C8 33 A9 1F 94 89 55 C4 F6 9C CA 00 2B 19 C1 C0 C0 4C 81 AF 9B 54 F9 6E 3C 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 C6 96 5D 5C"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 A5 CF 8B C3 B1 5B E8 C3 45 28 A1 41 00 00 00 00 80 F9 A1 13 E4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "18 45 4D 47 1C 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 C5 BD 02 00 A4 19 46 00 96 5D 6F 00 07 DA 79 00 78 3A 5B 00 9B 8E BD 00 00 00 00 00 00 00 00 00 6D A2 B0 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Infiniti G35 Coupe 'JAPAN TUNING' (SPONSOR)": [
      {
        "off": 22640,
        "hex": "6B EB 8D 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 6E A8 00 00 88 85 1D EA F0 F2 5F EB B1 D8 33 DE 00 00 00 00 00 00 00 00 02 47 2F 0D 19 F2 82 45 85 E2 70 0B 40 B7 10 E8 9E 92 32 0D A8 CC 5F B4 EA 65 5D 08 D7 85 F0 45 D6 99 1E CB 30 69 62 08 9F 59 AF 2D DF 37 83 7A B2 4D C5 73 85 CB DD EC C1 E6 90 13 74 86 1C 86 85 32 D8 75 B8 4A 4D 31 00 00 00 00 00 00 00 00 BB B7 91 C7 45 D1 08 10 97 86 57 C6 61 B8 82 BD BF C1 4C A0 BF C1 4C A0 00 00 00 00 D1 3F D9 E8 68 8E A3 53 59 BE A2 0E 05 47 C9 FA 05 47 C9 FA AD 09 64 45 D3 45 55 7B FD 9D 4B 8F 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 DC 17 35 B0 CD BF 33 54 0E B6 36 7B F0 A1 A6 E7 E3 A3 2C 38 20 08 48 C8 33 A9 1F 94 89 55 C4 F6 9C CA 00 2B 19 C1 C0 C0 4C 81 AF 9B E3 BD BC B8 0E 49 8A A9 1D B8 6E C3"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 C6 96 5D 5C"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 EC 00 78 C4 AF B2 4C 44 F8 A2 1C 42 00 00 00 00 E0 7E 4D 37 F6 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "31 1A 10 93 A7 7B 00 00 01 01 01 01 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 6C 2E 04 00 69 1A 48 00 01 39 78 00 2F B5 82 00 63 5C 10 00 09 D2 F1 00 00 00 00 00 00 00 00 00 90 5E B4 00 00 64 0E 14 BC D4 81"
      }
    ],
    "Nissan 240SX": [
      {
        "off": 22640,
        "hex": "41 EC 43 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 80 FB 50 01 DA 93 96 03 F9 6D 31 5C 9A 96 CD 9B 00 00 00 00 00 00 00 00 D4 4A E2 F4 2B 70 96 23 85 E2 70 0B 52 43 98 F0 70 96 E5 F4 BA 4A 73 92 13 29 5D 92 C4 0F 5D AA 9C 1C 8F BD B0 FE 5B 4C A3 14 A9 B4 C8 1B D4 86 C4 84 AD 0C D7 E4 CC A2 53 A3 1E E7 46 D5 61 CB D7 A4 77 55 4A 07 DB 04 00 00 00 00 00 00 00 00 0D D1 80 7D D7 14 DB 83 F3 FB 54 31 F3 FB 54 31 03 93 CB 32 03 93 CB 32 00 00 00 00 55 5D 17 23 68 8E A3 53 EB 01 75 82 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 AE 66 7A F5 9F C0 FB 86 A0 E4 B8 5D 02 04 48 1C 35 48 FA 00 F2 08 10 FB 45 C4 E7 1F 1B 7D FF 94 6E E4 A0 90 6B 97 CE 0E DE 21 78 AB 97 43 EE 98 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 98 E8 3A C9"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 D8 CD 35 C4 67 E0 5B C4 EC E3 91 41 00 00 00 00 20 51 B1 40 D5 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 D4 6F 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 8C D0 00 00 E1 E0 04 00 68 09 82 00 E7 2A 7A 00 7F 97 0A 00 D6 E4 E2 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Nissan 350Z": [
      {
        "off": 22640,
        "hex": "AA 52 9E 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 D1 C6 0A 00 CB 19 19 62 AA 05 77 C8 2B 7C F6 22 00 00 00 00 00 00 00 00 85 C1 07 26 FC BC 6A 79 85 E2 70 0B 23 4F F9 02 21 0D 0B 26 8B 97 47 E8 E4 75 31 E8 D5 D4 77 C6 8D 03 ED CD 01 4C 3C DA 14 0C 93 FE D9 E0 EE A2 15 D2 8D 9A 48 DC B6 EC 64 E9 71 FC 77 DD 1D 8B C8 EC 81 E9 5B 4D 2E 1A 00 00 00 00 00 00 00 00 7E C8 6A C7 68 FA 03 0B 84 E1 7D B8 84 E1 7D B8 94 78 F4 B9 94 78 F4 B9 00 00 00 00 E6 42 40 AA 68 8E A3 53 7C E7 9D 09 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 DF 6E 36 B5 D0 69 11 72 B1 AB 35 D9 D3 D2 15 2D 26 F1 81 2B 23 B2 25 E6 96 93 B2 6D AC 64 BB 80 1F BE D9 F3 5C A1 A4 23 EF 69 0F 5B 93 43 EE 98 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 49 3E D1 E8"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 9B 5C 35 C4 39 21 5B C4 0D F0 91 41 00 00 00 00 20 51 B7 44 D4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 D4 6F 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 CA E0 00 00 FC 03 04 00 D8 58 7A 00 EF 7B 72 00 B0 1D 3F 00 BF F9 B0 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Nissan 350Z RACHEL": [
      {
        "off": 22640,
        "hex": "AA 52 9E 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 D1 C6 0A 00 CB 19 19 62 AA 05 77 C8 2B 7C F6 22 00 00 00 00 00 00 00 00 85 C1 07 26 3E 0E 15 7E 85 E2 70 0B 23 4F F9 02 59 4A 7E 11 8B 97 47 E8 E4 75 31 E8 6F 85 F0 45 F8 C8 A4 4C 8C 9D D4 5D C1 49 1C 57 A1 E1 06 53 6E FA 54 FA C1 0F 63 45 7D 30 F6 B1 B0 07 2B F1 C1 34 9D 5B 74 94 B2 CF 00 00 00 00 00 00 00 00 7E C8 6A C7 68 FA 03 0B 96 86 57 C6 84 E1 7D B8 21 11 5F 02 21 11 5F 02 00 00 00 00 E6 42 40 AA 68 8E A3 53 7C E7 9D 09 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 DF 6E 36 B5 D0 69 11 72 B1 AB 35 D9 D3 D2 15 2D 26 F1 81 2B 23 B2 25 E6 96 93 B2 6D 2D 50 D7 56 C0 19 73 8D 3D 69 03 89 F0 2D 47 6C 6E F9 6E 3C 40 F4 B3 64 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 49 3E D1 E8"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 04 C2 23 44 22 95 CD C2 28 57 7C 41 00 00 00 00 C0 62 9F 43 E9 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 D4 6F 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 15 61 0A 00 0D 44 0E 00 05 E6 71 00 41 BC 7C 00 BB 99 0B 00 D0 39 BB 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Nissan Skyline R34": [
      {
        "off": 22640,
        "hex": "27 EA 88 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 5E 37 48 BE 78 EA 23 19 17 01 73 69 F8 3D 7A B3 00 00 00 00 00 00 00 00 F2 9F 09 D3 09 69 A8 C6 85 E2 70 0B 30 3E 66 8C 8E EB 0C D3 98 43 85 35 F1 21 6F 35 22 B8 D0 59 3A 31 E0 C2 8E 36 5B A7 41 48 8F 6F 26 C4 47 36 A2 BC AC 67 75 18 B3 5D B1 C9 6B C9 64 C7 53 F7 75 77 6A B9 A8 2D 28 E7 00 00 00 00 00 00 00 00 AB 04 67 38 35 BC 87 9B 51 A3 01 49 51 A3 01 49 61 3A 78 4A 61 3A 78 4A 00 00 00 00 B3 04 C4 3A 68 8E A3 53 49 A9 21 9A 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 CC 58 6C 21 BD F0 54 5D FE 88 7D 7B E0 F8 3B 2D D3 D8 6C 30 10 39 69 D1 23 F8 66 C1 79 20 1B 93 8C F3 30 52 09 E6 9E 74 3C 44 52 CB E4 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 B6 FF A5 97"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 22 32 35 C4 6F E0 5B C4 7A 82 92 41 00 00 00 00 20 51 78 E1 04 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 00 00 00 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 47 DD 00 00 44 65 04 00 78 81 6F 00 57 75 6F 00 8C 7D 17 00 52 81 A6 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Nissan Skyline R34 'PLAYER'": [
      {
        "off": 22640,
        "hex": "27 EA 88 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 5E 37 48 BE 78 EA 23 19 17 01 73 69 F8 3D 7A B3 00 00 00 00 00 00 00 00 F2 9F 09 D3 4B BA 52 CB 89 E2 70 0B 30 3E 66 8C FD 4B F4 F4 98 43 85 35 F1 21 6F 35 74 85 F0 45 C6 EA 5B 37 1C 7F 6E 7E 41 48 8F 6F C0 0C C5 66 9B 36 51 6B 8E D1 E6 D5 6A 1A 2C 1E 3D 2F 1E E4 0E 15 97 28 61 7E E8 3B 00 00 00 00 00 00 00 00 AB 04 67 38 35 BC 87 9B 97 86 57 C6 51 A3 01 49 BB CE 41 D5 BB CE 41 D5 00 00 00 00 54 5C F6 D6 68 8E A3 53 49 A9 21 9A 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 CC 58 6C 21 BD F0 54 5D FE 88 7D 7B E0 F8 3B 2D D3 D8 6C 30 10 39 69 D1 23 F8 66 C1 FA 0B 37 69 2D 4F CA EB EA AD FD D9 3D 08 8A DC AC 9A CD ED 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 B6 FF A5 97"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 A8 47 9E C4 2E 45 1A C4 50 00 9F 41 00 00 00 00 40 63 CE E5 25 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 57 75 6F 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 A0 C4 03 00 6D 02 08 00 9B 80 28 00 A3 84 77 00 08 57 14 00 7D D4 B8 00 00 00 00 00 00 00 00 00 D1 83 A9 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Nissan Sentra SE-R Spec V": [
      {
        "off": 22640,
        "hex": "6A A9 4D 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 EC BF AE 79 C6 FB 1B 6D E5 42 78 CD 06 7E D7 0B 00 00 00 00 00 00 00 00 C0 F3 48 53 97 36 D2 4E 85 E2 70 0B BE 5D DA 31 5C 3F 4C 53 26 11 AF BD 7F EF 98 BD 30 21 A4 93 88 B0 43 50 1C 1B AD A3 8F BE 1D F6 34 2D 1B 70 30 A1 FE 63 C3 8E 41 E4 BF 60 66 8F 32 40 A1 7C C3 64 C7 33 B6 C4 22 AD 00 00 00 00 00 00 00 00 F9 7A F5 BE 43 FC E4 F3 5F E3 5E A1 5F E3 5E A1 6F 7A D5 A2 6F 7A D5 A2 00 00 00 00 C1 44 21 93 68 8E A3 53 57 E9 7E F2 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 9A D1 B9 A6 8B 57 BD F0 0C 4E ED 60 6E 22 3B D6 21 34 51 F9 DE 9F D1 64 B1 38 DC C1 87 BC E2 85 5A 11 EC 9D 57 AF 98 9B 4A 37 85 D1 E5 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 FA 26 AF 42"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 88 32 35 C4 66 E0 5B C4 6B 52 92 41 00 00 00 00 20 51 D8 FB D4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 99 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 09 D2 00 00 B7 5D 04 00 88 EF 7F 00 D7 11 78 00 C7 19 21 00 F7 43 D2 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Subaru Impreza": [
      {
        "off": 22640,
        "hex": "08 D5 A6 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 F8 58 44 CF 52 1C 17 89 71 68 7B FD 12 22 06 F6 00 00 00 00 00 00 00 00 4C 4D F5 9F A3 C1 09 31 85 E2 70 0B CA 9C 6D 1B E8 98 F8 9F 32 9C E6 9F 8B 7A D0 9F 3C 9F EA E1 14 9D 6C 79 28 4C 8B 9D 1B 11 C2 2B 40 AB 61 BE 3C D2 DC 5D 4F E1 E5 19 CB 2A 20 79 BE 4B 94 9D 4F 1D 2A 71 C2 8E DC 96 00 00 00 00 00 00 00 00 85 CD 99 F4 4F A0 13 DE 6B 87 8D 8B 6B 87 8D 8B 7B 1E 04 8D 7B 1E 04 8D 00 00 00 00 CD E8 4F 7D 68 8E A3 53 63 8D AD DC 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 2A 6B A8 83 1B 81 34 C1 9C 85 5D E3 FE 35 18 2D B1 B9 D0 2B 6E C9 48 35 41 94 38 A1 17 3C C4 AD EA 82 FD C1 E7 C4 CC 09 DA FE 3B 06 EB BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 10 F3 8E E9"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 4E CD 35 C4 05 E0 5B C4 B4 73 92 41 00 00 00 00 20 51 2B C0 04 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 00 00 00 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 FF 9A 00 00 FC 22 04 00 50 7D 20 00 2F 71 20 00 82 B7 10 00 48 BB 9F 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Toyota Celica": [
      {
        "off": 22640,
        "hex": "CD 0F 72 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 60 EC 5A 54 BA 10 DA 84 D9 F2 5D CE 7A FF 0C C6 00 00 00 00 00 00 00 00 B4 EF C7 AC 0B B1 30 D8 85 E2 70 0B 32 A4 EF A6 50 3B CB AC 9A 8B 0D 47 F3 69 F7 46 A4 08 8B EE 7C 79 71 05 90 AF EB 53 83 E1 2E AE A8 14 02 CB A4 35 3D 14 B7 B1 52 9C 33 7C A7 82 26 CA 05 D8 B7 E1 D8 04 2A E0 63 A0 00 00 00 00 00 00 00 00 ED 9D 06 77 B7 7D 1A AE D3 64 94 5B D3 64 94 5B E3 FB 0A 5D E3 FB 0A 5D 00 00 00 00 35 C6 56 4D 68 8E A3 53 CB 6A B4 AC 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 8E 5B 1E 02 7F 95 36 0F 80 9D 7C ED E2 04 08 BC 15 65 BA 98 D2 DD 4A 83 25 35 7D AF FB A5 B4 5F 4E 29 FB B1 4B 94 CD EF BE BA 56 AC E5 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 78 AD B9 AF"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 4E 36 35 C4 85 E0 5B C4 62 18 92 41 00 00 00 00 20 51 83 F4 D4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 99 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 C5 14 06 00 73 A0 04 00 40 B6 7F 00 8F D8 77 00 3C A8 1E 00 6C D2 CF 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Toyota Celica 'Marcus'": [
      {
        "off": 22640,
        "hex": "CD 0F 72 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 60 EC 5A 54 BA 10 DA 84 D9 F2 5D CE 7A FF 0C C6 00 00 00 00 00 00 00 00 B4 EF C7 AC 4D 02 DB DC CF 23 D8 A8 32 A4 EF A6 00 D1 7F 84 9A 8B 0D 47 F3 69 F7 46 76 85 F0 45 88 4B 60 63 9E 40 01 91 B2 F1 E9 BE 9A AB 74 65 DD CF F0 A9 10 93 79 E8 2C 1D DE FE 3F 8A 10 DB 90 C7 D2 E1 23 81 9A 1C 00 00 00 00 00 00 00 00 ED 9D 06 77 B7 7D 1A AE 97 86 57 C6 D3 64 94 5B D3 72 8A DC D3 72 8A DC 00 00 00 00 35 C6 56 4D 68 8E A3 53 CB 6A B4 AC 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 8E 5B 1E 02 7F 95 36 0F 80 9D 7C ED E2 04 08 BC 15 65 BA 98 D2 DD 4A 83 25 35 7D AF 7C 91 D0 35 EF 84 94 4B 2C 5C 2C 55 BF 7E 8E BD 54 F9 6E 3C 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 78 AD B9 AF"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 A0 3F 9F C4 9E 1F 1A C4 68 47 A0 41 00 00 00 00 00 55 A3 1C E2 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 8F D8 77 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 D0 41 02 00 D0 BA 06 00 FC 67 6E 00 E4 44 7E 00 11 23 8F 00 D1 FE DC 00 00 00 00 00 00 00 00 00 22 C7 D2 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Toyota Supra": [
      {
        "off": 22640,
        "hex": "D7 9B 66 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 8A C4 B8 03 24 93 97 92 C3 66 2A 84 24 9E C5 A4 00 00 00 00 00 00 00 00 9E 19 BC 46 35 18 AA B0 85 E2 70 0B 5C 81 71 04 3A 65 BF 46 C4 F2 86 1F 1D D1 70 1F 4E E2 FA CA E6 C5 17 ED BA 9B B8 0B ED 52 99 5F 52 EE 71 A7 CE 21 0A CC 21 23 BD 4D DD 5F 83 34 10 23 5E C5 21 F8 91 5F D4 C3 3F 52 00 00 00 00 00 00 00 00 57 0F 71 28 61 1C D3 8C 7D 03 4D 3A 7D 03 4D 3A 8D 9A C3 3B 8D 9A C3 3B 00 00 00 00 DF 64 0F 2C 68 8E A3 53 75 09 6D 8B 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 78 B4 76 EF 69 38 26 15 2A 8B 2E FD 0C 80 2E 28 7F 45 B0 89 BC 80 3A 89 4F 35 61 73 A5 58 99 AC 38 31 76 9B B5 3E 2A 24 68 B2 48 6C 3D DB AF 9E 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 62 8D 7F 74"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 94 32 35 C4 61 E0 5B C4 02 10 92 41 00 00 00 00 20 51 81 DD D4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 99 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 99 B2 00 00 47 3E 04 00 A6 02 7F 00 CF 24 77 00 49 6C 12 00 79 96 C3 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Toyota Trueno AE86 (Corolla)": [
      {
        "off": 22640,
        "hex": "14 1F 10 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 EB 13 7C F7 25 A7 08 82 84 E8 35 5D C5 6B 97 A3 00 00 00 00 00 00 00 00 5F 6A A6 20 16 81 DE C7 85 E2 70 0B 3D 99 1F BE FB B5 A9 20 A5 5B BB 36 FE 39 A5 36 6F 07 ED 80 E7 4A D9 EA 1B 8D C8 06 6E 70 A7 BC 73 13 64 5D 2F 13 1A C7 A2 40 CB AA FE 15 D5 BC 51 9D E6 57 22 EE 84 A9 F5 79 91 DA 00 00 00 00 00 00 00 00 D8 2C 7F 85 02 EA A4 8B 1E D1 1E 39 1E D1 1E 39 2E 68 95 3A 2E 68 95 3A 00 00 00 00 80 32 E1 2A 68 8E A3 53 16 D7 3E 8A 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 B9 2E FF 81 AA 63 21 91 4B D2 E0 C2 ED 8A B2 BC 80 AC B5 AE FD AB 35 05 B0 C8 C1 6E 46 48 6C 02 F9 14 A7 AB B6 16 23 04 89 8A 5C 4B A5 9A CD ED 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 23 AD E9 A0"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 25 33 35 C4 71 E0 5B C4 BE 3E 92 41 00 00 00 00 20 51 0E 4F D5 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 0F 5A 78 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 C0 ED 00 00 15 FE 04 00 A0 79 82 00 1F 9B 7A 00 F2 BA 0C 00 49 08 E5 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Toyota Corolla 'DAVID CHOE' (SPONSOR)": [
      {
        "off": 22640,
        "hex": "14 1F 10 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 EB 13 7C F7 25 A7 08 82 0E 91 C6 7D 0F 2B 10 95 00 00 00 00 00 00 00 00 5F 6A A6 20 16 81 DE C7 87 E2 70 0B 3D 99 1F BE C7 EB ED 15 A5 5B BB 36 85 13 0C 90 D3 85 F0 45 E7 4A D9 EA AC CC A1 FE 1C 36 3A 3B C0 0C C5 66 2F 13 1A C7 A2 40 CB AA FE 15 D5 BC 51 9D E6 57 22 EE 84 A9 F5 79 91 DA 00 00 00 00 00 00 00 00 D8 2C 7F 85 02 EA A4 8B 1E D1 1E 39 1E D1 1E 39 2D 6C B5 71 2D 6C B5 71 00 00 00 00 D5 65 55 26 68 8E A3 53 16 D7 3E 8A 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 B9 2E FF 81 AA 63 21 91 4B D2 E0 C2 ED 8A B2 BC 80 AC B5 AE FD AB 35 05 B0 C8 C1 6E 46 48 6C 02 F9 14 A7 AB B6 16 23 04 89 8A 5C 4B 3D DB AF 9E 66 FB 07 75 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 23 AD E9 A0"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 BC E3 C0 C3 D4 4C 15 42 15 54 61 41 00 00 00 00 00 5A 04 59 82 45 01 01 00 01 01 01"
      },
      {
        "off": 49872,
        "hex": "E3 FC B8 EC 93 F4 00 00 00 00 00 01 00 00 00 9E"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 3C F1 04 00 26 A2 4D 00 DC 95 FE 00 6C 8A FE 00 A7 19 3C 00 F8 B0 90 04 03 6C 08 01 F2 22 66 03 C6 E3 82 04 2E EB 20 04 6D FE 1C"
      }
    ],
    "Ford Focus": [
      {
        "off": 22640,
        "hex": "D3 1B 2F 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 DF 04 CA 02 99 50 B7 B4 F8 0C 36 CC B9 D1 2A 80 00 00 00 00 00 00 00 00 D3 5A 53 31 0A 80 29 EE 85 E2 70 0B 31 E4 24 B0 6F A6 56 31 99 5A 06 5D F2 38 F0 5C 63 93 F3 65 5B 28 84 DA 0F E6 A1 47 E2 E7 AB 18 67 9F 6A 42 23 6C F3 07 16 B8 CF 06 F2 55 D2 DF C5 DB 8B DA 96 FF 1F D9 E9 B9 8E FD 00 00 00 00 00 00 00 00 4C A4 83 E1 F6 4F 38 68 12 37 B2 15 12 37 B2 15 22 CE 28 17 22 CE 28 17 00 00 00 00 74 98 74 07 68 8E A3 53 0A 3D D2 66 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 27 4F E0 D3 18 12 9B CF F9 6A 87 CC 1B 20 DF 08 6E E7 74 80 6B 5A AF 43 DE 44 71 7C F4 87 EB 39 67 4A 0E D3 A4 5F 2D A2 37 F1 AF AA 4F F9 6E 3C 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 91 AA A6 55"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 A7 32 35 C4 05 E0 5B C4 27 AD 91 41 00 00 00 00 20 51 AD ED 04 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 00 00 00 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 96 A2 06 00 88 6C 04 00 A6 67 20 00 75 67 20 00 A0 51 43 00 59 43 3D 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Ford Mustang GT": [
      {
        "off": 22640,
        "hex": "40 CB 8E 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 19 58 16 35 13 B8 FA 59 F2 01 EC 77 73 0F 19 6E 00 00 00 00 00 00 00 00 CD F5 88 DA 44 7A 12 BE 85 E2 70 0B 6B 44 7C 0A 69 41 8C DA D3 54 EF 2C 2C 33 D9 2C 1D 04 04 D4 D5 69 8C A7 49 6D 91 7B 5C 56 8C CA 21 10 7B B0 5D F3 E2 3B 90 26 B0 B8 AC E0 BC 71 BF BD C7 A9 10 1B 27 4A A3 44 79 8F 00 00 00 00 00 00 00 00 C6 12 64 93 B0 8D 26 56 CC 74 A0 03 CC 74 A0 03 DC 0B 17 05 DC 0B 17 05 00 00 00 00 2E D6 62 F5 68 8E A3 53 C4 7A C0 54 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 2D 6D A4 04 1E D6 87 D4 3F C6 48 39 E1 F1 E4 5C F4 F1 34 55 71 1E 9C 48 A4 89 F6 1E 3A 16 D5 92 6D A1 29 49 2A 90 7A 0C 7D 32 A3 5E E5 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 97 69 37 89"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 4E CD 35 C4 05 E0 5B C4 16 15 91 41 00 00 00 00 20 51 FA BA 04 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 00 00 00 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 78 E4 00 00 75 6C 04 00 D8 E0 6F 00 B7 D4 6F 00 46 5F 1A 00 0C 63 A9 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Ford Mustang GT 'Nikki'": [
      {
        "off": 22640,
        "hex": "40 CB 8E 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 19 58 16 35 13 B8 FA 59 F2 01 EC 77 73 0F 19 6E 00 00 00 00 00 00 00 00 CD F5 88 DA 86 CB BC C2 85 E2 70 0B 6B 44 7C 0A 56 33 F6 D4 D3 54 EF 2C 2C 33 D9 2C 97 85 F0 45 21 B6 F8 F7 35 8E EA D9 CB 00 78 68 C0 0C C5 66 B6 44 4E C6 09 A3 85 90 C5 10 A0 D0 F8 F0 10 E5 09 2C E8 D0 BC 74 5C EE 00 00 00 00 00 00 00 00 C6 12 64 93 B0 8D 26 56 97 86 57 C6 CC 74 A0 03 EC 9B 97 DC EC 9B 97 DC 00 00 00 00 2E D6 62 F5 68 8E A3 53 C4 7A C0 54 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 75 73 07 10 08 A6 A7 6C 85 27 8C 07 38 B5 E7 BB 54 F9 6E 3C 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 00 00 00 00"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 3E 53 9E C4 3F EF 19 C4 DF 20 9F 41 00 00 00 00 E0 6B 94 F8 21 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 B7 D4 6F 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 98 9D 02 00 21 E3 06 00 30 8B 27 00 FE F7 76 00 B0 A1 2B 00 B1 F0 B9 00 00 00 00 00 00 00 00 00 96 69 AC 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Peugeout 106 (EU ONLY)": [
      {
        "off": 22640,
        "hex": "CB 93 34 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 0A 07 10 4B A4 65 5C 27 43 99 AD 5B A4 80 6C 27 00 00 00 00 00 00 00 00 1E CC 74 21 B5 1A 79 E2 85 E2 70 0B DC 03 A6 D2 BA 17 78 21 44 F5 55 51 9D D3 3F 51 CE 84 94 AC 66 18 C7 58 3A DE 44 BA 6D E5 AD DF D2 90 0B 89 4E 64 96 7A A1 B5 D1 CD 5D 82 D7 9C 90 95 36 38 A1 CA AB 24 54 E6 93 BA 00 00 00 00 00 00 00 00 D7 A1 85 A8 E1 FE 79 0F FD E5 F3 BC FD E5 F3 BC 0D 7D 6A BE 0D 7D 6A BE 00 00 00 00 5F 47 B6 AE 68 8E A3 53 F5 EB 13 0E 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 F8 26 4F 62 E9 2A 89 88 AA 2D BD 3E 8C 82 B2 38 FF 97 B4 AA 3C 73 9D FC CF 77 22 53 25 3B B5 81 B8 63 0E 14 35 11 99 23 E8 D4 91 59 89 9A CD ED 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 E2 BF ED 34"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 DF CC 35 C4 FA E0 5B C4 A6 2B 91 41 00 00 00 00 20 51 2E 20 C2 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 00 00 00 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 14 B7 07 00 D0 FB 04 00 9B EC 05 00 7E EC 05 00 CE 4D 0A 00 71 2B 06 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Peugeout 206": [
      {
        "off": 22640,
        "hex": "35 B2 44 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 13 E5 B2 72 4D 71 78 52 AC 58 A8 A3 ED 76 E8 5F 00 00 00 00 00 00 00 00 87 32 5F C3 3E 4E B0 C1 85 E2 70 0B 65 BE 2A AD 23 7E 62 C3 CD 28 8D 30 26 07 77 30 97 BE 66 36 0F BD E4 1E 43 AE 8C 01 96 B6 EF 0F 9B CA DD 12 57 34 DE C1 CA 86 13 FE 26 75 87 03 79 E1 E4 74 4A 08 54 56 1D D9 43 21 00 00 00 00 00 00 00 00 00 73 C7 D8 2A F5 F5 47 46 DC 6F F5 46 DC 6F F5 56 73 E6 F6 56 73 E6 F6 00 00 00 00 A8 3D 32 E7 68 8E A3 53 3E E2 8F 46 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 E1 72 FD 9E D2 4F 95 0D 73 D9 F3 FC 15 A8 89 A4 A8 6E 70 91 25 98 A9 81 D8 39 B3 79 6E A3 7E 8F 21 D5 04 DB DE 80 F1 81 B1 39 F8 82 E5 2E 39 2D 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 4B CD 10 4B"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 AD 33 35 C4 73 E0 5B C4 38 08 92 41 00 00 00 00 20 51 A4 8D D6 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 99 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 79 EA 00 00 62 EE 04 00 29 C3 68 00 75 F0 78 00 BE 79 02 00 D4 4D D7 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Opel Corsa (EU ONLY)": [
      {
        "off": 22640,
        "hex": "BC 5C 30 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 D7 FA 93 02 91 C1 81 BC F0 CF B6 1A B1 15 A3 DF 00 00 00 00 00 00 00 00 CB A5 9C 75 02 2A 9C BB 85 E2 70 0B 29 16 69 CF 67 F1 9F 75 91 04 79 2A EA E2 62 2A 5B 9B B8 5A 53 11 4C 56 07 CC C8 81 DA 8C AF 97 5F A7 2F 37 1B 52 1A 42 0E 5D D3 85 EA D5 3B 09 BD 5A 25 31 8E 60 DD CA E1 39 F8 26 00 00 00 00 00 00 00 00 44 49 87 60 EE 93 B0 C7 0A 7B 2A 75 0A 7B 2A 75 1A 12 A1 76 1A 12 A1 76 00 00 00 00 6C DC EC 66 68 8E A3 53 02 81 4A C6 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 25 EC 3D 5B 16 CD 4C CC 37 BE 4E 50 D9 8B 9C E7 EC CA DF 36 69 15 61 40 9C 5F 5A 0F 32 4A 86 2B 65 54 01 F8 22 E1 0A D0 75 A2 3D 94 93 43 EE 98 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 8F 3C 41 E7"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 DB 80 35 C4 EA E0 5B C4 76 FA 90 41 00 00 00 00 20 51 CB 2E C1 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 00 00 00 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 8D 0E 08 00 97 F4 04 00 3E E5 05 00 28 E5 05 00 5A 23 0C 00 BA 60 06 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Volkswagen Golf": [
      {
        "off": 22640,
        "hex": "C9 2B 51 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 87 30 16 00 41 05 39 B7 A0 C7 82 FC 61 D7 F6 D6 00 00 00 00 00 00 00 00 7B ED 83 C7 B2 67 6C 4A 85 E2 70 0B D9 A3 6E 89 17 39 87 C7 41 42 49 B9 9A 20 33 B9 0B 05 8F DE 03 05 24 BF B7 61 E0 54 8A D8 B9 CD 0F 11 06 BB CB E7 31 15 BE A8 DD BB 9A EF F8 22 6D AA 85 82 3E 04 86 4F 91 53 B5 40 00 00 00 00 00 00 00 00 F4 94 91 96 9E 55 04 BF BA 3C 7E 6C BA 3C 7E 6C CA D3 F4 6D CA D3 F4 6D 00 00 00 00 1C 9E 40 5E 68 8E A3 53 B2 42 9E BD 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 D5 3B 9E AC C6 CC 19 FA E7 87 A2 13 89 29 12 F7 9C 1E 09 35 19 15 2E 6E 4C 55 C7 F6 E2 6B 07 A2 15 AC A6 3E D2 E4 64 55 25 1C D8 C4 4F F9 6E 3C 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 FA 26 AF 42"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 A9 32 35 C4 62 E0 5B C4 16 63 92 41 00 00 00 00 20 51 90 DA D4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 99 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 14 1E 06 00 C2 A9 04 00 88 EB 7E 00 D7 0D 77 00 9B 51 10 00 CB 9A C1 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Audi TT": [
      {
        "off": 22640,
        "hex": "A0 C7 84 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 E7 06 00 00 A1 D7 A7 20 00 42 42 21 C1 85 80 8A 00 00 00 00 00 00 00 00 DB 07 1F 2F 12 CE 6A A5 85 E2 70 0B 39 AA 1C 7D 77 53 22 2F A1 A8 47 14 FA 86 31 14 6B 83 C0 F2 63 37 EF 79 17 F8 6A 3B EA 3A 97 85 6F 8F 37 CF 2B 7E BC FB 1E 0B BB 73 FA CD 72 C6 CD 54 3B 95 9E 96 0D A2 F1 31 2F E4 00 00 00 00 00 00 00 00 54 F7 6E 4E FE 03 8E 72 1A EB 07 20 1A EB 07 20 2A 82 7E 21 2A 82 7E 21 00 00 00 00 7C 4C CA 11 68 8E A3 53 12 F1 27 71 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 35 E6 53 BF 26 D7 83 43 47 C6 C4 B8 E9 4F D1 6F FC 10 AD C5 79 1F 98 B7 AC AB 72 6D 42 DA E1 70 75 E6 CE E8 32 37 85 2A 85 BA 02 3E 4F F9 6E 3C 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 78 AD B9 AF"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 6E 62 35 C4 40 21 5B C4 0C 9A 91 41 00 00 00 00 20 51 76 A3 D4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 99 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 23 0F 03 00 D1 9A 44 00 08 3D 7D 00 57 5F 75 00 E9 93 05 00 19 BE B6 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Audi TT 'Scott'": [
      {
        "off": 22640,
        "hex": "A0 C7 84 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 E7 06 00 00 A1 D7 A7 20 A4 5C 4A 76 EB 14 18 90 00 00 00 00 00 00 00 00 DB 07 1F 2F 12 CE 6A A5 2B 3A BF 1E 39 AA 1C 7D 68 A3 AD B0 A1 A8 47 14 E3 41 45 68 B1 85 F0 45 2F 1F 45 EE E5 C6 74 55 78 E3 DA E0 C0 0C C5 66 2B 7E BC FB 1E 0B BB 73 FA CD 72 C6 CD 54 3B 95 9E 96 0D A2 F1 31 2F E4 00 00 00 00 00 00 00 00 54 F7 6E 4E FE 03 8E 72 97 86 57 C6 1A EB 07 20 EC 9B 97 DC EC 9B 97 DC 00 00 00 00 7C 4C CA 11 68 8E A3 53 12 F1 27 71 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 35 E6 53 BF 26 D7 83 43 47 C6 C4 B8 E9 4F D1 6F FC 10 AD C5 79 1F 98 B7 AC AB 72 6D 42 DA E1 70 75 E6 CE E8 32 37 85 2A 85 BA 02 3E 54 F9 6E 3C 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 00 00 00 00"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 CC 8D 9E C4 62 C5 1A C4 D3 DB 9F 41 00 00 00 00 80 31 50 23 E7 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 57 5F 75 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 33 C5 02 00 4C 38 47 00 3E DC 70 00 81 67 7E 00 7A D9 45 00 6B CD CA 00 00 00 00 00 00 00 00 00 1F AA BB 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Audi A3": [
      {
        "off": 22640,
        "hex": "6F FC 89 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 53 04 00 00 8D 18 1B 1D EC AF 3E CC 2D E6 70 97 00 00 00 00 00 00 00 00 C7 49 B2 FB 7E 4D 66 04 85 E2 70 0B A5 7D 75 4E 63 95 B5 FB 0D 28 43 73 66 06 2D 73 D7 8D 99 FE 4F A4 5A B8 83 4D B0 A1 D6 3D 87 B4 DB 99 10 DB 97 D3 01 62 0A 0E AB A2 66 84 35 9C B9 D8 54 23 8A 2F DD FD 5D E8 F1 B9 00 00 00 00 00 00 00 00 40 FA 5E 7D 6A 64 7E 7F 86 4B F8 2C 86 4B F8 2C 96 E2 6E 2E 96 E2 6E 2E 00 00 00 00 E8 AC BA 1E 68 8E A3 53 7E 51 18 7E 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 21 6A 6D 4D 12 87 28 EB B3 28 5D CD 55 27 D6 6F E8 D5 4C C6 65 CF 3C 5F 18 59 AD 09 AE 92 7D 06 61 AC E1 31 1E 28 61 03 F1 C8 5C 32 B1 43 EE 98 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 8B A4 60 02"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 8D 31 35 C4 5E 20 5B C4 43 32 92 41 00 00 00 00 60 80 C9 01 FD 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 30 3E 7C 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 38 6F 00 00 2E 33 08 00 DF 89 7B 00 1F 08 8B 00 C2 ED 2C 00 83 84 FE 00 00 00 00 00 E2 98 D9 00 0E D5 D3 00 00 64 0E 14 BC D4 81"
      }
    ],
    "Hyundai Tiburon GT": [
      {
        "off": 22640,
        "hex": "34 82 4F 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 22 05 FD 04 BC F2 13 AB 5B 30 CA 39 BC 94 46 AA 00 00 00 00 00 00 00 00 36 CB 57 5D CD FC BB 9A 85 E2 70 0B F4 4D 94 98 D2 16 5B 5D 5C D7 98 09 B5 B5 82 09 E6 4C 18 81 7E 3D 66 19 52 0C DB BE 85 D6 09 77 EA 58 8F 5D 66 92 2C 7F B9 A6 2D 65 75 E2 4D 68 A8 F8 78 72 B9 87 4A FC 6C 46 0A 86 00 00 00 00 00 00 00 00 EF 92 E1 3F F9 12 54 92 15 FA CD 3F 15 FA CD 3F 25 91 44 41 25 91 44 41 00 00 00 00 77 5B 90 31 68 8E A3 53 0D 00 EE 90 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 10 8A 91 9C 01 26 29 F0 C2 25 3E B6 A4 94 E6 52 17 ED 6A 0B 54 6E 3D 64 E7 D5 C1 AE 3D 7F A4 42 D0 2A E6 F2 4D FE 7E 17 00 65 35 CA 3A DB AF 9E 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 FA 26 AF 42"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 AD 33 35 C4 73 E0 5B C4 6D 96 92 41 00 00 00 00 20 51 7D FF D4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 99 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 40 A0 00 00 EE 2B 04 00 00 0C 80 00 4F 2E 78 00 30 61 25 00 60 8B D6 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Pontiac GTO": [
      {
        "off": 22640,
        "hex": "89 82 97 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 C9 AC 00 00 C3 7A 05 13 A2 B8 BD 9C 23 B0 36 6F 00 00 00 00 00 00 00 00 7D FC 26 41 F4 56 71 F8 85 E2 70 0B 1B 71 E1 36 19 48 2A 41 83 31 4E 67 DC 0F 38 67 CD CC 8C 21 85 DC C6 2D F9 21 6F 4E 0C A1 20 F9 D1 D8 03 FE 0D A8 C0 0E 40 71 44 E7 5C 59 1B 15 6F 4C F5 B8 C0 3D 41 EA 53 BD D7 32 00 00 00 00 00 00 00 00 76 5D F8 C1 60 2E 44 57 7C 15 BE 04 7C 15 BE 04 8C AC 34 06 8C AC 34 06 00 00 00 00 DE 76 80 F6 68 8E A3 53 74 1B DE 55 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 D7 DD 0D E3 C8 50 04 D8 A9 93 6B 58 CB 5C 41 73 1E BA 1E 37 1B 99 18 4C 8E 59 02 92 A4 88 14 F8 17 61 57 56 54 E2 16 1C E7 C9 C9 61 E5 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 41 01 C1 5E"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 4E CD 35 C4 05 E0 5B C4 02 DB 91 41 00 00 00 00 20 51 9F 0C D3 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 00 00 00 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 D9 70 00 00 D6 F8 41 00 98 D2 70 00 77 C6 70 00 5B 83 20 00 21 87 AF 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Pontiac GTO 'The doors' (SPONSOR)": [
      {
        "off": 22640,
        "hex": "89 82 97 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 C9 AC 00 00 C3 7A 05 13 CA B9 C6 DE 4B 2C 10 D6 00 00 00 00 00 00 00 00 7D FC 26 41 F4 56 71 F8 11 EB BB 11 1B 71 E1 36 73 22 38 FE 83 31 4E 67 04 8E 51 6E FB B5 53 09 D1 94 9A F6 C9 5B E4 44 3D 72 30 EF 9A AB 74 65 0D A8 C0 0E 40 71 44 E7 5C 59 1B 15 6F 4C F5 B8 C0 3D 41 EA 53 BD D7 32 00 00 00 00 00 00 00 00 76 5D F8 C1 60 2E 44 57 97 86 57 C6 7C 15 BE 04 41 A9 90 57 41 A9 90 57 00 00 00 00 DC 88 D8 2D 68 8E A3 53 74 1B DE 55 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 D7 DD 0D E3 C8 50 04 D8 A9 93 6B 58 CB 5C 41 73 1E BA 1E 37 1B 99 18 4C 8E 59 02 92 A4 88 14 F8 17 61 57 56 54 E2 16 1C E7 C9 C9 61 E6 2E 39 2D A7 A1 6D 5D 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 41 01 C1 5E"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 1E 49 9E C4 F4 3F 1A C4 C9 32 9F 41 00 00 00 00 C0 51 E4 1D E5 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 77 C6 70 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 6E F3 02 00 D4 C4 44 00 99 DF 6F 00 A3 98 79 00 EA 41 7B 00 F3 BE F2 00 00 00 00 00 00 00 00 00 AB 8F B2 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Pontiac GTO (Final Boss)": [
      {
        "off": 22640,
        "hex": "89 82 97 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 C9 AC 00 00 C3 7A 05 13 29 80 86 A3 CC 35 6F 25 00 00 00 00 00 00 00 00 7D FC 26 41 F4 56 71 F8 89 E2 70 0B 1B 71 E1 36 23 2C 31 54 83 31 4E 67 E5 62 93 5A 6F 85 F0 45 D1 94 9A F6 47 F1 2A 3A 7B B7 49 8D 9A AB 74 65 0D A8 C0 0E 40 71 44 E7 5C 59 1B 15 6F 4C F5 B8 C0 3D 41 EA 53 BD D7 32 00 00 00 00 00 00 00 00 76 5D F8 C1 60 2E 44 57 97 86 57 C6 7C 15 BE 04 EC 9B 97 DC EC 9B 97 DC 00 00 00 00 DE 76 80 F6 68 8E A3 53 74 1B DE 55 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 D7 DD 0D E3 C8 50 04 D8 A9 93 6B 58 CB 5C 41 73 1E BA 1E 37 1B 99 18 4C C6 9E FC 80 A4 88 14 F8 17 61 57 56 54 E2 16 1C E7 C9 C9 61 54 F9 6E 3C 95 98 07 B7 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 41 01 C1 5E"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 9C 5A C0 C3 DB DC 1D 42 09 46 62 41 00 00 00 00 A0 86 3A 7A F9 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "E3 FC B8 77 C6 70 00 00 01 01 01 01 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 20 14 03 00 3A E5 44 00 AF D0 79 00 B9 89 83 00 16 09 33 00 CE 3C E0 00 00 00 00 00 A2 91 BF 00 A0 93 B4 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Mazda RX7": [
      {
        "off": 22640,
        "hex": "6E 4E 98 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 00 DC 00 00 5A C4 C6 35 79 7E AC AA 1A 97 E8 86 00 00 00 00 00 00 00 00 54 DB 94 73 AB 10 9B 78 85 E2 70 0B D2 63 44 8D F0 26 98 73 3A EB 77 E7 93 C9 61 E7 44 D0 0B 53 1C CD 27 B3 30 DF BC DB 23 05 26 30 48 DC 82 2F 44 65 0E 9C 57 D5 49 1E D3 E3 C5 F0 C6 25 F1 09 57 D5 F8 2E CA 47 82 0E 00 00 00 00 00 00 00 00 8D C1 FD F8 57 15 F6 6E 73 FC 6F 1C 73 FC 6F 1C 83 93 E6 1D 83 93 E6 1D 00 00 00 00 D5 5D 32 0E 68 8E A3 53 6B 02 90 6D 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 2E B7 09 34 1F 91 13 06 20 A5 D8 78 82 A4 7D 93 B5 F8 E3 5E 72 D9 27 7A C5 A4 F9 81 9B 7D 0B C3 EE F4 2C 80 EB C7 A0 11 5E 62 90 08 AA 9A CD ED 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 18 F9 A4 78"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 9C DE 34 C4 C6 B3 5C C4 9A 46 91 41 00 00 00 00 C0 42 FD 18 FB 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 30 3E 7C 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 0B 67 04 00 01 2B 0C 00 34 9B 7A 00 74 19 8A 00 64 31 27 00 25 C8 F8 00 00 00 00 00 E2 98 D9 00 0E D5 D3 00 00 64 0E 14 BC D4 81"
      }
    ],
    "Mazda RX8": [
      {
        "off": 22640,
        "hex": "C7 44 8D 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 01 DC 00 00 FB EC 1B 38 DA AC D3 76 5B FD C2 37 00 00 00 00 00 00 00 00 B5 38 88 A4 2C 1A FA C7 85 E2 70 0B 53 7C 56 8D 51 84 8B A4 BB F4 D6 36 14 D3 C0 36 05 3E 53 F6 BD 06 68 EE 31 C1 96 6E 44 27 3C 1E 09 4A CA D2 45 47 E8 2E 78 F7 5F 0C 94 82 FB B8 A7 9C DA D8 F8 1F A5 A1 8B E6 B7 D6 00 00 00 00 00 00 00 00 AE E3 13 E7 98 7B D0 1F B4 62 4A CD B4 62 4A CD C4 F9 C0 CE C4 F9 C0 CE 00 00 00 00 16 C4 0C BF 68 8E A3 53 AC 68 6A 1E 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 0F 2E F3 02 00 59 72 6B E1 74 9D 45 03 90 99 69 56 54 7D F8 53 A1 86 DF C6 68 31 93 DC 45 44 01 4F C5 7E 85 8C 34 A8 B2 1F 63 85 CA E6 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 79 85 A5 78"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 6E 62 35 C4 40 21 5B C4 8D B9 91 41 00 00 00 00 20 51 87 48 D4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 D4 6F 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 C4 BA 00 00 F6 DD 41 00 A0 76 7A 00 B7 99 72 00 2F 25 42 00 3E 01 B4 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Mazda RX8 'AI'": [
      {
        "off": 22640,
        "hex": "C7 44 8D 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 01 DC 00 00 FB EC 1B 38 DA AC D3 76 5B FD C2 37 00 00 00 00 00 00 00 00 B5 38 88 A4 6E 6B A4 CC A7 E2 70 0B 53 7C 56 8D 21 4A D1 22 BB F4 D6 36 14 D3 C0 36 D9 85 F0 45 09 2D 2F 64 7F 3E B7 02 B3 AB 5F 67 9A AB 74 65 9E 15 FE 19 F1 90 2F 5A AD EF B2 FF E0 AC 7F F6 F1 CD 26 18 A4 53 6F 1D 00 00 00 00 00 00 00 00 AE E3 13 E7 98 7B D0 1F 97 86 57 C6 B4 62 4A CD EC 9B 97 DC EC 9B 97 DC 00 00 00 00 16 C4 0C BF 68 8E A3 53 AC 68 6A 1E 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 0F 2E F3 02 00 59 72 6B E1 74 9D 45 03 90 99 69 56 54 7D F8 53 A1 86 DF C6 68 31 93 5D 31 60 D7 F0 20 18 1F 6D FC 06 18 20 27 BD DB 54 F9 6E 3C 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 79 85 A5 78"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 63 D5 9D C4 4A 91 1A C4 DD DC 9D 41 00 00 00 00 40 67 85 8E E1 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 B7 99 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 C8 42 02 00 08 F9 43 00 97 22 6E 00 A1 14 79 00 A8 6E 7D 00 E2 D8 C1 00 00 00 00 00 00 00 00 00 56 00 B7 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Mazda Miata MX5": [
      {
        "off": 22640,
        "hex": "40 C9 33 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 6B 5D 45 03 A5 E0 9B C6 04 C2 2F 32 45 15 FC 6B 00 00 00 00 00 00 00 00 DF C3 1E 7C 96 0A 62 92 85 E2 70 0B BD A2 71 B8 7B 0F 22 7C 25 E5 3E 01 7E C3 28 01 EF F0 78 FA 67 04 CE 05 9B D6 F4 12 EE E9 5C 4E F3 FC EF D6 AF 5C 46 D3 22 BA 80 3C 7E 7F 72 12 D1 36 31 61 A2 27 5B A4 75 E3 2E 30 00 00 00 00 00 00 00 00 58 A6 34 17 82 93 09 54 9E 7A 83 01 9E 7A 83 01 AE 11 FA 02 AE 11 FA 02 00 00 00 00 00 DC 45 F3 68 8E A3 53 96 80 A3 52 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 39 C8 49 8B 2A 7D 2D E2 CB BB 0F AE 6D 14 19 34 00 66 ED 12 7D C5 41 56 30 12 51 E1 C6 F1 F3 55 79 EE 23 70 36 50 3C DB 09 F4 9C 05 8A 9A CD ED 00 00 00 00 00 00 00 00"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 D7 DD 0D E3 C8 50 04 D8 A9 93 6B 58 CB 5C 41 73 1E BA 1E 37 1B 99 18 4C 8E 59 02 92 A4 88 14 F8 17 61 57 56 54 E2 16 1C E7 C9 C9 61 E5 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 A3 86 60 2C"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 4D 32 35 C4 6A E0 5B C4 1E 38 92 41 00 00 00 00 20 51 70 39 D5 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 00 00 00 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 C2 C5 00 00 17 D6 04 00 B8 D0 81 00 37 F2 79 00 5B 1D 08 00 B2 6A E0 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Lexus IS 300": [
      {
        "off": 22640,
        "hex": "15 0E 6A 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 EE 36 02 03 08 24 DC 5C A7 B6 C8 8E 88 81 27 E3 00 00 00 00 00 00 00 00 82 C5 0A 05 99 40 CE 38 85 E2 70 0B C0 85 35 96 1E 11 0E 05 28 1B AB A7 81 F9 94 A7 B2 B3 CA EC CA FA C0 79 1E 56 C2 E0 D1 59 DA D5 B6 BF 41 C9 32 DC 13 A1 05 2A FE C3 41 55 30 CE F4 C4 A9 94 05 D1 03 8B 38 B9 EC EB 00 00 00 00 00 00 00 00 3B 16 B2 9E C5 FF 34 CB E1 E6 AE 78 E1 E6 AE 78 F1 7D 25 7A F1 7D 25 7A 00 00 00 00 43 48 71 6A 68 8E A3 53 D9 EC CE C9 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 5C 56 C2 BE 4D 7E 57 01 8E A4 9C 1B 70 F0 BE E0 63 C2 4E 54 A0 C6 6B 75 B3 37 BB E5 09 84 7D 1D 1C C9 DF 28 99 5F 59 B2 CC EF 5B C0 0B 2F 39 2D 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 46 95 E2 59"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 A7 2F 35 C4 7A 13 5C C4 16 46 91 41 00 00 00 00 20 74 79 DE D7 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 DF 73 77 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 D6 9A 01 00 7A F1 05 00 A1 67 69 00 24 E6 78 00 18 9E 03 00 A0 33 CE 00 00 00 00 00 00 00 00 00 00 00 00 00 00 64 0E 14 BC D4 81"
      }
    ],
    "Lexus IS 300 'SHINE' (SPONSOR)": [
      {
        "off": 22640,
        "hex": "15 0E 6A 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 EE 36 02 03 08 24 DC 5C AF 83 CA 68 90 CD 1F 5E 00 00 00 00 00 00 00 00 82 C5 0A 05 99 40 CE 38 85 E2 70 0B C0 85 35 96 B0 B7 1E 48 28 1B AB A7 89 DF 66 0F 5D 2A 20 09 56 58 95 29 C8 95 3F 44 1F 58 61 4E 9A AB 74 65 32 DC 13 A1 05 2A FE C3 41 55 30 CE F4 C4 A9 94 05 D1 03 8B 38 B9 EC EB 00 00 00 00 00 00 00 00 3B 16 B2 9E C5 FF 34 CB 97 86 57 C6 E1 E6 AE 78 37 B5 E9 F3 37 B5 E9 F3 00 00 00 00 79 8F 82 16 68 8E A3 53 D9 EC CE C9 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 5C 56 C2 BE 4D 7E 57 01 8E A4 9C 1B 70 F0 BE E0 63 C2 4E 54 A0 C6 6B 75 B3 37 BB E5 09 84 7D 1D 1C C9 DF 28 99 5F 59 B2 CC EF 5B C0 0B 2F 39 2D 12 49 8A A9 F1 C8 54 C2"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 46 95 E2 59"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 9F 29 9E C4 D6 F5 1A C4 8D BF 9E 41 00 00 00 00 20 65 E8 80 F2 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 30 3E 7C 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 3B A6 02 00 31 6A 0A 00 F2 68 76 00 32 E7 85 00 C9 C7 18 00 8A 5E EA 00 00 00 00 00 E2 98 D9 00 0E D5 D3 00 00 64 0E 14 BC D4 81"
      }
    ],
    "Lincoln Navigator (SUV)": [
      {
        "off": 22640,
        "hex": "15 6E 11 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 4A C9 19 02 E4 8F 19 CA 83 B3 07 0F E4 52 CC EE 00 00 00 00 00 00 00 00 5E A6 78 6A F5 3C F8 4B 85 E2 70 0B 1C E6 46 A1 FA F1 7B 6A 84 17 D5 BA DD F5 BE BA 0E 37 65 72 A6 82 2A F2 7A 20 0B 37 AD 6F 3C F5 12 43 DC 4E 8E A6 5C F7 E1 3F 60 E3 9D 74 56 D8 D0 CF 93 E3 E1 74 F5 16 94 D8 12 F6 00 00 00 00 00 00 00 00 17 2C 14 BE 21 D1 D9 D6 3D B8 53 84 3D B8 53 84 4D 4F CA 85 4D 4F CA 85 00 00 00 00 9F 19 16 76 68 8E A3 53 35 BE 73 D5 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 38 61 AC 0D 29 A5 9C 91 EA 5F 2A DA CC 24 AE 66 3F 82 24 98 7C ED B0 05 0F 3A A5 7E 65 8D F1 98 F8 FD D4 12 75 3B 6F EE 28 47 2D 7F 05 2F 39 2D 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 22 5A DB E5"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 8D 31 35 C4 5E 20 5B C4 EC 67 92 41 00 00 00 00 60 80 EB 29 FD 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 1F 08 8B 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 0E 3B 00 00 8B 46 08 00 78 9D 7B 00 75 1B 8B 00 88 A1 02 00 E0 97 FE 00 00 00 00 00 E2 98 D9 00 0E D5 D3 00 00 64 0E 14 BC D4 81"
      }
    ],
    "AM General Hummer H2 (SUV)": [
      {
        "off": 22640,
        "hex": "70 9F 18 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 4D DD 26 61 C7 9D 72 47 A6 D2 09 DD A7 99 A5 61 00 00 00 00 00 00 00 00 81 52 8B BD 78 6D 60 01 85 E2 70 0B 9F 43 F4 28 1D 9E 8E BD 07 48 3D 70 60 26 27 70 51 94 9B 22 89 C3 98 54 7D DA 4D CE 10 6A D6 74 55 A0 12 FF 91 60 9F 8E 44 3A FA 62 E0 64 2B 10 73 C8 06 16 C4 E8 FB 6D D7 C8 E7 2D 00 00 00 00 00 00 00 00 7A 26 AE 3D E4 17 B3 49 00 FF 2C F7 00 FF 2C F7 10 96 A3 F8 10 96 A3 F8 00 00 00 00 62 60 EF E8 68 8E A3 53 F8 04 4D 48 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 DB 59 1F 40 CC 90 C3 CE 2D E3 80 CC 4F FB F4 EB 22 29 46 C6 1F D9 D7 42 12 9A A9 60 28 FA 8D 0D 1B 03 FF 1A 58 15 2F A9 6B 5D E8 91 E5 BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 45 93 C1 10"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 2F 4A 35 C4 9E E0 5B C4 E9 86 90 41 00 00 00 00 20 51 B0 21 D5 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 0F 5A 78 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 6A E3 00 00 BF F3 04 00 30 17 81 00 AF 38 79 00 2A 13 05 00 81 60 DD 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "AM General Hummer H2 'Capone' ": [
      {
        "off": 22640,
        "hex": "70 9F 18 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 4D DD 26 61 C7 9D 72 47 4D CE D9 4B 6E 3C 01 65 00 00 00 00 00 00 00 00 81 52 8B BD 78 6D 60 01 85 E2 70 0B 9F 43 F4 28 D1 14 9E 33 07 48 3D 70 E7 FF 8D C9 51 94 9B 22 D5 4C 82 19 7D DA 4D CE 10 6A D6 74 9A AB 74 65 91 60 9F 8E 44 3A FA 62 E0 64 2B 10 73 C8 06 16 C4 E8 FB 6D D7 C8 E7 2D 00 00 00 00 00 00 00 00 7A 26 AE 3D E4 17 B3 49 97 86 57 C6 00 FF 2C F7 3D 52 8E 83 3D 52 8E 83 00 00 00 00 79 D7 C3 43 68 8E A3 53 F8 04 4D 48 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 DB 59 1F 40 CC 90 C3 CE 2D E3 80 CC 4F FB F4 EB 22 29 46 C6 1F D9 D7 42 12 9A A9 60 28 FA 8D 0D 1B 03 FF 1A 58 15 2F A9 6B 5D E8 91 E3 BD BC B8 0F 49 8A A9 D5 D6 14 54"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 45 93 C1 10"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 2B 88 8D C3 1A AC E9 C3 8E 01 A2 41 00 00 00 00 80 06 F1 BF F1 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "18 45 4D 8A E9 7B 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 81 1C 03 00 71 9F 0A 00 B9 0A 76 00 6F 31 87 00 43 ED 1F 00 0A 19 FE 00 00 00 00 00 00 00 00 00 1A 3D E0 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Cadillac Escalade (SUV)": [
      {
        "off": 22640,
        "hex": "38 2A 2E 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 71 47 70 CF 6B FE 27 A2 4A 82 69 B3 CB E4 3B C5 00 00 00 00 00 00 00 00 25 9E 17 B3 9C 2D 76 A8 85 E2 70 0B C3 1F 6E 14 C1 E9 1A B3 2B 08 53 17 84 E6 3C 17 75 ED 21 E6 2D 88 66 DE A1 0C CF 8C B4 E0 7D 03 79 F9 98 C2 B5 92 20 4D E8 B0 A1 F1 04 A2 7A 9E 17 AA 3D 6E 68 11 06 5B FB 05 37 BC 00 00 00 00 00 00 00 00 1E 9D 55 CC 08 63 49 AD 24 4A C3 5A 24 4A C3 5A 34 E1 39 5C 34 E1 39 5C 00 00 00 00 86 AB 85 4C 68 8E A3 53 1C 50 E3 AB 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 7F 3B 56 98 70 D6 03 FC 51 04 3D 42 73 83 2E 2D C6 B5 B0 2E C3 1E 18 70 36 94 F2 35 4C 0D FE 58 BF 7A 71 D4 FC 05 1E 89 8F 62 B5 6F 3D DB AF 9E 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 E9 7A 9E 00"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 7F 32 35 C4 6A E0 5B C4 B6 04 92 41 00 00 00 00 20 51 17 05 D5 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 99 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 B5 B4 00 00 63 40 04 00 C0 37 80 00 0F 5A 78 00 C4 99 29 00 F4 C3 DA 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Cadillac Escalade 'Snopp Dogg'": [
      {
        "off": 22640,
        "hex": "38 2A 2E 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 71 47 70 CF 6B FE 27 A2 CC 5D F8 F9 0D 58 BC 3B 00 00 00 00 00 00 00 00 25 9E 17 B3 9C 2D 76 A8 85 E2 70 0B C3 1F 6E 14 13 45 C4 AC 2B 08 53 17 46 90 C0 EF 75 ED 21 E6 79 CA D3 4D A1 0C CF 8C BF B7 93 FE A1 E1 06 53 B5 92 20 4D E8 B0 A1 F1 04 A2 7A 9E 17 AA 3D 6E 68 11 06 5B FB 05 37 BC 00 00 00 00 00 00 00 00 1E 9D 55 CC 08 63 49 AD 97 86 57 C6 24 4A C3 5A 6B 70 F2 DF 6B 70 F2 DF 00 00 00 00 ED 46 8E 94 68 8E A3 53 1C 50 E3 AB 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 7F 3B 56 98 70 D6 03 FC 51 04 3D 42 73 83 2E 2D C6 B5 B0 2E C3 1E 18 70 36 94 F2 35 4C 0D FE 58 BF 7A 71 D4 FC 05 1E 89 8F 62 B5 6F 3D DB AF 9E A1 F5 1B B1 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 E9 7A 9E 00"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 0D 19 8D C3 3E BD E7 C3 20 A1 A2 41 00 00 00 00 E0 03 0C 58 02 45 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "18 45 4D FC BC 7C 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 78 62 02 00 48 E3 0A 00 FC 49 7F 00 09 A0 8F 00 DA 99 43 00 1C F1 10 01 00 00 00 00 00 00 00 00 7F 8D E0 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Acura RSX (US ONLY)": [
      {
        "off": 22640,
        "hex": "9A 2A 5E 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 7C DB 00 00 56 D1 DD 01 75 94 78 66 96 DD 4B 56 00 00 00 00 00 00 00 00 50 B5 18 36 27 2A 9A 8B 85 E2 70 0B 4E C1 EF 83 EC 00 1C 36 B6 04 77 FA 0F E3 60 FA C0 38 37 22 18 16 0A 26 AC 56 64 23 1F 6C BC 6C C4 44 AE FE C0 DC B5 E3 53 3C E0 5A 4F 08 20 B5 C2 D9 8F 59 53 5A 22 0E 46 6C DC D2 00 00 00 00 00 00 00 00 89 28 94 35 D3 5B 59 3E EF 42 D3 EB EF 42 D3 EB FF D9 49 ED FF D9 49 ED 00 00 00 00 51 A4 95 DD 68 8E A3 53 E7 48 F3 3C 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 2A 6B A8 83 1B 81 34 C1 9C 85 5D E3 FE 35 18 2D B1 B9 D0 2B 6E C9 48 35 41 94 38 A1 17 3C C4 AD EA 82 FD C1 E7 C4 CC 09 DA FE 3B 06 EB BD BC B8 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 14 97 5C 78"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 96 32 35 C4 68 E0 5B C4 A2 CA 91 41 00 00 00 00 20 51 E0 BA D4 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 B7 99 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 7E EC 00 00 2C 78 04 00 58 E4 7D 00 A7 06 76 00 1B 24 0B 00 4B 4E BC 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Honda Civic Si Coupe (US ONLY)": [
      {
        "off": 22640,
        "hex": "E4 31 36 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 4D C0 90 02 C7 60 82 B5 A6 D5 F2 A1 A7 3C FA DB 00 00 00 00 00 00 00 00 81 55 21 D7 78 D0 B6 4D 85 E2 70 0B 9F A6 97 62 1D A1 24 D7 07 AB 93 BC 60 89 7D BC 51 B7 16 DE 89 86 BB 2B 7D BD 1D 55 10 AD A2 D5 55 C3 8D BA 91 43 6F 15 44 7D C6 C3 E0 87 19 1A 73 4B B9 5D C4 AB 31 11 D7 EB D5 37 00 00 00 00 00 00 00 00 7A 69 7A 9E E4 BA 07 C4 00 A2 81 71 00 A2 81 71 10 39 F8 72 10 39 F8 72 00 00 00 00 62 03 44 63 68 8E A3 53 F8 A7 A1 C2 05 47 C9 FA 05 47 C9 FA AD 09 64 45"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 DB DC D1 87 CC 13 49 56 2D 06 E2 E7 4F 5E B1 66 22 EC 8E 98 1F 5C 5D CA 12 7D DF D8 28 9D C8 6A 1B 06 8E 1F 58 D8 8A 0D 6B 80 BC 81 3C DB AF 9E 00 00 00 00 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 45 96 04 22"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 4E CD 35 C4 05 E0 5B C4 F0 CC 93 41 00 00 00 00 20 51 C8 2F D5 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "00 00 00 0F 5A 78 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 B0 BD 00 00 05 CE 04 00 48 85 81 00 C7 A6 79 00 D5 80 06 00 2C CE DE 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
      }
    ],
    "Yellow Car (intro)": [
      {
        "off": 22640,
        "hex": "15 0E 6A 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 EE 36 02 03 08 24 DC 5C AF 83 CA 68 09 8B 86 32 00 00 00 00 00 00 00 00 82 C5 0A 05 99 40 CE 38 85 E2 70 0B C0 85 35 96 AA 9B D5 A4 28 1B AB A7 42 36 8F F4 97 85 F0 45 56 58 95 29 AC C2 1B AE D1 59 DA D5 C0 0C C5 66 32 DC 13 A1 05 2A FE C3 41 55 30 CE F4 C4 A9 94 05 D1 03 8B 38 B9 EC EB 00 00 00 00 00 00 00 00 3B 16 B2 9E C5 FF 34 CB 97 86 57 C6 E1 E6 AE 78 7A 6B D8 DA 7A 6B D8 DA 00 00 00 00 D1 3F D9 E8 68 8E A3 53 D9 EC CE C9 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 5C 56 C2 BE 4D 7E 57 01 8E A4 9C 1B 70 F0 BE E0 63 C2 4E 54 A0 C6 6B 75 B3 37 BB E5 09 84 7D 1D 1C C9 DF 28 99 5F 59 B2 CC EF 5B C0 86 9A CD ED 40 B8 6E C3 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 46 95 E2 59"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 EE 1D 9E C4 9E 26 1A C4 50 2A 9F 41 00 00 00 00 40 64 25 01 E9 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 D7 C9 77 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 49 91 02 00 54 3E 07 00 8F C5 71 00 CF 43 81 00 66 14 19 00 F2 39 E4 00 00 00 00 00 7E 59 D0 00 22 87 D6 00 00 EB 20 04 6D FE 1C"
      }
    ],
    "Green Car (intro)": [
      {
        "off": 22640,
        "hex": "5C 1B 9A 43 01 00 00 00 04 00 00 00 01 00 00 00 00 00 00 00 F6 EF D2 09 10 C2 B1 C2 AF 42 56 35 90 AC AF D8 00 00 00 00 00 00 00 00 8A C9 F0 8F 42 EE C9 22 88 E2 70 0B C8 82 4B 99 26 15 F4 8F 30 A0 51 8F 89 7E 3B 8F BA 9A 26 58 5E 20 6E 00 F5 A2 00 29 D9 43 05 C6 5B E4 7B C9 F2 7C 6A 3C C5 E2 28 CA 01 86 AC 33 B4 0D AC A9 C5 E9 5C A5 F8 E9 68 51 00 00 00 00 00 00 00 00 43 00 DD 8E CD 2A BD C0 97 86 57 C6 E9 11 37 6E D3 72 8A DC D3 72 8A DC 00 00 00 00 D7 78 13 C5 68 8E A3 53 00 00 00 00 05 47 C9 FA 05 47 C9 FA AD 09 64 45 AD 09 64 45 97 4E 44 FA 97 4E 44 FA 05 47 C9 FA 05 47 C9 FA 05 47 C9 FA"
      },
      {
        "off": 22864,
        "hex": "00 00 00 00 00 00 00 00 64 A6 C6 C9 55 56 8F 57 96 9B B5 0E 78 85 9E 1D 6B F8 20 2D A8 9E A3 CB BB 10 EE 02 11 BF CA 52 24 65 D4 07 A1 1D E5 20 D4 6E 5F 00 A9 9A CD ED 84 DE 6E C3 00 00 00 00"
      },
      {
        "off": 23328,
        "hex": "20 E8 F9 03 00 00 00 00 00 00 00 00 4E 11 29 14"
      },
      {
        "off": 44416,
        "hex": "8C 9A 31 01 9D 1F 9E C4 1D E5 1A C4 83 00 9F 41 00 00 00 00 A0 61 A5 67 28 44 01 00 00 00 00 00"
      },
      {
        "off": 49872,
        "hex": "54 AB 31 40 6B 72 00 00 01 01 01 00 00 00 00 00"
      },
      {
        "off": 50096,
        "hex": "00 00 00 00 00 00 00 00 00 00 00 B9 BB 03 00 22 2A 0B 00 4E 1D 29 00 F3 C9 77 00 EE 50 2A 00 84 03 C0 00 00 00 00 00 00 00 00 00 3B B5 A7 00 00 EB 20 04 6D FE 1C"
      }
    ]
  };

  // src/model/dyno.ts
  var TUNING_OFF = 852;
  var SETUP_SIZE = 41;
  var SETUP_COUNT = 5;
  var ECU_OFF = 23;
  var TURBO_OFF = 32;
  var CURVE_POINTS = 9;
  var NEUTRAL_BYTE = 100;
  var MAX_TUNE_BYTE = 200;
  var SETUP_NAMES = ["Circuit", "Drag", "Drift", "Street X", "URL"];
  var PERF_COUNT2 = 68;
  var UNIQUE_COUNT = 9;
  var INSTALLED_REL = 784;
  var UNIQUE_REL = 744;
  var CHUNK_CARS = 214528;
  var CHUNK_PACKAGES = 215573;
  var CHUNK_TUNING = 215578;
  var CAR_STRIDE = 2192;
  var CAR_HASH_REL = 208;
  var CAR_PHYS_REL = 272;
  var PHYS_SIZE = 688;
  var PKG_STRIDE = 380;
  var PKG_SUB_STRIDE = 92;
  var TUN_STRIDE = 24;
  var F60 = [
    1.02,
    1.164,
    1.056,
    1.32,
    1.152,
    1.068,
    1.248,
    1.044,
    1.224,
    1.08,
    1.08,
    1.056,
    1.164,
    1.272,
    1.296,
    1.14,
    1.092,
    1.212,
    1.14,
    1.092,
    1.236,
    1.284,
    1.344,
    1.176,
    1.212,
    0.972,
    0.96,
    1.008,
    0.81,
    1.008,
    0.984
  ];
  var F100 = [
    1.22,
    1.31,
    1.22,
    1.3,
    1.15,
    1.18,
    1.27,
    1.09,
    1.26,
    1.24,
    1.38,
    1.15,
    1.18,
    1.28,
    1.27,
    1.05,
    1.12,
    1.06,
    1.17,
    1.31,
    1,
    1.28,
    1.18,
    1.17,
    1.26,
    1.06,
    1.15,
    1.11,
    1.1,
    1.21,
    1
  ];
  var MPH = 2.237;
  var DT = 1 / 60;
  var QUARTER_MILE_M = 400.5;
  var SPEED_STEP = 1.3410819;
  var RAD_PER_RPM = 0.10471204;
  var GEAR_SPACING = 0.05;
  var CURVE_WEIGHTS = [0.25, 0.25, -0.25, -0.25, -0.25, -0.25, -0.25, -0.25, 42e-46];
  var REDISTRIBUTE_STEPS = 20;
  var CURVE_EPSILON = 1e-4;
  var P_ECU = 23;
  var P_TURBO = 24;
  var SCALARS = [
    [0, "Front springs", "suspension"],
    [1, "Front shocks", "suspension"],
    [2, "Front sway bar", "suspension"],
    [3, "Front ride height", "suspension"],
    [4, "Rear springs", "suspension"],
    [5, "Rear shocks", "suspension"],
    [6, "Rear sway bar", "suspension"],
    [7, "Rear ride height", "suspension"],
    [8, "Steering ratio", "suspension"],
    [16, "Nitrous duration", "nitrous"],
    [17, "Nitrous flow rate", "nitrous"],
    [18, "Brake bias", "tires-brakes"],
    [19, "Front tire grip", "tires-brakes"],
    [20, "Rear tire grip", "tires-brakes"],
    [21, "Front downforce", "aerodynamics"],
    [22, "Rear downforce", "aerodynamics"]
  ];
  var scalarOffsets = (param) => {
    const offsets = {
      0: [372],
      1: [376, 380],
      2: [384],
      3: [24, 72],
      4: [404],
      5: [408, 412],
      6: [416],
      7: [120, 168],
      8: [624],
      16: [672],
      17: [684],
      18: [636],
      19: [220, 224],
      20: [252, 256],
      21: [612],
      22: [616]
    };
    return offsets[param];
  };
  var KW_TO_HP = 1.34102209;
  var NM_TO_LBFT = 0.73756212;
  var MPH_TO_KMH = 1.609344;
  function parseGameData(bytes) {
    const dv = dataView(bytes);
    const chunks = /* @__PURE__ */ new Map();
    const walk = (start, end) => {
      let o = start;
      while (o + 8 <= end) {
        const id = dv.getUint32(o, true);
        const size = dv.getUint32(o + 4, true);
        if (o + 8 + size > end) break;
        if (!chunks.has(id)) chunks.set(id, { off: o + 8, size });
        if (id & 2147483648) walk(o + 8, o + 8 + size);
        o += 8 + size;
      }
    };
    walk(0, bytes.length);
    const get = (id) => {
      const c = chunks.get(id);
      if (!c) throw new Error("This file is not GLOBAL\\GLOBALB.BUN from NFSU2 (car tables not found).");
      return c;
    };
    const carChunk = get(CHUNK_CARS);
    let carStart = carChunk.off;
    while (carStart < carChunk.off + 16 && bytes[carStart] === 17) carStart++;
    const carCount = Math.floor((carChunk.off + carChunk.size - carStart) / CAR_STRIDE);
    const cars = [];
    for (let i = 0; i < carCount; i++) {
      const base = carStart + i * CAR_STRIDE;
      let name = "";
      for (let k = 0; k < 32 && bytes[base + k]; k++) name += String.fromCharCode(bytes[base + k]);
      cars.push({
        index: i,
        name,
        hash: dv.getUint32(base + CAR_HASH_REL, true),
        view: new DataView(bytes.buffer, bytes.byteOffset + base + CAR_PHYS_REL, CAR_STRIDE - CAR_PHYS_REL)
      });
    }
    const pkgChunk = get(CHUNK_PACKAGES);
    const packages = [];
    for (let k = 0; k < Math.floor(pkgChunk.size / PKG_STRIDE); k++) {
      const o = pkgChunk.off + k * PKG_STRIDE;
      const n = Math.min(dv.getUint32(o + 8, true), 4);
      const subs = [];
      for (let s2 = 0; s2 < n; s2++) {
        const so = o + 12 + s2 * PKG_SUB_STRIDE;
        subs.push({ item: dv.getUint32(so, true), fractions: [0, 1, 2, 3].map((a) => dv.getFloat32(so + 48 + a * 4, true)) });
      }
      packages.push({ category: dv.getUint32(o, true), level: dv.getUint32(o + 4, true), subs });
    }
    const tunChunk = get(CHUNK_TUNING);
    const tuning = [];
    for (let k = 0; k < Math.floor(tunChunk.size / TUN_STRIDE); k++) {
      const o = tunChunk.off + k * TUN_STRIDE;
      tuning.push({
        item: dv.getUint32(o, true),
        level: bytes[o + 4],
        param: bytes[o + 5],
        type: bytes[o + 6],
        f8: dv.getFloat32(o + 8, true),
        fC: dv.getFloat32(o + 12, true),
        displayMin: dv.getFloat32(o + 16, true),
        displayMax: dv.getFloat32(o + 20, true)
      });
    }
    if (!cars.length || !packages.length || !tuning.length) {
      throw new Error("This file is not GLOBAL\\GLOBALB.BUN from NFSU2 (car tables are empty).");
    }
    return { cars, packages, tuning };
  }
  function readSlotDyno(save, slot) {
    const base = slotBase(slot);
    const dv = dataView(save);
    return {
      hash: getCarTypeHash(save, slot),
      installed: Array.from(save.subarray(base + INSTALLED_REL, base + INSTALLED_REL + PERF_COUNT2), (b) => b !== 0),
      uniques: Array.from({ length: UNIQUE_COUNT }, (_, i) => dv.getUint32(base + UNIQUE_REL + i * 4, true)),
      setups: Array.from({ length: SETUP_COUNT }, (_, k) => save.slice(base + TUNING_OFF + k * SETUP_SIZE, base + TUNING_OFF + (k + 1) * SETUP_SIZE))
    };
  }
  function setupOffset(slot, setup) {
    if (!Number.isInteger(setup) || setup < 0 || setup >= SETUP_COUNT) throw new RangeError(`Setup must be 0 to ${SETUP_COUNT - 1}.`);
    return slotBase(slot) + TUNING_OFF + setup * SETUP_SIZE;
  }
  function setSetupTuning(save, slot, setup, bytes, gearing = false, scalars = false) {
    if (bytes.length !== SETUP_SIZE) throw new RangeError(`A setup has ${SETUP_SIZE} bytes.`);
    const out = save.slice();
    const off = setupOffset(slot, setup);
    out.set(bytes.subarray(ECU_OFF, SETUP_SIZE), off + ECU_OFF);
    if (gearing) out.set(bytes.subarray(9, 16), off + 9);
    if (scalars) for (const [param] of SCALARS) out[off + param] = bytes[param];
    return out;
  }
  function findCar(game, hash) {
    return game.cars.find((c) => c.hash === hash) ?? null;
  }
  var R = (car, off) => car.view.getFloat32(off, true);
  var clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
  var byteT = (b) => clamp((b - 100) * 0.01, -1, 1);
  var byteT32 = (b) => clamp(Math.fround(Math.fround(b - 100) * Math.fround(0.01)), -1, 1);
  var encodeGearByte = (ratio, def, min, max) => {
    const f = Math.fround;
    const frac = f(f(f(clamp(ratio, min, max)) - f(def)) / f(f(max) - f(min)));
    return clamp(Math.floor(f(f(frac * 100) + 100.5)), 0, MAX_TUNE_BYTE);
  };
  function clonePhys(p) {
    return { f: p.f.slice(), gearCount: p.gearCount };
  }
  var g = (p, off) => p.f[off >> 2];
  var s = (p, off, v) => {
    p.f[off >> 2] = v;
  };
  function interp(table, x0, invDx, x) {
    const t = (x - x0) * invDx;
    if (t < 0) return table[0];
    const i = Math.floor(t);
    if (i >= table.length - 1) return table[table.length - 1];
    const fr2 = t - i;
    return fr2 * table[i + 1] + (1 - fr2) * table[i];
  }
  var DynoModel = class _DynoModel {
    /**
     * @param game Parsed game data.
     * @param car Car record.
     * @param installed 68 installed part flags.
     * @param uniques Nine unique-performance values (WT, TR, NO, EN, TU, SU, BR, EC, TI).
     */
    constructor(game, car, installed, uniques) {
      this.game = game;
      this.car = car;
      this.installed = installed;
      this.uniques = uniques;
      for (const t of game.tuning) {
        if (!this.installed[t.item]) continue;
        const best = this.tuneRecords.get(t.param);
        if (!best || best.level < t.level) this.tuneRecords.set(t.param, t);
      }
      this.base = this.build();
    }
    game;
    car;
    installed;
    uniques;
    base;
    tuneRecords = /* @__PURE__ */ new Map();
    defs = /* @__PURE__ */ new Map();
    curveDefs = /* @__PURE__ */ new Map();
    curvePeak = /* @__PURE__ */ new Map();
    /** True when the installed parts unlock ECU curve tuning. */
    get ecuTunable() {
      return this.tuneRecords.has(P_ECU);
    }
    /** True when the installed parts unlock turbo curve tuning. */
    get turboTunable() {
      return this.tuneRecords.has(P_TURBO);
    }
    /** Final drive and forward gears unlocked by the installed transmission. */
    get gearingParameters() {
      return Array.from({ length: 7 }, (_, i) => i + 9).filter((param) => this.active(this.base, param));
    }
    fraction(cat, n) {
      let out = new Array(n).fill(0);
      for (const pkg of this.game.packages) {
        if (pkg.category !== cat || pkg.level < 1 || pkg.level > 3) continue;
        for (const sub of pkg.subs) {
          if (!this.installed[sub.item]) continue;
          for (let a = 0; a < n; a++) if (sub.fractions[a] !== -1) out[a] += sub.fractions[a];
        }
      }
      let avg = out.reduce((x, y) => x + y, 0) / n;
      if (avg < 0 || avg > 1) {
        out = out.map((v) => clamp(v, 0, 1));
        avg = out.reduce((x, y) => x + y, 0) / n;
      }
      return { f: clamp(avg, 0, 1), out };
    }
    build() {
      const c = this.car;
      const p = { f: new Float64Array(PHYS_SIZE / 4), gearCount: c.view.getInt32(456, true) };
      for (let o = 0; o < PHYS_SIZE; o += 4) s(p, o, R(c, o));
      let { f, out } = this.fraction(0, 1);
      if (f) {
        s(p, 0, g(p, 0) + R(c, 836) * f);
        s(p, 352, g(p, 352) + (R(c, 840) - g(p, 352)) * f);
        s(p, 272, g(p, 272) * ((R(c, 832) - 1) * f + 1));
      }
      ({ f, out } = this.fraction(1, 3));
      if (f) {
        const lvl = Math.trunc(out[2] * 3 + 0.5);
        if (lvl >= 1 && lvl <= 3) {
          const gs = 784 + lvl * 64;
          s(p, 440, R(c, gs + 8));
          s(p, 444, R(c, gs + 12));
          s(p, 448, R(c, gs + 16));
          s(p, 432, R(c, gs));
          s(p, 436, R(c, gs + 4));
          for (let k = 0; k < 8; k++) s(p, 464 + 4 * k, R(c, gs + 32 + 4 * k));
          let cnt = 0;
          for (let k = 2; k < 8 && R(c, gs + 32 + 4 * k) !== 0; k++) cnt++;
          p.gearCount = cnt;
        }
        s(p, 460, g(p, 460) + (R(c, 1004) - g(p, 460)) * out[0]);
        s(p, 452, g(p, 452) + (R(c, 996) - g(p, 452)) * out[0]);
        s(p, 508, g(p, 508) + R(c, 1052) * out[1]);
      }
      ({ f, out } = this.fraction(2, 1));
      if (f) {
        s(p, 672, g(p, 672) + (R(c, 1408) - g(p, 672)) * out[0]);
        s(p, 684, R(c, 1420));
      }
      ({ f } = this.fraction(3, 1));
      if (f) {
        for (let i = 0; i < 9; i++) s(p, 512 + 4 * i, g(p, 512 + 4 * i) + R(c, 1056 + 4 * i) * f);
        for (let i = 0; i < 3; i++) s(p, 584 + 4 * i, g(p, 584 + 4 * i) + R(c, 1092 + 4 * i) * f);
      }
      ({ f } = this.fraction(4, 1));
      for (let i = 0; i < 9; i++) {
        const t = (R(c, 1296 + 4 * i) - g(p, 548 + 4 * i)) * f + g(p, 548 + 4 * i);
        s(p, 548 + 4 * i, t);
        s(p, 512 + 4 * i, g(p, 512 + 4 * i) + t);
      }
      ({ f, out } = this.fraction(5, 3));
      if (f) {
        for (let axle = 0; axle < 2; axle++) {
          for (let i = 0; i < 8; i++) {
            const off = 368 + axle * 32 + i * 4;
            const fraction = i === 4 ? out[1] : out[0];
            s(p, off, g(p, off) + (R(c, 1472 + axle * 32 + i * 4) - g(p, off)) * fraction);
          }
          for (const off of scalarOffsets(axle ? 7 : 3)) {
            s(p, off, g(p, off) + R(c, axle ? 1544 : 1540) * out[0]);
          }
        }
        s(p, 8, g(p, 8) - R(c, 1536) * out[0]);
        s(p, 624, g(p, 624) + (R(c, 1468) - g(p, 624)) * out[2]);
      }
      ({ f } = this.fraction(6, 1));
      if (f) for (let i = 0; i < 3; i++) {
        const off = 628 + i * 4;
        s(p, off, g(p, off) + (R(c, 1456 + i * 4) - g(p, off)) * f);
      }
      ({ f } = this.fraction(7, 1));
      if (this.installed[45] || this.installed[46] || this.installed[51]) s(p, 656, 0);
      if (f) {
        const lvl = Math.trunc(f * 3 + 0.5);
        if (lvl >= 1 && lvl <= 3) {
          const e = 1040 + lvl * 64;
          s(p, 496, g(p, 496) + R(c, e));
          s(p, 500, g(p, 500) + R(c, e + 4));
          s(p, 504, g(p, 504) + R(c, e + 8));
        }
        for (let i = 0; i < 9; i++) s(p, 512 + 4 * i, g(p, 512 + 4 * i) + R(c, 1248 + 4 * i) * f);
      }
      ({ f } = this.fraction(8, 1));
      if (f) for (const axle of [0, 32]) for (const off of [208, 212, 216, 220, 224]) {
        s(p, off + axle, g(p, off + axle) + (R(c, off + axle + 1136) - g(p, off + axle)) * f);
      }
      ({ f, out } = this.fraction(9, 2));
      if (f) {
        for (let i = 0; i < 3; i++) {
          const off = 612 + i * 4;
          s(p, off, g(p, off) + (R(c, 1424 + i * 4) + R(c, 1440 + i * 4)) * (i < 2 ? out[i] : f));
        }
      }
      if (this.uniques[1]) s(p, 448, R(c, 692));
      return p;
    }
    addUniques(p) {
      const c = this.car, u = this.uniques;
      if (u[0]) s(p, 272, g(p, 272) * (1 - R(c, 688)));
      if (u[2]) s(p, 684, g(p, 684) + R(c, 696));
      if (u[6]) s(p, 628, g(p, 628) + R(c, 700));
      if (u[8]) for (const [off, delta] of [[220, 704], [224, 712], [252, 708], [256, 716]]) {
        s(p, off, g(p, off) + R(c, delta));
      }
      for (let i = 0; i < 9; i++) {
        let d = 0;
        if (u[3]) d += R(c, 720 + 4 * i);
        if (u[7]) d += R(c, 756 + 4 * i);
        if (u[4]) {
          d += R(c, 792 + 4 * i);
          s(p, 548 + 4 * i, g(p, 548 + 4 * i) + R(c, 792 + 4 * i));
        }
        s(p, 512 + 4 * i, g(p, 512 + 4 * i) + d);
      }
    }
    active(p, param) {
      if (!this.tuneRecords.has(param)) return false;
      return param >= 10 && param <= 15 ? param - 8 < p.gearCount + 2 : true;
    }
    static ratioAt(p, speed) {
      const bias = g(p, 448);
      const f = Math.fround, b = f(bias);
      const r = b < f(0.2) ? f(g(p, 80)) : b > f(0.8) ? f(g(p, 128)) : f(f(f(1 - b) * f(g(p, 80))) + f(f(g(p, 128)) * b));
      const w = f(f(g(p, 500)) * f(0.10471966862678528));
      return f(f(r / f(speed)) * f(w / f(g(p, 440))));
    }
    modifyBounds(param, lo, hi) {
      const rec = this.tuneRecords.get(param);
      if (!rec) return [lo, hi];
      if (rec.type === 2 || rec.type === 3) return [(hi - lo) * rec.f8 + lo, (hi - lo) * rec.fC + hi];
      if (rec.type === 0 || rec.type === 1) return [lo + rec.f8, hi + rec.fC];
      return [Math.min(lo, rec.f8), Math.max(hi, rec.fC)];
    }
    /** FUN_005aca50, with the per-component helpers for shocks and tire grip. */
    scalarAbsRange(param, component) {
      const c = this.car;
      if ([1, 5, 19, 20].includes(param)) {
        const offsets = scalarOffsets(param);
        const upgraded = param === 1 ? 1480 : param === 5 ? 1512 : param === 19 ? 1356 : 1388;
        const ranges = offsets.map((off, i) => this.modifyBounds(param, R(c, off), R(c, upgraded + i * 4)));
        return component === void 0 ? [(ranges[0][0] + ranges[1][0]) / 2, (ranges[0][1] + ranges[1][1]) / 2] : ranges[component];
      }
      if (param === 16) return [1, 11];
      if (param === 17) return [0.1, 0.9];
      if (param === 18) return [0, 1];
      let values;
      if (param === 0 || param === 4) values = [372, 404, 1476, 1508].map((off) => R(c, off));
      else if (param === 2 || param === 6) values = [384, 416, 1488, 1520].map((off) => R(c, off));
      else if (param === 3 || param === 7) values = [-R(c, 1540), -R(c, 1544), 0];
      else if (param === 8) values = [R(c, 624), R(c, 1468)];
      else values = [
        R(c, 612),
        R(c, 616),
        R(c, 612) + R(c, 1424) + R(c, 1440),
        R(c, 616) + R(c, 1428) + R(c, 1444)
      ];
      return this.modifyBounds(param, Math.min(...values), Math.max(...values));
    }
    scalarDefault(p, param) {
      if (param === 3 || param === 7) return R(this.car, scalarOffsets(param)[0]) - g(p, scalarOffsets(param)[0]);
      const offsets = scalarOffsets(param);
      return offsets.reduce((sum, off) => sum + g(p, off), 0) / offsets.length;
    }
    absRange(p, param) {
      if (SCALARS.some(([id]) => id === param)) return this.scalarAbsRange(param);
      const c = this.car;
      const rec = this.tuneRecords.get(param);
      let lo, hi;
      if (param === 9) {
        lo = Math.min(R(c, 440), R(c, 984));
        hi = Math.max(R(c, 440), R(c, 984));
      } else if (param >= 10 && param <= 15) {
        return [_DynoModel.ratioAt(p, 111.75682), _DynoModel.ratioAt(p, 1.1175681)];
      } else {
        const vals = [];
        for (let j = 0; j < 9; j++) {
          if (param === P_ECU) {
            const a = R(c, 512 + 4 * j);
            vals.push(a, a + R(c, 1056 + 4 * j) + R(c, 1248 + 4 * j));
          } else {
            vals.push(R(c, 548 + 4 * j), R(c, 1296 + 4 * j));
          }
        }
        lo = Math.min(...vals);
        hi = Math.max(...vals);
      }
      if (rec) {
        if (rec.type === 2 || rec.type === 3) [lo, hi] = [(hi - lo) * rec.f8 + lo, (hi - lo) * rec.fC + hi];
        else if (rec.type === 0 || rec.type === 1) [lo, hi] = [lo + rec.f8, hi + rec.fC];
        else if (rec.type === 4) [lo, hi] = [Math.min(lo, rec.f8), Math.max(hi, rec.fC)];
      }
      if (param === P_ECU || param === P_TURBO) [lo, hi] = [Math.max(lo, 0), Math.max(hi, 0)];
      return [lo, hi];
    }
    caps(p, param, i, lo, hi) {
      const defs = this.curveDefs.get(param);
      hi = Math.min(hi, Math.max(0, ...defs));
      const idle = g(p, 496), red = g(p, 504);
      let peak = this.curvePeak.get(param);
      if (peak === void 0) {
        peak = 0;
        const inv = 8 / (red - idle);
        for (let rpm = idle; rpm < red; rpm += 50) {
          const pw2 = interp(defs, idle, inv, rpm) * 1e3 * rpm * 10471204e-11;
          if (peak < pw2) peak = pw2;
        }
        this.curvePeak.set(param, peak);
      }
      const rpmI = (red - idle) * i * 0.125 + idle;
      const pw = hi * 1e3 * rpmI * 10471204e-11;
      if (peak < pw) hi = Math.max((peak - pw) / (rpmI * RAD_PER_RPM) + hi, 0);
      return [Math.max(lo, 0), Math.max(hi, 0)];
    }
    range(p, param, i = 0) {
      const rec = this.tuneRecords.get(param);
      let [lo, hi] = this.absRange(p, param);
      const curve = param === P_ECU || param === P_TURBO;
      const d = curve ? this.curveDefs.get(param)[i] : this.referenceDefault(param);
      if (curve) [lo, hi] = this.caps(p, param, i, lo, hi);
      let mn, mx;
      if (rec.type === 0) {
        if (param === 3 || param === 7 || param === 9) {
          mn = Math.max(lo, d - rec.fC);
          mx = hi;
        } else {
          mn = lo;
          mx = Math.min(hi, d + rec.fC);
        }
      } else if (rec.type === 1) {
        mn = Math.max(lo, d + rec.f8);
        mx = Math.min(hi, d + rec.fC);
      } else if (rec.type === 2) {
        if (param === 3 || param === 7 || param === 9) {
          mn = Math.max(lo, d - (hi - lo) * rec.fC);
          mx = hi;
        } else {
          mn = lo;
          mx = Math.min(hi, d + (hi - lo) * rec.fC);
        }
      } else if (rec.type === 3) {
        mn = Math.max(lo, d + (hi - lo) * rec.f8);
        mx = Math.min(hi, d + (hi - lo) * rec.fC);
      } else if (rec.type === 4) {
        mn = rec.f8;
        mx = rec.fC;
      } else {
        throw new Error(`Unsupported tuning record type ${rec.type}.`);
      }
      if (mn === mx) mx += 0.01;
      return [mn, mx];
    }
    /** FUN_005a79f0 uses common reference defaults for these front/rear pairs. */
    referenceDefault(param) {
      const pair = param === 0 || param === 4 ? [0, 4] : param === 2 || param === 6 ? [2, 6] : param === 3 || param === 7 ? [3, 7] : param === 21 || param === 22 ? [21, 22] : [param];
      const defaults = pair.map((id) => this.defs.get(id) ?? 0);
      return param === 3 || param === 7 || param === 9 ? Math.min(...defaults) : Math.max(...defaults);
    }
    setScalar(p, param, value) {
      const offsets = scalarOffsets(param);
      if (param === 3 || param === 7) {
        for (const off of offsets) s(p, off, R(this.car, off) - value);
      } else if ([1, 5, 19, 20].includes(param)) {
        const [lo, hi] = this.scalarAbsRange(param);
        const t = hi === lo ? 0 : (clamp(value, lo, hi) - lo) / (hi - lo);
        offsets.forEach((off, i) => {
          const [min, max] = this.scalarAbsRange(param, i);
          s(p, off, min + t * (max - min));
        });
      } else {
        s(p, offsets[0], value);
        if (param === 16 || param === 17) {
          const other = param === 16 ? 17 : 16;
          const [lo, hi] = this.range(p, param), [min, max] = this.range(p, other);
          s(p, scalarOffsets(other)[0], (this.defs.get(other) ?? 0) - (value - (this.defs.get(param) ?? 0)) * (max - min) / (hi - lo));
        }
      }
    }
    setGear(p, value, param) {
      const arr = [];
      for (let k = 10; k <= 15; k++) arr[k] = g(p, 432 + k * 4);
      const fr2 = Math.fround, SP = fr2(GEAR_SPACING);
      const ed = (v0, q) => {
        const v = fr2(v0);
        const [mn, mx] = this.range(p, q).map(fr2);
        const c = clamp(v, mn, mx);
        const d = fr2(v - arr[q]);
        if (d === 0) return 0;
        const dir = d > 0 && q >= 11 ? -1 : d < 0 && q < 15 ? 1 : 0;
        let exc = fr2(v - c);
        if (dir) {
          const n = q + dir;
          const cur = arr[n];
          let next = cur;
          if (dir > 0 && cur > fr2(c - SP)) next = fr2(c - SP);
          else if (dir < 0 && cur < fr2(c + SP)) next = fr2(c + SP);
          if (next !== cur) exc = fr2(exc + ed(next, n));
        }
        arr[q] = fr2(v - exc);
        return exc;
      };
      ed(value, param);
      for (let k = 10; k <= 15; k++) {
        if (k - 8 >= p.gearCount + 2) arr[k] = 0;
        s(p, 432 + k * 4, arr[k]);
      }
    }
    /**
     * Applies a dyno setup like the game's tuning load.
     * @param setup 41 setup bytes.
     * @returns Final physics with uniques.
     */
    tuned(setup) {
      const p = clonePhys(this.base);
      const gearBytes = Uint8Array.from(setup);
      this.defs = /* @__PURE__ */ new Map();
      this.curveDefs = /* @__PURE__ */ new Map();
      this.curvePeak = /* @__PURE__ */ new Map();
      for (const [param] of SCALARS) if (this.active(p, param)) this.defs.set(param, this.scalarDefault(p, param));
      const applyScalars = (first, last) => {
        for (const [param] of SCALARS) {
          if (param < first || param > last || !this.active(p, param)) continue;
          const [lo, hi] = this.range(p, param);
          this.setScalar(p, param, clamp((hi - lo) * byteT(gearBytes[param]) + this.defs.get(param), lo, hi));
          if (param === 16 || param === 17) {
            const other = param === 16 ? 17 : 16;
            if (this.active(p, other)) {
              const [min, max] = this.range(p, other);
              gearBytes[other] = clamp(Math.floor(100.5 + 100 * (clamp(this.scalarDefault(p, other), min, max) - this.defs.get(other)) / (max - min)), 0, MAX_TUNE_BYTE);
            }
          }
        }
      };
      applyScalars(0, 8);
      for (let prm = 9; prm <= 15; prm++) {
        if (this.active(p, prm)) this.defs.set(prm, prm === 9 ? g(p, 440) : g(p, 432 + prm * 4));
      }
      for (let prm = 9; prm <= 15; prm++) {
        const def = this.defs.get(prm);
        if (def === void 0) continue;
        const [lo, hi] = this.range(p, prm);
        const f = Math.fround;
        const v = f(f(f(f(hi) - f(lo)) * byteT32(setup[prm])) + f(def));
        if (prm === 9) {
          const cv = clamp(v, lo, hi);
          s(p, 440, cv);
          s(p, 444, cv);
        } else {
          this.setGear(p, v, prm);
        }
      }
      for (let prm = 10; prm <= 15; prm++) {
        const def = this.defs.get(prm);
        if (def === void 0) continue;
        const [lo, hi] = this.range(p, prm);
        const f = Math.fround;
        const value = clamp(f(f(f(f(hi) - f(lo)) * byteT32(gearBytes[prm])) + f(def)), lo, hi);
        this.setGear(p, value, prm);
        for (let gear = 10; gear <= 15; gear++) {
          const gearDef = this.defs.get(gear);
          if (gearDef === void 0) continue;
          const [min, max] = this.range(p, gear);
          gearBytes[gear] = encodeGearByte(g(p, 432 + gear * 4), gearDef, min, max);
        }
      }
      applyScalars(16, 22);
      const sum = () => {
        let t = 0;
        for (let i = 0; i < 9; i++) t += g(p, 512 + 4 * i);
        return t;
      };
      const s0 = sum();
      for (const [prm, off] of [[P_ECU, ECU_OFF], [P_TURBO, TURBO_OFF]]) {
        if (!this.active(p, prm)) continue;
        this.curveDefs.set(prm, Array.from({ length: 9 }, (_, i) => prm === P_ECU ? g(p, 512 + 4 * i) - g(p, 548 + 4 * i) : g(p, 548 + 4 * i)));
        const defs = this.curveDefs.get(prm);
        for (let i = 0; i < 9; i++) {
          const [lo, hi] = this.range(p, prm, i);
          const req = (hi - lo) * byteT(setup[off + i]) + defs[i];
          const cur = prm === P_ECU ? g(p, 512 + 4 * i) - g(p, 548 + 4 * i) : g(p, 548 + 4 * i);
          if (req === cur) continue;
          const v = clamp(req, lo, hi);
          if (prm === P_ECU) {
            s(p, 512 + 4 * i, v + g(p, 548 + 4 * i));
          } else {
            s(p, 512 + 4 * i, g(p, 512 + 4 * i) + v - g(p, 548 + 4 * i));
            s(p, 548 + 4 * i, v);
          }
        }
      }
      const s1 = sum();
      if (!(Math.abs(s0 - s1) < 1e-3)) {
        const d = (s0 - s1) / 9;
        for (let i = 0; i < 9; i++) s(p, 512 + 4 * i, g(p, 512 + 4 * i) + d);
      }
      this.addUniques(p);
      return p;
    }
    /**
     * Runs the dyno on a setup.
     * @param setup 41 setup bytes.
     * @returns Simulated times and speeds.
     */
    evaluate(setup) {
      const p = this.tuned(setup);
      return { ...dragSim(p, this.car.index), topSpeed: topSpeed(p) * MPH, ...peaks(p) };
    }
    /** Unlocked non-curve controls. Display bounds are the editable bounds, not the full scale. */
    scalarTuning(setup) {
      if (setup.length !== SETUP_SIZE) throw new RangeError(`A setup has ${SETUP_SIZE} bytes.`);
      const p = this.tuned(setup);
      return SCALARS.filter(([param]) => this.active(p, param)).map(([param, label, category2]) => {
        const rec = this.tuneRecords.get(param);
        const [min, max] = this.range(p, param), [lo, hi0] = this.scalarAbsRange(param);
        const hi = hi0 === lo ? hi0 + 0.01 : hi0;
        const stock = this.defs.get(param);
        const value = param === 16 || param === 17 ? this.scalarDefault(p, param) - (param === 17 && this.uniques[2] ? R(this.car, 696) : 0) : clamp(stock + (max - min) * byteT(setup[param]), min, max);
        const metric = param === 3 || param === 7 ? 100 : 1;
        const explicit = (v) => v !== void 0 && Math.abs(v + 99.99) > 1e-3;
        const displayLo = explicit(rec.displayMin) ? rec.displayMin : lo * metric;
        const displayHi = explicit(rec.displayMax) ? rec.displayMax : hi * metric;
        const display = (v) => displayLo + (v - lo) * (displayHi - displayLo) / (hi - lo);
        const toByte = (v) => 100 + 100 * (v - stock) / (max - min);
        return {
          param,
          label,
          category: category2,
          min,
          max,
          stock,
          value,
          byte: setup[param],
          minByte: clamp(Math.ceil(toByte(min) - 1e-6), 0, MAX_TUNE_BYTE),
          maxByte: clamp(Math.floor(toByte(max) + 1e-6), 0, MAX_TUNE_BYTE),
          displayMin: display(min),
          displayMax: display(max),
          displayStock: display(stock),
          displayValue: display(value),
          unit: param === 3 || param === 7 ? "cm" : param === 16 ? "s" : "",
          editable: Number.isFinite(min) && Number.isFinite(max) && min < max
        };
      });
    }
    /**
     * Edits a scalar in physics units, preserving the input and unrelated bytes.
     * Nitrous necessarily writes both duration and flow: the game re-encodes the partner on load.
     */
    withScalarValue(setup, param, value) {
      if (!Number.isFinite(value)) throw new RangeError("A tuning value must be finite.");
      const rows = this.scalarTuning(setup);
      const row = rows.find((r) => r.param === param);
      if (!row) throw new RangeError("This scalar tuning control is locked or unknown.");
      if (!row.editable) throw new RangeError("Local game data has invalid bounds for this tuning control.");
      const out = Uint8Array.from(setup);
      const encode = (r, v) => {
        const b = 100 + 100 * (clamp(v, r.min, r.max) - r.stock) / (r.max - r.min);
        return clamp(Math.floor(b + 0.5), r.minByte, r.maxByte);
      };
      out[param] = encode(row, value);
      if (param === 16 || param === 17) {
        const other = rows.find((r) => r.param === (param === 16 ? 17 : 16));
        if (other) {
          const quantized = clamp(row.stock + (row.max - row.min) * byteT(out[param]), row.min, row.max);
          out[other.param] = encode(other, other.stock - (quantized - row.stock) * (other.max - other.min) / (row.max - row.min));
        }
      }
      return out;
    }
    /**
     * Editable ECU or turbo curve of a setup, like the game's tuning graph, in N·m.
     * @param setup 41 setup bytes.
     * @param kind Which curve.
     * @returns Nine points, or null when the installed parts do not unlock the curve.
     */
    curve(setup, kind) {
      const param = kind === "ecu" ? P_ECU : P_TURBO, off = kind === "ecu" ? ECU_OFF : TURBO_OFF;
      const p = this.tuned(setup);
      if (!this.active(p, param)) return null;
      const idle = g(p, 496), red = g(p, 504);
      return this.curveDefs.get(param).map((stock, i) => {
        const [min, max] = this.range(p, param, i);
        const span = max - min;
        const toByte = (value2) => 100 + 100 * (value2 - stock) / span;
        const value = clamp(span * byteT(setup[off + i]) + stock, min, max);
        return {
          rpm: idle + (red - idle) * i / 8,
          min: min * 1e3,
          max: max * 1e3,
          stock: stock * 1e3,
          value: value * 1e3,
          effective: (kind === "ecu" ? g(p, 512 + i * 4) - g(p, 548 + i * 4) : g(p, 548 + i * 4)) * 1e3,
          byte: setup[off + i],
          minByte: clamp(Math.ceil(toByte(min) - 1e-6), 0, MAX_TUNE_BYTE),
          maxByte: clamp(Math.floor(toByte(max) + 1e-6), 0, MAX_TUNE_BYTE)
        };
      });
    }
    /**
     * Setup byte whose curve point is nearest a value, within the point's effective byte range.
     * @param point Point from {@link curve}.
     * @param nm Wanted value in N·m.
     */
    static curveByte(point, nm) {
      if (point.maxByte <= point.minByte) return point.minByte;
      const at = (b) => _DynoModel.curveValue(point, b);
      let best = point.minByte;
      for (let b = point.minByte; b <= point.maxByte; b++) if (Math.abs(at(b) - nm) < Math.abs(at(best) - nm)) best = b;
      return best;
    }
    /**
     * Value in N·m that a setup byte gives a curve point.
     * @param point Point from {@link curve}.
     * @param byte Setup byte.
     */
    static curveValue(point, byte) {
      return clamp(point.stock + byteT(byte) * (point.max - point.min), point.min, point.max);
    }
    /**
     * Sets one ECU or turbo point like the game's tuning screen (FUN_005b2c00 with redistribution): the point is
     * clamped to its range, then neighbours absorb the requested change so the curve's sum is kept.
     * @param setup 41 setup bytes.
     * @param kind Which curve.
     * @param index Point 0–8.
     * @param nm Wanted value in N·m.
     * @returns Edited setup bytes; unchanged when the curve is locked.
     */
    withCurvePoint(setup, kind, index, nm) {
      const out = Uint8Array.from(setup);
      const points = this.curve(setup, kind);
      if (!points) return out;
      const cur = points.map((pt) => pt.value);
      const delta = nm - cur[index];
      cur[index] = clamp(nm, points[index].min, points[index].max);
      if (Math.abs(delta) > CURVE_EPSILON) {
        let remaining = delta, k = 0, w = 0;
        do {
          if (w >= REDISTRIBUTE_STEPS) break;
          let amt = -remaining;
          if (w < CURVE_WEIGHTS.length) {
            amt = delta * CURVE_WEIGHTS[w];
            amt = remaining <= 0 ? Math.max(amt, remaining) : Math.min(amt, remaining);
          }
          k = -k;
          if (k >= 0 && ++k > 8) k = 1;
          const n = index + k;
          if (n >= 0 && n < 9) {
            const nv = clamp(cur[n] + amt, points[n].min, points[n].max);
            w++;
            remaining += nv - cur[n];
            cur[n] = nv;
          }
        } while (Math.abs(remaining) > CURVE_EPSILON);
      }
      const off = kind === "ecu" ? ECU_OFF : TURBO_OFF;
      points.forEach((pt, i) => {
        if (Math.abs(cur[i] - pt.value) > CURVE_EPSILON) out[off + i] = _DynoModel.curveByte(pt, cur[i]);
      });
      return out;
    }
    /**
     * Final drive and forward gears of a setup, like the game's Drivetrain screen.
     * @param setup 41 setup bytes.
     * @returns Unlocked rows, or null when the installed parts unlock no gearing.
     */
    gearing(setup) {
      const p = this.tuned(setup);
      const params = this.gearingParameters.filter((prm) => this.defs.has(prm)).sort((a, b) => (a === 9 ? 1 : 0) - (b === 9 ? 1 : 0));
      if (!params.length) return null;
      const speedFactor = _DynoModel.ratioAt(p, 1) * 3.6;
      const names = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
      return {
        speedFactor,
        rows: params.map((param) => {
          const [min, max] = this.range(p, param);
          const ratio = param === 9 ? g(p, 440) : g(p, 432 + param * 4);
          const gear = param !== 9;
          return {
            param,
            label: gear ? `${names[param - 10]} gear` : "Final drive",
            ratio,
            min,
            max,
            stock: this.defs.get(param),
            byte: setup[param],
            speed: gear ? speedFactor / ratio : null,
            minSpeed: gear ? speedFactor / max : null,
            maxSpeed: gear ? speedFactor / min : null
          };
        })
      };
    }
    /**
     * Sets one gearing ratio like the game's tuning screen setter (`FUN_005b4670`): the value is clamped to
     * its range; a gear also moves its neighbours to keep the minimum spacing, then every active gear is
     * re-encoded. Final drive only re-encodes its own byte.
     * @param setup 41 setup bytes (not modified).
     * @param param 9 final drive, 10–15 forward gears.
     * @param ratio Wanted ratio.
     * @returns New setup bytes.
     */
    withGearRatio(setup, param, ratio) {
      const out = Uint8Array.from(setup);
      const p = this.tuned(setup);
      const encode = (prm, value) => {
        const [min, max] = this.range(p, prm);
        out[prm] = encodeGearByte(value, this.defs.get(prm), min, max);
      };
      if (!this.defs.has(param) || !Number.isFinite(ratio)) return out;
      if (param === 9) {
        encode(9, ratio);
        return out;
      }
      this.setGear(p, ratio, param);
      for (let gear = 10; gear <= 15; gear++) if (this.defs.has(gear)) encode(gear, g(p, 432 + gear * 4));
      return out;
    }
    /** Power-band coverage for every forward shift, including those outside a timed run. */
    gearPowerWindows(setup) {
      const p = this.tuned(setup);
      const { tab, idle, inv } = torqueTable(p);
      const peak = peaks(p).peakPower;
      const sh = shiftPoints(p);
      const power = (rpm) => interp(tab, idle, inv, rpm) * rpm * RAD_PER_RPM;
      return Array.from({ length: Math.max(0, p.gearCount - 1) }, (_, i) => {
        const retention = g(p, 476 + 4 * i) / g(p, 472 + 4 * i);
        const shiftRpm = sh[i + 2] - 100;
        const landingRpm = shiftRpm * retention;
        const steps = Math.max(1, Math.ceil((shiftRpm - landingRpm) / 50));
        let sum = 0;
        for (let j = 0; j <= steps; j++) {
          sum += power(landingRpm + (shiftRpm - landingRpm) * j / steps) * (j === 0 || j === steps ? 0.5 : 1);
        }
        return {
          fromGear: i + 1,
          shiftRpm,
          landingRpm,
          retention,
          powerCoverage: peak > 0 ? clamp(sum / steps / peak, 0, 1) : 0
        };
      });
    }
    tuningBand(setup, event) {
      if (!Number.isInteger(event) || event < 0 || event >= SETUP_COUNT) throw new RangeError("Select a valid dyno event.");
      const p = this.tuned(setup), idle = g(p, 496), red = g(p, 504), span = red - idle;
      const windows = this.gearPowerWindows(setup);
      const recovery = windows.length ? Math.min(...windows.map((w) => w.landingRpm)) : idle + span * 0.5;
      const low = event === 2 ? 0.2 : event === 3 ? 0.25 : event === 1 ? 0.5 : 0.35;
      const high = event === 2 ? 0.75 : event === 3 ? 0.85 : 1;
      return {
        minRpm: event === 2 || event === 3 ? idle + span * low : Math.max(idle + span * low, Math.min(recovery, idle + span * 0.65)),
        maxRpm: idle + span * high,
        description: [
          "Circuit: broad power through corner exits and shift recovery.",
          "Drag: sustained high-RPM power and top-speed-biased gearing.",
          "Drift: low\u2013mid RPM response and acceleration-biased gearing.",
          "Street X: low\u2013mid RPM recovery for short tracks.",
          "URL: broad usable power across repeated shifts."
        ][event]
      };
    }
    /** Geometric mean of three band averages: a single RPM peak cannot replace low/mid-band power. */
    usablePower(setup, band) {
      if (!(band.maxRpm > band.minRpm)) throw new RangeError("The tuning RPM band must have positive width.");
      const p = this.tuned(setup), { tab, idle, inv } = torqueTable(p);
      const averages = Array.from({ length: 3 }, (_, i) => {
        const lo = band.minRpm + (band.maxRpm - band.minRpm) * i / 3;
        const hi = band.minRpm + (band.maxRpm - band.minRpm) * (i + 1) / 3;
        const steps = Math.max(1, Math.ceil((hi - lo) / 50));
        let sum = 0;
        for (let j = 0; j <= steps; j++) {
          const rpm = lo + (hi - lo) * j / steps;
          sum += Math.max(0, interp(tab, idle, inv, rpm) * rpm * RAD_PER_RPM) * (j === 0 || j === steps ? 0.5 : 1);
        }
        return sum / steps;
      });
      return Math.cbrt(averages[0] * averages[1] * averages[2]);
    }
  };
  function peaks(p) {
    const f = Math.fround;
    const tab = Array.from({ length: 9 }, (_, i) => f(g(p, 512 + 4 * i)));
    const idle = f(g(p, 496)), red = f(g(p, 504));
    const inv = f(8 / f(red - idle));
    const kwf = f(10471204e-11);
    let peakTorque = 0, peakTorqueRpm = idle, peakPower = 0, peakPowerRpm = idle;
    for (let rpm = idle; rpm < red; rpm = f(rpm + 50)) {
      const t = interp32(tab, idle, inv, rpm);
      const kw = f(f(f(t * 1e3) * rpm) * kwf);
      if (peakTorque < t) {
        peakTorque = t;
        peakTorqueRpm = rpm;
      }
      if (peakPower < kw) {
        peakPower = kw;
        peakPowerRpm = rpm;
      }
    }
    return { peakTorque: peakTorque * 1e3, peakTorqueRpm, peakPower, peakPowerRpm };
  }
  function drive(p) {
    const bias = g(p, 448);
    return {
      fd: bias * g(p, 444) + (1 - bias) * g(p, 440),
      invR: 1 / ((1 - bias) * g(p, 32) + bias * g(p, 128))
    };
  }
  function shiftPoints(p) {
    const n = p.gearCount;
    const sh = [];
    sh[1] = (g(p, 500) - g(p, 496)) * g(p, 432) + g(p, 496);
    for (let k = 2; k <= n; k++) sh[k] = g(p, 500) - 100;
    sh[n + 1] = g(p, 504) + 500;
    return sh;
  }
  function torqueTable(p) {
    const idle = g(p, 496);
    return { tab: Array.from({ length: 9 }, (_, i) => g(p, 512 + 4 * i)), idle, inv: 8 / (g(p, 504) - idle) };
  }
  var fr = Math.fround;
  function interp32(table, x0, invDx, x) {
    const t = fr(fr(x - x0) * invDx);
    const i = Math.trunc(t);
    if (i < 0 || !(t >= 0)) return table[0];
    if (i >= table.length - 1) return table[table.length - 1];
    const f = fr(t - i);
    return fr(fr(f * table[i + 1]) + fr(fr(1 - f) * table[i]));
  }
  function dragSim(p, carIndex) {
    const G = (o) => fr(g(p, o));
    const tab = Array.from({ length: 9 }, (_, i) => G(512 + 4 * i));
    const idle = G(496), red = G(504), shift = G(500);
    const inv = fr(8 / fr(red - idle));
    const bias = G(448), nb = fr(1 - bias);
    const fd = fr(fr(bias * G(444)) + fr(nb * G(440)));
    const invR = fr(1 / fr(fr(nb * G(32)) + fr(bias * G(128))));
    const n = p.gearCount;
    const sh = [];
    for (let k2 = 2; k2 <= n; k2++) sh[k2] = fr(shift - 100);
    sh[n + 1] = fr(red + 500);
    const mass = G(272), k = G(608);
    const gears = Array.from({ length: n }, (_, i) => G(472 + 4 * i));
    const dt = fr(1 / 60), mph = fr(MPH), cut = [fr(-3), 0, fr(1.5)];
    let gear = 0, v = 0, x = 0, t = 0, c = 1, phase = 1, just = false;
    let t60 = 0, t100 = 0, qm = 0, trap = 0, qmExact = Infinity;
    for (let step = 0; step < 999999; step++) {
      const gr = gears[gear] ?? 0;
      const rpm = fr(fr(fr(fr(invR * v) * gr) * fd) * fr(9.549304));
      let a;
      const thr = sh[gear + 2] === void 0 ? NaN : fr(-100 + sh[gear + 2]);
      if (just || !(thr < rpm)) {
        just = false;
        a = fr(fr(fr(fr(interp32(tab, idle, inv, rpm) * gr) * fd) * invR) / mass);
      } else {
        just = true;
        c = fr(fr(dt * cut[phase ? 0 : 2]) + c);
        if (c > 0) {
          just = c < 1;
          if (!just) {
            gear++;
            c = 1;
            phase = 1;
          }
        } else {
          c = 0;
          phase = 0;
        }
        a = 0;
      }
      t = fr(dt + t);
      const dv = fr(fr(a - fr(fr(fr(v * k) * v) / mass)) * dt);
      x = fr(fr(fr(fr(0.5 * dv) + v) * dt) + x);
      v = fr(dv + v);
      if (t60 === 0 && 60 <= fr(v * mph)) t60 = fr(t * fr(F60[carIndex] ?? 0));
      if (t100 === 0 && 100 <= fr(v * mph)) t100 = fr(t * fr(F100[carIndex] ?? 0));
      if (qm === 0 && QUARTER_MILE_M <= x) {
        qm = t;
        trap = v;
        qmExact = t - (x - QUARTER_MILE_M) / Math.max(v, 1e-6);
      }
      if (t60 !== 0 && t100 !== 0 && qm !== 0 && trap !== 0) break;
    }
    const z = (q) => q === 0 ? Infinity : q;
    return { t60: z(t60), t100: z(t100), quarterMile: z(qm), trapSpeed: trap * MPH, quarterExact: qmExact };
  }
  function topSpeed(p) {
    const { tab, idle, inv } = torqueTable(p);
    const { fd, invR } = drive(p);
    const sh = shiftPoints(p);
    const mass = g(p, 272), k = g(p, 608);
    const gears = Array.from({ length: p.gearCount }, (_, i) => g(p, 472 + 4 * i));
    const forces = [];
    let v = 0, gi = 2;
    while (forces.length < 92 && gears.length) {
      let gr = gears[gi - 2];
      const rpm = invR * v * gr * fd * 9.5493;
      if (sh[gi] <= rpm) {
        gi++;
        if (p.gearCount + 2 <= gi) break;
        gr = gears[gi - 2];
      }
      forces.push(interp(tab, idle, inv, rpm) * gr * fd * invR / mass);
      v += SPEED_STEP;
    }
    if (!forces.length) return 0;
    const vmax = v;
    const n = forces.length;
    forces[n - 1] = 0;
    const TOP_N = 64;
    const res = Array.from({ length: TOP_N }, (_, i) => interp(forces, 0, (n - 1) / vmax, i * vmax / (TOP_N - 1)));
    let sp = 0;
    while (sp <= vmax && sp * k * sp / mass <= interp(res, 0, (TOP_N - 1) / vmax, sp)) sp += SPEED_STEP;
    const limit = g(p, 656);
    return limit > 0 && limit * 0.44703 < sp ? limit * 0.44703 : sp;
  }
  function score(r, goal) {
    switch (goal) {
      case "accel60":
        return r.t60;
      case "accel":
        return r.t100 * 1e3 + r.quarterExact;
      case "top":
        return -r.topSpeed * 1e3 + r.quarterExact;
      case "power":
        return -r.peakPower;
      case "torque":
        return -r.peakTorque;
      default:
        return r.quarterExact * 1e3 + r.t100 - r.topSpeed * 1e-3;
    }
  }
  function searchSetup(model, setup, goal, gearing, objective = (result) => score(result, goal), accepts = () => true, budgetReference, limitGoalLoss = true) {
    const indices = [];
    const gearIndices = gearing && goal !== "power" && goal !== "torque" ? model.gearingParameters : [];
    indices.push(...gearIndices);
    if (model.ecuTunable) for (let i = 0; i < CURVE_POINTS; i++) indices.push(ECU_OFF + i);
    if (model.turboTunable) for (let i = 0; i < CURVE_POINTS; i++) indices.push(TURBO_OFF + i);
    const start = Uint8Array.from(setup);
    const before = model.evaluate(start);
    if (!indices.length) return { setup: start, before, after: before };
    const reference = start.slice();
    for (const idx of gearIndices) reference[idx] = NEUTRAL_BYTE;
    const referenceWindows = gearIndices.some((idx) => idx !== 9) ? model.gearPowerWindows(reference) : [];
    const evenRetention = referenceWindows.length ? Math.pow(referenceWindows.reduce((product, window) => product * window.retention, 1), 1 / referenceWindows.length) : 0;
    const initialScore = objective(budgetReference ?? before, start);
    const scale = Number.isFinite(initialScore) ? Math.max(1, Math.abs(initialScore)) : 1;
    const evalScore = (bytes) => {
      const result = model.evaluate(bytes);
      if (!accepts(result)) return Infinity;
      const value = objective(result, bytes);
      if (!referenceWindows.length) return value;
      if (limitGoalLoss && Number.isFinite(initialScore) && value > initialScore + scale * 0.05) return Infinity;
      const windows = model.gearPowerWindows(bytes);
      if (windows.some((window, i) => !Number.isFinite(window.retention) || window.retention <= 0 || window.retention >= 1 || window.retention < Math.min(referenceWindows[i].retention, evenRetention) - 1e-6)) return Infinity;
      const gaps = windows.map((window) => -Math.log(window.retention));
      const meanGap = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
      const unevenness = gaps.reduce((sum, gap) => sum + (gap - meanGap) ** 2, 0) / gaps.length / meanGap ** 2;
      const meanCoverage = windows.reduce((sum, window) => sum + window.powerCoverage, 0) / windows.length;
      const worstCoverage = Math.min(...windows.map((window) => window.powerCoverage));
      return value / scale + 0.2 * (1 - meanCoverage) + 0.4 * (1 - worstCoverage) + 0.1 * unevenness;
    };
    const descend = (initial) => {
      const cur = initial.slice();
      let best2 = evalScore(cur);
      for (let pass = 0; pass < 8; pass++) {
        let improved = false;
        for (const idx of indices) {
          const orig = cur[idx];
          let bestByte = orig;
          const tryByte = (b) => {
            if (b < 0 || b > MAX_TUNE_BYTE || b === cur[idx]) return;
            const keep = cur[idx];
            cur[idx] = b;
            const v = evalScore(cur);
            if (v < best2 - 1e-9) {
              best2 = v;
              bestByte = b;
            }
            cur[idx] = keep;
          };
          for (let b = 0; b <= MAX_TUNE_BYTE; b += 10) tryByte(b);
          const center = bestByte;
          for (let b = center - 9; b <= center + 9; b++) tryByte(b);
          cur[idx] = bestByte;
          if (bestByte !== orig) improved = true;
        }
        if (!improved) break;
      }
      return { bytes: cur, value: best2 };
    };
    const seeds = [start.slice()];
    if (referenceWindows.length) seeds.push(reference);
    for (const fill of [NEUTRAL_BYTE, 0, MAX_TUNE_BYTE]) {
      const seed = start.slice();
      for (const idx of indices) seed[idx] = fill;
      seeds.push(seed);
    }
    let best = { bytes: start, value: evalScore(start) };
    for (const seed of seeds) {
      const r = descend(seed);
      if (r.value < best.value - 1e-9) best = r;
    }
    if (referenceWindows.length && !Number.isFinite(best.value)) {
      throw new Error(`No smooth gearing setup was found${limitGoalLoss ? " within the 5% performance budget" : ""}. Disable gearing optimization or reset the gear tuning and try again.`);
    }
    return { setup: best.bytes, before, after: model.evaluate(best.bytes) };
  }
  function optimizeDynoSetup(model, setup, event = 0, gearing = false) {
    const band = model.tuningBand(setup, event);
    const power = searchSetup(model, setup, "power", false, (_r, bytes) => -model.usablePower(bytes, band));
    const bandReference = Math.max(model.usablePower(power.setup, band), 1e-6);
    const weights = event === 1 ? [0.05, 0.1, 0.35, 0.5] : event === 2 || event === 3 ? [0.6, 0.25, 0.1, 0.05] : [0.2, 0.2, 0.3, 0.3];
    const baseline = power.after;
    const timeTerm = (value, reference, weight) => Number.isFinite(reference) ? weight * value / Math.max(reference, 1e-6) : 0;
    const objective = (r, bytes) => -model.usablePower(bytes, band) / bandReference + 0.2 * (timeTerm(r.t60, baseline.t60, weights[0]) + timeTerm(r.t100, baseline.t100, weights[1]) + timeTerm(r.quarterExact, baseline.quarterExact, weights[2]) - weights[3] * r.topSpeed / Math.max(baseline.topSpeed, 1));
    let goal = searchSetup(model, power.setup, "quarter", gearing, objective, () => true, power.after, false);
    goal = searchSetup(model, goal.setup, "quarter", gearing, objective, () => true, power.after, false);
    const target = goal.after;
    const noSlower = (r) => r.t60 <= target.t60 && r.t100 <= target.t100 && r.quarterMile <= target.quarterMile && r.quarterExact <= target.quarterExact && r.topSpeed >= target.topSpeed && r.trapSpeed >= target.trapSpeed;
    const refined = searchSetup(model, goal.setup, "power", false, (_r, bytes) => -model.usablePower(bytes, band), noSlower);
    return {
      setup: refined.setup,
      before: power.before,
      after: refined.after,
      band,
      stages: { power: power.after, goal: goal.after }
    };
  }

  // src/controller/editor-controller.ts
  var partsByIndex = new Map(PERF_PARTS.map((p) => [p.index, p]));
  var tuningPerfIndexSet = new Set(TUNING_PERF_INDICES);
  var CURVE_TABS = [
    { kind: "ecu", label: "ECU" },
    { kind: "turbo", label: "Turbo" },
    { kind: "drive", label: "Drivetrain" },
    { kind: "suspension", label: "Suspension" },
    { kind: "aerodynamics", label: "Aerodynamics" },
    { kind: "tires-brakes", label: "Tires & brakes" },
    { kind: "nitrous", label: "Nitrous" }
  ];
  var GEAR_SCALE_KMH = 420;
  var TUNING_TABS = [
    { code: "PERF", label: "PERFORMANCE" },
    { code: "BODY", label: "BODY PARTS" },
    { code: "GRAPHICS", label: "GRAPHICS" },
    { code: "SPECIALTIES", label: "SPECIALTIES" },
    { code: "DYNO", label: "DYNO" }
  ];
  function EditorController($scope) {
    let data = null;
    let donors = [];
    let donorIndex = /* @__PURE__ */ new Map();
    let game = null;
    let visuals = null;
    let career = null;
    let visualDraft = null;
    const drafts = /* @__PURE__ */ new Map();
    let backup = null;
    let loadToken = 0;
    $scope.loaded = false;
    $scope.fileName = "";
    $scope.fileSize = 0;
    $scope.checks = null;
    $scope.backup = null;
    $scope.status = { type: "", text: "" };
    $scope.form = { name: "", money: 0 };
    $scope.slots = [];
    $scope.perfTotal = TUNING_PERF_INDICES.length;
    $scope.uniqueTotal = UNIQUE_PERF_COUNT;
    $scope.unlockTotal = UNLOCK_COUNT;
    $scope.career = { gameName: "", error: "", stage: null, report: null };
    $scope.swapTarget = {};
    $scope.replaceTarget = {};
    $scope.donors = [];
    const trafficChoices = TRAFFIC_CARS.map((car) => ({
      id: `traffic:${car.hash}`,
      name: `${car.name} (experimental)`,
      group: "Traffic cars (experimental)",
      experimental: true
    }));
    $scope.replacementCars = trafficChoices;
    $scope.tuning = {
      open: false,
      slot: 0,
      tabs: TUNING_TABS,
      tab: "PERF",
      sub: TUNING_PERF_CATEGORIES[0].code,
      categories: [],
      visual: { blocked: "", hasProposal: false, category: "", colorSlot: 63, groups: [] },
      dyno: {
        gameName: "",
        gameError: "",
        setup: 1,
        setupNames: SETUP_NAMES,
        strategy: "",
        optimizeGearing: false,
        carName: "",
        blocked: "",
        busy: false,
        rows: [],
        hasProposal: false,
        curveTabs: [],
        curve: "ecu",
        cheat: false,
        point: 0,
        chart: null,
        gear: 0,
        drive: null,
        scalars: []
      }
    };
    fetch("./car-donors.json").then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    }).catch(() => DEFAULT_DONORS_RAW).then((raw) => {
      const parsed = parseCarDatabase(raw);
      $scope.$evalAsync(() => {
        donors = parsed;
        $scope.donors = parsed;
        $scope.replacementCars = [
          ...parsed.map((car) => ({ id: car.id, name: car.name, group: "Cars", experimental: false })),
          ...trafficChoices
        ];
        donorIndex = buildCarIndex(parsed);
        if (data) refresh();
      });
    });
    function setStatus(type, text) {
      $scope.status = { type, text };
    }
    function syncForm(bytes) {
      $scope.form.name = getName(bytes);
      $scope.form.money = getMoney(bytes);
    }
    function refresh() {
      if (!data) return;
      const bytes = data;
      $scope.slots = Array.from({ length: slotCount(bytes) }, (_, index) => {
        const key = getCarKey(bytes, index);
        return {
          index,
          used: isSlotUsed(bytes, index),
          locked: isSlotLocked(bytes, index),
          bought: isCarBought(bytes, index),
          state: slotState(bytes, index),
          key,
          car: identifyCar(donorIndex, getCarTypeHash(bytes, index)),
          trafficName: TRAFFIC_CARS.find((car) => car.hash === getCarTypeHash(bytes, index))?.name ?? "",
          perfCount: TUNING_PERF_INDICES.filter((i) => getPerfFlag(bytes, index, i)).length,
          uniqueCount: UNIQUE_PERF_PARTS.filter((p) => getUniquePerfValue(bytes, index, p.index) !== 0).length,
          unlocked: countUnlocked(bytes, index)
        };
      });
      rebuildCareer();
      if ($scope.tuning.open) {
        rebuildTuning();
        rebuildDyno();
        rebuildVisual();
      }
    }
    function rebuildCareer() {
      $scope.career.stage = data ? dataView(data).getUint32(CURRENT_STAGE_OFF, true) : null;
      $scope.career.report = null;
      if (!data || !career) return;
      try {
        $scope.career.report = careerReport(data, career);
        $scope.career.error = "";
      } catch (err) {
        $scope.career.error = errorMessage(err);
      }
    }
    $scope.discoverShops = function() {
      if (!data || !career || !$scope.career.report) {
        setStatus("error", "Load a supported career save and GLOBAL\\GLOBALB.BUN first.");
        return;
      }
      const count = $scope.career.report.shops.filter((shop) => shop.discoverable).length;
      if (!count) {
        setStatus("success", "No eligible undiscovered shops remain at this stage.");
        return;
      }
      if (!confirm(`Discover ${count} eligible shops?

Only shop discovery entries change. Your stage, race completions, result counts, money and car data are preserved. Future-stage shops and locked inventory stay locked. Test with a backup.`)) return;
      try {
        applyResult(discoverCareerShops(data, career));
        setStatus("success", `${count} eligible shops discovered. Download to save; test in game with a backup.`);
      } catch (err) {
        setStatus("error", errorMessage(err));
      }
    };
    $scope.hasDiscoverableShops = function() {
      return $scope.career.report?.shops.some((shop) => shop.discoverable) ?? false;
    };
    $scope.setCareerStage = function() {
      if (!data || $scope.career.stage === null) {
        setStatus("error", "Load a supported career save first.");
        return;
      }
      if (!confirm(`Set career stage to ${$scope.career.stage}?

This changes road barriers and active-stage eligibility. It does not reset completed stages/races, satisfy prerequisites or grant rewards. Stage 6 is post-career. Test with a backup.`)) return;
      try {
        applyResult(setCareerStage(data, $scope.career.stage));
        setStatus("success", "Career stage changed. Download to save; test in game with a backup.");
      } catch (err) {
        setStatus("error", errorMessage(err));
      }
    };
    $scope.completeCareer = function() {
      if (!data || !career || !$scope.career.report) {
        setStatus("error", "Load a supported career save and GLOBAL\\GLOBALB.BUN first.");
        return;
      }
      if (!confirm("Complete the career to 100%?\n\nThis intentionally marks all BUN career events and photo goals complete, populates capped stage-result sets, marks stages complete and sets post-career stage 6. Completed race/photo markers disappear. Eligible shops are discovered. Money, cars, collectible cash, SMS and reward ownership are not fabricated. This overwrites completion history; use a backup.")) return;
      try {
        applyResult(completeCareer(data, career));
        setStatus("success", "Career goals completed (100%), stage 6. Download to save; test in game with a backup.");
      } catch (err) {
        setStatus("error", errorMessage(err));
      }
    };
    function rebuildTuning() {
      if (!data) return;
      const bytes = data;
      const slot = $scope.tuning.slot;
      $scope.tuning.categories = TUNING_PERF_CATEGORIES.map((cat) => {
        const parts = cat.indices.map((index) => {
          const part = partsByIndex.get(index);
          if (!part) throw new Error(`Unknown performance part index ${index}`);
          return {
            ...part,
            on: getPerfFlag(bytes, slot, index),
            offset: hex(perfOffset(slot, index)),
            relativeOffset: hex(PERF_OFF + index),
            packageLabel: part.level === null ? "Not in active table" : ["Street", "Pro", "Extreme"][part.level - 1],
            purchased: getPerfPurchased(bytes, slot, index),
            purchaseOffset: hex(perfPurchaseOffset(slot, index)),
            purchaseMask: hex(1 << (index & 7), 2)
          };
        });
        const uniquePart = UNIQUE_PERF_PARTS.find((part) => part.category === cat.code);
        let unique = null;
        if (uniquePart) {
          const value = getUniquePerfValue(bytes, slot, uniquePart.index);
          unique = {
            ...uniquePart,
            value,
            on: value !== 0,
            hexValue: hex(value, 8),
            offset: hex(uniquePerfOffset(slot, uniquePart.index)),
            relativeOffset: hex(UNIQUE_PERF_OFF + uniquePart.index * 4)
          };
        }
        return {
          code: cat.code,
          label: cat.label,
          parts,
          unique,
          onCount: parts.filter((p) => p.active && p.on).length,
          activeCount: parts.filter((p) => p.active).length
        };
      });
    }
    function rebuildVisual() {
      const view2 = $scope.tuning.visual;
      view2.groups = [];
      view2.hasProposal = !!visualDraft;
      view2.blocked = "";
      if (!data || !visuals) {
        view2.blocked = "Load GLOBAL\\GLOBALB.BUN to list the parts for this car.";
        return;
      }
      const slot = $scope.tuning.slot, bytes = visualDraft ?? data, car = getCarTypeHash(bytes, slot);
      const refs = readVisual(bytes, slot);
      const groups = /* @__PURE__ */ new Map();
      for (const spec of VISUAL_SLOTS.filter((s2) => s2.tab === $scope.tuning.tab)) {
        if (visuals.hidden(refs, car, spec.id)) continue;
        const options = visuals.selectableOptions(car, spec.id);
        if (!options.length && !refs[spec.id]) continue;
        const current = visuals.part(car, spec.id, refs[spec.id]);
        const retained = refs[spec.id] !== 0 && !options.some((p) => p.hash === refs[spec.id]);
        const choices = options.map((p) => ({
          hash: p.hash,
          label: p.name.replaceAll("_", " "),
          group: p.level === 0 ? "Stock / shared" : `Level ${p.level}`
        }));
        if (retained) choices.unshift({
          hash: refs[spec.id],
          label: `${current?.name ?? `Unknown installed part (${hex(refs[spec.id], 8)})`} - retained`,
          group: "Installed"
        });
        choices.unshift({ hash: 0, label: "Default / none (resolved by game)", group: "Default" });
        const rows = groups.get(spec.category) ?? [];
        rows.push({
          id: spec.id,
          label: spec.label,
          value: refs[spec.id],
          color: current?.color ?? "",
          options: choices,
          colorPicker: isVisualColorSlot(spec.id),
          palettes: isVisualColorSlot(spec.id) ? colorPalettes(options) : [],
          selectedLabel: current?.name ?? (refs[spec.id] ? `Unknown installed part (${hex(refs[spec.id], 8)})` : "Default / none"),
          retained
        });
        groups.set(spec.category, rows);
      }
      view2.groups = [...groups].map(([label, rows]) => ({ label, rows }));
      if (!groups.has(view2.category)) view2.category = view2.groups[0]?.label ?? "";
      if (!view2.groups.length) view2.blocked = "No compatible parts in this game database for this car and menu.";
    }
    function dynoModel() {
      if (!data) return { reason: "Load a save first." };
      const sd = readSlotDyno(data, $scope.tuning.slot);
      if (TRAFFIC_CARS.some((car2) => car2.hash === sd.hash)) {
        return { reason: "DYNO is unavailable for experimental traffic vehicles." };
      }
      if (!game) return { reason: "" };
      const car = findCar(game, sd.hash);
      if (!car) return { reason: "This car is not in the loaded game data." };
      const model = new DynoModel(game, car, sd.installed, sd.uniques);
      if (!model.ecuTunable && !model.turboTunable && !model.gearingParameters.length && !model.scalarTuning(sd.setups[0]).length) {
        return { reason: `${car.name}: install tunable performance or body parts to unlock dyno tuning.` };
      }
      return { model, setups: sd.setups };
    }
    function draftKey() {
      return `${$scope.tuning.slot}:${$scope.tuning.dyno.setup}`;
    }
    function currentSetup(built) {
      return drafts.get(draftKey())?.bytes ?? built.setups[$scope.tuning.dyno.setup];
    }
    function currentPoints() {
      const built = dynoModel(), kind = $scope.tuning.dyno.curve;
      return "reason" in built || kind !== "ecu" && kind !== "turbo" ? null : built.model.curve(currentSetup(built), kind);
    }
    function currentGearing() {
      const built = dynoModel();
      if ("reason" in built) return null;
      const bytes = currentSetup(built), gearing = built.model.gearing(bytes);
      return gearing ? { model: built.model, gearing, bytes } : null;
    }
    function editSetup(edit) {
      const built = dynoModel();
      if ("reason" in built || $scope.tuning.dyno.busy) return;
      const current = currentSetup(built);
      const band = drafts.get(draftKey())?.band ?? built.model.tuningBand(current, $scope.tuning.dyno.setup);
      const bytes = edit(current.slice(), built.model);
      if (sameBytes(bytes, current)) return;
      if (sameBytes(bytes, built.setups[$scope.tuning.dyno.setup])) drafts.delete(draftKey());
      else drafts.set(draftKey(), { bytes, band });
      rebuildDyno();
    }
    function editPoints(edit) {
      const kind = $scope.tuning.dyno.curve;
      if (kind !== "ecu" && kind !== "turbo") return;
      editSetup((bytes) => {
        edit(bytes, kind === "ecu" ? ECU_OFF : TURBO_OFF);
        return bytes;
      });
    }
    function setCurvePoint(index, point, byte) {
      const kind = $scope.tuning.dyno.curve;
      if (kind !== "ecu" && kind !== "turbo") return;
      if (byte === point.byte) {
        rebuildDyno();
        return;
      }
      if ($scope.tuning.dyno.cheat) editPoints((bytes, off) => {
        bytes[off + index] = byte;
      });
      else editSetup((bytes, model) => model.withCurvePoint(bytes, kind, index, DynoModel.curveValue(point, byte)));
    }
    function setGearRatio(param, ratio) {
      editSetup((bytes, model) => model.withGearRatio(bytes, param, ratio));
    }
    function rebuildDyno() {
      const view2 = $scope.tuning.dyno;
      view2.rows = [];
      view2.carName = "";
      view2.hasProposal = false;
      view2.curveTabs = [];
      view2.chart = null;
      view2.drive = null;
      view2.scalars = [];
      const built = dynoModel();
      if ("reason" in built) {
        view2.blocked = built.reason;
        return;
      }
      view2.blocked = "";
      view2.carName = built.model.car.name;
      const saved = built.setups[view2.setup], bytes = currentSetup(built);
      const band = drafts.get(draftKey())?.band ?? built.model.tuningBand(bytes, view2.setup);
      view2.strategy = `${band.description} Target ${Math.round(band.minRpm).toLocaleString("en-US")}\u2013${Math.round(band.maxRpm).toLocaleString("en-US")} rpm.`;
      view2.hasProposal = !sameBytes(saved, bytes);
      view2.rows = dynoRows(built.model.evaluate(saved), view2.hasProposal ? built.model.evaluate(bytes) : null);
      const beforePower = built.model.usablePower(saved, band), afterPower = built.model.usablePower(bytes, band);
      const powerCell = (kw) => ({
        metric: `${kw.toFixed(1)} kW`,
        imperial: `${(kw * KW_TO_HP).toFixed(1)} hp`,
        rpm: ""
      });
      view2.rows.unshift({
        label: "Usable band power",
        sub: "Geometric mean of 3 RPM regions",
        before: powerCell(beforePower),
        after: view2.hasProposal ? powerCell(afterPower) : null,
        better: view2.hasProposal && afterPower > beforePower
      });
      const gearing = built.model.gearing(bytes);
      const curves = { ecu: built.model.curve(bytes, "ecu"), turbo: built.model.curve(bytes, "turbo") };
      const scalars = built.model.scalarTuning(bytes);
      view2.curveTabs = CURVE_TABS.filter(({ kind }) => kind === "drive" ? gearing : kind === "ecu" || kind === "turbo" ? curves[kind] : scalars.some((row) => row.category === kind));
      if (view2.curveTabs.length && !view2.curveTabs.some((tab) => tab.kind === view2.curve)) view2.curve = view2.curveTabs[0].kind;
      if (view2.curve === "drive") {
        if (gearing) {
          view2.gear = Math.min(Math.max(view2.gear, 0), gearing.rows.length - 1);
          view2.drive = gearChart(gearing, view2.gear);
        }
      } else if (view2.curve === "ecu" || view2.curve === "turbo") {
        const points = curves[view2.curve];
        view2.chart = points ? curveChart(points, view2.point) : null;
      } else view2.scalars = scalars.filter((row) => row.category === view2.curve);
    }
    function careerBytes(bytes) {
      return slotCount(bytes) > 5 ? bytes.subarray(0, PROFILE_SIZE) : bytes;
    }
    function resetEditor() {
      drafts.clear();
      visualDraft = null;
      $scope.tuning.open = false;
      $scope.swapTarget = {};
      $scope.replaceTarget = {};
    }
    function showLoaded(bytes, prefix = "Loaded.") {
      drafts.clear();
      visualDraft = null;
      data = bytes;
      const checks = verifyChecksums(careerBytes(bytes));
      $scope.checks = checks;
      $scope.loaded = true;
      syncForm(bytes);
      refresh();
      const valid = Object.values(checks).every(Boolean);
      setStatus(
        valid ? "success" : "error",
        valid ? `${prefix} Checksums are valid.` : `${prefix} Checksums do not match; they will be recalculated on download.`
      );
    }
    function backupView() {
      if (!backup) {
        $scope.backup = null;
        return;
      }
      const profile = backup.profiles[backup.current];
      $scope.backup = {
        current: backup.current,
        note: profile.note,
        profiles: backup.profiles.map((p, index) => ({
          index,
          label: `${p.name} (${p.garageState === "loaded" ? p.slotCount ? `${p.slotCount} slots` : "25 slots" : "5 slots"})`
        }))
      };
    }
    function openBackupProfile(index) {
      if (!backup) return;
      const profile = backup.profiles[index];
      let bytes = backup.work.get(index);
      if (!bytes) {
        const career2 = backup.zip.entries[profile.careerEntry].data;
        bytes = profile.garageState === "loaded" ? mergeGarage(career2, backup.zip.entries[profile.garageEntry].data) : career2.slice();
        backup.work.set(index, bytes);
      }
      backup.current = index;
      resetEditor();
      backupView();
      showLoaded(bytes, `Loaded nfsu2-web profile ${profile.name}${profile.garageState === "loaded" ? ` with slots 6-${slotCount(bytes)}` : ""}.`);
    }
    function rejectFile(text) {
      data = null;
      backup = null;
      $scope.backup = null;
      $scope.loaded = false;
      $scope.checks = null;
      $scope.slots = [];
      resetEditor();
      setStatus("error", text);
    }
    function applyResult(next, keepDrafts = false) {
      data = next;
      visualDraft = null;
      if (backup) backup.work.set(backup.current, next);
      if (!keepDrafts) {
        drafts.clear();
      }
      refresh();
    }
    $scope.loadFile = function(file) {
      if (!file) return;
      const token = ++loadToken;
      const reader = new FileReader();
      reader.onload = () => {
        $scope.$apply(() => {
          const bytes = new Uint8Array(reader.result);
          $scope.fileName = file.name;
          $scope.fileSize = bytes.length;
          if (isZip(bytes)) {
            data = null;
            backup = null;
            $scope.backup = null;
            $scope.loaded = false;
            setStatus("", "Reading nfsu2-web backup ZIP\u2026");
            readZip(bytes).then((zip) => {
              $scope.$evalAsync(() => {
                if (token !== loadToken) return;
                const profiles = findBackupProfiles(zip.entries);
                if (!profiles.length) {
                  rejectFile("This ZIP has no nfsu2-web career profile (expected a folder with a file of the same name).");
                  return;
                }
                backup = { zip, profiles, work: /* @__PURE__ */ new Map(), current: 0 };
                openBackupProfile(0);
              });
            }).catch((err) => {
              $scope.$evalAsync(() => {
                if (token === loadToken) rejectFile(`Could not read the ZIP: ${errorMessage(err)}`);
              });
            });
            return;
          }
          if (GARAGE_MAGIC.every((byte, i) => bytes[i] === byte)) {
            rejectFile("This is an nfsu2-web GARAGE.DAT. Load the backup ZIP so it can be paired with its career profile.");
            return;
          }
          const check = checkSave(bytes);
          if (!check.ok) {
            rejectFile(check.error ?? "Not a valid save file.");
            return;
          }
          if (backup || $scope.tuning.slot >= slotCount(bytes)) resetEditor();
          backup = null;
          $scope.backup = null;
          showLoaded(bytes);
        });
      };
      reader.onerror = () => $scope.$apply(() => setStatus("error", "Could not read the file."));
      reader.readAsArrayBuffer(file);
    };
    $scope.selectProfile = function(index) {
      if (!backup || !Number.isInteger(index) || index < 0 || index >= backup.profiles.length) return;
      openBackupProfile(index);
    };
    $scope.checksumText = function() {
      if (!$scope.checks) return "";
      return Object.values($scope.checks).every(Boolean) ? "valid" : "mismatch (fixed on download)";
    };
    $scope.usedCount = function() {
      return $scope.slots.filter((s2) => s2.state === "filled").length;
    };
    $scope.applyProfile = function() {
      if (!data) return;
      try {
        let next = setMoney(data, $scope.form.money);
        next = setName(next, $scope.form.name);
        applyResult(next);
        setStatus("success", "Profile applied. Download to save the file.");
      } catch (err) {
        setStatus("error", errorMessage(err));
      }
    };
    $scope.openTuning = function(slot) {
      $scope.tuning.slot = slot;
      $scope.tuning.open = true;
      $scope.tuning.tab = "PERF";
      $scope.tuning.sub = TUNING_PERF_CATEGORIES[0].code;
      $scope.tuning.dyno.point = 0;
      drafts.clear();
      visualDraft = null;
      rebuildTuning();
      rebuildDyno();
      rebuildVisual();
    };
    $scope.selectTab = function(code) {
      $scope.tuning.tab = code;
      if (code === "DYNO") rebuildDyno();
      rebuildVisual();
    };
    $scope.selectSub = function(code) {
      $scope.tuning.sub = code;
    };
    $scope.activeTabLabel = function() {
      const tab = TUNING_TABS.find((t) => t.code === $scope.tuning.tab);
      return tab ? tab.label.charAt(0) + tab.label.slice(1).toLowerCase() : "";
    };
    $scope.toggleUnlocks = function(slot) {
      if (!data) return;
      const on = $scope.slots[slot].unlocked !== UNLOCK_COUNT;
      const verb = on ? "Unlock" : "Lock";
      if (!confirm(`${verb} everything in car slot ${slot + 1}? This sets the creator's unlock table for this slot. Its effect in-game is not verified.`)) {
        return;
      }
      applyResult(setUnlocks(data, slot, on));
      setStatus("success", `Slot ${slot + 1}: ${on ? "unlock table set to all unlocked" : "unlock table cleared"}.`);
    };
    $scope.toggleLock = function(slot) {
      if (!data) return;
      const locked = !isSlotLocked(data, slot);
      applyResult(setSlotLocked(data, slot, locked));
      setStatus("success", `Slot ${slot + 1} ${locked ? "locked" : "unlocked"}.`);
    };
    $scope.canExpandTo25 = function() {
      if (!$scope.loaded || !data) return false;
      return slotCount(data) < 25;
    };
    $scope.expandTo25Slots = function() {
      if (!$scope.loaded || !data) return;
      if (slotCount(data) >= 25) return;
      if (!confirm("Expand this profile to 25 car slots?\n\nThis creates/updates GARAGE.DAT with slots 6 to 25 and enables saving as an nfsu2-web backup ZIP.")) return;
      const careerBytes2 = data.subarray(0, PROFILE_SIZE);
      let garage;
      if (backup && backup.profiles[backup.current]?.garageEntry >= 0) {
        const origGarage = backup.zip.entries[backup.profiles[backup.current].garageEntry].data;
        garage = new Uint8Array(GARAGE_HEADER_SIZE + 20 * SLOT_STRIDE);
        garage.set(origGarage.subarray(0, Math.min(origGarage.length, garage.length)));
        for (let i = 0; i < 4; i++) garage[i] = GARAGE_MAGIC[i];
        dataView(garage).setUint32(4, 2, true);
        for (let i = 0; i < 20; i++) {
          const off = GARAGE_HEADER_SIZE + i * SLOT_STRIDE;
          if (dataView(garage).getUint32(off + 4, true) === 0) {
            dataView(garage).setUint32(off + 4, gameHash(`CAREER_SLOT_${5 + i}`), true);
          }
        }
      } else {
        garage = createDefaultGarage(careerBytes2, 25);
      }
      const next = mergeGarage(careerBytes2, garage);
      if (backup) {
        const p = backup.profiles[backup.current];
        if (p.garageEntry >= 0) {
          backup.zip.entries[p.garageEntry].data = garage;
        } else {
          p.garageEntry = backup.zip.entries.length;
          backup.zip.entries.push({
            name: `${p.folder}/GARAGE.DAT`,
            data: garage,
            time: 0,
            date: 0,
            utf8: false,
            versionMadeBy: 20,
            internalAttributes: 0,
            externalAttributes: 0
          });
        }
        p.garageState = "loaded";
        p.slotCount = 25;
        backup.work.set(backup.current, next);
        backupView();
      } else {
        const baseName = $scope.fileName ? $scope.fileName.replace(/\.[^/.]+$/, "") : "Career";
        const folder = `NFS Underground 2/${baseName}`;
        backup = {
          zip: {
            entries: [
              { name: `${folder}/${baseName}`, data: careerBytes2.slice(), time: 0, date: 0, utf8: false, versionMadeBy: 20, internalAttributes: 0, externalAttributes: 0 },
              { name: `${folder}/GARAGE.DAT`, data: garage, time: 0, date: 0, utf8: false, versionMadeBy: 20, internalAttributes: 0, externalAttributes: 0 }
            ],
            comment: new Uint8Array(0)
          },
          profiles: [{
            name: baseName,
            folder,
            careerEntry: 0,
            garageEntry: 1,
            garageState: "loaded",
            note: "nfsu2-web GARAGE.DAT loaded: slots 6-25 are available (25 slots total).",
            slotCount: 25
          }],
          work: /* @__PURE__ */ new Map([[0, next]]),
          current: 0
        };
        backupView();
      }
      applyResult(next);
      setStatus("success", "Expanded to 25 car slots! Slots 6 to 25 are now available.");
    };
    $scope.closeTuning = function() {
      $scope.tuning.open = false;
    };
    $scope.togglePart = function(part) {
      if (!data) return;
      if (!partsByIndex.get(part.index)?.active) {
        rebuildTuning();
        setStatus("error", "This ID is absent from the examined active item table; its bytes were left unchanged.");
        return;
      }
      if (!tuningPerfIndexSet.has(part.index)) {
        rebuildTuning();
        setStatus("error", "This ID is not available in performance tuning; its bytes were left unchanged.");
        return;
      }
      applyResult(setPerfFlag(data, $scope.tuning.slot, part.index, part.on));
    };
    $scope.toggleUnique = function(part) {
      if (!data) return;
      try {
        applyResult(setUniquePerfFlag(data, $scope.tuning.slot, part.index, part.on));
        setStatus("success", `Unique ${part.label} flag updated. Download to save.`);
      } catch (err) {
        rebuildTuning();
        setStatus("error", errorMessage(err));
      }
    };
    $scope.maxOut = function(slot) {
      if (!data) return;
      let next = setPerfFlags(data, slot, TUNING_PERF_INDICES, true);
      for (const part of UNIQUE_PERF_PARTS) {
        next = setUniquePerfFlag(next, slot, part.index, true);
      }
      applyResult(next);
      setStatus("success", `All ${TUNING_PERF_INDICES.length} performance flags and ${UNIQUE_PERF_PARTS.length} unique flags set on car slot ${slot + 1}. Download to save.`);
    };
    $scope.swapSlots = function(slot) {
      if (!data) return;
      const raw = $scope.swapTarget[slot];
      if (raw === void 0 || raw === "") return;
      const target = Number(raw);
      if (!confirm(`Swap car slot ${slot + 1} with slot ${target + 1}? This is experimental and exchanges car data while each slot keeps its own handle.`)) {
        return;
      }
      $scope.tuning.open = false;
      applyResult(swapSlots(data, slot, target));
      $scope.swapTarget[slot] = "";
      setStatus("success", `Swapped slots ${slot + 1} and ${target + 1}.`);
    };
    $scope.replaceCar = function(slot) {
      if (!data) return;
      const raw = $scope.replaceTarget[slot];
      if (raw === void 0 || raw === "") return;
      const traffic = TRAFFIC_CARS.find((car) => raw === `traffic:${car.hash}`);
      if (traffic) {
        replaceTrafficCar(slot, traffic.hash);
        return;
      }
      const donor = donors[Number(raw)];
      if (!donor) return;
      const current = $scope.slots[slot].car ? $scope.slots[slot].car?.name : "an unknown car";
      const verb = $scope.slots[slot].used ? `Replace ${current} in slot ${slot + 1} with ${donor.name}?` : `Put ${donor.name} in empty slot ${slot + 1}?`;
      if (!confirm(`${verb}

Only this slot changes. Appearance is reset; vinyls, decals and neon are cleared. Installed parts are reset to stock. Dyno tuning is kept.`)) {
        return;
      }
      try {
        applyResult(setSlotCar(data, slot, donor));
        $scope.replaceTarget[slot] = "";
        setStatus("success", `Slot ${slot + 1} is now ${donor.name}. Test in game before relying on it.`);
      } catch (err) {
        setStatus("error", errorMessage(err));
      }
    };
    function replaceTrafficCar(slot, hash) {
      if (!data) return;
      const car = TRAFFIC_CARS.find((car2) => car2.hash === hash);
      if (!car) {
        setStatus("error", "Select a traffic vehicle first.");
        return;
      }
      try {
        $scope.tuning.open = false;
        applyResult(setSlotTrafficCar(data, slot, car.hash));
        $scope.replaceTarget[slot] = "";
        setStatus("success", `Experimental ${car.name} identity set in slot ${slot + 1}. Conversion is incomplete; test only with a backup.`);
      } catch (err) {
        setStatus("error", errorMessage(err));
      }
    }
    $scope.loadGameData = function(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        $scope.$apply(() => {
          try {
            const bytes = new Uint8Array(reader.result);
            const nextGame = parseGameData(bytes);
            const nextVisuals = parseVisualData(bytes, nextGame.cars);
            game = nextGame;
            visuals = nextVisuals;
            $scope.tuning.dyno.gameName = file.name;
            $scope.tuning.dyno.gameError = "";
            try {
              career = parseCareerDatabase(bytes, nextGame.cars);
              $scope.career.gameName = file.name;
              $scope.career.error = "";
            } catch (err) {
              career = null;
              $scope.career.gameName = "";
              $scope.career.error = errorMessage(err);
            }
          } catch (err) {
            game = null;
            visuals = null;
            $scope.tuning.dyno.gameName = "";
            $scope.tuning.dyno.gameError = errorMessage(err);
            career = null;
            $scope.career.gameName = "";
            $scope.career.error = errorMessage(err);
          }
          drafts.clear();
          visualDraft = null;
          rebuildDyno();
          rebuildVisual();
          rebuildCareer();
        });
      };
      reader.onerror = () => $scope.$apply(() => {
        $scope.tuning.dyno.gameError = "Could not read the file.";
        $scope.career.error = "Could not read the file.";
      });
      reader.readAsArrayBuffer(file);
    };
    $scope.editVisual = function(row) {
      if (!data || !visuals) return;
      try {
        const next = visuals.edit(visualDraft ?? data, $scope.tuning.slot, row.id, row.value);
        visualDraft = sameBytes(next, data) ? null : next;
        rebuildVisual();
      } catch (err) {
        setStatus("error", errorMessage(err));
        rebuildVisual();
      }
    };
    $scope.applyVisual = function() {
      if (!visualDraft) return;
      const next = visualDraft;
      visualDraft = null;
      applyResult(next);
      setStatus("success", "Visual parts applied. Download to save; test in game with a backup.");
    };
    $scope.discardVisual = function() {
      visualDraft = null;
      rebuildVisual();
    };
    $scope.editScalar = function(row, byte) {
      try {
        if (!Number.isFinite(byte)) throw new RangeError("Enter a finite tuning value.");
        const value = row.stock + (byte - 100) * (row.max - row.min) / 100;
        editSetup((bytes, model) => model.withScalarValue(bytes, row.param, value));
      } catch (err) {
        setStatus("error", errorMessage(err));
        rebuildDyno();
      }
    };
    $scope.resetScalar = function(param) {
      const row = $scope.tuning.dyno.scalars.find((r) => r.param === param);
      if (!row) return;
      try {
        editSetup((bytes, model) => model.withScalarValue(bytes, param, row.stock));
      } catch (err) {
        setStatus("error", errorMessage(err));
      }
    };
    $scope.selectSetup = function(setup) {
      $scope.tuning.dyno.setup = setup;
      rebuildDyno();
    };
    $scope.optimizeDyno = function() {
      const view2 = $scope.tuning.dyno;
      const built = dynoModel();
      if ("reason" in built || view2.busy) return;
      const key = draftKey(), event = view2.setup, gearing = view2.optimizeGearing;
      const start = currentSetup(built);
      view2.busy = true;
      setTimeout(() => {
        $scope.$apply(() => {
          try {
            const result = optimizeDynoSetup(built.model, start, event, gearing);
            if (view2.optimizeGearing === gearing && draftKey() === key) {
              drafts.set(key, { bytes: result.setup, band: result.band });
              if (sameBytes(result.setup, start)) setStatus("success", "Auto-tune found no better setup.");
            }
          } catch (err) {
            setStatus("error", errorMessage(err));
          }
          view2.busy = false;
          rebuildDyno();
        });
      }, 30);
    };
    $scope.applyDyno = function() {
      const built = dynoModel();
      const key = draftKey(), bytes = drafts.get(key)?.bytes;
      if (!data || !bytes || "reason" in built) return;
      const slot = $scope.tuning.slot, setup = $scope.tuning.dyno.setup, saved = built.setups[setup];
      const changed = (from, to) => !sameBytes(bytes.subarray(from, to), saved.subarray(from, to));
      const gearing = changed(9, 16);
      const scalars = changed(0, 9) || changed(16, 23);
      const parts = [
        changed(ECU_OFF, TURBO_OFF) && "ECU",
        changed(TURBO_OFF, SETUP_SIZE) && "turbo",
        gearing && "gearing",
        scalars && "scalar tuning"
      ].filter(Boolean).join(", ");
      drafts.delete(key);
      applyResult(setSetupTuning(data, slot, setup, bytes, gearing, scalars), true);
      setStatus("success", `Slot ${slot + 1}: ${SETUP_NAMES[setup]} ${parts || "setup"} saved. Download to keep the changes.`);
    };
    $scope.discardDyno = function() {
      drafts.delete(draftKey());
      rebuildDyno();
    };
    $scope.selectCurve = function(kind) {
      $scope.tuning.dyno.curve = kind;
      rebuildDyno();
    };
    $scope.selectPoint = function(index) {
      $scope.tuning.dyno.point = Math.min(Math.max(index, 0), CURVE_POINTS - 1);
      rebuildDyno();
    };
    $scope.stepPoint = function(delta) {
      const point = currentPoints()?.[$scope.tuning.dyno.point];
      if (!point) return;
      const from = Math.min(Math.max(point.byte, point.minByte), point.maxByte);
      setCurvePoint($scope.tuning.dyno.point, point, Math.min(Math.max(from + delta, point.minByte), point.maxByte));
    };
    $scope.resetCurve = function() {
      if ($scope.tuning.dyno.curve === "drive") {
        const current = currentGearing();
        if (current) editSetup((bytes) => {
          for (const row of current.gearing.rows) bytes[row.param] = NEUTRAL_BYTE;
          return bytes;
        });
        return;
      }
      editPoints((bytes, off) => bytes.fill(NEUTRAL_BYTE, off, off + CURVE_POINTS));
    };
    $scope.selectGear = function(index) {
      $scope.tuning.dyno.gear = Math.max(index, 0);
      rebuildDyno();
    };
    $scope.stepGear = function(delta) {
      const current = currentGearing();
      const row = current?.gearing.rows[$scope.tuning.dyno.gear];
      if (!row) return;
      const span = row.max - row.min;
      const byte = Math.round(100 + 100 * (row.ratio - row.stock) / span) + (row.speed === null ? delta : -delta);
      setGearRatio(row.param, row.stock + span * (byte - 100) / 100);
    };
    $scope.gearPointer = function(event, index, start) {
      const current = currentGearing(), row = current?.gearing.rows[index];
      if (!current || !row || $scope.tuning.dyno.busy || !start && ((event.buttons & 1) === 0 || index !== $scope.tuning.dyno.gear)) return;
      if (start) event.preventDefault();
      const rect = event.currentTarget.getBoundingClientRect();
      if (!rect.width) return;
      const f = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
      $scope.tuning.dyno.gear = index;
      if (row.speed === null) setGearRatio(row.param, row.min + f * (row.max - row.min));
      else setGearRatio(row.param, current.gearing.speedFactor / Math.max(f * GEAR_SCALE_KMH, 1));
    };
    $scope.gearKey = function(event) {
      const step = event.shiftKey ? 10 : 1;
      const actions = {
        ArrowUp: () => $scope.selectGear($scope.tuning.dyno.gear - 1),
        ArrowDown: () => $scope.selectGear($scope.tuning.dyno.gear + 1),
        ArrowLeft: () => $scope.stepGear(-step),
        ArrowRight: () => $scope.stepGear(step)
      };
      const action = actions[event.key];
      if (!action || $scope.tuning.dyno.busy) return;
      event.preventDefault();
      action();
    };
    $scope.curvePointer = function(event, start) {
      const view2 = $scope.tuning.dyno, chart = view2.chart, points = currentPoints();
      if (!chart || !points || view2.busy || !start && (event.buttons & 1) === 0) return;
      if (start) event.preventDefault();
      const rect = event.currentTarget.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (event.clientX - rect.left) / rect.width * chart.width;
      const y = (event.clientY - rect.top) / rect.height * chart.height;
      const columnWidth = chart.columns[0].width;
      const index = Math.min(Math.max(Math.floor((x - chart.left) / columnWidth), 0), CURVE_POINTS - 1);
      const nm = (chart.bottom - y) / (chart.bottom - chart.top) * chart.yMax;
      view2.point = index;
      setCurvePoint(index, points[index], DynoModel.curveByte(points[index], nm));
    };
    $scope.curveKey = function(event) {
      const step = event.shiftKey ? 10 : 1;
      const actions = {
        ArrowLeft: () => $scope.selectPoint($scope.tuning.dyno.point - 1),
        ArrowRight: () => $scope.selectPoint($scope.tuning.dyno.point + 1),
        ArrowUp: () => $scope.stepPoint(step),
        ArrowDown: () => $scope.stepPoint(-step)
      };
      const action = actions[event.key];
      if (!action || $scope.tuning.dyno.busy) return;
      event.preventDefault();
      action();
    };
    $scope.download = function() {
      if (!data) return;
      let out;
      let name = $scope.fileName || "career";
      let message = "Downloaded with recalculated checksums.";
      if (backup) {
        const entries = backup.zip.entries.map((entry) => ({ ...entry }));
        const stamp = dosDateTime();
        const replace = (index, bytes) => {
          const entry = entries[index];
          if (entry.data.length === bytes.length && entry.data.every((byte, i) => byte === bytes[i])) return;
          entries[index] = { ...entry, data: bytes, ...stamp };
        };
        for (const [index, working] of backup.work) {
          const profile = backup.profiles[index];
          const career2 = recalculateChecksums(careerBytes(working));
          replace(profile.careerEntry, career2);
          if (profile.garageState === "loaded") {
            replace(profile.garageEntry, buildGarage(backup.zip.entries[profile.garageEntry].data, working, career2));
          }
        }
        out = writeZip({ entries, comment: backup.zip.comment });
        if (!/\.zip$/i.test(name)) name += ".zip";
        message = "Downloaded nfsu2-web backup ZIP with recalculated save checksums and GARAGE.DAT fingerprints.";
      } else {
        out = recalculateChecksums(data);
      }
      const url = URL.createObjectURL(new Blob([out], { type: backup ? "application/zip" : "application/octet-stream" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
      setStatus("success", message);
    };
  }
  function errorMessage(err) {
    return err instanceof Error ? err.message : String(err);
  }
  function hex(value, digits = 4) {
    return `0x${value.toString(16).toUpperCase().padStart(digits, "0")}`;
  }
  function sameBytes(a, b) {
    return a.length === b.length && a.every((byte, i) => byte === b[i]);
  }
  function curveChart(points, selected) {
    const width = 560, height = 270, left = 44, right = 8, top = 10, bottom = 236;
    const highest = Math.max(...points.flatMap((p2) => [p2.max, p2.value, p2.effective, p2.stock]), 1);
    const step = [10, 20, 25, 50, 100, 200, 250, 500].find((s2) => highest / s2 <= 6) ?? 1e3;
    const yMax = Math.ceil(highest / step) * step;
    const y = (nm) => bottom - Math.min(Math.max(nm, 0), yMax) / yMax * (bottom - top);
    const columnWidth = (width - left - right) / points.length;
    const num = (v) => Math.round(v).toLocaleString("en-US");
    const columns = points.map((p2, index) => {
      const valueY = y(p2.value);
      return {
        index,
        x: left + index * columnWidth,
        width: columnWidth,
        rangeY: y(p2.max),
        rangeH: Math.max(y(p2.min) - y(p2.max), 1),
        stockY: y(Math.min(Math.max(p2.stock, p2.min), p2.max)),
        valueY,
        valueH: bottom - valueY,
        effY: y(p2.effective),
        rpmLabel: `${(p2.rpm / 1e3).toFixed(1)}k`
      };
    });
    const ticks = Array.from({ length: Math.round(yMax / step) + 1 }, (_, i) => ({ y: y(i * step), label: num(i * step) }));
    const p = points[Math.min(Math.max(selected, 0), points.length - 1)];
    const stock = Math.min(Math.max(p.stock, p.min), p.max);
    const diff = p.value - stock;
    const shifted = Math.round(p.effective) !== Math.round(p.value);
    return {
      width,
      height,
      left,
      top,
      bottom,
      yMax,
      ticks,
      columns,
      selected: {
        rpm: `${num(p.rpm)} rpm`,
        value: `${num(p.value)} N\xB7m`,
        stock: `${num(stock)} N\xB7m`,
        range: `${num(p.min)}\u2013${num(p.max)} N\xB7m`,
        change: Math.round(diff) === 0 ? "At stock" : `${diff > 0 ? "+" : "\u2212"}${num(Math.abs(diff))} N\xB7m vs stock`,
        canDown: p.byte > p.minByte,
        canUp: p.byte < p.maxByte,
        effective: shifted ? `${num(p.effective)} N\xB7m` : "",
        beyond: p.effective > p.max + 0.5 || p.effective < p.min - 0.5
      }
    };
  }
  function gearChart(gearing, selected) {
    const pct = (kmh2) => Math.min(Math.max(kmh2 / GEAR_SCALE_KMH * 100, 0), 100);
    const kmh = (v) => `${v.toFixed(1)} km/h`;
    const rows = gearing.rows.map((r2) => {
      if (r2.speed === null) {
        const at = (v) => (v - r2.min) / (r2.max - r2.min) * 100;
        return { param: r2.param, label: r2.label, value: r2.ratio.toFixed(2), sub: "ratio", final: true, lo: 0, hi: 100, at: at(r2.ratio), stock: at(r2.stock) };
      }
      return {
        param: r2.param,
        label: r2.label,
        value: kmh(r2.speed),
        sub: `${(r2.speed / MPH_TO_KMH).toFixed(1)} mph`,
        final: false,
        lo: pct(r2.minSpeed),
        hi: pct(r2.maxSpeed),
        at: pct(r2.speed),
        stock: pct(gearing.speedFactor / r2.stock)
      };
    });
    const r = gearing.rows[Math.min(Math.max(selected, 0), gearing.rows.length - 1)];
    const eps = 1e-6;
    const lower = r.ratio > r.min + eps, higher = r.ratio < r.max - eps;
    const selectedView = r.speed === null ? {
      label: r.label,
      value: r.ratio.toFixed(2),
      stock: r.stock.toFixed(2),
      range: `${r.min.toFixed(2)}\u2013${r.max.toFixed(2)}`,
      downLabel: "Top speed",
      upLabel: "Acceleration",
      canDown: lower,
      canUp: higher
    } : {
      label: r.label,
      value: `${kmh(r.speed)} (ratio ${r.ratio.toFixed(2)})`,
      stock: kmh(gearing.speedFactor / r.stock),
      range: `${r.minSpeed.toFixed(1)}\u2013${kmh(r.maxSpeed)}`,
      downLabel: "Slower",
      upLabel: "Faster",
      canDown: higher,
      canUp: lower
    };
    const ticks = Array.from({ length: GEAR_SCALE_KMH / 60 + 1 }, (_, i) => ({ at: pct(i * 60), label: String(i * 60) }));
    return { rows, ticks, selected: selectedView };
  }
  function dynoRows(before, after) {
    const num = (v, digits = 0) => v.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
    const time = (v) => ({ metric: Number.isFinite(v) ? `${num(v, 2)} s` : "\u2013", imperial: "", rpm: "" });
    const speed = (mph) => ({ metric: `${num(mph * MPH_TO_KMH)} km/h`, imperial: `${num(mph)} mph`, rpm: "" });
    const specs = [
      [
        "Peak power",
        "",
        (r) => r.peakPower,
        (r) => ({ metric: `${num(r.peakPower)} kW`, imperial: `${num(r.peakPower * KW_TO_HP)} hp`, rpm: `${num(r.peakPowerRpm)} rpm` }),
        true
      ],
      [
        "Peak torque",
        "",
        (r) => r.peakTorque,
        (r) => ({ metric: `${num(r.peakTorque)} N\xB7m`, imperial: `${num(r.peakTorque * NM_TO_LBFT)} lb-ft`, rpm: `${num(r.peakTorqueRpm)} rpm` }),
        true
      ],
      ["0\u201360 mph", "0\u201397 km/h", (r) => r.t60, (r) => time(r.t60), false],
      ["0\u2013100 mph", "0\u2013161 km/h", (r) => r.t100, (r) => time(r.t100), false],
      ["Quarter mile", "402 m", (r) => r.quarterMile, (r) => time(r.quarterMile), false],
      ["Trap speed", "", (r) => r.trapSpeed, (r) => speed(r.trapSpeed), true],
      ["Top speed", "", (r) => r.topSpeed, (r) => speed(r.topSpeed), true]
    ];
    return specs.map(([label, sub, value, cell, higher]) => {
      const b = cell(before), a = after ? cell(after) : null;
      const changed = a !== null && (a.metric !== b.metric || a.imperial !== b.imperial);
      return {
        label,
        sub,
        before: b,
        after: a,
        better: changed && after !== null && (higher ? value(after) > value(before) : value(after) < value(before))
      };
    });
  }

  // src/controller/file-change.ts
  function nfsuFileChange() {
    return {
      restrict: "A",
      link(scope, element, attrs) {
        element.on("change", (event) => {
          const input = event.target;
          const file = input.files && input.files[0];
          scope.$apply(() => {
            const name = attrs["nfsuFileChange"];
            const handler = scope[name];
            handler(file ?? null);
          });
        });
      }
    };
  }

  // src/controller/range-change.ts
  function nfsuRangeChange() {
    return {
      restrict: "A",
      link(scope, element, attrs) {
        const input = element[0];
        const change = () => scope.$evalAsync(() => scope.$eval(attrs["nfsuRangeChange"], { $value: Number(input.value) }));
        element.on("input", change);
        scope.$on("$destroy", () => element.off("input", change));
      }
    };
  }

  // src/main.ts
  angular.module("nfsu2Editor", []).directive("nfsuFileChange", nfsuFileChange).directive("nfsuRangeChange", nfsuRangeChange).controller("EditorController", ["$scope", EditorController]);
})();

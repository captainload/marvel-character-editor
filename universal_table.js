/**
 * Marvel Super Heroes (FASERIP) - Universal Action Table & FEAT Resolution Engine
 * Authoritative implementation adhering to the Advanced Set and 1991 Revised Box.
 */

const RANKS = [
  { name: "Shift 0", num: 0, abbr: "Sh0", color: "#64748b" },
  { name: "Feeble", num: 2, abbr: "Fe", color: "#94a3b8" },
  { name: "Poor", num: 4, abbr: "Pr", color: "#a1a1aa" },
  { name: "Typical", num: 6, abbr: "Ty", color: "#10b981" },
  { name: "Good", num: 10, abbr: "Gd", color: "#059669" },
  { name: "Excellent", num: 20, abbr: "Ex", color: "#0284c7" },
  { name: "Remarkable", num: 30, abbr: "Rm", color: "#2563eb" },
  { name: "Incredible", num: 40, abbr: "In", color: "#7c3aed" },
  { name: "Amazing", num: 50, abbr: "Am", color: "#9333ea" },
  { name: "Monstrous", num: 75, abbr: "Mn", color: "#ea580c" },
  { name: "Unearthly", num: 100, abbr: "Un", color: "#e11d48" },
  { name: "Shift X", num: 150, abbr: "ShX", color: "#be123c" },
  { name: "Shift Y", num: 250, abbr: "ShY", color: "#9f1239" },
  { name: "Shift Z", num: 500, abbr: "ShZ", color: "#881337" },
  { name: "Class 1000", num: 1000, abbr: "CL1000", color: "#d97706" },
  { name: "Class 3000", num: 3000, abbr: "CL3000", color: "#b45309" },
  { name: "Class 5000", num: 5000, abbr: "CL5000", color: "#78350f" },
  { name: "Beyond", num: 10000, abbr: "Bey", color: "#f59e0b" }
];

// Universal Table Percentile Thresholds: [Green Min, Yellow Min, Red Min]
// 01 to (Green Min - 1) = White (Failure)
const UNIVERSAL_TABLE = {
  "Shift 0":    [66, 95, 100],
  "Feeble":     [61, 91, 100],
  "Poor":       [56, 86, 100],
  "Typical":    [51, 81, 98],
  "Good":       [46, 76, 98],
  "Excellent":  [41, 71, 95],
  "Remarkable": [36, 66, 95],
  "Incredible": [31, 61, 91],
  "Amazing":    [26, 56, 91],
  "Monstrous":  [21, 51, 86],
  "Unearthly":  [16, 46, 86],
  "Shift X":    [11, 41, 81],
  "Shift Y":    [07, 36, 81],
  "Shift Z":    [04, 31, 76],
  "Class 1000": [02, 26, 71],
  "Class 3000": [02, 21, 66],
  "Class 5000": [02, 16, 61],
  "Beyond":     [02, 11, 51]
};

const UniversalTableEngine = {
  ranks: RANKS,
  table: UNIVERSAL_TABLE,

  getRankByName(name) {
    if (!name) return RANKS[3]; // Default Typical
    const norm = String(name).trim().toLowerCase();
    return RANKS.find(r => r.name.toLowerCase() === norm || r.abbr.toLowerCase() === norm) ||
           RANKS.find(r => norm.includes(r.name.toLowerCase())) ||
           RANKS[3];
  },

  getRankByIndex(idx) {
    const clamped = Math.max(0, Math.min(idx, RANKS.length - 1));
    return RANKS[clamped];
  },

  getRankIndex(name) {
    const rank = this.getRankByName(name);
    return RANKS.indexOf(rank);
  },

  applyColumnShift(rankName, shift) {
    let idx = this.getRankIndex(rankName);
    if (idx === -1) idx = 3;
    let newIdx = idx + (parseInt(shift) || 0);
    newIdx = Math.max(0, Math.min(newIdx, RANKS.length - 1));
    return RANKS[newIdx];
  },

  /**
   * Resolves a d100 roll against a specific FASERIP rank.
   */
  resolveFEAT(rankName, roll, shift = 0) {
    const finalRank = this.applyColumnShift(rankName, shift);
    const thresholds = UNIVERSAL_TABLE[finalRank.name] || [51, 81, 98];
    const [greenMin, yellowMin, redMin] = thresholds;

    const r = Math.max(1, Math.min(100, parseInt(roll) || 1));
    let color = "White";
    let isSuccess = false;

    if (r >= redMin) {
      color = "Red";
      isSuccess = true;
    } else if (r >= yellowMin) {
      color = "Yellow";
      isSuccess = true;
    } else if (r >= greenMin) {
      color = "Green";
      isSuccess = true;
    } else {
      color = "White";
      isSuccess = false;
    }

    return {
      roll: r,
      initialRank: rankName,
      shift: shift,
      effectiveRank: finalRank.name,
      rankNumber: finalRank.num,
      thresholds: { green: greenMin, yellow: yellowMin, red: redMin },
      color: color,
      isSuccess: isSuccess
    };
  },

  /**
   * Translates a FEAT result into specific Battle Effects based on action type.
   */
  getBattleEffect(actionType, color, damageValue = 0) {
    const type = (actionType || "slugfest").toLowerCase();
    
    switch (type) {
      case "slugfest":
      case "blunt":
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Blunt damage` };
        if (color === "Yellow") return { hit: true, desc: `Slam FEAT! (${damageValue} damage. Target must make Endurance FEAT or be Slammed)` };
        if (color === "Red") return { hit: true, desc: `Stun FEAT! (${damageValue} damage. Target must make Endurance FEAT or be Stunned 1-10 turns)` };
        break;

      case "edged":
      case "slashing":
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Edged damage` };
        if (color === "Yellow") return { hit: true, desc: `Stun FEAT! (${damageValue} damage. Target must make Endurance FEAT or be Stunned 1-10 turns)` };
        if (color === "Red") return { hit: true, desc: `Kill FEAT! (${damageValue} damage. Target must make Endurance FEAT or suffer mortal injury)` };
        break;

      case "shooting":
      case "missile":
      case "bullet":
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Shooting damage` };
        if (color === "Yellow") return { hit: true, desc: `Bullseye! (Hit specific component / disarm, ${damageValue} damage)` };
        if (color === "Red") return { hit: true, desc: `Kill Result! (${damageValue} damage. Target must make Endurance FEAT or be mortally wounded)` };
        break;

      case "energy":
      case "blast":
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Energy damage` };
        if (color === "Yellow") return { hit: true, desc: `Bullseye! (${damageValue} damage, pinpoint accuracy)` };
        if (color === "Red") return { hit: true, desc: `Disintegrate / Kill FEAT! (${damageValue} damage, material destruction)` };
        break;

      case "force":
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Force damage` };
        if (color === "Yellow") return { hit: true, desc: `Bullseye / Slam! (${damageValue} damage, target checked for Slam)` };
        if (color === "Red") return { hit: true, desc: `Stun FEAT! (${damageValue} damage, target checked for Stun)` };
        break;

      case "charging":
        if (color === "White") return { hit: false, desc: "Miss! Charger continues into adjacent area or crashes." };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Charge damage` };
        if (color === "Yellow") return { hit: true, desc: `Slam! (${damageValue} damage, target slammed 1-10 areas)` };
        if (color === "Red") return { hit: true, desc: `Grand Slam & Stun! (${damageValue} damage, target slammed and stunned)` };
        break;

      case "grapple":
      case "grappling":
        if (color === "White") return { hit: false, desc: "Hold failed / Opponent slips free." };
        if (color === "Green") return { hit: true, desc: "Partial Hold: Target can perform actions at -2CS." };
        if (color === "Yellow") return { hit: true, desc: "Full Hold: Target pinned; cannot move or attack until escaped." };
        if (color === "Red") return { hit: true, desc: "Master Hold / Damage: Target pinned and takes Strength damage." };
        break;

      case "dodge":
      case "dodging":
        if (color === "White") return { hit: false, desc: "Dodge failed. Incoming attacks resolved at 0CS modifier (1991 Revised rule)." };
        if (color === "Green") return { hit: true, desc: "Evasive Dodge: Imposes -2CS on all incoming ranged attacks this round." };
        if (color === "Yellow") return { hit: true, desc: "Agile Dodge: Imposes -4CS on all incoming ranged attacks this round." };
        if (color === "Red") return { hit: true, desc: "Master Dodge: Imposes -6CS on all incoming ranged attacks this round." };
        break;

      case "evade":
      case "evading":
        if (color === "White") return { hit: false, desc: "Evade failed. Incoming slugfest attacks resolved at 0CS." };
        if (color === "Green") return { hit: true, desc: "Footwork Evade: -2CS to enemy slugfest attacks this round." };
        if (color === "Yellow") return { hit: true, desc: "Superior Evade: -4CS to enemy slugfest attacks this round." };
        if (color === "Red") return { hit: true, desc: "Flawless Evade: -6CS to enemy slugfest attacks this round." };
        break;

      case "escape":
        if (color === "White") return { hit: false, desc: "Escape failed. Hero remains held or pinned." };
        if (color === "Green") return { hit: true, desc: "Broke Free! Hero slips out of hold and may take half-speed movement." };
        if (color === "Yellow") return { hit: true, desc: "Clean Escape! Broke free with advantage; foe at -1CS next turn." };
        if (color === "Red") return { hit: true, desc: "Reversal! Hero escapes hold and immediately puts foe into a hold." };
        break;

      case "catch":
        if (color === "White") return { hit: false, desc: "Catch failed. Object or character falls past or strikes hero." };
        if (color === "Green") return { hit: true, desc: "Caught safely! Falling ally or thrown item securely caught." };
        if (color === "Yellow") return { hit: true, desc: "Cushioned Catch: Intercepted with superior finesse, zero impact damage." };
        if (color === "Red") return { hit: true, desc: "Perfect Interception: Caught cleanly; hero may immediately redirect or throw." };
        break;

      case "block":
        if (color === "White") return { hit: false, desc: "Block failed. Hero absorbs full damage from incoming attack." };
        if (color === "Green") return { hit: true, desc: "Solid Block: Absorbs damage up to shield or limb material strength." };
        if (color === "Yellow") return { hit: true, desc: "Deflective Block: Attacker takes recoil and is thrown off balance (-1CS)." };
        if (color === "Red") return { hit: true, desc: "Counter Block: Full deflection and attacker opens up for immediate counter-attack." };
        break;

      case "defense":
      case "forcefield":
        if (color === "White") return { hit: false, desc: "Defense failed or disrupted." };
        if (color === "Green") return { hit: true, desc: `Shield Active: Absorbs up to ${damageValue} points of damage.` };
        if (color === "Yellow") return { hit: true, desc: `Reinforced Defense: Absorbs ${damageValue} damage; deflects kinetic impact.` };
        if (color === "Red") return { hit: true, desc: `Impenetrable Barrier: Fully absorbs attack; field holds with zero strain.` };
        break;

      case "reflection":
        if (color === "White") return { hit: false, desc: "Reflection failed; hero takes full attack damage." };
        if (color === "Green") return { hit: true, desc: `Reflected: Attack deflected harmlessly away from hero.` };
        if (color === "Yellow") return { hit: true, desc: `Partial Redirect: Reflected back at attacker for half damage.` };
        if (color === "Red") return { hit: true, desc: `Full Reflection: 100% of attack redirected straight back at attacker!` };
        break;

      case "stunt":
        if (color === "White") return { hit: false, desc: "Stunt attempt failed! Karma spent but effect did not manifest." };
        if (color === "Green") return { hit: true, desc: "Stunt Successful: Creative power application achieved at standard rank." };
        if (color === "Yellow") return { hit: true, desc: "Remarkable Stunt: Achieved with heightened intensity or secondary effect!" };
        if (color === "Red") return { hit: true, desc: "Incredible Mastery! Spectacular execution; hero advances towards mastering stunt." };
        break;

      default:
        if (color === "White") return { hit: false, desc: "Action Failed." };
        if (color === "Green") return { hit: true, desc: "Standard Success (Green)." };
        if (color === "Yellow") return { hit: true, desc: "Superior Success (Yellow)." };
        if (color === "Red") return { hit: true, desc: "Critical / Maximum Success (Red)." };
        break;
    }

    return { hit: false, desc: "Unknown action" };
  }
};

if (typeof globalThis !== 'undefined') {
  globalThis.RANKS = RANKS;
  globalThis.UNIVERSAL_TABLE = UNIVERSAL_TABLE;
  globalThis.UniversalTableEngine = UniversalTableEngine;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RANKS, UNIVERSAL_TABLE, UniversalTableEngine };
}

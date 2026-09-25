/**
 * Marvel Super Heroes (FASERIP) - Universal Action Table & FEAT Resolution Engine
 * Authoritative implementation supporting:
 * 1. Standard TSR Canonical Universal Table (18 ranks, Advanced Set & 1991 Revised Box)
 * 2. Modified CMF Universal Table & Ranks (22 expanded ranks: +Fantastic 35, Spectacular 45, Sensational 60, Awesome 90, plus Blue Fumble column)
 */

// 1. Canonical TSR Standard Ranks (18 Ranks)
const STANDARD_RANKS = [
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

// Standard TSR Universal Table: [Green Min, Yellow Min, Red Min]
// 01 to (Green Min - 1) = White (Failure)
const STANDARD_TABLE = {
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

// 2. Modified CMF Expanded Ranks (22 Ranks from alternate_universal_table.jpg)
const CMF_RANKS = [
  { name: "Shift 0", num: 0, abbr: "Sh0", color: "#64748b" },
  { name: "Feeble", num: 2, abbr: "Fe", color: "#94a3b8" },
  { name: "Poor", num: 4, abbr: "Pr", color: "#a1a1aa" },
  { name: "Typical", num: 6, abbr: "Ty", color: "#10b981" },
  { name: "Good", num: 10, abbr: "Gd", color: "#059669" },
  { name: "Excellent", num: 20, abbr: "Ex", color: "#0284c7" },
  { name: "Remarkable", num: 30, abbr: "Rm", color: "#2563eb" },
  { name: "Fantastic", num: 35, abbr: "Fa", color: "#4f46e5" },
  { name: "Incredible", num: 40, abbr: "In", color: "#7c3aed" },
  { name: "Spectacular", num: 45, abbr: "Sp", color: "#8b5cf6" },
  { name: "Amazing", num: 50, abbr: "Am", color: "#9333ea" },
  { name: "Sensational", num: 60, abbr: "Sn", color: "#c026d3" },
  { name: "Monstrous", num: 75, abbr: "Mn", color: "#ea580c" },
  { name: "Awesome", num: 90, abbr: "Aw", color: "#d97706" },
  { name: "Unearthly", num: 100, abbr: "Un", color: "#e11d48" },
  { name: "Shift X", num: 150, abbr: "ShX", color: "#be123c" },
  { name: "Shift Y", num: 250, abbr: "ShY", color: "#9f1239" },
  { name: "Shift Z", num: 500, abbr: "ShZ", color: "#881337" },
  { name: "Class 1000", num: 1000, abbr: "CL1000", color: "#b45309" },
  { name: "Class 3000", num: 3000, abbr: "CL3000", color: "#92400e" },
  { name: "Class 5000", num: 5000, abbr: "CL5000", color: "#78350f" },
  { name: "Beyond", num: 10000, abbr: "Bey", color: "#f59e0b" }
];

// Modified CMF Percentile Thresholds: [fumbleMax (0 for none), greenMin, yellowMin, redMin]
// Roll <= fumbleMax: Blue (Fumble / Blunder)
// Roll > fumbleMax and < greenMin: White (Failure)
// Roll >= greenMin and < yellowMin: Green (Standard)
// Roll >= yellowMin and < redMin: Yellow (Superior)
// Roll >= redMin: Red (Critical)
const CMF_TABLE = {
  "Shift 0":     [10, 61, 91, 100],
  "Feeble":      [9,  58, 88, 100],
  "Poor":        [8,  55, 85, 100],
  "Typical":     [7,  52, 82, 96],
  "Good":        [6,  49, 79, 96],
  "Excellent":   [5,  46, 76, 91],
  "Remarkable":  [5,  43, 73, 91],
  "Fantastic":   [4,  40, 70, 85],
  "Incredible":  [4,  37, 67, 85],
  "Spectacular": [3,  34, 64, 79],
  "Amazing":     [3,  31, 61, 79],
  "Sensational": [2,  28, 58, 73],
  "Monstrous":   [2,  25, 55, 73],
  "Awesome":     [1,  22, 52, 67],
  "Unearthly":   [1,  19, 49, 67],
  "Shift X":     [0,  16, 46, 61],
  "Shift Y":     [0,  13, 43, 61],
  "Shift Z":     [0,  10, 40, 55],
  "Class 1000":  [0,  8,  37, 55],
  "Class 3000":  [0,  6,  34, 49],
  "Class 5000":  [0,  4,  31, 49],
  "Beyond":      [0,  2,  28, 43]
};

// Default active exports (mutable references for legacy compatibility)
let RANKS = CMF_RANKS;
let UNIVERSAL_TABLE = CMF_TABLE;

const UniversalTableEngine = {
  activeMode: 'cmf', // 'cmf' (default) | 'standard'
  get tableMode() { return this.activeMode; },
  ranks: CMF_RANKS,
  table: CMF_TABLE,

  setTableMode(mode) {
    if (mode === 'standard') {
      this.activeMode = 'standard';
      this.ranks = STANDARD_RANKS;
      this.table = STANDARD_TABLE;
      RANKS = STANDARD_RANKS;
      UNIVERSAL_TABLE = STANDARD_TABLE;
    } else {
      this.activeMode = 'cmf';
      this.ranks = CMF_RANKS;
      this.table = CMF_TABLE;
      RANKS = CMF_RANKS;
      UNIVERSAL_TABLE = CMF_TABLE;
    }
    if (typeof globalThis !== 'undefined') {
      globalThis.RANKS = RANKS;
      globalThis.UNIVERSAL_TABLE = UNIVERSAL_TABLE;
    }
    return this.activeMode;
  },

  getRankByName(name) {
    if (!name) return this.ranks[3]; // Default Typical
    const norm = String(name).trim().toLowerCase();
    const clean = norm.replace(/[-_]/g, ' ');
    // 1. Match in active table ranks
    let found = this.ranks.find(r => r.name.toLowerCase() === norm || r.name.toLowerCase() === clean || r.abbr.toLowerCase() === norm);
    if (found) return found;
    found = this.ranks.find(r => norm.includes(r.name.toLowerCase()) || clean.includes(r.name.toLowerCase()));
    if (found) return found;

    // 2. Cross-table fallback if rank is from the other table mode
    const altRanks = this.activeMode === 'cmf' ? STANDARD_RANKS : CMF_RANKS;
    found = altRanks.find(r => r.name.toLowerCase() === norm || r.name.toLowerCase() === clean || r.abbr.toLowerCase() === norm) ||
            altRanks.find(r => norm.includes(r.name.toLowerCase()) || clean.includes(r.name.toLowerCase()));
    if (found) return found;

    return this.ranks[3]; // Default Typical
  },

  getRankByIndex(idx) {
    const clamped = Math.max(0, Math.min(idx, this.ranks.length - 1));
    return this.ranks[clamped];
  },

  getRankIndex(name) {
    const rank = this.getRankByName(name);
    let idx = this.ranks.indexOf(rank);
    if (idx === -1 && rank) {
      const mapped = this.getRankByNum(rank.num);
      idx = this.ranks.indexOf(mapped);
    }
    return idx;
  },

  getRankByNum(num) {
    const val = parseInt(num, 10) || 0;
    let matched = this.ranks[0];
    for (let i = 0; i < this.ranks.length; i++) {
      if (this.ranks[i].num <= val) {
        matched = this.ranks[i];
      } else {
        break;
      }
    }
    return matched;
  },

  applyColumnShift(rankName, shift) {
    let idx = this.getRankIndex(rankName);
    if (idx === -1) {
      // If rank was from alternative mode, find its relative placement
      const targetObj = this.getRankByName(rankName);
      idx = this.ranks.findIndex(r => r.num >= targetObj.num);
      if (idx === -1) idx = 3;
    }
    let newIdx = idx + (parseInt(shift) || 0);
    newIdx = Math.max(0, Math.min(newIdx, this.ranks.length - 1));
    return this.ranks[newIdx];
  },

  shiftColumn(rankName, shift) {
    const res = this.applyColumnShift(rankName, shift);
    return res ? res.name : rankName;
  },

  /**
   * Resolves a d100 roll against a specific FASERIP rank under active table mode.
   */
  resolveFEAT(rankName, roll, shift = 0) {
    const finalRank = this.applyColumnShift(rankName, shift);
    const r = Math.max(1, Math.min(100, parseInt(roll) || 1));

    if (this.activeMode === 'cmf') {
      const thresholds = CMF_TABLE[finalRank.name] || [0, 52, 82, 96];
      const [fumbleMax, greenMin, yellowMin, redMin] = thresholds;

      let color = "White";
      let isSuccess = false;
      let isFumble = false;

      if (r >= redMin) {
        color = "Red";
        isSuccess = true;
      } else if (r >= yellowMin) {
        color = "Yellow";
        isSuccess = true;
      } else if (r >= greenMin) {
        color = "Green";
        isSuccess = true;
      } else if (fumbleMax > 0 && r <= fumbleMax) {
        color = "Blue";
        isSuccess = false;
        isFumble = true;
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
        thresholds: { fumble: fumbleMax, green: greenMin, yellow: yellowMin, red: redMin },
        color: color,
        isSuccess: isSuccess,
        isFumble: isFumble,
        mode: 'cmf'
      };
    } else {
      const thresholds = STANDARD_TABLE[finalRank.name] || [51, 81, 98];
      const [greenMin, yellowMin, redMin] = thresholds;

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
        isSuccess: isSuccess,
        isFumble: false,
        mode: 'standard'
      };
    }
  },

  /**
   * Translates a FEAT result into specific Battle Effects based on action type.
   * Includes blunder / fumble results (Blue) from CMF alternate table.
   */
  getBattleEffect(actionType, color, damageValue = 0) {
    const type = (actionType || "slugfest").toLowerCase();

    switch (type) {
      case "slugfest":
      case "blunt":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Uh oh! Critical blunder on blunt strike." };
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Blunt damage` };
        if (color === "Yellow") return { hit: true, desc: `Slam FEAT! (${damageValue} damage. Target must make Endurance FEAT or be Slammed)` };
        if (color === "Red") return { hit: true, desc: `Stun FEAT! (${damageValue} damage. Target must make Endurance FEAT or be Stunned 1-10 turns)` };
        break;

      case "edged":
      case "slashing":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Lose Weapon! Edged weapon knocked from hand or dropped." };
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Edged damage` };
        if (color === "Yellow") return { hit: true, desc: `Stun FEAT! (${damageValue} damage. Target must make Endurance FEAT or be Stunned 1-10 turns)` };
        if (color === "Red") return { hit: true, desc: `Kill FEAT! (${damageValue} damage. Target must make Endurance FEAT or suffer mortal injury)` };
        break;

      case "shooting":
      case "missile":
      case "bullet":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Reload or Jam! Weapon misfires, jams, or runs out of ammunition." };
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Shooting damage` };
        if (color === "Yellow") return { hit: true, desc: `Bullseye! (Hit specific component / disarm, ${damageValue} damage)` };
        if (color === "Red") return { hit: true, desc: `Kill Result! (${damageValue} damage. Target must make Endurance FEAT or be mortally wounded)` };
        break;

      case "throwing_edged":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Projectile Lost! Thrown edged weapon flies wide and is lost." };
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Edged damage` };
        if (color === "Yellow") return { hit: true, desc: `Stun FEAT! (${damageValue} damage)` };
        if (color === "Red") return { hit: true, desc: `Kill FEAT! (${damageValue} damage)` };
        break;

      case "throwing_blunt":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Weapon Lost! Thrown object shatters or is lost." };
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Blunt damage` };
        if (color === "Yellow") return { hit: true, desc: `Solid Hit: ${damageValue} Blunt damage` };
        if (color === "Red") return { hit: true, desc: `Stun FEAT! (${damageValue} damage)` };
        break;

      case "energy":
      case "blast":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Dazed! Energy feedback shocks and dazes hero for 1 round." };
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Energy damage` };
        if (color === "Yellow") return { hit: true, desc: `Bullseye! (${damageValue} damage, pinpoint accuracy)` };
        if (color === "Red") return { hit: true, desc: `Disintegrate / Kill FEAT! (${damageValue} damage, material destruction)` };
        break;

      case "force":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Dazed! Kinetic recoil / shockwave dazes hero for 1 round." };
        if (color === "White") return { hit: false, desc: "Miss" };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Force damage` };
        if (color === "Yellow") return { hit: true, desc: `Bullseye / Slam! (${damageValue} damage, target checked for Slam)` };
        if (color === "Red") return { hit: true, desc: `Stun FEAT! (${damageValue} damage, target checked for Stun)` };
        break;

      case "charging":
        if (color === "Blue") return { hit: false, fumble: true, desc: "FUBAR! Complete disaster; charging hero crashes violently and suffers full charge damage!" };
        if (color === "White") return { hit: false, desc: "Miss! Charger overshoots target; suffers recoil if colliding with a barrier." };
        if (color === "Green") return { hit: true, desc: `Hit: ${damageValue} Charge damage` };
        if (color === "Yellow") return { hit: true, desc: `Slam FEAT! (${damageValue} damage. Target must make Endurance FEAT vs Slam)` };
        if (color === "Red") return { hit: true, desc: `Stun FEAT! (${damageValue} damage. Target must make Endurance FEAT vs Stun)` };
        break;

      case "grapple":
      case "grappling":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Ouch! Grapple reversed; hero pulled off-balance into awkward position." };
        if (color === "White") return { hit: false, desc: "Hold failed / Opponent slips free." };
        if (color === "Green") return { hit: true, desc: "Partial Hold: Target can perform actions at -2CS." };
        if (color === "Yellow") return { hit: true, desc: "Full Hold / Lock: Target pinned; cannot move or attack until escaped." };
        if (color === "Red") return { hit: true, desc: "Master Hold / Damage: Target pinned and takes Strength damage." };
        break;

      case "dodge":
      case "dodging":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Fall to Ground! Hero trips, falls prone, and incoming attacks hit automatically." };
        if (color === "White") return { hit: false, desc: "Dodge failed. Incoming attacks resolved at 0CS modifier." };
        if (color === "Green") return { hit: true, desc: "Evasive Dodge: Imposes -2CS on all incoming ranged attacks this round." };
        if (color === "Yellow") return { hit: true, desc: "Agile Dodge: Imposes -4CS on all incoming ranged attacks this round." };
        if (color === "Red") return { hit: true, desc: "Master Dodge: Imposes -6CS on all incoming ranged attacks this round." };
        break;

      case "evade":
      case "evading":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Autohit +1CS! Hero stumbles into strike; incoming slugfest attacks at +1CS!" };
        if (color === "White") return { hit: false, desc: "Evade failed. Incoming slugfest attacks resolved at 0CS." };
        if (color === "Green") return { hit: true, desc: "Footwork Evade: -2CS to enemy slugfest attacks this round." };
        if (color === "Yellow") return { hit: true, desc: "Superior Evade: -4CS to enemy slugfest attacks this round." };
        if (color === "Red") return { hit: true, desc: "Flawless Evade: -6CS to enemy slugfest attacks this round." };
        break;

      case "escape":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Autohit! Escape attempt completely fails; opponent gains free automatic strike." };
        if (color === "White") return { hit: false, desc: "Escape failed. Hero remains held or pinned." };
        if (color === "Green") return { hit: true, desc: "Broke Free! Hero breaks out of hold and may take up to half-speed movement." };
        if (color === "Yellow") return { hit: true, desc: "Clean Escape! Hero cleanly breaks free of hold." };
        if (color === "Red") return { hit: true, desc: "Reversal! Hero escapes hold and immediately places hold on opponent." };
        break;

      case "catch":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Clumbled Catch! Object fumbled, dropped, or causes recoil damage." };
        if (color === "White") return { hit: false, desc: "Catch failed. Object or character falls past or strikes hero." };
        if (color === "Green") return { hit: true, desc: "Caught safely! Falling ally or thrown item securely caught." };
        if (color === "Yellow") return { hit: true, desc: "Cushioned Catch: Intercepted with superior finesse, zero impact damage." };
        if (color === "Red") return { hit: true, desc: "Perfect Interception: Caught cleanly; hero secures item and may redirect or throw on next action." };
        break;

      case "block":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Autohit! Guard drops or shield knocked aside; incoming attack strikes unobstructed." };
        if (color === "White") return { hit: false, desc: "Block failed. Hero absorbs no damage and takes full incoming damage." };
        if (color === "Green") return { hit: true, desc: "Partial Block: Absorbs damage with temporary Body Armor at Strength -2CS (or shield Material Strength)." };
        if (color === "Yellow") return { hit: true, desc: "Solid Block: Absorbs damage with temporary Body Armor equal to full Strength rank." };
        if (color === "Red") return { hit: true, desc: "Superior Block: Absorbs damage with temporary Body Armor at Strength +1CS; attacker may take rebound damage." };
        break;

      case "defense":
      case "forcefield":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Defense Collapsed! Defensive field or armor short-circuits or collapses for 1 round." };
        if (color === "White") return { hit: false, desc: "Defense failed or disrupted." };
        if (color === "Green") return { hit: true, desc: `Shield Active: Absorbs up to ${damageValue} points of damage.` };
        if (color === "Yellow") return { hit: true, desc: `Reinforced Defense: Absorbs ${damageValue} damage; deflects kinetic impact.` };
        if (color === "Red") return { hit: true, desc: `Impenetrable Barrier: Fully absorbs attack; field holds with zero strain.` };
        break;

      case "reflection":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Catastrophic Reflection Failure! Attack energy rebounds entirely into hero." };
        if (color === "White") return { hit: false, desc: "Reflection failed; hero takes full attack damage." };
        if (color === "Green") return { hit: true, desc: "Reflected: Attack deflected harmlessly away from hero." };
        if (color === "Yellow") return { hit: true, desc: "Partial Redirect: Reflected back at attacker for half damage." };
        if (color === "Red") return { hit: true, desc: "Full Reflection: 100% of attack redirected straight back at attacker!" };
        break;

      case "stunt":
        if (color === "Blue") return { hit: false, fumble: true, desc: "Spectacular Backfire! Power overload prevents stunt attempts for the rest of combat." };
        if (color === "White") return { hit: false, desc: "Stunt attempt failed! Karma spent but effect did not manifest." };
        if (color === "Green") return { hit: true, desc: "Stunt Successful: Creative power application achieved at standard rank." };
        if (color === "Yellow") return { hit: true, desc: "Remarkable Stunt: Achieved with heightened intensity or secondary effect!" };
        if (color === "Red") return { hit: true, desc: "Incredible Mastery! Spectacular execution; hero advances towards mastering stunt." };
        break;

      default:
        if (color === "Blue") return { hit: false, fumble: true, desc: "Critical Fumble / Blunder (Blue Result)." };
        if (color === "White") return { hit: false, desc: "Action Failed." };
        if (color === "Green") return { hit: true, desc: "Standard Success (Green)." };
        if (color === "Yellow") return { hit: true, desc: "Superior Success (Yellow)." };
        if (color === "Red") return { hit: true, desc: "Critical / Maximum Success (Red)." };
        break;
    }

    return { hit: false, desc: "Unknown action" };
  }
};

// 3. Movement & Speed Reference Data (Ground & Air)
// CMF Expanded Scheme (22 Ranks - from Classic Marvel Forever Alternate Ranks Speed Chart)
const CMF_GROUND_MOVEMENT = [
  { rank: "Shift 0", num: 0, areas: 0, mph: 0, feetTurn: "0 ft", feetSec: "0 fps", notes: "Immobilized, paralyzed, unconscious." },
  { rank: "Feeble", num: 2, areas: 1, mph: 15, feetTurn: "132 ft", feetSec: "22 fps", notes: "Injured crawl or slow elder walk." },
  { rank: "Poor", num: 4, areas: 2, mph: 30, feetTurn: "264 ft", feetSec: "44 fps", notes: "Normal human brisk run / steady jog." },
  { rank: "Typical", num: 6, areas: 3, mph: 45, feetTurn: "396 ft", feetSec: "66 fps", notes: "Normal human all-out sprint; Olympic sprinter." },
  { rank: "Good", num: 10, areas: 4, mph: 60, feetTurn: "528 ft", feetSec: "88 fps", notes: "Peak human athlete sprint (Captain America)." },
  { rank: "Excellent", num: 20, areas: 5, mph: 75, feetTurn: "660 ft", feetSec: "110 fps", notes: "Enhanced runner; highway car speed." },
  { rank: "Remarkable", num: 30, areas: 6, mph: 90, feetTurn: "792 ft", feetSec: "132 fps", notes: "Superhuman sprinting (Spider-Man, Wolverine sprint)." },
  { rank: "Fantastic", num: 35, areas: 7, mph: 105, feetTurn: "924 ft", feetSec: "154 fps", notes: "Low super-speed; express train pace." },
  { rank: "Incredible", num: 40, areas: 8, mph: 120, feetTurn: "1,056 ft", feetSec: "176 fps", notes: "Super-speed runner; high-speed commuter train." },
  { rank: "Spectacular", num: 45, areas: 9, mph: 135, feetTurn: "1,188 ft", feetSec: "198 fps", notes: "High velocity runner; sports car cruising speed." },
  { rank: "Amazing", num: 50, areas: 10, mph: 150, feetTurn: "1,320 ft", feetSec: "220 fps", notes: "High-velocity speedster; bullet train speed." },
  { rank: "Sensational", num: 60, areas: 12, mph: 180, feetTurn: "1,584 ft", feetSec: "264 fps", notes: "Supercharged speedster; professional race car velocity." },
  { rank: "Monstrous", num: 75, areas: 14, mph: 210, feetTurn: "1,848 ft", feetSec: "308 fps", notes: "Formula 1 top speed on land." },
  { rank: "Awesome", num: 90, areas: 16, mph: 240, feetTurn: "2,112 ft", feetSec: "352 fps", notes: "Blistering hyper-runner; dragster velocity." },
  { rank: "Unearthly", num: 100, areas: 20, mph: 300, feetTurn: "2,640 ft", feetSec: "440 fps", notes: "Supersonic threshold baseline (Quicksilver)." },
  { rank: "Shift X", num: 150, areas: 32, mph: 480, feetTurn: "4,224 ft", feetSec: "704 fps", notes: "Super-speed runner crossing districts in seconds." },
  { rank: "Shift Y", num: 250, areas: 40, mph: 600, feetTurn: "5,280 ft", feetSec: "880 fps", notes: "Transonic speed on land." },
  { rank: "Shift Z", num: 500, areas: 50, mph: 750, feetTurn: "6,600 ft", feetSec: "1,100 fps", notes: "Supersonic Mach 1 ground sprint." },
  { rank: "Class 1000", num: 1000, areas: 100, mph: 1500, feetTurn: "13,200 ft", feetSec: "2,200 fps", notes: "Mach 2 supersonic dash!" },
  { rank: "Class 3000", num: 3000, areas: 150, mph: 2250, feetTurn: "19,800 ft", feetSec: "3,300 fps", notes: "Mach 3 hypersonic sprint!" },
  { rank: "Class 5000", num: 5000, areas: 200, mph: 3000, feetTurn: "26,400 ft", feetSec: "4,400 fps", notes: "Mach 4 hypersonic sprint!" }
];

const STANDARD_GROUND_MOVEMENT = [
  { rank: "Shift 0", num: 0, areas: 0, mph: 0, feetTurn: "0 ft", feetSec: "0 fps", notes: "Immobilized, paralyzed, unconscious." },
  { rank: "Feeble", num: 2, areas: 1, mph: 15, feetTurn: "132 ft", feetSec: "22 fps", notes: "Injured crawl or slow elder walk." },
  { rank: "Poor", num: 4, areas: 2, mph: 30, feetTurn: "264 ft", feetSec: "44 fps", notes: "Normal human brisk run / steady jog." },
  { rank: "Typical", num: 6, areas: 3, mph: 45, feetTurn: "396 ft", feetSec: "66 fps", notes: "Normal human all-out sprint; Olympic sprinter." },
  { rank: "Good", num: 10, areas: 4, mph: 60, feetTurn: "528 ft", feetSec: "88 fps", notes: "Peak human athlete sprint (Captain America)." },
  { rank: "Excellent", num: 20, areas: 5, mph: 75, feetTurn: "660 ft", feetSec: "110 fps", notes: "Enhanced runner; highway car speed." },
  { rank: "Remarkable", num: 30, areas: 6, mph: 90, feetTurn: "792 ft", feetSec: "132 fps", notes: "Superhuman sprinting (Spider-Man, Wolverine sprint)." },
  { rank: "Incredible", num: 40, areas: 7, mph: 105, feetTurn: "924 ft", feetSec: "154 fps", notes: "Express train speed; rapid urban traversal." },
  { rank: "Amazing", num: 50, areas: 8, mph: 120, feetTurn: "1,056 ft", feetSec: "176 fps", notes: "Bullet train speed; high-velocity runner." },
  { rank: "Monstrous", num: 75, areas: 9, mph: 135, feetTurn: "1,188 ft", feetSec: "198 fps", notes: "Formula 1 race car speed." },
  { rank: "Unearthly", num: 100, areas: 10, mph: 150, feetTurn: "1,320 ft", feetSec: "220 fps", notes: "Supersonic ground velocity baseline (Quicksilver)." },
  { rank: "Shift X", num: 150, areas: 15, mph: 225, feetTurn: "1,980 ft", feetSec: "330 fps", notes: "Super-speed runner crossing districts in seconds." },
  { rank: "Shift Y", num: 250, areas: 20, mph: 300, feetTurn: "2,640 ft", feetSec: "440 fps", notes: "Subsonic rocket speed on land." },
  { rank: "Shift Z", num: 500, areas: 30, mph: 450, feetTurn: "3,960 ft", feetSec: "660 fps", notes: "Transonic ground speed." },
  { rank: "Class 1000", num: 1000, areas: 45, mph: 675, feetTurn: "5,940 ft", feetSec: "990 fps", notes: "Near Mach 1 / Speed of Sound ground sprint!" }
];

const CMF_AIR_MOVEMENT = [
  { rank: "Feeble", num: 2, combatAreas: 2, mph: "30 mph", category: "Gliding / Hover", notes: "Low-altitude drift, vulnerable target in combat." },
  { rank: "Poor", num: 4, combatAreas: 4, mph: "60 mph", category: "Light Aircraft", notes: "Standard propeller flight; slow helicopter." },
  { rank: "Typical", num: 6, combatAreas: 6, mph: "90 mph", category: "Fast Propeller", notes: "WW1 fighter plane maneuverability; urban patrol." },
  { rank: "Good", num: 10, combatAreas: 8, mph: "120 mph", category: "Fast Helicopter", notes: "High-maneuverability aerial dogfighter." },
  { rank: "Excellent", num: 20, combatAreas: 10, mph: "150 mph", category: "Commuter Craft", notes: "Fast urban transit flight (Falcon, Vulture baseline)." },
  { rank: "Remarkable", num: 30, combatAreas: 15, mph: "225 mph", category: "WW2 Fighter", notes: "High-speed pursuit (Iron Man armor Mark I/II cruise)." },
  { rank: "Fantastic", num: 35, combatAreas: 20, mph: "300 mph", category: "Subsonic Craft", notes: "Fast propeller / light commuter turboprop." },
  { rank: "Incredible", num: 40, combatAreas: 25, mph: "375 mph", category: "Fast Subsonic", notes: "Commercial passenger jet speed; rapid state transit." },
  { rank: "Spectacular", num: 45, combatAreas: 30, mph: "450 mph", category: "High Subsonic", notes: "High-altitude business jet cruise." },
  { rank: "Amazing", num: 50, combatAreas: 40, mph: "600 mph", category: "Near Mach 1 (Transonic)", notes: "Approaching sound barrier; agile high-altitude dogfight." },
  { rank: "Sensational", num: 60, combatAreas: 50, mph: "750 mph", category: "Mach 1.0 (Supersonic)", notes: "Breaks sound barrier; sonic boom shockwave." },
  { rank: "Monstrous", num: 75, combatAreas: 60, mph: "900 mph", category: "Mach 1.2", notes: "Military supersonic jet cruise." },
  { rank: "Awesome", num: 90, combatAreas: 75, mph: "1,125 mph", category: "Mach 1.5", notes: "Supersonic military interceptor flight." },
  { rank: "Unearthly", num: 100, combatAreas: 100, mph: "1,500 mph", category: "Mach 2.0", notes: "Mach 2 supersonic interceptor (Thor, Iron Man top flight)." },
  { rank: "Shift X", num: 150, combatAreas: 150, mph: "2,250 mph", category: "Mach 3.0", notes: "Mach 3 high-altitude recon (SR-71 Blackbird level)." },
  { rank: "Shift Y", num: 250, combatAreas: 200, mph: "3,000 mph", category: "Mach 4.0 (Hypersonic)", notes: "Upper atmosphere skip; coast-to-coast in 45 minutes." },
  { rank: "Shift Z", num: 500, combatAreas: 400, mph: "6,000 mph", category: "Mach 8.0 (Sub-Orbital)", notes: "Sub-orbital trajectory; orbits globe in 90 minutes." },
  { rank: "Class 1000", num: 1000, combatAreas: "Blue Shift", mph: "15,000 mph", category: "Relativistic / Orbital", notes: "Escape velocity (7 miles/sec); leaves Earth atmosphere." },
  { rank: "Class 3000", num: 3000, combatAreas: "Lightspeed", mph: "186,282 mi/s", category: "Lunar Transit", notes: "Reaches Earth's Moon in under 2 seconds." },
  { rank: "Class 5000", num: 5000, combatAreas: "100 x Lightspeed", mph: "18.6 million mi/s", category: "Solar Interplanetary", notes: "Interplanetary cosmic transit across star system." },
  { rank: "Beyond", num: 10000, combatAreas: "Lightspeed+", mph: "Cosmic", category: "Hyperspace / Interstellar", notes: "Instantaneous faster-than-light cosmic transit (Silver Surfer)." }
];

const STANDARD_AIR_MOVEMENT = [
  { rank: "Feeble", num: 2, combatAreas: 2, mph: "30 mph", category: "Gliding / Hover", notes: "Low-altitude drift, vulnerable target in combat." },
  { rank: "Poor", num: 4, combatAreas: 3, mph: "45 mph", category: "Autogyro / Slow", notes: "Light aircraft / slow helicopter cruise." },
  { rank: "Typical", num: 6, combatAreas: 4, mph: "60 mph", category: "Light Aircraft", notes: "Standard propeller flight speed; urban patrol." },
  { rank: "Good", num: 10, combatAreas: 6, mph: "90 mph", category: "Fast Helicopter", notes: "WW1 fighter plane; highly maneuverable dogfighter." },
  { rank: "Excellent", num: 20, combatAreas: 8, mph: "120 mph", category: "Commuter Craft", notes: "Fast urban transit flight (Falcon, Vulture baseline)." },
  { rank: "Remarkable", num: 30, combatAreas: 15, mph: "225 mph", category: "WW2 Fighter", notes: "High-speed pursuit (Iron Man armor Mark I/II cruise)." },
  { rank: "Incredible", num: 40, combatAreas: 20, mph: "300 mph", category: "Subsonic Jet", notes: "Commercial jet airliner cruise; rapid state transit." },
  { rank: "Amazing", num: 50, combatAreas: 30, mph: "450 mph", category: "High Subsonic", notes: "Approaching sound barrier; agile high-altitude dogfight." },
  { rank: "Monstrous", num: 75, combatAreas: 45, mph: "675 mph", category: "Transonic (Mach 0.9)", notes: "Military jet cruise; rapid continental transit." },
  { rank: "Unearthly", num: 100, combatAreas: 60, mph: "900 mph", category: "Supersonic (Mach 1.2)", notes: "Breaks sound barrier; generates sonic boom shockwave!" },
  { rank: "Shift X", num: 150, combatAreas: 100, mph: "1,500 mph", category: "Mach 2.0", notes: "Mach 2 military interceptor (Thor, Iron Man top flight)." },
  { rank: "Shift Y", num: 250, combatAreas: 200, mph: "3,000 mph", category: "Mach 4.0 (Hypersonic)", notes: "Upper atmosphere skip; coast-to-coast in 45 minutes." },
  { rank: "Shift Z", num: 500, combatAreas: 400, mph: "6,000 mph", category: "Mach 8.0 (Sub-Orbital)", notes: "Sub-orbital trajectory; orbits globe in 90 minutes." },
  { rank: "Class 1000", num: 1000, combatAreas: 1000, mph: "15,000 mph", category: "Mach 20 (Orbital Escape)", notes: "Escape velocity (7 miles/sec); leaves Earth atmosphere." },
  { rank: "Class 3000", num: 3000, combatAreas: 3000, mph: "45,000 mph", category: "Lunar Transit", notes: "Reaches Earth's Moon in under 5 hours." },
  { rank: "Class 5000", num: 5000, combatAreas: 6000, mph: "90,000 mph", category: "Solar Interplanetary", notes: "Traverses solar system between planets." },
  { rank: "Beyond", num: 10000, combatAreas: "Lightspeed+", mph: "186,282 miles/sec", category: "Hyperspace / Interstellar", notes: "Instantaneous faster-than-light cosmic transit (Silver Surfer)." }
];

function getGroundMovementTable(mode = 'cmf') {
  return (mode === 'standard') ? STANDARD_GROUND_MOVEMENT : CMF_GROUND_MOVEMENT;
}

function getAirMovementTable(mode = 'cmf') {
  return (mode === 'standard') ? STANDARD_AIR_MOVEMENT : CMF_AIR_MOVEMENT;
}

if (typeof globalThis !== 'undefined') {
  globalThis.STANDARD_RANKS = STANDARD_RANKS;
  globalThis.STANDARD_TABLE = STANDARD_TABLE;
  globalThis.CMF_RANKS = CMF_RANKS;
  globalThis.CMF_TABLE = CMF_TABLE;
  globalThis.RANKS = RANKS;
  globalThis.UNIVERSAL_TABLE = UNIVERSAL_TABLE;
  globalThis.UniversalTableEngine = UniversalTableEngine;
  globalThis.CMF_GROUND_MOVEMENT = CMF_GROUND_MOVEMENT;
  globalThis.STANDARD_GROUND_MOVEMENT = STANDARD_GROUND_MOVEMENT;
  globalThis.CMF_AIR_MOVEMENT = CMF_AIR_MOVEMENT;
  globalThis.STANDARD_AIR_MOVEMENT = STANDARD_AIR_MOVEMENT;
  globalThis.getGroundMovementTable = getGroundMovementTable;
  globalThis.getAirMovementTable = getAirMovementTable;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    STANDARD_RANKS,
    STANDARD_TABLE,
    CMF_RANKS,
    CMF_TABLE,
    RANKS,
    UNIVERSAL_TABLE,
    UniversalTableEngine,
    CMF_GROUND_MOVEMENT,
    STANDARD_GROUND_MOVEMENT,
    CMF_AIR_MOVEMENT,
    STANDARD_AIR_MOVEMENT,
    getGroundMovementTable,
    getAirMovementTable
  };
}

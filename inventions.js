/**
 * Marvel Super Heroes (FASERIP) - Invention & Engineering Suite
 * Incorporates Advanced Player's Book pp. 38-41, MA8 Weapons Locker,
 * and Machines of Doom (from Lands of Dr. Doom, TSR 6891).
 */

if (typeof globalThis.UniversalTableEngine === 'undefined' && typeof require !== 'undefined') {
  Object.assign(globalThis, require('./universal_table.js'));
  Object.assign(globalThis, require('./data_equipment.js'));
  Object.assign(globalThis, require('./data_powers.js'));
}

class InventionCreator {
  /**
   * Official Judge's Book p. 14 Special Requirements Table evaluation.
   * Items of Remarkable+ require rare alloys, specialized components, or alien tech.
   */
  static getSpecialRequirements(effectiveRankNum, materialRankNum, isMagic = false) {
    const highestRankNum = Math.max(effectiveRankNum || 0, materialRankNum || 0);

    if (isMagic) {
      if (highestRankNum >= 1000) {
        return {
          tier: "Cosmic / Divine",
          level: "cosmic",
          requiresSpecial: true,
          summary: "Cosmic Relic: Requires communion with Elder Gods, Vishanti invocation, or Infinity Gem resonance (Judge's Book p. 14)."
        };
      } else if (highestRankNum >= 75) { // Monstrous (75) to Unearthly (100)
        return {
          tier: "Eldritch / Otherworldly",
          level: "exotic",
          requiresSpecial: true,
          summary: "Otherworldly Reagents: Requires extradimensional essence, virgin meteor silver, or consecrated daemon vessel (Judge's Book p. 14)."
        };
      } else if (highestRankNum >= 50) { // Amazing (50)
        return {
          tier: "Sanctum Consecration",
          level: "advanced",
          requiresSpecial: true,
          summary: "Astral Alignment: Requires dedicated Sanctum Sanctorum alignment or planetary astrological conjunction (Judge's Book p. 14)."
        };
      } else if (highestRankNum >= 30) { // Remarkable (30) to Incredible (40)
        return {
          tier: "Rare Occult Focus",
          level: "rare",
          requiresSpecial: true,
          summary: "Special Reagents: Requires rare alchemical reagents, ancient grimoire verses, or consecrated silver foci (Judge's Book p. 14)."
        };
      } else {
        return {
          tier: "Standard Reagents",
          level: "standard",
          requiresSpecial: false,
          summary: "Standard ritual components, herbs, and common talisman focus."
        };
      }
    } else {
      if (highestRankNum >= 1000) {
        return {
          tier: "Cosmic / Mythic Materials",
          level: "cosmic",
          requiresSpecial: true,
          summary: "Class 1000+ Materials: Requires True Adamantium (1500°F liquid resin pour) or Wakandan Vibranium sound-dampened forge (Judge's Book p. 14)."
        };
      } else if (highestRankNum >= 75) { // Monstrous (75) to Unearthly (100)
        return {
          tier: "Exotic / Alien Technology",
          level: "exotic",
          requiresSpecial: true,
          summary: "Monstrous+ Tech: Requires rare trans-uranic alloys, Kree/Skrull alien circuitry, or super-science laboratory (Judge's Book p. 14)."
        };
      } else if (highestRankNum >= 50) { // Amazing (50)
        return {
          tier: "Advanced Industrial Facilities",
          level: "advanced",
          requiresSpecial: true,
          summary: "Amazing Tech: Requires aerospace-grade facilities, high-yield particle collider, or micro-fusion fabrication (Judge's Book p. 14)."
        };
      } else if (highestRankNum >= 30) { // Remarkable (30) to Incredible (40)
        return {
          tier: "Special Components Required",
          level: "rare",
          requiresSpecial: true,
          summary: "Remarkable+ Tech: Requires specialized industrial components, military microchips, or rare chemical catalysts (Judge's Book p. 14)."
        };
      } else {
        return {
          tier: "Standard Workshop Hardware",
          level: "standard",
          requiresSpecial: false,
          summary: "Standard commercial hardware and electronics. No rare components required."
        };
      }
    }
  }

  /**
   * Calculates engineering feasibility, procurement, blueprint design,
   * build time, and power requirements for custom inventions or Machines of Doom robotics.
   */
  static calculateProject(params = {}) {
    const {
      name = "Custom Invention",
      category = "Weapon", // Weapon, Battlesuit, Robot/Drone, Propulsion, Utility, Cybernetics, Consumable
      powers = [], // Array of { name, rankName, rankValue, id, code }
      abilityBoosts = [], // Array of { ability, mode: 'set'|'bonus', rankName, rankValue, cs }
      targetPowerName = "Energy Blast",
      targetPowerRank = "Remarkable",
      materialRank = "Remarkable",
      inventorReasonRank = "Remarkable",
      inventorResourcesRank = "Typical",
      hasRelevantTalent = false,
      hasWorkshop = true,
      isKitBash = false,
      isPortable = true,
      
      // Hardware Boosts (+1CS difficulty each)
      boostAreaEffect = false,
      boostArmorPiercing = false,
      boostOvercharge = false,
      boostExtendedRange = false,
      boostAutonomousAI = false,

      // Hardware Limitations & Flaws (-1CS difficulty each)
      limitLimitedAmmo = false,
      limitExternalTether = false,
      limitBulkyTwoHanded = false,
      limitCooldown = false,
      limitBurnoutRisk = false,

      // Source Type (tech or magic)
      sourceType = "tech",

      // Machines of Doom Robotics Parameters
      robotAILevel = "None", // None, Sub-Human (Pr 4), Humanoid (Gd 10), Advanced (Rm 30), Doom Synthezoid (Am 50)
      robotChassisMaterial = "Tempered Steel"
    } = params;

    const isMagic = (sourceType === 'magic');
    const mRank = UniversalTableEngine.getRankByName(materialRank);
    const rRank = UniversalTableEngine.getRankByName(inventorReasonRank);
    const resRank = UniversalTableEngine.getRankByName(inventorResourcesRank);

    // Normalize Powers List
    let activePowers = [];
    if (Array.isArray(powers) && powers.length > 0) {
      activePowers = powers.map(p => {
        const rObj = UniversalTableEngine.getRankByName(p.rankName || 'Good');
        return {
          id: p.id || 'inv_pwr_' + Math.random().toString(36).substr(2, 6),
          name: p.name || 'Unnamed Power',
          rankName: rObj.name,
          rankValue: rObj.num,
          code: p.code || ''
        };
      });
    } else if (targetPowerName) {
      const pRank = UniversalTableEngine.getRankByName(targetPowerRank);
      activePowers.push({
        id: 'inv_pwr_main',
        name: targetPowerName,
        rankName: pRank.name,
        rankValue: pRank.num,
        code: ''
      });
    }

    // Normalize Ability Boosts List - Enforce single boost per ability
    const boostsByAbility = new Map();
    if (Array.isArray(abilityBoosts)) {
      abilityBoosts.forEach(b => {
        const abKey = (b.ability || 'Strength').toUpperCase();
        let rName = b.rankName || 'Good';
        let rNum = b.rankValue || UniversalTableEngine.getRankByName(rName).num;
        if (b.mode === 'bonus') {
          const cs = parseInt(b.cs || 1);
          rName = `+${cs} CS`;
          rNum = cs * 10;
        }
        boostsByAbility.set(abKey, {
          id: b.id || 'inv_bst_' + Math.random().toString(36).substr(2, 6),
          ability: abKey,
          mode: (b.mode === 'bonus') ? 'bonus' : 'set',
          rankName: rName,
          rankValue: rNum,
          cs: parseInt(b.cs || 1)
        });
      });
    }
    const activeAbilityBoosts = Array.from(boostsByAbility.values());

    // Determine Base Difficulty Rank (Highest power rank or set-rank ability boost)
    let highestRankNum = 0;
    let highestRankName = "Feeble";

    activePowers.forEach(p => {
      if (p.rankValue > highestRankNum) {
        highestRankNum = p.rankValue;
        highestRankName = p.rankName;
      }
    });

    activeAbilityBoosts.forEach(b => {
      if (b.mode === 'set' && b.rankValue > highestRankNum) {
        highestRankNum = b.rankValue;
        highestRankName = b.rankName;
      }
    });

    if (highestRankNum === 0) {
      highestRankNum = 30; // Default Remarkable
      highestRankName = "Remarkable";
    }

    // Complexity Shifts:
    // +1CS for each additional power beyond the 1st
    // +1CS for each ability boost
    const additionalPowersCount = Math.max(0, activePowers.length - 1);
    const abilityBoostsCount = activeAbilityBoosts.length;
    const multiItemShift = additionalPowersCount + abilityBoostsCount;

    // Hardware Boosts & Limits Shifts
    const activeBoosts = [];
    if (boostAreaEffect) activeBoosts.push("Area Effect (+1 CS)");
    if (boostArmorPiercing) activeBoosts.push("Armor Piercing (+1 CS)");
    if (boostOvercharge) activeBoosts.push("Overcharge Capacitor (+1 CS)");
    if (boostExtendedRange) activeBoosts.push("Extended Range (+1 CS)");
    if (boostAutonomousAI) activeBoosts.push("Autonomous AI (+1 CS)");

    const activeLimits = [];
    if (limitLimitedAmmo) activeLimits.push("Limited Ammo (-1 CS)");
    if (limitExternalTether) activeLimits.push(isMagic ? "Ley Line / Altar Tether (-1 CS)" : "External Power Tether (-1 CS)");
    if (limitBulkyTwoHanded) activeLimits.push("Bulky / Two-Handed (-1 CS)");
    if (limitCooldown) activeLimits.push("Cooldown Cycle (-1 CS)");
    if (limitBurnoutRisk) activeLimits.push(isMagic ? "Arcane Backlash Risk (-1 CS)" : "Burnout Risk on White (-1 CS)");

    const netShift = multiItemShift + activeBoosts.length - activeLimits.length;
    const effectiveDifficulty = UniversalTableEngine.applyColumnShift(highestRankName, netShift);

    // Robotics / Automaton Adjustments
    let robotNote = "";
    if (category.toLowerCase().includes("robot") || category.toLowerCase().includes("drone") || category.toLowerCase().includes("golem") || category.toLowerCase().includes("automaton")) {
      robotNote = isMagic 
        ? `Mystic Automaton/Golem: Vessel enchanted with ${robotChassisMaterial} casing.`
        : `Robotics: Fabricated with ${robotChassisMaterial} plating.`;
    }

    // Required Invention FEAT Targets
    // 1. Resource Procurement Phase
    const resourceShift = hasWorkshop ? 0 : -1;
    const resourceFeatTarget = effectiveDifficulty.name;

    // 2. Blueprint Design Phase
    const blueprintShift = (hasRelevantTalent ? 1 : 0) + (hasWorkshop ? 0 : -1);
    const blueprintFeatTarget = effectiveDifficulty.name;

    // 3. Construction & Assembly Phase
    const kitBashShift = isKitBash ? -1 : 0;
    const assemblyShift = (hasWorkshop ? 0 : -1) + kitBashShift;
    const assemblyFeatTarget = effectiveDifficulty.name;

    // 4. Material Integrity & Safety Check
    const hasMaterialOverload = (highestRankNum > mRank.num);
    let materialWarning = "";
    if (isMagic) {
      materialWarning = hasMaterialOverload
        ? `WARNING: Enchantment Rank (${highestRankName} / ${highestRankNum}) exceeds Vessel Material Strength (${mRank.name} / ${mRank.num}). Channeling carries severe risk of vessel shattering and mystic backlash!`
        : `Vessel material (${mRank.name}) is fully consecrated to contain mystic energies.`;
    } else {
      materialWarning = hasMaterialOverload
        ? `WARNING: Maximum Power/Boost Rank (${highestRankName} / ${highestRankNum}) exceeds Material Strength (${mRank.name} / ${mRank.num}). Maximum load carries severe risk of catastrophic casing rupture!`
        : `Material strength (${mRank.name}) is fully adequate to contain power output.`;
    }

    // 5. Special Requirements Check (Judge's Book p. 14)
    const specialRequirement = InventionCreator.getSpecialRequirements(effectiveDifficulty.num, mRank.num, isMagic);

    // 6. Construction Time Calculation (Player's Book p. 43)
    let timeMultiplier = 1.0 + (activeBoosts.length * 0.20) - (activeLimits.length * 0.15);
    timeMultiplier = Math.max(0.4, timeMultiplier);

    let baseDays = Math.max(1, Math.round(((effectiveDifficulty.num * 2.5) / Math.max(1, rRank.num)) * timeMultiplier));
    if (!hasWorkshop) baseDays *= 3; // Lacking lab facilities triples build time per Player's Book p. 43

    let buildTimeDisplay = "";
    let estimatedBuildHours = 0;
    if (isKitBash) {
      // Kit-bashing rushes a temporary prototype in hours instead of days per Player's Book p. 43
      estimatedBuildHours = Math.max(1, Math.min(24, Math.round(baseDays * 2)));
      buildTimeDisplay = `${estimatedBuildHours} Hour${estimatedBuildHours === 1 ? '' : 's'} (Rush Prototype)`;
    } else {
      buildTimeDisplay = `${baseDays} Day${baseDays === 1 ? '' : 's'}`;
    }

    // 7. Power Source & Capacity (Machines of Doom Specs vs Arcane Relics)
    let powerSource = "";
    let charges = "";

    if (isMagic) {
      if (effectiveDifficulty.num >= 75) {
        powerSource = "Cosmic / Dimensional Siphon (Eye of Agamotto / Dark Dimension Relic)";
        charges = "Continuous (Virtually infinite eldritch reserve)";
      } else if (effectiveDifficulty.num >= 40) {
        powerSource = "Ley Line Conflux / Elder Sanctum Rune Matrix";
        charges = "Continuous / 50 high-potency mystic discharges per lunar cycle";
      } else if (effectiveDifficulty.num <= 10) {
        powerSource = "Minor Enchantment / Charged Talisman";
        charges = "30 invocations before fading";
      } else {
        powerSource = "Channeling Crystal / Bound Astral Matrix";
        charges = "10 ritual invocations (recharges at dawn)";
      }

      if (limitExternalTether) {
        powerSource = "Unbroken Ley Line Conduit / Dedicated Altar Circle";
        charges = "Continuous while within sanctum circle; 0 when severed";
      }
      if (isKitBash) {
        charges = "1 Encounter / 1-10 combat rounds (makeshift talisman burns out per Player's Book p. 43)";
      }
    } else {
      powerSource = "Chemical Battery / Micro-Fusion Cell";
      charges = "10 uses per cell (recharges in 2 hours)";
      if (effectiveDifficulty.num >= 75) {
        powerSource = "Cosmic Siphon / Subatomic Micro-Singularity Core";
        charges = "Continuous (Virtually unlimited internal reactor)";
      } else if (effectiveDifficulty.num >= 40) {
        powerSource = "High-Yield Stark Arc Reactor / Latverian Fusion Cell";
        charges = "Continuous / 50 high-output bursts per power cycle";
      } else if (effectiveDifficulty.num <= 10) {
        powerSource = "Commercial Lithium-Ion / Alkaline Pack";
        charges = "30 standard uses per charge";
      }

      if (limitExternalTether) {
        powerSource = "External High-Voltage Cable / Vehicle Auxiliary Tap";
        charges = "Continuous while tethered; 0 when disconnected";
      }
      if (isKitBash) {
        charges = "1 Encounter / 1-10 combat rounds (prototype burnout risk per Player's Book p. 43)";
      }
    }

    return {
      name,
      category,
      sourceType: isMagic ? 'magic' : 'tech',
      powers: activePowers,
      abilityBoosts: activeAbilityBoosts,
      highestRankName,
      highestRankNum,
      targetPowerName: activePowers.length ? activePowers[0].name : 'None',
      targetPowerRank: activePowers.length ? activePowers[0].rankName : 'None',
      targetPowerNumber: activePowers.length ? activePowers[0].rankValue : 0,
      materialRank: mRank.name,
      materialStrength: mRank.num,
      hasMaterialOverload,
      inventorReason: rRank.name,
      inventorResources: resRank.name,
      hasRelevantTalent,
      hasWorkshop,
      isKitBash,
      isPortable,
      activeBoosts,
      activeLimits,
      multiItemShift,
      netShift,
      effectiveDifficultyRank: effectiveDifficulty.name,
      effectiveDifficultyNumber: effectiveDifficulty.num,
      blueprintFeatTarget,
      blueprintShift,
      resourceFeatTarget,
      resourceShift,
      assemblyFeatTarget,
      assemblyShift,
      estimatedBuildDays: baseDays,
      estimatedBuildHours,
      buildTimeDisplay,
      specialRequirement,
      powerSource,
      charges,
      materialWarning,
      robotNote
    };
  }

  /**
   * Resolves an individual Invention FEAT roll during the design/build process.
   * Stages: 'blueprint', 'procurement', 'assembly'
   * Details specific requirements to retry when a FEAT fails.
   */
  static resolveInventionStageFEAT(stage, roll, karmaSpent = 0, project = {}) {
    const finalRoll = Math.min(100, Math.max(1, roll + karmaSpent));
    const isMagic = project.sourceType === 'magic';

    if (stage === 'blueprint') {
      const feat = UniversalTableEngine.resolveFEAT(project.inventorReason || 'Remarkable', finalRoll, project.blueprintShift || 0);
      const isSuccess = (feat.color === 'Green' || feat.color === 'Yellow' || feat.color === 'Red');
      
      let title = isMagic ? '📜 Arcane Inscription & Formula Design' : '📐 Blueprint Design Phase';
      let summary = '';
      let retryTitle = isMagic ? 'Requirements to Re-Attempt Arcane Inscription:' : 'Requirements to Re-Attempt Blueprint FEAT:';
      let retryRequirements = [];

      if (feat.color === 'White') {
        summary = isMagic 
          ? 'Arcane formula contains flawed incantations or mismatched runes. Spell matrix cannot manifest.'
          : 'Schematic design failed. Blueprints contain conceptual flaws and conflicting tolerances.';
        retryRequirements = isMagic ? [
          '• Spend Karma Now: You can still add Karma to this roll before dismissing to achieve a Green FEAT (Karma is permitted on Arcane Formula FEATs).',
          '• Grimoire Study & Meditation: Spend additional study time equal to the original inscription period (minimum 1 day) communing with mystic texts.',
          '• Consult Occult Patrons: Seek guidance from a sorcerous mentor, sanctum library, or mystic Contact for +1 CS on your next attempt.',
          '• Temper the Spell: Lower the enchantment rank, remove a secondary spell, or bind an astrological restriction to lower ritual difficulty.'
        ] : [
          '• Spend Karma Now: You can still add Karma to this roll before dismissing to achieve a Green FEAT (Karma is permitted on Blueprint FEATs).',
          '• Redesign Period: If accepting failure, spend additional design time equal to the original blueprint period (minimum 1 day) revising schematics.',
          '• Consult Contacts: Brainstorm with a scientific or engineering Contact to gain +1 CS on your next attempt.',
          '• Simplify Design: Remove a power, lower an ability boost rank, or add a hardware limitation (-1 CS) to lower project difficulty.'
        ];
      } else if (feat.color === 'Red') {
        summary = isMagic
          ? '🌟 Arcane Revelation! Inspired incantation unlocks ancient formulas. Reduces forging time by 25%!'
          : '🌟 Masterwork Breakthrough! Flawless blueprints drafted. Reduces build time by 25%!';
      } else if (feat.color === 'Yellow') {
        summary = isMagic
          ? '✨ Flawless runes inscribed! Elder sigils align in harmonious resonance.'
          : '✨ Superior schematic drafted! Precision blueprints ready for fabrication.';
      } else {
        summary = isMagic
          ? 'Arcane formula inscribed successfully. Proceed to gathering exotic reagents.'
          : 'Blueprints completed successfully. Proceed to resource procurement.';
      }

      return {
        stage: 'blueprint',
        roll,
        karmaSpent,
        finalRoll,
        feat,
        isSuccess,
        title,
        summary,
        retryTitle,
        retryRequirements
      };
    } else if (stage === 'procurement' || stage === 'resource') {
      // Resource FEATs cannot use Karma per Player's Book p. 18
      const feat = UniversalTableEngine.resolveFEAT(project.inventorResources || 'Typical', roll, project.resourceShift || 0);

      // Determine required color per TSR Player's Book p. 18
      const resIdx = UniversalTableEngine.getRankIndex(project.inventorResources || 'Typical');
      const targetIdx = UniversalTableEngine.getRankIndex(project.resourceFeatTarget || 'Typical');
      const rankDiff = (resIdx >= 0 && targetIdx >= 0) ? (resIdx - targetIdx) : 0;

      let reqColor = 'Green';
      if (rankDiff >= 3) {
        reqColor = 'Auto';
      } else if (rankDiff === 0) {
        reqColor = 'Yellow';
      } else if (rankDiff < 0) {
        reqColor = 'Red';
      }

      let isSuccess = false;
      if (reqColor === 'Auto') {
        isSuccess = true;
      } else if (reqColor === 'Green') {
        isSuccess = (feat.color === 'Green' || feat.color === 'Yellow' || feat.color === 'Red');
      } else if (reqColor === 'Yellow') {
        isSuccess = (feat.color === 'Yellow' || feat.color === 'Red');
      } else if (reqColor === 'Red') {
        isSuccess = (feat.color === 'Red');
      }

      let title = isMagic ? '🧪 Exotic Reagents & Relic Procurement' : '🔩 Resource Procurement Phase';
      let summary = '';
      let retryTitle = isMagic ? 'Requirements to Re-Attempt Reagent Procurement:' : 'Requirements to Re-Attempt Resource Procurement:';
      let retryRequirements = [];

      if (!isSuccess) {
        if (feat.color === 'White') {
          summary = isMagic
            ? 'Failed to acquire consecrated reagents or rare dimensional essences needed for the vessel.'
            : 'Failed to obtain necessary exotic alloys, microchips, and high-yield power cells.';
        } else if (reqColor === 'Yellow') {
          summary = isMagic
            ? `Procurement fell short: Resource rank matches reagent difficulty, requiring a Yellow FEAT per TSR rules (Player's Book p. 18). Rolled ${feat.color}.`
            : `Procurement fell short: Resource rank matches project cost, requiring a Yellow FEAT per TSR rules (Player's Book p. 18). Rolled ${feat.color}.`;
        } else {
          summary = isMagic
            ? `Procurement fell short: Relic difficulty exceeds Resource rank, requiring a Red FEAT per TSR rules (Player's Book p. 18). Rolled ${feat.color}.`
            : `Procurement fell short: Project cost exceeds Resource rank, requiring a Red FEAT per TSR rules (Player's Book p. 18). Rolled ${feat.color}.`;
        }
        retryRequirements = isMagic ? [
          '• No Karma Allowed: Per TSR rules (Player\'s Book p. 18), Karma cannot be spent on Resource checks.',
          '• Celestial Alignment: Wait until the next lunar phase, planetary conjunction, or resource cycle (1 game week) before seeking reagents again.',
          '• Occult Patrons or Sanctums: Petition a Mystic Order, Sorcerous Cabal, or magical Contact for access to rare consecrated foci (+1 CS).',
          '• Quests & Bargains: Undertake an expedition or mystical bargain to harvest supernatural ingredients (e.g. dragon scales, virgin silver).',
          '• Common Focus Substitution: Substitute mundane catalysts in place of exotic relics (increases ritual difficulty by +1 CS).'
        ] : [
          '• No Karma Allowed: Per TSR rules (Player\'s Book p. 18), Karma cannot be spent on Resource checks.',
          '• Requisition Cycle: Wait until the next resource/accounting period (typically 1 game week or next adventure) before rolling again.',
          '• Benefactor or Loan: Secure a corporate grant, institutional sponsor, or bank credit line for +1 CS to +2 CS on procurement.',
          '• Invoke Contacts: Call upon a military, underworld, or industrial Contact who can supply rare parts or black market hardware.',
          '• Downgrade Materials: Reduce chassis material strength or drop exotic components to lower difficulty.'
        ];
      } else if (feat.color === 'Red') {
        summary = isMagic
          ? '🌟 Surplus high-purity occult essences acquired at optimal cost!'
          : '🌟 Surplus high-grade components acquired at optimal cost!';
      } else {
        summary = isMagic
          ? `Required consecrated reagents and dimensional catalysts successfully gathered (${feat.color} FEAT meets ${reqColor} requirement per Player's Book p. 18).`
          : `Required components and power cells successfully acquired (${feat.color} FEAT meets ${reqColor} requirement per Player's Book p. 18).`;
      }

      return {
        stage: 'procurement',
        roll,
        karmaSpent: 0,
        finalRoll: roll,
        feat,
        isSuccess,
        title,
        summary,
        retryTitle,
        retryRequirements
      };
    } else if (stage === 'assembly') {
      const feat = UniversalTableEngine.resolveFEAT(project.inventorReason || 'Remarkable', finalRoll, project.assemblyShift || 0);
      const isSuccess = (feat.color === 'Green' || feat.color === 'Yellow' || feat.color === 'Red');

      let title = isMagic ? '⚡ Ritual Forging & Consecration' : '🛠️ Assembly & Construction Phase';
      let summary = '';
      let retryTitle = isMagic ? 'Requirements to Re-Attempt Consecration:' : 'Requirements to Re-Attempt Assembly:';
      let retryRequirements = [];

      if (feat.color === 'White') {
        summary = isMagic
          ? 'Mystic backlash or eldritch dispersion during consecration. Relic requires ritual cleansing.'
          : 'Circuit blowout or mechanical jam during final bench test. Device requires bench repair.';
        retryRequirements = isMagic ? [
          '• Ritual Cleansing: Disperse lingering astral backlash and cleanse ritual circles (requires half the forging time, minimum 1 day).',
          '• Vessel Repair / Fresh Focus: Re-sanctify the vessel or replace cracked channeling gems before reigniting the ritual circle.',
          '• Karma Permitted on Retry: When re-attempting consecration after cleansing, Karma expenditure is permitted to bind the arcane forces.',
          '• Sanctum Focus: Conduct the binding inside a consecrated Sanctum or at a Ley Line intersection to avoid ambient flux penalty.'
        ] : [
          '• Bench Repairs: The prototype suffered burnout during calibration. Spend bench repair time equal to half the build time (minimum 1 day).',
          '• Replacement Components: Pass a Resource FEAT at +1 CS easier (or salvage spare parts) to replace destroyed circuitry.',
          '• Karma Permitted on Retry: When making the re-attempt roll after bench repairs, Karma expenditure is permitted to ensure success.',
          '• Workshop Facilities: Ensure access to a fully equipped laboratory or machine shop to avoid the -1 CS improvised penalty.'
        ];
      } else if (feat.color === 'Red') {
        summary = isMagic
          ? '🌟 Masterwork Relic! Eldritch energies permanently harmonize with flawless vessel integrity.'
          : '🌟 Masterwork Fabrication! Precision calibration achieved with zero tolerance deviations.';
      } else if (feat.color === 'Yellow') {
        summary = isMagic
          ? '✨ Luminescent consecration! Arcane currents pulse smoothly through the vessel.'
          : '✨ High-grade fabrication! All sub-assemblies operate with superior efficiency.';
      } else {
        summary = isMagic
          ? 'Relic successfully consecrated, bound, and awakened!'
          : 'Device successfully constructed, calibrated, and bench-tested!';
      }

      return {
        stage: 'assembly',
        roll,
        karmaSpent,
        finalRoll,
        feat,
        isSuccess,
        title,
        summary,
        retryTitle,
        retryRequirements
      };
    }
    return { isSuccess: false, summary: 'Unknown stage', retryRequirements: [] };
  }

  /**
   * Reverse-Engineers a prebuilt catalog item from the rulebooks
   * to determine its manufacturing feasibility, Resource procurement check,
   * Reason blueprint design check, and construction days.
   * STRICTLY BLOCKS unique, non-reproducible artifacts.
   */
  static reverseEngineerPrebuilt(itemOrId, inventorReasonRank = "Remarkable", inventorResourcesRank = "Typical", hasTalent = true, hasWorkshop = true) {
    let item = itemOrId;
    if (typeof itemOrId === "string") {
      const catalog = globalThis.PREBUILT_EQUIPMENT_CATALOG || [];
      item = catalog.find(i => i.id === itemOrId || i.name.toLowerCase() === itemOrId.toLowerCase());
    }

    if (!item) {
      return {
        success: false,
        reproducible: false,
        error: `Equipment item "${itemOrId}" not found in database.`
      };
    }

    // Check for Unique & Non-Reproducible Artifacts
    if (item.isReproducible === false || item.nonReproducible) {
      return {
        success: false,
        reproducible: false,
        itemName: item.name,
        isUnique: !!item.isUnique,
        error: item.reproducibleError || `"${item.name}" is a unique, one-of-a-kind artifact and cannot be manufactured or reverse-engineered by technology.`
      };
    }

    // Calculate manufacturing parameters based on rulebook specs
    const powerRank = item.inventionPowerRank || item.costRank || "Good";
    const materialRank = (typeof item.materialStrength === "string" && item.materialStrength.includes("("))
      ? item.materialStrength.split("(")[0].trim()
      : "Good";

    const project = this.calculateProject({
      name: `Replicated ${item.name}`,
      category: item.category,
      targetPowerName: item.inventionBasePower || item.type,
      targetPowerRank: powerRank,
      materialRank: materialRank,
      inventorReasonRank: inventorReasonRank,
      inventorResourcesRank: inventorResourcesRank,
      hasRelevantTalent: hasTalent,
      hasWorkshop: hasWorkshop
    });

    return {
      success: true,
      reproducible: true,
      item,
      project,
      reverseEngReasonTarget: inventorReasonRank,
      reverseEngReasonShift: 2, // +2CS bonus for having a working physical model in hand per TSR rules
      resourceCheck: `${project.resourceFeatTarget} (${project.resourceShift >= 0 ? '+' : ''}${project.resourceShift} CS)`,
      blueprintCheck: `${project.blueprintFeatTarget} (${project.blueprintShift >= 0 ? '+' : ''}${project.blueprintShift} CS)`,
      buildDays: project.estimatedBuildDays,
      powerSource: project.powerSource,
      summary: `Manufacturing ${item.name} requires procuring raw materials with a ${project.resourceFeatTarget} Resource FEAT, drafting blueprints with a ${project.blueprintFeatTarget} Reason FEAT, and ${project.estimatedBuildDays} days in a workshop.`
    };
  }

  /**
   * Evaluates the three required FEAT rolls to assemble an invention:
   * 1. Resource procurement roll
   * 2. Reason blueprint roll
   * 3. Reason assembly roll
   */
  static testInventionAssembly(project, rollResource, rollDesign, rollAssembly) {
    const resResult = UniversalTableEngine.resolveFEAT(project.inventorResources || project.resourceFeatTarget, rollResource, project.resourceShift || 0);
    const desResult = UniversalTableEngine.resolveFEAT(project.inventorReason || project.blueprintFeatTarget, rollDesign, project.blueprintShift || 0);
    const assResult = UniversalTableEngine.resolveFEAT(project.inventorReason || project.assemblyFeatTarget, rollAssembly, project.assemblyShift || 0);

    let status = "Success";
    let message = "Invention assembled successfully and passed bench testing!";
    let isFullyFunctional = true;

    if (!resResult.isSuccess) {
      status = "Resource Procurement Failure";
      message = "Failed to procure required high-grade components. Must spend Karma or secure specialized materials.";
      isFullyFunctional = false;
    } else if (!desResult.isSuccess) {
      status = "Blueprint Design Flaw";
      message = "Flaw in theoretical schematic. Blueprints require revision (adds 1 week to project).";
      isFullyFunctional = false;
    } else if (!assResult.isSuccess) {
      status = "Assembly Burnout";
      message = "Prototype burned out during live current testing. Device requires repair before functional.";
      isFullyFunctional = false;
    }

    return {
      project,
      isFullyFunctional,
      resourceResult: resResult,
      designResult: desResult,
      assemblyResult: assResult,
      status,
      message
    };
  }
}

if (typeof globalThis !== 'undefined') {
  globalThis.InventionCreator = InventionCreator;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { InventionCreator };
}

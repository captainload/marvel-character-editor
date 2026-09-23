/**
 * Marvel Super Heroes (FASERIP) - Character Model & CMF Point-Buy Engine
 * Implements Classic Marvel Forever (CMF) Point-Buy system,
 * variable Health/Karma/Popularity, S32 Collective Mass (Swarm) dual-profile mechanics,
 * and dynamic Roll20-style Attack Compiler with automated Column Shifts & Talents.
 */

if (typeof globalThis.UniversalTableEngine === 'undefined' && typeof require !== 'undefined') {
  Object.assign(globalThis, require('./universal_table.js'));
  Object.assign(globalThis, require('./data_forms.js'));
  Object.assign(globalThis, require('./data_powers.js'));
  Object.assign(globalThis, require('./data_talents.js'));
  Object.assign(globalThis, require('./data_equipment.js'));
}

function evalPoolMax(pool, rankValue) {
  if (!pool) return 0;
  if (pool.max !== undefined && typeof pool.max === 'number' && !pool.maxFormula) return pool.max;
  const rankNumber = rankValue || 0;
  if (typeof pool.maxFormula === 'string') {
    try {
      if (pool.maxFormula.includes('10 * rankNumber')) return 10 * rankNumber;
      if (pool.maxFormula.includes('5 * rankNumber')) return 5 * rankNumber;
      if (pool.maxFormula.includes('rankNumber / 10')) return Math.floor(rankNumber / 10);
      if (pool.maxFormula.includes('rankNumber / 15')) return Math.floor(rankNumber / 15);
      if (pool.maxFormula === 'rankNumber') return rankNumber;
      const num = parseInt(pool.maxFormula);
      if (!isNaN(num)) return num;
      const safeFn = new Function('rankNumber', `return Math.floor(${pool.maxFormula});`);
      return safeFn(rankNumber);
    } catch (e) {
      return rankNumber;
    }
  }
  return pool.max || rankNumber;
}

function normalizePowerStunt(s, defaultLearned = true) {
  if (typeof s === 'string') {
    const colonIdx = s.indexOf(':');
    const name = colonIdx >= 0 ? s.slice(0, colonIdx).trim() : s.trim();
    const desc = colonIdx >= 0 ? s.slice(colonIdx + 1).trim() : '';
    return {
      id: 'stunt_' + Math.random().toString(36).substr(2, 6),
      name: name || 'Stunt',
      description: desc || name,
      emulatedPowerId: null,
      emulatedPowerName: null,
      isLearned: defaultLearned,
      redSuccesses: defaultLearned ? 1 : 0,
      yellowSuccesses: defaultLearned ? 3 : 0,
      greenSuccesses: defaultLearned ? 6 : 0,
      attemptsCount: defaultLearned ? 10 : 0
    };
  }
  const isLearned = s.isLearned !== undefined ? !!s.isLearned : defaultLearned;
  const redSucc = isLearned ? 1 : Math.max(0, Math.min(1, parseInt(s.redSuccesses || 0)));
  const yellowSucc = isLearned ? 3 : Math.max(0, Math.min(3, parseInt(s.yellowSuccesses || 0)));
  const greenSucc = isLearned ? 6 : Math.max(0, Math.min(6, parseInt(s.greenSuccesses || 0)));
  return {
    id: s.id || 'stunt_' + Math.random().toString(36).substr(2, 6),
    name: s.name || (s.stuntName || 'Unnamed Stunt'),
    description: s.description || '',
    emulatedPowerId: s.emulatedPowerId || null,
    emulatedPowerName: s.emulatedPowerName || null,
    isLearned: isLearned || (redSucc >= 1 && yellowSucc >= 3 && greenSucc >= 6),
    redSuccesses: redSucc,
    yellowSuccesses: yellowSucc,
    greenSuccesses: greenSucc,
    attemptsCount: parseInt(s.attemptsCount || (redSucc + yellowSucc + greenSucc))
  };
}

function resolvePowerOperationalType(powerData, catalogPower = null) {
  if (powerData && powerData.operationalType) return powerData.operationalType;
  if (catalogPower && catalogPower.operationalType) return catalogPower.operationalType;

  const duration = (powerData?.duration || catalogPower?.duration || '').toLowerCase();
  const category = (powerData?.category || catalogPower?.category || '').toLowerCase();
  const name = (powerData?.name || catalogPower?.name || '').toLowerCase();

  // Instantaneous duration is inherently Active (requires an action each usage)
  if (duration.includes('instant')) return 'active';

  // Specific offensive emissions/attacks default to active
  if (category.includes('energy emission') && !name.includes('shield') && !name.includes('field') && !name.includes('aura') && !name.includes('transduction')) {
    return 'active';
  }
  if (category.includes('fighting') && !name.includes('armor') && !name.includes('weaponry')) {
    return 'active';
  }

  // Maintained, Continuous, Permanent, Defenses, Self-Alteration, Physical Enhancement default to Passive
  return 'passive';
}

if (typeof globalThis !== 'undefined') {
  globalThis.evalPoolMax = evalPoolMax;
  globalThis.normalizePowerStunt = normalizePowerStunt;
  globalThis.resolvePowerOperationalType = resolvePowerOperationalType;
}

class FASERIPCharacter {
  constructor(initialData = {}) {
    this.id = initialData.id || 'hero_' + Date.now();
    this.name = initialData.name || 'New Hero';
    this.realName = initialData.realName || '';
    this.formKey = initialData.formKey || 'normal_human'; // Key in MSH_PHYSICAL_FORMS
    this.formName = initialData.formName || 'Normal Human';
    this.gender = initialData.gender || 'Unknown';
    this.age = initialData.age || 'Adult';
    this.height = initialData.height || "5'10\"";
    this.weight = initialData.weight || '175 lbs';
    this.hair = initialData.hair || 'Brown';
    this.eyes = initialData.eyes || 'Brown';
    this.identity = initialData.identity || 'Secret'; // Secret, Public, Legal
    this.groupAffiliation = initialData.groupAffiliation || 'None / Solo';
    this.baseOfOperations = initialData.baseOfOperations || 'New York City';

    // CMF Point-Buy Configuration
    // Tiers: 150 (Skilled Human), 200 (Street Vigilante), 300 (Costumed Adventurer),
    // 400 (Established Hero - Default), 500 (Major Superhero), 600 (World-Class Hero), custom
    this.pointTier = initialData.pointTier || '400';
    this.pointBudget = parseInt(initialData.pointBudget ?? 400);

    // Physical Form S32 Collective Mass (Swarm) toggle
    this.isSwarmForm = initialData.isSwarmForm || (this.formKey === 'swarm_collective' || this.formKey === 's32_collective_mass');
    this.activeSwarmProfile = initialData.activeSwarmProfile || 'swarm'; // 'swarm' | 'individual'

    // Primary FASERIP Abilities
    this.abilities = {
      fighting: this.initAbility(initialData.abilities?.fighting || 'Typical'),
      agility: this.initAbility(initialData.abilities?.agility || 'Typical'),
      strength: this.initAbility(initialData.abilities?.strength || 'Typical'),
      endurance: this.initAbility(initialData.abilities?.endurance || 'Typical'),
      reason: this.initAbility(initialData.abilities?.reason || 'Typical'),
      intuition: this.initAbility(initialData.abilities?.intuition || 'Typical'),
      psyche: this.initAbility(initialData.abilities?.psyche || 'Typical')
    };

    // S32 Swarm secondary individual profile (if Collective Mass)
    this.individualAbilities = initialData.individualAbilities ? {
      fighting: this.initAbility(initialData.individualAbilities.fighting || 'Feeble'),
      agility: this.initAbility(initialData.individualAbilities.agility || 'Typical'),
      strength: this.initAbility(initialData.individualAbilities.strength || 'Shift 0'),
      endurance: this.initAbility(initialData.individualAbilities.endurance || 'Feeble'),
      reason: this.initAbility(initialData.individualAbilities.reason || initialData.abilities?.reason || 'Typical'),
      intuition: this.initAbility(initialData.individualAbilities.intuition || initialData.abilities?.intuition || 'Typical'),
      psyche: this.initAbility(initialData.individualAbilities.psyche || initialData.abilities?.psyche || 'Typical')
    } : null;

    // Resources & Popularity
    this.resources = this.initAbility(initialData.resources || 'Typical');
    this.basePopularity = parseInt(initialData.basePopularity ?? 10);
    this.currentPopularity = parseInt(initialData.currentPopularity ?? this.basePopularity);

    // Health & Karma
    this.manualMaxHealth = initialData.manualMaxHealth || null;
    this.currentHealth = parseInt(initialData.currentHealth ?? this.calculateMaxHealth());
    this.manualMaxKarma = initialData.manualMaxKarma || null;
    this.currentKarma = parseInt(initialData.currentKarma ?? this.calculateBaseKarma());

    // Active Conditions / Status
    this.conditions = Array.isArray(initialData.conditions) ? [...initialData.conditions] : [];

    // Defenses
    this.defenses = {
      bodyArmor: {
        rankName: initialData.defenses?.bodyArmor?.rankName || 'None',
        physical: parseInt(initialData.defenses?.bodyArmor?.physical || 0),
        energy: parseInt(initialData.defenses?.bodyArmor?.energy || 0),
        notes: initialData.defenses?.bodyArmor?.notes || ''
      },
      forceField: {
        rankName: initialData.defenses?.forceField?.rankName || 'None',
        protection: parseInt(initialData.defenses?.forceField?.protection || 0),
        notes: initialData.defenses?.forceField?.notes || ''
      },
      resistances: initialData.defenses?.resistances || []
    };

    // Powers Catalog
    const allCatalogPowers = [
      ...(globalThis.MSH_POWERS || []),
      ...(globalThis.MSH_NPC_PRESET_POWERS || [])
    ];

    this.powers = Array.isArray(initialData.powers) ? initialData.powers.map(p => {
      // Cross-reference canonical MSH_POWERS / MSH_NPC_PRESET_POWERS for canonical starred status
      const catalogPower = allCatalogPowers.find(cp => 
        (p.code && (cp.id === p.code || cp.code === p.code)) ||
        (p.catalogId && (cp.id === p.catalogId || cp.code === p.catalogId)) ||
        (p.name && cp.name.toLowerCase() === p.name.toLowerCase()) ||
        (p.name && cp.name.toLowerCase().startsWith(p.name.toLowerCase()))
      );
      const isStarred = !!(p.isStarred || (catalogPower && (catalogPower.isStarred || catalogPower.countsAsTwo)));
      const isExceptional = !!(p.isExceptional || isStarred);
      const powerSlots = isStarred ? 2 : (p.powerSlots || (catalogPower ? catalogPower.powerSlots : 1));
      const rankName = p.rankName || (catalogPower ? catalogPower.defaultRank : 'Good');
      const rankVal = p.rankValue ?? (UniversalTableEngine.getRankByName(rankName) ? UniversalTableEngine.getRankByName(rankName).num : 10);

      // Resolve pool & reactive modifier definitions
      let pool = p.pool || (catalogPower && catalogPower.pool ? JSON.parse(JSON.stringify(catalogPower.pool)) : null);
      if (pool) {
        pool.max = evalPoolMax(pool, rankVal);
        pool.current = Math.min(Math.max(0, parseInt(pool.current ?? 0)), pool.max);
      }

      const trigger = p.trigger || (catalogPower && catalogPower.trigger ? JSON.parse(JSON.stringify(catalogPower.trigger)) : null);
      const traitModifiers = Array.isArray(p.traitModifiers) 
        ? p.traitModifiers 
        : (catalogPower && catalogPower.traitModifiers ? JSON.parse(JSON.stringify(catalogPower.traitModifiers)) : []);

      return {
        id: p.id || 'p_' + Date.now() + Math.random().toString(36).substr(2, 4),
        code: p.code || (catalogPower ? catalogPower.code : null),
        name: p.name || (catalogPower ? catalogPower.name : 'Unnamed Power'),
        category: p.category || (catalogPower ? catalogPower.category : 'Special'),
        rankName: rankName,
        rankValue: rankVal,
        powerSlots: powerSlots,
        isStarred: isStarred,
        isExceptional: isExceptional,
        isNpcArchetype: !!(p.isNpcArchetype || (catalogPower && catalogPower.isNpcArchetype)),
        isCustom: !!p.isCustom,
        templateKey: p.templateKey || (catalogPower ? catalogPower.code : null),
        source: p.source || (catalogPower ? catalogPower.source : 'UPB'),
        range: p.range !== undefined ? p.range : (catalogPower ? catalogPower.range : null),
        duration: p.duration !== undefined ? p.duration : (catalogPower ? catalogPower.duration : null),
        areaOfEffect: p.areaOfEffect !== undefined ? p.areaOfEffect : (catalogPower ? catalogPower.areaOfEffect : null),
        targets: p.targets !== undefined ? p.targets : (catalogPower ? catalogPower.targets : null),
        speed: p.speed !== undefined ? p.speed : (catalogPower ? catalogPower.speed : null),
        pool: pool,
        trigger: trigger,
        traitModifiers: traitModifiers,
        adjustments: p.adjustments || null,
        selectedOption: p.selectedOption || null,
        optionSubChoice: p.optionSubChoice || null,
        optionAcquisitionMethod: p.optionAcquisitionMethod || 'chosen',
        optionSurcharge: p.optionSurcharge !== undefined ? parseInt(p.optionSurcharge) : 0,
        isSuperiorOption: !!p.isSuperiorOption,
        operationalType: p.operationalType || resolvePowerOperationalType(p, catalogPower),
        isSwitchedOn: p.isSwitchedOn !== undefined ? !!p.isSwitchedOn : true,
        isDisabled: p.isDisabled !== undefined ? !!p.isDisabled : false,
        triggerConfig: p.triggerConfig ? JSON.parse(JSON.stringify(p.triggerConfig)) : {
          mode: 'default',
          masterPowerId: null,
          masterPowerName: null,
          invert: false,
          conditionLabel: ''
        },
        notes: p.notes || '',
        stunts: Array.isArray(p.stunts) 
          ? p.stunts.map(s => normalizePowerStunt(s, s.isLearned !== undefined ? !!s.isLearned : true))
          : (catalogPower && Array.isArray(catalogPower.powerStunts) ? catalogPower.powerStunts.map(s => normalizePowerStunt(s, true)) : [])
      };
    }) : [];

    // Talents
    this.talents = Array.isArray(initialData.talents) ? initialData.talents.map(t => {
      const talentId = t.talentId || t.id;
      const catalogTalent = (globalThis.MSH_TALENTS || []).find(ct => 
        (talentId && ct.id === talentId) ||
        (t.id && (ct.id === t.id || (globalThis.TALENTS_BY_ID && globalThis.TALENTS_BY_ID[t.id]?.id === ct.id))) ||
        (t.name && ct.name.toLowerCase() === t.name.toLowerCase())
      ) || (globalThis.TALENTS_BY_ID && talentId && globalThis.TALENTS_BY_ID[talentId]) || null;

      const isStarred = !!(t.isStarred || (catalogTalent && catalogTalent.isStarred));
      const slots = t.slots || (catalogTalent && catalogTalent.slots) || (isStarred ? 2 : 1);
      const costCP = t.costCP !== undefined ? t.costCP : ((catalogTalent && catalogTalent.costCP !== undefined) ? catalogTalent.costCP : (isStarred ? 20 : 10));
      const allowsSpecialization = !!(t.allowsSpecialization || (catalogTalent && catalogTalent.allowsSpecialization));
      const specPlaceholder = t.specPlaceholder || (catalogTalent && catalogTalent.specPlaceholder) || '';
      const minResourcesRank = t.minResourcesRank || (catalogTalent && catalogTalent.minResourcesRank) || null;
      const minResourcesRankValue = t.minResourcesRankValue !== undefined ? t.minResourcesRankValue : (catalogTalent ? catalogTalent.minResourcesRankValue : null);
      const specialization = (t.specialization || '').trim();
      const baseName = t.name || (catalogTalent ? catalogTalent.name : 'Unnamed Talent');
      const displayName = t.displayName || (specialization ? `${baseName} (${specialization})` : baseName);

      return {
        id: t.id || 't_' + Date.now() + Math.random().toString(36).substr(2, 4),
        talentId: t.talentId || (catalogTalent ? catalogTalent.id : null),
        name: baseName,
        displayName: displayName,
        category: t.category || (catalogTalent ? (catalogTalent.group || catalogTalent.category) : 'General'),
        description: t.description || (catalogTalent ? catalogTalent.description : ''),
        statAffected: t.statAffected || (catalogTalent ? catalogTalent.statAffected : ''),
        csBonus: t.csBonus !== undefined ? t.csBonus : (catalogTalent ? (catalogTalent.bonus || catalogTalent.csBonus) : null),
        isStarred: isStarred,
        slots: slots,
        costCP: costCP,
        allowsSpecialization: allowsSpecialization,
        specialization: specialization,
        specPlaceholder: specPlaceholder,
        minResourcesRank: minResourcesRank,
        minResourcesRankValue: minResourcesRankValue,
        priorResources: t.priorResources || null
      };
    }) : [];

    // Contacts
    this.contacts = Array.isArray(initialData.contacts) ? [...initialData.contacts] : [];

    // Equipment & Weapons
    this.equipment = Array.isArray(initialData.equipment) ? initialData.equipment.map(eq => ({
      id: eq.id || 'eq_' + Date.now() + Math.random().toString(36).substr(2, 4),
      name: eq.name || 'Equipment Item',
      type: eq.type || 'Gear',
      damage: eq.damage || '',
      damageValue: parseInt(eq.damageValue || 0),
      range: eq.range || 'Touch',
      rateOfFire: eq.rateOfFire || '1',
      materialStrength: eq.materialStrength || 'Good',
      notes: eq.notes || '',
      equipped: eq.equipped !== false,
      abilityBoosts: Array.isArray(eq.abilityBoosts) ? [...eq.abilityBoosts] : [],
      powers: Array.isArray(eq.powers) ? [...eq.powers] : []
    })) : [];

    // Known Blueprints & Schematics Archive
    this.knownBlueprints = Array.isArray(initialData.knownBlueprints) ? initialData.knownBlueprints.map(bp => ({
      id: bp.id || 'bp_' + Date.now() + Math.random().toString(36).substr(2, 4),
      name: bp.name || 'Unnamed Blueprint',
      sourceType: bp.sourceType || 'tech',
      category: bp.category || 'Weapon',
      origin: bp.origin || 'invention',
      targetPowerName: bp.targetPowerName || '',
      targetPowerRank: bp.targetPowerRank || 'Good',
      costRank: bp.costRank || bp.resourceRank || 'Typical',
      resourceRank: bp.resourceRank || bp.costRank || 'Typical',
      materialRank: bp.materialRank || 'Remarkable',
      blueprintShift: bp.blueprintShift !== undefined ? bp.blueprintShift : 0,
      resourceShift: bp.resourceShift !== undefined ? bp.resourceShift : 0,
      assemblyShift: bp.assemblyShift !== undefined ? bp.assemblyShift : 0,
      buildDays: bp.buildDays || bp.estimatedBuildDays || 3,
      estimatedBuildDays: bp.buildDays || bp.estimatedBuildDays || 3,
      powers: Array.isArray(bp.powers) ? [...bp.powers] : [],
      abilityBoosts: Array.isArray(bp.abilityBoosts) ? [...bp.abilityBoosts] : [],
      activeBoosts: Array.isArray(bp.activeBoosts) ? [...bp.activeBoosts] : [],
      activeLimits: Array.isArray(bp.activeLimits) ? [...bp.activeLimits] : [],
      hardwareFlags: bp.hardwareFlags || {},
      effectiveDifficultyRank: bp.effectiveDifficultyRank || 'Remarkable',
      powerSource: bp.powerSource || '',
      charges: bp.charges || '',
      sourceItemId: bp.sourceItemId || bp.prebuiltItemId || null,
      prebuiltItemId: bp.sourceItemId || bp.prebuiltItemId || null,
      itemData: bp.itemData ? { ...bp.itemData } : null,
      notes: bp.notes || '',
      dateLearned: bp.dateLearned || new Date().toISOString()
    })) : [];

    // Karmic Success House Rule (per-character preference)
    this.karmicSuccess = initialData.karmicSuccess !== undefined ? !!initialData.karmicSuccess : false;
    this.lastKarmaSpentOnRoll = initialData.lastKarmaSpentOnRoll || null;
    this.lastKarmaSpentOnRankIncrease = initialData.lastKarmaSpentOnRankIncrease || null;

    // Karma Ledger & Advancement History
    this.advancementLog = Array.isArray(initialData.advancementLog) ? [...initialData.advancementLog] : [];
    if (!this.lastKarmaSpentOnRankIncrease && this.advancementLog.length > 0) {
      const lastAdv = this.advancementLog.find(e => e.type === 'advancement' || (e.amount < 0 && e.reason && e.reason.toLowerCase().includes('advanced')));
      if (lastAdv) {
        this.lastKarmaSpentOnRankIncrease = {
          amount: Math.abs(lastAdv.amount || 0),
          target: lastAdv.target || '',
          from: lastAdv.from || '',
          to: lastAdv.to || '',
          category: lastAdv.category || 'ability'
        };
      }
    }
    this.notes = initialData.notes || '';

    // Character Edit Log & Timeline Navigation
    this.editLog = Array.isArray(initialData.editLog) ? [...initialData.editLog] : [];
    this.editHistoryIndex = typeof initialData.editHistoryIndex === 'number' ? initialData.editHistoryIndex : (this.editLog.length - 1);
  }

  addKnownBlueprint(bpData) {
    if (!bpData || !bpData.name) return { added: false, error: 'Invalid blueprint data' };
    const normName = bpData.name.trim().toLowerCase();
    const existingIdx = this.knownBlueprints.findIndex(b => b.name.trim().toLowerCase() === normName);

    const newBp = {
      id: bpData.id || 'bp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: bpData.name.trim(),
      sourceType: bpData.sourceType || 'tech',
      category: bpData.category || 'Weapon',
      origin: bpData.origin || 'invention',
      targetPowerName: bpData.targetPowerName || '',
      targetPowerRank: bpData.targetPowerRank || 'Good',
      costRank: bpData.costRank || bpData.resourceRank || 'Typical',
      resourceRank: bpData.resourceRank || bpData.costRank || 'Typical',
      materialRank: bpData.materialRank || 'Remarkable',
      blueprintShift: bpData.blueprintShift !== undefined ? bpData.blueprintShift : 0,
      resourceShift: bpData.resourceShift !== undefined ? bpData.resourceShift : 0,
      assemblyShift: bpData.assemblyShift !== undefined ? bpData.assemblyShift : 0,
      buildDays: bpData.buildDays || bpData.estimatedBuildDays || 3,
      estimatedBuildDays: bpData.buildDays || bpData.estimatedBuildDays || 3,
      powers: Array.isArray(bpData.powers) ? JSON.parse(JSON.stringify(bpData.powers)) : [],
      abilityBoosts: Array.isArray(bpData.abilityBoosts) ? JSON.parse(JSON.stringify(bpData.abilityBoosts)) : [],
      activeBoosts: Array.isArray(bpData.activeBoosts) ? [...bpData.activeBoosts] : [],
      activeLimits: Array.isArray(bpData.activeLimits) ? [...bpData.activeLimits] : [],
      hardwareFlags: bpData.hardwareFlags ? { ...bpData.hardwareFlags } : {},
      effectiveDifficultyRank: bpData.effectiveDifficultyRank || 'Remarkable',
      powerSource: bpData.powerSource || '',
      charges: bpData.charges || '',
      sourceItemId: bpData.sourceItemId || bpData.prebuiltItemId || null,
      prebuiltItemId: bpData.sourceItemId || bpData.prebuiltItemId || null,
      itemData: bpData.itemData ? { ...bpData.itemData } : null,
      notes: bpData.notes || '',
      dateLearned: bpData.dateLearned || new Date().toLocaleDateString()
    };

    if (existingIdx >= 0) {
      newBp.id = this.knownBlueprints[existingIdx].id;
      this.knownBlueprints[existingIdx] = newBp;
      return { added: true, updated: true, blueprint: newBp };
    } else {
      this.knownBlueprints.push(newBp);
      return { added: true, updated: false, blueprint: newBp };
    }
  }

  removeKnownBlueprint(id) {
    const prevLen = this.knownBlueprints.length;
    this.knownBlueprints = this.knownBlueprints.filter(b => b.id !== id);
    return this.knownBlueprints.length < prevLen;
  }

  getKnownBlueprint(id) {
    return this.knownBlueprints.find(b => b.id === id);
  }

  initAbility(rankInput) {
    let rankName = 'Typical';
    let rankValue = 6;
    if (typeof rankInput === 'string') {
      const r = UniversalTableEngine.getRankByName(rankInput);
      rankName = r.name;
      rankValue = r.num;
    } else if (typeof rankInput === 'object' && rankInput !== null) {
      rankName = rankInput.rankName || rankInput.name || 'Typical';
      rankValue = rankInput.rankValue ?? rankInput.num ?? UniversalTableEngine.getRankByName(rankName).num;
    } else if (typeof rankInput === 'number') {
      const found = RANKS.find(r => r.num === rankInput) || UniversalTableEngine.getRankByName('Typical');
      rankName = found.name;
      rankValue = found.num;
    }
    return {
      rankName: rankName,
      rankValue: rankValue,
      baseRankName: rankName,
      baseRankValue: rankValue,
      tempModifier: 0
    };
  }

  getActiveAbilities() {
    let baseAbs = this.abilities;
    if (this.isSwarmForm && this.activeSwarmProfile === 'individual' && this.individualAbilities) {
      baseAbs = this.individualAbilities;
    }

    // Clone ability references so we can modify without mutating base state
    const activeAbs = {};
    for (const key of ['fighting', 'agility', 'strength', 'endurance', 'reason', 'intuition', 'psyche']) {
      if (baseAbs && baseAbs[key]) {
        activeAbs[key] = {
          ...baseAbs[key],
          bonusFromPower: 0,
          isBoosted: false
        };
      }
    }

    if (!Array.isArray(this.powers)) return activeAbs;

    // 1. Legacy canonical UPB checks (Hyper-Strength Permanent Addition, Growth Atomic Gain/Growth)
    let strBonus = 0;
    let overrideStrRank = null;
    let overrideStrVal = null;

    const hyperStr = this.powers.find(p => (p.code === 'P20' || (p.name && p.name.toLowerCase() === 'hyper-strength')) && (p.selectedOption === 'permanent' || !p.selectedOption || p.selectedOption === 'addition'));
    if (hyperStr && this.isPowerOperating(hyperStr.id)) {
      strBonus += (hyperStr.rankValue || 0);
    }

    const growthPower = this.powers.find(p => (p.code === 'S16' || (p.name && p.name.toLowerCase().includes('growth'))));
    if (growthPower && this.isPowerOperating(growthPower.id) && activeAbs.strength) {
      if (growthPower.selectedOption === 'gain') {
        if ((growthPower.rankValue || 0) > (activeAbs.strength.rankValue || 0)) {
          overrideStrRank = growthPower.rankName;
          overrideStrVal = growthPower.rankValue;
        }
      } else if (growthPower.selectedOption === 'growth' && typeof UniversalTableEngine !== 'undefined') {
        const shifted = UniversalTableEngine.applyColumnShift(activeAbs.strength.rankName, 1);
        const shiftedNum = (typeof shifted === 'object' && shifted.num !== undefined) ? shifted.num : UniversalTableEngine.getRankByName(shifted).num;
        strBonus += Math.max(0, shiftedNum - (activeAbs.strength.rankValue || 0));
      }
    }

    if ((strBonus > 0 || overrideStrVal !== null) && activeAbs.strength) {
      const totalVal = (overrideStrVal !== null ? overrideStrVal : (activeAbs.strength.rankValue || 0)) + strBonus;
      const rankObj = (typeof UniversalTableEngine !== 'undefined') 
        ? UniversalTableEngine.getRankByNum(totalVal) 
        : { name: overrideStrRank || activeAbs.strength.rankName, num: totalVal };
      activeAbs.strength.rankName = rankObj.name;
      activeAbs.strength.rankValue = totalVal;
      activeAbs.strength.bonusFromPower = strBonus + (overrideStrVal !== null ? (overrideStrVal - (baseAbs.strength.rankValue || 0)) : 0);
      activeAbs.strength.isBoosted = true;
    }

    // 2. Reactive Trait Modifiers & Power Pools (Reverse-Engineered NPC & Custom Powers)
    this.powers.forEach(p => {
      if (!this.isPowerOperating(p.id)) return;
      if (!p.traitModifiers || !Array.isArray(p.traitModifiers) || p.traitModifiers.length === 0) return;
      const currentCharge = (p.pool && typeof p.pool.current === 'number') ? p.pool.current : 0;
      const poolMax = (p.pool && typeof p.pool.max === 'number') ? p.pool.max : 0;

      p.traitModifiers.forEach(mod => {
        const targets = Array.isArray(mod.targetStats) ? mod.targetStats : (mod.targetStat ? [mod.targetStat] : []);
        targets.forEach(rawStat => {
          const statKey = (rawStat || '').toLowerCase().trim();
          if (!activeAbs[statKey]) return;

          if (mod.mode === 'set_to_pool') {
            // e.g. Material Duplication or Organic Steel
            const valToSet = p.pool ? currentCharge : (p.rankValue || 75);
            if (valToSet > 0 && typeof UniversalTableEngine !== 'undefined') {
              let finalRank = UniversalTableEngine.getRankByNum(valToSet);
              if (mod.maxCapRank) {
                const capObj = UniversalTableEngine.getRankByName(mod.maxCapRank);
                if (capObj && finalRank.num > capObj.num) finalRank = capObj;
              }
              if (finalRank.num > activeAbs[statKey].rankValue) {
                const diff = finalRank.num - activeAbs[statKey].rankValue;
                activeAbs[statKey].rankName = finalRank.name;
                activeAbs[statKey].rankValue = finalRank.num;
                activeAbs[statKey].bonusFromPower = (activeAbs[statKey].bonusFromPower || 0) + diff;
                activeAbs[statKey].isBoosted = true;
              }
            }
          } else {
            // Column Shift scaling based on pool charge
            let threshold = 50; // default for Remarkable Kinetic Absorption
            if (mod.thresholdFormula === 'poolMax / 6' && poolMax > 0) {
              threshold = poolMax / 6;
            } else if (mod.thresholdFormula === '1') {
              threshold = 1;
            } else if (typeof mod.thresholdRatio === 'number' && mod.thresholdRatio > 0) {
              threshold = mod.thresholdRatio;
            } else if (typeof mod.scalingRatio === 'number' && mod.scalingRatio > 0) {
              threshold = mod.scalingRatio;
            } else if (typeof mod.thresholdFormula === 'string') {
              const parsed = parseFloat(mod.thresholdFormula);
              if (!isNaN(parsed) && parsed > 0) threshold = parsed;
            }

            const csPerStep = mod.csPerThreshold || mod.csBonus || 1;
            let calculatedCS = (threshold > 0 && currentCharge > 0)
              ? Math.floor(currentCharge / threshold) * csPerStep
              : 0;

            if (mod.maxCS && calculatedCS > mod.maxCS) {
              calculatedCS = mod.maxCS;
            }

            if (calculatedCS > 0 && typeof UniversalTableEngine !== 'undefined') {
              const currentRankName = activeAbs[statKey].rankName;
              let shifted = UniversalTableEngine.applyColumnShift(currentRankName, calculatedCS);
              if (mod.maxCapRank) {
                const capObj = UniversalTableEngine.getRankByName(mod.maxCapRank);
                if (capObj && shifted.num > capObj.num) {
                  shifted = capObj;
                }
              }
              if (shifted.num > activeAbs[statKey].rankValue) {
                const diff = shifted.num - activeAbs[statKey].rankValue;
                activeAbs[statKey].rankName = shifted.name;
                activeAbs[statKey].rankValue = shifted.num;
                activeAbs[statKey].bonusFromPower = (activeAbs[statKey].bonusFromPower || 0) + diff;
                activeAbs[statKey].isBoosted = true;
              }
            }
          }
        });
      });
    });

    return activeAbs;
  }

  getBaseHealth() {
    let baseAbs = this.abilities;
    if (this.isSwarmForm && this.activeSwarmProfile === 'individual' && this.individualAbilities) {
      baseAbs = this.individualAbilities;
    }
    return (
      (baseAbs?.fighting?.rankValue || 0) +
      (baseAbs?.agility?.rankValue || 0) +
      (baseAbs?.strength?.rankValue || 0) +
      (baseAbs?.endurance?.rankValue || 0)
    );
  }

  calculateHealthBreakdown() {
    const baseHealthMax = this.getBaseHealth();
    const totalMaxHealth = this.calculateMaxHealth();
    const currentHealth = Math.max(0, this.currentHealth !== undefined && this.currentHealth !== null ? this.currentHealth : totalMaxHealth);

    // Any Health that exceeds base goes into Bonus Health (uncapped)
    const currentBaseHealth = Math.min(baseHealthMax, currentHealth);
    const currentBonusHealth = Math.max(0, currentHealth - baseHealthMax);
    const powerBonusHealth = Math.max(0, totalMaxHealth - baseHealthMax);

    return {
      baseHealth: currentBaseHealth,
      baseHealthMax,
      bonusHealth: currentBonusHealth,
      powerBonusHealth,
      totalMaxHealth,
      currentHealth
    };
  }

  calculateMaxHealth() {
    if (this.manualMaxHealth !== null) return this.manualMaxHealth;
    
    // Base abilities without temporary power shifts
    let baseAbs = this.abilities;
    if (this.isSwarmForm && this.activeSwarmProfile === 'individual' && this.individualAbilities) {
      baseAbs = this.individualAbilities;
    }

    const abs = this.getActiveAbilities();
    let baseHealth = (
      (abs?.fighting?.rankValue || 0) +
      (abs?.agility?.rankValue || 0) +
      (abs?.strength?.rankValue || 0) +
      (abs?.endurance?.rankValue || 0)
    );

    // Incorporate active temporary health buffers from powers (e.g. Kinetic Absorption)
    let bufferHealthBonus = 0;
    let maxHealthCap = null;
    if (Array.isArray(this.powers)) {
      this.powers.forEach(p => {
        if (!this.isPowerOperating(p.id)) return;
        if (p.trigger && p.trigger.action === 'buffer_health' && p.pool && p.pool.current > 0) {
          bufferHealthBonus += p.pool.current;
          if (p.pool.maxHealthCap) {
            maxHealthCap = p.pool.maxHealthCap;
          }
        }
      });
    }

    let totalHealth = baseHealth + bufferHealthBonus;
    if (maxHealthCap !== null && totalHealth > maxHealthCap) {
      totalHealth = maxHealthCap;
    }

    return totalHealth;
  }

  calculateBaseKarma() {
    if (this.manualMaxKarma !== null) return this.manualMaxKarma;
    const abs = this.getActiveAbilities();
    return (
      (abs.reason.rankValue || 0) +
      (abs.intuition.rankValue || 0) +
      (abs.psyche.rankValue || 0)
    );
  }

  calculateDefenses() {
    const defenses = {
      bodyArmor: {
        rankName: 'None',
        physical: 0,
        energy: 0,
        notes: ''
      },
      forceField: {
        rankName: 'None',
        protection: 0,
        notes: ''
      },
      resistances: []
    };

    const getRank = (name) => {
      if (typeof UniversalTableEngine !== 'undefined') {
        return UniversalTableEngine.getRankByName(name);
      }
      return { name, num: 0 };
    };

    const shift = (rankName, cs) => {
      if (typeof UniversalTableEngine !== 'undefined') {
        const res = UniversalTableEngine.applyColumnShift(rankName, cs);
        return typeof res === 'object' ? res.name : res;
      }
      return rankName;
    };

    if (Array.isArray(this.powers)) {
      this.powers.forEach(p => {
        if (!this.isPowerOperating(p.id)) return;
        const code = p.code || '';
        const nameLower = (p.name || '').toLowerCase();
        const baseRank = p.rankName || 'Typical';
        const baseVal = p.rankValue !== undefined ? p.rankValue : (getRank(baseRank).num || 6);

        // 1. Body Armor (D1, by name, or Organic Steel)
        if (code === 'D1' || nameLower === 'body armor' || code === 'NPC_COL' || nameLower.includes('organic steel')) {
          if (code === 'NPC_COL' || nameLower.includes('organic steel')) {
            if (baseVal > defenses.bodyArmor.physical) {
              defenses.bodyArmor.physical = baseVal;
              defenses.bodyArmor.energy = baseVal;
              defenses.bodyArmor.rankName = baseRank;
              defenses.bodyArmor.notes = 'Organic Steel Armored Form';
            }
            return;
          }
          const opt = p.selectedOption || 'balanced';
          if (opt === 'physical_only') {
            const shiftedRank = shift(baseRank, 1);
            const shiftedVal = getRank(shiftedRank).num;
            if (shiftedVal > defenses.bodyArmor.physical) {
              defenses.bodyArmor.physical = shiftedVal;
              defenses.bodyArmor.rankName = shiftedRank;
              defenses.bodyArmor.notes = 'Physical Protection Only (+1CS Specialization)';
            }
          } else if (opt === 'energy_only') {
            const shiftedRank = shift(baseRank, 1);
            const shiftedVal = getRank(shiftedRank).num;
            if (shiftedVal > defenses.bodyArmor.energy) {
              defenses.bodyArmor.energy = shiftedVal;
              defenses.bodyArmor.rankName = shiftedRank;
              defenses.bodyArmor.notes = 'Energy Protection Only (+1CS Specialization)';
            }
          } else {
            // Balanced
            if (baseVal > defenses.bodyArmor.physical) {
              defenses.bodyArmor.physical = baseVal;
              defenses.bodyArmor.energy = baseVal;
              defenses.bodyArmor.rankName = baseRank;
              defenses.bodyArmor.notes = 'Standard Physical & Energy Protection';
            }
          }
        }

        // True Invulnerability (P14)
        if (code === 'P14' || nameLower === 'true invulnerability') {
          if (baseVal > defenses.bodyArmor.physical) {
            defenses.bodyArmor.physical = baseVal;
            defenses.bodyArmor.energy = baseVal;
            defenses.bodyArmor.rankName = baseRank;
            defenses.bodyArmor.notes = 'True Invulnerability (Universal Protection)';
          }
          defenses.resistances.push({
            name: 'True Invulnerability (All Physical & Energy)',
            type: 'All Physical/Energy',
            rank: baseRank,
            rankName: baseRank,
            rankValue: baseVal
          });
        }

        // 2. Force Field (D2, D4, D7, D9)
        if (code === 'D2' || (nameLower.includes('force field') && !code.startsWith('D'))) {
          if (baseVal > defenses.forceField.protection) {
            defenses.forceField.protection = baseVal;
            defenses.forceField.rankName = baseRank;
            defenses.forceField.notes = 'Universal Force Field';
          }
        } else if (code === 'D4' || nameLower.includes('force field vs. energy')) {
          const isSpec = p.selectedOption === 'specialized';
          const finalRank = isSpec ? shift(baseRank, 2) : baseRank;
          const finalVal = getRank(finalRank).num;
          const sub = p.optionSubChoice || 'All Energy';
          if (finalVal > defenses.forceField.protection) {
            defenses.forceField.protection = finalVal;
            defenses.forceField.rankName = finalRank;
            defenses.forceField.notes = isSpec ? `Energy Field: Specialized vs ${sub} (+2CS)` : 'Broad Force Field vs. Energy';
          }
        } else if (code === 'D7' || nameLower.includes('force field vs. physical')) {
          const isSpec = p.selectedOption === 'specialized';
          const finalRank = isSpec ? shift(baseRank, 1) : baseRank;
          const finalVal = getRank(finalRank).num;
          const sub = p.optionSubChoice || 'All Physical';
          if (finalVal > defenses.forceField.protection) {
            defenses.forceField.protection = finalVal;
            defenses.forceField.rankName = finalRank;
            defenses.forceField.notes = isSpec ? `Physical Field: Specialized vs ${sub} (+1CS)` : 'Broad Force Field vs. Physical';
          }
        } else if (code === 'D9' || nameLower.includes('force field vs. vampirism')) {
          const isSpec = p.selectedOption === 'specialized';
          const finalRank = isSpec ? shift(baseRank, 1) : baseRank;
          const finalVal = getRank(finalRank).num;
          const sub = p.optionSubChoice || 'All Vampirism';
          if (finalVal > defenses.forceField.protection) {
            defenses.forceField.protection = finalVal;
            defenses.forceField.rankName = finalRank;
            defenses.forceField.notes = isSpec ? `Vampirism Field: Specialized vs ${sub} (+1CS)` : 'Broad Force Field vs. Vampirism';
          }
        }

        // 3. Resistances (D12, D15, D17)
        if (code === 'D12' || nameLower.includes('resist: energy') || nameLower.includes('resistance to energy')) {
          const isSpec = p.selectedOption === 'specialized';
          const finalRank = isSpec ? shift(baseRank, 1) : baseRank;
          const finalVal = getRank(finalRank).num;
          const sub = p.optionSubChoice ? ` (${p.optionSubChoice})` : '';
          defenses.resistances.push({
            name: `Energy Resistance${sub}${isSpec ? ' [+1CS]' : ''}`,
            type: 'Energy',
            rank: finalRank,
            rankName: finalRank,
            rankValue: finalVal
          });
        } else if (code === 'D15' || nameLower.includes('resist: physical') || nameLower.includes('resistance to physical')) {
          const isSpec = p.selectedOption === 'specialized';
          const finalRank = isSpec ? shift(baseRank, 1) : baseRank;
          const finalVal = getRank(finalRank).num;
          const sub = p.optionSubChoice ? ` (${p.optionSubChoice})` : '';
          defenses.resistances.push({
            name: `Physical Resistance${sub}${isSpec ? ' [+1CS]' : ''}`,
            type: 'Physical',
            rank: finalRank,
            rankName: finalRank,
            rankValue: finalVal
          });
        } else if (code === 'D17' || nameLower.includes('resist: vampirism')) {
          const isSpec = p.selectedOption === 'specialized';
          const finalRank = isSpec ? shift(baseRank, 2) : baseRank;
          const finalVal = getRank(finalRank).num;
          const sub = p.optionSubChoice ? ` (${p.optionSubChoice})` : '';
          defenses.resistances.push({
            name: `Vampirism Resistance${sub}${isSpec ? ' [+2CS]' : ''}`,
            type: 'Vampirism',
            rank: finalRank,
            rankName: finalRank,
            rankValue: finalVal
          });
        }

        // 4. Absorption Power (EC1)
        if (code === 'EC1' || nameLower === 'absorption power' || nameLower.includes('absorption power')) {
          const opt = p.selectedOption || 'electricity';
          const def = (typeof globalThis.getPowerOptionsDefinition === 'function') ? globalThis.getPowerOptionsDefinition(p) : null;
          const choiceObj = def?.choices?.find(c => c.key === opt);
          const energyLabel = choiceObj ? choiceObj.label : (p.optionSubChoice || 'Energy');
          defenses.resistances.push({
            name: `Absorption: ${energyLabel}`,
            type: energyLabel,
            rank: baseRank,
            rankName: baseRank,
            rankValue: baseVal,
            notes: `Converts incoming ${energyLabel} damage directly into Self-Healing / Health buffer (up to ${baseVal} per hit).`
          });
        }
      });
    }

    // Equipment defenses check (e.g. Kevlar vest or Armor)
    if (Array.isArray(this.equipment)) {
      this.equipment.forEach(eq => {
        if (eq.equipped && (eq.type === 'Armor' || (eq.category && eq.category.toLowerCase().includes('armor')))) {
          const eqVal = eq.materialValue || 10;
          if (eqVal > defenses.bodyArmor.physical) {
            defenses.bodyArmor.physical = eqVal;
            defenses.bodyArmor.notes = `${eq.name} Armor`;
          }
        }
      });
    }

    this.defenses = defenses;
    return defenses;
  }

  updateHealth(delta) {
    const maxH = this.calculateMaxHealth();
    const cur = this.currentHealth !== undefined && this.currentHealth !== null ? this.currentHealth : maxH;
    // Health is non-negative and uncapped on the upper end (bonus health accumulates without arbitrary multiplier caps)
    this.currentHealth = Math.max(0, cur + delta);
    return this.currentHealth;
  }

  updateKarma(delta, reason = '') {
    this.currentKarma = Math.max(0, this.currentKarma + delta);
    this.advancementLog.unshift({
      date: new Date().toLocaleDateString(),
      type: delta >= 0 ? 'karma_gain' : 'karma_spend',
      amount: delta,
      reason: reason || (delta >= 0 ? 'Karma Earned' : 'Karma Spent'),
      balance: this.currentKarma
    });
    return this.currentKarma;
  }

  hasAccumulatedKarma() {
    return this.advancementLog.some(e => e.type === 'karma_gain' || (e.amount > 0 && e.type !== 'initial'));
  }

  addCondition(conditionName) {
    if (!this.conditions.includes(conditionName)) {
      this.conditions.push(conditionName);
    }
  }

  removeCondition(conditionName) {
    this.conditions = this.conditions.filter(c => c !== conditionName);
  }

  addPower(powerData) {
    if (!powerData) return null;
    if (!Array.isArray(this.powers)) this.powers = [];

    const allCatalogPowers = [
      ...(globalThis.MSH_POWERS || []),
      ...(globalThis.MSH_NPC_PRESET_POWERS || [])
    ];

    const catalogPower = allCatalogPowers.find(cp => 
      (powerData.code && (cp.id === powerData.code || cp.code === powerData.code)) ||
      (powerData.id && (cp.id === powerData.id || cp.code === powerData.id)) ||
      (powerData.catalogId && (cp.id === powerData.catalogId || cp.code === powerData.catalogId)) ||
      (powerData.name && cp.name.toLowerCase() === powerData.name.toLowerCase()) ||
      (powerData.name && cp.name.toLowerCase().startsWith(powerData.name.toLowerCase()))
    );

    const isStarred = !!(powerData.isStarred || (catalogPower && (catalogPower.isStarred || catalogPower.countsAsTwo)));
    const isExceptional = !!(powerData.isExceptional || isStarred);
    const powerSlots = isStarred ? 2 : (powerData.powerSlots || (catalogPower ? catalogPower.powerSlots : 1));

    const rankName = powerData.rankName || powerData.rank || (catalogPower ? catalogPower.defaultRank : 'Good');
    const rankObj = UniversalTableEngine.getRankByName(rankName);
    const rankVal = powerData.rankValue ?? powerData.rankNum ?? (rankObj ? rankObj.num : 10);

    let pool = powerData.pool || (catalogPower && catalogPower.pool ? JSON.parse(JSON.stringify(catalogPower.pool)) : null);
    if (pool) {
      pool.max = evalPoolMax(pool, rankVal);
      pool.current = Math.min(Math.max(0, parseInt(pool.current ?? 0)), pool.max);
    }

    const trigger = powerData.trigger || (catalogPower && catalogPower.trigger ? JSON.parse(JSON.stringify(catalogPower.trigger)) : null);
    const traitModifiers = Array.isArray(powerData.traitModifiers)
      ? [...powerData.traitModifiers]
      : (catalogPower && catalogPower.traitModifiers ? JSON.parse(JSON.stringify(catalogPower.traitModifiers)) : []);

    const newPower = {
      id: powerData.id || 'p_' + Date.now() + Math.random().toString(36).substr(2, 4),
      code: powerData.code || (catalogPower ? catalogPower.code : null),
      name: powerData.name || (catalogPower ? catalogPower.name : 'Unnamed Power'),
      category: powerData.category || (catalogPower ? catalogPower.category : 'Special'),
      rankName: rankName,
      rankValue: rankVal,
      powerSlots: powerSlots,
      isStarred: isStarred,
      isExceptional: isExceptional,
      isNpcArchetype: !!(powerData.isNpcArchetype || (catalogPower && catalogPower.isNpcArchetype)),
      isCustom: !!powerData.isCustom,
      templateKey: powerData.templateKey || (catalogPower ? catalogPower.code : null),
      source: powerData.source || (catalogPower ? catalogPower.source : 'UPB'),
      range: powerData.range !== undefined ? powerData.range : (catalogPower ? catalogPower.range : null),
      duration: powerData.duration !== undefined ? powerData.duration : (catalogPower ? catalogPower.duration : null),
      areaOfEffect: powerData.areaOfEffect !== undefined ? powerData.areaOfEffect : (catalogPower ? catalogPower.areaOfEffect : null),
      targets: powerData.targets !== undefined ? powerData.targets : (catalogPower ? catalogPower.targets : null),
      speed: powerData.speed !== undefined ? powerData.speed : (catalogPower ? catalogPower.speed : null),
      pool: pool,
      trigger: trigger,
      traitModifiers: traitModifiers,
      adjustments: powerData.adjustments || null,
      selectedOption: powerData.selectedOption || null,
      optionSubChoice: powerData.optionSubChoice || null,
      optionAcquisitionMethod: powerData.optionAcquisitionMethod || 'chosen',
      optionSurcharge: powerData.optionSurcharge !== undefined ? parseInt(powerData.optionSurcharge) : 0,
      isSuperiorOption: !!powerData.isSuperiorOption,
      operationalType: powerData.operationalType || resolvePowerOperationalType(powerData, catalogPower),
      isSwitchedOn: powerData.isSwitchedOn !== undefined ? !!powerData.isSwitchedOn : true,
      isDisabled: powerData.isDisabled !== undefined ? !!powerData.isDisabled : false,
      triggerConfig: powerData.triggerConfig ? JSON.parse(JSON.stringify(powerData.triggerConfig)) : {
        mode: 'default',
        masterPowerId: null,
        masterPowerName: null,
        invert: false,
        conditionLabel: ''
      },
      notes: powerData.notes || '',
      stunts: Array.isArray(powerData.stunts)
        ? powerData.stunts.map(s => normalizePowerStunt(s, s.isLearned !== undefined ? !!s.isLearned : true))
        : (catalogPower && Array.isArray(catalogPower.powerStunts) ? catalogPower.powerStunts.map(s => normalizePowerStunt(s, true)) : [])
    };

    this.powers.push(newPower);
    if (this.calculateDefenses) this.calculateDefenses();
    return newPower;
  }

  setPowerRank(powerId, newRankName) {
    if (!Array.isArray(this.powers)) return null;
    const power = typeof powerId === 'number' ? this.powers[powerId] : this.powers.find(p => p.id === powerId);
    if (!power) return null;

    const rankObj = (typeof UniversalTableEngine !== 'undefined')
      ? UniversalTableEngine.getRankByName(newRankName)
      : null;
    if (!rankObj) return null;

    const oldRankName = power.rankName;
    const oldRankValue = power.rankValue;

    power.rankName = rankObj.name;
    power.rankValue = rankObj.num;

    // Rescale pool max if power has an active pool based on rank
    if (power.pool) {
      power.pool.max = evalPoolMax(power.pool, rankObj.num);
      power.pool.current = Math.min(power.pool.current || 0, power.pool.max);
    }

    // Reset adjustments if rank changes to avoid out-of-sync stat shifts
    if (power.adjustments) {
      power.adjustments = null;
    }

    if (this.calculateDefenses) this.calculateDefenses();
    if (this.calculateMaxHealth) this.calculateMaxHealth();

    return {
      power,
      oldRankName,
      oldRankValue,
      newRankName: rankObj.name,
      newRankValue: rankObj.num
    };
  }

  setPowerPoolCharge(powerId, chargeAmount) {
    if (!Array.isArray(this.powers)) return null;
    const power = this.powers.find(p => p.id === powerId);
    if (!power || !power.pool) return null;

    const maxVal = power.pool.max ?? 100;
    const target = Math.max(0, Math.min(parseInt(chargeAmount) || 0, maxVal));
    power.pool.current = target;

    if (this.calculateDefenses) this.calculateDefenses();
    return target;
  }

  getPowerDerivedEffects(power) {
    if (!power || !power.pool) return 'No active pool';
    const cur = power.pool.current || 0;
    const effects = [];

    if (power.trigger && power.trigger.action === 'buffer_health') {
      effects.push(`Buffer: +${cur} Health`);
    }

    if (Array.isArray(power.traitModifiers) && power.traitModifiers.length > 0) {
      power.traitModifiers.forEach(m => {
        const stats = m.targetStats || (m.targetTrait ? [m.targetTrait] : ['strength']);
        if (m.mode === 'set_to_pool') {
          effects.push(`${stats.join('/')} = Rank ${cur}`);
        } else {
          let perUnits = m.perChargeUnits || 50;
          if (m.thresholdFormula === 'poolMax / 6') {
            perUnits = Math.max(1, Math.round((power.pool.max || 300) / 6));
          } else if (m.thresholdFormula === '1') {
            perUnits = 1;
          }
          const steps = Math.floor(cur / (perUnits || 1));
          const cs = Math.min(steps * (m.csPerThreshold || m.shiftPerStep || 1), m.maxColumnShift || 30);
          if (cs > 0) {
            effects.push(`+${cs}CS to ${stats.join('/')}`);
          }
        }
      });
    }

    return effects.length > 0 ? effects.join(' | ') : 'No active charge benefits';
  }

  removePower(powerId) {
    if (!Array.isArray(this.powers)) return;
    this.powers = this.powers.filter(p => p.id !== powerId);
  }

  isPowerOperating(powerId, visited = new Set()) {
    if (!powerId || !Array.isArray(this.powers)) return false;
    const p = this.powers.find(x => x.id === powerId);
    if (!p) return false;

    // If disabled / neutralized, power is shut down completely
    if (p.isDisabled) return false;

    // Active powers require an action each use, but are available to operate unless disabled
    const opType = p.operationalType || 'passive';
    if (opType === 'active') {
      return true;
    }

    // Passive powers check triggers or switch state
    const cfg = p.triggerConfig || {};
    if (cfg.mode === 'linked' && cfg.masterPowerId) {
      if (visited.has(powerId)) {
        return !!p.isSwitchedOn;
      }
      visited.add(powerId);

      const master = this.powers.find(x => x.id === cfg.masterPowerId);
      if (!master) {
        return !!p.isSwitchedOn;
      }

      const masterOperating = this.isPowerOperating(master.id, visited);
      return cfg.invert ? !masterOperating : masterOperating;
    }

    return p.isSwitchedOn !== undefined ? !!p.isSwitchedOn : true;
  }

  togglePowerSwitch(powerId, forceState = null) {
    if (!Array.isArray(this.powers)) return null;
    const p = this.powers.find(x => x.id === powerId);
    if (!p) return null;

    const oldState = !!p.isSwitchedOn;
    const newState = forceState !== null ? !!forceState : !oldState;
    p.isSwitchedOn = newState;

    if (this.calculateDefenses) this.calculateDefenses();
    return {
      power: p,
      isSwitchedOn: p.isSwitchedOn,
      isOperating: this.isPowerOperating(powerId)
    };
  }

  setPowerDisabled(powerId, isDisabled) {
    if (!Array.isArray(this.powers)) return null;
    const p = this.powers.find(x => x.id === powerId);
    if (!p) return null;

    p.isDisabled = !!isDisabled;

    if (this.calculateDefenses) this.calculateDefenses();
    return {
      power: p,
      isDisabled: p.isDisabled,
      isOperating: this.isPowerOperating(powerId)
    };
  }

  getLinkedPowers(masterPowerId) {
    if (!masterPowerId || !Array.isArray(this.powers)) return [];
    return this.powers.filter(p => p.triggerConfig && p.triggerConfig.mode === 'linked' && p.triggerConfig.masterPowerId === masterPowerId);
  }

  configurePowerTrigger(powerId, config = {}) {
    if (!Array.isArray(this.powers)) return null;
    const p = this.powers.find(x => x.id === powerId);
    if (!p) return null;

    if (config.operationalType) {
      p.operationalType = config.operationalType;
    }
    if (config.isSwitchedOn !== undefined) {
      p.isSwitchedOn = !!config.isSwitchedOn;
    }
    if (config.isDisabled !== undefined) {
      p.isDisabled = !!config.isDisabled;
    }
    if (!p.triggerConfig) {
      p.triggerConfig = { mode: 'default', masterPowerId: null, masterPowerName: null, invert: false, conditionLabel: '' };
    }

    if (config.mode !== undefined) p.triggerConfig.mode = config.mode;
    if (config.masterPowerId !== undefined) {
      p.triggerConfig.masterPowerId = config.masterPowerId;
      const master = this.powers.find(x => x.id === config.masterPowerId);
      p.triggerConfig.masterPowerName = master ? master.name : null;
    }
    if (config.invert !== undefined) p.triggerConfig.invert = !!config.invert;
    if (config.conditionLabel !== undefined) p.triggerConfig.conditionLabel = (config.conditionLabel || '').trim();

    if (this.calculateDefenses) this.calculateDefenses();
    return p;
  }

  addPowerStunt(powerId, stuntData = {}) {
    const power = this.powers.find(p => p.id === powerId);
    if (!power) return null;
    if (!Array.isArray(power.stunts)) power.stunts = [];
    const isLearned = stuntData.isLearned !== undefined ? !!stuntData.isLearned : false;
    const redSucc = isLearned ? 1 : Math.max(0, Math.min(1, parseInt(stuntData.redSuccesses || 0)));
    const yellowSucc = isLearned ? 3 : Math.max(0, Math.min(3, parseInt(stuntData.yellowSuccesses || 0)));
    const greenSucc = isLearned ? 6 : Math.max(0, Math.min(6, parseInt(stuntData.greenSuccesses || 0)));

    const stunt = {
      id: stuntData.id || 'stunt_' + Date.now() + Math.random().toString(36).substr(2, 4),
      name: stuntData.name || 'New Power Stunt',
      description: stuntData.description || '',
      emulatedPowerId: stuntData.emulatedPowerId || null,
      emulatedPowerName: stuntData.emulatedPowerName || null,
      isLearned: isLearned || (redSucc >= 1 && yellowSucc >= 3 && greenSucc >= 6),
      redSuccesses: redSucc,
      yellowSuccesses: yellowSucc,
      greenSuccesses: greenSucc,
      attemptsCount: parseInt(stuntData.attemptsCount || (redSucc + yellowSucc + greenSucc))
    };
    power.stunts.push(stunt);
    return stunt;
  }

  removePowerStunt(powerId, stuntId) {
    const power = this.powers.find(p => p.id === powerId);
    if (!power || !Array.isArray(power.stunts)) return false;
    const initialLen = power.stunts.length;
    power.stunts = power.stunts.filter(s => s.id !== stuntId);
    return power.stunts.length < initialLen;
  }

  toggleStuntLearned(powerId, stuntId) {
    const power = this.powers.find(p => p.id === powerId);
    if (!power || !Array.isArray(power.stunts)) return false;
    const stunt = power.stunts.find(s => s.id === stuntId);
    if (!stunt) return false;
    stunt.isLearned = !stunt.isLearned;
    if (stunt.isLearned) {
      stunt.redSuccesses = 1;
      stunt.yellowSuccesses = 3;
      stunt.greenSuccesses = 6;
      stunt.attemptsCount = Math.max(10, stunt.attemptsCount || 0);
    } else {
      stunt.redSuccesses = 0;
      stunt.yellowSuccesses = 0;
      stunt.greenSuccesses = 0;
    }
    return stunt.isLearned;
  }

  getStuntSuccessesNeeded(stunt) {
    if (!stunt) return { neededRed: 0, neededYellow: 0, neededGreen: 0, isMastered: false, text: '' };
    if (stunt.isLearned) return { neededRed: 0, neededYellow: 0, neededGreen: 0, isMastered: true, text: 'Mastered' };
    const redNeeded = Math.max(0, 1 - (parseInt(stunt.redSuccesses) || 0));
    const yellowNeeded = Math.max(0, 3 - (parseInt(stunt.yellowSuccesses) || 0));
    const greenNeeded = Math.max(0, 6 - (parseInt(stunt.greenSuccesses) || 0));
    if (redNeeded === 0 && yellowNeeded === 0 && greenNeeded === 0) {
      stunt.isLearned = true;
      return { neededRed: 0, neededYellow: 0, neededGreen: 0, isMastered: true, text: 'Mastered' };
    }
    const parts = [];
    if (redNeeded > 0) parts.push(`${redNeeded} Red`);
    if (yellowNeeded > 0) parts.push(`${yellowNeeded} Yellow`);
    if (greenNeeded > 0) parts.push(`${greenNeeded} Green`);
    return {
      neededRed: redNeeded,
      neededYellow: yellowNeeded,
      neededGreen: greenNeeded,
      isMastered: false,
      text: parts.join(', ') + ' needed'
    };
  }

  recordStuntSuccess(powerId, stuntId, color) {
    const power = this.powers.find(p => p.id === powerId);
    if (!power || !Array.isArray(power.stunts)) return null;
    const stunt = power.stunts.find(s => s.id === stuntId);
    if (!stunt || stunt.isLearned) return null;

    let advanced = false;
    let earnedType = null;
    const c = (color || '').toLowerCase();

    if ((stunt.redSuccesses || 0) < 1) {
      if (c === 'red') {
        stunt.redSuccesses = 1;
        stunt.attemptsCount = (stunt.attemptsCount || 0) + 1;
        advanced = true;
        earnedType = 'Red';
      }
    } else if ((stunt.yellowSuccesses || 0) < 3) {
      if (c === 'yellow' || c === 'red') {
        stunt.yellowSuccesses = (stunt.yellowSuccesses || 0) + 1;
        stunt.attemptsCount = (stunt.attemptsCount || 0) + 1;
        advanced = true;
        earnedType = c === 'red' ? 'Red (as Yellow)' : 'Yellow';
      }
    } else if ((stunt.greenSuccesses || 0) < 6) {
      if (c === 'green' || c === 'yellow' || c === 'red') {
        stunt.greenSuccesses = (stunt.greenSuccesses || 0) + 1;
        stunt.attemptsCount = (stunt.attemptsCount || 0) + 1;
        advanced = true;
        earnedType = c === 'red' ? 'Red (as Green)' : (c === 'yellow' ? 'Yellow (as Green)' : 'Green');
      }
    }

    if ((stunt.redSuccesses || 0) >= 1 && (stunt.yellowSuccesses || 0) >= 3 && (stunt.greenSuccesses || 0) >= 6) {
      stunt.isLearned = true;
    }
    return { stunt, advanced, earnedType, isLearned: stunt.isLearned };
  }

  learnStuntWithKarma(powerId, stuntId, karmaCost = 1000) {
    const power = this.powers.find(p => p.id === powerId);
    if (!power || !Array.isArray(power.stunts)) return { success: false, error: 'Power or stunt not found' };
    const stunt = power.stunts.find(s => s.id === stuntId);
    if (!stunt) return { success: false, error: 'Stunt not found' };
    if (stunt.isLearned) return { success: false, error: 'Stunt is already mastered' };

    if (this.currentKarma < karmaCost) {
      return { success: false, error: `Inadequate Karma: ${this.currentKarma}/${karmaCost} KP`, currentKarma: this.currentKarma, karmaCost };
    }

    this.updateKarma(-karmaCost, `Guaranteed Stunt Mastery: ${stunt.name} (${power.name})`);
    stunt.isLearned = true;
    stunt.redSuccesses = 1;
    stunt.yellowSuccesses = 3;
    stunt.greenSuccesses = 6;
    stunt.attemptsCount = Math.max(10, stunt.attemptsCount || 0);

    return { success: true, stunt };
  }

  /**
   * CMF POINT-BUY CALCULATION ENGINE
   * Evaluates point costs for Abilities, Powers, Talents, Contacts, and Resources.
   * - Abilities: point-for-point by rank number (e.g. Rm 30 = 30 CP).
   * - Powers: 10 CP base cost + rank value (exceptional powers 20 CP base + 2x rank).
   * - Talents: 15 CP each.
   * - Contacts: 5 CP each.
   * - Resources: point-for-point by rank number.
   */
  calculateSpentPoints() {
    let abilitiesTotal = 0;
    const abs = this.abilities;
    ['fighting', 'agility', 'strength', 'endurance', 'reason', 'intuition', 'psyche'].forEach(k => {
      abilitiesTotal += (abs[k]?.rankValue || 0);
    });

    let powersTotal = 0;
    this.powers.forEach(p => {
      const isExp = !!(p.isExceptional || p.isStarred);
      const baseCost = isExp ? 20 : 10;
      const rankMultiplier = isExp ? 2 : 1;
      const surcharge = (p.optionSurcharge !== undefined) ? parseInt(p.optionSurcharge || 0) : 0;
      powersTotal += baseCost + (p.rankValue * rankMultiplier) + surcharge;
    });

    const talentsTotal = this.talents.reduce((sum, t) => sum + (t.costCP !== undefined ? t.costCP : (t.isStarred ? 20 : 10)), 0);
    const contactsTotal = this.contacts.length * 5;
    const resourcesTotal = this.resources.rankValue || 0;

    const totalSpent = abilitiesTotal + powersTotal + talentsTotal + contactsTotal + resourcesTotal;
    const remaining = this.pointBudget - totalSpent;

    return {
      budget: this.pointBudget,
      tier: this.pointTier,
      totalSpent,
      remaining,
      breakdown: {
        abilities: abilitiesTotal,
        powers: powersTotal,
        talents: talentsTotal,
        contacts: contactsTotal,
        resources: resourcesTotal
      }
    };
  }

  /**
   * Calculates total power slots allocated across all active powers.
   * Starred powers count as 2 slots each.
   */
  getTotalPowerSlots() {
    return this.powers.reduce((sum, p) => sum + (p.powerSlots || (p.isStarred ? 2 : 1)), 0);
  }

  /**
   * Calculates total talent slots allocated across all active talents.
   * Starred talents count as 2 slots each.
   */
  getTotalTalentSlots() {
    return this.talents.reduce((sum, t) => sum + (t.slots || (t.isStarred ? 2 : 1)), 0);
  }

  /**
   * Returns the effective ability rank and number, factoring in equipped
   * equipment and inventions with ability boosts.
   */
  getEffectiveAbility(abilityKey) {
    const key = (abilityKey || '').toLowerCase();
    const active = this.getActiveAbilities();
    const base = this.abilities ? this.abilities[key] : null;
    if (!base) return null;
    let rankName = active[key] ? active[key].rankName : base.rankName;
    let rankValue = active[key] ? active[key].rankValue : base.rankValue;

    (this.equipment || []).filter(e => e.equipped && Array.isArray(e.abilityBoosts)).forEach(e => {
      e.abilityBoosts.forEach(b => {
        if (b.ability && b.ability.toLowerCase() === key) {
          if (b.mode === 'set' && b.rankName) {
            const bRank = UniversalTableEngine.getRankByName(b.rankName);
            if (bRank && bRank.num > rankValue) {
              rankName = bRank.name;
              rankValue = bRank.num;
            }
          } else if (b.mode === 'bonus' && b.cs) {
            const shifted = UniversalTableEngine.applyColumnShift(rankName, b.cs);
            rankName = shifted.name;
            rankValue = shifted.num;
          }
        }
      });
    });

    return {
      rankName,
      rankValue,
      isBoosted: rankValue > base.rankValue,
      baseRankName: base.rankName,
      baseRankValue: base.rankValue
    };
  }

  setPointTier(tier, customBudget = null) {
    this.pointTier = String(tier);
    switch (String(tier).toLowerCase()) {
      case '150':
      case 'tier_150':
      case 'skilled_human':
        this.pointBudget = 150;
        break;
      case '200':
      case 'tier_200':
      case 'street_vigilante':
      case 'street':
        this.pointBudget = 200;
        break;
      case '300':
      case 'tier_300':
      case 'costumed_adventurer':
        this.pointBudget = 300;
        break;
      case '400':
      case 'tier_400':
      case 'established_hero':
      case 'standard':
        this.pointBudget = 400;
        break;
      case '500':
      case 'tier_500':
      case 'major_superhero':
      case 'high_powered':
        this.pointBudget = 500;
        break;
      case '600':
      case 'tier_600':
      case 'world_class_hero':
      case 'cosmic':
        this.pointBudget = 600;
        break;
      case 'custom':
        if (customBudget !== null && customBudget !== undefined) {
          this.pointBudget = parseInt(customBudget);
        }
        break;
      default: {
        const parsed = parseInt(tier);
        if (!isNaN(parsed) && parsed > 0) {
          this.pointBudget = parsed;
        } else {
          this.pointBudget = 400;
        }
      }
    }
  }

  setAbilityRank(abilityKey, rankName) {
    const key = abilityKey.toLowerCase();
    if (!this.abilities[key]) return;
    const r = UniversalTableEngine.getRankByName(rankName);
    this.abilities[key].rankName = r.name;
    this.abilities[key].rankValue = r.num;
    this.currentHealth = this.calculateMaxHealth();
    this.currentKarma = this.calculateBaseKarma();
  }

  setResourceRank(rankName) {
    const r = UniversalTableEngine.getRankByName(rankName);
    const hasHeir = (this.talents || []).some(t => 
      t.id === 't_other_heir' || t.talentId === 't_other_heir' || (t.name && t.name.toLowerCase().includes('heir to fortune'))
    );
    if (hasHeir && r.num < 30) {
      const remRank = UniversalTableEngine.getRankByName('Remarkable');
      this.resources.rankName = remRank.name;
      this.resources.rankValue = remRank.num;
      return;
    }
    this.resources.rankName = r.name;
    this.resources.rankValue = r.num;
  }

  /**
   * Adds a talent to the character with validation for duplicates and specializations.
   * Also enforces Heir to Fortune minimum Resources (Remarkable 30).
   */
  addTalent(talentData) {
    if (!talentData) return { success: false, error: 'No talent data provided.' };

    const talentId = talentData.talentId || talentData.id;
    const catTalent = (globalThis.MSH_TALENTS || []).find(ct => 
      (talentId && ct.id === talentId) ||
      (talentData.name && ct.name.toLowerCase() === talentData.name.toLowerCase())
    ) || (globalThis.TALENTS_BY_ID && talentId && globalThis.TALENTS_BY_ID[talentId]) || null;

    const baseName = talentData.name || (catTalent ? catTalent.name : 'Unnamed Talent');
    const isStarred = !!(talentData.isStarred || (catTalent && catTalent.isStarred));
    const slots = talentData.slots || (catTalent && catTalent.slots) || (isStarred ? 2 : 1);
    const costCP = talentData.costCP !== undefined ? talentData.costCP : ((catTalent && catTalent.costCP !== undefined) ? catTalent.costCP : (isStarred ? 20 : 10));
    const allowsSpecialization = !!(talentData.allowsSpecialization || (catTalent && catTalent.allowsSpecialization));
    const specPlaceholder = talentData.specPlaceholder || (catTalent && catTalent.specPlaceholder) || '';
    const minResourcesRank = talentData.minResourcesRank || (catTalent && catTalent.minResourcesRank) || null;
    const minResourcesRankValue = talentData.minResourcesRankValue !== undefined ? talentData.minResourcesRankValue : (catTalent ? catTalent.minResourcesRankValue : null);
    const specialization = (talentData.specialization || '').trim();

    if (allowsSpecialization && !specialization) {
      return { 
        success: false, 
        error: `Please specify a specialization for "${baseName}" (e.g. ${specPlaceholder || 'specific specialty'}).` 
      };
    }

    // Check duplicate rules
    const existing = this.talents.filter(t => 
      (talentId && (t.talentId === talentId || t.id === talentId)) ||
      (t.name.toLowerCase() === baseName.toLowerCase())
    );

    if (existing.length > 0) {
      if (!allowsSpecialization) {
        return { 
          success: false, 
          error: `Talent "${baseName}" is already learned. Duplicate talents are not permitted unless the talent allows different specializations.` 
        };
      }
      // Allows specialization: check if identical specialization already exists
      const duplicateSpec = existing.find(t => (t.specialization || '').toLowerCase() === specialization.toLowerCase());
      if (duplicateSpec) {
        return { 
          success: false, 
          error: specialization 
            ? `You already have ${baseName} with specialization "${specialization}". Each instance must have a different specialization.` 
            : `You already have ${baseName} with an unspecified specialization. Please specify a unique specialization.` 
        };
      }
    }

    let priorResources = null;
    // Heir to Fortune minimum Resources check
    const isHeir = talentId === 't_other_heir' || baseName.toLowerCase().includes('heir to fortune');
    if (isHeir) {
      const currentResVal = this.resources?.rankValue || 0;
      if (currentResVal < 30) {
        priorResources = {
          rankName: this.resources.rankName,
          rankValue: this.resources.rankValue
        };
        const remRank = UniversalTableEngine.getRankByName('Remarkable');
        this.resources.rankName = remRank.name;
        this.resources.rankValue = remRank.num;
      }
    }

    const newTalent = {
      id: talentData.id || 't_' + Date.now() + Math.random().toString(36).substr(2, 4),
      talentId: talentId || (catTalent ? catTalent.id : null),
      name: baseName,
      displayName: specialization ? `${baseName} (${specialization})` : baseName,
      category: talentData.category || (catTalent ? (catTalent.group || catTalent.category) : 'General'),
      description: talentData.description || (catTalent ? catTalent.description : ''),
      statAffected: talentData.statAffected || (catTalent ? catTalent.statAffected : ''),
      csBonus: talentData.csBonus !== undefined ? talentData.csBonus : (catTalent ? (catTalent.bonus || catTalent.csBonus) : null),
      isStarred: isStarred,
      slots: slots,
      costCP: costCP,
      allowsSpecialization: allowsSpecialization,
      specialization: specialization,
      specPlaceholder: specPlaceholder,
      minResourcesRank: minResourcesRank,
      minResourcesRankValue: minResourcesRankValue,
      priorResources: priorResources
    };

    this.talents.push(newTalent);
    return { success: true, talent: newTalent, elevatedResources: !!priorResources };
  }

  /**
   * Removes a talent by index and restores Resources if Heir to Fortune elevated them.
   */
  removeTalent(index) {
    if (index < 0 || index >= this.talents.length) return { success: false, error: 'Invalid talent index.' };
    const removed = this.talents[index];
    this.talents.splice(index, 1);

    let restoredResources = null;
    if (removed.priorResources) {
      const hasOtherHeir = this.talents.some(t => 
        t.talentId === 't_other_heir' || t.id === 't_other_heir' || t.name.toLowerCase().includes('heir to fortune')
      );
      if (!hasOtherHeir) {
        restoredResources = { ...removed.priorResources };
        this.resources.rankName = removed.priorResources.rankName;
        this.resources.rankValue = removed.priorResources.rankValue;
      }
    }

    return { success: true, removed, restoredResources };
  }

  /**
   * Updates specialization for an existing talent at index.
   */
  updateTalentSpecialization(index, newSpec) {
    if (index < 0 || index >= this.talents.length) return { success: false, error: 'Invalid talent index.' };
    const t = this.talents[index];
    const cleanSpec = (newSpec || '').trim();

    if (t.allowsSpecialization && !cleanSpec) {
      return { 
        success: false, 
        error: `A specialization is required for "${t.name}" (e.g. ${t.specPlaceholder || 'specific specialty'}).` 
      };
    }

    // Check if another instance of same talent already has this specialization
    const duplicate = this.talents.find((other, oIdx) => 
      oIdx !== index &&
      (other.talentId === t.talentId || other.name.toLowerCase() === t.name.toLowerCase()) &&
      (other.specialization || '').toLowerCase() === cleanSpec.toLowerCase()
    );
    if (duplicate) {
      return { 
        success: false, 
        error: cleanSpec 
          ? `Another "${t.name}" talent already has the specialization "${cleanSpec}".` 
          : `Another "${t.name}" talent has an empty specialization.`
      };
    }

    t.specialization = cleanSpec;
    t.displayName = cleanSpec ? `${t.name} (${cleanSpec})` : t.name;
    return { success: true, talent: t };
  }


  /**
   * Calculates Advancement Cost and Required Training Time.
   * Standard MSH / CMF: cost = 10 * (New Rank Number - Old Rank Number).
   * USER SPECIFICATION: Training time = ranks added in days.
   */
  calculateAdvancement(category, currentRankName, targetRankName) {
    const curRank = UniversalTableEngine.getRankByName(currentRankName);
    const tgtRank = UniversalTableEngine.getRankByName(targetRankName);

    const curIdx = UniversalTableEngine.getRankIndex(curRank.name);
    const tgtIdx = UniversalTableEngine.getRankIndex(tgtRank.name);

    if (tgtIdx <= curIdx) {
      return { valid: false, error: 'Target rank must be higher than current rank.' };
    }

    const rankBandsAdded = tgtIdx - curIdx;
    const rankNumDiff = tgtRank.num - curRank.num;

    let karmaCost = rankNumDiff * 10;
    if (category === 'power') {
      karmaCost = rankNumDiff * 20;
    } else if (category === 'talent') {
      karmaCost = 1000;
    }

    const trainingDays = rankBandsAdded;

    return {
      valid: true,
      category,
      currentRank: curRank.name,
      currentNum: curRank.num,
      targetRank: tgtRank.name,
      targetNum: tgtRank.num,
      rankBandsAdded,
      trainingDays,
      karmaCost
    };
  }

  applyAdvancement(category, identifier, targetRankName, customNotes = '', bypassKarmaCost = false) {
    let currentRankName = 'Typical';
    if (category === 'ability') {
      const key = identifier.toLowerCase();
      if (!this.abilities[key]) return { success: false, error: `Invalid ability: ${identifier}` };
      currentRankName = this.abilities[key].rankName;
    } else if (category === 'power') {
      const power = this.powers.find(p => p.id === identifier || p.name.toLowerCase() === identifier.toLowerCase());
      if (!power) return { success: false, error: `Power not found: ${identifier}` };
      currentRankName = power.rankName;
    } else if (category === 'resources') {
      currentRankName = this.resources.rankName;
    }

    const calc = this.calculateAdvancement(category, currentRankName, targetRankName);
    if (!calc.valid) return { success: false, error: calc.error };

    if (!bypassKarmaCost) {
      if (this.currentKarma < calc.karmaCost) {
        return {
          success: false,
          error: `Insufficient Karma. Need ${calc.karmaCost} Karma, but only have ${this.currentKarma}.`
        };
      }
      this.currentKarma -= calc.karmaCost;
    }

    const newRank = UniversalTableEngine.getRankByName(targetRankName);
    if (category === 'ability') {
      const key = identifier.toLowerCase();
      this.abilities[key].rankName = newRank.name;
      this.abilities[key].rankValue = newRank.num;
    } else if (category === 'power') {
      const power = this.powers.find(p => p.id === identifier || p.name.toLowerCase() === identifier.toLowerCase());
      power.rankName = newRank.name;
      power.rankValue = newRank.num;
    } else if (category === 'resources') {
      this.resources.rankName = newRank.name;
      this.resources.rankValue = newRank.num;
    }

    this.lastKarmaSpentOnRankIncrease = {
      amount: calc.karmaCost,
      category: category,
      target: identifier,
      from: calc.currentRank,
      to: calc.targetRank,
      trainingDays: calc.trainingDays
    };

    this.advancementLog.unshift({
      date: new Date().toLocaleDateString(),
      type: 'advancement',
      category: category,
      target: identifier,
      from: calc.currentRank,
      to: calc.targetRank,
      trainingDays: calc.trainingDays,
      amount: bypassKarmaCost ? 0 : -calc.karmaCost,
      reason: `Advanced ${identifier} from ${calc.currentRank} to ${calc.targetRank} (${calc.trainingDays} day${calc.trainingDays > 1 ? 's' : ''} training). ${customNotes}${bypassKarmaCost ? ' [Test Mode]' : ''}`.trim(),
      balance: this.currentKarma
    });

    return { success: true, calc };
  }

  /**
   * Dynamic Attack Compiler:
   * Generates actionable attack chips (Roll20-style) complete with
   * base abilities, talent column shifts, damage numbers, and Universal Table action types.
   */
  compileAttacks() {
    const attacks = [];
    const abs = this.getActiveAbilities();

    const hasTalent = (namePattern) => {
      const pat = namePattern.toLowerCase();
      return this.talents.some(t => t.name.toLowerCase().includes(pat));
    };

    const hasMartialA = hasTalent('martial arts a');
    const hasMartialB = hasTalent('martial arts b');
    const hasMartialC = hasTalent('martial arts c');
    const hasMartialD = hasTalent('martial arts d');
    const hasBoxing = hasTalent('boxing');
    const hasWrestling = hasTalent('wrestling');
    const hasAcrobatics = hasTalent('acrobatics');
    const hasMarksmanship = hasTalent('marksmanship') || hasTalent('guns');
    const weaponSpecs = this.talents.filter(t => t.name.toLowerCase().includes('weapon specialist'));

    const hasEscapeArtist = hasTalent('escape artist');
    const hasThrownObjects = hasTalent('thrown') || hasTalent('thrown objects') || hasTalent('throwing');
    const hasShield = hasTalent('shield');

    // 1. Unarmed Strike / Slugfest
    let unarmedCS = 0;
    let unarmedNotes = [];
    if (hasMartialB || hasBoxing) {
      unarmedCS += 1;
      unarmedNotes.push('+1CS Fighting (Martial Arts B / Boxing)');
    }
    if (hasMartialA) {
      unarmedNotes.push('Can Stun/Slam higher Strength targets without penalty');
    }
    if (hasMartialD) {
      unarmedNotes.push('+2CS to damage or Called Shot (Martial Arts D)');
    }

    attacks.push({
      id: 'atk_slugfest',
      name: 'Unarmed Strike / Punch',
      category: 'Melee',
      actionType: 'slugfest',
      abilityName: 'Fighting',
      baseRank: abs.fighting.rankName,
      columnShift: unarmedCS,
      damage: `${abs.strength.rankValue} Blunt (Str: ${abs.strength.rankName})`,
      damageValue: abs.strength.rankValue,
      range: 'Touch',
      notes: unarmedNotes.join('; ') || 'Standard slugfest attack. Yellow = Slam, Red = Stun.'
    });

    // 2. Grappling / Hold
    let grappleCS = 0;
    let grappleNotes = [];
    if (hasWrestling) {
      grappleCS += 1;
      grappleNotes.push('+1CS Wrestling');
    }
    if (hasMartialC) {
      grappleCS += 1;
      grappleNotes.push('+1CS Martial Arts C');
    }

    attacks.push({
      id: 'atk_grapple',
      name: 'Grapple / Hold',
      category: 'Melee',
      actionType: 'grapple',
      abilityName: 'Strength',
      baseRank: abs.strength.rankName,
      columnShift: grappleCS,
      damage: 'Hold / Pin / Continuous Str Damage',
      damageValue: abs.strength.rankValue,
      range: 'Touch',
      notes: grappleNotes.join('; ') || 'Hold opponent or pin. Target can only act at -2CS on Green, pinned on Yellow.'
    });

    // 3. Escaping from Hold / Pin
    let escapeAbility = abs.strength.rankValue >= abs.agility.rankValue ? 'Strength' : 'Agility';
    let escapeCS = 0;
    let escapeNotes = [];
    if (hasEscapeArtist) {
      escapeCS += 1;
      escapeNotes.push('+1CS Escape Artist');
    }
    if (escapeAbility === 'Strength' && hasWrestling) {
      escapeCS += 1;
      escapeNotes.push('+1CS Wrestling');
    } else if (escapeAbility === 'Agility' && hasAcrobatics) {
      escapeCS += 1;
      escapeNotes.push('+1CS Acrobatics');
    }

    attacks.push({
      id: 'atk_escape',
      name: 'Escape Hold / Pin',
      category: 'Tactical',
      actionType: 'escape',
      abilityName: escapeAbility,
      baseRank: abs[escapeAbility.toLowerCase()]?.rankName || 'Typical',
      columnShift: escapeCS,
      damage: 'Break Free',
      damageValue: 0,
      range: 'Touch',
      notes: escapeNotes.join('; ') || 'FEAT vs holding opponent\'s Strength rank. Green = Break Free, Red = Reversal hold!'
    });

    // 4. Charging Attack
    attacks.push({
      id: 'atk_charging',
      name: 'Charge / Tackle',
      category: 'Melee',
      actionType: 'charging',
      abilityName: 'Endurance',
      baseRank: abs.endurance.rankName,
      columnShift: 0,
      damage: `${abs.strength.rankValue} + Speed CS Blunt`,
      damageValue: abs.strength.rankValue,
      range: '1-3 areas',
      notes: 'Requires 2+ areas movement in a straight line. Green = Hit, Yellow = Slam, Red = Grand Slam & Stun.'
    });

    // 5. Throwing Objects / Improvised Missiles
    let throwCS = 0;
    let throwNotes = [];
    if (hasThrownObjects) {
      throwCS += 1;
      throwNotes.push('+1CS Thrown Objects');
    }
    if (hasMarksmanship) {
      throwCS += 1;
      throwNotes.push('+1CS Marksmanship');
    }

    attacks.push({
      id: 'atk_throwing',
      name: 'Throw Object / Missile',
      category: 'Ranged',
      actionType: 'blunt',
      abilityName: 'Agility',
      baseRank: abs.agility.rankName,
      columnShift: throwCS,
      damage: `${abs.strength.rankValue} Blunt (Str: ${abs.strength.rankName})`,
      damageValue: abs.strength.rankValue,
      range: '1-3 areas',
      notes: throwNotes.join('; ') || 'Agility FEAT to hit. Thrown object damage based on hero Strength or item material.'
    });

    // 6. Catching / Interception (Defensive)
    let catchCS = 0;
    let catchNotes = [];
    if (hasAcrobatics) {
      catchCS += 1;
      catchNotes.push('+1CS Acrobatics');
    }

    attacks.push({
      id: 'atk_catching',
      name: 'Catch Falling / Thrown Item',
      category: 'Defense',
      actionType: 'catch',
      abilityName: 'Agility',
      baseRank: abs.agility.rankName,
      columnShift: catchCS,
      damage: 'Catch / Cushion',
      damageValue: 0,
      range: 'Touch / 1 area',
      notes: catchNotes.join('; ') || 'Agility FEAT to catch falling ally or intercept missile. Green = Caught safely.'
    });

    // 7. Dodging (Defensive Action)
    let dodgeCS = 0;
    let dodgeNotes = [];
    if (hasAcrobatics) {
      dodgeCS += 1;
      dodgeNotes.push('+1CS Acrobatics');
    }
    attacks.push({
      id: 'atk_dodge',
      name: 'Dodge (Agility FEAT)',
      category: 'Defense',
      actionType: 'dodge',
      abilityName: 'Agility',
      baseRank: abs.agility.rankName,
      columnShift: dodgeCS,
      damage: 'Defensive Shift',
      damageValue: 0,
      range: 'Self',
      notes: dodgeNotes.join('; ') || '1991 Rules: White = 0CS, Green = -2CS to attacker, Yellow = -4CS, Red = -6CS.'
    });

    // 8. Evading (Melee Defense)
    let evadeCS = 0;
    let evadeNotes = [];
    if (hasMartialC) {
      evadeCS += 1;
      evadeNotes.push('+1CS Martial Arts C');
    }
    attacks.push({
      id: 'atk_evade',
      name: 'Evade (Fighting FEAT)',
      category: 'Defense',
      actionType: 'evade',
      abilityName: 'Fighting',
      baseRank: abs.fighting.rankName,
      columnShift: evadeCS,
      damage: 'Defensive Shift',
      damageValue: 0,
      range: 'Self',
      notes: evadeNotes.join('; ') || 'Melee only. Green = -2CS to attacker, Yellow = -4CS, Red = Attacker misses completely.'
    });

    // 9. Block / Parry
    let blockCS = 0;
    let blockNotes = [];
    if (hasShield) {
      blockCS += 1;
      blockNotes.push('+1CS Shield');
    }
    if (hasMartialB) {
      blockCS += 1;
      blockNotes.push('+1CS Martial Arts B');
    }
    attacks.push({
      id: 'atk_block',
      name: 'Block / Parry',
      category: 'Defense',
      actionType: 'block',
      abilityName: 'Fighting',
      baseRank: abs.fighting.rankName,
      columnShift: blockCS,
      damage: 'Defensive Block',
      damageValue: 0,
      range: 'Touch',
      notes: blockNotes.join('; ') || 'Fighting FEAT to block or parry attacks. Green = Absorbs damage up to material strength.'
    });

    // 10. Equipped Weapons
    this.equipment.filter(eq => eq.equipped).forEach(eq => {
      const typeLow = (eq.type || '').toLowerCase();
      let isMelee = typeLow.includes('melee') || typeLow.includes('blade') || typeLow.includes('blunt') || typeLow.includes('edged');
      let isRanged = typeLow.includes('firearm') || typeLow.includes('ranged') || typeLow.includes('thrown') || typeLow.includes('energy') || typeLow.includes('shooting');
      
      let abilityName = isMelee ? 'Fighting' : 'Agility';
      let actionType = 'slugfest';
      if (typeLow.includes('blade') || typeLow.includes('edged') || typeLow.includes('sword') || typeLow.includes('knife')) {
        actionType = 'edged';
      } else if (typeLow.includes('thrown')) {
        actionType = 'blunt';
      } else if (typeLow.includes('firearm') || typeLow.includes('gun') || typeLow.includes('shooting') || typeLow.includes('bow')) {
        actionType = 'shooting';
      } else if (typeLow.includes('energy')) {
        actionType = 'energy';
      }

      let wpnCS = 0;
      let wpnNotes = [];
      const specMatch = weaponSpecs.find(ws => {
        const spec = (ws.specialization || '').toLowerCase().trim();
        const desc = (ws.description || '').toLowerCase();
        const eqName = eq.name.toLowerCase();
        if (spec && (eqName.includes(spec) || spec.includes(eqName))) return true;
        if (desc && desc.includes(eqName)) return true;
        return false;
      });

      if (specMatch) {
        wpnCS += 2;
        wpnNotes.push(`+2CS Weapon Specialist (${specMatch.specialization || specMatch.name})`);
      } else if (isRanged && hasMarksmanship) {
        wpnCS += 1;
        wpnNotes.push('+1CS Marksmanship/Guns');
      }

      if (eq.notes) wpnNotes.push(eq.notes);

      attacks.push({
        id: 'atk_' + eq.id,
        name: eq.name,
        category: 'Equipment',
        actionType: actionType,
        abilityName: abilityName,
        baseRank: abs[abilityName.toLowerCase()]?.rankName || 'Typical',
        columnShift: wpnCS,
        damage: eq.damage || `${eq.damageValue || 10} Damage`,
        damageValue: eq.damageValue || 10,
        range: eq.range || (isMelee ? 'Touch' : '3 areas'),
        notes: wpnNotes.join('; ') || `Material: ${eq.materialStrength}`
      });
    });

    // 11. Offensive, Defensive, and Special Powers + Power Stunts
    this.powers.forEach(p => {
      const isOperating = this.isPowerOperating(p.id);
      const isDisabled = !!p.isDisabled;
      let statusTag = '';
      if (isDisabled) {
        statusTag = ' [🚫 Neutralized]';
      } else if (!isOperating) {
        statusTag = ' [⚪ Inactive]';
      }

      const pName = p.name.toLowerCase();
      let isOffensive = false;
      let isDefensive = false;
      let actionType = 'energy';
      let abilityName = 'Agility';

      let pRankName = p.rankName;
      let pRankValue = p.rankValue;
      if (p.adjustments) {
        if (p.adjustments.aspectA?.key === 'intensity') {
          pRankName = p.adjustments.aspectA.adjustedRank;
          pRankValue = p.adjustments.aspectA.adjustedRankValue;
        } else if (p.adjustments.aspectB?.key === 'intensity') {
          pRankName = p.adjustments.aspectB.adjustedRank;
          pRankValue = p.adjustments.aspectB.adjustedRankValue;
        }
      }

      let dmgVal = pRankValue;
      let range = `${Math.max(1, Math.round(pRankValue / 10))} areas`;
      if (p.adjustments) {
        if (p.adjustments.aspectA?.key === 'range') {
          range = p.adjustments.aspectA.adjustedFormatted;
        } else if (p.adjustments.aspectB?.key === 'range') {
          range = p.adjustments.aspectB.adjustedFormatted;
        }
      }

      // Natural Weaponry (F3) Option Handling
      if (p.code === 'F3' || pName.includes('natural weaponry')) {
        const opt = p.selectedOption || 'claws';
        let actType = 'edged';
        let ablName = 'Fighting';
        let rng = 'Touch';
        let dmgType = 'Edged';
        let atkName = `${p.name} - Claws/Blades`;
        let optNotes = 'Edged melee strike. Yellow = Stun, Red = Kill.';

        if (opt === 'fangs') {
          actType = 'edged';
          ablName = 'Fighting';
          rng = 'Touch';
          dmgType = 'Piercing';
          atkName = `${p.name} - Fangs/Bite`;
          optNotes = 'Piercing bite strike.';
        } else if (opt === 'horns') {
          actType = 'slugfest';
          ablName = 'Fighting';
          rng = 'Touch';
          dmgType = 'Blunt';
          atkName = `${p.name} - Horns/Bony Crest`;
          optNotes = 'Blunt strike / Horn charge.';
        } else if (opt === 'tail') {
          actType = 'slugfest';
          ablName = 'Fighting';
          rng = 'Touch';
          dmgType = 'Blunt';
          atkName = `${p.name} - Tail/Mace-Fist`;
          optNotes = 'Blunt melee strike.';
        } else if (opt === 'spines') {
          actType = 'shooting';
          ablName = 'Agility';
          rng = `${Math.max(1, Math.round(pRankValue / 10))} areas`;
          dmgType = 'Shooting';
          atkName = `${p.name} - Spines/Quills`;
          optNotes = 'Ejectable ranged spines. To-hit rolled with Agility.';
        }

        attacks.push({
          id: 'atk_p_' + p.id,
          name: `${atkName} (${pRankName})${statusTag}`,
          category: 'Power',
          actionType: actType,
          abilityName: ablName,
          baseRank: pRankName,
          columnShift: 0,
          damage: `${pRankValue} ${dmgType} (${pRankName})`,
          damageValue: pRankValue,
          range: rng,
          isOperating: isOperating,
          isDisabled: isDisabled,
          notes: optNotes + (p.notes ? ` • ${p.notes}` : '')
        });
        return;
      }

      // Reverse-Engineered NPC / Custom Powers with Energy Redirection attacks
      if (p.trigger && (p.trigger.action === 'store_energy' || p.code === 'NPC_EC' || p.code === 'NPC_ST' || p.code === 'NPC_CS')) {
        const currentCharge = (p.pool && typeof p.pool.current === 'number') ? p.pool.current : 0;
        const blastVal = Math.min(currentCharge > 0 ? currentCharge : 0, pRankValue);
        attacks.push({
          id: 'atk_p_' + p.id + '_discharge',
          name: `${p.name} - Discharge Blast${statusTag}`,
          category: 'Power',
          actionType: 'energy',
          abilityName: 'Agility',
          baseRank: abs.agility.rankName,
          columnShift: 0,
          damage: `${blastVal} Energy/Force (Pool: ${currentCharge}/${p.pool?.max || pRankValue})`,
          damageValue: blastVal,
          range: range,
          isOperating: isOperating,
          isDisabled: isDisabled,
          notes: `Discharges stored energy. Deals damage up to current pool charge (max ${pRankValue} at ${pRankName}). Reduces pool by damage dealt.`
        });
      }

      // Hyper-Strength Tactical Surge Action (Option: Surge)
      if ((p.code === 'P20' || pName.includes('hyper-strength')) && p.selectedOption === 'surge') {
        attacks.push({
          id: 'atk_p_' + p.id + '_surge',
          name: `Hyper-Strength Tactical Surge (+1CS)${statusTag}`,
          category: 'Power',
          actionType: 'power',
          abilityName: 'Strength',
          baseRank: abs.strength.rankName,
          columnShift: 1,
          damage: '+1CS Lifting & Damage',
          damageValue: abs.strength.rankValue,
          range: 'Self',
          isOperating: isOperating,
          isDisabled: isDisabled,
          notes: `Temporary surge: grants +1CS Strength for ${pRankValue} turns once per day. Requires Endurance FEAT afterward to prevent 1-turn exhaustion.`
        });
      }

      // Check for specialization rank shift (e.g. Hard Radiation +1CS, Emotion Control +2CS)
      let effectiveAtkRank = pRankName;
      let effectiveAtkVal = pRankValue;
      let specLabel = '';
      if (p.selectedOption === 'specialized' && typeof UniversalTableEngine !== 'undefined') {
        const def = (typeof globalThis.getPowerOptionsDefinition === 'function') ? globalThis.getPowerOptionsDefinition(p) : null;
        const choice = def?.choices?.find(c => c.key === 'specialized');
        if (choice && choice.rankShift) {
          const shiftedObj = UniversalTableEngine.applyColumnShift(pRankName, choice.rankShift);
          effectiveAtkRank = typeof shiftedObj === 'object' ? shiftedObj.name : shiftedObj;
          effectiveAtkVal = typeof shiftedObj === 'object' ? shiftedObj.num : UniversalTableEngine.getRankByName(effectiveAtkRank).num;
          specLabel = ` [Specialized: ${p.optionSubChoice || 'Focused'} +${choice.rankShift}CS]`;
          dmgVal = effectiveAtkVal;
          range = `${Math.max(1, Math.round(effectiveAtkVal / 10))} areas`;
        }
      }

      if (pName.includes('blast') || pName.includes('bolt') || pName.includes('ray') || pName.includes('beam') || pName.includes('generation') || pName.includes('emission') || pName.includes('plasma') || pName.includes('vocalization') || pName.includes('scream') || pName.includes('stomp') || pName.includes('daggers')) {
        isOffensive = true;
        if (pName.includes('vocalization') || pName.includes('scream')) {
          actionType = 'force';
          abilityName = 'Endurance';
          range = `${Math.max(5, Math.round(effectiveAtkVal / 10))} areas`;
        } else if (pName.includes('stomp')) {
          actionType = 'force';
          abilityName = 'Strength';
          range = `${Math.max(1, Math.round(effectiveAtkVal / 25))} areas`;
        } else {
          actionType = (pName.includes('force') || pName.includes('stomp')) ? 'force' : 'energy';
        }
      } else if (pName.includes('claw') || pName.includes('fang') || pName.includes('sting') || pName.includes('blade') || pName.includes('weapon')) {
        isOffensive = true;
        actionType = 'edged';
        abilityName = 'Fighting';
        range = 'Touch';
      } else if (pName.includes('shoot') || pName.includes('missile') || pName.includes('projectile') || pName.includes('entangle') || pName.includes('web')) {
        isOffensive = true;
        actionType = 'shooting';
      } else if (pName.includes('mental blast') || pName.includes('telepath') || pName.includes('mind control') || pName.includes('psionic') || pName.includes('penance') || pName.includes('stare')) {
        isOffensive = true;
        actionType = 'energy';
        abilityName = 'Psyche';
        range = (pName.includes('penance') || pName.includes('stare')) ? 'Touch' : `${Math.max(1, Math.round(effectiveAtkVal / 10))} areas`;
      } else if (pName.includes('rebound') || pName.includes('bouncing')) {
        isOffensive = true;
        actionType = 'slugfest';
        abilityName = 'Agility';
        range = '1-2 areas';
      }

      if (pName.includes('force field') || pName.includes('shield') || pName.includes('reflection') || pName.includes('absorption') || pName.includes('armor') || pName.includes('resistance') || pName.includes('invisibility') || pName.includes('phasing') || pName.includes('immovability') || pName.includes('rebound') || pName.includes('organic steel')) {
        isDefensive = true;
      }

      if (isOffensive) {
        const adjSuffix = p.adjustments ? ` [Adjusted]` : '';
        const adjNote = p.adjustments ? ` [Adjusted: +${p.adjustments.shift} ${p.adjustments.aspectA.label} / -${p.adjustments.shift} ${p.adjustments.aspectB.label}]` : '';
        attacks.push({
          id: 'atk_p_' + p.id,
          name: `${p.name} (${effectiveAtkRank})${specLabel}${adjSuffix}${statusTag}`,
          category: 'Power',
          actionType: actionType,
          abilityName: abilityName,
          baseRank: effectiveAtkRank,
          columnShift: 0,
          damage: `${effectiveAtkVal} (${effectiveAtkRank})`,
          damageValue: dmgVal,
          range: range,
          isOperating: isOperating,
          isDisabled: isDisabled,
          notes: (p.notes || `Power Rank: ${effectiveAtkRank} (${effectiveAtkVal}). Stunts: ${p.stunts?.length || 0}`) + adjNote
        });
      }

      if (isDefensive) {
        attacks.push({
          id: 'atk_p_def_' + p.id,
          name: `${p.name} (${p.rankName})${statusTag}`,
          category: 'Defense',
          actionType: pName.includes('reflection') ? 'reflection' : 'defense',
          abilityName: p.name,
          baseRank: p.rankName,
          columnShift: 0,
          damage: `Absorbs/Protects ${p.rankValue} points`,
          damageValue: p.rankValue,
          range: pName.includes('force field') ? `${Math.max(1, Math.round(p.rankValue / 10))} areas` : 'Self',
          isOperating: isOperating,
          isDisabled: isDisabled,
          notes: p.notes || `Defensive Power: ${p.rankName} (${p.rankValue}). Blocks, absorbs, or deflects incoming attacks.`
        });
      }

      // Compiled Power Stunts
      if (Array.isArray(p.stunts)) {
        p.stunts.forEach(st => {
          const succInfo = this.getStuntSuccessesNeeded(st);
          const needsLabel = st.isLearned ? '' : ` (${succInfo.text})`;
          attacks.push({
            id: 'atk_stunt_' + st.id,
            name: `Stunt: ${st.name}${needsLabel}${statusTag}`,
            category: 'Power Stunt',
            actionType: 'stunt',
            abilityName: p.name,
            baseRank: p.rankName,
            columnShift: 0,
            damage: `Stunt Effect (${p.rankName})`,
            damageValue: p.rankValue,
            range: range,
            isStunt: true,
            stuntId: st.id,
            parentPowerId: p.id,
            parentPowerName: p.name,
            isLearned: !!st.isLearned,
            isOperating: isOperating,
            isDisabled: isDisabled,
            redSuccesses: st.redSuccesses || 0,
            yellowSuccesses: st.yellowSuccesses || 0,
            greenSuccesses: st.greenSuccesses || 0,
            successesText: succInfo.text,
            notes: `[${st.isLearned ? '⭐ Mastered' : '🔄 Learning: ' + succInfo.text + ' (100 KP/attempt)'}] ${st.description || 'Power stunt.'}${st.emulatedPowerName ? ' (Emulates ' + st.emulatedPowerName + ')' : ''}`
          });
        });
      }
    });

    return attacks;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      realName: this.realName,
      formKey: this.formKey,
      formName: this.formName,
      gender: this.gender,
      age: this.age,
      height: this.height,
      weight: this.weight,
      hair: this.hair,
      eyes: this.eyes,
      identity: this.identity,
      groupAffiliation: this.groupAffiliation,
      baseOfOperations: this.baseOfOperations,
      pointTier: this.pointTier,
      pointBudget: this.pointBudget,
      isSwarmForm: this.isSwarmForm,
      activeSwarmProfile: this.activeSwarmProfile,
      abilities: this.abilities,
      individualAbilities: this.individualAbilities,
      resources: this.resources,
      basePopularity: this.basePopularity,
      currentPopularity: this.currentPopularity,
      manualMaxHealth: this.manualMaxHealth,
      currentHealth: this.currentHealth,
      manualMaxKarma: this.manualMaxKarma,
      currentKarma: this.currentKarma,
      conditions: this.conditions,
      defenses: this.defenses,
      powers: this.powers,
      talents: this.talents,
      contacts: this.contacts,
      equipment: this.equipment,
      knownBlueprints: this.knownBlueprints || [],
      advancementLog: this.advancementLog,
      karmicSuccess: this.karmicSuccess,
      lastKarmaSpentOnRoll: this.lastKarmaSpentOnRoll,
      lastKarmaSpentOnRankIncrease: this.lastKarmaSpentOnRankIncrease,
      editLog: this.editLog,
      editHistoryIndex: this.editHistoryIndex,
      notes: this.notes
    };
  }

  getCleanSnapshot() {
    const data = this.toJSON();
    delete data.editLog;
    delete data.editHistoryIndex;
    return JSON.parse(JSON.stringify(data));
  }

  recordEdit(description, category = 'general') {
    if (!description) return null;
    const snapshot = this.getCleanSnapshot();

    // If we've navigated backward in history, truncate forward history
    if (this.editHistoryIndex >= 0 && this.editHistoryIndex < this.editLog.length - 1) {
      this.editLog = this.editLog.slice(0, this.editHistoryIndex + 1);
    }

    const entry = {
      id: 'edit_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      description: description.trim(),
      category: category,
      snapshot: snapshot
    };

    this.editLog.push(entry);

    // Keep up to 50 edits
    if (this.editLog.length > 50) {
      this.editLog.shift();
    }

    this.editHistoryIndex = this.editLog.length - 1;
    return entry;
  }

  canUndo() {
    return this.editHistoryIndex > 0 && this.editLog.length > 1;
  }

  canRedo() {
    return this.editHistoryIndex >= 0 && this.editHistoryIndex < this.editLog.length - 1;
  }

  getPreviousEdit() {
    if (!this.canUndo()) return null;
    return this.editLog[this.editHistoryIndex - 1] || null;
  }

  getNextEdit() {
    if (!this.canRedo()) return null;
    return this.editLog[this.editHistoryIndex + 1] || null;
  }

  undoEdit() {
    if (!this.canUndo()) return null;
    this.editHistoryIndex--;
    const targetEntry = this.editLog[this.editHistoryIndex];
    if (!targetEntry || !targetEntry.snapshot) return null;
    return targetEntry;
  }

  redoEdit() {
    if (!this.canRedo()) return null;
    this.editHistoryIndex++;
    const targetEntry = this.editLog[this.editHistoryIndex];
    if (!targetEntry || !targetEntry.snapshot) return null;
    return targetEntry;
  }

  static fromJSON(data) {
    return new FASERIPCharacter(data);
  }

  static createBlankCharacter(tier = '400') {
    const char = new FASERIPCharacter({
      name: 'New Superhero',
      realName: '',
      formKey: 'mutated_human',
      formName: 'Mutated Human',
      pointTier: tier,
      abilities: {
        fighting: 'Typical', // 6
        agility: 'Typical', // 6
        strength: 'Typical', // 6
        endurance: 'Typical', // 6
        reason: 'Typical', // 6
        intuition: 'Typical', // 6
        psyche: 'Typical' // 6
      },
      resources: 'Typical', // 6
      basePopularity: 10,
      currentPopularity: 10
    });
    char.setPointTier(tier);
    char.currentHealth = char.calculateMaxHealth();
    char.currentKarma = char.calculateBaseKarma();
    char.recordEdit(`Character created: ${char.name} (CMF ${tier} CP)`, 'creation');
    return char;
  }
}

if (typeof globalThis !== 'undefined') {
  globalThis.FASERIPCharacter = FASERIPCharacter;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FASERIPCharacter };
}

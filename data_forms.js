/**
 * Marvel Super Heroes (FASERIP) - Physical Forms & Origins Database
 * Authoritative integration of:
 * - 1986 Advanced Set Player's Book (pp. 5–10)
 * - 1987 Ultimate Powers Book (MA3, pp. 3–16)
 * - Dragon Magazine #122 Column Errata (Table 1: Character Types and Columns, p. 84)
 * - Dragon Magazine #134 S32 Collective Mass (Swarm Form, pp. 89–91)
 */

const PHYSICAL_FORMS = [
  // =========================================================================
  // 1. NORMAL HUMANS
  // =========================================================================
  {
    id: "normal_human",
    name: "Normal Human (Standard)",
    category: "Standard",
    source: "Ultimate Powers Book p. 3",
    description: "A standard baseline human whose body possesses no detectable abnormalities, relying on training, skill, or powers that leave no visible mark (e.g. Hawkeye, Black Widow).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 2,
    powerSlots: { min: 1, max: 5, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    resourcesShift: 1, // UPB p. 3: "Resources are increased +1CS."
    specialRules: "Rolls Primary Abilities on Column 2. Resources are increased +1CS."
  },
  {
    id: "normal_human_tech",
    name: "High Technology (Hi-Tech Wonder)",
    category: "Standard",
    source: "Player's Book p. 5 / UPB p. 3",
    description: "A hero who derives abilities solely through equipment, whether technological or mystical in nature (e.g. Iron Man, Captain Britain, Falcon).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 2, I: 0, P: 0 }, // PB p. 5: "The initial Reason is raised by two ranks."
    columnAssignment: 3, // PB p. 5: "High technology heroes roll on column 3 of the Random Ranks Table."
    powerSlots: { min: 1, max: 5, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    minContacts: 1,
    requiredTalentCategory: "Scientific or Professional",
    resourcesBase: "Good", // PB p. 5: "Initial Resources are set at Good, or optionally rolled."
    resourcesCanChooseFixedGood: true,
    specialRules: "Rolls on Column 3. Initial Reason is raised +2CS. Initial Resources are set at Good (or optionally Typical + roll). Must have at least 1 Contact (employer/organization) and at least 1 Scientific or Professional Talent."
  },
  {
    id: "normal_human_magic_items",
    name: "Normal Human (Magic Items)",
    category: "Standard",
    source: "Player's Book p. 5 / UPB p. 3",
    description: "A baseline mortal wielding enchanted artifacts, talismans, or relics (e.g. Black Knight with the Ebony Blade).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 1 },
    columnAssignment: 2,
    powerSlots: { min: 1, max: 5, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    resourcesShift: 1,
    specialRules: "Powers are bound to mystical artifacts (+1CS Psyche, +1CS Resources). Loss of the item negates the associated magical powers."
  },
  {
    id: "normal_human_magic_wielder",
    name: "Normal Human (Magic Wielder)",
    category: "Standard",
    source: "Realms of Magic / UPB p. 3",
    description: "A human who has studied the occult arts and mastered sorcerous spells through discipline and training (e.g. Doctor Strange, Baron Mordo).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 1 },
    columnAssignment: 2,
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 1,
    contactsBonus: 1,
    resourcesBase: "Typical",
    specialRules: "Gains +1CS Psyche. Powers function as Personal, Universal, and Dimensional Spells."
  },

  // =========================================================================
  // 2. ALTERED HUMANS & INDUCED MUTANTS
  // =========================================================================
  {
    id: "altered_human",
    name: "Altered Human",
    category: "Metahuman",
    source: "Player's Book p. 5",
    description: "Everyday people accidentally or purposefully exposed to weird radiation, secret formulas, or strange training (e.g. Spider-Man, Fantastic Four, Hulk, Daredevil).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    abilityChoice: {
      count: 1,
      shift: 1,
      allowed: ["fighting", "agility", "strength", "endurance", "reason", "intuition", "psyche"],
      label: "+1CS to any one Primary Ability (PB p. 5)"
    },
    columnAssignment: 1, // PB p. 5: Column 1 (or Col 2 in UPB Induced Mutant)
    powerSlots: { min: 2, max: 5, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 1. May raise any single Primary Ability rank by +1CS."
  },
  {
    id: "altered_human_mystic",
    name: "Altered Human (Mystic Enhanced)",
    category: "Metahuman",
    source: "Player's Book p. 5 / Realms of Magic",
    description: "A normal human imbued with permanent mystical energy or enchanted enhancements by an external patron or ritual (e.g. Juggernaut, Iron Fist).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    abilityChoice: {
      count: 1,
      shift: 1,
      allowed: ["fighting", "agility", "strength", "endurance", "reason", "intuition", "psyche"],
      label: "+1CS to any one Primary Ability"
    },
    columnAssignment: 1,
    powerSlots: { min: 2, max: 5, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    specialRules: "May raise any single Primary Ability rank by +1CS. Powers count as mystical in nature."
  },

  // =========================================================================
  // 3. MUTANTS (PB p. 5 & UPB p. 3)
  // =========================================================================
  {
    id: "mutant",
    name: "Mutant (Homo Superior)",
    category: "Metahuman",
    source: "Player's Book p. 5",
    description: "Born with the X-factor gene that manifests superhuman abilities, usually in the teenage years (e.g. X-Men, X-Factor, New Mutants).",
    abilityMods: { F: 0, A: 0, S: 0, E: 1, R: 0, I: 0, P: 0 }, // PB p. 5: "Endurance is raised by one rank."
    columnAssignment: 1, // PB p. 5: Column 1
    powerSlots: { min: 2, max: 5, default: 3 },
    powerSlotsModifier: 1, // PB p. 5: "Mutants gain one additional Power, up to the total number of Powers available to the Hero."
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    resourcesShift: -1, // PB p. 5: "Resources are reduced by one rank."
    startingPopularity: 0, // PB p. 5: "Starting Popularity is always 0."
    specialRules: "Rolls on Column 1. Endurance is raised +1CS. Gains +1 additional Power (up to max). Resources are reduced -1CS. Starting Popularity is 0."
  },
  {
    id: "mutant_induced",
    name: "Mutant (Induced)",
    category: "Metahuman",
    source: "Ultimate Powers Book p. 3",
    description: "Started life as a Normal Human, then physically and genetically altered by a freak happenstance (e.g. Fantastic Four, Sunfire).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    abilityChoice: {
      count: 1,
      shift: 1,
      allowed: ["fighting", "agility", "strength", "endurance", "reason", "intuition", "psyche"],
      label: "+1CS to any one Primary Ability (UPB p. 3)"
    },
    columnAssignment: 1, // UPB p. 3: Column 1
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 1. Induced Mutants can raise any one Primary Ability +1CS."
  },
  {
    id: "mutant_random",
    name: "Mutant (Random)",
    category: "Metahuman",
    source: "Ultimate Powers Book p. 3",
    description: "Born to Normal Humans, a freak twist of genetic fate made the hero a mutant from birth (e.g. X-Men).",
    abilityMods: { F: 0, A: 0, S: 0, E: 1, R: 0, I: 0, P: 0 }, // UPB p. 3: "Endurance is raised +1CS."
    columnAssignment: 1, // UPB p. 3: Column 1
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 1, // UPB p. 3: "They gain one additional Power."
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    resourcesShift: -1, // UPB p. 3: "Resources are reduced -1CS."
    startingPopularity: 0,
    specialRules: "Rolls on Column 1. Gains +1 additional Power. Resources are reduced -1CS. Endurance is raised +1CS. Starting Popularity is 0."
  },
  {
    id: "mutant_breed",
    name: "Mutant (Breed)",
    category: "Metahuman",
    source: "Ultimate Powers Book p. 3",
    description: "Parents and preceding generations were Mutants, forming close-knit tribes or hidden societies (e.g. Inhumans).",
    abilityMods: { F: 0, A: 0, S: 0, E: 1, R: 0, I: 1, P: 0 }, // UPB p. 3: "Intuition is raised +1CS. Endurance is raised +1CS."
    columnAssignment: 1, // UPB p. 3: Column 1
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    minContacts: 1, // UPB p. 3: "Breed Mutants must have at least one Contact, usually their tribe."
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 1. Intuition is raised +1CS and Endurance is raised +1CS. Must have at least 1 Contact (usually their tribe)."
  },

  // =========================================================================
  // 4. HIGH HUMAN
  // =========================================================================
  {
    id: "high_human",
    name: "High Human",
    category: "Metahuman",
    source: "Ultimate Powers Book / Dragon #122",
    description: "A human lineage enhanced by genetic isolation, artificial evolution, or evolutionary divergence (e.g. Eternals).",
    abilityMods: { F: 1, A: 1, S: 1, E: 1, R: 1, I: 0, P: 0 },
    columnAssignment: 3,
    powerSlots: { min: 1, max: 5, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 1,
    contactsBonus: 1,
    resourcesBase: "Good",
    specialRules: "Rolls on Column 3. +1CS to Fighting, Agility, Strength, Endurance, and Reason."
  },

  // =========================================================================
  // 5. SURGICAL COMPOSITES & MODIFIED HUMANS (UPB p. 4 & Dragon #122 Table 1)
  // =========================================================================
  {
    id: "modified_human_surgical",
    name: "Surgical Composite",
    category: "Modified Human",
    source: "Ultimate Powers Book p. 4",
    description: "Created in an operating room from parts taken from several bodies (e.g. Frankenstein's Monster).",
    abilityMods: { F: 1, A: 0, S: 1, E: 1, R: 0, I: 0, P: 0 }, // UPB p. 4: "Strength, Fighting, and Endurance are all increased +1CS."
    columnAssignment: 2, // UPB p. 4: "Surgical Composites roll on column 2"
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    minContacts: 1, // "hospital or person responsible for his creation"
    resourcesBase: "Poor", // UPB p. 4: "Initial Resources are Poor."
    startingPopularity: 0, // UPB p. 4: "Initial Popularity is zero."
    combatMods: {
      mentalDominationResistanceShift: -1,
      fastHealingMultiplier: 2
    },
    specialRules: "Rolls on Column 2. Fighting, Strength, and Endurance are increased +1CS. Resistance to Mental Domination is -1CS. Initial Popularity is 0, Initial Resources are Poor. Heals twice as quickly as Normal Humans. Starts with 1 Contact (creator/hospital)."
  },
  {
    id: "modified_human_organic",
    name: "Modified Human (Organic)",
    category: "Modified Human",
    source: "Ultimate Powers Book p. 4",
    description: "Started life as a Normal Human; internal organs, glands, and nervous system were physically altered without changing DNA.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 1, // UPB p. 4 & Dragon #122 Table 1: Column 1
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: -1, // UPB p. 4: "All Modified Humans gain one less Power initially."
    talentBonus: 0,
    contactsBonus: 0,
    minContacts: 1,
    resourcesBase: "Typical",
    combatMods: {
      fastHealingMultiplier: 2
    },
    specialRules: "Rolls on Column 1. Heals twice as fast as Normal Humans. Gains 1 less Power initially. At least 1 Contact should be the organization responsible for the modification."
  },
  {
    id: "modified_human_muscular",
    name: "Modified Human (Muscular)",
    category: "Modified Human",
    source: "Ultimate Powers Book p. 4",
    description: "A human physically altered with extraordinary muscular development (e.g. Captain America).",
    abilityMods: { F: 0, A: 0, S: 1, E: 1, R: 0, I: 0, P: 0 }, // UPB p. 4: "Musculars gain +1CS Strength and Endurance."
    columnAssignment: 1, // UPB p. 4 & Dragon #122 Table 1: Column 1
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: -1, // UPB p. 4: "All Modified Humans gain one less Power initially."
    talentBonus: 0,
    contactsBonus: 0,
    minContacts: 1,
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 1. Gains +1CS Strength and +1CS Endurance. Gains 1 less Power initially. At least 1 Contact should be the organization responsible for the modification."
  },
  {
    id: "modified_human_skeletal",
    name: "Modified Human (Skeletal)",
    category: "Modified Human",
    source: "Ultimate Powers Book p. 4",
    description: "A human whose original skeletal structure has been replaced or augmented by artificial means (e.g. Wolverine's adamantium skeleton).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 1, // UPB p. 4 & Dragon #122 Table 1: Column 1
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: -1, // UPB p. 4: "All Modified Humans gain one less Power initially."
    talentBonus: 0,
    contactsBonus: 0,
    minContacts: 1,
    resourcesBase: "Typical",
    combatMods: {
      physicalResistanceShift: 1 // UPB p. 4: "Skeletals gain +1CS Resistance to Physical Attacks."
    },
    specialRules: "Rolls on Column 1. Gains +1CS Resistance to Physical Attacks (Endurance +1CS physical resistance). Gains 1 less Power initially. At least 1 Contact should be the organization responsible."
  },
  {
    id: "modified_human_extra_parts",
    name: "Modified Human (Extra Parts)",
    category: "Modified Human",
    source: "UPB p. 4 & Dragon #122 Table 1",
    description: "A human possessing extra pieces of anatomy—duplicate arms, duplicate internal organs, tails, wings, antennae, or fins.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    extraPartOptions: [
      { id: "arms", label: "Extra Arms (+1CS Fighting & Grapple)", abilityMods: { F: 1 }, combatNote: "+1CS Fighting & Grappling" },
      { id: "organs", label: "Duplicate Organs (2× Initial Health)", abilityMods: {}, healthMultiplier: 2, combatNote: "Doubles Base Health total" },
      {
        id: "tail",
        label: "Prehensile Tail(s) (+1 Blunt Attack)",
        abilityMods: {},
        extraAttack: "tail",
        combatNote: "+1 additional Blunt Tail Attack",
        innatePowers: [
          {
            code: "F3",
            name: "Natural Weaponry (Prehensile Tail)",
            rankName: "Typical",
            rankValue: 6,
            selectedOption: "tail",
            notes: "Innate Modified Human prehensile tail blunt attack (UPB p. 4)"
          }
        ]
      },
      {
        id: "wings",
        label: "Wings (Innate Flight)",
        abilityMods: {},
        combatNote: "Grants innate Winged Flight",
        innatePowers: [
          {
            code: "T25",
            name: "Winged Flight",
            rankName: "Typical",
            rankValue: 6,
            selectedOption: "feathered",
            notes: "Innate Modified Human winged flight (UPB p. 4)"
          }
        ]
      }
    ],
    columnAssignment: 2, // Dragon #122 Table 1: Column 2 (UPB p. 4 text said Col 1, corrected to Col 2 in Dragon #122)
    powerSlots: { min: 1, max: 5, default: 2 },
    powerSlotsModifier: -1,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 2 (Dragon #122). Choose extra anatomy: Extra Arms raise Fighting +1CS; Duplicate Organs double Health point total; Tails grant an additional blunt attack; Wings grant Flight."
  },

  // =========================================================================
  // 6. DEMIHUMANS (UPB pp. 4–5 & Dragon #122 Table 1)
  // =========================================================================
  {
    id: "centaur",
    name: "Centaur",
    category: "Demihuman",
    source: "UPB p. 4 & Dragon #122 Table 1",
    description: "A human head, torso, and arms mated to the body of a horse.",
    abilityMods: { F: 0, A: 0, S: 1, E: 0, R: 0, I: 0, P: 0 }, // UPB p. 4: "possess increased Strength (+1CS)"
    columnAssignment: 5, // Dragon #122 Table 1: Column 5
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    combatMods: {
      hoovesAttack: true,
      groundAreasMin: 4,
      climbingRankCap: "Feeble"
    },
    specialRules: "Rolls on Column 5. Gains +1CS Strength, moves 4 areas/turn on horizontal ground, and can fight with hooves. Has Feeble Climbing ability."
  },
  {
    id: "equiman",
    name: "Equiman",
    category: "Demihuman",
    source: "UPB p. 4 & Dragon #122 Table 1",
    description: "Possesses horse legs in place of human ones, plus a horse's mane and tail.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 3, // Dragon #122 Table 1: Column 3
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    combatMods: {
      kickDamageShift: 1 // UPB p. 4: "Kicking does +1CS damage."
    },
    specialRules: "Rolls on Column 3. Kicking attacks inflict +1CS Blunt damage (Strength +1CS)."
  },
  {
    id: "faun",
    name: "Faun / Satyr",
    category: "Demihuman",
    source: "UPB p. 4 & Dragon #122 Table 1",
    description: "Possesses the hairy legs, short tail, and horns of a goat.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 2, // Dragon #122 Table 1: Column 2
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    startingPopularity: 0, // UPB p. 4: "fauns have an initial Popularity of zero."
    innatePowers: [
      {
        code: "L9",
        name: "Hypnotic Control",
        rankName: "Feeble",
        rankValue: 2,
        notes: "Innate Faun/Satyr mental fascination over humanoid females (UPB p. 4)"
      }
    ],
    specialRules: "Rolls on Column 2. Initial Popularity is 0 (resemblance to traditional devil). Possesses Feeble Mental Domination (Hypnotic Control) over females of any humanoid race."
  },
  {
    id: "felinoid",
    name: "Felinoid (Cat-Person)",
    category: "Demihuman",
    source: "UPB p. 4 & Dragon #122 Table 1",
    description: "A human-shaped, cat-like being covered in fur with tail, claws, fangs, pointed ears, and slitted pupils (e.g. Tigra).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 1, // Dragon #122 Table 1: Column 1
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    combatMods: {
      clawsAttack: true,
      climbingShift: 1,
      nightVision: "Excellent"
    },
    innatePowers: [
      {
        code: "F3",
        name: "Natural Weaponry (Claws)",
        rankName: "Good",
        rankValue: 10,
        selectedOption: "claws",
        notes: "Innate Felinoid claws & fangs edged attack (UPB p. 4)"
      },
      {
        code: "DT21",
        name: "UV Vision",
        rankName: "Excellent",
        rankValue: 20,
        notes: "Innate Felinoid night vision (UPB p. 4)"
      }
    ],
    specialRules: "Rolls on Column 1. Possesses Claws & Fangs (Edged attack), Excellent (20) Night Vision, and +1CS to Climbing FEATs."
  },
  {
    id: "lupinoid",
    name: "Lupinoid (Wolf-Person)",
    category: "Demihuman",
    source: "UPB p. 5 & Dragon #122 Table 1",
    description: "A human-shaped, canine-like being covered in hair with a canine face, tail, big teeth, and pointed ears.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 4, // Dragon #122 Table 1: Column 4
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    popularityShift: -1, // UPB p. 5: "their Popularity decreases -1CS."
    combatMods: {
      olfactoryRank: "Excellent"
    },
    innatePowers: [
      {
        code: "DT7",
        name: "Hyper-Olfactory",
        rankName: "Excellent",
        rankValue: 20,
        notes: "Innate Lupinoid hyper-olfactory smell (UPB p. 5)"
      },
      {
        code: "F3",
        name: "Natural Weaponry (Fangs)",
        rankName: "Good",
        rankValue: 10,
        selectedOption: "fangs",
        notes: "Innate Lupinoid fangs attack (UPB p. 5)"
      }
    ],
    specialRules: "Rolls on Column 4. Possesses an Excellent (20) sense of smell (Hyper-Olfactory). Initial Popularity is reduced -1CS (often mistaken for werewolves)."
  },
  {
    id: "avian_angelic",
    name: "Avian (Angelic)",
    category: "Winged",
    source: "UPB p. 5 & Dragon #122 Table 1",
    description: "Resembles a human with feathered wings sprouting from the shoulder blades (e.g. Angel of X-Factor).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 3, // Dragon #122 Table 1: Column 3
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    popularityShift: 1, // UPB p. 5: "They get an increased Popularity (+1CS)."
    innatePowers: [
      {
        code: "T25",
        name: "Winged Flight",
        rankName: "Excellent",
        rankValue: 20,
        selectedOption: "feathered",
        notes: "Innate Demihuman Avian (Angelic) feathered winged flight (UPB p. 5)"
      }
    ],
    specialRules: "Rolls on Column 3. Gains +1CS Popularity and winged Flight."
  },
  {
    id: "avian_harpy",
    name: "Avian (Harpy)",
    category: "Winged",
    source: "UPB p. 5 & Dragon #122 Table 1",
    description: "Possesses arms modified to serve as wings and feather-covered legs ending in bird claws.",
    abilityMods: { F: 1, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 }, // UPB p. 5: "They gain +1CS Fighting."
    columnAssignment: 2, // Dragon #122 Table 1: Column 2
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    combatMods: {
      talonClawsAttack: true
    },
    innatePowers: [
      {
        code: "T25",
        name: "Winged Flight",
        rankName: "Excellent",
        rankValue: 20,
        selectedOption: "feathered",
        notes: "Innate Demihuman Avian (Harpy) feathered winged flight (UPB p. 5)"
      },
      {
        code: "F3",
        name: "Natural Weaponry (Talon Claws)",
        rankName: "Good",
        rankValue: 10,
        selectedOption: "claws",
        notes: "Innate Demihuman Avian (Harpy) bird claw attack (UPB p. 5)"
      }
    ],
    specialRules: "Rolls on Column 2. Gains +1CS Fighting, bird-claw Talon Edged attacks, and winged Flight."
  },
  {
    id: "chiropteran",
    name: "Chiropteran (Bat-Form)",
    category: "Winged",
    source: "UPB p. 5 & Dragon #122 Table 1",
    description: "Combines human parts with a bat: arms serve as leathery wings, elongated toes serve as hands, and large ears provide sonar.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 2, // Dragon #122 Table 1: Column 2
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    startingPopularity: 2, // UPB p. 5: "Initial Popularity is Feeble."
    combatMods: {
      innateSonarRank: "Good"
    },
    innatePowers: [
      {
        code: "T25",
        name: "Winged Flight",
        rankName: "Good",
        rankValue: 10,
        selectedOption: "leathery",
        notes: "Innate Demihuman Chiropteran leathery winged flight (UPB p. 5)"
      },
      {
        code: "DT16",
        name: "Sonar",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Demihuman Chiropteran active sonar (UPB p. 5)"
      }
    ],
    specialRules: "Rolls on Column 2. Possesses Active Sonar at Good (10) rank and leathery wings. Initial Popularity is Feeble (2)."
  },
  {
    id: "lamian",
    name: "Lamian (Snake-Form)",
    category: "Demihuman",
    source: "UPB p. 5 & Dragon #122 Table 1",
    description: "Snake-person whose legs are replaced by a serpentine body, with fine scales, lidless eyes, and retractable fangs.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 3, // Dragon #122 Table 1: Column 3
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    startingPopularity: 0, // UPB p. 5: "the lamian's initial Popularity is zero."
    combatMods: {
      escapeShift: 1, // UPB p. 5: "Lamians are difficult to bind (+1CS to escape)."
      venomousBiteRank: "Excellent" // UPB p. 5: "50% chance the lamian is venomous (Excellent Intensity poison)."
    },
    innatePowers: [
      {
        code: "F3",
        name: "Natural Weaponry (Venomous Fangs)",
        rankName: "Excellent",
        rankValue: 20,
        selectedOption: "fangs",
        notes: "Innate Demihuman Lamian venomous fangs attack (UPB p. 5)"
      }
    ],
    specialRules: "Rolls on Column 3. Difficult to bind (+1CS to Escape FEATs). 50% chance of venomous fangs (Excellent 20 poison). Initial Popularity is 0."
  },
  {
    id: "merhuman",
    name: "Merhuman (Aquatic)",
    category: "Demihuman",
    source: "UPB p. 5 & Dragon #122 Table 1",
    description: "Human from the waist up with a flexible fish-tail, possessing both lungs and gills.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 2, // Dragon #122 Table 1: Column 2
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    popularityShift: 1, // UPB p. 5: "have an increased Popularity (+1CS)."
    innatePowers: [
      {
        code: "P16",
        name: "Waterbreathing",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Demihuman Merhuman waterbreathing lungs & gills (UPB p. 5)"
      },
      {
        code: "P17",
        name: "Water Freedom",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Demihuman Merhuman water freedom (UPB p. 5)"
      },
      {
        code: "T11",
        name: "Hyper-Swimming",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Demihuman Merhuman aquatic swimming locomotion (UPB p. 5)"
      }
    ],
    specialRules: "Rolls on Column 2. Possesses lungs, gills (Waterbreathing), and Water Freedom natively. Gains +1CS Popularity. Dry-land movement is limited without vehicles or flight."
  },
  {
    id: "demihuman",
    name: "Demihuman (Other / Sub-Terran)",
    category: "Demihuman",
    source: "Ultimate Powers Book p. 5",
    description: "Any other human-animal hybrid or subterranean/aquatic humanoid race (e.g. Namor, Ursinoid, Sub-Terrans).",
    abilityMods: { F: 0, A: 0, S: 1, E: 1, R: 0, I: 0, P: 0 },
    columnAssignment: 3,
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 3. Combines animal or subterranean traits with humanoid form (+1CS Strength and Endurance)."
  },
  {
    id: "centaur_faun",
    name: "Centaur / Mythological Hybrid",
    category: "Demihuman",
    source: "Dragon #122 Table 1",
    description: "A hybrid physical form combining equine or caprine biology with humanoid anatomy.",
    abilityMods: { F: 0, A: 0, S: 1, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 5,
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    combatMods: {
      hoovesAttack: true,
      groundAreasMin: 4,
      climbingRankCap: "Feeble"
    },
    specialRules: "Rolls on Column 5. Gains +1CS Strength and 4 areas/turn ground movement."
  },

  // =========================================================================
  // 7. CYBORGS (UPB pp. 5–6)
  // =========================================================================
  {
    id: "cyborg",
    name: "Cyborg (General)",
    category: "Cybernetic",
    source: "Ultimate Powers Book p. 5",
    description: "A living human who has had parts of the body replaced by artificial biomechanical devices (e.g. original Deathlok, Misty Knight).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: -1, P: 0 }, // UPB p. 5: "Cyborgs initially have a decreased Intuition (-1CS)"
    columnAssignment: 2,
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    minContacts: 1, // UPB p. 5: "At least one Contact must be either the lab or hospital that created him or a facility that provides maintenance services."
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 2. Initial Intuition is reduced -1CS due to cybernetic trauma. At least 1 Contact must be the creating lab/hospital or maintenance facility."
  },
  {
    id: "cyborg_limbs",
    name: "Cyborg (Artificial Limbs / Organs)",
    category: "Cybernetic",
    source: "Ultimate Powers Book p. 5",
    description: "Began as a Normal Human and had limbs or organs replaced by artificial devices (e.g. Misty Knight, Forge, Silvermane).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: -1, P: 0 }, // UPB p. 5: "-1CS Intuition"
    columnAssignment: 2,
    powerSlots: { min: 1, max: 5, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    minContacts: 1,
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 2. Initial Intuition is reduced -1CS. At least 1 Contact must be the lab, hospital, or maintenance facility."
  },
  {
    id: "cyborg_exoskeleton",
    name: "Cyborg (Exoskeleton)",
    category: "Cybernetic",
    source: "Ultimate Powers Book p. 5",
    description: "The hero's body is intact but encased in a mechanical suit that exists in symbiosis to provide life-support and Powers (e.g. Iron Man).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 2,
    powerSlots: { min: 1, max: 5, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 2. Natural and artificial bodies exist in symbiosis; powers are housed in the exoskeleton."
  },
  {
    id: "cyborg_mech_body",
    name: "Cyborg (Mechanical Body)",
    category: "Cybernetic",
    source: "Ultimate Powers Book p. 5",
    description: "Only the hero's brain and nervous system remain, housed in a life-support module inside a mechanical chassis.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: -1, P: -1 }, // UPB p. 5: "-1CS to both Intuition and Psyche"
    columnAssignment: 4, // UPB p. 5: "Random ranks are rolled on column 4."
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    maxContacts: 1, // UPB p. 6: "Mech Bodies initially have only one Contact—the lab where they were created."
    resourcesBase: "Typical",
    combatMods: {
      diseasePoisonResistanceRank: "Monstrous" // UPB p. 5: "Mech Bodies have Monstrous Resistance to Disease and Poisons of all sorts."
    },
    innatePowers: [
      {
        code: "D15",
        name: "Resist: Physical (Toxins & Disease)",
        rankName: "Monstrous",
        rankValue: 75,
        selectedOption: "specialized",
        optionSubChoice: "Toxins & Poisons",
        notes: "Innate Cyborg (Mechanical Body) resistance to disease and poisons (UPB p. 5)"
      }
    ],
    specialRules: "Rolls on Column 4. Initial Intuition and Psyche are both reduced -1CS. Possesses Monstrous (75) Resistance to Disease and Poisons. Vulnerable to Magnetic attacks and rust. Starts with only 1 Contact (the creating lab)."
  },
  {
    id: "cyborg_augmented",
    name: "Cyborg (Mechanically Augmented)",
    category: "Cybernetic",
    source: "Ultimate Powers Book p. 6",
    description: "Retains all original human anatomy but has internal body spaces filled with nervous-system-linked devices.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 3, // UPB p. 6: "Augmenteds roll on column 3."
    powerSlots: { min: 1, max: 5, default: 2 },
    powerSlotsModifier: -1, // UPB p. 6: "Augmenteds receive one less Power."
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Good", // UPB p. 6: "Initial Resources are Good or optionally rolled."
    resourcesCanChooseFixedGood: true,
    specialRules: "Rolls on Column 3. Receives 1 less Power initially. Initial Resources are Good (or optionally rolled). Does not suffer cybernetic depression."
  },

  // =========================================================================
  // 8. ROBOTS & ANDROIDS (PB p. 5 & UPB pp. 3, 6)
  // =========================================================================
  {
    id: "android",
    name: "Android / Synthezoid",
    category: "Artificial",
    source: "Ultimate Powers Book p. 3",
    description: "An artificially created organic being made of laboratory protoplasm grown in an artificial womb (e.g. The Vision, Original Human Torch).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    abilityChoice: {
      count: 1,
      shift: 1,
      allowed: ["fighting", "agility", "strength", "endurance", "reason", "intuition", "psyche"],
      label: "+1CS to any one Primary Ability (UPB p. 3)"
    },
    columnAssignment: 4, // UPB p. 3: "Androids roll on column 4 of the Random Ranks Table."
    powerSlots: { min: 2, max: 7, default: 4 },
    powerSlotsModifier: 1, // UPB p. 3: "Androids gain one Power."
    talentBonus: 0,
    contactsBonus: 0,
    minContacts: 1, // UPB p. 3: "Androids have at least one Contact, the lab tech or scientist who created them."
    resourcesBase: "Typical",
    popularityShift: -1, // UPB p. 3: "Popularity is initially lowered -1CS."
    specialRules: "Rolls on Column 4. May raise any one Primary Ability +1CS. Gains +1 additional Power. Popularity is lowered -1CS. Has at least 1 Contact (creator/lab tech)."
  },
  {
    id: "robot_android",
    name: "Robot (Standard / PB 1986)",
    category: "Artificial",
    source: "Player's Book p. 5",
    description: "Artificially-created sentient beings including robots, androids, synthezoids, life-model decoys, and golems (e.g. Machine Man, Jocasta, Ultron).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 4, // PB p. 5: "Robots roll their primary abilities on column 4"
    powerSlots: { min: 2, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    startingPopularity: 0, // PB p. 5: "Popularity is reduced to 0"
    specialRules: "Rolls on Column 4. Initial Popularity is 0. PC robots heal normally via internal self-repair. Can be reactivated if destroyed (returning with 0 Karma)."
  },
  {
    id: "robot_human_shape",
    name: "Robot (Humanshape)",
    category: "Artificial",
    source: "Ultimate Powers Book p. 6",
    description: "A completely mechanical being patterned after the human body, weighing 500 to 2,000 lbs (e.g. Jocasta, Sentinels, Machine Man).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 4, // UPB p. 6: "Humanshapes roll on column 4."
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    startingPopularity: 0, // UPB p. 6: "Initial Popularity is zero."
    specialRules: "Rolls on Column 4. Initial Popularity is 0. Possesses self-repair facilities that simulate normal Healing."
  },
  {
    id: "robot_usuform",
    name: "Robot (Usuform)",
    category: "Artificial",
    source: "Ultimate Powers Book p. 6",
    description: "A robot whose non-humanoid body follows utilitarian function designed around its specific Powers.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 4, // UPB p. 6: "Usuforms roll on column 4."
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 4. Popularity is unaffected (often mistaken for industrial props). Cannot wear humanoid armor."
  },
  {
    id: "robot_metamorphic",
    name: "Robot (Metamorphic)",
    category: "Artificial",
    source: "Ultimate Powers Book p. 6",
    description: "A flexible robot capable of transforming between two or more forms (typically humanshape and vehicle/usuform).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 4, // UPB p. 6: "Metamorphs roll on column 4."
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 4. Possesses a minimum of 2 forms (up to 3x size difference). Additional forms beyond 2 cost -1CS to all Primary Abilities per extra form."
  },
  {
    id: "robot_computer",
    name: "Robot (Sentient Computer)",
    category: "Artificial",
    source: "Ultimate Powers Book p. 6–7",
    description: "A self-aware mainframe intelligence interacting with the physical world through peripheral hardware and remote slave robots.",
    abilityMods: { F: -1, A: 0, S: 0, E: 0, R: 2, I: 0, P: 0 }, // UPB p. 6: "Reason is increased +2CS. Fighting is decreased -1CS."
    columnAssignment: 4, // UPB p. 6: "Computers roll on column 4."
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    resourcesShift: 1, // UPB p. 6: "Resources are increased +1CS"
    combatMods: {
      electricalMagneticVulnerabilityShift: -1
    },
    specialRules: "Rolls on Column 4. Reason is increased +2CS, Fighting is decreased -1CS, and Resources are increased +1CS. Decreased resistance to Electrical, Magnetic, and Phasing attacks. Includes at least 1 remote robot."
  },

  // =========================================================================
  // 9. ALIENS & HUMANOID RACES (PB pp. 5–6 & UPB pp. 3–4)
  // =========================================================================
  {
    id: "alien",
    name: "Alien (Extraterrestrial / PB 1986)",
    category: "Extraterrestrial",
    source: "Player's Book pp. 5–6 / UPB p. 3",
    description: "Individuals from other civilizations, planets, dimensions, or hidden races (e.g. Kree, Skrulls, Shi'ar, Atlanteans, Eternals).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    abilityChoice: {
      count: 1,
      shift: 1,
      allowed: ["fighting", "agility", "strength", "endurance", "reason", "intuition", "psyche"],
      label: "+1CS to any one Primary Ability (UPB p. 4 Humanoid Race)"
    },
    columnAssignment: 5, // PB p. 6 & UPB p. 4: Column 5
    powerSlots: { min: 2, max: 5, default: 2 },
    powerSlotsModifier: -1, // PB p. 6: "Aliens gain one less Power (minimum of two)."
    minPowerSlots: 2,
    talentBonus: 0,
    contactsBonus: 0,
    maxContacts: 1, // PB p. 6 & UPB p. 4: "starts with one Contact (maximum): home race."
    resourcesBase: "Poor", // PB p. 6 & UPB p. 4: "Starting Resources are set at Poor."
    specialRules: "Rolls on Column 5. May raise any one Primary Ability +1CS (UPB Humanoid Race). Gains 1 less Power (minimum of 2). Starting Resources are set at Poor. Maximum of 1 initial Contact (home race)."
  },
  {
    id: "alien_humanoid",
    name: "Humanoid Race (Alien / Lost Land)",
    category: "Extraterrestrial",
    source: "Ultimate Powers Book pp. 3–4",
    description: "A member of a human-like race from another world, era, dimension, or hidden land who can pass as human with a little disguise.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    abilityChoice: {
      count: 1,
      shift: 1,
      allowed: ["fighting", "agility", "strength", "endurance", "reason", "intuition", "psyche"],
      label: "+1CS to any one Primary Ability (UPB p. 4)"
    },
    columnAssignment: 5, // UPB p. 4: "Humanoids roll on column 5"
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    maxContacts: 1, // UPB p. 4: "A Humanoid starts out with only one Contact, his race."
    resourcesBase: "Poor", // UPB p. 4: "Starting Resources are set at Poor."
    specialRules: "Rolls on Column 5. Can raise any one Primary Ability +1CS. Starting Resources are set at Poor. Starts with only 1 Contact (home race)."
  },
  {
    id: "alien_non_humanoid",
    name: "Alien (Non-Humanoid)",
    category: "Extraterrestrial",
    source: "Player's Book p. 6 / UPB p. 4",
    description: "An extraterrestrial lifeform with radically non-humanoid biology (e.g. Brood, Acanti, crystalline or insectoid aliens).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    abilityChoice: {
      count: 1,
      shift: 1,
      allowed: ["fighting", "agility", "strength", "endurance", "reason", "intuition", "psyche"],
      label: "+1CS to any one Primary Ability"
    },
    columnAssignment: 5,
    powerSlots: { min: 2, max: 5, default: 2 },
    powerSlotsModifier: -1,
    minPowerSlots: 2,
    talentBonus: 0,
    contactsBonus: 0,
    maxContacts: 1,
    resourcesBase: "Poor",
    popularityPenalty: -5,
    specialRules: "Rolls on Column 5. Gains 1 less Power (minimum 2). Starting Resources are Poor, Popularity reduced by 5, max 1 Contact (home race)."
  },

  // =========================================================================
  // 10. EXOTIC, ELEMENTAL & BIOLOGICAL BODIES (UPB pp. 7–9)
  // =========================================================================
  {
    id: "animal",
    name: "Animal (Intelligent Beast)",
    category: "Non-Human",
    source: "Ultimate Powers Book p. 7",
    description: "A fish, mammal, bird, reptile, or alien creature possessing human-level intelligence and superhuman Powers (e.g. Lockheed, Lockjaw).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 1, // UPB p. 7: "Animals roll on column 1. Aliens in this category roll on column 5."
    powerSlots: { min: 1, max: 4, default: 2 },
    powerSlotsModifier: -1, // UPB p. 7: "Animals gain one less Power."
    talentBonus: 0,
    contactsBonus: 0,
    minContacts: 1, // UPB p. 7: "Animals have to have a human Contact."
    resourcesBase: "Shift 0", // UPB p. 7: "Resources are zero unless the animal has attached himself to a human."
    specialRules: "Rolls on Column 1 (Column 5 if Alien). Gains 1 less Power, but automatically has 2 Detection Powers at Good (10) rank. Resources are Shift 0 (0) unless attached to a human Contact.",
    innatePowers: [
      {
        code: "DT6",
        name: "Hyper-Hearing",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Animal detection power (UPB p. 7)"
      },
      {
        code: "DT7",
        name: "Hyper-Olfactory",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Animal detection power (UPB p. 7)"
      }
    ]
  },
  {
    id: "vegetable",
    name: "Vegetable Form (Plant-Life)",
    category: "Elemental",
    source: "Ultimate Powers Book p. 8",
    description: "An intelligent, mobile man-shaped plant whose physiology is based on photosynthesis (e.g. Man-Thing, Groot).",
    abilityMods: { F: -2, A: 0, S: 0, E: 2, R: 0, I: 0, P: 0 }, // UPB p. 8: "Plants have -2CS Fighting. Plants gain +2CS Endurance."
    columnAssignment: 1, // UPB p. 8: "Plants roll on column 1."
    powerSlots: { min: 1, max: 5, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    maxContacts: 0, // UPB p. 8: "Plants have no initial Contacts"
    resourcesBase: "Shift 0", // UPB p. 8: "Plants have zero Resources."
    innatePowers: [
      {
        code: "EC1",
        name: "Absorption Power (Photosynthesis)",
        rankName: "Good",
        rankValue: 10,
        selectedOption: "light",
        notes: "Innate Vegetable form photosynthesis energy absorption (UPB p. 8)"
      }
    ],
    specialRules: "Rolls on Column 1. Has -2CS Fighting and +2CS Endurance. Zero (Shift 0) Resources and 0 initial Contacts. Automatically possesses Good (10) Absorption Power (photosynthesis)."
  },
  {
    id: "abnormal_chemistry",
    name: "Abnormal Biochemistry",
    category: "Metahuman",
    source: "Ultimate Powers Book p. 8",
    description: "An apparently normal body whose chemical base replaces carbon or iron with silicon, copper (green blood), or cobalt (blue blood).",
    abilityMods: { F: 0, A: 0, S: 0, E: 1, R: 0, I: 0, P: 0 }, // UPB p. 8: "Endurance is raised +1CS."
    columnAssignment: 2, // UPB p. 8: "Abnormals roll on column 2."
    powerSlots: { min: 1, max: 5, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    combatMods: {
      toxicBloodDamage: 10 // UPB p. 8: "anything foolish enough to try to feed on the abnormal, like a lion or a Bio-Vampire, takes Good damage"
    },
    specialRules: "Rolls on Column 2. Endurance is raised +1CS. Anything that bites or feeds on the hero (e.g. predators or Bio-Vampires) suffers Good (10) poison damage."
  },
  {
    id: "mineral",
    name: "Mineral Life",
    category: "Elemental",
    source: "Ultimate Powers Book p. 8",
    description: "A body composed of solid homogenous mineral matter without conventional internal organs (e.g. golems, Warlock, crystalline beings).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 2, // UPB p. 8: "Mineral Life rolls on column 2."
    powerSlots: { min: 1, max: 5, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    healthMultiplier: 2, // UPB p. 8: "Initial Health is doubled."
    movementShift: -1, // UPB p. 8: "Movement rate is decreased -1CS."
    innatePowers: [
      {
        code: "D15",
        name: "Resist: Physical (Toxins & Disease)",
        rankName: "Unearthly",
        rankValue: 100,
        selectedOption: "specialized",
        optionSubChoice: "Toxins & Poisons",
        notes: "Innate Mineral Life immunity to poisons and diseases (UPB p. 8)"
      }
    ],
    specialRules: "Rolls on Column 2. Initial Health is doubled (2× F+A+S+E). Movement rate is decreased -1CS. Immune to all normal human Poisons and Diseases."
  },
  {
    id: "gaseous",
    name: "Gaseous Life",
    category: "Elemental",
    source: "Ultimate Powers Book pp. 8–9",
    description: "A coherent cloud composed completely of gases, vapors, smoke, and mist (e.g. Vapor of the U-Foes).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 5, // UPB p. 9: "Gas Bodies roll on column 5."
    powerSlots: { min: 1, max: 5, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    maxContacts: 0, // UPB p. 9: "no initial Contacts"
    resourcesBase: "Shift 0", // UPB p. 9: "On Earth, Gas Bodies have zero Resources"
    innatePowers: [
      {
        code: "S22",
        name: "Phasing (Ghost Walk)",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Gaseous Life natural permeable phasing (UPB p. 8-9)"
      }
    ],
    specialRules: "Rolls on Column 5. Zero (Shift 0) Resources and 0 initial Contacts on Earth. Possesses natural Phasing through permeable solids; immune to normal physical blows."
  },
  {
    id: "liquid",
    name: "Liquid Life",
    category: "Elemental",
    source: "Ultimate Powers Book p. 8",
    description: "A body composed 100% of cohesive fluid, from watery to gelatinous viscosity (e.g. Hydro-Man).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 5, // UPB p. 8: "Fluid Bodies roll on column 5."
    powerSlots: { min: 1, max: 5, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    maxContacts: 0, // UPB p. 8: "Fluid Bodies have no initial Contacts except their own race"
    resourcesBase: "Typical",
    innatePowers: [
      {
        code: "S22",
        name: "Phasing (Ghost Walk)",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Liquid Life natural permeable phasing (UPB p. 8)"
      }
    ],
    specialRules: "Rolls on Column 5. Possesses a natural variation of Phasing to permeate porous materials. Immobilized if frozen; vaporization is fatal. No initial Contacts except own race."
  },
  {
    id: "energy_being",
    name: "Energy Body",
    category: "Energy / Astral",
    source: "Ultimate Powers Book p. 9",
    description: "A field of coherent energy capable of moving in any direction even through vacuum (e.g. Living Laser, Monica Rambeau, Wonder Man).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 5, // UPB p. 9: "Energy Beings roll on column 5."
    powerSlots: { min: 2, max: 6, default: 4 },
    powerSlotsModifier: 1, // UPB p. 9: "Energy Beings have a Bonus Power of Energy Emission."
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    combatMods: {
      contactEnergyDamage: 2, // UPB p. 9: "Physical contact with an Energy Being does Feeble damage."
      plasmaVulnerabilityShift: -1 // UPB p. 9: "special vulnerability to Plasma Control (-1CS Resistance)"
    },
    innatePowers: [
      {
        code: "S13",
        name: "Energy Body",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Energy Being body of coherent energy (UPB p. 9)"
      },
      {
        code: "EE8",
        name: "Light Emission",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Energy Being bonus power of energy emission (UPB p. 9)"
      }
    ],
    specialRules: "Rolls on Column 5. Gains a Bonus Power of Energy Emission. Physical contact with an Energy Being inflicts Feeble (2) damage. Vulnerable to Plasma Control (-1CS Resistance) and containment storage batteries."
  },

  // =========================================================================
  // 11. GESTALT & SWARMS (UPB p. 10 & Dragon #134)
  // =========================================================================
  {
    id: "gestalt",
    name: "Physical Gestalt",
    category: "Gestalt / Swarm",
    source: "Ultimate Powers Book p. 10",
    description: "A superhero form formed by the combination or fusion of two or more distinct individuals.",
    abilityMods: { F: 1, A: 0, S: 1, E: 1, R: 0, I: 0, P: 1 },
    columnAssignment: 3,
    powerSlots: { min: 2, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 1,
    contactsBonus: 1,
    resourcesBase: "Typical",
    innatePowers: [
      {
        code: "S23",
        name: "Physical Gestalt",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Physical Gestalt fused form (UPB p. 10)"
      }
    ],
    specialRules: "Requires partner entities to fuse; separation returns characters to normal stats."
  },
  {
    id: "s32_collective_mass",
    name: "S32 - Collective Mass (Swarm Form)",
    category: "Gestalt / Swarm",
    code: "S32",
    source: "Dragon Magazine #134 (June 1988), pp. 89-91",
    author: "Tom Lamphier & David Edward Martin",
    description: "A variation of the Physical Gestalt form modeled after Swarm. The body consists of thousands of living organisms (bees, spiders, nanites) held together by a unified hive consciousness.",
    abilityMods: { F: 0, A: 0, S: 0, E: 2, R: 0, I: 0, P: 2 },
    columnAssignment: 3,
    powerSlots: { min: 2, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Poor",
    isDualProfile: true,
    combatMods: {
      swarmResistanceShift: 2
    },
    innatePowers: [
      {
        code: "S32",
        name: "Swarm / Collective Mass (Swarm Form)",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate S32 Collective Mass swarm form (Dragon #134)"
      }
    ],
    specialRules: [
      "+2CS Resistance to Physical and Directed Energy attacks (attacks pass harmlessly through dispersed components).",
      "Requires tracking dual abilities: Component Stats (individual organism, e.g. Feeble 2) and Collective Mass Stats (full swarm).",
      "Components can disperse through any aperture or crack that an individual unit can navigate.",
      "Most powers can only be manifested by the Collective Mass; individual units are limited to Feeble rank."
    ]
  },

  // =========================================================================
  // 12. SUPERNATURAL, ETHEREAL, DEITIES & METAMORPHS (UPB pp. 7, 9–10)
  // =========================================================================
  {
    id: "undead",
    name: "Undead (Vampire / Zombie / Mummy)",
    category: "Supernatural",
    source: "Ultimate Powers Book p. 9",
    description: "Once a living being who has died and regained animation through arcane or vampiric means (e.g. Dracula, Lilith, Morbius, Blade).",
    abilityMods: { F: 0, A: 0, S: 1, E: 1, R: 0, I: 0, P: 0 }, // UPB p. 9: "Strength and Endurance are increased by +1CS."
    columnAssignment: 1, // UPB p. 9: "Undead roll on column 1."
    powerSlots: { min: 1, max: 5, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    specialRules: "Rolls on Column 1. Strength and Endurance are increased +1CS. Powers are negated within 10' of a religious symbol (suffers Excellent 20 damage if from own former religion)."
  },
  {
    id: "ethereal",
    name: "Ethereal / Astral Spirit",
    category: "Energy / Astral",
    source: "Ultimate Powers Book p. 9",
    description: "An intangible, disembodied spirit or ghost able to drift in any direction and pass effortlessly through solid matter (e.g. Red Ghost).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 1, // UPB p. 9: "Ethereals roll on column 1."
    powerSlots: { min: 1, max: 5, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    minContacts: 1, // UPB p. 9: "At least one Contact can be a Spiritual Medium."
    resourcesBase: "Typical",
    combatMods: {
      earthFightingShiftZero: true, // UPB p. 9: "Fighting rank is zero in the Earth Dimension, unless the Ethereal is fighting another Ethereal."
      physicalAttackReductionCS: -9 // UPB p. 9: "Physical attacks have a decreased effect on Ethereals (-9CS)."
    },
    innatePowers: [
      {
        code: "S22",
        name: "Phasing (Ghost Walk)",
        rankName: "Monstrous",
        rankValue: 75,
        notes: "Innate Ethereal disembodied spirit phasing (UPB p. 9)"
      },
      {
        code: "T1",
        name: "Astral Body",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Ethereal astral body movement (UPB p. 9)"
      }
    ],
    specialRules: "Rolls on Column 1. Fighting rank is Shift 0 on the Earth Dimension (except vs other Ethereals). Physical attacks suffer -9CS against Ethereals (immune to physical < Unearthly). At least 1 Contact can be a Spiritual Medium."
  },
  {
    id: "angel_demon",
    name: "Angel / Demon (Extra-Dimensional)",
    category: "Cosmic / Divine",
    source: "UPB p. 7 & Dragon #122 Table 1",
    description: "Supernatural and corporeal magical beings from other planes of existence (e.g. Ghost Rider, Daimon Hellstrom, Mephisto).",
    abilityMods: { F: 1, A: 1, S: 1, E: 1, R: 0, I: 0, P: 0 }, // UPB p. 7: "All Physical Abilities are raised +1CS."
    columnAssignment: 5, // UPB p. 7 & Dragon #122 Table 1: Column 5
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    maxContacts: 0, // UPB p. 7: "Angels and demons have no initial Contacts"
    resourcesBase: "Typical",
    combatMods: {
      angelicSword: true,
      demonicHellfire: true
    },
    innatePowers: [
      {
        code: "EE4",
        name: "Fire Generation",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Demon fire generation (UPB p. 7)"
      },
      {
        code: "D12",
        name: "Resist: Energy (Fire & Heat)",
        rankName: "Unearthly",
        rankValue: 100,
        selectedOption: "specialized",
        optionSubChoice: "Fire & Heat",
        notes: "Innate Demon fire & heat invulnerability (UPB p. 7)"
      }
    ],
    specialRules: "Rolls on Column 5. All Physical Abilities (F, A, S, E) are raised +1CS. 0 initial Contacts. Angels gain +2CS Popularity and a Magical Sword (Excellent 20 damage). Demons lose -2CS Popularity and gain Good (10) Fire Generation & Heat/Fire Invulnerability."
  },
  {
    id: "deity",
    name: "Deity / God / Pantheonic",
    category: "Cosmic / Divine",
    source: "UPB p. 7 & Dragon #122 Table 1",
    description: "A god, demigod, or pantheonic immortal locked into a mortal shell on the Earth Dimension (e.g. Thor, Hercules, Snowbird).",
    abilityMods: { F: 2, A: 2, S: 2, E: 2, R: 2, I: 2, P: 2 }, // UPB p. 7: "All primary abilities are raised +2CS."
    columnAssignment: 5, // UPB p. 7 & Dragon #122 Table 1: Column 5
    powerSlots: { min: 2, max: 8, default: 4 },
    powerSlotsModifier: 2, // UPB p. 7: "Deities gain two additional Powers."
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    popularityShift: 2, // UPB p. 7: "Deities have increased Popularity (+2CS) with the public"
    innatePowers: [
      {
        code: "P10",
        name: "Self-Revival",
        rankName: "Unearthly",
        rankValue: 100,
        notes: "Innate Deity immortality / non-permanent Earth death (UPB p. 7)"
      },
      {
        code: "T3",
        name: "Dimension Travel",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Deity travel power (UPB p. 7)"
      }
    ],
    specialRules: "Rolls on Column 5. All 7 Primary Abilities are raised +2CS. Gains +2 additional Powers (and at least 1 Travel Power). Gains +2CS Popularity with the public. Cannot permanently die in the Earth Dimension unless slain by another Deity."
  },
  {
    id: "compound_being",
    name: "Compound Form",
    category: "Hybrid",
    source: "Ultimate Powers Book pp. 9–10",
    description: "A unique hybrid body containing aspects of two to five distinct Body Types merged together.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    abilityChoice: {
      count: 1,
      shift: 1,
      allowed: ["fighting", "agility", "strength", "endurance", "reason", "intuition", "psyche"],
      label: "+1CS Retained Aspect Ability Bonus"
    },
    columnAssignment: 2,
    powerSlots: { min: 1, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    popularityShift: -1, // UPB p. 10: "Popularity is decreased -1CS"
    specialRules: "Combines advantages and disadvantages of 2–5 Body Types. Popularity is decreased -1CS."
  },
  {
    id: "changeling",
    name: "Changeling / Multi-Aspect",
    category: "Metahuman",
    source: "Ultimate Powers Book p. 10",
    description: "A hero capable of transforming between 2 to 5 distinct Body Type Aspects, each with its own unique Power.",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 5, // UPB p. 10: "Changelings roll on column 5, regardless of what the various Aspects would roll on."
    powerSlots: { min: 2, max: 6, default: 3 },
    powerSlotsModifier: 0,
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    innatePowers: [
      {
        code: "S18",
        name: "Imitation-Human Changeling",
        rankName: "Good",
        rankValue: 10,
        notes: "Innate Changeling metamorphic aspect transformation (UPB p. 10)"
      }
    ],
    specialRules: "Rolls on Column 5. Can transform between 2–5 Body Type Aspects in 10 turns (during transformation, no Powers function and all Primary Abilities drop -2CS)."
  }
];

/**
 * Authoritative UPB Table 1: Physical Form Roll Table (d100)
 * Verbatim percentile ranges from UPB p. 3 and Dragon #122 Table 1 Column Assignments.
 */
const UP_PHYSICAL_FORMS_ROLL_TABLE = [
  { min: 1,  max: 25, id: "normal_human",               name: "Normal Human (Standard)",              column: 2 },
  { min: 26, max: 30, id: "mutant_induced",             name: "Mutant (Induced)",                     column: 1 },
  { min: 31, max: 33, id: "mutant_random",              name: "Mutant (Random)",                      column: 1 },
  { min: 34, max: 35, id: "mutant_breed",               name: "Mutant (Breed)",                       column: 1 },
  { min: 36, max: 38, id: "android",                    name: "Android / Synthezoid",                 column: 4 },
  { min: 39, max: 46, id: "alien_humanoid",             name: "Humanoid Race",                        column: 5 },
  { min: 47, max: 47, id: "modified_human_surgical",    name: "Surgical Composite",                   column: 2 },
  { min: 48, max: 49, id: "modified_human_organic",     name: "Modified Human (Organic)",             column: 1 },
  { min: 50, max: 51, id: "modified_human_muscular",    name: "Modified Human (Muscular)",            column: 1 },
  { min: 52, max: 53, id: "modified_human_skeletal",    name: "Modified Human (Skeletal)",            column: 1 },
  { min: 54, max: 57, id: "modified_human_extra_parts", name: "Modified Human (Extra Parts)",         column: 2 },
  { min: 58, max: 58, id: "centaur",                    name: "Demihuman: Centaur",                   column: 5 },
  { min: 59, max: 59, id: "equiman",                    name: "Demihuman: Equiman",                   column: 3 },
  { min: 60, max: 60, id: "faun",                       name: "Demihuman: Faun / Satyr",              column: 2 },
  { min: 61, max: 62, id: "felinoid",                   name: "Demihuman: Felinoid (Cat-Person)",     column: 1 },
  { min: 63, max: 64, id: "lupinoid",                   name: "Demihuman: Lupinoid (Wolf-Person)",    column: 4 },
  { min: 65, max: 65, id: "avian_angelic",              name: "Demihuman: Avian (Angelic)",           column: 3 },
  { min: 66, max: 66, id: "avian_harpy",                name: "Demihuman: Avian (Harpy)",             column: 2 },
  { min: 67, max: 67, id: "chiropteran",                name: "Demihuman: Chiropteran (Bat-Form)",    column: 2 },
  { min: 68, max: 68, id: "lamian",                     name: "Demihuman: Lamian (Snake-Form)",       column: 3 },
  { min: 69, max: 69, id: "merhuman",                   name: "Demihuman: Merhuman (Aquatic)",        column: 2 },
  { min: 70, max: 70, id: "demihuman",                  name: "Demihuman: Other / Sub-Terran",        column: 3 },
  { min: 71, max: 72, id: "cyborg_limbs",               name: "Cyborg (Artificial Limbs / Organs)",   column: 2 },
  { min: 73, max: 74, id: "cyborg_exoskeleton",         name: "Cyborg (Exoskeleton)",                 column: 2 },
  { min: 75, max: 76, id: "cyborg_mech_body",           name: "Cyborg (Mechanical Body)",             column: 4 },
  { min: 77, max: 79, id: "cyborg_augmented",           name: "Cyborg (Mechanically Augmented)",      column: 3 },
  { min: 80, max: 82, id: "robot_human_shape",          name: "Robot (Humanshape)",                   column: 4 },
  { min: 83, max: 84, id: "robot_usuform",              name: "Robot (Usuform)",                      column: 4 },
  { min: 85, max: 86, id: "robot_metamorphic",          name: "Robot (Metamorphic)",                  column: 4 },
  { min: 87, max: 87, id: "robot_computer",             name: "Robot (Sentient Computer)",            column: 4 },
  { min: 88, max: 88, id: "angel_demon",                name: "Angel / Demon",                        column: 5 },
  { min: 89, max: 89, id: "deity",                      name: "Deity / Pantheonic God",               column: 5 },
  { min: 90, max: 90, id: "animal",                     name: "Animal (Intelligent Beast)",           column: 1 },
  { min: 91, max: 91, id: "vegetable",                  name: "Vegetable Form (Plant-Life)",          column: 1 },
  { min: 92, max: 92, id: "abnormal_chemistry",         name: "Abnormal Biochemistry",                column: 2 },
  { min: 93, max: 93, id: "mineral",                    name: "Mineral Life",                         column: 2 },
  { min: 94, max: 94, id: "gaseous",                    name: "Gaseous Life",                         column: 5 },
  { min: 95, max: 95, id: "liquid",                     name: "Liquid Life",                          column: 5 },
  { min: 96, max: 96, id: "energy_being",               name: "Energy Body",                          column: 5 },
  { min: 97, max: 97, id: "ethereal",                   name: "Ethereal / Astral Spirit",             column: 1 },
  { min: 98, max: 98, id: "undead",                     name: "Undead",                               column: 1 },
  { min: 99, max: 99, id: "compound_being",             name: "Compound Form",                        column: 2 },
  { min: 100,max: 100,id: "changeling",                 name: "Changeling",                           column: 5 }
];

/**
 * Roll a physical form using canonical UPB Table 1 rules (1d100).
 * @param {number|null} forcedRoll Optional forced dice roll (1-100)
 * @returns {object} Rolled physical form definition with roll number
 */
function rollUpPhysicalForm(forcedRoll = null) {
  const roll = (typeof forcedRoll === 'number' && forcedRoll >= 1 && forcedRoll <= 100)
    ? forcedRoll
    : Math.floor(Math.random() * 100) + 1;
  const match = UP_PHYSICAL_FORMS_ROLL_TABLE.find(o => roll >= o.min && roll <= o.max) || UP_PHYSICAL_FORMS_ROLL_TABLE[0];
  const fullForm = PHYSICAL_FORMS.find(f => f.id === match.id) || PHYSICAL_FORMS[0];
  return {
    roll,
    ...fullForm,
    column: match.column || fullForm.columnAssignment,
    mentalColumn: match.mentalColumn || fullForm.mentalColumn || match.column || fullForm.columnAssignment
  };
}

const MSH_PHYSICAL_FORMS = {};
PHYSICAL_FORMS.forEach(f => {
  MSH_PHYSICAL_FORMS[f.id] = f;
});

// Backward-compatible alias mappings
MSH_PHYSICAL_FORMS['swarm_collective'] = MSH_PHYSICAL_FORMS['s32_collective_mass'];
MSH_PHYSICAL_FORMS['supernatural_deity'] = MSH_PHYSICAL_FORMS['deity'];

if (typeof globalThis !== 'undefined') {
  globalThis.PHYSICAL_FORMS = PHYSICAL_FORMS;
  globalThis.MSH_PHYSICAL_FORMS = MSH_PHYSICAL_FORMS;
  globalThis.UP_PHYSICAL_FORMS_ROLL_TABLE = UP_PHYSICAL_FORMS_ROLL_TABLE;
  globalThis.rollUpPhysicalForm = rollUpPhysicalForm;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PHYSICAL_FORMS,
    MSH_PHYSICAL_FORMS,
    UP_PHYSICAL_FORMS_ROLL_TABLE,
    rollUpPhysicalForm
  };
}

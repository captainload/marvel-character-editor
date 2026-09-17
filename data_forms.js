/**
 * Marvel Super Heroes (FASERIP) - Physical Forms & Origins Database
 * Authoritative integration of UPB Physical Forms, Dragon #122 Column Errata,
 * and Dragon #134 S32 Collective Mass (Swarm Form).
 */

const PHYSICAL_FORMS = [
  {
    id: "normal_human",
    name: "Normal Human",
    category: "Standard",
    description: "A standard baseline human relying on extreme training, technology, or exceptional natural skill (e.g. Hawkeye, Black Widow).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 },
    columnAssignment: 2, // 1991 standard
    powerSlots: { min: 0, max: 2, default: 1 },
    talentBonus: 2,
    contactsBonus: 2,
    resourcesBase: "Typical",
    specialRules: "May not roll innate superpowers unless granted by equipment, chemical alteration, or magical pacts."
  },
  {
    id: "mutant",
    name: "Mutant (Homo Superior)",
    category: "Metahuman",
    description: "Born with the X-factor gene that manifests superhuman abilities, typically triggered during adolescence (e.g. Cyclops, Storm, Wolverine).",
    abilityMods: { F: 0, A: 0, S: 0, E: 1, R: 0, I: 0, P: 0 }, // +1CS to Endurance
    columnAssignment: 2,
    powerSlots: { min: 1, max: 6, default: 3 },
    talentBonus: 0,
    contactsBonus: 1,
    resourcesBase: "Typical",
    popularityPenalty: -5,
    specialRules: "Suffers -5 Popularity when interacting with anti-mutant groups or Sentinels. Registered under mutant detection powers."
  },
  {
    id: "altered_human",
    name: "Altered Human",
    category: "Metahuman",
    description: "A normal human physically or genetically transformed by an external catalyst, such as radiation, chemical serum, or lab accident (e.g. Spider-Man, Captain America, Hulk).",
    abilityMods: { F: 0, A: 0, S: 0, E: 0, R: 0, I: 0, P: 0 }, // May add +1CS to any one physical stat
    columnAssignment: 2,
    powerSlots: { min: 1, max: 5, default: 3 },
    talentBonus: 1,
    contactsBonus: 1,
    resourcesBase: "Typical",
    specialRules: "Player may choose +1CS to any one physical ability (Fighting, Agility, Strength, or Endurance)."
  },
  {
    id: "high_human",
    name: "High Human",
    category: "Metahuman",
    description: "A human lineage enhanced by genetic isolation, artificial evolution, or evolutionary divergence (e.g. Inhumans, Eternals).",
    abilityMods: { F: 1, A: 1, S: 1, E: 1, R: 1, I: 0, P: 0 },
    columnAssignment: 3,
    powerSlots: { min: 1, max: 5, default: 2 },
    talentBonus: 1,
    contactsBonus: 1,
    resourcesBase: "Good",
    specialRules: "All physical abilities begin at Good (10) minimum before rolling."
  },
  {
    id: "cyborg",
    name: "Cyborg",
    category: "Cybernetic",
    description: "A living human augmented with biomechanical prosthetics, artificial organs, or cybernetic weaponry (e.g. Deathlok, Cable).",
    abilityMods: { F: 0, A: 0, S: 1, E: 1, R: 0, I: 0, P: 0 },
    columnAssignment: 2,
    powerSlots: { min: 1, max: 6, default: 3 },
    talentBonus: 1,
    contactsBonus: 1,
    resourcesBase: "Typical",
    specialRules: "At least 1 power must be designated as a mechanical implant or cybernetic subsystem. Vulnerable to Electrical & Magnetic attacks (+1CS damage to Cyborg)."
  },
  {
    id: "robot_android",
    name: "Robot / Android / Synthezoid",
    category: "Artificial",
    description: "An artificial construct of metal, polymers, or synthetic tissue possessing an artificial consciousness (e.g. Vision, Ultron, Machine Man).",
    abilityMods: { F: 0, A: 0, S: 1, E: 2, R: 1, I: 0, P: -1 },
    columnAssignment: 3,
    powerSlots: { min: 2, max: 8, default: 4 },
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Poor",
    specialRules: "Immune to biological toxins, disease, and aging. Does not have biological Health recovery; requires mechanical repair. Immune to mental attacks targeting organic brains."
  },
  {
    id: "alien",
    name: "Alien (Extraterrestrial)",
    category: "Extraterrestrial",
    description: "A being native to another planet or solar system, possessing unique xenobiology and technology (e.g. Silver Surfer, Mar-Vell, Beta Ray Bill).",
    abilityMods: { F: 1, A: 0, S: 1, E: 1, R: 0, I: 0, P: 0 },
    columnAssignment: 3,
    powerSlots: { min: 1, max: 6, default: 3 },
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    specialRules: "Starts with 0 Earth contacts unless integrated into an organization (e.g. Guardians of the Galaxy, Starjammers)."
  },
  {
    id: "energy_being",
    name: "Energy Being",
    category: "Energy / Astral",
    description: "A being whose primary physical manifestation is coherent plasma, radiation, light, or cosmic force, often requiring a containment suit (e.g. Wonder Man, Monica Rambeau, Living Laser).",
    abilityMods: { F: -1, A: 1, S: -1, E: 2, R: 0, I: 0, P: 1 },
    columnAssignment: 4,
    powerSlots: { min: 2, max: 6, default: 4 },
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Typical",
    specialRules: "Naturally immune to blunt physical blows and standard asphyxiation. Disruption of containment causes power leakage or dispersal."
  },
  {
    id: "demihuman",
    name: "Demihuman / Sub-Terran / Atlantean",
    category: "Earth Divergent",
    description: "Adapted for non-surface environments such as deep ocean trenches or underground subterranean caverns (e.g. Namor, Moloids).",
    abilityMods: { F: 0, A: 0, S: 2, E: 2, R: 0, I: 0, P: 0 },
    columnAssignment: 3,
    powerSlots: { min: 1, max: 4, default: 2 },
    talentBonus: 0,
    contactsBonus: 1,
    resourcesBase: "Good",
    specialRules: "Includes water-breathing and swimming powers natively. Requires periodic immersion or moisture to prevent dehydration."
  },
  {
    id: "centaur_faun",
    name: "Centaur / Mythological Hybrid",
    category: "Mythological",
    description: "A hybrid physical form combining equine or faun biology with humanoid upper anatomy (Dragon #122 Table 1 errata).",
    abilityMods: { F: 1, A: 0, S: 2, E: 2, R: 0, I: 0, P: 0 },
    columnAssignment: 5, // Dragon #122 Table 1
    powerSlots: { min: 1, max: 4, default: 2 },
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Poor",
    specialRules: "Gains +2CS ground movement speed. Takes up 2 areas of space when maneuvering."
  },
  {
    id: "avian_angelic",
    name: "Avian (Angelic / Harpy)",
    category: "Winged",
    description: "Possesses hollow bone structure, aerodynamic torso, and large feathered or leathery wings capable of flight (e.g. Archangel, Falcon, Vulture).",
    abilityMods: { F: 0, A: 2, S: 0, E: 1, R: 0, I: 0, P: 0 },
    columnAssignment: 3, // Dragon #122 Table 1
    powerSlots: { min: 1, max: 4, default: 2 },
    talentBonus: 0,
    contactsBonus: 1,
    resourcesBase: "Typical",
    specialRules: "Gains Flight automatically at Excellent (20) rank or higher. Suffers -1CS to Strength when lifting while airborne."
  },

  // --- S32 COLLECTIVE MASS (DRAGON MAGAZINE #134) ---
  {
    id: "s32_collective_mass",
    name: "S32 - Collective Mass (Swarm Form)",
    category: "Gestalt / Swarm",
    code: "S32",
    source: "Dragon Magazine #134 (June 1988), pp. 89-91",
    author: "Tom Lamphier & David Edward Martin",
    description: "A variation of the Physical Gestalt form modeled after the villain Swarm. The character's body consists of thousands of living organisms (bees, spiders, nanites, nano-spores) held tightly together by a singular hive consciousness to function as a unified entity.",
    abilityMods: { F: 0, A: 0, S: 0, E: 2, R: 0, I: 0, P: 2 },
    columnAssignment: 3,
    powerSlots: { min: 2, max: 6, default: 3 },
    talentBonus: 0,
    contactsBonus: 0,
    resourcesBase: "Poor",
    isDualProfile: true, // Requires separate component vs collective stats
    specialRules: [
      "+2CS Resistance to Physical and Directed Energy attacks (attacks pass harmlessly through dispersed components).",
      "Requires tracking dual abilities: Component Stats (individual organism, e.g. Feeble 2) and Collective Mass Stats (full swarm).",
      "Components can disperse through any aperture or crack that an individual unit can navigate.",
      "Most powers can only be manifested by the Collective Mass; individual units are limited to Feeble rank.",
      "Must occasionally break apart to allow component units to feed.",
      "Can mimic a humanoid silhouette with a Psyche FEAT, though a disguise/clothing is required to conceal the individual bodies."
    ]
  }
];

const MSH_PHYSICAL_FORMS = {};
PHYSICAL_FORMS.forEach(f => {
  MSH_PHYSICAL_FORMS[f.id] = f;
  if (f.id === 's32_collective_mass') {
    MSH_PHYSICAL_FORMS['swarm_collective'] = f;
  }
});

if (typeof globalThis !== 'undefined') {
  globalThis.PHYSICAL_FORMS = PHYSICAL_FORMS;
  globalThis.MSH_PHYSICAL_FORMS = MSH_PHYSICAL_FORMS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PHYSICAL_FORMS, MSH_PHYSICAL_FORMS };
}


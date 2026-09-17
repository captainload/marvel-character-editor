/**
 * Marvel Super Heroes (FASERIP) - Official TSR Talents Database
 * Sources: Advanced Set Player's Book (TSR 6876, p. 10, 15-16, 89-91),
 * Realms of Magic (TSR 6870), and Weapons Locker (TSR 6884, p. 28).
 * All non-TSR fanbook entries have been strictly eliminated.
 */

const TALENTS_CATALOG = [
  // ==========================================
  // 1. WEAPON SKILLS (Player's Book p. 10, 15, 89)
  // ==========================================
  {
    id: "t_wep_blunt",
    name: "Blunt Weapons",
    category: "Weapon Skills",
    costCP: 10,
    statAffected: "Fighting",
    csBonus: 1,
    description: "Proficiency with bludgeoning melee weapons (clubs, maces, staves, warhammers, flails). +1CS to hit when resolving attacks on the Blunt Attacks column.",
    source: "Player's Book p. 15, 89"
  },
  {
    id: "t_wep_edged",
    name: "Edged / Sharp Weapons",
    category: "Weapon Skills",
    costCP: 10,
    statAffected: "Fighting",
    csBonus: 1,
    description: "Mastery of edged, sharp, and slashing weapons (swords, daggers, spears, axes; excludes claws and natural bodily extensions). +1CS to hit on the Edged Attack column.",
    source: "Player's Book p. 15, 89"
  },
  {
    id: "t_wep_thrown",
    name: "Thrown Weapons",
    category: "Weapon Skills",
    costCP: 10,
    statAffected: "Agility",
    csBonus: 1,
    description: "Expertise with items designed specifically for throwing (spears, daggers, shuriken, disks, darts). +1CS to Agility on thrown weapon attack rolls.",
    source: "Player's Book p. 15, 89"
  },
  {
    id: "t_wep_bows",
    name: "Bows",
    category: "Weapon Skills",
    costCP: 10,
    statAffected: "Agility",
    csBonus: 1,
    description: "Untrained archers fire at -1CS to Agility. Characters with this Talent gain +1CS to hit with all bows and crossbows, may fire and reload in a single round, and may fire multiple arrows on an Agility FEAT.",
    source: "Player's Book p. 15, 89"
  },
  {
    id: "t_wep_guns",
    name: "Firearms (Guns)",
    category: "Weapon Skills",
    costCP: 10,
    statAffected: "Agility",
    csBonus: 1,
    description: "Proficiency with handguns, rifles, shotguns, submachine guns, and energy firearms (laser, stun, concussion). +1CS to Agility on firearm shooting attacks.",
    source: "Player's Book p. 15, 89"
  },
  {
    id: "t_wep_oriental",
    name: "Oriental Weapons",
    category: "Weapon Skills",
    costCP: 10,
    statAffected: "Fighting / Agility",
    csBonus: 1,
    description: "Specialized training with traditional Eastern weaponry: shuriken, crossbows, sais (treated as swords), and oriental swords/daggers (katana, wakizashi, kris). +1CS to Fighting or Agility when wielding them.",
    source: "Player's Book p. 10, 89"
  },
  {
    id: "t_wep_marksman",
    isStarred: true,
    slots: 2,
    name: "Marksman",
    category: "Weapon Skills",
    costCP: 20,
    statAffected: "Agility",
    csBonus: 1,
    description: "Counts as 2 talent slots. Supreme ranged precision. Grants +1CS to hit with any distance weapon requiring line of sight (firearms, bows, thrown weapons, heavy artillery), and negates all range penalties to hit.",
    source: "Player's Book p. 10, 89"
  },
  {
    id: "t_wep_master",
    isStarred: true,
    slots: 2,
    name: "Weapons Master",
    category: "Weapon Skills",
    costCP: 20,
    statAffected: "Fighting",
    csBonus: 1,
    description: "Counts as 2 talent slots. Comprehensive mastery across all melee weapon families. Grants +1CS to hit with any hand weapon that requires a Fighting FEAT.",
    source: "Player's Book p. 10, 89"
  },
  {
    id: "t_wep_spec",
    isStarred: true,
    slots: 2,
    allowsSpecialization: true,
    specPlaceholder: "Chosen weapon (e.g. Captain America's Shield, Bow, Katana)",
    name: "Weapon Specialist",
    category: "Weapon Skills",
    costCP: 20,
    statAffected: "Fighting / Agility",
    csBonus: 2,
    description: "Counts as 2 talent slots. Intense lifelong devotion to a single chosen weapon (e.g., Captain America's Shield, Hawkeye's Bow, Thor's Hammer). Grants +2CS to attack rolls with that weapon and +1 to initiative when using it.",
    source: "Player's Book p. 10, 89"
  },

  // ==========================================
  // 2. FIGHTING SKILLS (Player's Book p. 10, 15, 89-90)
  // ==========================================
  {
    id: "t_fight_ma_a",
    name: "Martial Arts A",
    category: "Fighting Skills",
    costCP: 10,
    statAffected: "Fighting",
    csBonus: 1,
    description: "Eastern martial disciplines using an opponent's strength and momentum against them (Judo, Karate). The hero can Stun or Slam an opponent regardless of comparative Strengths and Endurances.",
    source: "Player's Book p. 10, 89"
  },
  {
    id: "t_fight_ma_b",
    name: "Martial Arts B",
    category: "Fighting Skills",
    costCP: 10,
    statAffected: "Fighting",
    csBonus: 1,
    description: "Offense-focused unarmed striking arts (Boxing, Kickboxing, Karate). Concentrates on inflicting rapid, damaging blows. Grants +1CS to Fighting when engaged in unarmed combat.",
    source: "Player's Book p. 10, 89"
  },
  {
    id: "t_fight_ma_c",
    name: "Martial Arts C",
    category: "Fighting Skills",
    costCP: 10,
    statAffected: "Strength / Agility",
    csBonus: 1,
    description: "Defensive grappling, joint locks, and redirection (Aikido, Jujutsu). Grants +1CS to Strength for Grappling attacks and damage, +1CS to Strength for Escaping, and +1CS to Agility for Dodging.",
    source: "Player's Book p. 10, 89"
  },
  {
    id: "t_fight_ma_d",
    name: "Martial Arts D",
    category: "Fighting Skills",
    costCP: 10,
    statAffected: "Fighting",
    csBonus: 1,
    description: "Meditative pressure-point nerve strikes. The practitioner's unarmed strikes ignore the target's Body Armor (though not force fields) for Stun and Slam checks, provided the target was observed in battle for 2 preceding rounds.",
    source: "Player's Book p. 10, 89"
  },
  {
    id: "t_fight_ma_e",
    name: "Martial Arts E",
    category: "Fighting Skills",
    costCP: 10,
    statAffected: "Initiative",
    csBonus: 1,
    description: "Lightning reflexes and anticipation in close quarters. Grants a +1 bonus to all combat Initiative rolls when engaged in unarmed hand-to-hand combat.",
    source: "Player's Book p. 10, 89"
  },
  {
    id: "t_fight_wrest",
    name: "Wrestling",
    category: "Fighting Skills",
    costCP: 10,
    statAffected: "Strength",
    csBonus: 2,
    description: "Proficiency in competitive, Olympic, and sumo grappling holds. Grants +2CS to hit when making Grappling attacks. If combined with Martial Arts B, provides +3CS to hit in grappling and +1CS for damage.",
    source: "Player's Book p. 10, 89"
  },
  {
    id: "t_fight_thrown_obj",
    name: "Thrown Objects",
    category: "Fighting Skills",
    costCP: 10,
    statAffected: "Agility",
    csBonus: 1,
    description: "Expertise with throwing and catching improvised objects and battlefield debris. Grants +1CS with all Throwing attacks (both Edged and Blunt) and +1CS on Catching. Cumulative with Thrown Weapons (+2CS total with thrown weapons).",
    source: "Player's Book p. 10, 89"
  },
  {
    id: "t_fight_acro",
    name: "Acrobatics",
    category: "Fighting Skills",
    costCP: 10,
    statAffected: "Agility",
    csBonus: 1,
    description: "Gymnastic flexibility and evasive maneuverability. Grants +1CS to Agility on all Dodging, Evading, and Escaping rolls.",
    source: "Player's Book p. 10, 89"
  },
  {
    id: "t_fight_tumb",
    name: "Tumbling",
    category: "Fighting Skills",
    costCP: 10,
    statAffected: "Agility",
    csBonus: 1,
    description: "Kinetic dissipation and break-fall technique. An Agility FEAT allows landing feet-first without injury after any fall that does not inflict lethal damage.",
    source: "Player's Book p. 10, 89"
  },

  // ==========================================
  // 3. PROFESSIONAL SKILLS (Player's Book p. 10, 16, 90)
  // ==========================================
  {
    id: "t_prof_med",
    isStarred: true,
    slots: 2,
    name: "Medicine",
    category: "Professional Skills",
    costCP: 20,
    statAffected: "Reason",
    csBonus: 1,
    description: "Counts as 2 talent slots. Comprehensive medical knowledge and trauma healing. Halts Endurance loss for dying heroes, can revive Shift 0 victims up to 20 turns after collapse, restores 1 Endurance rank/week beyond natural healing, and grants +1CS to Reason on medical, pharmacological, and surgical FEATs. Provides a Medical Contact.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_prof_law",
    allowsSpecialization: true,
    specPlaceholder: "Legal field (e.g. Criminal, Corporate, Superhuman Rights)",
    name: "Law",
    category: "Professional Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Extensive background in legal codes, judicial procedure, and courtroom advocacy. +1CS to Reason on all FEAT rolls involving the law. Passing the bar requires a Good Reason FEAT. Provides a Legal Contact.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_prof_law_enf",
    isStarred: true,
    slots: 2,
    name: "Law Enforcement",
    category: "Professional Skills",
    costCP: 20,
    statAffected: "Fighting / Reason / Agility",
    csBonus: 1,
    description: "Counts as 2 talent slots. Police academy and federal agency training. Automatically includes both Firearms (Guns) and Law talents. Active officers may legally carry concealed weapons and execute arrests. Provides a Police Contact.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_prof_pilot",
    allowsSpecialization: true,
    specPlaceholder: "Aircraft class (e.g. Helicopters, Jet Fighters, Propeller, VTOL)",
    name: "Pilot",
    category: "Professional Skills",
    costCP: 10,
    statAffected: "Agility / Reason",
    csBonus: 1,
    description: "Flight operations and control of conventional aircraft, jets, and helicopters (or spacecraft if permitted by background). +1CS on all Control, Agility, and Reason FEATs involving aircraft.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_prof_military",
    allowsSpecialization: true,
    specPlaceholder: "Branch or specialty (e.g. Special Forces, Navy SEALs, Intelligence)",
    name: "Military",
    category: "Professional Skills",
    costCP: 10,
    statAffected: "Reason / Intuition",
    csBonus: 1,
    description: "Military doctrine, small unit tactics, battlefield command, and ordnance. +1CS to all FEAT rolls involving military matters. Grants a Contact in the armed services.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_prof_business",
    name: "Business / Finance",
    category: "Professional Skills",
    costCP: 10,
    statAffected: "Reason / Resources",
    csBonus: 1,
    description: "Corporate commerce, investment banking, stock trading, and corporate law. Guarantees minimum starting Resources of Good (10). +1CS to FEAT rolls dealing with money and finance. Grants a Business Contact.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_prof_journalism",
    name: "Journalism",
    category: "Professional Skills",
    costCP: 10,
    statAffected: "Reason / Intuition",
    csBonus: 1,
    description: "Investigative reporting, mass media broadcasting, and press relations. Grants 2 additional Contacts connected with news organizations, print media, television, or street-level informants.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_prof_engineering",
    allowsSpecialization: true,
    specPlaceholder: "Engineering branch (e.g. Mechanical, Electrical, Civil, Aerospace)",
    name: "Engineering",
    category: "Professional Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Design, structural analysis, and synthesis of functional physical systems (civil, mechanical, chemical). +1CS to all FEATs involving building items, including Resource FEATs to determine if an invention can be manufactured. Provides an Engineering Contact.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_prof_criminology",
    name: "Criminology",
    category: "Professional Skills",
    costCP: 10,
    statAffected: "Reason / Intuition",
    csBonus: 1,
    description: "Behavioral analysis of the criminal mind, forensic modus operandi profiling, and illicit trade methods. +1CS on all Reason and Intuition FEATs involving criminal practices. Provides a Contact in police or crime.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_prof_psychiatry",
    name: "Psychiatry",
    category: "Professional Skills",
    costCP: 10,
    statAffected: "Reason / Psyche",
    csBonus: 1,
    description: "Clinical study of human and metahuman mental processes. Grants +1CS on all FEATs involving mental powers (Mental Control, Domination, Hypnosis, Emotion Control, and Mental Probe). Provides a Psychiatry Contact.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_prof_detective",
    name: "Detective / Espionage",
    category: "Professional Skills",
    costCP: 10,
    statAffected: "Intuition / Reason",
    csBonus: 1,
    description: "Forensic crime scene investigation, surveillance, undercover tradecraft, and clue discovery. +1CS to discover clues to crimes. Provides a Contact in crime, law enforcement, law, or espionage.",
    source: "Player's Book p. 10, 90"
  },

  // ==========================================
  // 4. SCIENTIFIC SKILLS (Player's Book p. 10, 16, 90)
  // ==========================================
  {
    id: "t_sci_chem",
    name: "Chemistry",
    category: "Scientific Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Inorganic and organic chemical synthesis, antidote development for inorganic poisons, and chemical identification by smell, touch, or taste. +1CS to Reason on chemical research.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_sci_bio",
    name: "Biology",
    category: "Scientific Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Study of living organisms, flora and fauna identification, research into biological pathogens, and developing cures for organic poisons and diseases. +1CS to Reason.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_sci_geo",
    name: "Geology",
    category: "Scientific Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Earth sciences, volcanology, seismology, subterranean topography, mineral identification, and rock strata analysis. +1CS to Reason on geological phenomena.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_sci_gen",
    name: "Genetics",
    category: "Scientific Skills",
    costCP: 15,
    statAffected: "Reason",
    csBonus: 1,
    description: "Metahuman genetics, cellular biology, mutant DNA, cloning, genetic splicing, and hereditary disease research. +1CS to Reason on genetic science.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_sci_arch",
    name: "Archaeology",
    category: "Scientific Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Antiquities, paleontology, excavation of ancient ruins, deciphering dead scripts, historical records, and ancient myths. +1CS to Reason on archaeological discoveries.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_sci_phys",
    allowsSpecialization: true,
    specPlaceholder: "Physics field (e.g. Astrophysics, Quantum, Particle, Nuclear)",
    name: "Physics",
    category: "Scientific Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Theoretical, classical, and astrophysics: kinematics, planetary motion, gravity, orbital dynamics, and energy spectra. +1CS to Reason on physics problems.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_sci_comp",
    name: "Computers",
    category: "Scientific Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Computer hardware architecture, software programming, mainframe networks, cybersecurity, hacking, and artificial intelligence interfaces. +1CS to Reason on computer systems.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_sci_elec",
    name: "Electronics",
    category: "Scientific Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Solid-state circuitry, microelectronics, sensor arrays, avionics, radar, and signal processing hardware. +1CS to Reason on creating and repairing electronic hardware.",
    source: "Player's Book p. 10, 90"
  },

  // ==========================================
  // 5. MYSTIC & MENTAL SKILLS (Player's Book p. 10, 16, 90-91; Realms of Magic)
  // ==========================================
  {
    id: "t_mystic_trance",
    name: "Trance",
    category: "Mystic and Mental Skills",
    costCP: 10,
    statAffected: "Endurance / Psyche",
    csBonus: 1,
    description: "Placing oneself in a suspended animation trance. Bodily functions slow to appear completely dead (Intuition FEAT to detect life). Reduces food and water needs to near zero and restores Endurance ranks at 1 rank per day.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_mystic_hypnosis",
    name: "Mesmerism and Hypnosis",
    category: "Mystic and Mental Skills",
    costCP: 10,
    statAffected: "Reason / Psyche",
    csBonus: 1,
    description: "Primitive mental control with Power rank equal to Reason. Extracts hidden memories as per Mental Probe, or implants post-hypnotic commands lasting 1-10 hours. Commands violating morals break the trance immediately.",
    source: "Player's Book p. 10, 90"
  },
  {
    id: "t_mystic_sleight",
    name: "Sleight of Hand",
    category: "Mystic and Mental Skills",
    costCP: 10,
    statAffected: "Agility",
    csBonus: 1,
    description: "Stage magician misdirection, palm concealment, and rapid digital dexterity. Makes small items appear or disappear with Agility +1CS.",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_mystic_resist",
    name: "Resist Domination",
    category: "Mystic and Mental Skills",
    costCP: 10,
    statAffected: "Psyche",
    csBonus: 1,
    description: "Inherent psychological and mental discipline acting as a natural Psi-Screen. The character resists all mental and telepathic attacks as if possessing Psyche +1CS.",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_mystic_occult",
    name: "Occult Lore",
    category: "Mystic and Mental Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Knowledge of ancient grimoires, occult societies, runes, artifacts, dimensional entities, and supernatural lore. +1CS to Reason on magical matters. Provides a Mystic Contact.",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_mystic_background",
    isStarred: true,
    slots: 2,
    name: "Mystic Background",
    category: "Mystic and Mental Skills",
    costCP: 20,
    statAffected: "Psyche",
    csBonus: 1,
    description: "Counts as 2 talent slots. Formal initiation into the sorcerous arts per Realms of Magic. Enables the hero to cast spells (Personal, Universal, Dimensional energies) with Judge approval. +1CS to Psyche for spellcasting.",
    source: "Player's Book p. 10, 91; Realms of Magic"
  },

  // ==========================================
  // 6. OTHER SKILLS (Player's Book p. 10, 16, 91)
  // ==========================================
  {
    id: "t_other_artist",
    allowsSpecialization: true,
    specPlaceholder: "Artistic medium (e.g. Painting, Sculpture, Writing, Illustration)",
    name: "Artist",
    category: "Other Skills",
    costCP: 10,
    statAffected: "Reason / Agility",
    csBonus: 1,
    description: "Creating fine visual art, sculpture, or literature. A completed work takes 1-10 weeks of daily devotion and awards Karma equal to 10 × number of weeks spent. Provides an Artist Contact.",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_other_languages",
    allowsSpecialization: true,
    specPlaceholder: "Languages spoken (e.g. French, German, Japanese, Sign Language)",
    name: "Languages",
    category: "Other Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Linguistic gift. Gains 1 additional fluent language at character creation, and may learn future languages at half standard cost (500 Karma points).",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_other_first_aid",
    name: "First Aid",
    category: "Other Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Field emergency stabilization. Halts Endurance rank loss immediately, recovers 1 Endurance rank immediately (once per situation), and stabilizes dying heroes at Shift 0 Health up to 5 rounds after collapse.",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_other_tinkering",
    name: "Repair / Tinkering",
    category: "Other Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Practical jury-rigging and modification of existing mechanical or electronic devices. +1CS to Reason on repair FEATs (cumulative with Engineering for +2CS total).",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_other_trivia",
    allowsSpecialization: true,
    specPlaceholder: "Trivia subject (e.g. 20th Century Pop Culture, Super-Hero Lore)",
    name: "Trivia",
    category: "Other Skills",
    costCP: 10,
    statAffected: "Reason",
    csBonus: 1,
    description: "Deep encyclopedic mastery of one specific chosen topic (e.g., comic books, sports statistics, military history, classic cinema). +1CS to Reason on that topic.",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_other_performer",
    allowsSpecialization: true,
    specPlaceholder: "Performance field (e.g. Acting, Singing, Dance, Stage Magic)",
    name: "Performer",
    category: "Other Skills",
    costCP: 10,
    statAffected: "Agility / Intuition",
    csBonus: 1,
    description: "Stage acting, music, dance, or public entertainment. Awards 10 Karma points for each week of public performance. Provides a Performer Contact.",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_other_animal",
    isStarred: true,
    slots: 2,
    allowsSpecialization: true,
    specPlaceholder: "Animal family (e.g. Canines, Birds of Prey, Big Cats)",
    name: "Animal Training",
    category: "Other Skills",
    costCP: 20,
    statAffected: "Reason",
    csBonus: 1,
    description: "Counts as 2 talent slots. Conditioning animals to perform complex tricks and commands on a Reason FEAT. If the hero possesses Animal Empathy or Animal Control, those powers are raised by +1CS.",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_other_heir",
    isStarred: true,
    slots: 2,
    minResourcesRank: "Remarkable",
    minResourcesRankValue: 30,
    name: "Heir to Fortune",
    category: "Other Skills",
    costCP: 20,
    statAffected: "Resources",
    csBonus: 1,
    description: "Counts as 2 talent slots. Character creation only. The character commands or inherits vast family wealth, guaranteeing a minimum Resource rank of Remarkable (30).",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_other_student",
    isStarred: true,
    slots: 2,
    name: "Student",
    category: "Other Skills",
    costCP: 20,
    statAffected: "Karma",
    csBonus: 1,
    description: "Counts as 2 talent slots. Character creation only. Has no other initial talents, but learns all future talents at a steep discount: 1000 Karma if taught by a player character, or 800 Karma from an outside instructor.",
    source: "Player's Book p. 10, 91"
  },
  {
    id: "t_other_leadership",
    isStarred: true,
    slots: 2,
    name: "Leadership",
    category: "Other Skills",
    costCP: 20,
    statAffected: "Karma",
    csBonus: 1,
    description: "Counts as 2 talent slots. Inspiring tactical leadership. Grants an immediate +50 bonus to the Team Karma Pool as long as the character is recognized as the active team leader.",
    source: "Player's Book p. 10, 91"
  },

  // ==========================================
  // 7. PILOTING SKILLS (Player's Book p. 16, 90; Weapons Locker p. 28)
  // ==========================================
  {
    id: "t_pil_driver",
    allowsSpecialization: true,
    specPlaceholder: "Vehicle type (e.g. High-Performance Racing, Motorcycles, Armored Rigs)",
    name: "Driver",
    category: "Piloting Skills",
    costCP: 10,
    statAffected: "Agility",
    csBonus: 1,
    description: "Stunt driving, evasive pursuit, and handling of ground motor vehicles (automobiles, motorcycles, trucks, armored vehicles). +1CS to Agility on all vehicular control FEATs.",
    source: "Player's Book p. 16; Weapons Locker p. 28"
  },
  {
    id: "t_pil_spacecraft",
    allowsSpecialization: true,
    specPlaceholder: "Spacecraft type (e.g. Orbital Shuttles, Starships, Alien Fighters)",
    name: "Pilot: Spacecraft",
    category: "Piloting Skills",
    costCP: 15,
    statAffected: "Agility / Reason",
    csBonus: 1,
    description: "Interplanetary and starship piloting, sub-light maneuvering, hyperspace navigation, orbital docking, and starship combat. +1CS to Agility while piloting spacecraft.",
    source: "Player's Book p. 16, 90; Weapons Locker p. 28"
  },
  {
    id: "t_pil_boats",
    allowsSpecialization: true,
    specPlaceholder: "Vessel type (e.g. Submarines, Speedboats, Hovercraft)",
    name: "Pilot: Boats / Submersibles",
    category: "Piloting Skills",
    costCP: 10,
    statAffected: "Agility",
    csBonus: 1,
    description: "Navigation and maneuvering of marine surface watercraft (motorboats, yachts, hovercraft) and underwater vessels (submarines, bathyspheres). +1CS on aquatic vehicular control.",
    source: "Player's Book p. 16; Weapons Locker p. 28"
  }
];

// Backwards-compatible ID aliases for existing sheet configs
const TALENT_ID_ALIASES = {
  t_sci_physics: "t_sci_phys",
  t_fight_wrestling: "t_fight_wrest",
  t_fight_thrown: "t_fight_thrown_obj",
  t_wep_sharp: "t_wep_edged",
  t_wep_firearms: "t_wep_guns",
  t_sci_surg: "t_prof_med",
  t_sci_med: "t_prof_med",
  t_eng_mech: "t_prof_engineering",
  t_eng_comp: "t_sci_comp",
  t_eng_elec: "t_sci_elec",
  t_eng_robot: "t_prof_engineering",
  t_esp_stealth: "t_prof_detective",
  t_esp_disg: "t_prof_detective",
  t_esp_street: "t_prof_criminology",
  t_esp_criminology: "t_prof_criminology",
  t_esp_espionage: "t_prof_detective",
  t_mystic_resist_dom: "t_mystic_resist",
  t_occ_occult: "t_mystic_occult",
  t_occ_mystic: "t_mystic_background",
  t_pil_auto: "t_pil_driver",
  t_pil_aircraft: "t_prof_pilot",
  t_pil_space: "t_pil_spacecraft",
  t_oth_artist: "t_other_artist",
  t_oth_languages: "t_other_languages",
  t_oth_first_aid: "t_other_first_aid",
  t_oth_repair: "t_other_tinkering",
  t_oth_trivia: "t_other_trivia",
  t_oth_performer: "t_other_performer",
  t_oth_animal: "t_other_animal",
  t_oth_heir: "t_other_heir",
  t_oth_student: "t_other_student",
  t_oth_leadership: "t_other_leadership"
};

const TALENTS_BY_ID = {};
for (const t of TALENTS_CATALOG) {
  TALENTS_BY_ID[t.id] = t;
}

// Add aliases pointing to canonical entries
for (const [aliasId, canonicalId] of Object.entries(TALENT_ID_ALIASES)) {
  if (TALENTS_BY_ID[canonicalId] && !TALENTS_BY_ID[aliasId]) {
    TALENTS_BY_ID[aliasId] = TALENTS_BY_ID[canonicalId];
  }
}

const MSH_TALENTS = TALENTS_CATALOG.map(t => ({
  group: t.category,
  bonus: t.csBonus ? `+${t.csBonus}CS ${t.statAffected}` : (t.statAffected || 'Special'),
  ...t
}));

if (typeof globalThis !== 'undefined') {
  globalThis.TALENTS_CATALOG = TALENTS_CATALOG;
  globalThis.TALENTS_BY_ID = TALENTS_BY_ID;
  globalThis.MSH_TALENTS = MSH_TALENTS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TALENTS_CATALOG, TALENTS_BY_ID, MSH_TALENTS };
}

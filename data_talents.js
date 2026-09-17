/**
 * Marvel Super Heroes (FASERIP) - Talents Database
 * Complete comprehensive catalog containing canonical Player's Book talents
 * and the complete Ultimate Talents Book compendium.
 */

const TALENTS_CATALOG = [
  {
    "id": "t_wep_blunt",
    "name": "Blunt Weapons",
    "category": "Weapon Skills",
    "costCP": 10,
    "statAffected": "Fighting",
    "csBonus": 1,
    "description": "Proficiency with bludgeoning weapons (clubs, maces, staves, hammers). +1CS to Fighting when attacking with blunt weapons.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_wep_edged",
    "name": "Edged Weapons",
    "category": "Weapon Skills",
    "costCP": 10,
    "statAffected": "Fighting",
    "csBonus": 1,
    "description": "Mastery of edged and slashing weapons (swords, knives, axes). +1CS to Fighting when attacking with edged weapons.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_wep_thrown",
    "name": "Thrown Weapons",
    "category": "Weapon Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "Expertise with thrown items (daggers, darts, shuriken, boomerangs). +1CS to Agility on thrown weapon attacks.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_wep_bows",
    "name": "Bows",
    "category": "Weapon Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "Expertise with longbows, recurve bows, and compound bows. +1CS to Agility on archery attacks.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_wep_guns",
    "name": "Firearms (Guns)",
    "category": "Weapon Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "Proficiency with conventional handguns, pistols, rifles, and shotguns. +1CS to Agility on firearm attacks.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_wep_marksman",
    "name": "Marksman",
    "category": "Weapon Skills",
    "costCP": 20,
    "statAffected": "Agility",
    "csBonus": 2,
    "description": "Exceptional ranged precision. Grants +2CS to Agility on all missile/shooting attacks when taking 1 round to aim, or +1CS without aiming.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_wep_spec",
    "name": "Weapon Specialist",
    "category": "Weapon Skills",
    "costCP": 20,
    "statAffected": "Fighting / Agility",
    "csBonus": 2,
    "description": "Dedication to a single specific weapon (e.g. Captain America's Shield, Hawkeye's Bow). +2CS to attack rolls with that weapon and +1 to initiative.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_wep_master",
    "name": "Weapon Master",
    "category": "Weapon Skills",
    "costCP": 25,
    "statAffected": "Fighting / Agility",
    "csBonus": 2,
    "description": "Supreme mastery across all weapon types. +1CS with all weapons, and +2CS with one favored weapon family.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_fight_ma_a",
    "name": "Martial Arts A",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Fighting",
    "csBonus": 1,
    "description": "Oriental martial arts emphasizing precision and nerve strikes. Can stun or slam an opponent regardless of their Strength or Endurance.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_fight_ma_b",
    "name": "Martial Arts B",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Fighting",
    "csBonus": 1,
    "description": "Hard martial arts (Karate, Tae Kwon Do, Muay Thai). +1CS to Fighting when engaged in unarmed hand-to-hand combat.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_fight_ma_c",
    "name": "Martial Arts C",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Strength / Agility",
    "csBonus": 1,
    "description": "Grappling martial arts (Judo, Aikido, Jujutsu). +1CS to Strength for grappling and +1CS to Agility for dodging.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_fight_ma_d",
    "name": "Martial Arts D",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Strength",
    "csBonus": 1,
    "description": "Anatomical precision strikes. Stuns and slams ignore Body Armor if an Incredible Agility FEAT is made.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_fight_ma_e",
    "name": "Martial Arts E",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Initiative",
    "csBonus": 1,
    "description": "Lightning reflexes and reaction speed. Grants a +1 bonus to all Initiative rolls in combat.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_fight_wrest",
    "name": "Wrestling",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Strength",
    "csBonus": 1,
    "description": "Olympic and professional wrestling techniques. +1CS to Strength for grappling, escaping, and pinning holds.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_fight_acro",
    "name": "Acrobatics",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "Exceptional body control and gymnastics. +1CS to Agility on dodging, evading, and escaping rolls.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_fight_tumb",
    "name": "Tumbling",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "Falling and kinetic dissipation technique. Reduces falling damage by 1 rank (10 points) on an Agility FEAT.",
    "source": "Player's Book p. 15"
  },
  {
    "id": "t_sci_chem",
    "name": "Chemistry",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Expert knowledge of organic, inorganic, and physical chemical synthesis, toxin analysis, and compounds.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_sci_bio",
    "name": "Biology",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Study of living organisms, ecology, cellular biology, and physiology. +1CS to biological research.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_sci_gen",
    "name": "Genetics",
    "category": "Scientific Disciplines",
    "costCP": 15,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Advanced understanding of metahuman DNA, mutations, cloning, and genetic splicing. +1CS to Reason.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_sci_phys",
    "name": "Physics",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Classical and theoretical physics, mechanics, thermodynamics, and energy dynamics. +1CS to Reason.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_sci_astro",
    "name": "Astronomy / Astrophysics",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Stellar phenomena, planetary orbits, astrophysics, and cosmic energy phenomena. +1CS to Reason.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_sci_med",
    "name": "Medicine / First Aid",
    "category": "Professional Skills",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Emergency trauma care, diagnosis, and medical stabilization. Restores Health and stabilizes dying heroes.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_sci_surg",
    "name": "Surgery",
    "category": "Professional Skills",
    "costCP": 15,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Advanced clinical surgery, organ repair, and metahuman emergency trauma operations.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_sci_psych",
    "name": "Psychology / Psychiatry",
    "category": "Cognitive & Humanities",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Behavioral science, mental illness diagnosis, and resistance to psychological manipulation.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_eng_mech",
    "name": "Mechanical Engineering",
    "category": "Engineering & Technical",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Design, repair, and modification of mechanical assemblies, engines, gears, and structural frames.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_eng_elec",
    "name": "Electronics",
    "category": "Engineering & Technical",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Design and maintenance of electrical circuits, avionics, radar systems, and microchips.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_eng_comp",
    "name": "Computers / Hacking",
    "category": "Engineering & Technical",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Programming, cybersecurity, AI interfacing, data recovery, and electronic counter-measures.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_eng_robot",
    "name": "Robotics & Cybernetics",
    "category": "Engineering & Technical",
    "costCP": 15,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Advanced creation and repair of autonomous androids, cyborg prosthetics, and robotic combat units.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_esp_stealth",
    "name": "Stealth / Camouflage",
    "category": "Espionage & Underworld",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "Moving silently, using shadow and cover, and avoiding audio/visual sensors. +1CS to Agility for stealth.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_esp_disg",
    "name": "Disguise",
    "category": "Espionage & Underworld",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Cosmetic alteration, vocal mimicry, and behavioral deception to impersonate others.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_esp_espionage",
    "name": "Espionage / Infiltration",
    "category": "Espionage & Underworld",
    "costCP": 15,
    "statAffected": "Reason / Intuition",
    "csBonus": 1,
    "description": "Covert tradecraft, intelligence gathering, surveillance counter-measures, and security penetration.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_esp_street",
    "name": "Streetwise",
    "category": "Espionage & Underworld",
    "costCP": 10,
    "statAffected": "Intuition",
    "csBonus": 1,
    "description": "Knowledge of criminal networks, black markets, underground contacts, and underworld slang.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_occ_occult",
    "name": "Occult Lore",
    "category": "Mystic & Mental",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Knowledge of ancient grimoires, demonic hierarchies, eldritch deities, artifacts, and mystic symbols.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_occ_mystic",
    "name": "Mystic Background",
    "category": "Mystic & Mental",
    "costCP": 15,
    "statAffected": "Psyche",
    "csBonus": 1,
    "description": "Formal initiation into sorcerous traditions (Kamar-Taj, Darkhold, Voodoo). +1CS to Psyche for casting spells.",
    "source": "Realms of Magic & PB"
  },
  {
    "id": "t_pil_auto",
    "name": "Pilot: Automobile",
    "category": "Piloting Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "High-speed stunt driving, vehicular combat, and control of civilian and armored wheeled vehicles.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_pil_aircraft",
    "name": "Pilot: Aircraft (Jet / Helicopter)",
    "category": "Piloting Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "Flight operation of helicopters, supersonic jets, Quinjets, and VTOL aircraft. +1CS to Agility while flying.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_pil_space",
    "name": "Pilot: Spacecraft",
    "category": "Piloting Skills",
    "costCP": 15,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "Interplanetary navigation, sub-light and warp drive maneuvers, orbital docking, and starship combat.",
    "source": "Player's Book p. 16"
  },
  {
    "id": "t_accounting",
    "name": "Accounting",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Deals with the character's ability to handle account information. The character receives a +1 CS when applying this Talent toward balancing a checkbook, handling team accounts, and budgeting.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_acoustics",
    "name": "Acoustics",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Deals with the study of noise control and Sonolumine science, using sound to produce light in liquids. The hero gains a +1CS bonus to the research and application of the above.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_acupuncture",
    "name": "Acupuncture",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "An ancient art from the Orient that deals with using needles and puncturing the skin in order to allow \"negative\" energy to be released. The character receives a +1CS when applying this directly, or researching. This also includes any FEATs needed for Acupressure.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_agriculture",
    "name": "Agriculture",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Deals with field crop production and soil management. Also, a combination of the producing operations of a farm, the manufacture and distribution of supplies, and the processing distribution and storage of such supplies. The development and repair of farm equipment, irrigation systems and landscape ",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_airplane_pilot",
    "name": "Airplane Pilot",
    "category": "Piloting Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "The hero gains a +1 CS to agility when piloting airplanes. Includes commercial jets, small planes, and fighter jets.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_alchemy",
    "name": "Alchemy",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "A medieval chemical science and speculative philosophy aiming to achieve the transmutation of the base elements into gold, the discovery of a universal cure for disease and the discovery of a means of indefinitely prolonging life. The Judge will have to work VERY carefully with the Player on this Ta",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_alien_studies",
    "name": "Alien Studies",
    "category": "Alternative Sciences",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Deals with the study of aliens. A character receives a +1CS when applying this to study aliens and can be used to aid in healing an alien member of one's team.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_anatomy",
    "name": "Anatomy",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Deals with the human body. The character receives a +1CS when trying to heal or harm. The hero with this talent has a better general knowledge of the body and it's strengths and weaknesses. Animal Behavior- Deals with the attitudes and behavior of animals. The hero with this talent has a better unde",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_animal_training",
    "name": "Animal Training",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character with this Talent has the ability to train animals to perform certain stunts. The individual does not have animal empathy or Communications and Control, but may teach an animal a trick based on a Reason FEAT roll. If the hero with this talent does have Animal Empathy or Animal Communica",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_anthropology",
    "name": "Anthropology",
    "category": "Cognitive & Humanities",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this Talent is only given Reason FEAT bonuses if a specific culture is taken (+1CS). However, an overview is known on the subject. More than one branch can be selected, each taking a slot. Any Existing Talent Chosen by the",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_player",
    "name": "Player",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "When this Talent is rolled, the player may choose any Talent from this list for his/her hero.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_archaeology",
    "name": "Archaeology",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "A +1 CS on matters involving the past, including paleontology, historical records, and ancient myths and legends.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_architecture",
    "name": "Architecture",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent deals with the design and construction of buildings. The hero with this Talent receives a +1CS when attempting to build or to study a building. Artificial",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_intelligence",
    "name": "Intelligence",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The study and research of man made thinking systems. The hero is capable of researching, or even creating this new form of \"life\", and gains a +1CS bonus in the endeavor.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_artist",
    "name": "Artist",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character with an artist background creates works of art, either for his/herself or for sale to others. This includes painting, sculpting and writing. A single work takes 1-10 weeks, and upon completion grants the artist karma points equal to 10 times the number of weeks. The character must allo",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_engineering",
    "name": "Engineering",
    "category": "Engineering & Technical",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This allows the character to design, build and modify out of atmosphere spacecraft. Characters with this Talent get the benefit of having their project cost -1CS less in resource rank to build.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_astronautics",
    "name": "Astronautics",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The science of the construction and design of vehicles for travel in space beyond Earth's atmosphere. A hero with this Talent can not only research these things but can also attempt to build such vehicles, and is even at a +1CS bonus to do so. Astrophotography- Deals with photographing the stars. A ",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_astrophysics",
    "name": "Astrophysics",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero is well versed with the chemical and physical composition of celestial matter, such as comets, nebula, meteorites, big chunks of galactic goo, etc… Furthermore gaining a +1CS bonus to the research and application of the above information.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_atomic_physics",
    "name": "Atomic Physics",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The study of solely atomic physics. This includes nuclear physics. The 14 === hero gains a +1CS bonus to the study and application to the above information.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_attractive",
    "name": "Attractive",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this Talent excels at drawing attention to his/herself based on their appearance. The hero also gains a +2CS to Popularity when dealing with those who would be attracted to the hero(Heterosexuals of the opposite sex, homosexuals, and bisexuals), and a +1CS to all others. Automobile",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_specialist",
    "name": "Specialist",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this talent gains a +1CS to Agility when piloting an automobile. This Talent includes racecar driving. Automotive",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_ballistics",
    "name": "Ballistics",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Ballistics is the study of guns. Knowing what bullet goes with what gun, where a shot should have come from, etc… This is the kind of stuff you see television detectives doing when they find powder burns and bullet holes. The hero gets a +1CS to Reason when trying to figure out these kinds of things",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_bibliophile",
    "name": "Bibliophile",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character has an extensive knowledge of magical books, scrolls, or other primary informational items, and the lore concerning them. He/She has a +1CS when using or researching these.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_biophysics",
    "name": "Biophysics",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero gains a +1CS bonus to the research and application of physical principles to biological problems.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_biotechnology",
    "name": "Biotechnology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero gains a +1CS bonus to the study and application to biological and medical science of engineering principles or engineering equipment. A common use is the construction of artificial organs and bionics. Blunt Weapons- Characters with this Talent gain a +1CS to hit when attacking with a weapon",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_boat_pilot",
    "name": "Boat Pilot",
    "category": "Piloting Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "The hero with this Talent gains a +1CS to agility when piloting boats. This Talent includes sailboats, jet skis and even large aircraft carriers.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_botany",
    "name": "Botany",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The study of plant life. A hero with this talent gains a +1CS bonus to the research and application of this Talent. If the hero possesses Communication with Plants, Plant Control, Plant Growth, or Plant Mimicry, these powers 15 === are also increased +1CS.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_cardiology",
    "name": "Cardiology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero is well versed in the heart. He/She can attempt to diagnose, research, or even try to treat any type of heart aliment, gaining a +1CS bonus along the way.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_cartography",
    "name": "Cartography",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This talent is useful for the accurate creation of maps. The hero with this talent gets a +1CS to Reason when dealing with, as well as making maps of any kind.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_catastrophism",
    "name": "Catastrophism",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero is well versed in the scientific belief that attempts to pinpoint the end of the world or at least major catastrophes that could significantly alter man's or the universe's history. A hero with this Talent gains a +1CS bonus to the application or research of this talent. Chemical and Biolog",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_chiropractic",
    "name": "Chiropractic",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent deals with the manipulation of the vertebrae in order to ease discomfort. The hero with this talent gains a +1CS when applying this knowledge of the back, to aid another. Chronicler of Magic- The character studies magical societies and their activities. He/She has a +2CS for researching ",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_criminology",
    "name": "Criminology",
    "category": "Espionage & Underworld",
    "costCP": 10,
    "statAffected": "Agility / Intuition",
    "csBonus": 1,
    "description": "The hero with this Talent has an understanding of the criminal mind and behavior, from either studies or first- hand observation. The character with this Talent gains a +1CS on all Reason and Intuition FEATs involving criminal practices (\"If I were a crook, where would I hide?\"). The here also gains",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_cybernetics",
    "name": "Cybernetics",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Deals with the adding of robotic parts to organics in order to increase effective output. The hero with this Talent gains a +1CS when adding cybernetics to a host, maintenance of cybernetics, and to the research of other cybernetic creations. The hero can also attempt to remove cybernetics as well a",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_cryogenics",
    "name": "Cryogenics",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent deals with the production and effects of very low temperatures. The hero gains a +1CS bonus to the research and application of the above.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_cryonics",
    "name": "Cryonics",
    "category": "Alternative Sciences",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero has studied the practice of freezing a dead diseased person in hopes of bringing him/her back in the future when the cure is found. The hero possessing this Talent gains a +1CS bonus when attempting or researching this science talent. D",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_demolitions",
    "name": "Demolitions",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The Hero gets a +1CS to Reason when figuring out the best applications for explosives, or the creation of home made explosives. This allows a good chance to blow the vault door off the wall without collapsing the back half of the building.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_demonologist",
    "name": "Demonologist",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character has studied accounts of demons in the Marvel Universe and he knows how dangerous and hostile they are. The character receives a +1CS in nay situation involving demons, including research, communication, identification, and combat. (The Miscellany of Magic contains more information on d",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_dentistry",
    "name": "Dentistry",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent deals with the cleansing and repair of one's teeth. The hero with this Talent gains a +1CS when dealing with teeth and their maintenance. Detective/Espionage - The hero with this Talent has been trained to notice small clues to a crime, and in addition gains a Contact in either crime, la",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_ecology",
    "name": "Ecology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This is the study of living things and how they interact in an ecological system. A hero with ecology will gain a +1CS bonus when learning or reasoning out things about a natural balance, like what is throwing it off. The hero is an expert on most ecological situations, and may take educated guesses",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_escape_artist",
    "name": "Escape Artist",
    "category": "Espionage & Underworld",
    "costCP": 10,
    "statAffected": "Agility / Intuition",
    "csBonus": 1,
    "description": "The hero with this Talent is skilled at escaping confines. The hero gains a +1CS when dealing with situations that require lock- picking, untying knots, and minor contortionism.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_exhibition",
    "name": "Exhibition",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this Talent can use his/her various fighting skills in the flashiest way possible without penalty. Opponents viewing this Talent must make a Psyche FEAT roll at +1CS or try to avoid melee confrontation with this hero. F",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_first_aid",
    "name": "First Aid",
    "category": "Medical & Healing",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The Medicine Talent notes the loss of Endurance may be halted by someone checking on the dying character and administering some form of aid. The First Aid Talent grants the character an immediate halt to Endurance rank loss, the recovery of one rank immediately (one use only per situation), and in a",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_forensics",
    "name": "Forensics",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Deals with the study and evaluation of criminal evidence. The hero gains a +1CS when 18 === studying a crime scene or attempting to evaluate criminal specimens. G",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_geography",
    "name": "Geography",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This talent is the science mapping the Earth and its surfaces. Any hero possessing this Talent gains a +1CS bonus when making or using any map of this kind.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_geology",
    "name": "Geology",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "A +1CS on matters involving the Earth, including volcanic activity, the geology of the surrounding land, types of rocks and their powers, and mineral identification.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_geriatrics",
    "name": "Geriatrics",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero gains a +1CS when administering medical care to the elderly.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_graphics",
    "name": "Graphics",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero gains a +1CS when dealing with web design, advertising, printing product design. The hero is also familiar with the printing industry and various paper products and design tools.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_guns",
    "name": "Guns",
    "category": "Weapon Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "Individuals without this Talent fire guns (all handguns, rifles and submachine guns, including laser, stun and concussion varieties) at their Agility rank. Those with this Talent fire such weapons at +1CS. H Heir to a Fortune- This is not a Talent, but a situation that brings the character into a lo",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_helicopter",
    "name": "Helicopter",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this talent gains a +1CS to Agility when piloting Helicopters.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_history",
    "name": "History",
    "category": "Cognitive & Humanities",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero can pick a specific branch of history to be an expert in (World War II, South African, Mayan, Neolithic) and get a +1CS to Reason FEATs involving the branch. More than one branch can be selected. Each one takes a slot. I",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_immunology",
    "name": "Immunology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero gains a +1CS when dealing with the science dealing with the phenomena and causes of immunity and immune responses.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_journalism",
    "name": "Journalism",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this Talent gains an additional 2 Contacts to those already generated. The Contacts should be connected with the media in some fashion, such as at local newspapers, radio and 19 === television stations, or has sources in law enforcement, political circles, or snitches of the criminal u",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_languages",
    "name": "Languages",
    "category": "Cognitive & Humanities",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character with this Talent has a natural understanding of languages. The character gains 1 additional language at start, and may add other languages at half the cost of a Talent (500 points regardless of who teaches it). Characters without languages Talent must gain this Talent first to learn ot",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_law",
    "name": "Law",
    "category": "Cognitive & Humanities",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character with this Talent has an extensive background in the law (the assumption being US Law, but this may vary according to the Judge's campaign). The hero may be a lawyer of capable of applying to pass the bar (Reason FEAT of Good intensity). A character with the Law as a Talent gains a +1CS",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_leadership",
    "name": "Leadership",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this Talent has the brains and understanding of a cohesive group, such that he/she is a benefit to the team. Any Karma Pool to which the character belongs receives a 50 point bonus, provided the character with this Talent is recognized as the \"team leader\". A Karma Pool may only have o",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_locksmith",
    "name": "Locksmith",
    "category": "Espionage & Underworld",
    "costCP": 10,
    "statAffected": "Agility / Intuition",
    "csBonus": 1,
    "description": "This Talent deals with the opening of, replacing of, and repair of locks and locking mechanisms. The hero receives a +1CS when dealing with normal locks, and suffers a lesser penalty when dealing with unidentified locks. M",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_marine_biology",
    "name": "Marine Biology",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This is the study of marine life. The character with this Talent receives a +1CS when dealing with aquatic plants and creatures. Marine Engineering- A hero with this Talent gains a +1CS bonus for the building of ships, 20 === submarines, and underwater constructs.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_martial_arts_f",
    "name": "Martial Arts F",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Fighting",
    "csBonus": 1,
    "description": "This form of martial arts concentrates on hitting the pressure points in melee. The hero gains a +1CS to damage, and blunt hand-to- hand \tattacks may be resolved on the Edged attacks column.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_martial_arts_g",
    "name": "Martial Arts G",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Fighting",
    "csBonus": 1,
    "description": "This form of martial arts concentrates on a strong defense. The hero gains a +1CS bonus to dodge, and as well, is able to take - 1CS less damage from successful hits to his/her character.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_martial_arts_h",
    "name": "Martial Arts H",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Fighting",
    "csBonus": 1,
    "description": "This form of martial arts encourages speed though assessing the opponent. The hero gains +1 extra attack. The disadvantage is that the target for this attack must be studied for one round before the effects may be brought into play. The hero with this talent does not have to attack the character, on",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_martial_arts_i",
    "name": "Martial Arts I",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Fighting",
    "csBonus": 1,
    "description": "This form of martial arts focuses on hardening the body to resist damage. The hero 21 === gains a +1CS to Endurance when recovering health, rest is not needed. The hero also gains a +1CS bonus to Endurance to resist being Stunned or Slammed.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_martial_arts_j",
    "name": "Martial Arts J",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Fighting",
    "csBonus": 1,
    "description": "This form of martial arts focuses on using the hero's Intuition more than Intelligence. The hero is able by this form of martial arts able to wait until all actions are declared before declaring his/her actions. This Talent is limited to melee combat only.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_mathematics",
    "name": "Mathematics",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this Talent is a math whiz, unbelievably good with numbers and figures. The hero gains a +1CS to all problems that can be solved mathematically. Mechanical",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_hypnosis",
    "name": "Hypnosis",
    "category": "Mystic & Mental",
    "costCP": 10,
    "statAffected": "Psyche",
    "csBonus": 1,
    "description": "This Talent is a primitive form of Mind Control at the Power rank number equal to the Reason of the character with this talent. Information can be gained as per a Mental Probe, and post-hypnotic suggestions may be implanted within the victim's mind. Any attempt to force an individual to do something",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_metallurgy",
    "name": "Metallurgy",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero gains a +1CS when dealing with the research or application of the study of metal, and its practical uses.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_meteorology",
    "name": "Meteorology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "A hero with this talent gains a +1CS bonus to the study of weather systems. The hero can also on a successful FEAT (strength of the FEAT is up to the judge), can accurately predict weather.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_microbiology",
    "name": "Microbiology",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero gains a +1CS bonus when dealing with the study of microscopic forms of life. Military Engineering- This Talent deals with the creation of military bases and their locations. The hero with this Talent gains a +1CS when dealing with military type installments. The hero with this Talent also g",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_motorcycle",
    "name": "Motorcycle",
    "category": "Piloting Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "The hero with this Talent gains a +1CS bonus to Agility when piloting any, and all forms of motorcycles.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_music_cognition",
    "name": "Music Cognition",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero has studied the musical development throughout human history. This gives them a +1CS bonus to the research and application thereof. This does not automatically grant the Performer talent.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_mutant_studies",
    "name": "Mutant Studies",
    "category": "Alternative Sciences",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent allows the hero to figure out possible origins for powers, derive logical weakness 22 === that a character may have, know what kind of power was used based on evidence left behind, and have a good chance of knowing who is out there in the mutant world. The hero is up on current events in",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_negotiations",
    "name": "Negotiations",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "A hero with this talent is adept a defusing hostile situations. The hero with this Talent gains a +1CS bonus to Popularity and Reason when dealing with a hostile situation.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_neurosciences",
    "name": "Neurosciences",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This science deals with nerves, nerve tissue, and their relation to behavior and learning. A hero with this Talent gains a +1CS bonus on FEATs involving the above information. New Talent Devised by Player- The Player may create a new Talent for his/her character. It is up to the Judge to set limitat",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_gynecology",
    "name": "Gynecology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero gains a +1CS bonus when dealing with \"feminine health needs\", or babies and related medical matters.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_occultist",
    "name": "Occultist",
    "category": "Mystic & Mental",
    "costCP": 10,
    "statAffected": "Psyche",
    "csBonus": 1,
    "description": "The character has made extensive studies into the area if occult happenings, including: unexplained events and mysteries of the world, hauntings, and other manifestations of the spirit world. He has a +2CS when researching or dealing with occult events.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_oceanography",
    "name": "Oceanography",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero gains a +1CS bonus to matters dealing with the study of oceanianic movement and effects and effects on land and atmosphere.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_oncology",
    "name": "Oncology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero is well versed in the study of cancer and gains a +1CS bonus when treating or researching.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_oratory",
    "name": "Oratory",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character with this 23 === Talent is an excellent public speaker, and so receives a +1CS to both Reason and Popularity when giving a speech, or dealing with the public. Organic Chemistry- the hero gains a +1CS bonus when dealing with the research and application of chemical elements only found i",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_paired_weapons",
    "name": "Paired Weapons",
    "category": "Weapon Skills",
    "costCP": 10,
    "statAffected": "Agility",
    "csBonus": 1,
    "description": "This Talent may either apply to one-handed ballistic weapons or one- handed melee weapons (keep in mind that for an Amazing Strength character, a battle axe could be a one handed weapon!). For basic weapons, a hero gains one extra distance attack per round without penalty is firing at only one targe",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_phenomena",
    "name": "Phenomena",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent deals with the study of events that is unexplainable by any scientific means. The hero gains a +1CS when dealing with or researching events such as poltergeists. Also note that if the hero posses the power called Communicate with Non-Living; he/she gains a +1CS to that power.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_parapsychology",
    "name": "Parapsychology",
    "category": "Alternative Sciences",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This is the study of psionics. A hero with this Talent has a +1CS bonus to anything involving psionics. (For more information about psionics for the Marvel Super Heroes roll- playing system, visit Firebomb's site. Highly recommended by Major Tom Sawyer, cats! www.technohol.com)",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_parasitology",
    "name": "Parasitology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this Talent is an expert on the science of the effects of parasites on living creatures, gaining a +1CS bonus to the application and research of the above information.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_pathology",
    "name": "Pathology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This medical talent deals with the study of diseases and their nature. Any hero possessing this Talent gains a +1CS bonus to the research and application of this Talent.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_pediatrics",
    "name": "Pediatrics",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero is well versed in the care of children -from a medical standpoint. The affords the hero a +1CS bonus to the care, diagnosis, treatment, and research of this medical Talent. 24 ===",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_performer",
    "name": "Performer",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character is someone who acts, sings, dances, mimes, or otherwise uses his/her Talents to entertain (this is related to the Artist, the key difference being that the Artist may leave the scene of creation, the Performer is identified with creation directly). A Performer receives 10 Karma points ",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_pharmacology",
    "name": "Pharmacology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "A character with this talent is versed in the study of drugs. The hero gains a +1CS bonus to the research, and creation of pharmaceutical products.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_phenology",
    "name": "Phenology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Any hero who possesses this Talent gains a +1CS bonus to the research or application of the reaction of species to environmental phenomenon.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_philology",
    "name": "Philology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Also known as linguistics, this talent is the study of human speech including the units, structure, modification of language. This allows the hero to pick one additional language to be fluent in at the start of the game.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_philosophy",
    "name": "Philosophy",
    "category": "Cognitive & Humanities",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Deals with the pondering of life's questions. It is also an outlook on life that may be shared by others. The character with this Talent gains a +1CS when dealing with a debate of a philosophical nature.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_psychology",
    "name": "Psychology",
    "category": "Cognitive & Humanities",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This deals with the workings of the mind. The hero with this Talent gains a +1CS when dealing with a mentally ill person, or psychosis. Physical Therapy- This deals with the exertion of muscles in order to regain usage of an atrophied limb or extremity. The hero with this Talent gains a +1CS when de",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_pick_pocket",
    "name": "Pick Pocket",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "A character with this Talent is adept at picking other's pockets. The character gains a +1CS bonus when attempting this questionable task. Upon success, the Judge determines what the character has pilfered. Upon failure, the target is allowed a reason roll (bonuses and penalties are left up to the J",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_plastic_surgery",
    "name": "Plastic Surgery",
    "category": "Medical & Healing",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent deals with the construction of and repair of the body. This cosmetic skill can be applied to an accident victim, or to a vain person who hates their nose. Either way the hero gains a +1CS when dealing with a situation of this nature.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_politics",
    "name": "Politics",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent deals with the government and the policies that they instate, as well as the party desires on both sides. The hero with this Talent gains a +1CS when dealing with situations that might affect them on a political basis.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_polymers",
    "name": "Polymers",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This talent allows the hero the ability to study advanced chemical compounds and to form other new materials at a +1CS bonus.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_psychiatry",
    "name": "Psychiatry",
    "category": "Cognitive & Humanities",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this talent has a background in the studies of the mind, 25 === and as such gains a +1CS on all FEATs involving the mind. This is a popular talent with those heroes and villains with Mental Powers, and the character with this talent gains a +1CS on all FEATs involving Mental Control, D",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_psychobiology",
    "name": "Psychobiology",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero gains a +1CS bonus to the application and study of mental life and behavior in relation to other biological processes. Q Quantum Physics- The hero with this talent has a background in research and development into teleportation, worm holes, warp theory, and other MARVELous ideas, and gains ",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_quick_striking",
    "name": "Quick Striking",
    "category": "Fighting Skills",
    "costCP": 10,
    "statAffected": "Fighting",
    "csBonus": 1,
    "description": "All Heroes with this Talent are well trained in quickness in combat situations. They gain a +1CS on all Fighting FEATs involving attempting multiple attack rolls. The hero also gains a +1 bonus to imitative in all melee situations. R Radio Astronomy- Any hero who possesses this Talent is well versed",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_radiobiology",
    "name": "Radiobiology",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this biology Talent gains a +1CS bonus to the research and application of the interaction of biological systems and radiant energy or radioactive materials. Repair/Tinkering- The character with this Talent gains a +1CS to any Reason FEATs involving the repair and modification of existi",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_this_is_a_psi",
    "name": "This is a Psi",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Screen that may be developed by the individuals without that Power. This permits the character to resist mental attacks as if the character had a mental power of Psyche +1CS. The Talent is passive in nature, and does not grant any other particular benefit. A character with Mental Probe may be able t",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_robotics",
    "name": "Robotics",
    "category": "Engineering & Technical",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent deals with the creation, maintenance, and upgrading of robots. The hero with this Talent gains a +1CS when attempting to create a functional robot. In addition to this, the hero gains a - 1CS on any Resources FEAT that are needed. 26 ===",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_runesmith",
    "name": "Runesmith",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character is a translator and transcriber of runes, especially ancient, magical runes. (A rune is a letter in an ancient alphabet. Most ancient magical items have runes on them to warn potential users of the possible harm that the item can cause. These runes can be any one of a vast array of alm",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_antiquities",
    "name": "Antiquities",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character has an extensive knowledge of antiques, especially ancient magical artifacts and lore concerning them (but not including books, scrolls, or other artifacts that are primarily informational). He/she has a +2CS bonus when dealing with them or researching them.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_security",
    "name": "Security",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent has two benefits: First, the hero gets a +1CS to Reason to create or remove security devices. Second, the hero gets a +1CS to Intuition for noticing installed security devices. Security and",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_encryption",
    "name": "Encryption",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent deals with creating, cracking, and maintenance of security codes used on computers. A hero with this gains a +1CS when attempting to crack a code, creating a code, or servicing a code.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_seduction",
    "name": "Seduction",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this Talent is skilled at the fine art of seducing the \"victim\". This Talent when used, temporarily raises the heroes Popularity +1CS to interested parties (Heterosexuals of the opposite sex, homosexuals, and bisexuals) If the hero possesses the Power of Pheromone Control, the bonus is",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_seismology",
    "name": "Seismology",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This form of Earth Science is the study of earth movement. This Talent also includes glaciology and volcanoiogy. The hero gains a +1CS bonus to the above information. Sewing and",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_tailoring",
    "name": "Tailoring",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent deals with the creation of clothing, and other things that must be connected with thread. The hero with this Talent gains a +1CS when creating a piece, repairing a piece or studying garments. Sharp Weapons- Characters with this Talent gain a +1CS to hit when attacking with a weapon that ",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_sleight_of_hand",
    "name": "Sleight of Hand",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This is a Talent developed by stage magicians, which causes items to appear and disappear by a combination of misdirection and swift, fluid gestures. The character with this Talent may palm small items, making them appear or disappear 27 === with Agility +1CS ability. Software Engineering and",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_programming",
    "name": "Programming",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero receives a +1CS bonus on matters involving the creation and development of computer software.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_sonochemistry",
    "name": "Sonochemistry",
    "category": "Scientific Disciplines",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this Talent has an understanding of the effects of sonic energy on chemicals, and gains a +1CS bonus to Reason when dealing with these.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_spacecraft",
    "name": "Spacecraft",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero gains a +1CS bonus when piloting spacecraft of any kind. This includes space shuttles and out of atmosphere ships.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_spectroscopy",
    "name": "Spectroscopy",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero who posses this talent gains a +1CS bonus to the application and research of physics that deal with the theory and interpretation of interaction between matter and radiation.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_sports_medicine",
    "name": "Sports Medicine",
    "category": "Medical & Healing",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This is the application of medicine to injuries that were sustained by an athlete. It grants a +1CS when attempting to diagnose, treat, or inflict specific type injuries.",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_stamina",
    "name": "Stamina",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character has trained himself/herself to go many days without eating or sleeping in the pursuit of his/her magical studies. If researching anything magical or just using a spell (no physical combat or extensive movement allowed), the character can go without food or sleep for up to 6 days. -Note",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_street_smarts",
    "name": "Street Smarts",
    "category": "Espionage & Underworld",
    "costCP": 10,
    "statAffected": "Agility / Intuition",
    "csBonus": 1,
    "description": "This is the measure of common sense that the hero has in regards to understanding street slang and street etiquette. The character with this Talent gains a +1CS to Popularity, Reason, and Intuition when in the situation where they are needed to act as a guide or researching what street etiquette is ",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_student",
    "name": "Student",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "Similar to Heir to a Fortune, this Talent may only be chosen at the start of play, and may not be gained though experience. The Student character has no other initial Talents, but may gain other Talents at a discounted price. New Talents cost 100 karma points if learned form another player character",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_theoginist",
    "name": "Theoginist",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character is a scholar if the origins of the extra powerful extra- dimensional beings and gods of the Marvel Universe (this category includes all of the major entities listed in the Miscellany of Mysticism and those beings that provide dimensional energy when called upon, such as Dormammu). The ",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_thrown_objects",
    "name": "Thrown Objects",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The hero with this Talent gains a +1CS bonus with all Throwing Attacks (both Edged and Blunt), and a +1CS on Catching. This applies to both thrown weapons and normal items. If the hero has the Thrown Weapons Talent as well, the modification is +2CS when using thrown weapons. Thrown Weapons- Characte",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_tracking",
    "name": "Tracking",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This Talent is the skill of tracing a person(s), or animal(s) by the marks, etc.. they might have left behind. This gives the hero a +1CS bonus to Intuition checks when trying to track earthbound targets though any type of terrain (difficulty modifiers can apply).",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_trance",
    "name": "Trance",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "The character may place himself/herself into a trance. While in a trance the character slows his/her body functions to such a level that he/she may be assumed to be deceased (Intuition checking). A character in a trance reduces needs for food and water to a minimal level, and may regain Endurance ra",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_trivia",
    "name": "Trivia",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This general category covers any one subject desired by the character. On that subject, the character gains a +1CS to all Reason FEATs (Say, the character is into collecting Spores and Fungus. A Trivia Talent would be: Trivia/ Spores and Fungus). Trivia categories should be specific (old movies, mil",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_virtual_reality",
    "name": "Virtual Reality",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "This",
    "source": "The Ultimate Talents Book"
  },
  {
    "id": "t_talent_in_an_in",
    "name": "Talent in an in",
    "category": "Professional & Other",
    "costCP": 10,
    "statAffected": "Reason",
    "csBonus": 1,
    "description": "depth knowledge of human's interaction with computer systems. A hero with this Talent gains a +1CS bonus to research and creation of VR. A hero with this talent could even",
    "source": "The Ultimate Talents Book"
  }
];

const TALENTS_BY_ID = {};
for (const t of TALENTS_CATALOG) {
  TALENTS_BY_ID[t.id] = t;
}

const MSH_TALENTS = TALENTS_CATALOG.map(t => ({
  group: t.category,
  bonus: `+${t.csBonus}CS ${t.statAffected}`,
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

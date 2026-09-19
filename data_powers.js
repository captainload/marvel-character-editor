/**
 * Marvel Super Heroes (FASERIP) - Powers Database
 * Complete canonical catalog containing all 271 superpowers:
 * - Ultimate Powers Book (UPB) D1-D17, DT1-DT22, EC1-EC21, EE1-EE14, F1-F5,
 *   I1-I4, L1-L21, MG1-MG13, MC1-MC13, MCo1-MCo6, MCr1-MCr8, M1-M33,
 *   P1-P17, PC1-PC14, S1-S32, T1-T23
 * - Dragon Magazine #134 additions: P18-P20, MG14, T24, F6, M34
 * - Strictly excludes Rule Powers R1-R8.
 */

const POWERS_CATALOG = [
  {
    "code": "D1",
    "name": "Body Armor",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero possesses artificially-created armor that provides protection and possibly a way of possessing other Powers. Armor comes in many forms exotic plate-mail, nuclear-powered exoskeletons, or mechanically-created force fields. The player should work with the Judge to create proper Armor for his hero.",
    "rulesText": "The hero possesses artificially-created armor that provides protection and possibly a way of possessing other Powers. Armor comes in many forms exotic plate-mail, nuclear-powered exoskeletons, or mechanically-created force fields. The player should work with the Judge to create proper Armor for his hero. The player can also determine which Powers are possessed by the hero and which are properties of the armor. Powers built into the armor can later be modified and enhanced; think of the changes Tony Stark has made in the Iron Man armor. On the other hand, Powers that are built into the armor may suffer mechanical failure.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D2",
    "name": "Force Field",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the type of field used by the Invisible Woman. It provides protection against a variety of forces, including brute force, energy attacks, and extreme temperature conditions. It can be projected and used for a variety of Power stunts.",
    "rulesText": "This is the type of field used by the Invisible Woman. It provides protection against a variety of forces, including brute force, energy attacks, and extreme temperature conditions. It can be projected and used for a variety of Power stunts. The following seven force fields protect against specific forms of attack. Each protects the hero and the surrounding area. The maximum size of the force field is the number of areas equal to 10% of the Power rank number.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D3",
    "name": "Force Field vs. Emotion",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the field-effect version of D11. The Field protects anyone within from attacks that are emotion-related or aimed at the Intuition, including Emotion Control, Hallucinations, and Domination. The Power's rank must be one rank higher than the hero's Intuition; if initially lower, the player should raise it to +1CS.",
    "rulesText": "This is the field-effect version of D11. The Field protects anyone within from attacks that are emotion-related or aimed at the Intuition, including Emotion Control, Hallucinations, and Domination. The Power's rank must be one rank higher than the hero's Intuition; if initially lower, the player should raise it to +1CS.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D4",
    "name": "Force Field vs. Energy",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the field-effect version of D12. The Field protects anything within from any emitted energy forms, whether natural, artificial, or Power-based. Such attacks include Light, Heat and Flame, Plasma, Hard Radiation, Electricity, Vibration, Sonics, Cold, and Kinetic Bolts (most of the Energy Emission category).",
    "rulesText": "This is the field-effect version of D12. The Field protects anything within from any emitted energy forms, whether natural, artificial, or Power-based. Such attacks include Light, Heat and Flame, Plasma, Hard Radiation, Electricity, Vibration, Sonics, Cold, and Kinetic Bolts (most of the Energy Emission category). Note that this Power overlaps D7. When creating the hero, the player can raise his rank +2CS by choosing a field that protects against a specific attack.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D5",
    "name": "Force Field vs. Magic",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the, field-effect version of D13. The field protects anything within from magical attack whether mental or physical in orientation. Note that unlike D6, this Power rank can be lower than the Psyche, making the field less able to protect against certain types of Magic.",
    "rulesText": "This is the, field-effect version of D13. The field protects anything within from magical attack whether mental or physical in orientation. Note that unlike D6, this Power rank can be lower than the Psyche, making the field less able to protect against certain types of Magic.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D6",
    "name": "Force Field vs. Mental",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the field-effect version of D14. The field protects anyone within from attacks aimed at the mind, neural system, and Psyche, including Psionics, and Neural Manipulation. It does not protect against emotion-based attacks (see D3) or magical attacks (see D5).",
    "rulesText": "This is the field-effect version of D14. The field protects anyone within from attacks aimed at the mind, neural system, and Psyche, including Psionics, and Neural Manipulation. It does not protect against emotion-based attacks (see D3) or magical attacks (see D5). The Power's rank must be one rank higher than the hero's Psyche; if initially lower, the player should raise it to the Psyche rank +1CS.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D7",
    "name": "Force Field vs. Physical",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a field-effect version of D15. The field protects anything within from such things as brute force, hostile environments, temperature extremes, hazardous chemicals, and airborne infection. Note that while this Power will prevent hostile environments from harming the hero, it does not provide life support materials.",
    "rulesText": "This is a field-effect version of D15. The field protects anything within from such things as brute force, hostile environments, temperature extremes, hazardous chemicals, and airborne infection. Note that while this Power will prevent hostile environments from harming the hero, it does not provide life support materials. For example, this Power permits the hero to walk unharmed on the surface of Venus, provided he has his own oxygen supply. When creating the hero, the player can raise the Power rank +1CS by choosing a field that protects against a specific attack. D8/Force Field vs.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D8",
    "name": "Force Field vs. Power Manipulation",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate a specialized protective screen that insulates against external attempts to control, dampen, steal, or alter their superpowers or biological traits.",
    "rulesText": "Blocks Power Control powers (PC1-PC14) and power dampening fields with rank equal to or less than this power rank. Any hostile power control FEAT against the hero suffers a -2CS penalty.",
    "errataNote": "",
    "powerStunts": [
      "Expanding field to protect adjacent allies",
      "Inverting field to cage a power dampening device"
    ]
  },
  {
    "code": "D9",
    "name": "Force Field vs. Vampirism",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the field-effect version of D17. The field protects anyone within from any vampiric-type attacks. This includes the forms of Psi-, Bio-, Energy, Magic, and Power Vampirism.",
    "rulesText": "This is the field-effect version of D17. The field protects anyone within from any vampiric-type attacks. This includes the forms of Psi-, Bio-, Energy, Magic, and Power Vampirism. When creating the hero, the player can raise the Power rank +1CS by choosing a field that protects against a specific attack.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D10",
    "name": "Reflection",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can turn any attack back onto the attacker. The attack may be of any nature: brute force, Power, or magic. The Power absorbs the energy of the attack up to this rank and redirects it.",
    "rulesText": "The hero can turn any attack back onto the attacker. The attack may be of any nature: brute force, Power, or magic. The Power absorbs the energy of the attack up to this rank and redirects it. A Typical FEAT send the attack off in a random direction. An Amazing FEAT reflects some of the attack back onto the attacker; it is now -3CS in Intensity. An Unearthly FEAT sends the entire attack back onto the attacker.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D11",
    "name": "Resist: Emotion",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has increased resistance to emotion-related attacks. Such attacks include Emotion Control, Hallucinations, Domination, and attacks aimed at the Intuition. The hero can ignore attacks with Intensities less than the Power rank, and may reduce damage from higher level attacks by the Power rank number.",
    "rulesText": "The hero has increased resistance to emotion-related attacks. Such attacks include Emotion Control, Hallucinations, Domination, and attacks aimed at the Intuition. The hero can ignore attacks with Intensities less than the Power rank, and may reduce damage from higher level attacks by the Power rank number. This Power rank must be at least equal to the hero's Intuition +1CS; if a lower rank is initially rolled, the player should raise it to the Intuition rank +1CS.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D12",
    "name": "Resist: Energy",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has an increased resistance to any emitted energy form, whether artificial, natural, or Power-based. Such attacks include Light, Heat, Flame, Plasma, Hard radiation, Electricity, Vibration, Sonics, Cold, and Kinetic Bolts (most of the Energy Emission category). Note that this Power overlaps D15.",
    "rulesText": "The hero has an increased resistance to any emitted energy form, whether artificial, natural, or Power-based. Such attacks include Light, Heat, Flame, Plasma, Hard radiation, Electricity, Vibration, Sonics, Cold, and Kinetic Bolts (most of the Energy Emission category). Note that this Power overlaps D15. The hero can ignore attacks with Intensities less than his Power rank and may reduce higher level attacks by his Power rank number. When creating the hero, the player can raise his rank +1CS by choosing to specialize in a specific Energy Resistance. For example, the Player's Book contains listings for Resistance to Fire and Heat, Cold, Electricity, and Radiation.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D13",
    "name": "Resist: Magic",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has increased resistance to magic based attacks, whether physical or mental in orientation. Unlike D11 and D14, this Power rank can be lower than the Psyche rank, making the hero more vulnerable to some types of magic. The hero can ignore any magic whose rank is less than this Power's rank and can reduce higher level attacks by the Power rank number.",
    "rulesText": "The hero has increased resistance to magic based attacks, whether physical or mental in orientation. Unlike D11 and D14, this Power rank can be lower than the Psyche rank, making the hero more vulnerable to some types of magic. The hero can ignore any magic whose rank is less than this Power's rank and can reduce higher level attacks by the Power rank number.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D14",
    "name": "Resist: Mental",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has increased resistance to attacks aimed at the mind and neural system. Such attacks include psionics, neural manipulation, and any other attacks aimed at the Psyche. It does not include emotion-based attacks (see D11) or magical attacks (see D13).",
    "rulesText": "The hero has increased resistance to attacks aimed at the mind and neural system. Such attacks include psionics, neural manipulation, and any other attacks aimed at the Psyche. It does not include emotion-based attacks (see D11) or magical attacks (see D13). The Power's rank must be at least one rank higher than the hero's Psyche; if a lower rank is rolled initially, the player should raise it to that rank +1CS.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D15",
    "name": "Resist: Physical",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has increased resistance to any physical attack. This includes brute force, chemical weapons, biochemicals, disease, hostile environments, and temperature extremes. The hero can ignore any physical attacks with Intensities less than the Power rank, and reduce damage from higher level attacks by the Power rank number.",
    "rulesText": "The hero has increased resistance to any physical attack. This includes brute force, chemical weapons, biochemicals, disease, hostile environments, and temperature extremes. The hero can ignore any physical attacks with Intensities less than the Power rank, and may reduce damage from higher level attacks by the Power rank number. When creating the hero, the player can raise the Power rank +1CS by choosing to specialize in a specific Physical Resistance. For example, the Player's Book contains listings for Resistances to Fire and Heat, Corrosives, and Disease.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D16",
    "name": "Resistance to Power Manipulation",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero possesses innate cellular or psionic resistance against external powers that dampen, steal, mimic, or duplicate their abilities.",
    "rulesText": "Provides passive resistance equal to power rank against all Power Control attempts (PC1-PC14). Any attacker attempting power draining or duplication must roll against this rank Intensity.",
    "errataNote": "",
    "powerStunts": [
      "Feedback surge stunning power drainers on a Red FEAT"
    ]
  },
  {
    "code": "D17",
    "name": "Resist: Vampirism",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D17",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has increased resistance to any vampiric-type attacks. Such attacks include forms of Psi-, Bio-, Energy, Magic, and Power Vampirism. The hero can ignore any vampiric attack whose rank is less than this Power's rank.",
    "rulesText": "The hero has increased resistance to any vampiric-type attacks. Such attacks include forms of Psi-, Bio-, Energy, Magic, and Power Vampirism. The hero can ignore any vampiric attack whose rank is less than this Power's rank. He can reduce the effectiveness of the vampire's attack by deducting his Power rank number from the vampiric attack's Power rank. When creating the hero, the player can choose to raise the rank +2CS by special- izing in a particular form of Resistance. Detection Powers",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "D20",
    "name": "True Sight",
    "category": "Defensive",
    "source": "UPB Entry D20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can see the correct image of a target, despite any attempts at concealment or disguise. This Power can penetrate any means of hiding something's true nature, whether physical, psionic, illusionary, or power-based. True Sight can penetrate any disguise at or below its rank.",
    "rulesText": "The hero can see the correct image of a target, despite any attempts at concealment or disguise. This Power can penetrate any means of hiding something's true nature, whether physical, psionic, illusionary, or power-based. True Sight can penetrate any disguise at or below its rank. A green FEAT is required at +1CS; a yellow FEAT at +2CS; and a red FEAT at +3CS. Range is limited to one area unless the Power is coupled with a Power that extends his vision (Telescopic Vision, for example). The Power may be automatic or deliberate.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT1",
    "name": "Abnormal Sensitivity",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero's senses function in their normal manner but their normal range of sensitivity is altered. The senses detect what they normally cannot and cannot detect what they normally can. This affects either vision or hearing.",
    "rulesText": "The hero's senses function in their normal manner but their normal range of sensitivity is altered. The senses detect what they normally cannot and cannot detect what they normally can. This affects either vision or hearing. the former case, the hero sees infrared and ultraviolet light, radio waves, and radiation. In the latter case, the hero hears extremely high and low pitches. This may be considered a handicap human characters while for aliens this could be a fact of life.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT2",
    "name": "Circular Vision",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is simple enough to explain. The hero can see 3 degrees around himself. There are two ways to do this.",
    "rulesText": "This is simple enough to explain. The hero can see 3 degrees around himself. There are two ways to do this. The first is the hero's eyes are placed far enough apart that they can see in all directions. Since this is somewhat grotesque, the hero loses - 1CS on his Popularity. The second, more socially acceptable method is the hero possesses a weird lightwarping field that funnels light into his otherwise normal-looking eyes.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT3",
    "name": "Energy Detection",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Range column D. The hero can detect and identify energy and related phenomena. The power can only detect actual energy, not potential energy (it couldn't detect a bomb until it explodes, for example).",
    "rulesText": "Range column D. The hero can detect and identify energy and related phenomena. The power can only detect actual energy, not potential energy (it couldn't detect a bomb until it explodes, for example). Likewise, while it can detect the energies consciously emitted by superhumans, it cannot detect the superhumans themselves. Rank determines range.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT4",
    "name": "Environmental Awareness",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Range column B. The hero has increased sensitivity to conditions in, disturbances in, and influences on the environment. The hero automatically maintains full knowledge of current conditions in his surroundings.",
    "rulesText": "Range column B. The hero has increased sensitivity to conditions in, disturbances in, and influences on the environment. The hero automatically maintains full knowledge of current conditions in his surroundings. This awareness extends to such factors as weather, chemicals, movement, and life. The rank determines the range to which the awareness extends; exceeding it requires a FEAT (+1CS, green; +2CS, yellow; +3CS, red). The hero can gain +1CS by linking his Health to the environment.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT5",
    "name": "Extradimensional",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can sense across the dimensional barrier and see things existing in other dimensions. A list of some of the dimensions in the Marvel Universe is found in Realms of Magic. These include Asgard, the Astral Plane, Avalon, the Dark Dimension, the Demon Dimension, etc.",
    "rulesText": "The hero can sense across the dimensional barrier and see things existing in other dimensions. A list of some of the dimensions in the Marvel Universe is found in Realms of Magic. These include Asgard, the Astral Plane, Avalon, the Dark Dimension, the Demon Dimension, etc. The power rank number equals the number of different dimensions into which the hero can see.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT6",
    "name": "Hyper-Hearing",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect extremely faint sounds and unusual frequencies. He can identify objects by the sounds they emit. Because of the sensitivity of the hero's hearing, he is more vulnerable to sonic attacks (which receive a +1CS against him).",
    "rulesText": "The hero can detect extremely faint sounds and unusual frequencies. He can identify objects by the sounds they emit. Because of the sensitivity of the hero's hearing, he is more vulnerable to sonic attacks (which receive a +1CS against him).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT7",
    "name": "Hyper-Olfactory",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect the presence of minute traces of substances and accurately identify them. This Power is continually functioning; the hero has learned to ignore unpleasant smells. If he loses his ability to mask out nasty odors, he'll be so distracted (and possibly sickened) by the intruding odors that he loses -1CS on Reason and Endurance.",
    "rulesText": "The hero can detect the presence of minute traces of substances and accurately identify them. This Power is continually functioning; the hero has learned to ignore unpleasant smells. If he loses his ability to mask out nasty odors, he'll be so distracted (and possibly sickened) by the intruding odors that he loses -1CS on Reason and Endurance.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT8",
    "name": "Hyper-Touch",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero possesses an Enhanced sense of touch that permits him to detect extremely fine surface details and to identify materials by their surface \"feel.\"",
    "rulesText": "The hero possesses an Enhanced sense of touch that permits him to detect extremely fine surface details and to identify materials by their surface \"feel.\"",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT9",
    "name": "Life Detection",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Range column B. The hero can detect the presence of life and identify the nature of that life. The hero can probe a specific target for more detailed physiological data on a red FEAT.",
    "rulesText": "Range column B. The hero can detect the presence of life and identify the nature of that life. The hero can probe a specific target for more detailed physiological data on a red FEAT. Rank determines the maximum range. A red FEAT allows the hero to locate a specific lifeform in the midst of a number of similar beings. This is one of the Powers that can function as \"Mutant Detection.\"",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT10",
    "name": "Magic Detection",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect and identify magic and its effects. The Power can detect both magic in actual use and in potential. As such, this is another way to detect mutants, although it cannot differentiate them from normal magic-users.",
    "rulesText": "The hero can detect and identify magic and its effects. The Power can detect both magic in actual use and in potential. As such, this is another way to detect mutants, although it cannot differentiate them from normal magic-users. The hero can identify the past use of magic (a green FEAT), a yellow FEAT identifies the magic-user, and a red FEAT identifies the actual spell.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT11",
    "name": "Microscopic Vision",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero I s eyes can focus on extremely minute targets, objects too small for normal vision to perceive. This Power functions in two stages. The first is light magnification; the hero's eyes function as normal microscopes.",
    "rulesText": "The hero I s eyes can focus on extremely minute targets, objects too small for normal vision to perceive. This Power functions in two stages. The first is light magnification; the hero's eyes function as normal microscopes. This allows the hero to see things as small as chromosomes. Beyond this level, light no longer carries images. The second stage of this Power is a variation of Clairvoyance that permits the hero to see miniature, rather than distant, targets.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT12",
    "name": "Penetration Vision",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is commonly called \"X-ray vision\" but may not actually use X-rays. The hero can see through solids; the effect is as if the obscuring material were transformed to clear glass. The Power rank number equals the depth in feet to which this Power can penetrate.",
    "rulesText": "This is commonly called \"X-ray vision\" but may not actually use X-rays. The hero can see through solids; the effect is as if the obscuring material were transformed to clear glass. The Power rank number equals the depth in feet to which this Power can penetrate. The hero can raise this by +1CS by selecting a material that blocks the vision; this material is usually a common element, often lead. Penetration Vision can be coupled with either Telescopic or Microscopic Vision to extend its range and permit the other Power to function despite intervening barriers. If this Power is interfered with by outside forces, the hero might be unable to use his normal vision.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT13",
    "name": "Power Detection",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Range column B. This is another Power that can function as \"Mutant Detection.\" The hero can detect and identify superhuman Powers. He can also identify specific superhumans by their characteristic Powers (an Unearthly FEAT).",
    "rulesText": "Range column B. This is another Power that can function as \"Mutant Detection.\" The hero can detect and identify superhuman Powers. He can also identify specific superhumans by their characteristic Powers (an Unearthly FEAT). The hero can identify the presence of previously invoked power when examining former targets of Power on a Good Intensity FEAT; identify a specific Power on a Remarkable Intensity FEAT; and identify the actual user of the Power on an Amazing Intensity FEAT, provided the hero knows of him.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT14",
    "name": "Psionic Detection",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Range column C. The hero can detect and identify psionic Power and related phenomena. It can detect both actual psionics and the potential to use them.",
    "rulesText": "Range column C. The hero can detect and identify psionic Power and related phenomena. It can detect both actual psionics and the potential to use them. As such, this is the last way to detect mutants. The hero can identify the past use of psionics on a living subject on an Excellent Intensity FEAT; identify the specific psionic Power on an Amazing Intensity FEAT; and on an Unearthly FEAT, provided the hero knows of the user, he can identify the actual possessor of the psionic power.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT15",
    "name": "Radarsense",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Range column B. The hero can gain a three-dimensional picture of his surroundings through the use of electromagnetic waves. The hero both emits and senses these waves.",
    "rulesText": "Range column B. The hero can gain a three-dimensional picture of his surroundings through the use of electromagnetic waves. The hero both emits and senses these waves. He can use the Power to locate and identify targets by their characteristic echoes. Because of the hero's sensitivity to electromagnetic waves, he has an increased vulnerability to electrical and magnetic attacks (-1CS); these temporarily negate the Radarsense. 20 21 ENERGY CONTROL",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT16",
    "name": "Sonar",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Range column B. The hero can gain a three-dimensional picture of his environment through the use of soundwaves. The Power allows the hero to locate and identify targets by the way they reflect sound.",
    "rulesText": "Range column B. The hero can gain a three-dimensional picture of his environment through the use of soundwaves. The Power allows the hero to locate and identify targets by the way they reflect sound. There are two ways this Power can operate. Passive Sonar utilizes existing sound. Active Sonar uses special sounds emitted by the hero (this is how bats and dolphins do it).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT17",
    "name": "Telescopic Vision",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT17",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can magnify distant objects optically, seeing fine details at extreme ranges as though standing inches away.",
    "rulesText": "Multiplies visual range and grants +1CS to visual Perception FEATs at ranges exceeding 2 areas. Higher ranks allow reading newsprint from orbit.",
    "errataNote": "",
    "powerStunts": [
      "Target acquisition bonus for ranged missile attacks (+1CS to Agility)"
    ]
  },
  {
    "code": "DT18",
    "name": "Thermal Vision",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can see infrared light and heat images. This allows the hero to see in the dark, perceive temperature differences (especially those left by a living person's contact with an object), and partially see through solids. In the last case, the hero can only see the heat patterns of objects touching the other side of the barrier.",
    "rulesText": "The hero can see infrared light and heat images. This allows the hero to see in the dark, perceive temperature differences (especially those left by a living person's contact with an object), and partially see through solids. In the last case, the hero can only see the heat patterns of objects touching the other side of the barrier. With practice, the hero can judge the temperature of a target by its thermal color. The hero has an increased risk of being blinded by strong heat sources, even those that don't affect normal vision (-1CS). Thermal vision may be a consciously-activated mode or the hero's normal means of vision.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT19",
    "name": "Tracking",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT19",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect and follow the tracks left by a specific target. The hero can detect environmental and spatial disturbances with the result that at high ranks the hero can actually track across deep space.",
    "rulesText": "The hero can detect and follow the tracks left by a specific target. The hero can detect environmental and spatial disturbances with the result that at high ranks the hero can actually track across deep space.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT20",
    "name": "True Sight",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero perceives reality without distortion, seeing through illusions, cloaking fields, dimensional shifts, and shapeshifting disguises.",
    "rulesText": "Automatically pierces visual illusions, holographic projections, camouflage, and shapeshifting disguises of equal or lesser rank Intensity.",
    "errataNote": "",
    "powerStunts": [
      "Detecting phased or invisible astral projections"
    ]
  },
  {
    "code": "DT21",
    "name": "UV Vision",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT21",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can see ultraviolet light. Because UV light isn't as readily absorbed by water as normal light, this Power enables the hero to see clearly through fog and at greater distance in the water (+1CS). The hero can also see the dim light given off by radioactive materials.",
    "rulesText": "The hero can see ultraviolet light. Because UV light isn't as readily absorbed by water as normal light, this Power enables the hero to see clearly through fog and at greater distance in the water (+1CS). The hero can also see the dim light given off by radioactive materials. The hero cannot actually \"see in the dark\" but only if UV light is present. The effect is the same when seen by normal people. The hero has an increased risk of being blinded by strong UV sources, like black lights and radiation (-2CS).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "DT22",
    "name": "Weakness Detection",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT22",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect flaws and stress points in a target. This doesn't guarantee he can exploit this knowledge, though. The rank determines the types of weaknesses he can detect.",
    "rulesText": "The hero can detect flaws and stress points in a target. This doesn't guarantee he can exploit this knowledge, though. The rank determines the types of weaknesses he can detect. Good or below: physical weakness only. Excellent to Amazing: mental and physical weaknesses. Monstrous and above: mental physical, and Power-based weaknesses.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC1",
    "name": "Absorption Power",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can absorb a specific type of energy and actually gain Health points by converting the energy into Self-Healing. The hero gains a number of Health points equal his Power rank number each time he is hit by his specific form of absorbable energy. This addition to Health quickly heals any damage the hero had suffer, and acts as a buffer to absorb consequent damage.",
    "rulesText": "The hero can absorb a specific type of energy and actually gain Health points by converting the energy into Self-Healing. The hero gains a number of Health points equal his Power rank number each time he is hit by his specific form of absorbable energy. This addition to Health quickly heals any damage the hero had suffer, and acts as a buffer to absorb consequent damage. In the absence of life-sustaining materials, this Power can act as a substitute for air, water, and food. The hero converts energy into healing power for the damage he's taking from suffocation, dehydration, starvation, and any other unpleasant results of not living careful. Unfortunately, this requires a steady supply of energy to convert.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC2",
    "name": "Catalytic Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control the speed at which chemical reactions occur. He can increase or decrease the energies emitted or drained in such reactions by his Power rank number. For example, he could increase the heat, emitted by exothermic reactions like oxidation; he could also increase the chilling effect of endothermic reactions.",
    "rulesText": "The hero can control the speed at which chemical reactions occur. He can increase or decrease the energies emitted or drained in such reactions by his Power rank number. For example, he could increase the heat, emitted by exothermic reactions like oxidation; he could also increase the chilling effect of endothermic reactions. He can increase or decrease the speed or rate at which reactions occur, like stopping iron from dissolving in acid or causing steel to rapidly transform into rust. The hero can also develop a variety of Power stunts: • Causing chemical reactions that are normally impossible, such as anything involving inert gases. • Knocking out self-powered machinery by stopping the reactions that generate their power.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC3",
    "name": "Coldshaping",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control any force that actively decreases the temperature of something else. This can be used to increase or decrease the Cold's Intensity by this Power's rank number. This function overlaps both Heat and Cold Generation but differs in that this Power cannot alter the natural temperature of a target or alter local temperatures to suit the hero's whims.",
    "rulesText": "The hero can control any force that actively decreases the temperature of something else. This can be used to increase or decrease the Cold's Intensity by this Power's rank number. This function overlaps both Heat and Cold Generation but differs in that this Power cannot alter the natural temperature of a target or alter local temperatures to suit the hero's whims. There are two primary functions to this Power. The first is to counteract or supplement cold-based Powers. The hero can alter such Powers as soon as they are emitted from the target's body.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC4",
    "name": "Darkforce Manipulation",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a Power that is unique to campaigns using the Marvel Universe. It does not apply to campaigns set in other parts of the Multiverse. The hero can generate and control the extra-dimensional energy-form known as \"Darkforce.\" This resembles a tangible, impenetrable shadow and possesses several unique characteristics that the hero can use to develop Power Stunts: • Blunt attack damage at Power rank.",
    "rulesText": "This is a Power that is unique to campaigns using the Marvel Universe. It does not apply to campaigns set in other parts of the Multiverse. The hero can generate and control the extra-dimensional energy-form known as \"Darkforce.\" This resembles a tangible, impenetrable shadow and possesses several unique characteristics that the hero can use to develop Power Stunts: • Blunt attack damage at Power rank. • Shadowcasting of Power rank Intensity darkness over a maximum of three areas. • Flight at -1CS speed. • Gateway.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC5",
    "name": "Electrical Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control all forms of electricity, whether natural, artificial, or Power-based. He can control the Intensity and direction of electron streams and alter the conductivity of materials. He can shape electron streams into any desired form.",
    "rulesText": "The hero can control all forms of electricity, whether natural, artificial, or Power-based. He can control the Intensity and direction of electron streams and alter the conductivity of materials. He can shape electron streams into any desired form. This permits him to develop Power stunts based on lightning–constructs designed to perform certain tasks (shields, cages, barriers, etc.) The hero can increase or decrease the electricity's Intensity and reduce damage by his Power rank number. If the electricity is Power-related, then the target's Power rank determines the Intensity of the FEAT the hero must make to gain control. The hero has Power rank Resistance to Electrical Generation.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC6",
    "name": "Energy Conversion",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can simply change any form of energy into any other form. The transformed energy's Intensity is one rank lower than its original level. The hero can transform energy by an Intensity FEAT equal to the target energy's Intensity.",
    "rulesText": "The hero can simply change any form of energy into any other form. The transformed energy's Intensity is one rank lower than its original level. The hero can transform energy by an Intensity FEAT equal to the target energy's Intensity. The hero begins with the ability to transform any energy into one specific form. He can develop the ability to transform energy into other forms as Power stunts. There are two advantages to this Power.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC7",
    "name": "Energy Solidification",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can transform energy into a matrix that simulates solid matter. This matrix may be any shape the hero desires, although greater complexity requires a higher Intensity FEAT to create. For example, simple solids can be formed by a Feeble FEAT.",
    "rulesText": "The hero can transform energy into a matrix that simulates solid matter. This matrix may be any shape the hero desires, although greater complexity requires a higher Intensity FEAT to create. For example, simple solids can be formed by a Feeble FEAT. Animated forms require a Typical FEAT. Likenesses and simple machinery require an Incredible FEAT. The energy matrix possesses Strength equal to the Power rank.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC8",
    "name": "Energy Sponge",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can absorb any form of energy, whether natural or Power-based, and not suffer any damage. The hero can absorb energy equal to his Power rank number. This stored energy can be released at any time the hero desires; upon release it has a lower Intensity than its original state (-2CS).",
    "rulesText": "The hero can absorb any form of energy, whether natural or Power-based, and not suffer any damage. The hero can absorb energy equal to his Power rank number. This stored energy can be released at any time the hero desires; upon release it has a lower Intensity than its original state (-2CS). The hero may also choose to harmlessly dissipate the energy over a long period; this is a number of turns equal to the Intensity rank number. For example, your hero soaks up an Incredible radiation blast. He chooses to re-release it later as a single, Excellent Intensity blast that could really muck up whatever it hit, or he could let the radiation slowly seep away (this takes 40 turns, or four minutes).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC9",
    "name": "Energy Vampirism",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can drain the energy from a target and convert that energy into extra Strength, Endurance, Psyche, and other Powers he possesses. The hero can force a non-living, nor sentient target to release all its energy, an Intensity FEAT equal to the energy potential of the target. For example, an auto battery can be drained on a Typical Intensity FEAT, a gallon of gasoline by Good Intensity FEAT, the magnetism every tape in a music shop on an Excellent intensity FEAT, the heat of a blast furnace on an Amazing Intensity FEAT and so on.",
    "rulesText": "The hero can drain the energy from a target and convert that energy into extra Strength, Endurance, Psyche, and other Powers he possesses. The hero can force a non-living, nor sentient target to release all its energy, an Intensity FEAT equal to the energy potential of the target. For example, an auto battery can be drained on a Typical Intensity FEAT, a gallon of gasoline by Good Intensity FEAT, the magnetism every tape in a music shop on an Excellent intensity FEAT, the heat of a blast furnace on an Amazing Intensity FEAT and so on. Living and/or sentient targets are harder to drain, because they possess Psyche. The target's Psyche determines the Intensity of the FEAT needed. A successful FEAT enables the hero to drain energy from the target.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC10",
    "name": "Fire Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control existing flames, whether natural or Power-based. He can alter any factor involved in combustion without direct physical contact. The hero can increase or decrease the flame's Intensity up to his Power rank and reduce fire damage by his rank number.",
    "rulesText": "The hero can control existing flames, whether natural or Power-based. He can alter any factor involved in combustion without direct physical contact. The hero can increase or decrease the flame's Intensity up to his Power rank and reduce fire damage by his rank number. This Power includes Power rank Resistance to Fire and Heat. The most important aspect of this Power is enabling the hero to reshape flame into any form he desires. This can be used in a variety of Power stunts, as the hero develops numerous fiery constructs to perform miscellaneous deeds.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC11",
    "name": "Gravity Manipulation",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control gravity, the force that attracts all particles to all other particles. Gravity always exists wherever there is tangible matter. (in dimensions composed entirely of energy, though, gravity is optional.) The hero doesn't really generate gravity; he simply changes the Intensity of what's already there.",
    "rulesText": "The hero can control gravity, the force that attracts all particles to all other particles. Gravity always exists wherever there is tangible matter. (in dimensions composed entirely of energy, though, gravity is optional.) The hero doesn't really generate gravity; he simply changes the Intensity of what's already there. He can increase or decrease the Intensity of gravity by his Power rank number. This effect may be centered on himself or projected onto a target. This permit him to develop a variety of Power stunts: • Changing the direction of gravity.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC12",
    "name": "Hard Radiation Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control existing radiation, including X- rays, alpha, beta, gamma, and cosmic rays. The hero can increase or decrease the radiation's Intensity, up to his Power rank, and reduce the damage done by radiation up to his Power rank number. The hero can direct the flow of radiation and can alter its nature by converting any form of radiation to any other form.",
    "rulesText": "The hero can control existing radiation, including X- rays, alpha, beta, gamma, and cosmic rays. The hero can increase or decrease the radiation's Intensity, up to his Power rank, and reduce the damage done by radiation up to his Power rank number. The hero can direct the flow of radiation and can alter its nature by converting any form of radiation to any other form. If a radiation- related Power is involved, the target's Power rank determines the Intensity of the required FEAT. For example, an Amazing Intensity FEAT is required to control Amazing Radiation Emission. Optional Powers include Hard Radiation Emission, Energy Doppelganger, Energy Sheath, Energy Body, and Energy Sustenance.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC13",
    "name": "Kinetic Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control the energy of motion itself. He can increase or decrease kinetic energy's Intensity by his Power rank number. With a Typical Intensity FEAT, he can change the direction of any moving target.",
    "rulesText": "The hero can control the energy of motion itself. He can increase or decrease kinetic energy's Intensity by his Power rank number. With a Typical Intensity FEAT, he can change the direction of any moving target. He can impart momentum as if he physically pushed the target, with his Power rank taken as Strength. The primary purpose of Kinetic Control is to control Telekinesis and Kinetic Bolts. In the former case, the hero can redirect the target's efforts.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC14",
    "name": "Light Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can manipulate existing light. This can be visible, infrared, or ultraviolet light. The hero can alter the intensity, frequency (color, in other words), and coherence of light on a Good Intensity FEAT.",
    "rulesText": "The hero can manipulate existing light. This can be visible, infrared, or ultraviolet light. The hero can alter the intensity, frequency (color, in other words), and coherence of light on a Good Intensity FEAT. The hero can actually change the direction of light 24 and -form crude holograms on a Remarkable Intensity FEAT. Such holograms are little more than clouds or single-color walls. The Power allows +1CS Resistance to Light-based Powers, since the hero can redirect or dispel them.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC15",
    "name": "Magnetic Manipulation",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control magnetic force. He can increase or decrease magnetism's Intensity by his Power rank number. He can use existing magnetism, whether natural or Power-based, to perform any desired task.",
    "rulesText": "The hero can control magnetic force. He can increase or decrease magnetism's Intensity by his Power rank number. He can use existing magnetism, whether natural or Power-based, to perform any desired task. The required Intensity FEAT is equal to the Intensity rank of the magnetism. The hero can alter the polarity of a magnetic field (but not a neutron flow!). He can shape the field into forms to produce any effect.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC16",
    "name": "Plasma Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control fields of highly-charged particles. The hero can increase or decrease the plasma's Intensity and reduce its damage by his Power rank number. The Power includes Power rank Resistance to plasma's effects.",
    "rulesText": "The hero can control fields of highly-charged particles. The hero can increase or decrease the plasma's Intensity and reduce its damage by his Power rank number. The Power includes Power rank Resistance to plasma's effects. The Power has two main uses. The first is shaping plasma fields into any shape desired. This can be developed into a variety of Power stunts as the hero develops numerous plasm a-constructs to perform various deeds.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC17",
    "name": "Radiowave Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC17",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control existing radiowaves, whether AM., FM, or microwaves. The hero can increase or decrease the radiowaves' Intensity by his Power rank number. A Good intensity FEAT permits the hero to alter the frequency and direction of such waves and garble transmissions.",
    "rulesText": "The hero can control existing radiowaves, whether AM., FM, or microwaves. The hero can increase or decrease the radiowaves' Intensity by his Power rank number. A Good intensity FEAT permits the hero to alter the frequency and direction of such waves and garble transmissions. The hero has Power rank Resistance to radio-based attacks; such attacks are normally limited to an opponent thinking he's a microwave oven about to cook the hero's goose. The Power really comes into its own when used as a form of electronic-age Illusion Casting. That is, the hero creates complex signals that simulate an actual broadcast.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC18",
    "name": "Shadowshaping",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is not Darkforce Manipulation; that's handled elsewhere. This Power enables the hero to affect normal shadows and, indirectly, light as well. The hero can shift the location and size of normal shadows.",
    "rulesText": "This is not Darkforce Manipulation; that's handled elsewhere. This Power enables the hero to affect normal shadows and, indirectly, light as well. The hero can shift the location and size of normal shadows. He can form them into two-dimensional images that can do Power rank damage to real targets. The hero can also Remote Sense through these shadow- constructs. The hero can increase or decrease the Intensity of any shadow, whether natural or Power-based, by his Power rank number.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC19",
    "name": "Sound Manipulation",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC19",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control existing sound. He can increase sound's Intensity by one rank by means of a Power rank FEAT or decrease it by his Power rank number. It also provides the hero with Resistance to sound-based Powers; again, his Power rank number decreases the Intensity the attack.",
    "rulesText": "The hero can control existing sound. He can increase sound's Intensity by one rank by means of a Power rank FEAT or decrease it by his Power rank number. It also provides the hero with Resistance to sound-based Powers; again, his Power rank number decreases the Intensity the attack. This is possibly the single most useful Power of all those that don't do actual damage. The uses are infinite: • Muting the voices of an opponent group, thus preventing them from coordinating their actions. • Muting alarms.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC20",
    "name": "Thermal Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero control applied heat or cold; that is, can 25 ENERGY EMISSION 26 control any force that actively changes the temperature of something else. This includes any source of heat or cold, whether natural, artificial, or Power based. The Power overlaps both Heat and Cold Generation but it also differs from them in that this Power cannot affect the natural temperature of a target or alter the local temperature to suit the hero's whim.",
    "rulesText": "The hero control applied heat or cold; that is, can 25 ENERGY EMISSION 26 control any force that actively changes the temperature of something else. This includes any source of heat or cold, whether natural, artificial, or Power based. The Power overlaps both Heat and Cold Generation but it also differs from them in that this Power cannot affect the natural temperature of a target or alter the local temperature to suit the hero's whim. For example, Thermal Control could cool a girder being heated in a furnace, since that thing is being actively heated, but it could not change. the temperature of another girder lying outside the furnace (nothing is being done to that one). Thermal Control is mostly used to counteract or supplement temperature altering Powers.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EC21",
    "name": "Vibration Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC21",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control existing vibrations. These may be natural or Power-based. The hero can increase or decrease the Intensity of the vibration by his Power rank number.",
    "rulesText": "The hero can control existing vibrations. These may be natural or Power-based. The hero can increase or decrease the Intensity of the vibration by his Power rank number. He has Power rank Resistance to Vibration and Sonic attacks. A Power like this can make a hero extremely popular in a quake-prone locale like southern California. Using the Richter scale, these are the required Intensities of the FEATs for controlling each class of earthquake.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE1",
    "name": "Cold Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This Power is the pure form of Ice Generation and one it is often confused with. The hero can emit a field that decreases thermal energy and infrared radiation. The Power decreases the temperature of the target; the amount is determined both by a FEAT and the Power rank number.",
    "rulesText": "This Power is the pure form of Ice Generation and one it is often confused with. The hero can emit a field that decreases thermal energy and infrared radiation. The Power decreases the temperature of the target; the amount is determined both by a FEAT and the Power rank number. A Typical FEAT drops the temperature by 10x the rank number; a Remarkable FEAT drops it by 20x the rank number; and an Unearthly FEAT drops it by 40x the rank number. For example, a hero with Remarkable Cold Generation can lower a target's temperature by 300 (10x30) to 1200 (40x3O) degrees. The only limitation is that the temperature cannot drop lower than absolute zero (-273 degrees Celsius or -459.4 degrees Fahrenheit).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE2",
    "name": "Electrical Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can create electrical streams that can do Power rank damage. The hero can project the electricity through any conductive medium, such as air, water, or metal, at Power rank range. If the player chooses, the hero can gain +2CS to his damage by choosing to limit his range to contact only.",
    "rulesText": "The hero can create electrical streams that can do Power rank damage. The hero can project the electricity through any conductive medium, such as air, water, or metal, at Power rank range. If the player chooses, the hero can gain +2CS to his damage by choosing to limit his range to contact only. In this case, the range can be extended by conducting the Power through solid conductors like metal. Electricity comes in various forms: • Static electricity causes magnetic attraction between objects and can disrupt electronic communications. • Lightning is sheer, raw, destructive power and by far the most popular form of this Power.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE3",
    "name": "Energy Doppelganger",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate an Energy Body from his own body. This Doppelganger can have Powers of its own, including those characteristic to the type of energy of which the Doppelganger is composed. The Doppelganger automatically has the Power of True Flight, While the player can decide which Powers are possessed by whom, a rule of thumb is that the majority of physical Powers are assigned to the Doppelganger.",
    "rulesText": "The hero can generate an Energy Body from his own body. This Doppelganger can have Powers of its own, including those characteristic to the type of energy of which the Doppelganger is composed. The Doppelganger automatically has the Power of True Flight, While the player can decide which Powers are possessed by whom, a rule of thumb is that the majority of physical Powers are assigned to the Doppelganger. The player must also decide whether the Doppelganger is simply an extension of the hero's will or if it has an independent, but obedient, mind. If the player chooses the latter he raises the Power rank +1CS; he can raise it another +1CS by having the lapse into unconsciousness when he uses the Power, since his mind is directly tied into maintaining the Doppelganger's existence. Any damage to the Doppelganger is subtracted from the hero's Psyche.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE4",
    "name": "Fire Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can project fire with Power rank damage and range. These flames have no apparent fuel source and spring from the hero as if he were a living fuel tank. Although the flames' fuel comes out of the proverbial nowhere, free oxygen must be present for the Power to function.",
    "rulesText": "The hero can project fire with Power rank damage and range. These flames have no apparent fuel source and spring from the hero as if he were a living fuel tank. Although the flames' fuel comes out of the proverbial nowhere, free oxygen must be present for the Power to function. If not, the hero can cause a single flame that lasts' only one turn, then fizzles out. At Shift X rank, the hero gains the ability to generate oxygen as well, permitting this Power to function under any conditions. When creating the hero, the player can choose the Powers of Flame Control, Energy Sheath, and Energy Body to fill any slots still open.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE5",
    "name": "Hard Radiation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This covers the dangerous section of the energy spectrum: ultraviolet light, x-rays, and alpha and beta particles, gamma rays, and the ever-popular \"cosmic rays.\" The hero can project any of these types at Power rank range and damage. When creating the hero, the player can raise his rank +1CS by specializing in a particular type of hard radiation. For game purposes, we'll assume that the hero has total control over his own inherent radioactivity and possesses automatic safe-guards that prevent him from fatally contaminating the area each time he uses his Power.",
    "rulesText": "This covers the dangerous section of the energy spectrum: ultraviolet light, x-rays, and alpha and beta particles, gamma rays, and the ever-popular \"cosmic rays.\" The hero can project any of these types at Power rank range and damage. When creating the hero, the player can raise his rank +1CS by specializing in a particular type of hard radiation. For game purposes, we'll assume that the hero has total control over his own inherent radioactivity and possesses automatic safe-guards that prevent him from fatally contaminating the area each time he uses his Power. This Power is linked to Radiation Control; the player can exchange one of his other Powers for Radiation Control when creating the hero, if he so desires.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE6",
    "name": "Heat",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate pure heat that is not necessarily accompanied by light or flame by accelerating molecular motion. This permits the hero to do rank level effects over target materials. Some Power Stunts using pure heat include: • Causing the breakdown of molecular or even atomic bonds (Amazing and Unearthly FEATs, respectively).",
    "rulesText": "The hero can generate pure heat that is not necessarily accompanied by light or flame by accelerating molecular motion. This permits the hero to do rank level effects over target materials. Some Power Stunts using pure heat include: • Causing the breakdown of molecular or even atomic bonds (Amazing and Unearthly FEATs, respectively). • Negating a target's magnetism • Negating a target's electrical conductivity. • Strengthening materials by heat-treating. • Changing local weather by heating the air; this can cause small cyclones and electrical storms.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE7",
    "name": "Kinetic Bolt",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a crude form of M30/Telekinesis. The hero can strike a target with a surge of force at Power rank range and damage. The Kinetic Bolt can be shaped as desired by the hero.",
    "rulesText": "This is a crude form of M30/Telekinesis. The hero can strike a target with a surge of force at Power rank range and damage. The Kinetic Bolt can be shaped as desired by the hero. It can be a wide cylinder, or an incredibly fine needle. Its effect is the same as if the target had been struck by a solid object of equal material strength. This Power can affect only tangible materials.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE8",
    "name": "Light Emission",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can emit powerful bursts of light do Power rank damage at rank range. The light may be of any nature: • Normal light in any color or intensity; the hero can light the area, dispel Shadow Powers, and temporarily blind targets. • Coherent Light (lasers) do rank level heat damage as they burn into targets.",
    "rulesText": "The hero can emit powerful bursts of light do Power rank damage at rank range. The light may be of any nature: • Normal light in any color or intensity; the hero can light the area, dispel Shadow Powers, and temporarily blind targets. • Coherent Light (lasers) do rank level heat damage as they burn into targets. Lasers can also be used to carry information or to create holograms. • Optic blasts do rank level damage but rather than burn a target, they act as Kinetic Bolts. The player can raise the hero's rank upon creation by +2CS if he chooses specialization in a specific form of this Power.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE9",
    "name": "Magnetism",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate intense magnetic force. The magnetic field may be centered on the hero's body or be projected at rank range. The field can affect anything susceptible to magnetism, attracting it with Power rank Strength.",
    "rulesText": "The hero can generate intense magnetic force. The magnetic field may be centered on the hero's body or be projected at rank range. The field can affect anything susceptible to magnetism, attracting it with Power rank Strength. If the target itself is magnetic, the hero can attract it at +1CS or repel it at Power rank. The hero can induce magnetism into any materials that can sustain a magnetic field; these include ferrous materials, iron-bearing clays and plastics, and ferrous ores. The hero can do rank level damage to electronic devices by scrambling internal signals; this is especially effective against magnetic recordings and micro-chip dependent devices.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE10",
    "name": "Plasma Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Plasma refers to here to a field of highly-charged particles. Common examples include the aurora borealis, the glow in a fluorescent tube, the Van Allen Belt, and the heart of a nuclear blast. Plasmas may be of any nature: fiery, magnetic, electrical, radioactive, or be of a previously unknown form of energy.",
    "rulesText": "Plasma refers to here to a field of highly-charged particles. Common examples include the aurora borealis, the glow in a fluorescent tube, the Van Allen Belt, and the heart of a nuclear blast. Plasmas may be of any nature: fiery, magnetic, electrical, radioactive, or be of a previously unknown form of energy. This last group includes many super-powers, living energy fields, and beings who can transform themselves into pure energy. The hero can project Plasma fields at Power rank range. Due to the unique nature of this Power, it does damage on two levels.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE11",
    "name": "Radiowave Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate radiowaves, including AM and FM signals and microwaves. This Power primarily affects broadcasting and electronics; the Power can do rank damage over rank range to these. The Power can also be used to directly affect any target by internally heating it through microwave bombardment.",
    "rulesText": "The hero can generate radiowaves, including AM and FM signals and microwaves. This Power primarily affects broadcasting and electronics; the Power can do rank damage over rank range to these. The Power can also be used to directly affect any target by internally heating it through microwave bombardment. Used in this manner, the Power has -2CS on its damage and range. Optional Powers include Radiowave Control, Energy Sheath, and Carrier Wave. Nemeses include Radiowave Control, Energy Absorption, and Force Field vs.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE12",
    "name": "Shadowcasting",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can emit a field that decreases light and radiation. The obscured energy's Intensity is lowered by the Power's rank taken as Intensity. The energy forms that can be affected by this Power are Light, Heat, Hard Radiation, Radiowaves, Energy Doppelgangers, and Energy Bodies.",
    "rulesText": "The hero can emit a field that decreases light and radiation. The obscured energy's Intensity is lowered by the Power's rank taken as Intensity. The energy forms that can be affected by this Power are Light, Heat, Hard Radiation, Radiowaves, Energy Doppelgangers, and Energy Bodies. The hero possesses the ability to affect only Light when his Power is at Good rank. At each rank above Good, he gains the ability to affect another energy form in the following order: EX-Heat, RM-Hard Radiation, IN-Radiowaves, AM-Energy Doppelgangers, MN-Energy Bodies. This Power includes the ability to see clearly through his own natural or Power- created shadows of Intensity less that the hero's Power rank.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE13",
    "name": "Sonic Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate intense sound and make attacks of Power rank range and damage. This Power can generate frequencies normally inaudible. The hero can disrupt other sound-based Powers by creating dissonance as his harmonics clash with the second Power's harmonics.",
    "rulesText": "The hero can generate intense sound and make attacks of Power rank range and damage. This Power can generate frequencies normally inaudible. The hero can disrupt other sound-based Powers by creating dissonance as his harmonics clash with the second Power's harmonics. The hero's own rank is subtracted from the target harmonic's Intensity. Optional Powers include Sonic Control, Vibration, and Vibration Control. Nemeses are this Power itself and the three just listed.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "EE14",
    "name": "Vibration",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate non-audible vibrations. These can alter existing harmonics, effectively negating any sonic- or vocal-based Power. The hero can cause tremors at Power rank range and damage.",
    "rulesText": "The hero can generate non-audible vibrations. These can alter existing harmonics, effectively negating any sonic- or vocal-based Power. The hero can cause tremors at Power rank range and damage. The Power can even be used to incapacitate living targets; effects can vary from motion sickness (nausea and vomiting) to death by internal hemmorhaging. This Power includes Resistance to Vibratory attacks. Optional Powers include Vibration Control and Sonic Generation.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "F1",
    "name": "Berserker",
    "category": "Fighting",
    "source": "UPB Table p. 16-19 & Entry F1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can enter into a battle rage that alters the hero in some significant ways. Reason and Psyche plummet to Feeble rank while the ranks for Strength and Fighting increase by the same number of ranks. (That is, the total number of points lost are split evenly between the Fighting and Strength ranks.) The hero also develops Iron Will for the duration of the Berserker rage; the rank for this is the same as the Berserker Power's rank.",
    "rulesText": "The hero can enter into a battle rage that alters the hero in some significant ways. Reason and Psyche plummet to Feeble rank while the ranks for Strength and Fighting increase by the same number of ranks. (That is, the total number of points lost are split evenly between the Fighting and Strength ranks.) The hero also develops Iron Will for the duration of the Berserker rage; the rank for this is the same as the Berserker Power's rank. The Berserker lasts for the length of combat and 10 turns. When the rage ends, all the altered Abilities return to their original ranks. Since the Iron Will also disappears, the hero finally feels the effects of any damage he suffered while in the Berserker rage.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "F2",
    "name": "Martial Supremacy",
    "category": "Fighting",
    "source": "UPB Table p. 16-19 & Entry F2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "In the MARVEL SUPER HEROES game system Fighting is considered an Ability, not a Power. However, this Power increases a hero's already-mastered Martial Arts (a Talent in the game system) to dramatically higher levels and allows him to perform actions that would otherwise be impossible, like splitting a battleship in two with a single karate chop. Martial Arts as explained in the Advanced Set falls into five categories labeled A through E for simplicity's sake: • A-This form uses the opponent's Strength against him and permits the hero to Stun or Slam an opponent regardless of their relative Strengths and Endurances.",
    "rulesText": "In the MARVEL SUPER HEROES game system Fighting is considered an Ability, not a Power. However, this Power increases a hero's already-mastered Martial Arts (a Talent in the game system) to dramatically higher levels and allows him to perform actions that would otherwise be impossible, like splitting a battleship in two with a single karate chop. Martial Arts as explained in the Advanced Set falls into five categories labeled A through E for simplicity's sake: • A-This form uses the opponent's Strength against him and permits the hero to Stun or Slam an opponent regardless of their relative Strengths and Endurances. • B-This form is keyed to offense by inflicting damage by short, quick bursts. The hero gains +1CS Fighting when engaged in unarmed combat. • C-This form concentrates on holds and escapes.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "F3",
    "name": "Natural Weaponry",
    "category": "Fighting",
    "source": "UPB Table p. 16-19 & Entry F3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero's body contains special anatomical features that can function as weapons. These may be of any nature and can be external, internal, or retractable. If these are damaged the hero suffers as if they were normal body parts.",
    "rulesText": "The hero's body contains special anatomical features that can function as weapons. These may be of any nature and can be external, internal, or retractable. If these are damaged the hero suffers as if they were normal body parts. When creating the hero, the player decides the nature of the weaponry. The weaponry chosen possesses this Power and rank taken as material strength for purposes of determining potential damage. Each time the player rolls this Power, he can add another weapon to the hero.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "F4",
    "name": "Weapons Creation",
    "category": "Fighting",
    "source": "UPB Table p. 16-19 & Entry F4",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create any desired weapon out of thin air. The weapon can be of any design, size, and material. The size of the weapon is limited by its weight.",
    "rulesText": "The hero can create any desired weapon out of thin air. The weapon can be of any design, size, and material. The size of the weapon is limited by its weight. The hero can only create in a single turn a maximum number of ounces equal to his Power rank number. Heavier weapons have to be assembled in pieces over a span of several turns. While the material strength of the created weapon is the same as that of a normally-manufactured weapon of the same type, its duration is much shorter.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "F5",
    "name": "Weapons Tinkering",
    "category": "Fighting",
    "source": "UPB Table p. 16-19 & Entry F5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can devise and assemble any weapon that can be made with the available materials. By means of a red FEAT, the hero can even improvise a means of creating unavailable materials (adamantium, for example). Provided he has the resources, the hero can assemble a functional copy of any weapon.",
    "rulesText": "The hero can devise and assemble any weapon that can be made with the available materials. By means of a red FEAT, the hero can even improvise a means of creating unavailable materials (adamantium, for example). Provided he has the resources, the hero can assemble a functional copy of any weapon. As to what weapons he can make, use the Resource costs listed in the Hardware section of the Player's Book (pages 42-46). Compare the Power's rank with the cost of the desired weapon. Equal or lower cost weapons can be created on a green FEAT.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "F6",
    "name": "Weapons Modification / Enhanced Weaponry",
    "category": "Fighting",
    "source": "Dragon Magazine #134 p. 89 (The Ultimate Addenda's Addenda)",
    "defaultRank": "Remarkable",
    "countsAsTwo": false,
    "description": "The innate or practiced ability to modify, enhance, or channel personal energy through handheld weapons, increasing their lethality, durability, and effectiveness.",
    "rulesText": "Grants +1CS to Fighting when wielding modified weapons, increases the weapon's effective Material Strength up to Power Rank, and allows channeling personal energy blast powers directly through weapon strikes.",
    "errataNote": "Combat synergy: Can be stacked with Weapon Specialization talents up to Shift Z caps.",
    "powerStunts": [
      "Infusing non-lethal blunt weapons with stun charges",
      "Disarming at +2CS"
    ]
  },
  {
    "code": "I1",
    "name": "Animate Image",
    "category": "Illusory",
    "source": "UPB Table p. 16-19 & Entry I1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a specialized form of Illusion-casting that enables the hero to apparently bring any flat image to life. Whatever the original nature of the image—drawing, painting, photograph, print—the image gains three- dimensionality and independent movement. A blank white area now fills the area formerly occupied by the newly solidified Image.",
    "rulesText": "This is a specialized form of Illusion-casting that enables the hero to apparently bring any flat image to life. Whatever the original nature of the image—drawing, painting, photograph, print—the image gains three- dimensionality and independent movement. A blank white area now fills the area formerly occupied by the newly solidified Image. In actuality, the hero has created two Illusions. The obvious one is the Animated Image that has peeled itself away from its flat background and filled out into three dimensions. The second, more subtle Illusion is the \"blank white area.\" The hero automatically casts this Illusion to mask out the still-existing original picture; this secondary Illusion lasts for 10-20 turns or until the primary Illusion ceases to exist, whichever comes first.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "I2",
    "name": "Illusion-Casting",
    "category": "Illusory",
    "source": "UPB Table p. 16-19 & Entry I2",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create realistic holographic images that have apparent solidity. These Illusions can be mechanically detected and recorded by such means as photography or television. That separates this Power from the psionic, image-generating Power called Hallucinations, which produces images directly in the target's mind and cannot affect mechanical senses.",
    "rulesText": "The hero can create realistic holographic images that have apparent solidity. These Illusions can be mechanically detected and recorded by such means as photography or television. That separates this Power from the psionic, image-generating Power called Hallucinations, which produces images directly in the target's mind and cannot affect mechanical senses. The Illusion can take any size or appearance the hero desires and is limited only by his imagination. The Illusion can be a realistic simulation, a fanciful creation direct from the hero's mind, or an abstract display of light. The hero is playing with light itself and can create anything that is visible.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "I3",
    "name": "Illusory Invisibility",
    "category": "Illusory",
    "source": "UPB Table p. 16-19 & Entry I3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is not true Invisibility but is actually a clever simulation. The effects are nearly the same, anyway; the hero becomes effectively invisible to any living or artificial being. The hero actually remains visible but he can now surround himself with a holographic Illusion of empty space.",
    "rulesText": "This is not true Invisibility but is actually a clever simulation. The effects are nearly the same, anyway; the hero becomes effectively invisible to any living or artificial being. The hero actually remains visible but he can now surround himself with a holographic Illusion of empty space. This field can be limited to the hero's body or increased to cover a large area. The maximum radius of this effect is the number of feet equal to the Power rank number. For example, a Poor rank could cover an area extending four feet from the hero, a Monstrous rank could cover an area extending 75 feet, and a Class 1000 rank could cover a square mile.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "I4",
    "name": "Illusory Duplication",
    "category": "Illusory",
    "source": "UPB Table p. 16-19 & Entry I4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a specialized form of Illusion-Casting that permits the hero to generate completely realistic simulations of a single object, namely himself. Unlike the other Illusory Powers, this permits the hero to see through these nonexistent senses and to communicate through apparently normal speech. The hero can create a finite number of exact holographic duplicates of himself.",
    "rulesText": "This is a specialized form of Illusion-Casting that permits the hero to generate completely realistic simulations of a single object, namely himself. Unlike the other Illusory Powers, this permits the hero to see through these nonexistent senses and to communicate through apparently normal speech. The hero can create a finite number of exact holographic duplicates of himself. These are Illusions based on his selfimage, which the hero had best make sure matches his actual appearance at that moment. The accuracy of the Duplicate is determined by a Reason FEAT made at the time the Duplicate is generated. A green Reason FEAT means the Illusory Duplicates are somehow different from the hero; they have the wrong outfit on, are too muscular or handsome, and so on.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L1",
    "name": "Biophysical Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L1",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero has the ability to consciously alter the physiology of a target. This is accomplished by sheer force of will and does not require any physical action on the hero's part, aside from touching the target. The Power can be used at a distance but each 10 feet separating the hero from the target reduces his effective Power by -1CS.",
    "rulesText": "The hero has the ability to consciously alter the physiology of a target. This is accomplished by sheer force of will and does not require any physical action on the hero's part, aside from touching the target. The Power can be used at a distance but each 10 feet separating the hero from the target reduces his effective Power by -1CS. The Power is normally concentrated on a single target, but the hero can affect as many targets as he desires. Each additional target also decreases the rank -1CS. For example, trying to affect two targets at a distance of 10 feet drops the hero's rank -4CS (-2CS per target).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L2",
    "name": "Bio-Vampirism",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L2",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The character is a super-carnivore able to increase his Strength, Endurance, Psyche, and Power ranks by consuming living biological materials. The most common examples of Bio-Vampires are the traditional blood- suckers like Dracula. Although all the traditional vampires were destroyed on Earth in the Marvel Universe, this does not prevent the player or Judge from creating a new race of BioVampires able to withstand the spells that finally destroyed Dracula.",
    "rulesText": "The character is a super-carnivore able to increase his Strength, Endurance, Psyche, and Power ranks by consuming living biological materials. The most common examples of Bio-Vampires are the traditional blood- suckers like Dracula. Although all the traditional vampires were destroyed on Earth in the Marvel Universe, this does not prevent the player or Judge from creating a new race of BioVampires able to withstand the spells that finally destroyed Dracula. As a new type of Bio- Vampire, your character need not follow the traditional abilities and limitations associated with the old Vampires. It's a new world and a new Vampire. Bio-Vampires have a Bonus Power of Mind Control/Puppetry that renders their victims unable to physically struggle against the Bio-Vampire.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L3",
    "name": "Body Transformation—Others",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter the nature of elements and compounds within a living target's body. Innate safe-guards in the Power maintain the target's lifeforce for as long as the target is in the altered state. Such states are not necessarily mobile, but if they are, they may require the target to move in new ways.",
    "rulesText": "The hero can alter the nature of elements and compounds within a living target's body. Innate safe-guards in the Power maintain the target's lifeforce for as long as the target is in the altered state. Such states are not necessarily mobile, but if they are, they may require the target to move in new ways. While in a solid altered state, the target retains his overall normal appearance. If liquid or gaseous, he can assume any shape but can still automatically revert to his original shape when the Power's effects end. When transforming a target, the hero normally changes the entire body unless the player states beforehand which specific section he is changing.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L4",
    "name": "Emotion Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter a target's emotional state and resulting activity by forcing him to feel a particular emotion. The hero can only instill one emotion at a time. However, he can select any emotion he desires.",
    "rulesText": "The hero can alter a target's emotional state and resulting activity by forcing him to feel a particular emotion. The hero can only instill one emotion at a time. However, he can select any emotion he desires. When creating the hero, the player can raise the rank +2CS by limiting the hero to a specific emotion. For example, the Purple Man broadcasts only the emotion of loyalty. Range and duration are determined by the Power rank.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L5",
    "name": "Exorcism",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can release a being from any external domination imposed by a third party. Such controls include Possession, Mental Domination, Serial Immortality, and Magic. If there's a control, this Power can break it.",
    "rulesText": "The hero can release a being from any external domination imposed by a third party. Such controls include Possession, Mental Domination, Serial Immortality, and Magic. If there's a control, this Power can break it. This Power rank is compared to that of the Power controlling the subject. A Typical Intensity FEAT can sever a lower ranking control Power. A Remarkable Intensity FEAT severs a controlling Power of equal rank, and an Amazing Intensity FEAT severs one of one or more ranks higher.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L6",
    "name": "Force Field vs. Hostiles",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero emits a psionic aura that repels any hostile lifeforms. The Power automatically probes the minds of anyone in the area and analyzes their intentions toward the hero. Anything harmful is repulsed, as if a Power rank material strength wall had risen between them.",
    "rulesText": "The hero emits a psionic aura that repels any hostile lifeforms. The Power automatically probes the minds of anyone in the area and analyzes their intentions toward the hero. Anything harmful is repulsed, as if a Power rank material strength wall had risen between them. Neutral or friendly life is not affected by this field. Okay, I hear you asking: \"What if somebody starts out friendly, but turns hostile after he's inside the field?\" The answer is, he's catapulted harmlessly out of the field. Rank determines the size and material strength of the field.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L7",
    "name": "Forced Reincarnation",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can capture disembodied spirits and merge them into new bodies. The spirits can be the newly-dead, ghosts, or Free Spirits. The bodies.",
    "rulesText": "The hero can capture disembodied spirits and merge them into new bodies. The spirits can be the newly-dead, ghosts, or Free Spirits. The bodies. can be anythingnewborn infants, clones, androids, robots, animals, or plants. Because of the Power's interference, the reincarnated person retains his full memories and Mental Powers. The spirit is permanently bonded to the new body for as long as that body lives, unless the bond is deliberately broken by the spirit (a red Psyche FEAT) or by a hero with Exorcism Power (L5).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L8",
    "name": "Grafting",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L8",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is the single most likely candidate for raw abuse and grossing out your fellow players. This Power is strictly Mad Scientist material. (it does have its good side, too, though.) The hero can perform psionically augmented surgery on a subject.",
    "rulesText": "This is the single most likely candidate for raw abuse and grossing out your fellow players. This Power is strictly Mad Scientist material. (it does have its good side, too, though.) The hero can perform psionically augmented surgery on a subject. The hero can operate on, dissect, rearrange, and perform transplants without the need for normal medical -techniques to ensure success. No matter how crude the conditions in which the operation is performed or how messy it proves to be, the subject's lifeforce is preserved. There is no major blood loss nor is there any need for extensive recuperation.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L9",
    "name": "Hypnotic Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a Talent in the Advanced Set. The hero can dominate a target's behavior and actions by implanting commands, not by direct psionic control. The Hypnotic command may pertain to current conditions or lie dormant until triggered by future conditions (post-hypnotic suggestion).",
    "rulesText": "This is a Talent in the Advanced Set. The hero can dominate a target's behavior and actions by implanting commands, not by direct psionic control. The Hypnotic command may pertain to current conditions or lie dormant until triggered by future conditions (post-hypnotic suggestion). Hypnotic controls come in two forms: • Commands alter current behavior. \"You are getting sleepy.\" • Suggestions alter future behavior. \"You hate orange, rocky skin and must destroy anything with it.\" Normal hypnosis cannot make a person perform any action that goes against his sense of ethics.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L10",
    "name": "Mind Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L10",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero has the ability to directly control a target's mind - through psionic Powers. The hero completely overrides the will and perhaps even the conscious mind of the target. There are four forms of Mind Control: • Puppetry—the target mind retains awareness but cannot control the body.",
    "rulesText": "The hero has the ability to directly control a target's mind - through psionic Powers. The hero completely overrides the will and perhaps even the conscious mind of the target. There are four forms of Mind Control: • Puppetry—the target mind retains awareness but cannot control the body. • Possession—the target mind loses both control and consciousness. • Negation—the target mind is completely turned off; Mental Probes show that no mind exists in the target's body. • Magnification—The target mind is actually enhanced.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L11",
    "name": "Mind Transferral",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L11",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero has the ability to switch minds from one body to another. The hero's own mind and body need not be included in any switching that occurs. The Power operates much like Mental Duplication, in that the hero reshapes the brains of his targets to conform to those he is switching.",
    "rulesText": "The hero has the ability to switch minds from one body to another. The hero's own mind and body need not be included in any switching that occurs. The Power operates much like Mental Duplication, in that the hero reshapes the brains of his targets to conform to those he is switching. In effect, the target believes he is the switched mind and thus effectively is that new person. The accuracy of such transfers is 100%. Because of the nature of this Power, the hero can also transfer one mind into several people simultaneously, with each believing he is the real person.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L12",
    "name": "Neural Manipulation",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter a target's neural activity. By changing nerve messages within the target's body, the hero can cause a variety of effects. • Disruption: The target's body loses all sensations; it falls to the ground, a limp, aumb mass of flesh.",
    "rulesText": "The hero can alter a target's neural activity. By changing nerve messages within the target's body, the hero can cause a variety of effects. • Disruption: The target's body loses all sensations; it falls to the ground, a limp, aumb mass of flesh. • Paralysis: The target body becomes cz):npletely rigid. No chemical can counteract the paralysis while the Power is in effect. • Seizure: The target's muscles spasm uncontrollably for as long as the Power is in effect.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L13",
    "name": "Plague Carrier",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can contain within his body and release at will a variety of disease-causing microorganisms (bacteria, germs, viruses). The hero is immune to any disease (otherwise he'd have died as soon as he gained this dubious Power) but he can instantly infect others at will with diseases of his choosing. Symptoms appear 1-10 turns later.",
    "rulesText": "The hero can contain within his body and release at will a variety of disease-causing microorganisms (bacteria, germs, viruses). The hero is immune to any disease (otherwise he'd have died as soon as he gained this dubious Power) but he can instantly infect others at will with diseases of his choosing. Symptoms appear 1-10 turns later. Curiously, victims are not themselves contagious to others. Obviously the Power alters the genetics of the diseasecausing organisms and weakens them so that they can only survive within the hero and the first new body into which they are introduced. Upon the death of the victim or the end of the Power's duration, all the microbes die as well.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L14",
    "name": "Plant Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can impart limited movement and self-awareness to normally unintelligent plants. The plants obey simple commands, and possess rudimentary communication and senses. The hero can accelerate the plants' growth somewhat, but cannot make it exceed normal limits on size or shape.",
    "rulesText": "The hero can impart limited movement and self-awareness to normally unintelligent plants. The plants obey simple commands, and possess rudimentary communication and senses. The hero can accelerate the plants' growth somewhat, but cannot make it exceed normal limits on size or shape. Rank determines the number of plants affected and the duration of the control. Exceeding the number of controlled plants decreases the duration -1CS per additional 10%. Controlled plants have their own characteristics and ranks that are increased to the hero's Power rank, where applicable.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L15",
    "name": "Plant Growth",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to make plants grow nearly instantaneously, and far larger than normal. The Power can force a seed to sprout immediately and gives it the ability to thrive, even in the absence of normal nutrients (light, soil, and water). The hero can affect existing plants and seeds or use seeds and sprouts carried with him.",
    "rulesText": "The hero has the ability to make plants grow nearly instantaneously, and far larger than normal. The Power can force a seed to sprout immediately and gives it the ability to thrive, even in the absence of normal nutrients (light, soil, and water). The hero can affect existing plants and seeds or use seeds and sprouts carried with him. In the latter case, the player must make a list of the types of seeds the hero carries oust as a weapons specialist needs a list of those with which he is proficient). This Power does not change the natural abilities of the affected plants; it only enhances them up to the Power's rank. This Power requires the player to develop some rudimentary knowledge of botany, since the more the player knows about plants, the more stunts the hero can perform.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L16",
    "name": "Sense Alteration",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can deliberately change the manner in whic a target either receives sensory stimuli processes it within the brain. The simplest form negates one or more of the senses, producing instant blindness, deafness, numbness, and so on. More complex is the ability to modify the senses.",
    "rulesText": "The hero can deliberately change the manner in whic a target either receives sensory stimuli processes it within the brain. The simplest form negates one or more of the senses, producing instant blindness, deafness, numbness, and so on. More complex is the ability to modify the senses. The hero can amplify some elements and negate others. For example, the hero might make a target literall see red (and only red). The most complex form is Hallu- cinations.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L17",
    "name": "Shapechange-Others",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L17",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero has the ability to change the shapes of other living beings. The result can take any shape and appearance the hero wishes: animal, vegetable, mineral. The target's basic physiology remains unchanged despite the apparent differences between the original and new forms.",
    "rulesText": "The hero has the ability to change the shapes of other living beings. The result can take any shape and appearance the hero wishes: animal, vegetable, mineral. The target's basic physiology remains unchanged despite the apparent differences between the original and new forms. When Shapechanging a target, the hero must make sure that the new form still allows basic life functions to continue (especially breathing!). If not, using the Power constitutes a Kill result and all tht bad Karma entailed therein. When creating the hero, the player ca.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L18",
    "name": "Sleep-Induced",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a nice, simple, straight-forward Power that is hardly ever used in any comic because it's not terribly dramatic. Nor is it exactly cricket. The hero has the ability to put any target into a deep sleep, from which he cannot awake while the Power is in effect.",
    "rulesText": "This is a nice, simple, straight-forward Power that is hardly ever used in any comic because it's not terribly dramatic. Nor is it exactly cricket. The hero has the ability to put any target into a deep sleep, from which he cannot awake while the Power is in effect. During this induced sleep, the target is completely helpless (see what I mean about not being cricket?). On the other hand, when you're facing 325 battle-crazed Skrulls, this Power can be really handy. The Power rank determines the range and duration of the Power.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L19",
    "name": "Spirit Storage",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L19",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can capture and indefinitely hold within himself any number of disembodied spirits. Such spirits find themselves within a pocket dimension of the hero's creation; while within it, they retain a semblance to their original forms. This pocket dimension can have any appearance.",
    "rulesText": "The hero can capture and indefinitely hold within himself any number of disembodied spirits. Such spirits find themselves within a pocket dimension of the hero's creation; while within it, they retain a semblance to their original forms. This pocket dimension can have any appearance. The one within Adam Warlock's Soulgem was a rather pleasant park. The hero can freely communicate with any spirits held within. He is immune to any attempts they might make to possess his body.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L20",
    "name": "Summoning",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can summon and control extra-dimensional, corPoreal beings. Such beings are commonly called \"demons\" but may be of any nature or disposition. The Power enables the hero to sumMon any known extra-dimensional being, Provided his Power rank is higher than the being's Psyche rank, on a green FEAT.",
    "rulesText": "The hero can summon and control extra-dimensional, corPoreal beings. Such beings are commonly called \"demons\" but may be of any nature or disposition. The Power enables the hero to sumMon any known extra-dimensional being, Provided his Power rank is higher than the being's Psyche rank, on a green FEAT. Equal ranks require a yellow FEAT. Trust me, you don't want to summon beings more powerful than you (they might answer), but if you do it anyway, you need a red FEAT. The summoned being is instantly teleported from its home dimension to a spot chosen by the hero.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "L21",
    "name": "Undead Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L21",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can dominate the wills and actions of previously living, still-corporeal beings. Such beings are often called \"zombies\" or “zuvembies\" and are only semi- intelligent. Controlling them requires a green FEAT.",
    "rulesText": "The hero can dominate the wills and actions of previously living, still-corporeal beings. Such beings are often called \"zombies\" or “zuvembies\" and are only semi- intelligent. Controlling them requires a green FEAT. Controlling fully intelligent, more powerful undead like mummies or vampires requires a red FEAT. Once control is established, the hero can order the undead to perform any task he desires, so long as it is within their ability. Control ceases when the task is accomplished, but can be reinstated at that time.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M1",
    "name": "Clairaudience",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can \"hear\" distant sounds and voices despite any intervening distance or barriers. The Power is not hindered by factors that affect normal sound transmission, such as distance, time lag, muffling, distortion, or the absence of a transmitting medium. Because of this, Clairaudience has superior range over Hyper-Hearing.",
    "rulesText": "The hero can \"hear\" distant sounds and voices despite any intervening distance or barriers. The Power is not hindered by factors that affect normal sound transmission, such as distance, time lag, muffling, distortion, or the absence of a transmitting medium. Because of this, Clairaudience has superior range over Hyper-Hearing. Only Clairaudience enables the hero to hear across a vacuum, for example. Unfortunately, Clairaudience can act as a pipeline to direct another's Psionic or Sonic attacks toward the hero. Because of this side-effect, the hero is -1CS to resist such attacks.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M2",
    "name": "Clairvoyance",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can \"see\" distant sights without directly seeing it with his eyes. The hero receives a visual simulation of what he would see if he were actually present at the scene. The Power is not hindered by any of the factors that affect normal light transmission, such as distance, blockage, obscurement, and time lag.",
    "rulesText": "The hero can \"see\" distant sights without directly seeing it with his eyes. The hero receives a visual simulation of what he would see if he were actually present at the scene. The Power is not hindered by any of the factors that affect normal light transmission, such as distance, blockage, obscurement, and time lag. It can be used to see things that are impossible for a telescope or Telescopic Vision. For example, a Monstrous Clairvoyant could see current conditions inside a sealed room on the surface of Venus. The ranges for this Power are shown on Column E of the Range Table.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M3",
    "name": "Communicate with Animals",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can understand and use the languages employed by animals and other non-sentient lifeforms. The Power can be used to communicate with non- sentient alien creatures but not intelligent aliens. The degree of difference between the hero and the animal determines what color FEAT is required.",
    "rulesText": "The hero can understand and use the languages employed by animals and other non-sentient lifeforms. The Power can be used to communicate with non- sentient alien creatures but not intelligent aliens. The degree of difference between the hero and the animal determines what color FEAT is required. Assuming the hero is human, a green FEAT permits communication with mammals. A yellow FEAT permits communication with birds and reptiles. A red FEAT covers everything else.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M4",
    "name": "Communicate with Cybernetics",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can directly communicate with complex machines, whether these are computers or machines not normally considered to have artificial intelligence. Any machine that possesses any kind of programming can be communicated with- calculators, digital watches, microwave ovens, even music boxes. The higher the rank, the simpler the machine that can be spoken to.",
    "rulesText": "The hero can directly communicate with complex machines, whether these are computers or machines not normally considered to have artificial intelligence. Any machine that possesses any kind of programming can be communicated with- calculators, digital watches, microwave ovens, even music boxes. The higher the rank, the simpler the machine that can be spoken to. A green FEAT can communicate with a machine possessing several microchips; a computer is the most common example. A yellow FEAT communicates with devices possessing a single microchip, such as watches and talking dolls. A red FEAT communicates with machines that lack microchips but are still somehow programmed, like player pianos and hand-cranked adding machines.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M5",
    "name": "Communicate with Non-Living",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can psychometrically perceive impressions, history, and residual psychic vibrations stored within inanimate objects.",
    "rulesText": "Allows psychic dialogue with materials and artifacts, revealing previous handlers, violent events in the area, and structural weak points.",
    "errataNote": "",
    "powerStunts": [
      "Instant forensic reconstruction of a crime scene from room dust"
    ]
  },
  {
    "code": "M6",
    "name": "Communicate with Plants",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can speak with plants. Anything that has a vegetable physiology can be affected by this Power, such as grass, trees, and the Man-Thing. When using the Power, the hero imparts some of his intelligence and Psyche to the plant to facilitate communication.",
    "rulesText": "The hero can speak with plants. Anything that has a vegetable physiology can be affected by this Power, such as grass, trees, and the Man-Thing. When using the Power, the hero imparts some of his intelligence and Psyche to the plant to facilitate communication. The greater the complexity of the plant, the easier it is to communicate with. A green FEAT com- municates with trees and local ecosystems; in the latter, all the plants speak as if a chorus that only the hero can hear. A yellow FEAT communicates with shrubs, vines, and bushes.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M7",
    "name": "Cosmic Awareness",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M7",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero is in tune with the entire scope of reality. He possesses a detached, omniscient viewpoint that allows him to explore the entire existence of a chosen subject. Unfortunately, this causes such a massive overload of superfluous information that the hero is hard pressed to sort it all out.",
    "rulesText": "The hero is in tune with the entire scope of reality. He possesses a detached, omniscient viewpoint that allows him to explore the entire existence of a chosen subject. Unfortunately, this causes such a massive overload of superfluous information that the hero is hard pressed to sort it all out. The FEAT represents the hero's ability to recover a specific bit of information from all the effluvia. The more exact the required detail, the higher the difficulty. Discovering basic facts or locating any one on the Earth requires a green FEAT.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M8",
    "name": "Danger Sense",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is also called Combat Sense and Spider-sense. It is a combination of automatically functioning Psionic Powers (Telepathy, Empathy, and Precognition) that warns the hero about impending danger. The advance warning time is the number of seconds equal to the Power rank number (rounded up to the nearest turn if need be).",
    "rulesText": "This is also called Combat Sense and Spider-sense. It is a combination of automatically functioning Psionic Powers (Telepathy, Empathy, and Precognition) that warns the hero about impending danger. The advance warning time is the number of seconds equal to the Power rank number (rounded up to the nearest turn if need be). For example, Spider-Man's Amazing rank can warn him of danger almost a minute in advance. In a combat situation, the Power can be used replace other, lower ranked Abilities. It can replace Intuition for determining surprise, Fighting for blocking, Agility for dodging, and Strength for escaping.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M9",
    "name": "Dreamtravel",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can actually enter into the short-lived pocket dimensions created by a person's dreams and nightmares. These dreamworlds are outside the boundaries of normal reality and exist solely as a reflection of the dreamer's imagination. The Dreamtraveler must be within ten feet of the dreamer in order for the Power to function at full rank.",
    "rulesText": "The hero can actually enter into the short-lived pocket dimensions created by a person's dreams and nightmares. These dreamworlds are outside the boundaries of normal reality and exist solely as a reflection of the dreamer's imagination. The Dreamtraveler must be within ten feet of the dreamer in order for the Power to function at full rank. The Power rank decreases -1CS for each additional 10 feet that separates the two. The Dreamtraveler has no direct control over the conditions within the dreamworld. He can interact with things within that world by performing \"physical\" actions much as he would in the real world.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M10",
    "name": "Empathy",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect the surface emotions of others. The hero can detect the target's emotional state and further refine that knowledge to discover the target's physical state, surroundings, and location, insofar as these have an influence on the emotions. He can transmit his own emotional state but he cannot impose this on others (that requires Emotion Control).",
    "rulesText": "The hero can detect the surface emotions of others. The hero can detect the target's emotional state and further refine that knowledge to discover the target's physical state, surroundings, and location, insofar as these have an influence on the emotions. He can transmit his own emotional state but he cannot impose this on others (that requires Emotion Control). Empathy is extremely useful when the hero has to deal with non-sentient beings or large numbers of people. It can read the target's mood and support already existing emotions. The range can vary within a single Power rank.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M11",
    "name": "Free Spirit",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M11",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero's soul is capable of independent existence in the real world. The Free Spirit can leave the hero's body and travel independently; it is often mistaken for an Astral Body. The Free Spirit can even survive the death of the physical body without being im- mediately drawn into an afterlife dimen- sion; this requires a red Power FEAT at the time of death (more on this later).",
    "rulesText": "The hero's soul is capable of independent existence in the real world. The Free Spirit can leave the hero's body and travel independently; it is often mistaken for an Astral Body. The Free Spirit can even survive the death of the physical body without being im- mediately drawn into an afterlife dimen- sion; this requires a red Power FEAT at the time of death (more on this later). Free Spirits possess all the Mental Abilities, Talents, and Powers of the whole being. Health remains unchanged although now it is more of a measure of how well the Free Spirit can resist entering the appropriate afterlife. If the Free Spirit is still in his original body, that body may either retain a share of the overall consciousness when the 70 spirit is away or the body may lapse into a coma at these times.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M12",
    "name": "Hallucinations",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M12",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create illusions directly within the target's mind. Such illusions are telepathic, not holographic, in nature. As such, they cannot be mechanically detected or recorded except by devices that simulate Telepathy or human thought patterns (such as player character Robots).",
    "rulesText": "The hero can create illusions directly within the target's mind. Such illusions are telepathic, not holographic, in nature. As such, they cannot be mechanically detected or recorded except by devices that simulate Telepathy or human thought patterns (such as player character Robots). Hallucinations can only be seen by the target of this Power. The ranges for this Power is shown on column A of the Range Table. The target must be within sight of the hero, although the hero can extend his sight and thus his Power range by the use of artificial aids.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M13",
    "name": "Hyper-Intelligence",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Normally a character's Intelligence is determined in the Character Generation Process. However, the research for the Ultimate Powers Book showed that extreme levels of Intelligence can be a Power in its own right. Examples include The Leader and the late Soviet scientist known only as Gargoyle.",
    "rulesText": "Normally a character's Intelligence is determined in the Character Generation Process. However, the research for the Ultimate Powers Book showed that extreme levels of Intelligence can be a Power in its own right. Examples include The Leader and the late Soviet scientist known only as Gargoyle. The hyper-intelligent character is a genius of awesome potential. He can quickly master new subjects, retain that knowledge indefinitely, and easily succeed in any mental endeavor. There are two ways the Power can be incorporated into a character.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M14",
    "name": "Hyper-Invention",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a special form of Hyper-intelligence that is common enough to merit its own classification. It is a permanent enhancement of the hero's overall intelligence that is channeled into the field of mechanical design and en- gineering. The hero is an Edison-like genius who take existing materials and technologies and use them to create new devices or applied technologies.",
    "rulesText": "This is a special form of Hyper-intelligence that is common enough to merit its own classification. It is a permanent enhancement of the hero's overall intelligence that is channeled into the field of mechanical design and en- gineering. The hero is an Edison-like genius who take existing materials and technologies and use them to create new devices or applied technologies. He can repair previously operational devices, even if the device was of an unknown type. 71 The hero can learn new technologies at a rate determined by his rank, the complexity of the technology, and the amount of instruction available. Modern technology requires an Excellent Intensity FEAT.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M15",
    "name": "Incarnation Awareness",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This Power is based on the idea that a spirit enters countless reincarnations throughout eternity but that the memory of each past life is usually lost somewhere in the transition from one life to another. This Power allows the hero to remember the details of his more recent lives and to actually communicate with them. Such communications include the transmission of the complete range of senses and thoughts.",
    "rulesText": "This Power is based on the idea that a spirit enters countless reincarnations throughout eternity but that the memory of each past life is usually lost somewhere in the transition from one life to another. This Power allows the hero to remember the details of his more recent lives and to actually communicate with them. Such communications include the transmission of the complete range of senses and thoughts. There are two limits on communication with other lives. One, the communication can only be initiated by the hero's current incarnation. He cannot be called by past lives nor can he call future lives.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M16",
    "name": "Iron Will",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has complete conscious control over his mind and body. By using his Iron Will, the hero can temporarily halt the damage done by mental or physical attacks; he can even postpone his own death. Iron Will can be used in place of any lower-ranked Ability to determine Resistance to an attack.",
    "rulesText": "The hero has complete conscious control over his mind and body. By using his Iron Will, the hero can temporarily halt the damage done by mental or physical attacks; he can even postpone his own death. Iron Will can be used in place of any lower-ranked Ability to determine Resistance to an attack. Any time the hero suffers damage from an attack, the Power can temporarily absorb it before it can affect any of the hero's Ability ranks. The maximum amount of damage Iron Will can absorb at one time is equal to its rank number. Absorbed damage does not affect the hero at that time.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M17",
    "name": "Linguistics",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M17",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a specialized form of Hyper-intelligence. The hero has the ability to rapidly learn any language if sufficient material is available for him to work with. Once the language is mastered, the hero is fluent in that language, provided he is physically capable of communicating in it.",
    "rulesText": "This is a specialized form of Hyper-intelligence. The hero has the ability to rapidly learn any language if sufficient material is available for him to work with. Once the language is mastered, the hero is fluent in that language, provided he is physically capable of communicating in it. The number of languages a hero is currently fluent in is limited to the Power rank number. For example, Doug Ramsey's Incredible rank enables him to retain fluency in up to forty languages at a time. When a hero exceeds that limit, he begins to forget a previously mastered language.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M18",
    "name": "Mental Duplication",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a combination of Powers that enables the hero to psionically study a subject's mind and then create a simulation of that mind within the hero's own brain. This is a great way to learn secrets and interrogate subjects who would otherwise be rather uncooperative (at best). The duplicated mind contains the personality of the original, most memories, and possibly the mental or psionic Powers of the original.",
    "rulesText": "This is a combination of Powers that enables the hero to psionically study a subject's mind and then create a simulation of that mind within the hero's own brain. This is a great way to learn secrets and interrogate subjects who would otherwise be rather uncooperative (at best). The duplicated mind contains the personality of the original, most memories, and possibly the mental or psionic Powers of the original. The subject is unaffected by the Power and loses none of his own mental abilities. He is usually unaware that Duplication has even occurred. The relationship between the hero's and the duplicate’s mind takes one of three forms.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M19",
    "name": "Mental Invisibility",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M19",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to render his own mental energies undetectable by external means. Such means can be technological (EEG scans), psionic, Magical, or Power-based in nature. It is Invisibility in telepathic terms.",
    "rulesText": "The hero has the ability to render his own mental energies undetectable by external means. Such means can be technological (EEG scans), psionic, Magical, or Power-based in nature. It is Invisibility in telepathic terms. The Power protects the hero from discovery by outside forces. It serves as Power rank Resistance to undesired probes and psionic attacks. Success means the external probe shows nothing at all, including the presence of this Power, and psionic attacks simply pass through the target (think of someone trying to punch air).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M20",
    "name": "Mental Probe",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can telepathically probe a living mind or a psionic phenomenon to gain a detailed analysis of the target. Living minds can be searched for specific images and thoughts, although the hero must have a basic idea beforehand of what she is looking for. The target mind is allowed to make a Psyche FEAT to resist a Mental Probe.",
    "rulesText": "The hero can telepathically probe a living mind or a psionic phenomenon to gain a detailed analysis of the target. Living minds can be searched for specific images and thoughts, although the hero must have a basic idea beforehand of what she is looking for. The target mind is allowed to make a Psyche FEAT to resist a Mental Probe. This is automatic, even if the target mind is initially unaware if the attempted probe. If resistance is successful, the probe is rejected with a headache-like backlash that prevents the hero from trying to probe that target again for 24 hours. A side-effect of the Power is that the target's Psyche may temporarily drop -1CS for 24 hours as a result of fending off the probe.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M21",
    "name": "Mind Blast",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M21",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can create bolts of pure psionic energy that can be used to directly damage a target's neural system. The Power does rank Intensity damage to the target. The maximum ranges are shown on column A of the Range Table.",
    "rulesText": "The hero can create bolts of pure psionic energy that can be used to directly damage a target's neural system. The Power does rank Intensity damage to the target. The maximum ranges are shown on column A of the Range Table. Targets are allowed to resist by making a Psyche FEAT. Failure means the target is knocked unconscious for 1-10 turns, as well as taking neural damage. Targets who possess Mental or Psionic Powers can use these Powers' ranks instead of the Psyche when resisting this Power.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M22",
    "name": "Mind Drain",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M22",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can deplete, negate, or even destroy a target's mental faculties. This alters the target's personality, memory, thought process (Reason and Intuition), and any Mental or Psionic Powers the target had. The target can resist by making a Psyche FEAT; success means the hero is repelled -by a headache-inducing backlash that prevents the hero from attacking that target for 24 hours.",
    "rulesText": "The hero can deplete, negate, or even destroy a target's mental faculties. This alters the target's personality, memory, thought process (Reason and Intuition), and any Mental or Psionic Powers the target had. The target can resist by making a Psyche FEAT; success means the hero is repelled -by a headache-inducing backlash that prevents the hero from attacking that target for 24 hours. Part of the target's Psyche may be depleted by resisting the attack. If the target fails a second Psyche FEAT, then his Psyche drops -1CS for 24 hours. The target's Reason and Intuition rank numbers are reduced by the Power rank number.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M23",
    "name": "Postcognition",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M23",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to \"see\" the past. The Power requires the hero to have physical contact with the target whose history is being examined. The hero can mentally examine a person, item, or site and mentally re-live a specific moment of history from the target's point-of-view.",
    "rulesText": "The hero has the ability to \"see\" the past. The Power requires the hero to have physical contact with the target whose history is being examined. The hero can mentally examine a person, item, or site and mentally re-live a specific moment of history from the target's point-of-view. As such, it only reveals factors that somehow affected the target. It is important that the Judge secretly roll the dice whenever the hero uses the Power. This prevents the player from knowing the accuracy of his vision.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M24",
    "name": "Precognition",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M24",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "(Judges detest this Power with a passion.) The hero can see into the future. The Power gives the hero sufficiently clear insight into upcoming events that he might be able to use that foreknowledge to his advantage. The problem lies in two areas, the flexibility of the timestream and the preparedness of the Judge (more on these later).",
    "rulesText": "(Judges detest this Power with a passion.) The hero can see into the future. The Power gives the hero sufficiently clear insight into upcoming events that he might be able to use that foreknowledge to his advantage. The problem lies in two areas, the flexibility of the timestream and the preparedness of the Judge (more on these later). Precognition is an awesome Power and thus has more limits than the Hulk can shake a stick at. (\"Hulk no need puny stick!\") The Power can normally be used only once per day at full rank. Each additional use decreases the rank -1CS down to a minimum of 1 turns lead-time.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M25",
    "name": "Psionic Vampirism",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M25",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The Psi- vampire can drain the mental energies of his victim. He then uses the purloined energy to increase his own Strength, Endurance, Psyche, and his own Powers' ranks. The Psi-vampire can drain the mental energy from a target by means of a Power FEAT.",
    "rulesText": "The Psi- vampire can drain the mental energies of his victim. He then uses the purloined energy to increase his own Strength, Endurance, Psyche, and his own Powers' ranks. The Psi-vampire can drain the mental energy from a target by means of a Power FEAT. The intensity rank is determined by the victim's Psyche. A successful FEAT enables the Psi- vampire to drain an amount of energy equal to his Power rank number. This amount is drawn in equal amounts from the victim's Reason, Intuition, and whatever Mental Powers he possesses.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M26",
    "name": "Remote Sensing",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M26",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can project sensory points of perception across physical space without moving their physical body.",
    "rulesText": "Sensory point moves at Power Rank speed through air, solids, or vacuum, transmitting full visual, auditory, and olfactory input back to the hero.",
    "errataNote": "",
    "powerStunts": [
      "Anchoring sensor to a moving vehicle or person"
    ]
  },
  {
    "code": "M27",
    "name": "Sensory Link",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M27",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can telepathically link his senses with those of another being. He can use the information gained from the other's senses as if it came from the hero's own senses. An example would be a blind man really seeing through his guide dog's eyes.",
    "rulesText": "The hero can telepathically link his senses with those of another being. He can use the information gained from the other's senses as if it came from the hero's own senses. An example would be a blind man really seeing through his guide dog's eyes. The Power is crucial to sense-impaired characters. Such characters need other beings with the necessary senses to replace the hero's own deficiency. The hero could receive input from any living being, including companions, adversaries, onlookers, and even animals.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M28",
    "name": "Serial Immortality",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M28",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "A character with this Power can suffer damage, get sick, age, and even die. None of it is permanent to the character, though. When the hero's body dies from any cause, the unique nature of his lifeforce enables it to transfer to a new body.",
    "rulesText": "A character with this Power can suffer damage, get sick, age, and even die. None of it is permanent to the character, though. When the hero's body dies from any cause, the unique nature of his lifeforce enables it to transfer to a new body. He can also transfer some but not all of his Powers to the new body. The hero loses all Karma with the death of the old body. There are five forms of Serial Immortality, each with a different means of rebirth and Power transferral.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M29",
    "name": "Speechthrowing",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M29",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is best described as \"super-ventriloquism.\" Although it is radically different in execution from the Talent of Ventriloquism, the effect at low levels is similar. Simply put, the hero can make his voice audible in a distant location, without the vocal soundwaves actually traveling the intervening distance. The Power is actually a specialized form of Telekinesis which allows the hero to agitate the distant molecules in a way that simulates sound transmission.",
    "rulesText": "This is best described as \"super-ventriloquism.\" Although it is radically different in execution from the Talent of Ventriloquism, the effect at low levels is similar. Simply put, the hero can make his voice audible in a distant location, without the vocal soundwaves actually traveling the intervening distance. The Power is actually a specialized form of Telekinesis which allows the hero to agitate the distant molecules in a way that simulates sound transmission. The Power enables the hero to be heard instantaneously at any distance, despite any barriers to normal sound transmission. The only barriers that stop this Power are those that interfere with Psionic Powers. Speechthrowing's range is determined by its Power rank.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M30",
    "name": "Telekinesis",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M30",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can handle material objects without having to make direct or indirect physical contact (pushing or blowing, for example). The hero can perform any action that could be accomplished using normal Strength. The Power rank serves as an equivalent for the Strength rank.",
    "rulesText": "The hero can handle material objects without having to make direct or indirect physical contact (pushing or blowing, for example). The hero can perform any action that could be accomplished using normal Strength. The Power rank serves as an equivalent for the Strength rank. Most Telekinetics (\"TKs\") visualize their Power in terms of an amorphous arm extending from the body. This leads to a curious psychological handicap in that most TKs cannot lift their own bodies. Only rare examples like Marvel Girl have overcome this bit of irrationality.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M31",
    "name": "Telelocation",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M31",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can Psionically locate a chosen target. This differs from normal Tracking in that no physical or sensory contact, however tenuous, is required. Consequently, the Power is not hampered by the concealment, erasure, or absence of the target's \"scent.\" Telelocation can operate over immense distances.",
    "rulesText": "The hero can Psionically locate a chosen target. This differs from normal Tracking in that no physical or sensory contact, however tenuous, is required. Consequently, the Power is not hampered by the concealment, erasure, or absence of the target's \"scent.\" Telelocation can operate over immense distances. The only factors that can hinder the Power are those that diminish any Psionic activity. The range, determined by the Power rank, is shown on column D of the Range Table. This represents a sphere centered on the hero; the quarry must be within it.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M32",
    "name": "Telepathy",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M32",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can communicate on a direct mind-to-mind basis. This is automatic with willing minds or Psyches with ranks lower than the Power rank. Equal Psyche ranks require a yellow FEAT.",
    "rulesText": "The hero can communicate on a direct mind-to-mind basis. This is automatic with willing minds or Psyches with ranks lower than the Power rank. Equal Psyche ranks require a yellow FEAT. Minds with mental Powers or some form of Psionic defense require a red FEAT. Uncooperative beings with Psyches exceeding the Power rank -are impossible FEATs. Range is determined by Power rank.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M33",
    "name": "Total Memory",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M33",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to remember anything that he has ever experienced. This could be a book he's read, the faces of everyone he saw on Tuesday, what birth was like, and so on. The accuracy of his recall is his Power rank number treated as a percentage.",
    "rulesText": "The hero has the ability to remember anything that he has ever experienced. This could be a book he's read, the faces of everyone he saw on Tuesday, what birth was like, and so on. The accuracy of his recall is his Power rank number treated as a percentage. Feeble is 2%, Excellent is 20%, and so on to automatic accuracy at Unearthly rank or above. The color FEAT reflects the nature of the memory being sought. Green FEATs involve personal memories.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "M34",
    "name": "Hyper-Intelligence / Photographic Reflexes",
    "category": "Mental Enhancement",
    "source": "Dragon Magazine #134 p. 90 (The Ultimate Addenda's Addenda)",
    "defaultRank": "Incredible",
    "countsAsTwo": false,
    "description": "Hyper-accelerated brain synaptic processing that allows instantly calculating ballistic trajectories, decrypting alien code, or mimicking any physical fighting move upon sight (photographic reflexes).",
    "rulesText": "Grants +1CS to Reason FEATs, automated initiative bonus (+1 to initiative rolls), and the ability to mimic any physical talent or Fighting feat observed in combat by passing an Agility FEAT.",
    "errataNote": "Renamed reference: Covers the classic Taskmaster photographic reflexes power set officially codified in Dragon #134.",
    "powerStunts": [
      "Instant ballistic calculation adding +1CS to Shooting",
      "Anticipating opponent attack patterns to grant +1CS to Evading"
    ]
  },
  {
    "code": "MC1",
    "name": "Bonding",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to join two or more targets together on a molecular level. The effect is the same as if the targets were glued or welded together. In actuality, the hero has induced molecular adhesion.",
    "rulesText": "The hero has the ability to join two or more targets together on a molecular level. The effect is the same as if the targets were glued or welded together. In actuality, the hero has induced molecular adhesion. A submicroscopic examination would fail to reveal any foreign material (such as a glue) or disturbances in the normal arrangement of the target's structure (such as the distortion caused by welding). The Bonding is so powerful that attempting to sever its effect results in physical damage to either of the Bonded targets because the only way to forcibly separate two Bonded objects is to tear the surface of one or both of them. This causes Typical wounds to a living target.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MC2",
    "name": "Collection",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can cause any.desi red. material to collect in a specific location. This material must already be present and diffused throughout the hero's vicinity, whether in the air, water, soil, or scattered across the ground.",
    "rulesText": "The hero can cause any.desi red. material to collect in a specific location. This material must already be present and diffused throughout the hero's vicinity, whether in the air, water, soil, or scattered across the ground. The Collection area has a radius determined by the Power rank; distances are shown on column C of the Range Table inside this book’s cover. For example, an Incredible rank can collect material from as far as 25 miles away. Collected material instantly teleports to the designated Collection site.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MC3",
    "name": "Crystallization",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can transform any target material into a gemlike material that possesses Power rank material strength. Crystallization occurs because the hero has the ability to shape the molecular bonds of normally amorphous matter into a crystal matrix of great strength. The Crystallization can occur at any site within the hero's line of sight and range; distances are determined by the Power rank and can be found on column C of the Range Table on the inside cover.",
    "rulesText": "The hero can transform any target material into a gemlike material that possesses Power rank material strength. Crystallization occurs because the hero has the ability to shape the molecular bonds of normally amorphous matter into a crystal matrix of great strength. The Crystallization can occur at any site within the hero's line of sight and range; distances are determined by the Power rank and can be found on column C of the Range Table on the inside cover. The newly- formed Crystal is initially stationary; it cannot be launched like a missile (unless the hero possesses Missile Creation, but I'm getting ahead of myself). It can be formed in such a position that gravity immediately affects it. Crystallization automatically affects non-living, unprotected, stationary targets.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MC4",
    "name": "Diminution (Matter Control)",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can shrink inanimate objects or solid matter down to microscopic scales while retaining mass or proportional density.",
    "rulesText": "Reduces the physical volume of inorganic targets by rank factors. The target shrinks at Power Rank speed down to subatomic or microscopic sizes.",
    "errataNote": "",
    "powerStunts": [
      "Shrinking structural barriers or hostile weapons",
      "Pocketing large vehicles"
    ]
  },
  {
    "code": "MC5",
    "name": "Disruption",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can destroy a target's physical structure without resorting to a physical or overt energy attack. The molecular bonds that give a target its solidity are directly Disrupted, with the result that the target collapses into dust, sand, liquid, or even vapor. The Material Strength of the target determines what Intensity FEAT is required.",
    "rulesText": "The hero can destroy a target's physical structure without resorting to a physical or overt energy attack. The molecular bonds that give a target its solidity are directly Disrupted, with the result that the target collapses into dust, sand, liquid, or even vapor. The Material Strength of the target determines what Intensity FEAT is required. For example, asphalt has Good Material Strength and consequently would require a Good Intensity FEAT to destroy. 52 The hero can Disrupt any target within both line-of-sight and range. The range is determined by the Power rank; distances are shown on Column A of the Range Table on the inside cover.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MC6",
    "name": "Enlargement",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can increase the size of any target. The target can be of any nature and must be within both line-of-sight and one area of the hero's location. Any material can be enlarged with one exception; the Power cannot affect any target that has already been Enlarged by another Power of equal or greater rank.",
    "rulesText": "The hero can increase the size of any target. The target can be of any nature and must be within both line-of-sight and one area of the hero's location. Any material can be enlarged with one exception; the Power cannot affect any target that has already been Enlarged by another Power of equal or greater rank. In such a case, the would-be target is assumed to already be Enlarged past any point the hero could have Enlarged it to anyway. The amount the hero can Enlarge a target is determined by the Power rank. The levels to which the hero can Enlarge a target are shown below: Resultant size Rank (x original size) FE 1.5X PR 2X TY 3X GD 4X EX 6X RM 8X IN 10X AM 12X MN 15X UN 20X X 50X Y 100X Z 200X CL1000 500X CL3000 1,000X CL5000 10,000X The duration of the Enlargement is determined by a Reason FEAT made at the time the Power is used.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MC7",
    "name": "Geoforce",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect and control geological forces. These include plate movement, stress, faults, and vulcanism. This Power only applies to natural rock and semi-natural materials such as concrete, cement, and asphalt.",
    "rulesText": "The hero can detect and control geological forces. These include plate movement, stress, faults, and vulcanism. This Power only applies to natural rock and semi-natural materials such as concrete, cement, and asphalt. Radically altered material (steel, plastic) is not directly affected by the Power. This Power has two ranges, both based on the Power rank. The ability to detect forces and materials within the earth has a range shown on Column C of the Range Table on the inside cover.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MC8",
    "name": "Matter Animation",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC8",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can alter the flow of any raw matter, impart movement to stationary matter, and shape such matter into any desired form. The Power can only affect matter that is in a relatively natural state. It cannot affect mechanical objects or material that is now or had once been alive.",
    "rulesText": "The hero can alter the flow of any raw matter, impart movement to stationary matter, and shape such matter into any desired form. The Power can only affect matter that is in a relatively natural state. It cannot affect mechanical objects or material that is now or had once been alive. There are three basic forms of this Power, each with dominion over a state of matter. When creating the hero, the player must choose one of these forms for the character. He can do this himself or let the dice choose for him.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MC9",
    "name": "Machine Animation",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC9",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can animate and command mechanical systems, vehicles, weapons, and electronic devices as though they were living constructs.",
    "rulesText": "Can command complex mechanical or motorized assemblies within range, causing them to move, fire, or operate autonomously under the hero's will.",
    "errataNote": "",
    "powerStunts": [
      "Simultaneous control of multiple machines (up to Power Rank number)"
    ]
  },
  {
    "code": "MC10",
    "name": "Micro-Environment",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter his immediate surroundings to create a miniature climate around himself. The Micro-Environment always contains fresh clean air (or water or methane or whatever the hero breathes) at any temperature and pressure the hero desires. The Micro-Environment incorporates a Force Field that protects it from any factor that might harm or even annoy the hero, such as rain, poisonous gases, extreme temperatures, or the pressure that naturally results from having three miles of ocean over your head.",
    "rulesText": "The hero can alter his immediate surroundings to create a miniature climate around himself. The Micro-Environment always contains fresh clean air (or water or methane or whatever the hero breathes) at any temperature and pressure the hero desires. The Micro-Environment incorporates a Force Field that protects it from any factor that might harm or even annoy the hero, such as rain, poisonous gases, extreme temperatures, or the pressure that naturally results from having three miles of ocean over your head. In such cases, the Micro- Environment automatically excludes potentially hazardous gases and liquids and reduces the Intensity of pressure, extreme temperature, and high gravity by the Power rank number. Lesser or equal Intensities are canceled out, while higher ranks only penetrate in diminished form. The Power automatically Collects the desired materials into a sphere around the hero; if no such materials are available, the Power employs an innate form of Matter Creation or Conversion to produce those materials.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MC11",
    "name": "Molding",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can shape any solid material into any desired shape. The shaped material retains its original chemical nature. If the target is living, its internal anatomy is rearranged in such a way that permits life to continue without loss of Health.",
    "rulesText": "The hero can shape any solid material into any desired shape. The shaped material retains its original chemical nature. If the target is living, its internal anatomy is rearranged in such a way that permits life to continue without loss of Health. The new shape can be of any complexity; even intricate machines can be created if the proper materials are available. The newly-Molded target can be Animated, even if the original material or the current shape is normally incapable of movement. This movement is accomplished by the simple act of continually re-Molding the target (think of it in terms of stop-motion animation).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MC12",
    "name": "Weather",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has complete control over the weather. He can sense those factors in the air that create weather and alter any aspect of them at his desire. Any of these factors can produce both physical and psychological effects on humans.",
    "rulesText": "The hero has complete control over the weather. He can sense those factors in the air that create weather and alter any aspect of them at his desire. Any of these factors can produce both physical and psychological effects on humans. He can control temperature by raising or lowering the air a maximum number of degrees equal to his Power rank number. For example, an Incredible rank can change a comfortable 70 degrees into a wintry 30 degrees or a sweltering 100 degrees. He can increase or decrease windspeed by a number of miles per hour equal to his Power rank number.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MC13",
    "name": "Zombie Animation",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC13",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is a macabre Power that is definitely more at home in the horror genre than in the heroic genre. The hero, um… well, the character with this Power can Animate any previously living body. Normally, the Power is used to Animate relatively intact cadavers, since these are capable of a greater variety of actions.",
    "rulesText": "This is a macabre Power that is definitely more at home in the horror genre than in the heroic genre. The hero, um… well, the character with this Power can Animate any previously living body. Normally, the Power is used to Animate relatively intact cadavers, since these are capable of a greater variety of actions. Part of the Power is used to halt the process of decay and to maintain the structural integrity of the remaining body parts. Still, Zombies look awful, even the fresh ones. This Power is not Biophysical Control/Revival.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCo1",
    "name": "Coloration",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has total control over the coloration and color transmitting abilities of any target substance, whether solid. liquid, or gaseous. That's all, folks.",
    "rulesText": "The hero has total control over the coloration and color transmitting abilities of any target substance, whether solid. liquid, or gaseous. That's all, folks. Okay, this seems like the prime number one Wimp Power of all time. Wrong, oh ye of little faith; read on and I'll tell you how dangerous this Power can be it is when possessed by a clever hero. This Power enables the hero to alter basic physics and the chemical properties of any target.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCo2",
    "name": "Combustion",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to transform any target into combustible material. Once this Power has been used, spontaneous combustion occurs within 1 -10 turns after. Only the surface layer of matter is converted by this Power.",
    "rulesText": "The hero has the ability to transform any target into combustible material. Once this Power has been used, spontaneous combustion occurs within 1 -10 turns after. Only the surface layer of matter is converted by this Power. As such, the flames only last 10-20 turns since the combustible material is quickly burned away. The total amount of damage done by this is equal to Power rank Intensity. Example: Rusty Collins, a student of X Factor, has Monstrous Combustion but has not yet achieved full control over it.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCo3",
    "name": "Disintegration",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the ever popular but never explained \"Disinte- grator Ray.\" The hero has the ability to convert any matter into pure energy, usually Light although the player can specify another resultant energy when he first creates the character. The energy 60 dissipates harmlessly and does not affect anyone in the vicinity. This Power can affect any target within range and line-of-sight.",
    "rulesText": "This is the ever popular but never explained \"Disinte- grator Ray.\" The hero has the ability to convert any matter into pure energy, usually Light although the player can specify another resultant energy when he first creates the character. The energy 60 dissipates harmlessly and does not affect anyone in the vicinity. This Power can affect any target within range and line-of-sight. The range is determined by Power rank; resulting distances are shown on Column A of the Range Table. The maximum amount of matter that can be disintegrated in a single turn is the number of cubic feet equal to the Power rank number. For example, a Typical Disintegrator can destroy six cubic feet of matter at a range of two areas or 264 feet.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCo4",
    "name": "Elemental Conversion",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo4",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can convert any matter into a specific element. The matter to be converted can be any one element or a combination of elements. The resulting element can be any of the hundred-odd natural, artificial, and mythical elements.",
    "rulesText": "The hero can convert any matter into a specific element. The matter to be converted can be any one element or a combination of elements. The resulting element can be any of the hundred-odd natural, artificial, and mythical elements. Natural elements are those numbered 1 (Hydrogen) to 92 (Uranium) on the Periodic Table; these require a green FEAT to create. Artificial elements are those numbering higher than 92 and do not naturally occur on Earth outside of man's experiments; such elements include Neptunium, Plutonium, and the like. A yellow FEAT is required to create these.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCo5",
    "name": "Ionization",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to change the state of energy in a target. This can have a variety of effects on the target. A target can be electrified by this Power; the target's atoms begin to change into electrically-charged particles.",
    "rulesText": "The hero has the ability to change the state of energy in a target. This can have a variety of effects on the target. A target can be electrified by this Power; the target's atoms begin to change into electrically-charged particles. The initial effect this has is to charge the target with static electricity. Next the target actually emits Electricity at -1CS Intensity. At this point the target will itself suffer an equal amount of damage, provided it is electrically grounded in some way.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCo6",
    "name": "Molecular Conversion",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo6",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can transform any material into a desired compound. This Power is an enhanced version of Elemental Conversion. Whereas that Power could only create a single specified element, this Power can create a number of elements simultaneously and arrange them in a desired molecular configuration.",
    "rulesText": "The hero can transform any material into a desired compound. This Power is an enhanced version of Elemental Conversion. Whereas that Power could only create a single specified element, this Power can create a number of elements simultaneously and arrange them in a desired molecular configuration. The matter to be converted can be composed of any element, compound, or combination thereof. The elements that result can be any of the hundred-odd natural, artificial, and mythical elements. The compounds they form can likewise 62 MATTER CREATION 63 be real or mythical.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCr1",
    "name": "Artifact Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr1",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create a desired object from virtually nothing. The artifact can be of any substance, and is limited to being composed of a single piece. Although the Power can create facsimiles of more complex construction, close examination reveals that all the smaller pieces are fused together.",
    "rulesText": "The hero can create a desired object from virtually nothing. The artifact can be of any substance, and is limited to being composed of a single piece. Although the Power can create facsimiles of more complex construction, close examination reveals that all the smaller pieces are fused together. However, the hero can create complex items by forming them one piece at a time. The hero can create in one turn a number of ounces equal to his Power rank number. The durability of the artifact is determined at the time of creation.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCr2",
    "name": "Elemental Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can create pure elements from virtually nothing. The hero can create any desired element in any shape or at any location within one area. The hero can create in a single turn a number of ounces equal to his Power rank number.",
    "rulesText": "The hero can create pure elements from virtually nothing. The hero can create any desired element in any shape or at any location within one area. The hero can create in a single turn a number of ounces equal to his Power rank number. For example, a hero possessing this Power at Amazing rank could create 50 ounces per turn. The durability of the newly created matter is determined at the time of creation. A green FEAT gives the element a lifespan of 100 turns times the hero's Reason rank number.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCr3",
    "name": "Lifeform Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr3",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create living matter and even complete bio-organisms from virtually nothing. The new life can be of any nature, although it can only possess Powers that are intrinsic to its physical structure. The size of the new lifeform is limited by its weight.",
    "rulesText": "The hero can create living matter and even complete bio-organisms from virtually nothing. The new life can be of any nature, although it can only possess Powers that are intrinsic to its physical structure. The size of the new lifeform is limited by its weight. The hero can create in a single turn a maximum number of ounces equal to his Power rank number. Since the lifeform cannot be assembled in several pieces, but rather must be done all at once, this limits how large the creation is. It can grow, though, if it has the time.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCr4",
    "name": "Mechanical Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr4",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create complex mechanical devices from virtually nothing. The newly created machine originally forms in one mass, then separates into its components. The size of the machine is limited to its weight.",
    "rulesText": "The hero can create complex mechanical devices from virtually nothing. The newly created machine originally forms in one mass, then separates into its components. The size of the machine is limited to its weight. The hero can only create in one turn a maximum number of ounces equal to his Power rank number. Heavier machines have to be assembled in several turns. The durability of the machine is determined at the time of its creation.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCr5",
    "name": "Missile Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can spontaneously create and launch projectiles. These are propelled to Power rank range. Missiles that simply slam into a target act as Stunning Missiles and inflict Stunning attacks of Power rank Intensity.",
    "rulesText": "The hero can spontaneously create and launch projectiles. These are propelled to Power rank range. Missiles that simply slam into a target act as Stunning Missiles and inflict Stunning attacks of Power rank Intensity. If the hero has other Powers, these are combined with this Power to produce missiles with specific effects. • Nullifier—The Missile Power is combined with Power Control/Negation to produce missiles that inflict no direct damage but may nullify inborn or technological Powers with Power rank Intensity. Sleep Darts-the Power is combined with Induced Sleep to create anesthetic darts.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCr6",
    "name": "Molecular Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a more powerful form of Elemental Creation. The hero can form several elements simultaneously and form them into any desired compound. The hero can form this on any target within one area.",
    "rulesText": "This is a more powerful form of Elemental Creation. The hero can form several elements simultaneously and form them into any desired compound. The hero can form this on any target within one area. He can create in one turn a number of ounces equal to his Power rank number. For example, at Poor rank he could form only four ounces in one turn. The durability of the newly created compound is determined by a FEAT at the time of creation.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCr7",
    "name": "Spray",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can spontaneously create a directed cloud of gas, mist, or dust. The Spray has a range of up to one area. It has the basic properties of doing Feeble damage by choking off the target's fresh air and reducing visibility by -2CS for anyone within the cloud.",
    "rulesText": "The hero can spontaneously create a directed cloud of gas, mist, or dust. The Spray has a range of up to one area. It has the basic properties of doing Feeble damage by choking off the target's fresh air and reducing visibility by -2CS for anyone within the cloud. The main purpose of Spray is combining it with other Powers, thereby producing unique Spray Powers for the hero. In all these cases, the range remains the same. Other factors, such as the nature and Intensity of effects, are determined by the Power that has been combined with Spray.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MCr8",
    "name": "Webcasting",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate and shot out a solid web. The web can hit any target within 100 feet and instantly adhere to it. The Web has some basic properties.",
    "rulesText": "The hero can generate and shot out a solid web. The web can hit any target within 100 feet and instantly adhere to it. The Web has some basic properties. It can ensnare anyone within the target site. It possesses Power rank Strength upon hardening one round after being fired. It can be used to form swing-lines that enable the hero to travel 3 areas per turn, and it makes shields of Monstrous material strength.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG1",
    "name": "Enchantment",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG1",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The Mage is able to invest a target with Magical Power. The target must be a non-sentient being or even nonliving matter. The Mage is able to turn the Enchanted item into a battery that can harmlessly store Magic.",
    "rulesText": "The Mage is able to invest a target with Magical Power. The target must be a non-sentient being or even nonliving matter. The Mage is able to turn the Enchanted item into a battery that can harmlessly store Magic. Any spell stored within the item can be retained indefinitely in a state of readiness until the spell is somehow released. The Mage can store any spell he already possesses with the sole exception of this Power; a Mage cannot Enchant something that will then Enchant something else later on. If the Mage is working in conjunction with another being who possesses other Magic or Powers, these can be stored away as well by incorporating them into the spell.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG2",
    "name": "Energy Source",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The Mage draws his Magic from a special source that provides him with all the raw Power he needs. As long as the Mage can maintain his link with his Source, he can continue to use the Magic it provides. The nature of the Source and the link vary by individual case.",
    "rulesText": "The Mage draws his Magic from a special source that provides him with all the raw Power he needs. As long as the Mage can maintain his link with his Source, he can continue to use the Magic it provides. The nature of the Source and the link vary by individual case. If the source is small enough, the Mage might be required to carry it with him. If not, perhaps the Mage has to simply return to the Source at regular intervals or forge a mystical \"silver cord\" that ties him to the Source, regardless of the intervening distance. The Judge ana player should work together to develop a playable Source and link.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG3",
    "name": "Internal Limbo",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The Mage can create a pocket dimension whose gateway is his own body. This is a timeless space of near-infinite volume. The Mage can shape conditions within the Internal Limbo and create any environment he desires.",
    "rulesText": "The Mage can create a pocket dimension whose gateway is his own body. This is a timeless space of near-infinite volume. The Mage can shape conditions within the Internal Limbo and create any environment he desires. For example, the world inside Adarn Warlock's Soul Gem is a rather pleasant park. The Mage can also control the basic attitudes and emotions of any being within this Limbo. Within the Soul Gem, to continue the example, everyone feels peace and happiness, even if they were vicious, violent people in the outside world.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG4",
    "name": "Magic Control",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG4",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The Mage can alter the behavior of pure Magic itself, whether it is in a raw or applied state. The Mage can control the actions of any Magic within his range and capabilities. If the Magic is free of a living Mage's body, the Power rank of that Magic determines what Intensity FEAT is required.",
    "rulesText": "The Mage can alter the behavior of pure Magic itself, whether it is in a raw or applied state. The Mage can control the actions of any Magic within his range and capabilities. If the Magic is free of a living Mage's body, the Power rank of that Magic determines what Intensity FEAT is required. For example, a Typical Controller needs to make a red FEAT to control a Good rank. If the Magic is internalized within another living Mage, the necessary FEAT is determined by the other Mage's Psyche. For example, a Monstrous rank is required to even think about manipulating Dr.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG5",
    "name": "Magic Creation",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG5",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The Mage has the ability to create new Magical Powers and invest them into sentient beings for their own use. The new Magic can be of any nature, including any of the listings in this book, so long as they are treated as Magical rather than normal Powers. It can even be used to create any Magic or Powers that are not found in this book, if you find something I overlooked.",
    "rulesText": "The Mage has the ability to create new Magical Powers and invest them into sentient beings for their own use. The new Magic can be of any nature, including any of the listings in this book, so long as they are treated as Magical rather than normal Powers. It can even be used to create any Magic or Powers that are not found in this book, if you find something I overlooked. The Mage is limited in the number and Power ranks she can Create. The variety of such Powers as she can Create goes beyond her own innate Magical Powers. 44 (\"Those who can't do, teach.\") The Mage can create a variety of Magical Powers whose maximum number is equal to her Power rank number.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG6",
    "name": "Magic Domination",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a form of Mind Control. The Mage can control the actions of other Mages in regards to the casting and use of Magic spells. The Mage acts as a Puppetmaster who can control the physical actions but not the corscious mind of his victim.",
    "rulesText": "This is a form of Mind Control. The Mage can control the actions of other Mages in regards to the casting and use of Magic spells. The Mage acts as a Puppetmaster who can control the physical actions but not the corscious mind of his victim. The Mage can iorce his puppet to cast any Magic he possesses in any way the controlling Mage desires. The Mage cannot control the actual characteristics of the puppetMage's Magic. Range, area of effect, and casting time are all unaltered.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG7",
    "name": "Magic Transferral",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The Mage can transfer some or all of her Magic to another sentient being. Only this Power cannot be transferred. Any combination of Powers and ranks can be transferred.",
    "rulesText": "The Mage can transfer some or all of her Magic to another sentient being. Only this Power cannot be transferred. Any combination of Powers and ranks can be transferred. The rank of each spell decreases the rank for that spell held by the Mage. For example, Jen’tmril has Excellent Levitation. By transferring a Good rank of it into her aide Eleanor, she reduces her own rank to Good.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG8",
    "name": "Magic Vampirism",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The MageVampire can drain the Magical energy from a target and convert that Magic into extra Strength, Endura-.1ce, Psyche, and any other Magic or Powers he possesses. The Mage-Vampire can force a nonliving, non-sentient Magical item or being to release all its raw Magic. He must make a FEAT whose Intensity is equal to the highest ranked Magic the target possesses.",
    "rulesText": "The MageVampire can drain the Magical energy from a target and convert that Magic into extra Strength, Endura-.1ce, Psyche, and any other Magic or Powers he possesses. The Mage-Vampire can force a nonliving, non-sentient Magical item or being to release all its raw Magic. He must make a FEAT whose Intensity is equal to the highest ranked Magic the target possesses. For example, draining the Magic from Silver Dagger's namesake weapon requires an Amazing Intensity FEAT. A drained item is now nothing but a collection of normal materials. Magical beings may be hurt or destroyed if the Magic was an intrinsic part of their physiology.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG9",
    "name": "Power Simulation",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is not an actual Magical Power. What it is is a Magical version of any Power in the Ultimate Powers Book. The player simply rolls the dice again at this point to ran- domly determine another Power.",
    "rulesText": "This is not an actual Magical Power. What it is is a Magical version of any Power in the Ultimate Powers Book. The player simply rolls the dice again at this point to ran- domly determine another Power. Such a Power is to then considered to be Magical in nature and follows the rules for Magic rather than for relatively normal Power. For example, whereas Cyclops can simply open his ruby visor to unleash a glowing Kinetic bolt, a Mage with the Magical equivalent must go through the motions of casting a spell to achieve the same effect. This can be a problem when the Mage is in a combat situation but no one said a Mage's life was easy.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG10",
    "name": "Reality Alteration",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG10",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The Mage can reshape time itself in order to achieve a desired situation. There are four forms of this Power, each with a specific area of effect. Three of these alter the conditions that result from the passage of time.",
    "rulesText": "The Mage can reshape time itself in order to achieve a desired situation. There are four forms of this Power, each with a specific area of effect. Three of these alter the conditions that result from the passage of time. The fourth alters the actual flow of time. When the player creates a character with this Power, he must roll the dice to randomly determine what form his Mage possesses. Die Roll Form 01-40 Future 41-65 Present 66-75 Past 76-00 Temporal Flow Alter Future—The Mage can control the probability of a certain event coming to pass.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG11",
    "name": "Spirit Vampirism",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG11",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The Mage can drain the Intuition and Psyche from a target and use the absorbed energy to increase his own Strength, Endurance, Psyche, and other Powers he possesses. The higher ranked Ability of the victim determines what Intensity FEAT is required. A successful FEAT enables the Vampire to drain energy from both victim's Psyche and Intuition in equal amounts.",
    "rulesText": "The Mage can drain the Intuition and Psyche from a target and use the absorbed energy to increase his own Strength, Endurance, Psyche, and other Powers he possesses. The higher ranked Ability of the victim determines what Intensity FEAT is required. A successful FEAT enables the Vampire to drain energy from both victim's Psyche and Intuition in equal amounts. The amount drained per turn is equal to'this Power's rank number. The Vampire can drain this amount each turn that he makes a successful FEAT. He can voluntarily stop feeding at any point by making a Psyche FEAT of any color except red.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG12",
    "name": "Sympathetic Magic",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a combination of certain Mental and Life Control Powers. Sympathetic Magic requires the Mage make an Effigy of his target as a way of directing the Power to that target. The Effigy can be of any quality of workmanship, from a crude wax doll to an exquisitely detailed full portrait in oil paints; however, the Effigy must incorporate a cast-off body part, excretion, or possession of the target.",
    "rulesText": "This is a combination of certain Mental and Life Control Powers. Sympathetic Magic requires the Mage make an Effigy of his target as a way of directing the Power to that target. The Effigy can be of any quality of workmanship, from a crude wax doll to an exquisitely detailed full portrait in oil paints; however, the Effigy must incorporate a cast-off body part, excretion, or possession of the target. The most common example is a hank of hair. Once the Effigy is created, any action 48 MATTER CONTROL 49 that affects that Effigy will also affect the target. Physical manipulation of the Effigy causes a similar effect on the target.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG13",
    "name": "Warding",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The Mage can create areas of latent Power in any desired location. The Ward is designated by a special substance or mark. The mage decides what specific Powers the Ward possesses and what the triggering stimulus will be.",
    "rulesText": "The Mage can create areas of latent Power in any desired location. The Ward is designated by a special substance or mark. The mage decides what specific Powers the Ward possesses and what the triggering stimulus will be. When that stimulus occurs, the Ward releases all its power is a single turn, generally in the direction of whatever created the stimulus. The Power's rank determines how great a variety of Wards the Mage can create. The rank number is also the number of Powers he can incorporate into his Wards, even if the Mage cannot directly use those Powers.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "MG14",
    "name": "Warding / Banishment",
    "category": "Magical",
    "source": "Dragon Magazine #134 p. 91 (The Ultimate Addenda's Addenda)",
    "defaultRank": "Incredible",
    "countsAsTwo": false,
    "description": "The mystic mastery of creating arcane barrier circles, seal sigils, and abjurations that prevent supernatural entities from entering, or forcefully banishing extra-dimensional beings back to their home planes.",
    "rulesText": "Warding creates an impassable mystic barrier against extra-dimensional entities of rank less than or equal to power rank. Banishment forces extra-dimensional entities to make a Psyche FEAT vs Power Rank intensity or be cast out of the realm.",
    "errataNote": "Magical errata: Warding circles require 1 full turn to scribe on physical ground unless prepared beforehand on a talisman.",
    "powerStunts": [
      "Dimensional lock preventing teleportation in area",
      "Permanent seal on demon portals"
    ]
  },
  {
    "code": "P1",
    "name": "Armor Skin",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a form of Body Armor. The hero's skin is transformed into a damage-resistant form. The Power rank number decreases the Intensity of any physical or energy attack.",
    "rulesText": "This is a form of Body Armor. The hero's skin is transformed into a damage-resistant form. The Power rank number decreases the Intensity of any physical or energy attack. This decrease applies each turn for as long as the attack continues. The Armor Skin may be permanent or temporary. The permanent form is a lasting modification to the hero's appearance and physiology.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P2",
    "name": "Body Resistance",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the form of Body Armor most heroes want. The hero's body is composed of apparently normal flesh. However, the tissue of capable of withstanding major damage without showing any effects.",
    "rulesText": "This is the form of Body Armor most heroes want. The hero's body is composed of apparently normal flesh. However, the tissue of capable of withstanding major damage without showing any effects. The resistance covers physical and energy attacks only. The Intensity rank number of the at-. tack is reduced by this Power's rank number.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P3",
    "name": "Chemical Touch",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero's body secretes chemicals that are capable of a variety of effects on a target. The chemicals can be automatically or consciously secreted. The player must choose when the Power is first generated; there is an equal random chance for each.",
    "rulesText": "The hero's body secretes chemicals that are capable of a variety of effects on a target. The chemicals can be automatically or consciously secreted. The player must choose when the Power is first generated; there is an equal random chance for each. If the hero possesses a variety of Touch Powers, then the hero can alter the nature of the secreted chemicals at will. A Power Touch is created by combining this Power with any other Power the hero has. Each Touch Power has Power rank Intensity and does rank damage, regardless of the Touch Power's nature.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P4",
    "name": "Digestive Adaptation",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can swallow and digest any substance without harm. The digestive tract extracts useful materials and synthesizes new ones from the available material. In game \"reality\" this Power is an internalized, automatic form of Matter Conversion.",
    "rulesText": "The hero can swallow and digest any substance without harm. The digestive tract extracts useful materials and synthesizes new ones from the available material. In game \"reality\" this Power is an internalized, automatic form of Matter Conversion. Materials created by this Power retain their new nature while within the hero's body; upon expulsion they revert to their original nature. In rare cases, the hero is a living filter who could eventually convert all available matter into useful forms. The power also includes a +4CS resistance to liquid or solid toxins.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P5",
    "name": "Hyper-Speed",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero is capable of extremely fast motion and may even surpass light speed. Normally this Power includes a specific resistance to friction and lungs that are adapted to breathe high-velocity air. If the hero possesses a Travel Power, he can exchange this speed for that of the latter Power.",
    "rulesText": "The hero is capable of extremely fast motion and may even surpass light speed. Normally this Power includes a specific resistance to friction and lungs that are adapted to breathe high-velocity air. If the hero possesses a Travel Power, he can exchange this speed for that of the latter Power. The Power can also be used to perform tasks in greatly reduced time. The Power rank number is treated as a multiplier to show how much more quickly a specific task can be accomplished by someone with this Power. For example, Typical rank moves four times as fast, an Incredible rank moves 40 times as fast, and so on.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P6",
    "name": "Hypnotic Voice",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero possesses a voice whose intrinsic qualities permit a hypnotic domination of the target's conscious and subconscious thoughts. The bulk of the hero's commands are sub-verbal in nature (it's not what she says, but how she says it). The hero can effect anyone within the sound of her voice.",
    "rulesText": "The hero possesses a voice whose intrinsic qualities permit a hypnotic domination of the target's conscious and subconscious thoughts. The bulk of the hero's commands are sub-verbal in nature (it's not what she says, but how she says it). The hero can effect anyone within the sound of her voice. The optimum effect occurs within twenty feet of her location. The Power decreases -1CS for each additional twenty feet. Everyone within range must make an Intuition FEAT in order to resist falling under the effect of this Power.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P7",
    "name": "Lung Adaptability",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can breathe any gaseous or liquid medium without harm. The lungs can extract required gases (oxygen for humans) or even create them by converting available elements. In game \"reality\" this Power is an internalized, automatic form of Matter Conversion.",
    "rulesText": "The hero can breathe any gaseous or liquid medium without harm. The lungs can extract required gases (oxygen for humans) or even create them by converting available elements. In game \"reality\" this Power is an internalized, automatic form of Matter Conversion. Gases created by this Power retain their new nature while still within the hero's body; upon exhalation they revert to their original nature. In rare cases, the conversion is permanent. In this case, the hero is a living filter who could eventually convert all the local breathing medium into a form beneficial to him.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P8",
    "name": "Pheromones",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is an aerosol version of Hypnotic Control. The hero's body can create and emit chemicals capable of altering a target's behavior. These chemicals vaporize instantly on contact with air and are received by the target's nose.",
    "rulesText": "This is an aerosol version of Hypnotic Control. The hero's body can create and emit chemicals capable of altering a target's behavior. These chemicals vaporize instantly on contact with air and are received by the target's nose. The complexity of the commands can vary with the rank of the Power. The hero can readily affect anyone within twenty feet of him. The Power rank decreases -1CS with each additional twenty feet.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P9",
    "name": "Regeneration",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P9",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can rapidly recover from any wound. Cuts quickly close and disease symptoms disappear. The hero heals at an accelerated rate equal to the Power rank number times the normal amount of time.",
    "rulesText": "The hero can rapidly recover from any wound. Cuts quickly close and disease symptoms disappear. The hero heals at an accelerated rate equal to the Power rank number times the normal amount of time. For example, a Typical rank can heal six times as fast as normal, an Unearthly rank heals at a hundredfold rate, and so on. With time, the hero can regrow large areas of lost tissue, especially severed limbs. Lost limbs or organs require a red FEAT.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P10",
    "name": "Self-Revival",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P10",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero's Power is so strong that it can repair fatal damage and actually return the hero to life. The power functions despite the absence of life in the body. It repairs the major damage and replaces lost tissues at the same rate as Regeneration above.",
    "rulesText": "The hero's Power is so strong that it can repair fatal damage and actually return the hero to life. The power functions despite the absence of life in the body. It repairs the major damage and replaces lost tissues at the same rate as Regeneration above. When the body is returned to minimum life sustaining condition, the hero comes back to life. This occurs despite any intervening time in which the hero was dead; from the hero's point of view, no time has passed. If the hero was dismembered, the Revival Power is concentrated on the largest remaining segment.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P11",
    "name": "Self-Sustenance",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can survive indefinitely without consuming air, water, or food. Bodily wastes are internally recycled back into useable materials. Normally the hero would not need to replenish himself when his power reached its limit.",
    "rulesText": "The hero can survive indefinitely without consuming air, water, or food. Bodily wastes are internally recycled back into useable materials. Normally the hero would not need to replenish himself when his power reached its limit. He merely resumes normal consumption habits (breathe normally, eat a light snack, etc.). This is the permanent form of the power. The temporary form requires the hero to consume mass quantities at the expir- ation of the Power.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P12",
    "name": "Stealth",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can move in ways that cannot be detected, whether while moving or if subjected to later tracking. When the hero uses Stealth, his rank is subtracted from the efforts of those detecting him. Example: Shadowfox has Excellent Stealth.",
    "rulesText": "The hero can move in ways that cannot be detected, whether while moving or if subjected to later tracking. When the hero uses Stealth, his rank is subtracted from the efforts of those detecting him. Example: Shadowfox has Excellent Stealth. He cannot be detected by Typical means (that is less than Shift 0). Unfortunately, it's Wolverine who's tracking him with Monstrous ability. Shadowfox's Stealth lowers Wolverine's chance of finding him to merely Good.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P13",
    "name": "Suspended Animation",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can temporarily suspend all life functions and enter a death-like trance. The hero can later return to life and normal activity without harm. During this period, the hero's body can be subjected to normally fatal conditions and not suffer any, unless the body is actually damaged (say, a big rock fell on it).",
    "rulesText": "The hero can temporarily suspend all life functions and enter a death-like trance. The hero can later return to life and normal activity without harm. During this period, the hero's body can be subjected to normally fatal conditions and not suffer any, unless the body is actually damaged (say, a big rock fell on it). If this happens, the hero cannot return to life until the damage is repaired. Under normal conditions, the hero can consciously decide when to reawaken. This may be at the end of a predeter- mined length of time, or when certain conditions are met (like when his spaceship has air in it again).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P14",
    "name": "True Invulnerability",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P14",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is a combination of Resistances and Body Armor. The hero is immune to any physi cal harm, up to his rank's limit. The immunity includes the following resistances: fire, heat, cold, electricity, radiation, corrosives, disease, poison, brute force, sonics, and kinetic bolts.",
    "rulesText": "This is a combination of Resistances and Body Armor. The hero is immune to any physi cal harm, up to his rank's limit. The immunity includes the following resistances: fire, heat, cold, electricity, radiation, corrosives, disease, poison, brute force, sonics, and kinetic bolts. The rank of the Invulnerability reduces the rank of the attack form. Example: A Mandroid's Excellent laser would do only Feeble damage against Good Invulnerability, and none at all against Remarkable Invulnerability. The hero with this Power is still vulnerable to magical and mental attacks.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P15",
    "name": "Vocal Control",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This might be considered a Talent rather than a Power, but here goes anyway. The hero has total control over his own voice and can use it to duplicate any desired voice of sound. The accuracy of the simulated sound is 100% within the Power's limit (determined by rank) on a green FEAT.",
    "rulesText": "This might be considered a Talent rather than a Power, but here goes anyway. The hero has total control over his own voice and can use it to duplicate any desired voice of sound. The accuracy of the simulated sound is 100% within the Power's limit (determined by rank) on a green FEAT. Exceeding the limit requires a higher.-FEAT. The hero can imitate Sonic Powers that will have most of the effectiveness of the original. The rank for such mimicked Powers is -1CS of the original's rank.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P16",
    "name": "Waterbreathing",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This may be a \"wimp Power,\" but it would be embarrassing for an extremely powerful character to drown while a relatively wimpish water breather went unharmed. When creating the character, the player can substitute any other breathing medium for water. This is often the case when creating an alien character, such as one who breathes liquid methane.",
    "rulesText": "This may be a \"wimp Power,\" but it would be embarrassing for an extremely powerful character to drown while a relatively wimpish water breather went unharmed. When creating the character, the player can substitute any other breathing medium for water. This is often the case when creating an alien character, such as one who breathes liquid methane. This power may be permanent or temporary. Characters with the permanent form have a decreased resistance to heat and aridity. A sauna might be a death trap.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P17",
    "name": "Water Freedom",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P17",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero's body is adapted for movement in the water. The hero can move through water with the same ease that normal beings can move through air. One method of accom- plishing this is the presence of a body- coating that reduces the effects of water resistance.",
    "rulesText": "The hero's body is adapted for movement in the water. The hero can move through water with the same ease that normal beings can move through air. One method of accom- plishing this is the presence of a body- coating that reduces the effects of water resistance. The more common method is the hero is extraordinarily strong and swift in order to compensate for water resistance. This permits him to function normally, even at great depths. If such a person were on the surface, his extra strength and speed would be evident (+2CS Strength and Endurance).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "P18",
    "name": "Hyper Intake/Expulsion (Super-Breath)",
    "category": "Physical Enhancement",
    "source": "Dragon Magazine #134 p. 89 (The Ultimate Addenda's Addenda)",
    "defaultRank": "Remarkable",
    "countsAsTwo": false,
    "description": "The hero can inhale enormous volumes of gas, liquid, or loose matter, compressing it into an internal pocket dimension or super-dense lung cavity, and expel it as a concussive hurricane or freezing blast.",
    "rulesText": "Can absorb gases up to (Power Rank Number × 100) cubic feet, or liquids/solids up to (Power Rank Number) cubic feet. Inhaled matter can be retained indefinitely. Inhaling all air in an enclosed room forces occupants to make Endurance FEATs or pass out. Expelling gas deals concussive Blunt or Cold damage equal to power rank at power rank range.",
    "errataNote": "Renamed reference fix: Frequently referenced in older TSR comics text as 'Super-Breath', officially codified in Dragon #134 as P18.",
    "powerStunts": [
      "Super-Freeze Breath (rapid adiabatic expansion chills air to absolute frost)",
      "Vacuum inhalation to extinguish fires",
      "Cloud dispersal blast"
    ]
  },
  {
    "code": "P19",
    "name": "Hyper-Endurance",
    "category": "Physical Enhancement",
    "source": "Dragon Magazine #134 p. 90 (The Ultimate Addenda's Addenda)",
    "defaultRank": "Incredible",
    "countsAsTwo": false,
    "description": "An artificial or metahuman amplification of the hero's biological stamina, exceeding all human physiological thresholds.",
    "rulesText": "The power rank number is added to the hero's Endurance whenever using abilities that drain stamina, resist suffocation, endure extreme temperatures, or maintain Hyper-Running/Swimming for extended durations.",
    "errataNote": "Omission fix: David Martin frequently mentioned Hyper-Endurance throughout the UPB but forgot to include it in the tables until Dragon #134.",
    "powerStunts": [
      "Operating for weeks without sleep",
      "Holding breath for days"
    ]
  },
  {
    "code": "P20",
    "name": "Hyper-Strength",
    "category": "Physical Enhancement",
    "source": "Dragon Magazine #134 p. 90 (The Ultimate Addenda's Addenda)",
    "defaultRank": "Amazing",
    "countsAsTwo": false,
    "description": "The ability to surge physical musculature and lifting power beyond normal maximums, allowing 'Hulking out' during combat.",
    "rulesText": "Player choice at creation: (A) Permanently add this rank number to baseline Strength, OR (B) Manifest temporary surges of extreme Strength (+1CS bonus) for a number of game turns equal to the power rank number once per day.",
    "errataNote": "Surge mechanic: Surge option grants temporary +1CS lifting/damage but requires an Endurance FEAT afterward to prevent 1-turn exhaustion.",
    "powerStunts": [
      "Ground stomp shockwave stunning adjacent targets",
      "Shockwave clap inflicting concussive sound damage"
    ]
  },
  {
    "code": "PC1",
    "name": "Control",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC1",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can alter the behavior of pure Power, whether it is in a raw or applied state. The hero can control the actions of any Powers within his range and capability. If the Power is free of a living super-being's body, that Power's rank determines what Intensity FEAT is required.",
    "rulesText": "The hero can alter the behavior of pure Power, whether it is in a raw or applied state. The hero can control the actions of any Powers within his range and capability. If the Power is free of a living super-being's body, that Power's rank determines what Intensity FEAT is required. If the Power is internalized within a living super-being, the necessary FEAT is determined by that being's Psyche. If Control is achieved, it affects the entire rank of that Power. The range at which the hero can exert control is determined by his own Power rank number.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC2",
    "name": "Creation",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to create new Powers and invest them into sentient beings for their own use. The new Powers can be of any nature and can be any of the listings in this book. The hero is limited in the number and ranks of the Powers he can create.",
    "rulesText": "The hero has the ability to create new Powers and invest them into sentient beings for their own use. The new Powers can be of any nature and can be any of the listings in this book. The hero is limited in the number and ranks of the Powers he can create. The variety extends beyond his own innate Powers. The Power rank number is the maximum number of different Powers he can create. This number always includes those Powers the hero has.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC3",
    "name": "Domination",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC3",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is a form of Mind Control. The hero can control the actions of other super-beings in regards to the use of their own Powers. The hero can force the victim to use his Powers in any manner the hero desires.",
    "rulesText": "This is a form of Mind Control. The hero can control the actions of other super-beings in regards to the use of their own Powers. The hero can force the victim to use his Powers in any manner the hero desires. The hero cannot alter the actual characteristics of the other's Power's. The Macro-Power pits this Power's rank against the victim's Psyche. The Psyche determines what Intensity FEAT is required.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC4",
    "name": "Duplication",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "If the hero acquires this Power, the player should immed- iately set aside all his previously generated Powers and not roll any more. The hero can use his Macro- Power to duplicate the characteristics of any other Power. The Power ranks for the duplicated Powers is equal to the MacroPower's own rank.",
    "rulesText": "If the hero acquires this Power, the player should immed- iately set aside all his previously generated Powers and not roll any more. The hero can use his Macro- Power to duplicate the characteristics of any other Power. The Power ranks for the duplicated Powers is equal to the MacroPower's own rank. Such Powers remain as long as the hero concentrates on maintaining their existence. Unfortunately, the hero can only Duplicate a single Power at any one time. Switching Powers takes three turns.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC5",
    "name": "Energy Source",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero draws his Powers from a special source that provides him with all the energy he can handle. As long as the hero can maintain his link with this source, he can continue to use his Powers. The nature of the source and its link varies with each hero.",
    "rulesText": "The hero draws his Powers from a special source that provides him with all the energy he can handle. As long as the hero can maintain his link with this source, he can continue to use his Powers. The nature of the source and its link varies with each hero. If the source is small enough, the hero may be required to carry it with him. If not, perhaps the hero needs to periodically return to the source or forge an ethereal Power cord that links him to his Source despite any intervening distance. The Judge and player need to work together to produce a playable source and link.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC6",
    "name": "Energy Source Creation",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC6",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is another Power the Judge may want to restrict to NPCs or high level heroes. The hero can create items that can in turn provide Powers to other people. The hero is able to charge a target with raw Power.",
    "rulesText": "This is another Power the Judge may want to restrict to NPCs or high level heroes. The hero can create items that can in turn provide Powers to other people. The hero is able to charge a target with raw Power. The target must be non- living or non-sentient. The target is transformed into a battery that can harmlessly store raw Power indefinitely until needed by the target's new possessor. The hero can store any Power except this one.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC7",
    "name": "Focus",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can channel all his raw energy into a single burst of a chosen Ability or Power. All his Power and Ability rank numbers are totaled together. This rank number replaces the rank number for a chosen Power.",
    "rulesText": "The hero can channel all his raw energy into a single burst of a chosen Ability or Power. All his Power and Ability rank numbers are totaled together. This rank number replaces the rank number for a chosen Power. Upon the completion of releasing the Power, all the hero's Abilities and Powers temporarily drop to Feeble. This Power's rank number is the total amount of lost points the hero can regain each turn. Points are divided evenly between all the depleted Abilities and Powers.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC8",
    "name": "Gestalt",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Two or more users can combine to create a new Power. The Power can be of any nature; its Power rank is equal to this one. When the player generates this Power, he must first select another player's character with whom his hero forms the Gestalt.",
    "rulesText": "Two or more users can combine to create a new Power. The Power can be of any nature; its Power rank is equal to this one. When the player generates this Power, he must first select another player's character with whom his hero forms the Gestalt. Second, both players must randomly determine what the Gestalt-created Power actually is. Roll for additional Power; this is the Gestalt. The best example of Gestalt Power in the Marvel Universe was the Beaubier twins, Aurora and Northstar, who could generate Monstrous Intensity Light when they touched.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC9",
    "name": "Nemesis",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "When this Power is first generated, it replaces all other Powers the hero might have other had. If a hero is clever, then no other Powers are needed. The basis for Nemesis is the ability to automatically analyze an opponent's Powers and Weakness.",
    "rulesText": "When this Power is first generated, it replaces all other Powers the hero might have other had. If a hero is clever, then no other Powers are needed. The basis for Nemesis is the ability to automatically analyze an opponent's Powers and Weakness. The hero then instantly generates a Power that can defeat the opponent. The newly created Power can be a +1CS version of the opponent's Power or is an opposing Power. The nature of the Nemesis Powers varies with each opponent.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC10",
    "name": "Power Transferral",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can transfer some or all of his Powers to another sentient being. The transferral can be any combination of Powers and ranks. Only this Power cannot be, transferred.",
    "rulesText": "The hero can transfer some or all of his Powers to another sentient being. The transferral can be any combination of Powers and ranks. Only this Power cannot be, transferred. Each transferred Power rank diminishes the hero's own rank for that Power. A single Power can be transferred each turn. The optimum range for Power Trans- ferral is contact.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC11",
    "name": "Power Vampirism",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC11",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The Power Vampire can drain the raw Power from a victim and convert that energy into extra Strength, Endurance, Psyche, and ranks for other Powers the Vampire has. The Power Vampire can force a nonliving, non-sentient target to release all its raw Power. He must make an Intensity FEAT equal to the highest ranked Power the target possesses.",
    "rulesText": "The Power Vampire can drain the raw Power from a victim and convert that energy into extra Strength, Endurance, Psyche, and ranks for other Powers the Vampire has. The Power Vampire can force a nonliving, non-sentient target to release all its raw Power. He must make an Intensity FEAT equal to the highest ranked Power the target possesses. A drained item reverts to its original state. Living or sentient beings are harder to drain. The victim's Psyche determines what Intensity FEAT is required.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC12",
    "name": "Residual Absorption",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can duplicate a Power by absorbing the traces left behind whenever a Power is used. The residue may be in anything that was near or the target of a Power's emission. The Power rank determines what the rank is for any Powers created in this way.",
    "rulesText": "The hero can duplicate a Power by absorbing the traces left behind whenever a Power is used. The residue may be in anything that was near or the target of a Power's emission. The Power rank determines what the rank is for any Powers created in this way. The duration of the borrowed Powers is determined by the hero's Reason. A green Reason FEAT gives a duration equal to the Reason rank times 100 turns. A yellow FEAT raises that to 10,000 turns times the Reason rank number.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC13",
    "name": "Selection",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can possess any number of Powers but can only use a single one at a given time. Switching between Powers takes three turns. When the player generates this Power, he gets to generate an additional Power as well.",
    "rulesText": "The hero can possess any number of Powers but can only use a single one at a given time. Switching between Powers takes three turns. When the player generates this Power, he gets to generate an additional Power as well.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "PC14",
    "name": "Weakness Creation",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC14",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can bestow a weakness on a victim that is just as dangerous as if the victim as always possessed that Weakness. The hero must make a Power FEAT whose Intensity is determined by the victim's Psyche. Success means the hero has temporarily mangled the victim's physiology and given him a new Weakness.",
    "rulesText": "The hero can bestow a weakness on a victim that is just as dangerous as if the victim as always possessed that Weakness. The hero must make a Power FEAT whose Intensity is determined by the victim's Psyche. Success means the hero has temporarily mangled the victim's physiology and given him a new Weakness. The player randomly generates the nature of the Weakness using the Tables in the early sections of this book. The duration of the Weakness is determined by a separate Reason FEAT made at the time the Weakness is created. A green FEAT gives a duration of 10 turns times the Reason rank number.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S1",
    "name": "Age-Shift",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter his apparent age at will, His body and physiology change to simulate any age, younger or older. Mental facilities remain unaffected (in other words, you really can have a 10-year-old mind in a 30-year-old body). When creating the hero, the player can opt to link the hero's other physical Powers to a different physical age.",
    "rulesText": "The hero can alter his apparent age at will, His body and physiology change to simulate any age, younger or older. Mental facilities remain unaffected (in other words, you really can have a 10-year-old mind in a 30-year-old body). When creating the hero, the player can opt to link the hero's other physical Powers to a different physical age. For instance, Jon's hero can be a 1 0-year-old boy who has the ability to become a 25-year-old with the Powers of. Flight, Shadowcasting, and Telepathy. Rank determines the apparent number of years the hero can Age-Shift.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S2",
    "name": "Alter Ego",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has two different forms. One is a normal, powerless being; the other is the powerful, heroic self. When creating the hero, the player has to create two different beings.",
    "rulesText": "The hero has two different forms. One is a normal, powerless being; the other is the powerful, heroic self. When creating the hero, the player has to create two different beings. The statistics for the primary self should be fairly routine (all physical abilities ranging from Feeble to Good). All bets are off for the heroic self. Something many people never consider is that the heroic self might be a relatively normal human, while the normal self is something a little lower on the evolutionary ladder.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S3",
    "name": "Anatomical Separation",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the most grotesque Power available but it has its advantages nevertheless. With this Power the hero can spontaneously and harmlessly separate his body into independently functioning segments. Physiological functions like blood flow and neural activity continue in the same manner as if the body were whole.",
    "rulesText": "This is the most grotesque Power available but it has its advantages nevertheless. With this Power the hero can spontaneously and harmlessly separate his body into independently functioning segments. Physiological functions like blood flow and neural activity continue in the same manner as if the body were whole. Detached parts cannot regenerate if the - body is destroyed unless the hero has a regenerative Power. If any detached part JS: damaged or destroyed, the hero suffers the normal damage; his body also reassembles immediately, if possible. The practical basis for this is the power of Gateway/Spacewarp targeted on the hero's own body.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S4",
    "name": "Animal Transformation",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter his appearance, form, and dimensions to appear as any desired animal form. This Power can also be used to assume alien appearances (but not humanoid aliens). The only limitation is that the hero's basic physiology remains unchanged.",
    "rulesText": "The hero can alter his appearance, form, and dimensions to appear as any desired animal form. This Power can also be used to assume alien appearances (but not humanoid aliens). The only limitation is that the hero's basic physiology remains unchanged.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S5",
    "name": "Animal Mimicry",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a form of Power Duplication. The hero can duplicate the natural abilities of any animal. The hero's body does not significantly change; instead, existing flesh changes the way it functions.",
    "rulesText": "This is a form of Power Duplication. The hero can duplicate the natural abilities of any animal. The hero's body does not significantly change; instead, existing flesh changes the way it functions. For instance, perhaps th e lungs can now breathe water. The rank determines a successful duplication. Normal animals take a Typical Intensity FEAT, aliens a Good Intensity FEAT, and magical creatures need an Unearthly Intensity FEAT.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S6",
    "name": "Blending",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to match his color exactly to his surroundings. This Power functions as a practical invisibility. The body's outline and contours are still detectable if the observer is very careful.",
    "rulesText": "The hero has the ability to match his color exactly to his surroundings. This Power functions as a practical invisibility. The body's outline and contours are still detectable if the observer is very careful. The Power is most effective if the hero is in low light or at a distance from the viewer. Variables include speed and complexity of color change, and whether the Power is automatic or voluntary.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S7",
    "name": "Body Adaptation",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S7",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is related to Life Support. The hero's body automatically adapts its physiology to enable it to survive in hostile environments. Unlike many of the other Powers that also permit this, Body Adaptation physically changes the hero's body.",
    "rulesText": "This is related to Life Support. The hero's body automatically adapts its physiology to enable it to survive in hostile environments. Unlike many of the other Powers that also permit this, Body Adaptation physically changes the hero's body. This Power involves automatically functioning versions of Body Transformation and Shapeshifting. The Power changes the hero into a form that has primary abilities proportional to the new environment. Example: An Adapting hero in a heavy-gravity world might now possess Monstrous Strength, but so do all the natives.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S8",
    "name": "Body Transformation",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S8",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can alter the nature of elements and compounds within his own body. Innate safeguards in this Power maintain the hero's lifeforce in any altered state. Altered states may not necessarily be mobile, or may move in new ways.",
    "rulesText": "The hero can alter the nature of elements and compounds within his own body. Innate safeguards in this Power maintain the hero's lifeforce in any altered state. Altered states may not necessarily be mobile, or may move in new ways. (At FE and PR ranks, the hero is immobile.) Note: The safeguards that protect the hero might be disrupted or not included if another hero tries to duplicate this Power. In such cases, use of this Power may be instantly fatal! While in an altered state, the hero has a special vulnerability to attacks menacing that form.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S9",
    "name": "Body Coating",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can surround himself with a flexible layer of a protective substance not normally found on his body. The body coat provides protection and allows the hero's Power(s) to manifest (i.e., if the body coat is not present, the hero cannot use his other Powers). Damage to the body coating is not carried over to the hero's own Health; no points are lost even when the coating is completely destroyed.",
    "rulesText": "The hero can surround himself with a flexible layer of a protective substance not normally found on his body. The body coat provides protection and allows the hero's Power(s) to manifest (i.e., if the body coat is not present, the hero cannot use his other Powers). Damage to the body coating is not carried over to the hero's own Health; no points are lost even when the coating is completely destroyed. Any damage to the coating can be quickly repaired by the hero's body secreting more of the coating material. The degree of protection and the speed of repair to the coating are determined by the Power rank. The coating can be of any one substance.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S10",
    "name": "Bouncing Ball",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a specialized form of Shapeshifting. The hero can transform his body into a resilient sphere, apparently transforming his body into a balloon-like caricature of himself. Heroes with this power are rarely taken seriously, but—despite the image problem—this power offers substantial benefits to the hero.",
    "rulesText": "This is a specialized form of Shapeshifting. The hero can transform his body into a resilient sphere, apparently transforming his body into a balloon-like caricature of himself. Heroes with this power are rarely taken seriously, but—despite the image problem—this power offers substantial benefits to the hero. While he is inflated, the bouncer can travel at power rank speed. His Fighting rank is increased by this power’s rank number. He has +3CS resistance to blunt physical attacks.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S11",
    "name": "Chemical Mimicry",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is re lated to both S7/Body Transformation-Self and to Power Duplication. The hero can duplicate the chemical properties of any element or compound without his own body actually changing in composition. The hero's flesh simply acts as if it were the desired substance.",
    "rulesText": "This is re lated to both S7/Body Transformation-Self and to Power Duplication. The hero can duplicate the chemical properties of any element or compound without his own body actually changing in composition. The hero's flesh simply acts as if it were the desired substance. Obviously the hero retains his solidity, even when duplicating the properties of a liquid or gas. Depending on the desired 87 effect, the range of his chemical power varies from contact to one area. Tracking the hero by smell is difficult because his scent changes with each mimicry (-4CS to tracking ability).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S12",
    "name": "Elongation",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a specialized form of Shapeshifting. The hero can temporarily increase the length of any part or his body without losing leverage or strength. The hero can elongate any single part a maximum number of yards equal to his power rank number.",
    "rulesText": "This is a specialized form of Shapeshifting. The hero can temporarily increase the length of any part or his body without losing leverage or strength. The hero can elongate any single part a maximum number of yards equal to his power rank number. If two or more parts are elongated, this limit is the total combined length for all parts concerned. The hand counts as part of the arm unless the hero is specifically elongating his fingers; in this case, the maximum is divided by the number of fingers elongated. For example, Mr.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S13",
    "name": "Energy Body",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S13",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can transform his body into a coherent energy field that supports his lifeforce and is capable of controlled actions. The energy can be of any type (see the Energy Emission listings). When creating the character, the player determines the nature of the energy into which the hero can turn.",
    "rulesText": "The hero can transform his body into a coherent energy field that supports his lifeforce and is capable of controlled actions. The energy can be of any type (see the Energy Emission listings). When creating the character, the player determines the nature of the energy into which the hero can turn. The rank determines the number of possible energy types. The rank for each energy type is originally Good; this is modified by the Ability Modifier Table found on page 6 of the Player's Book. Each Power is rolled separately.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S14",
    "name": "Energy Sheath",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can surround himself with an energy field. This field provides protection, life support, and a means of manifesting the hero's other Powers. The energy field can be of any type (see the Energy Emis sion section for available types).",
    "rulesText": "The hero can surround himself with an energy field. This field provides protection, life support, and a means of manifesting the hero's other Powers. The energy field can be of any type (see the Energy Emis sion section for available types). Each energy field has its own characteristics that affect the ways the hero can use the Power. Only one Energy Sheath can be used at a time. The hero may possess several possible Energy Sheathes.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S15",
    "name": "Evolution",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter his mind and body to simulate any stage of the evolutionary path of his species. Note: This is \"comic book\" evolution, folks, the kind where superstrong cavemen eventually evolve into giant brains with vestigial limbs. If the hero possesses other Powers, the player may divide them among different evolutionary stages.",
    "rulesText": "The hero can alter his mind and body to simulate any stage of the evolutionary path of his species. Note: This is \"comic book\" evolution, folks, the kind where superstrong cavemen eventually evolve into giant brains with vestigial limbs. If the hero possesses other Powers, the player may divide them among different evolutionary stages. For example, the caveman gets the physical Powers while the giant brain gets the mental ones. Rank determines the duration of the assumed stages. For the caveman, drop the Reason, Intuition, and Psyche, but raise the Fighting, Agility, Strength, and Endurance.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S16",
    "name": "Growth",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a self-directed form of MC6/Enlargement. The hero can temp- orarily increase his physical size at will. As he grows, the hero becomes an easier target.",
    "rulesText": "This is a self-directed form of MC6/Enlargement. The hero can temp- orarily increase his physical size at will. As he grows, the hero becomes an easier target. The bonuses to be hit, given in Table 3, are not cumulative. There are three ways the power can be attained: Atomic Dispersal, Atomic Gain, and At- omic Growth. The player randomly deter- mines the method when he creates the character or when the character first gains this power, using the subtable below.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S17",
    "name": "Imitation-Face Changer",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S17",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can change his superficial appearance but cannot alter his basic form or dimensions. The hero has conscious control over the movement and placement of muscles, cartilage, and minor bones (nose, fingers, cheeks) and can alter the color and appearance of his skin and hair. The hero can use this Power to assume any human appearance, provided the desired shape roughly matches his own.",
    "rulesText": "The hero can change his superficial appearance but cannot alter his basic form or dimensions. The hero has conscious control over the movement and placement of muscles, cartilage, and minor bones (nose, fingers, cheeks) and can alter the color and appearance of his skin and hair. The hero can use this Power to assume any human appearance, provided the desired shape roughly matches his own. Examples: A child could imitate other children, midgets, and dwarves. A thin man could not imitate Sydney Greenstreet.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S18",
    "name": "Imitation-Human Changeling",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter his appearance, form, and dimensions to appear in any desired human or humanoid shape. The hero may either imitate a known being or assume a created appearance. This Power does not allow the hero to imitate Powers, Talents, or mannerisms.",
    "rulesText": "The hero can alter his appearance, form, and dimensions to appear in any desired human or humanoid shape. The hero may either imitate a known being or assume a created appearance. This Power does not allow the hero to imitate Powers, Talents, or mannerisms.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S19",
    "name": "Invisibility",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S19",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "With this Power a hero can render himself undetectable by normal, consciously willed sight. There are four very different means of accomplishing this effect. Each form has unique characteristics regarding such factors as the area made invisible, protection against light-based attacks, mechanical detection, and detection by other means.",
    "rulesText": "With this Power a hero can render himself undetectable by normal, consciously willed sight. There are four very different means of accomplishing this effect. Each form has unique characteristics regarding such factors as the area made invisible, protection against light-based attacks, mechanical detection, and detection by other means. Physics: This is the form possessed by Sue Richards. The hero's body is totally transparent to the visible light spectrum. He cannot be mechanically detected or recorded (i.e.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S20",
    "name": "Mass Decrease",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can diminish his body’s mass. His weight decreases to a percentage equal to his power rank number. For example, the Vision’s Unearthly rank in this power decreases his weight by 100%, making him completely weightless.",
    "rulesText": "The hero can diminish his body’s mass. His weight decreases to a percentage equal to his power rank number. For example, the Vision’s Unearthly rank in this power decreases his weight by 100%, making him completely weightless. At Shift X and higher, the hero attains buoyancy and can lift additional weight. The added weight is a percentage of his normal body weight; for example, a 160 lb. man with Shift Z rank in this power can carry an additional 800 pounds (500% of 160 lbs.).",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S21",
    "name": "Mass Increase",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S21",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can increase his body’s mass. His weight is multiplied by the power rank number. For example, a 98-pound weakling with Remarkable rank can increase his mass to 2,940 pounds (30 x 98).",
    "rulesText": "The hero can increase his body’s mass. His weight is multiplied by the power rank number. For example, a 98-pound weakling with Remarkable rank can increase his mass to 2,940 pounds (30 x 98). Fortunately, a side effect of this power increases the hero’s basic strength. No matter how much the hero weighs, he can still move as if he were his normal weight. Lifting strength remains the same.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S22",
    "name": "Phasing (Ghost Walk)",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S22",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can shift atomic vibration frequencies out of phase with conventional matter, passing through solid objects unharmed.",
    "rulesText": "Can pass through solid physical matter of material strength up to Power Rank. While phasing, completely immune to physical attacks, blunt, and edged damage.",
    "errataNote": "Errata: Phasing characters are vulnerable to Energy, Force, and Mental attacks unless specialized phased resistances are active.",
    "powerStunts": [
      "Disrupting electronic machinery by phasing through circuitry",
      "Phasing allies on contact"
    ]
  },
  {
    "code": "S23",
    "name": "Physical Gestalt",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S23",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can render his body intangible to normal matter. This enables him to pass harmlessly through any object. The hero’s power rank must exceed the barrier’s material strength in order for Phasing to occur.",
    "rulesText": "The hero can render his body intangible to normal matter. This enables him to pass harmlessly through any object. The hero’s power rank must exceed the barrier’s material strength in order for Phasing to occur. The hero can Phase through Force Fields, Body Armors, Resistances, and Invulner- abilities of lower ranks by making a green FEAT. Because the hero is out of phase with normal matter, he cannot breathe. Thus, the practical duration limit on this power is the length of time the hero can hold his breath.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S24",
    "name": "Plant Mimicry",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S24",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a form of Power duplication. The hero can duplicate the natural abilities of any plant. The body does not significantly change, aside from the instantaneous appearance of chlorophyll in the hero's skin whenever he uses this Power.",
    "rulesText": "This is a form of Power duplication. The hero can duplicate the natural abilities of any plant. The body does not significantly change, aside from the instantaneous appearance of chlorophyll in the hero's skin whenever he uses this Power. Some plant \"powers\" include: • Photosynthesis: The hero can survive without eating by converting sunlight to food. • Fragrance: The hero can summon and control insects. • Rooting: The hero can become immovable.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S25",
    "name": "Plasticity",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S25",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can change his body’s topology; that is, he can twist, bend, pull, stretch or otherwise distort his body’s shape into any form. The only limitation is that the hero cannot normally create new holes in his body. For example, Mr.",
    "rulesText": "The hero can change his body’s topology; that is, he can twist, bend, pull, stretch or otherwise distort his body’s shape into any form. The only limitation is that the hero cannot normally create new holes in his body. For example, Mr. Fantastic can form himself into a parachute but not a sieve. If the hero wants to assume a shape that requires holes, he must make a red FEAT. For example, a higher-ranked hero could regularly transform himself into nets and ladders.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S26",
    "name": "Prehensile Hair",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S26",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a Power that few masculine heroes would admit to having, even if they possessed it. The Power gives the hero's hair the capability of independent, controlled movement, as if each strand were a tiny tentacle, It is also a Power that apparently only women possess. The basis for this may be cultural rather than genetic (in the entire history of comic books, only three people had this Power—all women).",
    "rulesText": "This is a Power that few masculine heroes would admit to having, even if they possessed it. The Power gives the hero's hair the capability of independent, controlled movement, as if each strand were a tiny tentacle, It is also a Power that apparently only women possess. The basis for this may be cultural rather than genetic (in the entire history of comic books, only three people had this Power—all women). Using her Prehensile Hair, the heroine can perform a variety of tasks with the hairs combining to form one or more appendages. She can handle objects, pick locks, ensnare a target, and even deliver a powerful blow with a silken fist. In a blunt combat the hair functions as one or more attacks.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S27",
    "name": "Self-Duplication",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S27",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can spontaneously generate exact copies of himself. The new bodies are usually semi-independent; each possessing an 91 independent mind but all are linked telepathically so all Duplicates are aware of each other's actions. Each Duplicate possesses the same Powers as the original, except for possible lacking this Power (that is, no Duplicate could generate more Duplicates).",
    "rulesText": "The hero can spontaneously generate exact copies of himself. The new bodies are usually semi-independent; each possessing an 91 independent mind but all are linked telepathically so all Duplicates are aware of each other's actions. Each Duplicate possesses the same Powers as the original, except for possible lacking this Power (that is, no Duplicate could generate more Duplicates). If a Duplicate is killed, the hero doesn't lose any Health, though he might lose Karma if the hero deliberately sent his Duplicate into a certain-death situation. If the original body is killed, the Duplicates will last until the duration of the Power is up-then disintegrate. If the hero's Duplicates possess an indefinite existence and the Power of Duplication, it matters not if the original body is destroyed.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S28",
    "name": "Self-Vegetation",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S28",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter both his shape and physiology to become any desired plantform. The degree of change can vary wildly. At the least, the hero's body changes into a similarly-shaped \"plantman;\" at higher ranks the hero may assume normal or alien plant shapes.",
    "rulesText": "The hero can alter both his shape and physiology to become any desired plantform. The degree of change can vary wildly. At the least, the hero's body changes into a similarly-shaped \"plantman;\" at higher ranks the hero may assume normal or alien plant shapes. When in plant-form, the hero is immune to attacks that specifically affect animal life (nerve gas, pheromones, etc.) but is vulnerable to attacks that affect plant life (herbicides, light-blocking, etc.). When in plant form, the hero doesn't need to eat normal food; rather he uses photosynthesis to gain desired energy. This requires the availability of water, air, and sunlight.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S29",
    "name": "Shapeshifting",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S29",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can drastically alter all of his physical parameters (dimensions, appearance, physiology) to achieve any desired shape. Despite appearances, the hero retains his basic chemical composition unless other Powers are used simultaneously, such as S8/Body Transformation-Self. Example: Hobgoblin of the Shi'ar Imperial Guard transforms himself into a stone wall.",
    "rulesText": "The hero can drastically alter all of his physical parameters (dimensions, appearance, physiology) to achieve any desired shape. Despite appearances, the hero retains his basic chemical composition unless other Powers are used simultaneously, such as S8/Body Transformation-Self. Example: Hobgoblin of the Shi'ar Imperial Guard transforms himself into a stone wall. Despite its granite-like facade, it's composed of flesh; instead of chips flying when the wall is attacked, it bleeds. The hero can attempt to change into any form; success is determined by a FEAT. When creating the hero, the player can raise the Power rank by limiting the variety of possible forms into which the hero can change.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S30",
    "name": "Shrinking",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S30",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a personal form of MC4/Diminution. The hero can temporarily decrease his body’s size. The hero’s primary and secondary abilities remain unaffected.",
    "rulesText": "This is a personal form of MC4/Diminution. The hero can temporarily decrease his body’s size. The hero’s primary and secondary abilities remain unaffected. Even Strength is undiminished, although it is much harder for a shrunken hero to gain enough leverage to perform tasks that would otherwise be simple to perform. For example, consider the act of sharpening a pencil if you are only ladybug-size. As the hero shrinks, he becomes harder to hit but conversely suffers greater damage if struck.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S31",
    "name": "Spirit Gestalt",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S31",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can transform into a heroic Alter Ego by joining his mind and body with one or more disembodied beings (spirits, semi-divine beings, and that ilk. The joining of these disparate beings generates the Power possessed by the Gestalt hero. The merging spirit can be of any nature, determined by the player at the time of the hero's creation.",
    "rulesText": "The hero can transform into a heroic Alter Ego by joining his mind and body with one or more disembodied beings (spirits, semi-divine beings, and that ilk. The joining of these disparate beings generates the Power possessed by the Gestalt hero. The merging spirit can be of any nature, determined by the player at the time of the hero's creation. Possibilities include: Ancestral Gestalt: The merging beings are the hero's own ancestors. Spiritual Gestalt: The spirits are any Free Spirits. Demonic Gestalt: The merging being is a nasty supernatural type.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "S32",
    "name": "Swarm / Collective Mass (Swarm Form)",
    "category": "Self-Alteration",
    "source": "Dragon Magazine #122 p. 55 & UPB Addendum",
    "defaultRank": "Remarkable",
    "countsAsTwo": true,
    "description": "The character's body is comprised of millions of microscopic or tiny organisms (insects, nanites, crystalline bees, or liquid droplets) possessing a unified hive consciousness.",
    "rulesText": "Immune to physical blunt and edged attacks (which merely pass through the swarm without harm). Energy, area-of-effect, and spray attacks deal normal damage. Swarm can flow through tiny cracks, vents, and keyholes. Engulfing an opponent allows suffocating or stinging attacks dealing Power Rank damage.",
    "errataNote": "Dual-Profile: In Swarm Form, physical attacks inflict no Health loss. The character's Health is divided among individual organisms.",
    "powerStunts": [
      "Splitting into multiple scout swarms",
      "Forming semi-solid constructs (bridges, ladders, pseudopods)"
    ]
  },
  {
    "code": "T1",
    "name": "Astral Body",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can send his astral form off to any destination. The physical body doesn't go anywhere; it remains in a comatose state until the astral body returns. The astral body is intangible and invisible to normal senses.",
    "rulesText": "The hero can send his astral form off to any destination. The physical body doesn't go anywhere; it remains in a comatose state until the astral body returns. The astral body is intangible and invisible to normal senses. In the Earth dimension it can use any of the hero's mental or Psionic Powers but not the physical ones. In other dimensions the astral body regains visibility, solidity, and the physical Powers. A magical silver cord connects the astral and physical bodies.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T2",
    "name": "Carrier Wave",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can manipulate energy currents to support and propel his body, thus attaining a form of Flight. The energy can be any type found in the hero's environment, such as magnetism, sound, light, heat, and electricity. The hero can use only one form; the player has to decide which one when he creates the hero.",
    "rulesText": "The hero can manipulate energy currents to support and propel his body, thus attaining a form of Flight. The energy can be any type found in the hero's environment, such as magnetism, sound, light, heat, and electricity. The hero can use only one form; the player has to decide which one when he creates the hero. The Carrier Wave can support the hero and an additional load equal to its Power rank in terms of Strength. For example, Magneto's Remarkable rank enables him to tow up to a ton of material. The carrier wave is temporarily solid and visible.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T3",
    "name": "Dimension Travel",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can travel into a number of other Dimensions. Transit to a random dimension normally occurs automatically but the Power is weakened by adrenaline. If the hero is in any kind of precarious situation, he must make a Power rank FEAT.",
    "rulesText": "The hero can travel into a number of other Dimensions. Transit to a random dimension normally occurs automatically but the Power is weakened by adrenaline. If the hero is in any kind of precarious situation, he must make a Power rank FEAT. He must also make a FEAT if he is trying to appear in a specific dimension or alternate timeline. Specific locations in the other dimension require a red FEAT. The return trip is easier.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T4",
    "name": "Energy Path",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a combination of Energy Body and Carrier Wave. The hero is transformed into energy and is propelled at Power rank speed along currents of that energy. The maximum speed is that normal Energy.",
    "rulesText": "This is a combination of Energy Body and Carrier Wave. The hero is transformed into energy and is propelled at Power rank speed along currents of that energy. The maximum speed is that normal Energy. The hero is limited to places where the energy currents flow. The player must choose what form of energy the hero turns into. Upon reaching the destination or the limit of the energy current, the hero safely rematerializes.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T5",
    "name": "Floating Disc",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can create a glowing platform of solid light. The disc materializes to support any part of the hero's body; generally this is under the feet or posterior. The disc is a part of the hero's Power and has no independent existence beyond him.",
    "rulesText": "The hero can create a glowing platform of solid light. The disc materializes to support any part of the hero's body; generally this is under the feet or posterior. The disc is a part of the hero's Power and has no independent existence beyond him. The disc can automatically support the hero and additional mass. The weight is supported by a Power FEAT with the Power substit- uting for Strength. For example, creating a Floating Disc to lift five tons is an Incred- 94 ible Intensity FEAT.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T6",
    "name": "Gateway",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T6",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can travel to any point in space, time, or other dimensions by traveling along bridges she creates herself. She can travel along a bridge from her current location to a location in space (a green FEAT), time (a yellow FEAT), and other dimensions (a red FEAT). The destination of each Gateway is a fixed point in space but the depart- ure end always moves with the hero.",
    "rulesText": "The hero can travel to any point in space, time, or other dimensions by traveling along bridges she creates herself. She can travel along a bridge from her current location to a location in space (a green FEAT), time (a yellow FEAT), and other dimensions (a red FEAT). The destination of each Gateway is a fixed point in space but the depart- ure end always moves with the hero. A bridge to another location in space is created by a FEAT. A green FEAT creates a spatial bridge. The maximum distance the target can be from the hero at the time the bridge is created is shown on column E of the Range Table.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T7",
    "name": "Gliding",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can travel on air currents. She can travel at Power rank speed, with a top limit of Shift-X rank (Mach One). In normal air currents, the hero drops one story (15 feet) for each turn she is in the air.",
    "rulesText": "The hero can travel on air currents. She can travel at Power rank speed, with a top limit of Shift-X rank (Mach One). In normal air currents, the hero drops one story (15 feet) for each turn she is in the air. Level flight can be maintained by an Agility FEAT; failure indicates a loss of 2 stories. The glider can climb by using updrafts. Using an updraft to climb 'requires a yellow Agility FEAT for each three stories the hero ascends; failure means she's caught in a downdraft and descends the three stories instead.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T8",
    "name": "Hyper-Digging",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can travel swiftly through the earth by burrowing a tunnel at Power rank speed (land movement rate). The Power can be used indefinitely as Hyper-digging has the side-effect of increasing the hero's Strength and Endurance. Both abilities' ranks are raised by this Power's rank number.",
    "rulesText": "The hero can travel swiftly through the earth by burrowing a tunnel at Power rank speed (land movement rate). The Power can be used indefinitely as Hyper-digging has the side-effect of increasing the hero's Strength and Endurance. Both abilities' ranks are raised by this Power's rank number. Burrowing remains the hero's preferred mode of transportation, when compared to running or especially to inconceivable activities like flying. Normally the tunnel the hero makes collapses within 10 turns of the hero's passage at a specific spot. The exception is the tunnel within 10 feet of the hero's current location.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T9",
    "name": "Hyper-Leaping",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can jump great distances. By repeated leaps, the hero can rapidly cover large distances. This Power's minimum rank is +1CS greater than the hero's Strength rank.",
    "rulesText": "The hero can jump great distances. By repeated leaps, the hero can rapidly cover large distances. This Power's minimum rank is +1CS greater than the hero's Strength rank. If a lower rank is initially rolled, it must be raised to this level. The Power rank determines the distances the hero can safely leap. Maximum Distance Rank Up/Across Down FE 4' 6' PR 6' 9' TY 10' 15' GD 20' 30' EX 30' 45' RE 40' 60' IN 50' 75' AM 75' 105' MN 100' 150' UN 1 area 1.5 areas X 1.5 2.5 Y 4 6 Z 8 12 C1000 .5 mile .75 mile C3000 1 1.5 C5000 2 3 Innate safeguards in this Power enable the hero to safely land.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T10",
    "name": "Hyper-Running",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can run at Power rank speed for extended amounts of time. The Power has the side-effect of raising the Ability rank number of Endurance by this Power's rank number. It includes protection to wind resistance and windburn; this protection extends to anything the hero is carrying.",
    "rulesText": "The hero can run at Power rank speed for extended amounts of time. The Power has the side-effect of raising the Ability rank number of Endurance by this Power's rank number. It includes protection to wind resistance and windburn; this protection extends to anything the hero is carrying. The hero's lungs are modified to breath high velocity air. The last benefit can be crucial if the hero is capable of Remarkable speeds or better. If the hero stumbles, he continues on a ballistic trajectory until he regains his footing or rolls to a halt.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T11",
    "name": "Hyper-Swimming",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can cover large distances by swimming at Power rank speed. Speed is decreased - 1CS for each 100 feet of depth at which the hero us swimming. This is due to increased water pressure.",
    "rulesText": "The hero can cover large distances by swimming at Power rank speed. Speed is decreased - 1CS for each 100 feet of depth at which the hero us swimming. This is due to increased water pressure. Water Freedom can negate this limitation. The Power does not free the hero from the need to breathe. The hero can tow other objects in his wake at a decreased speed of -1CS.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T12",
    "name": "Levitation",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can freely resist the pull of gravity. She can move vertically at Power rank speed, hover in place, or drift with the wind. Limited horizontal movement is possible by pushing off from other objects.",
    "rulesText": "The hero can freely resist the pull of gravity. She can move vertically at Power rank speed, hover in place, or drift with the wind. Limited horizontal movement is possible by pushing off from other objects. The maximum distances are determined the same way a normal leap is. If the hero possesses Hyper-Leaping, that can be used to greatly increase the distances the hero can propel herself. A hero with this Power can never fall unless she is unconscious or purposely decides to succumb to gravity.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T13",
    "name": "Rocket",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero flies by means of a rocket-like exhaust that propels him at Power rank speed. The rocket blast is created by a thermo-chemical reaction generated by the hero's body. The Power converts whatever material is around him into fuel and oxidant, then it shapes the exhaust into a stream to propel him.",
    "rulesText": "The hero flies by means of a rocket-like exhaust that propels him at Power rank speed. The rocket blast is created by a thermo-chemical reaction generated by the hero's body. The Power converts whatever material is around him into fuel and oxidant, then it shapes the exhaust into a stream to propel him. If the hero is in a vacuum, the Power creates fuel out of virtual nothingness. The Power is treated like Strength to determine the maximum thrust the Power can achieve. If the thrust is high enough, the hero can carry or push additional loads.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T14",
    "name": "Skywalk",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a peculiar form of flying. The hero can walk along an invisible path that he creates in the air. The path only serves the hero and only exists as long as he concentrates on maintaining its existence.",
    "rulesText": "This is a peculiar form of flying. The hero can walk along an invisible path that he creates in the air. The path only serves the hero and only exists as long as he concentrates on maintaining its existence. The path is intangible to others unless the hero can extend its benefits to them by such means as a Power Stunt, Power Transferral, or Telekinesis. The Sky- walker can develop a Power Stunt that maintains the path even while he is unconscious. Another Power Stunt increases the path's tangibility to a circular area 10 feet around the hero; this enables others to travel alongside him.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T15",
    "name": "Spiderclimb",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can travel along vertical or inverted surfaces with only minor difficulty. The maximum speed, assuming the hero is using all his limbs to Spiderclimb, is the same as the hero's normal ground movement rate. Each pair of limbs not used to climb decreases the overall speed -2CS.",
    "rulesText": "The hero can travel along vertical or inverted surfaces with only minor difficulty. The maximum speed, assuming the hero is using all his limbs to Spiderclimb, is the same as the hero's normal ground movement rate. Each pair of limbs not used to climb decreases the overall speed -2CS. For example, Spider- man can walk up a wall using only his feet if he is holding something in both arms, but it takes longer because of his decreased grip on the wall. The Power rank determines how strong the hero's adhesion is to a given surface. The climber must make an Intensity FEAT based on the relative slipperiness of a surface.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T16",
    "name": "Teleport Self",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T16",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can vanish at one location and instantly reappear at a distant site. He does not physically. cross the intervening distance and is not affected by most physical barriers.",
    "rulesText": "The hero can vanish at one location and instantly reappear at a distant site. He does not physically. cross the intervening distance and is not affected by most physical barriers. Column E of the Range Table shows the maximum distance a hero can Teleport. Teleportation always occurs, but the hero must make a Power FEAT to see how well he makes the trip. Failure means he arrives disoriented and cannot take any actions the following turn.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T17",
    "name": "Teleport Others",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T17",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is a peculiar form of Self Teleportation. The hero can disintegrate his body, transport his lifeforce any distance, and then create a new body out of materials available at the destination site. The Power shapes these into a form that resembles the hero's self-image but whose physical properties may be those of the materials that compose the new body.",
    "rulesText": "This is a peculiar form of Self Teleportation. The hero can disintegrate his body, transport his lifeforce any distance, and then create a new body out of materials available at the destination site. The Power shapes these into a form that resembles the hero's self-image but whose physical properties may be those of the materials that compose the new body. Column E of the Range Table shows the maximum di stance the hero can travel. Upon attempting to form a new body, the hero must make a Power FEAT. A green FEAT shapes existing material into the hero's basic form.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T18",
    "name": "Telereformation",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can dissolve their physical body into microscopic particles or energy quanta, instantaneously reforming at a designated destination.",
    "rulesText": "Instantaneous transit without crossing the intervening space. If destroyed or dispersed, the hero's consciousness reconstructs at a designated anchor site after 1-10 turns.",
    "errataNote": "",
    "powerStunts": [
      "Reforming inside sealed bunkers or vacuum enclosures"
    ]
  },
  {
    "code": "T19",
    "name": "Time Travel",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T19",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can travel in time to reach any point in the past or future. The maximum range the hero can reach is varies depending on which direction he's traveling. Travel into the past is easy because it already exists from the hero's point of view.",
    "rulesText": "The hero can travel in time to reach any point in the past or future. The maximum range the hero can reach is varies depending on which direction he's traveling. Travel into the past is easy because it already exists from the hero's point of view. The maximum range is equal to the Power rank number times 1000 years. Travel into the future is harder (at least, if you're planning a return trip). The maximum range into the future is equal to the Power rank number times 10 years.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T20",
    "name": "Troubleseeker",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Heroes hate this Power but it does tend to get an adventure going quickly. The Power combines Teleportation with automatically functioning Mental and Detection Powers. The hero subconsciously detects a crisis somewhere within his range and automatically teleports to the vicinity.",
    "rulesText": "Heroes hate this Power but it does tend to get an adventure going quickly. The Power combines Teleportation with automatically functioning Mental and Detection Powers. The hero subconsciously detects a crisis somewhere within his range and automatically teleports to the vicinity. The maximum range for detection and Teleportation is shown on column E of the Range Table. The hero has no control over the Power. He usually arrives without any idea of what the problem is that drew him.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T21",
    "name": "True Flight",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T21",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can fly through air and space without an apparent means of propulsion. This is the most desired Power in the history of the world. The Power rank determines the maximum speed the hero can attain in a specific condition.",
    "rulesText": "The hero can fly through air and space without an apparent means of propulsion. This is the most desired Power in the history of the world. The Power rank determines the maximum speed the hero can attain in a specific condition. There are three mediums in which a hero can fly. The slowest form of Flight occurs when the hero torpedoes through the water at the Water Movement rate. Faster speed occurs when the hero flies through the air at the Air Movement rate.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T22",
    "name": "Water Walking",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T22",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can temporarily solidify the surface of the water to enable him to walk on it without getting more than his feet wet. The pathway smoothes the water's surface to an average wave height and is not affected by waves of equal or less Intensity. The path slides along the water's surface.",
    "rulesText": "The hero can temporarily solidify the surface of the water to enable him to walk on it without getting more than his feet wet. The pathway smoothes the water's surface to an average wave height and is not affected by waves of equal or less Intensity. The path slides along the water's surface. This permits the hero to travel at Power rank speed and the Water Movement rate. The Path only exists for the hero to use. It is intangible to others unless the hero can physically carry them or directly extend his Power to them.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T23",
    "name": "Whirlwind",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T23",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can fly by creating a small cyclone that carries him through the air. The hero can travel at Power rank speed but is limited to Shift-X rank. Maneuverability is determined by the hero's Agility.",
    "rulesText": "The hero can fly by creating a small cyclone that carries him through the air. The hero can travel at Power rank speed but is limited to Shift-X rank. Maneuverability is determined by the hero's Agility. In addition to the hero's body, the Whirlwind can support additional weight. Each additional 500 pounds decreases the Whirlwind's speed -1CS. Passengers are not battered by the high winds but are safely held aloft by updrafts in the cyclone's interior.",
    "errataNote": "",
    "powerStunts": []
  },
  {
    "code": "T24",
    "name": "Dimensional Aperture (Gate)",
    "category": "Travel",
    "source": "Dragon Magazine #134 p. 92 (The Ultimate Addenda's Addenda)",
    "defaultRank": "Monstrous",
    "countsAsTwo": true,
    "description": "The ability to tear open stable spatial rifts connecting distant cosmic regions, parallel dimensions, or alternate timelines, through which entire armadas or structures can pass.",
    "rulesText": "Creates a portal of diameter up to (Power Rank Number) feet. Remains open for up to (Power Rank Number) turns. Can transit characters and vehicles instantly across galactic distances or dimensions.",
    "errataNote": "Counts as 2 power slots. Requires a Psyche FEAT to target unfamiliar dimensions accurately.",
    "powerStunts": [
      "Closing portal on an enemy dealing Shift X cutting damage",
      "Inverting portal to swallow incoming projectile barrages"
    ]
  }
];

// Helper map for fast O(1) lookup by power code
const RANGE_BY_RANK = {
  'Shift 0': '0 areas',
  'Feeble': '1 area',
  'Poor': '1 area',
  'Typical': '2 areas',
  'Good': '3 areas',
  'Excellent': '4 areas',
  'Remarkable': '5 areas',
  'Incredible': '6 areas',
  'Amazing': '8 areas',
  'Monstrous': '10 areas',
  'Unearthly': '12 areas',
  'Shift X': '20 areas',
  'Shift Y': '40 areas',
  'Shift Z': '100 areas',
  'Class 1000': '1,000 areas (10 miles)',
  'Class 3000': '3,000 areas (30 miles)',
  'Class 5000': '5,000 areas (50 miles)',
  'Beyond': 'Dimensional / Interplanetary'
};

const FLIGHT_SPEED = {
  'Shift 0': '0 areas/turn',
  'Feeble': '2 areas/turn (30 mph)',
  'Poor': '3 areas/turn (45 mph)',
  'Typical': '4 areas/turn (60 mph)',
  'Good': '6 areas/turn (90 mph)',
  'Excellent': '8 areas/turn (120 mph)',
  'Remarkable': '15 areas/turn (225 mph)',
  'Incredible': '20 areas/turn (300 mph)',
  'Amazing': '25 areas/turn (375 mph)',
  'Monstrous': '30 areas/turn (450 mph)',
  'Unearthly': '40 areas/turn (600 mph)',
  'Shift X': 'Mach 1 (750 mph)',
  'Shift Y': 'Mach 2 (1,500 mph)',
  'Shift Z': 'Mach 5 (3,750 mph)',
  'Class 1000': 'Mach 10 (7,500 mph)',
  'Class 3000': 'Mach 50',
  'Class 5000': 'Near Light Speed'
};

const LAND_SPEED = {
  'Shift 0': '0 areas/turn',
  'Feeble': '1 area/turn (15 mph)',
  'Poor': '2 areas/turn (30 mph)',
  'Typical': '3 areas/turn (45 mph)',
  'Good': '4 areas/turn (60 mph)',
  'Excellent': '5 areas/turn (75 mph)',
  'Remarkable': '6 areas/turn (90 mph)',
  'Incredible': '7 areas/turn (105 mph)',
  'Amazing': '8 areas/turn (120 mph)',
  'Monstrous': '9 areas/turn (135 mph)',
  'Unearthly': '10 areas/turn (150 mph)',
  'Shift X': '15 areas/turn (225 mph)',
  'Shift Y': '20 areas/turn (300 mph)',
  'Shift Z': '30 areas/turn (450 mph)',
  'Class 1000': 'Mach 1 (750 mph)',
  'Class 3000': 'Mach 5',
  'Class 5000': 'Escape Velocity'
};

const WATER_SPEED = {
  'Shift 0': '0 areas/turn',
  'Feeble': '1 area/turn (15 mph)',
  'Poor': '2 areas/turn (30 mph)',
  'Typical': '3 areas/turn (45 mph)',
  'Good': '4 areas/turn (60 mph)',
  'Excellent': '5 areas/turn (75 mph)',
  'Remarkable': '6 areas/turn (90 mph)',
  'Incredible': '7 areas/turn (105 mph)',
  'Amazing': '8 areas/turn (120 mph)',
  'Monstrous': '9 areas/turn (135 mph)',
  'Unearthly': '10 areas/turn (150 mph)'
};

const POWER_ATTRIBUTES = {
  // Defensive (D1-D17, D20)
  "D1": { range: "Self", duration: "Permanent" },
  "D2": { range: "Self or 1 area", duration: "Maintained", areaOfEffect: "Self or 10% Rank areas", targets: "Self or allies in area" },
  "D3": { range: "Self or 1 area", duration: "Maintained", areaOfEffect: "1 area", targets: "Self or allies in area" },
  "D4": { range: "Self or 1 area", duration: "Maintained", areaOfEffect: "1 area", targets: "Self or allies in area" },
  "D5": { range: "Self or 1 area", duration: "Maintained", areaOfEffect: "1 area", targets: "Self or allies in area" },
  "D6": { range: "Self or 1 area", duration: "Maintained", areaOfEffect: "1 area", targets: "Self or allies in area" },
  "D7": { range: "Self or 1 area", duration: "Maintained", areaOfEffect: "1 area", targets: "Self or allies in area" },
  "D8": { range: "Self or 1 area", duration: "Maintained", areaOfEffect: "1 area", targets: "Self or allies in area" },
  "D9": { range: "Self or 1 area", duration: "Maintained", areaOfEffect: "1 area", targets: "Self or allies in area" },
  "D10": { range: "Self", duration: "Maintained", targets: "Attacker" },
  "D11": { range: "Self", duration: "Permanent" },
  "D12": { range: "Self", duration: "Permanent" },
  "D13": { range: "Self", duration: "Permanent" },
  "D14": { range: "Self", duration: "Permanent" },
  "D15": { range: "Self", duration: "Permanent" },
  "D16": { range: "Self", duration: "Permanent" },
  "D17": { range: "Self", duration: "Permanent" },
  "D20": { range: "Line of sight", duration: "Maintained" },

  // Detection (DT1-DT22)
  "DT1": { range: "Rank", duration: "Maintained" },
  "DT2": { range: "Line of sight (360°)", duration: "Permanent" },
  "DT3": { range: "Rank", duration: "Maintained" },
  "DT4": { range: "Rank", duration: "Maintained" },
  "DT5": { range: "Rank", duration: "Maintained" },
  "DT6": { range: "Rank", duration: "Permanent" },
  "DT7": { range: "Rank", duration: "Permanent" },
  "DT8": { range: "Touch / Contact", duration: "Permanent" },
  "DT9": { range: "Rank", duration: "Maintained" },
  "DT10": { range: "Rank", duration: "Maintained" },
  "DT11": { range: "Touch / Contact", duration: "Maintained" },
  "DT12": { range: "1 area", duration: "Maintained" },
  "DT13": { range: "Rank", duration: "Maintained" },
  "DT14": { range: "Rank", duration: "Maintained" },
  "DT15": { range: "Rank", duration: "Permanent" },
  "DT16": { range: "Rank", duration: "Maintained" },
  "DT17": { range: "Rank (Visual)", duration: "Maintained" },
  "DT18": { range: "Line of sight", duration: "Permanent" },
  "DT19": { range: "Rank", duration: "Maintained", targets: "1 trail" },
  "DT20": { range: "Line of sight", duration: "Maintained" },
  "DT21": { range: "Line of sight", duration: "Permanent" },
  "DT22": { range: "Rank", duration: "Maintained", targets: "1 target" },

  // Energy Control (EC1-EC21)
  "EC1": { range: "Self or Touch", duration: "Maintained" },
  "EC2": { range: "Rank", duration: "Maintained", targets: "1 target" },
  "EC3": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area" },
  "EC4": { range: "Rank", duration: "Maintained", areaOfEffect: "Rank areas" },
  "EC5": { range: "Rank", duration: "Maintained", targets: "1 target / source" },
  "EC6": { range: "Self or Touch", duration: "Maintained" },
  "EC7": { range: "Rank", duration: "Maintained", targets: "1 construct" },
  "EC8": { range: "Self", duration: "Permanent" },
  "EC9": { range: "Touch / Contact", targets: "1 target" },
  "EC10": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area" },
  "EC11": { range: "Rank", duration: "Maintained", areaOfEffect: "Rank areas" },
  "EC12": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area" },
  "EC13": { range: "Touch / Rank", duration: "Maintained", targets: "1 target / object" },
  "EC14": { range: "Rank", duration: "Maintained", areaOfEffect: "Rank areas" },
  "EC15": { range: "Rank", duration: "Maintained", targets: "Ferrous objects" },
  "EC16": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area" },
  "EC17": { range: "Rank", duration: "Maintained" },
  "EC18": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area" },
  "EC19": { range: "Rank", duration: "Maintained", areaOfEffect: "Rank areas" },
  "EC20": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area" },
  "EC21": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area" },

  // Energy Emission (EE1-EE14) - Ranged attacks are instant (no duration) unless sustained
  "EE1": { range: "Rank", targets: "1 target" },
  "EE2": { range: "Rank", targets: "1 target" },
  "EE3": { range: "Rank", duration: "Maintained", targets: "1 duplicate" },
  "EE4": { range: "Rank", targets: "1 target" },
  "EE5": { range: "Rank", targets: "1 target" },
  "EE6": { range: "Rank", targets: "1 target" },
  "EE7": { range: "Rank", targets: "1 target" },
  "EE8": { range: "Rank", duration: "Maintained", areaOfEffect: "Rank areas" },
  "EE9": { range: "Rank", targets: "1 target / object" },
  "EE10": { range: "Rank", targets: "1 target" },
  "EE11": { range: "Rank", duration: "Maintained" },
  "EE12": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area" },
  "EE13": { range: "Rank", areaOfEffect: "1 area", targets: "All in area" },
  "EE14": { range: "Rank", targets: "1 target" },

  // Fighting (F1-F6)
  "F1": { range: "Self", duration: "Maintained" },
  "F2": { range: "Touch / Close Combat", duration: "Permanent" },
  "F3": { range: "Touch / Close Combat", duration: "Permanent" },
  "F4": { range: "Touch / Self", duration: "Maintained", targets: "1 weapon" },
  "F5": { range: "Touch / Contact", duration: "Permanent", targets: "1 weapon" },
  "F6": { range: "Touch / Contact", duration: "Permanent", targets: "1 weapon" },

  // Illusory (I1-I4)
  "I1": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area" },
  "I2": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area", targets: "All in area" },
  "I3": { range: "Self or Touch", duration: "Maintained", targets: "Self or 1 target" },
  "I4": { range: "Same area", duration: "Maintained" },

  // Lifeform Control (L1-L21)
  "L1": { range: "Touch / Contact", duration: "Rank turns", targets: "1 target" },
  "L2": { range: "Touch / Contact", targets: "1 target" },
  "L3": { range: "Touch / Rank", duration: "Rank turns", targets: "1 target" },
  "L4": { range: "Rank", duration: "Maintained", targets: "1 target" },
  "L5": { range: "Touch / Same area", targets: "1 possessed target" },
  "L6": { range: "Self or 1 area", duration: "Maintained", areaOfEffect: "1 area", targets: "Self or allies in area" },
  "L7": { range: "Touch / Contact", duration: "Permanent", targets: "1 target" },
  "L8": { range: "Touch / Contact", duration: "Permanent", targets: "1 target" },
  "L9": { range: "Same area (Line of sight)", duration: "Rank turns", targets: "1 target" },
  "L10": { range: "Rank", duration: "Maintained", targets: "1 target" },
  "L11": { range: "Touch / Same area", duration: "Permanent / Maintained", targets: "1 target" },
  "L12": { range: "Touch / Contact", duration: "Rank turns", targets: "1 target" },
  "L13": { range: "Touch / 1 area", duration: "Maintained", areaOfEffect: "1 area", targets: "All in area" },
  "L14": { range: "Rank", duration: "Maintained", areaOfEffect: "Rank areas" },
  "L15": { range: "Touch / Rank", duration: "Permanent", targets: "Plants in area" },
  "L16": { range: "Rank", duration: "Rank turns", targets: "1 target" },
  "L17": { range: "Touch / Contact", duration: "Rank turns", targets: "1 target" },
  "L18": { range: "Rank", duration: "Rank turns", targets: "1 target" },
  "L19": { range: "Touch / Contact", duration: "Permanent", targets: "1 spirit" },
  "L20": { range: "Same area", duration: "Maintained", targets: "Summoned creatures" },
  "L21": { range: "Rank", duration: "Maintained", targets: "Up to Rank undead" },

  // Mental Enhancement (M1-M34)
  "M1": { range: "Rank", duration: "Maintained" },
  "M2": { range: "Rank", duration: "Maintained" },
  "M3": { range: "Rank", duration: "Maintained", targets: "1 animal" },
  "M4": { range: "Rank", duration: "Maintained", targets: "1 machine / system" },
  "M5": { range: "Touch / Same area", duration: "Maintained", targets: "1 object" },
  "M6": { range: "Rank", duration: "Maintained", targets: "Plants" },
  "M7": { range: "Universal", duration: "Permanent" },
  "M8": { range: "Self", duration: "Permanent" },
  "M9": { range: "Dimensional (Dreams)", duration: "Maintained" },
  "M10": { range: "Same area", duration: "Maintained", targets: "1 target" },
  "M11": { range: "Astral / Universal", duration: "Maintained" },
  "M12": { range: "Rank", duration: "Maintained", targets: "1 target" },
  "M13": { range: "Self", duration: "Permanent" },
  "M14": { range: "Self", duration: "Permanent" },
  "M15": { range: "Self", duration: "Permanent" },
  "M16": { range: "Self", duration: "Permanent" },
  "M17": { range: "Self (Conversational)", duration: "Permanent" },
  "M18": { range: "Touch / Rank", duration: "Permanent", targets: "1 mind" },
  "M19": { range: "Rank", duration: "Maintained", targets: "Observers in area" },
  "M20": { range: "Rank", duration: "Maintained", targets: "1 target" },
  "M21": { range: "Rank", targets: "1 target" },
  "M22": { range: "Touch / Contact", targets: "1 target" },
  "M23": { range: "Touch / Same area", duration: "Concentration" },
  "M24": { range: "Self", duration: "Instant (Vision)" },
  "M25": { range: "Touch / Contact", targets: "1 target" },
  "M26": { range: "Rank", duration: "Maintained" },
  "M27": { range: "Rank", duration: "Maintained", targets: "1 target" },
  "M28": { range: "Self", duration: "Permanent" },
  "M29": { range: "Rank", duration: "Maintained" },
  "M30": { range: "Rank", duration: "Maintained", targets: "1 target / object" },
  "M31": { range: "Universal", duration: "Maintained", targets: "1 target" },
  "M32": { range: "Rank", duration: "Maintained", targets: "1 target" },
  "M33": { range: "Self", duration: "Permanent" },
  "M34": { range: "Self", duration: "Permanent" },

  // Matter Control (MC1-MC13)
  "MC1": { range: "Touch / Rank", duration: "Rank turns", targets: "1 target / object" },
  "MC2": { range: "Rank", duration: "Maintained", areaOfEffect: "Rank areas" },
  "MC3": { range: "Touch / Rank", duration: "Rank turns", targets: "1 target / object" },
  "MC4": { range: "Touch / Rank", duration: "Rank turns", targets: "1 target / object" },
  "MC5": { range: "Touch / Rank", targets: "1 object" },
  "MC6": { range: "Touch / Rank", duration: "Rank turns", targets: "1 target / object" },
  "MC7": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area" },
  "MC8": { range: "Rank", duration: "Maintained", targets: "1 object" },
  "MC9": { range: "Rank", duration: "Maintained", targets: "1 machine" },
  "MC10": { range: "Self or 1 area", duration: "Maintained", areaOfEffect: "1 area" },
  "MC11": { range: "Touch / Contact", duration: "Permanent", targets: "1 object" },
  "MC12": { range: "Rank", duration: "Maintained", areaOfEffect: "Rank areas" },
  "MC13": { range: "Touch / Rank", duration: "Maintained", targets: "Corpses" },

  // Matter Conversion (MCo1-MCo6)
  "MCo1": { range: "Touch / Rank", duration: "Permanent", targets: "1 target / object" },
  "MCo2": { range: "Rank", targets: "1 flammable object" },
  "MCo3": { range: "Touch / Rank", targets: "1 target / object" },
  "MCo4": { range: "Touch / Contact", duration: "Permanent", targets: "1 object" },
  "MCo5": { range: "Rank", targets: "1 target / object" },
  "MCo6": { range: "Touch / Contact", duration: "Permanent", targets: "1 object" },

  // Matter Creation (MCr1-MCr8)
  "MCr1": { range: "Touch / Same area", duration: "Permanent", targets: "1 item" },
  "MCr2": { range: "Rank", duration: "Rank turns", areaOfEffect: "1 area" },
  "MCr3": { range: "Touch / Same area", duration: "Permanent", targets: "1 creature" },
  "MCr4": { range: "Touch / Same area", duration: "Permanent", targets: "1 machine" },
  "MCr5": { range: "Rank", targets: "1 target" },
  "MCr6": { range: "Touch / Same area", duration: "Permanent", targets: "1 object" },
  "MCr7": { range: "Rank", areaOfEffect: "1 area", targets: "All in area" },
  "MCr8": { range: "Rank", duration: "Rank turns", areaOfEffect: "1 area", targets: "1 target / area" },

  // Magical (MG1-MG14)
  "MG1": { range: "Astral / Universal", duration: "Maintained" },
  "MG2": { range: "Self", duration: "Permanent" },
  "MG3": { range: "Self", duration: "Permanent" },
  "MG4": { range: "Rank", duration: "Maintained", targets: "1 spell / effect" },
  "MG5": { range: "Rank", duration: "Maintained", areaOfEffect: "1 area" },
  "MG6": { range: "Rank", duration: "Maintained", targets: "1 target" },
  "MG7": { range: "Touch / Contact", duration: "Permanent / Maintained", targets: "1 target" },
  "MG8": { range: "Touch / Contact", targets: "1 target" },
  "MG9": { range: "Self", duration: "Maintained" },
  "MG10": { range: "Rank", duration: "Maintained / Permanent", areaOfEffect: "Rank areas" },
  "MG11": { range: "Touch / Contact", targets: "1 spirit" },
  "MG12": { range: "Universal", duration: "Maintained", targets: "1 target" },
  "MG13": { range: "Touch / Same area", duration: "Permanent / Maintained", areaOfEffect: "1 area" },
  "MG14": { range: "Touch / Rank", targets: "1 extradimensional entity" },

  // Physical Enhancement (P1-P20)
  "P1": { range: "Self", duration: "Permanent" },
  "P2": { range: "Self", duration: "Permanent" },
  "P3": { range: "Touch / Contact", duration: "Rank turns", targets: "1 target" },
  "P4": { range: "Self", duration: "Permanent" },
  "P5": { range: "Self", speed: "Land", duration: "Maintained" },
  "P6": { range: "Same area (Vocal)", duration: "Rank turns", targets: "All who hear" },
  "P7": { range: "Self", duration: "Permanent" },
  "P8": { range: "Same area", duration: "Maintained", areaOfEffect: "1 area", targets: "All in area" },
  "P9": { range: "Self", duration: "Permanent" },
  "P10": { range: "Self", duration: "Permanent" },
  "P11": { range: "Self", duration: "Permanent" },
  "P12": { range: "Self", duration: "Permanent" },
  "P13": { range: "Self", duration: "Permanent" },
  "P14": { range: "Self", duration: "Permanent" },
  "P15": { range: "Rank", duration: "Maintained" },
  "P16": { range: "Self", duration: "Permanent" },
  "P17": { range: "Self", duration: "Permanent" },
  "P18": { range: "Rank", areaOfEffect: "1 area", targets: "All in area" },
  "P19": { range: "Self", duration: "Permanent" },
  "P20": { range: "Self", duration: "Permanent" },

  // Power Control (PC1-PC14)
  "PC1": { range: "Touch / Rank", duration: "Rank turns", targets: "1 target" },
  "PC2": { range: "Touch / Contact", duration: "Permanent / Maintained", targets: "1 target" },
  "PC3": { range: "Touch / Rank", duration: "Maintained", targets: "1 target" },
  "PC4": { range: "Touch / Rank", duration: "Rank turns / Maintained", targets: "1 target" },
  "PC5": { range: "Self", duration: "Permanent" },
  "PC6": { range: "Touch / Same area", duration: "Permanent", targets: "1 source" },
  "PC7": { range: "Self", duration: "Permanent" },
  "PC8": { range: "Same area", duration: "Maintained", targets: "Participants" },
  "PC9": { range: "Rank", duration: "Maintained", targets: "1 opponent" },
  "PC10": { range: "Touch / Contact", duration: "Permanent / Maintained", targets: "1 target" },
  "PC11": { range: "Touch / Contact", targets: "1 target" },
  "PC12": { range: "Same area", duration: "Maintained" },
  "PC13": { range: "Self", duration: "Permanent" },
  "PC14": { range: "Touch / Rank", duration: "Rank turns", targets: "1 target" },

  // Self-Alteration (S1-S32)
  "S1": { range: "Self", duration: "Permanent / Variable" },
  "S2": { range: "Self", duration: "Maintained" },
  "S3": { range: "Self", duration: "Maintained" },
  "S4": { range: "Self", duration: "Maintained" },
  "S5": { range: "Self", duration: "Maintained" },
  "S6": { range: "Self", duration: "Maintained" },
  "S7": { range: "Self", duration: "Permanent / Maintained" },
  "S8": { range: "Self", duration: "Maintained" },
  "S9": { range: "Self", duration: "Maintained" },
  "S10": { range: "Self", duration: "Maintained" },
  "S11": { range: "Self", duration: "Maintained" },
  "S12": { range: "Self (Rank areas)", duration: "Maintained" },
  "S13": { range: "Self", duration: "Maintained" },
  "S14": { range: "Self", duration: "Maintained" },
  "S15": { range: "Self", duration: "Permanent" },
  "S16": { range: "Self", duration: "Maintained" },
  "S17": { range: "Self", duration: "Maintained" },
  "S18": { range: "Self", duration: "Maintained" },
  "S19": { range: "Self", duration: "Maintained" },
  "S20": { range: "Self", duration: "Maintained" },
  "S21": { range: "Self", duration: "Maintained" },
  "S22": { range: "Self", duration: "Maintained" },
  "S23": { range: "Self / Same area", duration: "Maintained" },
  "S24": { range: "Self", duration: "Maintained" },
  "S25": { range: "Self", duration: "Maintained" },
  "S26": { range: "Self (1 area)", duration: "Maintained" },
  "S27": { range: "Self", duration: "Maintained" },
  "S28": { range: "Self", duration: "Maintained" },
  "S29": { range: "Self", duration: "Maintained" },
  "S30": { range: "Self", duration: "Maintained" },
  "S31": { range: "Self / Same area", duration: "Maintained" },
  "S32": { range: "Self", duration: "Maintained" },

  // Travel (T1-T24)
  "T1": { range: "Astral / Universal", duration: "Maintained" },
  "T2": { range: "Rank", speed: "Flight", duration: "Maintained" },
  "T3": { range: "Self / Touch", targets: "Self or 1 target" },
  "T4": { range: "Rank", speed: "Flight", duration: "Maintained" },
  "T5": { range: "Same area", speed: "Flight", duration: "Maintained" },
  "T6": { range: "Rank", duration: "Maintained", areaOfEffect: "1 portal" },
  "T7": { range: "Self", speed: "Flight", duration: "Maintained" },
  "T8": { range: "Self", speed: "Land", duration: "Maintained" },
  "T9": { range: "Self", duration: "Instant (1 turn)" },
  "T10": { range: "Self", speed: "Land", duration: "Maintained" },
  "T11": { range: "Self", speed: "Water", duration: "Maintained" },
  "T12": { range: "Self", duration: "Maintained" },
  "T13": { range: "Self", speed: "Flight", duration: "Maintained" },
  "T14": { range: "Self", speed: "Land", duration: "Maintained" },
  "T15": { range: "Self", speed: "Land", duration: "Permanent" },
  "T16": { range: "Rank", duration: "Instant" },
  "T17": { range: "Touch / Rank", targets: "1 target" },
  "T18": { range: "Universal", duration: "Instant" },
  "T19": { range: "Self / Touch", targets: "Self or 1 target" },
  "T20": { range: "Universal", duration: "Permanent" },
  "T21": { range: "Self", speed: "Flight", duration: "Maintained" },
  "T22": { range: "Self", speed: "Land", duration: "Maintained" },
  "T23": { range: "Self or 1 area", speed: "Flight", duration: "Maintained", areaOfEffect: "1 area" },
  "T24": { range: "Rank", duration: "Maintained", areaOfEffect: "1 portal" }
};

const POWERS_BY_CODE = {};
const POWERS_BY_NAME = {};
for (const p of POWERS_CATALOG) {
  const isStar = !!(p.countsAsTwo || p.isStarred);
  p.isStarred = isStar;
  p.countsAsTwo = isStar;
  p.powerSlots = isStar ? 2 : (p.powerSlots || 1);
  const attrs = POWER_ATTRIBUTES[p.code] || {};
  if (attrs.range !== undefined) p.range = attrs.range;
  if (attrs.duration !== undefined) p.duration = attrs.duration;
  if (attrs.areaOfEffect !== undefined) p.areaOfEffect = attrs.areaOfEffect;
  if (attrs.targets !== undefined) p.targets = attrs.targets;
  if (attrs.speed !== undefined) p.speed = attrs.speed;

  POWERS_BY_CODE[p.code] = p;
  POWERS_BY_NAME[p.name.toLowerCase()] = p;
}

const MSH_POWERS = POWERS_CATALOG.map(p => {
  const isStar = !!(p.countsAsTwo || p.isStarred);
  const attrs = POWER_ATTRIBUTES[p.code] || {};
  return {
    ...p,
    id: p.code,
    powerSlots: isStar ? 2 : (p.powerSlots || 1),
    isStarred: isStar,
    countsAsTwo: isStar,
    errataNotes: p.errataNote || '',
    stunts: p.powerStunts || [],
    range: attrs.range !== undefined ? attrs.range : p.range,
    duration: attrs.duration !== undefined ? attrs.duration : p.duration,
    areaOfEffect: attrs.areaOfEffect !== undefined ? attrs.areaOfEffect : p.areaOfEffect,
    targets: attrs.targets !== undefined ? attrs.targets : p.targets,
    speed: attrs.speed !== undefined ? attrs.speed : p.speed
  };
});

function resolveRankRange(rawRange, rankName) {
  if (!rawRange) return null;
  const rankDist = RANGE_BY_RANK[rankName] || RANGE_BY_RANK['Typical'] || '2 areas';
  if (rawRange === 'Rank') return rankDist;
  if (rawRange === 'Touch / Rank') return `Touch / ${rankDist}`;
  if (rawRange === 'Rank (Visual)') return `${rankDist} (Visual)`;
  if (rawRange === 'Self (Rank areas)') return `Self (${rankDist})`;
  return rawRange;
}

function resolveSpeed(rawSpeed, rankName) {
  if (!rawSpeed) return null;
  if (rawSpeed === 'Flight') return FLIGHT_SPEED[rankName] || FLIGHT_SPEED['Typical'];
  if (rawSpeed === 'Land') return LAND_SPEED[rankName] || LAND_SPEED['Typical'];
  if (rawSpeed === 'Water') return WATER_SPEED[rankName] || WATER_SPEED['Typical'];
  return rawSpeed;
}

function getPowerDetails(power, rankName) {
  if (!power) return {};
  const pName = typeof power === 'string' ? power : power.name;
  const pCode = typeof power === 'object' ? (power.code || power.powerCode || power.id) : power;
  
  let catalogPower = null;
  if (pCode && POWERS_BY_CODE[pCode]) {
    catalogPower = POWERS_BY_CODE[pCode];
  } else if (pName) {
    catalogPower = POWERS_BY_NAME[pName.toLowerCase()] || POWERS_CATALOG.find(p => p.name.toLowerCase() === pName.toLowerCase());
  }

  const code = catalogPower ? catalogPower.code : pCode;
  const baseAttrs = (code && POWER_ATTRIBUTES[code]) ? POWER_ATTRIBUTES[code] : {};

  const effectiveRank = rankName || (typeof power === 'object' ? power.rankName : null) || (catalogPower ? catalogPower.defaultRank : 'Typical');

  const rawRange = (typeof power === 'object' && power.range !== undefined) ? power.range : baseAttrs.range;
  const rawDuration = (typeof power === 'object' && power.duration !== undefined) ? power.duration : baseAttrs.duration;
  const rawArea = (typeof power === 'object' && power.areaOfEffect !== undefined) ? power.areaOfEffect : baseAttrs.areaOfEffect;
  const rawTargets = (typeof power === 'object' && power.targets !== undefined) ? power.targets : baseAttrs.targets;
  const rawSpeed = (typeof power === 'object' && power.speed !== undefined) ? power.speed : baseAttrs.speed;

  const details = {};
  if (rawRange) {
    details.range = resolveRankRange(rawRange, effectiveRank);
  }
  if (rawDuration) {
    details.duration = rawDuration;
  }
  if (rawArea) {
    details.areaOfEffect = rawArea;
  }
  if (rawTargets) {
    details.targets = rawTargets;
  }
  if (rawSpeed) {
    details.speed = resolveSpeed(rawSpeed, effectiveRank);
  }

  // If power has active power adjustments, apply adjusted values & badges
  if (power && typeof power === 'object' && power.adjustments) {
    const adj = power.adjustments;
    const applyAdjToKey = (aspectObj) => {
      if (!aspectObj || !aspectObj.key) return;
      const key = aspectObj.key;
      const shiftSign = aspectObj.shift > 0 ? `+${aspectObj.shift}` : `${aspectObj.shift}`;
      const badge = `(${shiftSign}CS [${aspectObj.adjustedRank}])`;

      if (key === 'range') {
        details.range = `${aspectObj.adjustedFormatted} ${badge}`;
      } else if (key === 'duration') {
        details.duration = `${aspectObj.adjustedFormatted} ${badge}`;
      } else if (key === 'areaOfEffect') {
        details.areaOfEffect = `${aspectObj.adjustedFormatted} ${badge}`;
      } else if (key === 'targets') {
        details.targets = `${aspectObj.adjustedFormatted} ${badge}`;
      } else if (key === 'speed') {
        details.speed = `${aspectObj.adjustedFormatted} ${badge}`;
      } else if (key === 'intensity') {
        details.intensity = `${aspectObj.adjustedFormatted} ${badge}`;
      } else {
        details[key] = `${aspectObj.adjustedFormatted} ${badge}`;
      }
    };

    if (adj.aspectA) applyAdjToKey(adj.aspectA);
    if (adj.aspectB) applyAdjToKey(adj.aspectB);
  }

  return details;
}

const WEIGHT_BY_RANK = {
  'Shift 0': '0 lbs',
  'Feeble': '50 lbs',
  'Poor': '100 lbs',
  'Typical': '200 lbs',
  'Good': '400 lbs',
  'Excellent': '800 lbs',
  'Remarkable': '1 ton (2,000 lbs)',
  'Fantastic': '5 tons',
  'Incredible': '10 tons',
  'Spectacular': '25 tons',
  'Amazing': '50 tons',
  'Sensational': '65 tons',
  'Monstrous': '80 tons',
  'Awesome': '150 tons',
  'Unearthly': '250 tons',
  'Shift X': '500 tons',
  'Shift Y': '1,000 tons',
  'Shift Z': '10,000 tons',
  'Class 1000': '100,000 tons',
  'Class 3000': '1,000,000 tons',
  'Class 5000': '10,000,000 tons'
};

function getPowerRankAspects(power, rankName) {
  if (!power) return [];
  const pName = typeof power === 'string' ? power : power.name;
  const pCode = typeof power === 'object' ? (power.code || power.powerCode || power.id) : power;
  
  let catalogPower = null;
  if (pCode && POWERS_BY_CODE[pCode]) {
    catalogPower = POWERS_BY_CODE[pCode];
  } else if (pName) {
    catalogPower = POWERS_BY_NAME[pName.toLowerCase()] || POWERS_CATALOG.find(p => p.name.toLowerCase() === pName.toLowerCase());
  }

  const code = catalogPower ? catalogPower.code : pCode;
  const baseAttrs = (code && POWER_ATTRIBUTES[code]) ? POWER_ATTRIBUTES[code] : {};
  const effectiveRank = rankName || (typeof power === 'object' ? power.rankName : null) || (catalogPower ? catalogPower.defaultRank : 'Typical');
  const desc = ((catalogPower ? catalogPower.description : '') + ' ' + (catalogPower ? catalogPower.rulesText : '')).toLowerCase();

  const aspects = [];

  const getRankNum = (r) => {
    if (typeof UniversalTableEngine !== 'undefined') {
      return UniversalTableEngine.getRankByName(r).num;
    }
    return r;
  };

  // 1. Intensity / Effect
  let intensityLabel = 'Intensity / Primary Effect';
  if (catalogPower) {
    if (catalogPower.category === 'Energy Emission' || desc.includes('damage') || desc.includes('blast') || desc.includes('bolt') || desc.includes('beam')) {
      intensityLabel = 'Intensity / Damage';
    } else if (catalogPower.category === 'Defensive' || desc.includes('armor') || desc.includes('protection') || desc.includes('field')) {
      intensityLabel = 'Intensity / Protection';
    } else if (desc.includes('material strength') || catalogPower.category === 'Matter Creation') {
      intensityLabel = 'Intensity / Material Strength';
    } else if (catalogPower.category === 'Detection' || desc.includes('sense') || desc.includes('detect')) {
      intensityLabel = 'Intensity / Detection Sensitivity';
    } else if (catalogPower.category === 'Lifeform Control' || catalogPower.category === 'Mental Enhancement') {
      intensityLabel = 'Intensity / Control Level';
    }
  }

  aspects.push({
    key: 'intensity',
    label: intensityLabel,
    baseRank: effectiveRank,
    getValue: (r) => `${r} (${getRankNum(r)})`
  });

  // 2. Range
  const rawRange = baseAttrs.range;
  if (rawRange && (rawRange.includes('Rank') || rawRange === 'Rank')) {
    aspects.push({
      key: 'range',
      label: 'Range',
      baseRank: effectiveRank,
      getValue: (r) => {
        const dist = RANGE_BY_RANK[r] || '2 areas';
        if (rawRange === 'Rank') return dist;
        if (rawRange === 'Touch / Rank') return `Touch / ${dist}`;
        if (rawRange === 'Rank (Visual)') return `${dist} (Visual)`;
        return dist;
      }
    });
  }

  // 3. Duration
  const rawDuration = baseAttrs.duration;
  if (rawDuration && (rawDuration.includes('Rank') || rawDuration === 'Rank turns')) {
    aspects.push({
      key: 'duration',
      label: 'Duration',
      baseRank: effectiveRank,
      getValue: (r) => `${getRankNum(r)} turns (${r})`
    });
  }

  // 4. Area of Effect
  const rawArea = baseAttrs.areaOfEffect;
  if (rawArea && (rawArea.includes('Rank') || rawArea === '1 area' || desc.includes('areas equal to'))) {
    aspects.push({
      key: 'areaOfEffect',
      label: 'Area of Effect',
      baseRank: effectiveRank,
      getValue: (r) => {
        if (rawArea && rawArea.includes('10%')) {
          const num = getRankNum(r);
          const areas = Math.max(1, Math.round(num * 0.1));
          return `${areas} areas (${r})`;
        }
        return `${RANGE_BY_RANK[r] || '2 areas'} radius`;
      }
    });
  }

  // 5. Targets
  const rawTargets = baseAttrs.targets;
  if (rawTargets && (rawTargets.includes('Rank') || desc.includes('targets equal to') || desc.includes('target equal to'))) {
    aspects.push({
      key: 'targets',
      label: 'Number of Targets',
      baseRank: effectiveRank,
      getValue: (r) => `Up to ${getRankNum(r)} targets (${r})`
    });
  }

  // 6. Movement Speed
  if (baseAttrs.speed) {
    let speedLabel = 'Movement Speed';
    if (baseAttrs.speed === 'Flight') speedLabel = 'Flight Speed';
    else if (baseAttrs.speed === 'Land') speedLabel = 'Land Speed';
    else if (baseAttrs.speed === 'Water') speedLabel = 'Swimming Speed';

    aspects.push({
      key: 'speed',
      label: speedLabel,
      baseRank: effectiveRank,
      getValue: (r) => {
        if (baseAttrs.speed === 'Flight') return FLIGHT_SPEED[r] || FLIGHT_SPEED['Typical'];
        if (baseAttrs.speed === 'Land') return LAND_SPEED[r] || LAND_SPEED['Typical'];
        if (baseAttrs.speed === 'Water') return WATER_SPEED[r] || WATER_SPEED['Typical'];
        return r;
      }
    });
  }

  // 7. Special Rank Stats
  if (code === 'S27' || (desc.includes('duplicate') && (desc.includes('power rank number') || desc.includes('equal to')))) {
    aspects.push({
      key: 'duplicates',
      label: 'Duplicates Created',
      baseRank: effectiveRank,
      getValue: (r) => `Up to ${getRankNum(r)} duplicates (${r})`
    });
  }

  if (code === 'M14' || (desc.includes('designs') && desc.includes('memorize'))) {
    aspects.push({
      key: 'designs',
      label: 'Designs Memorized',
      baseRank: effectiveRank,
      getValue: (r) => `Up to ${getRankNum(r)} designs (${r})`
    });
  }

  if (code === 'M30' || desc.includes('weight') || desc.includes('lift')) {
    aspects.push({
      key: 'weight_capacity',
      label: 'Weight / Mass Capacity',
      baseRank: effectiveRank,
      getValue: (r) => WEIGHT_BY_RANK[r] || '1 ton'
    });
  }

  if (code === 'S14' || desc.includes('elongate') || desc.includes('stretching')) {
    aspects.push({
      key: 'elongation_reach',
      label: 'Elongation Reach',
      baseRank: effectiveRank,
      getValue: (r) => RANGE_BY_RANK[r] || '2 areas'
    });
  }

  return aspects;
}

function calculatePowerAdjustmentCost(shift, isCharCreation = false) {
  if (isCharCreation) return 0;
  const s = parseInt(shift) || 0;
  if (s <= 1) return 0;
  return (s - 1) * 100;
}

function getMaxAdjustmentShift(aspectA_baseRank, aspectB_baseRank) {
  const activeRanks = (typeof UniversalTableEngine !== 'undefined') ? UniversalTableEngine.ranks : [
    { name: 'Shift 0' }, { name: 'Feeble' }, { name: 'Poor' }, { name: 'Typical' },
    { name: 'Good' }, { name: 'Excellent' }, { name: 'Remarkable' }, { name: 'Incredible' },
    { name: 'Amazing' }, { name: 'Monstrous' }, { name: 'Unearthly' }
  ];
  const rankNames = activeRanks.map(r => r.name.toLowerCase());
  const idxFeeble = rankNames.indexOf('feeble');
  const idxAmazing = rankNames.indexOf('amazing');
  const idxA = rankNames.indexOf((aspectA_baseRank || '').toLowerCase());
  const idxB = rankNames.indexOf((aspectB_baseRank || '').toLowerCase());

  if (idxA === -1 || idxB === -1) return 0;
  const maxIncreaseA = Math.max(0, idxAmazing - idxA);
  const maxDecreaseB = Math.max(0, idxB - idxFeeble);
  return Math.min(maxIncreaseA, maxDecreaseB);
}

const POWER_OPTIONS_DEFINITIONS = {
  "D1": {
    powerCode: "D1",
    powerName: "Body Armor",
    id: "body_armor_type",
    label: "Armor Protection Configuration",
    canRoll: true,
    rollTable: [[1, 50, "balanced"], [51, 75, "physical_only"], [76, 100, "energy_only"]],
    choices: [
      {
        key: "balanced",
        label: "Balanced Protection (Physical & Energy)",
        description: "Equal protection against physical and energy attacks at power rank.",
        isSuperior: false,
        rankShift: 0,
        effects: { type: "body_armor", physicalCS: 0, energyCS: 0 }
      },
      {
        key: "physical_only",
        label: "Physical-Only Specialization (+1CS Physical, 0 Energy)",
        description: "Provides +1CS protection against physical attacks, but 0 protection against energy attacks.",
        isSuperior: false,
        rankShift: 1,
        effects: { type: "body_armor", physicalCS: 1, energyNone: true }
      },
      {
        key: "energy_only",
        label: "Energy-Only Specialization (+1CS Energy, 0 Physical)",
        description: "Provides +1CS protection against energy attacks, but 0 protection against physical attacks.",
        isSuperior: false,
        rankShift: 1,
        effects: { type: "body_armor", energyCS: 1, physicalNone: true }
      }
    ]
  },
  "D4": {
    powerCode: "D4",
    powerName: "Force Field vs. Energy",
    id: "ff_energy_spec",
    label: "Force Field Energy Specialization",
    canRoll: true,
    rollTable: [[1, 50, "broad"], [51, 100, "specialized"]],
    choices: [
      {
        key: "broad",
        label: "Broad Energy Field (All Energy Forms)",
        description: "Protects against all emitted energy forms at standard power rank.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "specialized",
        label: "Specific Energy Specialization (+2CS Rank)",
        description: "Protects against a single specified energy attack form with +2CS rank and protection, but provides no defense against other energy types.",
        isSuperior: false,
        rankShift: 2,
        subChoiceList: ["Fire & Heat", "Cold", "Electricity", "Radiation", "Light", "Sonics / Vibration", "Kinetic Bolts / Force", "Plasma"]
      }
    ]
  },
  "D7": {
    powerCode: "D7",
    powerName: "Force Field vs. Physical",
    id: "ff_physical_spec",
    label: "Force Field Physical Specialization",
    canRoll: true,
    rollTable: [[1, 50, "broad"], [51, 100, "specialized"]],
    choices: [
      {
        key: "broad",
        label: "Broad Physical Field (All Physical Attacks)",
        description: "Protects against all physical attacks at standard power rank.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "specialized",
        label: "Specific Physical Specialization (+1CS Rank)",
        description: "Protects against a single specified physical attack with +1CS rank and protection.",
        isSuperior: true,
        rankShift: 1,
        subChoiceList: ["Blunt / Brute Force", "Edged / Slashing", "Piercing / Ballistics", "Corrosives / Acids"]
      }
    ]
  },
  "D9": {
    powerCode: "D9",
    powerName: "Force Field vs. Vampirism",
    id: "ff_vamp_spec",
    label: "Force Field Vampirism Specialization",
    canRoll: true,
    rollTable: [[1, 50, "broad"], [51, 100, "specialized"]],
    choices: [
      {
        key: "broad",
        label: "Broad Vampiric Field (All Vampiric Forms)",
        description: "Protects against all forms of vampirism at standard power rank.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "specialized",
        label: "Specific Vampirism Specialization (+1CS Rank)",
        description: "Specializes against a specific form of vampirism with +1CS protection.",
        isSuperior: true,
        rankShift: 1,
        subChoiceList: ["Psi-Vampirism", "Bio-Vampirism", "Energy Vampirism", "Magic Vampirism", "Power Vampirism"]
      }
    ]
  },
  "D12": {
    powerCode: "D12",
    powerName: "Resist: Energy",
    id: "resist_energy_spec",
    label: "Energy Resistance Specialization",
    canRoll: true,
    rollTable: [[1, 50, "broad"], [51, 100, "specialized"]],
    choices: [
      {
        key: "broad",
        label: "Broad Energy Resistance (All Emitted Energy)",
        description: "Reduces damage from all emitted energy attacks at standard power rank.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "specialized",
        label: "Specific Energy Resistance (+1CS Rank)",
        description: "Specializes in a specific energy type with +1CS rank and damage reduction.",
        isSuperior: true,
        rankShift: 1,
        subChoiceList: ["Fire & Heat", "Cold", "Electricity", "Radiation", "Light", "Sonics / Vibration"]
      }
    ]
  },
  "D15": {
    powerCode: "D15",
    powerName: "Resist: Physical",
    id: "resist_phys_spec",
    label: "Physical Resistance Specialization",
    canRoll: true,
    rollTable: [[1, 50, "broad"], [51, 100, "specialized"]],
    choices: [
      {
        key: "broad",
        label: "Broad Physical Resistance (All Physical Attacks)",
        description: "Reduces damage from all physical attacks at standard power rank.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "specialized",
        label: "Specific Physical Resistance (+1CS Rank)",
        description: "Specializes in a specific physical hazard with +1CS rank and damage reduction.",
        isSuperior: true,
        rankShift: 1,
        subChoiceList: ["Toxins & Poisons", "Corrosives & Acids", "Disease", "Brute Force / Blunt"]
      }
    ]
  },
  "D17": {
    powerCode: "D17",
    powerName: "Resist: Vampirism",
    id: "resist_vamp_spec",
    label: "Vampirism Resistance Specialization",
    canRoll: true,
    rollTable: [[1, 50, "broad"], [51, 100, "specialized"]],
    choices: [
      {
        key: "broad",
        label: "Broad Vampiric Resistance (All Vampiric Forms)",
        description: "Reduces effectiveness of all vampiric attacks at standard power rank.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "specialized",
        label: "Specific Vampirism Specialization (+2CS Rank)",
        description: "Specializes in a specific form of vampirism with +2CS resistance.",
        isSuperior: true,
        rankShift: 2,
        subChoiceList: ["Psi-Vampirism", "Bio-Vampirism", "Energy Vampirism", "Magic Vampirism", "Power Vampirism"]
      }
    ]
  },
  "F3": {
    powerCode: "F3",
    powerName: "Natural Weaponry",
    id: "natural_weapon_type",
    label: "Natural Weapon Form",
    canRoll: true,
    rollTable: [[1, 20, "claws"], [21, 40, "fangs"], [41, 60, "horns"], [61, 80, "tail"], [81, 100, "spines"]],
    choices: [
      {
        key: "claws",
        label: "Claws / Retractable Blades",
        description: "Edged melee attack (Fighting to-hit, Touch range, deals Edged damage with Stun/Kill potential).",
        isSuperior: false,
        effects: { actionType: "edged", abilityName: "Fighting", range: "Touch", damageType: "Edged" }
      },
      {
        key: "fangs",
        label: "Fangs / Bite",
        description: "Piercing melee attack (Fighting to-hit, Touch range, deals Piercing damage).",
        isSuperior: false,
        effects: { actionType: "edged", abilityName: "Fighting", range: "Touch", damageType: "Piercing" }
      },
      {
        key: "horns",
        label: "Horns / Bony Crest",
        description: "Blunt / Charging melee attack (Fighting to-hit, Touch range, deals Blunt damage).",
        isSuperior: false,
        effects: { actionType: "slugfest", abilityName: "Fighting", range: "Touch", damageType: "Blunt" }
      },
      {
        key: "tail",
        label: "Tail / Mace-Fist",
        description: "Blunt melee attack (Fighting to-hit, Touch range, deals Blunt damage).",
        isSuperior: false,
        effects: { actionType: "slugfest", abilityName: "Fighting", range: "Touch", damageType: "Blunt" }
      },
      {
        key: "spines",
        label: "Spines / Quills (Ejectable)",
        description: "Shooting ranged attack (Agility to-hit, Area range, deals Shooting damage).",
        isSuperior: false,
        effects: { actionType: "shooting", abilityName: "Agility", range: "rank", damageType: "Shooting" }
      }
    ]
  },
  "P20": {
    powerCode: "P20",
    powerName: "Hyper-Strength",
    id: "hyper_strength_type",
    label: "Strength Enhancement Mode",
    canRoll: true,
    rollTable: [[1, 50, "surge"], [51, 100, "permanent"]],
    choices: [
      {
        key: "surge",
        label: "Temporary Daily Surge (+1CS)",
        description: "Baseline Strength is normal; can activate a +1CS Strength surge for turns equal to Power Rank number once per day.",
        isSuperior: false,
        effects: { isSurge: true }
      },
      {
        key: "permanent",
        label: "Permanent Baseline Addition",
        description: "Permanently adds the Power Rank number directly to baseline Strength, recalculating Health and Slugfest damage.",
        isSuperior: true,
        effects: { addsStrengthToBaseline: true }
      }
    ]
  },
  "S16": {
    powerCode: "S16",
    powerName: "Growth",
    id: "growth_method",
    label: "Growth Manifestation Method",
    canRoll: true,
    rollTable: [[1, 33, "dispersal"], [34, 66, "growth"], [67, 100, "gain"]],
    choices: [
      {
        key: "dispersal",
        label: "Atomic Dispersal",
        description: "Low density; atoms spread out while mass remains unchanged. No Strength or Health gain.",
        isSuperior: false,
        effects: { strengthBoost: 0 }
      },
      {
        key: "growth",
        label: "Atomic Growth (+1CS Strength)",
        description: "Atoms expand proportionally, granting a +1CS Strength boost while grown.",
        isSuperior: false,
        rankShift: 1,
        effects: { strengthBoostCS: 1 }
      },
      {
        key: "gain",
        label: "Atomic Gain (Full Strength & Health)",
        description: "Draws extra-dimensional mass (Kosmos/Pym dimension), setting Strength to match Power Rank & increasing Health.",
        isSuperior: true,
        effects: { setsStrengthToRank: true }
      }
    ]
  },
  "EC1": {
    powerCode: "EC1",
    powerName: "Absorption Power",
    id: "absorption_energy_type",
    label: "Absorbable Energy Type",
    canRoll: true,
    rollTable: [
      [1, 10, "light"],
      [11, 20, "electricity"],
      [21, 30, "fire_heat"],
      [31, 40, "cold"],
      [41, 50, "radiation"],
      [51, 60, "magnetism"],
      [61, 70, "sonics"],
      [71, 80, "kinetic"],
      [81, 90, "plasma"],
      [91, 100, "darkforce"]
    ],
    choices: [
      {
        key: "light",
        label: "Light / Laser",
        description: "Absorbs light, laser, and coherent photonic energy, converting damage directly into Self-Healing / Health buffer.",
        isSuperior: false
      },
      {
        key: "electricity",
        label: "Electricity / Lightning",
        description: "Absorbs electrical energy and lightning bolts, converting damage directly into Self-Healing / Health buffer.",
        isSuperior: false
      },
      {
        key: "fire_heat",
        label: "Fire & Heat",
        description: "Absorbs fire, flame, and intense thermal energy, converting damage directly into Self-Healing / Health buffer.",
        isSuperior: false
      },
      {
        key: "cold",
        label: "Cold / Thermal Drop",
        description: "Absorbs cold and rapid heat-drain effects, converting temperature decreases directly into Self-Healing / Health buffer.",
        isSuperior: false
      },
      {
        key: "radiation",
        label: "Radiation (Hard / Particle)",
        description: "Absorbs hard radiation (gamma, cosmic, particle), converting harmful isotopes directly into Self-Healing / Health buffer.",
        isSuperior: false
      },
      {
        key: "magnetism",
        label: "Magnetism",
        description: "Absorbs magnetic force fields and electromagnetic pulses, converting them into Self-Healing / Health buffer.",
        isSuperior: false
      },
      {
        key: "sonics",
        label: "Sonics / Sound",
        description: "Absorbs sonic blasts and high-frequency sound waves, converting acoustic energy into Self-Healing / Health buffer.",
        isSuperior: false
      },
      {
        key: "kinetic",
        label: "Kinetic / Vibration",
        description: "Absorbs concussive force bolts and vibrational energy, converting kinetic impact into Self-Healing / Health buffer.",
        isSuperior: false
      },
      {
        key: "plasma",
        label: "Plasma",
        description: "Absorbs superheated ionized plasma energy, converting blast damage into Self-Healing / Health buffer.",
        isSuperior: false
      },
      {
        key: "darkforce",
        label: "Darkforce / Exotic",
        description: "Absorbs Darkforce emanations and exotic extra-dimensional energies into Self-Healing / Health buffer.",
        isSuperior: false
      }
    ]
  },
  "EE5": {
    powerCode: "EE5",
    powerName: "Hard Radiation",
    id: "hard_rad_spec",
    label: "Radiation Scope",
    canRoll: true,
    rollTable: [[1, 50, "broad"], [51, 100, "specialized"]],
    choices: [
      {
        key: "broad",
        label: "Full Radiation Spectrum",
        description: "Can project any type of hard radiation at standard power rank.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "specialized",
        label: "Specific Radiation Type (+1CS Rank)",
        description: "Specializes in a specific radiation type with +1CS rank, damage, and range.",
        isSuperior: true,
        rankShift: 1,
        subChoiceList: ["Cosmic Rays", "Gamma Rays", "X-Rays", "Ultraviolet", "Alpha / Beta Particles"]
      }
    ]
  },
  "L4": {
    powerCode: "L4",
    powerName: "Emotion Control",
    id: "emotion_control_spec",
    label: "Emotion Control Scope",
    canRoll: true,
    rollTable: [[1, 50, "versatile"], [51, 100, "specialized"]],
    choices: [
      {
        key: "versatile",
        label: "Versatile (Any Emotion)",
        description: "Can broadcast any emotion at standard power rank.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "specialized",
        label: "Single Emotion Limitation (+2CS Rank)",
        description: "Limited to broadcasting a single emotion (e.g. Loyalty, Fear, Rage, Love, Despair, Calm) with +2CS rank.",
        isSuperior: true,
        rankShift: 2,
        subChoiceList: ["Loyalty", "Fear / Terror", "Rage / Hate", "Love / Adoration", "Despair", "Calm / Pacifism"]
      }
    ]
  },
  "MC8": {
    powerCode: "MC8",
    powerName: "Matter Animation",
    id: "matter_anim_type",
    label: "Domain of Matter State",
    canRoll: true,
    rollTable: [[1, 33, "solid"], [34, 66, "liquid"], [67, 100, "gas"]],
    choices: [
      {
        key: "solid",
        label: "Solid Matter",
        description: "Commands solid rock, earth, metals, and minerals.",
        isSuperior: false
      },
      {
        key: "liquid",
        label: "Liquid Matter",
        description: "Commands liquids, water, and fluids.",
        isSuperior: false
      },
      {
        key: "gas",
        label: "Gaseous Matter",
        description: "Commands gases, vapors, and air.",
        isSuperior: false
      }
    ]
  },
  "P3": {
    powerCode: "P3",
    powerName: "Chemical Touch",
    id: "chemical_touch_type",
    label: "Chemical Secretion Control",
    canRoll: true,
    rollTable: [[1, 50, "automatic"], [51, 100, "conscious"]],
    choices: [
      {
        key: "automatic",
        label: "Automatic Secretion",
        description: "Chemicals secrete involuntarily upon any physical contact.",
        isSuperior: false
      },
      {
        key: "conscious",
        label: "Conscious Secretion",
        description: "Chemicals secrete voluntarily at will, preventing accidental contamination.",
        isSuperior: true
      }
    ]
  },
  "MG10": {
    powerCode: "MG10",
    powerName: "Reality Alteration",
    id: "reality_alter_type",
    label: "Reality Alteration Form",
    canRoll: true,
    rollTable: [[1, 40, "future"], [41, 65, "present"], [66, 75, "past"], [76, 100, "temporal_flow"]],
    choices: [
      {
        key: "future",
        label: "Alter Future",
        description: "Controls the probability of future events coming to pass.",
        isSuperior: false
      },
      {
        key: "present",
        label: "Alter Present",
        description: "Alters current circumstances and physical configurations in the moment.",
        isSuperior: false
      },
      {
        key: "past",
        label: "Alter Past",
        description: "Alters conditions resulting from past events.",
        isSuperior: false
      },
      {
        key: "temporal_flow",
        label: "Temporal Flow",
        description: "Directly controls the actual speed and passage of time.",
        isSuperior: true
      }
    ]
  },
  "S29": {
    powerCode: "S29",
    powerName: "Shapeshifting",
    id: "shapeshifting_spec",
    label: "Shapeshifting Scope",
    canRoll: true,
    rollTable: [[1, 50, "universal"], [51, 100, "limited"]],
    choices: [
      {
        key: "universal",
        label: "Universal Shapeshifting",
        description: "Can change into any shape at standard power rank.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "limited",
        label: "Limited Form Variety (+1CS Rank)",
        description: "Limits variety of forms (e.g. Animals Only, Inanimate Objects Only, Humanoids Only) for +1CS rank.",
        isSuperior: true,
        rankShift: 1,
        subChoiceList: ["Animals Only", "Inanimate Objects Only", "Humanoids Only"]
      }
    ]
  }
};

// Attach optionsDefinition to catalog powers
POWERS_CATALOG.forEach(p => {
  if (POWER_OPTIONS_DEFINITIONS[p.code]) {
    p.optionsDefinition = POWER_OPTIONS_DEFINITIONS[p.code];
  }
});
if (typeof MSH_POWERS !== 'undefined' && Array.isArray(MSH_POWERS)) {
  MSH_POWERS.forEach(p => {
    if (POWER_OPTIONS_DEFINITIONS[p.id] || POWER_OPTIONS_DEFINITIONS[p.code]) {
      p.optionsDefinition = POWER_OPTIONS_DEFINITIONS[p.id] || POWER_OPTIONS_DEFINITIONS[p.code];
    }
  });
}

function getPowerOptionsDefinition(power) {
  if (!power) return null;
  const pCode = typeof power === 'object' ? (power.code || power.id || power.catalogId) : power;
  const pName = typeof power === 'object' ? power.name : power;
  if (pCode && POWER_OPTIONS_DEFINITIONS[pCode]) {
    return POWER_OPTIONS_DEFINITIONS[pCode];
  }
  if (pName) {
    const key = Object.keys(POWER_OPTIONS_DEFINITIONS).find(k => {
      const opt = POWER_OPTIONS_DEFINITIONS[k];
      return opt.powerName && opt.powerName.toLowerCase() === pName.toLowerCase();
    });
    if (key) return POWER_OPTIONS_DEFINITIONS[key];
  }
  return null;
}

function rollPowerManifestation(def) {
  if (!def || !def.rollTable || !Array.isArray(def.rollTable)) return null;
  const d100 = Math.floor(Math.random() * 100) + 1;
  const bucket = def.rollTable.find(([min, max]) => d100 >= min && d100 <= max);
  const choiceKey = bucket ? bucket[2] : (def.choices[0] ? def.choices[0].key : null);
  const choiceObj = def.choices ? def.choices.find(c => c.key === choiceKey) : null;
  return {
    d100,
    choiceKey,
    choiceObj
  };
}

if (typeof globalThis !== 'undefined') {
  globalThis.POWERS_CATALOG = POWERS_CATALOG;
  globalThis.POWERS_BY_CODE = POWERS_BY_CODE;
  globalThis.POWERS_BY_NAME = POWERS_BY_NAME;
  globalThis.MSH_POWERS = MSH_POWERS;
  globalThis.POWER_ATTRIBUTES = POWER_ATTRIBUTES;
  globalThis.RANGE_BY_RANK = RANGE_BY_RANK;
  globalThis.FLIGHT_SPEED = FLIGHT_SPEED;
  globalThis.LAND_SPEED = LAND_SPEED;
  globalThis.WATER_SPEED = WATER_SPEED;
  globalThis.WEIGHT_BY_RANK = WEIGHT_BY_RANK;
  globalThis.getPowerDetails = getPowerDetails;
  globalThis.getPowerRankAspects = getPowerRankAspects;
  globalThis.calculatePowerAdjustmentCost = calculatePowerAdjustmentCost;
  globalThis.getMaxAdjustmentShift = getMaxAdjustmentShift;
  globalThis.POWER_OPTIONS_DEFINITIONS = POWER_OPTIONS_DEFINITIONS;
  globalThis.getPowerOptionsDefinition = getPowerOptionsDefinition;
  globalThis.rollPowerManifestation = rollPowerManifestation;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    POWERS_CATALOG,
    POWERS_BY_CODE,
    POWERS_BY_NAME,
    MSH_POWERS,
    POWER_ATTRIBUTES,
    RANGE_BY_RANK,
    FLIGHT_SPEED,
    LAND_SPEED,
    WATER_SPEED,
    WEIGHT_BY_RANK,
    getPowerDetails,
    getPowerRankAspects,
    calculatePowerAdjustmentCost,
    getMaxAdjustmentShift,
    POWER_OPTIONS_DEFINITIONS,
    getPowerOptionsDefinition,
    rollPowerManifestation
  };
}

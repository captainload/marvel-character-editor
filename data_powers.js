/**
 * Marvel Super Heroes - Powers Catalog Database
 * Canonical TSR UPB (Ultimate Powers Book) & Advanced Set Catalog
 * Project Version: 1.5.53
 */

(function (global) {
  'use strict';

  var POWERS_CATALOG = [
  {
    "code": "D1",
    "name": "Body Armor",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero possesses artificially-created armor that provides protection and possibly a way of possessing other Powers. Armor comes in many forms exotic plate-mail, nuclear-powered exoskeletons, or mechanically-created force fields. The player should work with the Judge to create proper Armor for his hero.",
    "rulesText": "The hero possesses artificially created armor that provides protection and possibly a way of possessing other Powers. Armor comes in many forms exotic plate-mail, nuclear-powered exoskeletons, or mechanically created force fields. The player should work with the Judge to create proper Armor for his hero. The player can also determine which Powers are possessed by the hero and which are properties of the armor. Powers built into the armor can later be modified and enhanced; think of the changes Tony Stark has made in the Iron Man armor. On the other hand, Powers that are built into the armor may suffer mechanical failure. The Armor's Power rank determines its ability to resist damage. The player also has to determine where he got the Armor in the first place. This is covered in the \"Character Creation\" section elsewhere in this book. If the hero gained the armor through an accident, he might not be able to repair it. Powers D2 through D9 have ranges",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent",
    "optionsDefinition": {
      "powerCode": "D1",
      "powerName": "Body Armor",
      "id": "body_armor_type",
      "label": "Armor Protection Configuration",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "balanced"
        ],
        [
          51,
          75,
          "physical_only"
        ],
        [
          76,
          100,
          "energy_only"
        ]
      ],
      "choices": [
        {
          "key": "balanced",
          "label": "Balanced Protection (Physical & Energy)",
          "description": "Equal protection against physical and energy attacks at power rank.",
          "isSuperior": false,
          "rankShift": 0,
          "effects": {
            "type": "body_armor",
            "physicalCS": 0,
            "energyCS": 0
          }
        },
        {
          "key": "physical_only",
          "label": "Physical-Only Specialization (+1CS Physical, 0 Energy)",
          "description": "Provides +1CS protection against physical attacks, but 0 protection against energy attacks.",
          "isSuperior": false,
          "rankShift": 1,
          "effects": {
            "type": "body_armor",
            "physicalCS": 1,
            "energyNone": true
          }
        },
        {
          "key": "energy_only",
          "label": "Energy-Only Specialization (+1CS Energy, 0 Physical)",
          "description": "Provides +1CS protection against energy attacks, but 0 protection against physical attacks.",
          "isSuperior": false,
          "rankShift": 1,
          "effects": {
            "type": "body_armor",
            "energyCS": 1,
            "physicalNone": true
          }
        }
      ]
    }
  },
  {
    "code": "D2",
    "name": "Force Field",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the type of field used by the Invisible Woman. It provides protection against a variety of forces, including brute force, energy attacks, and extreme temperature conditions. It can be projected and used for a variety of Power stunts.",
    "rulesText": "This is the type of field used by the Invisible Woman. It provides protection against a variety of forces, including brute force, energy attacks, and extreme temperature conditions. It can be projected and used for a variety of Power stunts. The following seven force fields protect against specific forms of attack. Each protects the hero and the surrounding area. The maximum size of the force field is the number of areas equal to 10% of the Power rank number. For example, a Monstrous Force Field can protect 7.5 areas. The force field completely absorbs any attack which has an Intensity equal to or less than the Power's rank number. If the Intensity is higher, it is reduced by the Power's rank number. The remaining Intensity breaches the force field and affects anyone within by this diminished effect. These forms cannot be used for many of the Power stunts suggested for force fields as given in the Player's Book. These cannot be used to physically attack or to handle solid materials. However, the hero can develop Power stunts which reflect each form's special nature. The hero can form shields to protect distant targets at +2CS range. By expanding his field outward, the hero can sweep his surroundings clean of anything affected by his force field. The Power can be used as a filter to sort out anything affected by his force field. The force field can be formed around something it would affect, thus trapping it. The hero can move the \"trap\" at will up to +2CS by means of a red FEAT.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or 1 area",
    "duration": "Maintained",
    "areaOfEffect": "Self or 10% Rank areas",
    "targets": "Self or allies in area"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or 1 area",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "targets": "Self or allies in area"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or 1 area",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "targets": "Self or allies in area",
    "optionsDefinition": {
      "powerCode": "D4",
      "powerName": "Force Field vs. Energy",
      "id": "ff_energy_spec",
      "label": "Force Field Energy Specialization",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "broad"
        ],
        [
          51,
          100,
          "specialized"
        ]
      ],
      "choices": [
        {
          "key": "broad",
          "label": "Broad Energy Field (All Energy Forms)",
          "description": "Protects against all emitted energy forms at standard power rank.",
          "isSuperior": false,
          "rankShift": 0
        },
        {
          "key": "specialized",
          "label": "Specific Energy Specialization (+2CS Rank)",
          "description": "Protects against a single specified energy attack form with +2CS rank and protection, but provides no defense against other energy types.",
          "isSuperior": false,
          "rankShift": 2,
          "subChoiceList": [
            "Fire & Heat",
            "Cold",
            "Electricity",
            "Radiation",
            "Light",
            "Sonics / Vibration",
            "Kinetic Bolts / Force",
            "Plasma"
          ]
        }
      ]
    }
  },
  {
    "code": "D5",
    "name": "Force Field vs. Magic",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the, field-effect version of D13. The field protects anything within from magical attack whether mental or physical in orientation. Note that unlike D6, this Power rank can be lower than the Psyche, making the field less able to protect against certain types of Magic.",
    "rulesText": "This is the, field-effect version of D13. The field protects anything within from magical attack whether mental or physical in orientation. Note that unlike D6, this Power rank can be lower than the Psyche, making the field less able to protect against certain types of Magic.\n\n+1CS by choosing a field that protects against a specific attack.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or 1 area",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "targets": "Self or allies in area"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or 1 area",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "targets": "Self or allies in area"
  },
  {
    "code": "D7",
    "name": "Force Field vs. Physical",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a field-effect version of D15. The field protects anything within from such things as brute force, hostile environments, temperature extremes, hazardous chemicals, and airborne infection. Note that while this Power will prevent hostile environments from harming the hero, it does not provide life support materials.",
    "rulesText": "This is a field-effect version of D15. The field protects anything within from such things as brute force, hostile environments, temperature extremes, hazardous chemicals, and airborne infection. Note that while this Power will prevent hostile environments from harming the hero, it does not provide life support materials. For example, this Power permits the hero to walk unharmed on the surface of Venus, provided he has his own oxygen supply. When creating the hero, the player can raise the Power rank +1CS by choosing a field that protects against a specific attack.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or 1 area",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "targets": "Self or allies in area",
    "optionsDefinition": {
      "powerCode": "D7",
      "powerName": "Force Field vs. Physical",
      "id": "ff_physical_spec",
      "label": "Force Field Physical Specialization",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "broad"
        ],
        [
          51,
          100,
          "specialized"
        ]
      ],
      "choices": [
        {
          "key": "broad",
          "label": "Broad Physical Field (All Physical Attacks)",
          "description": "Protects against all physical attacks at standard power rank. Significantly superior in versatility to narrow single-attack physical fields.",
          "isSuperior": true,
          "rankShift": 0
        },
        {
          "key": "specialized",
          "label": "Specific Physical Specialization (+1CS Rank)",
          "description": "Protects against a single specified physical attack form with +1CS rank, but provides 0 protection against all other physical damage types.",
          "isSuperior": false,
          "rankShift": 1,
          "subChoiceList": [
            "Blunt / Brute Force",
            "Edged / Slashing",
            "Piercing / Ballistics",
            "Corrosives / Acids"
          ]
        }
      ]
    }
  },
  {
    "code": "D8",
    "name": "Force Field vs. Power Manipulation",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate a specialized protective screen that insulates against external attempts to control, dampen, steal, or alter their superpowers or biological traits.",
    "rulesText": "Force Manipulation\n\nField vs.\n\nPower\n\nThis is the field-effect version of D16. The field protects anyone within from any attacks that directly affect the hero's Powers, including Weakness Creation, Power Control, Power Domination, Magic Control , and Magician Domination.",
    "errataNote": "",
    "powerStunts": [
      "Expanding field to protect adjacent allies",
      "Inverting field to cage a power dampening device"
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or 1 area",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "targets": "Self or allies in area"
  },
  {
    "code": "D9",
    "name": "Force Field vs. Vampirism",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the field-effect version of D17. The field protects anyone within from any vampiric-type attacks. This includes the forms of Psi-, Bio-, Energy, Magic, and Power Vampirism.",
    "rulesText": "This is the field-effect version of D17. The field protects anyone within from any vampiric-type attacks. This includes the forms of Psi- , Bio-, Energy, Magic, and Power Vampirism. When creating the hero, the player can raise the Power rank\n\nThe hero can turn any attack back onto the attacker. The attack may be of any nature: brute force, Power, or magic. The Power absorbs the energy of the attack up to this rank and redirects it. A Typical FEAT send the attack off in a random direction. An Amazing FEAT reflects some of the attack back onto the attacker; it is now - 3CS in Intensity. An Unearthly FEAT sends the entire attack back onto the attacker. If the attack's Intensity is higher that this Power's rank, some of the damage passes through and affects the hero. The Power rank is subtracted from the attack's Intensity. While most of the attack is reflected, the remainder gets through to the hero. Example: The terrible Turnabout is battling XFactor. Cyclops fires an optic blast of Remarkable Intensity. Turnabout possesses Excellent Reflection. His Power splits the blast in two. A Feeble blast penetrates his Power and knocks Turnabout back. The bulk of the blast was reflected. Turnabout made an Amazing FEAT, so some of Cyclops' blast returns to him. Cyke takes Typical damage from his own Power. Normally, this Power is consciously controlled and only appears when the hero wills it. However, the Power can be turned against the hero by such means as Power Control/Magnification and Power Domination. In such cases, the Power can be magnified beyond the hero's control to a level where it reflects everything, including air, food, and water. The Power can be used indefinitely, so long as it isn't overcome by superior force. After the first time the Power is breached, the hero must make a green FEAT. Failure to do so means his Power has failed. After the second breach, the hero must make a yellow FEAT. For each breach following that, he must make a red FEAT. This applies to a continual use of the Power. If his Power fails, the hero cannot regain it until 24 hours have passed. Resistances have no ranges.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or 1 area",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "targets": "Self or allies in area",
    "optionsDefinition": {
      "powerCode": "D9",
      "powerName": "Force Field vs. Vampirism",
      "id": "ff_vamp_spec",
      "label": "Force Field Vampirism Specialization",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "broad"
        ],
        [
          51,
          100,
          "specialized"
        ]
      ],
      "choices": [
        {
          "key": "broad",
          "label": "Broad Vampiric Field (All Vampiric Forms)",
          "description": "Protects against all forms of vampirism at standard power rank.",
          "isSuperior": false,
          "rankShift": 0
        },
        {
          "key": "specialized",
          "label": "Specific Vampirism Specialization (+1CS Rank)",
          "description": "Specializes against a specific form of vampirism with +1CS protection.",
          "isSuperior": true,
          "rankShift": 1,
          "subChoiceList": [
            "Psi-Vampirism",
            "Bio-Vampirism",
            "Energy Vampirism",
            "Magic Vampirism",
            "Power Vampirism"
          ]
        }
      ]
    }
  },
  {
    "code": "D10",
    "name": "Reflection",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can turn any attack back onto the attacker. The attack may be of any nature: brute force, Power, or magic. The Power absorbs the energy of the attack up to this rank and redirects it.",
    "rulesText": "D6 Force Field vs. Mental Attack This is the field-effect version of D14. The field protects anyone within from attacks aimed at the mind, neural system, and Psyche, including Psionics, and Neural Manipulation. It does not protect against emotion-based attacks (see D3) or magical attacks (see D5). The Power's rank must be one rank higher than the hero's Psyche; if initially lower, the player should raise it to the Psyche rank +1CS.\n\nD7 Force Field vs. Physical Attack This is a field-effect version of D15. The field protects anything within from such things as brute force, hostile environments, temperature extremes, hazardous chemicals, and airborne infection. Note that while this Power will prevent hostile environments from harming the hero, it does not provide life support materials. For example, this Power permits the hero to walk unharmed on the surface of Venus, provided he has his own oxygen supply. When creating the hero, the player can raise the Power rank +1CS by choosing a field that protects against a specific attack.\n\nD8 Force Manipulation\n\nField vs.\n\nPower\n\nThis is the field-effect version of D16. The field protects anyone within from any attacks that directly affect the hero's Powers, including Weakness Creation, Power Control, Power Domination, Magic Control , and Magician Domination.\n\nD9 Force Field vs. Vampirism This is the field-effect version of D17. The field protects anyone within from any vampiric-type attacks. This includes the forms of Psi- , Bio-, Energy, Magic, and Power Vampirism. When creating the hero, the player can raise the Power rank\n\nThe hero can turn any attack back onto the attacker. The attack may be of any nature: brute force, Power, or magic. The Power absorbs the energy of the attack up to this rank and redirects it. A Typical FEAT send the attack off in a random direction. An Amazing FEAT reflects some of the attack back onto the attacker; it is now - 3CS in Intensity. An Unearthly FEAT sends the entire attack back onto the attacker. If the attack's Intensity is higher that this Power's rank, some of the damage passes through and affects the hero. The Power rank is subtracted from the attack's Intensity. While most of the attack is reflected, the remainder gets through to the hero. Example: The terrible Turnabout is battling XFactor. Cyclops fires an optic blast of Remarkable Intensity. Turnabout possesses Excellent Reflection. His Power splits the blast in two. A Feeble blast penetrates his Power and knocks Turnabout back. The bulk of the blast was reflected. Turnabout made an Amazing FEAT, so some of Cyclops' blast returns to him. Cyke takes Typical damage from his own Power. Normally, this Power is consciously controlled and only appears when the hero wills it. However, the Power can be turned against the hero by such means as Power Control/Magnification and Power Domination. In such cases, the Power can be magnified beyond the hero's control to a level where it reflects everything, including air, food, and water. The Power can be used indefinitely, so long as it isn't overcome by superior force. After the first time the Power is breached, the hero must make a green FEAT. Failure to do so means his Power has failed. After the second breach, the hero must make a yellow FEAT. For each breach following that, he must make a red FEAT. This applies to a continual use of the Power. If his Power fails, the hero cannot regain it until 24 hours have passed. Resistances have no ranges.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "targets": "Attacker"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent",
    "optionsDefinition": {
      "powerCode": "D12",
      "powerName": "Resist: Energy",
      "id": "resist_energy_spec",
      "label": "Energy Resistance Specialization",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "broad"
        ],
        [
          51,
          100,
          "specialized"
        ]
      ],
      "choices": [
        {
          "key": "broad",
          "label": "Broad Energy Resistance (All Emitted Energy)",
          "description": "Reduces damage from all emitted energy attacks at standard power rank.",
          "isSuperior": false,
          "rankShift": 0
        },
        {
          "key": "specialized",
          "label": "Specific Energy Resistance (+1CS Rank)",
          "description": "Specializes in a specific energy type with +1CS rank and damage reduction.",
          "isSuperior": true,
          "rankShift": 1,
          "subChoiceList": [
            "Fire & Heat",
            "Cold",
            "Electricity",
            "Radiation",
            "Light",
            "Sonics / Vibration"
          ]
        }
      ]
    }
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "D14",
    "name": "Resist: Mental",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has increased resistance to attacks aimed at the mind and neural system. Such attacks include psionics, neural manipulation, and any other attacks aimed at the Psyche. It does not include emotion-based attacks (see D11) or magical attacks (see D13).",
    "rulesText": "by his Power rank number. When creating the hero, the player can raise his rank +1CS by choosing to specialize in a specific Energy Resistance. For example, the Player's Book contains listings for Resistance to Fire and Heat, Cold, Electricity, and Radiation.\n\nD13 Resistance to Magic Attacks The hero has increased resistance to magic based attacks, whether physical or mental in orientation. Unlike D11 and D14, this Power rank can be lower than the Psyche rank, making the hero more vulnerable to some types of magic. The hero can ignore any magic whose rank is less than this Power's rank and can reduce higher level attacks by the Power rank number.\n\nD14 Resistance to Mental Attacks The hero has increased resistance to attacks aimed at the mind and neural system. Such attacks include psionics, neural manipulation, and any other attacks aimed at the Psyche. It does not include emotion-based attacks (see D11) or magical attacks (see D13). The Power's rank must be at least one rank higher than",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "D15",
    "name": "Resist: Physical",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has increased resistance to any physical attack. This includes brute force, chemical weapons, biochemicals, disease, hostile environments, and temperature extremes. The hero can ignore any physical attacks with Intensities less than the Power rank, and reduce damage from higher level attacks by the Power rank number.",
    "rulesText": "The hero has increased resistance to any physical attack. This includes brute force, chemical weapons, biochemicals, disease, hostile environments, and temperature extremes. The hero can ignore any physical attacks with Intensities less than. the Power rank, and may reduce damage from higher level attacks by the Power rank number. When creating the hero, the player can raise the Power rank +1CS by choosing to specialize in a specific Physical Resistance. For example, the Player's Book contains listings for Resistances to Fire and Heat, Corrosives, and Disease.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent",
    "optionsDefinition": {
      "powerCode": "D15",
      "powerName": "Resist: Physical",
      "id": "resist_phys_spec",
      "label": "Physical Resistance Specialization",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "broad"
        ],
        [
          51,
          100,
          "specialized"
        ]
      ],
      "choices": [
        {
          "key": "broad",
          "label": "Broad Physical Resistance (All Physical Attacks)",
          "description": "Reduces damage from all physical attacks at standard power rank.",
          "isSuperior": false,
          "rankShift": 0
        },
        {
          "key": "specialized",
          "label": "Specific Physical Resistance (+1CS Rank)",
          "description": "Specializes in a specific physical hazard with +1CS rank and damage reduction.",
          "isSuperior": true,
          "rankShift": 1,
          "subChoiceList": [
            "Toxins & Poisons",
            "Corrosives & Acids",
            "Disease",
            "Brute Force / Blunt"
          ]
        }
      ]
    }
  },
  {
    "code": "D16",
    "name": "Resistance to Power Manipulation",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero possesses innate cellular or psionic resistance against external powers that dampen, steal, mimic, or duplicate their abilities.",
    "rulesText": "Resistance Manipulation to\n\nPower\n\nThe hero has increased resistance to attacks that directly affect the hero's Powers. Such attacks include Weakness Creation, Power Control, Power Domination, Magic Control, and Magician Domination. The hero can ignore any attack who rank is less than this Power rank. He may reduce the effectiveness of the higher level attacks by the Power rank number.",
    "errataNote": "",
    "powerStunts": [
      "Feedback surge stunning power drainers on a Red FEAT"
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "D17",
    "name": "Resist: Vampirism",
    "category": "Defensive",
    "source": "UPB Table p. 16-19 & Entry D17",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has increased resistance to any vampiric-type attacks. Such attacks include forms of Psi-, Bio-, Energy, Magic, and Power Vampirism. The hero can ignore any vampiric attack whose rank is less than this Power's rank.",
    "rulesText": "Domination. The hero can ignore any attack who rank is less than this Power rank. He may reduce the effectiveness of the higher level attacks by the Power rank number.\n\nD17 Resistance to Vampirism The hero has increased resistance to any vampiric-type attacks. Such attacks include forms of Psi-, Bio-, Energy, Magic, and Power Vampirism. The hero can ignore any vampiric attack whose rank is less than this\n\nDetection Powers Die Roll\n\nDetection Power\n\n(Code)\n\n01-02 03-04 05-10 11-14 15-20 21-28 29-34 35-40 41-42 43-44 45-50 51-54 55-56 57-58 60-62 63-69 70-79 80-90 91-94 95-98 99-00\n\nAbnormal Sensitivity Circular Vision Energy Detection Environmental Awareness Extradimensional Hyper-Hearing Hyper-Olfactory Hyper-Touch Life Detection Magic Detection Microscopic Vision Penetration Vision Power Detection Psionic Detection Radarsense Sonar",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent",
    "optionsDefinition": {
      "powerCode": "D17",
      "powerName": "Resist: Vampirism",
      "id": "resist_vamp_spec",
      "label": "Vampirism Resistance Specialization",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "broad"
        ],
        [
          51,
          100,
          "specialized"
        ]
      ],
      "choices": [
        {
          "key": "broad",
          "label": "Broad Vampiric Resistance (All Vampiric Forms)",
          "description": "Reduces effectiveness of all vampiric attacks at standard power rank.",
          "isSuperior": false,
          "rankShift": 0
        },
        {
          "key": "specialized",
          "label": "Specific Vampirism Specialization (+2CS Rank)",
          "description": "Specializes in a specific form of vampirism with +2CS resistance.",
          "isSuperior": true,
          "rankShift": 2,
          "subChoiceList": [
            "Psi-Vampirism",
            "Bio-Vampirism",
            "Energy Vampirism",
            "Magic Vampirism",
            "Power Vampirism"
          ]
        }
      ]
    }
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Line of sight",
    "duration": "Maintained"
  },
  {
    "code": "DT1",
    "name": "Abnormal Sensitivity",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero's senses function in their normal manner but their normal range of sensitivity is altered. The senses detect what they normally cannot and cannot detect what they normally can. This affects either vision or hearing.",
    "rulesText": "The hero's senses function in their normal manner but their normal range of sensitivity is altered. The senses detect what they normally cannot and cannot detect what they normally can. This affects either vision or hearing. the former case, the hero sees infrared and ultraviolet light, radio waves, and radiation. In the latter case, the hero hears extremely high and low pitches. This may be considered a handicap human characters while for aliens this could be a fact of life. A hero can turn it into an advantage by devising a means of negating the senses of his adversary that doesn't hinder his own altered senses.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "DT2",
    "name": "Circular Vision",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is simple enough to explain. The hero can see 360 degrees around himself. There are two ways to do this.",
    "rulesText": "This is simple enough to explain. The hero can see 360 degrees around himself. . There are two ways to do this. The first is the hero's eyes are placed far enough apart that they can see in all directions. Since this is somewhat grotesque, the hero loses 1CS on his Popularity. The second, more socially acceptable method is the hero possesses a weird light warping field that funnels light into his otherwise normal-looking eyes. The first method adds +1CS to the Fighting rank. This method is immune to interference by power-manipulation Powers. Unfortunately it also marks the hero as a geek or mutant. This Power has no rank. The hero either has it or he doesn't.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Line of sight (360°)",
    "duration": "Permanent"
  },
  {
    "code": "DT3",
    "name": "Energy Detection",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Range column D. The hero can detect and identify energy and related phenomena. The power can only detect actual energy, not potential energy (it couldn't detect a bomb until it explodes, for example).",
    "rulesText": "Range column D. The hero can detect and identify energy and related phenomena. The power can only detect actual energy, not potential energy (it couldn't detect a bomb until it explodes, for example). Likewise, while it can detect the energies consciously cannot detect the superhumans themselves. Rank determines range. DT4 Environmental Awareness",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "DT4",
    "name": "Environmental Awareness",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Range column B. The hero has increased sensitivity to conditions in, disturbances in, and influences on the environment. The hero automatically maintains full knowledge of current conditions in his surroundings.",
    "rulesText": "Range column B. The hero has increased sensitivity to conditions in, disturbances in, and influences on the environment. The hero automatically maintains full knowledge of current conditions in his surroundings. This awareness extends to such factors as weather, chemicals, movement, and life. The rank determines the range to which the awareness extends; exceeding it requires a FEAT (+1CS, green; +2CS, yellow; +3CS, red). The hero can gain +1CS by linking his Health to the environment. In this symbiosis, harm to the environment is reflected in the hero's physical welfare.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Permanent"
  },
  {
    "code": "DT7",
    "name": "Hyper-Olfactory",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect the presence of minute traces of substances and accurately identify them. This Power is continually functioning; the hero has learned to ignore unpleasant smells. If he loses his ability to mask out nasty odors, he'll be so distracted (and possibly sickened) by the intruding odors that he loses -1CS on Reason and Endurance.",
    "rulesText": "The hero can detect the presence of minute traces of substances and accurately identify them. This Power is continually functioning; the hero has learned to ignore unpleasant smells. If he loses his ability to mask out nasty odors, he'll be so distracted (and possibly sickened) by the intruding odors that he loses - 1CS on Reason and Endurance.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Permanent"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Permanent"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "DT10",
    "name": "Magic Detection",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect and identify magic and its effects. The Power can detect both magic in actual use and in potential. As such, this is another way to detect mutants, although it cannot differentiate them from normal magic-users.",
    "rulesText": "The hero can detect and identify magic and its effects. The Power can detect both magic in actual use and in potential. As such, this is another way to detect mutants, although it cannot differentiate them from normal magicusers. The hero can identify the past use of magic (a green FEAT), a yellow FEAT identifies the magic-user, and a red FEAT identifies the actual spell.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "DT11",
    "name": "Microscopic Vision",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero's eyes can focus on extremely minute targets, objects too small for normal vision to perceive. This Power functions in two stages. The first is light magnification; the hero's eyes function as normal microscopes.",
    "rulesText": "The hero's eyes can focus on extremely minute targets, objects too small for normal vision to perceive. This Power functions in two stages. The first is light magnification; the hero's eyes function as normal microscopes. This allows the hero to see things as small as chromosomes. Beyond this level, light no longer carries images. The second stage of this Power is a variation of Clairvoyance that permits the hero to see miniature, rather than distant, targets. The Power automatically shifts between these stages without the hero's conscious choice. (Rank: FE = microfilm, EX = cells, AM = molecules, UN = atoms, Shift-Y = electrons, CL5000 = surfaces of subatomic worlds.)",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Maintained"
  },
  {
    "code": "DT12",
    "name": "Penetration Vision",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is commonly called \"X-ray vision\" but may not actually use X-rays. The hero can see through solids; the effect is as if the obscuring material were transformed to clear glass. The Power rank number equals the depth in feet to which this Power can penetrate.",
    "rulesText": "This is commonly called \"X-ray vision\" but may not actually use Xrays. The hero can see through solids; the effect is as if the obscuring material were transformed to clear glass. The Power rank number equals the depth in feet to which this Power can penetrate. The hero can raise this by +1CS by selecting a material that blocks the vision; this material is usually a common element, often lead. Penetration Vision can be coupled with either Telescopic or Microscopic Vision to extend its range and permit the other Power to function despite intervening barriers. If this Power is interfered with by outside forces, the hero might be unable to use his normal vision. The result is the hero perceives everything as a transparent outline.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "1 area",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "DT15",
    "name": "Radarsense",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Range column B. The hero can gain a three-dimensional picture of his surroundings through the use of electromagnetic waves. The hero both emits and senses these waves.",
    "rulesText": "Range column B. The hero can gain a three-dimensional picture of his surroundings through the use of electromagnetic waves. The hero both emits and senses these waves. He can use the Power to locate and identify targets by their characteristic echoes. Because of the hero's sensitivity to electromagnetic waves, he has an increased vulnerability to electrical and magnetic attacks (1CS); these temporarily negate the Radarsense.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Permanent"
  },
  {
    "code": "DT16",
    "name": "Sonar",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Range column B. The hero can gain a three-dimensional picture of his environment through the use of soundwaves. The Power allows the hero to locate and identify targets by the way they reflect sound.",
    "rulesText": "Range column B. The hero can gain a three-dimensional picture of his environment through the use of soundwaves. The Power allows the hero to locate and identify targets by the way they reflect sound. There are two ways this Power can operate. Passive Sonar utilizes existing sound. Active Sonar uses special sounds emitted by the hero (this is how bats and dolphins do it). The latter form requires a special adaptation of the hero's voice; otherwise there is no real difference between them. Because of the special sensitivity of the hero's hearing, he is vulnerable to sonic attacks (-1CS to resist).",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "DT17",
    "name": "Telescopic Vision",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT17",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can magnify distant objects optically, seeing fine details at extreme ranges as though standing inches away.",
    "rulesText": "Range column E. The hero's eyes can focus on extremely distant targets, objects too small for normal vision to perceive. The eyes function as telescopes, magnifying normal visual images. With this Power, the hero can see anything in his line of sight, even the surfaces of distant worlds. However, the Power is limited by the speed of light. Images of Alpha Centauri, for example, are five years old. If the hero has other vision-based Powers, he can couple them with Telescopic vision to extend their range. When using this Power, the distant objects appear very close. An adversary with a means of altering the hero's control over this Power might make the Telescopic Vision continually override the hero's normal sight. The effect would be disastrous (imagine trying to walk through Manhattan when all you're seeing are the sands of Mars).",
    "errataNote": "",
    "powerStunts": [
      "Target acquisition bonus for ranged missile attacks (+1CS to Agility)"
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank (Visual)",
    "duration": "Maintained"
  },
  {
    "code": "DT18",
    "name": "Thermal Vision",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can see infrared light and heat images. This allows the hero to see in the dark, perceive temperature differences (especially those left by a living person's contact with an object), and partially see through solids. In the last case, the hero can only see the heat patterns of objects touching the other side of the barrier.",
    "rulesText": "The hero can see infrared light and heat images. This allows the hero to see in the dark, perceive temperature differences (especially those left by a living person's contact with an object), and partially see through solids. In the last case, the hero can only see the heat patterns of objects touching the other side of the barrier. With practice, the hero can judge the temperature of a target by its thermal color. The hero has an increased risk of being blinded by strong heat sources, even those that don't affect normal vision (- 1CS). Thermal vision may be a consciously-activated mode or the hero's normal means of vision.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Line of sight",
    "duration": "Permanent"
  },
  {
    "code": "DT19",
    "name": "Tracking",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT19",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect and follow tracks or environmental disturbances left by a specific target. At higher ranks, the hero can track across vast distances or deep space.",
    "rulesText": "The hero can detect and follow the tracks left by a specific target. The hero can detect environmental and spatial disturbances with the result that at high ranks the hero can actually track across deep space. The nature of the tracking depends on the character's sensory suite (e.g., physical footprints, scent, infrared residual heat, electromagnetic emissions, psychic residue, cosmic wake, or warp/spatial displacement).\n\nFEAT Requirements:\n• Green FEAT: Follow fresh tracks over clear or normal terrain within rank range.\n• Yellow FEAT: The trail is weathered, obscured, older than 24 hours, or crosses contaminated ground or disturbed space.\n• Red FEAT: The quarry actively conceals their trail, uses Stealth or Camouflage, or crosses water, vacuum, or hyperspace.\n\nCounter-effects: Opponents with Stealth, Invisibility, or Phasing modify tracking attempts by subtracting their power rank from the tracker's FEAT roll (-CS).\n\nRange is determined by Power rank on Column E of the Range Table.\nOptional Powers: Enhanced Senses, Thermal Vision, Telelocation.\nNemesis: Stealth.",
    "errataNote": "",
    "powerStunts": [
      "Tracking targets through aerial or orbital wake",
      "Identifying specific quarry by distinctive residual scent or spatial distortion",
      "Predicting quarry destination from trajectory and stride analysis"
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank (Column E)",
    "duration": "Maintained",
    "targets": "1 trail"
  },
  {
    "code": "DT20",
    "name": "True Sight",
    "category": "Detection",
    "source": "UPB Table p. 16-19 & Entry DT20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero perceives reality without distortion, seeing through illusions, cloaking fields, dimensional shifts, and shapeshifting disguises.",
    "rulesText": "The hero can see the correct image of a target, despite any attempts at concealment or disguise. This Power can penetrate any means of hiding something's true nature, whether physical, psionic, illusionary, or power-based. True Sight can penetrate any disguise at or below its rank. A green FEAT is required at +1CS; a yellow FEAT at +2CS; and a red FEAT at +3CS. Range is limited to one area unless the Power is coupled with a Power that extends his vision (Telescopic Vision, for example). The Power may be automatic or deliberate. If automatic, the hero gains +1CS but loses -2CS from his Psyche rank.",
    "errataNote": "",
    "powerStunts": [
      "Detecting phased or invisible astral projections"
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Line of sight",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Line of sight",
    "duration": "Permanent"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 target"
  },
  {
    "code": "EC1",
    "name": "Absorption Power",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can absorb a specific type of energy and actually gain Health points by converting the energy into Self-Healing. The hero gains a number of Health points equal his Power rank number each time he is hit by his specific form of absorbable energy. This addition to Health quickly heals any damage the hero had suffer, and acts as a buffer to absorb consequent damage.",
    "rulesText": "supply of energy to convert. Consider Galactus. He is perpetually starving. He uses this Power to absorb the energy of life-forces and convert it into his own life force. Yet, draining ten billion life-forces only sustains him for a single year, at most. Your hero won't last anywhere near as long.\n\nThere is the danger that your hero A actively seek out energies he can absorb and heal himself with. The danger occurs if the energy type is a dangerous one that does great damage wherever it occurs. For example, consider a character whose Absorption Power affects hard radiation. In the absence of other superbeings who possess Radiation Powers, the character might resort to breaking into reactors or even purposefully detonating nuclear bombs to get I energy he needs. (And you thought muties had a public image problem.) If the hero possesses an Energy Emission Power, he cannot use it directly to affect himself.\n\nreactions. He can increase or decrease the speed or rate at which reactions occur, like stopping iron from dissolving in acid or causing steel to rapidly transform into rust. The hero can also develop a variety of Power stunts: •\n\nCausing chemical reactions that are normally impossible, such as anything involving inert gases.\n\n• \n\nKnocking out self-powered machinery by stopping the reactions that generate their power.\n\n• \n\nInducing suspended animation in a living target by stopping all biochemical activity, especially decay.\n\n• \n\nIncapacitating living targets by inducing nausea.\n\n• \n\nIncreasing the hero's Strength and Endurance by",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or Touch",
    "duration": "Maintained",
    "optionsDefinition": {
      "powerCode": "EC1",
      "powerName": "Absorption Power",
      "id": "absorption_energy_type",
      "label": "Absorbable Energy Type",
      "canRoll": true,
      "rollTable": [
        [
          1,
          10,
          "light"
        ],
        [
          11,
          20,
          "electricity"
        ],
        [
          21,
          30,
          "fire_heat"
        ],
        [
          31,
          40,
          "cold"
        ],
        [
          41,
          50,
          "radiation"
        ],
        [
          51,
          60,
          "magnetism"
        ],
        [
          61,
          70,
          "sonics"
        ],
        [
          71,
          80,
          "kinetic"
        ],
        [
          81,
          90,
          "plasma"
        ],
        [
          91,
          100,
          "darkforce"
        ]
      ],
      "choices": [
        {
          "key": "light",
          "label": "Light / Laser",
          "description": "Absorbs light, laser, and coherent photonic energy, converting damage directly into Self-Healing / Health buffer.",
          "isSuperior": false
        },
        {
          "key": "electricity",
          "label": "Electricity / Lightning",
          "description": "Absorbs electrical energy and lightning bolts, converting damage directly into Self-Healing / Health buffer.",
          "isSuperior": false
        },
        {
          "key": "fire_heat",
          "label": "Fire & Heat",
          "description": "Absorbs fire, flame, and intense thermal energy, converting damage directly into Self-Healing / Health buffer.",
          "isSuperior": false
        },
        {
          "key": "cold",
          "label": "Cold / Thermal Drop",
          "description": "Absorbs cold and rapid heat-drain effects, converting temperature decreases directly into Self-Healing / Health buffer.",
          "isSuperior": false
        },
        {
          "key": "radiation",
          "label": "Radiation (Hard / Particle)",
          "description": "Absorbs hard radiation (gamma, cosmic, particle), converting harmful isotopes directly into Self-Healing / Health buffer.",
          "isSuperior": false
        },
        {
          "key": "magnetism",
          "label": "Magnetism",
          "description": "Absorbs magnetic force fields and electromagnetic pulses, converting them into Self-Healing / Health buffer.",
          "isSuperior": false
        },
        {
          "key": "sonics",
          "label": "Sonics / Sound",
          "description": "Absorbs sonic blasts and high-frequency sound waves, converting acoustic energy into Self-Healing / Health buffer.",
          "isSuperior": false
        },
        {
          "key": "kinetic",
          "label": "Kinetic / Vibration",
          "description": "Absorbs concussive force bolts and vibrational energy, converting kinetic impact into Self-Healing / Health buffer.",
          "isSuperior": false
        },
        {
          "key": "plasma",
          "label": "Plasma",
          "description": "Absorbs superheated ionized plasma energy, converting blast damage into Self-Healing / Health buffer.",
          "isSuperior": false
        },
        {
          "key": "darkforce",
          "label": "Darkforce / Exotic",
          "description": "Absorbs Darkforce emanations and exotic extra-dimensional energies into Self-Healing / Health buffer.",
          "isSuperior": false
        }
      ]
    }
  },
  {
    "code": "EC2",
    "name": "Catalytic Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control the speed at which chemical reactions occur. He can increase or decrease the energies emitted or drained in such reactions by his Power rank number.",
    "rulesText": "of oxygen and food (or whatever the body uses).\n\n• \n\nCollapsing a target by hastening the forces of decay.\n\n• \n\nForming compounds by simply mixing materials together and not needing heat or special conditions.\n\n• \n\nBaking without an oven.\n\nThe Power can continually affect a target as long as it functions. Any results are permanent if they do not involve a living subject. Effects on a living subject cease five turns after the Power ceases.\n\nEC2 Catalytic Control The hero can control the speed at which chemical reactions occur. He can increase or decrease the energies emitted or drained in such reactions by his Power rank number. For example, he could increase the heat, emitted by exothermic reactions like oxidation; he could also increase the chilling effect of endothermic\n\nEC3 Coldshaping The hero can control any force that actively decreases the temperature of something else. This can be used to increase or decrease the Cold's Intensity by this Power's rank number. This function overlaps both Heat and Cold Generation but differs in that this Power cannot alter the natural temperature of a target or alter local temperatures to suit the hero's whims. There are two primary functions to this Power. The first is to counteract or supplement cold-based Powers. The hero can alter such Powers as soon as they are emitted from the target's body. Such powers can be increased or decreased by this Power's rank number. The hero can also redirect such Powers. This leads to the second primary function. The hero can shape fields of intense cold and produce useful results. Ice Generation is a form of this Power. The hero can create shapes of rapidly-formed ice that he can use in a variety of Power stunts. The hero can also develop variations on Ice Generation that use other materials present in his local atmosphere. Such substances include carbon dioxide (even more slippery than ice, and the fog can knock people out), nitrogen, oxygen (potentially dangerous since a concentration of it can make normal flames explode with +2CS damage), and the inert gases (an Amazing Intensity FEAT, since there are so few of these present in Earth's atmosphere-but on other planets, not so tough). Cold Generation is a Bonus Power. Optional Powers include Thermal Control, Condensation, Molding, and Body Coating.\n\nEC4 Darkforce Manipulation This is a Power that is unique to campaigns using the Marvel",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 target"
  },
  {
    "code": "EC3",
    "name": "Coldshaping",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control any force that actively decreases the temperature of something else. This can be used to increase or decrease the Cold's Intensity by this Power's rank number. This function overlaps both Heat and Cold Generation but differs in that this Power cannot alter the natural temperature of a target or alter local temperatures to suit the hero's whims.",
    "rulesText": "The hero can control any force that actively decreases the temperature of something else. This can be used to increase or decrease the Cold's Intensity by this Power's rank number. This function overlaps both Heat and Cold Generation but differs in that this Power cannot alter the natural temperature of a target or alter local temperatures to suit the hero's whims. There are two primary functions to this Power. The first is to counteract or supplement cold-based Powers. The hero can alter such Powers as soon as they are emitted from the target's body. Such powers can be increased or decreased by this Power's rank number. The hero can also redirect such Powers. This leads to the second primary function. The hero can shape fields of intense cold and produce useful results. Ice Generation is a form of this Power. The hero can create shapes of rapidly-formed ice that he can use in a variety of Power stunts. The hero can also develop variations on Ice Generation that use other materials present in his local atmosphere. Such substances include carbon dioxide (even more slippery than ice, and the fog can knock people out), nitrogen, oxygen (potentially dangerous since a concentration of it can make normal flames explode with +2CS damage), and the inert gases (an Amazing Intensity FEAT, since there are so few of these present in Earth's atmosphere-but on other planets, not so tough). Cold Generation is a Bonus Power. Optional Powers include Thermal Control, Condensation, Molding, and Body Coating.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "EC4",
    "name": "Darkforce Manipulation",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a Power that is unique to campaigns using the Marvel Universe. It does not apply to campaigns set in other parts of the Multiverse. The hero can generate and control the extra-dimensional energy-form known as \"Darkforce.\" This resembles a tangible, impenetrable shadow and possesses several unique characteristics that the hero can use to develop Power Stunts: • Blunt attack damage at Power rank.",
    "rulesText": "This is a Power that is unique to campaigns using the Marvel Universe. It does not apply to campaigns set in other parts of the Multiverse. The hero can generate and control the extra-dimensional energy-form known as \"Darkforce.\" This resembles a tangible, impenetrable shadow and possesses several unique characteristics that the hero can use to develop Power Stunts: •\n\nBlunt attack Power rank.\n\n• \n\nShadowcasting of Power rank Intensity darkness over a maximum of three areas.\n\n• \n\nFlight at -1CS speed.\n\ndamage at\n\n• \n\nGateway.\n\n• \n\nEnergy Solidification.\n\nThe Darkforce is as yet undefined in the Marvel Universe. For your game's purposes, you might simply treat it as an other- dimensional power source that fills its own entire pocket dimension. That definition will work in or out of the official Marvel Universe.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "Rank areas"
  },
  {
    "code": "EC5",
    "name": "Electrical Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control all forms of electricity, whether natural, artificial, or Power-based. He can control the Intensity and direction of electron streams and alter the conductivity of materials. He can shape electron streams into any desired form.",
    "rulesText": "The hero can control all forms of electricity, whether natural, artificial, or Power-based. He can control the Intensity and direction of electron streams and alter the conductivity of materials. He can shape electron streams into any desired form. This permits him to develop Power stunts based on lightning-constructs designed to perform certain tasks (shields, cages, barriers, etc.) The hero can increase or decrease the electricity's Intensity and reduce damage by his Power rank number. If the electricity is Power-related, then the target's Power rank determines the Intensity of the FEAT the hero must make to gain control. The hero has Power rank Resistance to Electrical Generation. Optional Powers include Electrical Generation, Energy Doppelganger, Energy Sheath, Energy Body, Carrier Wave, and Energy Path. Because electricity forms the basis for most of our technology, the hero can use his Power to remotely control any electrical device on a Good Intensity FEAT. More complex devices like computers require a more complex form of control and a Remarkable Intensity FEAT.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 target / source"
  },
  {
    "code": "EC6",
    "name": "Energy Conversion",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can simply change any form of energy into any other form. The transformed energy's Intensity is one rank lower than its original level. The hero can transform energy by an Intensity FEAT equal to the target energy's Intensity.",
    "rulesText": "The hero can simply change any form of energy into any other form. The transformed energy's Intensity is one rank lower than its original level. The hero can transform energy by an Intensity FEAT equal to the target energy's Intensity. The hero begins with the ability to transform any energy into one specific form. He can develop the ability to transform energy into other forms as Power stunts. There are two advantages to this Power. The first is the ability to gain an Energy Emission Power fueled by the environment. Dazzler, for example, can convert sonic energy into light. She then refined that Light Generation into a variety of effects, including lasers, light shields, and hypnotic effects. The second advantage is the ability to transform deadly force into less dangerous forms. For example, if your hero found himself caught in a raging firestorm, he might Convert the heat into Cold. This would both protect him and extinguish the fire. (The paramedic shook his head. \"I'll be danged if I can figure out how a man can get frostbite fighting a fire.\") The maximum Intensity of Energy that a hero can convert is equal to one rank higher than his Power rank (a red FEAT). Excess energy remains in its original state, although its Intensity is diminished by the Power's rank number. Example: The Astounding Adaptor possesses Excellent Energy Conversion. While traveling through Nebraska, he spots a tornado about to touch down. He directs his Power at the tornado, which possesses Amazing Intensity. The most his Power can directly affect is Remarkable Intensity. He tries for a red FEAT and succeeds. The tornado bursts into an Amazing Intensity flash of orange light. High winds of Remarkable Intensity continue to buffet the area, but at least the worst of the property damage has been avoided. (\"Now if I could just get these spots out of my eyes...\") When creating the character, the player can raise his Power by +1CS by limiting him to a specific Energy Conversion (Sonics to Light, in Dazzler's example). The player must determine the characteristics for the secondary Power he gains by taking Energy Conversion. These would match the appropriate listing in the Energy Emission section.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or Touch",
    "duration": "Maintained"
  },
  {
    "code": "EC7",
    "name": "Energy Solidification",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can transform energy into a matrix that simulates solid matter. This matrix may be any shape the hero desires, although greater complexity requires a higher Intensity FEAT to create. For example, simple solids can be formed by a Feeble FEAT.",
    "rulesText": "The hero can transform energy into a matrix that simulates solid matter. This matrix may be any shape the hero desires, although greater complexity requires a higher Intensity FEAT to create. For example, simple solids can be formed by a Feeble FEAT. Animated forms require a Typical FEAT. Likenesses and simple machinery require an Incredible FEAT. The energy matrix possesses Strength equal to the Power rank. It continues to exist for a duration determined by the hero's Psyche. After that time, the matrix harmlessly dissipates. Some of the uses for this Power include: •\n\nForming cages or barriers.\n\n• \n\nForming servants to perform desired tasks.\n\n• \n\nCreating Body Armor to protect and enhance the hero's abilities.\n\n• \n\nAt high levels, the hero can build semi-permanent structures at will.\n\nPieces that are \"broken off\" from the matrix immediately revert to their original energy form, doing -4CS damage to the vandal. Optional Powers include any Energy Emission or Energy Control Power.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 construct"
  },
  {
    "code": "EC8",
    "name": "Energy Sponge",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can absorb any form of energy, whether natural or Power-based, and not suffer any damage. The hero can absorb energy equal to his Power rank number. This stored energy can be released at any time the hero desires; upon release it has a lower Intensity than its original state (-2CS).",
    "rulesText": "The hero can absorb any form of energy, whether natural or Power-based, and not suffer any damage. The hero can absorb energy equal to his Power rank number. This stored energy can be released at any time the hero desires; upon release it has a lower Intensity than its original state (-2CS). The hero may also choose to harmlessly dissipate the energy over a long period; this is a number of turns equal to the Intensity rank number. For example, your hero soaks up an Incredible radiation blast. He chooses to re-release it later as a single, Excellent Intensity blast that could really muck up whatever it hit, or he could let the radiation slowly seep away (this takes 40 turns, or four minutes). When the hero reaches his limit, three things can happen. One, the hero simply cannot absorb any more energy until he releases what he has already soaked up. This assumes the hero is in control of the situation and has a choice in his actions. The second possibility is that a \"gag reflex\" takes effect. Just as a human expels all food when the intake limit is reached, so too will the hero simply, uncontrollably release all absorbed energy at once. This situation assumes the hero doesn't know his own limit, or has a low Intuition (Typical or lower). The third possibility is dangerous for the hero. If he attempts to absorb more than his limit, he may suffer physical damage. The hero can temporarily absorb greater amounts of energy by making repeated red FEATs. Each successful FEAT enables him to absorb the next higher Power rank number worth of energy, minus the number already absorbed. When the hero fails the red FEAT, trouble occurs. All absorbed energy is released in a single turn, doing full damage to the hero. If the hero makes one last red FEAT, he takes only half damage but loses the Power permanently. Example: The alien hero Sukupp possessed an Excellent level of the Energy Sponge Power. While he was vititing Charleston, terrorists detonated an atomic bomb of Monstrous Intensity. Sukupp had no choice but to try to absorb the blast. He made his first red FEAT and absorbed 30 points of the blast. He didn't have time to release it, nor was this the proper place; the fireball was growing. He made his next red FEAT and absorbed another 10 points. A third red FEAT allowed him to absorb an Amazing amount of radiation, minus the points already absorbed (50- 40=10). Sukupp now had 50 points of the Ablast's 75 soaked into his body. There was still enough free to contaminate the city. Sukupp had to absorb it all. He tried. He failed the last red FEAT. For second, his body glowed like a small star. Than, he was gone. When creating the character, the player can raise the Power rank by +1CS by specializing in absorbing a single type of energy.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "EC9",
    "name": "Energy Vampirism",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can drain the energy from a target and convert that energy into extra Strength, Endurance, Psyche, and other Powers he possesses. The hero can force a non-living, nor sentient target to release all its energy, an Intensity FEAT equal to the energy potential of the target. For example, an auto battery can be drained on a Typical Intensity FEAT, a gallon of gasoline by Good Intensity FEAT, the magnetism every tape in a music shop on an Excellent intensity FEAT, the heat of a blast furnace on an Amazing Intensity FEAT and so on.",
    "rulesText": "The hero can drain the energy from a target and convert that energy into extra Strength, Endurance, Psyche, and other Powers he possesses. The hero can force a non-living, nor sentient target to release all its energy, an Intensity FEAT equal to the energy potential of the target. For example, an auto battery can be drained on a Typical Intensity FEAT, a gallon of gasoline by Good Intensity FEAT, the magnetism every tape in a music shop on an Excellent intensity FEAT, the heat of a blast furnace on an Amazing Intensity FEAT and so on. Living and/or sentient targets are harder to drain, because they possess Psyche. The target's Psyche determines the Intensity of the FEAT needed. A successful FEAT enables the hero to drain energy from the target. The amount drained is equal to this Power's rank number. The amount is drawn from all the target's Energy Emission Powers and any energies that form his physical makeup; this applies if the hero is a nonhuman (a robot, for example). The Energy Vampire can only drain Powers that actually emit energy- see the Energ Emission section. Powers that do not emit energy cannot be affected by this Power (but, see Power Vampirism). The Energy Vampire can drain the Power rank number amount of energy each turn as long as he keeps making successful FEATs. He can voluntarily stop feeding at any point by making a Psyche FEAT roll of any color excepi red. A red FEAT means his hunger is beyond his control. He has entered a feeding frenzy that will only cease when the target has been completely drain of energy. If the Energy Vampire fails to make any FEAT during the feeding process, he breaks off his attack and cannot reestablish it. The victim instantly develops an immunity to that particular Energy Vampire, and cannot be subjected to any of his future attacks. However, this does not protect the victim from other Energy Vampires. The drained energy is added in equal amounts to the Vampire's Strength, Endurance, Psyche, and any other Powers he possesses. The exception is this Power; no Vampire of any type can increase his own Power. Example: Evan the Energy Vampire possesses Good Energy Vampirism. His intended victim is Heatwave, a human with two Powers (Typical Gliding and Excellent Heat Emission) and Good Psyche. Evan makes the required FEAT roll (not red) to begin feeding, and drains 10 points from his victim's highest Power rank number. Heatwave's Heat Emission loses 10 points and drops to Good. Evan's three abilities go up 3 points each, thus increasing his Health by 6. The next turn, Evan makes another FEAT and drains another 10 points, drawn equally from Heatwave's Psyche and Heat Emission (dropping each by 5 points). Add another 3 points to Evan's three abilities and another 6 to his Health. The next FEAT is a repeat performance. At this point, Evan's player decides he's had enough, and rolls a 43; quitting is no problem. Why do Energy Vampires do it? Due to their odd nature, they lose energy at a dreadful rate. Their rank numbers for Strength, Endurance, and Psyche, and all Powers (except this one), drop 1 point per hour. The Energy Vampire must feed to bring those abilities and Powers up to their original levels. An Energy Vampire cannot actually starve to death; when all his affected rank numbers reach Shift 0, he enters a deathlike trance. His Vampirism continues to function and tries to drain anything that comes in contact with him. When the Vampire's abilities return to Feeble, he returns to life. When creating the Energy Vampire, the player must choose a weakness. He can increase the Power rank by +1CS by choosing a second weakness, up to a maximum of +3CS (four weaknesses) for the Energy Vampire. Energy Vampirism is communicable. A living and/or sentient victim who was Completely drained of all energy by an Energy Vampire must make a mandatory Psyche FEAT roll. On a red result, he becomes an Energy Vampire with Feeble Power rank.\n\n• \n\nChanging the direction of gravity.\n\n• \n\nCreating artificial gravity in a normally weightless situation.\n\n• \n\nLaunching targets into space by reducing their weight to zero and letting the Earth's revolution fling them upward.\n\n• \n\nLevitation at -1CS speed; this can be done to the hero himself or a target.\n\n• \n\nIncapacitating a foe by suddenly, drastically increasing his weight beyond his Strength's capacity to move.\n\n• \n\nForcing aircraft to land by increasing their weight beyond their engines' lift potential.\n\n• \n\nSinking ships by making their weight exceed their buoyancy.\n\n• \n\nForming large asteroids by coalescing spacial debris.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "targets": "1 target"
  },
  {
    "code": "EC10",
    "name": "Fire Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control existing flames, whether natural or Power-based. He can alter any factor involved in combustion without direct physical contact. The hero can increase or decrease the flame's Intensity up to his Power rank and reduce fire damage by his rank number.",
    "rulesText": "The hero can control existing flames, whether natural or Power-based. He can alter any factor involved in combustion without direct physical contact. The hero can increase or decrease the flame's Intensity up to his Power rank and reduce fire damage by his rank number. This Power includes Power rank Resistance to Fire and Heat. The most important aspect of this Power is enabling the hero to reshape flame into any form he desires. This can be used in a variety of Power stunts, as the hero develops numerous fiery constructs to perform miscellaneous deeds. Such fiery constructs do not act like normal flames. They emit less heat and consume less oxygen. Their fire doesn't spread past the outline of the constructs. In addition, they selfextinguish rapidly upon cessation of this Power. , Optional Powers include Fire Generation, Thermal Control, Energy Sheath, and Energy Body.",
    "errataNote": "",
    "powerStunts": [
      "Flame Constructs: Shape flame into fiery constructs (serpents, raptors, walls, hands) to grapple or strike at range",
      "Fire Wall Barrier: Erect a blazing wall of fire providing defensive protection against missiles",
      "Smother Fire: Instantly extinguish all flames within 3 areas with a Psyche FEAT"
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "EC11",
    "name": "Gravity Manipulation",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control gravity, the force that attracts all particles to all other particles. Gravity always exists wherever there is tangible matter. (in dimensions composed entirely of energy, though, gravity is optional.) The hero doesn't really generate gravity; he simply changes the Intensity of what's already there.",
    "rulesText": "The hero can control gravity, the force that attracts all particles to all other particles. Gravity always exists wherever there is tangible matter. (in dimensions composed 3ntirely of energy, though, gravity is optional.) The hero doesn't really generate gravity; he simply changes the Intensity of what's already there. He can increase or decrease the Intensity of gravity by his Power rank number. This effect may be centered on himself or projected onto a target. This permit him to develop a variety of Power stunts:\n\nThe gravity remains altered for as long as the Power functions. After cessation, gravity returns to normal.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "Rank areas"
  },
  {
    "code": "EC12",
    "name": "Hard Radiation Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control existing radiation, including X-rays, alpha, beta, gamma, and cosmic rays. The hero can increase or decrease the radiation's Intensity, up to his Power rank, and reduce the damage done by radiation up to his Power rank number. The hero can direct the flow of radiation and can alter its nature by converting any form of radiation to any other form.",
    "rulesText": "The hero can control existing radiation, including X-rays, alpha, beta, gamma, and cosmic rays. The hero can increase or decrease the radiation's Intensity, up to his Power rank, and reduce the damage done by radiation up to his Power rank number. The hero can direct the flow of radiation and can alter its nature by converting any form of radiation to any other form. If a radiation-related Power is involved, the target's Power rank determines the Intensity of the required FEAT. For example, an Amazing Intensity FEAT is required to control Amazing Radiation Emission. Optional Powers include Hard Radiation Emission, Energy Doppelganger, Energy Sheath, Energy Body, and Energy Sustenance.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "EC13",
    "name": "Kinetic Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control the energy of motion itself. He can increase or decrease kinetic energy's Intensity by his Power rank number. With a Typical Intensity FEAT, he can change the direction of any moving target.",
    "rulesText": "The hero can control the energy of motion itself. He can increase or decrease kinetic energy's Intensity by his Power rank number. With a Typical Intensity FEAT, he can change the direction of any moving target. He can impart momentum as if he physically pushed the target, with his Power rank taken as Strength. The primary purpose of Kinetic Control is to control Telekinesis and Kinetic Bolts. In the former case, the hero can redirect the target's efforts. A FEAT equal to the target's Power rank taken as Intensity ensures this. In the latter case, the hero can shape Kinetic Bolts into forms that can perform complex tasks. The difficulty of such tasks determines the Intensity of the required FEAT. The hero can have a Bonus Power of either Telekinesis or Kinetic Bolt. The remaining Power can be an Optional one.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "duration": "Maintained",
    "targets": "1 target / object"
  },
  {
    "code": "EC14",
    "name": "Light Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can manipulate existing light. This can be visible, infrared, or ultraviolet light. The hero can alter the intensity, frequency (color, in other words), and coherence of light on a Good Intensity FEAT.",
    "rulesText": "have a Bonus Power of either Telekinesis or Kinetic Bolt. The remaining Power can be an Optional one.\n\nEC14 Light Control The hero can manipulate existing light. This can be visible, infrared, or ultraviolet light. The hero can alter the intensity, frequency (color, in other words), and coherence of light on a Good Intensity FEAT. The hero can actually change the direction of light and -form crude holograms on a Remarkable Intensity FEAT. Such holograms are little more than clouds or single-color walls. The Power allows +1CS Resistance to light-based Powers, since the hero can redirect or dispel them. Optional Powers include Light Generation, Energy Sheath, Carrier Wave, and Illusion Casting. The Nemesis is itself.\n\nflow!). He can shape the field into forms to produce any effect. These can be developed as Power Stunts. The Power can be used to control simple machinery. The simplest form is merely rendering the machine inoperable by altering the magnetism of the components. A more refined use of the Power enables the hero to actually control a machine.\n\nEC16 Plasma Control The hero can control fields of highlycharged particles. The hero can increase or decrease the plasma's Intensity and reduce its damage by his Power rank number. The Power includes Power rank Resistance to plasma's effects. The Power has two main uses. The first is shaping plasma fields into any shape desired. This can be developed into a variety of Power stunts as the hero develops numerous plasm a-constructs to perform various deeds. Such constructs do possess the typical side-effects of plasma fields, and dissipate upon cessation of the Power. The second use of Plasma Control enables the hero to counteract plasmarelated Powers. These include Plasma Generation, Energy Doppelganger, Energy Sheath, and Energy Body. The target's Power rank determines the required intensity",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "Rank areas"
  },
  {
    "code": "EC15",
    "name": "Magnetic Manipulation",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control magnetic force. He can increase or decrease magnetism's Intensity by his Power rank number. He can use existing magnetism, whether natural or Power-based, to perform any desired task.",
    "rulesText": "Excellent Intensity FEAT is required to control Excellent Plasma Generation. Optional Powers include Plasma Generation, Energy Doppelganger, Energy Sheath, and Energy Body.\n\nEC17 Radiowave Control EC15 Magnetic Manipulation The hero can control magnetic force. He can increase or decrease magnetism's Intensity by his Power rank number. He can use existing magnetism, whether natural or Power-based, to perform any desired task. The required Intensity FEAT is equal to the Intensity rank of the magnetism. The hero can alter the polarity of a magnetic field (but not a neutron\n\nThe hero can control existing radiowaves, whether AM., FM, or microwaves. The hero can increase or decrease the radiowaves' Intensity by his Power rank number. A Good intensity FEAT permits the hero to alter the frequency and direction of such waves and garble transmissions. The hero has Power rank Resistance to radiobased attacks; such attacks are normally limited to an opponent thinking he's a microwave oven about to cook the hero's goose. The Power really comes into its own when used as a form of electronicage Illusion-Casting. That is, the hero creates complex signals that simulate an actual broadcast. Voice-only broadcasts can be simulated by a Typical Intensity FEAT. Musical or multi-voice broadcasts require an Excellent Intensity FEAT, as does a still picture. A single figure with a blank background or a simple cartoonlike broadcast requires an Incredible Intensity FEAT. A single figure with a complex background (think of an evening news broadcast) requires a Monstrous Intensity FEAT. Any other broadcast can be simulated on a Shift X Intensity FEAT (think Academy Awards production numbers, and you'll see why so high). Obviously, this is a Power that is only really useful in high-tech campaigns. Oh, it could exist in a primitive situation, but then who would know? This has a Bonus Power of Radiowave Generation. Optional Powers include Energy Doppelganger, Energy Sheath, and Carrier Wave.\n\nEC18 Shadowshaping This is not Darkforce Manipulation; that's handled elsewhere. This Power enables the hero to affect normal shadows and, indirectly, light as well. The hero can shift the location and size of normal shadows. He can form them into two-dimensional images that can do Power rank damage to real targets. The hero can also Remote Sense through these shadow-constructs. The hero can increase or decrease the Intensity of any shadow, whether natural or Power-based, by his Power rank number. This overlaps with Light Generation and Shadowcasting but differs in that either effect is possible and only existing shadows or shadow-related Powers are affected. The hero has the ability to see through any shadow as if it were a normally-lit area, provided its Intensity is less than or equal to his Power rank. This does not apply to Darkforce, however. This Power includes Power rank Resistance to shadow-based Powers. This has the Bonus Power of Shadowcasting.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "Ferrous objects"
  },
  {
    "code": "EC16",
    "name": "Plasma Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control fields of highly-charged particles. The hero can increase or decrease the plasma's Intensity and reduce its damage by his Power rank number. The Power includes Power rank Resistance to plasma's effects.",
    "rulesText": "The hero can control fields of highlycharged particles. The hero can increase or decrease the plasma's Intensity and reduce its damage by his Power rank number. The Power includes Power rank Resistance to plasma's effects. The Power has two main uses. The first is shaping plasma fields into any shape desired. This can be developed into a variety of Power stunts as the hero develops numerous plasm a-constructs to perform various deeds. Such constructs do possess the typical side-effects of plasma fields, and dissipate upon cessation of the Power. The second use of Plasma Control enables the hero to counteract plasmarelated Powers. These include Plasma Generation, Energy Doppelganger, Energy Sheath, and Energy Body. The target's Power rank determines the required intensity of the FEAT. For example, an Excellent Intensity FEAT is required to control Excellent Plasma Generation. Optional Powers include Plasma Generation, Energy Doppelganger, Energy Sheath, and Energy Body.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "EC17",
    "name": "Radiowave Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC17",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control existing radiowaves, whether AM., FM, or microwaves. The hero can increase or decrease the radiowaves' Intensity by his Power rank number. A Good intensity FEAT permits the hero to alter the frequency and direction of such waves and garble transmissions.",
    "rulesText": "EC15 Magnetic Manipulation The hero can control magnetic force. He can increase or decrease magnetism's Intensity by his Power rank number. He can use existing magnetism, whether natural or Power-based, to perform any desired task. The required Intensity FEAT is equal to the Intensity rank of the magnetism. The hero can alter the polarity of a magnetic field (but not a neutron\n\nThe hero can control existing radiowaves, whether AM., FM, or microwaves. The hero can increase or decrease the radiowaves' Intensity by his Power rank number. A Good intensity FEAT permits the hero to alter the frequency and direction of such waves and garble transmissions. The hero has Power rank Resistance to radiobased attacks; such attacks are normally limited to an opponent thinking he's a microwave oven about to cook the hero's goose. The Power really comes into its own when used as a form of electronicage Illusion-Casting. That is, the hero creates complex signals that simulate an actual broadcast. Voice-only broadcasts can be simulated by a Typical Intensity FEAT. Musical or multi-voice broadcasts require an Excellent Intensity FEAT, as does a still picture. A single figure with a blank background or a simple cartoonlike broadcast requires an Incredible Intensity FEAT. A single figure with a complex background (think of an evening news broadcast) requires a Monstrous Intensity FEAT. Any other broadcast can be simulated on a Shift X Intensity FEAT (think Academy Awards production numbers, and you'll see why so high). Obviously, this is a Power that is only really useful in high-tech campaigns. Oh, it could exist in a primitive situation, but then who would know? This has a Bonus Power of Radiowave Generation. Optional Powers include Energy Doppelganger, Energy Sheath, and Carrier Wave.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "EC18",
    "name": "Shadowshaping",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is not Darkforce Manipulation; that's handled elsewhere. This Power enables the hero to affect normal shadows and, indirectly, light as well. The hero can shift the location and size of normal shadows.",
    "rulesText": "This is not Darkforce Manipulation; that's handled elsewhere. This Power enables the hero to affect normal shadows and, indirectly, light as well. The hero can shift the location and size of normal shadows. He can form them into two-dimensional images that can do Power rank damage to real targets. The hero can also Remote Sense through these shadow-constructs. The hero can increase or decrease the Intensity of any shadow, whether natural or Power-based, by his Power rank number. This overlaps with Light Generation and Shadowcasting but differs in that either effect is possible and only existing shadows or shadow-related Powers are affected. The hero has the ability to see through any shadow as if it were a normally-lit area, provided its Intensity is less than or equal to his Power rank. This does not apply to Darkforce, however. This Power includes Power rank Resistance to shadow-based Powers. This has the Bonus Power of Shadowcasting.\n\nOptional Powers include Light Control, Energy Sheath, and Energy Body. In the last two cases, the hero resembles a living shadow.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "EC19",
    "name": "Sound Manipulation",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC19",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control existing sound. He can increase sound's Intensity by one rank by means of a Power rank FEAT or decrease it by his Power rank number. It also provides the hero with Resistance to sound-based Powers; again, his Power rank number decreases the Intensity the attack.",
    "rulesText": "The hero can control existing sound. He can increase sound's Intensity by one rank by means of a Power rank FEAT or decrease it by his Power rank number. It also provides the hero with Resistance to sound-based Powers; again, his Power rank number decreases the Intensity the attack. This is possibly the single most useful Power of all those that don't do actual damage. The uses are infinite: •\n\nMuting the voices of an opponent group, thus preventing them from coordinating their actions.\n\n• \n\nMuting alarms.\n\n• \n\nMagnifying distant sounds to make them audible at the hero's location\n\n• \n\nIncreasing faint sounds to enable the hero to perform certain actions (like cracking a combination lock).\n\n• \n\nDestroying boom boxes if the hero doesn't like the music.\n\n• \n\nCranking up boom boxes if he does\n\nOkay, a lot of the uses are somewhat frivolous. Still, the ability to knock out voice is a powerful weapon. Sound Manipulation can also be used to reinforce sound based Powers. The hero can raise the other Power rank +1CS as long as this Power functions. This has a Bonus Power of Sound Generation. Optional Powers include Vibration and Vibration Richter Control. Number",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "Rank areas"
  },
  {
    "code": "EC20",
    "name": "Thermal Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero control applied heat or cold; that is, can control any force that actively changes the temperature of something else. This includes any source of heat or cold, whether natural, artificial, or Power based. The Power overlaps both Heat and Cold Generation but it also differs from them in that this Power cannot affect the natural temperature of a target or alter the local temperature to suit the hero's whim.",
    "rulesText": "The hero control applied heat or cold; that is, can control any force that actively changes the temperature of something else. This includes any source of heat or cold, whether natural, artificial, or Power based. The Power overlaps both Heat and Cold Generation but it also differs from them in that this Power cannot affect the natural temperature of a target or alter the local temperature to suit the hero's whim. For example, Thermal Control could cool a girder being heated in a furnace, since that thing is being actively heated, but it could not change. the temperature of another girder lying outside the furnace (nothing is being done to that one). Thermal Control is mostly used to counteract or supplement temperaturealtering Powers. The Power can affect such others as soon as they are emitted from the target's body. That is, you can affect the Human Torch's fireballs but not his Fire Sheath. The target's Power rank determines the required Intensity of the FEAT. Controlling the Torch's heat takes an Unearthly Intensity FEAT. Optional Powers include Heat Generation, Fire Generation, Cold Generation, Fire Control, and Coldshaping.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "EC21",
    "name": "Vibration Control",
    "category": "Energy Control",
    "source": "UPB Table p. 16-19 & Entry EC21",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can control existing vibrations. These may be natural or Power-based. The hero can increase or decrease the Intensity of the vibration by his Power rank number.",
    "rulesText": "The hero can control existing vibrations. These may be natural or Power-based. The hero can increase or decrease the Intensity of the vibration by his Power rank number. He has Power rank Resistance to Vibration and Sonic attacks. A Power like this can make a hero extremely popular in a quake-prone locale like southern California. Using the Richter scale, these are the required Intensities of the FEATs for controlling each class of earthquake.\n\nfall into the sea, you won't be much help. Of course, if your hero possesses Vibration as well, he might get blamed for the quake. On a smaller scale, the Power can be used in a variety of everyday situations: •\n\nThe hero can distort or even mute a target's voice. This effectively negates vocal Powers. This is done by directly affecting the target's larynx.\n\n• \n\nIf your campaign includes other Dimensions that can be reached by adjusting your vibratory rate to that of the chosen dimension, then this Power will do the trick on an Amazing Intensity FEAT.\n\n• \n\nThe hero can cripple gyroscopes, thus disabling any vehicles dependent on them (subs, aircraft). This is a Typical Intensity FEAT, which incidentally also works against robots.\n\n• \n\nThe hero can adjust the vibratory rate of his own atoms, permitting him to Phase through solid objects or let solids (like bullets) pass harmlessly through him.\n\nOptional Powers include Vibration, Sonic Generation, and Sound Manipulation.\n\nOkay, if California is determined to Intensity FE, PR TY, GD EX, RM IN, AM MN, UN Shift X, Shift Y Shift Z, CL1000 CL3000, CL5000\n\nEnergy Emission Powers Die Roll\n\nEnergy Emission\n\n(Code)\n\n01-10 11-20 21-22 23-34 35-37 38-42 43-52 53-62 63-72 73-75 76-78 79-83 84-93 94-00\n\nCold Generation Electrical Generation Energy Doppelganger Fire Generation Hard Radiation Heat Kinetic Bolt Light Emission Magnetism Plasma Generation Radiowave Generation Shadowcasting Sonic Generation Vibration\n\nEE1 EE2 EE3 EE4 EE5 EE6 EE7 EE8 EE9 EE10 EE11 EE12 EE13 EE14\n\nPower can be emitted by any part of the hero's body. For most Powers, it is not important to specify the emergence point. For the Powers of the Energy Emission class, though, emission points become important. This affects how the hero utilizes his Power. It determines ways goes can negate that Power. If the hero loses the part of his body containing the emission point, he may lose his Power as well. When creating the hero, the player should determine an, emission point for any Energy Emission Powers. He may select the first one rolled as the point for all of his character's Energy Emissions, or be adventurous and determine one for each Power. •\n\nEntire body: Power radiates from an aura surrounding the entire body. -Power can be emitted in any direction without the hero actually having to physically point.\n\n• \n\nHead: Power emanates from an aura surrounding only the hero's head. Power can be emitted in any direction desired without the hero's having to nod his head.\n\n• \n\nEyes: Power is emitted through the hero's pupils. The power is directed wherever the hero is looking. If the eyelids are closed, this Power cannot function.\n\nE-point d100 roll\n\nEntire body Head Eyes Mouth and nose Torso Arms Hands Fingers Legs Feet Wings Antennae/horns Tail Any location\n\n01-14 15-22 23-30 31-38 39-46 47-54 55-62 63-67 68-70 71-73 74-76 77-81 82-86 87-00\n\n• Mouth and nose: The Power is primarily emitted through the hero's mouth. To aim, he turns his head and shapes the mouth as though blowing out a candle. Seepage occurs through the nose; this cannot be aimed, and the Power is reduced -2CS in Intensity.\n\n• \n\nTorso: The Power is emitted from an aura on the hero's chest. The Power travels in a straight line, perpendicular to the body.\n\n• \n\nArms: The Power is emitted from an aura surrounding either or both arms. The Power travels in the direction in which the forearm is pointed (if one arm is used) or in a vector (if both arms are used).\n\n• \n\nHands: The Power is emitted from an aura surrounding the hero's hand, fist, or palm. Power travels in the plane formed by the fingers, in line with the whole fist, or in a line perpendicular to the open palm.\n\n• \n\nFingers: The Power is emitted form an aura surrounding the hero's fingers (any number, from one to all of them). It travels in a straight line in the direction the finger points. Usually, the index finger directs the Power, if only one finger is used. If the hero has multiple Powers, each Power can be assigned to a different finger. •\n\nLegs: Power is emitted downward from an aura surrounding both legs. It is difficult to aim leg-emitted Power, which travels in the line defined by the lower leg. Such Powers are usually limited in range to contact only.\n\n• \n\nFeet: Power is emitted by the hero's soles. As above, such Powers are difficult to aim and are usually limited to contact-only.\n\n• \n\nWings: Power is emitted from an aura surrounding the hero's wings. Power may travel in the plane formed by the wings or in a line perpendicular to their open position.\n\n• \n\nAntennae/Horns: Power is emitted from an all the antennae on the hero's head. Power travels in a straight line from the last section of the antennae.\n\n• \n\nTail: Power is emitted from the tip of the hero's tail and follows a straight line in the direcction the tail points. •\n\nAny location: The hero can emit Power from any secticn of the body he chooses, and can change emission points with each use of the Power.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "EE1",
    "name": "Cold Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This Power is the pure form of Ice Generation and one it is often confused with. The hero can emit a field that decreases thermal energy and infrared radiation. The Power decreases the temperature of the target; the amount is determined both by a FEAT and the Power rank number.",
    "rulesText": "This Power is the pure form of Ice Generation and one it is often confused with. The hero can emit a field that decreases thermal energy and infrared radiation. The Power decreases the temperature of the target; the amount is determined both by a FEAT and the Power rank number. A Typical FEAT drops the temperature by 10x the rank number; a Remarkable FEAT drops it by 20x the rank number; and an Unearthly FEAT drops it by 40x the rank number. For example, a hero with Remarkable Cold Generation can lower a target's temperature by 300 (10x30) to 1200 (40x3O) degrees. The only limitation is that the temperature cannot drop lower than absolute zero (-273 degrees Celsius or -459.4 degrees Fahrenheit). The power has the side-effect of cooling the air between the hero and the target. Gases within that area may condense. Such by-products evaporate quickly after the Power ceases to operate. Cold Generation can be used to negate other sources of cold, whether Power-based, artificial, or environmental; its Power rank decreases the intensity of the affected cold. However, it cannot be used to raise the temperature of a frigid environment. The hero with this Power has Power rank level resistance to Cold in any form. Optional Powers include Coldshaping, Condensation, Solidification, and Molding. Nemeses include Heat Emission, Fire Generation, and Thermal Control.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target"
  },
  {
    "code": "EE2",
    "name": "Electrical Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can create electrical streams that can do Power rank damage. The hero can project the electricity through any conductive medium, such as air, water, or metal, at Power rank range. If the player chooses, the hero can gain +2CS to his damage by choosing to limit his range to contact only.",
    "rulesText": "The hero can create electrical streams that can do Power rank damage. The hero can project the electricity through any conductive medium, such as air, water, or metal, at Power rank range. If the player chooses, the hero can gain +2CS to his damage by choosing to limit his range to contact only. In this case, the range can be extended by conducting the Power through solid conductors like metal. Electricity comes in various forms: •\n\nStatic electricity causes magnetic attraction between objects and can disrupt electronic communications.\n\n• \n\nLightning is sheer, raw, destructive power and by far the most popular form of this Power.\n\n• \n\nAlternating current is what our technology is driven by. This Power can either energize or overload normal electrical devices.\n\n• \n\nDirect current is what a battery produces. It can energize or overload devices that use DC power. It can also short out devices that use AC power.\n\nThe hero can use any form at will or can raise his rank +1CS by specializing in a particular form. This Power automatically includes Power rank Resistance to Electricity; no ,FEAT is required to resist your own Power. This Power is linked to Electrical Control and Energy Sheath. When creating the hero, the player can exchange any randomly determined Powers for these if he so desires. Extreme heat reduces this Power's rank by the Intensity rank of the heat. Conversely, extreme cold increases the rank by the cold's Intensity rank. At Shift X level, the hero gains the ability to create a stream of conductive gas, thus allowing the Power to function even in a vacuum.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target"
  },
  {
    "code": "EE3",
    "name": "Energy Doppelganger",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate an Energy Body from his own body. This Doppelganger can have Powers of its own, including those characteristic to the type of energy of which the Doppelganger is composed. The Doppelganger automatically has the Power of True Flight, While the player can decide which Powers are possessed by whom, a rule of thumb is that the majority of physical Powers are assigned to the Doppelganger.",
    "rulesText": "The hero can generate an Energy Body from his own body. This Doppelganger can have Powers of its own, including those characteristic to the type of energy of which the Doppelganger is composed. The Doppelganger automatically has the Power of True Flight, While the player can decide which Powers are possessed by whom, a rule of thumb is that the majority of physical Powers are assigned to the Doppelganger. The player must also decide whether the Doppelganger is simply an extension of the hero's will or if it has an independent, but obedient, mind. If the player chooses the latter he raises the Power rank +1CS; he can raise it another +1CS by having the lapse into unconsciousness when he uses the Power, since his mind is directly tied into maintaining the Doppelganger's existence. Any damage to the Doppelganger is subtracted from the hero's Psyche. Rank determines the duration of the Doppelganger and the minimum ran any Powers it possesses. Normally the hero can generate only one Doppelganger at a time. At extremely high ranks, the hero can generate additional Doppelgangers. The number is equal to 1% of the Power rank number (round up). For example, at Class 1000 rank the hero can create 10 simultaneous beings. Such beings have a decreased Resistance (-2CS) to plasma-based attacks since these disrupt the energy field that forms the Doppelganger. They possess an increased Resistance (+4CS) to attacks based on Light, Heat, Flame, Vibrations, and Sonics, since they have no solid mass to affect. The Nemesis Power is Plasma Control.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 duplicate"
  },
  {
    "code": "EE4",
    "name": "Fire Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can project fire with Power rank damage and range. These flames have no apparent fuel source and spring from the hero as if he were a living fuel tank. Although the flames' fuel comes out of the proverbial nowhere, free oxygen must be present for the Power to function.",
    "rulesText": "The hero can project fire with Power rank damage and range. These flames have no apparrent fuel source and spring from the hero as if he were a living fuel tank. Although the flames' fuel comes out of the proverbial nowhere, free oxygen must be present for the Power to function. If not, the hero can cause a single flame that lasts' only one turn, then fizzles out. At Shift X rank, the hero gains the ability to generate oxygen as well, permitting this Power to function under any conditions. When creating the hero, the player can choose the Powers of Flame Control, Energy Sheath, and Energy Body to fill any slots still open. For example, under the Ultimate system, the Human Torch possesses three powers: Fire Generation, Fire Control, and Energy Sheath. This has to be the most dangerous Power around. Heroes have to watch out for accidental firestorms. They also tend to consume all the oxygen in their location, making everyone pass out. Then there is the question of smoke and gases created by the hero's Flame Power. It makes me wonder what kind of ventilation system the Baxter Building has... Fire Generation is the opposing Power to Cold Emission, Coldshaping, and Powers that use water. This Power gains +1CS when fighting these Powers. It also loses -1CS when being attacked by those Powers.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target"
  },
  {
    "code": "EE5",
    "name": "Hard Radiation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This covers the dangerous section of the energy spectrum: ultraviolet light, x-rays, and alpha and beta particles, gamma rays, and the ever-popular \"cosmic rays.\" The hero can project any of these types at Power rank range and damage. When creating the hero, the player can raise his rank +1CS by specializing in a particular type of hard radiation. For game purposes, we'll assume that the hero has total control over his own inherent radioactivity and possesses automatic safe-guards that prevent him from fatally contaminating the area each time he uses his Power.",
    "rulesText": "This covers the dangerous section of the energy spectrum: ultraviolet light, x- rays, and alpha and beta particles, gamma rays, and the ever-popular \"cosmic rays.\" The hero can project any of these types at Power rank range and damage. When creating the hero, the player can raise his rank +1CS by specializing in a particular type of hard radiation. For game purposes, we'll assume that the hero has total control over his own inherent radioactivity and possesses automatic safe-guards that prevent him from fatally contaminating the area each time he uses his Power. This Power is linked to Radiation Control; the player can exchange one of his other Powers for Radiation Control when creating the hero, if he so desires.\n\nEE7 Kinetic Bolt",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target",
    "optionsDefinition": {
      "powerCode": "EE5",
      "powerName": "Hard Radiation",
      "id": "hard_rad_spec",
      "label": "Radiation Scope",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "broad"
        ],
        [
          51,
          100,
          "specialized"
        ]
      ],
      "choices": [
        {
          "key": "broad",
          "label": "Full Radiation Spectrum",
          "description": "Can project any type of hard radiation at standard power rank.",
          "isSuperior": false,
          "rankShift": 0
        },
        {
          "key": "specialized",
          "label": "Specific Radiation Type (+1CS Rank)",
          "description": "Specializes in a specific radiation type with +1CS rank, damage, and range, but loses the ability to project other radiation spectrums.",
          "isSuperior": false,
          "rankShift": 1,
          "subChoiceList": [
            "Cosmic Rays",
            "Gamma Rays",
            "X-Rays",
            "Ultraviolet",
            "Alpha / Beta Particles"
          ]
        }
      ]
    }
  },
  {
    "code": "EE6",
    "name": "Heat",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate pure heat that is not necessarily accompanied by light or flame by accelerating molecular motion. This permits the hero to do rank level effects over target materials. Some Power Stunts using pure heat include: • Causing the breakdown of molecular or even atomic bonds (Amazing and Unearthly FEATs, respectively).",
    "rulesText": "The hero can generate pure heat that is not necessarily accompanied by light or flame by accelerating molecular motion. This permits the hero to do rank level effects over target materials. Some Power Stunts using pure heat include: •\n\nCausing the breakdown of molecular or even atomic bonds (Amazing and Unearthly FEATs, respectively).\n\n• \n\nNegating magnetism\n\n• \n\nNegating a target's electrical conductivity.\n\n• \n\nStrengthening materials by heat-treating.\n\n• \n\nChanging local weather by heating the air; this can cause small cyclones and electrical storms.\n\na target's\n\nBecause this Power uses pure heat, it can function in conditions that negate Flame Emission, like the absence of free Oxygen or the hero's being underwater. Beings who possess Thermal Vision or Abnormal Sensitivity can detect an infrared glow around, the hero and his target whenever he uses his Power. Heat Emission is the Nemesis of Cold Emission, Coldshaping, and Powers that use water. This Power gains +1CS when attacking those Powers and loses - 1CS when being attacked by them.\n\n•",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target"
  },
  {
    "code": "EE7",
    "name": "Kinetic Bolt",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a crude form of M30/Telekinesis. The hero can strike a target with a surge of force at Power rank range and damage. The Kinetic Bolt can be shaped as desired by the hero.",
    "rulesText": "This is a crude form of M30/Telekinesis. The hero can strike a target with a surge of force at Power rank range and damage. The Kinetic Bolt can be shaped as desired by the hero. It can be a wide cylinder, or an incredibly fine needle. Its effect is the same as if the target had been struck by a solid object of equal material strength. This Power can affect only tangible materials. It includes Resistance to Kinetic Bolts, Kinetic Control, or Telekinesis. Optional Powers are Kinetic Control and Telekinesis, which are also the Nemeses.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target"
  },
  {
    "code": "EE8",
    "name": "Light Emission",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can emit powerful bursts of light do Power rank damage at rank range. The light may be of any nature: • Normal light in any color or intensity; the hero can light the area, dispel Shadow Powers, and temporarily blind targets. • Coherent Light (lasers) do rank level heat damage as they burn into targets.",
    "rulesText": "The hero can emit powerful bursts of light do Power rank damage at rank range. The light may be of any nature: •\n\nNormal light in any color or intensity; the hero can light the area, dispel Shadow Powers, and temporarily blind targets.\n\n• \n\nCoherent Light (lasers) do rank level heat damage as they burn into targets. Lasers can also be used to carry information or to create holograms.\n\nOptic blasts do rank level damage but rather than burn a target, they act as Kinetic Bolts.\n\nThe player can raise the hero's rank upon creation by +2CS if he chooses specialization in a specific form of this Power.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "Rank areas"
  },
  {
    "code": "EE9",
    "name": "Magnetism",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate intense magnetic force. The magnetic field may be centered on the hero's body or be projected at rank range. The field can affect anything susceptible to magnetism, attracting it with Power rank Strength.",
    "rulesText": "The hero can generate intense magnetic force. The magnetic field may be centered on the hero's body or be projected at rank range. The field can affect anything susceptible to magnetism, attracting it with Power rank Strength. If the target itself is magnetic, the hero can attract it at +1CS or repel it at Power rank. The hero can induce magnetism into any materials that can sustain a magnetic field; these include ferrous materials, iron-bearing clays and plastics, and ferrous ores. The hero can do rank level damage to electronic devices by scrambling internal signals; this is especially effective against magnetic recordings and micro-chip dependent devices. This Power can affect other Powers. It can redirect Electrical Generation by a Typical Intensity FEAT if the other Power's rank is lower, a Remarkable Intensity FEAT if equal, and an Unearthly Intensity FEAT if the other Power is higher. It can disrupt Electric or Magnetic Control and Energy Sheath or Energy Body, if either are magnetic in nature. The Power has its drawbacks. It attracts some types of attacks if the hero is careless. Such attacks as Electrical Generation or anything using ferrous materials (knives, missiles) gain +2CS. This Power is its own primary Nemesis.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target / object"
  },
  {
    "code": "EE10",
    "name": "Plasma Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Plasma refers to here to a field of highly-charged particles. Common examples include the aurora borealis, the glow in a fluorescent tube, the Van Allen Belt, and the heart of a nuclear blast. Plasmas may be of any nature: fiery, magnetic, electrical, radioactive, or be of a previously unknown form of energy.",
    "rulesText": "Plasma refers to here to a field of highly-charged particles. Common examples include the aurora borealis, the glow in a fluorescent tube, the Van Allen Belt, and the heart of a nuclear blast. Plasmas may be of any nature: fiery, magnetic, electrical, radioactive, or be of a previously unknown form of energy. This last group includes many super-powers, living energy fields, and beings who can transform themselves into pure energy. The hero can project Plasma fields at Power rank range. Due to the unique nature of this Power, it does damage on two levels. The primary level is brute force; the field does Power rank damage There are also side-effects based on the nature of each Plasma bolt. Plasma fields have two of the following side effects: •\n\nLight at -2CS level of illumination\n\n• \n\nHeat at -2CS damage\n\n• \n\nFlame at -2CS damage\n\n• \n\nHard Radiation at -2CS damage\n\n• \n\nMagnetism at -2CS damage but full Power rank range\n\n• \n\nElectricity at -2CS damage.\n\nThe hero initially possesses a single type of Plasma with two set sideeffects that occur each time he uses his Power. Later he can develop other Plasmas with different sideeffects as Power Stunts. Plasma is a Nemesis to the Powers of Energy Sheath and Energy Body. The hero gains +1CS when attacking either Power. Plasma's own Nemeses are Plasma Control and Power Control.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target"
  },
  {
    "code": "EE11",
    "name": "Radiowave Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate radiowaves, including AM and FM signals and microwaves. This Power primarily affects broadcasting and electronics; the Power can do rank damage over rank range to these. The Power can also be used to directly affect any target by internally heating it through microwave bombardment.",
    "rulesText": "The hero can generate radiowaves, including AM and FM signals and microwaves. This Power primarily affects broadcasting and electronics; the Power can do rank damage over rank range to these. The Power can also be used to directly affect any target by internally heating it through microwave bombardment. Used in this manner, the Power has -2CS on its damage and range. Optional Powers include Radiowave Control, Energy Sheath, and Carrier Wave. Nemeses include Radiowave Control, Energy Absorption, and Force Field vs. Energy.\n\nIntensity. The energy forms that can be affected by this Power are Light, Heat, Hard Radiation, Radiowaves, Energy Doppelgangers, and Energy Bodies. The hero possesses the ability to affect only Light when his Power is at Good rank. At each rank above Good, he gains the ability to affect another energy form in the following order: EX-Heat, RM-Hard Radiation, IN-Radiowaves, AM-Energy Doppelgangers, MN- Energy Bodies. This Power includes the ability to see clearly through his own natural or Powercreated shadows of Intensity less that the hero's Power rank. The Power can disrupt Darkforce Manipulation on a Typical Intensity FEAT if its rank is higher than that of the Darkforce manipulator, Remarkable Intensity FEAT if they are equal, and Unearthly Intensity FEAT if the Power's rank is lower. Optional Powers include Shadowshaping and Darkforce Manipulation. The Nemesis is Light Emission.\n\nsonic- or vocal-based Power. The hero can cause tremors at Power rank range and damage. The Power can even be used to incapacitate living targets; effects can vary from motion sickness (nausea and vomiting) to death by internal hemmorhaging. This Power includes Resistance to Vibratory attacks. Optional Powers include Vibration Control and Sonic Generation. Some possible Power Stunts include: •\n\nForming a vibratory shield that can provide up to +2CS protection. The vibrations make the hero harder to hit as weapons are thrust aside by the field. At higher ranks it can even cause the weapon's own structure to collapse.\n\n• \n\nNegating vocal powers by sending the hero's own vibrations into the target's larynx. For example, your hero could reduce Lorelei's song to a gurgle.\n\n• \n\nThrowing machinery out of kilter by vibrating delicate components.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "EE12",
    "name": "Shadowcasting",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can emit a field that decreases light and radiation. The obscured energy's Intensity is lowered by the Power's rank taken as Intensity. The energy forms that can be affected by this Power are Light, Heat, Hard Radiation, Radiowaves, Energy Doppelgangers, and Energy Bodies.",
    "rulesText": "The hero can emit a field that decreases light and radiation. The obscured energy's Intensity is lowered by the Power's rank taken as",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "EE13",
    "name": "Sonic Generation",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate intense sound and make attacks of Power rank range and damage. This Power can generate frequencies normally inaudible. The hero can disrupt other sound-based Powers by creating dissonance as his harmonics clash with the second Power's harmonics.",
    "rulesText": "The hero can generate intense sound and make attacks of Power rank range and damage. This Power can generate frequencies normally inaudible. The hero can disrupt other sound-based Powers by creating dissonance as his harmonics clash with the second Power's harmonics. The hero's own rank is subtracted from the target harmonic's Intensity. Optional Powers include Sonic Control, Vibration, and Vibration Control. Nemeses are this Power itself and the three just listed. The Power needs a medium to carry the sound, whether gaseous, liquid, or solid. It cannot function in a vacuum unless the hero is touching a solid through which he can transmit his Power. This Power can be used in tandem with the Power of Speech Throwing to permit Sonic Generation to affect even unconnected targets in a vacuum.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "areaOfEffect": "1 area",
    "targets": "All in area"
  },
  {
    "code": "EE14",
    "name": "Vibration",
    "category": "Energy Emission",
    "source": "UPB Table p. 16-19 & Entry EE14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate non-audible vibrations. These can alter existing harmonics, effectively negating any sonic- or vocal-based Power. The hero can cause tremors at Power rank range and damage.",
    "rulesText": "The hero can generate non-audible vibrations. These can alter existing harmonics, effectively negating any\n\nFighting Powers Die Roll\n\nFighting Power\n\n(Code)\n\n01-20 21-60 61-75 76-80 81-00\n\nBerserker Martial Supremacy Natural Weaponry Weapons Creation* Weapons Tinkering\n\nF1 F2 F3 F4 F5",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target"
  },
  {
    "code": "F1",
    "name": "Berserker",
    "category": "Fighting",
    "source": "UPB Table p. 16-19 & Entry F1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can enter into a battle rage that alters the hero in some significant ways. Reason and Psyche plummet to Feeble rank while the ranks for Strength and Fighting increase by the same number of ranks. (That is, the total number of points lost are split evenly between the Fighting and Strength ranks.) The hero also develops Iron Will for the duration of the Berserker rage; the rank for this is the same as the Berserker Power's rank.",
    "rulesText": "The hero can enter into a battle rage that alters the hero in some significant ways. Reason and Psyche plummet to Feeble rank while the ranks for Strength and Fighting increase by the same number of ranks. (That is, the total number of points lost are split evenly between the Fighting and Strength ranks.) The hero also develops Iron Will for the duration of the Berserker rage; the rank for this is the same as the Berserker Power's rank. The Berserker lasts for the length of combat and 10 turns. When the rage ends, all the altered Abilities return to their original ranks. Since the Iron Will also disappears, the hero finally feels the effects of any damage he suffered while in the Berserker rage. Example: Orlando the Furious has Feeble Strength, Good Fighting, Remarkable Reason, Incredible Psyche and Excellent Berserker Power. When he enters the Berserker rage, the following occurs. Psyche and Reason drop to Feeble, a total of 66 points. This is between Orlando's Strength and Fighting ranks. Strength increases to Remarkable, Fighting to Incredible. Finally, he develops Excellent Iron Will. The carnage that ensues is short and messy. Orlando emerges victorious but remains rather dangerous to be around for another 10 turns (5 minutes). The Optional Power is Natural Weaponry. Thus, you can build your own Wolverine (or other violent, crotchety animal from the northwoods). The Nemesis Power for this is Mental Domination.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "F2",
    "name": "Martial Arts Supremacy",
    "category": "Fighting",
    "source": "UPB Table p. 16-19 & Entry F2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Increases a hero's martial mastery to superhuman levels: this Power's rank number is added directly to the hero's Fighting ability rank (along with all applicable Column Shifts for martial arts talents), and allows rank-level damage against non-living matter (e.g. concrete, iron) with a Red FEAT.",
    "rulesText": "In the MARVEL SUPER HEROES game system Fighting is considered an Ability, not a Power. However, this Power increases a hero's alreadymastered Martial Arts (a Talent in the game system) to dramatically higher levels and allows him to perform actions that would otherwise be impossible, like splitting a battleship in two with a single karate chop. Martial Arts as explained in the Advanced Set falls into five categories labeled A through E for simplicity's sake: •\n\nA-This form uses the opponent's Strength against him and permits the hero to Stun or Slam an opponent regardless of their relative Strengths and Endurances.\n\n• \n\nB-This form is keyed to offense by inflicting damage by short, quick bursts. The hero gains +1CS Fighting when engaged in unarmed combat.\n\n• \n\nC-This form concentrates on holds and escapes. The hero gains +1CS to his Strength when Grappling or Grabbing and +1CS to his Agility when dodging.\n\n• \n\nD-This form seeks out the opponent's weak points and strikes at them. The hero can ignore the effects of physical Armor when determining Stun and Slam results. Unfortunately, the hero must study his opponent for two turns before he can bring this effect into play. •\n\nE-This form encourages quick striking to catch an opponent off-guard. The hero gains + 1 to initiative rolls when engaged in unarmed combat.\n\nThe player chooses one of the above Martial Arts and determines its rank when he creates the hero. When this Power shows up, add its Power rank number to the already determined Talent rank number. For example, the Kung Fu Kommando possesses Martial Arts E at Typical rank and Martial Arts Supremacy at Good rank. These combine to give Kung Fu Kommando an Excellent rank for his Martial Arts. Martial Arts Supremacy can be used to do rank-level damage against nonliving matter. For example, Kung Fu Kommando can shatter iron, concrete, or bullet-proof glass with a red Power rank FEAT. If desired, this Power can be modified to fit any Fighting skill the prayer can imagine. This can include Supremacy in any one weapon, such as swordsmanship or archery. Optional Powers include Iron Will and Weapons Creation. The Nemesis Power is Martial Arts Supremacy of one rank higher than that possessed by the hero.",
    "errataNote": "System Ruling & Canon: In the 1986 Player's Book, Talents are binary proficiencies granting Column Shifts (+1CS/+2CS) or enabling FEATs, without independent rank ratings. In UPB Entry F2, author David Cook wrote that the Power rank number adds to the 'Talent rank number'. To reconcile this seamlessly with core MSHRPG rules, this Power's rank number is added directly to the hero's Fighting ability rank, and all fighting talent Column Shifts (e.g. +1CS for Martial Arts B) apply on top of the augmented rank.",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Close Combat",
    "duration": "Permanent"
  },
  {
    "code": "F3",
    "name": "Natural Weaponry",
    "category": "Fighting",
    "source": "UPB Table p. 16-19 & Entry F3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero's body contains special anatomical features that can function as weapons. These may be of any nature and can be external, internal, or retractable. If these are damaged the hero suffers as if they were normal body parts.",
    "rulesText": "The hero's body contains special anatomical features that can function as weapons. These may be of any nature and can be external, internal, or retractable. If these are damaged the hero suffers as if they were normal body parts. When creating the hero, the player decides the nature of the weaponry. The weaponry chosen possesses this Power and rank taken as material strength for purposes of determining potential damage. Each time the player rolls this Power, he can add another weapon to the hero. As stated in the Player's Book, some forms of Natural Weaponry provide Bonus Powers (see \"Claws\" and \"Extra Body Parts\"). These are placed in the next available slot in the Power Generation. The player and the Judge need to work together to create a functional hero. A drawback to this Power is that if the hero is somehow deprived of his Natural Weaponry, he suffers a loss to his Fighting Ability equal to his weapon's rank. Example: Due to a mishap with a matter transmitter, Wolverine temporarily loses his claws. He's so shaken that his normal Incredible Fighting Ability drops to Feeble. If the Natural Weaponry is made of materials not normally found in the body, it makes the hero vulnerable to attacks that affect those materials. For instance, Wolvie has a - 1 CS resistance to Magneto's powers, since they can affect his metal skeleton.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Close Combat",
    "duration": "Permanent",
    "optionsDefinition": {
      "powerCode": "F3",
      "powerName": "Natural Weaponry",
      "id": "natural_weapon_type",
      "label": "Natural Weapon Form",
      "canRoll": true,
      "rollTable": [
        [
          1,
          20,
          "claws"
        ],
        [
          21,
          40,
          "fangs"
        ],
        [
          41,
          60,
          "horns"
        ],
        [
          61,
          80,
          "tail"
        ],
        [
          81,
          100,
          "spines"
        ]
      ],
      "choices": [
        {
          "key": "claws",
          "label": "Claws / Retractable Blades",
          "description": "Edged melee attack (Fighting to-hit, Touch range, deals Edged damage with Stun/Kill potential).",
          "isSuperior": false,
          "effects": {
            "actionType": "edged",
            "abilityName": "Fighting",
            "range": "Touch",
            "damageType": "Edged"
          }
        },
        {
          "key": "fangs",
          "label": "Fangs / Bite",
          "description": "Piercing melee attack (Fighting to-hit, Touch range, deals Piercing damage).",
          "isSuperior": false,
          "effects": {
            "actionType": "edged",
            "abilityName": "Fighting",
            "range": "Touch",
            "damageType": "Piercing"
          }
        },
        {
          "key": "horns",
          "label": "Horns / Bony Crest",
          "description": "Blunt / Charging melee attack (Fighting to-hit, Touch range, deals Blunt damage).",
          "isSuperior": false,
          "effects": {
            "actionType": "slugfest",
            "abilityName": "Fighting",
            "range": "Touch",
            "damageType": "Blunt"
          }
        },
        {
          "key": "tail",
          "label": "Tail / Mace-Fist",
          "description": "Blunt melee attack (Fighting to-hit, Touch range, deals Blunt damage).",
          "isSuperior": false,
          "effects": {
            "actionType": "slugfest",
            "abilityName": "Fighting",
            "range": "Touch",
            "damageType": "Blunt"
          }
        },
        {
          "key": "spines",
          "label": "Spines / Quills (Ejectable)",
          "description": "Shooting ranged attack (Agility to-hit, Area range, deals Shooting damage).",
          "isSuperior": false,
          "effects": {
            "actionType": "shooting",
            "abilityName": "Agility",
            "range": "rank",
            "damageType": "Shooting"
          }
        }
      ]
    }
  },
  {
    "code": "F4",
    "name": "Weapons Creation",
    "category": "Fighting",
    "source": "UPB Table p. 16-19 & Entry F4",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create any desired weapon out of thin air. The weapon can be of any design, size, and material. The size of the weapon is limited by its weight.",
    "rulesText": "The hero can create any desired weapon out of thin air. The weapon can be of any design, size, and material. The size of the weapon is limited by its weight. The hero can only create in a single turn a maximum number of ounces equal to his Power rank number. Heavier weapons have to be assembled in pieces over a span of several turns. While the material strength of the created weapon is the same as that of a normally-manufactured weapon of the same type, its duration is much shorter. The lifespan of the weapon is determined at the time of creation. A Typical Intensity FEAT gives the weapon a lifespan of 100 turns times the hero's Reason rank number. On an Amazing Intensity FEAT, the weapon lasts for the hero's Reason rank number times 10,000 turns. Should he make an Unearthly Intensity FEAT, the weapon will be permanent. Each ounce of created matter temporarily costs the hero 1 Health point. All points lost in this manner are regained after 24 hours. Thus, the hero can only create a weapon weighing the number of ounces equal to his Health score in a single day. The hero must have-detailed knowledge of any weapon he wants to create. He can only store a limited number of weapons' designs in his memory. The total number of memory slots available to this Power equals the hero's Reason rank number. The player must keep a record of the weapons he can create. This list can be changed at any time. A green Reason FEAT gains the hero a new design. If no open memory slots are available, an old design is tossed away to make room for the new one. Normally, the Power is used to make facsimiles of existing weapons. The hero must make a detailed study of the weapon for at least 10 minutes before attempting a FEAT. Failure to make the FEAT means the hero must spend another 10 minutes studying the weapon before attempting another FEAT. Some weapons might be beyond the hero's comprehension, if the player has really bad luck when rolling the dice. The hero can create new weapons based solely on his imagination and basic knowledge of weapons design. This requires intense concentration and a red Power rank FEAT. The newly created weapon has the same characteristics as a normally created one of its type. In the case of altered or imaginary weapons, the player and Judge should agree on a reasonable and playable set of characteristics for the weapon in question. The Power includes versions of Elemental and Molecular Creation. Each element or compound takes up its own memory slot, just like the throwing daggers and broadswords that clutter the hero's mind. Such raw matter can be formed into any weapon's shape. This permits the hero to change the composition of any already-memorized designs. For example, if he has already memorized the design of an arrow and the nature of silver he can create both wood and steel arrows and silver arrows. Weapons created materialize in the hero's hands. There is an exception to the rules thus far. When creating the hero, the player can choose to specialize in creating a single copy of a special weapon. In this case, the weight limit is raised from one ounce per Health point to one pound per Health point. Such special weapons are never permanent; Unearthly Intensity FEATs are treated the same as Amazing Intensity ones. One example of this option is Magik's Soulsword. The Optional Power for this is a form of Martial Arts Supremacy that uses a special weapon, as in the option explained above. The Nemesis Power is True Invulnerability.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Self",
    "duration": "Maintained",
    "targets": "1 weapon"
  },
  {
    "code": "F5",
    "name": "Weapons Tinkering",
    "category": "Fighting",
    "source": "UPB Table p. 16-19 & Entry F5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can devise and assemble any weapon that can be made with the available materials. By means of a red FEAT, the hero can even improvise a means of creating unavailable materials (adamantium, for example). Provided he has the resources, the hero can assemble a functional copy of any weapon.",
    "rulesText": "The hero can devise and assemble any weapon that can be made with the available materials. By means of a red FEAT, the hero can even improvise a means of creating unavailable materials (adamantium, for example). Provided he has the resources, the hero can assemble a functional copy of any weapon. As to what weapons he can make, use the Resource costs listed in the Hardware section of the Player's Book. Compare the Power's rank with the cost of the desired weapon. Equal or lower cost weapons can be created on a green FEAT. A cost of one to three levels higher requires a yellow FEAT. A cost of four to six levels higher requires a red FEAT. If the cost of the desired weapon is more than six levels higher than the hero's Power rank, it is an impossible FEAT. Example:\n\nDr.\n\nFixit has\n\nExcellent Weapons Tinkering and access to his brother-in-law's junkyard. He wants to build a battle-copter with adamantium armor. The copter has an Amazing cost. True adamantium has a Shift X cost; secondary adamantium has an Unearthly cost. Dr. Fixit makes the yellow FEAT; his copter will work. He doesn't have any adamantium, though, and tries to improvise. He fails to make a red FEAT; neither batch of \"home-brewed\" adamantium worked. Oh well, he can always convert that old boiler he found into armor plate. When creating the hero, the player can choose to make the character a jack-of-all-trades or specialist in a particular field. If he chooses to specialize, he can raise the rank + 2CS. Categories of weapons include: •\n\nEdged and Blunt weapons\n\n• \n\nProjectile weapons\n\n• \n\nEnergy weapons\n\n• \n\nHeavy weapons\n\n• \n\nBattle weapons\n\n• \n\nAlien weapons\n\n• \n\nBattlesuits\n\n• \n\nWar robots\n\nNeedless to say, the player will have to develop stats for anything he comes up with. If he successfully copies existing technology, like the Iron Man battlesuit or a SHIELD Plasma Beam Handgun, he can simply use the established stats for that device. Weapons Locker (MHAC8) by Epperson and Grubb is a valuable aid to the player of a hero with this Power. A clever character can also use this Power to make money off of other characters by building weapons on commission. After all, somebody's got to be building all those super-weapons that fill the pages of comic books...\n\nIllusory Powers Die Roll\n\nIllusory Power\n\n(Code)\n\n01-15 16-70 71-85 86-00\n\nAnimate Image Illusion-Casting* Illusory Invisibility Illusory Duplication\n\nI1 I2 I3 I4",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Permanent",
    "targets": "1 weapon"
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
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Permanent",
    "targets": "1 weapon"
  },
  {
    "code": "I1",
    "name": "Animate Image",
    "category": "Illusory",
    "source": "UPB Table p. 16-19 & Entry I1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a specialized form of Illusion-casting that enables the hero to apparently bring any flat image to life. Whatever the original nature of the image—drawing, painting, photograph, print—the image gains three-dimensionality and independent movement. A blank white area now fills the area formerly occupied by the newly solidified Image.",
    "rulesText": "This is a specialized form of Illusioncasting that enables the hero to apparently bring any flat image to life. Whatever the original nature of the image- drawing, painting, photograph, print- the image gains threedimensionality and independent movement. A blank white area now fills the area formerly occupied by the newly solidified Image. In actuality, the hero has created two Illusions. The obvious one is the Animated Image that has peeled itself away from its flat background and filled out into three dimensions. The second, more subtle Illusion is the \"blank white area.\" The hero automatically casts this Illusion to mask out the still-existent - original picture; this secondary Illusion lasts for 10-20 turns or until the primary Illusion ceases to exist, whichever comes first. The initial range at which the hero can Animate an Image is line-of-sight for one area. This is also the maximum range at which the hero can normally maintain the \"realism\" of the Image. Simply put, the hero has to be able to clearly see both the Image and its surroundings. When either is beyond his vision, the believability of the Image drops drastically. When the Image gets beyond the hero's field of clear vision, he can no longer make it realistically conform to the surroundings. Example: Kinescope Animates a lion off of a circus poster and sends it after some muggers. The muggers flee around a corner, the lion in pursuit. Unbeknownst to Kinescope, the alley is full of trash cans, which the lion blithely passes through. The muggers see this and realize they've been had. Kinescope gets a surprise when he comes around the corner. The Image can exist for as long as the hero concentrates on maintaining it (the Judge is free to determine how easily this can be done given the circumstances the hero finds himself in). Although the Image can only be realistically controlled within one area of the hero's location, the Image can be projected up to the full range for this Power. Once beyond the one area limit, ,he Image is easily perceived by others as a holographic projection. The hero can overcome this limit by extending the range of his own senses, either through artificial means (telescopes, remote TV camera, etcetera) or by using sense extending Powers. In such cases, the hero can extend realistic control of the Image up to the range limits for this Power and whatever means he employs to extend his vision. Example: Kinescope has an Excellent rank for this Power and can project an Image up to 25 areas (3300 feet) away. He also has Good Clairvoyance with a maximum range of 2500 miles. By using both Powers, he can maintain the realism of his Images up to the maximum range of 25 areas even through any vision- blocking barriers. The Image possesses whatever abilities or characteristics the original model possessed. At least, it possesses those abilities or characteristics the hero believes the model possessed. This is after all an Illusion that the hero has created * As such, it conforms to his expectations. What traits the Image has are determined by the hero's imagination and memory for detail. The accuracy of the Image is determined by the hero's Reason. A green FEAT creates an Image that is somehow flawed; it might move the wrong way, lack a shadow, have no surface detail, and so on. A yellow FEAT creates an Image that are nearly exact; a close visual examination is required to distinguish the Image from reality. A red FEAT creates a perfect Illusion. The typical Animated Image is an intangible holographic projection. Since most people rely 'exclusively on their vision as the means of sensing their environment, the Animated Image is easily accepted as reality. Only when other senses are used does the Image get exposed as Illusion. Such Images are mechanically detectable and recordable by such means as photography and television. Images can also deceive the artificial senses of mechanical beings. The Animated Image is initially strictly composed of light. It lacks the other sensory details of a real object, most notably the sounds and smells of the original. These can be simulated to give the Animated Image greater reality. The Talent of Ventriloquism or such Powers as Speechthrowing or Vocal Control can add speech and incidental noises to the image. Sensory Manipulation can create, deceptions of smell, temperature difference, and even tactile sensations. The coherent light of the Image blocks normal light and creates normal shadows. Since the Image is intangible, it cannot directly do physical damage to a target. If the Image incorporates bright light, it has the potential of blinding the target. How ever, if the hero possesses certain other ??that can be combined with the ?? then it can do actual damage. If ?? also uses Energy Solidification or any of the Matter Creation Powers, the Image gains temporary solidity. This lasts for 1 -10 turns, regardless of the normal duration of effect for the supplementing Power. Note: this is determined by the Judge, not the player. Any of the Energy Emission Powers can be apparently redirected through the Image. For example, if the hero possessed both Animate Image and Fire Generation, he could create a hazardous simulation of the Human Torch. This Power can be combined with certain Psionic Powers to create Images that do psychosomatic damage to a target. These Psionics, include Telepathy, Mental Domination, Hypnotic Control, and Neural Manipulation . Psychosomatic damage occurs because the target believes in the reality of the Image and thus the. -reality of any damage the Image is inflicting upon him. For example, Kinescope combines his Powers of Animate Image and Neural Manipulation to create an Image of a boa constrictor. The boa enwraps Kinescope's opponent, who believes he is being crushed and passes out from his imagined loss of breath. Psychosomatic damage can be resisted by any target who becomes aware of the Image's lack of reality. Be warned that psychosomatic damage can lead to fatal results if the target succumbs to a heart attack or stroke. Note also that psychosomatic damage cannot affect non-sentient minds. Animated Images can be of any nature, but are generally used to simulate moveable objects and lifeforms. In all cases, the hero must have an actual image to work from. The Animated Image that results is the same size as the original image. Not all of the model has to be present in the original image; the hero can fill in the rest from his imagination. As he brings the Animated Image to life, it climbs out of the frame, revealing previously unshown parts.\n\nFor example, Kinescope Animates a head-andshoulders portrait of Lincoln. The visible parts immediately spring out; the rest of Abe's body is revealed as he climbs out of the frame. Animate Image can be used to alter images within the plane of the original picture. The hero can alter the placement of sections of the picture or give them flat animation, even making sections of the picture apparently withdraw from the depicted scene. While the previous commentary has spoken of this Power in terms of translating two dimensional images to three-dimensional objects, it can also be used to simulate animation for already three- dimensional objects, like statues or stuffed animals. This can be developed as a Power Stunt. The hero uses an existing object for a model to base his Illusions on. The primary Illusion is the statue or whatever coming to life; the secondary Illusion renders Illusory Invisibility around the original. The characteristics for the Image are a combination of the statue's material composition and those traits the hero imagines the model for the statue possessed. Example: Kinescope encounters thieves outside the Cleveland Art Museum. He casts his Power on Rodin's bronze, \"The Thinker,\" that sits in front of the museum. The Image that results is a 15-foot-tall man made entirely of bronze and consequently extremely strong and heavy. By using his Power in this way, the hero can simulate any of the Matter Animation, Control, and Conversion Powers. Optional Powers include either Telescopic Vision or Clairvoyance, Energy Solidification, and either Elemental or Molecular Creation. The Nemesis Powers are either Sonar or Radar, combined with temporary blindness.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "I2",
    "name": "Illusion-Casting",
    "category": "Illusory",
    "source": "UPB Table p. 16-19 & Entry I2",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create realistic holographic images that have apparent solidity. These Illusions can be mechanically detected and recorded by such means as photography or television. That separates this Power from the psionic, image-generating Power called Hallucinations, which produces images directly in the target's mind and cannot affect mechanical senses.",
    "rulesText": "The hero can create realistic holographic images that have apparent solidity. These Illusions can be mechanically detected and recorded by such means as photography or television. That separates this Power from the psionic, image-generating Power called Hallucinations, which produces images directly in the target's mind and cannot affect mechanical senses. The Illusion can take any size or appearance the hero desires and is limited only by his imagination. The Illusion can be a realistic simulation, a fanciful creation direct from the hero's mind, or an abstract display of light. The hero is playing with light itself and can create anything that is visible. Since most people depend. on vision to gain information on their surroundings, this Power presents the awesome ability to apparently alter the nature of reality. The hero can cast his Illusions anywhere within his Power rank range, though he must be able to clearly see the area where the Illusion is forming if he wants to make it at all realistic. The normal limit for unaided vision is one area (132 feet). Beyond that range the hero can no longer clearly see his Illusion's surroundings and thus cannot alter the Illusion to reflect things going on around the Illusion. For example, an Illusionary tree cast two areas away might seem to be floating a discreet two inches above the ground. If the hero is unconcerned about maintaining the reality of his Illusions, this limit can be ignored. The hero does not even need to be able to see the Illusion as it forms. Such uncontrolled Illusions appear as transparent, freefloating apparitions. If the Illusion takes the form of a living being, viewers might see it as a ghost or other phantom form. If the hero possesses a means of extending the range of his senses, he can maintain the realism m of his Illusion at up to full range of both this Power and that of whatever means he uses to extend his vision. Ways of increasing the senses' range include mechanical means such as binoculars and Telescopic Vision and Clairvoyance. Example: Deetee has an Incredible rank and can Illusion-Cast up to two miles away. She also has a good pair of binoculars that enable her to see up to one mile away. For idle am ement, she likes to go to the top of tall- uildings and Cast Illusions at-the pedestrians below. She also like to find the monitors for remote surveillance cameras and use them to direct her Illusions into locked rooms. Illusions last as long as the hero concentrates on maintaining their existence. The Judge is free to determine how long the hero can maintain his concentration in a given circumstance. Breaking the hero's concentration abruptly terminates the Illusion, while mereiy getting distracted causes the Illusion to begin to 'lose realism (drift, lose detail, become translucent, and so on). The Illusion's effect on a viewer varies. A viewer must make an Intuition FEAT against the Power rank of the Illusioncaster; success means the viewer now recognizes the Illusion's true nature. Players running characters viewing an Illusion are only allowed to make a FEAT if they suspect the Illusion. This can cccur if they physically touch the Illusion, if the Illusion is somehow flawed, or if the character is just naturally cynical. (\"Congratulations, Les. So far this morning you have attempted to disbelieve the existence of a flying saucer, Galactus, two muggers, and your breakfast.\") . Since Illusion-Casting includes the Power of Light Control, Illusions can provide a measure of protection against light-based attacks. An Illusory tent would provide protection against both infrared and ultraviolet light, thus keeping the hero cool and safe from sunburn. Treat this Power as + 2CS Resistance to light-based attacks. It does not provide protection against any of the other ways Moms Nature has of affecting us. That Illusory tent would be drafty, cold, and flimsy. with other Powers to give 1he Illusion enhanced realism; this can also create Illusions that do real physical damage. If the Illusion- caster has any of the Energy Emission Powers, these can be redirected to apparently originate from the Illusion rather than from the hero. For example, combining this Power with Plasma Generation would simulate the Phoenix-force and fry any electronics in the area. More commonly, the power is used to disguise the true nature of anything the hero or her companions might be doing. Example: Deetee and her buddy Jayboy have to break into a certain building that they know is under surveillance. Deetee doesn't care about subtlety, only About distraction, and casts an Illusion of a,.Jarge elephant that comes lumbering around a corner and lies down in front of the door. Inside the elephantine Illusion, Jay-boy is free to use his Kinetic Bolt Power to smash open the door. He also uses his K-bolts to simulate the effect the elephant's legs have when they kick against a target.\n\nPower's true nature a secret from his adversaries. It must be presented as if it were another Power entirely.\n\nis an Illusion- caster, Deetee often presents herself as a Demon-Summoner.\n\nknowledge, the Power is still effective. The Powers of Light Emission and Light Control are innate factors of Illusion-Casting. As such, the hero has the ability to generate any intensity and frequency of light. He can warp light, alter its frequency, and change its degree of coherency. The hero can do - 2CS rank level damage using light-based attacks. As noted earlier, the Power includes 2CS Resistance to Light- based\n\nIllusion of something opaque between herself and the offending light. The hero can simulate other visual Powers or Talents with some effectiveness as well; the - 2CS limit is used as a guide for determining how well the hero can do these things. Example: Once inside the building, Deetee and Jayboy discover a guard. Deetee casts an Illusion of Ringmaster and tries to hypnotize the guard. Her Incredible rank is reduced to merely Excellent when she tries simulate Hypnotic Control. Fortunately that is enough; the guard falls under the spurious Ringmaster's control. Powers that are a part of or can be simulated by Illusion-Casting include: • D4 Force Field vs. Energy • D12 Resistance to Energy • DT3 Energy Detection (Light) • EC14 Light Control • EC18 Shadowshaping • EE5 Hard Radiation Emission (UV Light) • EE6 Heat Emission (Infrared Light) • EE8 Light Emission • EE12 Shadowcasting • I1 Animate Image • I3 Illusory Invisibility • I4 Illusory Duplication • L9 Hypnotic Control • MCo1 Coloration • M13 Hallucinations • S6 Blending • S14 Energy Sheath (Light) • S28 Self-Vegetation • S29 Shapeshifting this Power is that they tend to become philosophical about the relationship between Reality and Illusion. Companions find themselves drawn into interminable arguments about what is real and what is not. Illusion-Casters may even begin to feel that they themselves are an Illusion being cast by some unknown",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "targets": "All in area"
  },
  {
    "code": "I3",
    "name": "Illusory Invisibility",
    "category": "Illusory",
    "source": "UPB Table p. 16-19 & Entry I3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is not true Invisibility but is actually a clever simulation. The effects are nearly the same, anyway; the hero becomes effectively invisible to any living or artificial being. The hero actually remains visible but he can now surround himself with a holographic Illusion of empty space.",
    "rulesText": "This is not true Invisibility but is actually a clever simulation. The effects are nearly the same, anyway; the hero becomes effectively invisible to any living or artificial being. The hero actually remains visible but he can now surround himself with a holographic Illusion of empty space. This field can be limited to the hero's body or increased to cover a large area. The maximum radius of this effect is the number of feet equal to the Power rank number. For example, a Poor rank could cover an area extending four feet from the hero, a Monstrous rank could cover an area extending 75 feet, and a Class 1000 rank could cover a square mile. Within the, Illusory Invisibility, things remain visible. From the point of view of anyone within the Power's protection, it appears that the area has been surrounded by - a irregularly-shaped transparent balloon that causes weird tricks of light. Outside the \"balloon\" a viewer sees only the Illusion of empty space, even if the viewer has just stepped out of the invisibility field. Standing at the edge of the field can result in a headache as the viewer's eyes see both the reality and the Illusion. This Power can be cast at a target point some distance away. The area limill is the same. The maximum range at which the Illusory Invisibility can appear is determined by the Power rank. For example, a Monstrous rank permits the hero to hide an area 150 feet wide (75 foot radius, remember?) located up to six miles away. Of course, the hero has to be able to see his intended target; otherwise he would be unable to simulate the appearance of emptiness appropriate to the target area. When casting this Power at ground level, a practical limit to range is one area (132 feet) from the hero. Casi!ng an Illusory Invisibility in the air or in space is easier and can be done at rank level range. Note that as this is an Illusion, it can be detected by careful visual examination or the simplest of physical tests. The \"empty space\" is only what the hero imagines such an empty space to look like. As the hero tries to hide more area, the problems of realism multiply. If the Illusory Invisibility and the viewer move in relationship to each other, the viewer might be able to detect a slight distortion of light at the edge of the field. (The player can imagine it by thinking of a clear drinking glass.) Example: Consider an airship surrounded by a mechanically created version of Illusory Invisibility. Inside the airship, vision is unaffected. The crew can clearly see the world below. The field extends one foot around the airship. From the ground and sides the ship is invisible. The flaw is when the field is viewed from above; a viewer sees the ground below but may realize that the surface detail is not continuous. Rivers And roads have sudden, unexplained gaps. Since the Invisibility is holographic in nature, it can be mechanically detected and recorded by such means as photography, television, and the mechanical senses.of artificial oeings. It can also be seen at any distance and will deceive telescopes, remote cameras, and Telescopic Vision used outside the field's effect. Sensory Link can be deceived if that Power is used to link up with a viewer outside the field; if it is used to link with someone inside the field, the deception fails. Clairvoyance cannot detect Illusions at all and thus would also penetrate the deception. The Power cannot deceive any of the other senses or such Powers as Sonar, Radar, or Psionics. For example, Daredevil would be unaware of such a field even being employed; this can lead to Problems for Matt Murdock. (\"What I don't understand, DD, is how did you know the Dreadnought wasn't real?\") The Power provides limited protection against light-based attacks originating outside the field. This is equivalent to a Force Field vs. Light with a -2CS rank. For example, a Good form of this Power provides Poor protection against lasers and hypnotic lights. The main protection it offers is that if the viewer doesn't know there is something to shoot at, then he won't shoot. The Invisibility lasts as long as the hero can maintain his concentration. In the case of mechanically-derived Invisibility, it lasts for as long as the equipment functions. Judges are free to decide the difficulty of either case in any given circumstance. For example, the Judge decides that the abovementioned airship's Invisibility Generator can function for up to ten hours of continuous operation but shuts down if it receives a single jolt of electricity with Amazing Intensity. The hero can terminate his Invisibility at any time, either purposely or accidentally. Simple physical contact can alert a viewer to the hero's presence, whether the hero accidentally envelops him in the field or the hero makes a distance attack at the target. A spray of a coating material will temporarily reveal the extent of the field; in the middle of an obscuring cloud, the field shows as a silhouette of clear air. Once the hero realizes that his field is visible, he can correct the Illusion to reflect the new addition to his surroundings; this takes a green Intuition FEAT. Note: the Judge should roll this for the hero without telling the player he has become visible; failure means the hero has either not yet realized his predicament or has not yet gotten the Illusion properly altered. Optional Powers include Light Control and Light Emission. Nemesis Powers include Light Control, Radar, and Sonar.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or Touch",
    "duration": "Maintained",
    "targets": "Self or 1 target"
  },
  {
    "code": "I4",
    "name": "Illusory Duplication",
    "category": "Illusory",
    "source": "UPB Table p. 16-19 & Entry I4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a specialized form of Illusion-Casting that permits the hero to generate completely realistic simulations of a single object, namely himself. Unlike the other Illusory Powers, this permits the hero to see through these nonexistent senses and to communicate through apparently normal speech. The hero can create a finite number of exact holographic duplicates of himself.",
    "rulesText": "This is a specialized form of Illusion-Casting that permits the hero to generate completely realistic simulations of a single object, namely himself. Unlike the other Illusory Powers, this permits the hero to see through these nonexistent senses and to communicate through apparently normal speech. The hero can create a finite number of exact holographic duplicates of himself. These are Illusions based on his selfimage, which the hero had best make sure matches his actual appearance at that moment. The accuracy of the Duplicate is determined by a Reason FEAT made at the time the Duplicate is generated. A green Reason FEAT means the Illusory Duplicates are somehow different from the hero; they have the wrong outfit on, are too muscular or handsome, and so on. A yellow or red Reason FEAT produces a perfect copy. The maximum number of simultaneous Duplicates the hero can create is equai to his Power rank number. Although Duplicates are frequently used to surround the hero and act as decoys, the Duplicates can also function several areas or miles away from the hero. The maximum range at which the hero can either send or create a Duplicate is determined by his Power rank; specific levels are shown on column B on the inside cover. Example: Myriad has an Incredible rank. This enables him to create up to 40 simultaneously existing Duplicates that can form or travel as far as two miles away from his location. The Duplicates are intangible holographs and are incapable of doing any actual physical activity. They are primarily used as decoys, messengers, spies, and simulated ghosts. The Duplicates can form in any location within the hero's range, regardless of whether the hero can see that location or not. As an aspect of this Power, the hero automatically possesses a combination of Clairvoyance, Clairaudience, and Speechthrowing that permits him to see, hear, and speak through his remote Duplicates. For example, Myriad is at the scene of a cave-in. The rescue crew need to know where any survivors are located. Myriad creates several Duplicates and sends them off into the debris. Since these are energy, the Duplicates can pass effortlessly through the rock. Myriad sees what the Duplicates \"see.\" There is no light in the collapsed area but Myriad's Duplicates each carry an illusion of a flashlight that functions as well, if not better, than a real one. Finally two of the Duplicates find survivors., The first group of survivors are only lost; the Duplicate leads them through the darkness to safety. The second group is trapped behind fallen rock. They are startled when the Duplicate passes through the rock into their area but Myriad speaks through his Duplicate and appraises them of the situation. The Duplicate remains with them until the rescuers finally reach them. When creating the hero, the player has the option of assigning some or all of the hero's other Powers to the Duplicates. The hero can only create a single such Powerful Duplicate at any one time. Since this Duplicate now has a greater effect on reality, it gains some reality as well. Such Duplicates can be affected and even destroyed by such attacks as Light Emission, Light Generation, Plasma Generation, Plasma Control, Shadowcasting, and any of the Magics and Power Controls. The Duplicate has a \"Health\" equal to this Power's rank number. Any damage to the Duplicate is subtracted from this number. At zero the Duplicate suddenly vanishes. In addition, any damage done to the Duplicate is also suffered by the hero, who temporarily loses a number of points equal to his Power rank number. Such points are regained just like Health points. All Duplicates can be affected by the Powers of Light Control and Shadowcasting. Light Control can overpower, distort, and even destroy any Duplicate. It can be use to seize control of a Duplicate away from the hero; the effect is analogous to someone using Mind Control/ Puppetry on the hero's own body. Shadowcasting can surround the Duplicate in darkness and prevent the hero's Clairvoyance from operating. If the Shadowcasting has a greater rank, that Power can be used to destroy a Duplicate. Note: when a Duplicate is passing through solids, its \"eyes\" register total darkness. If the hero is unaware that Shadowcasting is being used against his Duplicates, then he will assume the continued darkness is the result of the Duplicate remaining within a solid mass and consequently will make no attempt to resist this clandestine attack. As stated earlier, all Duplicates are an illusionary manifestation of the hero's self-image. They need not be a single, static design but can change with the hero's whim. Generally, all Duplicates at a given moment will have the same shape. However, by means of a red Reason FEAT, the hero can create simultaneous Duplicates who have different appearances. All such differences are still based on the hero's own form. A red FEAT is needed for each different type of Duplicate. Example: Myriad maintains a secret identity as a physicist at a nuclear plant in Georgia. One day the plant is attacked by supervillains. Myriad must take action but his civilian identity must remain at his emergency post. Myriad forms a number of Duplicates. Most resemble his super heroic self but Myriad alters one to appear as his civilian self. The extra form requires additional concentration on Myriad's part and a red FEAT. The player blows it on the first roll (a 23), second roll (03), third roll (24), but finally makes it on the fourth roll (00). Myriad castigates himself on the additional 24 seconds it took him to generate the lab coat and glasses. While Duplicates are normally created as independent beings, the Power can also be cast around the hero's own body to immediately alter the hero's own appearance. This is usually used to make quick disguises and costume changes. If the hero so chooses, his entire super hero appearance and costume can be nothing more than such a Illusion wrapped around the hero's normal civilian self. This would definitely prevent anyone from finding your costume stashed in the back of the closet. In the previous example, Myriad had not thought to bring his costume to work and had to form one of his Duplicates around himself. The drawback is that if the hero loses concentration, consciousness, or Power, he also loses his costume. (The time Myriad was skinnydipping when a crisis struck resulted in major embarrassment for him and some unfortunate media exposure.) Nemesis Powers include Light Control and Shadowcasting.\n\nLife Control Powers Die Roll\n\nLifeform Control Power\n\n(Code)\n\n01-14 16-18 19-26 27-32 33-34 36-39 40-51 52-60 61-62 63-65 67-69 70-71 72-80 81-83 84-89 91-95 96-00\n\nBiophysical Control* Bio-Vampirism * Body Transformation- Others Emotion Control Exorcism Force Field vs. Hostiles Forced Reincarnation Grafting* Hypnotic Control Mind Control* Mind Transferral* Neural Manipulation Plague Carrier Plant Control Plant Growth Sense Alteration Shapechange-Others* Sleep-Induced Spirit Storage Summoning Undead Control\n\nL1 L2 L3 L4 L5 L6 L7 L8 L9 L10 L11 L12 L13 L14 L15 L16 L17 L18 L19 L20 L21",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Same area",
    "duration": "Maintained"
  },
  {
    "code": "L1",
    "name": "Biophysical Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L1",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero has the ability to consciously alter the physiology of a target. This is accomplished by sheer force of will and does not require any physical action on the hero's part, aside from touching the target. The Power can be used at a distance but each 10 feet separating the hero from the target reduces his effective Power by -1CS.",
    "rulesText": "The hero has the ability to consciously alter the physiology of a target. This is accomplished by sheer force of will and does not require any physical action on the hero's part, aside from touching the target. The Power can be used at a distance but each 10 feet separating the hero from the target reduces his effective Power by - 1 CS. The Power is normally concentrated on a single target, but the hero can affect as many targets as he desires. Each additional target also decreases the rank - 1 CS. For example, trying to affect two targets at a distance of 10 feet drops the hero's rank -4CS (-2CS per target). The result of any form of this Power is permanent. (What's the point of healing somebody if he's just going to drop dead later )the actual ongoing effects continue for as long as the hero continues to use his Power. Once this is done, the target's natural healing abilities and rates revert to normal. There are seven forms of Biophysical Control, each with its own set of effects. The first four fornis are benevolent, the last three are maievolent. Heroes who use the malevolent forms against sentient beings risk Karma and Popularity loss. When the hero is created, the player must choose one of these forms. He can select one or let the dice decide for him. •\n\nHealing-The, hero can cure the damage caused by wounds, trauma, toxins', and disease. The hero can increase the target's Health by'an amount equal to the Power rank level. This is the maximum benefit the hero can give per day to one specific person. The color of the required FEAT is determined by the nature and severity of the damage. Green FEATs handle broken bones, non-terminal disease, and simple wounds. Yellow FEATs handle physical trauma, wounds to organs, non-fatal poisoning, and terminal diseases. Red FEATs handle mortal wounds, coronary attacks, strokes, toxic poisoning, and massive physical trauma. The Power seals the body and returns any still-living tissues to health. It cannot replace lost tissue. •\n\nRegeneration --The hero has the ability to heal (as above) and can recreate large areas of lost tissue, such as severed limbs or destroyed organs. Limbs are regrown by a green FEAT, organs by a yellow FEAT, and brain and neural tissues by a red FEAT. Revival-The hero can actually bring the dead back to life. The Power rank number is the maximum number of days the target can have been deceased and still be revived. The condition of the corpse determines the color of the required FEAT. An intact, unembalmed, undecayed corpse is revived on a green FEAT. A decayed but intact corpse needs a yellow FEAT. A red FEAT is required for partial or embalmed remains. For example, a Good rank can revive a 1 0-day-old, slightly moldy body if the player rolls a 75 or better. The Power begins by healing and regenerating any damage to the body, especially the cause of death. Once the body is habitable again, the Power automatically summons the deceased spirit back and reconnects it with the body. If the spirit was already reincarnated into another body, the spirit splits into identical halves. One remains with the new body while the other half returns home. If the spirit is trapped, the hero can make an attempt to free him based on the Power rank of whatever is holding the spirit. Until the spirit returns, the body remains in a comatose state. •\n\n• \n\nDamage Transferrai-The hero can heal another by apparently taking that damage from the victim and moving it into the hero. The Power first heals the target; the manner is the same as for Healing (above). Simultaneously, the hero's body reshapes itself into a duplication of the damage being healed. Once the target is healed, the hero's Self-Healing abilities (same rank) then cures this ersatz damage. A hero cannot heal another person until he has returned to normal. Decay-The hero can accelerate the cellular collapse of body tissue. The Power can cause Power rank damage per turn. The target becomes leprous, dies, and quickly crumbles to dust if the Power is used long enough. Disruption-The Power can upset the Smooth functioning of the physiology. The target suffers Power rank losses to his Health as he suffers anything from minor discomfort (nausea, chills) to fatal trauma (coronary attack). Aging-The Power can accelerate or reverse the aging process. The normal rate is multiplied by the Power rank number. For example, a Good rank can make aging occur at tenfold rate or go in reverse at an equal rate. A green FEAT accelerates aging. A yellow FEAT stops it. A red FEAT reverses it. As the victim's age changes, physiology and mental capacities change as well.\n\nWhile the Power can function as a Fountain of Youth, it can also be used to kill through old age or regression to protoplasm. A target can be protected from unwanted Biophysical Control by such Powers as Force Field Generation and True Invulnerability. Optional Powers include another io Mofthis Power. The Nemesis is either Immortality or Serial Immortality.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Contact",
    "duration": "Rank turns",
    "targets": "1 target"
  },
  {
    "code": "L2",
    "name": "Bio-Vampirism",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L2",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The character is a super-carnivore able to increase his Strength, Endurance, Psyche, and Power ranks by consuming living biological materials. The most common examples of Bio-Vampires are the traditional bloodsuckers like Dracula. Although all the traditional vampires were destroyed on Earth in the Marvel Universe, this does not prevent the player or Judge from creating a new race of Bio-Vampires able to withstand the spells that finally destroyed Dracula.",
    "rulesText": "The character is a super-carnivore able to increase his Strength, Endurance, Psyche, and Power ranks by consuming living biological materials. The most common examples of Bio-- Vampires are the traditional blood-suckers like Dracula. Although all the traditional vampires were destroyed on Earth in the Marvel Universe, this does not prevent the player or Judge from creating a new race of Bio-Vampires able to withstand the spells that finally destroyed Dracula. As a new type of Bio- Vampire, your character need not follow the traditional abilities and limitations associated with the old Vampires. It's a new world and a new Vampire. Bio-Vampires have a Bonus Power of Mind Control/Puppetry that renders their victims unable to physically struggle against the Bio-Vampire. However, the victim's Psyche remains uncontrolled; the victim continues to try to resist the Bio-Vampire's attack. The Bio-Vampire must make a Power FEAT to initiate the attack. The victim's Psyche determines the difficulty of the FEAT. The first successful FEAT means the victim is immobilized and the Bio-Vampire can begin to feed. Each successful FEAT enables the Bio-Vampire to drain Health points from the victim. The amount drained is equal to the Power rank number. This is converted into energy that is divided equally among the ranks for Strength, Endurance, Psyche, and any Powers the vampire hasexceptthis one. No Vampiric Power can ever increase its own rank. The Bio-Vampire must make a FEAT each turn he continues to feed. He can voluntarily stop feeding at any point by making a Psyche FEAT roll of any colo except red. A red FEAT means the Bio. Vampire's hunger is beyond his control. He has entered a feeding frenzy that only stops when the victim is drained or the Bio-Vampire has been repulsed. If the Bio-Vampire fails a FEAT at any time in the feeding process, he is immediately repulsed from the victim and can never resume that attack. That victim gains instant immunity to any future vampiric attack by that particular Bio-Vampire. Why do Bio-Vampires do it? Because they lose energy at an accelerated rate. Their rank numbers for Strength, Endurance, Psyche, and any Powers except Bio- Vampirism drop one point per hour. The Bio- \\iampire must feed in order to maintain his life. Even if the Bio-Vampire is deprived of victims, he never actually starves to death. When all his affected ranks drop to Shift 0, the Bio-Vampire drops into a deathlike trance. His vampirism continues to function, although he can no longer actively seek out new biomaterials to consume. If such are made available to the body, the Power will immediately begin to return the Bio-Vampire to life. When the player creates the Bio-Vampire, he must chooseandplaya weakness. The Bio-Vampire's Power rank can be increased + 1 CS for each additional weakness the Bio-Vampire possesses, up to a maximum of four weaknesses in all. Bio-Vampirism is communicable. A sentient victim who was,completely drained as a result of a feeding frenzy must make a Psyche FEAT roll. A red result means the victim has arisen as a new, Feeble-ranked Bio- Vampire.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Contact",
    "targets": "1 target"
  },
  {
    "code": "L3",
    "name": "Body Transformation—Others",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter the nature of elements and compounds within a living target's body. Innate safe-guards in the Power maintain the target's lifeforce for as long as the target is in the altered state. Such states are not necessarily mobile, but if they are, they may require the target to move in new ways.",
    "rulesText": "The hero can alter the nature of elements and compounds within a living target's body. Innate safeguards in the Power maintain the target's lifeforce for as long as the target is in the altered state. Such states are not necessarily mobile, but if they are, they may require the target to move in new ways. While in a solid altered state, the target retains his overall normal appearance. If liquid or gaseous, he can assume any shape but can still automatically revert to his original shape when the Power's effects end. When transforming a target, the hero normally changes the entire body unless the player states beforehand which specific section he is changing. The safeguards still take effect, but the target loses sensation in the affected areas. Transformations can take any of three basic forms: Chemical:The target's chemical make-up is changed to other chemicals. Physiological: The target's basic life functions are changed. The target may be changed to animal, plant, or a different chemical basis. Energy:The solid target is converted to a coherent energy field. When creating the hero, the player decides the form of change in which the hero specializes. If random generation provides this Power again, the player can select another form or add + 1 CS to the first form chosen. Since this can be considered an attack, the target can choose to resist; he can also forego resistance if he so desires. Power rank determines the Intensity of the effects on the target, the range at which the effects can occur, and the duration of the effects. Normally the Power is used on a single target. Each additional target reduces the effects by - 1 CS.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "duration": "Rank turns",
    "targets": "1 target"
  },
  {
    "code": "L4",
    "name": "Emotion Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter a target's emotional state and resulting activity by forcing him to feel a particular emotion. The hero can only instill one emotion at a time. However, he can select any emotion he desires.",
    "rulesText": "The hero can alter a target's emotional state and resulting activity by forcing him to feel a particular emotion. The hero can only instill one emotion at a time. However, he can select any emotion he desires. When creating the hero, the player can raise the rank +2CS by limiting the hero to a specific emotion. For example, the Purple Man broadcasts only the emotion of loyalty. Range and duration are determined by the Power rank. The Power affects everyone within its range. This Power is an excellent choice when the hero is facing adversaries more numerous and powerful than he is. If an opponent has a Power that is triggered by a specific mindset, such as the way Bruce Banner used to turn into the Hulk when he was angered, this Power can be used either to prevent that Power from taking hold or to trigger it prematurely.\n\nsorting ability. The field is ineffective against cybernetic life. The field protects the hero from melee weapons or slugfest, but not from projected or missile weapons.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 target",
    "optionsDefinition": {
      "powerCode": "L4",
      "powerName": "Emotion Control",
      "id": "emotion_control_spec",
      "label": "Emotion Control Scope",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "versatile"
        ],
        [
          51,
          100,
          "specialized"
        ]
      ],
      "choices": [
        {
          "key": "versatile",
          "label": "Versatile (Any Emotion)",
          "description": "Can broadcast any emotion at standard power rank.",
          "isSuperior": false,
          "rankShift": 0
        },
        {
          "key": "specialized",
          "label": "Single Emotion Limitation (+2CS Rank)",
          "description": "Limited to broadcasting a single emotion (e.g. Loyalty, Fear, Rage, Love, Despair, Calm) with +2CS rank.",
          "isSuperior": true,
          "rankShift": 2,
          "subChoiceList": [
            "Loyalty",
            "Fear / Terror",
            "Rage / Hate",
            "Love / Adoration",
            "Despair",
            "Calm / Pacifism"
          ]
        }
      ]
    }
  },
  {
    "code": "L5",
    "name": "Exorcism",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can release a being from any external domination imposed by a third party. Such controls include Possession, Mental Domination, Serial Immortality, and Magic. If there's a control, this Power can break it.",
    "rulesText": "The hero can release a being from any external domination imposed by a third party. Such controls include Possession, Mental Domination, Serial Immortality, and Magic. If there's a control, this Power can break it. This Power rank is compared to that of the Power controlling the subject. A Typical Intensity FEAT can sever a lower ranking control Power. A Remarkable Intensity FEAT severs a controlling Power of equal rank, and an Amazing Intensity FEAT severs one of one or more ranks higher. Upon severing the being's control over t.,.e subject, that being is immadlaiaiy teleported to its home dimension. This Power commonly appears as a spell used by sorcerers and holy men. The hero must be within 10' of the subject in order to perform the Exorcism. The hero can use this Power to resist the initial attempt by another to control him, but if this attempt fails (as per the FEATs listed above), he cannot Exorcise himself later.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Same area",
    "targets": "1 possessed target"
  },
  {
    "code": "L6",
    "name": "Force Field vs. Hostiles",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero emits a psionic aura that repels any hostile lifeforms. The Power automatically probes the minds of anyone in the area and analyzes their intentions toward the hero. Anything harmful is repulsed, as if a Power rank material strength wall had risen between them.",
    "rulesText": "The hero emits a psionic aura that repels any hostile lifeforms. The Power automatically probes the minds- of anyone in the area and analyzes their intentions toward the hero. Anything harmful is repulsed, as if a Power rank material strength wall had risen between them. Neutral or friendly life is not affected by this field. Okay, I hear you asking: \"What if somebody starts out friendly, but turns hostile after he's inside the field?\" The answer is, he's catapulted harmlessly out of the field. Rank determines the size and material strength of the field. Appropriate ranges are shown on column A of the Range Table on the inside cover. The field can be breached by several means. Brute force always works. Mental Invisibility allows someone to bypass the field's",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or 1 area",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "targets": "Self or allies in area"
  },
  {
    "code": "L7",
    "name": "Forced Reincarnation",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can capture disembodied spirits and merge them into new bodies. The spirits can be the newly-dead, ghosts, or Free Spirits. The bodies.",
    "rulesText": "The hero can capture disembodied spirits and merge them into new bodies. The spirits can be the newlydead, ghosts, or Free Spirits. The bodies. can be anythingnewborn infants, clones, androids, robots, animals, or plants. Because of the Power's interference, the reincarnated person retains his full memories and Mental Powers. The spirit is permanently bonded to the new body for as long as that body lives, unless the bond is deliberately broken by the spirit (a red Psyche FEAT) or by a hero with Exorcism Power (L5). The hero can indefinitely hold the spirit in stasis (one Typical Intensity FEAT per day should be sufficient) while seeking a suitable body into which he can transplant the soul. If the hero fails a FEAT, he has 10 turns in which to implant the spirit or lose it forever. The hero cannot transplant the spirit into a living, intelligent being-with two notable exceptions. As noted earlier, spirits can be placed within newborn infants. The hero can also accept the spirit into himself; the result is the hero now has a complete second person living in his head. The player now has to redo his character sheet to reflect the secondary set of characteristics for Reason, Intuition, and Psyche. When a character is reincarnated into a body, he retains his abilities of Reason,. Intuition, and Psyche, and any Mental Talents and Powers. Physical abilities, secondary characteristics, Physical Powers and Talents, and Contacts are all lost. Contacts can be quickly regained by convincing the Contacts of who he really is (a Remarkable Intensity FEAT). Karma awards should depend on how well the hero has handled the spiritual transplant. Just dumping the spirit into the first available body can actually cost Karma, while going to extraordinary lengths to find the perfect situation entitles the hero to a hefty bonus.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Permanent",
    "targets": "1 target"
  },
  {
    "code": "L8",
    "name": "Grafting",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L8",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is the single most likely candidate for raw abuse and grossing out your fellow players. This Power is strictly Mad Scientist material. (it does have its good side, too, though.) The hero can perform psionically augmented surgery on a subject.",
    "rulesText": "field. Rank determines the size and material strength of the field. Appropriate ranges are shown on column A of the Range Table on the inside cover. The field can be breached by several means. Brute force always works. Mental Invisibility allows someone to bypass the field's\n\nL7 Forced Reincarnation The hero can capture disembodied spirits and merge them into new bodies. The spirits can be the newlydead, ghosts, or Free Spirits. The bodies. can be anythingnewborn infants, clones, androids, robots, animals, or plants. Because of the Power's interference, the reincarnated person retains his full memories and Mental Powers. The spirit is permanently bonded to the new body for as long as that body lives, unless the bond is deliberately broken by the spirit (a red Psyche FEAT) or by a hero with Exorcism Power (L5). The hero can indefinitely hold the spirit in stasis (one Typical Intensity FEAT per day should be sufficient) while seeking a suitable body into which he can transplant the soul. If the hero fails a FEAT, he has 10 turns in which to implant the spirit or lose it forever. The hero cannot transplant the spirit into a living, intelligent being-with two notable exceptions. As noted earlier, spirits can be placed within newborn infants. The hero can also accept the spirit into himself; the result is the hero now has a complete second person living in his head. The player now has to redo his character sheet to reflect the secondary set of characteristics for Reason, Intuition, and Psyche. When a character is reincarnated into a body, he retains his abilities of Reason,. Intuition, and Psyche, and any Mental Talents and Powers. Physical abilities, secondary characteristics, Physical Powers and",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Contact",
    "duration": "Permanent",
    "targets": "1 target"
  },
  {
    "code": "L9",
    "name": "Hypnotic Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a Talent in the Advanced Set. The hero can dominate a target's behavior and actions by implanting commands, not by direct psionic control. The Hypnotic command may pertain to current conditions or lie dormant until triggered by future conditions (post-hypnotic suggestion).",
    "rulesText": "Contacts can be quickly regained by convincing the Contacts of who he really is (a Remarkable Intensity FEAT). Karma awards should depend on how well the hero has handled the spiritual transplant. Just dumping the spirit into the first available body can actually cost Karma, while going to extraordinary lengths to find the perfect situation entitles the hero to a hefty bonus.\n\nL8 Grafting This is the single most likely candidate for raw abuse and grossing out your fellow players. This Power is strictly Mad Scientist material. (it does have its good side, too, though.) The hero can perform psionically augmented surgery on a subject. The hero can operate on, dissect, rearrange, and perform transplants without the need for normal medical techniques to ensure success. No matter how crude the conditions in which the operation is performed or how messy it proves to be, the subject's lifeforce is preserved. There is no major blood loss nor is there any need for extensive recuperation. This Power is strongly related to the Healing forms of Bio-Physical control and can be used to cure others of physical damage. Unfortunately, the Power lends itself to abuse. Those possessing this Power tend more toward Doctor Frankenstein than Doctor Schweitzer. Such characters might see people as machines to be rearranged at their whim. This Power permits the character to perform acts beyond 20th century medical science (like brain transplants). If two or more brains are combined, the resulting character shows traits of both. The Power rank determines the success of the operation. A green FEAT ensures success of a routine operation, like simple surgery (anything that might be done at a clinic). A yellow FEAT is required for more elaborate work transplants, grafting, anything requiring a large hospital. Outright medically impossible acts such as brain transplants",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Same area (Line of sight)",
    "duration": "Rank turns",
    "targets": "1 target"
  },
  {
    "code": "L10",
    "name": "Mind Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L10",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero has the ability to directly control a target's mind - through psionic Powers. The hero completely overrides the will and perhaps even the conscious mind of the target. There are four forms of Mind Control: • Puppetry—the target mind retains awareness but cannot control the body.",
    "rulesText": "body part rearrangement (after which all the parts still work-hands where feet should be, and that kind of thing) require a red FEAT. Success means the result is alive; it may not be pretty, but it's breathing. A hero with this Power will use it to heal. A villain will use it to fill his lair with a variety of ex-human nightmares.\n\nThe hero can dominate a target's behavior and actions by implanting commands, not by direct psionic control. The Hypnotic command may pertain to current conditions or lie dormant until triggered by future conditions (post-hypnotic suggestion). Hypnotic controls come in two forms: •\n\nCommands alter current behavior. \"You are getting sleepy.\"\n\n• \n\nSuggestions alter future behavior. \"You hate orange, rocky skin and must destroy anything with it.\"\n\nNormal hypnosis cannot make a person perform any action that goes against his sense of ethics. However, the Power of Hypnotic Control can override the target's innate sense of morality by means of a red FEAT. Less conflicting commands involve only a green FEAT. Hypnotic Control can be established by any one of a number of means. These include specific gestures, words, songs, or devices. When creating the hero, the Player determines which method the hero uses. The Intensity and duration of a Hypnotic Control are determined by the Power rank. In the case of posthypnotic Suggestions, duration does not include the time prior to activation of the suggestion, but only the time the suggestion is actually in force.\n\nL10 Mind Control",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 target"
  },
  {
    "code": "L11",
    "name": "Mind Transferral",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L11",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero has the ability to switch minds from one body to another. The hero's own mind and body need not be included in any switching that occurs. The Power operates much like Mental Duplication, in that the hero reshapes the brains of his targets to conform to those he is switching.",
    "rulesText": "The hero has the ability to switch minds from one body to another. The he*ro's own mind and body need not be included in any switching that occurs. The Power operates much like Mental Duplication, in that the hero reshapes the brains of his targets to conform to those he is switching. In effect, the target believes he is the switched mind and thus effectively is that new person. The accuracy of such transfers is 100%. Because of the nature of this Power, the hero can also transfer one mind into several people simultaneously, with each believing he is the real person. Transferral switches mental abilities, Talents, and mental Powers. Physical Powers are not transferred, nor are physical abilities, Popularity, Resources, or Contacts. The Power rank determines the range at which the Power can initially function and the duration of its effects. Ranges are shown on column A of the Range Table. Duration is given for a single mind-to-mind transfer. If the hero attempts to transfer one mind to multiple bodies, the duration decreases - 2CS for each additional body.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Same area",
    "duration": "Permanent / Maintained",
    "targets": "1 target"
  },
  {
    "code": "L12",
    "name": "Neural Manipulation",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter a target's neural activity. By changing nerve messages within the target's body, the hero can cause a variety of effects. • Disruption: The target's body loses all sensations; it falls to the ground, a limp, aumb mass of flesh.",
    "rulesText": "The hero can alter a target's neural activity. By changing nerve messages within the target's body, the hero can cause a variety of effects. •\n\nDisruption: The target's body loses all sensations; it falls to the ground, a limp, aumb mass of flesh.\n\n• \n\nParalysis: The target body becomes cz):npletely rigid. No chemical can counteract the paralysis while Power is in effect.\n\nthe\n\n• \n\nSeizure: The target's muscles spasm uncontrollably for as long as the Power is in effect.\n\n• \n\nExaggeration: Nerve signals are actually amplified, causing the target to overact when attempting any movement.\n\nNormally, a hero can select any of these effects. When creating the hero, the player can choose to specialize in one effect for a benefit of +2CS. Note: This Power only affects the voluntary muscles; it does not affect the autonomic nervous system which controls the heart, lungs, and other automatic bodily functions. The range and duration of this Power are determined by its rank. Suitable distances are shown on column A of the Range Table on the inside cover. The Power normally affects only a single person; affecting more causes a decrease in duration of - 1 CS per additional person. The target's mind and senses are unaffected by the Power; the victim knows full well what is happening (even if he doesn't know why it's happening to him). The Power can reach across the dimensional barriers if it is combined with some way of breaching the dimensions. It can function normally if both hero and target are within another -dimension.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Rank turns",
    "targets": "1 target"
  },
  {
    "code": "L13",
    "name": "Plague Carrier",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can contain within his body and release at will a variety of disease-causing microorganisms (bacteria, germs, viruses). The hero is immune to any disease (otherwise he'd have died as soon as he gained this dubious Power) but he can instantly infect others at will with diseases of his choosing. Symptoms appear 1-10 turns later.",
    "rulesText": "The hero can contain within his body and release at will a variety of disease-causing microorganisms (bacteria, germs, viruses). The hero is immune to any disease (otherwise he'd have died as soon as he gained this dubious Power) but he can instantly infect others at will with diseases of his choosing. Symptoms appear 1-10 turns later. Curiously, victims are not themselves contagious to others. Obviously the Power alters the genetics of the diseasecausing organisms and weakens them so that they can only survive within the hero and the first new body into which they are introduced. Upon the death of the victim or the end of the Power's duration, all the microbes die as well. This Power does have a beneficial side. Because of the hero's special ability to control microbas, he can actually cure others of disease. By means of a red FEAT, the hero can draw out of the target's body every last microbe of a particular type. Note: This only removes the cause of damage. It does not remove the effects of the disease. Example: Black Plague has a fondness for red-haired children, and cures a copper-haired tyke of smallpox. While the child will live, he still has the pockmarks. A character with this Power has to gain diseases, much as others would gain weapons, as he progresses. New characters begin with diseases common to everyday life, like chicken pox, mumps, influenza, and such. The character must actively seek out sources of new diseases in order to add them to his inner armory. This is done by consuming live cultures (\"I don't get it! Why would anyone drink a vial of smallpox culture?\") or by curing a diseased person in the manner explained earlier. This latter act will gain even the vilest villain a small flock of devoted people, all cured by him. The hero can use his Power against single targets. Multiple targets decrease his Power rank by - 1 CS per additional person. Rank determines the Intensity of the infection and duration of the symptoms. This Power can be negated or even destroyed by Ll/Biophysical Control or massive injections of anti-microbial drugs. The hero is then reduced to a normal being. The Power's ability to infect others can be negated by normal medical means or Powers like Self-Healing, Induced Healing, True Invulnerability, and this Power itself.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / 1 area",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "targets": "All in area"
  },
  {
    "code": "L14",
    "name": "Plant Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can impart limited movement and self-awareness to normally unintelligent plants. The plants obey simple commands, and possess rudimentary communication and senses. The hero can accelerate the plants' growth somewhat, but cannot make it exceed normal limits on size or shape.",
    "rulesText": "The hero can impart limited movement and self-awareness to normally unintelligent plants. The plants obey simple commands, and possess rudimentary communication and senses. The hero can accelerate the plants' growth somewhat, but cannot make it exceed normal limits on size or shape. Rank determines the number of plants affected and the duration of the control. Exceeding the number of controlled plants decreases the duration - 1 CS per additional 10%. Controlled plants have their own characteristics and ranks that are increased to the hero's Power rank, where applicable.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "Rank areas"
  },
  {
    "code": "L15",
    "name": "Plant Growth",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to make plants grow nearly instantaneously, and far larger than normal. The Power can force a seed to sprout immediately and gives it the ability to thrive, even in the absence of normal nutrients (light, soil, and water). The hero can affect existing plants and seeds or use seeds and sprouts carried with him.",
    "rulesText": "The hero has the ability to make plants grow nearly instantaneously, and far larger than normal. The Power can force a seed to sprout immediately and gives it the ability to thrive, even in the absence of normal nutrients (light, soil, and water). The hero can affect existing plants and seeds or use seeds and sprouts carried with him. In the latter case, the player must make a list of the types of seeds the hero carries oust as a weapons specialist needs a list of those with which he is proficient). This Power does not change the natural abilities of the affected plants; it only enhances them up to the Power's rank. This Power requires the player to develop some rudimentary knowledge of botany, since the more the player knows about plants, the more stunts the hero can perform. Typical plants used with this Power are: •\n\nPoison ivy.incapacitates foes\n\n• \n\nKudzu: targets\n\n• \n\nBriar: forms barriers\n\n• \n\nGoldenrod: hayfever city...\n\n• \n\nOak: instant support damaged buildings\n\n• \n\nVenus flytrap: Catch and hold foes vines rash entangle impassable for\n\nPower rank determines the speed of plant growth and the rank of the affected plant's abilities. Growing a plant in normal conditions (adequate light, soil, and water) requires a\n\nTypical Intensity.FEAT. Growing plants in less than adequate conditions (insufficient light, soil, or water; typical urban conditions) requires a Remarkable Intensity FEAT. Growing plants in openly hostile conditions (no light, soil, or water) requires an Unearthly Intensity FEAT. Because their metabolism is accelerated by this Power, the plants quickly die. The lifespan is 1/8 normal. As a rule of thumb, the player can use these guidelines for normal and accelerated lifespans: House plants-6 months/2 days Shrubbery-5 years/3 weeks Trees-1 00-1000 years/1 -10 years The point of this is that your hero doesn't have to worry about filling the city with giant plants left over from old battles. He might still be in trouble with the Park Department, though...",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "duration": "Permanent",
    "targets": "Plants in area"
  },
  {
    "code": "L16",
    "name": "Sense Alteration",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can deliberately change the manner in whic a target either receives sensory stimuli processes it within the brain. The simplest form negates one or more of the senses, producing instant blindness, deafness, numbness, and so on. More complex is the ability to modify the senses.",
    "rulesText": "The hero can deliberately change the manner in whic a target either receives sensory stimuli processes it within the brain. The simplest form negates one or more of the senses, producing instant blindness, deafness, numbness, and so on. More complex is the ability to modify the senses. The hero can amplify some elements and negate others. For example, the hero might make a target literall see red (and only red). The most complex form is Hallucinations. By a Monstrous Intensity FEAT, the hero can transfer sensory informatic to others, making everyone share a corr mon set of perceptions. These may be the hero's, or someone else's. Sensory negation takes a Typical Intensity FEAT; sensory alteration takes a Remarkable Intensity FEAT. The Power rank determines the range and duration of the effects.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Rank turns",
    "targets": "1 target"
  },
  {
    "code": "L17",
    "name": "Shapechange-Others",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L17",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero has the ability to change the shapes of other living beings. The result can take any shape and appearance the hero wishes: animal, vegetable, mineral. The target's basic physiology remains unchanged despite the apparent differences between the original and new forms.",
    "rulesText": "The hero has the ability to change the shapes of other living beings. The result can take any shape and appearance the hero wishes: animal, vegetable, mineral. The target's basic physiology remains unchanged despite the apparent differences between the original and new forms. When Shapechanging a target, the hero must make sure that the new form still allows basic life functions to continu. (especially breathing!). If not, using the Power constitutes a Kill result and all tht bad Karma entailed therein. When creating the hero, the player ca. opt to exchange one of his randomly generated Powers for L2/Body Transformation-Others. In this case the hero really can change a living target int anything he wants (with no restrictions).",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Contact",
    "duration": "Rank turns",
    "targets": "1 target"
  },
  {
    "code": "L18",
    "name": "Sleep-Induced",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a nice, simple, straight-forward Power that is hardly ever used in any comic because it's not terribly dramatic. Nor is it exactly cricket. The hero has the ability to put any target into a deep sleep, from which he cannot awake while the Power is in effect.",
    "rulesText": "This is a nice, simple, straight-forward Power that is hardly ever used in any comic because it's not terribly dramatic. Nor is it exactly cricket. The hero has the ability to put any target into a deep sleep, from which he cannot awake while the Power is in effect . During thi§ induced sleep, the target is compr6tely helpless (see what I mean about not being cricket?). On the other hand, when you're facing 325 battle-crazed Skrulls, this Power can be really handy. The Power rank determines the range and duration of the Power. Relevant distances are shown on column A of the Range Table on the insidc- cover. It affects everyone within range. Sleep persists for 1 -10 hours after the Power's duration. During that time, the victim can be awakened by anyone, but he'll wake up naturally in any case.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Rank turns",
    "targets": "1 target"
  },
  {
    "code": "L19",
    "name": "Spirit Storage",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L19",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can capture and indefinitely hold within himself any number of disembodied spirits. Such spirits find themselves within a pocket dimension of the hero's creation; while within it, they retain a semblance to their original forms. This pocket dimension can have any appearance.",
    "rulesText": "The hero can capture and indefinitely hold within himself any number of disembodied spirits. Such spirits find themselves within a pocket dimension of the hero's creation; while within it, they retain a semblance to their original forms. This pocket dimension can have any appearance. The one within Adam Warlock's Soulgem was a rather pleasant park. The hero can freely communicate with any spirits held within. He is immune to any attempts they might make to possess his body. A spirit can escape on a red Psyche FEAT, provided its Psyche rank is higher than the Power rank. This Power can be used in conjunction with L6/Forced Reincarnation to find new homes for vagrant spirits. This Power can be mechanically simulated to provide a \"holding tank\" for disruptive spirits like poltergeists or particularly malevolent Free Spirits. In this case, the Power lasts as long as the device is supplied with energy. Capturing a spirit requires a FEAT. Compare the Power rank with the Psyche of the intended target. If the Power rank is higher, a green FEAT will do. Equal ranks require a yellow FEAT. A Psyche rank higher than the Power rank means the hero must make a red FEAT.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Permanent",
    "targets": "1 spirit"
  },
  {
    "code": "L20",
    "name": "Summoning",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can summon and control extra-dimensional, corporeal beings. Such beings are commonly called \"demons\" but may be of any nature or disposition. The Power enables the hero to summon any known extra-dimensional being, Provided his Power rank is higher than the being's Psyche rank, on a green FEAT.",
    "rulesText": "The hero can summon and control extra-dimensional, corporeal beings. Such beings are commonly called \"demons\" but may be of any nature or disposition. The Power enables the hero to summon any known extradimensional being, Provided his Power rank is higher than the being's Psyche rank, on a green FEAT. Equal ranks require a yellow FEAT. Trust me, you don't want to summon beings more powerful than you (they might answer), but if you do it anyway, you need a red FEAT. The summoned being is instantly teleported from its home dimension to a spot chosen by the hero. Once summoned, the being must perform a single task ordered by the hero. being must immediately set about fulfilling the order. If successful, he can immediately depart for his home dimension. Players should refer to MHAC9, Realms of Magic, by Kim Eastland for a detailed list of beings this Power can summon. Normally, heroes will only summon magical creatures like demons and elementals. If a hero feels particularly confident, though, he might be able to call magical characters like Clea and D'Spayre. Heroes can never summon entities, although one might pretend to answer a summoning on a lark. This Power summons one being at a time. Each additional being decreases the Power's rank by - 1 CS. Remember that most magical beings are intelligent and that many are hostile to humans. The being a hero summons today might hold a grudge against him for eons to come.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Same area",
    "duration": "Maintained",
    "targets": "Summoned creatures"
  },
  {
    "code": "L21",
    "name": "Undead Control",
    "category": "Lifeform Control",
    "source": "UPB Table p. 16-19 & Entry L21",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can dominate the wills and actions of previously living, still-corporeal beings. Such beings are often called \"zombies\" or “zuvembies\" and are only semi-intelligent. Controlling them requires a green FEAT.",
    "rulesText": "The hero can dominate the wills and actions of previously living, stillcorporeal beings. Such beings are often called \"zombies\" or \"zuvembies\" and are only semiintelligent. Controlling them requires a green FEAT. Controlling fully intelligent, more powerful undead like mummies or vampires requires a red FEAT. Once control is established, the hero can order the undead to perform any .task he desires, so long as it is within their ability. Control ceases when the task is accomplished, but can be reinstated at that time. This Power cannot affect-anything alive. A cured vampire, for example, would ignore the Power. This Power is commonly linked to MC 13/Zombie Animation (the Power that actually creates undead). When creating the hero, the player can exchange an-, other Power for MC13. Intelligent undead may hold a grudge against the hero and later try to destroy him. Worse, they might attempt to make the hero into one of themselves. Exorcism, Magic Negation, or Power Negation can all destroy the hero's control over his minions.\n\nMagic Powers If you have rolled a magic power for your character, you should select a spell, item, or ability from the magic rules.\n\nMatter Control Powers Die Roll\n\nMatter Control Power\n\n(Code)\n\n01-05 06-17 18-22 23-29 30-39 40-46 47-51 52-61 62-68 69-73 74-83 84-93 94-00\n\nBonding Collection Crystallization Diminution Disruption Enlargement Geoforce Matter Animation\" Machine Animation* Micro-Environment Molding Weather Zombie Animation*\n\nMC1 MC2 MC3 MC4 MC5 MC6 MC7 MC8 MC9 MC10 MC11 MC12 MC13",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "Up to Rank undead"
  },
  {
    "code": "M1",
    "name": "Clairaudience",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can \"hear\" distant sounds and voices despite any intervening distance or barriers. The Power is not hindered by factors that affect normal sound transmission, such as distance, time lag, muffling, distortion, or the absence of a transmitting medium. Because of this, Clairaudience has superior range over Hyper-Hearing.",
    "rulesText": "The hero can \"hear\" distant sounds and voices despite any intervening distance or barriers. The Power is not hindered by factors that affect normal sound transmission, such as distance, time lag, muffling, distortion, or the absence of a transmitting medium. Because of this, Clairaudience has superior range over Hyper-Hearing. Only Clairaudience enables the hero to hear across a vacuum, for example. Unfortunately, Clairaudience can act as a pipeline to direct another's Psionic or Sonic attacks toward the hero. Because of this side-effect, the hero is -1CS to resist such attacks. These attacks need not even be aimed at the hero but might still affect the hero if the other Power is being\n\nExample: Captain Tympanic is using his Power to eavesdrop on bankrobbers planning a heist. Unfortunately, Charmer appeared and used her Hypnotic Voice Power to capture the gang. Capt. Tympanic is caught in her spell as well. The ranges for Clairaudience are shown on column E of the Range Table. When the Power operates, it overrides the hero's natural hearing. Distant sounds are sensed at their original volume level. If the volume is too loud the hero can reduce it with a green FEAT. Faint sounds can be magnified by a yellow FEAT. The Power is normally a voluntary Power that musty be summoned. Sometimes it functions automatically; this can be the result of improper control, tampering by outside forces, or be triggered by sudden, dramatic events occurring to someone with whom the hero shares an emotional rapport. (\"That was Lewis crying for help!\") When using the Power to eavesdrop on another Clairaudient, that person may automatically sense the first Clairaudient's effort. This is determined by the Judge making a secret red FEAT based on the second hero's Power rank. The Optional Powers for this are Hyper-hearing, Clairvoyance, and Remote Sensing. The Nemesis for this is Force Field vs. Psionics.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "M2",
    "name": "Clairvoyance",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can \"see\" distant sights without directly seeing it with his eyes. The hero receives a visual simulation of what he would see if he were actually present at the scene. The Power is not hindered by any of the factors that affect normal light transmission, such as distance, blockage, obscurement, and time lag.",
    "rulesText": "The hero can \"see\" distant sights without directly seeing it with his eyes. The hero receives a visual simulation of what he would see if he were actually present at the scene. The Power is not hindered by any of the factors that affect normal light transmission, such as distance, blockage, obscurement, and time lag. It can be used to see things that are impossible for a telescope or Telescopic Vision. For example, a Monstrous Clairvoyant could see current conditions inside a sealed room on the surface of Venus. The ranges for this Power are shown on Column E of the Range Table. When in use, the Power overrides normal vision. Normally the Power is consciously controlled. Sometimes it functions automatically. This can be the result of improper control, interference, or be triggered by sudden, dramatic events occurring to someone who whom the hero shares an emotional rapport. (\"Oh no, Billy Jo fell off the bridge!\") The Power can work against the hero if unwanted visions obscure the hero's sight or distract him at a crucial moment. For example, if Dr. Strange had a sudden flash while operating on a patient, a malpractice suit might be in order. When the Power is used to spy on another Clairvoyant, there is a possibility of that person detecting the use of the Power. The Judge makes a discreet Red FEAT based on the observed character's Power rank. Clairvoyance can function as a pipeline to draw light-based and Psionic attacks toward the hero. Such attacks may even affect him if they were aimed at something else within the area he is spying upon. The hero has -1CS resistance to such attacks. Clairvoyance can be used in conjunction with other Powers to increase the range at which those Powers can affect a target. Optional Powers include Clairaudience and Remote Sensing. The Nemesis is Force Field vs. Psionics.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "M3",
    "name": "Communicate with Animals",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can understand and use the languages employed by animals and other non-sentient lifeforms. The Power can be used to communicate with non-sentient alien creatures but not intelligent aliens. The degree of difference between the hero and the animal determines what color FEAT is required.",
    "rulesText": "The hero can understand and use the languages employed by animals and other nonsentient lifeforms. The Power can be used to communicate with nonsentient alien creatures but not intelligent aliens. The degree of difference between the hero and the animal determines what color FEAT is required. Assuming the hero is human, a green FEAT permits communication with mammals. A yellow FEAT permits communication with birds and reptiles. A red FEAT covers everything else. If the hero has a different physical type, the player and Judge will have to modify the FEATs accordingly.\n\nthe hero transfers part of his intelligence and Psyche to the machine, thus allowing it to respond to him. Unfortunately, sharing his mind with machines on a regular basis leads the hero to identify a little too closely with machines.\n\nThe hero must be in communications range of the animal for the Power to work. This varies from species to species. The basic rule is that the maximum range is the greatest distance at which the hero and animal can sense each other.\n\nThe Nemesis is Neural Manipulation.\n\nOptional Powers include Linguistics and any of the Communication Powers. The Nemesis is Neural Manipulation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 animal"
  },
  {
    "code": "M4",
    "name": "Communicate with Cybernetics",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can directly communicate with complex machines, whether these are computers or machines not normally considered to have artificial intelligence. Any machine that possesses any kind of programming can be communicated with—calculators, digital watches, microwave ovens, even music boxes. The higher the rank, the simpler the machine that can be spoken to.",
    "rulesText": "Cybernetics The hero can directly communicate with complex machines, whether these are computers or machines not normally considered to have artificial intelligence. Any machine that possesses any kind of programming can be communicated withcalculators, digital watches, microwave ovens, even music boxes. The higher the rank, the simpler the machine that can be spoken to. A green FEAT can communicate with a machine possessing several microchips; a computer is the most common example. A yellow FEAT communicates with devices possessing a single microchip, such as watches and talking dolls. A red FEAT communicates with machines that lack microchips but are still somehow programmed, like player pianos and hand- cranked adding machines. The nature and quality of the information received reflects the nature of the machine that is spoken to. Communication occurs without the hero needing to resort to programming languages and input devices such as punchcards and keyboards. After all, if the hero did need them this wouldn't really be a super power. When using the Power,\n\nThe Optional Power is Linguistics.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 machine / system"
  },
  {
    "code": "M5",
    "name": "Communicate with Non-Living",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can psychometrically perceive impressions, history, and residual psychic vibrations stored within inanimate objects.",
    "rulesText": "Matter This is a catchall name for anything not covered by the other Communication Powers (M3, M4, M6). It will enable the hero to communicate with anything that had once been either sentient, cybernetic, or alive, as long as the target lacks those qualities now. The hero transfers part of his intelligence and Psyche to the target, thus permitting it to respond to him. The target can converse, provide information, and even have a personality. The Power includes an innate, unconscious use of Speechthrowing. Although the hero actually provides the voice, it appears that the target actually speaking. When the Power is used to speak a corpse, it uses an unconscious, automatic form of Postcognition to create a simulation of the spirit that once inhabited the body. The hero does not speak with the actual spirit. This can lead to an odd situation in which the actual ghost hears his own body speak as if he were still in it. Unfortunately, the hero may develop a personality quirk that blurs the distinction between life and death. As he can speak with both the living and the dead, he might not be able to see what the difference is. This can be taken to grotesque extremes, especially in a horrific campaign. The Power can be used to pry into a person's secrets by interrogating that person's possessions. For example, clothing will blithely recount the wearer's activities and a wall safe will proudly list all the things it is protecting. Note: Projectile weapons only remember when they were fired, not at whom.\n\nOptional Powers include Communications with Cybernetics. The Nemesis is Neural Manipulation.",
    "errataNote": "",
    "powerStunts": [
      "Instant forensic reconstruction of a crime scene from room dust"
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Same area",
    "duration": "Maintained",
    "targets": "1 object"
  },
  {
    "code": "M6",
    "name": "Communicate with Plants",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can speak with plants. Anything that has a vegetable physiology can be affected by this Power, such as grass, trees, and the Man-Thing. When using the Power, the hero imparts some of his intelligence and Psyche to the plant to facilitate communication.",
    "rulesText": "The hero can speak with plants. Anything that has a vegetable physiology can be affected by this Power, such as grass, trees, and the Man-Thing. When using the Power, the hero imparts some of his intelligence and Psyche to the plant to facilitate communication. The greater the complexity of the plant, the easier it is to communicate with. A green FEAT com municates with trees and local ecosystems; in the latter, all the plants speak as if a chorus that only the hero can hear. A yellow FEAT communicates with shrubs, vines, and bushes. A red FEAT communicates with simple plants and fungi; if the hero has Hyper-hearing, it can be combined with this Power to permit communication with plankton and bacteria. Combining the Power with Sensory Link enables the hero to share the experiences of plants, even those on alien worlds if the latter Power's rank is high enough. A problem can develop if the hero begins to identify too closely with plants. He might find salads offensive. Worse, he may begin to suffer anguish when plants are harmed in his presence. Optional Powers include Communication with Animals, Communication with Non-living Matter, Plant Control, and Plant Growth. The Nemesis is Neural Manipulation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "Plants"
  },
  {
    "code": "M7",
    "name": "Cosmic Awareness",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M7",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero is in tune with the entire scope of reality. He possesses a detached, omniscient viewpoint that allows him to explore the entire existence of a chosen subject. Unfortunately, this causes such a massive overload of superfluous information that the hero is hard pressed to sort it all out.",
    "rulesText": "The hero is in tune with the entire scope of reality. He possesses a detached, omniscient viewpoint that allows him to explore the entire existence of a chosen subject. Unfortunately, this causes such a massive overload of superfluous information that the hero is hard pressed to sort it all out. The FEAT represents the hero's ability to recover a specific bit of information from all the effluvia. The more exact the required detail, the higher the difficulty. Discovering basic facts or locating any one on the Earth requires a green FEAT. Complex information or finding anyone within a star system requ ires a yellow FEAT. Secrets, weaknesses, arcane knowledge, and anything else the Judge wants to make difficult to find out requires a red FEAT. The Power can be used to automatically track any Class 1000 or higher Power within ten miles of the hero's position. In combat the Power raises the hero's own attacks +1CS by detecting the weak points in the opponent. The major drawback to this Power is that can lead to insanity, especially catatonic withdrawal, as the hero's Psyche is continually inundated by a flood of information. The Judge can determine the chance of temporary insanity by secretly making a Reason FEAT for the hero; a green, yellow, or red FEAT means the hero has retained all his marbles for another day. The Judge should make this check any time the hero uses the Power more than five times a day or a number equal to 10% of the Power rank number, whichever is higher. Because of this, caution is urged in the use of this Power. If the Power is somehow negated, the hero may also go into a state of shock or severe depression. Any mental problems the hero suffers can be cured by normal psychotherapy. The Optional Intelligence.\n\nPower is\n\nHyper-\n\nThe Nemesis is Emotion Control.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Universal",
    "duration": "Permanent"
  },
  {
    "code": "M8",
    "name": "Danger Sense",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is also called Combat Sense and Spider-sense. It is a combination of automatically functioning Psionic Powers (Telepathy, Empathy, and Precognition) that warns the hero about impending danger. The advance warning time is the number of seconds equal to the Power rank number (rounded up to the nearest turn if need be).",
    "rulesText": "This is also called Combat Sense and Spider-sense. It is a combination of automatically functioning Psionic Powers (Telepathy, Empathy, and Precognition) that warns the hero about impending danger. The advance warning time is the number of seconds equal to the Power rank number (rounded up to the nearest turn if need be). For example,\n\nSpiderman's Amazing rank can warn him of danger almost a minute in advance. In a combat situation, the Power can be used replace other, lower ranked Abilities. It can replace Intuition for determining surprise, Fighting for blocking, Agility for dodging, and Strength for escaping. The minimum level for this Power must be equal to the -hero's Intuition. If it's initially lower, the player can raise it to this level. The player can also raise its rank +1CS by choosing to make it a voluntary rather than an automatic Power. That is, it only functions if the hero is making it function. Spiderman's version functions at all times, but your hero might decide the risk of being caught off-guard is worth the reward of the higher rank. The nature of the Power reduces the hero's resistance to Emotional attacks -1CS. The Nemesis is Emotion Control.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "M9",
    "name": "Dreamtravel",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can actually enter into the short-lived pocket dimensions created by a person's dreams and nightmares. These dreamworlds are outside the boundaries of normal reality and exist solely as a reflection of the dreamer's imagination. The Dreamtraveler must be within ten feet of the dreamer in order for the Power to function at full rank.",
    "rulesText": "The hero can actually enter into the short-lived pocket dimensions created by a person's dreams and nightmares. These dreamworlds are outside the boundaries of normal reality and exist solely as a reflection of the dreamer's imagination. The Dreamtraveler must be within ten feet of the dreamer in order for the Power to function at full rank. The Power rank decreases -1CS for each additional 10 feet that separates the two. The Dreamtraveler has no direct control over the conditions within the dreamworld. He can interact with things within that world by performing \"physical\" actions much as he would in the real world. Fighting, Agility, Strength, and Endurance are all represented by this Power's rank. If the hero has other ~ Powers, these exist in equivalent forms that possess this Power's rank instead of their own. The Dreamtraveler can suffer real damage as a result of events that affect him within the dreamworld. He might even die. The equivalent of the damage appears in the hero's real body. Normally the hero's real body retains its solidity during Dreamtravel. The player can raise the rank +1CS by making the hero's body dematerialize whenever the Power is used. In this case, if the hero is slain or trapped within the dreamworld, the body might never reappear. Each dreamworld is unique to the specific dreamer and retains no existence except during the act of dreaming. Dreamworlds are not the same as the Dream Dimension, although it is possible they exist within the greater Dream Dimension. It is possible that dreamworlds touch each other and may even overlap in the case of telepathic dreamers. If so, it is possible that the Dreamtraveler can enter one dreamworld and exit one of someone else's. The Optional Power is a form of Telepathy limited to dreamers.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Dimensional (Dreams)",
    "duration": "Maintained"
  },
  {
    "code": "M10",
    "name": "Empathy",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect the surface emotions of others. The hero can detect the target's emotional state and further refine that knowledge to discover the target's physical state, surroundings, and location, insofar as these have an influence on the emotions. He can transmit his own emotional state but he cannot impose this on others (that requires Emotion Control).",
    "rulesText": "The hero can detect the surface emotions of others. The hero can detect the target's emotional state and further refine that knowledge to discover the target's physical state, surroundings, and location, insofar as these have an influence on the emotions. He can transmit his own emotional state but he cannot impose this on others (that requires Emotion Control). Empathy is extremely useful when the hero has to deal with nonsentient beings or large numbers of people. It can read the target's mood and support already existing emotions. The range can vary within a single Power rank. The distances shown on column B of the Range Table refer to a single target. Each additional target reduces the range -1CS. Range never falls below Feeble, even if the hero is trying to read the emotions of a crowd. The Power functions for as long as the hero concentrates on using it. The hero can send 'Empathic, messages by means of a Power FEAT. The message is in the form of a burst of emotion accompanied by a subtle identification of the Empath. A green FEAT transmits to a known person and location. A yellow FEAT transmits to a known person in an unknown location. A red FEAT is the Psionic equivalent of a general announcement. (\"Did you feel that? Felt like somebody was really scared... Wait a minut e. That was Sender. He needs us!\") The Nemeses are Mental Invisibility and either Force Field or Resistance to Psionics. Optional Powers include Clairvoyance and Emotion Control.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Same area",
    "duration": "Maintained",
    "targets": "1 target"
  },
  {
    "code": "M11",
    "name": "Free Spirit",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M11",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero's soul is capable of independent existence in the real world. The Free Spirit can leave the hero's body and travel independently; it is often mistaken for an Astral Body. The Free Spirit can even survive the death of the physical body without being immediately drawn into an afterlife dimension; this requires a red Power FEAT at the time of death (more on this later).",
    "rulesText": "The hero's soul is capable of independent existence in the real world. The Free Spirit can leave the hero's body and travel independently; it is often mistaken for an Astral Body. The Free Spirit can even survive the death of the physical body without being immediately drawn into an afterlife dimension; this requires a red Power FEAT at the time of death (more on this later). Free Spirits possess all the Mental Abilities, Talents, and Powers of the whole being. Health remains unchanged although now it is more of a measure of how well the Free Spirit can resist entering the appropriate afterlife. If the Free Spirit is still in his original body, that body may either retain a share of the overall consciousness when the spirit is away or the body may lapse into a coma at these times. There is an equal chance of either, although the player should choose one at the time the hero is created. If the original body is dead, the Free Spirit can develop bonds to one or more new bodies, dwelling like a tenant in each but tied to none. The Free Spirit cannot Possess the body or in any way hinder the real owner's abilities. They do share a telepathic bond that extends into shared dreams. If the Free Spirit possesses Powers that require a physical form to use, he can lend these to whatever body he is occupying. When this\n\nPower appears during the character generation process, the player must decide whether the body the Free Spirit is occupying is his own or a loaner he picked up along the way. In the latter case, the player will then have to generate two complete sets of statistics, those of the Free Spirit and the real owner of his current body. Free Spirits can be created later on. Any character who dies in a campaign has a chance to become one, even if he did not possess this actual Power to begin with. The transformation is accomplished by making an Unearthly Psyche FEAT and expending all the hero's Karma. The Nemeses are Summoning and Spirit Storage.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Astral / Universal",
    "duration": "Maintained"
  },
  {
    "code": "M12",
    "name": "Hallucinations",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M12",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create illusions directly within the target's mind. Such illusions are telepathic, not holographic, in nature. As such, they cannot be mechanically detected or recorded except by devices that simulate Telepathy or human thought patterns (such as player character Robots).",
    "rulesText": "The hero can create illusions directly within the target's mind. Such illusions are telepathic, not holographic, in nature. As such, they cannot be mechanically detected or recorded except by devices that simulate Telepathy or human thought patterns (such as player character Robots). Hallucinations can only be seen by the target of this Power. The ranges for this Power is shown on column A of the Range Table. The target must be within sight of the hero, although the hero can extend his sight and thus his Power range by the use of artificial aids. These include telescopes, remote TV cameras, clairvoyance, and Telescopic Vision. The target need not see the -hero in order for the Power to affect him. Normally the Power affects only a single target. Each additional target decreases the range -1CS. Targets are allowed to disbelieve the Hallucination by making an Intuition FEAT but only if they suspect the true nature of wha t they are seeing. Hallucinations last as long as the hero concentrates on creating them. They inflict no real physical damage but can be used to disguise an actual Power's use. The hero can use one additional Power simultaneously with this one. Hallucinations can be used to inflict psychosomatic damage. If the apparent damage is believable, the target will physically react to it. Hallucinatory \"death\" results in the target lapsing into unconsciousness for 1-20 turns. Since a target who takes the time to examine his wounds will realize he has not been hurt (at least not in the way he thinks he should be), the hero is advised not to use Hallucinations that rely on direct attacks. Hallucinations have limited effects on nonsentient or extremely alien beings. They have no effect at all on Moms Nature. A Hallucinatory wall might stop a puma but it won't stop a boulder rolling down on the hero.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 target"
  },
  {
    "code": "M13",
    "name": "Hyper-Intelligence",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Normally a character's Intelligence is determined in the Character Generation Process. However, the research for the Ultimate Powers Book showed that extreme levels of Intelligence can be a Power in its own right. Examples include The Leader and the late Soviet scientist known only as Gargoyle.",
    "rulesText": "Normally a character's Intelligence is determined in the Character Generation Process. However, the research for the Ultimate Powers Book showed that extreme levels of Intelligence can be a Power in its own right. Examples include The Leader and the late Soviet scientist known only as Gargoyle. The hyperintelligent character is a genius of awesome potential. He can quickly master new subjects, retain that knowledge indefinitely, and easily succeed in any mental endeavor. There are two ways the Power can be incorporated into a character. The player should choose one when he first creates the character ( a coin toss will do). The first method is a permanent modification of the hero's Intelligence. The Power rank number is added to the hero's previously generated Reason or Intuition rank number. The total is the hero's actual Hyperintelligence. For example, a character like the Leader started off with Good Reason. The gamma rays added Incredible Hyper-Intelligence for a final total of Amazing Reason rank. The second method uses HyperIntelligence the same way most other Powers are used-intermittently. Just as Siryn doesn't scream all the time, so too would a Hyper-intelligent character have normal intelligence most of the time. When he uses his\n\nPower, he transforms himself into a mental giant. The way it operates is the character's normal rank for either Reason or Intuition is raised the number of levels equal to the Power rank (Feeble is +1CS, Poor +2CS, and so on). The total is the actual Hyper-Intelligence rank the character can achieve using this Power. The hero can retain this higher rank for a limited amount of time; the duration is the number of minutes equal to the original Ability's rank number. This is for the first time each day the hero uses the Power. Each successive time the hero uses his Power within the same day decreases the duration -1CS. Example: Steve is creating an awesomely wise alien named Shepherd. Shepherd has a normal Incredible Intuition rank. His Power rank is Excellent. This raises the Intuition rank by +5CS to a potential Shift-Y rank. Shepherd can retain this enhanced state for an Excellent duration of 40 minutes before he reverts to normal. summoning his Power a second time, he returns to Shift-Y Intuition for a Remarkable duration of only 30 minutes. He can summon his Power five more times after that, then he has to rest. When creating the character, the player can increase the Power rank +1CS by specializing in a specific fields. After all, comics are filled with characters who are titans in the lab but failures in other fields. Possible fields include Professional and other Talents, such as Medicine, Engineering, and Animal Training. Optional Powers include Hyper-Invention and Total Memory. The Nemesis is Mind Drain.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "M14",
    "name": "Hyper-Invention",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a special form of Hyper-intelligence that is common enough to merit its own classification. It is a permanent enhancement of the hero's overall intelligence that is channeled into the field of mechanical design and engineering. The hero is an Edison-like genius who take existing materials and technologies and use them to create new devices or applied technologies.",
    "rulesText": "This is a special form of Hyperintelligence that is common enough to merit its own classification. It is a permanent enhancement of the hero's overall intelligence that is channeled into the field of mechanical design and engineering. The hero is an Edison-like genius who take existing materials and technologies and use them to create new devices or applied technologies. He can repair previously operational devices, even if the device was of an unknown type. The hero can learn new technologies at a rate determined by his rank, the complexity of the technology, and the amount of instruction available. Modern technology requires an Excellent Intensity FEAT. Advanced technology requires a Remarkable Intensity FEAT. Alien or futuristic technology vary from Incredible Intensity (Shi'ar) to Unearthly (the Watcher). The color of the FEAT is determined by the amount of instruction the hero receives. A green FEAT requires instructional materials that explain the technology (a teacher, books, holocubes). A yellow FEAT is required if the hero has access to materials not specially designed to instruct someone in that technology (readouts, performance specs, operating manuals, a copy of a working device). A red FEAT is required if all the hero is has an inoperational device if that technology. Like Hyper-intelligence, the Hyper-Inventor can raise his rank +1CS by specializing in a particular field. Examples include vehicles, weapons, biomedical technology, and architectural engineering. The hero has the ability to manufacture or modify items using any technology he knows. He still requires adequate physical resources to create the items, though the cost of anything he builds himself is decreased -2CS compared to the list price for off-the-shelf versions. A Power FEAT based on the desired item's tech level determines the durability of the item. A green or yellow FEAT means the item has the same durability as a normally manufactured item. A red FEAT means the item will function but has performance problems; the Judge can decide how long or well the item functions before it fails. Note: This is one of those Powers that can be used for personal profit. The hero can design and build exotic paraphernalia for other characters and NPCs on commission. This can raise the hero's Resource level by whatever fees he can get away with.\n\nbetween incarnations is up to the player, but at least one incarnation per century is recommended.\n\nOptional Powers include Weapons Tinkering, Machine Animation, Molding, Artifact Creation, and Machine Creation. Nemeses are Mental Duplication and Mind Drain.\n\nSoon after the player acquires this Power, he should work out a basic timeline for and list of his past incarnations. Players are urged to make their past lives relatively normal people. Still, if the player is determined to fill up his past with glory after glory, the Judge can insist on a simple rule. To wit: there is a 1% chance that any specific historical figure was a former incarnation of the present-day hero.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "M15",
    "name": "Incarnation Awareness",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This Power is based on the idea that a spirit enters countless reincarnations throughout eternity but that the memory of each past life is usually lost somewhere in the transition from one life to another. This Power allows the hero to remember the details of his more recent lives and to actually communicate with them. Such communications include the transmission of the complete range of senses and thoughts.",
    "rulesText": "This Power is based on the idea that a spirit enters countless reincarnations throughout eternity but that the memory of each past life is usually lost somewhere in the transition from one life to another. This Power allows the hero to remember the details of his more recent lives and to actually communicate with them. Such communications include the transmission of the complete range of senses and thoughts. There are two limits on communication with other lives. One, the communication can only be initiated by the hero's current incarnation. He cannot be called by past lives nor can he call future lives. However, that doesn't prevent the hero from receiving messages from his future selves. This can be a quick way to start an adventure (more later). Two, the hero can only reach past selves at points when they are actually living. He cannot reach selves that are in an afterlife situation. In fact, the hero can't really recall ever being in any form of afterlife. The Power rank number is also the number of consecutive past lives the hero can contact. The earliest incarnation is the lifespan in -which the Power first appeared; it has been growing one point at a time ever since. This limit spares the player the responsibility for making up a megabiography going back to the dawn of time. It spares the Judge by limiting the potential havoc the player can wreak using his now-dead contacts. Assume a full but average lifespan for all past lives. From the 18th century on, this is 70 years. Prior to that, the average is 50. The time elapsed\n\nThe Power is used primarily to gain information. The hero can make extremely long-ranged plans that involve the assistance of past lives in solving current problems. Example: Self-1988 asks Self-1920 to have a tunnel dug under the site of the present day Latverian Embassy. A trust fund to be set up by Self-1855 will pay for it. Sometimes a future incarnation will request that the hero perform a special act. The reason for the act might never be explained. In this, way, the hero and his associates might suddenly find themselves thrust into extremely strange or terribly mundane situations. (\"It is crucial that you make sure Jon Clifton gets to school today! Then bury ten pounds of Adamantium at these coordinates in the Gobi Desert.\") Even the best laid plans of mice and men go astray. Any time the hero asks a past-self to perform an action that has a direct, physical effect on the present, he must make a FEAT roll. This represents the chance of long-range plans coming to fruition. Each century between the presentself and the past-self raises the Intensity FEAT +1CS. Example: The Trust Fund set up in 1855 requires a Poor Intensity FEAT. The tunnel requires a Feeble Intensity FEAT. The player rolled a 30 and a 56. The trust fund failed somewhere along the way but the tunnel got built anyway using alternative funding.\n\nThe Optional Powers include either Time Travel limited to any past lifetime, a combination of Time Travel and Free Spirit that enables the present-self to possess the bodies of other selves, or a specialized form of Time Travel that enables the present self to draw other selves from their times to the present.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "M16",
    "name": "Iron Will",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has complete conscious control over his mind and body. By using his Iron Will, the hero can temporarily halt the damage done by mental or physical attacks; he can even postpone his own death. Iron Will can be used in place of any lower-ranked Ability to determine Resistance to an attack.",
    "rulesText": "The hero has complete conscious control over his mind and body. By using his Iron Will, the hero can temporarily halt the damage done by mental or physical attacks; he can even postpone his own death. Iron Will can be used in place of any lower-ranked Ability to determine Resistance to an attack. Any time the hero suffers damage from an attack, the Power can temporarily absorb it before it can affect any of the hero's Ability ranks. The maximum amount of damage Iron Will can absorb at one time is equal to its rank number. Absorbed damage does not affect the hero at that time. Damage exceeding that amount affects the hero in its normal manner. The hero can maintain his Iron Will indefinitely but will eventually have to relax his selfcontrol in order to heal and renew his Power. Letting down his control causes him to immediately suffer a loss of Health points equal to one half the amount of damage Iron Will had absorbed. Regardless of the original nature of the attack, it is always translated into lost Health points; this reflects the strain the Power places on the body. Once the translation occurs and the Iron Will has been purged of its burden, it is able to absorb new damage. The cycle of absorption /purging/absorption can continue until the hero's Health drops to zero or below. Note: The Power. can still absorb damage, even if the conversion of that damage into Health points will result in the immediate death of the hero. In such a case, the hero had best make sure he is already in an excellent Trauma Center when he relaxes his Power. Example: Sunstone is battling the Marauders and not doing too well. He possesses Incredible Iron Will and has 100 Health points. Harpoon hits him with a Slayspear; this does 40 points of damage. Iron Will absorbs it all but immediately reconverts it to a loss of 20 Health points. Sabertooth slashes and gnaws Sunstone for 60 points. Iron Will only absorbs the first 40, then immediately converts it. Health now stands at 40 points. Malice attempts to Possess Sunstone; Iron Will fends off the mental attack but at a cost of another points. Sunstone decides discretion is better than valor and flees. Scalphunter fires at the retreating figure and inflicts thirty more points of damage. Sunstone heads for the best-equipped hospital in the area. He manages to maintain his self-control until he is actually in the operating room, then he passes out as wounds suddenly appear across his body.\n\naccess to actual instructional materials or a cooperative native speaker of that language who also speaks a language the hero knows. A yellow FEAT is needed if the hero has a native speaker who cannot speak any tongue the hero knows or if the hero only has non- instructional samples of that language. A red FEAT is needed if the hero has only fragments of the new language. For example, learning Shi'ar from watching a broadcast of a speech by Majestrix Lilandra is a yellow Remarkable Intensity FEAT. Learning spoken Primate by actually using sign language to talk with a chimpanzee requires a green incredible intensity FEAT.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "M17",
    "name": "Linguistics",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M17",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a specialized form of Hyper-intelligence. The hero has the ability to rapidly learn any language if sufficient material is available for him to work with. Once the language is mastered, the hero is fluent in that language, provided he is physically capable of communicating in it.",
    "rulesText": "The only real drawback to the Power is that the hero may accidentally forget his native language, especially if he rarely uses it. Still, he can always re-learn it. There is a danger that an adversary might warp the hero's Linguistic Power and actually negate his language comprehension; in such a case, the hero becomes dyslexic and unable to understand simple English.\n\nThis is a specialized form of Hyperintelligence. The hero has the ability to rapidly learn any language if sufficient material is available for him to work with. Once the language is mastered, the hero is fluent in that language, provided he is physically capable of communicating in it. The number of languages a hero is currently fluent in is limited to the Power rank number. For example, Doug Ramsey's Incredible rank enables him to retain fluency in up to forty languages at a time. When a hero exceeds that limit, he begins to forget a previously mastered language. This will usually be some obscure tongue the hero has had little use for, like Basic Otter or Mephitish. The speed with which a hero can learn a new language is determined by its strangeness and what source materials are available. Current human languages require a Poor FEAT. Archaic human languages are a Good FEAT. Alien but Humanoid languages are Remarkable FEAT. Animal languages are an Incredible FEAT (note: not all animals have an actual language). Alien, nonhumanoid languages are an Amazing FEAT. The color of the FEAT is determined by the source of the language. A green FEAT is needed if the hero has\n\nThe hero can try a FEAT roll every hour. Failure means he simply has not yet gotten the hang of the new language.\n\nA curious side-effect of the Power is that it provides Power rank Resistance to Hypnotic Voice and other sonic- based forms of Hypnotic or Mind Control. The hero's mind shifts into its translation mode; it studies the medium through which the hypnosis is communicated rather than the actual message. (\"Lorelei, did you ever realize that your sleep command is a high C-sharp while your paralysis command is a high Cflat?\") The Optional Intelligence.\n\nPower is\n\nHyper-\n\nThe Nemesis is Mind Drain.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self (Conversational)",
    "duration": "Permanent"
  },
  {
    "code": "M18",
    "name": "Mental Duplication",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a combination of Powers that enables the hero to psionically study a subject's mind and then create a simulation of that mind within the hero's own brain. This is a great way to learn secrets and interrogate subjects who would otherwise be rather uncooperative (at best). The duplicated mind contains the personality of the original, most memories, and possibly the mental or psionic Powers of the original.",
    "rulesText": "This is a combination of Powers that enables the hero to psionically study a subject's mind and then create a simulation of that mind within the hero's own brain. This is a great way to learn secrets and interrogate subjects who would otherwise be rather uncooperative (at best). The duplicated mind contains the personality of the original, most memories, and possibly the mental or psionic Powers of the original. The subject is unaffected by the Power and loses none of his own mental abilities. He is usually unaware that Duplication has even occurred. The. relationship between the hero's and the duplicate mind takes one of three forms. The player must choose one form when he first creates the hero; this form applies for any duplicates the hero creates. Dice Roll\n\nForm\n\n01-40 41-70 71-00\n\nDetachment Merge Transformation\n\nDetachment-The hero's mind is completely separate from the duplicate and retains full control over the body and other Powers. The hero can examine and communicate with the duplicate. The duplicate retains a facsimile of the original's will and may not choose to voluntarily cooperate with the hero. If the duplicate chooses to resist, the hero must make a Psyche FEAT whose Intensity is determined by the duplicate's Psyche rank. A successful FEAT means the duplicate will grudgingly cooperate (for now). The FEAT must be made with each new attempt to force cooperation. The duplicate mind can attempt to overwhelm the hero's own mind. Success occurs if the duplicate makes a -3CS Psyche FEAT whose intensity is based on the hero's Psyche. The duplicate mind can attempt its coup at the initial duplication and at any time the hero forces cooperation. Success means the two minds' positions are now reversed; the duplicate now controls the body and any Powers for the duration of the duplication. Example: Copicat successfully duplicates Dr. Doom's mind. Doom won't stand for anything resembling subservience and immediately rebels. Copicat has Excellent Psyche; Dr. Doom has Amazing Psyche, reduced -3CS to Excellent when attempting to overwhelm. The Doom-mind fails to make the required Excellent Intensity FEAT. \"Doom\" decides to examine his situation; from the Doom-mind's point of view, \"he\" has been captured by means of a Mind Transferral of unknown type. Copicat is trying to get the Doom-mind to draw up a set of plans for his time machine. Unfortunately Doom's Psyche is too high for even a red FEAT. Merge-The duplicate mind blends with the hero's mind to create a composite mentality. The new mind contains aspects of both minds' personalities, memories, and Powers. The new mind's Psyche is the sum of the original two Psyche ranks. The degree of each mind's influence is proportional to its original Psyche. Each original Psyche represents a section of the pooled Psyche. For example, Carboncopy has a Good Psyche. He merges with a Thing duplicate (Remarkable Psyche), creating a joint Incredible Psyche. One fourth of the joint personality is Carboncopy, the remaining three-quarters are the Thing. Transformation-The hero's mind is automatically overwhelmed by the new mind. The hero's personality, memories, and mental Powers are temporarily replaced by the new mind. The effects appear identical to Mind Transferral, at least where the hero is concerned. The hero's Reason and Intuition are replaced by those of the original mind; after expiration of the Power, these return to their original ranks. Regardless of the form, the hero must make a FEAT at the time of Duplication in order to determine the completeness of the duplicate mind. Any mind can be duplicated, regardless of its Psyche rank. The hero always duplicates the subject's personality and basic memories; the duplicate mind is an amnesiac. A green FEAT copies the subject's detailed memories. A yellow FEAT copies the subject's Talents. A red FEAT duplicates the subject's Mental and Psionic Powers. The range at which the hero can duplicate a mind is determined by the Power rank. Appropriate ranges are shown on Column A of the Range Table.\n\nThe duration of the duplication is determined by the hero's Psyche rank. A duplicate mind has a duration of the number of minutes equal to the Psyche rank number. The duration decreases -1CS for all duplicateminds with each additional mind. For example, Copicat's Excellent Psyche enables him to maintain one duplicate-mind for 20 minutes or a maximum of five minds for two minutes. If the hero exceeds his limit, the new duplicate-mind will last for one turn and then all his copied minds will vanish. Note: the decreased duration only applies to the Detachment and Merge forms; the Transformation form can be used repeatedly since the latest duplication automatically erases the previous one. When the hero is created, the player must determine how much control the hero has over his Power. Failure to make at least a green Reason FEAT means the Power functions automatically, despite the hero's wishes. In the case of uncontrolled Power usage, the range at which duplication occurs drops to contactonly. The hero can maintain some control by covering all parts of her body that might normally touch another person's skin. For example, Rogue wears a full body covering complete with gloves. In rare cases, the duration of a specific duplicate mind can be extended to permanence. Such cases result from a combination of extremely peculiar factors. One such example occurred when Rogue's Mutant Power interacted with Ms. Marvel's Kree-Modified Human physiology. The result is that Rogue's mind permanently merged with a facsimile of Carol Danvers' mind. If permanence occurs to someone with the Transformation form, then the hero's original mind is permanently destroyed. Optional Powers include Mind Drain and Power Duplication. The Nemesis is Mind Blast; this negates all duplicate minds.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "duration": "Permanent",
    "targets": "1 mind"
  },
  {
    "code": "M19",
    "name": "Mental Invisibility",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M19",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to render his own mental energies undetectable by external means. Such means can be technological (EEG scans), psionic, Magical, or Power-based in nature. It is Invisibility in telepathic terms.",
    "rulesText": "The hero has the ability to render his own mental energies undetectable by external means. Such means can be technological (EEG scans), psionic, Magical, or Power-based in nature. It is Invisibility in telepathic terms. The Power protects the hero from discovery by outside forces. It serves as Power rank Resistance to undesired probes and psionic attacks. Success means the external probe shows nothing at all, including the presence of this Power, and psionic attacks simply pass through the target (think of someone trying to punch air). The Power can extend to other minds, but each additional mind decreases the effective Invisibility 1CS. The Nemesis is Mental Probe.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "Observers in area"
  },
  {
    "code": "M20",
    "name": "Mental Probe",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can telepathically probe a living mind or a psionic phenomenon to gain a detailed analysis of the target. Living minds can be searched for specific images and thoughts, although the hero must have a basic idea beforehand of what she is looking for. The target mind is allowed to make a Psyche FEAT to resist a Mental Probe.",
    "rulesText": "The hero can telepathically probe a living mind or a psionic phenomenon to gain a detailed analysis of the target. Living minds can be searched for specific images and thoughts, although the hero must have a basic idea beforehand of what she is looking for. The target mind is allowed to make a Psyche FEAT to resist a Mental Probe. This is automatic, even if the target mind is initially unaware if the attempted probe. If resistance is successful, the probe is rejected with a headache-like backlash that prevents the hero from trying to probe that target again for 24 hours. A side-effect of the Power is that the target's Psyche may temporarily drop -1CS for 24 hours as a result of fending off the probe. This potential loss is determined by a second Psyche FEAT made after the initial resistance. A successful probe reveals only information known by the target. Mental Probes can be used to analyze independently existing psychic phenomena. Such things include poltergeists, psionic emissions that were so strong they permeated an area and now continually echo, and psionic Powers intercepted by the hero. The hero can examine any unknown psionic phenomena in stages. The first FEAT reveals basic information, such as the nature of the psionics in use. Further FEATs reveal increasingly detailed information.\n\nand\n\nMental Probes have a range determined by the Power rank. Maximum ranges are shown on column A of the Range Table. The player has the option, when creating the hero, of raising the Power rank +1CS by decreasing the range to contact-only.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 target"
  },
  {
    "code": "M21",
    "name": "Mind Blast",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M21",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can create bolts of pure psionic energy that can be used to directly damage a target's neural system. The Power does rank Intensity damage to the target. The maximum ranges are shown on column A of the Range Table.",
    "rulesText": "The hero can create bolts of pure psionic energy that can be used to directly damage a target's neural system. The Power does rank Intensity damage to the target. The maximum ranges are shown on column A of the Range Table. Targets are allowed to resist by making a Psyche FEAT. Failure means the target is knocked unconscious for 1-10 turns , as well as taking neural damage. Targets who possess Mental or Psionic Powers can use these Powers' ranks instead of the Psyche when resisting this Power. Powers like Iron Will, Mental Invisibility, Force Field Generation, Force Field vs. Psionics, and Resistance to Psionics should always bear the initial assault. The Power directly damages only neural tissue (brain tissue, nerve fibers). Damage to the rest of the body is indirect and is consistent with the seizures caused by a mangled nervous system. Note that this Power can only be used against a target that actually possesses a functioning brain. Zombies, animate matter, plants, and nonsentient Robots are immune to the Power. Player characters Robots are assumed to have a sufficiently human-like mind that they are susceptible to the Power's effects. Optional Powers include Telepathy\n\nMental\n\nProbe.\n\nTN.- Nemesis is Force Field vs. Psionics.\n\nThe hero can deplete, negate, or even destroy a target's mental faculties. This alters the target's personality, memory, thought process (Reason and Intuition), and any Mental or Psionic Powers the target had. The target can resist by making a Psyche FEAT; success means the hero is repelled -by a headacheinducing backlash that prevents the hero from attacking that target for 24 hours. Part of the target's Psyche may be depleted by resisting the attack. If the target fails a second Psyche FEAT, then his Psyche drops -1CS for hours. The target's Reason and Intuition rank numbers are reduced by the Power rank number. If both are reduced to zero, the loss is permanent. If the attack is broken off before this point, the target can regain his loss in the standard manner. Although such things as memory and personality are not directly tied to a number, they are still reduced by the Power. The target becomes forgetful or outright amnesiac and develops a bland personality. Note: The hero does not gain the abilities he denies the target. Range is determined by Power rank. Maximums ranges for attacking a single target are shown on column A of the Range Table. Each additional target decreases the range -1CS. The Power can be used repeatedly on the same target until both Reason and Intuition reach zero or until the target repels the hero. Optional Powers include Telepathy, Mental Probe, Mental Duplication, and Mind Blast. The Nemesis is Force Field vs. Psionics.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target"
  },
  {
    "code": "M22",
    "name": "Mind Drain",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M22",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can deplete, negate, or even destroy a target's mental faculties. This alters the target's personality, memory, thought process (Reason and Intuition), and any Mental or Psionic Powers the target had. The target can resist by making a Psyche FEAT; success means the hero is repelled -by a headache-inducing backlash that prevents the hero from attacking that target for 24 hours.",
    "rulesText": "Optional Powers include Telepathy and Sensory Link. The Nemesis is Mental Invisibility.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "targets": "1 target"
  },
  {
    "code": "M23",
    "name": "Postcognition",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M23",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to \"see\" the past. The Power requires the hero to have physical contact with the target whose history is being examined. The hero can mentally examine a person, item, or site and mentally re-live a specific moment of history from the target's point-of-view.",
    "rulesText": "The hero has the ability to \"see\" the past. The Power requires the hero to have physical contact with the target whose history is being examined. The hero can mentally examine a person, item, or site and mentally re-live a specific moment of history from the target's point-of-view. As such, it only reveals factors that somehow affected the target. It is important that the Judge secretly roll the dice whenever the hero uses the Power. This prevents the player from knowing the accuracy of his vision. The hero can delve into the past the number of weeks equal to the Power rank number. For example, a Poor rank can see events of four weeks ago, an Amazing rank can look back almost one year, and a CL5000 rank can look back a century. The clarity of the vision is determined by what FEAT color is attained. A white roll lets the Judge say anything that comes to his head; accuracy and truthfulness are optional. (\"This doll was once a living child.\") A green FEAT gives vague impressions; the Judge should be honest about the real past but give only partial details. (\"A little girl held this doll. She had black hair.\") A yellow FEAT gives general information; the Judge should give any information he can, though within the limits of what the target would know. (\"The girl's name is Helen. She is feeling very angry. She is mad at her friend Davey.\") A red FEAT reveals information that might not be otherwise available, including details that the subject might not have known at the time. (\"Helen is mad because Davey broke her doll. Helen is going to get even with Davey. Helen is a mutant.\") Postcognition can be used to gain information on what an item is and who may have handled it. It cannot provide a detailed analysis of the item's internal structure or as-yet-u n realized potential. For e xample, examining a nuclear bomb would reveal how it was manufactured and handled but the Power wouldn't ev en hint at the bomb's explosive potential. The hero gains +1CS when using Postcognition on friends, possessions, and his dwelling place.\n\nHe gains +2CS when using the Power on himself. This can be used to probe times of which the hero has no memory, such as sleep or amnesia. (\"What was the Black Widow doing in my apartment while I was asleep?\") Optional Powers include modified forms of Telepathy and Time Travel. Telepathy can be used to read the minds of anyone within the scope of the Postcognitive vision. Time Travel can be used to draw the hero to that point in the past; note that this often results in the creation if a divergent timeline.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Same area",
    "duration": "Concentration"
  },
  {
    "code": "M24",
    "name": "Precognition",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M24",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "(Judges detest this Power with a passion.) The hero can see into the future. The Power gives the hero sufficiently clear insight into upcoming events that he might be able to use that foreknowledge to his advantage. The problem lies in two areas, the flexibility of the timestream and the preparedness of the Judge (more on these later).",
    "rulesText": "(Judges detest this Power with a passion.) The hero can see into the future. The Power gives the hero sufficiently clear insight into upcoming events that he might be able to use that foreknowledge to his advantage. The problem lies in two areas, the flexibility of the timestream and the preparedness of the Judge (more on these later). Precognition is an awesome Power and thus has more limits than the Hulk can shake a stick at. (\"Hulk no need puny stick!\") The Power can normally be used only once per day at full rank. Each additional use decreases the rank 1CS down to a minimum of 1 turns lead-time. Second, the player must choose a limitation on the Power. Examples include: The Power is uncontrollable; the Judge decides when the visions occur. Subject matter limited to people. Subject matter limited to objects the hero is touching. Subject matter is limited to sites within 10 feet of the hero. Power only works when the hero is sleeping or in a trance. Power is linked to a specific mental or emotional state that is felt by the hero or a person in a vision. Visions surround the hero with a Hallucination of the future scene. The Power only works once per vision and cannot function again until the envisioned time has come to pass. The third limit is that the Judge, not the player, rolls the dice. The Player cannot try to influence the dice by expending Karma. The Judge never tells the player the outcome or if he even threw the dice at all. This keeps the player from knowing the accuracy of his visions. Player characters can look into the future a number of hours equal to twice the Power rank number. For example, a Good rank can see almost a day ahead, an Unearthly rank can see over a week ahead, and a CL3000 rank can see eight months ahead. The color FEAT determines the accuracy of the vision. White results can be completely untainted by truth; the Judge can improvise to his heart's delight. (\"Three days from now ... Sentinels fighting in space... an armada of aliens swarming upon them... A man named Jubal leads the aliens.\") A green result requires the Judge to be truthful but to only reveal basic details. A yellow FEAT requires full disclosure of anything the Judge can imagine being visible at the time of the vision's occurrence. A red FEAT enables the hero to learn things that might not be readily apparent at the time the vision comes to pass. One problem with the Power is that the timestream is extremely malleable. Each decision made creates an alternate timeline, a parallel Earth almost but not quite identical to the version of Earth where your campaign occurs. Each vision is an event that will come to pass in some timestream somewhere. It need not be the hero's impending timeline. That's where Precognition comes in. Each Precog vision gives the hero a chance to consciously shape his world's timeline. Because of this, the envisioned event might never come to pass, at least not where the hero is concerned. This leads to the second problem, that of Judge preparedness. To accurately and realistically portray Precog, the Judge would need to work out a detailed timeline of the campaign's future events, including variables that account for probable player actions. This is a major headache for Judges. This is a leading reason why Galactuses throughout the multiverse devour any world where Precognition appears. Precogs are therefore warned to use their Power carefully. Short-range Precog can be useful in combat. The hero can use his Power to discover his opponent's next move. This form can be used by any Precog, regardless of the limits otherwise constraining the Power. In game terms, the player tries to make a yellow FEAT at the start of each turn. Success means the Judge must reveal the NPCs' next moves.Initiative is rolled. If the Precog gets it, she has a chance to share her information with her teammates. This use of Precognition must be developed as a Power Stunt. The hero gains an advantage of +1CS when she has a Precog flash pertaining to friends, special enemies, possessions and dwelling places. This increases to +2CS if the flash involves dire events occurring to the Precog herself. The Power can be psychologically damaging to the Precog. The Power is often limited to times within the hero's own lifespan. Most of the time, there is no cause for alarm until the Power starts consistently failing. Delusions may result from frequent but inaccurate visions. Frequent, accurate visions of doom and destruction beyond the hero's capabilities may lead to aberrant behavior, such as chronic depression or chemical dependency. Optional Powers include modified forms of Telepathy and Time Travel. Telepathy enables the hero to actually read the minds of anyone within the scope of the Precog flash. Time Travel enables the hero to actually travel to the time when the vision portrays.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Self",
    "duration": "Instant (Vision)"
  },
  {
    "code": "M25",
    "name": "Psionic Vampirism",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M25",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The Psi-vampire can drain the mental energies of his victim. He then uses the purloined energy to increase his own Strength, Endurance, Psyche, and his own Powers' ranks. The Psi-vampire can drain the mental energy from a target by means of a Power FEAT.",
    "rulesText": "The Psi-vampire can drain the mental energies of his victim. He then uses the purloined energy to increase his own Strength, Endurance, Psyche, and his own Powers' ranks. The Psi-vampire can drain the mental energy from a target by means of a Power FEAT. The intensity rank is determined by the victim's Psyche. A successful FEAT enables the Psivampire to drain an amount of energy equal to his Power rank number. This amount is drawn in equal amounts from the victim's Reason, Intuition, and whatever Mental Powers he possesses. The process can continue indefinitely, with each successful FEAT enabling the Psi- vampire to drain more mental energy. The Psi-vampire can voluntarily cease feeding at any time by making any color FEAT except red. A red FEAT means he has entered an uncontrollable feeding frenzy that can only end when the victim is completely drained or the Psi-vampire has. been repelled. If the Psi-vampire fails to make a FEAT at any point in the feeding process, he is instantly repulsed by the victim and can never re-establish his attack. Furthermore, the victim is now immune to any further vampire attacks by that particular Psi-vampire. This immunity does not extend to other Psivampires. The Psi-vampire distributes the gained energy among his Strength, Endurance, Psyche, and whatever Powers he has. He cannot raise this Power's rank; no Vampire of any type can ever raise his own Power rank. So why do Psi-vampires do it? The answer is they lose energy at a frightful rate. The rank numbers for Strength, Endurance, Psyche, and all his Powers (except this one) each drop one point per hour. The Psivampire must feed in order to return the affected Abilities to their original ranks. This also explains why Vampires are so rare: lower ranked Vampires must constantly feed and are therefore easily detected and destroyed. If the Psi-vampire is-deprived of victims, he enters a death-like trance when all his afflicted Abilities drop to Shift- 0. His Vampiric Power continues to function and will try to feed on anything that comes in contact with the body. When the Abilities return to Feeble rank, the\n\nPsi-vampire returns to life.\n\nWhen the Psi-vampire is created, the player must choose at least one Weakness. The player can increase his Power rank +1CS for each additional Weakness he chooses, up to a limit of three additional Weaknesses. Psi-vampirism is communicable. A sentient being who was completely drained by a Psi-vampire must make a Psyche. FEAT roll. A red FEAT means the victim has himself been transformed into a Feeble Psivampire. The Nemesis is an Enhanced Psyche raised two levels higher than the Psivampire's Power rank.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Contact",
    "targets": "1 target"
  },
  {
    "code": "M26",
    "name": "Remote Sensing",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M26",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can project sensory points of perception across physical space without moving their physical body.",
    "rulesText": "This is a catchall name for any Power that enables the hero to psionically extend the range of any sense. The senses include taste, smell, touch, balance (including gravity sensing), and temperature. The exceptions are sight and hearing, as these are already covered by the Powers of Clairvoyance and Clairaudience. The Power can also be used to extend the range of senses not present in Normal Humans, such as senses that detect Kirlian auras or magnetic fields. The player must choose a single sense to be extended by this Power. It must be a sense that is common to the hero's physical type. The taste/smell form can be useful in analyzing distant and possibly toxic substances. He can savor tastes and smells that might kill him if he were to directly experience them. (\"Nerve gas smells like freshly baked cinnamon buns.\") He can develop an extensive palate that permits him to identify substances by taste; a green Reason FEAT should suffice. The tactile form is good for identifying concealed or inaccessible shapes. Examples include the interior of a lock or a non-surgical examination of a patient. Again, a green Reason FEAT coupled with the hero's Talents should suffice. The range is determined by the\n\nPower rank. Maximum ranges are shown on column E of the Range Table. A drawback to this Power is that it acts as a funnel to direct Psionic attacks against the hero. Resistance is decreased -1CS because of this. Optional Powers include additional forms of this Power, Clairaudience, and Clairvoyance. The Nemesis is Mental Invisibility.",
    "errataNote": "",
    "powerStunts": [
      "Anchoring sensor to a moving vehicle or person"
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "M27",
    "name": "Sensory Link",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M27",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can telepathically link his senses with those of another being. He can use the information gained from the other's senses as if it came from the hero's own senses. An example would be a blind man really seeing through his guide dog's eyes.",
    "rulesText": "The Power is crucial to senseimpaired characters. Such characters need other beings with the necessary senses to replace the hero's own deficiency. The hero could receive input from any living being, including companions, adversaries, onlookers, and even animals. The range for this is line-of-sight within one area. The hero can concentrate on the input from a single being but he can also automatically scan for other possible sense-donors. This is a mental reflex action that permits the hero to constantly seek out new contacts. Sensory Link can be of benefit to heroes who are not sense-impaired. In such cases, the hero can scan distant areas through the senses of beings within the target area. The Power can be used to locate people, spy on foes, or simply to check out the scenery. The sense donor is unaware that part of his senses are being siphoned by the hero. A red Reason FEAT is required for the sense-donor to feel the Power's presence and even then the donor would probably not recognize what is happening to him. A weakness of the Power is that it decreases -1CS the hero's resistance to psionic attacks aimed at him or at the current sense- donor. A second disadvantage is that the hero's initial\n\nAgility and Fighting ranks are decreased -1CS due to the fact that the hero is operating with a detached point of view. Either of these can be overcome by expending Karma.\n\nAn Optional Power is Telepathy. The Nemesis is Neural Manipulation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 target"
  },
  {
    "code": "M28",
    "name": "Serial Immortality",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M28",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "A character with this Power can suffer damage, get sick, age, and even die. None of it is permanent to the character, though. When the hero's body dies from any cause, the unique nature of his lifeforce enables it to transfer to a new body.",
    "rulesText": "A character with this Power can suffer\ndamage, get sick, age, and even die.\nNone of it is permanent to the\ncharacter, though. When the hero's\nbody dies from any cause, the unique\nnature of his lifeforce enables it to\ntransfer to a new body. He can also\ntransfer some but not all of his\nPowers to the new body. The hero\nloses all Karma with the death of the\nold\nbody.\nThere are five forms of Serial\nImmortality, each with a different\nmeans of rebirth and Power\ntransferral. The player must choose\none of these methods, either\nselecting for himself or letting the die\n| Die Roll | Method |\n| :--- | :--- |\n| 01–20 | Newborn |\n| 21–40 | Premade |\n| 41–60 | Re-animation |\n| 61–80 | Spontaneous Creation |\n| 81–00 | Parasite |\n\nNewborn-The body is that of an infant. The character can enter the body at any point from conception to birth. He is helpless until birth actually occurs. He can accelerate the body's physical development in order to induce birth and quickly regain physical maturity. The rate of accelerated development is a multiplier equal to the Power rank number. A Feeble rank ages twice as* fast as normal, a Remarkable rank ages one month for each day that passes, and a Shift-Z can age over a year for each real day. Example: Avengers #200 revealed that Immortus' son Marcus had entered the an embryo he had implanted in Ms. Marvel's body. He was born within weeks of her discovering she was pregnant and grew into a seeming 20-year-old within a day of his birth. Mental Powers are immediately transferred to the new body. Physical Powers are regained as the body matures. The Judge can decide how and when the Powers reappear. Powers that are derived externally or result from massive alterations of the hero's original form are not transferred. The hero will have to recover or recreate the source of these Powers in order to regain them. previously prepared clone or android body that was prepared specifically for this purpose. Such a body is already physically mature and in possession of the full range of the hero's Powers. It is completely mindless and rests in a comatose state until activated by the hero's lifeforce. The knowledge of how to create these bodies can be learned by characters with Remarkable or better Reason, provided they are properly trained. Someone with Amazing Reason can figure it out for himself. A Laboratory or Medical Package of Amazing cost is required to create these bodies. Each body has an Remarkable cost. Magically created bodies require an equivalent Resource level. If a premade body is unavailable at the time the old one dies, the lifeforce drifts in Limbo until such a body becomes available. Re-animation- The l ifeforce enters and revives a recently deceased but unmutilated corpse, preferably of the same species as the original body. The body must be reasonably intact, although the Power does include a single-use form of Selfhealing that repairs the body and restarts bodily functions. The hero can not control which body he enters but rather is drawn to one in the following order of preference: 1) closest to old body, 2) most recently dead, and 3) least severe damage. Mental Powers are immediately transferred. Most physical Powers are regained as the hero-re shapes the new body to accommodate the Powers' use. Powers that are external must be recovered or recreated. The amount of time needed to reshape the body is the number of days equal to 100 minus the Power rank number. If the corpse has intrinsic Powers, the hero gains the use of these upon re-animating the corpse. Such Powers are not transferred to subsequent bodies. The re animated body regains full life within a day of the Power's use. •\n\nSpontaneous Creation- This is the most sociably acceptable form of Serial Immortality. The hero creates existing matter and energy into the flesh of a new body. The newlycreated body is identical to the previous one and possesses all Powers except externally derived ones. Any Power that is in the hero's self-image can transfer. The time needed to create a new body is the number of days equal to 100 minus the Power rank number.\n\n• \n\nParasite. This is the nastiest, least socially acceptable form of Serial Immortal ity. The character's lifeforce invades a living, physically mature body and overwhelms the original occupant's mind. Successful invasion is determined by pitting the Power rank against the would-be victim's Psyche. The invader must make a Power FEAT whose intensity is equal to the victim's Psyche. Failure means the invader must choose another victim. If the invasion succeeds, the original mind suffers one of five possible fates; the player must choose one that holds for all victims of this Power. There is an equal random chance for each. •\n\n• \n\n• \n\n• \n\n• \n\nSubordination: The victim retains consciousness and individuality but loses all physical control. He is a prisoner in his own body. Merger: The victim's ' mind is incorporated into the greater mind of the invader. Comatose: The victim's mind is rendered unconscious for the duration of the invasion. Obliteration: The victim's mind is completely destroyed. Eviction: The victim's mind is driven out of his body and becomes a Free Spirit (see M11).\n\nIt is incredibly difficult to finally defeat an adversary with any form of Serial Immortality. The best the foe can normally hope for is to defeat the current body and then prepare for the next incarnation. It is possible to stop the infinite progression from body to body by preventing the hero from leaving his current body (suspended animation will do) or entering a new one (stranding the hero in intergalactic space is a good tactic). The lifeforce can be directly fought or even killed within the Limbo dimension. Power can be forced out of his current body without that body getting killed in the process. The Judge is free to decide what conditions apply in his campaign; suggested moans revolve around coercion or such Powers as Magic, Power Controls, Force Field vs. Hostiles, Summoning, and Exorcism. Such Powers must exceed the hero's Power rank by 2CS in order to forcibly evict the lifeforce from the body. If successful, the lifeforce is driven into Limbo or a new body in a more peaceful location. As for the now vacated body, the results vary with the form and variety of Serial Immortality: •\n\nNewborn-The body is now occupied by the innocent soul of a newborn infant, regardless of the body's physical age.\n\n• \n\nPremade-\"He's dead, Jim.\"\n\n• \n\nRe-animation-\" She's dead, Jim.\"\n\n• \n\nCreation-The body reverts to its original materials.\n\n• \n\nParasite/Subordination-The victim awakens with full knowledge of his past plight.\n\n• \n\nParasite/Merger-The victirr awakes but is temporarily schizoid due to lingering effects of the merger.\n\n• \n\nParasite/Comatose-The victim awakons with no knowledge of the intervening time.\n\n• \n\nParasite/Obliteration-\" one's dead, too.\"\n\n• \n\nParasite/Eviction-The body is comatose but will revive when the original mind rejoins the body.\n\nThe Nemesis is Exorcism.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "M29",
    "name": "Speechthrowing",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M29",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is best described as \"super-ventriloquism.\" Although it is radically different in execution from the Talent of Ventriloquism, the effect at low levels is similar. Simply put, the hero can make his voice audible in a distant location, without the vocal soundwaves actually traveling the intervening distance. The Power is actually a specialized form of Telekinesis which allows the hero to agitate the distant molecules in a way that simulates sound transmission.",
    "rulesText": "This is best described as \"superventriloquism.\" Although it is radically different in execution from the Talent of Ventriloquism, the effect at low levels is similar. Simply put, the hero can make his voice audible in a distant location, without the vocal soundwaves actually traveling the intervening distance. The Power is actually a specialized form of Telekinesis which allows the hero to agitate the distant molecules in a way that simulates sound transmission. The Power enables the hero to be heard instantaneously at any distance, despite any barriers to normal sound transmission. The only barriers that stop this Power are those that interfere with Psionic Powers. Speechthrowing's range is determined by its Power rank. Column E of the Range Table shows appropriate distances. The hero has 100% accuracy, provided he can somehow sense the target area. This is commonly provided by such Powers as Clairaudience and Clairvoyance. If the hero lacks the means to check on his aim, he cannot control anything but the basic direction his voice is being sent. If the hero has other sonic-based Powers, they can be combined with this Power to greatly enhance their range. If the hero has Extradimensional Detection or Dimension Travel, these can be used to modify the Power and enable the hero to Speech-throw into other Dimensions. The Bonus Power is Clairaudience. Optional Powers include Clairvoyance, Vocal Control, Hyperhearing, and Sensory Link. The Nemesis is Force Field vs. Psionics.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "M30",
    "name": "Telekinesis",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M30",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can handle material objects without having to make direct or indirect physical contact (pushing or blowing, for example). The hero can perform any action that could be accomplished using normal Strength. The Power rank serves as an equivalent for the Strength rank.",
    "rulesText": "The hero can handle material objects without having to make direct or indirect physical contact (pushing or blowing, for example). The hero can perform any action that could be accomplished using normal Strength. The Power rank serves as an equivalent for the Strength rank. Most Telekinetics (\"TKs\") visualize their Power in terms of an amorphous arm extending from the body. This leads to a curious psychological handicap in that most TKs cannot lift their own bodies. Only rare examples like\n\nMarvel Girl have overcome this bit of irrationality. The range is determined by the Power rank. Column A shows the ranges for a single act of TK activity. Each additional simultaneous action reduces the range -1CS. Multiple activities share the common pool of TK strength. The more actions that are attempted, the weaker each telekinetic arm becomes. If the hero attempts to perform a greater number of simultaneous complex activities than the Judge thinks plausible, the Judge may require an Agility FEAT. If the hero also possesses Remote Sensing, she can develop a sense of touch through her TK grasp. This permits the hero to handle materials that are not within her sight. Clairvoyance can be incorporated into TK to permit visual guidance. Optional Powers include Matter Animation, Molding, Clairvoyance, Remote Sensing/Touch, Levitation, and True Flight. Nemesis is either Force Field vs. Psionics or Gravity Manipulation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 target / object"
  },
  {
    "code": "M31",
    "name": "Telelocation",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M31",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can Psionically locate a chosen target. This differs from normal Tracking in that no physical or sensory contact, however tenuous, is required. Consequently, the Power is not hampered by the concealment, erasure, or absence of the target's \"scent.\" Telelocation can operate over immense distances.",
    "rulesText": "The hero can Psionically locate a chosen target. This differs from normal Tracking in that no physical or sensory contact, however tenuous, is required. Consequently, the Power is not hampered by the concealment, erasure, or absence of the target's \"scent.\" Telelocation can operate over immense distances. The only factors that can hinder the Power are those that diminish any Psionic activity. The range, determined by the Power rank, is shown on column D of the Range Table. This represents a sphere centered on the hero; the quarry must be within it. The hero must have a stimulus to channel her Power toward a specific quarry. The nature of the stimulus determines' the Power FEAT. A green FEAT requires contact with a part or possession of the quarry. A yellow FEAT requires the hero to have previous contact with the quarry.\n\nA red FEAT is required if the hero only has second-hand information about the quarry (and it had better be good). Optional Powers include Clairvoyance (limited to already located quarries) and Extradimensional Detection (which automatically combines with this Power to extend its range into other dimensions). The Nemesis is Mental Invisibility.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Universal",
    "duration": "Maintained",
    "targets": "1 target"
  },
  {
    "code": "M32",
    "name": "Telepathy",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M32",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can communicate on a direct mind-to-mind basis. This is automatic with willing minds or Psyches with ranks lower than the Power rank. Equal Psyche ranks require a yellow FEAT.",
    "rulesText": "The hero can communicate on a direct mind-to-mind basis. This is automatic with willing minds or Psyches with ranks lower than the Power rank. Equal Psyche ranks require a yellow FEAT. Minds with mental Powers or some form of Psionic defense require a red FEAT. Uncooperative beings with Psyches exceeding the Power rank -are impossible FEATs. Range is determined by Power rank. Column D of the Range Table shows the limits. At Class 1000 the Power can breach dimensional barriers; this can also be accomplished if the hero combines Telepathy with Extradimensional Detection. In the main Marvel Universe, Magneto created a special magnetic flux in the Earth's magnetic field. His purpose was to hinder Professor X's efforts to locate him. The result is that terrestrial Telepathy is decreased 3CS in range with a minimum of contact-only. Actual Telepathic strength is unaffected by Magneto's interference. If the hero is beyond Earth's altered magnetic field, in the past, or in other dimensions, then the limit -disappears and the Telepathy can assume its true range. When the hero is created, the player can raise the Power rank +1CS by choosing a limitation. Examples include either receiving or transmitting only (not both), communicating in only words or visual images (not both), or being limited to contacting only other telepaths and other Psionic types.\n\nOptional Powers include Empathy, Hallucinations, Mental Invisibility, Mental Probe, Mind Blast, Mind Drain, Sensory Link, and Psionic Detection. The Nemesis Psionics. is Resistance to",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 target"
  },
  {
    "code": "M33",
    "name": "Total Memory",
    "category": "Mental Enhancement",
    "source": "UPB Table p. 16-19 & Entry M33",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to remember anything that he has ever experienced. This could be a book he's read, the faces of everyone he saw on Tuesday, what birth was like, and so on. The accuracy of his recall is his Power rank number treated as a percentage.",
    "rulesText": "The hero has the ability to remember anything that he has ever experienced. This could be a book he's read, the faces of everyone he saw on Tuesday, what birth was like, and so on. The accuracy of his recall is his Power rank number treated as a percentage. Feeble is 2%, Excellent is 20%, and so on to automatic accuracy at Unearthly rank or above. The color FEAT reflects the nature of the memory being sought. Green FEATs involve personal memories. Yellow FEATs involve learning experiences. Red FEATs involve unconsciously gained information, such as the faces of everyone the hero saw on Tuesday. The Power is the perfect complement for Hyper-Intelligence by providing a built-in library. It can be used to simulate that Power, Hyper-Invention, or Weapons Tinkering, provided the hero once read texts that explained how to do things that come naturally to those with the other Powers. (\"Well, I read Reed Richard's notes on constructing dimensional gateways, so if I just follow his plans we should be in the Negative Zone by next Monday night.\") When playing a character with Total Memory, assume he is a voracious consumer of all media. It is to his advantage, after all. Such characters are also fond of quoting obscure texts or unconsciously reciting encyclopedia entries. The Power doesn't really alter either Intuition or Reason, thus these can be used as a guide for what the hero has probably read in the past. When the hero claims to have read a special text, the player is required to make a Reason FEAT to prove he has read something along the desired liner. Flashback is a real danger. If the hero was ever a victim of a mental attack, there is a chance the memory will accidentally resurface at a later time and the effect returns anew. Such flashbacks occur when the hero is somehow reminded of the original incident. The hero must make a green Psyche FEAT to avoid reliving the full effects of that other Power. Example: Phtomemry was under Ringmaster's Hypnotic Control for two days back in 1978. Today he saw a news report on Ringmaster's parole hearing. Suddenly the compulsion to rob jewelry stores returned. Optional Powers include Hyper-Invention, Hyper-intelligence, and Weapons Tinkering. The Nemesis is Mind Drain.\n\nPhysical Enhancement Powers Die Roll\n\nPhysical Enhancement Powers\n\n(Code)\n\n01-14 15-28 29-30 31-33 34-40 41-42 43-45 46-47 48-60 61-62 63-67 68-71 72-76 77-78 79-82 83-90 91-00\n\nArmor Skin Body Resistance Chemical Touch Digestive Adaptation Hyper-Speed Hypnotic Voice Lung Adaptability Pheromones Regeneration* Self-Revival* Self-Sustenance Stealth Suspended Animation True Invulnerability* Vocal Control Waterbreathing Water Freedom\n\nP1 P2 P3 P4 P5 P6 P7 P8 P9 P10 P11 P12 P13 P14 P15 P16 P17",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
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
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "MC1",
    "name": "Bonding",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to join two or more targets together on a molecular level. The effect is the same as if the targets were glued or welded together. In actuality, the hero has induced molecular adhesion.",
    "rulesText": "The hero has the ability to join two or more targets together on a molecular level. The effect is the same as if the targets were glued or welded together. In actuality, the hero has induced molecular adhesion. A submicroscopic examination would fail to reveal any foreign material (such as a glue) or disturbances in the normal arrangement of the target's structure (such as the distortion caused by welding). The Bonding is so powerful that attempting to sever its effect results in physical damage to either of the Bonded targets because the only way to forcibly separate two Bonded objects is to tear the surface of one or both of them. This causes Typical wounds to a living target. The range for Bonding is limited to Contact only. The hero need not touch the actual area to be Bonded, although the hero needs to touch the two targets somewhere in order to direct the Power's effect. Once the hero is touching both targets and has begun to manifest his Power, Bonding occurs at any point where the two targets are in contact with each other. The Bonding process takes any number of turns, depending both on the hero's Power rank and the desired material strength of the Bonding. The first turn produces a Bonding of Feeble material strength.\n\nEach turn the Bonding process continues raises that material strength + 1 CS, up to the limit of the Power rank. At any point the hero can cease to use his Power and thus produce Bondings of varied strengths. Example: K. Z. Glew has Good Bonding and is testing his Power on a number of blocks. When he holds two together for two turns, he produces a Poor Bonding. Holding two together for three turns produces a Typical Bonding. Holding two bricks for four turns produces a Good Bonding; in fact, K. Z. could concentrate on the same two bricks all day and not be able to exceed that Good Bonding. The duration of the Bonding is determined by a Power FEAT at the time the Power is used. A green FEAT creates a Bond that lasts a number of turns equal to the hero's Reason rank number times 100. A yellow FEAT increases the multipliers to 10,000 turns times the Reason rank number. A red FEAT ensures a permanent Bonding. If the Bonding is temporary, its effects end without a trace at the expiration of the time limit. This is a Power that readily combines with many of the other listings in this book. Combining it with Webcasting produces an equivalent to Spiderman's web. Weapons Tinkering produces an equivalent to the Trapster's glue gun. Chemical Touch produces a natural adhesive coating on the hero's body. Combustion or Fire Generation produces napalm. There are more but I'll leave them to the player's imagination to devise. The Power can only affect solids. Liquid, gaseous, ethereal, and Phasing matter are immune to this Power's effects. Once Bonded, matter cannot Phase as a means of escaping the adhesion; doing so causes Typical damage as the Bonded surface is left behind. Transition from solid to either liquid or gaseous state will work to free the Bonded matter without physical damage, although this is not an option for most people. Bonding only occurs on the surface and does not penetrate more than 1/1 6th of an inch into any Bonded material. The effect this has on living targets is that only the epidermis is affected. As it does not affect liquids, the Power automatically penetrates any coating that might otherwise protect the target. Optional Powers include Missile Creation, Spray, Webcasting, and Weapons Tinkering. The Nemeses are Phasing, Body Transformation, and Energy Body.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "duration": "Rank turns",
    "targets": "1 target / object"
  },
  {
    "code": "MC2",
    "name": "Collection",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can cause any.desi red. material to collect in a specific location. This material must already be present and diffused throughout the hero's vicinity, whether in the air, water, soil, or scattered across the ground.",
    "rulesText": "The hero can cause any desired material to collect in a specific location. This material must already be present and diffused throughout the hero's vicinity, whether in the air, water, soil, or scattered across the ground. The Collection area has a radius determined by the Power rank; distances are shown on column C of the Range Table inside this book's cover. For example, an Incredible rank can collect material from as far as 25 miles away.\n\nCollected material instantly teleports to the designated Collection site. The site must be in line of sight of the hero and within his Power's range. The hero can Collect per turn a maximum amount of material measured in the number of pounds equal to the Power rank number. This assumes, of course, that enough material exists within the vicinity in order to be Collected. Any material of any nature can be Collected. There is a partial exemption to this rule in regards to living beings. The Power can only Collect living beings whose weight is within the weight limits for the Power; if the beings weighs more, the Power can not affect them aside from a brief tug. If the Power is used to Collect the bodily products of living beings, player and Judges are to assume that so little is drawn from each being that no harm results. For example, a character could Collect a mass of blood without having to worry that he bled some stranger to death. The Power does not after the state of any matter either before or after Collection. The desired matter must be in the basic chemical formulation desired. Desired materials that are in some altered state are not affected by the Power. For example, trying to Collect steel in a junkyard full of rust will lead to naught. The exception is if the desired material is in either a state of solution or suspension, since neither actually affects the chemical nature of the material. For example, imagine your hero is standing at the seaside and practicing his Power. He cannot Collect the hydrogen bound into the water but he could Collect salt, gold, or anything else dissolved into seawater. Collecting salt is easy; a Remarkable Power can Collect a man-sized pile within a minute's time. Gold is harder; each cubic mile of seawater contains only a few ounces of gold.\n\nDue to some unexplained limitation to this Power, it cannot randomly Collect foreign materials found within the bodies of anyone within the Power's range. Common foreign materials include tooth fillings, prostheses, sutures, and drugs. If the hero must Collect such materials from a body. For example if he knows arsenic has been swallowed by someone, the conditions increase in difficulty. The hero must be in contact with the source of the desired material and the hero must make a red FEAT to withdraw the material without harming the donor. Failure to do so means the material is still locked within the target's body. Ethereal and Phasing matter can be Collected. They just can't be held for any length of time without consciously and repeatedly using the Power to return such matter to the Collection site. This Power is most commonly linked to the Matter Control and Conversion Powers as a way to gather sufficient raw material to permit the other Powers to function. These are listed as Optional Powers. Even if used by itself, this Power can be used effectively. Matter can be Collected to form a protective shield or to entrap a foe in a suddenly appearing pile of debris. Dirt or water can be Collected to smother a fire or dampen escaping radiation. The hero is free to develop various Power Stunts using suddenly materialized matter. The complexity of the material to be collected determines what Intensity FEAT is required. Raw, amorphous materials can be collected in a dusty pile by a green FEAT. Common examples include metals, dirt, and water. Formed or complex material requires a yellow FEAT to collect in recognizable form. Examples include bricks, edibles, and comic books. Biological material requires a red FEAT, whether the hero is trying to collect bile or hamsters. Optional Powers Crystallization, Matter Micro Environment, Weather, Combustion, Conversion, and Conversion.\n\ninclude Animation, Molding, Elemental Molecular\n\nThe Nemesis is Matter Animation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "Rank areas"
  },
  {
    "code": "MC3",
    "name": "Crystallization",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can transform any target material into a gemlike material that possesses Power rank material strength. Crystallization occurs because the hero has the ability to shape the molecular bonds of normally amorphous matter into a crystal matrix of great strength. The Crystallization can occur at any site within the hero's line of sight and range; distances are determined by the Power rank and can be found on column C of the Range Table on the inside cover.",
    "rulesText": "The hero can transform any target material into a gemlike material that possesses Power rank material strength. Crystallization occurs because the hero has the ability to shape the molecular bonds of normally amorphous matter into a crystal matrix of great strength. The Crystallization can occur at any site within the hero's line of sight and range; distances are determined by the Power rank and can be found on column C of the Range Table on the inside cover. The newly-formed Crystal is initially stationary; it cannot be launched like a missile (unless the hero possesses Missile Creation, but I'm getting ahead of myself). It can be formed in such a position that gravity immediately affects it. Crystallization automatically affects non-living, unprotected, stationary targets. Moving targets require the hero to make an Agility FEAT in order to hit the target. If Crystallization is used as an attack against a living target, it can be resisted by the usual methods. Methods of protecting a target from being Crystallized include Force Field vs. Energy Attack, Resistance to Energy Attack, True Invulnerability, and various Magics and Power Controls. Crystal can be formed in any shape the hero desires. The amount of Crystal the hero can create in a single turn is the number of square feet equal to the Power rank number. The material to be transformed into Crystal is drawn from particles in the air or from the target itself. Solid targets can themselves be Crystallized. If the Power is used on a living target, innate safeguards incorporated into the Power place the target into a semi-state of Suspended Animation; all life functions temporarily cease but the target remains aware of its condition and surroundings. A Crystallized lifeform must remain intact if the process is to be reversed. If the Crystallized lifeform is shattered, the transformation is permanent. Note: the shards-of a shattered, Crystallized lifeform all possess some of the victim's lifeforce; the percentage of the victim's Psyche possessed by a particular shard is equal to the percentage of the original body represented by the shard. Such shards can be used to create powerful Magic. Such shards can also lead to later Plot Complications. (\"You don't understand. The gem in the necklace I gave Helen was part of Leviathan!\") Normally Crystallization is only temporary. The duration of a given Crystal is the number of minutes equal to the Power rank number. At the expiration of this time, the Crystal reverts back to its original material. If the Crystallization was directed in the air the original material was probably dust particles. As mentioned earlier, if the Crystallization was used to transform a living target and that Crystal was subsequently shattered, the transformation is made permanent. (This rule is purposefully intended to spare the Judge and players from dealing with the hamburger that would be created if the formerly living target did revert to its original state.) For game purposes, the category of \"living target\" can be expanded by the Judge to encompass any of the Physical Types for player characters and NPCs. The Power can be combined with other Powers listed in this book. As mentioned before, Missiles can give the Crystals momentum and range. Weapons Creation can specialize in crystalline instruments of destruction. Body Armor or Body Coating can be a suit of flexible crystalline armor with that gives Power rank Resistance to physical or energy attacks. Visionbased Detection Powers can be achieved by the hero spontaneously forming optical devices and lenses of crystal. If the hero has an exotic Physical Type, perhaps he can himself be composed of living crystal. Such categories include Modified Humans, Cyborgs, Robots, Abnormal Chemistry, Mineral, Compound, and Changeling. Optional Powers include Weapons Creation (limited to Crystal weapons only), Collection, Matter Animation, Missile-Creation, and Spray. Nemeses include Force Field vs. Energy Attack, Force Field vs.\n\nPhysical Attack, Resistance to Energy, Resistance to Physical Attack, and Disintegration.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "duration": "Rank turns",
    "targets": "1 target / object"
  },
  {
    "code": "MC4",
    "name": "Diminution (Matter Control)",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can shrink inanimate objects or solid matter down to microscopic scales while retaining mass or proportional density.",
    "rulesText": "The hero can reduce the size of a target. The target must be in line of sight and within one area of the hero. Any material can be Diminished by this Power With the sole exception of material that has already been Diminished by an equal or higher rank of this Power. In such a case, the would-be target is assumed to already be Diminished to a further point than the hero could reach anyway. The level to which the hero can Diminish a target is determined by the Power rank. Levels appropriate to this Power are: In practical terms, a Diminishment rank of Shift X, Y, or Z is sufficient to reduce a normal- sized human to the size of a cell. Either CL1000 or CL3000 will reduce him to atomic scale. CL5000 reduces a human to such a point where he can enter a Microverse such as Jarella's world of Kaa. A note on Microverses: These are miniature dimensions that can be reached by a person undergoing extreme size reduction. The act of\n\nShrinking causes the person to breach the Dimensional Barriers and reach a chosen Microverse. The worlds within a Microverse roughly correspond to but are not actually atoms or molecules. Once within a Microverse, the Dimension traveler finds himself in an environment that approximates conditions in the larger, outer world. Microverses may themselves contain even smaller Microverses. Even our own world may in fact be a Microverse to some inconceivably larger Macroverse. The duration of Diminution on a target is determined by a Reason FEAT made at the time the Power is used on the target. A green Reason FEAT gives a duration of the Reason rank number times 100 turns. A yellow FEAT increase this to 10,000 turns times the Reason rank number. A red FEAT makes the diminution permanent; in such a case the only way the target can return to its original size is through use of Enlargement, Magic, or Power Negation. There are three very different ways to create the effect of Diminution. Each has its own mechanism and peculiar properties as a result of that mechanism. The player can either choose for himself or let a random die roll determine which form.\n\nDiminution Rank (% of Resultant Size Original Size) FE PR TY GD EX RE IN AM MN UN X Y Z CL1000 CL3000 CL5000\n\n50% 25% 12.5% 6.25% 3% 1% .5% .25% .1% .01% .001% .00001% .0000001% .00000000001% .00000000000000001% .000000000000000000000000000000001%\n\n• \n\nAtomic Collapse- The hero decreases the distance between the target's atoms and subatomic particles. The target does not lose weight as it shrinks. Rather, it becomes increasingly dense and could eventually collapse into neutronium (CL3000 Diminution) or even a black hole (CL5000 Diminution). Strength is unaffected by the change in size but leverage becomes increasingly difficult at smaller sizes.\n\n• \n\nAtomic Reduction- The hero decreases the number of atoms in the target's body. The lost matter is either disintegrated (if the Diminution is permanent) or temporarily removed from the target's plane of existence and stored on another plane until it is needed to return the target to its original size. Mass and strength both decrease as the target Shrinks; the lower ranks are proportional to the target's new size. The target becomes increasingly simple in structure and reach a stage where the remaining structure is too simple to sustain the lifeforce of a living target. This occurs at Shift X rank. If the Diminution is temporary, the target's lifeforce is stored on the same plane as the displaced matter that normally forms his body. At Shift Z Diminution, the target consists of only a single molecule which immediately vanishes when the next rank is reached.\n\n• \n\nAtomic Reduction- This is the most common form of Diminution and the only form that permits the target to enter a Microverse. The hero can reduce the size of the atoms and subatomic particles themselves, thus reducing the overall size in a proportional manner. Mass and physical strength are reduced a proportional amount. While this Power has more advantages than the other forms, it has a deadly disadvantage. As the target's atoms shrink, they are no longer able to interact with other, normal sized atoms. As a result, a living target is unable to breathe the air or consume food or water. Seen in this light, this form of Diminution is the equivalent of a Fatal attack. Fortunately, there is a 95% chance the Power envelopes the target in an energy field that shrinks anything within one foot (proportional to the target's current size) of the target to the same size as the target. This allows the target to breathe, drink, and eat. The existence of this field is randomly determined at the time the source of the Diminution is created. If the hero lacks such field, then any target must have its own supply of proportionallysized consumables. Even non-living targets can be affected in that the Power effectively insulates them from electricity, since normal-sized electrons cannot flow into a Diminished conductor. Treat this as rank level Resistance to Electricity. If the field exists, electrons are automatically Shrunken to permit conductivity. It is assumed that when the Power is used, the hero intends to Diminish the entire target. If the hero specifies, he can attempt to shrink only part of a target. Since this is equivalent to tearing the target apart, a Power FEAT determined by the Material Strength of the target is required to do such an act. Example: Sizemaster has possesses Remarkable Diminution. Seeing an uproar at his local bank, he wanders in to see what's up. He discovers The Shocker trying desperately to free people trapped in a safe and he decides to assist the rescue. He locates a section of the safe away from The Shocker and begins to manifest his Power. The safe is made of steel and reinforced concrete and has a Remarkable Material Strength. Good, Sizemaster only needs to make a yellow FEAT to Diminish a hatch in the safe's wall. Within twelve seconds he has Diminished a six-foot-wide area into a one-inch-wide plug, which drops out of the wall and rolls around on the floor. Sizemaster is helping the trapped people out of the safe when Shocker finally burns through the opposite wall. Later the two rivals seal the hole Sizemaster made by holding the plug in place as returned to its original size. The Power can automatically effect a non-living, stationary, unprotected target. Moving targets require the hero to make an Agility FEAT to hit the target with his Power. Living targets are allowed to resist the Power's effects in the same way they would resist any energy attack Targets can be protected from Diminution by such Powers as Force Field vs. Energy, Resistance to Energy, True Invulnerability, certain Magics and Power Controls, and the simultaneous use of an opposing Enlargement Power. Atomic Dispersal opposes Atomic Collapse, Atomic Gain opposes Atomic Reduction, and Atomic Growth opposes Atomic Shrinkage. If the opponent lacks the matching form of Enlargement he can still try to negate the effects of Diminution with whatever form he possesses; the results can get a little weird, though. The Nemeses are those Powers mentioned in the previous paragraph.",
    "errataNote": "",
    "powerStunts": [
      "Shrinking structural barriers or hostile weapons",
      "Pocketing large vehicles"
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "duration": "Rank turns",
    "targets": "1 target / object"
  },
  {
    "code": "MC5",
    "name": "Disruption",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can destroy a target's physical structure without resorting to a physical or overt energy attack. The molecular bonds that give a target its solidity are directly Disrupted, with the result that the target collapses into dust, sand, liquid, or even vapor. The Material Strength of the target determines what Intensity FEAT is required.",
    "rulesText": "The hero can destroy a target's physical structure without resorting to a physical or overt energy attack. The molecular bonds that give a target its solidity are directly Disrupted, with the result that the target collapses into dust, sand, liquid, or even vapor. The Material Strength of the target determines what Intensity FEAT is required. For example, asphalt has Good Material Strength and consequently would require a Good Intensity FEAT to destroy. The hero can Disrupt any target within both line-of-sight and range. The range is determined by the Power rank; distances are shown on Column A of the Range Table inside this book's cover. The amount of matter the hero can Disrupt in a single turn is the number of pounds equal to his Power rank number. If the player chooses when creating the character, he can increase either range or amount affected any number of +CS by decreasing the other factor an equal number of -CS. Example: an initial rank of Good can be altered by up to 3CS and produce results as varied as Feeble range\n\nRank Resultant size (x original size)\n\nFE PR TY GD EX RM IN AM MN UN X Y Z CL1000 CL3000 CL5000\n\n1.5X 2X 3X 4X 6X 8X 10x 12X 15X 20X 50X 100X 200X 500X 1,000X 10,000X effect (40 pounds) or Incredible range (11 areas) and Feeble effect (two pounds). Also when creating the character, the player can choose whether to make the Disruption permanent or temporary. Choosing the temporary option raises the Power rank +1CS. The duration of the Disruption is determined by a separate Reason FEAT made at the time the Power is used. A green FEAT gives a duration equal to 100 turns times the Reason rank number. A yellow FEAT increases that to 10,000 turns time the Reason rank number. A red FEAT makes the Disruption permanent. At the expiration of the duration, the Disrupted matter reforms in its original shape although not necessarily in its original location. If the target is living, the Power has the peculiar;r effect of placing the target in a state of semi- Suspended Animation. All life function cease for the duration but the target somehow retains consciousness and awareness. This Power is often incorporated into weapons systems. A Disruptor Gun can be designed and built by a Reason rank and an expenditure of Resource points equal to the Power rank desired for the weapon. Stationary, non-living, unprotected targets are automatically affected by the Power. Moving targets require the hero to make an Agility FEAT in order to hit the target. Living targets are allowed to resist the Power in the same manner they could resist any energy attack. Targets can be protected from Disruption by the use of such Powers as Force Field vs. Energy, Resistance to Energy, True Invulnerability, a combination of Collection and Molding, certain Magics, and certain Power Controls. Any of these can reduce the Intensity of the Disruption by the opposing Power's rank. The Judge is free to decide for himself the results of partial protection from Disruption. The Nemeses are any of the Powers mentioned in the previous paragraph.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "targets": "1 object"
  },
  {
    "code": "MC6",
    "name": "Enlargement",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can increase the size of any target. The target can be of any nature and must be within both line-of-sight and one area of the hero's location. Any material can be enlarged with one exception; the Power cannot affect any target that has already been Enlarged by another Power of equal or greater rank.",
    "rulesText": "The hero can increase the size of any target. The target can be of any nature and must be within both line-of-sight and one area of the hero's location. Any material can be enlarged with one exception; the Power cannot affect any target that has already been Enlarged by another Power of equal or greater rank. In such a case, the would-be target is assumed to already be Enlarged past any point the hero could have Enlarged it to anyway. The amount the hero can Enlarge a target is determined by the Power rank. The levels to which the hero can Enlarge a target are shown below: The duration of the Enlargement is determined by a Reason FEAT made at the time the Power is used. A green FEAT gives the Enlargement a duration of 100 turns times the hero's Reason rank number. A yellow FEAT increases that to 10,000 turns times the Reason number. A red FEAT makes the Enlargement permanent. There are three different mechanisms by which Enlargement can occur. Each form has a different set of innate properties. When creating the character, the player must decide which form the hero has. The player can either select one or let the dice randomly determine it for him. Atomic Dispersal- The Power causes the spaces between the atoms and subatomic particles to increase, thus increasing overall size. Mass remains the same despite any increase in size, causing the target's density to drop. Material Strength decreases 1CS with each doubling in size. Eventually, at Shift X Enlargement a solid target reaches a stage where it is less dense than air and can drift off. At Class 1000 rank and beyond, the target becomes effectively intangible to contact with normal matter.\n\n| Die Roll | Form |\n| :--- | :--- |\n| 01–30 | Atomic Dispersal |\n| 31–60 | Atomic Growth |\n| 61–00 | Atomic Gain |\n\nmatter. Atomic Gain- The Power causes the target to gain additional atoms. These are automatically incorporated into the target to duplicate and augment existing molecular structures. As the targets gains new atoms, the size and mass of the target increase proportionally. Where do the new atoms come from? There are three possibilities. One theory holds that Molecular Creation creates them from the hero's force of will. A second theory suggests Molecular and Elemental Conversion are responsible; the new atoms are simply Converted air molecules. The third explanation is that the hero somehow taps into another dimension, one that contains nothing but the raw material for this Power and the Matter Creation Powers and also provides a storage place for the matter displaced by Shrinking, Diminution, and Disintegration. This last idea could lead to a Plot Complication wherein the hero accidentally draws something More than raw material from that unknown dimension. I'll leave it to you to decide which explanation you accept as the truth. As the target expands, it gains real strength sufficient to move its new mass. Real strength increases +1CS for each +2CS of Enlargement the target is exposed to. Example: The Power is used on a normal adult six feet in height, 200 pounds in weight, and possessing\n\n| Enlargement Rank | Weight | Strength / Max Lift |\n| :--- | :--- | :--- |\n| Feeble | 300 lb. | TY / 200 lb. |\n| Poor | 400 lb. | GD / 400 lb. |\n| Typical | 600 lb. | GD / 600 lb. |\n| Good | 800 lb. | EX / 800 lb. |\n| Excellent | 1,200 lb. | EX / 1,200 lb. |\n| Remarkable | 1,600 lb. | RE / 2,000 lb. |\n| Incredible | 2,000 lb. | RE / 4,000 lb. |\n| Amazing | 2,400 lb. | IN / 3 tons |\n| Monstrous | 3,000 lb. | IN / 10 tons |\n| Unearthly | 2 tons | AM / 25 tons |\n| Shift X | 5 tons | AM / 50 tons |\n| Shift Y | 10 tons | MN / 65 tons |\n| Shift Z | 20 tons | MN / 80 tons |\n| Class 1000 | 50 tons | UN / 80 tons |\n| Class 3000 | 100 tons | UN / 100 tons |\n| Class 5000 | 1,000 tons | Shift X / 1,000 tons |\n\nThe target's other Primary and Secondary Abilities remain unaffected. The disadvantages of great size negate the advantages. However, Health seems to increase because physical attacks do less relative damage. For example, a single bullet could kill a normal sized person but would be little more than a high-velocity grain of sand to a giant. The damage done by Physical Attacks decreases -1CS for each +2CS of Enlargement. Note: the damage that didn't affect the giant might be fatal when he reverts to normal size. Wounds shrink but bullets do not. Atomic Growth - The target's atoms and subatomic particles actually increase in size, thus increasing the target's overall size. Mass increases proportionally. The target's Strength increases only enough to match his greater weight; Lifting Strength does not increase. There is a dangerous drawback to this form of Enlargement. As the target's atoms grow, they become unable to interact with normal atoms. The result is that the target is unable to breathe, drink, or eat. Fortunately there is a 95% chance that the Power envelops the target in an energy field that enlarges any atoms within its effect to the same scale as the target. The existence of this field must be determined at the time the hero is created. If the field is not present, the target must have a proportionallysized supply of consumables or this\n\nPower is considered a Fatal attack. The lack of the field has one advantage in that Electricity cannot flow between normal-sized and Enlarged conductors. The Power thus provides rank level Resistance to Electricity. It is always assumed that the hero intends to Enlarge the entire target's body. If the hero intends to Enlarge a specific area of a target, he must make a special effort to do so. Since this has the effect of tearing the target apart, the hero must make a Power FEAT based on the Material Strength of the target. For example, a brick wall has Good Material Strength. A hero with Typical Enlargement would need to make a red FEAT to enlarge a specific section of the wall, while a hero with an Incredible rank would only have to make a green FEAT. The effects -on the entire target if only a section of it is Enlarged vary by case and by degree of Enlargement. The most common result of a section of Enlarged matter surrounded by normal matter is that one of the two sections shattered, depending on which is the weaker section. Atomic Dispersal weakens Material Strength, Atomic Growth doesn't alter it, and Atomic Gain increases it. Judges should use this guide and their imagination to decide the results of specific Enlargement. The Power automatically affects stationary, non-living, unprotected targets. Moving targets require the hero to make an Agility FEAT to hit. Living targets are allowed to Resist this Power just as they could any Energy Attack. Targets can be protected from Enlargement by the use of such Powers as Force Field vs. Energy, Resistance to Energy, True Invul nerability, Certain Magics and Power Controls, and any of the Shrinking or Diminution Powers used simultaneously to the Enlarging attack. The opposing forms of these are Collapse vs. Dispersal, Reduction vs. Gain, and Shrinkage vs. Growth. Only the matching form can completely protect a target from unwanted Enlargement; while the other two will apparently work, the final result can be a little weird if extreme ranks of Power are employed. The Nemeses are those Powers mentioned in the previous paragraph.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "duration": "Rank turns",
    "targets": "1 target / object"
  },
  {
    "code": "MC7",
    "name": "Geoforce",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can detect and control geological forces. These include plate movement, stress, faults, and vulcanism. This Power only applies to natural rock and semi-natural materials such as concrete, cement, and asphalt.",
    "rulesText": "The hero can detect and control geological forces. These include plate movement, stress, faults, and vulcanism. This Power only applies to natural rock and semi-natural materials such as concrete, cement, and asphalt. Radically altered material (steel, plastic) is not directly affected by the Power. This Power has two ranges, both based on the Power rank. The ability to detect forces and materials within the earth has a range shown on Column C of the Range Table on the inside cover. The ability to actually control those forces is more limited and is determined on Column B. For example, a hero with Remarkable Geoforce can detect forces 12 miles distant but can only control those forces within one mile of her location. The Detection aspect of this Power enables the hero to sense a variety of earth-related things. These include ground temperature (green FEAT), general mineral composition (green), specific minerals (red), locate caves (green), locate beings moving within the earth (yellow), identify faultlines and stress points (yellow), and communicate with beings made of rock (red). The active aspect of this Power enables the hero to accelerate, slow, or alter the direction of natural geological forces. The hero can affect plate movement; this can create Power rank tremors or reduce the intensity of existing tremors by the Power rank number. The hero can accelerate erosion by decreasing the Material Strength of exposed rock. The flow of magma within the earth can be redirected to anywhere the hero wants an instant baby volcano to erupt. By magnifying existing faults and decreasing the rock's Material Strength, the hero can create openings in the earth. These can be instant pits, valleys, caves, or tunnels.\n\nThe effects of the Power are permanent alterations to the landscape. Baby volcanoes don't last very long, though, if the area didn't have a previous history of volcanoes,. For example, during her tenure with the New Mutants, Magma has created baby volcanoes in such places as Rio de Janeiro's harbor, the living room of Professor Xavier's mansion, and an apartment in Manhattan. Such freakish volcanoes immediately cool down once the Power is no longer supporting their existence; heat is lost at a rate of 1CS per hour. For example, the volcano in the X-Mansion was cool enough to sit on by the time Professor X came home a few hours later. It is assumed that the cooling effect extends all the way down back through the ground to where the magma came from in the first place; otherwise all these baby vol canoes would act as conduits for later, normal vulcanism. The amount of matter the Power can effect is awesome. The Power can affect a maximum amount of rock equivalent to ten tons for each point of the Power rank number. For example, Magma's Monstrous Geoforce can affect 750 tons (1.5 million pounds!) at a range of up to six miles. The Power can be expanded into a variety of Power Stunts, such as induced Avalanches and sculpting chambers in the earth. The latter example is also a way for the hero to make some money on the side by creating \"secret underground headquarters\" on commission. The giant caves that litter the pages of comic books do not occur in real life, people. A curious use of the Power is to communicate with beings who are themselves composed of natural rock. The Power provides the hero with a seismic equivalent of Telepathy. Such beings include Golems, Earth Elementals, and planetary beings such as Ego the Living Planet. Is Mother Earth alive in your campaign? If she is, then this Power will let your hero talk to her.\n\nThe Nemeses for this Power include itself, Disintegration, and Phasing.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "MC8",
    "name": "Matter Animation",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC8",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can alter the flow of any raw matter, impart movement to stationary matter, and shape such matter into any desired form. The Power can only affect matter that is in a relatively natural state. It cannot affect mechanical objects or material that is now or had once been alive.",
    "rulesText": "The hero can alter the flow of any raw matter, impart movement to stationary matter, and shape such matter into any desired form. The Power can only affect matter that is in a relatively natural state. It cannot affect mechanical objects or material that is now or had once been alive. There are three basic forms of this Power, each with dominion over a state of matter. When creating the hero, the player must choose one of these forms for the character. He can do this himself or let the dice choose for him. Die Roll\n\nForm\n\n01-20 21-50 51-00\n\nAir Animation Liquid Animation Solid Animation\n\n• \n\nAir Animation- The hero can directly control the movement of gases and vapors and indirectly control the movement of material suspended in the air, such as smoke, dust, steam, and so on. He can create winds of speeds equal to Power rank speed (see the Airspeed table on the inside cover). He can control the actions or air, wind, clouds, and potentially even the weather. The hero can use air either defensively or offensively by forming shields or gales of Power rank strength. Note: Air attacks cannot penetrate Force Fields or an aerial shield of higher Intensity. The Power can be developed into Power Stunts such as Gliding, Whirlwind Flight, and limited Weather Control. The forms of Weather Control available to the hero all depend on stirring up the air. These include bringing in storms, fog, tornadoes, and suddenly bringing two air masses of differing temperature together to form either fog or lightning. •\n\n• \n\nLiquid Animation-The hero can directly control the movement of liquids and indirectly control material suspended in liquid (mud, cake batter). He can create currents and waves that can travel at Power rank speed (see the Water Travel table on the inside cover) and do Power rank damage to anything in their path. Liquid can animated to resist gravity and act as if it were temporarily a solid of ' rank level Material Strength. Liquids can be used as a shield that reduces the Intensity of Energy Attacks by the Power rank number. It can be further refined into a variety of Power Stunts, such as forming propulsion systems or being shaped into air bubbles with \"solid\" floors. Solid Animation- The hero can alter the condition of solid matter, so long as it is not biological or mechanical in nature. He can give the solid movement, reshape to any form, and even give it the semblance of life. Solids can travel at Power rank speed (see the Land Travel table inside the cover) either across the ground or through the air. The hero can Mold the solid into any single mass. Solids retain their Material Strength but can be Animated to do Power rank damage to other targets. The hero can create Golems or simulated Elementals that obey his every whim; such creations are only sophisticated puppets that possess no more life than does a marionette. (Of course, there is the example of Pinocchio... ) Animated solids possess a Lifting Strength equal to the Power rank. The Power can be refined into a variety of Power Stunts, such as turning an opponent's weapon against him, creating self-tying knots, and creating flying platforms that can carry the hero across the ground or through the air. The range at which the hero can Animate Matter is determined by the Power rank; distances are shown on Column B of the Range Table inside the cover. The maximum amount that can be Animated is a mass weighing the equivalent of 1000 pounds times the Power rank number. For example, a Feeble rank can move one ton; in liquid terms this is the weight of a water bed. Matter remains Animated as long as the hero concentrates on using this Power. Judges are free to develop their own criteria to determine how well and how long a hero can do this in a given situation. Any material can be Animated, as long as it is within the restrictions on the chosen form of that Power. Any reshaping done to the target is permanent; of course, this only applies to solids. The possibilities for both construction and vandalism are immense. At the time the hero is created, the player has the option of raising the Power rank +1CS by further specializing the Power's range of effect to a specific compound or type of matter. Examples of specializations include Powers that specifically Animate steam, water, oil, ice, clay, and so on. The Nemeses for this Power include itself and Disintegration.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 object",
    "optionsDefinition": {
      "powerCode": "MC8",
      "powerName": "Matter Animation",
      "id": "matter_anim_type",
      "label": "Domain of Matter State",
      "canRoll": true,
      "rollTable": [
        [
          1,
          33,
          "solid"
        ],
        [
          34,
          66,
          "liquid"
        ],
        [
          67,
          100,
          "gas"
        ]
      ],
      "choices": [
        {
          "key": "solid",
          "label": "Solid Matter",
          "description": "Commands solid rock, earth, metals, and minerals.",
          "isSuperior": false
        },
        {
          "key": "liquid",
          "label": "Liquid Matter",
          "description": "Commands liquids, water, and fluids.",
          "isSuperior": false
        },
        {
          "key": "gas",
          "label": "Gaseous Matter",
          "description": "Commands gases, vapors, and air.",
          "isSuperior": false
        }
      ]
    }
  },
  {
    "code": "MC9",
    "name": "Machine Animation",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC9",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can animate and command mechanical systems, vehicles, weapons, and electronic devices as though they were living constructs.",
    "rulesText": "The hero can control the movement of anything mechanical. It is as if the hero were a combination remotecontrol panel and power source. The machines can only perform those functions for which they were designed. While under the influence of the Power, the affected machines can function even in the absence of a normal power supply, such as would be provided by an electric cord, wound spring, or miniature nuclear generator. The only new function the hero can give a machine is limited ground movement. Affected Machines can travel at -2CS Power rank speed by sliding or rocking along the ground; see the Surface Movement table inside the cover. If the machine already incorporates a means of propulsion (wheels, tracks, table legs), it can travel at Power rank speed; see ditto. The Power can affect any single machine within range of the Power; Column B of the Range Table gives the appropriate limits. If the hero attempts to control several machines simultaneously, the Range decreases -1CS for each additional Machine the hero is controlling. For example, a hero with Good Machine Animation can control a single machine 10 areas away, two machines 5 areas away, three machines within his area, or four machines if he is touching all of them at once (an interesting Agility FEAT, I suppose). The Power is primarily intended to control normally non-sentient devices, which are considered to have a Psyche of zero. If the hero tries to gain control of a Robot or the mechanical part of a Cyborg, greater effort is needed. It becomes a contest of wills, as the hero's Power tries to overcome the target's Psyche. The Psyche in question is either that of the Robotic brain or the living mind of a Cyborg; if the Cyborg incorporates both living and mechanical minds, only the Psyche of the mechanical mind is used to determine the difficulty of the FEAT. The latter determines what Intensity FEAT is required. Example: A Poor rank of Machine Animation could seize control of a Dreadnought's Feeble Psyche with a green FEAT and Ultron-11's Poor Psyche with a yellow FEAT, but couldn't begin to touch Jocasta's Good Psyche. Attempting to wrest control of the Iron Man armor would require a red FEAT if either Tony Stark or Jim Rhodes were wearing it at the time but would automatically succeed if the armor were, say, hanging in a closet somewhere. To protect against such interference, High Technology types would need to develop circuitry that would give the equivalent of a desired Psyche rank to the machine.\n\nOptional Powers include Communication with Cybernetics, Communication with Non-Living Matter (limited to machines only), and Matter Animation.",
    "errataNote": "",
    "powerStunts": [
      "Simultaneous control of multiple machines (up to Power Rank number)"
    ],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 machine"
  },
  {
    "code": "MC10",
    "name": "Micro-Environment",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter his immediate surroundings to create a miniature climate around himself. The Micro-Environment always contains fresh clean air (or water or methane or whatever the hero breathes) at any temperature and pressure the hero desires. The Micro-Environment incorporates a Force Field that protects it from any factor that might harm or even annoy the hero, such as rain, poisonous gases, extreme temperatures, or the pressure that naturally results from having three miles of ocean over your head.",
    "rulesText": "The hero can alter his immediate surroundings to create a miniature climate around himself. The Micro-Environment always contains fresh clean air (or water or methane or whatever the hero breathes) at any temperature and pressure the hero desires. The Micro-Environment incorporates a Force Field that protects it from any factor that might harm or even annoy the hero, such as rain, poisonous gases, extreme temperatures, or the pressure that naturally results from having three miles of ocean over your head. In such cases, the Micro-Environment automatically excludes potentially hazardous gases and liquids and reduces the Intensity of pressure, extreme temperature, and high gravity by the Power rank number. Lesser or equal Intensities are canceled out, while higher ranks only penetrate in diminished form. The Power automatically Collects the desired materials into a sphere around the hero; if no such materials are available, the Power employs an innate form of Matter Creation or Conversion to produce those materials. The Force Field maintains the desired pressure, temperature, and gravity levels while enclosing the desired materials and shielding the hero from the undesired ones. If the hero requires a surface to stand on but none is available, the Power provides one by solidifying a section of the Force Field. The Power is primarily intended to protect the hero when he is in places other than his home environment. It can, be used to protect him from extreme variations in that home environment though, should the hero so choose. Thus the Power can be used to protect the hero in the middle of a house fire, gas leak at a fertilizer plant, radiation spill at a laboratory, a thunderstorm, or a smog alert in Los Angeles. The Power can be used to\n\nResist the effects of Air or Water Animation, Weather Control, Heat, or Cold Generation; the Intensity of the attack is reduced by the Power rank number. The Micro-Environment has a maximum radius in-feet equal to the Power rank number. Normally it is a sphere centered in the hero but she can shape it or direct it to another location if she so desires. The maximum range at which the hero can direct the Micro-Environment is determined by the Power rank; appropriate distances are shown on Column B on the Range Table inside the cover. The-maximum volume of the Micro- Environment is the equivalent of a sphere whose radius equals the Power rank number. Figuring out the maximum volume of other shapes requires a doing a bit of geometry. Example: A rank of Good can produce a sphere of 3.14(l 0-cubed) or 3,140 cubic feet. This can be shaped into a rectangular \"tunnel\" 10 feet high, 10 feet wide, and 31 feet long. I suggest that anyone with this Power figure out as soon as possible how big a sphere/hemisphere/column/t unnel/cone/etcetera he can make with his Power rank. If you don't, the Judge is liable to say that mysterious changes in the. environment prevent your hero's Power from working. The Power only protects the hero from environmental effects or Powers that employ aspects of the Environment. Beside the Powers mentioned earlier, this Power will also provide limited protection against Electrical Control, Electrical Generation, Coldshaping, Gravity Manipulation, Hard Radiation and its Control, Thermal Control, Plague Carrier, Geoforce, Spray, and Pheromones, but only if the offending Power originates outside the Micro-Environment. As hinted at before, the Power can be used to create any environment the hero desires, provided it is beneficial to whatever nature of being is inside its protection. Of course, what is a marvelous climate for one being could be instantly fatal to another. Consider the MicroEnvironments created by beings that thrive on super-heated steam or swim in liquid helium. Player characters are limited to producing only those MicroEnvironments that will help the beings inside. Villainous and Mind Controlled NPC heroes are able to pervert the Power and create toxic MicroEnvironments. In such a case, the Power is treated as an attack and the intended victim is urged to Resist it in any way he can. The Nemeses are either Air or Liquid Animation, depending on the nature of the Micro-Environment.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or 1 area",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "MC11",
    "name": "Molding",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can shape any solid material into any desired shape. The shaped material retains its original chemical nature. If the target is living, its internal anatomy is rearranged in such a way that permits life to continue without loss of Health.",
    "rulesText": "The hero can shape any solid material into any desired shape. The shaped material retains its original chemical nature. If the target is living, its internal anatomy is rearranged in such a way that permits life to continue without loss of Health. The new shape can be of any complexity; even intricate machines can be created if the proper materials are available. The newly-Molded target can be Animated, even if the original material or the current shape is normally incapable of movement. This movement is accomplished by the simple act of continually remolding the target (think of it in terms of stop-motion animation). Molded targets retain their basic Material Strength. New shapes may alter the load-bearing capacity of the material. For example, a arch can bear greater weight than a plane and a honeycomb is about the strongest shape there is. Using the Power destructively is easy; using it constructively is harder and requires the player to have some knowledge of basic Engineering. The maximum range at which the hero can Mold a target is determined by the Power rank. Appropriate distances are. shown on Column A of the Range Table on the inside cover. The amount of material the hero can Mold is a mass weighing 100 pounds times the Power rank number. When creating the hero, the player has the option of raising either range or amount affected by lowering the other factor an equal amount. For example, a Remarkable rank can Mold 3,000 pounds of material at a range of 8 areas. Either factor can be altered by as much as 5CS and produce results as varied as Feeble range (contact)/Shift X effect (15,000 lb.) to Shift X range (80 areas)/Feeble effect (200 lb.). The player has the further option of raising the Power rank +1CS by specializing in Molding a particular type of matter, such as wood, metal, stone, and so on. This option is not available if the hero also possesses any of the Elemental or Molecular Conversion or Creation Powers. The complexity of the intended design determines what Reason FEAT is needed. Simple, singlecomponent designs require a green Reason FEAT. Complex or multiplecomponent designs require a yellow FEAT. Extremely complex designs (anything from a clock on up) requires a red FEAT and probably a set of blueprints. Exactly duplicating an existing object also requires a red Reason FEAT. The Power can function for as long as the hero can concentrate. Any failed rolls while attempting a FEAT mean that while the Power has begun to Mold the target, there is a problem because \"something doesn't look quite right.\" Molding automatically affects any stationary, non-living, unprotected material. Moving targets require the hero to make an Agility FEAT to hit. Living targets are allowed to Resist this Power in the same way they would try to Resist any Energy Attack. As mentioned earlier, living targets can be affected but not directly slain by this Power. A target can be protected from being Molded by the use of such Powers as Force Field vs. Energy, Resistance to Energy, True Invulnerability, certain Magics and Power Controls, temporary Conversion to a liquid or gaseous state, or an equal or higher rank of Molding. The simultaneous use of a protective Molding Power to counteract an offensive one by continually re-Molding the target into its original shape would lookpositively psychedelic as the target of both Molders continually rippled and wavered). The Power can be used quite profitably to outfit either heroes or villains with all the arcane and exotic equipment they need. After all, Quinjets, body armor, and nuclear pogo-sticks- aren't exactly off-the shelf purchases. Clever use of this Power could raise the hero's Resource level anywhere from +1CS to + 4CS; the Judge and player will have to work this out for themselves. (\"Okay Jeff, in yesterday's game you remodeled the HQ of Dr. Octopus. Today you try to collect what he owes you.\") Optional Powers include Elemental and Molecular Conversion, Collection, and Crystallization. Nemeses include Force Field and Molding.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Permanent",
    "targets": "1 object"
  },
  {
    "code": "MC12",
    "name": "Weather",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has complete control over the weather. He can sense those factors in the air that create weather and alter any aspect of them at his desire. Any of these factors can produce both physical and psychological effects on humans.",
    "rulesText": "The hero has complete control over the weather. He can sense those factors in the air that create weather and alter any aspect of them at his desire. Any of these factors can produce both physical and psychological effects on humans. He can control temperature by raising or lowering the air a maximum number of degrees equal to his Power rank number. For example, an Incredible rank can change a comfortable 70 degrees into a wintry 30 degrees or a sweltering 100 degrees. He can increase or decrease windspeed by a number of miles per hour equal to his Power rank number. For example, an Excellent rank can stop a 20-mph wind, slow a 50-mph gale to 30mph, or turn still air into a 20-mph wind. Gale winds of 40-mph or higher begin to make travel difficult. Whole gales of 55 to 72 mph begin to do widespread damage. Winds above 72 mph reach hurricane strength. Above 200 mph the wind becomes a tornado. Wind direction can be changed up to 60 degrees by a green Power FEAT, up to 120 degrees by a yellow FEAT, and completely reversed 180 degrees by a red FEAT. For example, changing a cool northern wind to an east wind is a change of 90 degrees, a yellow FEAT. Humidity can be increased or decreased a maximum percentage equal to the Power rank number. Note: the maximum humidity is 100%. Apparently humidity has some effect on human behavior and health. As humidity approaches 80% or higher, people become more sluggish and irritable, especially if the air temperature is also 80 degrees or higher. If the air has any moisture at all, the hero can Collect it into any type of cloud, whether Cirrus, Cumulus, Stratus, a common Fog, or any other type. He can form Nimbostratus clouds that continually disgorge moisture in the form of rain, hail, sleet,-or snow, depending on the air temperature and wind direction. Rainfall per hour can reach a maximum number of inches equal to the Power rank number. If the precipitation falls as snow, the snowfall depth is equal to six inches for each inch of rainfall (since snowflakes pack less densely than rain). The Power can form Cumulonimbus clouds into thunderheads that deliver lightning as well as rain. The hero can control the emission and direction of lightning, producing bolts that do rank damage. The area of weather over which the hero has control is a circle ( a vertical cylinder actually) with the Weather Controller at the center. The diameter and height of this cylinder is determined by the Power rank. Appropriate distances are shown on Column C of the Range Table on the inside cover. For example, when she possessed her full Amazing Weather Control, Storm could control the weather over a fifty-mile wide area. Note: While the atmosphere is composed of four layers and is a few hundred miles deep, only the bottom layers of the troposphere and stratosphere really affect the surface weather. Beyond twenty miles in height, the Power is reduced to a negligible effect. The duration of the effect the Power has over the weather varies. The hero has a limited amount of time each day she can actively Control the weather. The maximum length of time is the number of minutes equal to the hero's Health. Each minute spent using this Power temporarily costs the hero one point. Note: this does not decrease the hero's actual Health; instead it decreases a \"dummy account\" set up for the purposes of the player's bookkeeping. The account is replenished at the start of each new day. Returning to the example of Storm, her Amazing rank enabled her to actively control the weather fifty minutes each day. Furthermore, the effect the Power has over the weather does not instantly vanish when the hero rests. The changes the hero made continue for a while before things return to their original state. Lingering effects last an amount of time equal to the time spent actively controlling the Weather. The Intensity- rank of the lingering Weather slowly decreases; the average Intensity rank is half that of the Power rank. For example, if Storm spent ten minutes operating a thunderstorm, that storm would last an additional ten minutes and produce Excellent rainfall and lightning while it slowly dissipated. As mentioned briefly, the hero can detect any aspect of the Weather that he can control. A green FEAT enables the hero to know the local wind's speed and direction, humidity, temperature, the chance for precipitation, and the next day's weather forecast. A yellow FEAT enables the hero to detect these thing anywhere within her Power's range and thus figure out the weather forecast for the next two days. A red FEAT enables the hero to make three- day weather forecasts and more importantly detect the cause and location of any change in the weather, such as distant disturbances or the use of this Power by others elsewhere. For example, with a yellow FEAT the hero senses a mass of hot air twenty- three miles away. A red FEAT enables her to detect the cause as a fire ranging in New Rochelle. A peculiar use of the Power involves gaseous beings such as Air Elementals. The hero can create puppets of air whose actions simulate the behavior of Air Elementals. The hero can directly combat real Air Elementals with the Power doing rank damage to the opponent's Health. Imagine this as a vaporous equivalent of a Slugfest. Finally, the Power can serve as a means to communicate with gaseous beings. In this case the Power acts as an equivalent to Telepathy. Optional Powers include Environmental Awareness and either True Flight, Whirlwind, or Gliding. Nemeses include itself and Phasing, since Weather cannot affect a phantom.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "Rank areas"
  },
  {
    "code": "MC13",
    "name": "Zombie Animation",
    "category": "Matter Control",
    "source": "UPB Table p. 16-19 & Entry MC13",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is a macabre Power that is definitely more at home in the horror genre than in the heroic genre. The hero, um… well, the character with this Power can Animate any previously living body. Normally, the Power is used to Animate relatively intact cadavers, since these are capable of a greater variety of actions.",
    "rulesText": "This is a macabre Power that is definitely more at home in the horror genre than in the heroic genre. The hero, um... well, the character with this Power can Animate any previously living body. Normally, the Power is used to Animate relatively intact cadavers, since these are capable of a greater variety of actions. Part of the Power is used to halt the process of decay and to maintain the structural integrity of the remaining body parts. Still, Zombies look awful, even the fresh ones. This Power is not Biophysical Control/Revival. The Zombies are not alive. They lack the essential lifeforce that is the core of each living being. The Zombies are at best mindless slaves, at worst grotesque marionettes who shuffle on the end of the Zombie Master's strings. The condition of a Zombie can range from freshly deceased to skeletal. The latter type of Zombie is little more than a walking skeleton, though being mostly bone it is cleaner than a stillfleshed Zombie. The Zombie does not have to have all its body parts. In fact, the Power can be used to Animate detached limbs or partial remains. These have their uses too. For example, if a character's Physical Type is either Cyborg or Compound/Undead and he possesses this Power, perhaps some of his body parts are Animated bones grafted onto his still living sections. (I told you this is a grotesque Power...) Zombies possess Physical Abilities that are -3CS Power rank. Mental Abilities are Zero-shift. A Zombie's \"Health\" is the same as the Zombie Animator's Power rank. Karma is non-existent and Popularity is as low as the scale goes. Most Zombies were originally human but there is nothing to prevent your Animator from creating Zombies of other species. Since Zombies probably can't swim or fly worth a darn, the Animator is best choosing land-based species for his experiments. Possibilities include Undead wolves, tigers, elephants, and so on. The Zombie Animator Can create a single Zombie in a process whose minimum time gets shorter as the Power rank gets higher. It comes in two stages, Preparation and Activation. The required Preparation time is the number of rounds equal to 101 minus the Power rank number. For example, a Good rank can prepare a Zombie for Animation in 91 turns, a Monstrous rank can do it 4n 26 turns, and any rank -higher than Unearthly doesn't need any Preparation time at all. The next step is Activation. All this requires is a successful red Power FEAT. Failure requires the Animator to Prepare for another minute. It is possible, if however unlikely, for a character to have this Power and never, ever be able to successfully Animate a Zombie. That's one of the mysteries of random chance. Once he creates a Zombie, the Animator retains control over it until it is destroyed, returned to life, or stolen away by a higher ranked Undead Controller. An Animator can create an infinite supply of Zombies but can only retain direct control of a number of them equal to his Psyche rank number. For example, an Animator with an Excellent Psyche can control up to twenty Zombies simultaneously. Any Zombies over that number are in effect free agents who can act independently. Such free Zombies never attack their Animator though.\n\nCuriously, some Zombies retain some of their Resources and Contacts. This is an extremely rare occurrence and is only possible if the Zombie is in a near-perfect condition (albeit of course dead) and if the late person's death was not widely known. In such a case, a clever Zombie Animator can make the Zombie pretend to still be alive. For example, Nekra Animated the corpse of the Grim Reaper so well that the risen Zombie actually believed he was alive. Zombies are immune to attacks based on Psionics or other Mental Powers, Disease, poisons, Pheromones, Hard Radiation, and Sonics. They cannot see Illusions. They have Power rank Resistance to most of the Lifeform Control Powers; the Power rank that created them decreases such Powers by that number. The exception is Undead Control, with which a green FEAT can permit control of any independent Zombie. Some aspect of the original mind remains. Zombies possess rudimentary memories of their previous existence. A Zombies is also linked to the Spirit that once dwelled within it and can be used as a tool to Communicate with, Summon, and Control that Spirit. The use of a Zombie in this way increases the other Powers' rank +1CS. It is possible return the Spirit to its now zombie body by use of the Forced Reincarnation. Although this does not return the body to actual life, it does weld the spirit and body together so well that only the total destruction 'Of the body will free the spirit again. Such a Spirited Zombie possesses his original Mental Abilities and can work at restoring the other Abilities to their original levels.\n\naction creates a person with a newborn's mind and spirit. Okay, so why would anyone want to Animate Zombies, particularly socalled heroes? The popular misconception is that Zombies are inherently evil. This is not true. Zombies are only a reflection of their Animator's personality. A currently popular fantasy series features a goodwilled if misunderstood character whose sole Magical Power is Zombie Animation. He uses them as servants and if necessary soldiers. He even used the Power on himself in order to wait out the centuries until his fiancee could return to life. Your character will have his own justifications and uses for this Power. The key thing, as always, to use your imagination and not be afraid to experiment. Be afraid of your experiment's results instead. Optional Powers include Extradimensional Detection (limited to detecting spirit realms), Forced Reincarnation, Summoning (Spirits only), Undead Control, and Communication with Non-living Matter. The Nemeses for this Power include Exorcism, Healing, and Undead Control.\n\nThe effect of Bio-Physical Control on a Zombie is peculiar. Zombies don't actually Heal since that is a function of living organisms. Any attempt to Heal a Zombie actually kills it by negating the Animation. Only Revival will truly return the Zombie to life, as it negates the Animation, cures any damage or decay, and draws the spirit back home. Note: if the Spirit is now Reincarnated elsewhere, this\n\nMatter Conversion Powers Die Roll\n\nMatter Conversion Power\n\n(Code)\n\n01-10 11-25 26-45 46-70 71-80 81-00\n\nColoration Combustion Disintegration Elemental Conversion* Ionization Molecular Conversion*\n\nMCo1 MCo2 MCo3 MCo4 MC05 MCo6",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Rank",
    "duration": "Maintained",
    "targets": "Corpses"
  },
  {
    "code": "MCo1",
    "name": "Coloration",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has total control over the coloration and color transmitting abilities of any target substance, whether solid. liquid, or gaseous. That's all, folks.",
    "rulesText": "The hero has total control over the coloration and color transmitting abilities of any target substance, whether solid. liquid, or gaseous. That's all, folks. Okay, this seems like the prime number one Wimp Power of all time. Wrong, oh ye of little faith; read on and I'll tell you how dangerous this Power can be it is when possessed by a clever hero. This Power enables the hero to alter basic physics and the chemical properties of any target. The Power operates in either of these two modes. In the first mode, the hero can consciously alter the frequency and intensity of light itself. He can change any frequency to any other frequency, including infrared, the visible spectrum, and ultraviolet. Like a prism, the Power can split apart white light into a rainbow or recombine back into white. He can lower the intensity of light to create normal - darkness, even in the midst of brilliant fight, though these shadows lack the opacity of those created by Shadowcasting. In game terms, consider this a -2CS form of both Shadowcasting and Shadowshaping. Different frequencies of light have different properties. By altering the frequency of light, the hero can alter these properties. Infrared light causes objects to heat up. By converting normal light to infrared, the hero can cause a -2CS form of Heat Emission. Conversely, by converting Infrared light, the hero can prevent radiant heating; treat this as a -2CS Force Field vs. Heat. Ultraviolet light causes changes in pigmentation; effects can vary from the tanning of normal human skin to the rapid fading of printed material. It is also the key to photosynthesis. If the light is in a coherent form, like a laser beam, the effects of color become more dramatic. Red lasers carry more heat and do greater damage for the Intensity. Blue-green lasers can pass unhindered through water. Again, change the frequency of light and you change its effects. The second operating mode for the Power is altering the physical coloration of the target material. The color of a object can have great importance both to the fickle aesthetic tastes of humans and to the impartiality of Moms Nature. Coloration determines the type and amount of energy that is either reflected or absorbed by the material in question. White and silvery surfaces reflect all light. Dark colors and black absorb all light. There is the matter of transparency. A perfectly clear substance lets light pass through. Examples include air, glass, and the lens in a human eye. Change the degree of transparency and you stop light from traveling though. A character with this Power can stop anything in its tracks if the target depends on vision to find its way around. Conversely, the Power can make an opaque target transparent. Uses for this vary from humane through mischievous to outright criminal. A humane use is curing those types of blindness that result from the loss of the eye's natural transparency. A mischievous use is turning someone's clothing transparent. A criminal use is turning concealing barriers transparent if the character is seeking information behind that barrier; this can be anything from reading the contents of an envelope or locked file cabinet to studying a lock's mechanism while cracking the combination. Color conveys information. Change the color and you alter or even destroy the message. Consider the effect changing color has on things as varied as comic books, paintings, photographic film, traffic lights, feathers, furs, and human skin. Take the last one, for example. The reason why people get so freaked out by the Hulk is not his size or berserk rampages but that he is bright green! Give the Hulk a normal tan and he could work in Hollywood. On a more prosaic level, the ability to change the color of printed or written material can be have immense consequences in an Information Age society such as our own. The possibilities include both vandalism and creation. When using this Power, the hero must make a Reason FEAT to determine how fine his degree of control is. A green FEAT permits him to change all of a target to a single color; think of the target getting a paint can dumped on it. A Yellow FEAT enables him to change the target to several colors. The effect is the same as being caught by a bunch of near-sighted graffiti artists, each with a different can of spray paint. A Red FEAT gives the hero fine control and the ability to alter tiny areas in specific ways; think of a talented artist with a very small brush. When the hero is covering an area, he only affects the exposed surface of any targets. For example, Colorizing a closed book would not harm the printed pages; Colorizing a cow purple wouldn't change the color of a steak later on. As for the question of affecting the eyes of a living target, the Judge and players should assume that the Power only affects the layer of tears that protect the eye.\n\nIn effect, the target is momentarily blinded by colored water that quickly washes away. Eyes are such a small target that the character must make a specific red FEAT to do so. Note: this bending of the rules does not apply to the lenses of artificial eyes; cameras and robots are on their own. This Power does not actually change the physical nature of a target. Elemental, molecular, and genetic structures remain unchanged except where Light is concerned. A steel safe made glass-like is still as strong as ever. A pane of glass given a steel-like surface shatters just as before. The duration of the Power varies. The normal limit is 1 -100 hours after the Coloration occurs. The hero can immediately reverse any Coloration if he chooses. Sometimes the hero wants an act of Coloration to be permanent, such as when he tries to cure an old man's cataracts. In that case, a red Power FEAT does the trick. Optional Powers include Light Control. Nemesis Powers are Radar or Sonar.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "duration": "Permanent",
    "targets": "1 target / object"
  },
  {
    "code": "MCo2",
    "name": "Combustion",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to transform any target into combustible material. Once this Power has been used, spontaneous combustion occurs within 1 -10 turns after. Only the surface layer of matter is converted by this Power.",
    "rulesText": "The hero has the ability to transform any target into combustible material. Once this Power has been used, spontaneous combustion occurs within 1 -10 turns after. Only the surface layer of matter is converted by this Power. As such, the flames only last 10-20 turns since the combustible material is quickly burned away. The total amount of damage done by this is equal to Power rank Intensity. Example: Rusty Collins, a student of X Factor, has Monstrous Combustion but has not yet achieved full control over it. At present, when he is excited, he can inflict up to Incredible Intensity damage on a target. When his Power first appeared, his accidental target was a woman who subsequently suffered severe burns. The range for the Power is determined on Column A of the Range Table on the inside cover. The maximum amount of target area the hero can initially affect is the number of square feet equal to his Power rank times ten. For example, when he is fully trained in the use of his Power, Rusty Collins will be able to ignite an area of 750 square feet at a distance of 40 areas (1 mile) away. The Power only affects the surface of a target that is in sight of the hero. Using the Power against a gasoline tank would only burn the outside of the tank and any gasoline that had already leaked through bad joints in the tank walls. If the damage were sufficient to rupture the tank or heat the gasoline inside to the combustion point, then the stored liquid could join the blaze. The Power's effects begin to multiply when the power is used against targets that are already flammable or in the immediate vicinity of flammable materials. Most of Mankind I s manufactured items and buildings contain some percentage of flammable material. Even materials not known for their combustible qualities, like plaster, will burn if enough heat is applied. By taking this into consideration, the clever hero can simply use his Power as the spark to start an apparently normal fire. Combustion normally occurs only in the presence of free oxygen. If there's no oxygen in the air or if there is no air, period, Combustion cannot take place. Using this Power on a target under such a circumstance would have no immediate effect on the target. While the Power would still convert some of the target into, flammable, volatile compounds, these would simply and harmlessly evaporate; used under water, the Power would make bubbles suddenly appear on the target. At Unearthly rank or higher, the hero gains the ability to transform some of the target into free oxygen as well as fuel , thus permitting the Power the Power to function in a vacuum or hostile environment. If the target is affected by the Power but the flames are somehow prevented from occurring, the target will only remain potentially flammable for 21 to 30 turns after the Power has had its initial effect. At any point during that time, the target can still burst into flame; after that has elapsed, the target is safe. Means that can prevent Combustion from occurring include Elemental and Molecular Conversion, Fire Control, Thermal Control, Cold Generation, Force Field vs. Energy, and Resistance to Energy. Any of these Powers gives its possessor Power rank Resistance to Combustion's effects. Example: Rusty Collins is battling a Sentinel. He uses his Monstrous Power to set fire to the Sentinel's faceplate. The Sentinel reacts by spraying extinguishing foam on itself. The foam has Unearthly fire retardant qualities and prevents the Combustion- affected area from igniting. Unfortunately for the Sentinel, it only lasts 25 turns after initial application. As the Sentinel grabs Rusty, his faceplate belatedly but still spectacularly bursts into flame. Optional Powers include Fire Generation and Control. Nemeses include Elemental and Molecular Conversion, Cold Generation, Fire Control, and Thermal Control.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 flammable object"
  },
  {
    "code": "MCo3",
    "name": "Disintegration",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the ever popular but never explained \"Disintegrator Ray.\" The hero has the ability to convert any matter into pure energy, usually Light although the player can specify another resultant energy when he first creates the character. The energy dissipates harmlessly and does not affect anyone in the vicinity. This Power can affect any target within range and line-of-sight.",
    "rulesText": "This is the ever popular but never explained \"Disintegrator Ray.\" The hero has the ability to convert any matter into pure energy, usually Light although the player can specify another resultant energy when he first creates the character. The energy dissipates harmlessly and does not affect anyone in the vicinity. This Power can affect any target within range and line-of-sight. The range is determined by Power rank; resulting distances are shown on Column A of the Range Table. The maximum amount of matter that can be disintegrated in a single turn is the number of cubic feet equal to the Power rank number. For example, a Typical Disintegrator can destroy six cubic feet of matter at a range of two areas or 264 feet. When creating the character, the player can alter the\n\nPower range or effect if he so chooses. Either the range or the amount affected can be increased any number of Column Shifts by decreasing the other factor an equal amount. Example: Ken and Sue are both creating Disintegrators. Ken rolls 97 for his Power rank, an awesome Amazing rank for both range and effect. Sue isn't so lucky and rolls 77, a Good rank for her Cyborg Character. Sue wants deadlier force and chooses to after her range and effect. She decreases her range to Feeble or Contact-only, a loss of 3CS that she can apply to her effect. This increases +3CS to an Incredible effect. Unwilling targets of this Power are allowed to resist it in any way they can. Furthermore, the Disintegrator must make an Agility FEAT to aim this Power on a target. I mentioned the maximum area the Disintegrator can effect, but what of the minimum area? The Power comes in handy for doing all sorts of fine-detailed work like sculpting, surgery, or removing unwanted locks. The hero can Disintegrate as small an area as he can clearly see. With normal, unaided vision, the minimum limit is about 1/128th of an inch. Smaller than that and the hero needs some kind of magnifying device or Power. Note: this limit is proportional to a normally-sized human of about six feet in height. Enlarged or miniaturized characters have a proportional limit. For example, a 36foot-tall giant would have a minimum limit of 1/21 of an inch, while a onefoot- tall person would have a minimum limit of 1/768th of an inch or about the size of a cell. As stated earlier, the target must be within line of sight since the Power affects the first thing it encounters, excluding air molecules. Actually, some air is accidentally Disintegrated whenever this Power is used-that's why the Power appears as a glowing beam emitted by the hero-but not enough to divert the Power from its intended target. If an unseen or unanticipated barrier is present between the Disintegrator and the target, that barrier takes the full brunt of the Power that turn. Ken's hero, Starburst, sights a Dreadnought and immediately tries to Disintegrate it. Unfortunately, Starburst failed to notice the plate glass window the Dreadnought was behind. The window vanishes in a flash of pretty lights as the Dreadnought ducks around the corner. This Power is frequently given, to weapons systems such as the ever popular Disintegrator Pistols that fill pulp Sci-Fi. In terms of normal contemporary Earth technology, a Disintegrator raygun requires Incredible Reason and Physics Talent to design and an Amazing cost in Resource points to build. The Judge is free to decide the range and effect of such a weapon. Nemeses for Disintegration are Phasing (to protect the hero) and Ionization (to protect others) as the Power cannot affect intangible matter.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "targets": "1 target / object"
  },
  {
    "code": "MCo4",
    "name": "Elemental Conversion",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo4",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can convert any matter into a specific element. The matter to be converted can be any one element or a combination of elements. The resulting element can be any of the hundred-odd natural, artificial, and mythical elements.",
    "rulesText": "The hero can convert any matter into a specific element. The matter to be converted can be any one element or a combination of elements. The resulting element can be any of the hundred- odd natural, artificial, and mythical elements. Natural elements are those numbered 1 (Hydrogen) to 92 (Uranium) on the Periodic Table; these require a green FEAT to create. Artificial elements are those numbering higher than 92 and do not naturally occur on Earth outside of man's experiments; such elements include Neptunium, Plutonium, and the like. A yellow FEAT is required to create these. Mythical elements include Vibranium and any other imaginary element the Judge decides to add to this category; a red FEAT is required to create these. Note: it has never been established whether Vibranium is an element or a compound; Judges are therefore instructed to decide which category Adamantium fits into in the Judge's campaign. The hero can alter a finite amount of matter per turn. The maximum amount per turn is the number of pounds equal to the Power rank number. The amount of matter weighs the same in its original and transformed states. If the hero converts matter into denser elements, the volume decreases. Converting matter to lighter elements increases the volume. For example, one cubic foot of lead weighs the same as 17.5 cubic feet of carbon. Just exploiting this little fact of life can lead the hero to develop a variety of Power Stunts. For example, the hero might cause a sudden vacuum in a room by converting all air to a dense solid, like bismuth. Normally, when matter is converted by this Power, it retains its new nature permanently or at least until a reverse transformation is forced on it at a later date. At the time the hero is created, the player has an option of increasing his Power rank by making the Power's effect temporary. The hero can gain +1CS by reducing the duration of his transformations to the number of turns equal to his Reason rank number. For example, a hero with Good Reason and Poor Elemental Conversion can convert four pounds of material that reverts to its original state in ten hours. The normal form of this Power is fatal if used on a living target. Tissue transformed by the Power suffers instantaneous death. If the hero chooses the option of temporary effect, the Power has a different effect on living tissue. The affected area enters Suspended Animation until it reverts to its original state. This can also be developed into a variety of Power Stunts. Of course, if only part of the living target is transformed, the rest of the body still suffers the shock of having part of itself transformed into nonliving elements. The minimum amount of matter that can be transformed is limited only by the hero's sight. If the hero can see it, he can transform it. The practical limit for unaided human vision is 1/128th of an inch. Lest you think your hero is going to retire to Brazil and spend the rest of his days turning weeds to gold, let me warn you about the drawbacks. Each pound of matter the hero converts temporarily costs him a point of Health. This is automatically regained, after 24 hours. On the business side, there is the question of selling the raw elements. Gold, platinum, and other rare, valuable elements are kept strictly accounted for by a variety of governmental and business organizations. If your hero makes a habit of coming up with large amounts of bullion, someone is going to begin to notice' That someone could be anyone from a relatively benign IRS agent come to audit your hero's accounts to a sinister agent of the Gold Cartel come to shut down the new competitor (i.e., kill your hero). About the only choice your hero has is selling small amounts to local precious metals dealers. Going this route can raise your hero's Resource rank + 3CS; any more than that and somebody will notice and take action. The range at which the Power can operate is determined by the Power rank. Distances are shown on column A of the Range Table inside the cover. When creating the hero, the player can choose the option of increasing either the amount affected or the range by decreasing the other factor an equal amount. For example, a Typical rank can convert six pounds of matter at a distance of two areas. Either factor can be modified a maximum of 2CS. One way produces a hero who has Feeble effect (two pounds) but Excellent range (6 areas). Going the opposite route produces a hero with Excellent effect (20 pounds) but Feeble range (contact only). Stationary, non-living, unprotected targets are automatically affected. Moving targets require an Agility FEAT by the hero to hit the target. Living targets are allowed to Resist this Power just as they could any other attack. Protections against this Power include Force Field vs. Energy Attack, Resistance to Energy Attack, True Invulnerability, various Magics, and various Power Controls. Any of these completely protect against a lesser ranked Elemental Conversion and have a limited affect against equal or greater ranks. The Judge is free to decide the results of partial protection against this Power. Optional Powers include Matter Animation and Molding. The Nemeses include Force Field vs. Energy, Resistance to Energy, and True Invulnerability.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Contact",
    "duration": "Permanent",
    "targets": "1 object"
  },
  {
    "code": "MCo5",
    "name": "Ionization",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to change the state of energy in a target. This can have a variety of effects on the target. A target can be electrified by this Power; the target's atoms begin to change into electrically-charged particles.",
    "rulesText": "The hero has the ability to change the state of energy in a target. This can have a variety of effects on the target. A target can be electrified by this Power; the target's atoms begin to change into electrically-charged particles. The initial effect this has is to charge the target with static electricity. Next the target actually emits Electricity at -1CS Intensity. At this point the target will itself suffer an equal amount of damage, provided it is electrically grounded in some way. Finally, the charged atoms begin to fly off in an ionized cloud. Nonliving targets can be destroyed in this manner as the molecular bonds break down. Used this way, the Power does damage equal to -2CS Disintegration. Okay, what about beneficial uses for this Power? Well, electricity isn't the only energy the hero can charge a target with when he uses this Power. The hero can excite the atoms sufficiently to create warmth; this is treated as a -2CS form of Heat. More interestingly, the hero can charge atoms in such a way that he can make them temporarily ethereal. A target thus affected can Phase through solid matter as easily as someone already in possession of that Power. This comes in handy when the hero is trying to protect a target from any of the Matter Conversion Powers. He can use this Power to Phase something threatened by the other Power or made threatening because of it. The range at which Ionization can occur and its duration are determined by the Power rank. Range is shown on Column A on the Range Table inside the cover. Duration is a maximum number of rounds equal to the Power rank number. For example, a Feeble rank can charge a target within reach for two turns. The amount of material affected is generally limited to a man-sized continuous mass. If the target is a specific area of a much larger mass, the Ionization will directly affect only the man-sized area, although the rest of the mass can experience secondary effects based on whatever the hero is trying to do. For example, The Shocker has to Ionize a safe in which some people are trapped. He plans to try to Disintegrate a section of the safe large enough to permit fresh air to enter. There is a danger of electrocution to those trapped within, so Shocker tells them to stand on something that can insulate them from the metal walls and floor. They hurriedly cover themselves with stacks of $100 bills. Outside, Shocker summons his Power. The safe is a 15-foot cube with walls two feet thick. Selecting a section of the safe's wall with no essential mechanisms inside, he begins. He has a Incredible rank. In the first turn, static electricity crackles in the air; inside the safe, loose bills stand on end. In the second turn, electricity of Remarkable Intensity begins to be generated by the affected area. The safe's lock shorts out as the electricity flows throughout the metal sections of the safe; inside the safe the air begins to smell of ozone. In the third turn, Disintegration of Excellent Intensity begins to occur. Shocker is bathed in a cloud that resembles a fluo rescent lamp without the tube. The safe walls are constructed of reinforced concrete and steel, giving it Remarkable material strength. For Shocker to execute any meaningful Disintegration, he needs to make a red FEAT based on the diminished Disintegration rank, rather than his normal Ionization rank. Shocker's player needs to roll a 95 or higher to burn through the safe. It takes him 11 turns or over a minute to finally accomplish the deed. Hours later it occurred to The Shocker that he could simply have used his Power to make part of the safe temporarily outof-Phase with the rest of the world. Had he done that, those trapped inside could simply have walked through the temporarily ethereal wall.\n\nThe Nemesis Sponge.\n\nPower is\n\nEnergy",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target / object"
  },
  {
    "code": "MCo6",
    "name": "Molecular Conversion",
    "category": "Matter Conversion",
    "source": "UPB Table p. 16-19 & Entry MCo6",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can transform any material into a desired compound. This Power is an enhanced version of Elemental Conversion. Whereas that Power could only create a single specified element, this Power can create a number of elements simultaneously and arrange them in a desired molecular configuration.",
    "rulesText": "The hero can transform any material into a desired compound. This Power is an enhanced version of Elemental Conversion. Whereas that Power could only create a single specified element, this Power can create a number of elements simultaneously and arrange them in a desired molecular configuration. The matter to be converted can be composed of any element, compound, or combination thereof. The elements that result can be any of the hundredodd natural, artificial, and mythical elements. The compounds they form can likewise be real or mythical. An example of a fictional compound is the alloy Adamantium, a steel alloy that only exists in the Marvel Universe. Mythical compounds or compounds that incorporate a mythical element (like Vibranium) require a red FEAT to create. Note: it has never been established whether Vibranium is an element or a compound; while I choose to refer to Vibranium as an element, Judges are free to decide for themselves whether it is an element or a compound in their campaign. Most other compounds require either a green or yellow FEAT to create. The more complex a compound's formula is, the harder it is to create. As a rule of thumb, a compound whose molecules incorporate from two to twenty atoms can be created by a green FEAT. A compound with molecules of from twenty- one to one hundred atoms, or alloys of various compounds, requires a yellow FEAT; examples include hydrocarbons. More complex molecules or alloys require a red FEAT; examples include polymers, proteins, and other compounds essential to life. Obviously, playing this Power requires knowledge of basic chemistry. At the least the player must have a crib sheet filled with various useful compounds and their formulas. The hero can after a finite amount of matter each turn. The mass limit is the number of pounds equal to the Power rank number. The amount of matter converted weighs the same either before or after Conversion. The heavier the resulting compound, the smaller its volume. Conversely, the lighter the compound, the more volume it has. This simple fact can be exploited as a variety of Power Stunts. For example, a fist-sized rock can be transformed into a roomful of the mixture of gases we humans consume as air. The maximum range at which the Power can affect a target is determined by the Power rank; distances are shown on column A of the Range Table on the inside cover. At the time the hero is created, the player has the option of increasing either the Power's range or amount affected by decreasing the remaining factor an equal amount. For example, an Amazing rank can Convert 50 pounds at a range of 20 areas. Either factor can be modified by up to 7CS. This can produce such extreme combinations as Feeble range (Contact only) and CL3000 effect (3000 pounds per turn) or CL3000 range (10,000 miles) and Feeble effect (two pounds). The player also has the option of increasing the Power +1CS by making its effect temporary. Normally, Conversions are permanent or at least remain until a reverse Conversion occurs. If the player chooses the temporary option, the Conversion only lasts a maximum number of turns equal to the hero's Reason rank number. While permanent Conversions may be fatal to living targets (it depends on what was Converted and what the result was), the temporary form has the side-effect of placing the target area into a form of Suspended Animation until the Conversion wears off. Of course, the Conversion can have severe, even fatal, effects on the rest of the living target if the entire body is not Converted.\n\ncan be affected by the Power is limited only by the hero's eyesight. In practical terms, the smallest size a Normal Human can see is 1/128th of an inch. Below that requires the use of something to enhance the hero's vision. Stationary, non-living, unprotected targets are automatically affected by this Power. Moving targets require an Agility FEAT in order for the hero to hit the target. Living targets are allowed to resist Molecular Conversion just as they would any Energy Attack. Targets can be protected from being effected by this Power through the use of other Powers including Force Field vs. Energy, Resistance to Energy, True Invulnerability, various Magics, and various Power Controls. Such Powers will completely protect against a lesser or equal rank Molecular Conversion and offer partial protection against higher ranks. The Judge is free to decide the results of partial protection. Optional Powers include Matter Animation and Molding. Nemeses include Force Field vs. Energy, Resistance to Energy, and True Invulnerability.\n\nThe target must be in line of sight of the hero for the Conversion to occur. The Power can function even if a normal, transparent barrier such as glass separates the hero and the target. The minimum amount of material that\n\nMatter Creation Powers Die Roll\n\nMatter Creation Power\n\n(Code)\n\n01-10 11-24 25-29 30-35 36-59 60-69 70-88 89-00\n\nArtifact Creation* Elemental Creation Lifeform Creation* Mechanical Creation* Missile Creation Molecular Creation Spray Webcasting\n\nMCr1 MCr2 MCr3 MCr4 MCr5 MCr6 MCr7 MCr8",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Contact",
    "duration": "Permanent",
    "targets": "1 object"
  },
  {
    "code": "MCr1",
    "name": "Artifact Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr1",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create a desired object from virtually nothing. The artifact can be of any substance, and is limited to being composed of a single piece. Although the Power can create facsimiles of more complex construction, close examination reveals that all the smaller pieces are fused together.",
    "rulesText": "The hero can create a desired object from virtually nothing. The artifact can be of any substance, and is limited to being composed of a single piece. Although the Power can create facsimiles of more complex construction, close examination reveals that all the smaller pieces are fused together. However, the hero can create complex items by forming them one piece at a time. The hero can create in one turn a number of ounces equal to his Power rank number. The durability of the artifact is determined at the time of creation. A green FEAT gives the artifact a lifespan of the number of turns equal to the hero's Reason rank number times 100. A yellow FEAT raises it to 10,000 times the Reason rank number. A red FEAT makes the artifact permanent. Each ounce of created matter temporarily costs the hero one Health point. The hero can regain all his lost Health points after 24 hours. Thus, the hero can only create a number of ounces in a single day equal to his Health point total. The hero must have detailed knowledge of the design of whatever he wants to create. He can only store a finite number of designs in his mind at any one time. The limit for this Power is equal to his Reason rank number. The player must keep a record of which items the hero knows how to create. The list can be changed at any time. A green Reason\n\nFEAT gains the hero a new design. If no memory slots are available, the new design replaces an old one. (\"That's okay; how many more Dr. Doom masks was I going to need, anyway?\") Editor's Note: Matter Creation Powers that create specific items (as opposed to raw matter) bring with them a specified number of memory slots, usually equal to the hero's Reason rank number. If a hero should have two of these specific Matter Creation Powers, he would then have twice the number of memory slots (equal to his Reason rank number times two once for each Power). Normally the Power is used to create facsimiles of objects that already exist. These can be directly studied by the hero as he memorizes their designs. This takes at least ten minutes before attempting the FEAT. Failure requires another ten minutes of study, and another attempt. As you can guess, their hero might never be able to master certain designs. The hero can also create new designs based solely on his own imagination. Since this requires really intense concentration, a red Reason FEAT is needed to store this design. The artifact has the same properties as a normally manufactured item of its type. In the case of altered or imaginary designs, the player and the Judge should agree on reasonable statistics for the item in question.\n\nat any site within one area. The artifact is initially stationary; you can't launch an artifact as you can a missile or a spray. The hero can take advantage of gravity, though, by materializing the artifact uphill or over a target. Now that you've read all the rules so far, I'll give you the one exception to the weight limit. When creating the character, the player can choose to specialize in creating a single copy of one specific item, like a suit of armor or a costume. In this case, the weight limit is raised from one ounce per Health point to one pound per Health point. Red FEATs are treated as yellow FEATs. This Power includes versions of Elemental and Molecular Creation. Each -element and compound takes up a memory slot, just like the daggers and shields that are already cluttering the hero's mind. Such raw matter can be formed in any shape, though. This permits the hero to change the composition of any of his already-memorized designs. For example, if he already has memorized a knife design and the nature of silver, he can make either a steel knife (like the one he memorized) or one made of silver. The hero can create facsimiles of living matter, but such facsimiles are not themselves capable of living. He can make a dead chicken, but not a live one; however, the one he makes will taste just as good. Being able to create corpse versions of yourself could be extremely handy, especially for villains out to confound the law. Optional Powers include a form of Matter Animation that is limited to matter created by the hero, and Hyper-Intelligence. The Nemesis Powers are Disintegration and Mental Domination, especially induced Amnesia.\n\nThe hero can materialize the artifact",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Same area",
    "duration": "Permanent",
    "targets": "1 item"
  },
  {
    "code": "MCr2",
    "name": "Elemental Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can create pure elements from virtually nothing. The hero can create any desired element in any shape or at any location within one area. The hero can create in a single turn a number of ounces equal to his Power rank number.",
    "rulesText": "The hero can create pure elements from virtually nothing. The hero can create any desired element in any shape or at any location within one area. The hero can create in a single turn a number of ounces equal to his Power rank number. For example, a hero possessing this Power at Amazing rank could create 50 ounces per turn. The durability of the newly created matter is determined at the time of creation. A green FEAT gives the element a lifespan of 100 turns times the hero's Reason rank number. A yellow FEAT increases that to 10,000 turns times the Reason rank number. A Red FEAT means it is permanent. Example: Synthos needs some quick cash and tries to create gold he can sell. His Power is Excellent (20) but his Reason is only Typical (6). He rolls a 73 (a yellow FEAT) and manages to create 20 ounces of 24K gold that will disintegrate in 60,000 turns (about 4 days). He hurries to the local gold bullion dealer. Unfortunately, the dealer was warned about Synthos. He will accept the gold on the condition that he can wait one week before turning over payment. Each ounce the hero creates temporarily robs him of one Health point. The hero can recover any Health lost in this way after a 24-hour period, including eight hours of sleep. He must get his full rest to recover his Power; this saves the Judge and player from quibbling over fractions regained by naps and so on. (if you like to quibble, though, then go ahead and use partial recovery.) Thus the hero can only create a number of ounces equal to his Health. Example: Synthos needs that money now! He slinks into an alley and tries it again. A yellow FEAT results in 20 more ounces of unstable-gold. Realizing he's near his limit, he makes a final try to create nine more ounces. He succeeds with a red FEAT. A very pale Synthos trudges off to find a pawnshop. The hero can use this Power as an attack by trying to materialize new elements on a chosen target. The target can dodge the attack; if successful, the materialization occurs in the target's former location. The target must be in line of sight and not protected by any barriers. For example, Synthos sees an old foe and tries to give him a faceful of coal dust. He didn't notice that his foe was behind an extremely clear pane of glass. Synthos splatters coal dust all over his side of the window. Various Power stunts include: Dropping freshly-made weights on a target. Setting targets on fire by materializing self-igniting elements like sodium and phosphorus. Rendering a target unconscious by flooding the area with nitrogen that displaces oxygen. Short-circuiting electrical devices by forming copper in their interiors. Knocking targets off their feet by covering the ground with silicon. Breaking open a lock by forming iron inside it (assuming there is a way into the lock). Increasing a fire's Intensity by creating fresh oxygen for it to consume. Resisting gaseous attacks or preventing suffocation by surrounding himself in oxygen. Optional Powers include Matter Animation (any single form) and Mechanical Animation. Nemeses include Disintegration and Matter Animation (all forms).",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Rank turns",
    "areaOfEffect": "1 area"
  },
  {
    "code": "MCr3",
    "name": "Lifeform Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr3",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create living matter and even complete bio-organisms from virtually nothing. The new life can be of any nature, although it can only possess Powers that are intrinsic to its physical structure. The size of the new lifeform is limited by its weight.",
    "rulesText": "The hero can create living matter and even complete bio-organisms from virtually nothing. The new life can be of any nature, although it can only possess Powers that are intrinsic to its physical structure. The size of the new lifeform is limited by its weight. The hero can create in a single turn a maximum number of ounces equal to his Power rank number. Since the lifeform cannot be assembled in several pieces, but rather must be done all at once, this limits how large the creation is. It can grow, though, if it has the time. The lifespan of this new creation is determined at its genesis. A green FEAT gives it a lifespan of 100 turns times the hero's Reason rank number. A yellow FEAT increases that to 10,000 times the number. On a red FEAT, the lifeform is permanent. Each ounce of created life costs the hero one Health point. All points lost in this way are automatically regained after 24 hours. In a single day, the hero can only create lifeforms whose total weight does not exceed his Health. The hero must have detailed knowledge of any organism he wants to create. He can only store a limited number of organic designs within his memory. The total number of memory slots available for this Power is equal to his Reason rank number. The player must keep a record of the organisms he can create. The list can be changes at any time. A green Reason FEAT gains the hero a new design. If there are no available memory slots, an old design is discarded to make room for the new one. Normally the Power is used to create facsimiles of existing organisms. The hero must make a detailed study of the original for at least one hour before attempting a FEAT to memorize it. A failure means the hero must study the organism for another hour before attempting another FEAT. With sufficiently bad luck, the hero may never be able to memorize certain lifeforms One note: This Power includes a mixture of Detection Powers that permit the hero to study a lifeform down to its atomic level without having to do anything harmful to that lifeform (like dissect it). The hero can create new lifeforms based solely on his imagination and basic knowledge of anatomy and physiology. This requires an active imagination, intense concentration, and a red FEAT to memorize a viable design. The newly born lifeform has the same characteristics as a normally born lifeform of its type. In the case of altered or imaginary creations, the player and Judge should agree on a reasonable set of statistics for the being in question. This Power also includes versions of Elemental and Molecular Creation. This can be used to create raw biological materials or foodstuffs; examples include sugar, blood, protoplasm, and so on. Each material takes up a memory slot. The hero can materialize his creation at any site within one area. The new life is initially stationary but can immediately begin to move under its own power. Like the rest of the Matter Creation Powers, this Power is stopped by the first barrier between the hero and the site of his intended target. So, no, people-you can't have your hero inject nasty germs directly into his opponent. As stated before, this Power can create living replicas of actual beings. The minds of such beings are not as complex as the original, and lack most of the original's memories and all Powers that are no t strictly Physical in nature. For game purposes, new life has the following statistics: Ability\n\nModification\n\nFighting Agility Strength Endurance Reason Intuition Psyche Health Karma Resources Popularity\n\n- 1CS - 1CS no shift no shift Poor Poor no shift no shift zero zero no shift\n\nOnly physical Powers are duplicated. Talents' are lost as are Contacts, unless the Contact seeks out the duplicate. New life can learn, if it lives long enough. It can even raise its abilities and gain simulations of other Powers the original possesses. The Judge should set his own standards, based on what type of beastie the hero has come up with. Here comes the exception to all that's been written here so far. When creating the hero, the player can opt to specialize in creating one unique being, like a Pegasus or a She-Hulk of the hero's very own. (No more trouble getting dates for this guy ... ) In that case, the weight limit is raised from one ounce per Health point to one pound per Health point. Red FEATs are treated as yellow FEATs, thus the hero is required to periodically recreate his chosen companion. Such a continually created being retains its memory from creation to creation and can learn and develop just like any normal lifeform. Any damage suffered by this being disappears when it is summoned anew. If slain, the being immediately disintegrates and its statistics (when it is summoned again) drop to their original levels. The hero should also incur a hefty Karma loss if he was directly responsible for his companion's death. If the hero possesses other Powers, the player can assign them to whatever lifeforms the hero can summon. This is an interesting possibility for creating unique characters, especially if Specialization is chosen. Optional Powers include forms of Telepathy, Mental Domination, Animal Control, and Plant Control, all limited to lifeforms created by the hero. These same Powers are also the Nemeses.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Same area",
    "duration": "Permanent",
    "targets": "1 creature"
  },
  {
    "code": "MCr4",
    "name": "Mechanical Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr4",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can create complex mechanical devices from virtually nothing. The newly created machine originally forms in one mass, then separates into its components. The size of the machine is limited to its weight.",
    "rulesText": "The hero can create complex mechanical devices from virtually nothing. The newly created machine originally forms in one mass, then separates into its components. The size of the machine is limited to its weight. The hero can only create in one turn a maximum number of ounces equal to his Power rank number. Heavier machines have to be assembled in several turns. The durability of the machine is determined at the time of its creation. A green FEAT gives the machine a lifespan of 100 turns times the hero's Reason rank number. A yellow FEAT increases that to 10,000 times the rank number. A red FEAT means the machine is permane nt.\n\nEach ounce of created matter temporarily costs the hero one point of Health. All points lost in this way are regained after 24 hours. Thus the hero can only create in a single day a number of ounces equal to his Health. The hero must have detailed knowledge of anything he wants to create. He can only store a limited number of de-' signs in his memory. The total number of memory slots available for this Power is equal to his Reason rank number. The player must keep a record of the designs the hero can create. The list can be changed at any time. A green Reason FEAT gains the hero a new design; if no memory slots are available, an old design is tossed away to make room for the new one. Normally the Power is used to create facsimiles of existing machines. The hero must make a detailed study of the machine for at least 10 minutes for each attempted FEAT. Failure to make a FEAT means another 10 minutes of study is required. Some items may be beyond -,he hero's comprehension. if the player is really bad at rolling the dice. The hero can also create new designs based solely on his imagination and knowledge of mechanical engineering. As this requires really intense concentration, a red FEAT is required to store such designs. The newly-created machine has the same properties as a normally manufactured machine of its type. In the case of altered or imaginary designs, the player and Judge should agree on reasonable statistics for the item in question. This Power includes versions of Elemental and Molecular Creation. Each element or compound takes up its own memory slot, just like the padlocks and pistols that already clutter the hero's mind. Such raw matter can be formed into any shape, though. This permits the hero to change the composition of any of his already-memorized designs. For example, if he has already memorized a cassette player's design and the nature of platinum, he can create either a normal plastic-cased player or a platinum coated one. The hero can materialize the machine at any site within one area. The machine is initially stationary but if it is self-powered, it can immediately begin to move on its own. The hero can also drop the machine on a target, but that is a real waste of material, people. The Power cannot create actual living beings. If the -hero is trying to create a facsimile of a living being, the best he can do is a robotic replica, complete with simulated flesh. Internal examination immediately reveals gears and pulleys. The Power can create potentially sentient machines, such as a miniature copy of a Sentinel. Such a facsimile lacks the detailed programming of the original and must be programmed before it can function. This also applies to any microchip dependent device, such as a computer. Just like MCr1/Matter Creation, there is an exception to the rules stated thus far. When creating the character, the player can choose to specialize in creating a single copy of a specific design' like a homemade Iron Man suit or a mini jet. In this case, the weight limit is raised from one ounce per Health point to one pound per Health point. Red FEATs are treated the same as Yellow FEATs. Optional Powers include a form of Mechanical Animation limited to those machines created by the hero, Hyper Intelligence, and Hyper-Invention. Nemesis Powers include Mechanical Animation, and Mental Domination (especially induced Amnesia).",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Same area",
    "duration": "Permanent",
    "targets": "1 machine"
  },
  {
    "code": "MCr5",
    "name": "Missile Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can spontaneously create and launch projectiles. These are propelled to Power rank range. Missiles that simply slam into a target act as Stunning Missiles and inflict Stunning attacks of Power rank Intensity.",
    "rulesText": "The hero can spontaneously create and launch projectiles. These are propelled to Power rank range. Missiles that simply slam into a target act as Stunning Missiles and inflict Stunning attacks of Power rank Intensity. If the hero has other Powers, these are combined with this Power to produce missiles with specific effects. Nullifier-the Missile Power is combined with Power Control/Negation to produce missiles that inflict no direct damage but may nullify inborn or technological Powers with Power rank Intensity. Sleep Darts-the Power is combined with Induced Sleep to create anesthetic darts. Magnetic-the Power combines with Magnetism to produce missiles with Power rank Intensity Magnetism. These can do Power rank damage to magnetic recordings or delicate electronics, and can attract any iron in the target site (guns, for example). Ghostcasters-the Power is combined with Illusion-casting to create missiles that emit a static hologram upon hitting the target site. Vanishers-the Power is combined with Induced Teleportation to create missiles that teleport the target to a predetermined destination. Energizer-Missiles are combined with Power Transference to give the target part of the hero's other Powers. Any Power in this book can be combined with this Power to create unique missiles for your character. When creating the character, the player should follow this guideline: If there is a way to combine external Powers with, this Power, do it. Powers that are completely internal in their effects are exempted from this. This includes most of the Mental and Physical Enhancements and all of the Self Alterations and Detection Powers. If the character is High Tech, has rolled such Powers as Hyper-Invention or Weapons Tinkering, or possesses a magical device, then the Missile Powers should be combined into a device possessed by the hero.\n\nThis may be an exotic gun, a wand, or any other bit of superheroic paraphernalia the player can imagine. The hero has a finite ammo supply, even if he creates the missiles as he goes. The maximum number of Missiles the hero can create per hour is equal to the Power rank number. This prevents the cliché found in bad Westerns, whereby a lone cowboy holds off the entire Apache nation with a single sixshooter. This limit also applies to Technological versions of this Power, in that the gun/wand/whatever simply overheats from repeated use. There are two Nemeses for this Power. If the Power is innate to the hero, Reflection stops it. If the Power is externalized in a weapon, Induced Teleportation works by removing the weapon from the hero's possession and giving it to the opponent.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "targets": "1 target"
  },
  {
    "code": "MCr6",
    "name": "Molecular Creation",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a more powerful form of Elemental Creation. The hero can form several elements simultaneously and form them into any desired compound. The hero can form this on any target within one area.",
    "rulesText": "This is a more powerful form of Elemental Creation. The hero can form several elements simultaneously and form them into any desired compound. The hero can form this on any target within one area. He can create in one turn a number of ounces equal to his Power rank number. For example, at Poor rank he could form only four ounces in one turn. The durability of the newly created compound is determined by a FEAT at the time of creation. A green FEAT gives the material a span of a number of turns equal to 100 times the hero's Reason rank number. A yellow FEAT raises the multiplier to 10,000, and on a red FEAT the material is permanent. Each ounce the hero creates temporarily costs him one point of Health. The hero can regain Health points lost in this way after a 24-hour period including eight hours of sleep. Thus, the hero can create only a number of ounces per day equal to his total Health points. Example: Synthos is visiting a primitive culture and decides to give them a gift of useful bronze. His Power is Excellent (20) and his Reason is Typical (6), but his Health is only 50. On his first try, he makes only a green FEAT. That batch of 20 ounces disintegrates in 600 turns (1 hour). He tries again, making a yellow FEAT this time. That's not much better; the batch of 20 ounces disintegrates in - four days. His honor on the line, Synthos tries again. He succeeds with a red FEAT. However, his depleted Health only permitted him to create 10 ounces of bronze. Synthos is unaware of this, having passed out from the strain. The hero can use this Power as an attack by trying to form the new material on a chosen target. Such targets can try to dodge. If they succeed, the material forms in their previous position. The hero must be in line of sight of the target. He cannot form material within a target's interior or through any barrier between himself and the target. Synthos, for example, could not form plastic explosive within a Sentinel, unless someone left an inspection hatch open where Synthos could see it. In order to fully play this Power, the player needs to know some basic chemistry, especially the physical properties of various compounds. The hero can develop Power stunts such as: This Power includes the ability to form single elements as in Elemental Creation. This is an innate (not a Bonus) Power. Optional Powers include Matter Animation in any single form and Mechanical Animation. The Nemesis Powers are Disintegration and Matter Animation (all forms, simultaneously).",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Same area",
    "duration": "Permanent",
    "targets": "1 object"
  },
  {
    "code": "MCr7",
    "name": "Spray",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can spontaneously create a directed cloud of gas, mist, or dust. The Spray has a range of up to one area. It has the basic properties of doing Feeble damage by choking off the target's fresh air and reducing visibility by -2CS for anyone within the cloud.",
    "rulesText": "The hero can spontaneously create a directed cloud of gas, mist, or dust. The Spray has a range of up to one area. It has the basic -properties of doing Feeble damage by choking off the target's fresh air and reducing visibility by -2CS for anyone within the cloud. The main purpose of Spray is combining it with other Powers, thereby producing unique Spray Powers for the hero. In all these cases, the range remains the same. Other factors, such as the nature and\n\nIntensity of effects, are determined by the Power that has been combined with Spray. Some possibilities include: Negating a foe's Energy Emission Power by forming a barrier of insulating material around the target's Emission point. Breaking open a door by materializing strong compounds within the crack between the door and the frame. Forming weights in the air above a target's head. Healing others by creating medicines; their effects last even after the compounds disintegrate. Creating electricity by forming the compounds found in batteries. Creating unliving simulations of living beings. These have no cell structure, however, and are only incredibly realistic wax dummies. Performing temporary repairs on equipment. Hallucinogenic: The Spray is combined with Image Generation to produce vivid visual images in the target's mind; these, of course, have nothing to do with reality. The target's Fighting and Intuition drop -3CS. Corrosion-proofing: The Spray combines with Catalytic Control to lessen corrosive attacks' Intensity by this Power rank number. Insulation: The Spray combines with any Energy Control to produce a coating that protects any target from that form of Energy Emission. The insulation reduces the energy attack's Intensity rank by the Energy Control's rank number. Healing Spray: This uses any of the more pleasant forms of Bio-Physical Control to produce a cloud that heals anyone in the target area who has taken damage up to -1CS. Napalm: The Spray is combined with Fire Generation and does Power rank damage. Freeze Cloud: The Spray combines with Cold Emission to do Power rank damage. Shrink Dust: The Spray combines with Diminution to reduce the size of anything in the target area. Booster Dust: The Spray combines with Power Control/Magnification to raise the Power ranks of everyone in the target area +1CS.\n\nAny Power in the Ultimate Powers Book can be combined with this Power to create unique Sprays for each character. When creating such characters, the player should follow this simple guideline: If you can figure out a way to combine externalized Powers with this one, do it. Powers that are completely internalized are exempt from this rule. This includes most of the Mental and Physical Enhancements and all of the Self Alterations and Detections. If a character. is High Tech, has rolled such Powers as Hyper-Invention or Weapons Tinkering, or possesses a magical device, then the Spray Power should be incorporated into a device. This may be a gas gun, ring, horn, or any other piece of superheroic paraphernalia the player can imagine. Example: The player rolls up the following Fire Generation, Elemental Conversion, Spontaneous Combustion, Spray, and Enchantment. She is a Humanoid, an Elf to be precise. Enchantment determines she is a magical character. The first three Powers readily combine with Spray. The player decides that the heroine possesses a magical flute which she built herself. Besides playing normal tunes, she knows three special melodies that create clouds which possess each of the first three Powers. The hero has a finite amount of Spray. The maximum number of Sprays the hero can create in a 24hour period is equal to his Power rank number. This limit also applies to Technological or Magical versions of this Power; the gasgun/flute/whatever simply clogs up from repeated use. There are two Nemeses for this Power. If the Power is innate to the hero, then Reflection stops it. If the Power is externalized in a device, Induced Teleportation works be removing the device from the hero's possession and turning it over to the Nemesis.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "areaOfEffect": "1 area",
    "targets": "All in area"
  },
  {
    "code": "MCr8",
    "name": "Webcasting",
    "category": "Matter Creation",
    "source": "UPB Table p. 16-19 & Entry MCr8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can generate and shoot out a solid web. The web can hit any target within 100 feet and instantly adhere to it. The Web has some basic properties.",
    "rulesText": "The hero can generate and shoot out a solid web. The web can hit any target within 100 feet and instantly adhere to it. The Web has some basic properties. It can ensnare anyone within the target site. It possesses Power rank Strength upon hardening one round after being fired. It can be used to form swing-lines that enable the hero to travel 3 areas per turn, and it makes shields of Monstrous material strength. Webcasting can be combined with other Powers to create unique Webs for other characters. In all these cases, the range remains the same. Other characteristics, such as the nature and Intensity of the effects, are determined by the Power that has been combined with Webcasting. Some possibilities include: Mind net: Telepathy combines with the Web to form a telepathic link between the hero and anyone within his Web. Dream net: Dreamtravel combines with the Web to permit everyone within to share a common dreamworld. Preserver: The Web places anyone wrapped within in Suspended Animation. Spirit Net: The Web is combined with Spirit Storage to trap any disembodied spirits within. Protector: The Web combines with any Defensive Field to protect any thing within the Web from a specific form of attack. Metamorphic: The Web combines with Induced Shapechange to transform anyone within the Web into any shape the hero desires. Cocoon: The Web possesses Micro-Environment and provides a safe habitat for anyone within, despite external conditions. Mummy Shroud: The Web combines with Zombie Animation to make any corpse wrapped up in it an Undead (great party gag, folks!). Glide Net: The hero can travel on the winds by combining his Web and Gliding Power. Network: The hero uses Sensory Link to perceive the surroundings of any web he knows the location of. In effect, he turns any web into a twoway picture phone.\n\nAny Power in the UPB can be combined with Webcasting to produce unique. Web Powers for each character. When creating characters, the player should follow this simple guideline: If you can figure out a way to combine externalized Powers with this one, do it. Powers that are completely internalized are exempt from this rule. This includes most of the Mental and Physical Enhan cement Powers and all of the Self-Alterations and Detections. If a character is Hi-Tech, has rolled such Powers as Hyper-Invention or Weapons Tinkering, or possesses a magical device, then the Web Powers should be incorporated into a device. This can be a webshooter, reel, or any superheroic doohickey the player can invent. The hero has a finite amount of Webbing he can produce. The maximum number of times the hero can use Webcasting in a 24hour period is equal to his Power rank number. This also applies to Technological or magical versions of this Power; the devices clog up from overuse. Webs created by this Power evaporate one hour after being cast. The Nemesis for this Power is Phasing.\n\nMental Enhancement Powers used in the area the hero is spying upon.\n\nDie Roll\n\nMental Enhancement Power\n\n(Code)\n\n01-04 05-08 09-11 14-15 17-22 24-26 28-31 32-40 41-47 49-58 59-65 68-69 70-72 77-78 82-85 87-96 97-00\n\nClairaudience Clairvoyance Communicate with Animals Communicate with Cybernetics Communicate with Non- Living Communicate with Plants Cosmic Awareness* Danger Sense Dreamtravel Empathy Free Spirit* Hallucinations* Hyper-Intelligence Hyper-Invention Incarnation Awareness Iron Will Linguistics Mental Duplication Mental Invisibility Mental Probe Mind Blast Mind Drain Postcognition Precognition* Psionic Vampirism* Remote Sensing Sensory Link Serial Immortality* Speechthrowing Telekinesis Telelocation Telepathy Total Memory\n\nM1 M2 M3 M4 M5 M6 M7 M8 M9 M10 Mill M12 M13 M14 M15 M16 M17 M18 M19 M20 M21 M22 M23 M24 M25 M26 M27 M28 M29 M30 M31 M32 M33\n\nNote: These powers are for use for standard heroes with mental powers, as opposed to those who have studied the powers of the mind (and would be classified as a psi, using the specialist rules for that character class)",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Rank turns",
    "areaOfEffect": "1 area",
    "targets": "1 target / area"
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
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Astral / Universal",
    "duration": "Maintained"
  },
  {
    "code": "MG2",
    "name": "Energy Source",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The Mage draws his Magic from a special source that provides him with all the raw Power he needs. As long as the Mage can maintain his link with his Source, he can continue to use the Magic it provides. The nature of the Source and the link vary by individual case. (Grants +1 additional power slot)",
    "rulesText": "The Mage draws his Magic from a special source that provides him with all the raw Power he needs. As long as the Mage can maintain his link with his Source, he can continue to use the Magic it provides. The nature of the Source and the link vary by individual case. If the source is small enough, the Mage might be required to carry it with him. If not, perhaps the Mage has to simply return to the Source at regular intervals or forge a mystical \"silver cord\" that ties him to the Source, regardless of the intervening distance. The Judge and player should work together to develop a playable Source and link.\n\n(Note: This power grants +1 additional power slot during character generation.)",
    "errataNote": "",
    "powerStunts": [],
    "bonusPowerSlots": 1,
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
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
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 spell / effect"
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
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 area"
  },
  {
    "code": "MG6",
    "name": "Magic Domination",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a form of Mind Control. The Mage can control the actions of other Mages in regards to the casting and use of Magic spells. The Mage acts as a Puppetmaster who can control the physical actions but not the corscious mind of his victim.",
    "rulesText": "This is a form of Mind Control. The Mage can control the actions of other Mages in regards to the casting and use of Magic spells. The Mage acts as a Puppetmaster who can control the physical actions but not the corscious mind of his victim. The Mage can iorce his puppet to cast any Magic he possesses in any way the controlling Mage desires. The Mage cannot control the actual characteristics of the puppet Mage's Magic. Range, area of effect, and casting time are all unaltered.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 target"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Permanent / Maintained",
    "targets": "1 target"
  },
  {
    "code": "MG8",
    "name": "Magic Vampirism",
    "category": "Magical",
    "source": "UPB Table p. 16-19 & Entry MG8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The Mage Vampire can drain the Magical energy from a target and convert that Magic into extra Strength, Endura-.1ce, Psyche, and any other Magic or Powers he possesses. The Mage-Vampire can force a nonliving, non-sentient Magical item or being to release all its raw Magic. He must make a FEAT whose Intensity is equal to the highest ranked Magic the target possesses.",
    "rulesText": "The Mage Vampire can drain the Magical energy from a target and convert that Magic into extra Strength, Endura-.1ce, Psyche, and any other Magic or Powers he possesses. The Mage-Vampire can force a nonliving, non-sentient Magical item or being to release all its raw Magic. He must make a FEAT whose Intensity is equal to the highest ranked Magic the target possesses. For example, draining the Magic from Silver Dagger's namesake weapon requires an Amazing Intensity FEAT. A drained item is now nothing but a collection of normal materials. Magical beings may be hurt or destroyed if the Magic was an intrinsic part of their physiology.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "targets": "1 target"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Rank",
    "duration": "Maintained / Permanent",
    "areaOfEffect": "Rank areas",
    "optionsDefinition": {
      "powerCode": "MG10",
      "powerName": "Reality Alteration",
      "id": "reality_alter_type",
      "label": "Reality Alteration Form",
      "canRoll": true,
      "rollTable": [
        [
          1,
          40,
          "future"
        ],
        [
          41,
          65,
          "present"
        ],
        [
          66,
          75,
          "past"
        ],
        [
          76,
          100,
          "temporal_flow"
        ]
      ],
      "choices": [
        {
          "key": "future",
          "label": "Alter Future",
          "description": "Controls the probability of future events coming to pass.",
          "isSuperior": false
        },
        {
          "key": "present",
          "label": "Alter Present",
          "description": "Alters current circumstances and physical configurations in the moment.",
          "isSuperior": false
        },
        {
          "key": "past",
          "label": "Alter Past",
          "description": "Alters conditions resulting from past events.",
          "isSuperior": false
        },
        {
          "key": "temporal_flow",
          "label": "Temporal Flow",
          "description": "Directly controls the actual speed and passage of time.",
          "isSuperior": true
        }
      ]
    }
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
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Contact",
    "targets": "1 spirit"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Universal",
    "duration": "Maintained",
    "targets": "1 target"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Same area",
    "duration": "Permanent / Maintained",
    "areaOfEffect": "1 area"
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
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "targets": "1 extradimensional entity"
  },
  {
    "code": "P1",
    "name": "Armor Skin",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a form of Body Armor. The hero's skin is transformed into a damage-resistant form. The Power rank number decreases the Intensity of any physical or energy attack.",
    "rulesText": "This is a form of Body Armor. The hero's skin is transformed into a damage-resistant form. The Power rank number decreases the Intensity of any physical or energy attack. This decrease applies each turn for as long as the attack continues. The Armor Skin may be permanent or temporary. The permanent form is a lasting modification to the hero's appearance and physiology. The temporary form allows the hero to retain his normal human appearance and identity. When the need arises, the hero can manifest his Power and transform himself into his armored self. The advantage of the permanent form is that hero is always protected. The disadvantage is that the hero may be a physical freak. The advantage to the temporary from is that the hero can live a relatively normal life when he is not performing heroic deeds. The disadvantages are twofold. One, the hero lacks his protective skin most of the time and two, the temporary form is only available at a cost of -2CS to the Power rank. The armor skin can take a variety of appearances. There are four main types of Armor Skin. Each has its own set of characteristics. The player must select one form when he first generates this Power. Die Roll\n\nForm\n\n01-35 36-60 61-85 86-00\n\nLeather Rigid Plates Visually Inorganic Inorganic\n\n• \n\n• \n\n• \n\nLeather-The epidermis retains its normal shape and flexibility but is harder to the touch. The skin maintains its normal bodily functions without the need for extensive changes. Androids are often given this type of Armor Skin. Rigid plates-The body is covered in interlinked plates like an insect's chitin or an armadillo's shell. The wrestler known as the Armadillo is an example of this type of Armor Skin. Visually Inorganic-The body can be any shape but has the appearance of nonorganic matter. The layering may appear rocky, metallic, or any other choice of surface. The Thing's orange rock-like exterior is an example of this. •\n\nNon-organic-The body actually is covered in inorganic material. Unlike an externally applied coating, this one is formed by modified cells in the hero's epidermis.\n\nIn all of these forms, any damage that is suffered is healed at normal rates by the skin cells that underlie and support the specialized cells of the Armor Skin. An Optional Power is Regeneration.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "P2",
    "name": "Body Resistance",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the form of Body Armor most heroes want. The hero's body is composed of apparently normal flesh. However, the tissue of capable of withstanding major damage without showing any effects.",
    "rulesText": "This is the form of Body Armor most heroes want. The hero's body is composed of apparently normal flesh. However, the tissue of capable of withstanding major damage without showing any effects. The resistance covers physical and energy attacks only. The Intensity rank number of the at-. tack is reduced by this Power's rank number. The remaining Intensity is the actual damage the hero suffers. While the hero's skin shows the effects of the tremendous abuse it suffers, at least it heals quickly. The Power enables the epidermis to heal at a tenfold rate. An Optional Power is Regeneration.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "P3",
    "name": "Chemical Touch",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero's body secretes chemicals that are capable of a variety of effects on a target. The chemicals can be automatically or consciously secreted. The player must choose when the Power is first generated; there is an equal random chance for each.",
    "rulesText": "The hero's body secretes chemicals that are capable of a variety of effects on a target. The chemicals can be automatically or consciously secreted. The player must choose when the Power is first generated; there is an equal random chance for each. If the hero possesses a variety of Touch Powers, then the hero can alter the nature of the secreted chemicals at will.\n\nmatter into useful forms.\n\nA Power Touch is created by combining this Power with any other Power the hero has. Each Touch Power has Power rank Intensity and does rank damage, regardless of the Touch Power's nature. The behavioral characteristics are those of the original Power that was incorporated into the Touch Power. The range is always limited to Contact only.\n\nThe power also includes a +4CS resistance to liquid or solid toxins. These are simply resisted or converted into 'useful materials. This Power includes a number of physical adaptations to accommodate it. The hero possesses hyperstrong teeth and jaws that permit biting and swallowing any materials, as well as resistance to internal damage caused by the swallowed material .\n\nA wide variety of Touch Powers are possible, as this Power can combine with most of the other entries in this book. The key to it is playability; if you can figure out a rational explanation for a given combination, the you should try it. This can generate a myriad of unique Powers. Some possibilities include:\n\nThere are two side-effects to this Power. The first is the decrease of the hero's sense of taste. The second is that the hero's flesh is relatively poisonous, since much of it may have been formed from converted materials that would revert to their original states after their removal from the living hero's body. The hero would thus be immune to a vampire's attack or could exact posthumous revenge on anything stupid enough to eat him.\n\n• \n\n• \n\n• \n\n• \n\nHallucinogenic: The touch incorporates Hallucinations to produce vivid but totally false images in the target's mind. Fighting and Intuition drop -3CS. Bioluminescence: The Touch incorporates Light Generation to make the target's body temporarily self illuminating. Napalm Grip: The Touch incorporates Fire Generation to create fire on contact. Boom Boxing: The Touch incorporates Combustion to produce explosions on contact.\n\nThe Nemesis is Phasing.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Rank turns",
    "targets": "1 target",
    "optionsDefinition": {
      "powerCode": "P3",
      "powerName": "Chemical Touch",
      "id": "chemical_touch_type",
      "label": "Chemical Secretion Control",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "automatic"
        ],
        [
          51,
          100,
          "conscious"
        ]
      ],
      "choices": [
        {
          "key": "automatic",
          "label": "Automatic Secretion",
          "description": "Chemicals secrete involuntarily upon any physical contact.",
          "isSuperior": false
        },
        {
          "key": "conscious",
          "label": "Conscious Secretion",
          "description": "Chemicals secrete voluntarily at will, preventing accidental contamination.",
          "isSuperior": true
        }
      ]
    }
  },
  {
    "code": "P4",
    "name": "Digestive Adaptation",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can swallow and digest any substance without harm. The digestive tract extracts useful materials and synthesizes new ones from the available material. In game \"reality\" this Power is an internalized, automatic form of Matter Conversion.",
    "rulesText": "The hero can swallow and digest any substance without harm. The digestive tract extracts useful materials and synthesizes new ones from the available material. In game \"reality\" this Power is an internalized, automatic form of Matter Conversion. Materials created by this Power retain their new nature while within the hero's body; upon expulsion they revert to their original nature. In rare cases, the hero is a living filter who could eventually convert all available\n\nIf the hero has this Power on a temporary basis (such as the result of a spell), any matter conversions are permanent. Optional Powers include Lung Adaptability and Body Adaptation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "P5",
    "name": "Hyper-Speed",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero is capable of extremely fast motion and may even surpass light speed. Normally this Power includes a specific resistance to friction and lungs that are adapted to breathe high-velocity air. If the hero possesses a Travel Power, he can exchange this speed for that of the latter Power.",
    "rulesText": "The hero is capable of extremely fast motion and may even surpass light speed. Normally this Power includes a specific resistance to friction and lungs that are adapted to breathe high-velocity air. If the hero possesses a Travel Power, he can exchange this speed for that of the latter Power. The Power can also be used to perform tasks in greatly reduced time. The Power rank number is treated as a multiplier to show how much more quickly a specific task can be accomplished by someone with this Power. For example, Typical rank moves four times as fast, an Incredible rank moves 40 times as fast, and so on. When creating the character, the player can raise the rank +2CS by omitting the special adaptations for friction and breathing. This is a dangerous thing, though, people. (But what the heck-it's your character.)",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "speed": "Land"
  },
  {
    "code": "P6",
    "name": "Hypnotic Voice",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P6",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero possesses a voice whose intrinsic qualities permit a hypnotic domination of the target's conscious and subconscious thoughts. The bulk of the hero's commands are sub-verbal in nature (it's not what she says, but how she says it). The hero can effect anyone within the sound of her voice.",
    "rulesText": "The hero possesses a voice whose intrinsic qualities permit a hypnotic domination of the target's conscious and subconscious thoughts. The bulk of the hero's commands are subverbal in nature (it's not what she says, but how she says it). The hero can effect anyone within the sound of her voice. The optimum effect occurs within twenty feet of her location. The Power decreases -1CS for each additional twenty feet. Everyone within range must make an Intuition FEAT in order to resist falling under the effect of this Power. Failure means complete submission to the singer's command. Victims of the Power can make a new attempt to resist every ten turns. The Power can be used for as long as the hero concentrates on it. If a victim gets beyond the sound of the Hypnotic Voice, he can attempt to resist every five turns. The Power comes in two varieties, automatic and deliberate. The automatic form is a permanent modification to the hero's voice. Every time she speaks, the Power can function. The deliberate form requires the hero to consciously alter his voice to manifest his Power. The player must choose which form the hero has. The automatic form costs a decrease of -2CS to the Power rank. The Power's range can be extended by mechanical means like telephones and radio. Remote control has a decreased effectiveness of -2CS. Reproduction of the Hypnotic Voice is not quite as dangerous; the overall rank is decreased -4CS. The Power cannot control someone who cannot hear it. Deaf persons or those with altered senses are immune. Soundproofing, loud noises, and simply getting out of range are effective tactics against the Power. The Power has -1CS effect on nonhumans. (When creating the hero, the player can raise the Power rank +1CS by limiting its effect to members of the opposite sex. For example, Lorelei can only affect men.)",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Same area (Vocal)",
    "duration": "Rank turns",
    "targets": "All who hear"
  },
  {
    "code": "P7",
    "name": "Lung Adaptability",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can breathe any gaseous or liquid medium without harm. The lungs can extract required gases (oxygen for humans) or even create them by converting available elements. In game \"reality\" this Power is an internalized, automatic form of Matter Conversion.",
    "rulesText": "The hero can breathe any gaseous or liquid medium without harm. The lungs can extract required gases (oxygen for humans) or even create them by converting available elements. In game \"reality\" this Power is an internalized, automatic form of Matter Conversion. Gases created by this Power retain their new nature while still within the hero's body; upon exhalation they revert to their original nature. In rare cases, the conversion is permanent. In this case, the hero is a living filter who could eventually convert all the local breathing medium into a form beneficial to him. Any poisons are simply resisted or converted into useful materials. Unfortunately, this Power also has the drawback of decreasing the hero's senses of taste and smell. Everything is bland to him.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "P8",
    "name": "Pheromones",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is an aerosol version of Hypnotic Control. The hero's body can create and emit chemicals capable of altering a target's behavior. These chemicals vaporize instantly on contact with air and are received by the target's nose.",
    "rulesText": "This is an aerosol version of Hypnotic Control. The hero's body can create and emit chemicals capable of altering a target's behavior. These chemicals vaporize instantly on contact with air and are received by the target's nose. The complexity of the commands can vary with the rank of the Power. The hero can readily affect anyone within twenty feet of him. The Power rank decreases -1CS with each additional twenty feet. The Power cannot affect those unable to smell it. This includes would-be targets who are upwind, behind a force- field, have their own air supply, don't breathe, or breathe but have no sense of smell. The last example includes a hero with the power of Lung Adaptability. When the hero is created, the player must decide whether the Power functions automatically or deliberately. The automatic form lowers the Power rank -2CS.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Same area",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "targets": "All in area"
  },
  {
    "code": "P9",
    "name": "Regeneration",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P9",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can rapidly recover from any wound. Cuts quickly close and disease symptoms disappear. The hero heals at an accelerated rate equal to the Power rank number times the normal amount of time.",
    "rulesText": "The hero can rapidly recover from any wound. Cuts quickly close and disease symptoms disappear. The hero heals at an accelerated rate equal to the Power rank number times the normal amount of time. For example, a Typical rank can heal six times as fast as normal, an Unearthly rank heals at a hundredfold rate, and so on. With time, the hero can regrow large areas of lost tissue, especially severed limbs. Lost limbs or organs require a red FEAT. It cannot repair losses that resulted in the hero's death unless the hero is revived. If such a fatal loss and subsequent revival occurs, the hero requires lifesupport equipment to give his Power time to function.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "P10",
    "name": "Self-Revival",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P10",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero's Power is so strong that it can repair fatal damage and actually return the hero to life. The power functions despite the absence of life in the body. It repairs the major damage and replaces lost tissues at the same rate as Regeneration above.",
    "rulesText": "The hero's Power is so strong that it can repair fatal damage and actually return the hero to life. The power functions despite the absence of life in the body. It repairs the major damage and replaces lost tissues at the same rate as Regeneration above. When the body is returned to minimum life sustaining condition, the hero comes back to life. This occurs despite any intervening time in which the hero was dead; from the hero's point of view, no time has passed. If the hero was dismembered, the Revival Power is concentrated on the largest remaining segment. The rest of the body decays normally. In rare cases, all body parts regrow. Depending on the size of the segment, each attains only partial redevelopment of growth, intelligence, and power. Even rarer are the cases where all the newly regrown bodies attain full development. Rarest of all is the case where all the new bodies share a single mind. The Judge can decide if he wants to allow such rare cases to intrude on his tidy campaign. This power contains aspects of Free Spirit and Matter Creation. The color FEAT reflects the amount of the body available for the Power to work with. A green FEAT means all the body is present aside from spilled blood. A yellow FEAT means all vital organs are present, although some of the less vital parts may still be missing. A red FEAT is required if at most one quarter of the original body is available. If less is available, Revival cannot occur.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "P11",
    "name": "Self-Sustenance",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can survive indefinitely without consuming air, water, or food. Bodily wastes are internally recycled back into useable materials. Normally the hero would not need to replenish himself when his power reached its limit.",
    "rulesText": "The hero can survive indefinitely without consuming air, water, or food. Bodily wastes are internally recycled back into useable materials. Normally the hero would not need to replenish himself when his power reached its limit. He merely resumes normal consumption habits (breathe normally, eat a light snack, etc.). This is the permanent form of the power. The temporary form requires the hero to consume mass quantities at the expiration of the Power. (\"That's the fifteenth steak you've eaten, Fred. How long did you say it's been since you ate last?\") The required intake is one- quarter what the hero would normally have consumed during the time he was abstaining. The hero can raise his Power rank +1CS by opting for the temporary form.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "P13",
    "name": "Suspended Animation",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can temporarily suspend all life functions and enter a death-like trance. The hero can later return to life and normal activity without harm. During this period, the hero's body can be subjected to normally fatal conditions and not suffer any, unless the body is actually damaged (say, a big rock fell on it).",
    "rulesText": "The hero can temporarily suspend all life functions and enter a death-like trance. The hero can later return to life and normal activity without harm. During this period, the hero's body can be subjected to normally fatal conditions and not suffer any, unless the body is actually damaged (say, a big rock fell on it). If this happens, the hero cannot return to life until the damage is repaired. Under normal conditions, the hero can consciously decide when to reawaken. This may be at the end of a predetermined length of time, or when certain conditions are met (like when his spaceship has air in it again). Otherwise, the hero must be stimulated into awakening by another person. Rank determines the maximum length of time the hero can suspend animation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "P14",
    "name": "True Invulnerability",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P14",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is a combination of Resistances and Body Armor. The hero is immune to any physi cal harm, up to his rank's limit. The immunity includes the following resistances: fire, heat, cold, electricity, radiation, corrosives, disease, poison, brute force, sonics, and kinetic bolts.",
    "rulesText": "This is a combination of Resistances and Body Armor. The hero is immune to any physi cal harm, up to his rank's limit. The immunity includes the following resistances: fire, heat, cold, electricity, radiation, corrosives, disease, poison, brute force, sonics, and kinetic bolts. The rank of the Invulnerability reduces the rank of the attack form. Example: A Mandroid's Excellent laser would do only Feeble- damage against Good Invulnerability, and none at all against Remarkable Invulnerability. The hero with this Power is still vulnerable to magical and mental attacks. If the hero should lose his True Invulnerability, his Fighting rank drops to Typical (he's not used to avoiding blows). The hero's appearance is not affected by this power; he appears to be a normal member of his race.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "P15",
    "name": "Vocal Control",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This might be considered a Talent rather than a Power, but here goes anyway. The hero has total control over his own voice and can use it to duplicate any desired voice of sound. The accuracy of the simulated sound is 100% within the Power's limit (determined by rank) on a green FEAT.",
    "rulesText": "This might be considered a Talent rather than a Power, but here goes anyway. The hero has total control over his own voice and can use it to duplicate any desired voice of sound. The accuracy of the simulated sound is 100% within the Power's limit (determined by rank) on a green FEAT. Exceeding the limit requires a higher.-FEAT. The hero can imitate\n\nSonic Powers that will have most of the effectiveness of the original. The rank for such mimicked Powers is 1CS of the original's rank.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained"
  },
  {
    "code": "P16",
    "name": "Waterbreathing",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P16",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This may be a \"wimp Power,\" but it would be embarrassing for an extremely powerful character to drown while a relatively wimpish water breather went unharmed. When creating the character, the player can substitute any other breathing medium for water. This is often the case when creating an alien character, such as one who breathes liquid methane.",
    "rulesText": "This may be a \"wimp Power,\" but it would be embarrassing for an extremely powerful character to drown while a relatively wimpish water breather went unharmed. When creating the character, the player can substitute any other breathing medium for water. This is often the case when creating an alien character, such as one who breathes liquid methane. This power may be permanent or temporary. Characters with the permanent form have a decreased resistance to heat and aridity. A sauna might be a death trap. The hero is -1CS to resist and takes +1CS damage.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "P17",
    "name": "Water Freedom",
    "category": "Physical Enhancement",
    "source": "UPB Table p. 16-19 & Entry P17",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero's body is adapted for movement in the water. The hero can move through water with the same ease that normal beings can move through air. One method of accomplishing this is the presence of a body-coating that reduces the effects of water resistance.",
    "rulesText": "The hero's body is adapted for movement in the water. The hero can move through water with the same ease that normal beings can move through air. One method of accomplishing this is the presence of a bodycoating that reduces the effects of water resistance. The more common method is the hero is extraordinarily strong and swift in order to compensate for water resistance. This permits him to function normally, even at great depths. If such a person were on the surface, his extra strength and speed would be evident (+2CS Strength and Endurance). Unfortunately, since the hero is normally moving in water, he overcompensates on dry land (-2CS Agility). Water Freedom also negates the effects of great pressure and allows the hero to travel to the depths of the oceans without harm. Note: This power does not automatically include Water Breathing. The player can choose that as a bonus power if he so wishes.\n\nPower Control Powers Die Roll\n\nPower Control Power\n\n(Code)\n\n01-08 09-12 13-18 19-23 24-37 38-39 40-49 50-55 56-60 61-64 65-73 74-83 84-96 97-00\n\nControl* Creation Domination* Duplication Energy Source Energy Source Creation* Focus Gestalt Nemesis Power Transferral Power Vampirism * Residual Absorption Selection Weakness Creation*\n\nPC1 PC2 PC3 PC4 PC5 PC6 PC7 PC8 PC9 PC10 PC11 PC12 PC13 PC14\n\nThis somewhat redundant title refers to a class of Powers that directly affect the way other Powers function. These \"Macro- Powers\" can only affect raw or applied Power and the beings who possess Power. They have no direct effect on normal, Power-less people. The exception to this are the Macro-Powers that can create new Powers in heretofore normal people. Some of these Powers will probably be limited to NPCs or high level heroes; this is up to individual Judges.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
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
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "areaOfEffect": "1 area",
    "targets": "All in area"
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
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
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
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent",
    "optionsDefinition": {
      "powerCode": "P20",
      "powerName": "Hyper-Strength",
      "id": "hyper_strength_type",
      "label": "Strength Enhancement Mode",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "surge"
        ],
        [
          51,
          100,
          "permanent"
        ]
      ],
      "choices": [
        {
          "key": "surge",
          "label": "Temporary Daily Surge (+1CS)",
          "description": "Baseline Strength is normal; can activate a +1CS Strength surge for turns equal to Power Rank number once per day.",
          "isSuperior": false,
          "effects": {
            "isSurge": true
          }
        },
        {
          "key": "permanent",
          "label": "Permanent Baseline Addition",
          "description": "Permanently adds the Power Rank number directly to baseline Strength, recalculating Health and Slugfest damage.",
          "isSuperior": true,
          "effects": {
            "addsStrengthToBaseline": true
          }
        }
      ]
    }
  },
  {
    "code": "PC1",
    "name": "Control",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC1",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can alter the behavior of pure Power, whether it is in a raw or applied state. The hero can control the actions of any Powers within his range and capability. If the Power is free of a living super-being's body, that Power's rank determines what Intensity FEAT is required.",
    "rulesText": "The hero can alter the behavior of pure Power, whether it is in a raw or applied state. The hero can control the actions of any Powers within his range and capability. If the Power is free of a living super-being's body, that Power's rank determines what Intensity FEAT is required. If the Power is internalized within a living super- being, the necessary FEAT is determined by that being's Psyche. If Control is achieved, it affects the entire rank of that Power. The range at which the hero can exert control is determined by his own Power rank number. Distances are shown on column A of the Range Table.\n\nThe Macro-Power can affect either a specific type of Power within a specific area, regardless of how many superbeings are affected, or all the Powers possessed by a specific being. The duration of the Control lasts a maximum number of minutes After the expiration of the Control, it must be re- established. This can be done indefinitely. Control is normally directed in a straight line. If the hero wishes an area effect, the sphere he creates has a radius equal to -4CS range. For example, Excellent Control can be exerted on a target six areas away or be contracted into a field that only surrounds the hero's body. There are three forms of Control. At least one form must be chosen when the hero is created. This is initially at full strength. If the player wants the hero to have more forms, each additional form decreases all Control ranks by -1CS. Die Roll\n\nForm\n\n01-40 41-70 71-00\n\nManipulation Magnification/Reduction Negation\n\nManipulation-The hero can alter the flow and application of Power. He can change the direction of a Power with a green FEAT. He can alter the effects of a Power by a yellow FEAT. He can completely change the nature of a Power by a red FEAT. The hero need not actually possess the Power that the old one was transformed into, but the new one should be something harmless to both combatants. Magnification/Reduction - The hero can either increase or decrease the rank of the affected Power by his Macro-Power 's rank number. Unfortunately, the one thing the hero cannot affect his own powers' ranks. Negation-The hero can completely dispel any Powers within his range. Things affected by Powers revert to their original states. Super-beings are reduced to Normal Humans (or whatever). The worst effect is on beings who need Power to physically survive. To them, the loss of Power is damaging and possibly fatal. Undesired Control can be avoided by Dodging a directed attack, moving out of the Control's range, or by the use of such Powers as this one, Force Field vs. Power Manipulation, and Resistance to Power Manipulation. Successful resistance means the would-be victim retains his Powers, at least for now.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Rank",
    "duration": "Rank turns",
    "targets": "1 target"
  },
  {
    "code": "PC2",
    "name": "Creation",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has the ability to create new Powers and invest them into sentient beings for their own use. The new Powers can be of any nature and can be any of the listings in this book. The hero is limited in the number and ranks of the Powers he can create.",
    "rulesText": "The hero has the ability to create new Powers and invest them into sentient beings for their own use. The new Powers can be of any nature and can be any of the listings in this book. The hero is limited in the number and ranks of the Powers he can create. The variety extends beyond his own innate Powers. The Power rank number is the maximum number of different Powers he can create. This number always includes those Powers the hero has. The player and Judge need to work together to determine what Powers are actually present in this Macro-power. The Powers the hero bestows are nowhere near as highly ranked as the hero's own Powers. New Powers are initially -3CS lower than this Power's rank. This can be later increased by the recipient. The length the Powers remain is determined by the hero's Reason. A green Reason FEAT gives a duration of one day times the Reason rank number. A yellow FEAT increases that to 10 days times the Reason rank number. A red FEAT means the Power is permanent. Judges may want to forbid this Power to any player characters or restrict it to high level characters. In such a case, the player should roll for a new Power. The Nemesis Control/Negation. is Power",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Permanent / Maintained",
    "targets": "1 target"
  },
  {
    "code": "PC3",
    "name": "Domination",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC3",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is a form of Mind Control. The hero can control the actions of other super-beings in regards to the use of their own Powers. The hero can force the victim to use his Powers in any manner the hero desires.",
    "rulesText": "This is a form of Mind Control . The hero can control the actions of other super-beings in regards to the use of their own Powers. The hero can force the victim to use his Powers in any manner the hero desires. The hero cannot alter the actual characteristics of the other's Power's. The Macro-Power pits this Power's rank against the victim's Psyche. The Psyche determines what Intensity FEAT is required. The range at which the hero can exert Domination varies with his Power rank and the number of beings that are controlled. The range for Dominating a single being is shown on column A of the Range Table. Each additional superbeing the hero Dominates decreases the overall rank -1CS. The duration is as long as the hero can maintain his concentration. If the victim fails his initial resistance, he can try again every ten turns by making a Psyche FEAT based on this Power's rank.\n\nResistance to Mental Attack, and Power Control. Optional Powers include Mind Control and Magic Domination.\n\nThe Nemesis is Mind Drain. The Nemesis is an Enhanced Psyche string enough to resist Domination.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Rank",
    "duration": "Maintained",
    "targets": "1 target"
  },
  {
    "code": "PC4",
    "name": "Duplication",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "If the hero acquires this Power, the player should immediately set aside all his previously generated Powers and not roll any more. The hero can use his Macro-Power to duplicate the characteristics of any other Power. The Power ranks for the duplicated Powers is equal to the Macro-Power's own rank.",
    "rulesText": "If the hero acquires this Power, the player should immediately set aside all his previously generated Powers and not roll any more. The hero can use his Macro-Power to duplicate the characteristics of any other Power. The Power ranks for the duplicated Powers is equal to the Macro-Power's own rank. Such Powers remain as long as the hero concentrates on maintaining their existence. Unfortunately, the hero can only Duplicate a single Power at any one time. Switching Powers takes three turns. The hero must be exposed to a Power in order to later duplicate it. Such Powers must be used within 10 feet of the hero. A green FEAT enables the hero to store the Power for later duplication. It is assumed the hero has been exposed to others' Powers at some point in his past. Initially the character has a limited number of Powers he has already encountered; these are represented by Powers already generated but set aside. If this was the first Power the hero generated, then randomly generate a single Power. The hero rapidly gains Powers by duplicating those of companions or foes. Since the Power must be used, foes can be a hazardous source of new Powers.\n\nNormal, Power-less beings are completely unaffected by this Power\n\nThe hero has a finite number of Powers he can duplicate. The maximum number is equal to his Power rank number. If the hero exceeds the limit, the new Power replaces an old one.\n\nIf the victim is cooperative, Domination is automatic. Domination can be thwarted by such Powers as Force Field vs. Mental Attack,\n\nThe act of analyzing a Power for later duplication takes three turns. In no way does this affect the source of the Power.\n\nThe hero can develop a Power Stunt that enables him to duplicate Talents as well.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Rank",
    "duration": "Rank turns / Maintained",
    "targets": "1 target"
  },
  {
    "code": "PC5",
    "name": "Energy Source",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero draws his Powers from a special source that provides him with all the energy he can handle. As long as the hero can maintain his link with this source, he can continue to use his Powers. The nature of the source and its link varies with each hero. Grants an additional power slot during character creation.",
    "rulesText": "The hero draws his Powers from a special source that provides him with all the energy he can handle. As long as the hero can maintain his link with this source, he can continue to use his Powers. The nature of the source and its link varies with each hero. If the source is small enough, the hero may be required to carry it with him. If not, perhaps the hero needs to periodically return to the source or forge an ethereal Power cord that links him to his Source despite any intervening distance. The Judge and player need to work together to produce a playable source and link. If the link is severed or the source destroyed, the Mage is left with a finite supply of energy left. The amount of raw Power left is the number of points equal to his Psyche rank. Each time he uses Power, he decreases the reservoir by that Power's rank number. Obviously, it is within the hero's best interests to renew his link or rebuild his source in as little time as possible. As you are beginning to suspect, this isn't really a Power and is more of a restraint. You're right. If you roll this Power, go ahead and roll an additional Power.\n\n(Note: This power grants +1 additional power slot during character generation.)",
    "errataNote": "",
    "powerStunts": [],
    "bonusPowerSlots": 1,
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "PC6",
    "name": "Energy Source Creation",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC6",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is another Power the Judge may want to restrict to NPCs or high level heroes. The hero can create items that can in turn provide Powers to other people. The hero is able to charge a target with raw Power.",
    "rulesText": "This is another Power the Judge may want to restrict to NPCs or high level heroes. The hero can create items that can in turn provide Powers to other people. The hero is able to charge a target with raw Power. The target must be non-living or nonsentient. The target is transformed into a battery that can harmlessly store raw Power indefinitely until needed by the target's new possessor. The hero can store any Power except this one. If the hero is working in conjunction with - another super- being, the Powers of this other being can also be stored with the target. The Macro-Power can store a maximum number of spells equal to this Power's rank number. The maximum number of total rank numbers is equal to this Power's rank number as well. The hero must be in contact with the target in order to fully charge it. If he does not make contact, the ranks for all spells to be bestowed drop -1CS for each ten feet separating hero and target. The act of creating an Energy Source can be disrupted by a variety of factors. The presence of a Psyche within the target prevents this Macro-Power from affecting it. Removing the target from range stops the process of creation. The Macro- Power can be blocked by such Powers as Force Field vs. Power Manipulation, Resistance to Power Manipulation, Power Control, and Power Domination. When the hero creates a new Power Source, he must state what conditions are necessary to release the Powers in a controlled manner. When the Energy Source is depleted or destroyed, the item reverts to its original state.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Same area",
    "duration": "Permanent",
    "targets": "1 source"
  },
  {
    "code": "PC7",
    "name": "Focus",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can channel all his raw energy into a single burst of a chosen Ability or Power. All his Power and Ability rank numbers are totaled together. This rank number replaces the rank number for a chosen Power. Grants an additional power slot during character creation.",
    "rulesText": "The hero can channel all his raw energy into a single burst of a chosen Ability or Power. All his Power and Ability rank numbers are totaled together. This rank number replaces the rank number for a chosen Power. Upon the completion of releasing the Power, all the hero's Abilities and Powers temporarily drop to Feeble. This Power's rank number is the total amount of lost points the hero can regain each turn. Points are divided evenly between all the depleted Abilities and Powers. (Okay, this isn't really a Power either. Roll again for an additional Power.)\n\n(Note: This power grants +1 additional power slot during character generation.)",
    "errataNote": "",
    "powerStunts": [],
    "bonusPowerSlots": 1,
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
  },
  {
    "code": "PC8",
    "name": "Gestalt",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Two or more users can combine to create a new Power. The Power can be of any nature; its Power rank is equal to this one. When the player generates this Power, he must first select another player's character with whom his hero forms the Gestalt.",
    "rulesText": "Two or more users can combine to create a new- Power. The Power can be of any nature; its Power rank is equal to this one. When the player generates this Power, he must first select another player's character with whom his hero forms the Gestalt. Second, both players must randomly determine what the Gestalt-created Power actually is. Roll for additional Power; this is the Gestalt. The best example of Gestalt Power in the Marvel Universe was the Beaubier twins, Aurora and Northstar, who could generate Monstrous Intensity Light when they touched.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Same area",
    "duration": "Maintained",
    "targets": "Participants"
  },
  {
    "code": "PC9",
    "name": "Nemesis",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "When this Power is first generated, it replaces all other Powers the hero might have other had. If a hero is clever, then no other Powers are needed. The basis for Nemesis is the ability to automatically analyze an opponent's Powers and Weakness.",
    "rulesText": "When this Power is first generated, it replaces all other Powers the hero might have other had. If a hero is clever, then no other Powers are needed. The basis for Nemesis is the ability to automatically analyze an opponent's Powers and Weakness. The hero then instantly generates a Power that can defeat the opponent. The newly created Power can be a +1CS version of the opponent's Power or is an opposing Power. The nature of the Nemesis Powers varies with each opponent. The only Power that a Nemesis cannot Generate is Power Control/Negation. Analyzing an opponent takes one turn. Designing a suitable Power and infusing into the hero's body takes two turns. Switching opponents causes an additional delay of seven turns, The opponent must be with 10 feet of the hero for analysis to occur; this can be extended to 100 feet if the opponent is the only superbeing in the area. This Macro-power's rank determines the maximum Power rank of a generated Power. When facing a foe of greater strength, the player must select a Power that can still prevail, despite the disparity. Nemesis has two inherent weaknesses. The first is that the Macro-Power can only cope with a single opponent's Powers at one time. The second problem is that the\n\nMacro-Power is helpless against Powerless people. If there is no Power to overcome, then it cannot generate a Power. Because Nemesis possessing heroes tend to overly rely on their Macro-Power, they tend to be a little rusty when it comes to Fighting normal people. Decrease Fighting's rank -2CS for such cases.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "targets": "1 opponent"
  },
  {
    "code": "PC10",
    "name": "Power Transferral",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can transfer some or all of his Powers to another sentient being. The transferral can be any combination of Powers and ranks. Only this Power cannot be, transferred.",
    "rulesText": "The hero can transfer some or all of his Powers to another sentient being. The transferral can be any combination of Powers and ranks. Only this Power cannot be, transferred. Each transferred Power rank diminishes the hero's own rank for that Power. A single Power can be transferred each turn. The optimum range for Power T ransferral is contact. Each ten feet that separates the hero and recipient decreases both the recipient's and hero's Power ranks -1CS. If the hero wants to simultaneously transfer Power to two or more recipients, he simply divides the ranks between them. The duration of the loan varies with the Reason rank of the hero and the FEAT made at the time of transferral. A green Reason FEAT gives a duration of 100 turns times the Reason rank number. A yellow FEAT increases that to 10,000 turns times the Reason rank number. A red FEAT changes the loan to a permanent grant. Most recipients tend to believe that suddenly receiving Power is in their best interest and thus the recipient cooperates in any way he can. Still, if the recipient wants to resist this Macro-Power, he can do so by moving out of range or blocking it by such Powers as Force Field vs. Power Manipulation, Resistance to Power Manipulation, and Power Control. Optional Powers include Mind Transferral and Magic Transferral. The Nemesis is Force Field vs. Power Manipulation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Touch / Contact",
    "duration": "Permanent / Maintained",
    "targets": "1 target"
  },
  {
    "code": "PC11",
    "name": "Power Vampirism",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC11",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The Power Vampire can drain the raw Power from a victim and convert that energy into extra Strength, Endurance, Psyche, and ranks for other Powers the Vampire has. The Power Vampire can force a nonliving, non-sentient target to release all its raw Power. He must make an Intensity FEAT equal to the highest ranked Power the target possesses.",
    "rulesText": "The Power Vampire can drain the raw Power from a victim and convert that energy into extra Strength, Endurance, Psyche, and ranks for other Powers the Vampire has. The Power Vampire can force a nonliving, nonsentient target to release all its raw Power. He must make an Intensity FEAT equal to the highest ranked Power the target possesses. A drained item reverts to its original state. Living or sentient beings are harder to drain. The victim's Psyche determines what Intensity FEAT is required. A successful FEAT enables the Vampire to drain Power from the victim. The amount of raw Power equal to this Power's rank number is drawn in equal portion s from all the victim's Powers. The process of feeding can continue indefinitely, as long as the vampire makes successful FEATs. Each turn drains another rank's worth of Power. The Vampire can voluntarily cease feeding at any time by making a Psyche FEAT of any color except red. A red FEAT means the hero has entered an uncontrollable feeding frenzy that can only stop when the victim is drained or the Vampire is repulsed. If the Vampire fails to make a FEAT at any point in the feeding process, he is immediately repulsed from the victim and can never resume the attack. The victim gains an instant immunity to any future Vampiric attacks by that being. The Power the Vampire absorbs is used to increase his own Strength, Endurance, Psyche, and Powers. The increase in equal amounts to all the adjustable Abilities. The exception is this Power, as no Vampire can increase his own Vampiric Power. Power Vampires lose energy at a depressing rate. The rank numbers for Strength, Endurance, Psyche, and all Powers except this one decrease one point per hour. The Power Vampire must feed to survive. A Power Vampire cannot actually starve to death if denied a sufficient supply of victims. When all his affected Abilities reach Shift-0, the Vampire falls into a coma. His Power Vampirism continues to function and tries to drain anyone who comes within a foot of the body. When the Power Vampire's abilities return to Feeble rank, the Vampire returns to life. When creating a Power Vampire, the player must choose a Weakness. The player can raise his Power rank +1CS for each additional Weaknesses he chooses, up to a total of four Weaknesses. Power Vampirism is communicable. A living or sentient being who was completely drained by a Power Vampire must make a Psyche FEAT roll. A red FEAT means the victim has himself been transformed into a Feeble Power Vampire. The Nemesis is a Psyche temporarily raised 2CS higher than the vampire's rank.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Contact",
    "targets": "1 target"
  },
  {
    "code": "PC12",
    "name": "Residual Absorption",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can duplicate a Power by absorbing the traces left behind whenever a Power is used. The residue may be in anything that was near or the target of a Power's emission. The Power rank determines what the rank is for any Powers created in this way. Grants an additional power slot during character creation.",
    "rulesText": "The hero can duplicate a Power by absorbing the traces left behind whenever a Power is used. The residue may be in anything that was near or the target of a Power's emission. The Power rank determines what the rank is for any Powers created in this way. The duration of the borrowed Powers is determined by the hero's Reason. A green Reason FEAT gives a duration equal to the Reason rank times 100 turns. A yellow FEAT raises that to 10,000 turns times the Reason rank number. A red FEAT increases that to permanence.\n\nWhen the player generates this Power, he gets to generate an additional Power as well. The average amount of residue bearing material is about the size of a breadloaf. It is completely drained after a single use.\n\n(Note: This power grants +1 additional power slot during character generation.)",
    "errataNote": "",
    "powerStunts": [],
    "bonusPowerSlots": 1,
    "isStarred": false,
    "powerSlots": 1,
    "range": "Same area",
    "duration": "Maintained"
  },
  {
    "code": "PC13",
    "name": "Selection",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can possess any number of Powers but can only use a single one at a given time. Switching between Powers takes three turns. When the player generates this Power, he gets to generate an additional Power as well. (Grants +1 additional power slot)",
    "rulesText": "The hero can possess any number of Powers but can only use a single one at a given time. Switching between Powers takes three turns.\n\n(Note: This power grants +1 additional power slot during character generation.)",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent",
    "bonusPowerSlots": 1
  },
  {
    "code": "PC14",
    "name": "Weakness Creation",
    "category": "Power Control",
    "source": "UPB Table p. 16-19 & Entry PC14",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can bestow a weakness on a victim that is just as dangerous as if the victim as always possessed that Weakness. The hero must make a Power FEAT whose Intensity is determined by the victim's Psyche. Success means the hero has temporarily mangled the victim's physiology and given him a new Weakness.",
    "rulesText": "The hero can bestow a weakness on a victim that is just as dangerous as if the victim as always possessed that Weakness. The hero must make a Power FEAT whose Intensity is determined by the victim's Psyche. Success means the hero has temporarily mangled the victim's physiology and given him a new Weakness. The player randomly generates the nature of the Weakness using the Tables in the early sections of this book. The duration of the Weakness is determined by a separate Reason FEAT made at the time the Weakness is created. A green FEAT gives a duration of 10 turns times the Reason rank number. A yellow FEAT increases that to 1000 turns times the Reason rank number. A red FEAT further increases that to 10,000 turns times the Reason rank number. At the expiration of the duration, the victim returns to normal, unless he has died in such a way he cannot be revived. This is the final Power that Judges should probably restrict to NPCs or high level characters.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Rank",
    "duration": "Rank turns",
    "targets": "1 target"
  },
  {
    "code": "S1",
    "name": "Age-Shift",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter his apparent age at will, His body and physiology change to simulate any age, younger or older. Mental facilities remain unaffected (in other words, you really can have a 10-year-old mind in a 30-year-old body). When creating the hero, the player can opt to link the hero's other physical Powers to a different physical age.",
    "rulesText": "The hero can alter his apparent age at will, His body and physiology change to simulate any age, younger or older. Mental facilities remain unaffected (in other words, you really can have a 10-year-old mind in a 30year-old body). When creating the hero, the player can opt to link the hero's other physical Powers to a different physical age. For instance, Jon's hero can be a 1 0-year-old boy who has the ability to become a 25year- old with the Powers of. Flight, Shadowcasting, and Telepathy. Rank determines the apparent number of years the hero can Age Shift. Normally, a character cannot voluntarily Age-Shift to an age younger than a newborn, since this is definitely suicidal. This barrier can be passed of the hero's Power is being controlled by an outside force.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent / Variable"
  },
  {
    "code": "S2",
    "name": "Alter Ego",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero has two different forms. One is a normal, powerless being; the other is the powerful, heroic self. When creating the hero, the player has to create two different beings.",
    "rulesText": "The hero has two different forms. One is a normal, powerless being; the other is the powerful, heroic self. When creating the hero, the player has to create two different beings. The statistics for the primary self should be fairly routine (all physical abilities ranging from Feeble to Good). All bets are off for the heroic self. Something many people never consider is that the heroic self might be a relatively normal human, while the normal self is something a little lower on the evolutionary ladder. For example, you might try a character whose normal self is a mutant dog (why should humans have all the deviant fun?). The two selves never co-exist except under extraordinary circumstances. Possible causes of simultaneous existence include time warps, cloning, and Lifeform Creation. The two selves may even be separated for an extended time, such as what happened to Bruce Banner and the\n\nThe primary drawback to this Power is the uncontrolled reversion to the normal self, especially when it occurs during dire circumstances. For example, Mightiman is rescuing a sub from the ocean floor when he reverts to his other self, little Eddy Edwards. (\"Can you say 'fish food?' Sure you can.\") Variations include automatic or voluntary transformation, duration, and shared minds versus semiindependent mentalities.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S3",
    "name": "Anatomical Separation",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is the most grotesque Power available but it has its advantages nevertheless. With this Power the hero can spontaneously and harmlessly separate his body into independently functioning segments. Physiological functions like blood flow and neural activity continue in the same manner as if the body were whole.",
    "rulesText": "This is the most grotesque Power available but it has its advantages nevertheless. With this Power the hero can spontaneously and harmlessly separate his body into independently functioning segments. Physiological functions like blood flow and neural activity continue in the same manner as if the body were whole. Detached parts cannot regenerate if the -body is destroyed unless the hero has a regenerative Power. If any detached part JS: damaged or destroyed, the hero suffers the normal damage; his body also reassembles immediately, if possible. The practical basis for this is the power of Gateway/Spacewarp targeted on the hero's own body. In \"game reality\" the hero forms two parallel Spacewarps at the desired point of detachment, then shifts the location of the outer warp. The perceived result is that part of the hero's body detaches and flies off on its own. Normally, the majority of the hero's body acts as an anchor and cannot be moved by shifting the Spacewarps. The hero can develop Power stunts with which he can transport himself. (Example: the hero sends out a hand to grab onto a distant object and then pulls himself 40 days\n\n1,000 2,000 to it.) Detached segments can travel at Power rank speed for Land/Water movement; involuntary reattachment due to injury is instantaneous. The maximum range and duration of detachment are also based on the Power rank. Each additional detachment decreases the range and duration by -1CS, for a cumulative effect. If a single detached segment is prevented from returning to the body at the end of the duration, the rest of the hero's body is instantly drawn to the missing piece. Any intervening barrier is destroyed, doing damage to the hero appropriate to the barrier. If there are two or more missing parts, the rest of the hero's body is instantly drawn to a point midway between them. From there he can move freely in order to recover\n\n| Rank | Move (Areas/Turn) | Duration | Range |\n| :--- | :--- | :--- | :--- |\n| Feeble | 1 area | 1 min | 1 area |\n| Poor | 2 areas | 2 min | 2 areas |\n| Typical | 3 areas | 4 min | 4 areas |\n| Good | 4 areas | 8 min | 8 areas |\n| Excellent | 5 areas | 15 min | 15 areas |\n| Remarkable | 6 areas | 30 min | 30 areas |\n| Incredible | 7 areas | 1 hour | 40 areas |\n| Amazing | 8 areas | 2 hours | 60 areas |\n| Monstrous | 9 areas | 4 hours | 80 areas |\n| Unearthly | 10 areas | 8 hours | 100 areas |\n| Shift X | 12 areas | 1 day | 200 areas |\n| Shift Y | 14 areas | 2 days | 400 areas |\n| Shift Z | 16 areas | 4 days | 600 areas |\n| Class 1000 | 32 areas | 10 days | 1,000 areas |\n| Class 3000 | 50 areas | 20 days | 2,000 areas |\n| Class 5000 | 100 areas | 40 days | 5,000 areas |",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S5",
    "name": "Animal Mimicry",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a form of Power Duplication. The hero can duplicate the natural abilities of any animal. The hero's body does not significantly change; instead, existing flesh changes the way it functions.",
    "rulesText": "This is a form of Power Duplication. The hero can duplicate the natural abilities of any animal. The hero's body does not significantly change; instead, existing flesh changes the way it functions. For instance, perhaps th e lungs can now breathe water. The rank determines a successful duplication. Normal animals take a Typical Intensity FEAT, aliens a Good Intensity FEAT, and magical creatures need an Unearthly Intensity FEAT. Should the hero wish to duplicate an imaginary animal or being, he must make a Class 1000 Intensity FEAT. Duration ranges from one minute to indefinite.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S7",
    "name": "Body Adaptation",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S7",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is related to Life Support. The hero's body automatically adapts its physiology to enable it to survive in hostile environments. Unlike many of the other Powers that also permit this, Body Adaptation physically changes the hero's body.",
    "rulesText": "This is related to Life Support. The hero's body automatically adapts its physiology to enable it to survive in hostile environments. Unlike many of the other Powers that also permit this, Body Adaptation physically changes the hero's body. This Power involves automatically functioning versions of Body Transformation and Shapeshifting. The Power changes the hero into a form that has primary abilities proportional to the new environment. Example: An Adapting hero in a heavy-gravity world might now possess Monstrous Strength, but so do all the natives. Note: If the hero possesses a Strength rank greater than Typical, that CS is carried over into the new situation. In the above example, if the hero possessed Remarkable Strength on Earth, he possesses Shift Y Strength on the heavy world. The hero can completely adapt in one to ten turns, depending on the degree of difference between the new and home environments (Judge's discretion). The adaptation may provide the hero with new ways to move. On a water world, the hero might sprout fins. There is only one adaptation for each type of environment, and it is triggered automatically by the hero's entrance into the new environment. The Power cannot provide the hero with protection against hazards that suddenly occur; a prime example is the hero failing from a great height. This is a hazardous situation, but not a hazardous environment. When adaptation occurs, the hero gains the subconscious knowledge of how to use the new adaptations for survival. If not, we waste game time while the hero learns to breathe. At Shift X, the hero can consciously control the manner of adaptation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Self",
    "duration": "Permanent / Maintained"
  },
  {
    "code": "S8",
    "name": "Body Transformation",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S8",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can alter the nature of elements and compounds within his own body. Innate safeguards in this Power maintain the hero's lifeforce in any altered state. Altered states may not necessarily be mobile, or may move in new ways.",
    "rulesText": "The hero can alter the -nature of elements and compounds within his own body. Innate safeguards in this Power maintain the hero's lifeforce in any altered state. Altered states may not necessarily be mobile, or may move in new ways. (At FE and PR ranks, the hero is immobile.) Note: The safeguards that protect the hero might be disrupted or not included if another hero tries to duplicate this Power. In such cases, use of this Power may be instantly fatal! While in an altered state, the hero has a special vulnerability to attacks menacing that form. If the Absorbing Man transformed himself into paper while fighting the Human Torch... While in a solid altered state, the hero retains his overall normal appearance. If liquid or gaseous, he can assume any shape and still reform into his original appearance at the cessation of the Power. Normally, the hero must transform his entire body into the desired material. He can transform himself into multiple materials or transform specific parts of himself at a cost of -1CS.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S9",
    "name": "Body Coating",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can surround himself with a flexible layer of a protective substance not normally found on his body. The body coat provides protection and allows the hero's Power(s) to manifest (i.",
    "rulesText": "The hero can surround himself with a flexible layer of a protective substance not normally found on his body. The body coat provides protection and allows the hero's Power(s) to manifest (i.e., if the body use his other Powers). Damage to the body coating is not carried over to the hero's own Health; no points are lost even when the coating is completely destroyed. Any damage to the coating can be quickly repaired by the hero's body secreting more of the coating material. The degree of protection and the speed of repair to the coating are determined by the Power rank. The coating can be of any one. substance. When creating the hero, the player must determine the nature of the Body Coating material. Common examples include ice, iron, steel, copper, rock, wood, and insulation. Each material has its own characteristics. If the player rolls this Power more than once when creating the hero, the player may opt for a variety of coatings or increase the rank of -the first coating by +1CS, cumulative. When coated, the hero is vulnerable to attacks against that specific material, like flame against wood, electricity against metal, -or sudden thermal change against rock. Variables include the material strength of the coating, its normal duration, the speed of creation, the rate of replenishment, and the effects on the body. The Body Coating Power gives the hero an added vulnerability to relevant Matter Control Powers. When the coating has reached its duration limit or is no -longer needed, it simply flakes off the hero, s body and quickly disperses as dust or vapor. If an opponent has the ability to negate the coating's flexibility (through Matter Control, Power Control, or Magic), the hero is paralyzed until he can remove the coating or until it reaches its duration.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S11",
    "name": "Chemical Mimicry",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is related to both S7/Body Transformation-Self and to Power Duplication. The hero can duplicate the chemical properties of any element or compound without his own body actually changing in composition. The hero's flesh simply acts as if it were the desired substance.",
    "rulesText": "This is re lated to both S7/Body Transformation-Self and to Power Duplication. The hero can duplicate the chemical properties of any element or compound without his own body actually changing in composition. The hero's flesh simply acts as if it were the desired substance. Obviously the hero retains his solidity, even when duplicating the properties of a liquid or gas. Depending on the desired effect, the range of his chemical power varies from contact to one area. Tracking the hero by smell is difficult because his scent changes with each mimicry (-4CS to tracking ability).",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self (Rank areas)",
    "duration": "Maintained"
  },
  {
    "code": "S13",
    "name": "Energy Body",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S13",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can transform his body into a coherent energy field that supports his lifeforce and is capable of controlled actions. The energy can be of any type (see the Energy Emission listings). When creating the character, the player determines the nature of the energy into which the hero can turn.",
    "rulesText": "The hero can transform his body into a coherent energy field that supports his lifeforce and is capable of controlled actions. The energy can be of any type (see the Energy Emission listings). When creating the character, the player determines the nature of the energy into which the hero can turn. The rank determines the number of possible energy types. The rank for each energy type is originally Good; this is modified by the Ability Modifier Table found on page 6 of the Player's Book. Each Power is rolled separately. Thus, a hero might have a Poor sound-form and an Incredible radiation-form. Damage to the Energy Body is the same as damage to the normal body. The Energy Body is subject to anything that would affect energy of its type. The hero makes a standard Resistance roll to determine such effects on the Energy Body. The hero may find himself confined in a storage field while in energy-form. If so, he must make a red FEAT to attempt to revert to normal. If he fails, he must escape in his energy form. The Energy Body is a relatively unlimited supply of that particular energy type. The hero can expend great amounts of it and still be able to return to normal. Completely depleting the Energy Body requires a red FEAT rolled by the Judge or an adversary. The hero can also ab s orb existing energy of his chosen type to replenish himself. This Power includes the relevant form of Energy Control and Emission for the purpose of controlling the energy When creating the hero, the player can opt to replace one of the other Powers with a Transportation Power. The player can also replace other Powers with the appropriate Energy Emission and Control Powers, if he",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S14",
    "name": "Energy Sheath",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can surround himself with an energy field. This field provides protection, life support, and a means of manifesting the hero's other Powers. The energy field can be of any type (see the Energy Emis sion section for available types).",
    "rulesText": "The hero can surround himself with an energy field. This field provides protection, life support, and a means of manifesting the hero's other Powers. The energy field can be of any type (see the Energy Emis sion section for available types). Each energy field has its own characteristics that affect the ways the hero can use the Power. Only one Energy Sheath can be used at a time. The hero may possess several possible Energy Sheathes. The original rank for each is Good; this can be modified by the Ability Modifier Table on page 6 in the Player's Book. Each Power is rolled separately. Thus a hero might possess a Poor Sonic Sheath and an Incredible Vibration Sheath. Damage to the Sheath does not affect the hero's Health. If the Sheath is destroyed, the hero. must make a red FEAT to regain it. Possible ways of destroying a Sheath include Energy Control and Conversion, Power Control, and Magic. When the hero is using this Power, he has a special vulnerability to Energy Control and Conversion Powers that can affect his type of Energy Sheath (2CS). However, he also has +2CS Resistance to attacks using the same energy form as his Sheath. For the duration of the Sheath, it is assumed to be made of an infinite supply of that energy. (Otherwise, the character bookkeeping would be a nightmare. \"Let's see, if I throw a fireball, that's",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S15",
    "name": "Evolution",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter his mind and body to simulate any stage of the evolutionary path of his species. Note: This is \"comic book\" evolution, folks, the kind where superstrong cavemen eventually evolve into giant brains with vestigial limbs. If the hero possesses other Powers, the player may divide them among different evolutionary stages.",
    "rulesText": "The hero can alter his mind and body to simulate any stage of the Note: This is \"comic book\" evolution, folks, the kind where superstrong cavemen eventually evolve into giant brains with vestigial limbs. If the hero possesses other Powers, the player may divide them among different evolutionary stages. For example, the caveman gets the physical Powers while the giant brain gets the mental ones. Rank determines the duration of the assumed stages. For the caveman, drop the Reason, Intuition, and Psyche, but raise the Fighting, Agility, Strength, and Endurance. For the giant brain, reverse the process and raise the Reason, Intuition, and ' Psyche. In both cases, the decreased abilities drop to Feeble, while the other abilities are raised a corresponding number of ranks. Divide the ranks as evenly as possible. Each stage also has intrinsic advantages. The caveman possesses Typical Tracking, while the giant brain possesses Typical Telekinesis and",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "optionsDefinition": {
      "powerCode": "S16",
      "powerName": "Growth",
      "id": "growth_method",
      "label": "Growth Manifestation Method",
      "canRoll": true,
      "rollTable": [
        [
          1,
          33,
          "dispersal"
        ],
        [
          34,
          66,
          "growth"
        ],
        [
          67,
          100,
          "gain"
        ]
      ],
      "choices": [
        {
          "key": "dispersal",
          "label": "Atomic Dispersal",
          "description": "Low density; atoms spread out while mass remains unchanged. No Strength or Health gain.",
          "isSuperior": false,
          "effects": {
            "strengthBoost": 0
          }
        },
        {
          "key": "growth",
          "label": "Atomic Growth (+1CS Strength)",
          "description": "Atoms expand proportionally, granting a +1CS Strength boost while grown.",
          "isSuperior": false,
          "rankShift": 1,
          "effects": {
            "strengthBoostCS": 1
          }
        },
        {
          "key": "gain",
          "label": "Atomic Gain (Full Strength & Health)",
          "description": "Draws extra-dimensional mass (Kosmos/Pym dimension), setting Strength to match Power Rank & increasing Health.",
          "isSuperior": true,
          "effects": {
            "setsStrengthToRank": true
          }
        }
      ]
    }
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S18",
    "name": "Imitation-Human Changeling",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter his appearance, form, and dimensions to appear in any desired human or humanoid shape. The hero may either imitate a known being or assume a created appearance. This Power does not allow the hero to imitate Powers, Talents, or mannerisms.",
    "rulesText": "There are two types of imitation: •\n\nFace Changer: The hero can change his superficial appearance but cannot alter his basic form or dimensions. The hero has conscious control over the movement and placement of muscles, cartilage, and minor bones (nose, fingers, cheeks) and can alter the color and appearance of his skin and hair. The hero can use this Power to assume any human appearance, provided the desired shape roughly matches his own. Examples: A child could imitate other children, midgets, and dwarves. A thin man could not imitate Sydney Greenstreet.\n\n• \n\nHuman Changeling: hero can alter appearance, form, dimensions to appear in any desired human or humanoid shape. The hero may either imitate a known being or assume a created appearance. This Power does not allow the hero to imitate Powers, Talents, or mannerisms.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S19",
    "name": "Invisibility",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S19",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "With this Power a hero can render himself undetectable by normal, consciously willed sight. There are four very different means of accomplishing this effect. Each form has unique characteristics regarding such factors as the area made invisible, protection against light-based attacks, mechanical detection, and detection by other means.",
    "rulesText": "With this Power a hero can render himself undetectable by normal, consciously willed sight. There are four very different means of accomplishing this effect. Each form has unique characteristics regarding such factors as the area made invisible, protection against light-based attacks, mechanical detection, and detection by other means. Physics: This is the form possessed by Sue Richards. The hero's body is totally transparent to the visible light spectrum. He cannot be mechanically detected or recorded (i.e. by photography or television) and is immune to attacks using visible light (lasers, mostly). At Good rank and higher, the invisibility range can be extended to cover other sections of the energy spectrum (infrared and ultraviolet light, radiowaves, hard radiation); this also bestows immunity to attacks using these forms. At these levels the hero can also extend the area of invisibility beyond his body. This permits the hero to protect others and, more importantly, to wear clothing. (H.G. Wells' Invisible Man was unable to even conceal undigested food within his body.) Telepathic: The hero is actually visible but is ignored and immediately forgotten by beings who would otherwise be capable of detecting his presence. He is also immune to detection by other senses. (\"Did you hear anything? Nah.\") He can be mechanically detected and re corded (this is where this Power gets weird); a video monitor or alarm that reveals the hero's presence will be ignored by anyone within range of the hero's Power. Photographic film records the hero, but anyone looking at it while within range of the hero's Power will ignore the hero's image. Anyone outside this range can see the hero quite clearly, and will be very confused about the lack of reaction by those around the hero. He can extend this invisibility to anyone in physical contact with him. If the hero loses touch (literally) with someone whom he was protecting in this way, that person is immediately susceptible to the Power's effect and forgets that the hero was ever there. Robots and cybernetic beings are unaffected by this Power, but they can be protected by it. The Power does not affect any light-based attack but does provide protection against psionic attacks (-2CS for the attacker). Hallucinatory: The hero is actually visible but is surrounded by a telepathic field that makes others see an empty spot where the hero is. The Hallucination can incorporate the hero's surroundings and affect realtime viewers at a great distance. In other words, the hero can disguise the area around himself and this disguise will fool anyone looking at the area, even if they are miles away. However, this Power doesn't fool film or videotape; these record the scene as it really is. Hallucination also prevents detection by other senses. The hero can be mechanically detected and recorded; as with the Telepathic form, anyone within, range o f the effect ignores the hero. Robots and cybernetic beings can also detect him. This Power provides no protection against light-based attacks, but does provide protection against psionic attacks (2CS for the attacker). Holographic: The hero is actually visible but has surrounded himself with a holographic image of empty space. The holograph can incorporate a wide area and affects anyone within line of sight (if someone can see across interstellar space, the holograph fools you). The holograph can be mechanically detected and recorded as if it were real. It will not prevent detection by other senses. Robots and cybernetic life accept the holograph as real. It provides protection against light-based attacks equal to his Power rank -2CS. (Example: the Incredible rank provides Excellent Resistance.) The duration of any form of Invisibility is a function of the Power rank. This Power can be reduced in effectiveness or even terminated by certain acts, performed either by the hero or someone under the Power's effect. Simple physical contact can alert others to the hero's presence (Physics, Hallucinatory, Holographic). Physical attacks by the hero terminate the Invisibility (Telepathic) or reduce its protection by -1CS for each attack the hero makes (all other forms). A Invisible hero may find himself surrounded by a coating material (rain, dust, and paint for example). This only effects the Physics-based Invisibility. At Feeble, Poor, and Typical ranks the hero is visible for the duration of the coating. At Good or higher ranks, such coatings remain visible for the number of turns equal to eight minus the number of Power rank levels. (Example: Invisible Woman is struck by a balloon filled with paint. Her Power is Excellent and renders the paint invisible in three turns.) There is a base 2% chance that the Invisibility is permanent (4% if the hero is alien). Such a state can only be negated by nullifying the Power itself, permanently. Previously controllable Invisibility can be made permanent through brain damage or Powers that affect the hero's control.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
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
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S23",
    "name": "Physical Gestalt",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S23",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can render his body intangible to normal matter. This enables him to pass harmlessly through any object. The hero’s power rank must exceed the barrier’s material strength in order for Phasing to occur.",
    "rulesText": "Two or more relatively normal people actually merge their bodies to form a single, powerful being- the hero. When a player rolls this Power, he has to create three different characters. resemble a blending of features from each of the merged characters, or have a completely different appearance. In any case, the Gestalt hero will have a normal appearance. No two-headed, split-torsoed freak results, unless this Power is distorted in some way. Interference by such Powers as Magic or Power Control may result in the Gestalt hero forming as a freak. The hero can still revert to his normal selves, though, no matter how weird he gets (the Judge may want to require an Unearthly FEAT, though, at his discretion). Both or all normal selves are required to form Power cannot function. Damage to a normal self is carried over to the Gestalt self; for example, if one person has a whomping head cold, so will the Gestalt. However, the Gestalt hero's superior recuperative faculties can quickly repair any such illness. The normal and Gestalt selves never co-exist except under extraordinary circumstances (see S2/Alter Ego). The Gestalt mind may be a schizoid combination of each of the normal minds, or be a completely independent mind. In the latter case, the Gestalt may have full, partial, or no knowledge of his component selves. Likewise, the normal selves may not have any idea of what their Gestalt self is up to' Variables include whether the merger is voluntary or automatic, the duration, and the maximum difference between normal selves when attempting to merge. Normal distance is contact, but at high levels merges can occur across some distance; in these cases, the normals teleport to a common location (or perhaps one teleports to the other's location). Duration is determined by the Psyche of the Gestalt. Time varies from one minute to indefinite, with a median of 1048 hours.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self / Same area",
    "duration": "Maintained"
  },
  {
    "code": "S24",
    "name": "Plant Mimicry",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S24",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a form of Power duplication. The hero can duplicate the natural abilities of any plant. The body does not significantly change, aside from the instantaneous appearance of chlorophyll in the hero's skin whenever he uses this Power.",
    "rulesText": "The hero can duplicate the natural abilities of any plant. The body does not significantly change, aside from the instantaneous appearance of chlorophyll in the hero's skin whenever he uses this Power. Some plant \"powers\" include:\n\n• Photosynthesis: The hero can survive without eating by converting sunlight to food. • Fragrance: The hero can summon and control insects. • Rooting: The hero can become immovable. • Poison Touch: The hero can have adverse effects on anyone touching him, from rashes to death. he is attempting. Players should also study up on their botany, since the more plants they know about, the more powers they can have. by a Power rank FEAT; normal plants require green FEATs, alien plants require yellow FEATs, and magical plants require red FEATs. Duration ranges from one minute to indefinite.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S26",
    "name": "Prehensile Hair",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S26",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a Power that few masculine heroes would admit to having, even if they possessed it. The Power gives the hero's hair the capability of independent, controlled movement, as if each strand were a tiny tentacle, It is also a Power that apparently only women possess. The basis for this may be cultural rather than genetic (in the entire history of comic books, only three people had this Power—all women).",
    "rulesText": "This is a Power that few masculine heroes would admit to having, even if they possessed it. The Power gives the hero's hair the capability of independent, controlled movement, as if each strand were a tiny tentacle, It is also a Power that apparently only women possess. The basis for this may be cultural rather than genetic (in the entire history of comic books, only three people had this Power-all women). Using her Prehensile Hair, the heroine can perform a variety of tasks with the hairs combining to form one or more appendages. She can handle objects, pick locks, ensnare a target, and even deliver a powerful blow with a silken fist. In a blunt combat the hair functions as one or more attacks. The maximum number of simultaneous actions and the Strength and Agility with which they can be accomplished are functions of the Power rank.\n\n| Rank | Strength/Agility Adjustment | # of Actions |\n| :--- | :--- | :--- |\n| Feeble | -2CS | 1 |\n| Poor | -1CS | 1 |\n| Typical | None | 1 |\n| Good | None | 2 |\n| Excellent | +1CS | 2 |\n| Remarkable | +1CS | 3 |\n| Incredible | +2CS | 3 |\n| Amazing | +2CS | 4 |\n| Monstrous | +3CS | 4 |\n| Unearthly | +3CS | 5 |\n| Shift X | +4CS | 6 |\n| Shift Y | +4CS | 7 |\n| Shift Z | +5CS | 8 |\n| Class 1000 | +5CS | 10 |\n| Class 3000 | +6CS | 15 |\n| Class 5000 | +7CS | 20 |\n\ntouch identical to that of the heroine's hands. Damage to the hair is felt. If you yanked out a lock of Medusa's hair, she'd feel the same pain you'd feel if she broke your finger (and you'd deserve it). Loss of more than half the hair causes pain and damage equal to that caused by a limb lost by the same means; the heroine loses one-third of her Health (rounded down). The motivating Power for the hair is Telekinetic rather than muscular. The individual strands are identical to normal healthy hair. The coloration is often a brilliant red or golden blonde, but can be any color the player desires. The hair's length exceeds the normal limits; strands can reach a maximum length of 20 feet plus 5 more for each rank above Amazing. somehow, she retains her hair but can no longer feel or control it. The hair immediately cascades to the floor (and beyond) and reduces her Agility and movement rate (excluding Flight) by -4CS. active use it contracts and does not extend past the heroine's knees.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self (1 area)",
    "duration": "Maintained"
  },
  {
    "code": "S27",
    "name": "Self-Duplication",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S27",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can spontaneously generate exact copies of himself. The new bodies are usually semi-independent; each possessing an independent mind but all are linked telepathically so all Duplicates are aware of each other's actions. Each Duplicate possesses the same Powers as the original, except for possible lacking this Power (that is, no Duplicate could generate more Duplicates).",
    "rulesText": "hero can spontaneously generate exact copies of himself. The new bodies are usually semiindependent; each possessing an independent mind but all are linked telepathically so all Duplicates are aware of each other's actions. Each Duplicate possesses the same Powers as the original, except for possible lacking this Power (that is, no Duplicate could generate more Duplicates). If a Duplicate is killed, the hero identical to those of the original hero. doesn't lose any Health, though he might lose Karma if the hero deliberately sent his Duplicate into a certain-death situation * If the original body is killed, the Duplicates will last until the duration of the Power is upthen disintegrate. If the hero's Duplicates possess an indefinite existence and the Power of Duplication, it matters not if the original body is destroyed. Thus, this Power offers a form of Immortality. Unfortunately, each Duplicate is the same physical age as the original, so this form of immortality doesn't turn back the clock at all.\n\nOptional Powers: The hero can develop the Power to function in a different manner, producing beings distinctly different from the original. Such semi-duplicates might possess altered minds, bodies, or Powers. For example, Shifter has the ability to generate independent beings who each possess a single, unique Power. Each time he uses his Power, he creates a new, albeit temporary, hero. At this rank, he has no real control over what Powers come out, but with extensive practice, someday he'll be able to custom-create his sub-heroes. gains a Power randomly generated at the time of his creation. Shifter has the potential to use any Power in this book. If he wants to try to make a conscious selection, his player must make a red FEAT roll. If he blows it, the Judge rolls a Power for him. If the FEAT was yellow, the Judge rolls a Power in the same class of Powers as the player originally wanted; less than that, and the Judge can roll under any, class he likes.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S28",
    "name": "Self-Vegetation",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S28",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can alter both his shape and physiology to become any desired plantform. The degree of change can vary wildly. At the least, the hero's body changes into a similarly-shaped \"plantman;\" at higher ranks the hero may assume normal or alien plant shapes.",
    "rulesText": "The hero can alter both his shape and physiology to become any desired plantform. The degree of change can vary wildly. At the least, the hero's body changes into a similarly-shaped \"plantman;\" at higher ranks the hero may assume normal or alien plant shapes. When in plant-form, the hero is immune to attacks that specifically affect animal life (nerve gas, pheromones, etc.) but is vulnerable to attacks that affect plant life (herbicides, light-blocking, etc.). When in plant form, the hero doesn't need to eat normal food; rather he uses photosynthesis to gain desired energy. This requires the availability of water, air, and sunlight. The planthero has different statistics for the physical Abilities; the mental Abilities remain unchanged.\n\nSometimes this Power functions in a",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S29",
    "name": "Shapeshifting",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S29",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can drastically alter all of his physical parameters (dimensions, appearance, physiology) to achieve any desired shape. Despite appearances, the hero retains his basic chemical composition unless other Powers are used simultaneously, such as S8/Body Transformation-Self. Example: Hobgoblin of the Shi'ar Imperial Guard transforms himself into a stone wall.",
    "rulesText": "The hero can drastically alter all of his physical parameters (dimensions, appearance, physiology) to achieve any desired shape. Despite appearances, the hero retains his basic chemical composition unless other Powers are used simultaneously, such as S8/Body Transformation-Self. Example: Hobgoblin of the Shi'ar Imperial Guard transforms himself into a stone wall. Despite its granite-like facade, it's composed of flesh; instead of chips flying when the wall is attacked, it bleeds.\n\nbonafide divine being.\n\nDuration is determined by the Gestalt hero's Psyche. Rank determines the cohesiveness of the Gestalt, especially its resistance to external attempts to dissolve the merger.\n\nThe hero can attempt to change into any form; success is determined by a FEAT. When creating the hero, the player can raise the Power rank by limiting the variety of possible forms into which the hero can change. Some categories include inanimates, machines, specific alien or animal races, superbeings only, and so on. Normal duration is determined by Power rank. If the hero attempts a shape that exceeds his normal size limits (i.e. not more that 150% nor less than 50% of his original size), this affects the duration, dropping it the equivalent of -3CS. This way a hero can attempt to impersonate a fly or a dinosaur; he just can't do it for long.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "optionsDefinition": {
      "powerCode": "S29",
      "powerName": "Shapeshifting",
      "id": "shapeshifting_spec",
      "label": "Shapeshifting Scope",
      "canRoll": true,
      "rollTable": [
        [
          1,
          50,
          "universal"
        ],
        [
          51,
          100,
          "limited"
        ]
      ],
      "choices": [
        {
          "key": "universal",
          "label": "Universal Shapeshifting",
          "description": "Can change into any shape at standard power rank.",
          "isSuperior": false,
          "rankShift": 0
        },
        {
          "key": "limited",
          "label": "Limited Form Variety (+1CS Rank)",
          "description": "Limits variety of forms (e.g. Animals Only, Inanimate Objects Only, Humanoids Only) for +1CS rank.",
          "isSuperior": true,
          "rankShift": 1,
          "subChoiceList": [
            "Animals Only",
            "Inanimate Objects Only",
            "Humanoids Only"
          ]
        }
      ]
    }
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
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "S31",
    "name": "Spirit Gestalt",
    "category": "Self-Alteration",
    "source": "UPB Table p. 16-19 & Entry S31",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can transform into a heroic Alter Ego by joining his mind and body with one or more disembodied beings (spirits, semi-divine beings, and that ilk. The joining of these disparate beings generates the Power possessed by the Gestalt hero. The merging spirit can be of any nature, determined by the player at the time of the hero's creation.",
    "rulesText": "The hero can transform into a heroic Alter Ego by joining his mind and body with one or more disembodied beings (spirits, semi-divine beings, and that ilk. The joining of these disparate beings generates the Power possessed by the Gestalt hero. The merging spirit can be of any nature, determined by the player at the time of the hero's creation. Possibilities include: Ancestral Gestalt: The merging beings are the hero's own ancestors. Spiritual Gestalt: The spirits are any Free Spirits. Demonic Gestalt: The merging being is a nasty supernatural type. Divine Gestalt: The merging spirit a",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self / Same area",
    "duration": "Maintained"
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
    ],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "T1",
    "name": "Astral Body",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T1",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can send his astral form off to any destination. The physical body doesn't go anywhere; it remains in a comatose state until the astral body returns. The astral body is intangible and invisible to normal senses.",
    "rulesText": "The hero can send his astral form off to any destination. The physical body doesn't go anywhere; it remains in a comatose state until the astral body returns. The astral body is intangible and invisible to normal senses. In the Earth dimension it can use any of the hero's mental or Psionic Powers but not the physical ones. In other dimensions the astral body regains visibility, solidity, and the physical Powers. A mag ical silver cord connects the astral and physical bodies. While it can stretch a great distance, it is not infinite. The maximum distance the astral body can travel form the physical body is shown on the Space/Extradimensional Travel column of the Range Table. The astral body travels at up to Power rank speed. This allows the hero to arrive instantaneously at a destination. The astral hero can cross into other dimensions by means of a\n\nPsyche FEAT. The silver cord links both bodies in several ways. It enables the astral to monitor the condition and location of the physical. Beings in the physical world can use that body's connection to locate the astral body. The silver cord is the key to the astral returning to its own body. If the cord is broken, return is extremely difficult, if not impossible. Once the cord is broken, the physical body begins to die. Health drops one point per hour. Fortunately, breaking the silver cord requires a CL1000 Intensity FEAT. If an attempt is made to damage the cord at any point, the astral body is immediately aware of the attempt and the location of the threatened length. If the physical body is killed, the cord is snapped automatically. The hero is now trapped in astral form as a Free Spirit. The astral body resembles the hero's self image. As such, it might not resemble the real body. All clothing and appurtenances the astral form carries are unreal simulations of the real items; they still have equivalent effects though. Astral bodies can be detected by Psionics, Magic, Extradimensional Detection, and by this Power. They can be attacked from the physical world by mental and Psionic Powers, Exorcism, Summoning, Spirit Storage, and Force Field vs. Magic. Optional Powers include any of the Magic Powers and Extradimensional Detection. The Nemesis is Summoning.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Astral / Universal",
    "duration": "Maintained"
  },
  {
    "code": "T2",
    "name": "Carrier Wave",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T2",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can manipulate energy currents to support and propel his body, thus attaining a form of Flight. The energy can be any type found in the hero's environment, such as magnetism, sound, light, heat, and electricity. The hero can use only one form; the player has to decide which one when he creates the hero.",
    "rulesText": "The hero can manipulate energy currents to support and propel his body, thus attaining a form of Flight. The energy can be any type found in the hero's environment, such as magnetism, sound, light, heat, and electricity. The hero can use only one form; the player has to decide which one when he creates the hero. The Carrier Wave can support the hero and an additional load equal to its Power rank in terms of Strength. For example, Magneto's Remarkable rank enables him to tow up to a ton of material. The carrier wave is temporarily solid and visible. Flight occurs at Power rank speed. The maximum speed is that of normal energy of the type composing the wave. For example, a sonic carrier wave is limited to Shift-X speed. It is limited to areas where that energy exists. As the limits of that energy's domain are reached, it becomes weaker and finally fizzles out. The hero continues to move in a ballistic arc before he finally crashes. Carrier waves can be affected by the appropriate Energy Emission and Control Powers. Emission can change the speed or direction of the hero's travel. The Intensity of an opposing Energy Power decreases this Power's rank. A supporting Energy Power adds its Intensity to the Power rank. Example: Lodestone possesses Incredible Magnetic Manipulation. He tries to stop Magneto from flying away. Lodestone's Incredible rank decreases Magneto's Remarkable rank to - 10. Magneto comes to an inaudibly screeching halt and begins to fly in reverse at Good speed. The Optional Power is Energy Detection and an Energy Control Power of the same type as the Carrier Wave. The Nemesis is the appropriate Energy Control.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "speed": "Flight"
  },
  {
    "code": "T3",
    "name": "Dimension Travel",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T3",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can travel into a number of other Dimensions. Transit to a random dimension normally occurs automatically but the Power is weakened by adrenaline. If the hero is in any kind of precarious situation, he must make a Power rank FEAT.",
    "rulesText": "The hero can travel into a number of other Dimensions. Transit to a random dimension normally occurs automatically but the Power is weakened by adrenaline. If the hero is in any kind of precarious situation, he must make a Power rank FEAT. He must also make a FEAT if he is trying to appear in a specific dimension or alternate timeline. Specific locations in the other dimension require a red FEAT. The return trip is easier. Returning to a random location on the homeworld is automatic. Returning to a familiar spot on the homeworld is a yellow FEAT. The hero initially has two dimensions he can travel to, his home and one other realm. Additional dimensions can be reached by developing the trips as Power stunts or by dropping the affinity that permits effortless travel to either of the two original dimensions. (\"What do you mean, you don't remember how to get back to Earth?\")",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self / Touch",
    "targets": "Self or 1 target"
  },
  {
    "code": "T4",
    "name": "Energy Path",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T4",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a combination of Energy Body and Carrier Wave. The hero is transformed into energy and is propelled at Power rank speed along currents of that energy. The maximum speed is that normal Energy.",
    "rulesText": "This is a combination of Energy Body and Carrier Wave. The hero is transformed into energy and is propelled at Power rank speed along currents of that energy. The maximum speed is that normal Energy. The hero is limited to places where the energy currents flow. The player must choose what form of energy the hero turns into. Upon reaching the destination or the limit of the energy current, the hero safely rematerializes. Travel can be affected by anything that disrupts the current, such as a break in an electric line or the use of Energy Emission or Control Powers. When a disruption occurs, the hero must make a Power FEAT to detour around the obstacle and continue on. Failure means the hero rematerializes on the spot and can not reenter the energy path for an hour. The hero must be within 10 feet of the current in order to join it. Insulation of an Intensity exceeding his Power rank prevents the hero from joining the current. The hero can transform and tow along an additional mass. Treat the Power rank in terms of Strength to determine how much additional material can be transported by this Power. For example, a Typical rank can transport an additional 100-200 pounds. While in an energized state, the hero is extremely vulnerable to the energy altering Powers. These are Absorption Power, Energy Solidification, Energy Sponge, and Energy Vampirism. Any of these have the potential to trap or even destroy the hero. Fortunately the hero is moving at the speed normal for his energy type is thus a rather difficult target. Optional Powers include Energy Detection and either Energy Emission or Control for the appropriate type of energy. The Nemesis is Energy Control.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Rank",
    "duration": "Maintained",
    "speed": "Flight"
  },
  {
    "code": "T5",
    "name": "Floating Disc",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T5",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can create a glowing platform of solid light. The disc materializes to support any part of the hero's body; generally this is under the feet or posterior. The disc is a part of the hero's Power and has no independent existence beyond him.",
    "rulesText": "The hero can create a glowing platform of solid light. The disc materializes to support any part of the hero's body; generally this is under the feet or posterior. The disc is a part of the hero's Power and has no independent existence beyond him. The disc can automatically support the hero and additional mass. The weight is supported by a Power FEAT with the Power substituting for Strength. For example, creating a Floating Disc to lift five tons is an Incredible Intensity FEAT. The disc's surface area expands to support wide loads. 'Travel occurs at Power rank speed. The Power provides no innate protection against high windspeed and friction burns, thus the practical speed limit for atmospheric Flight is Remarkable (225 mph). The Power can be used in the water with proportionally decreased speed. If the hero is a technological type or possesses such Powers as HyperIntelligence, Hyper-inventiveness, Weapons Tinkering, or Mechanical Creation, then the Floating Discs can be mechanical in nature. Such disks collapse for easy storage somewhere on the hero's costume, such as a false bottom in the boots. An example of this is the Wizard's anti-grav disks. The Optional Power is Kinetic Bolt; the energy resembles the Floating Disc. Nemesis is Energy Vampirism.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Same area",
    "duration": "Maintained",
    "speed": "Flight"
  },
  {
    "code": "T6",
    "name": "Gateway",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T6",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can travel to any point in space, time, or other dimensions by traveling along bridges she creates herself. She can travel along a bridge from her current location to a location in space (a green FEAT), time (a yellow FEAT), and other dimensions (a red FEAT). The destination of each Gateway is a fixed point in space but the departure end always moves with the hero.",
    "rulesText": "The hero can travel to any point in space, time, or other dimensions by traveling along bridges she creates herself. She can travel along a bridge from her current location to a location in space (a green FEAT), time (a yellow FEAT), and other dimensions (a red FEAT). The destination of each Gateway is a fixed point in space but the departure end always moves with the hero. A bridge to another location in space is created by a FEAT. A green FEAT creates a spatial bridge. The maximum distance the target can be from the hero at the time the bridge is created is shown on column E of the Range Table. A Gateway through time is created by a yellow FEAT. The maximum distance into the past or future the Power can initially reach is the number of centuries equal to the Power rank number. Gateways into other dimensions or alternate timelines require a red FEAT. The transdimensional bridges are initially limited to reaching only one dimension. Additional dimensions require development as Power Stunts. Once created, the bridge functions no matter how far the hero is in space, time, or the Multiverse. The hero has a finite number of locations she can bridge to. Once the hero has establis hed the bridge, she always returns to it when creating that type of Gateway. The maximum number of dif ferent Gateways the hero can create is equal to the Power rank number. Shortly after gaining this Power, the hero should create at least half of her possible Gateways. More can be added at any time. If the hero exceeds her limit, a previously established bridge is replaced by the hero is trying to add. Example: Gatekeeper has Good rank. She can establish up to ten bridges. She establishes Gateways to her home, her team's headquarters at the Avengers Minnesota mansion, her ex-boyfriend's timesharing condo in Jamaica, the bottom of the Atlantic, geosynchronous orbit 22,400 miles above Minnesota, the crater of an active volcano in Iceland, the prisoner processing area of Ryker's Island Federal Prison, Tahiti in the year 1287, the surface of Lake Michigan (twenty miles east of Milwaukee), and Death Valley. The need arises for a bridge to an alternate Earth. Gatekeeper concentrates on establishing the link; making the red FEAT takes her most of the day. Later she realizes that she can't hop over to Jamaica any more. Oh well, she'd hadn't been there with Wilford since he'd gotten married. Gateways automatically transport willing passengers. The Power can be used to catch and transport rampaging water buffaloes) by means of an Agility FEAT. The would-be transportee is allowed to resist in any way he can. Gateways deal with size and not mass. The hero can transport a black hole as long as it's small enough. The maximum size of a Gateway is the number of square feet equal to the Power rank number. For example, a Feeble rank creates a two square foot Gateway that most people could just barely squeeze through. The Gateway forms within ten feet of the hero. It can maintain its existence for as long as the hero concentrates on it or until he passes through it.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 portal"
  },
  {
    "code": "T7",
    "name": "Gliding",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T7",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can travel on air currents. She can travel at Power rank speed, with a top limit of Shift-X rank (Mach One). In normal air currents, the hero drops one story (15 feet) for each turn she is in the air.",
    "rulesText": "The hero can travel on air currents. She can travel at Power rank speed, with a top limit of Shift-X rank (Mach One). In normal air currents, the hero drops one story (15 feet) for each turn she is in the air. Level flight can be maintained by an Agility FEAT; failure indicates a loss of 2 stories. The glider can climb by using updrafts. Using an updraft to climb 'requires a yellow Agility FEAT for each three stories the hero ascends; failure means she's caught in a downdraft and descends the three stories instead. She can carry aloft an additional mass; the limit is decided by her physical Strength. Gliding can be affected by high winds or the Powers of Weather Control and Air Animation. The wind's Intensity or the Power rank diminishes or increases the Gliding rank, depending on the direction the hero is gliding. For example, a Poor airspeed of 60 mph would be stopped by an equally fast headwind, but if the hero wants to travel in the other direction, she can be boosted to a Good airspeed of 120 mph. Optional Powers include Weather Control and Air These are also the Nemeses.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "speed": "Flight"
  },
  {
    "code": "T8",
    "name": "Hyper-Digging",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T8",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can travel swiftly through the earth by burrowing a tunnel at Power rank speed (land movement rate). The Power can be used indefinitely as Hyper-digging has the side-effect of increasing the hero's Strength and Endurance. Both abilities' ranks are raised by this Power's rank number.",
    "rulesText": "The hero can travel swiftly through the earth by burrowing a tunnel at Power rank speed (land movement rate). The Power can be used indefinitely as Hyper-digging has the side-effect of increasing the hero's Strength and Endurance. Both abilities' ranks are raised by this Power's rank number. Burrowing remains the hero's preferred mode of transportation, when compared to running or especially to inconceivable activities like flying. Normally the tunnel the hero makes collapses within 10 turns of the hero's passage at a specific spot. The exception is the tunnel within 10 feet of the hero's current location. This allows the hero to occasionally stop. A tunnel never collapses on the hero, unless a higher Intensity force is applied. Examples include explosives, Vibration, and Matter Animation. If the hero wants to build a relatively permanent tunnel, his movement rate is cut in half as he takes the time to make reinforced walls. The hero may burrow through materials with lower Material Strength than his Power rank. Materials with equal or greater Material Strength are obstacles to be detoured around. If the hero also possesses Hyper-Strength, Armor Skin, Body Resistance, or True Invulnerability, he can add such Powers' rank numbers to this Power's rank number. This might permit the hero to burrow through harder materials, like granite intrusions or bank vaults, at half speed. When creating the hero, the player must choose a Bonus Power of either Natural Weaponry/Claws or Body Resistance. The rank of either is at least equal to this Power's rank. Optional Powers include Hyperstrength, Hyper-endurance, Armor Skin, or Body Resistance. The Nemesis is Matter Animation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "speed": "Land"
  },
  {
    "code": "T9",
    "name": "Hyper-Leaping",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T9",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can jump great distances. By repeated leaps, the hero can rapidly cover large distances. This Power's minimum rank is +1CS greater than the hero's Strength rank.",
    "rulesText": "The hero can jump great distances. By repeated leaps, the hero can rapidly cover large distances. This Power's minimum rank is +1CS greater than the hero's Strength rank. If a lower rank is initially rolled, it must be raised to this level. The Power rank determines the distances the hero can safely leap. Innate safeguards in this Power enable the hero to safely land. (Otherwise he might break a leg attempting even a Good leap.) The effect is the same on the hero as if he were a Normal Human making a 2 foot leap up or across or descending feet. The effects on the area the hero lands on might not be the same as if a normal jump occurred. Consider that the Hulk splinters the pavement when he lands. To determine what sort of effects occur when the hero lands, the Judge should figure what kind of damage results when a weight five times that of the hero suddenly drops on the surface in question. The actual landspeed varies with the angle of the leaps. The average landspeed for Hyper-leaping is a 3CS Land Movement rate. For example, an Excellent Leaper can travel 30 mph in a series of rapid 30foot leaps. If the hero also possesses Hyper-speed, that can be added to this Power's rank number for additional speed by increasing the frequency but not the size of the leaps.\n\nPhysical burdens do not decrease the hero's speed, although they might decrease his control. Anything the hero is carrying is also protected by the innate safeguards against damage; the hero acts as a shockabsorber. While the hero has a vague idea of where he is going, he can't see his touchdown point. This can be a real hazard when the hero can make Monstrous leaps or better. For example, while leaping cross country, the Hulk landed on seven cars (two were moving at the time), one semi truck, eight roofs, a swimming pool, ten mud patches, one river, twelve power lines, three street lamps, 57 trees and bushes of various sizes, and a late Merino ram named Herbert. Judges can assume that the\n\n| Rank | Up/Across | Down |\n| :--- | :--- | :--- |\n| Feeble | 4' | 6' |\n| Poor | 6' | 9' |\n| Typical | 10' | 15' |\n| Good | 20' | 30' |\n| Excellent | 30' | 45' |\n| Remarkable | 40' | 60' |\n| Incredible | 50' | 75' |\n| Amazing | 75' | 105' |\n| Monstrous | 100' | 150' |\n| Unearthly | 1 area | 1.5 areas |\n| Shift X | 1.5 areas | 2.5 areas |\n| Shift Y | 4 areas | 6 areas |\n| Shift Z | 8 areas | 12 areas |\n| Class 1000 | 0.5 mile | 0.75 mile |\n| Class 3000 | 1 mile | 1.5 miles |\n| Class 5000 | 2 miles | 3 miles |",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Instant (1 turn)"
  },
  {
    "code": "T10",
    "name": "Hyper-Running",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T10",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can run at Power rank speed for extended amounts of time. The Power has the side-effect of raising the Ability rank number of Endurance by this Power's rank number. It includes protection to wind resistance and windburn; this protection extends to anything the hero is carrying.",
    "rulesText": "The hero can run at Power rank speed for extended amounts of time. The Power has the side-effect of raising the Ability rank number of Endurance by this Power's rank number. It includes protection to wind resistance and windburn; this protection extends to anything the hero is carrying. The hero's lungs are modified to breath high velocity air. The last benefit can be crucial if the hero is capable of Remarkable speeds or better. If the hero stumbles, he continues on a ballistic trajectory until he regains his footing or rolls to a halt. To cut down on the chance of this, the Power increase the hero's reaction time to be able cope with impending problems. The increased reaction time decreases the relative speed of any other moving object. The hero's Power rank number decreases the perceived speed of the other object. For example, Quicksilver's Shift X speed lets him perceive a bullet traveling at 600 mph as if it were traveling only 15 mph. This sideeffect enables the hero to dodge or even catch things like bullets and missiles. If the Power is- Duplicated or Transferred to another being, a special yellow FEAT must be made. Failure means the recipient only has the actual running ability and not the safeguards. Optional Powers include increasing the hero's Fighting or Agility ranks by this Power's rank number.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "speed": "Land"
  },
  {
    "code": "T11",
    "name": "Hyper-Swimming",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T11",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can cover large distances by swimming at Power rank speed. Speed is decreased - 1CS for each 100 feet of depth at which the hero us swimming. This is due to increased water pressure.",
    "rulesText": "The hero can cover large distances by swimming at Power rank speed. Speed is decreased -1CS for each 100 feet of depth at which the hero us swimming. This is due to increased water pressure. Water Freedom can negate this limitation. The Power does not free the hero from the need to breathe. The hero can tow other objects in his wake at a decreased speed of -1CS. This assumes the towed object has a buoyancy equal to the hero's body. If the object has a greater or lesser buoyancy, the hero's Strength determines the limit to what things can be towed. For example, Marlin has Typical Hyper-Swimming and Strength. He is trying to tow a sinking boat back to the harbor. While the boat is still floating, Marlin can swim at Poor speed (30 mph). Once the boat actually sinks, Marlin feels its full weight of 1000 pounds. Marlin is dragged to a halt, then the boat begins to pull him under. Bonus Powers include a choice of Waterbreathing or Water Freedom. The remaining one is available as a Optional Power. The Nemesis Animation/Water. is Matter",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "speed": "Water"
  },
  {
    "code": "T12",
    "name": "Levitation",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T12",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can freely resist the pull of gravity. She can move vertically at Power rank speed, hover in place, or drift with the wind. Limited horizontal movement is possible by pushing off from other objects.",
    "rulesText": "The hero can freely resist the pull of gravity. She can move vertically at Power rank speed, hover in place, or drift with the wind.\n\nLimited horizontal movement is possible by pushing off from other objects. The maximum distances are determined the same way a normal leap is. If the hero possesses Hyper-Leaping, that can be used to greatly increase the distances the hero can propel herself. A hero with this Power can never fall unless she is unconscious or purposely decides to succumb to gravity. The hero can develop a Power Stunt that allows the hero Levitate in her sleep. The Power can always lift the hero's own weight. The hero can carry aloft additional mass. The amount is limited by her St rength rank. If the hero possesses Telekinesis, this can be used to increase her load-bearing capacity. Levitation provided Power rank Resistance to high winds and fluctuations in gravity, whether these are natural or Power-related. Examples of Powers that might affect the Levitator include Matter Animation/Air, Weather Control, and Gravity Manipulation. The Optional Powers is Telekinesis. The Nemesis is Matter Animation/Air.\n\nThe Nemesis is Gravity Manipulation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained"
  },
  {
    "code": "T13",
    "name": "Rocket",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T13",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero flies by means of a rocket-like exhaust that propels him at Power rank speed. The rocket blast is created by a thermo-chemical reaction generated by the hero's body. The Power converts whatever material is around him into fuel and oxidant, then it shapes the exhaust into a stream to propel him.",
    "rulesText": "The hero flies by means of a rocketlike exhaust that propels him at Power rank speed. The rocket blast is created by a thermo-chemical reaction generated by the hero's body. The Power converts whatever material is around him into fuel and oxidant, then it shapes the exhaust into a stream to propel him. If the hero is in a vacuum, the Power creates fuel out of virtual nothingness. The Power is treated like Strength to determine the maximum thrust the Power can achieve. If the thrust is high enough, the hero can carry or push additional loads. For example, Cannonball's Remarkable thrust can lift up to one ton. The Nemesis is Matter Conversion.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "speed": "Flight"
  },
  {
    "code": "T14",
    "name": "Skywalk",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T14",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "This is a peculiar form of flying. The hero can walk along an invisible path that he creates in the air. The path only serves the hero and only exists as long as he concentrates on maintaining its existence.",
    "rulesText": "This is a peculiar form of flying. The hero can walk along an invisible path that he creates in the air. The path only serves the hero and only exists as long as he concentrates on maintaining its existence. The path is intangible to others unless the hero can extend its benefits to them by such means as a Power Stunt, Power Transferral, or Telekinesis. The Skywalker can develop a Power Stunt that maintains the path even while he is unconscious. Another Power Stunt increases the path's tangibility to a circular area 10 feet around the hero; this enables others to travel alongside him. Note that the walkway only offers protection against failing.\n\nThe hero can carry additional weight. The amount is based on the hero's own weight and strength. Each additional mass equal to his body's weight decrease the Power's effectiveness -1CS.\n\nThe path slides -forward at its own speed. This enables the hero to travel at up to Power rank speed. When the hero rests, speed is reduced to zero. The path can be formed at any height but cannot climb on its own. Height is changed by the path forming a ramp that the hero climbs or descends. Note: the average incline is 30 degrees; sharper angles are harder to climb.\n\nThe hero can move through dense vines, tangled vines, or similar areas by using this Power instead of Agility.\n\nThe Power offers Power rank resistance to high winds and sudden fluctuations in gravity, whether natural or Power-based. The Optional Power is Telekinesis.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "speed": "Land"
  },
  {
    "code": "T15",
    "name": "Spiderclimb",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T15",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can travel along vertical or inverted surfaces with only minor difficulty. The maximum speed, assuming the hero is using all his limbs to Spiderclimb, is the same as the hero's normal ground movement rate. Each pair of limbs not used to climb decreases the overall speed -2CS.",
    "rulesText": "The hero can travel along vertical or inverted surfaces with only minor difficulty. The maximum speed, assuming the hero is using all his limbs to Spiderclimb, is the same as the hero's normal ground movement rate. Each pair of limbs not used to climb decreases the overall speed 2CS. For example, Spiderman can walk up a wall using only his feet if he is holding something in both arms, but it takes longer because of his decreased grip on the wall. The Power rank determines how strong the hero's adhesion is to a given surface. The climber must relative slipperiness of a surface.\n\nStrength and Amazing Spiderclimbing. He weighs 165 pounds. Each additional 165 pounds of mass Spiderman carries decreases his Power rank -1CS. Attempting to climb while carrying the Thing (weight 500 pounds) decreases his rank to Excellent (if the Thing is hanging from a web) or Good (if Spiderman is actually carrying him). The Nemesis is Gravity Manipulation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Permanent",
    "speed": "Land"
  },
  {
    "code": "T16",
    "name": "Teleport Self",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T16",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can vanish at one location and instantly reappear at a distant site. He does not physically. cross the intervening distance and is not affected by most physical barriers.",
    "rulesText": "The hero can vanish at one location and instantly reappear at a distant site. He does not physically. cross the intervening distance and is not affected by most physical barriers. Column E of the Range Table shows the maximum distance a hero can Teleport. Teleportation always occurs, but the hero must make a Power FEAT to see how well he makes the trip. Failure means he arrives disoriented and cannot take any actions the following turn.\n\nThe hero can carry along anything he is touching (except the ground on which he stands), up to his Strength's weight limit. Passengers must make a green Endurance FEAT or be disoriented for 1-10 turns. As the hero rematerializes, gases and liquids move aside before he solidifies. Normal safeguards prevent the hero from consciously Teleporting into a solid mass. If the hero accidentally teleports into a solid, he must make an Endurance FEAT. Success means the hero instinctively jumped to another location and promptly fainted for 1-10 turns. Failure means the hero takes damage equal to twice the solid's Material Strength or actual Strength, if the blockage was a living being. In the latter case, that being takes equal damage. Certain conditions can prevent the hero from Teleporting. If the hero doesn't know where he is, psychological blockage may prevent him from consciously Teleporting. Extremely dense materials like Neutronium or black holes are impassable. Barriers that incorporate such Powers as Power Negation, Force Field vs. either Energy or Magic, or True Invulnerability are also impassable at higher rank. The Optional Powers are Teleport Others and Clairvoyance.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Rank",
    "duration": "Instant"
  },
  {
    "code": "T17",
    "name": "Teleport Others",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T17",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "This is a peculiar form of Self Teleportation. The hero can disintegrate his body, transport his lifeforce any distance, and then create a new body out of materials available at the destination site. The Power shapes these into a form that resembles the hero's self-image but whose physical properties may be those of the materials that compose the new body.",
    "rulesText": "The hero can make any target except his own body vanish and instantly reappear at a distant site. The target does not physically cross the intervening distance and is unaffected by most physical barriers. Column E of the Range Table shows the maximum distance the hero can Teleport a passenger. Teleportation always occurs if the passenger is immobile or touching the hero. The passenger must make an yellow Endurance FEAT to see how he fared. Failure means disorientation for turns. If the passenger is uncooperative or in motion, the hero must make an Agility FEAT to catch him. In addition, each 10 feet of distance separating the hero and passenger increases the Power rank -1CS.\n\naboard the spaceship Jenni Lea has Excellent rank and can handle up to 800 pounds of material. A emergency required the evacuation of five people (average weight 200 lbs.) and their equipment. The Teleportation beam sorted out its load before taking effect. Only four of the crewmen were teleported in the first turn. The fifth crewman, the equipment, and the clothes the other four had previously been wearing arrived on the next goround. The hero can consciously try to Teleport sections of a target; the effect is as if the hero had used an extremely fine scalpel. Such Teleportational dissection requires a Power FEAT whose intensity is equal to the material strength of a nonliving target or the actual Strength of a living target. Heroes with Medical Talents can develop this type of exotic surgery as a Power Stunt. Certain conditions can prevent the passage of a Teleportation beam. Neutronium and black holes are impassable. Barriers that incorporate such Powers as Force Field vs. either Energy or Magic, Power Negation, or True Invulnerability are impenetrable if their Intensity ranks are greater than this Power's rank. The act of Teleportation takes three turns. The first turn the hero affects the target. The second turn the actual transportation occurs. The third turn the target rematerializes. Only on the fourth turn can the hero seek another target. Optional Powers include Teleport Self and Clairvoyance.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Touch / Rank",
    "targets": "1 target"
  },
  {
    "code": "T18",
    "name": "Telereformation",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T18",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can dissolve their physical body into microscopic particles or energy quanta, instantaneously reforming at a designated destination.",
    "rulesText": "The Power can teleport a mass equal to the hero's Strength limit. This may be a single object or any number, so long as the weight limit isn't exceeded. If the hero is trying to exceed his limit, he only Teleports part of the mass. Living targets are transported intact; if a being weighs too much it simply won't Teleport. Only the amount of non- living material that within the limit is Teleported; the rest is left behind.\n\nThis is a peculiar form of Self Teleportation. The hero can disintegrate his body, transport his lifeforce any distance, and then create a new body out of materials available at the destination site. The Power shapes these into a form that resembles the hero's self-image but whose physical properties may be those of the materials that compose the new body.\n\nExample: The Teleportation beam\n\nColumn E of the Range Table shows the maximum di stance the hero can travel. Upon attempting to form a new body, the hero must make a Power FEAT. A green FEAT shapes existing material into the hero's basic form. A yellow FEAT converts the material into those substances that composed the hero's original body or current self-image, he was transformed into his current physical form. A red FEAT enables the hero to create an altered version of his self-image. Examples of a red FEAT include additional forms or ones of different sizes. Obviously, most heroes with this Power cannot carry objects, passengers, or clothing. The hero shows up stark naked unless he makes a red FEAT and generates a costume. If the hero has the Power of Ionization (for nonliving matter) or Body Transformation-Others, then he can carry passengers or loads when using the Power. The load limits are determined by this other Power. Just like the hero, such targets are disintegrated and given new bodies at the destination. This assumes the passengers are cooperative. Uncooperative passengers cannot be transported in this manner. Period. When creating the hero, the player has two options. At a cost of -1CS to the Power rank, the hero can be given the ability to only temporarily disintegrate his original body. When he returns to his original site the body automatically rematerializes. Normally the new body is created out of the particular type of matter (animal, vegetable, mineral) that most resembles the original body. This limits the sites where the hero can reform. At a cost of -1CS the hero the hero can create new bodies out of whatever material is available, regardless of its nature. The Power can be diminished or destroyed by mental Powers that alter the hero's self-image. If the hero loses his self image, then the next use of the Power results in his bodily annihilation and conversion to a Free Spirit. Barriers that incorporate Force Field vs. Mental Attack are impassable if their Intensity rank is equal or greater than this Power's rank. Optional Powers include Clairvoyance, Free Spirit, and Serial Immortality/Creation. The Nemesis is Force Field vs. Mental Attack.",
    "errataNote": "",
    "powerStunts": [
      "Reforming inside sealed bunkers or vacuum enclosures"
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Universal",
    "duration": "Instant"
  },
  {
    "code": "T19",
    "name": "Time Travel",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T19",
    "defaultRank": "Typical",
    "countsAsTwo": true,
    "description": "The hero can travel in time to reach any point in the past or future. The maximum range the hero can reach is varies depending on which direction he's traveling. Travel into the past is easy because it already exists from the hero's point of view.",
    "rulesText": "The hero can travel in time to reach any point in the past or future. The maximum range the hero can reach is varies depending on which direction he's traveling. Travel into the past is easy because it already exists from the hero's point of view. The maximum range is equal to the Power rank number times 1000 years. Travel into the future is harder (at least, if you're planning a return trip). The maximum range into the future is equal to the Power rank number times years. The act of time traveling takes 1 -100 turns of the hero's perceived time. (No time actually passes but it sure feels like it.) The rate of perceived time passage varies with each mode of time travel but is consistent for all trips using that mode. For example, Dr. Doom's time platform makes virtually instantaneous trips while Kang's timeship travels at a rate of one year per turn. The theories behind Time travel vary on the flexibility of the past. Two theories stress the immutability of the timestream. The first theory states that all events are fixed; if you travel into the past, you are destined to perform those actions or some unknown force either prevents or negates your actions. (The Collector suddenly appears and stops Darkstar from assassinating a ten-year-old Abraham Lincoln.) The second theory states that the traveler actually travels to an alternate timeline that closely resembles the desired segment of the past. By changing this timeline, the hero cuts himself loose from his original timeline and is now linked to the one he has created. (Darkstar assassinates Lincoln. The U.S. breaks up during the Civil War and never becomes a world power. Darkstar emerges in a new present where the U.S.S.R.'s chief rival is\n\nAnglo-American Codominion. Meanwhile on Earth-Marvel, the Avengers intercept a secret Soviet communique that deals with Darkstar's disappearance while on a mission.) The third theory states that there is only one timestream but it can be completely changed at any point when a traveler from the future alters a part of the past. (Alison Blaire of Her Majesty's Special Guard brings her superior, Lord Warren, Earl of Worthington, an intercepted Soviet report dealing with the appearance and subsequent elimination of a superhuman who called herself Darkstar.) Villains and well-meaning but misguided types tend to believe the third theory. This is a false belief since the structure of the Marvel Universe actually follows the second theory. Remember, people, that e ach Judge's campaign is set in a different divergent timeline. Judges are fully entitled to mangle the plans of any characters who intend to alter the timestream. After all, the players are going to create a lot of paperwork for the Judge if they succeed. By means of a Power Stunt, the hero can actually travel into the Time Continuum. This is a chaotic maelstrom of whirling lights and images that flash too quickly for the conscious mind to comprehend. Once within the Continuum, the hero can travel to any point in any timestream. Accuracy is nearly impossible. A green FEAT only gets the hero to the right timeline. A yellow FEAT gets the right century. A red FEAT gets the hero within the 10 weeks of the desired date. Since all time travelers must pass through the Time Continuum, it serves as a place where such travelers can attack each other. A traveler who is slain or rendered unable to return to normal time is lost forever. The Power can transport a mass whose weight is equal to the hero's Strength. If the Power is incorporated into a device, it can transport an amount equal to 100 pounds times the Power rank number.\n\nTime travel can be hindered and even stopped by the Power of Reality Alteration. A higher-ranked Power of this type can simply undo anything the traveler attempts or may even bar him from ever entering the timestream. Optional Powers include Dimension Travel, Precognition, Postcognition, and Reality Alteration. The Nemesis is Reality Alteration.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Self / Touch",
    "targets": "Self or 1 target"
  },
  {
    "code": "T20",
    "name": "Troubleseeker",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T20",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "Heroes hate this Power but it does tend to get an adventure going quickly. The Power combines Teleportation with automatically functioning Mental and Detection Powers. The hero subconsciously detects a crisis somewhere within his range and automatically teleports to the vicinity.",
    "rulesText": "Heroes hate this Power but it does tend to get an adventure going quickly. The Power combines Teleportation with automatically functioning Mental and Detection Powers. The hero subconsciously detects a crisis somewhere within his range and automatically teleports to the vicinity. The maximum range for detection and Teleportation is shown on column E of the Range Table. The hero has no control over the Power. He usually arrives without any idea of what the problem is that drew him. His only warning is the dreaded feel of the Power beginning to function. (A brief tingle, a muttered \"Here I go again,\" and poof!) Nothing in the Marvel Universe can prevent the hero from teleporting into a crisis area. His unwanted appearance can only be prevented by nullifying the Power before it functions. This can be accomplished by negating either the detection, analyzing, or transportational aspects of the Power (more on this later). Once he is drawn to the scene, the hero can move freely about. He must remain within 10 areas of the initial attraction. If the hero goes beyond that limit, he is instantly teleported back to his starting place. Only when the crisis has been dealt with can the Troubleseeker leave the area. (Of course, the Power is also free to draw him to a new crisis elsewhere.) To compensate for the constant demands the Power places on the hero, it increase the hero's Endurance by this Power's rank number. At Amazing rank, the hero gains the additional Power of Self Teleportation. The 10-area limit remains in effect. The Power automatically transports anything the hero considers part of his self image. This can be extended to include clothing, equipment, and even companions. The additional weight is limited to the number of pounds equal to the Power rank number. Example: The Troubleseeker known only as The Medic possesses a CL3000 rank. This allows him to transport 1.5 tons of additional mass. This is represented by a hut full of equipment and at least two (sometimes unwilling) passengers. What attracts the Troubleseeker? The Detection aspects of the Power operate on an Empathic basis. The crisis that attracts it is one that generates extreme levels of turbulent emotions (fear, hate, pure evil, general anguish, and so on). An event that doesn't directly affect anyone will not attract the Troubleseeker. A screening mechanism prevents the hero from traveling to \"false alarms\" such as a distressed accountant who just lost his ledgers. If the hero possesses Dimension Travel, it is automatically incorporated into this Power to extend its range. The result is that the Troubleseeker can be drawn to crises on an infinity of alternate worlds. If the hero possesses Time Travel, the Power can usurp control of this as well. The hero travels to a random location in time and then teleports to a- crisis occurring within that time place. The Power does allow the hero to rest between missions. The Power will not function again until 1 -10 days after the successful conclusion of the previous mission. If the mission was unsuccessful, the Power functions again 1-10 hours after the hero's defeat. The hero has a -1CS resistance to Emotion attacks. Even worse, a perfect simulation of the emotions that accompany extreme distress can serve as a trap to lure and hold the\n\nTroubleseeker. The Troubleseeker cannot leave the 10 area limit until he has discovered the deception and neutralized the source of the spurious emotions. The Power works against the Troubleseeker's opponents if they try to carry him away from the area. Such attempts to hijack the hero proceed normally until the 10-area limit is reached. At that point the hero immediately teleports back to his starting place, minus whatever had carried him away. As mentioned earlier, the only way to prevent the Troubleseeker's unwanted appearance is to somehow prevent the Power from initially functioning. The detection aspect can be temporarily blinded by such means as Mental Invisibility or Force Field vs. either Mental or Emotional Attack. If the villain operates so covertly that no one gets distressed, this will also do. The key is prevent the hero from receiving the broadcast emotions. The second mode of prevention deals with the analysis aspect. Anything that can reduce the hero's Reason or Intuition to below Typical can prevent him from recognizing distress as something that demands his attention. Means to this end include Hypnotic Control, Emotion, Control, Induced Sleep, Mind Drain, and Psionic Vampirism. The third mode is simple enough. The ability to Teleport. Note: the hero may actually thank the villain for this, if the villain is able to pass himself off as a benefactor.\n\nThe Troubleseeker resents his Power and often feels he is a puppet dancing at the whim of an unseen master. The Power is controlled by a force beyond the hero's discovery. Whatever its nature, the Power will never try to get the hero killed. The screening mechanism never draws the hero to a crisis that is beyond his ability to handle, though he might not think so at the time. If the hero admits or suffers total defeat, the Power may even allow him to escape. If the hero is in a fatal situation with absolutely no way out, the Judge rolls a red Power FEAT. Success means the hero is teleported to safety, at the loss of all his Karma.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Universal",
    "duration": "Permanent"
  },
  {
    "code": "T21",
    "name": "True Flight",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T21",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can fly through air and space without an apparent means of propulsion. This is the most desired Power in the history of the world. The Power rank determines the maximum speed the hero can attain in a specific condition.",
    "rulesText": "The hero can fly through air and space without an apparent means of propulsion. This is the most desired Power in the history of the world. The Power rank determines the maximum speed the hero can attain in a specific condition. There are three mediums in which a hero can fly. The slowest form of Flight occurs when the hero torpedoes through the water at the Water Movement rate. Faster speed occurs when the hero flies through the air at the Air Movement rate. The fastest flight occurs when the hero is free of any hindering atmospheric friction; this is the Space Movement rate. Acceleration occurs at a rate of +1CS per turn. Deceleration occurs at -2CS per turn. The hero's maneuverability is determined by his Agility. The hero may be able to surpass light speed but if he has Feeble Agility he is going to need a wide turning radius. True Flight includes as a side effect Power rank resistance to atmospheric friction and lungs adapted to breathe high velocity wind. It does not include the ability to breathe water or survive the rigors of outer space. When creating the hero, the player can define the Power in any way that is consistent with the character or his equipment. Optional Powers include Body Resistance, Armor Skin, Self-Sustenance, and Telekinesis. The Nemesis is Gravity Manipulation.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "speed": "Flight"
  },
  {
    "code": "T22",
    "name": "Water Walking",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T22",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can temporarily solidify the surface of the water to enable him to walk on it without getting more than his feet wet. The pathway smoothes the water's surface to an average wave height and is not affected by waves of equal or less Intensity. The path slides along the water's surface.",
    "rulesText": "The hero can temporarily solidify the surface of the water to enable him to walk on it without getting more than his feet wet. The pathway smoothes the water's surface to an average wave height and is not affected by waves of equal or less Intensity.\n\nThe path slides along the water's surface. This permits the hero to travel at Power rank speed and the Water Movement rate. The Path only exists for the hero to use. It is intangible to others unless the hero can physically carry them or directly extend his Power to them. This can be done in two ways. One, when the hero is created, the player can decrease his Power rank -1CS by modifying the Power to extend 10' around the hero. This area will support others, provided their combined weight does not exceed the hero's weight limit. The second method requires the use of another Power that can enable others to independently use the watery pathway; such Powers include Power Transferral and Creation. The Power normally functions only when the hero is consciously using it. The hero can develop a Power Stunt that enables him to maintain the path's solidity even when the hero is unconscious.\n\nIn addition to the hero's body, the Whirlwind can support additional weight. Each additional 500 pounds decreases the Whirlwind's speed 1CS. Passengers are not battered by the high winds but are safely held aloft by updrafts in the cyclone's interior. Still, all passengers must make an Endurance FEAT or become air sick. The Power provides rank level Resistance to Physical and Sonic attacks. High winds can affect the hero. Strong winds decrease the Power rank by their Intensity rank number. If the wind is powerful enough, the Whirlwind can be dispersed. Such winds can be natural or created by such Powers as Matter Animation or Weather Control. provides no protection against anything within the water. For example, a shark could rub the hero's soles as he walked. Water currents and high waves can slow, speed along, or redirect the hero's progress. High waves become the equivalent of self-propelled hills. Fast currents can change the hero's speed. Opposing currents decrease the hero's speed by the current's Intensity rank number. Supporting currents increase the hero's speed by the same amount. Waves and currents can be natural or created by such Powers as Matter Animation or Weather Control. The Nemesis is Matter Animation/Liquid.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "speed": "Land"
  },
  {
    "code": "T23",
    "name": "Whirlwind",
    "category": "Travel",
    "source": "UPB Table p. 16-19 & Entry T23",
    "defaultRank": "Typical",
    "countsAsTwo": false,
    "description": "The hero can fly by creating a small cyclone that carries him through the air. The hero can travel at Power rank speed but is limited to Shift-X rank. Maneuverability is determined by the hero's Agility.",
    "rulesText": "The hero can fly by creating a small cyclone that carries him through the air. The hero can travel at Power rank speed but is limited to Shift-X rank. Maneuverability is determined by the hero's Agility. Optional Powers include Weather Control and Matter Animation/Air. These are also the Nemeses.",
    "errataNote": "",
    "powerStunts": [],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self or 1 area",
    "duration": "Maintained",
    "areaOfEffect": "1 area",
    "speed": "Flight"
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
    ],
    "isStarred": true,
    "powerSlots": 2,
    "range": "Rank",
    "duration": "Maintained",
    "areaOfEffect": "1 portal"
  },
  {
    "code": "T25",
    "name": "Winged Flight",
    "category": "Travel",
    "source": "Player's Book p. 24 & UPB p. 5 (Avian / Chiropteran / Extra Anatomy)",
    "defaultRank": "Good",
    "countsAsTwo": false,
    "description": "The hero flies through the air by means of feathered, leathery, membranous, or biomechanical wings (e.g. Angel, Falcon, Sauron).",
    "rulesText": "The hero possesses functional anatomical or artificial wings capable of true powered flight in an atmosphere at the Air Movement rate determined by the Power rank (maximum of Shift-X / Mach 1 in atmosphere). Acceleration occurs at +1CS per turn and deceleration at -2CS per turn. Maneuverability in flight is governed by the hero's Agility. Unlike unassisted True Flight, Winged Flight requires an atmosphere to generate lift (cannot fly in vacuum/outer space) and requires sufficient wingspan clearance to beat the wings (Grappling holds or confined spaces prevent flight). Per canonical rules, the hero suffers -1CS to Strength when lifting or carrying heavy loads while airborne.",
    "errataNote": "Native to Avian (Angelic), Avian (Harpy), Chiropteran (Bat-Form), and Modified Human (Extra Parts: Wings) physical forms.",
    "powerStunts": [
      "Wing Buffet / Gust: Beat wings powerfully to create a localized wind gust or knockback in 1 area",
      "Diving Stoop / Swoop Attack: Dive from altitude to gain +1CS Charging damage on a melee or talon strike",
      "Wing Shield: Wrap wings around the torso to deflect light projectiles or cushion an impact"
    ],
    "isStarred": false,
    "powerSlots": 1,
    "range": "Self",
    "duration": "Maintained",
    "speed": "Flight"
  }
];

  var MSH_NPC_PRESET_POWERS = [
  {
    "code": "NPC_PS",
    "id": "NPC_PS",
    "name": "Penance Stare [Ghost Rider] [NPC_PS]",
    "category": "Mental Enhancement",
    "source": "Canonical: Dan Ketch / Johnny Blaze / Ghost Rider (GHotMU MU2 / TSR MSH)",
    "defaultRank": "Monstrous",
    "rankNumber": 75,
    "countsAsTwo": true,
    "isStarred": true,
    "powerSlots": 2,
    "isNpcArchetype": true,
    "description": "Eye contact subjects a guilty soul to all the physical, psychic, and emotional pain they have ever inflicted on innocents.",
    "rulesText": "Locking eyes with a living or supernatural being forces the victim to experience all the pain, agony, and torment they have ever inflicted on others throughout their lifetime. The victim must make an immediate Psyche FEAT vs Power Rank intensity. On a White result, the victim suffers catastrophic psychic trauma equal to their sins, resulting in comatose catatonia or immediate collapse. On a Green result, the victim takes Power Rank psychic damage and is incapacitated for 1-10 rounds. On a Yellow result, the victim takes half damage and is stunned for 1 round. On a Red result, the victim resists with momentary disorientation. Ineffective against beings with no soul, blind beings, beings with more than two eyes, or entities completely devoid of human conscience.",
    "errataNote": "Canonical TSR rule: Ghost Rider's signature retribution weapon. Ignores physical and energy Body Armor; targets the soul directly.",
    "pool": null,
    "trigger": null,
    "traitModifiers": [],
    "powerStunts": [
      "Sin Tracking: Discern the guilt, sins, and evil deeds of a target through smell and spiritual aura",
      "Nightmare Paralyze: Subject target to a momentary glare causing immediate 1-round terror freeze on Yellow+ FEAT",
      "Mercy Modulation: Restrict the Stare to incapacitate without inflicting lethal spiritual trauma"
    ]
  },
  {
    "code": "NPC_HF",
    "id": "NPC_HF",
    "name": "Hellfire [Ghost Rider] [NPC_HF]",
    "category": "Energy Emission",
    "source": "Canonical: Ghost Rider / Daimon Hellstrom (GHotMU MU2 / Midnight Sons)",
    "defaultRank": "Monstrous",
    "rankNumber": 75,
    "countsAsTwo": true,
    "isStarred": true,
    "powerSlots": 2,
    "isNpcArchetype": true,
    "description": "Supernatural cold flame that scourges the spiritual and physical form, bypassing conventional physical armor and imbuing weapons with mystical destructive force.",
    "rulesText": "The hero generates and projects mystical Hellfire (range 3 areas) dealing Power Rank damage. Hellfire burns cold and does not consume physical oxygen or fuel. Because it attacks the spirit and life force directly, Hellfire completely bypasses conventional physical Body Armor (only magical force fields, mystical armor, or Psyche defenses protect against it). The hero can also channel Hellfire into handheld chains, weapons, or vehicles (such as the Hellcycle), imbuing them with Power Rank soul damage and enabling vehicles to traverse vertical surfaces and open water.",
    "errataNote": "Canonical TSR rule: Supernatural fire distinct from physical flame (EE4). Deals direct soul damage and can strike intangible or ethereal spirits.",
    "pool": null,
    "trigger": null,
    "traitModifiers": [],
    "powerStunts": [
      "Hellfire Scourge: Imbue chains or weapons with mystical Hellfire dealing Power Rank soul damage",
      "Hellfire Wall / Ring: Erect a barrier of cold infernal flame blocking passage and repelling evil/undead",
      "Spirit Cleansing: Burn away demonic possession or mystical corruption without harming the host body"
    ]
  },
  {
    "code": "NPC_AS",
    "id": "NPC_AS",
    "name": "Adrenaline Surge [The Incredible Hulk] [NPC_AS]",
    "category": "Physical Enhancement",
    "source": "Canonical: The Incredible Hulk (GHotMU MU3 / Advanced Set)",
    "defaultRank": "Monstrous",
    "rankNumber": 75,
    "countsAsTwo": true,
    "isStarred": true,
    "powerSlots": 2,
    "isNpcArchetype": true,
    "description": "Rage and combat trauma surge physical prowess, escalating Strength and Endurance higher the longer battle rages or the more damage is sustained.",
    "rulesText": "The hero's physical power increases in direct proportion to anger and injury. Each round of active combat, or upon taking more than 20 points of damage in a single round, the hero gains +1 Rage Token in their pool. Each token grants +1CS to Strength and Endurance (up to +RankNumber/10 Column Shifts max, capping at Shift Y/200). Tokens decay at 1 per round when calm or out of combat.",
    "errataNote": "Canonical TSR rule: Reflects the classic 'The madder Hulk gets, the stronger Hulk gets' mechanic. At Monstrous rank (75), allows up to +7CS (scaling Monstrous 75 -> Shift Y 200).",
    "pool": {
      "maxFormula": "Math.floor(rankNumber / 10)",
      "unit": "Rage / Adrenaline Tokens",
      "current": 0,
      "decayRate": "1 token per round out of combat",
      "overflowHazard": "None (Prone to uncontrolled rampage)"
    },
    "trigger": {
      "event": "on_combat_round",
      "damageTypes": [
        "any_damage",
        "stress"
      ],
      "action": "surge_stats"
    },
    "traitModifiers": [
      {
        "targetStats": [
          "strength",
          "endurance"
        ],
        "thresholdFormula": "1",
        "csPerThreshold": 1,
        "maxCapRank": "Shift Y"
      }
    ],
    "powerStunts": [
      "Thunderclap: Clap hands together to produce a concussive/sonic shockwave",
      "Ground Stomp: Smash ground creating localized earthquake affecting 1 area",
      "Leaping Boost: Channel adrenaline directly into triple leap distance"
    ]
  },
  {
    "code": "NPC_MA",
    "id": "NPC_MA",
    "name": "Unstoppable Momentum [The Juggernaut] [NPC_MA]",
    "category": "Physical Enhancement",
    "source": "Canonical: Cain Marko / Juggernaut (GHotMU MU3 / Children of the Atom)",
    "defaultRank": "Shift X",
    "rankNumber": 150,
    "countsAsTwo": true,
    "isStarred": true,
    "powerSlots": 2,
    "isNpcArchetype": true,
    "description": "Accelerating movement along a straight line builds unstoppable mystical kinetic mass, granting immunity to physical stoppage and catastrophic ramming devastation.",
    "rulesText": "Once the hero begins a straight-line charging action, they accumulate kinetic momentum. Each continuous area charged grants +1 Momentum Token (up to RankNumber/15 tokens max). Each token grants +1CS to charging ram damage and barrier destruction, and renders the hero immune to physical stoppage by barriers of Material Strength less than Power Rank (Shift X 150). Momentum immediately drops to 0 if the hero stops, turns more than 45 degrees, or is teleported.",
    "errataNote": "Canonical TSR rule: Implements the mystical unstoppable charge of the Cyttorak avatar.",
    "pool": {
      "maxFormula": "Math.floor(rankNumber / 15)",
      "unit": "Momentum Tokens",
      "current": 0,
      "decayRate": "Instantly resets to 0 upon stopping or sharp turn",
      "overflowHazard": "Collateral structural devastation"
    },
    "trigger": {
      "event": "straight_charge",
      "damageTypes": [],
      "action": "boost_momentum"
    },
    "traitModifiers": [
      {
        "targetStats": [
          "strength"
        ],
        "thresholdFormula": "1",
        "csPerThreshold": 1,
        "maxCapRank": "Shift Z"
      }
    ],
    "powerStunts": [
      "Unstoppable Ram: Smash through reinforced bank vaults or blast doors up to Power Rank",
      "Shockwave Trample: Cause slam checks against all combatants adjacent to the charge path",
      "Anchored Inertia: Plant feet to become immovable against equal or lesser strength"
    ]
  },
  {
    "code": "NPC_PM",
    "id": "NPC_PM",
    "name": "Probability Manipulation [Longshot / Domino] [NPC_PM]",
    "category": "Matter Control",
    "source": "Canonical: Longshot / Domino / Scarlet Witch (GHotMU MU3 / MU7)",
    "defaultRank": "Remarkable",
    "rankNumber": 30,
    "countsAsTwo": true,
    "isStarred": true,
    "powerSlots": 2,
    "isNpcArchetype": true,
    "description": "Psionically or subconsciously bends local probability fields, skewing chance in the hero's favor while provoking freak malfunctions and misfires for adversaries.",
    "rulesText": "The hero manipulates local probability fields to favor themselves or hex their foes. In combat and dramatic situations, the hero gains a +1CS bonus to their action FEAT rolls (+2CS on Power Rank FEATs). Conversely, enemies targeting the hero suffer a -1CS penalty, with hostile critical results frequently converted into freak weapon jams, snapped cords, tripping over debris, or environmental misfires. If the hero operates under a limitation (e.g. Longshot's requirement of pure motive or Domino's requirement of continuous movement), violating the limitation suspends or inverts the field (-1CS to hero) until resolved.",
    "errataNote": "Canonical TSR power: Represents the iconic probability and good luck mechanics of Longshot and Domino. Grouped with Matter Control as limited reality manipulation.",
    "pool": null,
    "trigger": null,
    "traitModifiers": [],
    "powerStunts": [
      "Miracle Dodge: A freak reflection or ricochet deflects an incoming projectile or lethal attack",
      "Weapon Jinx / Jam: Induce an immediate critical jam or mechanical failure in an opponent's firearm",
      "Lucky Ricochet: Bounce a thrown weapon or projectile off three surfaces to strike a target behind cover",
      "Serendipitous Hazard: Cause an unstable structural fixture to collapse right as an enemy moves past"
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
  "DT19": { range: "Rank (Column E)", duration: "Maintained", targets: "1 trail" },
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
  "T24": { range: "Rank", duration: "Maintained", areaOfEffect: "1 portal" },
  "T25": { range: "Self", speed: "Flight", duration: "Maintained" }
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
        description: "Protects against all physical attacks at standard power rank. Significantly superior in versatility to narrow single-attack physical fields.",
        isSuperior: true,
        rankShift: 0
      },
      {
        key: "specialized",
        label: "Specific Physical Specialization (+1CS Rank)",
        description: "Protects against a single specified physical attack form with +1CS rank, but provides 0 protection against all other physical damage types.",
        isSuperior: false,
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
        description: "Specializes in a specific radiation type with +1CS rank, damage, and range, but loses the ability to project other radiation spectrums.",
        isSuperior: false,
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
  },
  "T21": {
    powerCode: "T21",
    powerName: "True Flight",
    id: "flight_manifestation",
    label: "Flight Propulsion / Manifestation",
    canRoll: true,
    rollTable: [[1, 35, "winged"], [36, 100, "true_flight"]],
    choices: [
      {
        key: "true_flight",
        label: "True Flight (Unassisted / Space-Capable)",
        description: "Flies through air, water, and space without visible propulsion at Power Rank speed.",
        isSuperior: true,
        rankShift: 0
      },
      {
        key: "winged",
        label: "Winged Flight (Feathered, Leathery, or Mechanical Wings)",
        description: "Flies via anatomical or mechanical wings (Air Movement rate; requires atmosphere; -1CS Strength lifting while airborne).",
        isSuperior: false,
        rankShift: 0,
        subChoiceList: ["Feathered Wings (Avian / Angelic)", "Leathery Wings (Bat / Dragon)", "Biomechanical Wings", "Insectoid Wings"]
      }
    ]
  },
  "T25": {
    powerCode: "T25",
    powerName: "Winged Flight",
    id: "winged_flight_type",
    label: "Wing Anatomy & Physiology",
    canRoll: true,
    rollTable: [[1, 40, "feathered"], [41, 70, "leathery"], [71, 85, "biomechanical"], [86, 100, "insectoid"]],
    choices: [
      {
        key: "feathered",
        label: "Feathered Wings (Avian / Angelic)",
        description: "Aerodynamic avian wings with plumage and hollow bone adaptation. Standard Air Movement rate.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "leathery",
        label: "Leathery Wings (Bat-Form / Chiropteran / Gargoyle)",
        description: "Membranous leathery wings with elongated finger bones (Chiropteran/gargoyle anatomy). Standard Air Movement rate.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "biomechanical",
        label: "Biomechanical / Cybernetic Wings (Falcon / Vulture / Archangel)",
        description: "High-tech synthetic alloy wings or cybernetic wing grafts.",
        isSuperior: false,
        rankShift: 0
      },
      {
        key: "insectoid",
        label: "Insectoid / Gossamer Wings (Wasp / Pixie)",
        description: "High-frequency vibrating wings providing hovering and precision maneuverability.",
        isSuperior: false,
        rankShift: 0
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


// Registry and indexing for fast O(1) lookup
POWERS_CATALOG.forEach(p => {
  if (p.code) POWERS_BY_CODE[p.code] = p;
  if (p.id) POWERS_BY_CODE[p.id] = p;
  if (p.name) POWERS_BY_NAME[p.name.toLowerCase()] = p;
  if (typeof POWER_OPTIONS_DEFINITIONS !== 'undefined' && (POWER_OPTIONS_DEFINITIONS[p.id] || POWER_OPTIONS_DEFINITIONS[p.code])) {
    p.optionsDefinition = POWER_OPTIONS_DEFINITIONS[p.id] || POWER_OPTIONS_DEFINITIONS[p.code];
  }
});

// Canonical Power Limitations Catalog (UPB & Dragon #122/#134 & CMF)
const MANDATORY_POWER_LIMITATIONS = {
  precognition: {
    powerName: "Precognition",
    reason: "Canonical UPB Rule (Entry M24): Precognition has profound game-altering foresight, and the rules require the player to select a mandatory limitation to preserve Judge control and timeline integrity.",
    providedLimitations: [
      { name: "Intermittent Visions (Judge Discretion / Dreams)", defaultRank: "Typical", cpDiscount: 10, tsrShift: "Judge-Controlled", description: "Visions occur unpredictably at the Judge's discretion, typically while asleep or during plot transition points." },
      { name: "Physical Contact Required (Object or Subject)", defaultRank: "Good", cpDiscount: 10, tsrShift: "Touch FEAT Required", description: "The hero must physically touch the person, location, or artifact to perceive glimpses of its future." },
      { name: "Focus Item Required (Arcane Crystal, Cards, or Device)", defaultRank: "Typical", cpDiscount: 10, tsrShift: "Focus Dependent", description: "Foresight requires channeling through a specific physical focus or fragile apparatus (can be lost or shattered)." },
      { name: "Danger / Trauma Trigger Only", defaultRank: "Remarkable", cpDiscount: 15, tsrShift: "+1CS Danger Sense", description: "Visions ignite only when imminent mortal peril or tragic catastrophe directly threatens the hero or companions." },
      { name: "Deep Trance / Immobility (1-10 Rounds)", defaultRank: "Excellent", cpDiscount: 15, tsrShift: "Vulnerable Trance", description: "Entering the future requires complete physical paralysis and concentration, leaving the hero utterly defenseless." }
    ]
  },
  alter_ego: {
    powerName: "Alter Ego",
    reason: "Canonical UPB Rule (Entry S1): Alter Ego requires a specific transformation catalyst, condition, or trigger to transition between heroic and mundane forms.",
    providedLimitations: [
      { name: "Emotional Catalyst (Anger / Stress / Terror)", defaultRank: "Remarkable", cpDiscount: 15, tsrShift: "Psyche Trigger", description: "Transformation is sparked involuntarily by extreme emotional adrenaline (similar to Bruce Banner / Hulk)." },
      { name: "Incantation / Vocal Trigger (Magic Word)", defaultRank: "Typical", cpDiscount: 10, tsrShift: "Vocal Required", description: "Must speak a specific invocation or command phrase aloud (silence, gagging, or water prevents change)." },
      { name: "Transformation Focus (Cane, Ring, or Talisman)", defaultRank: "Good", cpDiscount: 10, tsrShift: "Item Dependent", description: "Must strike an artifact, wield a mystic focus, or activate a personal charm to initiate transformation." },
      { name: "Environmental Catalyst (Nightfall, Moonlight, or Sunlight)", defaultRank: "Remarkable", cpDiscount: 15, tsrShift: "Astronomical Cycle", description: "Form change is bound to solar, lunar, or planetary cycles and cannot be activated at will during off-hours." }
    ]
  },
  induced_berserking: {
    powerName: "Induced Berserking / Berserker",
    reason: "Canonical Rule: Berserker states require an activating trauma threshold or an uncontrollable combat drawback.",
    providedLimitations: [
      { name: "Severe Damage Threshold (< 50% Health)", defaultRank: "Good", cpDiscount: 10, tsrShift: "Damage Trigger", description: "Enters berserk frenzy only after sustaining substantial physical trauma in battle." },
      { name: "Indiscriminate Fury (Attacks Nearest Target)", defaultRank: "Remarkable", cpDiscount: 15, tsrShift: "Psyche FEAT Required", description: "While berserk, must pass a Psyche FEAT each round or attack the nearest entity regardless of ally or enemy." },
      { name: "Debilitating Exhaustion Post-Rage (-2CS All Stats)", defaultRank: "Remarkable", cpDiscount: 15, tsrShift: "Fatigue Drawback", description: "Once the rage subsides, the hero collapses into severe physical exhaustion (-2CS to all stats for 1 hour)." }
    ]
  },
  energy_absorption: {
    powerName: "Energy Absorption",
    reason: "Canonical Rule: Absorbing vast energetic currents requires containment restrictions or mandatory venting.",
    providedLimitations: [
      { name: "Mandatory Discharge (< 10 Rounds Maximum Storage)", defaultRank: "Remarkable", cpDiscount: 15, tsrShift: "Volatile Buffer", description: "Absorbed energy must be expelled within 10 combat turns or triggers a catastrophic internal backfire." },
      { name: "Single Specific Spectrum Only (e.g. Electricity, Radiation)", defaultRank: "Good", cpDiscount: 10, tsrShift: "Narrow Spectrum", description: "The absorption field is strictly calibrated to a single energy frequency and fails against all other wavelengths." }
    ]
  },
  split_form: {
    powerName: "Split Form / Duplication",
    reason: "Canonical UPB Rule (Entry S23): Creating biological duplicates mandates shared biological damage or finite duration.",
    providedLimitations: [
      { name: "Shared Damage Pool (Clones Share Total Health)", defaultRank: "Remarkable", cpDiscount: 15, tsrShift: "Unified Health", description: "Damage inflicted on duplicate bodies directly deducts from the original hero's primary Health pool." },
      { name: "Finite Cohesion (< 10 Rounds Duplication)", defaultRank: "Good", cpDiscount: 10, tsrShift: "Time Decay", description: "Duplicates rapidly lose cellular cohesion and must recombine into the main body within 10 turns." }
    ]
  }
};

// Canonical General Limitation Templates (Usable for Any Superpower)
const STANDARD_LIMITATION_TEMPLATES = [
  { name: "Physical Focus / External Item", defaultRank: "Good", cpDiscount: 10, tsrShift: "Focus Item", description: "Power operates through a handheld weapon, wand, or focus device that can be disarmed, stolen, or broken." },
  { name: "Touch / Contact Range Only", defaultRank: "Remarkable", cpDiscount: 15, tsrShift: "+1CS Touch Intensity", description: "A power normally capable of ranged projection is constrained to direct physical skin-to-skin touch." },
  { name: "Substance / Environmental Dependency", defaultRank: "Good", cpDiscount: 10, tsrShift: "Conditional", description: "Power only functions under specific environmental catalysts (e.g. direct sunlight, submerged in water, high voltage)." },
  { name: "Finite Charges / Recharge Cycle", defaultRank: "Typical", cpDiscount: 10, tsrShift: "Charges/Day", description: "Restricted to 3 uses per 24 hours, or demands a 1-hour quiet recharge period between activations." },
  { name: "Emotional / Ethical Imperative", defaultRank: "Good", cpDiscount: 10, tsrShift: "+1CS Righteousness", description: "Power functions only when acting in strict alignment with a moral oath (e.g. Longshot's pure motives) or intense passion." },
  { name: "Backfire / Self-Trauma Hazard", defaultRank: "Remarkable", cpDiscount: 15, tsrShift: "Backfire FEAT", description: "Pushing the power or rolling a Red FEAT inflicts internal stun, fatigue, or feedback damage on the hero." },
  { name: "Continuous Concentration (No Other Actions)", defaultRank: "Good", cpDiscount: 10, tsrShift: "Total Focus", description: "Sustaining the power requires full mental focus; the hero cannot move, dodge, or make secondary attacks." },
  { name: "Specific Target Category Only", defaultRank: "Typical", cpDiscount: 5, tsrShift: "Narrow Target", description: "Power affects only a narrow class of targets (e.g. metals only, organic life only, or non-mutants only)." }
];

if (typeof globalThis !== 'undefined') {
  globalThis.getPowerOptionsDefinition = getPowerOptionsDefinition;
  globalThis.rollPowerManifestation = rollPowerManifestation;
  globalThis.MANDATORY_POWER_LIMITATIONS = MANDATORY_POWER_LIMITATIONS;
  globalThis.STANDARD_LIMITATION_TEMPLATES = STANDARD_LIMITATION_TEMPLATES;
}

// =========================================================================
// TSR 1986 ADVANCED SET PLAYER'S BOOK (PB) RANDOM GENERATION TABLES & RULES
// =========================================================================

/**
 * TSR Random Ranks Table (Player's Book p. 6, Table 1 / UPB p. 13).
 * Maps percentile dice rolls (01-00) across the 5 canonical columns to FASERIP ranks:
 * - Col 1 (Mutants, Altered Humans): 01-05 Fe, 06-10 Pr, 11-20 Ty, 21-40 Gd, 41-60 Ex, 61-80 Rm, 81-96 In, 97-00 Am
 * - Col 2 (Normal Folks):            01-05 Fe, 06-25 Pr, 26-75 Ty, 76-95 Gd, 96-00 Ex
 * - Col 3 (High Tech):               01-05 Fe, 06-10 Pr, 11-40 Ty, 41-80 Gd, 81-95 Ex, 96-00 Rm
 * - Col 4 (Robots & Power Ranks):    01-05 Fe, 06-10 Pr, 11-15 Ty, 16-40 Gd, 41-50 Ex, 51-70 Rm, 71-90 In, 91-98 Am, 99-00 Mn
 * - Col 5 (Aliens):                  01-10 Fe, 11-20 Pr, 21-30 Ty, 31-40 Gd, 41-60 Ex, 61-70 Rm, 71-80 In, 81-95 Am, 96-00 Mn
 */
const TSR_RANDOM_RANKS_TABLE = {
  columns: [1, 2, 3, 4, 5],
  columnRanges: {
    1: [
      { min: 1,  max: 5,   rank: "Feeble" },
      { min: 6,  max: 10,  rank: "Poor" },
      { min: 11, max: 20,  rank: "Typical" },
      { min: 21, max: 40,  rank: "Good" },
      { min: 41, max: 60,  rank: "Excellent" },
      { min: 61, max: 80,  rank: "Remarkable" },
      { min: 81, max: 96,  rank: "Incredible" },
      { min: 97, max: 100, rank: "Amazing" }
    ],
    2: [
      { min: 1,  max: 5,   rank: "Feeble" },
      { min: 6,  max: 25,  rank: "Poor" },
      { min: 26, max: 75,  rank: "Typical" },
      { min: 76, max: 95,  rank: "Good" },
      { min: 96, max: 100, rank: "Excellent" }
    ],
    3: [
      { min: 1,  max: 5,   rank: "Feeble" },
      { min: 6,  max: 10,  rank: "Poor" },
      { min: 11, max: 40,  rank: "Typical" },
      { min: 41, max: 80,  rank: "Good" },
      { min: 81, max: 95,  rank: "Excellent" },
      { min: 96, max: 100, rank: "Remarkable" }
    ],
    4: [
      { min: 1,  max: 5,   rank: "Feeble" },
      { min: 6,  max: 10,  rank: "Poor" },
      { min: 11, max: 15,  rank: "Typical" },
      { min: 16, max: 40,  rank: "Good" },
      { min: 41, max: 50,  rank: "Excellent" },
      { min: 51, max: 70,  rank: "Remarkable" },
      { min: 71, max: 90,  rank: "Incredible" },
      { min: 91, max: 98,  rank: "Amazing" },
      { min: 99, max: 100, rank: "Monstrous" }
    ],
    5: [
      { min: 1,  max: 10,  rank: "Feeble" },
      { min: 11, max: 20,  rank: "Poor" },
      { min: 21, max: 30,  rank: "Typical" },
      { min: 31, max: 40,  rank: "Good" },
      { min: 41, max: 60,  rank: "Excellent" },
      { min: 61, max: 70,  rank: "Remarkable" },
      { min: 71, max: 80,  rank: "Incredible" },
      { min: 81, max: 95,  rank: "Amazing" },
      { min: 96, max: 100, rank: "Monstrous" }
    ]
  },
  ranges: [
    { min: 1,  max: 5,   ranks: { 1: "Feeble",     2: "Feeble",    3: "Feeble",     4: "Feeble",     5: "Feeble" } },
    { min: 6,  max: 10,  ranks: { 1: "Poor",       2: "Poor",      3: "Poor",       4: "Poor",       5: "Feeble" } },
    { min: 11, max: 15,  ranks: { 1: "Typical",    2: "Poor",      3: "Typical",    4: "Typical",    5: "Poor" } },
    { min: 16, max: 20,  ranks: { 1: "Typical",    2: "Poor",      3: "Typical",    4: "Good",       5: "Poor" } },
    { min: 21, max: 25,  ranks: { 1: "Good",       2: "Poor",      3: "Typical",    4: "Good",       5: "Typical" } },
    { min: 26, max: 30,  ranks: { 1: "Good",       2: "Typical",   3: "Typical",    4: "Good",       5: "Typical" } },
    { min: 31, max: 40,  ranks: { 1: "Good",       2: "Typical",   3: "Typical",    4: "Good",       5: "Good" } },
    { min: 41, max: 50,  ranks: { 1: "Excellent",  2: "Typical",   3: "Good",       4: "Excellent",  5: "Excellent" } },
    { min: 51, max: 60,  ranks: { 1: "Excellent",  2: "Typical",   3: "Good",       4: "Remarkable", 5: "Excellent" } },
    { min: 61, max: 70,  ranks: { 1: "Remarkable", 2: "Typical",   3: "Good",       4: "Remarkable", 5: "Remarkable" } },
    { min: 71, max: 75,  ranks: { 1: "Remarkable", 2: "Typical",   3: "Good",       4: "Incredible", 5: "Incredible" } },
    { min: 76, max: 80,  ranks: { 1: "Remarkable", 2: "Good",      3: "Good",       4: "Incredible", 5: "Incredible" } },
    { min: 81, max: 90,  ranks: { 1: "Incredible", 2: "Good",      3: "Excellent",  4: "Incredible", 5: "Amazing" } },
    { min: 91, max: 95,  ranks: { 1: "Incredible", 2: "Good",      3: "Excellent",  4: "Amazing",    5: "Amazing" } },
    { min: 96, max: 96,  ranks: { 1: "Incredible", 2: "Excellent", 3: "Remarkable", 4: "Amazing",    5: "Monstrous" } },
    { min: 97, max: 98,  ranks: { 1: "Amazing",    2: "Excellent", 3: "Remarkable", 4: "Amazing",    5: "Monstrous" } },
    { min: 99, max: 100, ranks: { 1: "Amazing",    2: "Excellent", 3: "Remarkable", 4: "Monstrous",  5: "Monstrous" } }
  ]
};

function rollRandomRank(column = 1, forcedRoll = null) {
  const col = Math.max(1, Math.min(5, parseInt(column, 10) || 1));
  const roll = (typeof forcedRoll === 'number' && forcedRoll >= 1 && forcedRoll <= 100)
    ? forcedRoll
    : Math.floor(Math.random() * 100) + 1;
  const colRows = TSR_RANDOM_RANKS_TABLE.columnRanges[col] || TSR_RANDOM_RANKS_TABLE.columnRanges[1];
  const colMatch = colRows.find(r => roll >= r.min && roll <= r.max) || colRows[0];
  const rankName = colMatch.rank || "Typical";
  const fallbackRankNums = {
    'Shift 0': 0, 'Feeble': 2, 'Poor': 4, 'Typical': 6, 'Good': 10,
    'Excellent': 20, 'Remarkable': 30, 'Incredible': 40, 'Amazing': 50,
    'Monstrous': 75, 'Unearthly': 100, 'Shift X': 150, 'Shift Y': 200,
    'Shift Z': 500, 'Class 1000': 1000, 'Class 3000': 3000, 'Class 5000': 5000, 'Beyond': 10000
  };
  const rankObj = (typeof UniversalTableEngine !== 'undefined')
    ? UniversalTableEngine.getRankByName(rankName)
    : { name: rankName, num: fallbackRankNums[rankName] || 6 };
  return {
    roll,
    column: col,
    rankName: rankObj.name,
    rankNumber: rankObj.num
  };
}

/**
 * TSR Ability Modifier Table (Player's Book p. 6 / UPB p. 13).
 * Used to determine starting Resources (starting from Typical, or Poor for Mutants)
 * and random Material Strength modifiers.
 */
const TSR_ABILITY_MODIFIER_TABLE = [
  { min: 1,  max: 15,  shift: -1, label: "-1CS (Reduce by one rank)" },
  { min: 16, max: 50,  shift: 0,  label: "0CS (Remain unchanged)" },
  { min: 51, max: 70,  shift: 1,  label: "+1CS (Increase by one rank)" },
  { min: 71, max: 85,  shift: 2,  label: "+2CS (Increase by two ranks)" },
  { min: 86, max: 95,  shift: 3,  label: "+3CS (Increase by three ranks)" },
  { min: 96, max: 100, shift: 4,  label: "+4CS (Increase by four ranks)" }
];

function rollAbilityModifier(forcedRoll = null) {
  const roll = (typeof forcedRoll === 'number' && forcedRoll >= 1 && forcedRoll <= 100)
    ? forcedRoll
    : Math.floor(Math.random() * 100) + 1;
  const match = TSR_ABILITY_MODIFIER_TABLE.find(m => roll >= m.min && roll <= m.max) || TSR_ABILITY_MODIFIER_TABLE[1];
  return { roll, shift: match.shift, label: match.label };
}

/**
 * TSR Origins Table (Player's Book p. 5, Step 1).
 */
const TSR_ORIGINS_TABLE = [
  { min: 1,  max: 30, id: "altered_human", name: "Altered Human", column: 1, powerSlotsModifier: 0, abilityBonus: "+1CS to any one Primary Ability (Player's choice)", description: "An ordinary person exposed to an outside influence (radiation, chemical accident, biological agent) granting superhuman abilities." },
  { min: 31, max: 60, id: "mutant",        name: "Mutant (Homo Superior)", column: 1, powerSlotsModifier: 1, abilityBonus: "+1CS to Endurance, +1 Power Slot, -1CS initial Resources (starts at Poor), 0 Starting Popularity", description: "Born with the genetic potential for superhuman powers that usually manifest at puberty." },
  { min: 61, max: 90, id: "high_tech",     name: "High Tech Hero", column: 3, powerSlotsModifier: 0, abilityBonus: "+2CS to Reason; Resources fixed at Good (or rolled on Ability Modifier Table)", description: "Achieves superhuman powers through advanced technological wonders, battlesuits, or equipment." },
  { min: 91, max: 95, id: "robot",         name: "Robot / Android", column: 4, powerSlotsModifier: 0, abilityBonus: "0 Starting Popularity (Androids may look human and get +1CS to one Primary Ability)", description: "A living machine, artificial construct, or synthetic android." },
  { min: 96, max: 100,id: "alien",         name: "Alien (Extraterrestrial)", column: 5, powerSlotsModifier: -1, abilityBonus: "-1 Power Slot (minimum 1), max 1 Contact (must be Alien race)", description: "A being native to another planet, star system, or dimension." }
];

function rollTsrOrigin(forcedRoll = null) {
  const roll = (typeof forcedRoll === 'number' && forcedRoll >= 1 && forcedRoll <= 100)
    ? forcedRoll
    : Math.floor(Math.random() * 100) + 1;
  const match = TSR_ORIGINS_TABLE.find(o => roll >= o.min && roll <= o.max) || TSR_ORIGINS_TABLE[0];
  return { roll, ...match };
}

/**
 * Canonical 1986 Player's Book (p. 7) Powers, Talents, and Contacts Table.
 * Each category lists Initial / Maximum slots.
 * Additional slots up to Maximum may be purchased by permanently reducing starting Resources:
 *   -2CS Resources per extra Power
 *   -1CS Resources per extra Talent or Contact
 *   (Resources cannot be reduced below Feeble).
 */
const TSR_PB_SLOTS_TABLE = [
  { min: 1,  max: 20,  powers: { initial: 2, max: 4 }, talents: { initial: 1, max: 6 }, contacts: { initial: 0, max: 4 } },
  { min: 21, max: 60,  powers: { initial: 3, max: 4 }, talents: { initial: 2, max: 5 }, contacts: { initial: 1, max: 4 } },
  { min: 61, max: 90,  powers: { initial: 4, max: 4 }, talents: { initial: 3, max: 4 }, contacts: { initial: 2, max: 4 } },
  { min: 91, max: 100, powers: { initial: 5, max: 5 }, talents: { initial: 4, max: 4 }, contacts: { initial: 3, max: 4 } }
];

/**
 * Canonical 1987 Ultimate Powers Book (p. 14) Number of Powers, Talents, and Contacts Table.
 */
const UPB_SLOTS_TABLE = [
  { min: 1,   max: 12,  powers: { initial: 1,  max: 3  }, talents: { initial: 0, max: 3 }, contacts: { initial: 0, max: 2 } },
  { min: 13,  max: 26,  powers: { initial: 2,  max: 4  }, talents: { initial: 1, max: 4 }, contacts: { initial: 0, max: 4 } },
  { min: 27,  max: 41,  powers: { initial: 3,  max: 5  }, talents: { initial: 1, max: 6 }, contacts: { initial: 1, max: 4 } },
  { min: 42,  max: 55,  powers: { initial: 4,  max: 6  }, talents: { initial: 2, max: 4 }, contacts: { initial: 2, max: 4 } },
  { min: 56,  max: 66,  powers: { initial: 5,  max: 7  }, talents: { initial: 2, max: 6 }, contacts: { initial: 2, max: 6 } },
  { min: 67,  max: 75,  powers: { initial: 6,  max: 8  }, talents: { initial: 2, max: 8 }, contacts: { initial: 3, max: 3 } },
  { min: 76,  max: 83,  powers: { initial: 7,  max: 9  }, talents: { initial: 3, max: 4 }, contacts: { initial: 3, max: 4 } },
  { min: 84,  max: 89,  powers: { initial: 8,  max: 10 }, talents: { initial: 3, max: 6 }, contacts: { initial: 3, max: 6 } },
  { min: 90,  max: 94,  powers: { initial: 9,  max: 12 }, talents: { initial: 4, max: 8 }, contacts: { initial: 4, max: 4 } },
  { min: 95,  max: 97,  powers: { initial: 10, max: 12 }, talents: { initial: 4, max: 4 }, contacts: { initial: 4, max: 5 } },
  { min: 98,  max: 99,  powers: { initial: 12, max: 14 }, talents: { initial: 5, max: 6 }, contacts: { initial: 5, max: 5 } },
  { min: 100, max: 100, powers: { initial: 14, max: 18 }, talents: { initial: 6, max: 8 }, contacts: { initial: 6, max: 6 } }
];

const TSR_POWER_SLOTS_TABLE = TSR_PB_SLOTS_TABLE.map(r => ({
  min: r.min,
  max: r.max,
  slots: r.powers.initial,
  initial: r.powers.initial,
  maxSlots: r.powers.max
}));

function rollTsrPowerSlots(forcedRoll = null, ruleset = 'pb') {
  const roll = (typeof forcedRoll === 'number' && forcedRoll >= 1 && forcedRoll <= 100)
    ? forcedRoll
    : Math.floor(Math.random() * 100) + 1;
  const table = (ruleset === 'upb') ? UPB_SLOTS_TABLE : TSR_PB_SLOTS_TABLE;
  const match = table.find(s => roll >= s.min && roll <= s.max) || table[1];
  return {
    roll,
    slots: match.powers.initial,
    initial: match.powers.initial,
    max: match.powers.max,
    ruleset
  };
}

/**
 * TSR Power Category Table (Player's Book p. 8, Table 4 & UPB mapping).
 * Maps percentile rolls to categorized power suites.
 */
const TSR_POWER_CATEGORIES_TABLE = [
  { min: 1,  max: 8,   category: "Defensive",          code: "D",  label: "Resistances & Defense", description: "Body armor, force fields, invulnerabilities, and damage absorption." },
  { min: 9,  max: 24,  category: "Detection",          code: "DT", label: "Sensory & Detection", description: "Enhanced senses, tracking, infravision, precognition, and awareness." },
  { min: 25, max: 30,  category: "Fighting",           code: "F",  label: "Weapons & Combat", description: "Natural weaponry, energy blasters, combat martial arts, and weaponry creation." },
  { min: 31, max: 40,  category: "Travel",             code: "T",  label: "Movement & Travel", description: "Flight, teleportation, hyper-speed, wall-crawling, and leaping." },
  { min: 41, max: 50,  category: "Matter Control",     code: "MC", label: "Matter Control", description: "Telekinesis, elemental manipulation, molding, and gravity control." },
  { min: 51, max: 60,  category: "Energy Emission",    code: "EE", label: "Energy Emission & Control", description: "Fire, electricity, radiation, light, cold, and kinetic bolts." },
  { min: 61, max: 70,  category: "Self-Alteration",    code: "S",  label: "Body Alteration & Physical", description: "Growth, shrinking, density, elongation, and shapeshifting." },
  { min: 71, max: 80,  category: "Matter Conversion",  code: "C",  label: "Matter Conversion & Creation", description: "Molecular manipulation, transmutation, disintegration, and matter creation." },
  { min: 81, max: 90,  category: "Mental Enhancement", code: "M",  label: "Mental & Illusions", description: "Telepathy, mind control, illusions, astral projection, and psionics." },
  { min: 91, max: 100, category: "Magical",            code: "MG", label: "Magical & Special", description: "Arcane spells, power duplication, probability manipulation, and cosmic powers." }
];

function rollTsrPowerCategory(forcedRoll = null) {
  const roll = (typeof forcedRoll === 'number' && forcedRoll >= 1 && forcedRoll <= 100)
    ? forcedRoll
    : Math.floor(Math.random() * 100) + 1;
  const match = TSR_POWER_CATEGORIES_TABLE.find(c => roll >= c.min && roll <= c.max) || TSR_POWER_CATEGORIES_TABLE[0];
  return { roll, ...match };
}

/**
 * TSR Talents Slots Table (Player's Book p. 7 & UPB p. 14).
 */
const TSR_TALENT_SLOTS_TABLE = TSR_PB_SLOTS_TABLE.map(r => ({
  min: r.min,
  max: r.max,
  slots: r.talents.initial,
  initial: r.talents.initial,
  maxSlots: r.talents.max
}));

function rollTsrTalentSlots(forcedRoll = null, ruleset = 'pb') {
  const roll = (typeof forcedRoll === 'number' && forcedRoll >= 1 && forcedRoll <= 100)
    ? forcedRoll
    : Math.floor(Math.random() * 100) + 1;
  const table = (ruleset === 'upb') ? UPB_SLOTS_TABLE : TSR_PB_SLOTS_TABLE;
  const match = table.find(t => roll >= t.min && t.max >= roll) || table[1];
  return {
    roll,
    slots: match.talents.initial,
    initial: match.talents.initial,
    max: match.talents.max,
    ruleset
  };
}

/**
 * TSR Contacts Slots Table (Player's Book p. 7 & UPB p. 14).
 */
const TSR_CONTACT_SLOTS_TABLE = TSR_PB_SLOTS_TABLE.map(r => ({
  min: r.min,
  max: r.max,
  slots: r.contacts.initial,
  initial: r.contacts.initial,
  maxSlots: r.contacts.max
}));

function rollTsrContactSlots(forcedRoll = null, ruleset = 'pb') {
  const roll = (typeof forcedRoll === 'number' && forcedRoll >= 1 && forcedRoll <= 100)
    ? forcedRoll
    : Math.floor(Math.random() * 100) + 1;
  const table = (ruleset === 'upb') ? UPB_SLOTS_TABLE : TSR_PB_SLOTS_TABLE;
  const match = table.find(c => roll >= c.min && c.max >= roll) || table[1];
  return {
    roll,
    slots: match.contacts.initial,
    initial: match.contacts.initial,
    max: match.contacts.max,
    ruleset
  };
}



/**
 * Canonical TSR Advanced Set Player's Book (pp. 16-17) & UPB Contact Categories.
 */
const TSR_CANONICAL_CONTACT_CATEGORIES = [
  { id: "law_enforcement", name: "Law Enforcement / Police (Local, State, Federal, SHIELD)", group: "Authorities" },
  { id: "government",      name: "Government / Political (City Hall, Courts, D.A., Congress)", group: "Authorities" },
  { id: "military",        name: "Military / Armed Forces (Pentagon, Bases, Spec Ops)", group: "Authorities" },
  { id: "espionage",       name: "Espionage / Intelligence Network (SHIELD, CIA, Secret Agents)", group: "Authorities" },
  { id: "scientific",      name: "Scientific / Academic Community (Universities, Labs, Tech Institutes)", group: "Specialists" },
  { id: "medical",         name: "Medical / Healthcare (Hospitals, Doctors, Night Nurse, Clinics)", group: "Specialists" },
  { id: "engineering",     name: "Engineering / Technical (Specialist Mechanics, Inventing Guilds)", group: "Specialists" },
  { id: "occult",          name: "Mystic / Occult Community (Sorcerers, Enchanters, Sanctums)", group: "Specialists" },
  { id: "journalism",      name: "Journalism / News Media (Daily Bugle, TV Networks, Press)", group: "Civic & Media" },
  { id: "business",        name: "Business / Corporate / Financial (Wall Street, Banks, Stark/Oscorp)", group: "Civic & Media" },
  { id: "legal",           name: "Legal / Attorneys (Defense Lawyers, Legal Aid, Judges)", group: "Civic & Media" },
  { id: "community",       name: "Community / Neighborhood (Local Activists, Neighborhood Watch, Charities)", group: "Civic & Media" },
  { id: "entertainment",   name: "Entertainment / Art / Culture (Theater, Film, Celebrity Circle)", group: "Civic & Media" },
  { id: "superhero",       name: "Super Heroic / Hero Teams (Avengers, Fantastic Four, X-Men)", group: "Super-Powered" },
  { id: "mutant_comm",     name: "Mutant Underground / Haven (Xavier Institute, Morlocks)", group: "Super-Powered" },
  { id: "cosmic_alien",    name: "Extraterrestrial / Cosmic (Intergalactic Traders, Starjammers)", group: "Cosmic / Nether" },
  { id: "dimensional",     name: "Extra-Dimensional / Nether Realm (Astral Guides, Planar Entities)", group: "Cosmic / Nether" },
  { id: "underworld",      name: "Underworld / Street Informants (Criminal Fences, Street Gangs, Fixers)", group: "Underworld" },
  { id: "black_market",    name: "Black Market / Smugglers (Illegal Tech, Contraband Brokers)", group: "Underworld" }
];


/**
 * Canonical TSR Advanced Set Player's Book (p. 9) Limitation Ceilings.
 * In original rules, accepting a limitation grants +1CS to the power rank,
 * but CANNOT raise a power above the ceiling rank of that limitation tier!
 */
const TSR_LIMITATION_CEILINGS = [
  {
    ceiling: "Excellent",
    ceilingNum: 20,
    label: "Maximum of Excellent",
    description: "Mild limitations suitable for raising Feeble or Poor powers up to Excellent.",
    examples: [
      { name: "Physical Contact Required (Touch Only)", description: "Power can only affect targets touched by the hero; ranged projection is negated." },
      { name: "Full Concentration Required", description: "Hero cannot take any other actions or combat attacks while sustaining the power." },
      { name: "Environmental Dependency (Sunlight / Darkness / Water)", description: "Power is rendered completely inert unless operated within the specified environmental condition." },
      { name: "Somatic / Physical Gesture Required", description: "Must have free hands and perform distinct physical gestures to trigger the power." },
      { name: "Incantation / Spoken Words Required", description: "Must speak words of power aloud; silence or gagging prevents activation." },
      { name: "Self-Damage Recoil (Feeble)", description: "Hero takes Feeble (2) direct recoil damage each time the power is activated." }
    ]
  },
  {
    ceiling: "Remarkable",
    ceilingNum: 30,
    label: "Maximum of Remarkable",
    description: "Moderate limitations suitable for raising Good powers to Remarkable.",
    examples: [
      { name: "External Focus / Implement Required", description: "Power operates solely through an external object (e.g. wand, ring, staff, visor) that can be disarmed or stolen." },
      { name: "Single Emotion Limitation", description: "Power can only be triggered when the hero experiences an overwhelming specific emotion (e.g. rage, panic, grief)." },
      { name: "Limited Frequency / Charges", description: "Power is limited to 1-3 uses per 24 hours, or demands a 1-hour quiet cooldown between activations." },
      { name: "Degrading Rank (-1CS per Turn)", description: "Power rank degrades by -1CS for each consecutive round of continuous maintenance." },
      { name: "Physical Exhaustion", description: "Hero must make an Endurance FEAT after use or suffer 10 rounds of fatigue (-1CS to all physical stats)." }
    ]
  },
  {
    ceiling: "Incredible",
    ceilingNum: 40,
    label: "Maximum of Incredible",
    description: "Significant limitations suitable for raising Remarkable powers to Incredible.",
    examples: [
      { name: "Activation FEAT Required", description: "Must succeed at a Psyche or Endurance FEAT against power rank each time the power is invoked; failure wastes the action." },
      { name: "Alter Ego / Transformed State Only", description: "Power is completely inaccessible outside of the hero's transformed physical form (e.g. Donald Blake / Thor)." },
      { name: "Uncontrollable Area Devastation", description: "Power detonates outwards in an indiscriminate blast, risking friendly fire and widespread collateral damage." },
      { name: "Overload Burnout on White FEAT", description: "A White FEAT roll while invoking power causes systemic overload, disabling the power for 1-10 hours." },
      { name: "Stationary Tether / Proximity Anchor", description: "Hero must remain within 100 feet of an anchored external power source or shrine." }
    ]
  },
  {
    ceiling: "Amazing",
    ceilingNum: 50,
    label: "Maximum of Amazing",
    description: "Severe limitations capable of raising Incredible powers to Amazing.",
    examples: [
      { name: "Brief Burst & 24-Hour Dormancy", description: "Power operates for a maximum of 1-10 turns, then lapses into complete inert dormancy for 24 hours." },
      { name: "Equal Backlash Trauma", description: "Hero takes recoil damage equal to the rank damage or intensity inflicted upon the target." },
      { name: "Induced Berserking / Trance", description: "Hero enters an unreasoning berserk rage or sensory trance, attacking the nearest living being until subdued." },
      { name: "Common Substance Neutralization", description: "Power instantly shorts out and becomes inert in the presence of a common material (e.g. wood, yellow, non-metals)." }
    ]
  },
  {
    ceiling: "Monstrous",
    ceilingNum: 75,
    label: "Maximum of Monstrous",
    description: "Drastic, crippling limitations capable of raising Amazing powers to Monstrous.",
    examples: [
      { name: "Near-Death / Emergency Activation Only", description: "Power cannot be consciously triggered; activates only when the hero is at 0 Health or dying." },
      { name: "Fatal Environmental Vulnerability", description: "Proximity or contact with a specified substance inflicts direct Monstrous damage and paralysis." },
      { name: "Vital Drain (-2CS Stats)", description: "Unleashing the power burns vital reserves, inflicting -2CS to all primary abilities for 24 hours." }
    ]
  },
  {
    ceiling: "Unearthly",
    ceilingNum: 100,
    label: "Maximum of Unearthly",
    description: "Ultimate existential limitations capable of raising Monstrous powers to Unearthly.",
    examples: [
      { name: "Permanent Vital Sacrifice", description: "Every activation permanently burns Health points, lifespan, or permanent ability rank values." },
      { name: "Loss of Free Will / Entity Control", description: "Activating the power cedes all conscious control to an alien consciousness or GM-directed force." }
    ]
  }
];

function validateTsrLimitation(currentRankName, ceilingRankName) {
  const stdRanks = (typeof STANDARD_RANKS !== 'undefined')
    ? STANDARD_RANKS
    : ((typeof globalThis !== 'undefined' && globalThis.STANDARD_RANKS) ? globalThis.STANDARD_RANKS : null);

  if (!stdRanks) {
    if (typeof UniversalTableEngine !== 'undefined') {
      const curObj = UniversalTableEngine.getRankByName(currentRankName);
      const ceilObj = UniversalTableEngine.getRankByName(ceilingRankName);
      const curIdx = UniversalTableEngine.getRankIndex(curObj.name);
      const ceilIdx = UniversalTableEngine.getRankIndex(ceilObj.name);
      if (curIdx >= ceilIdx) {
        return {
          valid: false,
          currentRank: curObj.name,
          ceilingRank: ceilObj.name,
          newRank: curObj.name,
          reason: `Power rank (${curObj.name}) is already at or above the limitation ceiling (${ceilObj.name}). Per PB p. 9, this limitation cannot raise this power.`
        };
      }
      const nextRank = UniversalTableEngine.applyColumnShift(curObj.name, 1);
      return {
        valid: true,
        currentRank: curObj.name,
        ceilingRank: ceilObj.name,
        newRank: nextRank.name,
        newRankNum: nextRank.num,
        reason: `Valid! Limitation raises power from ${curObj.name} (+1CS) to ${nextRank.name} (Ceiling: ${ceilObj.name}).`
      };
    }
    return { valid: true, currentRank: currentRankName, ceilingRank: ceilingRankName, newRank: currentRankName, reason: "Engine unavailable" };
  }

  const normCur = String(currentRankName || '').trim().toLowerCase();
  const normCeil = String(ceilingRankName || '').trim().toLowerCase();
  const curIdx = stdRanks.findIndex(r => r.name.toLowerCase() === normCur || r.abbr.toLowerCase() === normCur);
  const ceilIdx = stdRanks.findIndex(r => r.name.toLowerCase() === normCeil || r.abbr.toLowerCase() === normCeil);

  const curObj = curIdx !== -1 ? stdRanks[curIdx] : stdRanks[3];
  const ceilObj = ceilIdx !== -1 ? stdRanks[ceilIdx] : stdRanks[6];
  const actualCurIdx = curIdx !== -1 ? curIdx : 3;
  const actualCeilIdx = ceilIdx !== -1 ? ceilIdx : 6;

  if (actualCurIdx >= actualCeilIdx) {
    return {
      valid: false,
      currentRank: curObj.name,
      ceilingRank: ceilObj.name,
      newRank: curObj.name,
      reason: `Power rank (${curObj.name}) is already at or above the limitation ceiling (${ceilObj.name}). Per PB p. 9, this limitation cannot raise this power.`
    };
  }

  const nextIdx = Math.min(stdRanks.length - 1, actualCurIdx + 1);
  const nextRank = stdRanks[nextIdx];

  return {
    valid: true,
    currentRank: curObj.name,
    ceilingRank: ceilObj.name,
    newRank: nextRank.name,
    newRankNum: nextRank.num,
    reason: `Valid! Limitation raises power from ${curObj.name} (+1CS) to ${nextRank.name} (Ceiling: ${ceilObj.name}).`
  };
}

  // Export to global scope
  const targetGlobal = typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : global);

  targetGlobal.POWERS_CATALOG = POWERS_CATALOG;
  targetGlobal.POWERS_BY_CODE = POWERS_BY_CODE;
  targetGlobal.POWERS_BY_NAME = POWERS_BY_NAME;
  targetGlobal.MSH_POWERS = MSH_POWERS;
  targetGlobal.MSH_NPC_PRESET_POWERS = MSH_NPC_PRESET_POWERS;
  targetGlobal.MSH_GHOTMU_POWERS = MSH_NPC_PRESET_POWERS;
  targetGlobal.POWER_ATTRIBUTES = POWER_ATTRIBUTES;
  targetGlobal.RANGE_BY_RANK = RANGE_BY_RANK;
  targetGlobal.FLIGHT_SPEED = FLIGHT_SPEED;
  targetGlobal.LAND_SPEED = LAND_SPEED;
  targetGlobal.WATER_SPEED = WATER_SPEED;
  targetGlobal.WEIGHT_BY_RANK = WEIGHT_BY_RANK;
  targetGlobal.getPowerDetails = getPowerDetails;
  targetGlobal.getPowerRankAspects = getPowerRankAspects;
  targetGlobal.calculatePowerAdjustmentCost = calculatePowerAdjustmentCost;
  targetGlobal.getMaxAdjustmentShift = getMaxAdjustmentShift;
  targetGlobal.POWER_OPTIONS_DEFINITIONS = POWER_OPTIONS_DEFINITIONS;
  targetGlobal.getPowerOptionsDefinition = getPowerOptionsDefinition;
  targetGlobal.rollPowerManifestation = rollPowerManifestation;
  targetGlobal.MANDATORY_POWER_LIMITATIONS = MANDATORY_POWER_LIMITATIONS;
  targetGlobal.STANDARD_LIMITATION_TEMPLATES = STANDARD_LIMITATION_TEMPLATES;
  targetGlobal.TSR_RANDOM_RANKS_TABLE = TSR_RANDOM_RANKS_TABLE;
  targetGlobal.rollRandomRank = rollRandomRank;
  targetGlobal.TSR_ABILITY_MODIFIER_TABLE = TSR_ABILITY_MODIFIER_TABLE;
  targetGlobal.rollAbilityModifier = rollAbilityModifier;
  targetGlobal.TSR_ORIGINS_TABLE = TSR_ORIGINS_TABLE;
  targetGlobal.rollTsrOrigin = rollTsrOrigin;
  targetGlobal.TSR_PB_SLOTS_TABLE = TSR_PB_SLOTS_TABLE;
  targetGlobal.UPB_SLOTS_TABLE = UPB_SLOTS_TABLE;
  targetGlobal.TSR_POWER_SLOTS_TABLE = TSR_POWER_SLOTS_TABLE;
  targetGlobal.rollTsrPowerSlots = rollTsrPowerSlots;
  targetGlobal.TSR_POWER_CATEGORIES_TABLE = TSR_POWER_CATEGORIES_TABLE;
  targetGlobal.rollTsrPowerCategory = rollTsrPowerCategory;
  targetGlobal.TSR_TALENT_SLOTS_TABLE = TSR_TALENT_SLOTS_TABLE;
  targetGlobal.rollTsrTalentSlots = rollTsrTalentSlots;
  targetGlobal.TSR_CONTACT_SLOTS_TABLE = TSR_CONTACT_SLOTS_TABLE;
  targetGlobal.rollTsrContactSlots = rollTsrContactSlots;
  targetGlobal.TSR_CANONICAL_CONTACT_CATEGORIES = TSR_CANONICAL_CONTACT_CATEGORIES;
  targetGlobal.TSR_LIMITATION_CEILINGS = TSR_LIMITATION_CEILINGS;
  targetGlobal.validateTsrLimitation = validateTsrLimitation;

  if (global !== targetGlobal) {
    global.POWERS_CATALOG = POWERS_CATALOG;
    global.POWERS_BY_CODE = POWERS_BY_CODE;
    global.POWERS_BY_NAME = POWERS_BY_NAME;
    global.MSH_POWERS = MSH_POWERS;
    global.MSH_NPC_PRESET_POWERS = MSH_NPC_PRESET_POWERS;
    global.MSH_GHOTMU_POWERS = MSH_NPC_PRESET_POWERS;
    global.POWER_ATTRIBUTES = POWER_ATTRIBUTES;
    global.RANGE_BY_RANK = RANGE_BY_RANK;
    global.FLIGHT_SPEED = FLIGHT_SPEED;
    global.LAND_SPEED = LAND_SPEED;
    global.WATER_SPEED = WATER_SPEED;
    global.WEIGHT_BY_RANK = WEIGHT_BY_RANK;
    global.getPowerDetails = getPowerDetails;
    global.getPowerRankAspects = getPowerRankAspects;
    global.calculatePowerAdjustmentCost = calculatePowerAdjustmentCost;
    global.getMaxAdjustmentShift = getMaxAdjustmentShift;
    global.POWER_OPTIONS_DEFINITIONS = POWER_OPTIONS_DEFINITIONS;
    global.getPowerOptionsDefinition = getPowerOptionsDefinition;
    global.rollPowerManifestation = rollPowerManifestation;
    global.MANDATORY_POWER_LIMITATIONS = MANDATORY_POWER_LIMITATIONS;
    global.STANDARD_LIMITATION_TEMPLATES = STANDARD_LIMITATION_TEMPLATES;
    global.TSR_RANDOM_RANKS_TABLE = TSR_RANDOM_RANKS_TABLE;
    global.rollRandomRank = rollRandomRank;
    global.TSR_ABILITY_MODIFIER_TABLE = TSR_ABILITY_MODIFIER_TABLE;
    global.rollAbilityModifier = rollAbilityModifier;
    global.TSR_ORIGINS_TABLE = TSR_ORIGINS_TABLE;
    global.rollTsrOrigin = rollTsrOrigin;
    global.TSR_PB_SLOTS_TABLE = TSR_PB_SLOTS_TABLE;
    global.UPB_SLOTS_TABLE = UPB_SLOTS_TABLE;
    global.TSR_POWER_SLOTS_TABLE = TSR_POWER_SLOTS_TABLE;
    global.rollTsrPowerSlots = rollTsrPowerSlots;
    global.TSR_POWER_CATEGORIES_TABLE = TSR_POWER_CATEGORIES_TABLE;
    global.rollTsrPowerCategory = rollTsrPowerCategory;
    global.TSR_TALENT_SLOTS_TABLE = TSR_TALENT_SLOTS_TABLE;
    global.rollTsrTalentSlots = rollTsrTalentSlots;
    global.TSR_CONTACT_SLOTS_TABLE = TSR_CONTACT_SLOTS_TABLE;
    global.rollTsrContactSlots = rollTsrContactSlots;
    global.TSR_CANONICAL_CONTACT_CATEGORIES = TSR_CANONICAL_CONTACT_CATEGORIES;
    global.TSR_LIMITATION_CEILINGS = TSR_LIMITATION_CEILINGS;
    global.validateTsrLimitation = validateTsrLimitation;
  }

})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    POWERS_CATALOG: (typeof globalThis !== 'undefined' ? globalThis.POWERS_CATALOG : null),
    POWERS_BY_CODE: (typeof globalThis !== 'undefined' ? globalThis.POWERS_BY_CODE : null),
    POWERS_BY_NAME: (typeof globalThis !== 'undefined' ? globalThis.POWERS_BY_NAME : null),
    MSH_POWERS: (typeof globalThis !== 'undefined' ? globalThis.MSH_POWERS : null),
    MSH_NPC_PRESET_POWERS: (typeof globalThis !== 'undefined' ? globalThis.MSH_NPC_PRESET_POWERS : null),
    MSH_GHOTMU_POWERS: (typeof globalThis !== 'undefined' ? globalThis.MSH_NPC_PRESET_POWERS : null),
    POWER_ATTRIBUTES: (typeof globalThis !== 'undefined' ? globalThis.POWER_ATTRIBUTES : null),
    RANGE_BY_RANK: (typeof globalThis !== 'undefined' ? globalThis.RANGE_BY_RANK : null),
    FLIGHT_SPEED: (typeof globalThis !== 'undefined' ? globalThis.FLIGHT_SPEED : null),
    LAND_SPEED: (typeof globalThis !== 'undefined' ? globalThis.LAND_SPEED : null),
    WATER_SPEED: (typeof globalThis !== 'undefined' ? globalThis.WATER_SPEED : null),
    WEIGHT_BY_RANK: (typeof globalThis !== 'undefined' ? globalThis.WEIGHT_BY_RANK : null),
    getPowerDetails: (typeof globalThis !== 'undefined' ? globalThis.getPowerDetails : null),
    getPowerRankAspects: (typeof globalThis !== 'undefined' ? globalThis.getPowerRankAspects : null),
    calculatePowerAdjustmentCost: (typeof globalThis !== 'undefined' ? globalThis.calculatePowerAdjustmentCost : null),
    getMaxAdjustmentShift: (typeof globalThis !== 'undefined' ? globalThis.getMaxAdjustmentShift : null),
    POWER_OPTIONS_DEFINITIONS: (typeof globalThis !== 'undefined' ? globalThis.POWER_OPTIONS_DEFINITIONS : null),
    getPowerOptionsDefinition: (typeof globalThis !== 'undefined' ? globalThis.getPowerOptionsDefinition : null),
    rollPowerManifestation: (typeof globalThis !== 'undefined' ? globalThis.rollPowerManifestation : null),
    MANDATORY_POWER_LIMITATIONS: (typeof globalThis !== 'undefined' ? globalThis.MANDATORY_POWER_LIMITATIONS : null),
    STANDARD_LIMITATION_TEMPLATES: (typeof globalThis !== 'undefined' ? globalThis.STANDARD_LIMITATION_TEMPLATES : null),
    TSR_RANDOM_RANKS_TABLE: (typeof globalThis !== 'undefined' ? globalThis.TSR_RANDOM_RANKS_TABLE : null),
    rollRandomRank: (typeof globalThis !== 'undefined' ? globalThis.rollRandomRank : null),
    TSR_ABILITY_MODIFIER_TABLE: (typeof globalThis !== 'undefined' ? globalThis.TSR_ABILITY_MODIFIER_TABLE : null),
    rollAbilityModifier: (typeof globalThis !== 'undefined' ? globalThis.rollAbilityModifier : null),
    TSR_ORIGINS_TABLE: (typeof globalThis !== 'undefined' ? globalThis.TSR_ORIGINS_TABLE : null),
    rollTsrOrigin: (typeof globalThis !== 'undefined' ? globalThis.rollTsrOrigin : null),
    TSR_PB_SLOTS_TABLE: (typeof globalThis !== 'undefined' ? globalThis.TSR_PB_SLOTS_TABLE : null),
    UPB_SLOTS_TABLE: (typeof globalThis !== 'undefined' ? globalThis.UPB_SLOTS_TABLE : null),
    TSR_POWER_SLOTS_TABLE: (typeof globalThis !== 'undefined' ? globalThis.TSR_POWER_SLOTS_TABLE : null),
    rollTsrPowerSlots: (typeof globalThis !== 'undefined' ? globalThis.rollTsrPowerSlots : null),
    TSR_POWER_CATEGORIES_TABLE: (typeof globalThis !== 'undefined' ? globalThis.TSR_POWER_CATEGORIES_TABLE : null),
    rollTsrPowerCategory: (typeof globalThis !== 'undefined' ? globalThis.rollTsrPowerCategory : null),
    TSR_TALENT_SLOTS_TABLE: (typeof globalThis !== 'undefined' ? globalThis.TSR_TALENT_SLOTS_TABLE : null),
    rollTsrTalentSlots: (typeof globalThis !== 'undefined' ? globalThis.rollTsrTalentSlots : null),
    TSR_CONTACT_SLOTS_TABLE: (typeof globalThis !== 'undefined' ? globalThis.TSR_CONTACT_SLOTS_TABLE : null),
    rollTsrContactSlots: (typeof globalThis !== 'undefined' ? globalThis.rollTsrContactSlots : null),
    TSR_CANONICAL_CONTACT_CATEGORIES: (typeof globalThis !== 'undefined' ? globalThis.TSR_CANONICAL_CONTACT_CATEGORIES : null),
    TSR_LIMITATION_CEILINGS: (typeof globalThis !== 'undefined' ? globalThis.TSR_LIMITATION_CEILINGS : null),
    validateTsrLimitation: (typeof globalThis !== 'undefined' ? globalThis.validateTsrLimitation : null)
  };
}

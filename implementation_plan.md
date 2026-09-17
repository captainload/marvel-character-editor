# Implementation Plan: CMF Point-Buy, Machines of Doom Inventions & UI Redesign

Transform the Marvel Super Heroes character builder into a CMF Point-Buy driven system with a clean top-row tabbed interface, expanded Machines of Doom invention engineering, prebuilt equipment reverse-engineering, and touch-accessible 1080px minimum width constraints.

## User Review Required

> [!IMPORTANT]
> **Key Architecture Decisions for Approval:**
> 1. **Removal of Dual-Pane Layout**: The UI will transition entirely to a single-view, top-row tabbed interface (Main Stats, Powers, Invention, Equipment, Talents & Contacts, Background) with character name and cheat sheet in the top header.
> 2. **CMF Point-Buy System**: Introducing standard CMF Character Point (CP) tiers (Street Level: 350 CP, Standard Superhero: 550 CP, High Powered: 800 CP, Cosmic: 1200 CP, plus Custom Budget). Ranks for FASERIP abilities, Powers (base + rank), Talents, Contacts, and Resources are purchased directly with real-time point tracking.
> 3. **No Prebuilt Characters**: Spider-Man, Cap, and Wolverine presets are retired in favor of starting clean in the Point-Buy builder.
> 4. **1080px Minimum Width & Detection**: The container enforces `min-width: 1080px`. Any viewport `< 1080px` triggers an alert banner: *"Please switch to portrait mode on mobile or use a larger screen."*
> 5. **Machines of Doom Invention Expansion**: Full support for device types (Weapons, Battlesuits, Robots/Drones, Utility), power boosts (Area Effect, Armor Piercing, Overcharge), and limitations (Limited Charges, Tether, 1-Turn Cooldown, Feedback), plus reverse-engineering costs for rulebook prebuilt equipment (with unique items like Cap's Shield or Mjolnir locked as non-reproducible).
> 6. **Typography & Touch Target Rules**: Absolute minimum font size of **10pt (13.33px)** across the entire application, with touch targets $\ge 44\text{px}$.

---

## Proposed Changes

### 1. Data Layer & Equipment Database
#### [MODIFY] [`data_equipment.js`](file:///H:/My%20Drive/RPG%20development/Marvel/data_equipment.js)
- Expand the equipment catalog with items from the *Player's Book*, *MA8 Weapons Locker*, and *Machines of Doom*.
- Add explicit metadata to each item:
  - `costRank`: Resource rank required to purchase directly in the Equipment tab.
  - `isUnique`: Boolean flag. Items like Captain America's Shield, Mjolnir, and Infinity Gems are marked `isUnique: true` with `nonReproducible: true`.
  - `inventionSpecs`: Base Power rank, material strength, complexity, and reverse-engineering requirements for the Invention tab.

---

### 2. Invention & Engineering Engine
#### [MODIFY] [`inventions.js`](file:///H:/My%20Drive/RPG%20development/Marvel/inventions.js)
- Integrate *Machines of Doom* rules from the *Lands of Dr. Doom* boxed set (TSR 6891):
  - **Device Categories**: Weapons, Battlesuits & Exosuits, Robots & Drones (with AI processor Reason/Intuition/Psyche chips), Utility & Gadgets.
  - **Power Interface Integration**: Select any superpower from the UPB catalog to embed into the invention.
  - **Hardware Boosts** (+1CS Difficulty / Build Time):
    - *Area Effect*
    - *Armor Piercing*
    - *Overcharge Capacitor* (+1CS power output for 1 round)
    - *Extended Range*
    - *Autonomous AI Target Acquisition*
  - **Hardware Limitations & Flaws** (-1CS Difficulty / Build Time):
    - *Limited Charges / Ammo* (e.g., 3-5 shots)
    - *External Power Tether* (requires heavy backpack generator or vehicle mount)
    - *Bulky / Two-Handed* (requires high Strength or 2 hands)
    - *1-Turn Cooldown* (requires a full turn to recycle before firing again)
    - *Burnout / Feedback Risk* (roll of 01-05 causes temporary component burnout)
  - **Prebuilt Equipment Reverse-Engineering**:
    - A dedicated method `reverseEngineerPrebuilt(itemId)` that computes the Resource check, Reason blueprint check, and construction days to manufacture any non-unique catalog item.
    - Prevents reproduction of unique items with an explicit rules citation.

---

### 3. Character Model & CMF Point-Buy Engine
#### [MODIFY] [`character_model.js`](file:///H:/My%20Drive/RPG%20development/Marvel/character_model.js)
- Implement the CMF Character Point (CP) calculation engine:
  - `pointBudget`: Configurable pool (350, 550, 800, 1200, or Custom).
  - `calculateSpentPoints()`:
    - **Abilities**: Rank value point-for-point (e.g., Remarkable 30 = 30 CP).
    - **Powers**: 10 CP base cost + Rank value (or 2x for starred/exceptional powers).
    - **Talents**: Flat 15 CP each.
    - **Contacts**: Flat 5 CP each.
    - **Resources**: Rank value point-for-point.
  - Remove hardcoded prebuilt hero presets; initialize with clean custom/point-buy defaults.
  - Retain S32 Collective Mass (Swarm Form) dual-profile functionality.

---

### 4. Stylesheet Refactor
#### [MODIFY] [`styles.css`](file:///H:/My%20Drive/RPG%20development/Marvel/styles.css)
- **Remove Dual-Pane Rules**: Delete `.layout-double-pane` and `.layout-single-pane` grid/column split.
- **Top Row Navigation**: Create a single responsive, touch-friendly tab bar across the top:
  `[Main Stats] [Powers] [Invention] [Equipment] [Talents & Contacts] [Background]`.
- **1080px Constraint**:
  - Set `min-width: 1080px` on `.app-container`.
  - Add styles for the viewport width warning banner (`#screen-width-warning`).
- **Typography**: Set root font size so that the absolute smallest text across badges, inputs, labels, and notes is **10pt (13.33px)**.
- **Touch-Friendly Controls**: Minimum 44px touch targets on buttons, rank steppers, tabs, and Roll20 attack chips.

---

### 5. Application UI & Views
#### [MODIFY] [`index.html`](file:///H:/My%20Drive/RPG%20development/Marvel/index.html)
- **Header**:
  - Brand logo ("MSH FASERIP"), editable Character Name input, live Point-Buy counter (`Spent: X / Total: Y`), Cheat Sheet button (`📖`), Save/Open buttons, Fullscreen button.
- **Screen Width Warning Banner**:
  - Fixed banner alerting users if screen width is under 1080px: *"⚠️ Screen Width Warning: This application requires a minimum screen width of 1080 pixels. Please switch to portrait mode on mobile or use a larger screen."*
- **Top-Row Tabs Container**:
  1. **Tab 1: Main Stats**: Point-Buy tier selector, FASERIP abilities with rank steppers, Health/Karma vitals, Defenses, Conditions, S32 Swarm profile switch, and Roll20-style Combat FEAT attack cards.
  2. **Tab 2: Powers**: Full power catalog, rank assignment, stunts, point costs, and `?` errata popups.
  3. **Tab 3: Invention**: Machines of Doom lab, Power Interface modal/selector, boosts and limits toggles, and Prebuilt Equipment reverse-engineering cost calculator.
  4. **Tab 4: Equipment**: Buyable rulebook equipment store, inventory manager, and equipped gear list.
  5. **Tab 5: Talents & Contacts**: Talents catalog with reconciled combat skills and contacts ledger.
  6. **Tab 6: Background**: Physical form, origin, identity, biographical details, and backstory.

#### [MODIFY] [`app.js`](file:///H:/My%20Drive/RPG%20development/Marvel/app.js)
- Wire top-row tabs switching.
- Add window resize listener to detect `window.innerWidth < 1080` and toggle the warning overlay.
- Wire CMF point-buy steppers and live recalculation.
- Wire the Invention Lab's Power Interface (modal to select power, assign rank, toggle boosts and limits).
- Wire the Prebuilt Equipment reverse-engineering selector.
- Remove prebuilt preset selector in favor of Point-Buy tier presets (Street, Standard, High-Powered, Cosmic).

---

## Verification Plan

### Automated Verification
- Run simulated DOM tests (`scratch/test_point_buy_and_inventions.js`) using Node.js:
  - Verify CMF point-buy math (points spent vs remaining for abilities, powers, talents, resources).
  - Verify viewport width detection triggers warning when `< 1080px`.
  - Verify Machines of Doom invention calculation with boosts (+1CS) and limitations (-1CS).
  - Verify prebuilt equipment reverse-engineering calculation and check that unique items (Shield, Mjolnir) throw an error / are blocked from manufacturing.
  - Verify that no font in `styles.css` is defined below 10pt (13.33px).

### Manual Verification
- Test in browser:
  - Switch through all 6 tabs seamlessly.
  - Adjust screen size below 1080px to verify the warning banner appears.
  - Create a character from scratch using Point-Buy points.
  - Build an invention using the Power Interface, apply boosts and limitations, and verify computed stats.
  - Purchase equipment and test reverse-engineering costs.

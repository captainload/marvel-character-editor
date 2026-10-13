# Walkthrough: v1.5.78 - Empty Character Mode Switch Save Prompt Bypass, Creation Pop-Up Auto-Close, and History Navigation Label

## Overview

In **v1.5.78**, we completed three key UX enhancements requested by the user:

1. **Bypass Save Prompt on Empty / Newly Created Characters**:
   - Previously, switching character creation modes (e.g. from CMF CP Buy to TSR Standard) triggered a prompt asking the user if they wanted to save their character first, even if the current character was completely blank with no user edits.
   - Refactored `App.isCurrentCharacterUnsaved()` to inspect actual changes:
     - Includes default names in the exclusion list (`'The Vanguard'`, `'New Superhero'`, `'Hero'`, `'Vanguard'`, `'New Character'`, `'Unnamed Hero'`).
     - Ignores baseline creation/initial log entries (`'Character created'`, `'New character created'`, `'Character loaded'`, `'Imported character'`, `'Campaign KP limit'`).
     - Evaluates `hasActualEdits`: powers, talents, contacts, equipment/armor/weapons, inventions, TSR rolls, custom CP spent beyond baseline, spent Karma, modified ability ranks, or a custom hero name/real name.
     - When `!hasActualEdits`, `isCurrentCharacterUnsaved()` immediately returns `false`, allowing instant mode switches on clean/fresh characters without annoying save prompts.
     - When any actual edits *are* present, the prompt is still reliably triggered to prevent accidental data loss.

2. **Close Creation Pop-Up on Mode Selection (Eliminate Unwanted Auto-Launches)**:
   - Selecting a creation mode from the mode picker modal (`#modal-new-character-mode`) previously closed the picker but immediately launched another modal (e.g. `#modal-tsr-generator` for TSR Standard or `#modal-character-init` for CP Buy).
   - In `applyNewCharacter()` and `handleNewCharacterModeSelection()`:
     - Removed automatic calls to `openTsrGeneratorModal()` and `openCreationWizardModal()`.
     - Explicitly called `closeNewCharacterModeModal()` and `closeCreationWizardModal()` across all initialization pathways.
     - The creation row already provides prominent `'🎲 Roll Tables'` and `'⚡ Set Tier'` buttons right next to the Mode button, allowing players to open those tools whenever they are ready.
     - The player is returned directly to the main sheet with an informative status toast upon picking a mode.

3. **Added "History:" Label to Undo / Redo Navigation**:
   - Added `<span class="tab-history-label" id="tab-history-nav-label">History:</span>` inside `.tab-history-nav` directly before the Undo (`#btn-history-back`) and Redo (`#btn-history-forward`) navigation buttons.
   - Fully styled in `styles.css` adhering to the typography standard ($\ge 10\text{pt}$, 700 bold weight, `var(--text-muted)`) with specialized theme overrides for `data-theme="manilla"` and `data-theme="aqua"`.

---

## Changes by Component

### 1. Header Navigation (`index.html`)
- Added `<span class="tab-history-label" id="tab-history-nav-label">History:</span>` inside `.tab-history-nav` directly before `#btn-history-back`.
- Synchronized version tags and asset query parameters (`app.js?v=1.5.78`, `styles.css?v=1.5.78`) to `v1.5.78`.

### 2. Stylesheet Architecture (`styles.css`)
- Added `.tab-history-label` rule with `font-size: 10pt`, `font-weight: 700`, `user-select: none`, and `white-space: nowrap`.
- Added theme color adjustments for `body[data-theme="manilla"] .tab-history-label` (`#475569`) and `body[data-theme="aqua"] .tab-history-label` (`#7dd3fc`).

### 3. Application Controller (`app.js`)
- Bumped `VERSION` to `'1.5.78'`.
- Updated `isCurrentCharacterUnsaved()`:
  - Added `'the vanguard'`, `'vanguard'`, `'new character'`, `'unnamed hero'` to default names list.
  - Excluded baseline initial/creation log entries.
  - Implemented comprehensive `hasActualEdits` check; returns `false` if no actual changes have been made.
- Updated `handleNewCharacterModeSelection()`:
  - Cleanly calls both `closeNewCharacterModeModal()` and `closeCreationWizardModal()`.
- Updated `applyNewCharacter()`:
  - Removed auto-launch calls `openTsrGeneratorModal()` and `openCreationWizardModal()`.
  - Ensures all creation modals are closed cleanly upon mode application.

### 4. Release Notes & Documentation (`version.json` & `help.html`)
- Bumped `version.json` to `1.5.78` with release notes.
- Updated header (Section 1) and footer in `help.html` to `v1.5.78`.

---

## Automated Verification Results

All tests executed with a 100% pass rate:

1. **`scratch/test_v1578_empty_char_mode_and_history_label.js`**:
   - `✓ PASS: version.json is at 1.5.78`
   - `✓ PASS: help.html contains v1.5.78`
   - `✓ PASS: index.html correctly references v1.5.78 assets`
   - `✓ PASS: app.js defines VERSION 1.5.78`
   - `✓ PASS: #tab-history-nav-label is rendered directly before undo/redo buttons`
   - `✓ PASS: styles.css contains .tab-history-label typography and theme styling`
   - `✓ PASS: Fresh blank CMF character returns isCurrentCharacterUnsaved() === false`
   - `✓ PASS: Character with default name "The Vanguard" returns isCurrentCharacterUnsaved() === false`
   - `✓ PASS: Fresh blank TSR character returns isCurrentCharacterUnsaved() === false`
   - `✓ PASS: Fresh TSR Modeled character returns isCurrentCharacterUnsaved() === false`
   - `✓ PASS: Custom character name is correctly recognized as unsaved`
   - `✓ PASS: Modified ability rank is correctly recognized as unsaved`
   - `✓ PASS: Adding a superpower is correctly recognized as unsaved`
   - `✓ PASS: Adding a talent is correctly recognized as unsaved`
   - `✓ PASS: Selecting TSR Standard closes creation pop-up without prompting to save and without auto-launching TSR Generator`
   - `✓ PASS: Selecting CMF CP Buy closes creation pop-up without auto-launching Creation Wizard`
   - `✓ PASS: Mode change correctly prompts to save when character has real edits`

2. **Core Regression Suites**:
   - `scratch/test_blocking_rules.js`: Passed (100%)
   - `scratch/test_tsr_generator_randomness.js`: Passed (100%)

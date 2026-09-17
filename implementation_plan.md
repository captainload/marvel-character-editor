# Implementation Plan: Resource Points Rule Option & Equipment Store Modal Sizing

Implement a rule option for **Resource Points** (monthly budget = $4 \times \text{Resource Number}$, items cost their rank values, spent points tracked on the Background tab, with Resource Rank and Points displayed in the Equipment Store header) and expand the **Equipment Store modal** to reach within 2px of the top and bottom borders.

## User Review Required

> [!IMPORTANT]
> **Summary of Proposed Mechanics:**
> 1. **Equipment Store Modal Dimensions**:
>    - Sized to within 2px of all viewport edges (`padding: 2px` on overlay, `height: calc(100vh - 4px)`, `max-height: calc(100vh - 4px)`).
> 2. **"Resource Points" Rule Option**:
>    - Configurable in the **Options modal (⚙️)** via `<input type="checkbox" id="option-resource-points">`, persisted in `localStorage` (`msh_option_resource_points`) and saved directly on the character model (`character.useResourcePoints`).
>    - **Monthly Budget Calculation**: `Monthly Resource Points = 4 × Resource Number` (e.g., Typical 6 Resources yields 24 RP/month; Good 10 yields 40 RP/month; Remarkable 30 yields 120 RP/month).
>    - **Item Cost**: Equipment and gear cost their rank numbers in RP (e.g., Poor item = 4 RP, Good item = 10 RP, Remarkable item = 30 RP).
>    - **Deduction on Purchase**: When an item is procured, its cost is automatically deducted from remaining points and added to `character.spentResourcePoints`.
>    - **Background Tab Tracking**: A dedicated card on Tab 6 (Background) tracks Resource Rank, Monthly Budget ($4\times$), Spent Points, Available Remaining Points, and includes a "Reset Month" button to start a fresh monthly cycle.
>    - **Side-by-Side Resource Rank**: The character's Resource Rank is prominently displayed directly next to the Resource Points ledger on the Background tab.
>    - **Equipment Store Header**: The top of the Equipment Store modal displays the character's Resource Rank at all times, and also displays real-time available and spent Resource Points when the rule is enabled.

---

## Proposed Changes

### Stylesheet & Layout
#### [MODIFY] [styles.css](file:///C:/Users/admin/.gemini/antigravity/brain/90637841-9270-481f-944c-4ab42ceec14e/styles.css)
- Change `#equipment-store-modal.modal-overlay` padding from `padding-left: 2px; padding-right: 2px;` to `padding: 2px;`.
- Change `.modal-box.store-modal-box` height from `height: 85vh; max-height: 85vh;` to `height: calc(100vh - 4px); max-height: calc(100vh - 4px);`.
- Add styling for the Equipment Store top header Resource Points badge (`#store-resource-status-badge`) ensuring perfect readability across Four-color, Manilla, and Aqua themes with font size $\ge 10\text{pt}$.
- Add styling for the Background tab Financial Resources card (`#card-financial-resources`) with budget meters, badges, and action buttons.

---

### Character Data Model
#### [MODIFY] [character_model.js](file:///C:/Users/admin/.gemini/antigravity/brain/90637841-9270-481f-944c-4ab42ceec14e/character_model.js)
- Add `this.spentResourcePoints = parseInt(initialData.spentResourcePoints ?? 0);` and `this.useResourcePoints = !!initialData.useResourcePoints;`.
- Implement `getResourcePointsBudget()`: returns `this.resources.rankValue * 4`.
- Implement `getAvailableResourcePoints()`: returns `Math.max(0, this.getResourcePointsBudget() - (this.spentResourcePoints || 0))`.
- Implement `spendResourcePoints(points)`: increments `this.spentResourcePoints` and returns available points.
- Implement `resetMonthlyResourcePoints()`: resets `this.spentResourcePoints = 0`.
- Update `toJSON()` and `fromJSON()` to serialize and restore `spentResourcePoints` and `useResourcePoints`.

---

### Application User Interface
#### [MODIFY] [index.html](file:///C:/Users/admin/.gemini/antigravity/brain/90637841-9270-481f-944c-4ab42ceec14e/index.html)
- In `#options-modal`: Add a dedicated section **"Resource & Economy Rules"** containing the checkbox toggle `<input type="checkbox" id="option-resource-points">` with explanatory tooltip and descriptive text.
- In `#tab-pane-background` (Tab 6: Background): Add the new **"💰 Financial Resources & Monthly Resource Points"** card displaying:
  - Resource Rank selector / display (e.g., `Typical (6)`)
  - Monthly Resource Points Budget ($4\times$)
  - Spent Resource Points this month (with manual adjust field)
  - Available Remaining Resource Points
  - "🔄 Reset for New Month" button
  - Contextual guidance explaining the rule or indicating standard TSR FEAT rules when inactive.
- In `#equipment-store-modal` header: Add `#store-resource-status-badge` to display character Resource Rank and (if enabled) Available / Spent Resource Points.

---

### Application Logic & Procurement
#### [MODIFY] [app.js](file:///C:/Users/admin/.gemini/antigravity/brain/90637841-9270-481f-944c-4ab42ceec14e/app.js)
- Initialize `this.useResourcePoints` from `localStorage` (`msh_option_resource_points`) and synchronize with character data.
- Wire `setUseResourcePoints(enabled)` to update the option checkbox, re-render the Background tab and Store header, and persist changes.
- Update `renderBackground()` to render the Financial Resources card, bind the Resource Rank selector, spent points input, and month reset button.
- Update `openEquipmentStore()` and `renderEquipment()` to refresh `#store-resource-status-badge` at the top of the store modal with Resource Rank and real-time Resource Points.
- In `renderEquipment()`, display RP cost in the cost column when Resource Points is enabled.
- Update `evaluateProcurement()` and `openProcurementModal()`:
  - If Resource Points rule is active, evaluate available RP against item cost.
  - Present a direct `💳 Spend [Cost] RP & Acquire` button if affordable, or show deficit warning with GM loan/override option if unaffordable.
- In `finalizeItemAcquisition()`, deduct item RP cost when Resource Points rule is active.

---

## Verification Plan

### Automated Tests
Create and run a comprehensive verification script `scratch/test_resource_points_rule.js`:
- Verify modal CSS rules enforce 2px margins on top, bottom, left, and right.
- Verify `getResourcePointsBudget()` computes exactly $4 \times \text{Resource Number}$ for all TSR ranks (Feeble 2 $\to$ 8, Typical 6 $\to$ 24, Good 10 $\to$ 40, Remarkable 30 $\to$ 120, etc.).
- Verify item acquisition automatically deducts points from `spentResourcePoints`.
- Verify month reset restores available points to full budget.
- Verify serialization in `toJSON()` and restoration in `fromJSON()`.
- Verify UI elements exist in `index.html` (Options checkbox, Background financial card, Store header badge).
- Run all existing regression test suites (`test_tsr_talents_only.js`, `test_cheatsheet_contrast_and_stability.js`, `verify_all_catalogs.js`).

### Manual Verification
- Launch preview in browser:
  1. Open Equipment Store modal: verify it fills the screen with 2px margins on all 4 borders (top, bottom, left, right).
  2. Verify Equipment Store header displays `Resources: Typical (6)`.
  3. Open Options (⚙️), enable "Use Resource Points Rule".
  4. Verify Store header updates to show `Resources: Typical (6) • Available: 24 / 24 RP (Spent: 0 RP)`.
  5. Procure an item costing 10 RP (Good): verify 10 RP is deducted, leaving 14 RP available.
  6. Switch to Background tab: verify the Financial Resources card shows Resource Rank Typical (6), 24 RP Budget, 10 RP Spent, and 14 RP Available.
  7. Click "Reset for New Month": verify Spent resets to 0 and Available returns to 24 RP.

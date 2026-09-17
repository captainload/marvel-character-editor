/**
 * Marvel Super Heroes (FASERIP) - Application Controller
 * Connects CMF Point-Buy System, Top-Row Tabbed UI, Universal Action Table,
 * Machines of Doom Inventions Lab, Prebuilt Equipment Store, and 1080px Width Detection.
 */

const App = {
  character: null,
  activeTab: 'main-stats',
  activeCheatTab: 'combat',
  activeRoller: null,
  rollerShift: 0,
  rollerKarmaSpend: 0,
  rollerPoppedOut: false,
  touchFriendly: false,
  currentTheme: 'four-color',
  storeFilterQuery: '',
  storeFilterCategory: 'all',
  storeAccessFilter: ['all'],
  storeMilitaryAccess: false,
  storeBlackMarketAccess: false,
  storeShieldAccess: false,
  activeProcurementItem: null,
  areaDivisionRule: 'standard',
  currentInventionProject: null,
  invPowers: [],
  invAbilityBoosts: [],
  invSourceType: 'tech',
  invStageStatus: {
    blueprint: null,
    resource: null,
    procurement: null,
    assembly: null
  },
  isWidthWarningDismissed: false,

  init() {
    // 1. Viewport Width 1080px Check
    this.checkViewportWidth();
    window.addEventListener('resize', () => this.checkViewportWidth());

    // 2. Restore store access toggles from localStorage
    if (typeof localStorage !== 'undefined') {
      this.storeMilitaryAccess = localStorage.getItem('msh_store_military_access') === 'true';
      this.storeBlackMarketAccess = localStorage.getItem('msh_store_blackmarket_access') === 'true';
      this.storeShieldAccess = localStorage.getItem('msh_store_shield_access') === 'true';
    }

    // 3. Load character from localStorage or create fresh CMF Point-Buy character
    const saved = localStorage.getItem('msh_current_character_v2');
    if (saved) {
      try {
        this.character = FASERIPCharacter.fromJSON(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to parse saved character, loading fresh CMF hero', e);
        this.character = FASERIPCharacter.createBlankCharacter('400');
      }
    } else {
      this.character = FASERIPCharacter.createBlankCharacter('400');
    }

    // 4. Setup UI listeners and populate static selectors
    this.setupEventListeners();
    this.initRollerWindow();
    this.populateDropdowns();
    this.updateStoreClearancesUI();
    this.render();
  },

  checkViewportWidth() {
    const banner = document.getElementById('screen-width-warning');
    if (!banner || this.isWidthWarningDismissed) return;
    if (window.innerWidth < 1080) {
      banner.classList.add('visible');
    } else {
      banner.classList.remove('visible');
    }
  },

  saveState() {
    if (this.character) {
      localStorage.setItem('msh_current_character_v2', JSON.stringify(this.character.toJSON()));
    }
  },

  setupEventListeners() {
    // Screen Width Warning Dismiss
    const dismissBtn = document.getElementById('btn-dismiss-width-warning');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        this.isWidthWarningDismissed = true;
        const banner = document.getElementById('screen-width-warning');
        if (banner) banner.classList.remove('visible');
      });
    }

    // Top-Row Tabs Navigation
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Character Name Header Input
    const nameInput = document.getElementById('header-char-name');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        this.character.name = e.target.value;
        this.saveState();
      });
    }

    // CMF Point-Buy Tier Selector
    const tierSelect = document.getElementById('point-tier-select');
    if (tierSelect) {
      tierSelect.addEventListener('change', (e) => {
        const customBox = document.getElementById('custom-budget-box');
        if (e.target.value === 'custom') {
          customBox.style.display = 'flex';
        } else {
          customBox.style.display = 'none';
          this.character.setPointTier(e.target.value);
          this.saveState();
          this.renderPointBuy();
        }
      });
    }

    const applyCustomBtn = document.getElementById('btn-apply-custom-budget');
    if (applyCustomBtn) {
      applyCustomBtn.addEventListener('click', () => {
        const val = parseInt(document.getElementById('input-custom-budget').value) || 550;
        this.character.setPointTier('custom', val);
        this.saveState();
        this.renderPointBuy();
      });
    }

    // Quick Vitals Steppers
    const setupStepper = (id, delta, isKarma = false) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () => {
          if (isKarma) {
            this.character.updateKarma(delta, delta > 0 ? 'Quick Karma Bonus' : 'Quick Karma Spend');
          } else {
            this.character.updateHealth(delta);
          }
          this.saveState();
          this.renderVitals();
        });
      }
    };

    setupStepper('btn-health-minus10', -10);
    setupStepper('btn-health-minus1', -1);
    setupStepper('btn-health-plus1', 1);
    setupStepper('btn-health-plus10', 10);
    setupStepper('btn-karma-minus10', -10, true);
    setupStepper('btn-karma-plus10', 10, true);

    // Conditions Management
    const addCondBtn = document.getElementById('btn-add-condition');
    if (addCondBtn) {
      addCondBtn.addEventListener('click', () => {
        const inp = document.getElementById('input-new-condition');
        if (inp && inp.value.trim()) {
          this.character.addCondition(inp.value.trim());
          inp.value = '';
          this.saveState();
          this.renderConditions();
        }
      });
    }

    // Cheat Sheet Modal Button & Modal Closes
    const cheatBtn = document.getElementById('btn-cheatsheet');
    if (cheatBtn) {
      cheatBtn.addEventListener('click', () => this.openCheatSheet());
    }

    document.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.remove('open');
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (overlay.id === 'roller-modal' && this.rollerPoppedOut) return;
        if (e.target === overlay) overlay.classList.remove('open');
      });
    });

    // Die Roller Dialog Trigger Actions
    const rollTriggerBtn = document.getElementById('btn-roller-roll');
    if (rollTriggerBtn) {
      rollTriggerBtn.addEventListener('click', () => this.executeRollerFEAT());
    }

    // Stepper Listeners (Replacing Slider)
    const btnShiftDown = document.getElementById('btn-roller-shift-down');
    if (btnShiftDown) {
      btnShiftDown.addEventListener('click', () => {
        if (this.rollerShift > -5) {
          this.rollerShift--;
          this.updateRollerPreview();
        }
      });
    }

    const btnShiftUp = document.getElementById('btn-roller-shift-up');
    if (btnShiftUp) {
      btnShiftUp.addEventListener('click', () => {
        if (this.rollerShift < 5) {
          this.rollerShift++;
          this.updateRollerPreview();
        }
      });
    }

    // Auto-update Exceptional/Starred checkbox when selecting power
    const pCatSelect = document.getElementById('select-power-catalog');
    if (pCatSelect) {
      pCatSelect.addEventListener('change', () => this.syncPowerSelectionUI());
    }

    // Add Power Button (Powers Tab)
    const addPowerBtn = document.getElementById('btn-add-power');
    if (addPowerBtn) {
      addPowerBtn.addEventListener('click', () => this.handleAddPower());
    }

    // Inventions Buttons & Multi-Power / Boost Actions
    const btnAddInvPwr = document.getElementById('btn-add-inv-power');
    if (btnAddInvPwr) {
      btnAddInvPwr.addEventListener('click', (e) => this.addInvPower(e));
    }

    const btnAddInvBst = document.getElementById('btn-add-inv-boost');
    if (btnAddInvBst) {
      btnAddInvBst.addEventListener('click', () => this.addInvAbilityBoost());
    }

    const invAddedPwrList = document.getElementById('inv-added-powers-list');
    if (invAddedPwrList) {
      invAddedPwrList.addEventListener('click', (e) => {
        const delBtn = e.target.closest('[data-del-inv-power]');
        if (delBtn) {
          const pId = delBtn.getAttribute('data-del-inv-power');
          this.removeInvPower(pId);
        }
      });
    }

    const invAddedBstList = document.getElementById('inv-added-boosts-list');
    if (invAddedBstList) {
      invAddedBstList.addEventListener('click', (e) => {
        const delBtn = e.target.closest('[data-del-inv-boost]');
        if (delBtn) {
          const bId = delBtn.getAttribute('data-del-inv-boost');
          this.removeInvAbilityBoost(bId);
        }
      });
    }

    const btnRollBlueprint = document.getElementById('btn-roll-inv-blueprint');
    if (btnRollBlueprint) {
      btnRollBlueprint.addEventListener('click', (e) => this.rollInventionStageFEAT('blueprint', e));
    }

    const btnRollResource = document.getElementById('btn-roll-inv-resource');
    if (btnRollResource) {
      btnRollResource.addEventListener('click', (e) => this.rollInventionStageFEAT('procurement', e));
    }

    const btnRollAssembly = document.getElementById('btn-roll-inv-assembly');
    if (btnRollAssembly) {
      btnRollAssembly.addEventListener('click', (e) => this.rollInventionStageFEAT('assembly', e));
    }

    const btnInvTech = document.getElementById('btn-inv-toggle-tech');
    if (btnInvTech) {
      btnInvTech.addEventListener('click', () => this.setInventionSourceType('tech'));
    }

    const btnInvMagic = document.getElementById('btn-inv-toggle-magic');
    if (btnInvMagic) {
      btnInvMagic.addEventListener('click', () => this.setInventionSourceType('magic'));
    }

    const btnInvNew = document.getElementById('btn-inv-new');
    if (btnInvNew) {
      btnInvNew.addEventListener('click', (e) => this.handleNewInvention(e));
    }

    const invCalcBtn = document.getElementById('btn-calc-invention');
    if (invCalcBtn) {
      invCalcBtn.addEventListener('click', () => this.handleCalculateInvention());
    }

    // Reactive Real-Time Auto-Calculation for Invention Controls
    const invInputIds = [
      'inv-name', 'inv-cat', 'inv-material-rank',
      'inv-boost-area', 'inv-boost-piercing', 'inv-boost-overcharge', 'inv-boost-range', 'inv-boost-ai',
      'inv-limit-ammo', 'inv-limit-tether', 'inv-limit-bulky', 'inv-limit-cooldown', 'inv-limit-burnout'
    ];
    invInputIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', () => this.handleCalculateInvention());
        if (el.tagName === 'INPUT' && el.type === 'text') {
          el.addEventListener('input', () => this.handleCalculateInvention());
        }
      }
    });

    const invAddGearBtn = document.getElementById('btn-add-invention-to-gear');
    if (invAddGearBtn) {
      invAddGearBtn.addEventListener('click', (e) => this.handleAddInventionToGear(e));
    }

    const revEngCalcBtn = document.getElementById('btn-calc-reverse-engineer');
    if (revEngCalcBtn) {
      revEngCalcBtn.addEventListener('click', (e) => this.handleReverseEngineer(e));
    }

    const btnClearRev = document.getElementById('btn-clear-reverse-engineer');
    if (btnClearRev) {
      btnClearRev.addEventListener('click', () => this.cancelReverseEngineer());
    }

    const btnCancelRev = document.getElementById('btn-cancel-reverse-engineer');
    if (btnCancelRev) {
      btnCancelRev.addEventListener('click', () => this.cancelReverseEngineer());
    }

    const revItemSel = document.getElementById('select-reverse-engineer-item');
    if (revItemSel) {
      revItemSel.addEventListener('change', (e) => {
        if (!e.target.value) {
          this.cancelReverseEngineer();
        }
      });
    }

    // Known Blueprints Controls
    const quickBpSel = document.getElementById('select-quick-load-blueprint');
    if (quickBpSel) {
      quickBpSel.addEventListener('change', (e) => {
        const bpId = e.target.value;
        if (bpId) {
          this.loadKnownBlueprint(bpId);
          e.target.value = '';
        }
      });
    }

    const filterBpInp = document.getElementById('filter-known-blueprints');
    if (filterBpInp) {
      filterBpInp.addEventListener('input', () => this.renderKnownBlueprints());
    }

    const bpContainer = document.getElementById('known-blueprints-container');
    if (bpContainer) {
      bpContainer.addEventListener('click', (e) => {
        const loadBtn = e.target.closest('.btn-load-blueprint');
        if (loadBtn) {
          const bpId = loadBtn.getAttribute('data-bp-id');
          if (bpId) this.loadKnownBlueprint(bpId, e);
          return;
        }
        const delBtn = e.target.closest('.btn-delete-blueprint');
        if (delBtn) {
          const bpId = delBtn.getAttribute('data-bp-id');
          if (bpId) this.deleteKnownBlueprint(bpId, e);
          return;
        }
      });
    }

    // Talents & Contacts Buttons
    const addTalentBtn = document.getElementById('btn-add-talent');
    if (addTalentBtn) {
      addTalentBtn.addEventListener('click', (e) => this.handleAddTalent(e));
    }

    const selectTalentCat = document.getElementById('select-talent-catalog');
    if (selectTalentCat) {
      selectTalentCat.addEventListener('change', () => this.updateTalentSpecializationInput());
    }

    const inputTalentSpec = document.getElementById('input-talent-specialization');
    if (inputTalentSpec) {
      inputTalentSpec.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleAddTalent(e);
        }
      });
    }

    const addContactBtn = document.getElementById('btn-add-contact');
    if (addContactBtn) {
      addContactBtn.addEventListener('click', () => this.handleAddContact());
    }

    // Export & Import
    const exportBtn = document.getElementById('btn-export');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportCharacter());
    }

    const importInput = document.getElementById('import-file-input');
    if (importInput) {
      importInput.addEventListener('change', (e) => this.importCharacter(e));
    }

    // Sticky Header Preference Init & Listener
    const stickyOpt = document.getElementById('option-sticky-header');
    const savedSticky = typeof localStorage !== 'undefined' ? localStorage.getItem('msh_option_sticky_header') : null;
    const isSticky = savedSticky === 'true' || savedSticky === null; // default to true
    if (document.body) {
      if (isSticky) {
        document.body.classList.add('sticky-header-active');
        if (stickyOpt) stickyOpt.checked = true;
      } else {
        document.body.classList.remove('sticky-header-active');
        if (stickyOpt) stickyOpt.checked = false;
      }
    }

    if (stickyOpt) {
      stickyOpt.addEventListener('change', (e) => {
        const active = e.target.checked;
        if (document.body) document.body.classList.toggle('sticky-header-active', active);
        if (typeof localStorage !== 'undefined') localStorage.setItem('msh_option_sticky_header', active ? 'true' : 'false');
      });
    }

    // Area Division Tactical Grid Preference Init & Listener
    const areaOpt = document.getElementById('option-area-division');
    const savedAreaRule = typeof localStorage !== 'undefined' ? localStorage.getItem('msh_option_area_division') : null;
    this.areaDivisionRule = savedAreaRule || 'standard';
    if (areaOpt) areaOpt.value = this.areaDivisionRule;
    this.updateAreaDivisionDisplay();

    if (areaOpt) {
      areaOpt.addEventListener('change', (e) => {
        this.setAreaDivisionRule(e.target.value);
      });
    }

    // Resource Points Rule Preference Init & Listener
    const resPtsOpt = document.getElementById('option-resource-points');
    const savedResPts = typeof localStorage !== 'undefined' ? localStorage.getItem('msh_option_resource_points') : null;
    this.useResourcePoints = savedResPts === 'true';
    if (this.character && this.character.useResourcePoints !== undefined && savedResPts === null) {
      this.useResourcePoints = !!this.character.useResourcePoints;
    }
    if (this.character) {
      this.character.useResourcePoints = this.useResourcePoints;
    }
    if (resPtsOpt) {
      resPtsOpt.checked = this.useResourcePoints;
      resPtsOpt.addEventListener('change', (e) => {
        this.setUseResourcePoints(e.target.checked);
      });
    }

    // File / Options Dropdown Menu Toggle
    const btnFileOptions = document.getElementById('btn-file-options');
    const fileOptionsMenu = document.getElementById('file-options-menu');
    if (btnFileOptions && fileOptionsMenu) {
      btnFileOptions.addEventListener('click', (e) => {
        e.stopPropagation();
        fileOptionsMenu.classList.toggle('open');
      });
      if (typeof document.addEventListener === 'function') {
        document.addEventListener('click', (e) => {
          if (!e.target.closest || !e.target.closest('#file-options-dropdown-container')) {
            fileOptionsMenu.classList.remove('open');
            const flyout = document.getElementById('theme-flyout-menu');
            if (flyout) flyout.classList.remove('open');
          }
        });
      }
    }

    const menuItemSave = document.getElementById('menu-item-save');
    if (menuItemSave) {
      menuItemSave.addEventListener('click', () => {
        if (fileOptionsMenu) fileOptionsMenu.classList.remove('open');
        this.exportCharacter();
      });
    }

    const menuItemOptions = document.getElementById('menu-item-options');
    if (menuItemOptions) {
      menuItemOptions.addEventListener('click', () => {
        if (fileOptionsMenu) fileOptionsMenu.classList.remove('open');
        const optModal = document.getElementById('options-modal');
        if (optModal) optModal.classList.add('open');
      });
    }

    // Touch-Friendly Sizing Preference Init & Listeners
    const savedTouch = typeof localStorage !== 'undefined' ? localStorage.getItem('msh_option_touch_friendly') : null;
    this.setTouchFriendly(savedTouch === 'true');

    const touchOpt = document.getElementById('option-touch-friendly');
    if (touchOpt) {
      touchOpt.addEventListener('change', (e) => {
        this.setTouchFriendly(e.target.checked);
      });
    }

    const menuTouchToggle = document.getElementById('menu-item-touch-toggle');
    if (menuTouchToggle) {
      menuTouchToggle.addEventListener('click', () => {
        if (fileOptionsMenu) fileOptionsMenu.classList.remove('open');
        this.setTouchFriendly(!this.touchFriendly);
      });
    }

    // Visual Theme Preference Init & Listeners
    const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('msh_option_theme') : null;
    this.setTheme(savedTheme || 'four-color');

    const themeOpt = document.getElementById('option-theme');
    if (themeOpt) {
      themeOpt.addEventListener('change', (e) => {
        this.setTheme(e.target.value);
      });
    }

    // Theme Flyout Submenu Listeners
    const themeFlyoutBtn = document.getElementById('menu-item-theme-flyout');
    const themeFlyoutMenu = document.getElementById('theme-flyout-menu');
    if (themeFlyoutBtn && themeFlyoutMenu) {
      themeFlyoutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeFlyoutMenu.classList.toggle('open');
        // Smart screen clamp if flyout overflows left edge
        if (themeFlyoutMenu.classList.contains('open') && typeof themeFlyoutMenu.getBoundingClientRect === 'function') {
          const rect = themeFlyoutMenu.getBoundingClientRect();
          if (rect.left < 10) {
            themeFlyoutMenu.style.right = 'auto';
            themeFlyoutMenu.style.left = '0';
            themeFlyoutMenu.style.top = '100%';
          } else {
            themeFlyoutMenu.style.right = '100%';
            themeFlyoutMenu.style.left = 'auto';
            themeFlyoutMenu.style.top = '-6px';
          }
        }
      });
    }

    if (typeof document !== 'undefined' && typeof document.querySelectorAll === 'function') {
      const themeBtns = document.querySelectorAll('.theme-option-btn');
      if (themeBtns && typeof themeBtns.forEach === 'function') {
        themeBtns.forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const val = btn.getAttribute('data-theme-val');
            if (val) this.setTheme(val);
            if (themeFlyoutMenu) themeFlyoutMenu.classList.remove('open');
            if (fileOptionsMenu) fileOptionsMenu.classList.remove('open');
          });
        });
      }
    }

    // Stunt Modal Listeners
    const btnCancelStunt = document.getElementById('btn-cancel-stunt');
    if (btnCancelStunt) {
      btnCancelStunt.addEventListener('click', () => {
        const stuntModal = document.getElementById('stunt-modal');
        if (stuntModal) stuntModal.classList.remove('open');
      });
    }

    const btnSaveStunt = document.getElementById('btn-save-stunt');
    if (btnSaveStunt) {
      btnSaveStunt.addEventListener('click', () => this.handleSaveStunt());
    }

    const stuntEmulateCheck = document.getElementById('stunt-emulate-check');
    const stuntEmulateRow = document.getElementById('stunt-emulate-select-row');
    if (stuntEmulateCheck && stuntEmulateRow) {
      stuntEmulateCheck.addEventListener('change', (e) => {
        stuntEmulateRow.style.display = e.target.checked ? 'block' : 'none';
      });
    }

    // Search & Filter Listeners for Vast Catalogs
    const pFilter = document.getElementById('filter-power-search');
    if (pFilter) {
      pFilter.addEventListener('input', (e) => this.renderPowerDropdown(e.target.value));
    }

    const invPFilter = document.getElementById('filter-inv-power-search');
    if (invPFilter) {
      invPFilter.addEventListener('input', (e) => this.renderInvPowerDropdown(e.target.value));
    }

    const tFilter = document.getElementById('filter-talent-search');
    if (tFilter) {
      tFilter.addEventListener('input', (e) => this.renderTalentDropdown(e.target.value));
    }

    const storeFilter = document.getElementById('filter-store-search');
    if (storeFilter) {
      storeFilter.addEventListener('input', (e) => {
        this.storeFilterQuery = e.target.value;
        this.renderEquipment();
      });
    }

    const btnClearStoreSearch = document.getElementById('btn-clear-store-search');
    if (btnClearStoreSearch) {
      btnClearStoreSearch.addEventListener('click', () => {
        this.clearStoreFilters();
      });
    }

    const btnOpenStore = document.getElementById('btn-open-equipment-store');
    if (btnOpenStore) {
      btnOpenStore.addEventListener('click', () => this.openEquipmentStore());
    }

    const storeCatBtns = document.querySelectorAll('#store-category-filter-group .store-filter-btn');
    storeCatBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-store-cat') || 'all';
        this.setStoreCategory(cat);
      });
    });

    // Store Access Clearances Toggles (Military, Black Market, S.H.I.E.L.D.)
    const toggleMil = document.getElementById('toggle-store-military');
    if (toggleMil) {
      toggleMil.addEventListener('click', () => {
        this.storeMilitaryAccess = !this.storeMilitaryAccess;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('msh_store_military_access', this.storeMilitaryAccess);
        }
        this.updateStoreClearancesUI();
        this.renderEquipment();
      });
    }

    const toggleBM = document.getElementById('toggle-store-blackmarket');
    if (toggleBM) {
      toggleBM.addEventListener('click', () => {
        this.storeBlackMarketAccess = !this.storeBlackMarketAccess;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('msh_store_blackmarket_access', this.storeBlackMarketAccess);
        }
        this.updateStoreClearancesUI();
        this.renderEquipment();
      });
    }

    const toggleShield = document.getElementById('toggle-store-shield');
    if (toggleShield) {
      toggleShield.addEventListener('click', () => {
        this.storeShieldAccess = !this.storeShieldAccess;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('msh_store_shield_access', this.storeShieldAccess);
        }
        this.updateStoreClearancesUI();
        this.renderEquipment();
      });
    }

    // Store Access Filter Buttons
    const storeAccessBtns = document.querySelectorAll('#store-access-filter-group .store-access-filter-btn');
    storeAccessBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const acc = btn.getAttribute('data-store-access') || 'all';
        this.setStoreAccessFilter(acc);
      });
    });

    // Equipment Store Description Persistent Hover Tooltip
    const storeDescTooltip = document.getElementById('store-desc-hover-tooltip');
    const storeTableBody = document.getElementById('store-equipment-tbody');
    const equipStoreModal = document.getElementById('equipment-store-modal');

    if (storeDescTooltip && storeTableBody) {
      let activeClamp = null;

      const positionStoreTooltip = (clientX, clientY) => {
        if (!storeDescTooltip || storeDescTooltip.style.display === 'none') return;
        const tipWidth = storeDescTooltip.offsetWidth || 380;
        const tipHeight = storeDescTooltip.offsetHeight || 100;

        let left = clientX + 16;
        let top = clientY + 12;

        if (left + tipWidth > window.innerWidth - 12) {
          left = clientX - tipWidth - 16;
        }
        if (left < 10) left = 10;

        if (top + tipHeight > window.innerHeight - 12) {
          top = window.innerHeight - tipHeight - 12;
        }
        if (top < 10) top = 10;

        storeDescTooltip.style.left = `${left}px`;
        storeDescTooltip.style.top = `${top}px`;
      };

      const hideStoreTooltip = () => {
        if (storeDescTooltip) {
          storeDescTooltip.style.display = 'none';
          storeDescTooltip.innerHTML = '';
        }
        activeClamp = null;
      };

      storeTableBody.addEventListener('mouseover', (e) => {
        const clamp = (e.target && typeof e.target.closest === 'function') 
          ? e.target.closest('.store-desc-clamp') 
          : null;
        if (!clamp) return;
        if (clamp === activeClamp) return;

        activeClamp = clamp;
        const desc = (typeof clamp.getAttribute === 'function') ? clamp.getAttribute('data-desc-full') : clamp['data-desc-full'];
        const name = (typeof clamp.getAttribute === 'function') ? clamp.getAttribute('data-desc-title') : 'Item Description';

        if (!desc) {
          hideStoreTooltip();
          return;
        }

        storeDescTooltip.innerHTML = `
          <div style="font-weight: 700; color: var(--marvel-gold); margin-bottom: 4px; font-size: 10.5pt;">${name}</div>
          <div style="font-size: 10pt; line-height: 1.45;">${desc}</div>
        `;
        storeDescTooltip.style.display = 'block';
        positionStoreTooltip(e.clientX || 0, e.clientY || 0);
      });

      storeTableBody.addEventListener('mousemove', (e) => {
        if (activeClamp && storeDescTooltip.style.display === 'block') {
          positionStoreTooltip(e.clientX || 0, e.clientY || 0);
        }
      });

      storeTableBody.addEventListener('mouseout', (e) => {
        const clamp = (e.target && typeof e.target.closest === 'function') 
          ? e.target.closest('.store-desc-clamp') 
          : null;
        if (clamp) {
          const related = e.relatedTarget;
          if (!related || (typeof clamp.contains === 'function' && !clamp.contains(related))) {
            hideStoreTooltip();
          }
        }
      });

      const storeTableScroll = (typeof storeTableBody.closest === 'function') 
        ? storeTableBody.closest('div') 
        : null;
      if (storeTableScroll && typeof storeTableScroll.addEventListener === 'function') {
        storeTableScroll.addEventListener('scroll', hideStoreTooltip, { passive: true });
      }

      if (equipStoreModal) {
        equipStoreModal.addEventListener('click', (e) => {
          if (e.target.classList.contains('modal-close-btn') || e.target.classList.contains('modal-close') || e.target === equipStoreModal) {
            hideStoreTooltip();
          }
        });
      }
    }

    // Procurement Modal Close Listeners
    const btnCloseProc = document.getElementById('btn-close-procurement');
    if (btnCloseProc) {
      btnCloseProc.addEventListener('click', () => this.closeProcurementModal());
    }
    const btnCancelProc = document.getElementById('btn-cancel-procure');
    if (btnCancelProc) {
      btnCancelProc.addEventListener('click', () => this.closeProcurementModal());
    }

    // Preview "?" Buttons adjacent to dropdown selectors
    const btnPrevPower = document.getElementById('btn-preview-power');
    if (btnPrevPower) {
      btnPrevPower.addEventListener('click', (e) => {
        const pSel = document.getElementById('select-power-catalog');
        if (pSel && pSel.value) {
          this.showHelpModal('power', pSel.value);
        } else {
          this.showCustomAlert('Please select a superpower from the dropdown first to view its details.', 'Select Power', e);
        }
      });
    }

    const btnPrevInvPower = document.getElementById('btn-preview-inv-power');
    if (btnPrevInvPower) {
      btnPrevInvPower.addEventListener('click', (e) => {
        const pSel = document.getElementById('inv-power-select');
        if (pSel && pSel.value) {
          this.showHelpModal('power', pSel.value);
        } else {
          this.showCustomAlert('Please select an invention superpower first to view its details.', 'Select Power', e);
        }
      });
    }

    const btnPrevTalent = document.getElementById('btn-preview-talent');
    if (btnPrevTalent) {
      btnPrevTalent.addEventListener('click', (e) => {
        const tSel = document.getElementById('select-talent-catalog');
        if (tSel && tSel.value) {
          this.showHelpModal('talent', tSel.value);
        } else {
          this.showCustomAlert('Please select a talent from the dropdown first to view its details.', 'Select Talent', e);
        }
      });
    }

    const btnPrevRevItem = document.getElementById('btn-preview-rev-item');
    if (btnPrevRevItem) {
      btnPrevRevItem.addEventListener('click', (e) => {
        const itemSel = document.getElementById('select-reverse-engineer-item');
        if (itemSel && itemSel.value) {
          this.showHelpModal('equipment', itemSel.value);
        } else {
          this.showCustomAlert('Please select an equipment item first to view its details.', 'Select Equipment', e);
        }
      });
    }
  },

  switchTab(tabKey) {
    this.activeTab = tabKey;
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabKey);
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.getAttribute('id') === `tab-pane-${tabKey}`);
    });
    if (tabKey === 'invention' || tabKey === 'inventions') {
      this.handleCalculateInvention();
      this.renderKnownBlueprints();
    }
  },

  switchCheatTab(tabKey) {
    this.activeCheatTab = tabKey;
    ['combat', 'table', 'movement', 'health', 'materials'].forEach(t => {
      const btn = document.getElementById(`cheat-tab-btn-${t}`);
      const sec = document.getElementById(`cheat-section-${t}`);
      if (btn) btn.classList.toggle('active', t === tabKey);
      if (sec) sec.style.display = t === tabKey ? 'block' : 'none';
    });
  },

  populateDropdowns() {
    const rankOptionsHtml = RANKS.slice(1, 14).map(r => 
      `<option value="${r.name}">${r.name} (${r.num}) - ${r.num} CP</option>`
    ).join('');

    // Primary Abilities Selectors
    ['fighting', 'agility', 'strength', 'endurance', 'reason', 'intuition', 'psyche'].forEach(k => {
      const sel = document.getElementById(`select-rank-${k}`);
      if (sel) {
        sel.innerHTML = rankOptionsHtml;
        sel.addEventListener('change', (e) => {
          this.character.setAbilityRank(k, e.target.value);
          this.saveState();
          this.render();
        });
      }
    });

    // Resources Selectors (Main Stats)
    const resSel = document.getElementById('select-rank-resources');
    if (resSel) {
      resSel.innerHTML = rankOptionsHtml;
      resSel.addEventListener('change', (e) => {
        this.character.setResourceRank(e.target.value);
        this.saveState();
        this.renderPointBuy();
        this.renderBackground();
        this.renderEquipment();
      });
    }

    // Resources Selectors (Background Tab)
    const bgResSel = document.getElementById('background-resource-select');
    if (bgResSel) {
      bgResSel.innerHTML = rankOptionsHtml;
      bgResSel.addEventListener('change', (e) => {
        this.character.setResourceRank(e.target.value);
        this.saveState();
        this.render();
      });
    }

    // Background Spent Points Input
    const bgSpentInp = document.getElementById('background-rp-spent-input');
    if (bgSpentInp) {
      bgSpentInp.addEventListener('change', (e) => {
        const val = Math.max(0, parseInt(e.target.value) || 0);
        this.character.spentResourcePoints = val;
        this.saveState();
        this.renderBackground();
        this.renderEquipment();
      });
    }

    // Background Reset Month Button
    const btnResetRp = document.getElementById('btn-background-reset-rp');
    if (btnResetRp) {
      btnResetRp.addEventListener('click', async (e) => {
        const prevSpent = this.character.spentResourcePoints || 0;
        this.character.resetMonthlyResourcePoints();
        this.saveState();
        this.renderBackground();
        this.renderEquipment();
        await this.showCustomAlert(
          `Monthly Resource Points have been reset for a new month!\n\nCleared ${prevSpent} spent RP. Full monthly budget of ${this.character.getResourcePointsBudget()} RP is now available.`,
          '🔄 New Month Reset',
          e
        );
      });
    }

    // Popularity input
    const popInp = document.getElementById('input-popularity');
    if (popInp) {
      popInp.addEventListener('change', (e) => {
        this.character.currentPopularity = parseInt(e.target.value) || 0;
        this.saveState();
      });
    }

    // Powers Catalog (Categorized optgroups)
    this.renderPowerDropdown();

    const pRankSel = document.getElementById('select-new-power-rank');
    if (pRankSel) {
      pRankSel.innerHTML = rankOptionsHtml;
    }

    // Inventions Material & Power Dropdowns
    const invMatSel = document.getElementById('inv-material-rank');
    if (invMatSel && globalThis.MATERIAL_STRENGTHS) {
      invMatSel.innerHTML = globalThis.MATERIAL_STRENGTHS.slice(0, 10).map(m => 
        `<option value="${m.rank}">${m.name} (${m.rank} / ${m.num})</option>`
      ).join('');
      invMatSel.value = 'Remarkable';
    }

    this.renderInvPowerDropdown();

    const invPwrRankSel = document.getElementById('inv-power-rank');
    if (invPwrRankSel) {
      invPwrRankSel.innerHTML = RANKS.slice(1, 14).map(r => 
        `<option value="${r.name}">${r.name} (${r.num})</option>`
      ).join('');
      invPwrRankSel.value = 'Remarkable';
    }

    // Inventions Ability Boost Dropdowns
    const invBstMode = document.getElementById('inv-boost-mode');
    const invBstRank = document.getElementById('inv-boost-rank');
    const updateInvBstRankOptions = () => {
      if (!invBstMode || !invBstRank) return;
      if (invBstMode.value === 'bonus') {
        invBstRank.innerHTML = `
          <option value="1">+1 CS</option>
          <option value="2" selected>+2 CS</option>
          <option value="3">+3 CS</option>
          <option value="4">+4 CS</option>
        `;
      } else {
        invBstRank.innerHTML = RANKS.slice(1, 14).map(r => 
          `<option value="${r.name}">${r.name} (${r.num})</option>`
        ).join('');
        invBstRank.value = 'Incredible';
      }
    };
    if (invBstMode) {
      invBstMode.addEventListener('change', updateInvBstRankOptions);
      updateInvBstRankOptions();
    }

    this.syncPowerSelectionUI();
    this.renderInvPowersList();
    this.renderInvAbilityBoostsList();
    this.updateInventionStagesUI();

    // Reverse-Engineer Catalog Items (Categorized optgroups)
    const revSel = document.getElementById('select-reverse-engineer-item');
    if (revSel && globalThis.PREBUILT_EQUIPMENT_CATALOG) {
      const eqCats = {};
      globalThis.PREBUILT_EQUIPMENT_CATALOG.forEach(i => {
        const c = i.category || 'Equipment';
        if (!eqCats[c]) eqCats[c] = [];
        eqCats[c].push(i);
      });
      let revHtml = '<option value="">-- Select Rulebook Equipment to Analyze --</option>';
      for (const c in eqCats) {
        revHtml += `<optgroup label="${c}">`;
        revHtml += eqCats[c].map(i => 
          `<option value="${i.id}">${i.isUnique ? '🔒 [UNIQUE] ' : ''}${i.name} (${i.costRank})</option>`
        ).join('');
        revHtml += `</optgroup>`;
      }
      revSel.innerHTML = revHtml;
      revSel.value = '';
    }

    // Talents Catalog (Categorized optgroups)
    this.renderTalentDropdown();

    // Physical Forms Catalog (Background Tab)
    const formSel = document.getElementById('bio-physical-form');
    if (formSel && globalThis.PHYSICAL_FORMS) {
      formSel.innerHTML = globalThis.PHYSICAL_FORMS.map(f => 
        `<option value="${f.id}">${f.name} (${f.source})</option>`
      ).join('');
      formSel.addEventListener('change', (e) => {
        const f = globalThis.PHYSICAL_FORMS.find(x => x.id === e.target.value);
        if (f) {
          this.character.formKey = f.id;
          this.character.formName = f.name;
          this.character.isSwarmForm = (f.id === 's32_collective_mass' || f.id === 'swarm_collective');
          this.saveState();
          this.render();
        }
      });
    }

    // Background fields binding
    const bindBio = (id, prop) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          this.character[prop] = e.target.value;
          this.saveState();
        });
      }
    };

    bindBio('bio-real-name', 'realName');
    bindBio('bio-identity', 'identity');
    bindBio('bio-gender', 'gender');
    bindBio('bio-age', 'age');
    bindBio('bio-affiliation', 'groupAffiliation');
    bindBio('bio-base', 'baseOfOperations');
    bindBio('bio-backstory', 'notes');

    // Stunt Emulated Power Selector
    const stuntPowerSel = document.getElementById('stunt-emulated-power-select');
    if (stuntPowerSel && Array.isArray(globalThis.MSH_POWERS)) {
      const sorted = [...globalThis.MSH_POWERS].sort((a, b) => a.name.localeCompare(b.name));
      stuntPowerSel.innerHTML = sorted.map(p => `<option value="${p.id}">${p.name} (${p.category})</option>`).join('');
    }
  },

  render() {
    this.renderHeader();
    this.renderPointBuy();
    this.renderVitals();
    this.renderAbilities();
    this.renderDefenses();
    this.renderConditions();
    this.renderSwarmToggle();
    this.renderAttacks();
    this.renderPowers();
    this.renderEquipment();
    this.renderTalents();
    this.renderBackground();
    this.renderCheatSheetTable();
    this.renderKnownBlueprints();
  },

  renderHeader() {
    const nameInp = document.getElementById('header-char-name');
    if (nameInp) nameInp.value = this.character.name || 'The Vanguard';

    document.getElementById('tab-power-count').textContent = this.character.powers.length;
    document.getElementById('tab-equipment-count').textContent = this.character.equipment.length;
  },

  renderPointBuy() {
    const pts = this.character.calculateSpentPoints();
    document.getElementById('header-points-spent').textContent = pts.totalSpent;
    document.getElementById('header-points-budget').textContent = pts.budget;
    
    const remEl = document.getElementById('header-points-remaining');
    remEl.textContent = pts.remaining;
    remEl.style.color = pts.remaining < 0 ? '#ef4444' : '#38bdf8';

    const badge = document.getElementById('point-buy-badge');
    if (badge) {
      badge.style.borderColor = pts.remaining < 0 ? '#ef4444' : 'var(--marvel-gold)';
    }

    document.getElementById('spent-abilities').textContent = pts.breakdown.abilities;
    document.getElementById('spent-powers').textContent = pts.breakdown.powers;
    document.getElementById('spent-talents').textContent = pts.breakdown.talents;
    document.getElementById('spent-contacts').textContent = pts.breakdown.contacts;
    document.getElementById('spent-resources').textContent = pts.breakdown.resources;

    const tierSelect = document.getElementById('point-tier-select');
    if (tierSelect) tierSelect.value = this.character.pointTier;
  },

  renderVitals() {
    const maxH = this.character.calculateMaxHealth();
    const curH = this.character.currentHealth;
    const hPct = Math.min(100, Math.max(0, Math.round((curH / Math.max(maxH, 1)) * 100)));

    document.getElementById('vital-health-cur').textContent = curH;
    document.getElementById('vital-health-max').textContent = maxH;
    const hFill = document.getElementById('vital-health-fill');
    hFill.style.width = `${hPct}%`;
    hFill.className = hPct < 30 ? 'vital-progress-fill health-fill low' : 'vital-progress-fill health-fill';

    const baseK = this.character.calculateBaseKarma();
    const curK = this.character.currentKarma;
    const kPct = Math.min(100, Math.max(0, Math.round((curK / Math.max(baseK, 1)) * 100)));

    document.getElementById('vital-karma-cur').textContent = curK;
    document.getElementById('vital-karma-base').textContent = baseK;
    document.getElementById('vital-karma-fill').style.width = `${Math.max(5, kPct)}%`;
  },

  renderAbilities() {
    const abs = this.character.getActiveAbilities();
    ['fighting', 'agility', 'strength', 'endurance', 'reason', 'intuition', 'psyche'].forEach(k => {
      const ab = abs[k];
      const sel = document.getElementById(`select-rank-${k}`);
      if (sel) sel.value = ab.rankName;

      const numEl = document.getElementById(`rank-num-${k}`);
      if (numEl) numEl.textContent = ab.rankValue;

      const rollBtn = document.getElementById(`roll-btn-${k}`);
      if (rollBtn) {
        rollBtn.onclick = (e) => {
          this.openRoller({
            name: `${k.toUpperCase()} FEAT Roll`,
            abilityName: k.charAt(0).toUpperCase() + k.slice(1),
            initialRank: ab.rankName,
            shift: 0,
            actionType: 'ability_check',
            damageValue: 0,
            notes: `Standard ability check for ${k.toUpperCase()}.`
          }, e);
        };
      }
    });

    const resSel = document.getElementById('select-rank-resources');
    if (resSel) resSel.value = this.character.resources.rankName;

    const rollResBtn = document.getElementById('roll-btn-resources');
    if (rollResBtn) {
      rollResBtn.onclick = (e) => {
        this.openRoller({
          name: 'Resources Procurement FEAT',
          abilityName: 'Resources',
          initialRank: this.character.resources.rankName,
          shift: 0,
          actionType: 'procurement',
          damageValue: 0,
          notes: 'Standard Resource check for purchasing or manufacturing equipment.'
        }, e);
      };
    }

    const popInp = document.getElementById('input-popularity');
    if (popInp) popInp.value = this.character.currentPopularity;

    const rollPopBtn = document.getElementById('roll-btn-popularity');
    if (rollPopBtn) {
      rollPopBtn.onclick = (e) => {
        this.openRoller({
          name: 'Popularity Reaction FEAT',
          abilityName: 'Popularity',
          initialRank: 'Typical',
          shift: Math.round(this.character.currentPopularity / 10),
          actionType: 'reaction',
          damageValue: 0,
          notes: `Reaction check modified by Popularity (${this.character.currentPopularity}).`
        }, e);
      };
    }
  },

  renderDefenses() {
    const ba = this.character.defenses.bodyArmor;
    document.getElementById('def-body-armor').textContent = ba.physical > 0 ? `${ba.rankName} (${ba.physical})` : 'None';
    document.getElementById('def-body-armor-notes').textContent = ba.notes || (ba.physical > 0 ? `${ba.physical} Physical Protection` : 'Standard clothing');

    const ff = this.character.defenses.forceField;
    document.getElementById('def-force-field').textContent = ff.protection > 0 ? `${ff.rankName} (${ff.protection})` : 'None';
    document.getElementById('def-force-field-notes').textContent = ff.notes || 'No active force field';
  },

  renderConditions() {
    const condContainer = document.getElementById('conditions-list');
    if (!condContainer) return;
    condContainer.innerHTML = '';

    if (this.character.conditions.length === 0) {
      condContainer.innerHTML = '<span style="color: var(--text-dim);">Normal (No Conditions)</span>';
      return;
    }

    this.character.conditions.forEach(cond => {
      const badge = document.createElement('span');
      badge.className = 'meta-tag';
      badge.style.borderColor = 'var(--marvel-red)';
      badge.style.color = '#fda4af';
      badge.innerHTML = `${cond} <button style="background:none;border:none;color:#fff;cursor:pointer;margin-left:6px;font-weight:bold;">&times;</button>`;
      badge.querySelector('button').addEventListener('click', () => {
        this.character.removeCondition(cond);
        this.saveState();
        this.renderConditions();
      });
      condContainer.appendChild(badge);
    });
  },

  renderSwarmToggle() {
    const banner = document.getElementById('swarm-banner-box');
    if (!banner) return;

    if (this.character.isSwarmForm) {
      banner.style.display = 'flex';
      const btnSwarm = document.getElementById('btn-swarm-active');
      const btnInd = document.getElementById('btn-indiv-active');

      if (this.character.activeSwarmProfile === 'swarm') {
        btnSwarm.classList.add('active');
        btnInd.classList.remove('active');
      } else {
        btnSwarm.classList.remove('active');
        btnInd.classList.add('active');
      }

      btnSwarm.onclick = () => {
        this.character.activeSwarmProfile = 'swarm';
        this.saveState();
        this.render();
      };
      btnInd.onclick = () => {
        this.character.activeSwarmProfile = 'individual';
        this.saveState();
        this.render();
      };
    } else {
      banner.style.display = 'none';
    }
  },

  renderAttacks() {
    const container = document.getElementById('attacks-container');
    if (!container) return;
    container.innerHTML = '';

    const attacks = this.character.compileAttacks();

    attacks.forEach(atk => {
      const card = document.createElement('div');
      card.className = 'attack-card';

      const effRank = UniversalTableEngine.applyColumnShift(atk.baseRank, atk.columnShift);

      card.innerHTML = `
        <div class="attack-header">
          <button class="attack-roll-chip" data-atk-id="${atk.id}">
            <span style="font-size: 1.25rem; color: var(--marvel-gold);">🎲</span>
            <span>${atk.name}</span>
          </button>
          <span class="rank-pill" style="background-color: ${effRank.color};">
            ${effRank.name} ${atk.columnShift !== 0 ? `(${atk.columnShift > 0 ? '+' : ''}${atk.columnShift}CS)` : ''}
          </span>
        </div>
        <div class="attack-meta">
          <span class="meta-tag">${atk.abilityName}</span>
          <span class="meta-tag" style="color: #38bdf8; font-weight:700;">${atk.damage}</span>
          <span class="meta-tag">Range: ${atk.range}</span>
          <span class="meta-tag">${atk.actionType.toUpperCase()}</span>
          ${atk.category ? `<span class="meta-tag" style="background: rgba(255,255,255,0.06);">${atk.category}</span>` : ''}
        </div>
        <div class="attack-notes">${atk.notes}</div>
      `;

      card.querySelector('.attack-roll-chip').addEventListener('click', async (e) => {
        // Power Stunt Check & Karma Spending (TSR Advanced Rules)
        if (atk.isStunt && !atk.isLearned) {
          if (this.character.currentKarma < 100) {
            await this.showCustomAlert(
              `Attempting a new or partially-learned power stunt requires 100 Karma Points (TSR Advanced Rules).\n\nHero has only ${this.character.currentKarma} KP available. Cannot attempt stunt!`,
              '⚠️ Inadequate Karma Points',
              e
            );
            return;
          }
          const confirmed = await this.showCustomConfirm(
            `Attempting "${atk.name}" requires spending 100 Karma Points.\n\nHero currently has ${this.character.currentKarma} KP.\nDo you want to spend 100 KP and attempt this stunt FEAT?`,
            '⚡ Confirm Power Stunt Attempt',
            e,
            'Spend 100 KP',
            'Cancel'
          );
          if (!confirmed) return;
          this.character.updateKarma(-100, `Attempted Power Stunt: ${atk.name}`);
          this.saveState();
          this.renderVitals();
        }

        this.openRoller({
          name: atk.name,
          abilityName: atk.abilityName,
          initialRank: atk.baseRank,
          shift: atk.columnShift,
          actionType: atk.actionType,
          damageValue: atk.damageValue,
          isStunt: atk.isStunt,
          stuntId: atk.stuntId,
          parentPowerId: atk.parentPowerId,
          isLearned: atk.isLearned,
          notes: atk.notes
        }, e);
      });

      container.appendChild(card);
    });
  },

  renderPowers() {
    const container = document.getElementById('powers-container');
    if (!container) return;
    container.innerHTML = '';

    const totalSlots = this.character.getTotalPowerSlots ? this.character.getTotalPowerSlots() : this.character.powers.length;
    const slotsBadge = document.getElementById('powers-slots-badge');
    if (slotsBadge) {
      slotsBadge.textContent = `Slots: ${totalSlots} (${this.character.powers.length} powers)`;
    }

    if (this.character.powers.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted);">No superhuman powers added yet. Use the form above to purchase powers with your CMF CP budget.</p>';
      return;
    }

    this.character.powers.forEach((p, idx) => {
      const pRank = UniversalTableEngine.getRankByName(p.rankName);
      const card = document.createElement('div');
      card.className = 'card';
      card.style.marginBottom = '12px';

      const isStarredPower = !!p.isStarred;
      const isExp = isStarredPower || !!p.isExceptional;
      const cpCost = (isExp ? 20 : 10) + (p.rankValue * (isExp ? 2 : 1));

      let badgeHtml = '';
      if (isStarredPower) {
        badgeHtml = '<span class="meta-tag tag-starred">★ Starred (2 Slots)</span>';
      } else if (p.isExceptional) {
        badgeHtml = '<span class="meta-tag tag-exceptional">★ Exceptional (2x CP)</span>';
      }

      card.innerHTML = `
        <div class="card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong class="power-title" style="font-size: 1.15rem;">${p.name}</strong>
            <button type="button" class="help-circle-btn" title="View details and rules for ${p.name}" data-power-name="${p.name}">?</button>
            ${badgeHtml}
          </div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span class="meta-tag tag-power-cp" style="font-weight: 700;">${cpCost} CP</span>
            <span class="rank-pill" style="background-color: ${pRank.color};">${pRank.name} (${p.rankValue})</span>
            <button type="button" class="power-roll-btn" data-roll-power="${idx}" title="Roll ${p.name} FEAT">🎲 Roll</button>
            <button class="icon-btn" style="padding: 2px 8px; min-height: 28px; background: #881337;" data-del-power="${idx}" title="Delete Power">✕</button>
          </div>
        </div>
        <div class="power-notes" style="font-size: 10.5pt; margin-bottom: 8px;">
          ${p.notes || 'Standard power function.'}
          <span class="power-slots-hint" style="font-size: 10pt; margin-left: 8px;">(Slots: ${p.powerSlots || (isStarredPower ? 2 : 1)})</span>
        </div>
      `;

      // Render Power Stunts Section inside Power Card
      const stuntsDiv = document.createElement('div');
      stuntsDiv.className = 'power-stunts-section';

      const stuntsHeader = document.createElement('div');
      stuntsHeader.className = 'power-stunts-header';
      stuntsHeader.innerHTML = `
        <span class="power-stunts-title" style="font-size: 10pt; font-weight: 700;">⚡ Power Stunts (${p.stunts?.length || 0})</span>
        <button type="button" class="icon-btn" style="padding: 2px 8px; min-height: 28px; font-size: 10pt;" data-add-stunt="${p.id}">➕ Add Stunt</button>
      `;
      stuntsDiv.appendChild(stuntsHeader);

      if (Array.isArray(p.stunts) && p.stunts.length > 0) {
        p.stunts.forEach((st, sIdx) => {
          const succInfo = this.character.getStuntSuccessesNeeded(st);
          let neededHtml = '';
          if (!st.isLearned) {
            const parts = [];
            if (succInfo.neededRed > 0) parts.push(`<span class="badge-red">${succInfo.neededRed} Red</span>`);
            if (succInfo.neededYellow > 0) parts.push(`<span class="badge-yellow">${succInfo.neededYellow} Yellow</span>`);
            neededHtml = `<span class="stunt-needed-badge">(Needs ${parts.join(', ')})</span>`;
          }

          const stCard = document.createElement('div');
          stCard.className = 'stunt-card';
          stCard.innerHTML = `
            <div class="stunt-card-header">
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <strong class="stunt-title" style="font-size: 10pt;">${st.name}</strong>
                ${neededHtml}
                ${st.emulatedPowerName ? `<span class="meta-tag stunt-emulate-tag" style="font-size: 10pt;">Emulates: ${st.emulatedPowerName}</span>` : ''}
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                ${!st.isLearned ? `
                  <button type="button" class="stunt-learn-now-btn" data-learn-stunt="${sIdx}" title="Spend 1,000 KP to guarantee mastery">
                    🎓 Learn Now
                  </button>
                ` : ''}
                <button type="button" class="stunt-roll-btn" data-roll-stunt="${sIdx}" title="Roll Stunt FEAT">🎲 Roll</button>
                <button type="button" class="icon-btn" style="padding: 2px 6px; min-height: 26px; background: #881337;" data-del-stunt="${sIdx}" title="Delete Stunt">✕</button>
              </div>
            </div>
            <div class="stunt-desc" style="font-size: 10pt;">${st.description || 'Custom tactical stunt.'}</div>
          `;

          // "Learn Now" button click listener (guarantee stunt mastery with Karma)
          const learnBtn = stCard.querySelector(`[data-learn-stunt="${sIdx}"]`);
          if (learnBtn) {
            learnBtn.addEventListener('click', async (e) => {
              const curKarma = this.character.currentKarma || 0;
              const cost = 1000;
              if (curKarma < cost) {
                await this.showCustomAlert(
                  `You only have ${curKarma}/${cost} KP and thus can't buy mastery for "${st.name}".`,
                  '⚠️ Inadequate Karma Points',
                  e
                );
                return;
              }

              const confirmed = await this.showCustomConfirm(
                `Do you want to spend ${cost} KP to guarantee permanent mastery of "${st.name}"?\n\nHero currently has ${curKarma} KP available. After spending, 1,000 KP will be deducted and the stunt will be permanently mastered.`,
                '🎓 Guarantee Stunt Mastery',
                e,
                'Spend 1,000 KP',
                'Cancel'
              );

              if (confirmed) {
                this.character.learnStuntWithKarma(p.id, st.id, cost);
                this.saveState();
                this.renderVitals();
                this.renderPowers();
                this.renderAttacks();
                await this.showCustomAlert(
                  `"${st.name}" is now permanently MASTERED!\n\nIt no longer costs Karma to attempt and resolves as a standard Green FEAT.`,
                  '⭐ Stunt Mastered!',
                  e
                );
              }
            });
          }

          // Roll stunt button
          stCard.querySelector(`[data-roll-stunt="${sIdx}"]`).addEventListener('click', async (e) => {
            if (!st.isLearned) {
              if (this.character.currentKarma < 100) {
                await this.showCustomAlert(
                  `Attempting a new or partially-learned power stunt requires 100 Karma Points (TSR Advanced Rules).\n\nHero has only ${this.character.currentKarma} KP available. Cannot attempt stunt!`,
                  '⚠️ Inadequate Karma Points',
                  e
                );
                return;
              }
              const confirmed = await this.showCustomConfirm(
                `Attempting "${st.name}" requires spending 100 Karma Points.\n\nRequired to learn: ${succInfo.text}.\nHero currently has ${this.character.currentKarma} KP.\nDo you want to spend 100 KP and attempt this stunt FEAT?`,
                '⚡ Confirm Stunt Attempt',
                e,
                'Spend 100 KP',
                'Cancel'
              );
              if (!confirmed) return;
              this.character.updateKarma(-100, `Attempted Power Stunt: ${st.name} (${p.name})`);
              this.saveState();
              this.renderVitals();
            }

            this.openRoller({
              name: `Stunt: ${st.name} (${p.name})`,
              abilityName: p.name,
              initialRank: p.rankName,
              shift: 0,
              actionType: 'stunt',
              damageValue: p.rankValue,
              isStunt: true,
              stuntId: st.id,
              parentPowerId: p.id,
              isLearned: st.isLearned,
              notes: `[${st.isLearned ? 'Mastered' : 'Learning: ' + succInfo.text + ' (100 KP spent)'}] ${st.description}${st.emulatedPowerName ? ' (Emulates ' + st.emulatedPowerName + ')' : ''}`
            }, e);
          });

          // Delete stunt
          stCard.querySelector(`[data-del-stunt="${sIdx}"]`).addEventListener('click', () => {
            this.character.removePowerStunt(p.id, st.id);
            this.saveState();
            this.renderPowers();
            this.renderAttacks();
          });

          stuntsDiv.appendChild(stCard);
        });
      }

      // Add stunt button click
      stuntsHeader.querySelector(`[data-add-stunt="${p.id}"]`).addEventListener('click', () => {
        this.openStuntModal(p.id);
      });

      card.appendChild(stuntsDiv);

      card.querySelector('[data-power-name]').addEventListener('click', () => {
        this.showHelpModal('power', p.name);
      });

      const rollPowerBtn = card.querySelector(`[data-roll-power="${idx}"]`);
      if (rollPowerBtn) {
        rollPowerBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.rollPowerFEAT(p, e);
        });
      }

      card.querySelector('[data-del-power]').addEventListener('click', () => {
        this.character.powers.splice(idx, 1);
        this.saveState();
        this.render();
      });

      container.appendChild(card);
    });
  },

  getPowerActionType(power) {
    if (!power) return 'standard';
    if (power.actionType) return power.actionType;
    const name = (power.name || '').toLowerCase();
    const cat = (power.category || '').toLowerCase();

    if (name.includes('reflection')) return 'reflection';
    if (name.includes('force field') || name.includes('shield') || name.includes('absorption') || name.includes('armor') || name.includes('resistance') || cat.includes('defensive')) {
      return 'defense';
    }
    if (name.includes('claw') || name.includes('fang') || name.includes('sting') || name.includes('blade') || name.includes('weapon')) {
      return 'edged';
    }
    if (name.includes('shoot') || name.includes('missile') || name.includes('projectile') || name.includes('web') || name.includes('entangle')) {
      return 'shooting';
    }
    if (name.includes('force') || name.includes('concussion') || name.includes('kinetic') || name.includes('vibration')) {
      return 'force';
    }
    if (name.includes('blast') || name.includes('bolt') || name.includes('ray') || name.includes('beam') || name.includes('generation') || name.includes('emission') || cat.includes('energy emission')) {
      return 'energy';
    }
    if (cat.includes('fighting')) {
      return 'slugfest';
    }
    return 'standard';
  },

  rollPowerFEAT(power, clickEvent = null) {
    if (!power) return;
    const actionType = this.getPowerActionType(power);
    const rankName = power.rankName || 'Typical';
    const rankObj = UniversalTableEngine.getRankByName(rankName);
    const rankVal = power.rankValue ?? rankObj.num ?? 6;

    this.openRoller({
      name: `${power.name} FEAT`,
      abilityName: `${power.name} (${rankName})`,
      initialRank: rankName,
      shift: 0,
      actionType: actionType,
      damageValue: rankVal,
      isPower: true,
      powerId: power.id,
      notes: power.notes || `Power Rank: ${rankName} (${rankVal})`
    }, clickEvent);
  },

  openStuntModal(powerId) {
    const power = this.character.powers.find(p => p.id === powerId);
    if (!power) return;

    document.getElementById('stunt-power-id').value = power.id;
    document.getElementById('stunt-edit-id').value = '';
    document.getElementById('stunt-parent-power-name').textContent = `${power.name} (${power.rankName})`;
    document.getElementById('stunt-name-input').value = '';
    document.getElementById('stunt-desc-input').value = '';
    document.getElementById('stunt-emulate-check').checked = false;
    document.getElementById('stunt-emulate-select-row').style.display = 'none';
    document.getElementById('stunt-learned-check').checked = false;
    const redInp = document.getElementById('stunt-red-successes');
    if (redInp) redInp.value = '0';
    const yelInp = document.getElementById('stunt-yellow-successes');
    if (yelInp) yelInp.value = '0';

    const modal = document.getElementById('stunt-modal');
    if (modal) modal.classList.add('open');
  },

  async handleSaveStunt() {
    const powerId = document.getElementById('stunt-power-id').value;
    const power = this.character.powers.find(p => p.id === powerId);
    if (!power) return;

    const name = (document.getElementById('stunt-name-input').value || '').trim();
    if (!name) {
      await this.showCustomAlert('Please enter a name for the power stunt.', 'Missing Stunt Name');
      return;
    }

    const desc = (document.getElementById('stunt-desc-input').value || '').trim();
    const isEmulating = document.getElementById('stunt-emulate-check').checked;
    let emulatedPowerId = null;
    let emulatedPowerName = null;

    if (isEmulating) {
      const emPowerSel = document.getElementById('stunt-emulated-power-select');
      emulatedPowerId = emPowerSel ? emPowerSel.value : null;
      const foundPower = (globalThis.MSH_POWERS || []).find(p => p.id === emulatedPowerId);
      emulatedPowerName = foundPower ? foundPower.name : (emPowerSel ? emPowerSel.options[emPowerSel.selectedIndex]?.text : null);
    }

    const isLearned = document.getElementById('stunt-learned-check').checked;
    const redSuccesses = parseInt(document.getElementById('stunt-red-successes')?.value || 0);
    const yellowSuccesses = parseInt(document.getElementById('stunt-yellow-successes')?.value || 0);

    this.character.addPowerStunt(power.id, {
      name,
      description: desc,
      emulatedPowerId,
      emulatedPowerName,
      isLearned,
      redSuccesses,
      yellowSuccesses,
      attemptsCount: isLearned ? 3 : (redSuccesses + yellowSuccesses)
    });

    this.saveState();
    this.renderPowers();
    this.renderAttacks();

    const modal = document.getElementById('stunt-modal');
    if (modal) modal.classList.remove('open');
  },

  handleAddPower(mouseEvent = null) {
    const powerId = document.getElementById('select-power-catalog').value;
    if (!powerId) {
      this.showCustomAlert('Please select a superpower from the dropdown before adding.', 'Select Power', mouseEvent);
      return;
    }
    const rankName = document.getElementById('select-new-power-rank').value;
    const manualExceptional = document.getElementById('check-power-exceptional') ? document.getElementById('check-power-exceptional').checked : false;

    const catalogPower = globalThis.MSH_POWERS.find(p => p.id === powerId);
    if (!catalogPower) {
      this.showCustomAlert('Please select a superpower from the dropdown before adding.', 'Select Power', mouseEvent);
      return;
    }

    const isStarred = !!(catalogPower.isStarred || catalogPower.countsAsTwo || catalogPower.powerSlots > 1);
    const isExceptional = isStarred || manualExceptional;

    const rObj = UniversalTableEngine.getRankByName(rankName);

    this.character.powers.push({
      id: 'p_' + Date.now(),
      name: catalogPower.name,
      category: catalogPower.category,
      rankName: rObj.name,
      rankValue: rObj.num,
      powerSlots: isStarred ? 2 : 1,
      isExceptional: isExceptional,
      isStarred: isStarred,
      notes: catalogPower.description.substring(0, 150) + '...',
      stunts: catalogPower.powerStunts || []
    });

    this.saveState();
    this.render();

    const pCatSel = document.getElementById('select-power-catalog');
    if (pCatSel) {
      pCatSel.value = '';
      this.syncPowerSelectionUI();
    }
  },

  renderPowerDropdown(filterText = '') {
    const pCatSel = document.getElementById('select-power-catalog');
    if (!pCatSel || !globalThis.MSH_POWERS) return;

    const previousVal = pCatSel.value;
    const q = (filterText || '').toLowerCase().trim();
    const filtered = q ? globalThis.MSH_POWERS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.id.toLowerCase().includes(q) || 
      (p.category && p.category.toLowerCase().includes(q)) ||
      ((q === '*' || q === 'star' || q === 'starred') && p.isStarred)
    ) : globalThis.MSH_POWERS;

    const cats = {};
    filtered.forEach(p => {
      const c = p.category || 'General';
      if (!cats[c]) cats[c] = [];
      cats[c].push(p);
    });

    let html = '<option value="">-- Select Power --</option>';
    for (const catName in cats) {
      html += `<optgroup label="${catName}">`;
      html += cats[catName].map(p => {
        const star = p.isStarred ? '★ ' : '';
        const tag = p.isStarred ? ' (Starred / 2 Slots)' : '';
        return `<option value="${p.id}">[${p.id}] ${star}${p.name}${tag}</option>`;
      }).join('');
      html += `</optgroup>`;
    }
    pCatSel.innerHTML = html;

    if (previousVal && pCatSel.querySelector(`option[value="${previousVal}"]`)) {
      pCatSel.value = previousVal;
    } else {
      pCatSel.value = '';
    }

    this.syncPowerSelectionUI();
  },

  syncPowerSelectionUI() {
    const pCatSel = document.getElementById('select-power-catalog');
    if (!pCatSel || !globalThis.MSH_POWERS) return;
    const selectedP = globalThis.MSH_POWERS.find(p => p.id === pCatSel.value);
    const checkExp = document.getElementById('check-power-exceptional');
    const labelExpText = document.getElementById('label-power-exceptional-text');
    const bannerEl = document.getElementById('power-starred-banner');

    if (!selectedP) {
      if (checkExp) {
        checkExp.checked = false;
        checkExp.disabled = false;
      }
      if (labelExpText) {
        labelExpText.textContent = 'Exceptional Power (2x Rank CP)';
      }
      if (bannerEl) {
        bannerEl.style.display = 'none';
      }
      return;
    }

    const isStarred = !!(selectedP.isStarred || selectedP.countsAsTwo || selectedP.powerSlots > 1);

    if (isStarred) {
      if (checkExp) {
        checkExp.checked = true;
        checkExp.disabled = true;
      }
      if (labelExpText) {
        labelExpText.innerHTML = '<strong class="starred-label-text">★ Starred Power (2 Slots, 20 CP Base + 2x Rank)</strong>';
      }
      if (bannerEl) {
        bannerEl.style.display = 'block';
      }
    } else {
      if (checkExp) {
        checkExp.disabled = false;
      }
      if (labelExpText) {
        labelExpText.textContent = 'Exceptional Power (2x Rank CP)';
      }
      if (bannerEl) {
        bannerEl.style.display = 'none';
      }
    }
  },

  renderInvPowerDropdown(filterText = '') {
    const invPwrSel = document.getElementById('inv-power-select');
    if (!invPwrSel || !globalThis.MSH_POWERS) return;

    const previousVal = invPwrSel.value;
    const q = (filterText || '').toLowerCase().trim();
    const filtered = q ? globalThis.MSH_POWERS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.id.toLowerCase().includes(q) || 
      (p.category && p.category.toLowerCase().includes(q))
    ) : globalThis.MSH_POWERS;

    const cats = {};
    filtered.forEach(p => {
      const c = p.category || 'General';
      if (!cats[c]) cats[c] = [];
      cats[c].push(p);
    });

    let html = '<option value="">-- Select Power --</option>';
    for (const catName in cats) {
      html += `<optgroup label="${catName}">`;
      html += cats[catName].map(p => {
        const star = p.isStarred ? '★ ' : '';
        return `<option value="${p.name}">[${p.id}] ${star}${p.name}</option>`;
      }).join('');
      html += `</optgroup>`;
    }
    invPwrSel.innerHTML = html;

    if (previousVal && invPwrSel.querySelector(`option[value="${previousVal}"]`)) {
      invPwrSel.value = previousVal;
    } else {
      invPwrSel.value = '';
    }
  },

  renderTalentDropdown(filterText = '') {
    const tSel = document.getElementById('select-talent-catalog');
    if (!tSel || !globalThis.MSH_TALENTS) return;

    const previousVal = tSel.value;
    const q = (filterText || '').toLowerCase().trim();
    const filtered = q ? globalThis.MSH_TALENTS.filter(t => 
      t.name.toLowerCase().includes(q) || 
      (t.group && t.group.toLowerCase().includes(q)) || 
      (t.category && t.category.toLowerCase().includes(q))
    ) : globalThis.MSH_TALENTS;

    const groups = {};
    filtered.forEach(t => {
      const g = t.group || t.category || 'General';
      if (!groups[g]) groups[g] = [];
      groups[g].push(t);
    });

    const learnedTalents = (this.character && Array.isArray(this.character.talents)) ? this.character.talents : [];

    let html = '<option value="">-- Select Talent --</option>';

    for (const grp in groups) {
      html += `<optgroup label="${grp}">`;
      html += groups[grp].map(t => {
        const isStarred = !!t.isStarred;
        const starPrefix = isStarred ? '⭐ ' : '';
        const starName = `${t.name}${isStarred ? '*' : ''}`;
        const slotsText = isStarred ? '2 Slots' : '1 Slot';
        const costText = `${t.costCP || (isStarred ? 20 : 10)} CP`;
        const allowsSpec = !!t.allowsSpecialization;

        // Count how many times this talent is already learned
        const matchingLearned = learnedTalents.filter(lt => 
          (t.id && (lt.talentId === t.id || lt.id === t.id)) ||
          (lt.name && lt.name.toLowerCase() === t.name.toLowerCase())
        );
        const learnedCount = matchingLearned.length;

        if (!allowsSpec && learnedCount > 0) {
          // Cannot be duplicated
          return `<option value="${t.id || t.name}" disabled style="opacity: 0.5;">${starPrefix}${starName} (${slotsText}, ${costText}) [Already Learned]</option>`;
        } else if (allowsSpec && learnedCount > 0) {
          // Can be learned multiple times with different specializations
          return `<option value="${t.id || t.name}">${starPrefix}${starName} (${slotsText}, ${costText}) [${learnedCount} learned - Add Specialty]</option>`;
        } else {
          return `<option value="${t.id || t.name}">${starPrefix}${starName} (${slotsText}, ${costText})</option>`;
        }
      }).join('');
      html += `</optgroup>`;
    }
    tSel.innerHTML = html;

    // Preserve previous selection if still available and enabled
    if (previousVal && tSel.querySelector(`option[value="${previousVal}"]:not([disabled])`)) {
      tSel.value = previousVal;
    } else {
      tSel.value = '';
    }

    this.updateTalentSpecializationInput();
  },

  updateTalentSpecializationInput() {
    const tSel = document.getElementById('select-talent-catalog');
    const specRow = document.getElementById('talent-specialization-row');
    const specInput = document.getElementById('input-talent-specialization');
    const specHelp = document.getElementById('talent-specialization-help');
    if (!tSel || !specRow || !specInput) return;

    const val = tSel.value;
    const catTalent = (globalThis.MSH_TALENTS || []).find(t => (t.id && t.id === val) || t.name === val);

    if (catTalent && catTalent.allowsSpecialization) {
      specRow.style.display = 'block';
      specInput.placeholder = catTalent.specPlaceholder || 'Specify specialization...';
      if (specHelp) {
        specHelp.textContent = `Specify the exact specialization (e.g. ${catTalent.specPlaceholder || 'weapon, language, or branch'}) for this talent.`;
      }
    } else {
      specRow.style.display = 'none';
      specInput.value = '';
    }
  },

  updateStoreClearancesUI() {
    const milBtn = document.getElementById('toggle-store-military');
    if (milBtn && milBtn.classList && typeof milBtn.classList.toggle === 'function') {
      milBtn.classList.toggle('active', !!this.storeMilitaryAccess);
      const stat = milBtn.querySelector ? milBtn.querySelector('.toggle-status') : null;
      if (stat) stat.textContent = this.storeMilitaryAccess ? 'AUTHORIZED' : 'OFF';
    }

    const bmBtn = document.getElementById('toggle-store-blackmarket');
    if (bmBtn && bmBtn.classList && typeof bmBtn.classList.toggle === 'function') {
      bmBtn.classList.toggle('active', !!this.storeBlackMarketAccess);
      const stat = bmBtn.querySelector ? bmBtn.querySelector('.toggle-status') : null;
      if (stat) stat.textContent = this.storeBlackMarketAccess ? 'UNLOCKED' : 'OFF';
    }

    const shieldBtn = document.getElementById('toggle-store-shield');
    if (shieldBtn && shieldBtn.classList && typeof shieldBtn.classList.toggle === 'function') {
      shieldBtn.classList.toggle('active', !!this.storeShieldAccess);
      const stat = shieldBtn.querySelector ? shieldBtn.querySelector('.toggle-status') : null;
      if (stat) stat.textContent = this.storeShieldAccess ? 'CLEARED (GM Req.)' : 'OFF';
    }
  },

  matchesStoreCategory(item, catKey) {
    if (!catKey || catKey === 'all') return true;
    const k = catKey.toLowerCase().trim();
    const c = (item.category || '').toLowerCase();
    const t = (item.type || '').toLowerCase();
    const n = (item.name || '').toLowerCase();

    if (k === 'weapons' || k === 'weapon') {
      return c.includes('weapon') || c.includes('firearm') || c.includes('ammunition') || t.includes('weapon') || t.includes('firearm') || t.includes('shooting') || t.includes('slugthrower') || t.includes('energy');
    }
    if (k === 'firearms' || k === 'firearm') {
      return c.includes('firearm') || c.includes('heavy weapon') || c.includes('ammunition') || t.includes('shooting') || t.includes('slugthrower') || t.includes('energy');
    }
    if (k === 'melee') {
      return c.includes('melee') || c.includes('missile') || t.includes('edged') || t.includes('blunt') || t.includes('throwing');
    }
    if (k === 'armor') {
      return c.includes('armor') || c.includes('battlesuit') || c.includes('suit') || t.includes('armor') || t.includes('battlesuit');
    }
    if (k === 'robotics' || k === 'robots' || k === 'robot') {
      return c.includes('robot') || c.includes('android') || c.includes('drone') || n.includes('bot') || n.includes('servo-guard') || n.includes('doombot') || n.includes('mandroid') || n.includes('secbot');
    }
    if (k === 'vehicles' || k === 'vehicle') {
      return c.includes('vehicle') || t.includes('vehicle') || n.includes('skycraft') || n.includes('jet') || n.includes('car');
    }
    if (k === 'electronics' || k === 'surveillance' || k === 'communications' || k === 'gear' || k === 'tools') {
      return c.includes('electronics') || c.includes('surveillance') || c.includes('gear') || c.includes('tools') || c.includes('field') || t.includes('electronic') || t.includes('surveillance') || t.includes('sensor') || t.includes('comm');
    }
    if (k === 'artifacts' || k === 'artifact' || k === 'unique') {
      return c.includes('artifact') || !!item.isUnique;
    }
    return c.includes(k) || t.includes(k);
  },

  matchesStoreAccess(item, accessFilter) {
    const filters = Array.isArray(accessFilter) ? accessFilter : [accessFilter || 'all'];
    if (filters.includes('all')) return true;

    const itemAccessList = Array.isArray(item.accessTypes) && item.accessTypes.length > 0
      ? item.accessTypes.map(t => t.toLowerCase())
      : [(item.accessType || 'civilian').toLowerCase()];

    return itemAccessList.some(at => filters.includes(at));
  },

  matchesStoreSearchQuery(item, query) {
    if (!query) return true;
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return true;

    const haystack = [
      item.name || '',
      item.category || '',
      item.type || '',
      item.accessType || '',
      item.damage || '',
      item.range || '',
      item.costRank || '',
      item.materialStrength || '',
      item.source || '',
      item.description || ''
    ].join(' ').toLowerCase();

    return terms.every(term => haystack.includes(term));
  },

  evaluateProcurement(item) {
    const RANKS = [
      'Shift 0', 'Feeble', 'Poor', 'Typical', 'Good', 'Excellent',
      'Remarkable', 'Incredible', 'Amazing', 'Monstrous', 'Unearthly',
      'Shift X', 'Shift Y', 'Shift Z', 'Class 1000', 'Class 3000', 'Class 5000', 'Beyond'
    ];
    const VALUES = {
      'Shift 0': 0, 'Feeble': 2, 'Poor': 4, 'Typical': 6, 'Good': 10,
      'Excellent': 20, 'Remarkable': 30, 'Incredible': 40, 'Amazing': 50,
      'Monstrous': 75, 'Unearthly': 100, 'Shift X': 150, 'Shift Y': 200,
      'Shift Z': 500, 'Class 1000': 1000
    };

    const heroRankName = (this.character && this.character.resources && this.character.resources.rankName) 
      ? this.character.resources.rankName 
      : 'Typical';
    const heroRankVal = (this.character && this.character.resources && this.character.resources.rankValue !== undefined)
      ? this.character.resources.rankValue
      : (VALUES[heroRankName] || 6);

    const heroIdx = Math.max(0, RANKS.indexOf(heroRankName));

    // Determine cost rank based on market mode
    const isBlackMarketPurchase = (item.accessType === 'black_market') || (this.storeBlackMarketAccess && item.blackMarketCostRank);
    let effectiveCostRank = item.costRank || 'Typical';
    let effectiveCostVal = item.costValue !== undefined ? item.costValue : (VALUES[effectiveCostRank] || 6);
    let costNote = 'Legal Market Price';

    if (isBlackMarketPurchase && item.blackMarketCostRank) {
      effectiveCostRank = item.blackMarketCostRank;
      effectiveCostVal = item.blackMarketCostValue !== undefined ? item.blackMarketCostValue : (VALUES[effectiveCostRank] || effectiveCostVal);
      costNote = 'Black Market (+1CS per p. 41)';
    }

    const costIdx = Math.max(0, RANKS.indexOf(effectiveCostRank));
    const diff = heroIdx - costIdx;

    // Check clearances
    let isLocked = false;
    let lockReason = '';
    const accessType = item.accessType || 'civilian';

    if (accessType === 'military' && !this.storeMilitaryAccess) {
      isLocked = true;
      lockReason = 'Restricted Military Hardware. Military clearance required to purchase without GM override.';
    } else if (accessType === 'black_market' && !this.storeBlackMarketAccess) {
      isLocked = true;
      lockReason = 'Underworld Black Market Hardware. Underworld contacts clearance required.';
    } else if (accessType === 'shield' && !this.storeShieldAccess) {
      isLocked = true;
      lockReason = 'Classified S.H.I.E.L.D. Agency Tech. S.H.I.E.L.D. clearance required.';
    }

    const requiresShieldApproval = (accessType === 'shield');

    const isRPMode = !!(this.useResourcePoints || (this.character && this.character.useResourcePoints));
    const rpBudget = this.character ? this.character.getResourcePointsBudget() : (heroRankVal * 2);
    const rpSpent = this.character ? (this.character.spentResourcePoints || 0) : 0;
    const rpAvailable = this.character ? this.character.getAvailableResourcePoints() : Math.max(0, rpBudget - rpSpent);
    const rpCost = effectiveCostVal;
    const rpAffordable = (rpAvailable >= rpCost);

    let status = 'automatic';
    let targetColor = null;
    let verdictClass = 'verdict-automatic';
    let verdictIcon = '🟢';
    let verdictHeading = 'Automatic Purchase (No Roll Needed)';
    let verdictDesc = '';

    if (isRPMode) {
      if (rpAffordable) {
        status = 'rp_affordable';
        verdictClass = 'verdict-automatic';
        verdictIcon = '💳';
        verdictHeading = 'Sufficient Resource Points';
        verdictDesc = `Item costs ${rpCost} Resource Points (Rank Value). Hero has ${rpAvailable} / ${rpBudget} RP available this month. Purchasing will leave ${rpAvailable - rpCost} RP remaining.`;
      } else {
        status = 'rp_insufficient';
        verdictClass = 'verdict-unaffordable';
        verdictIcon = '🔴';
        verdictHeading = 'Insufficient Resource Points';
        verdictDesc = `Item costs ${rpCost} Resource Points, but hero only has ${rpAvailable} / ${rpBudget} RP remaining this month (Deficit: ${rpCost - rpAvailable} RP). Acquisition requires GM loan, sponsor funding, or waiting for next month's reset.`;
      }
    } else {
      // Evaluate TSR Player's Book p. 18 outcome:
      // Cost <= Resources - 3 ranks -> Automatic
      // Cost is 1-2 ranks below Resources -> Green FEAT
      // Cost == Resources -> Yellow FEAT
      // Cost > Resources -> Unaffordable (cannot roll alone)
      if (diff >= 3) {
        status = 'automatic';
        verdictClass = 'verdict-automatic';
        verdictIcon = '🟢';
        verdictHeading = 'Automatic Purchase (No Roll Needed)';
        verdictDesc = `Item cost (${effectiveCostRank}) is 3+ ranks below your Resources (${heroRankName}). Under TSR Player's Book p. 18 rules, this item is obtained automatically without requiring a Resource FEAT roll.`;
      } else if (diff === 1 || diff === 2) {
        status = 'green';
        targetColor = 'Green';
        verdictClass = 'verdict-green';
        verdictIcon = '🟡';
        verdictHeading = 'Green Resource FEAT Required';
        verdictDesc = `Item cost (${effectiveCostRank}) is ${diff} rank${diff > 1 ? 's' : ''} below your Resources (${heroRankName}). Requires a successful Green Resource FEAT. (TSR Rule: Karma cannot be added to Resource FEATs).`;
      } else if (diff === 0) {
        status = 'yellow';
        targetColor = 'Yellow';
        verdictClass = 'verdict-yellow';
        verdictIcon = '🟠';
        verdictHeading = 'Yellow Resource FEAT Required';
        verdictDesc = `Item cost (${effectiveCostRank}) matches your Resources (${heroRankName}). Requires a successful Yellow Resource FEAT. (TSR Rule: Karma cannot be added to Resource FEATs).`;
      } else {
        status = 'unaffordable';
        verdictClass = 'verdict-unaffordable';
        verdictIcon = '🔴';
        verdictHeading = 'Exceeds Resources (Unaffordable)';
        verdictDesc = `Item cost (${effectiveCostRank}) exceeds your Resources (${heroRankName}). Under Advanced Player's Book p. 18 rules, a lone hero cannot purchase items above their Resources rank without a patron, backer, group fund, or loan.`;
      }
    }

    return {
      heroRankName,
      heroRankVal,
      effectiveCostRank,
      effectiveCostVal,
      costNote,
      diff,
      status,
      targetColor,
      verdictClass,
      verdictIcon,
      verdictHeading,
      verdictDesc,
      isLocked,
      lockReason,
      accessType,
      requiresShieldApproval,
      isRPMode,
      rpBudget,
      rpSpent,
      rpAvailable,
      rpCost,
      rpAffordable
    };
  },

  renderEquipment(filterText = null, filterCat = null) {
    if (filterText !== null) this.storeFilterQuery = filterText;
    if (filterCat !== null) this.storeFilterCategory = filterCat;

    const q = (this.storeFilterQuery || '').toLowerCase().trim();
    const cat = this.storeFilterCategory || 'all';
    const access = this.storeAccessFilter || ['all'];

    // 1. Render Rulebook Store in wide modal format (max 2 rows per item)
    const tbody = document.getElementById('store-equipment-tbody');
    if (tbody && globalThis.PREBUILT_EQUIPMENT_CATALOG) {
      tbody.innerHTML = '';
      const descTooltip = document.getElementById('store-desc-hover-tooltip');
      if (descTooltip) descTooltip.style.display = 'none';
      const totalCatalogItems = globalThis.PREBUILT_EQUIPMENT_CATALOG.filter(item => !item.notForSale).length;
      const filtered = globalThis.PREBUILT_EQUIPMENT_CATALOG.filter(item => {
        if (item.notForSale) return false;
        return this.matchesStoreSearchQuery(item, q) && 
               this.matchesStoreCategory(item, cat) &&
               this.matchesStoreAccess(item, access);
      });

      const countTag = document.getElementById('store-item-count-tag');
      if (countTag) {
        let countText = `Showing ${filtered.length} of ${totalCatalogItems} TSR Items`;
        const isAllAccess = Array.isArray(access) ? access.includes('all') : access === 'all';
        if (!isAllAccess) {
          const activeList = Array.isArray(access) ? access : [access];
          const labels = activeList.map(a => {
            const accBtn = (typeof document !== 'undefined' && typeof document.querySelector === 'function') 
              ? document.querySelector(`#store-access-filter-group .store-access-filter-btn[data-store-access="${a}"]`) 
              : null;
            return accBtn ? accBtn.textContent.trim() : a;
          });
          countText += ` • Show: ${labels.join(', ')}`;
        }
        if (cat !== 'all') {
          const activeBtn = (typeof document !== 'undefined' && typeof document.querySelector === 'function') 
            ? document.querySelector(`#store-category-filter-group .store-filter-btn[data-store-cat="${cat}"]`) 
            : null;
          const catLabel = activeBtn ? activeBtn.textContent.split('(')[0].trim() : cat;
          countText += ` • ${catLabel}`;
        }
        if (q) {
          countText += ` • "${q}"`;
        }
        countTag.textContent = countText;
      }

      const storeBtn = document.getElementById('btn-open-equipment-store');
      if (storeBtn) {
        storeBtn.innerHTML = `🛒 Open Rulebook Equipment Store (${totalCatalogItems} TSR Items)`;
      }

      // Update Top Store Resource Status Badge
      const storeResBadge = document.getElementById('store-resource-status-badge');
      if (storeResBadge && this.character) {
        const resRank = this.character.resources.rankName;
        const resNum = this.character.resources.rankValue;
        const isRP = !!(this.useResourcePoints || this.character.useResourcePoints);
        if (isRP) {
          const budget = this.character.getResourcePointsBudget();
          const spent = this.character.spentResourcePoints || 0;
          const avail = this.character.getAvailableResourcePoints();
          storeResBadge.innerHTML = `
            <span class="res-rank-highlight">Resources: ${resRank} (${resNum})</span>
            <span style="opacity: 0.6;">•</span>
            <span class="res-points-highlight">Available: ${avail} / ${budget} RP</span>
            <span class="res-spent-highlight">(Spent: ${spent} RP)</span>
          `;
          storeResBadge.title = `Resource Points Rule Active: Budget = 2 × Resource Number (${budget} RP). Spent: ${spent} RP. Available: ${avail} RP.`;
        } else {
          storeResBadge.innerHTML = `
            <span class="res-rank-highlight">Resources: ${resRank} (${resNum})</span>
          `;
          storeResBadge.title = `Standard TSR FEAT Rules: Purchases evaluated via Resource FEAT rolls.`;
        }
      }

      if (filtered.length === 0) {
        const activeAccessStr = Array.isArray(access) ? access.join(', ') : access;
        tbody.innerHTML = `
          <tr>
            <td colspan="7" style="text-align: center; padding: 36px 16px; color: var(--text-muted);">
              <div style="font-size: 1.15rem; color: #f87171; margin-bottom: 6px; font-weight: 700;">🔍 No items found matching criteria</div>
              <div style="font-size: 10pt; color: #94a3b8; margin-bottom: 14px;">
                No equipment matches search "<strong>${q || '--'}</strong>" in category "<strong>${cat}</strong>" and show filter "<strong>${activeAccessStr}</strong>".
              </div>
              <button type="button" class="icon-btn primary" id="btn-store-reset-empty" style="font-size: 10pt; padding: 6px 16px;">
                ✕ Clear Search & Reset Filters
              </button>
            </td>
          </tr>
        `;
        const resetBtn = tbody.querySelector('#btn-store-reset-empty');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => this.clearStoreFilters());
        }
      } else {
        const isRPActive = !!(this.useResourcePoints || (this.character && this.character.useResourcePoints));
        filtered.forEach(item => {
          const tr = document.createElement('tr');
          const dmgProt = item.damage || item.type || '--';

          const accList = Array.isArray(item.accessTypes) && item.accessTypes.length > 0
            ? item.accessTypes
            : [item.accessType || 'civilian'];
          const accessBadge = accList.map(at => {
            if (at === 'military') return '<span class="meta-tag access-military">🎖️ Military</span>';
            if (at === 'black_market') return '<span class="meta-tag access-blackmarket">🕵️ Black Market</span>';
            if (at === 'shield') return '<span class="meta-tag access-shield">🦅 S.H.I.E.L.D.</span>';
            return '<span class="meta-tag access-civilian">Civilian</span>';
          }).join(' ');

          const costRankObj = (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.getRankByName)
            ? UniversalTableEngine.getRankByName(item.costRank)
            : null;
          const costAbbr = costRankObj?.abbr || item.costRank;
          const rpCostTag = isRPActive ? ` <span class="store-rp-tag">• ${item.costValue} RP</span>` : '';
          let costDisplay = `<span class="meta-tag store-cost-tag">${costAbbr} (${item.costValue})${rpCostTag}</span>`;
          if (this.storeBlackMarketAccess && item.blackMarketCostRank) {
            const bmRankObj = (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.getRankByName)
              ? UniversalTableEngine.getRankByName(item.blackMarketCostRank)
              : null;
            const bmAbbr = bmRankObj?.abbr || item.blackMarketCostRank;
            const bmRpTag = isRPActive ? ` <span class="store-rp-tag">• ${item.blackMarketCostValue} RP</span>` : '';
            costDisplay = `
              <div style="display: flex; flex-direction: column; gap: 2px;">
                <span class="meta-tag store-cost-tag">${costAbbr} (${item.costValue})${rpCostTag}</span>
                <span class="store-bm-cost">BM: ${bmAbbr} (${item.blackMarketCostValue})${bmRpTag}</span>
              </div>
            `;
          }

          tr.innerHTML = `
            <td>
              <div style="display: flex; align-items: center; gap: 6px;">
                <button type="button" class="help-circle-btn" data-help-equip="${item.id}" title="View details of ${item.name}">?</button>
                <strong class="eq-item-name">${item.name}</strong> ${item.isUnique ? '<span class="meta-tag tag-unique">Unique</span>' : ''}
              </div>
            </td>
            <td><span class="meta-tag">${item.category}</span></td>
            <td>${accessBadge}</td>
            <td>${costDisplay}</td>
            <td style="color: #38bdf8; font-weight: 600;">${dmgProt}</td>
            <td><div class="store-desc-clamp" data-desc-full="${(item.description || '').replace(/"/g, '&quot;')}" data-desc-title="${(item.name || '').replace(/"/g, '&quot;')}">${item.description || '--'}</div></td>
            <td style="text-align: center;">
              <button class="icon-btn primary btn-store-procure" style="padding: 4px 6px; min-height: 32px; font-size: 10pt;" data-procure-item="${item.id}" title="Open procurement window to evaluate Resources and acquire per TSR rules">
                🛒 Procure
              </button>
            </td>
          `;

          const helpBtn = tr.querySelector('[data-help-equip]');
          if (helpBtn) {
            helpBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.showHelpModal('equipment', item.id);
            });
          }

          const procBtn = tr.querySelector('[data-procure-item]');
          if (procBtn) {
            procBtn.addEventListener('click', (e) => {
              this.openProcurementModal(item.id, e);
            });
          }

          tbody.appendChild(tr);
        });
      }
    }

    // 2. Render Carrying Inventory
    const invContainer = document.getElementById('equipment-container');
    if (invContainer) {
      invContainer.innerHTML = '';
      if (this.character.equipment.length === 0) {
        invContainer.innerHTML = '<p style="color: var(--text-muted); padding: 12px 0;">No equipment carried. Click <strong>🛒 Open Rulebook Equipment Store</strong> above or manufacture items in the <strong>Invention Lab</strong>.</p>';
        return;
      }

      this.character.equipment.forEach((eq, idx) => {
        const card = document.createElement('div');
        card.className = 'attack-card';
        card.innerHTML = `
          <div class="attack-header">
            <div style="display: flex; align-items: center; gap: 6px;">
              <button type="button" class="help-circle-btn" data-help-gear="${idx}" title="View details of ${eq.name}">?</button>
              <strong style="color: #38bdf8; font-size: 11pt;">${eq.name}</strong>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <label class="checkbox-label"><input type="checkbox" data-equip-toggle="${idx}" ${eq.equipped ? 'checked' : ''}> Equipped</label>
              <button class="icon-btn" style="padding: 2px 8px; min-height: 28px; background: #881337;" data-del-gear="${idx}">✕</button>
            </div>
          </div>
          <div class="attack-meta">
            <span class="meta-tag">${eq.type}</span>
            ${eq.damage ? `<span class="meta-tag" style="color:#38bdf8;">${eq.damage}</span>` : ''}
            <span class="meta-tag">Range: ${eq.range || 'Contact'}</span>
            <span class="meta-tag">Material: ${eq.materialStrength || 'Good'}</span>
          </div>
          <div class="attack-notes">${eq.notes || ''}</div>
        `;

        const helpGearBtn = card.querySelector(`[data-help-gear="${idx}"]`);
        if (helpGearBtn) {
          helpGearBtn.addEventListener('click', () => {
            this.showHelpModal('equipment', eq.name || eq.id);
          });
        }

        card.querySelector(`[data-equip-toggle="${idx}"]`).addEventListener('change', (e) => {
          this.character.equipment[idx].equipped = e.target.checked;
          this.saveState();
          this.renderAttacks();
        });

        card.querySelector(`[data-del-gear="${idx}"]`).addEventListener('click', () => {
          this.character.equipment.splice(idx, 1);
          this.saveState();
          this.render();
        });

        invContainer.appendChild(card);
      });
    }
  },

  openProcurementModal(itemId, clickEvent = null) {
    const item = (globalThis.PREBUILT_EQUIPMENT_CATALOG || []).find(i => i.id === itemId);
    if (!item) return;

    this.activeProcurementItem = item;
    const evalRes = this.evaluateProcurement(item);

    const modal = document.getElementById('procurement-modal');
    if (!modal) return;

    // Set title and access badge
    const titleEl = document.getElementById('procure-item-title');
    if (titleEl) titleEl.textContent = `🛒 Procure ${item.name}`;

    const badgeEl = document.getElementById('procure-item-access-badge');
    if (badgeEl) {
      badgeEl.className = `meta-tag access-${item.accessType || 'civilian'}`;
      const labels = {
        civilian: 'Civilian',
        military: '🎖️ Military',
        black_market: '🕵️ Black Market',
        shield: '🦅 S.H.I.E.L.D.'
      };
      badgeEl.textContent = labels[item.accessType] || item.accessType || 'Civilian';
    }

    // Comparison cards
    const heroResEl = document.getElementById('procure-hero-resources');
    if (heroResEl) {
      if (evalRes.isRPMode) {
        heroResEl.textContent = `${evalRes.heroRankName} (${evalRes.heroRankVal}) • ${evalRes.rpAvailable} / ${evalRes.rpBudget} RP`;
      } else {
        heroResEl.textContent = `${evalRes.heroRankName} (${evalRes.heroRankVal})`;
      }
    }
    const heroResSub = document.getElementById('procure-hero-res-sub');
    if (heroResSub) {
      if (evalRes.isRPMode) {
        heroResSub.textContent = `Resources & Available RP (Spent: ${evalRes.rpSpent} RP)`;
      } else {
        heroResSub.textContent = `Personal Resource Rank`;
      }
    }

    const itemCostEl = document.getElementById('procure-item-cost');
    if (itemCostEl) {
      if (evalRes.isRPMode) {
        itemCostEl.textContent = `${evalRes.effectiveCostRank} (${evalRes.effectiveCostVal}) • Cost: ${evalRes.rpCost} RP`;
      } else {
        itemCostEl.textContent = `${evalRes.effectiveCostRank} (${evalRes.effectiveCostVal})`;
      }
    }
    const itemCostSub = document.getElementById('procure-item-cost-sub');
    if (itemCostSub) {
      if (evalRes.isRPMode) {
        itemCostSub.textContent = `${evalRes.costNote} (Deducts ${evalRes.rpCost} RP)`;
      } else {
        itemCostSub.textContent = evalRes.costNote;
      }
    }

    // Verdict box
    const verdictBox = document.getElementById('procure-verdict-box');
    if (verdictBox) {
      verdictBox.className = `procure-verdict-box ${evalRes.verdictClass}`;
    }
    const verdictIcon = document.getElementById('procure-verdict-icon');
    if (verdictIcon) verdictIcon.textContent = evalRes.verdictIcon;
    const verdictHead = document.getElementById('procure-verdict-heading');
    if (verdictHead) verdictHead.textContent = evalRes.verdictHeading;
    const verdictDesc = document.getElementById('procure-verdict-desc');
    if (verdictDesc) verdictDesc.textContent = evalRes.verdictDesc;

    // S.H.I.E.L.D. notice
    const shieldNotice = document.getElementById('procure-shield-notice');
    const shieldApprovalCheck = document.getElementById('procure-shield-gm-approval');
    if (shieldNotice) {
      shieldNotice.style.display = evalRes.requiresShieldApproval ? 'block' : 'none';
      if (shieldApprovalCheck) shieldApprovalCheck.checked = false;
    }

    // Restricted notice
    const restrictedNotice = document.getElementById('procure-restricted-notice');
    const restrictedHead = document.getElementById('procure-restricted-heading');
    const restrictedDesc = document.getElementById('procure-restricted-desc');
    if (restrictedNotice) {
      if (evalRes.isLocked) {
        restrictedNotice.style.display = 'block';
        if (restrictedHead) restrictedHead.textContent = '⛔ Clearance Access Restricted';
        if (restrictedDesc) restrictedDesc.textContent = evalRes.lockReason;
      } else {
        restrictedNotice.style.display = 'none';
      }
    }

    // Item specifications
    const detailsEl = document.getElementById('procure-item-details');
    if (detailsEl) {
      const stats = [];
      if (item.damage) stats.push(`<strong>Damage / Effect:</strong> ${item.damage}`);
      if (item.range) stats.push(`<strong>Range:</strong> ${item.range}`);
      if (item.rateOfFire) stats.push(`<strong>Rate of Fire:</strong> ${item.rateOfFire}`);
      if (item.shots) stats.push(`<strong>Capacity / Shots:</strong> ${item.shots}`);
      if (item.materialStrength) stats.push(`<strong>Material Strength:</strong> ${item.materialStrength}`);
      if (item.source) stats.push(`<strong>Source:</strong> ${item.source}`);

      detailsEl.innerHTML = `
        <div class="procure-stat-chips">
          ${stats.map(s => `<span>${s}</span>`).join(' • ')}
        </div>
        <div class="procure-item-desc">${item.description || '--'}</div>
      `;
    }

    // Action buttons container
    const actionsContainer = document.getElementById('procure-actions-container');
    if (actionsContainer) {
      actionsContainer.innerHTML = '';

      if (evalRes.isLocked) {
        // Option to grant clearance or GM override
        const unlockBtn = document.createElement('button');
        unlockBtn.type = 'button';
        unlockBtn.className = 'icon-btn btn-unlock-clearance';
        unlockBtn.innerHTML = `🔓 Grant ${item.accessType === 'military' ? 'Military' : item.accessType === 'black_market' ? 'Black Market' : 'S.H.I.E.L.D.'} Clearance`;
        unlockBtn.addEventListener('click', () => {
          if (item.accessType === 'military') {
            this.storeMilitaryAccess = true;
            if (typeof localStorage !== 'undefined') localStorage.setItem('msh_store_military_access', 'true');
          }
          if (item.accessType === 'black_market') {
            this.storeBlackMarketAccess = true;
            if (typeof localStorage !== 'undefined') localStorage.setItem('msh_store_blackmarket_access', 'true');
          }
          if (item.accessType === 'shield') {
            this.storeShieldAccess = true;
            if (typeof localStorage !== 'undefined') localStorage.setItem('msh_store_shield_access', 'true');
          }
          this.updateStoreClearancesUI();
          this.renderEquipment();
          this.openProcurementModal(item.id, clickEvent);
        });
        actionsContainer.appendChild(unlockBtn);

        const overrideBtn = document.createElement('button');
        overrideBtn.type = 'button';
        overrideBtn.className = 'icon-btn';
        overrideBtn.innerHTML = `⚡ GM Waiver (Procure)`;
        overrideBtn.addEventListener('click', (e) => this.finalizeItemAcquisition(item, 'GM Clearance Waiver', e));
        actionsContainer.appendChild(overrideBtn);
      } else if (evalRes.isRPMode) {
        if (evalRes.status === 'rp_affordable') {
          const spendBtn = document.createElement('button');
          spendBtn.type = 'button';
          spendBtn.className = 'icon-btn primary';
          spendBtn.innerHTML = `💳 Spend ${evalRes.rpCost} RP & Acquire Item`;
          spendBtn.addEventListener('click', (e) => {
            if (evalRes.requiresShieldApproval && shieldApprovalCheck && !shieldApprovalCheck.checked) {
              this.showCustomAlert('S.H.I.E.L.D. equipment requisition requires GM Approval checkbox to be confirmed.', '🦅 Clearance Required', e);
              return;
            }
            this.finalizeItemAcquisition(item, `Purchased for ${evalRes.rpCost} Resource Points`, e);
          });
          actionsContainer.appendChild(spendBtn);
        } else {
          const loanBtn = document.createElement('button');
          loanBtn.type = 'button';
          loanBtn.className = 'icon-btn btn-sponsor-loan';
          loanBtn.innerHTML = `🤝 Sponsor / GM Loan Waiver (Acquire)`;
          loanBtn.addEventListener('click', (e) => {
            this.finalizeItemAcquisition(item, 'Sponsor / GM Loan Waiver Override', e);
          });
          actionsContainer.appendChild(loanBtn);
        }
      } else if (evalRes.status === 'automatic') {
        const autoBtn = document.createElement('button');
        autoBtn.type = 'button';
        autoBtn.className = 'icon-btn primary';
        autoBtn.innerHTML = `🛒 Acquire Automatically (No Roll Needed)`;
        autoBtn.addEventListener('click', (e) => {
          if (evalRes.requiresShieldApproval && shieldApprovalCheck && !shieldApprovalCheck.checked) {
            this.showCustomAlert('S.H.I.E.L.D. equipment requisition requires GM Approval checkbox to be confirmed.', '🦅 Clearance Required', e);
            return;
          }
          this.finalizeItemAcquisition(item, 'Automatic Purchase (Player\'s Book p. 18)', e);
        });
        actionsContainer.appendChild(autoBtn);
      } else if (evalRes.status === 'green' || evalRes.status === 'yellow') {
        const rollBtn = document.createElement('button');
        rollBtn.type = 'button';
        rollBtn.className = 'icon-btn primary';
        rollBtn.innerHTML = `🎲 Roll Resource FEAT (${evalRes.targetColor})`;
        rollBtn.addEventListener('click', (e) => {
          if (evalRes.requiresShieldApproval && shieldApprovalCheck && !shieldApprovalCheck.checked) {
            this.showCustomAlert('S.H.I.E.L.D. equipment requisition requires GM Approval checkbox to be confirmed.', '🦅 Clearance Required', e);
            return;
          }
          this.closeProcurementModal();
          this.openRoller({
            name: `Procure: ${item.name}`,
            abilityName: 'Resources',
            initialRank: evalRes.heroRankName,
            actionType: 'Resource FEAT',
            damageValue: 0,
            isResourceFEAT: true,
            procureItem: item,
            targetColor: evalRes.targetColor
          }, e);
        });
        actionsContainer.appendChild(rollBtn);

        const overrideBtn = document.createElement('button');
        overrideBtn.type = 'button';
        overrideBtn.className = 'icon-btn';
        overrideBtn.innerHTML = `⚡ GM Discretion / Grant`;
        overrideBtn.addEventListener('click', (e) => this.finalizeItemAcquisition(item, 'GM Discretion Grant', e));
        actionsContainer.appendChild(overrideBtn);
      } else if (evalRes.status === 'unaffordable') {
        const loanBtn = document.createElement('button');
        loanBtn.type = 'button';
        loanBtn.className = 'icon-btn btn-sponsor-loan';
        loanBtn.innerHTML = `🤝 Sponsor / Loan Override (Acquire)`;
        loanBtn.addEventListener('click', (e) => {
          this.finalizeItemAcquisition(item, 'Sponsor / Group Funding Override', e);
        });
        actionsContainer.appendChild(loanBtn);
      }
    }

    modal.classList.add('open');
  },

  closeProcurementModal() {
    const modal = document.getElementById('procurement-modal');
    if (modal) modal.classList.remove('open');
    this.activeProcurementItem = null;
  },

  finalizeItemAcquisition(item, reasonText = 'Purchased', mouseEvent = null) {
    const isRPMode = !!(this.useResourcePoints || (this.character && this.character.useResourcePoints));
    let deductedRP = 0;
    if (isRPMode) {
      const isBM = (item.accessType === 'black_market') || (this.storeBlackMarketAccess && item.blackMarketCostRank);
      const costVal = isBM && item.blackMarketCostValue ? item.blackMarketCostValue : (item.costValue || 6);
      this.character.spendResourcePoints(costVal);
      deductedRP = costVal;
    }

    this.character.equipment.push({
      id: 'eq_' + Date.now(),
      name: item.name,
      type: item.type || item.category,
      damage: item.damage,
      damageValue: item.damageValue || 0,
      range: item.range,
      rateOfFire: item.rateOfFire,
      materialStrength: item.materialStrength,
      notes: item.description,
      equipped: true
    });
    this.saveState();
    this.render();
    this.closeProcurementModal();
    const rpMsg = (isRPMode && deductedRP > 0) ? `\nDeducted ${deductedRP} RP (Remaining: ${this.character.getAvailableResourcePoints()} RP)` : '';
    this.showCustomAlert(`Added "${item.name}" to character equipment!\nReason: ${reasonText}${rpMsg}`, '🛍️ Equipment Acquired', mouseEvent);
  },

  setStoreCategory(catKey) {
    this.storeFilterCategory = catKey || 'all';
    const storeCatBtns = document.querySelectorAll('#store-category-filter-group .store-filter-btn');
    storeCatBtns.forEach(b => {
      const bCat = (b.getAttribute('data-store-cat') || 'all').toLowerCase();
      b.classList.toggle('active', bCat === this.storeFilterCategory.toLowerCase());
    });
    this.renderEquipment();
  },

  setStoreAccessFilter(accessKey) {
    if (!Array.isArray(this.storeAccessFilter)) {
      this.storeAccessFilter = [this.storeAccessFilter || 'all'];
    }
    const key = (accessKey || 'all').toLowerCase();
    if (key === 'all') {
      this.storeAccessFilter = ['all'];
    } else {
      let current = this.storeAccessFilter.filter(k => k !== 'all');
      if (current.includes(key)) {
        current = current.filter(k => k !== key);
      } else {
        current.push(key);
      }
      const allCategories = ['civilian', 'military', 'black_market', 'shield'];
      if (current.length === 0 || allCategories.every(c => current.includes(c))) {
        this.storeAccessFilter = ['all'];
      } else {
        this.storeAccessFilter = current;
      }
    }

    const isAll = this.storeAccessFilter.includes('all');
    const storeAccessBtns = document.querySelectorAll('#store-access-filter-group .store-access-filter-btn');
    storeAccessBtns.forEach(b => {
      const bAcc = (b.getAttribute('data-store-access') || 'all').toLowerCase();
      if (bAcc === 'all') {
        b.classList.toggle('active', isAll);
      } else {
        b.classList.toggle('active', !isAll && this.storeAccessFilter.includes(bAcc));
      }
    });
    this.renderEquipment();
  },

  clearStoreFilters() {
    this.storeFilterQuery = '';
    this.storeFilterCategory = 'all';
    this.storeAccessFilter = ['all'];
    const searchInp = document.getElementById('filter-store-search');
    if (searchInp) searchInp.value = '';
    const storeCatBtns = document.querySelectorAll('#store-category-filter-group .store-filter-btn');
    storeCatBtns.forEach(b => {
      const bCat = (b.getAttribute('data-store-cat') || 'all').toLowerCase();
      b.classList.toggle('active', bCat === 'all');
    });
    const storeAccessBtns = document.querySelectorAll('#store-access-filter-group .store-access-filter-btn');
    storeAccessBtns.forEach(b => {
      const bAcc = (b.getAttribute('data-store-access') || 'all').toLowerCase();
      b.classList.toggle('active', bAcc === 'all');
    });
    this.renderEquipment();
  },

  openEquipmentStore() {
    this.updateStoreClearancesUI();
    const searchInp = document.getElementById('filter-store-search');
    if (searchInp) {
      searchInp.value = this.storeFilterQuery || '';
    }
    const storeCatBtns = document.querySelectorAll('#store-category-filter-group .store-filter-btn');
    storeCatBtns.forEach(b => {
      const bCat = (b.getAttribute('data-store-cat') || 'all').toLowerCase();
      b.classList.toggle('active', bCat === (this.storeFilterCategory || 'all').toLowerCase());
    });
    if (!Array.isArray(this.storeAccessFilter)) {
      this.storeAccessFilter = [this.storeAccessFilter || 'all'];
    }
    const isAll = this.storeAccessFilter.includes('all');
    const storeAccessBtns = document.querySelectorAll('#store-access-filter-group .store-access-filter-btn');
    storeAccessBtns.forEach(b => {
      const bAcc = (b.getAttribute('data-store-access') || 'all').toLowerCase();
      if (bAcc === 'all') {
        b.classList.toggle('active', isAll);
      } else {
        b.classList.toggle('active', !isAll && this.storeAccessFilter.includes(bAcc));
      }
    });
    this.renderEquipment();
    const modal = document.getElementById('equipment-store-modal');
    if (modal) modal.classList.add('open');
  },

  setAreaDivisionRule(rule) {
    this.areaDivisionRule = rule || 'standard';
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('msh_option_area_division', this.areaDivisionRule);
    }
    const areaOpt = document.getElementById('option-area-division');
    if (areaOpt) areaOpt.value = this.areaDivisionRule;
    this.updateAreaDivisionDisplay();
  },

  setUseResourcePoints(enabled) {
    this.useResourcePoints = !!enabled;
    if (this.character) {
      this.character.useResourcePoints = this.useResourcePoints;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('msh_option_resource_points', this.useResourcePoints ? 'true' : 'false');
    }
    const opt = document.getElementById('option-resource-points');
    if (opt) opt.checked = this.useResourcePoints;
    this.renderBackground();
    this.renderEquipment();
    this.saveState();
  },

  updateAreaDivisionDisplay() {
    const titleEl = document.getElementById('cheat-active-area-rule');
    const descEl = document.getElementById('cheat-active-area-rule-desc');
    if (!titleEl) return;

    if (this.areaDivisionRule === 'quarter') {
      titleEl.textContent = 'Quarter Area Rule: 4 Quadrants of 33 Feet (33 ft / quadrant)';
      if (descEl) {
        descEl.innerHTML = '<strong>Quarter Area Rule Active:</strong> Each standard 132-foot area square is subdivided into <strong>4 equal quadrants of 33 feet</strong> (2&times;2 sub-grid). Ideal for indoor skirmishes, tactical rooms, and corridor combat. Standard 1 area moves traverse 4 quadrants.';
      }
    } else if (this.areaDivisionRule === 'six') {
      titleEl.textContent = 'Six Subareas Rule: 6 Squares of 22 Feet (22 ft / subarea)';
      if (descEl) {
        descEl.innerHTML = '<strong>Six Subareas Rule Active:</strong> Each standard 132-foot area square is subdivided into <strong>6 subareas of 22 feet</strong> (2&times;3 sub-grid, equivalent to 1 hex or 22 ft per 1 second of sprint). Provides maximum tactical granularity for battle-mats and miniatures.';
      }
    } else {
      titleEl.textContent = 'Standard Full Areas: 1 Area = 132 Feet (Default TSR Rules)';
      if (descEl) {
        descEl.innerHTML = '<strong>Standard Rule Active:</strong> 1 Area is 132 feet across (approx. 44 yards / 1 city block width). Standard movement and combat ranges apply.';
      }
    }
  },

  setTouchFriendly(active) {
    this.touchFriendly = !!active;
    if (typeof document !== 'undefined' && document.body && document.body.classList) {
      if (typeof document.body.classList.toggle === 'function') {
        document.body.classList.toggle('touch-friendly', this.touchFriendly);
      } else if (this.touchFriendly) {
        if (typeof document.body.classList.add === 'function') document.body.classList.add('touch-friendly');
      } else {
        if (typeof document.body.classList.remove === 'function') document.body.classList.remove('touch-friendly');
      }
    }
    const touchOpt = typeof document !== 'undefined' ? document.getElementById('option-touch-friendly') : null;
    if (touchOpt) touchOpt.checked = this.touchFriendly;
    const menuStatus = typeof document !== 'undefined' ? document.getElementById('menu-item-touch-status') : null;
    if (menuStatus) menuStatus.textContent = this.touchFriendly ? 'ON' : 'OFF';

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('msh_option_touch_friendly', this.touchFriendly ? 'true' : 'false');
    }
    if (typeof this.adjustRollerModalBounds === 'function') {
      this.adjustRollerModalBounds();
    }
  },

  setTheme(themeName) {
    let theme = themeName;
    if (theme === 'off-white') theme = 'manilla';
    const validThemes = ['four-color', 'manilla', 'aqua'];
    if (!validThemes.includes(theme)) theme = 'four-color';
    this.currentTheme = theme;

    if (typeof document !== 'undefined' && document.body) {
      if (typeof document.body.setAttribute === 'function') {
        document.body.setAttribute('data-theme', theme);
      }
    }
    const themeSelect = typeof document !== 'undefined' ? document.getElementById('option-theme') : null;
    if (themeSelect) themeSelect.value = theme;

    const themeMenuStatus = typeof document !== 'undefined' ? document.getElementById('menu-item-theme-status') : null;
    if (themeMenuStatus) {
      const displayNames = {
        'four-color': 'Four-color',
        'manilla': 'Manilla',
        'aqua': 'Aqua'
      };
      themeMenuStatus.textContent = displayNames[theme] || 'Four-color';
    }

    // Update flyout menu checkmark indicators & active states
    if (typeof document !== 'undefined') {
      const checkFourColor = document.getElementById('theme-check-four-color');
      const checkManilla = document.getElementById('theme-check-manilla');
      const checkAqua = document.getElementById('theme-check-aqua');
      if (checkFourColor) checkFourColor.textContent = theme === 'four-color' ? '✓' : '';
      if (checkManilla) checkManilla.textContent = theme === 'manilla' ? '✓' : '';
      if (checkAqua) checkAqua.textContent = theme === 'aqua' ? '✓' : '';

      if (typeof document.querySelectorAll === 'function') {
        const themeBtns = document.querySelectorAll('.theme-option-btn');
        if (themeBtns && typeof themeBtns.forEach === 'function') {
          themeBtns.forEach(btn => {
            const btnVal = btn.getAttribute ? btn.getAttribute('data-theme-val') : null;
            if (btn.classList && typeof btn.classList.toggle === 'function') {
              btn.classList.toggle('active', btnVal === theme);
            }
          });
        }
      }
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('msh_option_theme', theme);
    }
  },

  cycleTheme() {
    const order = ['four-color', 'manilla', 'aqua'];
    const currentIndex = order.indexOf(this.currentTheme || 'four-color');
    const nextTheme = order[(currentIndex + 1) % order.length];
    this.setTheme(nextTheme);
  },

  addInvPower(mouseEvent = null) {
    const pwrSel = document.getElementById('inv-power-select');
    const rankSel = document.getElementById('inv-power-rank');
    if (!pwrSel || !rankSel || !globalThis.MSH_POWERS) return;

    if (!pwrSel.value) {
      this.showCustomAlert('Please select a superpower from the dropdown before adding to the device.', 'Select Power', mouseEvent);
      return;
    }

    const catalogPower = globalThis.MSH_POWERS.find(p => p.name === pwrSel.value || p.id === pwrSel.value);
    if (!catalogPower) {
      this.showCustomAlert('Please select a superpower from the dropdown before adding to the device.', 'Select Power', mouseEvent);
      return;
    }
    const pName = catalogPower.name;
    const rObj = UniversalTableEngine.getRankByName(rankSel.value);

    this.invPowers.push({
      id: 'inv_pwr_' + Date.now() + Math.random().toString(36).substr(2, 4),
      code: catalogPower ? catalogPower.id : '',
      name: pName,
      rankName: rObj.name,
      rankValue: rObj.num,
      isStarred: catalogPower ? !!catalogPower.isStarred : false
    });

    pwrSel.value = '';
    this.renderInvPowersList();
    this.handleCalculateInvention();
  },

  removeInvPower(id) {
    this.invPowers = this.invPowers.filter(p => p.id !== id);
    this.renderInvPowersList();
    this.handleCalculateInvention();
  },

  renderInvPowersList() {
    const listEl = document.getElementById('inv-added-powers-list');
    const countBadge = document.getElementById('inv-power-count-badge');
    if (!listEl) return;

    if (countBadge) countBadge.textContent = `${this.invPowers.length} Power${this.invPowers.length === 1 ? '' : 's'}`;

    if (this.invPowers.length === 0) {
      listEl.innerHTML = '<span style="font-size: 10pt; color: var(--text-dim);">No powers added yet. Select a power and rank above to include in device.</span>';
      return;
    }

    listEl.innerHTML = this.invPowers.map(p => {
      const rObj = UniversalTableEngine.getRankByName(p.rankName);
      const star = p.isStarred ? '★ ' : '';
      return `
        <div class="inv-item-row" style="display: flex; justify-content: space-between; align-items: center; border-radius: 4px; padding: 4px 8px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <strong class="inv-item-name" style="font-size: 10pt;">${star}${p.name}</strong>
            <span class="rank-pill" style="background-color: ${rObj.color}; font-size: 10pt; padding: 1px 6px;">${rObj.name} (${rObj.num})</span>
          </div>
          <button type="button" class="icon-btn" data-del-inv-power="${p.id}" style="padding: 2px 8px; min-height: 28px; font-size: 10pt; background: #881337;" title="Remove power from invention">✕</button>
        </div>
      `;
    }).join('');
  },

  addInvAbilityBoost() {
    const abSel = document.getElementById('inv-boost-ability');
    const modeSel = document.getElementById('inv-boost-mode');
    const rankSel = document.getElementById('inv-boost-rank');
    if (!abSel || !modeSel || !rankSel) return;

    const ability = abSel.value;
    const mode = modeSel.value;
    let rankName = rankSel.value;
    let rankValue = 0;
    let cs = 1;

    if (mode === 'bonus') {
      cs = parseInt(rankSel.value) || 1;
      rankName = `+${cs} CS`;
      rankValue = cs * 10;
    } else {
      const rObj = UniversalTableEngine.getRankByName(rankName);
      rankName = rObj.name;
      rankValue = rObj.num;
    }

    const existingIdx = this.invAbilityBoosts.findIndex(b => b.ability.toLowerCase() === ability.toLowerCase());
    const boostEntry = {
      id: existingIdx >= 0 ? this.invAbilityBoosts[existingIdx].id : ('inv_bst_' + Date.now() + Math.random().toString(36).substr(2, 4)),
      ability: ability,
      mode: mode,
      rankName: rankName,
      rankValue: rankValue,
      cs: cs
    };

    if (existingIdx >= 0) {
      this.invAbilityBoosts[existingIdx] = boostEntry;
    } else {
      this.invAbilityBoosts.push(boostEntry);
    }

    this.renderInvAbilityBoostsList();
    this.handleCalculateInvention();
  },

  removeInvAbilityBoost(id) {
    this.invAbilityBoosts = this.invAbilityBoosts.filter(b => b.id !== id);
    this.renderInvAbilityBoostsList();
    this.handleCalculateInvention();
  },

  renderInvAbilityBoostsList() {
    const listEl = document.getElementById('inv-added-boosts-list');
    const countBadge = document.getElementById('inv-boost-count-badge');
    if (!listEl) return;

    if (countBadge) countBadge.textContent = `${this.invAbilityBoosts.length} Boost${this.invAbilityBoosts.length === 1 ? '' : 's'}`;

    if (this.invAbilityBoosts.length === 0) {
      listEl.innerHTML = '<span style="font-size: 10pt; color: var(--text-dim);">No ability boosts added. (Optional: enhance Strength, Agility, etc.)</span>';
      return;
    }

    listEl.innerHTML = this.invAbilityBoosts.map(b => {
      const tagText = b.mode === 'bonus' ? b.rankName : `Set to ${b.rankName} (${b.rankValue})`;
      return `
        <div class="inv-item-row" style="display: flex; justify-content: space-between; align-items: center; border-radius: 4px; padding: 4px 8px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <strong class="inv-item-boost-name" style="font-size: 10pt;">${b.ability}</strong>
            <span class="meta-tag inv-item-tag" style="font-size: 10pt;">${tagText}</span>
          </div>
          <button type="button" class="icon-btn" data-del-inv-boost="${b.id}" style="padding: 2px 8px; min-height: 28px; font-size: 10pt; background: #881337;" title="Remove boost from invention">✕</button>
        </div>
      `;
    }).join('');
  },

  handleCalculateInvention() {
    const rawName = document.getElementById('inv-name')?.value?.trim() || '';
    const fallbackName = (this.invSourceType === 'magic') ? 'Custom Relic' : 'Custom Gadget';
    const params = {
      name: rawName || fallbackName,
      category: document.getElementById('inv-cat')?.value || 'Weapon',
      sourceType: this.invSourceType || 'tech',
      powers: this.invPowers,
      abilityBoosts: this.invAbilityBoosts,
      targetPowerName: (this.invPowers && this.invPowers.length > 0 ? this.invPowers[0].name : '') || document.getElementById('inv-power-select')?.value || 'Energy Blast',
      targetPowerRank: document.getElementById('inv-power-rank')?.value || 'Remarkable',
      materialRank: document.getElementById('inv-material-rank')?.value || 'Remarkable',
      inventorReasonRank: this.character.abilities.reason.rankName,
      inventorResourcesRank: this.character.resources.rankName,
      hasRelevantTalent: true,
      hasWorkshop: true,

      boostAreaEffect: document.getElementById('inv-boost-area')?.checked || false,
      boostArmorPiercing: document.getElementById('inv-boost-piercing')?.checked || false,
      boostOvercharge: document.getElementById('inv-boost-overcharge')?.checked || false,
      boostExtendedRange: document.getElementById('inv-boost-range')?.checked || false,
      boostAutonomousAI: document.getElementById('inv-boost-ai')?.checked || false,

      limitLimitedAmmo: document.getElementById('inv-limit-ammo')?.checked || false,
      limitExternalTether: document.getElementById('inv-limit-tether')?.checked || false,
      limitBulkyTwoHanded: document.getElementById('inv-limit-bulky')?.checked || false,
      limitCooldown: document.getElementById('inv-limit-cooldown')?.checked || false,
      limitBurnoutRisk: document.getElementById('inv-limit-burnout')?.checked || false
    };

    const project = InventionCreator.calculateProject(params);
    this.currentInventionProject = project;
    this.invProjectResult = project;

    const baseEl = document.getElementById('inv-base-check');
    if (baseEl) baseEl.textContent = `${project.highestRankName} (${project.highestRankNum})`;

    const diffEl = document.getElementById('inv-difficulty-rank');
    if (diffEl) diffEl.textContent = `${project.effectiveDifficultyRank} (Net: ${project.netShift >= 0 ? '+' : ''}${project.netShift} CS)`;

    const daysEl = document.getElementById('inv-build-days');
    if (daysEl) daysEl.textContent = `${project.estimatedBuildDays} Days`;

    const powerEl = document.getElementById('inv-power-source');
    if (powerEl) {
      powerEl.textContent = `${project.powerSource} (${project.charges})`;
      powerEl.title = `${project.powerSource} (${project.charges})`;
    }

    const warnEl = document.getElementById('inv-material-warn');
    if (warnEl) {
      if (project.hasMaterialOverload) {
        warnEl.style.display = 'block';
        warnEl.style.padding = '4px 8px';
        warnEl.style.borderRadius = '4px';
        warnEl.style.background = 'rgba(245, 158, 11, 0.15)';
        warnEl.style.border = '1px solid #f59e0b';
        warnEl.style.marginTop = '4px';
        warnEl.textContent = project.materialWarning;
      } else {
        warnEl.style.display = 'none';
        warnEl.textContent = '';
      }
    }

    // Update targets in the 3 Stage boxes
    const bpTargetEl = document.getElementById('inv-blueprint-target-text');
    if (bpTargetEl) bpTargetEl.textContent = `${project.blueprintFeatTarget} (${project.blueprintShift >= 0 ? '+' : ''}${project.blueprintShift} CS)`;

    const resTargetEl = document.getElementById('inv-resource-target-text');
    if (resTargetEl) resTargetEl.textContent = `${project.resourceFeatTarget} (${project.resourceShift >= 0 ? '+' : ''}${project.resourceShift} CS)`;

    const assTargetEl = document.getElementById('inv-assembly-target-text');
    if (assTargetEl) assTargetEl.textContent = `${project.assemblyFeatTarget} (${project.estimatedBuildDays} days)`;

    this.updateInventionStagesUI();
  },

  setInventionSourceType(type) {
    this.invSourceType = (type === 'magic') ? 'magic' : 'tech';
    const isMagic = (this.invSourceType === 'magic');

    const btnTech = document.getElementById('btn-inv-toggle-tech');
    const btnMagic = document.getElementById('btn-inv-toggle-magic');
    if (btnTech && btnMagic) {
      if (isMagic) {
        btnTech.classList.remove('active');
        btnMagic.classList.add('active', 'magic');
      } else {
        btnTech.classList.add('active');
        btnMagic.classList.remove('active', 'magic');
      }
    }

    const cardTitle = document.getElementById('inv-custom-card-title');
    if (cardTitle) {
      cardTitle.textContent = isMagic ? '🔮 Mystical Relic & Artifact Forge' : '🔬 Custom Device & Machine Builder';
    }

    const nameLabel = document.getElementById('inv-name-label');
    if (nameLabel) {
      nameLabel.textContent = isMagic ? 'Relic / Artifact Name:' : 'Invention / Device Name:';
    }

    const nameInput = document.getElementById('inv-name');
    if (nameInput) {
      nameInput.placeholder = isMagic ? 'Enter relic, amulet, or artifact name...' : 'Enter device or machine name...';
    }

    // Update category dropdown options
    const catSelect = document.getElementById('inv-cat');
    if (catSelect) {
      const curVal = catSelect.value;
      if (isMagic) {
        catSelect.innerHTML = `
          <option value="Weapon">Offensive Relic / Wand / Blade</option>
          <option value="Battlesuit">Mystic Raiment / Enchanted Armor</option>
          <option value="Robot/Drone">Golem / Homunculus / Automaton</option>
          <option value="Propulsion">Flying Carpet / Portal Talisman</option>
          <option value="Utility">Scrying Glass / Warding Amulet</option>
          <option value="Cybernetics">Eldritch Graft / Infused Flesh</option>
        `;
      } else {
        catSelect.innerHTML = `
          <option value="Weapon">Offensive Weapon</option>
          <option value="Battlesuit">Powered Battlesuit / Exosuit</option>
          <option value="Robot/Drone">Robot / Drone (Machines of Doom)</option>
          <option value="Propulsion">Propulsion / Vehicle</option>
          <option value="Utility">Sensory / Utility Device</option>
          <option value="Cybernetics">Cybernetic Enhancement / Implant</option>
        `;
      }
      catSelect.value = curVal || 'Weapon';
    }

    // Update feasibility labels
    const feasTitle = document.getElementById('inv-feasibility-title');
    if (feasTitle) {
      feasTitle.textContent = isMagic ? '✨ Arcane Feasibility & Binding (Auto-Calculated)' : '📊 Engineering Feasibility (Auto-Calculated)';
    }

    const baseLabel = document.getElementById('inv-base-label');
    if (baseLabel) {
      baseLabel.textContent = isMagic ? 'Base Mystic Rank:' : 'Base Tech Rank:';
    }

    const powerLabel = document.getElementById('inv-power-label');
    if (powerLabel) {
      powerLabel.textContent = isMagic ? 'Mystic Conduit:' : 'Power Supply:';
    }

    // Update 3-Stage Workflow Labels
    const procTitle = document.getElementById('inv-process-title');
    if (procTitle) {
      procTitle.textContent = isMagic ? '✨ Relic Consecration: 3 Required Rituals' : '🛠️ Invention Process: 3 Required FEATs';
    }

    const stageBpTitle = document.getElementById('inv-stage-blueprint-title');
    if (stageBpTitle) {
      stageBpTitle.textContent = isMagic ? '1. 📜 Arcane Inscription FEAT' : '1. 📐 Blueprint Design FEAT';
    }

    const stageBpAttr = document.getElementById('inv-stage-blueprint-attr');
    if (stageBpAttr) {
      stageBpAttr.textContent = isMagic ? 'Reason / Occult' : 'Reason';
    }

    const btnRollBp = document.getElementById('btn-roll-inv-blueprint');
    if (btnRollBp) {
      btnRollBp.textContent = isMagic ? '🎲 Roll Inscription' : '🎲 Roll Design';
    }

    const stageResTitle = document.getElementById('inv-stage-resource-title');
    if (stageResTitle) {
      stageResTitle.textContent = isMagic ? '2. 🧪 Reagent Procurement FEAT' : '2. 🔩 Resource Procurement FEAT';
    }

    const btnRollRes = document.getElementById('btn-roll-inv-resource');
    if (btnRollRes) {
      btnRollRes.textContent = isMagic ? '🎲 Roll Reagents' : '🎲 Roll Resources';
    }

    const stageAssTitle = document.getElementById('inv-stage-assembly-title');
    if (stageAssTitle) {
      stageAssTitle.textContent = isMagic ? '3. ⚡ Ritual Consecration FEAT' : '3. 🛠️ Assembly & Construction FEAT';
    }

    const stageAssAttr = document.getElementById('inv-stage-assembly-attr');
    if (stageAssAttr) {
      stageAssAttr.textContent = isMagic ? 'Reason / Occult' : 'Reason';
    }

    const stageAssFacil = document.getElementById('inv-stage-assembly-facil');
    if (stageAssFacil) {
      stageAssFacil.textContent = isMagic ? 'Requires Sanctum' : 'Requires Workshop';
    }

    const btnRollAss = document.getElementById('btn-roll-inv-assembly');
    if (btnRollAss) {
      btnRollAss.textContent = isMagic ? '🎲 Roll Ritual' : '🎲 Roll Assembly';
    }

    const btnAddGear = document.getElementById('btn-add-invention-to-gear');
    if (btnAddGear) {
      btnAddGear.textContent = isMagic ? '✨ Consecrate Relic into Hero\'s Equipment' : '📦 Add Completed Invention to Hero\'s Equipment';
    }

    this.handleCalculateInvention();
  },

  handleNewInvention(mouseEvent = null) {
    const nameEl = document.getElementById('inv-name');
    if (nameEl) nameEl.value = '';

    const catEl = document.getElementById('inv-cat');
    if (catEl) catEl.selectedIndex = 0;

    const matEl = document.getElementById('inv-material-rank');
    if (matEl) matEl.value = 'Remarkable';

    this.invPowers = [];
    this.invAbilityBoosts = [];
    this.invStageStatus = {
      blueprint: null,
      resource: null,
      procurement: null,
      assembly: null
    };
    this.currentInventionProject = null;

    const checkIds = [
      'inv-boost-area', 'inv-boost-piercing', 'inv-boost-overcharge', 'inv-boost-range', 'inv-boost-ai',
      'inv-limit-ammo', 'inv-limit-tether', 'inv-limit-bulky', 'inv-limit-cooldown', 'inv-limit-burnout'
    ];
    checkIds.forEach(id => {
      const chk = document.getElementById(id);
      if (chk) chk.checked = false;
    });

    this.renderInvPowersList();
    this.renderInvAbilityBoostsList();
    this.updateInventionStagesUI();
    this.handleCalculateInvention();
  },

  rollInventionStageFEAT(stage, mouseEvent = null) {
    if (!this.currentInventionProject) {
      this.handleCalculateInvention();
    }
    const p = this.currentInventionProject;
    const isMagic = (this.invSourceType === 'magic');

    if (stage === 'assembly') {
      const resPassed = !!(this.invStageStatus.procurement?.passed || this.invStageStatus.resource?.passed);
      if (!this.invStageStatus.blueprint?.passed || !resPassed) {
        this.showCustomAlert(
          isMagic 
            ? 'Phase 1 (Arcane Inscription) and Phase 2 (Reagent Procurement) must be completed before attempting Ritual Consecration!'
            : 'Phase 1 (Blueprint Design) and Phase 2 (Resource Procurement) must be passed before attempting Assembly & Construction!',
          'Prerequisite Phases Incomplete',
          mouseEvent
        );
        return;
      }
    }

    if (stage === 'procurement' || stage === 'resource') {
      const resRankObj = UniversalTableEngine.getRankByName(p.inventorResources);
      const targetRankObj = UniversalTableEngine.getRankByName(p.resourceFeatTarget);
      if (resRankObj.index - targetRankObj.index >= 3) {
        const autoPass = {
          passed: true,
          color: 'Green',
          roll: 'Auto',
          summary: isMagic
            ? `Automatic Procurement: ${p.inventorResources} Resources exceeds ${p.resourceFeatTarget} reagent difficulty by 3+ ranks.`
            : `Automatic Procurement: ${p.inventorResources} Resources exceeds ${p.resourceFeatTarget} cost by 3+ ranks.`
        };
        this.invStageStatus.procurement = autoPass;
        this.invStageStatus.resource = autoPass;
        this.updateInventionStagesUI();
        this.showCustomAlert(
          isMagic
            ? `Exotic reagents and focus components procured automatically! (Inventor Resources of ${p.inventorResources} is 3+ ranks higher than ${p.resourceFeatTarget} cost per Player's Book p. 18).`
            : `Components and power cells procured automatically! (Inventor Resources of ${p.inventorResources} is 3+ ranks higher than ${p.resourceFeatTarget} cost per Player's Book p. 18).`,
          isMagic ? '✨ Automatic Procurement' : '🔩 Automatic Procurement',
          mouseEvent
        );
        return;
      }

      this.openRoller({
        name: isMagic ? `Reagent Procurement: ${p.name}` : `Invention Procurement: ${p.name}`,
        abilityName: `Resources (${p.inventorResources})`,
        initialRank: p.inventorResources,
        shift: p.resourceShift,
        actionType: 'invention_stage',
        inventionStage: 'resource',
        project: p,
        targetColor: (resRankObj.index === targetRankObj.index) ? 'Yellow' : 'Green',
        damageValue: 0,
        isResourceFEAT: true
      }, mouseEvent);
      return;
    }

    if (stage === 'blueprint') {
      if (this.invStageStatus.blueprint?.roll === 'Known Blueprint') {
        this.showCustomAlert(
          isMagic
            ? 'This relic is being consecrated from a Mastered Schematic. The Phase 1 Arcane Inscription is already mastered and bypassed!'
            : 'This device is being built from a Known Blueprint schematic. The Phase 1 Blueprint Design FEAT is already mastered and bypassed!',
          'Schematic Already Mastered',
          mouseEvent
        );
        return;
      }

      this.openRoller({
        name: isMagic ? `Arcane Inscription: ${p.name}` : `Invention Blueprint: ${p.name}`,
        abilityName: `Reason (${p.inventorReason})`,
        initialRank: p.inventorReason,
        shift: p.blueprintShift,
        actionType: 'invention_stage',
        inventionStage: 'blueprint',
        project: p,
        targetColor: 'Green',
        damageValue: 0,
        isResourceFEAT: false
      }, mouseEvent);
      return;
    }

    if (stage === 'assembly') {
      this.openRoller({
        name: isMagic ? `Ritual Consecration: ${p.name}` : `Invention Assembly: ${p.name}`,
        abilityName: `Reason (${p.inventorReason})`,
        initialRank: p.inventorReason,
        shift: p.assemblyShift,
        actionType: 'invention_stage',
        inventionStage: 'assembly',
        project: p,
        targetColor: 'Green',
        damageValue: 0,
        isResourceFEAT: false
      }, mouseEvent);
      return;
    }
  },

  updateInventionStagesUI() {
    const stages = ['blueprint', 'resource', 'assembly'];
    let passedCount = 0;

    stages.forEach(st => {
      const badge = document.getElementById(`inv-stage-${st}-status`);
      const status = this.invStageStatus[st];
      if (!badge) return;

      if (!status) {
        badge.className = 'meta-tag inv-stage-badge pending';
        badge.textContent = 'Pending';
      } else if (status.passed) {
        passedCount++;
        badge.className = 'meta-tag inv-stage-badge passed';
        if (st === 'blueprint' && status.roll === 'Known Blueprint') {
          badge.textContent = 'Passed (Mastered Schematic)';
        } else {
          badge.textContent = `Passed (${status.color})`;
        }
      } else {
        badge.className = 'meta-tag inv-stage-badge failed';
        badge.textContent = `Failed (${status.color})`;
      }
    });

    const btnRollBlueprint = document.getElementById('btn-roll-inv-blueprint');
    if (btnRollBlueprint) {
      if (this.invStageStatus.blueprint?.roll === 'Known Blueprint') {
        btnRollBlueprint.innerHTML = '✓ Mastered';
        btnRollBlueprint.title = 'Blueprint already mastered (Phase 1 bypassed)';
        btnRollBlueprint.style.borderColor = '#10b981';
        btnRollBlueprint.style.color = '#34d399';
      } else {
        btnRollBlueprint.innerHTML = '🎲 Roll Design';
        btnRollBlueprint.title = 'Roll Phase 1 Blueprint Design FEAT';
        btnRollBlueprint.style.borderColor = '';
        btnRollBlueprint.style.color = '';
      }
    }

    const summaryBadge = document.getElementById('inv-process-summary-badge');
    if (summaryBadge) {
      if (passedCount === 3) {
        summaryBadge.innerHTML = '<span class="inv-ready-badge">✅ 3 / 3 Ready to Install!</span>';
      } else {
        summaryBadge.textContent = `${passedCount} / 3 Passed`;
      }
    }

    const buildBtn = document.getElementById('btn-add-invention-to-gear');
    if (buildBtn) {
      if (passedCount === 3) {
        buildBtn.style.opacity = '1';
        buildBtn.style.cursor = 'pointer';
        buildBtn.removeAttribute('disabled');
      } else {
        buildBtn.style.opacity = '0.5';
        buildBtn.style.cursor = 'not-allowed';
      }
    }
  },

  handleAddInventionToGear(mouseEvent = null) {
    if (!this.currentInventionProject) {
      this.handleCalculateInvention();
    }
    const p = this.currentInventionProject;
    const isMagic = (this.invSourceType === 'magic');

    const stagesPassed = this.invStageStatus.blueprint?.passed && 
                         (this.invStageStatus.procurement?.passed || this.invStageStatus.resource?.passed) && 
                         this.invStageStatus.assembly?.passed;

    if (!stagesPassed) {
      this.showCustomAlert(
        isMagic
          ? 'Please complete all three Consecration Rituals (Arcane Inscription, Reagent Procurement, and Ritual Consecration) before binding the relic to equipment!'
          : 'Please complete all three Invention FEATs (Blueprint Design, Resource Procurement, and Assembly) before installing the invention to equipment!',
        'Incomplete Invention Process',
        mouseEvent
      );
      return;
    }

    const pwrNames = (p.powers || []).map(x => `${x.name} [${x.rankName}]`).join(', ') || 'None';
    const bstNames = (p.abilityBoosts || []).map(x => `${x.ability}: ${x.rankName}`).join(', ') || 'None';
    const defaultName = isMagic ? 'Custom Mystic Relic' : 'Custom Invention';
    const itemName = (p.name && p.name.trim() !== '') ? p.name : defaultName;

    const item = {
      id: 'inv_' + Date.now(),
      name: itemName,
      type: p.category,
      damage: p.powers && p.powers.length ? `${p.powers[0].rankName} (${p.powers[0].rankValue})` : 'None',
      damageValue: p.powers && p.powers.length ? p.powers[0].rankValue : 0,
      range: p.activeBoosts.some(b => b.includes('Extended Range')) ? '6 areas' : '3 areas',
      materialStrength: p.materialRank,
      powers: Array.isArray(p.powers) ? [...p.powers] : [],
      abilityBoosts: Array.isArray(p.abilityBoosts) ? [...p.abilityBoosts] : [],
      notes: `${isMagic ? 'Mystic Forged Relic' : 'Machines of Doom Invention'}: Powers: ${pwrNames}. Ability Boosts: ${bstNames}. ${isMagic ? 'Forging' : 'Build'} time: ${p.estimatedBuildDays} days. ${isMagic ? 'Mystic Conduit' : 'Power source'}: ${p.powerSource}. Boosts: ${p.activeBoosts.join(', ') || 'None'}. Limits: ${p.activeLimits.join(', ') || 'None'}.`,
      equipped: true
    };

    this.character.equipment.push(item);

    // Automatically add to Known Blueprints Archive
    this.character.addKnownBlueprint({
      name: itemName,
      sourceType: isMagic ? 'magic' : 'tech',
      origin: 'custom-invention',
      category: p.category,
      costRank: p.resourceFeatTarget || 'Typical',
      resourceRank: p.resourceFeatTarget || 'Typical',
      materialRank: p.materialRank,
      blueprintShift: p.blueprintShift || 0,
      resourceShift: p.resourceShift || 0,
      assemblyShift: p.assemblyShift || 0,
      buildDays: p.estimatedBuildDays,
      powers: Array.isArray(p.powers) ? [...p.powers] : [],
      abilityBoosts: Array.isArray(p.abilityBoosts) ? [...p.abilityBoosts] : [],
      activeBoosts: Array.isArray(p.activeBoosts) ? [...p.activeBoosts] : [],
      activeLimits: Array.isArray(p.activeLimits) ? [...p.activeLimits] : [],
      notes: `${isMagic ? 'Mystic Forged Relic' : 'Machines of Doom Invention'}: Powers: ${pwrNames}. Ability Boosts: ${bstNames}.`
    });

    this.saveState();
    this.render();
    this.renderKnownBlueprints();

    // Reset invention workflow and clear name input
    const nameEl = document.getElementById('inv-name');
    if (nameEl) nameEl.value = '';
    this.invPowers = [];
    this.invAbilityBoosts = [];
    this.invStageStatus = { blueprint: null, resource: null, procurement: null, assembly: null };
    this.renderInvPowersList();
    this.renderInvAbilityBoostsList();
    this.handleCalculateInvention();
    this.updateInventionStagesUI();

    this.showCustomAlert(
      `"${item.name}" successfully ${isMagic ? 'consecrated, bound, and equipped' : 'built, calibrated, and installed to Hero\'s Equipment'}! Schematic saved to Known Blueprints Archive.`,
      isMagic ? '✨ Relic Consecrated' : '🛠️ Invention Assembled',
      mouseEvent
    );
    this.switchTab('equipment');
  },

  cancelReverseEngineer() {
    const itemSel = document.getElementById('select-reverse-engineer-item');
    if (itemSel) {
      itemSel.value = '';
    }
    const box = document.getElementById('reverse-engineer-result-box');
    if (box) {
      box.innerHTML = '<span style="color: var(--text-dim); text-align: center;">Select an item above to analyze manufacturing specifications.</span>';
    }
  },

  handleReverseEngineer(mouseEvent = null) {
    const itemSel = document.getElementById('select-reverse-engineer-item');
    const itemId = itemSel ? itemSel.value : '';
    if (!itemId) {
      this.showCustomAlert('Please select an equipment item from the list above to reverse-engineer.', 'Select Equipment', mouseEvent);
      return;
    }

    const res = InventionCreator.reverseEngineerPrebuilt(
      itemId,
      this.character.abilities.reason.rankName,
      this.character.resources.rankName,
      true
    );

    const box = document.getElementById('reverse-engineer-result-box');
    if (!res.success || !res.reproducible) {
      box.innerHTML = `
        <div style="border-left: 4px solid #ef4444; padding-left: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
            <strong style="color: #f87171; font-size: 11pt;">⚠️ NON-REPRODUCIBLE ARTIFACT</strong>
            <button type="button" class="icon-btn" id="btn-cancel-rev-result" style="padding: 2px 10px; font-size: 10pt;">✕ Cancel</button>
          </div>
          <p style="color: #fca5a5; margin-top: 6px; font-size: 10pt;">${res.error}</p>
        </div>
      `;
      const cancelBtn = box.querySelector('#btn-cancel-rev-result');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => this.cancelReverseEngineer());
      }
    } else {
      this.renderReverseEngineerOptions(res);
    }
  },

  renderReverseEngineerOptions(res) {
    const box = document.getElementById('reverse-engineer-result-box');
    if (!box) return;

    const reasonRank = this.character.abilities.reason.rankName;
    const reasonShift = 2; // +2CS for working model in hand per TSR rules
    const effectiveReasonRank = UniversalTableEngine.applyColumnShift(reasonRank, reasonShift).name;
    const isUnique = !!res.item.isUnique;

    box.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
          <strong style="color: var(--marvel-gold); font-size: 11pt;">
            🔬 Reverse-Engineering Analysis: ${res.item.name} ${isUnique ? '<span class="meta-tag tag-unique">Unique Prototype</span>' : ''}
          </strong>
          <button type="button" class="icon-btn" id="btn-cancel-rev-result-top" style="padding: 2px 10px; font-size: 10pt;" title="Cancel and clear selection">✕ Cancel</button>
        </div>

        <div style="background: rgba(56, 189, 248, 0.12); border: 1px solid #38bdf8; border-radius: 4px; padding: 6px 10px; font-size: 10pt; color: #bae6fd;">
          🔍 <strong>Working Model in Hand:</strong> In TSR rules, analyzing an existing working device requires a Reason FEAT with a <strong>+2CS Column Shift bonus</strong> (Reason: ${reasonRank} → <strong>${effectiveReasonRank}</strong>) to deduce internal circuitry and extract blueprints!
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 10pt;">
          <span style="color: var(--text-muted);">Reverse-Engineering FEAT:</span>
          <strong>${reasonRank} at +2CS (${effectiveReasonRank})</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 10pt;">
          <span style="color: var(--text-muted);">Materials Procurement FEAT:</span>
          <strong>${res.resourceCheck}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 10pt;">
          <span style="color: var(--text-muted);">Required Workshop Time:</span>
          <strong class="rev-result-days">${res.buildDays} Days</strong>
        </div>
        <p class="rev-result-summary" style="font-size: 10pt; margin-top: 4px;">${res.summary}</p>

        <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
          <button class="icon-btn primary" id="btn-roll-reverse-engineer" style="flex: 1; font-size: 10pt;">
            🎲 Roll Reverse-Engineering Analysis (+2CS Reason FEAT)
          </button>
          <button class="icon-btn" id="btn-auto-master-schematic" style="font-size: 10pt;" title="If schematics/blueprints are already in hand or Judge grants auto-success">
            📐 Master Schematic (Plans in Hand)
          </button>
          <button type="button" class="icon-btn" id="btn-cancel-rev-result" style="font-size: 10pt;" title="Cancel and clear selection">
            ✕ Cancel
          </button>
        </div>
      </div>
    `;

    const cancelBtn = box.querySelector('#btn-cancel-rev-result');
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.cancelReverseEngineer());
    const cancelTopBtn = box.querySelector('#btn-cancel-rev-result-top');
    if (cancelTopBtn) cancelTopBtn.addEventListener('click', () => this.cancelReverseEngineer());

    const rollBtn = box.querySelector('#btn-roll-reverse-engineer');
    if (rollBtn) {
      rollBtn.addEventListener('click', (e) => this.executeReverseEngineerRoll(res, e));
    }

    const autoBtn = box.querySelector('#btn-auto-master-schematic');
    if (autoBtn) {
      autoBtn.addEventListener('click', () => this.completeReverseEngineering(res, null));
    }
  },

  executeReverseEngineerRoll(res, mouseEvent = null) {
    const roll = Math.floor(Math.random() * 100) + 1;
    const reasonRank = this.character.abilities.reason.rankName;
    const featResult = UniversalTableEngine.resolveFEAT(reasonRank, roll, 2);

    if (featResult.isSuccess) {
      this.completeReverseEngineering(res, featResult);
    } else {
      this.renderReverseEngineerFailure(res, featResult);
    }
  },

  renderReverseEngineerFailure(res, featResult) {
    const box = document.getElementById('reverse-engineer-result-box');
    if (!box) return;

    const karmaNeeded = Math.max(0, featResult.thresholds.green - featResult.roll);
    const hasEnoughKarma = this.character && (this.character.karma >= karmaNeeded);

    box.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
          <strong style="color: #f87171; font-size: 11pt;">❌ Reverse-Engineering Unsuccessful</strong>
          <button type="button" class="icon-btn" id="btn-cancel-rev-fail-top" style="padding: 2px 10px; font-size: 10pt;" title="Cancel selection">✕ Cancel</button>
        </div>

        <div style="background: rgba(239, 68, 68, 0.12); border: 1px solid #ef4444; border-radius: 4px; padding: 8px 10px; font-size: 10pt; color: #fca5a5;">
          <div><strong>Roll Result:</strong> Rolled <strong>${featResult.roll}</strong> (White on ${featResult.effectiveRank}). Green FEAT requires roll of <strong>${featResult.thresholds.green}+</strong>.</div>
          <div style="margin-top: 4px;">Could not decipher proprietary circuitry and internal design on this attempt.</div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 10pt;">
          <span style="color: var(--text-muted);">Hero Karma Available:</span>
          <strong>${this.character.karma || 0} Karma</strong>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
          ${hasEnoughKarma ? `
            <button class="icon-btn primary" id="btn-spend-karma-rev" style="flex: 1; font-size: 10pt; background: #065f46;">
              ✨ Spend ${karmaNeeded} Karma to Succeed
            </button>
          ` : ''}
          <button class="icon-btn" id="btn-retry-rev-roll" style="font-size: 10pt;">
            🎲 Retry FEAT Roll
          </button>
          <button class="icon-btn" id="btn-force-master-schematic" style="font-size: 10pt;" title="If plans in hand or GM allows">
            📐 Master Schematic (Plans in Hand)
          </button>
          <button type="button" class="icon-btn" id="btn-cancel-rev-fail" style="font-size: 10pt;" title="Cancel selection">
            ✕ Cancel
          </button>
        </div>
      </div>
    `;

    const cancelBtn = box.querySelector('#btn-cancel-rev-fail');
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.cancelReverseEngineer());
    const cancelTopBtn = box.querySelector('#btn-cancel-rev-fail-top');
    if (cancelTopBtn) cancelTopBtn.addEventListener('click', () => this.cancelReverseEngineer());

    const retryBtn = box.querySelector('#btn-retry-rev-roll');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.executeReverseEngineerRoll(res));
    }

    const forceBtn = box.querySelector('#btn-force-master-schematic');
    if (forceBtn) {
      forceBtn.addEventListener('click', () => this.completeReverseEngineering(res, null));
    }

    const karmaBtn = box.querySelector('#btn-spend-karma-rev');
    if (karmaBtn && hasEnoughKarma) {
      karmaBtn.addEventListener('click', () => {
        this.character.karma = Math.max(0, (this.character.karma || 0) - karmaNeeded);
        this.saveState();
        this.render();
        this.completeReverseEngineering(res, {
          ...featResult,
          color: 'Green',
          isSuccess: true,
          karmaSpent: karmaNeeded
        });
      });
    }
  },

  completeReverseEngineering(res, featResult = null) {
    const box = document.getElementById('reverse-engineer-result-box');
    if (!box) return;

    // Record reverse-engineered schematic into Known Blueprints Archive
    const matRank = (typeof res.item.materialStrength === 'string' && res.item.materialStrength.includes('('))
      ? res.item.materialStrength.split('(')[0].trim()
      : (res.item.materialStrength || 'Good');

    const featNote = featResult 
      ? `Reverse-engineered via ${featResult.color} Reason FEAT (Roll ${featResult.roll} on ${featResult.effectiveRank}${featResult.karmaSpent ? `, spent ${featResult.karmaSpent} Karma` : ''}).`
      : 'Schematic mastered (Plans in hand).';

    const bpRes = this.character.addKnownBlueprint({
      name: res.item.name,
      sourceType: 'tech',
      origin: 'reverse-engineered',
      category: res.item.category || res.item.type || 'Equipment',
      sourceItemId: res.item.id,
      costRank: res.item.costRank || 'Typical',
      resourceRank: res.item.costRank || 'Typical',
      materialRank: matRank,
      blueprintShift: res.blueprintShift || 0,
      resourceShift: res.resourceShift || 0,
      assemblyShift: 0,
      buildDays: res.buildDays,
      itemData: {
        name: res.item.name,
        type: res.item.type,
        damage: res.item.damage,
        damageValue: res.item.damageValue || 0,
        range: res.item.range,
        rateOfFire: res.item.rateOfFire,
        materialStrength: res.item.materialStrength,
        notes: res.item.description || ''
      },
      notes: `${featNote} ${res.summary}`
    });
    this.saveState();
    this.renderKnownBlueprints();

    const bannerHtml = featResult
      ? `🎉 <strong>Reverse-Engineering Success!</strong> Rolled <strong>${featResult.roll}</strong> (${featResult.color} on ${featResult.effectiveRank}${featResult.karmaSpent ? ` with ${featResult.karmaSpent} Karma` : ''}). Schematic mastered and saved to <em>Known Blueprints Archive</em>!`
      : `📐 <strong>Schematic Mastered:</strong> Saved to <em>Known Blueprints Archive</em>. Building this item bypasses the Phase 1 Blueprint Design FEAT!`;

    box.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
          <strong style="color: var(--marvel-gold); font-size: 11pt;">📋 Manufacturing Specifications for ${res.item.name}:</strong>
          <button type="button" class="icon-btn" id="btn-cancel-rev-result-top" style="padding: 2px 10px; font-size: 10pt;" title="Cancel and clear selection">✕ Cancel</button>
        </div>
        <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 4px; padding: 6px 10px; font-size: 10pt; color: #a7f3d0;">
          ${bannerHtml}
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 10pt;">
          <span style="color: var(--text-muted);">Raw Materials Procurement:</span>
          <strong>${res.resourceCheck}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 10pt;">
          <span style="color: var(--text-muted);">Blueprint Drafting FEAT:</span>
          <strong class="rev-result-bypassed">${res.blueprintCheck} (Mastered / Bypassed)</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 10pt;">
          <span style="color: var(--text-muted);">Required Workshop Time:</span>
          <strong class="rev-result-days">${res.buildDays} Days</strong>
        </div>
        <p class="rev-result-summary" style="font-size: 10pt; margin-top: 6px;">${res.summary}</p>
        <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
          <button class="icon-btn primary" id="btn-build-rev-in-lab" style="flex: 1; font-size: 10pt;">
            🛠️ Build in Lab (Design FEAT Bypassed)
          </button>
          <button class="icon-btn" id="btn-replicate-prebuilt" style="font-size: 10pt;">
            ⚡ Quick Replicate to Gear
          </button>
          <button type="button" class="icon-btn" id="btn-cancel-rev-result" style="font-size: 10pt;" title="Cancel and clear selection">
            ✕ Cancel
          </button>
        </div>
      </div>
    `;

    const cancelBtn = box.querySelector('#btn-cancel-rev-result');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.cancelReverseEngineer());
    }
    const cancelTopBtn = box.querySelector('#btn-cancel-rev-result-top');
    if (cancelTopBtn) {
      cancelTopBtn.addEventListener('click', () => this.cancelReverseEngineer());
    }

    const buildLabBtn = box.querySelector('#btn-build-rev-in-lab');
    if (buildLabBtn && bpRes?.blueprint?.id) {
      buildLabBtn.addEventListener('click', (btnE) => {
        this.loadKnownBlueprint(bpRes.blueprint.id, btnE);
      });
    }

    box.querySelector('#btn-replicate-prebuilt').addEventListener('click', (btnE) => {
      this.character.equipment.push({
        id: 'rep_' + Date.now(),
        name: `Replicated ${res.item.name}`,
        type: res.item.type,
        damage: res.item.damage,
        damageValue: res.item.damageValue || 0,
        range: res.item.range,
        rateOfFire: res.item.rateOfFire,
        materialStrength: res.item.materialStrength,
        notes: `Reverse-engineered in workshop (${res.buildDays} days). ${res.item.description}`,
        equipped: true
      });
      this.saveState();
      this.render();
      this.showCustomAlert(`Successfully replicated "${res.item.name}" and added to equipment!`, '🔬 Replicated Item', btnE);
      this.cancelReverseEngineer();
      this.switchTab('equipment');
    });
  },

  renderKnownBlueprints() {
    const blueprints = (this.character && Array.isArray(this.character.knownBlueprints)) 
      ? this.character.knownBlueprints 
      : [];

    // Update Section 2 count badge
    const badge = document.getElementById('known-blueprints-count-badge');
    if (badge) {
      badge.textContent = `${blueprints.length} Blueprint${blueprints.length === 1 ? '' : 's'}`;
    }

    // Update Quick-Load Select in Section 1
    const quickSel = document.getElementById('select-quick-load-blueprint');
    if (quickSel) {
      const currentVal = quickSel.value;
      let optsHtml = '<option value="">📂 Load Blueprint...</option>';
      blueprints.forEach(bp => {
        const icon = (bp.sourceType === 'magic') ? '🔮' : '⚙️';
        optsHtml += `<option value="${bp.id}">${icon} ${bp.name} (${bp.buildDays || 1}d)</option>`;
      });
      quickSel.innerHTML = optsHtml;
      quickSel.value = currentVal;
    }

    // Update Section 2 Container
    const container = document.getElementById('known-blueprints-container');
    if (!container) return;

    const filterInp = document.getElementById('filter-known-blueprints');
    const filterText = filterInp ? filterInp.value.trim().toLowerCase() : '';

    let displayed = blueprints;
    if (filterText) {
      displayed = blueprints.filter(bp => 
        (bp.name && bp.name.toLowerCase().includes(filterText)) ||
        (bp.category && bp.category.toLowerCase().includes(filterText)) ||
        (bp.origin && bp.origin.toLowerCase().includes(filterText)) ||
        (bp.notes && bp.notes.toLowerCase().includes(filterText))
      );
    }

    if (displayed.length === 0) {
      container.innerHTML = `
        <span style="color: var(--text-dim); text-align: center; padding: 12px; font-size: 10pt;">
          ${filterText ? 'No blueprints matching search.' : 'No known blueprints yet. Complete a custom invention or reverse-engineer equipment below to master schematics.'}
        </span>
      `;
      return;
    }

    container.innerHTML = displayed.map(bp => {
      const isMagic = (bp.sourceType === 'magic');
      const originLabel = (bp.origin === 'reverse-engineered') ? 'Rulebook Schematic' : 'Custom Invention';
      const originClass = (bp.origin === 'reverse-engineered') ? 'bp-origin-reverse' : 'bp-origin-custom';
      const typeIcon = isMagic ? '🔮' : '⚙️';
      
      let pwrText = 'None';
      if (bp.powers && bp.powers.length) {
        pwrText = bp.powers.map(p => `${p.name} [${p.rankName}]`).join(', ');
      } else if (bp.itemData && bp.itemData.damage && bp.itemData.damage !== 'None') {
        pwrText = `Damage: ${bp.itemData.damage}`;
      }

      let bstText = '';
      if (bp.abilityBoosts && bp.abilityBoosts.length) {
        bstText = bp.abilityBoosts.map(b => `${b.ability}: ${b.rankName}`).join(', ');
      }

      return `
        <div class="known-blueprint-item">
          <div class="blueprint-meta-row" style="justify-content: space-between; align-items: flex-start; gap: 8px;">
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <strong class="bp-title" style="font-size: 10.5pt;">${typeIcon} ${bp.name}</strong>
                <span class="meta-tag bp-origin-tag ${originClass}" style="font-size: 10pt;">${originLabel}</span>
                <span class="meta-tag bp-category-tag" style="font-size: 10pt;">${bp.category || 'Equipment'}</span>
              </div>
              <div class="bp-specs-row" style="font-size: 10pt; margin-top: 2px;">
                <span>Build Time: <strong class="bp-spec-days">${bp.buildDays || 1} Days</strong></span>
                <span style="margin: 0 6px;">•</span>
                <span>Procurement Target: <strong class="bp-spec-val">${bp.resourceRank || bp.costRank || 'Typical'}</strong></span>
                <span style="margin: 0 6px;">•</span>
                <span>Material: <strong class="bp-spec-val">${bp.materialRank || 'Good'}</strong></span>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <button type="button" class="icon-btn primary btn-load-blueprint" data-bp-id="${bp.id}" style="font-size: 10pt; padding: 4px 10px;" title="Load into Invention Workshop with Phase 1 Design FEAT bypassed">
                🛠️ Build in Lab
              </button>
              <button type="button" class="icon-btn btn-delete-blueprint" data-bp-id="${bp.id}" style="font-size: 10pt; padding: 4px 8px;" title="Delete schematic from archive">
                🗑️
              </button>
            </div>
          </div>
          <div class="blueprint-meta-row bp-capabilities-row" style="margin-top: 6px; font-size: 10pt; flex-wrap: wrap;">
            <div><strong class="bp-capabilities-label">Capabilities:</strong> <span class="bp-capabilities-text">${pwrText}${bstText ? ' | Boosts: ' + bstText : ''}</span></div>
          </div>
          <div class="blueprint-meta-row bp-bypassed-row" style="margin-top: 4px; font-size: 10pt;">
            <span>✓ <strong>Phase 1 Bypassed:</strong> Schematic already mastered. No Design FEAT required!</span>
          </div>
        </div>
      `;
    }).join('');
  },

  loadKnownBlueprint(blueprintId, mouseEvent = null) {
    const bp = this.character.getKnownBlueprint(blueprintId);
    if (!bp) {
      this.showCustomAlert('Blueprint not found in archive.', 'Load Blueprint Error', mouseEvent);
      return;
    }

    // Configure source type (tech vs magic)
    this.setInventionSourceType(bp.sourceType || 'tech');

    // Populate Fields
    const nameEl = document.getElementById('inv-name');
    if (nameEl) nameEl.value = bp.name || '';

    const catEl = document.getElementById('inv-cat');
    if (catEl && bp.category) catEl.value = bp.category;

    const matEl = document.getElementById('inv-material-rank');
    if (matEl && bp.materialRank) matEl.value = bp.materialRank;

    // Load Powers & Ability Boosts
    this.invPowers = Array.isArray(bp.powers) ? JSON.parse(JSON.stringify(bp.powers)) : [];
    this.invAbilityBoosts = Array.isArray(bp.abilityBoosts) ? JSON.parse(JSON.stringify(bp.abilityBoosts)) : [];

    // If reverse engineered item had no powers array, create a base power entry so lab project calculates accurately
    if (bp.origin === 'reverse-engineered' && this.invPowers.length === 0 && (bp.itemData?.damage || bp.costRank)) {
      this.invPowers.push({
        id: 'bp_pwr_' + Date.now(),
        name: bp.name,
        category: 'Physical Weapons',
        rankName: bp.costRank || 'Good',
        rankValue: (UniversalTableEngine.getRankByName(bp.costRank || 'Good') || {}).num || 10
      });
    }

    // Configure Boosts and Limits checkboxes
    const boostMap = {
      'Extended Range': 'inv-boost-range',
      'Extended Area': 'inv-boost-area',
      'Armor Piercing': 'inv-boost-piercing',
      'Overcharge': 'inv-boost-overcharge',
      'AI Guidance': 'inv-boost-ai'
    };
    Object.values(boostMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.checked = false;
    });
    if (Array.isArray(bp.activeBoosts)) {
      bp.activeBoosts.forEach(bName => {
        for (const [k, id] of Object.entries(boostMap)) {
          if (bName.includes(k)) {
            const el = document.getElementById(id);
            if (el) el.checked = true;
          }
        }
      });
    }

    const limitMap = {
      'Ammo Dependent': 'inv-limit-ammo',
      'Power Cable': 'inv-limit-tether',
      'Bulky Weight': 'inv-limit-bulky',
      'Cooldown Cycle': 'inv-limit-cooldown',
      'Burnout Risk': 'inv-limit-burnout'
    };
    Object.values(limitMap).forEach(id => {
      const el = document.getElementById(id);
      if (el) el.checked = false;
    });
    if (Array.isArray(bp.activeLimits)) {
      bp.activeLimits.forEach(lName => {
        for (const [k, id] of Object.entries(limitMap)) {
          if (lName.includes(k)) {
            const el = document.getElementById(id);
            if (el) el.checked = true;
          }
        }
      });
    }

    this.renderInvPowersList();
    this.renderInvAbilityBoostsList();
    this.handleCalculateInvention();

    // Automatically bypass Phase 1 (Blueprint Design)
    const isMagic = (bp.sourceType === 'magic');
    this.invStageStatus.blueprint = {
      passed: true,
      color: 'Green',
      roll: 'Known Blueprint',
      isAuto: true,
      summary: `Mastered Schematic: "${bp.name}" is a known blueprint. Phase 1 (${isMagic ? 'Arcane Inscription' : 'Blueprint Design'}) FEAT is automatically bypassed!`
    };
    this.invStageStatus.resource = null;
    this.invStageStatus.procurement = null;
    this.invStageStatus.assembly = null;

    this.updateInventionStagesUI();

    const titleEl = document.getElementById('inv-custom-card-title');
    if (titleEl) {
      titleEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.showCustomAlert(
      `Blueprint for "${bp.name}" loaded into workshop! Phase 1 Design FEAT is already mastered and bypassed. Proceed to Phase 2 (Procurement) and Phase 3 (Assembly).`,
      '📐 Blueprint Loaded',
      mouseEvent
    );
  },

  deleteKnownBlueprint(blueprintId, mouseEvent = null) {
    const bp = this.character.getKnownBlueprint(blueprintId);
    const name = bp ? bp.name : 'Schematic';
    this.character.removeKnownBlueprint(blueprintId);
    this.saveState();
    this.renderKnownBlueprints();
    this.showCustomAlert(`Schematic "${name}" removed from Known Blueprints archive.`, 'Schematic Deleted', mouseEvent);
  },

  renderTalents() {
    const container = document.getElementById('talents-container');
    const slotsBadge = document.getElementById('talents-slots-badge');
    const cardTitle = document.getElementById('talents-card-title');

    const totalSlots = this.character.getTotalTalentSlots ? this.character.getTotalTalentSlots() : this.character.talents.length;
    const totalCP = (this.character.talents || []).reduce((sum, t) => sum + (t.costCP !== undefined ? t.costCP : (t.isStarred ? 20 : 10)), 0);

    if (slotsBadge) {
      slotsBadge.textContent = `${totalSlots} Slot${totalSlots === 1 ? '' : 's'} (${totalCP} CP)`;
    }
    if (cardTitle) {
      cardTitle.textContent = `🥋 Talents & Skills (${this.character.talents.length} Learned · ${totalSlots} Slots)`;
    }

    if (container) {
      container.innerHTML = '';
      this.character.talents.forEach((t, idx) => {
        const card = document.createElement('div');
        card.className = 'attack-card';
        const isStarred = !!t.isStarred;
        const slots = t.slots || (isStarred ? 2 : 1);
        const costCP = t.costCP !== undefined ? t.costCP : (isStarred ? 20 : 10);
        const allowsSpec = !!t.allowsSpecialization;

        card.innerHTML = `
          <div class="attack-header">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <button type="button" class="help-circle-btn" data-help-talent="${t.name}" title="View details for ${t.name}">?</button>
              <strong style="color: #38bdf8; font-size: 11pt;">${t.name}${isStarred ? '*' : ''}</strong>
              ${isStarred ? `<span class="meta-tag tag-starred">⭐ Starred (2 Slots)</span>` : `<span class="meta-tag" style="font-size: 8pt;">1 Slot</span>`}
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="meta-tag" style="color: var(--marvel-gold); font-weight: 700;">${costCP} CP</span>
              <button class="icon-btn" style="padding: 2px 8px; min-height: 28px; background: #881337;" data-del-talent="${idx}" title="Remove Talent">✕</button>
            </div>
          </div>
          ${allowsSpec ? `
            <div style="margin: 6px 0; display: flex; align-items: center; gap: 8px;">
              <span class="talent-spec-label" style="font-size: 8.5pt;">Specialty:</span>
              <input type="text" class="field-input inline-spec-input" data-spec-idx="${idx}" value="${t.specialization ? t.specialization.replace(/"/g, '&quot;') : ''}" placeholder="${t.specPlaceholder ? t.specPlaceholder.replace(/"/g, '&quot;') : 'Enter specialization...'}" style="min-height: 28px; font-size: 9pt; padding: 2px 8px; flex: 1;">
            </div>
          ` : ''}
          <div style="color: var(--text-muted); font-size: 10pt; line-height: 1.4;">${t.description}</div>
        `;

        card.querySelector('[data-help-talent]').addEventListener('click', () => {
          this.showHelpModal('talent', t.talentId || t.name);
        });

        if (allowsSpec) {
          const specInput = card.querySelector('.inline-spec-input');
          if (specInput) {
            const commitSpec = () => {
              const res = this.character.updateTalentSpecialization(idx, specInput.value);
              if (!res.success) {
                this.showCustomAlert(res.error, 'Invalid Specialization');
                specInput.value = t.specialization || '';
              } else {
                this.saveState();
                this.renderAttacks();
                this.renderTalentDropdown();
              }
            };
            specInput.addEventListener('change', commitSpec);
            specInput.addEventListener('keydown', (e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commitSpec();
                specInput.blur();
              }
            });
          }
        }

        card.querySelector('[data-del-talent]').addEventListener('click', (ev) => {
          const res = this.character.removeTalent(idx);
          this.saveState();
          this.render();
          this.renderTalentDropdown();
          if (res.restoredResources) {
            this.showCustomAlert(`Heir to Fortune removed. Resources restored to ${res.restoredResources.rankName} (${res.restoredResources.rankValue}).`, 'Resources Restored', ev);
          }
        });

        container.appendChild(card);
      });
    }

    const cContainer = document.getElementById('contacts-container');
    if (cContainer) {
      cContainer.innerHTML = '';
      this.character.contacts.forEach((c, idx) => {
        const card = document.createElement('div');
        card.className = 'attack-card';
        card.innerHTML = `
          <div class="attack-header">
            <strong style="color: var(--marvel-gold); font-size: 11pt;">${c.name} (${c.profession})</strong>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="meta-tag" style="color: var(--marvel-gold);">5 CP</span>
              <button class="icon-btn" style="padding: 2px 8px; min-height: 28px; background: #881337;" data-del-contact="${idx}">✕</button>
            </div>
          </div>
          <div style="color: var(--text-muted); font-size: 10pt;">${c.notes}</div>
        `;

        card.querySelector('[data-del-contact]').addEventListener('click', () => {
          this.character.contacts.splice(idx, 1);
          this.saveState();
          this.render();
        });

        cContainer.appendChild(card);
      });
    }
  },

  handleAddTalent(mouseEvent = null) {
    const tSel = document.getElementById('select-talent-catalog');
    if (!tSel) return;
    const talentQuery = tSel.value;
    if (!talentQuery) {
      this.showCustomAlert('Please select a talent from the dropdown before adding.', 'Select Talent', mouseEvent);
      return;
    }
    const catTalent = (globalThis.MSH_TALENTS || []).find(t => t.id === talentQuery || t.name === talentQuery);
    if (!catTalent) {
      this.showCustomAlert('Please select a talent from the dropdown before adding.', 'Select Talent', mouseEvent);
      return;
    }

    const specInput = document.getElementById('input-talent-specialization');
    const specialization = (specInput ? specInput.value : '').trim();

    // If talent allows specialization, user must provide a specialization
    if (catTalent.allowsSpecialization && !specialization) {
      this.showCustomAlert(`Please specify a specialization for "${catTalent.name}" (e.g. ${catTalent.specPlaceholder || 'specific weapon, vehicle, or field'}) before adding.`, 'Specialization Required', mouseEvent);
      if (specInput) specInput.focus();
      return;
    }

    const result = this.character.addTalent({
      talentId: catTalent.id,
      name: catTalent.name,
      category: catTalent.group || catTalent.category,
      description: catTalent.description,
      statAffected: catTalent.statAffected,
      csBonus: catTalent.bonus || catTalent.csBonus,
      isStarred: catTalent.isStarred,
      slots: catTalent.slots,
      costCP: catTalent.costCP,
      allowsSpecialization: catTalent.allowsSpecialization,
      specPlaceholder: catTalent.specPlaceholder,
      minResourcesRank: catTalent.minResourcesRank,
      minResourcesRankValue: catTalent.minResourcesRankValue,
      specialization: specialization
    });

    if (!result.success) {
      this.showCustomAlert(result.error, 'Cannot Add Talent', mouseEvent);
      return;
    }

    if (specInput) {
      specInput.value = '';
    }

    this.saveState();
    this.render();
    this.renderTalentDropdown();
    if (tSel) {
      tSel.value = '';
      this.updateTalentSpecializationInput();
    }

    if (result.elevatedResources) {
      this.showCustomAlert(`Heir to Fortune added! Your Resources have been elevated to Remarkable (30) (minimum required by Heir to Fortune).`, 'Resources Elevated', mouseEvent);
    }
  },

  handleAddContact() {
    const name = document.getElementById('input-contact-name').value.trim();
    const role = document.getElementById('input-contact-role').value.trim() || 'Ally';
    if (!name) return;

    this.character.contacts.push({
      id: 'c_' + Date.now(),
      name,
      profession: role,
      notes: `Trusted contact and ally in ${role}.`
    });

    document.getElementById('input-contact-name').value = '';
    document.getElementById('input-contact-role').value = '';

    this.saveState();
    this.render();
  },

  renderBackground() {
    const rName = document.getElementById('bio-real-name');
    if (rName) rName.value = this.character.realName || '';
    const pForm = document.getElementById('bio-physical-form');
    if (pForm) pForm.value = this.character.formKey || 'normal_human';
    const idSel = document.getElementById('bio-identity');
    if (idSel) idSel.value = this.character.identity || 'Secret';
    const genInp = document.getElementById('bio-gender');
    if (genInp) genInp.value = this.character.gender || 'Unknown';
    const ageInp = document.getElementById('bio-age');
    if (ageInp) ageInp.value = this.character.age || 'Adult';
    const dimInp = document.getElementById('bio-dimensions');
    if (dimInp) dimInp.value = `${this.character.height || "5'10\""}, ${this.character.weight || '175 lbs'}`;
    const affInp = document.getElementById('bio-affiliation');
    if (affInp) affInp.value = this.character.groupAffiliation || 'Solo';
    const baseInp = document.getElementById('bio-base');
    if (baseInp) baseInp.value = this.character.baseOfOperations || 'New York City';
    const hairInp = document.getElementById('bio-hair-eyes');
    if (hairInp) hairInp.value = `${this.character.hair || 'Brown'} hair, ${this.character.eyes || 'Brown'} eyes`;
    const backInp = document.getElementById('bio-backstory');
    if (backInp) backInp.value = this.character.notes || '';

    // Render Financial Resources & Monthly Resource Points Card
    const bgResSel = document.getElementById('background-resource-select');
    if (bgResSel && this.character.resources) {
      bgResSel.value = this.character.resources.rankName;
    }

    const bgResVal = document.getElementById('background-resource-val');
    if (bgResVal && this.character.resources) {
      bgResVal.textContent = this.character.resources.rankValue;
    }

    const budget = this.character.getResourcePointsBudget();
    const spent = this.character.spentResourcePoints || 0;
    const avail = this.character.getAvailableResourcePoints();

    const bgBudget = document.getElementById('background-rp-budget');
    if (bgBudget) bgBudget.textContent = `${budget} RP`;

    const bgCalcHint = document.getElementById('background-rp-calc-hint');
    if (bgCalcHint) bgCalcHint.textContent = `2 × ${this.character.resources?.rankValue || 6}`;

    const bgSpent = document.getElementById('background-rp-spent-input');
    if (bgSpent) bgSpent.value = spent;

    const bgAvail = document.getElementById('background-rp-available');
    if (bgAvail) {
      bgAvail.textContent = `${avail} RP`;
      bgAvail.style.color = avail <= 0 ? '#ef4444' : '#4ade80';
    }

    const isRPActive = !!(this.useResourcePoints || (this.character && this.character.useResourcePoints));
    const modeBadge = document.getElementById('background-rp-mode-badge');
    if (modeBadge) {
      if (isRPActive) {
        modeBadge.textContent = 'Resource Points Active';
        modeBadge.className = 'meta-tag rp-mode-active';
      } else {
        modeBadge.textContent = 'Standard TSR FEAT Rules';
        modeBadge.className = 'meta-tag rp-mode-inactive';
      }
    }

    const ruleNotice = document.getElementById('background-rp-rule-notice');
    if (ruleNotice) {
      if (isRPActive) {
        ruleNotice.innerHTML = `<strong>Resource Points Rule Active:</strong> Monthly budget is <strong>2 &times; Resource Number</strong> (${budget} RP). Equipment purchases automatically deduct their rank number in RP.`;
      } else {
        ruleNotice.innerHTML = `<strong>Standard TSR FEAT Rules Active:</strong> Equipment purchases resolve via Resource FEAT rolls (Player's Book p. 18). You can enable the Resource Points Rule in <strong>⚙️ Options</strong>.`;
      }
    }
  },

  renderCheatSheetTable() {
    const tbody = document.getElementById('cheatsheet-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    RANKS.forEach(r => {
      const thresh = UNIVERSAL_TABLE[r.name] || [51, 81, 98];
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="rank-name-cell" style="font-weight: 700; color: ${r.color};">${r.name} (${r.num})</td>
        <td class="cell-white">01 - ${String(thresh[0] - 1).padStart(2, '0')}</td>
        <td class="cell-green">${String(thresh[0]).padStart(2, '0')} - ${String(thresh[1] - 1).padStart(2, '0')}</td>
        <td class="cell-yellow">${String(thresh[1]).padStart(2, '0')} - ${String(thresh[2] - 1).padStart(2, '0')}</td>
        <td class="cell-red">${String(thresh[2]).padStart(2, '0')} - 100</td>
      `;
      tbody.appendChild(tr);
    });
  },

  /* Roller Window & Dialog Logic */
  initRollerWindow() {
    const modal = document.getElementById('roller-modal');
    const popoutBtn = document.getElementById('btn-roller-popout');
    const modalBox = modal ? modal.querySelector('.modal-box.roller-compact') : null;
    const header = modal ? modal.querySelector('.modal-header.compact') : null;

    // Load popout state from localStorage
    try {
      const savedState = localStorage.getItem('msh_roller_window_state');
      if (savedState) {
        const state = JSON.parse(savedState);
        this.rollerPoppedOut = !!state.isPoppedOut;
        if (this.rollerPoppedOut && modal && modalBox) {
          modal.classList.add('popped-out');
          if (popoutBtn) {
            popoutBtn.textContent = '↘ Dock';
            popoutBtn.title = 'Dock back into standard modal dialog';
          }
          const viewW = window.innerWidth || 1200;
          const viewH = window.innerHeight || 800;
          const w = modalBox.offsetWidth || 450;
          let x = (state.x !== undefined) ? state.x : Math.max(10, viewW - w - 24);
          let y = (state.y !== undefined) ? state.y : 20;

          // Clamp to safe viewport bounds
          x = Math.max(10, Math.min(x, Math.max(10, viewW - 120)));
          y = Math.max(10, Math.min(y, Math.max(10, viewH - 120)));

          modalBox.style.left = `${x}px`;
          modalBox.style.top = `${y}px`;
          modalBox.style.position = 'fixed';
          modalBox.style.margin = '0';
          modalBox.style.maxHeight = `${Math.max(260, viewH - y - 10)}px`;

          if (state.width !== undefined && state.height !== undefined) {
            modalBox.style.width = `${Math.min(state.width, viewW - 20)}px`;
            modalBox.style.height = `${Math.min(state.height, viewH - y - 10)}px`;
          }
        }
      }
    } catch (e) {
      console.warn('Could not restore roller window state', e);
    }

    // Popout button toggle
    if (popoutBtn) {
      popoutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleRollerPopout();
      });
    }

    // Draggable header when in popped-out floating mode
    if (header && modalBox) {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let initialLeft = 0;
      let initialTop = 0;

      header.addEventListener('mousedown', (e) => {
        if (!this.rollerPoppedOut) return;
        if (e.target.closest('button')) return; // Don't initiate drag on button clicks

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = modalBox.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        const onMouseMove = (moveEvt) => {
          if (!isDragging) return;
          const dx = moveEvt.clientX - startX;
          const dy = moveEvt.clientY - startY;

          let newLeft = initialLeft + dx;
          let newTop = initialTop + dy;

          const viewW = window.innerWidth || 1200;
          const viewH = window.innerHeight || 800;
          const boxW = modalBox.offsetWidth || 450;
          const boxH = modalBox.offsetHeight || 440;

          const maxLeft = Math.max(10, viewW - boxW - 10);
          const maxTop = Math.max(10, viewH - boxH - 10);

          newLeft = Math.max(10, Math.min(newLeft, maxLeft));
          newTop = Math.max(10, Math.min(newTop, maxTop));

          modalBox.style.left = `${newLeft}px`;
          modalBox.style.top = `${newTop}px`;
          modalBox.style.position = 'fixed';
          modalBox.style.margin = '0';
          modalBox.style.maxHeight = `${Math.max(260, viewH - newTop - 10)}px`;
        };

        const onMouseUp = () => {
          if (isDragging) {
            isDragging = false;
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            this.saveRollerWindowState();
            this.adjustRollerModalBounds();
          }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      });
    }

    // Auto-adjust modal boundaries when viewport is resized
    window.addEventListener('resize', () => this.adjustRollerModalBounds());

    // Pre-Roll Karma Spending Steppers & Direct Input
    const updateKarmaSpend = (newVal) => {
      const maxKarma = this.character ? this.character.currentKarma : 0;
      this.rollerKarmaSpend = Math.max(0, Math.min(maxKarma, newVal));
      const inp = document.getElementById('roller-karma-spend-input');
      if (inp) inp.value = this.rollerKarmaSpend;
    };

    const btnKMinus10 = document.getElementById('btn-karma-spend-minus10');
    if (btnKMinus10) btnKMinus10.addEventListener('click', () => updateKarmaSpend(this.rollerKarmaSpend - 10));

    const btnKMinus1 = document.getElementById('btn-karma-spend-minus1');
    if (btnKMinus1) btnKMinus1.addEventListener('click', () => updateKarmaSpend(this.rollerKarmaSpend - 1));

    const btnKPlus1 = document.getElementById('btn-karma-spend-plus1');
    if (btnKPlus1) btnKPlus1.addEventListener('click', () => updateKarmaSpend(this.rollerKarmaSpend + 1));

    const btnKPlus10 = document.getElementById('btn-karma-spend-plus10');
    if (btnKPlus10) btnKPlus10.addEventListener('click', () => updateKarmaSpend(this.rollerKarmaSpend + 10));

    const karmaInput = document.getElementById('roller-karma-spend-input');
    if (karmaInput) {
      karmaInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value) || 0;
        updateKarmaSpend(val);
      });
    }
  },

  toggleRollerPopout() {
    this.rollerPoppedOut = !this.rollerPoppedOut;
    const modal = document.getElementById('roller-modal');
    const popoutBtn = document.getElementById('btn-roller-popout');
    const modalBox = modal ? modal.querySelector('.modal-box.roller-compact') : null;

    const viewW = window.innerWidth || 1200;
    const viewH = window.innerHeight || 800;

    if (this.rollerPoppedOut) {
      if (modal) modal.classList.add('popped-out');
      if (popoutBtn) {
        popoutBtn.textContent = '↘ Dock';
        popoutBtn.title = 'Dock back into standard modal dialog';
      }

      // Default to top-right floating position or valid saved state
      const boxW = modalBox ? (modalBox.offsetWidth || 450) : 450;
      let targetLeft = Math.max(10, viewW - boxW - 24);
      let targetTop = 20;

      try {
        const saved = localStorage.getItem('msh_roller_window_state');
        if (saved) {
          const st = JSON.parse(saved);
          if (st.isPoppedOut && typeof st.x === 'number' && typeof st.y === 'number') {
            targetLeft = Math.max(10, Math.min(st.x, Math.max(10, viewW - boxW - 10)));
            targetTop = Math.max(10, Math.min(st.y, Math.max(10, viewH - 120)));
          }
        }
      } catch (e) {}

      if (modalBox) {
        modalBox.style.left = `${Math.round(targetLeft)}px`;
        modalBox.style.top = `${Math.round(targetTop)}px`;
        modalBox.style.position = 'fixed';
        modalBox.style.margin = '0';
        modalBox.style.maxHeight = `${Math.max(260, viewH - targetTop - 10)}px`;
      }
    } else {
      if (modal) modal.classList.remove('popped-out');
      if (popoutBtn) {
        popoutBtn.textContent = '↗ Pop-out';
        popoutBtn.title = 'Pop-out floating modeless window';
      }
      if (modalBox) {
        modalBox.style.width = '';
        modalBox.style.height = '';
        this.positionRollerModal(null);
      }
    }
    this.saveRollerWindowState();
    this.adjustRollerModalBounds();
  },

  saveRollerWindowState() {
    const modal = document.getElementById('roller-modal');
    const modalBox = modal ? modal.querySelector('.modal-box.roller-compact') : null;
    if (!modalBox) return;

    try {
      const rect = modalBox.getBoundingClientRect ? modalBox.getBoundingClientRect() : {
        left: parseInt(modalBox.style.left) || 20,
        top: parseInt(modalBox.style.top) || 60,
        width: parseInt(modalBox.style.width) || 450,
        height: parseInt(modalBox.style.height) || 440
      };
      const state = {
        isPoppedOut: this.rollerPoppedOut,
        x: Math.round(rect.left || parseInt(modalBox.style.left) || 20),
        y: Math.round(rect.top || parseInt(modalBox.style.top) || 60),
        width: Math.round(rect.width || parseInt(modalBox.style.width) || 450),
        height: Math.round(rect.height || parseInt(modalBox.style.height) || 440)
      };
      localStorage.setItem('msh_roller_window_state', JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save roller window state', e);
    }
  },

  adjustRollerModalBounds() {
    const modal = document.getElementById('roller-modal');
    const modalBox = modal ? modal.querySelector('.modal-box.roller-compact') : null;
    if (!modalBox || !modal || !modal.classList.contains('open')) return;

    const viewH = window.innerHeight || 800;
    const viewW = window.innerWidth || 1200;
    const rect = modalBox.getBoundingClientRect ? modalBox.getBoundingClientRect() : {
      bottom: (parseInt(modalBox.style.top) || 0) + (modalBox.offsetHeight || 440),
      right: (parseInt(modalBox.style.left) || 0) + (modalBox.offsetWidth || 450),
      top: parseInt(modalBox.style.top) || 0,
      left: parseInt(modalBox.style.left) || 0,
      height: modalBox.offsetHeight || 440,
      width: modalBox.offsetWidth || 450
    };

    // If bottom exceeds viewport viewable area, shift top up and cap maxHeight
    if (rect.bottom > viewH - 10) {
      const overflow = rect.bottom - (viewH - 10);
      const currentTop = parseInt(modalBox.style.top) || rect.top || 10;
      const newTop = Math.max(10, currentTop - overflow);
      modalBox.style.top = `${Math.round(newTop)}px`;
      modalBox.style.maxHeight = `${Math.max(260, viewH - newTop - 10)}px`;
    } else {
      const currentTop = parseInt(modalBox.style.top) || rect.top || 10;
      modalBox.style.maxHeight = `${Math.max(260, viewH - currentTop - 10)}px`;
    }

    // Ensure right side doesn't exceed screen
    if (rect.right > viewW - 10) {
      const overflowX = rect.right - (viewW - 10);
      const currentLeft = parseInt(modalBox.style.left) || rect.left || 10;
      modalBox.style.left = `${Math.max(10, Math.round(currentLeft - overflowX))}px`;
    }
  },

  positionRollerModal(clickEvent = null) {
    const modal = document.getElementById('roller-modal');
    const modalBox = modal ? modal.querySelector('.modal-box.roller-compact') : null;
    if (!modalBox) return;

    // If window is currently popped-out floating, adjust bounds and retain floating spot
    if (this.rollerPoppedOut) {
      this.adjustRollerModalBounds();
      return;
    }

    const viewW = window.innerWidth || 1200;
    const viewH = window.innerHeight || 800;

    // Set initial safety maxHeight before measuring
    modalBox.style.maxHeight = `${Math.max(280, viewH - 24)}px`;

    const modalW = modalBox.offsetWidth || 450;
    const modalH = modalBox.offsetHeight || 440;

    let targetLeft = 0;
    let targetTop = 0;

    if (clickEvent && typeof clickEvent.clientX === 'number') {
      // Centered directly under the mouse cursor that initiated the roll
      targetLeft = clickEvent.clientX - (modalW / 2);
      targetTop = clickEvent.clientY - (modalH / 2);
    } else {
      // Centered in viewport
      targetLeft = (viewW - modalW) / 2;
      targetTop = (viewH - modalH) / 2;
    }

    // Strictly clamp within viewport bounds with 10px padding
    targetLeft = Math.max(10, Math.min(targetLeft, Math.max(10, viewW - modalW - 10)));
    targetTop = Math.max(10, Math.min(targetTop, Math.max(10, viewH - modalH - 10)));

    modalBox.style.position = 'fixed';
    modalBox.style.left = `${Math.round(targetLeft)}px`;
    modalBox.style.top = `${Math.round(targetTop)}px`;
    modalBox.style.margin = '0';
    // Constrain maxHeight dynamically so the bottom of the modal NEVER exceeds viewH - 10px
    modalBox.style.maxHeight = `${Math.max(260, viewH - targetTop - 10)}px`;
  },

  openRoller(params, clickEvent = null) {
    this.activeRoller = { ...params, actionShift: params.shift || 0 };
    this.rollerShift = params.shift || 0;
    this.rollerKarmaSpend = 0;

    const modal = document.getElementById('roller-modal');
    document.getElementById('roller-title').textContent = params.name;
    document.getElementById('roller-ability').textContent = params.abilityName;

    // Reset pre-roll Karma expenditure
    const availKarmaEl = document.getElementById('roller-avail-karma');
    if (availKarmaEl) {
      availKarmaEl.textContent = this.character ? this.character.currentKarma : 0;
    }
    const karmaInp = document.getElementById('roller-karma-spend-input');
    if (karmaInp) {
      karmaInp.value = '0';
    }

    // Per TSR Player's Book p. 18: Karma may NEVER be added to Resource FEATs
    const karmaSpendRow = modal ? modal.querySelector('.roller-karma-spend-row') : null;
    const karmaHintEl = modal ? modal.querySelector('.karma-spend-label .karma-avail-hint') : null;
    if (params.isResourceFEAT) {
      if (karmaSpendRow) {
        karmaSpendRow.style.opacity = '0.35';
        karmaSpendRow.style.pointerEvents = 'none';
      }
      if (karmaHintEl) {
        karmaHintEl.innerHTML = `<span class="karma-no-spend-warn">(No Karma on Resource FEATs - p. 18)</span>`;
      }
    } else {
      if (karmaSpendRow) {
        karmaSpendRow.style.opacity = '1';
        karmaSpendRow.style.pointerEvents = 'auto';
      }
      if (karmaHintEl) {
        karmaHintEl.innerHTML = `(Avail: <strong id="roller-avail-karma">${this.character ? this.character.currentKarma : 0}</strong> KP)`;
      }
    }

    const diceVisual = document.getElementById('roller-dice-num');
    if (diceVisual) {
      diceVisual.innerHTML = '-- <span class="dice-kp-badge">+ 0 KP</span>';
      diceVisual.style.borderColor = 'var(--border-color)';
      diceVisual.style.color = '#fff';
    }

    const effectEl = document.getElementById('roller-effect-desc');
    if (effectEl) {
      effectEl.textContent = 'Click "Roll" to resolve action.';
    }

    this.updateRollerPreview();
    modal.classList.add('open');
    this.positionRollerModal(clickEvent);
    this.adjustRollerModalBounds();
  },

  updateRollerPreview() {
    if (!this.activeRoller) return;
    const shift = this.rollerShift || 0;
    const shiftValEl = document.getElementById('roller-shift-val');
    if (shiftValEl) {
      shiftValEl.textContent = (shift >= 0 ? '+' : '') + shift + ' CS';
    }

    const effRank = UniversalTableEngine.applyColumnShift(this.activeRoller.initialRank, shift);

    const prevEl = document.getElementById('roller-rank-preview');
    if (prevEl) {
      prevEl.textContent = `${effRank.name} (${effRank.num})`;
      prevEl.style.color = effRank.color;
    }

    const thresh = UNIVERSAL_TABLE[effRank.name] || [51, 81, 98];
    const whiteMax = Math.max(0, thresh[0] - 1);
    const whiteEl = document.getElementById('roller-thresh-white');
    if (whiteEl) {
      whiteEl.textContent = whiteMax > 0 ? `01-${String(whiteMax).padStart(2, '0')}` : 'None';
    }
    const greenEl = document.getElementById('roller-thresh-green');
    if (greenEl) greenEl.textContent = `${thresh[0]}+`;
    const yellowEl = document.getElementById('roller-thresh-yellow');
    if (yellowEl) yellowEl.textContent = `${thresh[1]}+`;
    const redEl = document.getElementById('roller-thresh-red');
    if (redEl) redEl.textContent = `${thresh[2]}+`;

    // Update CS Details Row below action row
    const csDetailsEl = document.getElementById('roller-cs-details-text');
    if (csDetailsEl) {
      const baseName = this.activeRoller.initialRank;
      const baseObj = UniversalTableEngine.getRankByName(baseName);
      let details = `Base: ${baseObj.name} (${baseObj.num})`;
      if (this.activeRoller.actionShift !== undefined && this.activeRoller.actionShift !== 0) {
        const sign = this.activeRoller.actionShift > 0 ? '+' : '';
        details += ` · Action: ${sign}${this.activeRoller.actionShift} CS`;
      }
      const shiftSign = shift >= 0 ? '+' : '';
      details += ` · Shift: ${shiftSign}${shift} CS`;
      details += ` → Final: ${effRank.name} (${effRank.num})`;
      csDetailsEl.textContent = details;
    }
    this.adjustRollerModalBounds();
  },

  executeRollerFEAT(forcedRoll = null) {
    if (!this.activeRoller) return;
    const shift = this.rollerShift || 0;
    const isResourceFEAT = !!(this.activeRoller && this.activeRoller.isResourceFEAT);
    
    // Commit and deduct pre-roll Karma expenditure (Disallowed for Resource FEATs per Player's Book p. 18)
    let spentKarma = 0;
    if (!isResourceFEAT) {
      const maxAvail = this.character ? this.character.currentKarma : 0;
      spentKarma = Math.min(maxAvail, Math.max(0, this.rollerKarmaSpend));
      if (spentKarma > 0 && this.character) {
        this.character.updateKarma(-spentKarma, `Pre-roll Karma committed on ${this.activeRoller.name}`);
        this.saveState();
        this.renderVitals();
        const availKarmaEl = document.getElementById('roller-avail-karma');
        if (availKarmaEl) availKarmaEl.textContent = this.character.currentKarma;
      }
    }
    this.rollerKarmaSpend = 0;
    const spendInp = document.getElementById('roller-karma-spend-input');
    if (spendInp) spendInp.value = '0';

    let rawRoll = forcedRoll;
    if (typeof rawRoll !== 'number' || isNaN(rawRoll) || rawRoll < 1 || rawRoll > 100) {
      rawRoll = Math.floor(Math.random() * 100) + 1;
    }

    const finalRoll = Math.min(100, rawRoll + spentKarma);

    const featResult = UniversalTableEngine.resolveFEAT(this.activeRoller.initialRank, finalRoll, shift);
    const battleEffect = UniversalTableEngine.getBattleEffect(
      this.activeRoller.actionType,
      featResult.color,
      this.activeRoller.damageValue
    );

    const isManilla = document.body.getAttribute('data-theme') === 'manilla';
    const colorMap = {
      'White': isManilla ? '#000000' : '#cbd5e1',
      'Green': isManilla ? '#065f46' : '#10b981',
      'Yellow': isManilla ? '#78350f' : '#f59e0b',
      'Red': isManilla ? '#991b1b' : '#ef4444'
    };
    const c = colorMap[featResult.color] || '#fff';

    // Show '[roll] + [KP] KP' in the roll result's box with colored KP badge
    const diceVisual = document.getElementById('roller-dice-num');
    if (diceVisual) {
      diceVisual.innerHTML = `${rawRoll} <span class="dice-kp-badge">+ ${spentKarma} KP</span>`;
      diceVisual.style.borderColor = c;
      diceVisual.style.color = c;
    }

    // Update CS Details Row below action row
    const csDetailsEl = document.getElementById('roller-cs-details-text');
    if (csDetailsEl) {
      const baseName = this.activeRoller.initialRank;
      const baseObj = UniversalTableEngine.getRankByName(baseName);
      let details = `Base: ${baseObj.name} (${baseObj.num})`;
      if (this.activeRoller.actionShift !== undefined && this.activeRoller.actionShift !== 0) {
        const sign = this.activeRoller.actionShift > 0 ? '+' : '';
        details += ` · Action: ${sign}${this.activeRoller.actionShift} CS`;
      }
      const shiftSign = shift >= 0 ? '+' : '';
      details += ` · Shift: ${shiftSign}${shift} CS`;
      details += ` → Final: ${featResult.effectiveRank}`;
      csDetailsEl.textContent = details;
    }

    const effectEl = document.getElementById('roller-effect-desc');
    if (effectEl) {
      effectEl.innerHTML = `<span style="color:${c}; font-weight:900; font-size:11pt;">${featResult.color.toUpperCase()} FEAT! (${finalRoll} on ${featResult.effectiveRank})</span><div style="color:var(--text-main); font-size:10pt; margin-top: 2px;">${battleEffect.desc}</div>`;
    }

    // Automatic Equipment Procurement Resolution on Resource FEAT rolls (Player's Book p. 18)
    if (this.activeRoller && this.activeRoller.isResourceFEAT && this.activeRoller.procureItem) {
      const pItem = this.activeRoller.procureItem;
      const targetCol = this.activeRoller.targetColor || 'Green';
      let isSuccess = false;
      if (targetCol === 'Green') {
        isSuccess = (featResult.color === 'Green' || featResult.color === 'Yellow' || featResult.color === 'Red');
      } else if (targetCol === 'Yellow') {
        isSuccess = (featResult.color === 'Yellow' || featResult.color === 'Red');
      }

      if (isSuccess) {
        this.character.equipment.push({
          id: 'eq_' + Date.now(),
          name: pItem.name,
          type: pItem.type || pItem.category,
          damage: pItem.damage,
          damageValue: pItem.damageValue || 0,
          range: pItem.range,
          rateOfFire: pItem.rateOfFire,
          materialStrength: pItem.materialStrength,
          notes: pItem.description,
          equipped: true
        });
        this.saveState();
        this.render();
        if (effectEl) {
          effectEl.innerHTML += `
            <div style="margin-top: 8px; padding: 6px 10px; background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; border-radius: 4px; color: #a7f3d0; font-weight: 700; font-size: 10pt;">
              🎉 SUCCESSFUL PROCUREMENT! "${pItem.name}" has been acquired and added to your equipment!
            </div>
          `;
        }
      } else {
        if (effectEl) {
          effectEl.innerHTML += `
            <div style="margin-top: 8px; padding: 6px 10px; background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; border-radius: 4px; color: #fca5a5; font-weight: 700; font-size: 10pt;">
              ❌ PROCUREMENT FAILED: Resource FEAT did not meet ${targetCol} requirement. (Player's Book p. 18: Try again next week).
            </div>
          `;
        }
      }
    }

    // Automatic Invention Stage FEAT Resolution
    if (this.activeRoller && this.activeRoller.actionType === 'invention_stage') {
      const rawStage = this.activeRoller.inventionStage;
      const stage = (rawStage === 'procurement' || rawStage === 'resource') ? 'resource' : rawStage;
      const project = this.activeRoller.project || (this.invProjectResult ? this.invProjectResult : {});
      const stageRes = InventionCreator.resolveInventionStageFEAT(
        stage,
        rawRoll,
        spentKarma,
        project
      );

      if (stageRes && stageRes.isSuccess) {
        const resObj = { passed: true, color: featResult.color, roll: rawRoll, finalRoll: stageRes.finalRoll };
        this.invStageStatus[stage] = resObj;
        if (stage === 'resource') this.invStageStatus.procurement = resObj;
        this.updateInventionStagesUI();
        if (effectEl) {
          effectEl.innerHTML += `
            <div style="margin-top: 8px; padding: 8px 12px; background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; border-radius: 4px; color: #a7f3d0; font-weight: 700; font-size: 10pt;">
              ${stageRes.title}: PASSED! (${featResult.color} FEAT)<br>
              <span style="font-weight: 400; font-size: 10pt;">${stageRes.summary}</span>
            </div>
          `;
        }
      } else {
        const resObj = { passed: false, color: featResult.color, roll: rawRoll, finalRoll: stageRes.finalRoll };
        this.invStageStatus[stage] = resObj;
        if (stage === 'resource') this.invStageStatus.procurement = resObj;
        this.updateInventionStagesUI();
        if (effectEl) {
          let retryHtml = '';
          if (Array.isArray(stageRes.retryRequirements) && stageRes.retryRequirements.length > 0) {
            retryHtml = `
              <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(239, 68, 68, 0.4); text-align: left;">
                <strong class="inv-retry-title">📋 ${stageRes.retryTitle || 'Requirements to Attempt FEAT Again:'}</strong>
                <div class="inv-retry-details">
                  ${stageRes.retryRequirements.map(req => `<div>${req}</div>`).join('')}
                </div>
              </div>
            `;
          }
          effectEl.innerHTML += `
            <div style="margin-top: 8px; padding: 8px 12px; background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; border-radius: 4px; color: #fca5a5; font-size: 10pt;">
              <div style="font-weight: 700;">${stageRes.title}: FAILED (${featResult.color} FEAT)</div>
              <div style="font-weight: 400; margin-top: 2px;">${stageRes.summary}</div>
              ${retryHtml}
            </div>
          `;
        }
      }
    }

    // Automatic Stunt Progress Tracking on Rolls
    if (this.activeRoller && this.activeRoller.isStunt && !this.activeRoller.isLearned && this.activeRoller.parentPowerId && this.activeRoller.stuntId) {
      const rec = this.character.recordStuntSuccess(this.activeRoller.parentPowerId, this.activeRoller.stuntId, featResult.color);
      if (rec && rec.advanced) {
        this.saveState();
        this.renderPowers();
        this.renderAttacks();
        if (rec.isLearned) {
          setTimeout(() => {
            this.showCustomAlert(
              `Incredible Mastery! With this ${rec.earnedType} FEAT, "${rec.stunt.name}" has achieved all required successes and is now permanently MASTERED!\n\nIt no longer costs Karma to attempt and resolves as a standard Green FEAT.`,
              '⭐ Power Stunt Mastered!'
            );
          }, 350);
        } else {
          const succ = this.character.getStuntSuccessesNeeded(rec.stunt);
          setTimeout(() => {
            this.showCustomAlert(
              `Stunt Success Recorded! Achieved 1 ${rec.earnedType} success for "${rec.stunt.name}".\n\nRemaining: ${succ.text} to establish permanent mastery.`,
              '⚡ Power Stunt Progress'
            );
          }, 350);
        }
      }
    }
    this.adjustRollerModalBounds();
  },

  /* Custom In-UI Dialog System (Alerts & Confirmations matching UI style) */
  positionCustomDialog(mouseEvent = null) {
    const modalBox = document.getElementById('ui-dialog-box');
    if (!modalBox) return;

    const boxW = modalBox.offsetWidth || 380;
    const boxH = modalBox.offsetHeight || 160;
    const viewW = (typeof window !== 'undefined' && window.innerWidth) ? window.innerWidth : 1200;
    const viewH = (typeof window !== 'undefined' && window.innerHeight) ? window.innerHeight : 900;

    let targetLeft = (viewW - boxW) / 2;
    let targetTop = (viewH - boxH) / 2;

    if (mouseEvent && typeof mouseEvent.clientX === 'number') {
      targetLeft = mouseEvent.clientX - (boxW / 2);
      targetTop = mouseEvent.clientY - (boxH / 2);
    }

    // Strict boundary clamping: visible area's edges are strict boundaries
    targetLeft = Math.max(12, Math.min(targetLeft, Math.max(12, viewW - boxW - 12)));
    targetTop = Math.max(12, Math.min(targetTop, Math.max(12, viewH - boxH - 12)));

    modalBox.style.position = 'fixed';
    modalBox.style.left = `${Math.round(targetLeft)}px`;
    modalBox.style.top = `${Math.round(targetTop)}px`;
    modalBox.style.margin = '0';
  },

  showCustomAlert(message, title = 'Notification', mouseEvent = null) {
    return new Promise((resolve) => {
      const modal = document.getElementById('ui-dialog-modal');
      const titleEl = document.getElementById('ui-dialog-title');
      const msgEl = document.getElementById('ui-dialog-message');
      const okBtn = document.getElementById('btn-ui-dialog-ok');
      const cancelBtn = document.getElementById('btn-ui-dialog-cancel');
      const closeBtn = document.getElementById('btn-ui-dialog-close');

      if (!modal || !msgEl || !okBtn) {
        if (typeof alert === 'function') alert(message);
        return resolve();
      }

      if (titleEl) titleEl.textContent = title;
      msgEl.textContent = message;
      if (cancelBtn) cancelBtn.style.display = 'none';
      okBtn.textContent = 'OK';

      let resolved = false;
      const cleanup = () => {
        if (resolved) return;
        resolved = true;
        modal.classList.remove('open');
        okBtn.removeEventListener('click', onOk);
        if (closeBtn) closeBtn.removeEventListener('click', onClose);
        modal.removeEventListener('click', onBackdrop);
        resolve();
      };

      const onOk = () => cleanup();
      const onClose = () => cleanup();
      const onBackdrop = (e) => { if (e.target === modal) cleanup(); };

      okBtn.addEventListener('click', onOk);
      if (closeBtn) closeBtn.addEventListener('click', onClose);
      modal.addEventListener('click', onBackdrop);

      modal.classList.add('open');
      this.positionCustomDialog(mouseEvent);
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => this.positionCustomDialog(mouseEvent));
      }
    });
  },

  showCustomConfirm(message, title = 'Confirmation Required', mouseEvent = null, confirmText = 'Confirm', cancelText = 'Cancel') {
    return new Promise((resolve) => {
      const modal = document.getElementById('ui-dialog-modal');
      const titleEl = document.getElementById('ui-dialog-title');
      const msgEl = document.getElementById('ui-dialog-message');
      const okBtn = document.getElementById('btn-ui-dialog-ok');
      const cancelBtn = document.getElementById('btn-ui-dialog-cancel');
      const closeBtn = document.getElementById('btn-ui-dialog-close');

      if (!modal || !msgEl || !okBtn) {
        const fallback = typeof confirm === 'function' ? confirm(message) : true;
        return resolve(fallback);
      }

      if (titleEl) titleEl.textContent = title;
      msgEl.textContent = message;
      if (cancelBtn) {
        cancelBtn.style.display = 'inline-flex';
        cancelBtn.textContent = cancelText;
      }
      okBtn.textContent = confirmText;

      let resolved = false;
      const cleanup = (result) => {
        if (resolved) return;
        resolved = true;
        modal.classList.remove('open');
        okBtn.removeEventListener('click', onOk);
        if (cancelBtn) cancelBtn.removeEventListener('click', onCancel);
        if (closeBtn) closeBtn.removeEventListener('click', onCancel);
        modal.removeEventListener('click', onBackdrop);
        resolve(result);
      };

      const onOk = () => cleanup(true);
      const onCancel = () => cleanup(false);
      const onBackdrop = (e) => { if (e.target === modal) cleanup(false); };

      okBtn.addEventListener('click', onOk);
      if (cancelBtn) cancelBtn.addEventListener('click', onCancel);
      if (closeBtn) closeBtn.addEventListener('click', onCancel);
      modal.addEventListener('click', onBackdrop);

      modal.classList.add('open');
      this.positionCustomDialog(mouseEvent);
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => this.positionCustomDialog(mouseEvent));
      }
    });
  },

  openCheatSheet() {
    const modal = document.getElementById('cheatsheet-modal');
    modal.classList.add('open');
  },

  showHelpModal(type, queryKey) {
    const modal = document.getElementById('help-modal');
    const titleEl = document.getElementById('help-title');
    const bodyEl = document.getElementById('help-body');
    if (!modal || !titleEl || !bodyEl) return;

    let title = 'Rules Reference';
    let content = '';

    const q = String(queryKey || '').toLowerCase().trim();

    if (type === 'power') {
      const powers = globalThis.MSH_POWERS || [];
      const p = powers.find(x => x.id && x.id.toLowerCase() === q) ||
                powers.find(x => x.name && x.name.toLowerCase() === q) ||
                powers.find(x => x.name && x.name.toLowerCase().includes(q)) ||
                powers.find(x => x.name && q.includes(x.name.toLowerCase()));

      if (p) {
        const isStarred = !!(p.isStarred || p.countsAsTwo || p.powerSlots === 2);
        title = `${isStarred ? '★ ' : '⚡ '}[${p.id}] ${p.name}`;
        content = `
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
            <span class="meta-tag" style="color: var(--marvel-gold); font-weight:700;">Category: ${p.category || 'General'}</span>
            <span class="meta-tag">${isStarred ? '<span class="starred-label-text">★ 2 Power Slots (Starred)</span>' : `Slots: ${p.powerSlots || 1}`}</span>
            <span class="meta-tag">Source: ${p.source || 'Player Book / UPB'}</span>
          </div>
          ${isStarred ? `
            <div class="calc-rule-callout starred-power-banner" style="margin-bottom: 12px;">
              <strong class="starred-label-text">★ TSR Starred Superpower (Player's Book p. 19 / UPB p. 16):</strong>
              This power is exceptionally potent and inherently counts as <strong>2 Power Slots</strong> against character limits. In CMF Point-Buy, it costs <strong>20 CP Base</strong> (instead of 10 CP) and <strong>2× Rank CP</strong>.
            </div>
          ` : ''}
          <div class="rulebook-desc" style="margin: 12px 0; line-height: 1.6; font-size: 10.5pt;">
            ${p.description || 'Standard superhuman power effect.'}
          </div>
          ${p.powerStunts && p.powerStunts.length ? `
            <div style="margin-top: 14px;">
              <strong class="rulebook-stunts-title" style="font-size: 11pt;">Documented Power Stunts:</strong>
              <ul class="rulebook-stunts-list" style="padding-left: 20px; line-height: 1.7; margin-top: 6px; font-size: 10pt;">
                ${p.powerStunts.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${p.errataNote ? `
            <div class="calc-rule-callout" style="margin-top: 14px;">
              <strong>⚖️ Errata / Rules Note:</strong> ${p.errataNote}
            </div>
          ` : ''}
        `;
      } else {
        title = `⚡ Superpower: ${queryKey}`;
        content = `<p style="color: var(--text-muted);">Details could not be found for superpower "${queryKey}".</p>`;
      }
    } else if (type === 'talent') {
      const talents = globalThis.MSH_TALENTS || [];
      const t = talents.find(x => x.id && x.id.toLowerCase() === q) ||
                talents.find(x => x.name && x.name.toLowerCase() === q) ||
                talents.find(x => x.name && x.name.toLowerCase().includes(q)) ||
                talents.find(x => x.name && q.includes(x.name.toLowerCase()));

      if (t) {
        const isStarred = !!t.isStarred;
        title = `🥋 ${t.name}${isStarred ? '*' : ''}`;
        content = `
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
            <span class="meta-tag" style="color: var(--marvel-gold); font-weight:700;">Group: ${t.group || t.category || 'General'}</span>
            <span class="meta-tag">Cost: ${t.costCP || (isStarred ? 20 : 10)} CP</span>
            ${isStarred ? `<span class="meta-tag tag-starred">⭐ Starred (2 Slots)</span>` : `<span class="meta-tag">1 Slot</span>`}
            ${t.allowsSpecialization ? `<span class="meta-tag" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);">🎯 Allows Multiple Specialties</span>` : ''}
            ${t.minResourcesRank ? `<span class="meta-tag" style="color: #4ade80; border-color: rgba(74, 222, 128, 0.4);">💰 Min Resources: ${t.minResourcesRank} (${t.minResourcesRankValue})</span>` : ''}
            ${t.bonus ? `<span class="meta-tag" style="color: #38bdf8;">Bonus: ${t.bonus}</span>` : ''}
            ${t.statAffected ? `<span class="meta-tag">Stat Affected: ${t.statAffected}</span>` : ''}
            <span class="meta-tag">Source: ${t.source || "Player's Book"}</span>
          </div>
          ${isStarred ? `
            <div class="calc-rule-callout starred-power-banner" style="margin-bottom: 12px;">
              <strong class="starred-label-text">⭐ TSR Starred Talent (Player's Book p. 10, Table 8):</strong>
              Talents marked with an asterisk (*) count as <strong>two talent slots</strong> and cost <strong>20 CP</strong> (instead of 10 CP).
              ${t.minResourcesRank ? `<br><strong>Heir to Fortune Special Rule:</strong> Guarantees a minimum Resource rank of <strong>Remarkable (30)</strong>.` : ''}
            </div>
          ` : ''}
          <div class="rulebook-desc" style="margin: 12px 0; line-height: 1.6; font-size: 10.5pt;">
            ${t.description || 'Provides specialized proficiency and +1CS column shift to relevant FEATs.'}
          </div>
          ${t.allowsSpecialization ? `
            <div style="margin-top: 10px; padding: 8px 10px; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 6px; font-size: 9.5pt;">
              <strong style="color: #38bdf8;">Specialization Note:</strong> This talent may be acquired multiple times, provided each acquisition designates a unique specialization (e.g., <em>${t.specPlaceholder || 'specific field'}</em>).
            </div>
          ` : ''}
        `;
      } else {
        title = `🥋 Talent: ${queryKey}`;
        content = `<p style="color: var(--text-muted);">Details could not be found for talent "${queryKey}".</p>`;
      }
    } else if (type === 'equipment') {
      let item = null;
      if (globalThis.EQUIPMENT_BY_ID && globalThis.EQUIPMENT_BY_ID[queryKey]) {
        item = globalThis.EQUIPMENT_BY_ID[queryKey];
      }
      if (!item && globalThis.PREBUILT_EQUIPMENT_CATALOG) {
        item = globalThis.PREBUILT_EQUIPMENT_CATALOG.find(x => x.id && x.id.toLowerCase() === q) ||
               globalThis.PREBUILT_EQUIPMENT_CATALOG.find(x => x.name && x.name.toLowerCase() === q) ||
               globalThis.PREBUILT_EQUIPMENT_CATALOG.find(x => x.name && x.name.toLowerCase().includes(q)) ||
               globalThis.PREBUILT_EQUIPMENT_CATALOG.find(x => x.name && q.includes(x.name.toLowerCase()));
      }
      if (!item && this.character && this.character.equipment) {
        item = this.character.equipment.find(x => x.id && x.id === queryKey) ||
               this.character.equipment.find(x => x.name && x.name.toLowerCase() === q) ||
               this.character.equipment.find(x => x.name && x.name.toLowerCase().includes(q));
      }

      if (item) {
        title = `🎒 ${item.name}`;
        content = `
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
            <span class="meta-tag" style="color: var(--marvel-gold); font-weight: 700;">Category: ${item.category || item.type || 'Equipment'}</span>
            ${item.costRank ? `<span class="meta-tag">Cost: ${item.costRank} (${item.costValue || '-'})</span>` : ''}
            ${item.materialStrength ? `<span class="meta-tag">Material: ${item.materialStrength}</span>` : ''}
            ${item.range ? `<span class="meta-tag">Range: ${item.range}</span>` : ''}
            ${item.rateOfFire ? `<span class="meta-tag">ROF: ${item.rateOfFire}</span>` : ''}
            ${item.damage ? `<span class="meta-tag" style="color: #38bdf8;">Damage / Effect: ${item.damage}</span>` : ''}
          </div>
          <div class="rulebook-desc" style="margin: 12px 0; line-height: 1.6; font-size: 10.5pt;">
            ${item.description || item.notes || 'Standard equipment specification.'}
          </div>
          ${item.isUnique ? `
            <div class="calc-rule-callout rulebook-unique-alert" style="margin-top: 14px;">
              <strong class="rulebook-unique-title">⚠️ Legendary Artifact (Non-Reproducible):</strong>
              <p class="rulebook-unique-desc" style="margin: 6px 0 0 0; font-size: 10pt;">${item.uniqueReason || 'This item is a one-of-a-kind cosmic/mystic relic and cannot be manufactured or reverse-engineered in a laboratory.'}</p>
            </div>
          ` : (item.inventionBasePower ? `
            <div class="rulebook-specs-box" style="border-radius: 6px; padding: 10px 14px; margin-top: 14px;">
              <strong class="rulebook-specs-title" style="font-size: 10.5pt;">🔬 Invention Lab Engineering Specs:</strong>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 6px; font-size: 10pt;">
                <div><strong>Base Power:</strong> ${item.inventionBasePower} (${item.inventionPowerRank || 'Good'})</div>
                <div><strong>Complexity:</strong> ${item.inventionComplexity || 'Standard'}</div>
              </div>
            </div>
          ` : '')}
        `;
      } else {
        title = `🎒 Equipment: ${queryKey}`;
        content = `<p style="color: var(--text-muted);">Details could not be found for equipment "${queryKey}".</p>`;
      }
    }

    titleEl.innerHTML = title;
    bodyEl.innerHTML = content;
    modal.classList.add('open');
  },

  exportCharacter() {
    const jsonStr = JSON.stringify(this.character.toJSON(), null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(this.character.name || 'Hero').replace(/\s+/g, '_')}_FASERIP.msh`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importCharacter(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        this.character = FASERIPCharacter.fromJSON(data);
        this.saveState();
        this.render();
        this.showCustomAlert(`Successfully imported "${this.character.name}"!`, '📁 Character Loaded');
      } catch (err) {
        this.showCustomAlert('Failed to load .msh character file: ' + err.message, '⚠️ Load Error');
      }
    };
    reader.readAsText(file);
  }
};

if (typeof globalThis !== 'undefined') {
  globalThis.App = App;
}
if (typeof window !== 'undefined') {
  window.App = App;
}

// Initialize App on DOMContentLoaded
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('DOMContentLoaded', () => {
    App.init();
  });
}

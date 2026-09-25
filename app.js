/**
 * Marvel Super Heroes (FASERIP) - Application Controller
 * Connects CMF Point-Buy System, Top-Row Tabbed UI, Universal Action Table,
 * Machines of Doom Inventions Lab, Prebuilt Equipment Store, and 1080px Width Detection.
 */

const App = {
  character: null,
  activeTab: 'main-stats',
  activeCheatTab: 'combat',
  cheatsheetPopoutWindow: null,
  cheatsheetPoppedOut: false,
  cheatsheetAutoPopout: true,
  isClientUnloading: false,
  cheatsheetPlaceholder: null,
  activeRoller: null,
  rollerShift: 0,
  rollerKarmaSpend: 0,
  rollerPoppedOut: false,
  touchFriendly: false,
  currentTheme: 'slate',
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
  powerAdjustment: false,
  activeAdjustmentPowerIndex: null,
  superiorOptionCost: false,
  get superiorOptionTax() {
    return !!this.superiorOptionCost;
  },
  set superiorOptionTax(val) {
    this.superiorOptionCost = !!val;
  },
  VERSION: '1.5.14',
  BUILD_DATE: '2026-09-25',
  COMMIT_SHA: '6a15ff5',
  REPO_OWNER: 'captainload',
  REPO_NAME: 'marvel-character-editor',
  updateSettings: {
    onStartup: true,
    lastChecked: null,
    lastKnownRemoteVersion: null
  },
  updateScheduleTimer: null,
  _lastUpdateCheckTime: 0,
  karmaMode: 'session',
  advancementSnapshot: null,
  testModeSnapshot: null,

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

    // Ensure baseline editLog entry exists
    if (!this.character.editLog || this.character.editLog.length === 0) {
      this.character.recordEdit(`Character loaded: ${this.character.name}`, 'initial');
    }

    // 4. Setup UI listeners and populate static selectors
    this.setupEventListeners();
    this.initRollerWindow();
    this.initCheatSheetWindow();
    this.populateDropdowns();
    this.updateStoreClearancesUI();
    this.render();
    this.updateHistoryNavButtons();
    this.renderEditLog();
    this.initEasterEgg();

    // Auto-restore Cheat Sheet popout if it was popped out when client closed
    if (typeof localStorage !== 'undefined') {
      const wasPoppedOut = (localStorage.getItem('msh_cheatsheet_popped_out') === 'true');
      if (wasPoppedOut && this.cheatsheetAutoPopout) {
        setTimeout(() => {
          this.restoreCheatSheetPopoutOnStartup();
        }, 300);
      }
    }

    // Prompt Character Creation Setup Wizard if hero setup is pending
    if (this.character && this.character.isCreationSetupPending) {
      setTimeout(() => this.openCreationWizardModal(), 150);
    }

    // 5. Initialize update checker & background checks
    this.initUpdateChecker();
    if (this.updateSettings && this.updateSettings.onStartup) {
      setTimeout(() => {
        this.checkForUpdates({ trigger: 'startup', silent: true });
      }, 1500);
    }
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
      this.updateHistoryNavButtons();
    }
  },

  recordCharacterEdit(description, category = 'general') {
    if (!this.character) return;
    this.character.recordEdit(description, category);
    this.saveState();
    this.updateHistoryNavButtons();
    this.renderEditLog();
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

    // Character Edit History Navigation (Back / Forward Undo-Redo)
    const btnHistoryBack = document.getElementById('btn-history-back');
    if (btnHistoryBack) {
      btnHistoryBack.addEventListener('click', () => {
        this.handleHistoryUndo();
      });
    }

    const btnHistoryForward = document.getElementById('btn-history-forward');
    if (btnHistoryForward) {
      btnHistoryForward.addEventListener('click', () => {
        this.handleHistoryRedo();
      });
    }

    // Copy Edit Log Button
    const btnCopyLog = document.getElementById('btn-copy-edit-log');
    if (btnCopyLog) {
      btnCopyLog.addEventListener('click', () => {
        this.copyEditLogToClipboard();
      });
    }

    // Global click listener to dismiss any open power menus when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.power-menu-container')) {
        document.querySelectorAll('.power-dropdown-menu.show').forEach(m => m.classList.remove('show'));
      }
    });

    // Character Name Header Input
    const nameInput = document.getElementById('header-char-name');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        this.character.name = e.target.value;
        this.saveState();
      });
    }

    // CMF Point-Buy Tier Selector & Creation Wizard Triggers
    const tierSelect = document.getElementById('point-tier-select');
    if (tierSelect) {
      tierSelect.addEventListener('change', (e) => {
        const customBox = document.getElementById('custom-budget-box');
        if (e.target.value === 'custom') {
          if (customBox) customBox.style.display = 'flex';
        } else {
          if (customBox) customBox.style.display = 'none';
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

    const btnOpenWizard = document.getElementById('btn-open-creation-wizard');
    if (btnOpenWizard) {
      btnOpenWizard.addEventListener('click', () => this.openCreationWizardModal());
    }

    // Creation Setup Wizard Modal Controls
    const btnCloseCharInit = document.getElementById('btn-close-char-init-modal');
    if (btnCloseCharInit) {
      btnCloseCharInit.addEventListener('click', () => this.closeCreationWizardModal());
    }

    const btnCancelCharInit = document.getElementById('btn-cancel-char-init');
    if (btnCancelCharInit) {
      btnCancelCharInit.addEventListener('click', () => this.closeCreationWizardModal());
    }

    const btnApplyCharInit = document.getElementById('btn-apply-char-init');
    if (btnApplyCharInit) {
      btnApplyCharInit.addEventListener('click', () => this.applyCreationWizardSetup());
    }

    const initTierSelect = document.getElementById('init-tier-select');
    if (initTierSelect) {
      initTierSelect.addEventListener('change', (e) => {
        const customRow = document.getElementById('init-custom-tier-row');
        if (customRow) {
          customRow.style.display = e.target.value === 'custom' ? 'flex' : 'none';
        }
      });
    }

    const initFormSelect = document.getElementById('init-form-select');
    if (initFormSelect) {
      initFormSelect.addEventListener('change', (e) => {
        this.updateCreationFormPreview(e.target.value);
      });
    }

    // Quick Vitals Steppers (Accelerating Hold Steppers for Health & Karma)
    const setupAcceleratingHoldStepper = (id, delta, isKarma = false) => {
      const el = document.getElementById(id);
      if (!el) return;

      let holdTimeout = null;
      let tickTimeout = null;
      let isHolding = false;
      let holdStartTime = 0;
      let stepsApplied = 0;
      let pointerDownExecuted = false;

      const executeStep = () => {
        if (!this.character) return false;
        if (isKarma) {
          if (this.karmaMode === 'test') {
            this.showStatusToast('🧪 Test Mode is active (Karma is already infinite: ∞ KP).');
            return false;
          }
          this.character.updateKarma(delta, delta > 0 ? 'Quick Karma Bonus' : 'Quick Karma Spend');
        } else {
          this.character.updateHealth(delta);
        }
        stepsApplied++;
        this.renderVitals();
        return true;
      };

      const startHoldLoop = () => {
        const scheduleNext = () => {
          if (!isHolding) return;
          const elapsed = Date.now() - holdStartTime;
          // Accelerate: start at 120ms, drop to 60ms after 1s, drop to 25ms after 2.5s
          let nextDelay = 120;
          if (elapsed > 2500) {
            nextDelay = 25;
          } else if (elapsed > 1000) {
            nextDelay = 60;
          }

          tickTimeout = setTimeout(() => {
            if (!isHolding) return;
            const ok = executeStep();
            if (ok) {
              scheduleNext();
            } else {
              stopHold();
            }
          }, nextDelay);
        };

        scheduleNext();
      };

      const stopHold = () => {
        if (!isHolding && !holdTimeout && !tickTimeout) return;
        isHolding = false;
        if (holdTimeout) {
          clearTimeout(holdTimeout);
          holdTimeout = null;
        }
        if (tickTimeout) {
          clearTimeout(tickTimeout);
          tickTimeout = null;
        }
        if (stepsApplied > 0) {
          this.saveState();
          stepsApplied = 0;
        }
      };

      el.addEventListener('pointerdown', (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        pointerDownExecuted = true;
        e.preventDefault();
        stopHold();

        isHolding = true;
        holdStartTime = Date.now();
        stepsApplied = 0;

        if (el.setPointerCapture && e.pointerId !== undefined) {
          try {
            el.setPointerCapture(e.pointerId);
          } catch (_) {}
        }

        const ok = executeStep();
        if (!ok) {
          isHolding = false;
          return;
        }

        holdTimeout = setTimeout(() => {
          if (!isHolding) return;
          startHoldLoop();
        }, 350);
      });

      const handlePointerEnd = (e) => {
        if (el.releasePointerCapture && e.pointerId !== undefined) {
          try {
            el.releasePointerCapture(e.pointerId);
          } catch (_) {}
        }
        stopHold();
      };

      el.addEventListener('pointerup', handlePointerEnd);
      el.addEventListener('pointercancel', handlePointerEnd);
      el.addEventListener('pointerleave', (e) => {
        try {
          if (!el.hasPointerCapture || !el.hasPointerCapture(e.pointerId)) {
            stopHold();
          }
        } catch (_) {
          stopHold();
        }
      });
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!pointerDownExecuted && stepsApplied === 0) {
          executeStep();
          this.saveState();
        }
        pointerDownExecuted = false;
      });
      el.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
    };

    setupAcceleratingHoldStepper('btn-health-minus1', -1, false);
    setupAcceleratingHoldStepper('btn-health-plus1', 1, false);
    setupAcceleratingHoldStepper('btn-karma-minus1', -1, true);
    setupAcceleratingHoldStepper('btn-karma-plus1', 1, true);

    const btnHealthReset = document.getElementById('btn-health-reset');
    if (btnHealthReset) {
      btnHealthReset.addEventListener('click', () => {
        const fullHealth = typeof this.character.resetHealth === 'function'
          ? this.character.resetHealth()
          : (this.character.currentHealth = this.character.calculateMaxHealth());
        this.saveState();
        this.renderVitals();
        this.showStatusToast(`❤️ Health reset to full normal amount (${fullHealth}/${this.character.calculateMaxHealth()})`);
      });
    }

    // Quick Vitals Manual Inputs (Health & Karma +"###" fields)
    const setupManualVitalInput = (id, isKarma = false) => {
      const el = document.getElementById(id);
      if (!el) return;

      const applyValue = () => {
        const raw = el.value.trim();
        if (!raw) return;
        const delta = parseInt(raw, 10);
        if (isNaN(delta) || delta === 0) {
          el.value = '';
          return;
        }

        if (isKarma) {
          if (this.karmaMode === 'test') {
            this.showStatusToast('🧪 Test Mode is active (Karma is already infinite: ∞ KP).');
          } else {
            this.character.updateKarma(delta, delta > 0 ? `Karma Reward (+${delta} KP)` : `Manual Karma Spend (${delta} KP)`);
            this.saveState();
            this.renderVitals();
            this.showStatusToast(`✨ Karma ${delta > 0 ? '+' : ''}${delta} KP applied (Total: ${this.character.currentKarma} KP)`);
          }
        } else {
          this.character.updateHealth(delta);
          this.saveState();
          this.renderVitals();
          const b = typeof this.character.calculateHealthBreakdown === 'function' ? this.character.calculateHealthBreakdown() : null;
          if (b && b.bonusHealth > 0) {
            this.showStatusToast(`❤️ Health ${delta > 0 ? '+' : ''}${delta} applied (Total: ${this.character.currentHealth} | Base: ${b.baseHealth}, Bonus: +${b.bonusHealth})`);
          } else {
            this.showStatusToast(`❤️ Health ${delta > 0 ? '+' : ''}${delta} applied (${this.character.currentHealth}/${this.character.calculateMaxHealth()})`);
          }
        }

        el.value = '';
      };

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyValue();
          el.blur();
        } else if (e.key === 'Escape') {
          el.value = '';
          el.blur();
        }
      });

      el.addEventListener('blur', () => {
        applyValue();
      });
    };

    setupManualVitalInput('input-health-adjust', false);
    setupManualVitalInput('input-karma-adjust', true);

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

    const btnTopAdvancement = document.getElementById('btn-top-advancement');
    if (btnTopAdvancement) {
      btnTopAdvancement.addEventListener('click', () => {
        if (this.karmaMode === 'session') {
          this.promptAdvancementModeSwitch();
        } else {
          this.openAdvancementModal();
        }
      });
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
        if (overlay.id === 'cheatsheet-modal' && this.cheatsheetPoppedOut) return;
        if (e.target === overlay) overlay.classList.remove('open');
      });
    });

    // Auto-update Exceptional/Starred checkbox when selecting power
    const pCatSelect = document.getElementById('select-power-catalog');
    if (pCatSelect) {
      pCatSelect.addEventListener('change', () => this.syncPowerSelectionUI());
    }

    const pRankSelect = document.getElementById('select-new-power-rank');
    if (pRankSelect) {
      pRankSelect.addEventListener('change', () => this.updatePowerOptionsPreview());
    }

    const pCheckExp = document.getElementById('check-power-exceptional');
    if (pCheckExp) {
      pCheckExp.addEventListener('change', () => this.updatePowerOptionsPreview());
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
      'inv-opt-talent', 'inv-opt-workshop', 'inv-opt-kitbash',
      'inv-boost-area', 'inv-boost-piercing', 'inv-boost-overcharge', 'inv-boost-range', 'inv-boost-ai',
      'inv-limit-ammo', 'inv-limit-tether', 'inv-limit-bulky', 'inv-limit-cooldown', 'inv-limit-burnout'
    ];
    invInputIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', () => {
          if (id === 'inv-opt-talent') {
            if (!el.dataset) el.dataset = {};
            el.dataset.userInteracted = 'true';
          }
          this.handleCalculateInvention();
        });
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

    // Cheat Sheet Auto-Popout Preference Init & Listener
    const autoPopoutOpt = document.getElementById('option-cheatsheet-auto-popout');
    const savedAutoPopout = typeof localStorage !== 'undefined' ? localStorage.getItem('msh_cheatsheet_auto_popout') : null;
    this.cheatsheetAutoPopout = savedAutoPopout !== 'false'; // default to true
    if (autoPopoutOpt) {
      autoPopoutOpt.checked = this.cheatsheetAutoPopout;
      autoPopoutOpt.addEventListener('change', (e) => {
        this.cheatsheetAutoPopout = e.target.checked;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('msh_cheatsheet_auto_popout', this.cheatsheetAutoPopout ? 'true' : 'false');
        }
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

    // Universal Action Table Preference Init & Listeners
    const tableOpt = document.getElementById('option-universal-table');
    const cheatTableOpt = document.getElementById('cheat-table-mode-select');
    const savedTableMode = typeof localStorage !== 'undefined' ? localStorage.getItem('msh_option_universal_table') : null;
    this.universalTableMode = (savedTableMode === 'standard') ? 'standard' : 'cmf';
    if (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.setTableMode) {
      UniversalTableEngine.setTableMode(this.universalTableMode);
    }
    if (tableOpt) tableOpt.value = this.universalTableMode;
    if (cheatTableOpt) cheatTableOpt.value = this.universalTableMode;

    if (tableOpt) {
      tableOpt.addEventListener('change', (e) => {
        this.setUniversalTableMode(e.target.value);
      });
    }
    if (cheatTableOpt) {
      cheatTableOpt.addEventListener('change', (e) => {
        this.setUniversalTableMode(e.target.value);
      });
    }

    // Power Adjustment Preference Init & Listeners
    const powerAdjOpt = document.getElementById('option-power-adjustment');
    const savedPowerAdj = typeof localStorage !== 'undefined' ? localStorage.getItem('msh_option_power_adjustment') : null;
    this.powerAdjustment = (savedPowerAdj === 'true');
    if (this.character && this.character.powerAdjustment !== undefined && savedPowerAdj === null) {
      this.powerAdjustment = !!this.character.powerAdjustment;
    }
    if (this.character) {
      this.character.powerAdjustment = this.powerAdjustment;
    }
    if (powerAdjOpt) {
      powerAdjOpt.checked = this.powerAdjustment;
      powerAdjOpt.addEventListener('change', (e) => {
        this.setPowerAdjustment(e.target.checked);
      });
    }

    // Karmic Success Preference Init & Listeners
    const karmicOpt = document.getElementById('option-karmic-success');
    const savedKarmic = typeof localStorage !== 'undefined' ? localStorage.getItem('msh_option_karmic_success') : null;
    this.karmicSuccess = (savedKarmic === 'true');
    if (this.character && this.character.karmicSuccess !== undefined && savedKarmic === null) {
      this.karmicSuccess = !!this.character.karmicSuccess;
    }
    if (this.character) {
      this.character.karmicSuccess = this.karmicSuccess;
    }
    if (karmicOpt) {
      karmicOpt.checked = this.karmicSuccess;
      karmicOpt.addEventListener('change', (e) => {
        this.setKarmicSuccess(e.target.checked);
        this.showStatusToast(e.target.checked 
          ? '✨ Karmic Success house rule ENABLED (refund up to 20 KP on Blue shift)' 
          : 'Karmic Success house rule disabled');
      });
    }

    // Superior Option Tax / Surcharge House Rule Preference Init & Listeners
    const supOptEl = document.getElementById('option-superior-option-cost') || document.getElementById('option-superior-option-tax');
    const savedSupOpt = typeof localStorage !== 'undefined' 
      ? (localStorage.getItem('msh_option_superior_option_tax') ?? localStorage.getItem('msh_option_superior_option_cost')) 
      : null;
    this.superiorOptionCost = (savedSupOpt === 'true');
    if (this.character && this.character.superiorOptionCost !== undefined && savedSupOpt === null) {
      this.superiorOptionCost = !!this.character.superiorOptionCost;
    }
    if (this.character) {
      this.character.superiorOptionCost = this.superiorOptionCost;
    }
    if (supOptEl) {
      supOptEl.checked = this.superiorOptionCost;
      supOptEl.addEventListener('change', (e) => {
        this.setSuperiorOptionCost(e.target.checked);
        this.showStatusToast(e.target.checked 
          ? '⚡ Superior Option Tax house rule ENABLED (+100% Base CP surcharge for superior choices)' 
          : 'Superior Option Tax house rule disabled (0 CP surcharge for superior choices)');
      });
    }

    // Power Adjustment Modal Listeners
    const btnCloseAdjModal = document.getElementById('btn-close-adj-modal');
    const btnCancelAdj = document.getElementById('btn-cancel-adj');
    const modalPowerAdj = document.getElementById('modal-power-adjustment');
    if (btnCloseAdjModal && modalPowerAdj) {
      btnCloseAdjModal.addEventListener('click', () => modalPowerAdj.classList.remove('open'));
    }
    if (btnCancelAdj && modalPowerAdj) {
      btnCancelAdj.addEventListener('click', () => modalPowerAdj.classList.remove('open'));
    }

    const adjAspectInc = document.getElementById('adj-aspect-increase');
    const adjAspectDec = document.getElementById('adj-aspect-decrease');
    const adjColShift = document.getElementById('adj-column-shift');
    const adjCharCreation = document.getElementById('adj-char-creation');
    const btnApplyAdj = document.getElementById('btn-apply-adj');
    const btnResetAdj = document.getElementById('btn-reset-adj');

    if (adjAspectInc) {
      adjAspectInc.addEventListener('change', () => this.handleAdjustmentAspectChanged('increase'));
    }
    if (adjAspectDec) {
      adjAspectDec.addEventListener('change', () => this.handleAdjustmentAspectChanged('decrease'));
    }
    if (adjColShift) {
      adjColShift.addEventListener('change', () => this.updateAdjustmentPreview());
    }
    if (adjCharCreation) {
      adjCharCreation.addEventListener('change', () => this.updateAdjustmentPreview());
    }
    if (btnApplyAdj) {
      btnApplyAdj.addEventListener('click', (e) => this.handleApplyPowerAdjustment(e));
    }
    if (btnResetAdj) {
      btnResetAdj.addEventListener('click', (e) => this.handleResetPowerAdjustment(e));
    }

    // Power Options Modal Listeners
    const btnCloseOptModal = document.getElementById('btn-close-opt-modal');
    const btnCancelOptModal = document.getElementById('btn-cancel-opt-modal');
    const btnSaveOptModal = document.getElementById('btn-save-opt-modal');
    if (btnCloseOptModal) {
      btnCloseOptModal.addEventListener('click', () => this.closePowerOptionsModal());
    }
    if (btnCancelOptModal) {
      btnCancelOptModal.addEventListener('click', () => this.closePowerOptionsModal());
    }
    if (btnSaveOptModal) {
      btnSaveOptModal.addEventListener('click', () => this.savePowerOptionsModal());
    }

    // Power Trigger & Operational Mode Modal Listeners
    const btnCloseTriggerModal = document.getElementById('btn-close-trigger-modal');
    const btnCancelTriggerModal = document.getElementById('btn-cancel-trigger-modal');
    const btnSaveTriggerModal = document.getElementById('btn-save-trigger-modal');
    const btnResetTrigger = document.getElementById('btn-reset-trigger');
    if (btnCloseTriggerModal) {
      btnCloseTriggerModal.addEventListener('click', () => this.closePowerTriggerModal());
    }
    if (btnCancelTriggerModal) {
      btnCancelTriggerModal.addEventListener('click', () => this.closePowerTriggerModal());
    }
    if (btnSaveTriggerModal) {
      btnSaveTriggerModal.addEventListener('click', () => this.savePowerTriggerModal());
    }
    if (btnResetTrigger) {
      btnResetTrigger.addEventListener('click', () => this.resetPowerTriggerModal());
    }

    // Radio change listener for linkage mode
    document.querySelectorAll('input[name="trigger-link-mode"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const details = document.getElementById('trigger-linked-details');
        if (details) {
          details.style.display = (e.target.value === 'linked') ? 'block' : 'none';
        }
      });
    });

    // Preset chips
    document.querySelectorAll('#modal-power-trigger [data-preset]').forEach(chip => {
      chip.addEventListener('click', () => {
        this.applyTriggerPreset(chip.dataset.preset);
      });
    });

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

    const menuItemNew = document.getElementById('menu-item-new');
    if (menuItemNew) {
      menuItemNew.addEventListener('click', (e) => {
        if (fileOptionsMenu) fileOptionsMenu.classList.remove('open');
        this.newCharacter(e);
      });
    }

    const menuItemSave = document.getElementById('menu-item-save');
    if (menuItemSave) {
      menuItemSave.addEventListener('click', () => {
        if (fileOptionsMenu) fileOptionsMenu.classList.remove('open');
        this.exportCharacter();
      });
    }

    const menuItemPrint = document.getElementById('menu-item-print-preview');
    if (menuItemPrint) {
      menuItemPrint.addEventListener('click', () => {
        if (fileOptionsMenu) fileOptionsMenu.classList.remove('open');
        this.openPrintPreview();
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

    const menuItemHelp = document.getElementById('menu-item-help');
    if (menuItemHelp) {
      menuItemHelp.addEventListener('click', () => {
        if (fileOptionsMenu) fileOptionsMenu.classList.remove('open');
      });
    }

    const menuItemErrata = document.getElementById('menu-item-errata');
    if (menuItemErrata) {
      menuItemErrata.addEventListener('click', () => {
        if (fileOptionsMenu) fileOptionsMenu.classList.remove('open');
      });
    }

    const menuItemUpdates = document.getElementById('menu-item-updates');
    if (menuItemUpdates) {
      menuItemUpdates.addEventListener('click', () => {
        if (fileOptionsMenu) fileOptionsMenu.classList.remove('open');
        this.checkForUpdates({ trigger: 'manual', silent: false });
      });
    }

    const karmaRankPill = document.getElementById('vital-karma-last-rank');
    if (karmaRankPill) {
      karmaRankPill.addEventListener('click', () => {
        if (this.karmaMode === 'session') {
          this.promptAdvancementModeSwitch();
        } else {
          this.openAdvancementModal();
        }
      });
    }

    // Karma Operating Mode Trigger (clicking vital-left / karma display or topbar TEST badge)
    const karmaModeTrigger = document.getElementById('vital-karma-mode-trigger');
    if (karmaModeTrigger) {
      karmaModeTrigger.addEventListener('click', () => this.openKarmaModeModal());
    }
    const headerTestBadge = document.getElementById('header-test-mode-badge');
    if (headerTestBadge) {
      headerTestBadge.addEventListener('click', () => this.openKarmaModeModal());
    }

    // Karma Operating Mode Modal Controls
    const btnCloseKarmaMode = document.getElementById('btn-close-karma-mode-modal');
    if (btnCloseKarmaMode) {
      btnCloseKarmaMode.addEventListener('click', () => {
        const modal = document.getElementById('modal-karma-mode');
        if (modal) modal.classList.remove('open');
      });
    }
    const btnCancelKarmaMode = document.getElementById('btn-cancel-karma-mode');
    if (btnCancelKarmaMode) {
      btnCancelKarmaMode.addEventListener('click', () => {
        const modal = document.getElementById('modal-karma-mode');
        if (modal) modal.classList.remove('open');
      });
    }
    const btnApplyKarmaMode = document.getElementById('btn-apply-karma-mode');
    if (btnApplyKarmaMode) {
      btnApplyKarmaMode.addEventListener('click', async () => {
        const checkedRadio = document.querySelector('input[name="karma-mode-choice"]:checked');
        if (checkedRadio) {
          const success = await this.setKarmaMode(checkedRadio.value);
          if (success) {
            const modal = document.getElementById('modal-karma-mode');
            if (modal) modal.classList.remove('open');
          }
        }
      });
    }
    const btnRevertAdvInModal = document.getElementById('btn-revert-adv-in-modal');
    if (btnRevertAdvInModal) {
      btnRevertAdvInModal.addEventListener('click', () => this.revertAdvancementChanges());
    }
    const btnOpenAdvFromMode = document.getElementById('btn-open-adv-from-mode');
    if (btnOpenAdvFromMode) {
      btnOpenAdvFromMode.addEventListener('click', () => {
        const modal = document.getElementById('modal-karma-mode');
        if (modal) modal.classList.remove('open');
        this.openAdvancementModal();
      });
    }

    // Mode cards click selection
    document.querySelectorAll('.karma-mode-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('#btn-revert-adv-in-modal')) return;
        const mode = card.getAttribute('data-mode');
        if (mode) {
          const radio = card.querySelector('input[type="radio"]');
          if (radio) radio.checked = true;
          document.querySelectorAll('.karma-mode-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
        }
      });
    });

    // Advancement Modal Banner Controls
    const btnSwitchModeFromAdv = document.getElementById('btn-switch-mode-from-advmodal');
    if (btnSwitchModeFromAdv) {
      btnSwitchModeFromAdv.addEventListener('click', async () => {
        if (this.karmaMode === 'advancement' || this.karmaMode === 'test') {
          await this.setKarmaMode('session');
        } else {
          await this.setKarmaMode('advancement');
        }
      });
    }
    const btnRevertAdvInAdvModal = document.getElementById('btn-revert-adv-in-advmodal');
    if (btnRevertAdvInAdvModal) {
      btnRevertAdvInAdvModal.addEventListener('click', () => this.revertAdvancementChanges());
    }

    // Character Advancement Modal Controls
    const btnCloseAdvModal = document.getElementById('btn-close-adv-modal');
    if (btnCloseAdvModal) {
      btnCloseAdvModal.addEventListener('click', () => {
        const advModal = document.getElementById('modal-advancement');
        if (advModal) advModal.classList.remove('open');
      });
    }

    const btnCancelAdv = document.getElementById('btn-cancel-adv');
    if (btnCancelAdv) {
      btnCancelAdv.addEventListener('click', () => {
        const advModal = document.getElementById('modal-advancement');
        if (advModal) advModal.classList.remove('open');
      });
    }

    const btnApplyAdv = document.getElementById('btn-apply-adv');
    if (btnApplyAdv) {
      btnApplyAdv.addEventListener('click', () => this.handleApplyAdvancement());
    }

    const advCategorySelect = document.getElementById('adv-category-select');
    if (advCategorySelect) {
      advCategorySelect.addEventListener('change', () => {
        this.populateAdvancementItems();
        this.updateAdvancementPreview();
      });
    }

    const advItemSelect = document.getElementById('adv-item-select');
    if (advItemSelect) {
      advItemSelect.addEventListener('change', () => this.updateAdvancementPreview());
    }

    const advTargetRankSelect = document.getElementById('adv-target-rank-select');
    if (advTargetRankSelect) {
      advTargetRankSelect.addEventListener('change', () => this.updateAdvancementPreview());
    }

    const advModalOverlay = document.getElementById('modal-advancement');
    if (advModalOverlay) {
      advModalOverlay.addEventListener('click', (e) => {
        if (e.target === advModalOverlay) {
          advModalOverlay.classList.remove('open');
        }
      });
    }

    // Program Updates Settings Controls
    const chkUpdateStartup = document.getElementById('option-update-on-startup');
    if (chkUpdateStartup) {
      chkUpdateStartup.addEventListener('change', (e) => {
        this.updateSettings.onStartup = e.target.checked;
        this.saveUpdateSettings();
      });
    }

    const btnCheckNow = document.getElementById('btn-check-updates-now');
    if (btnCheckNow) {
      btnCheckNow.addEventListener('click', () => {
        this.checkForUpdates({ trigger: 'manual', silent: false });
      });
    }

    // Print Preview Modal Controls
    const btnClosePrint = document.getElementById('btn-close-print-preview');
    if (btnClosePrint) {
      btnClosePrint.addEventListener('click', () => this.closePrintPreview());
    }
    const btnClosePrintFooter = document.getElementById('btn-close-print-preview-footer');
    if (btnClosePrintFooter) {
      btnClosePrintFooter.addEventListener('click', () => this.closePrintPreview());
    }

    const btnPrintSheet = document.getElementById('btn-print-preview-print');
    if (btnPrintSheet) {
      btnPrintSheet.addEventListener('click', () => this.printCharacterSheet());
    }

    const btnExportPdf = document.getElementById('btn-print-preview-pdf');
    if (btnExportPdf) {
      btnExportPdf.addEventListener('click', () => this.exportCharacterPDF());
    }

    const optCompact = document.getElementById('print-opt-compact');
    if (optCompact) {
      optCompact.addEventListener('change', () => this.renderPrintSheet());
    }
    const optInventions = document.getElementById('print-opt-inventions');
    if (optInventions) {
      optInventions.addEventListener('change', () => this.renderPrintSheet());
    }
    const optHistory = document.getElementById('print-opt-history');
    if (optHistory) {
      optHistory.addEventListener('change', () => this.renderPrintSheet());
    }

    const printModal = document.getElementById('print-preview-modal');
    if (printModal) {
      printModal.addEventListener('click', (e) => {
        if (e.target === printModal) {
          this.closePrintPreview();
        }
      });
    }

    if (typeof document !== 'undefined' && document.addEventListener) {
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
          e.preventDefault();
          this.openPrintPreview();
        }
        if (e.key === 'Escape') {
          const ppm = document.getElementById('print-preview-modal');
          if (ppm && ppm.classList.contains('open')) {
            this.closePrintPreview();
          }
        }
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
    this.setTheme(savedTheme || 'slate');

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
      this.syncInventionTalentAutoDetect();
      this.handleCalculateInvention();
      this.renderKnownBlueprints();
    }
  },

  switchCheatTab(tabKey) {
    this.activeCheatTab = tabKey;
    ['combat', 'table', 'movement', 'health', 'materials'].forEach(t => {
      const btn = (typeof this.getCheatSheetEl === 'function') ? this.getCheatSheetEl(`cheat-tab-btn-${t}`) : document.getElementById(`cheat-tab-btn-${t}`);
      const sec = (typeof this.getCheatSheetEl === 'function') ? this.getCheatSheetEl(`cheat-section-${t}`) : document.getElementById(`cheat-section-${t}`);
      if (btn) btn.classList.toggle('active', t === tabKey);
      if (sec) sec.style.display = t === tabKey ? 'block' : 'none';
    });
    if (tabKey === 'table') {
      this.renderCheatSheetTable();
    } else if (tabKey === 'materials') {
      this.renderCheatSheetMaterials();
    } else if (tabKey === 'movement') {
      this.renderCheatSheetMovement();
    }
  },

  populateDropdowns() {
    const activeRanks = (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.ranks)
      ? UniversalTableEngine.ranks.filter(r => r.name !== 'Shift 0' && !r.name.startsWith('Class') && r.name !== 'Beyond')
      : RANKS.slice(1, 14);

    const rankOptionsHtml = activeRanks.map(r => 
      `<option value="${r.name}">${r.name} (${r.num}) - ${r.num} CP</option>`
    ).join('');
    const plainRankOptionsHtml = activeRanks.map(r => 
      `<option value="${r.name}">${r.name} (${r.num})</option>`
    ).join('');

    // Primary Abilities Selectors
    ['fighting', 'agility', 'strength', 'endurance', 'reason', 'intuition', 'psyche'].forEach(k => {
      const sel = document.getElementById(`select-rank-${k}`);
      if (sel) {
        sel.innerHTML = rankOptionsHtml;
        if (this.character && this.character.abilities && this.character.abilities[k]) {
          sel.value = this.character.abilities[k].rankName;
        }
        if (!sel.dataset.bound) {
          sel.dataset.bound = 'true';
          sel.addEventListener('change', (e) => {
            if (this.character && this.character.isCreationSetupPending) {
              this.showStatusToast('⚠️ Please choose your Starting Tier and Physical Form before spending CP.');
              this.openCreationWizardModal();
              this.renderAbilities();
              return;
            }
            const capKey = k.charAt(0).toUpperCase() + k.slice(1);
            this.character.setAbilityRank(k, e.target.value);
            this.recordCharacterEdit(`Updated ${capKey} to ${e.target.value}`, 'ability');
            this.render();
          });
        }
      }
    });

    // Resources Selectors (Main Stats)
    const resSel = document.getElementById('select-rank-resources');
    if (resSel) {
      resSel.innerHTML = rankOptionsHtml;
      if (this.character && this.character.resources) {
        resSel.value = this.character.resources.rankName;
      }
      if (!resSel.dataset.bound) {
        resSel.dataset.bound = 'true';
        resSel.addEventListener('change', (e) => {
          if (this.character && this.character.isCreationSetupPending) {
            this.showStatusToast('⚠️ Please choose your Starting Tier and Physical Form before spending CP.');
            this.openCreationWizardModal();
            this.renderPointBuy();
            this.renderBackground();
            return;
          }
          this.character.setResourceRank(e.target.value);
          this.recordCharacterEdit(`Updated Resources to ${e.target.value}`, 'ability');
          this.renderPointBuy();
          this.renderBackground();
          this.renderEquipment();
        });
      }
    }

    // Resources Selectors (Background Tab)
    const bgResSel = document.getElementById('background-resource-select');
    if (bgResSel) {
      bgResSel.innerHTML = rankOptionsHtml;
      if (this.character && this.character.resources) {
        bgResSel.value = this.character.resources.rankName;
      }
      if (!bgResSel.dataset.bound) {
        bgResSel.dataset.bound = 'true';
        bgResSel.addEventListener('change', (e) => {
          if (this.character && this.character.isCreationSetupPending) {
            this.showStatusToast('⚠️ Please choose your Starting Tier and Physical Form before spending CP.');
            this.openCreationWizardModal();
            this.renderPointBuy();
            this.renderBackground();
            return;
          }
          this.character.setResourceRank(e.target.value);
          this.recordCharacterEdit(`Updated Resources to ${e.target.value}`, 'ability');
          this.renderPointBuy();
          this.renderBackground();
          this.renderEquipment();
        });
      }
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
      const prevVal = pRankSel.value;
      pRankSel.innerHTML = rankOptionsHtml;
      if (prevVal) pRankSel.value = prevVal;
    }

    // Inventions Material & Power Dropdowns
    const invMatSel = document.getElementById('inv-material-rank');
    const matList = (typeof getMaterialStrengths === 'function')
      ? getMaterialStrengths()
      : (globalThis.MATERIAL_STRENGTHS || []);
    if (invMatSel && matList.length > 0) {
      const prevMat = invMatSel.value;
      invMatSel.innerHTML = matList.map(m => {
        const specialTag = (m.num >= 1000) ? ' [Cosmic / Mythic]' : (m.num >= 75 ? ' [Special Reqs]' : '');
        return `<option value="${m.rank}">${m.name} (${m.rank} / ${m.num})${specialTag}</option>`;
      }).join('');
      let matched = matList.find(m => m.rank === prevMat);
      if (!matched && prevMat) {
        const prevObj = UniversalTableEngine.getRankByName(prevMat);
        const mapped = UniversalTableEngine.getRankByNum(prevObj.num);
        matched = matList.find(m => m.rank === mapped.name);
      }
      invMatSel.value = matched ? matched.rank : (matList[6]?.rank || 'Remarkable');
    }

    this.renderInvPowerDropdown();

    const invPwrRankSel = document.getElementById('inv-power-rank');
    if (invPwrRankSel) {
      const prevVal = invPwrRankSel.value;
      invPwrRankSel.innerHTML = plainRankOptionsHtml;
      invPwrRankSel.value = prevVal || 'Remarkable';
    }

    // Inventions Ability Boost Dropdowns
    const invBstMode = document.getElementById('inv-boost-mode');
    const invBstRank = document.getElementById('inv-boost-rank');
    const updateInvBstRankOptions = () => {
      if (!invBstMode || !invBstRank) return;
      const prevVal = invBstRank.value;
      if (invBstMode.value === 'bonus') {
        invBstRank.innerHTML = `
          <option value="1">+1 CS</option>
          <option value="2" selected>+2 CS</option>
          <option value="3">+3 CS</option>
          <option value="4">+4 CS</option>
        `;
        if (prevVal && ['1', '2', '3', '4'].includes(prevVal)) {
          invBstRank.value = prevVal;
        }
      } else {
        invBstRank.innerHTML = plainRankOptionsHtml;
        if (prevVal && activeRanks.some(r => r.name === prevVal)) {
          invBstRank.value = prevVal;
        } else {
          invBstRank.value = 'Incredible';
        }
      }
    };
    if (invBstMode && !invBstMode.dataset.bound) {
      invBstMode.dataset.bound = 'true';
      invBstMode.addEventListener('change', updateInvBstRankOptions);
    }
    updateInvBstRankOptions();

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
      const sortedCatNames = Object.keys(eqCats).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
      for (const c of sortedCatNames) {
        eqCats[c].sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' }));
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
    this.renderCheatSheetMaterials();
    this.renderCheatSheetMovement();
    this.renderKnownBlueprints();
    this.syncInventionTalentAutoDetect();
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

    const isLocked = !!(this.character && this.character.isCreationSetupPending);

    const stripTierEl = document.getElementById('strip-tier-display');
    if (stripTierEl) {
      const tierVal = this.character ? (this.character.pointTier === 'custom' ? `${this.character.pointBudget} CP (Custom)` : `${this.character.pointTier} CP`) : '400 CP';
      stripTierEl.textContent = isLocked ? `${tierVal} [Setup Pending]` : tierVal;
      stripTierEl.style.color = isLocked ? '#f59e0b' : 'var(--marvel-gold)';
    }

    const stripFormEl = document.getElementById('strip-form-display');
    if (stripFormEl) {
      stripFormEl.textContent = this.character ? (this.character.formName || 'Mutant') : 'Mutant';
    }

    const btnWizard = document.getElementById('btn-open-creation-wizard');
    if (btnWizard) {
      btnWizard.style.display = isLocked ? 'inline-flex' : 'none';
    }

    this.updateCPSpendingLockUI(isLocked);

    const tierSelect = document.getElementById('point-tier-select');
    if (tierSelect) tierSelect.value = this.character.pointTier;
  },

  renderVitals() {
    if (!this.character) return;
    const breakdown = typeof this.character.calculateHealthBreakdown === 'function'
      ? this.character.calculateHealthBreakdown()
      : {
          baseHealth: typeof this.character.getBaseHealth === 'function' ? this.character.getBaseHealth() : this.character.calculateMaxHealth(),
          bonusHealth: 0,
          totalMaxHealth: this.character.calculateMaxHealth(),
          currentHealth: this.character.currentHealth
        };

    const maxH = breakdown.totalMaxHealth;
    const curH = breakdown.currentHealth;
    const hPct = Math.min(100, Math.max(0, Math.round((curH / Math.max(maxH, 1)) * 100)));

    const hBaseEl = document.getElementById('vital-health-base');
    if (hBaseEl) {
      hBaseEl.textContent = breakdown.baseHealth;
      const bMax = breakdown.baseHealthMax || breakdown.baseHealth;
      hBaseEl.title = breakdown.baseHealth < bMax
        ? `Base Health: ${breakdown.baseHealth} / ${bMax} (Damaged)`
        : `Base Health: ${breakdown.baseHealth} (Full)`;
    }

    const hBonusEl = document.getElementById('vital-health-bonus');
    const hBonusPill = document.getElementById('vital-health-bonus-pill');
    if (hBonusEl) {
      hBonusEl.textContent = breakdown.bonusHealth > 0 ? `+${breakdown.bonusHealth}` : '0';
      if (hBonusPill) {
        if (breakdown.bonusHealth > 0) {
          hBonusPill.classList.add('active-bonus');
          hBonusPill.title = `Bonus Health: +${breakdown.bonusHealth}. Absorbs incoming damage first!`;
        } else {
          hBonusPill.classList.remove('active-bonus');
          hBonusPill.title = 'Bonus Health: 0 (Health exceeding base goes here and absorbs damage first)';
        }
      }
    }

    const hCurEl = document.getElementById('vital-health-cur');
    if (hCurEl) hCurEl.textContent = curH;
    const hMaxEl = document.getElementById('vital-health-max');
    if (hMaxEl) hMaxEl.textContent = maxH;
    const hFill = document.getElementById('vital-health-fill');
    if (hFill) {
      hFill.style.width = `${hPct}%`;
      if (hPct < 30) {
        hFill.className = 'vital-progress-fill health-fill low';
      } else if (breakdown.bonusHealth > 0) {
        hFill.className = 'vital-progress-fill health-fill bonus';
      } else {
        hFill.className = 'vital-progress-fill health-fill';
      }
    }

    const isTestMode = this.karmaMode === 'test';
    const curK = isTestMode ? '∞' : this.character.currentKarma;
    const kCurEl = document.getElementById('vital-karma-cur');
    if (kCurEl) kCurEl.textContent = curK;

    // Render Karma Mode Badge
    const modeBadge = document.getElementById('vital-karma-mode-badge');
    if (modeBadge) {
      const mode = this.karmaMode || 'session';
      modeBadge.className = `vital-karma-mode-badge mode-${mode}`;
      if (mode === 'test') {
        modeBadge.textContent = 'Test (∞)';
        modeBadge.title = 'Current Mode: Test Mode (Infinite KP) — Click to change';
      } else if (mode === 'advancement') {
        modeBadge.textContent = 'Advancement';
        modeBadge.title = 'Current Mode: Advancement Mode — Click to change';
      } else {
        modeBadge.textContent = 'Session';
        modeBadge.title = 'Current Mode: Session Mode (Standard Play) — Click to change';
      }
    }

    // Render Topbar TEST Mode Badge (appears after hero name)
    const headerTestBadge = document.getElementById('header-test-mode-badge');
    if (headerTestBadge) {
      headerTestBadge.style.display = isTestMode ? 'inline-flex' : 'none';
    }

    // Optional legacy base & fill elements if present in DOM
    const baseK = this.character.calculateBaseKarma();
    const kBaseEl = document.getElementById('vital-karma-base');
    if (kBaseEl) kBaseEl.textContent = baseK;
    const kFillEl = document.getElementById('vital-karma-fill');
    if (kFillEl) {
      const kPct = Math.min(100, Math.max(0, Math.round((curK / Math.max(baseK, 1)) * 100)));
      kFillEl.style.width = `${Math.max(5, kPct)}%`;
    }

    // Render Last Karma Spent on Roll display
    const lastSpentEl = document.getElementById('vital-karma-last-val');
    const lastSpentBox = document.getElementById('vital-karma-last-roll');
    if (lastSpentEl) {
      const last = (this.character && this.character.lastKarmaSpentOnRoll)
        ? this.character.lastKarmaSpentOnRoll
        : (this.lastKarmaSpentOnRoll || null);
      if (last && typeof last.spent === 'number') {
        const rollLabel = last.name ? ` (${last.name})` : '';
        if (last.spent === 0) {
          lastSpentEl.textContent = '0 KP';
          if (lastSpentBox) lastSpentBox.title = `Last FEAT roll${rollLabel}: 0 KP spent`;
        } else if (last.refund && last.refund > 0) {
          lastSpentEl.innerHTML = `-${last.spent} KP <span class="karmic-refund-badge" style="font-size: 0.9em;">(↩+${last.refund})</span>`;
          if (lastSpentBox) lastSpentBox.title = `Last FEAT roll${rollLabel}: ${last.spent} KP spent (+${last.refund} KP refunded by Karmic Success)`;
        } else {
          lastSpentEl.textContent = `-${last.spent} KP`;
          if (lastSpentBox) lastSpentBox.title = `Last FEAT roll${rollLabel}: ${last.spent} KP spent`;
        }
      } else {
        lastSpentEl.textContent = '--';
        if (lastSpentBox) lastSpentBox.title = 'No Karma spent on a roll yet';
      }
    }

    // Render Last Karma Spent on Rank Increase display
    const lastRankEl = document.getElementById('vital-karma-last-rank-val');
    const lastRankBox = document.getElementById('vital-karma-last-rank');
    if (lastRankEl) {
      const lastRank = (this.character && this.character.lastKarmaSpentOnRankIncrease)
        ? this.character.lastKarmaSpentOnRankIncrease
        : null;
      if (lastRank && typeof lastRank.amount === 'number' && lastRank.amount > 0) {
        lastRankEl.textContent = `-${lastRank.amount} KP`;
        const targetDesc = lastRank.target ? (lastRank.target.charAt(0).toUpperCase() + lastRank.target.slice(1)) : 'Trait';
        const fromTo = (lastRank.from && lastRank.to) ? ` (${lastRank.from} → ${lastRank.to})` : '';
        const days = lastRank.trainingDays ? ` • ${lastRank.trainingDays} day${lastRank.trainingDays > 1 ? 's' : ''} training` : '';
        if (lastRankBox) lastRankBox.title = `Last Rank Increase: Advanced ${targetDesc}${fromTo} for ${lastRank.amount} KP${days}. Click to open Character Advancement.`;
      } else {
        lastRankEl.textContent = '--';
        if (lastRankBox) lastRankBox.title = 'No Karma spent on a rank increase yet. Click to open Character Advancement.';
      }
    }

    const rollerAvailKarma = this.getRollerEl ? this.getRollerEl('roller-avail-karma') : null;
    if (rollerAvailKarma) rollerAvailKarma.textContent = curK;
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
    if (this.character.calculateDefenses) {
      this.character.calculateDefenses();
    }
    const ba = this.character.defenses.bodyArmor;
    if (ba.physical > 0 || ba.energy > 0) {
      document.getElementById('def-body-armor').textContent = (ba.physical === ba.energy)
        ? `${ba.rankName} (${ba.physical})`
        : `${ba.physical} Phys / ${ba.energy} Energy`;
    } else {
      document.getElementById('def-body-armor').textContent = 'None';
    }
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
      const pRank = (typeof UniversalTableEngine !== 'undefined')
        ? UniversalTableEngine.getRankByNum(p.rankValue)
        : UniversalTableEngine.getRankByName(p.rankName);
      const isOperating = this.character.isPowerOperating ? this.character.isPowerOperating(p.id) : true;
      const isDisabled = !!p.isDisabled;
      const opType = p.operationalType || 'passive';
      const isSwitchedOn = p.isSwitchedOn !== undefined ? !!p.isSwitchedOn : true;
      const triggerConfig = p.triggerConfig || { mode: 'default' };

      const card = document.createElement('div');
      card.className = 'card' + (isDisabled ? ' power-card-disabled' : (!isOperating ? ' power-card-standby' : ''));
      card.style.marginBottom = '12px';

      const isStarredPower = !!p.isStarred;
      const isExp = isStarredPower || !!p.isExceptional;
      const baseCost = isExp ? 20 : 10;
      const rankMult = isExp ? 2 : 1;
      const isTaxActive = !!(this.superiorOptionCost || (this.character && this.character.superiorOptionCost));
      const surcharge = (isTaxActive && p.optionSurcharge) ? p.optionSurcharge : 0;
      const cpCost = baseCost + (p.rankValue * rankMult) + surcharge;

      const activeRanks = (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.ranks)
        ? UniversalTableEngine.ranks.filter(r => r.name !== 'Shift 0' && !r.name.startsWith('Class') && r.name !== 'Beyond')
        : (typeof RANKS !== 'undefined' ? RANKS.slice(1, 14) : []);

      const rankSelectOptionsHtml = activeRanks.map(r => {
        const costForRank = baseCost + (r.num * rankMult) + surcharge;
        const isSelected = r.name.toLowerCase() === pRank.name.toLowerCase();
        return `<option value="${r.name}" ${isSelected ? 'selected' : ''}>${r.name} (${r.num}) - ${costForRank} CP</option>`;
      }).join('');

      let badgeHtml = '';
      if (isStarredPower) {
        badgeHtml = '<span class="meta-tag tag-starred" title="Starred Power (20 CP Base + 2x Rank)">★</span>';
      } else if (p.isExceptional) {
        badgeHtml = '<span class="meta-tag tag-exceptional" title="Exceptional Power (20 CP Base + 2x Rank)">★</span>';
      }

      // Operational mode / status badges
      let operationalBadgeHtml = '';
      if (isDisabled) {
        operationalBadgeHtml = '<span class="meta-tag tag-power-neutralized" title="Power is Neutralized / Disabled">🚫 Neutralized</span>';
      } else if (opType === 'active') {
        operationalBadgeHtml = '<span class="meta-tag tag-power-active-type" title="Active Power: Requires an action each time used">⚡ Action</span>';
      } else {
        if (triggerConfig.mode === 'linked' && triggerConfig.masterPowerId) {
          const invLabel = triggerConfig.invert ? ' (Inverted)' : '';
          operationalBadgeHtml += `<span class="meta-tag tag-power-linked" title="Linked to: ${triggerConfig.masterPowerName || 'Master'}${invLabel}">🔗 Linked: ${triggerConfig.masterPowerName || 'Master'}${invLabel}</span> `;
        }
        if (isOperating) {
          operationalBadgeHtml += '<span class="meta-tag tag-operating-on" title="Power is currently Operating">🟢 Active</span>';
        } else {
          operationalBadgeHtml += '<span class="meta-tag tag-operating-off" title="Power is currently Standby / Inactive">⚪ Standby</span>';
        }
      }

      // On/Off switch button for passive powers
      let switchBtnHtml = '';
      if (opType === 'passive') {
        switchBtnHtml = `
          <button type="button" class="power-switch-btn ${isSwitchedOn ? 'on' : 'off'}" data-toggle-power-switch="${idx}" title="${isSwitchedOn ? 'Power is switched ON (Click to switch off)' : 'Power is switched OFF (Click to switch on)'}">
            ${isSwitchedOn ? '🟢 On' : '⚪ Off'}
          </button>
        `;
      }

      // Resolve power options / manifestation badge
      let optionBadgeHtml = '';
      const optDef = (typeof globalThis.getPowerOptionsDefinition === 'function') ? globalThis.getPowerOptionsDefinition(p) : null;
      if (optDef && p.selectedOption) {
        const curChoice = optDef.choices?.find(c => c.key === p.selectedOption);
        const choiceName = curChoice ? curChoice.label : p.selectedOption;
        const subText = p.optionSubChoice ? ` (${p.optionSubChoice})` : '';
        if (p.optionAcquisitionMethod === 'rolled') {
          optionBadgeHtml = `<span class="meta-tag tag-power-option" title="Rolled Manifestation (0 CP Surcharge) - Click to configure">🎲 ${choiceName}${subText}</span>`;
        } else if (p.optionSurcharge > 0 && isTaxActive) {
          optionBadgeHtml = `<span class="meta-tag tag-power-option tag-option-superior" title="Superior Option (+${p.optionSurcharge} CP Surcharge) - Click to configure">⚡ ${choiceName}${subText}</span>`;
        } else if (curChoice?.isSuperior || p.isSuperiorOption) {
          optionBadgeHtml = `<span class="meta-tag tag-power-option" title="Superior Option (House Rule Surcharge Disabled: 0 CP) - Click to configure">⚡ ${choiceName}${subText}</span>`;
        } else {
          optionBadgeHtml = `<span class="meta-tag tag-power-option" title="Configured Option - Click to configure">⚙️ ${choiceName}${subText}</span>`;
        }
      }

      // Resolve structured power details
      const details = (typeof getPowerDetails === 'function') ? getPowerDetails(p, p.rankName) : {};
      
      const detailItems = [];
      if (details.range) {
        detailItems.push(`<div class="power-detail-item"><span class="power-detail-label">🎯 Range:</span> <span class="power-detail-val">${details.range}</span></div>`);
      }
      if (details.duration) {
        detailItems.push(`<div class="power-detail-item"><span class="power-detail-label">⏱️ Duration:</span> <span class="power-detail-val">${details.duration}</span></div>`);
      }
      if (details.areaOfEffect) {
        detailItems.push(`<div class="power-detail-item"><span class="power-detail-label">📐 Area:</span> <span class="power-detail-val">${details.areaOfEffect}</span></div>`);
      }
      if (details.targets) {
        detailItems.push(`<div class="power-detail-item"><span class="power-detail-label">👥 Targets:</span> <span class="power-detail-val">${details.targets}</span></div>`);
      }
      if (details.speed) {
        detailItems.push(`<div class="power-detail-item"><span class="power-detail-label">⚡ Speed:</span> <span class="power-detail-val">${details.speed}</span></div>`);
      }

      // Check for custom player notes (filtering out legacy auto-generated 150-char description substrings and default placeholders)
      const catalogPower = (globalThis.MSH_POWERS || []).find(cp => cp.name === p.name || cp.code === p.code || cp.id === p.code);
      let customNotesHtml = '';
      if (p.notes && p.notes.trim()) {
        const isLegacySnippet = p.notes === 'Standard power function.' || 
          (catalogPower && catalogPower.description && p.notes.startsWith(catalogPower.description.substring(0, 40)) && p.notes.endsWith('...'));
        if (!isLegacySnippet) {
          customNotesHtml = `<div class="power-custom-notes">📝 ${p.notes}</div>`;
        }
      }

      let adjustedBadgeHtml = '';
      if (p.adjustments && p.adjustments.shift) {
        const incAspect = p.adjustments.aspectA?.label || 'Aspect';
        const decAspect = p.adjustments.aspectB?.label || 'Aspect';
        adjustedBadgeHtml = `<span class="meta-tag tag-power-adjusted" title="Power Adjusted: +${p.adjustments.shift} CS ${incAspect}, -${p.adjustments.shift} CS ${decAspect}">⚡ Adjusted</span>`;
      }

      const powerTitleHtml = `
        <div class="power-title-container dropdown-container">
          <button type="button" class="power-title-btn dropdown-toggle" data-power-menu-toggle="${idx}" title="Click for Power Menu (Change Rank, Triggers, Adjust, Disable, Remove)">
            ${p.name} <span class="power-menu-caret">▾</span>
          </button>
          <div class="dropdown-menu power-dropdown-menu" id="power-menu-${idx}">
            ${optDef ? `
            <button type="button" class="dropdown-item power-menu-item" data-action="configure-power-option" data-power-idx="${idx}">
              ⚙️ Configure Option / Manifestation
            </button>
            ` : ''}
            <button type="button" class="dropdown-item power-menu-item" data-action="change-power-rank" data-power-idx="${idx}">
              🎯 Change Rank (${p.rankName})
            </button>
            <button type="button" class="dropdown-item power-menu-item" data-action="configure-power-trigger" data-power-idx="${idx}">
              🔗 Triggers &amp; Operational Mode
            </button>
            <button type="button" class="dropdown-item power-menu-item" data-action="adjust-power" data-power-idx="${idx}">
              ⚡ Adjust Power
            </button>
            <button type="button" class="dropdown-item power-menu-item ${isDisabled ? 'enable-item' : 'disable-item'}" data-action="toggle-disable-power" data-power-idx="${idx}">
              ${isDisabled ? '✅ Re-enable Power' : '🚫 Disable Power (Neutralized)'}
            </button>
            <button type="button" class="dropdown-item power-menu-item danger-item" data-action="remove-power" data-power-idx="${idx}">
              🗑️ Remove power
            </button>
          </div>
        </div>
      `;

      card.innerHTML = `
        <div class="card-header">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            ${powerTitleHtml}
            <button type="button" class="help-circle-btn power-help-btn" title="View details and rules for ${(p.name || '').replace(/"/g, '&quot;')}" data-power-name="${(p.name || '').replace(/"/g, '&quot;')}">?</button>
            ${badgeHtml}
            ${operationalBadgeHtml}
            ${adjustedBadgeHtml}
            ${optionBadgeHtml}
          </div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            ${switchBtnHtml}
            <span class="meta-tag tag-power-cp" style="font-weight: 700;">${cpCost} CP</span>
            <select class="power-rank-select" data-power-rank-select="${idx}" title="Change Rank for ${p.name} (CP cost is calculated automatically)" style="background-color: ${pRank.color};">
              ${rankSelectOptionsHtml}
            </select>
            <button type="button" class="power-roll-btn" data-roll-power="${idx}" title="Roll ${p.name} FEAT">🎲 Roll</button>
            <button class="icon-btn" style="padding: 2px 8px; min-height: 28px; background: #881337;" data-del-power="${idx}" title="Delete Power">✕</button>
          </div>
        </div>
        <div class="power-details-grid">
          ${detailItems.join('')}
          <span class="power-slots-hint" style="font-size: 10pt; margin-left: auto;">(Slots: ${p.powerSlots || (isStarredPower ? 2 : 1)})</span>
        </div>
        ${customNotesHtml}
      `;

      // Render Interactive Pool / Charge Tracker Widget (for powers with dynamic energy pools or rage counters)
      if (p.pool) {
        const poolDiv = document.createElement('div');
        poolDiv.className = 'power-pool-widget';
        poolDiv.style.cssText = 'margin: 10px 0 6px 0; padding: 10px 12px; background: rgba(0, 0, 0, 0.25); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 6px;';
        const curCharge = p.pool.current || 0;
        const maxCharge = p.pool.max || 100;
        const pct = Math.max(0, Math.min(100, Math.round((curCharge / (maxCharge || 1)) * 100)));
        const unitName = p.pool.unit || 'Charge Units';
        const derivedSummary = this.character.getPowerDerivedEffects(p);

        poolDiv.innerHTML = `
          <div class="power-pool-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="color: var(--marvel-gold); font-size: 10pt;">⚡ ${unitName}:</strong>
              <span class="power-pool-count" style="font-weight: 700; font-size: 10.5pt; color: #38bdf8;">${curCharge} / ${maxCharge}</span>
            </div>
            <div class="power-pool-effects-badge" style="font-size: 9pt; font-weight: 600; padding: 2px 8px; border-radius: 4px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
              ${derivedSummary}
            </div>
          </div>
          <div class="power-pool-progress-bar" style="height: 6px; border-radius: 3px; background: rgba(255, 255, 255, 0.1); overflow: hidden; margin-bottom: 8px;">
            <div class="power-pool-progress-fill" style="height: 100%; width: ${pct}%; background: linear-gradient(90deg, #3b82f6, #06b6d4); transition: width 0.2s ease;"></div>
          </div>
          <div class="power-pool-controls" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
            <div style="display: flex; gap: 4px; align-items: center;">
              <button type="button" class="pool-step-btn icon-btn" style="min-height: 28px; padding: 2px 8px; font-size: 9pt;" data-step="-50">-50</button>
              <button type="button" class="pool-step-btn icon-btn" style="min-height: 28px; padding: 2px 8px; font-size: 9pt;" data-step="-10">-10</button>
              <button type="button" class="pool-step-btn icon-btn" style="min-height: 28px; padding: 2px 6px; font-size: 9pt;" data-step="-1">-1</button>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <input type="number" class="field-input pool-direct-input" value="${curCharge}" min="0" max="${maxCharge}" style="width: 80px; text-align: center; font-weight: 700; min-height: 28px; padding: 2px 6px; font-size: 10pt;">
              <button type="button" class="icon-btn pool-set-btn primary" style="min-height: 28px; padding: 2px 10px; font-size: 9pt;">Set</button>
            </div>
            <div style="display: flex; gap: 4px; align-items: center;">
              <button type="button" class="pool-step-btn icon-btn" style="min-height: 28px; padding: 2px 6px; font-size: 9pt;" data-step="1">+1</button>
              <button type="button" class="pool-step-btn icon-btn" style="min-height: 28px; padding: 2px 8px; font-size: 9pt;" data-step="10">+10</button>
              <button type="button" class="pool-step-btn icon-btn" style="min-height: 28px; padding: 2px 8px; font-size: 9pt;" data-step="50">+50</button>
            </div>
          </div>
          ${p.pool.decayRate ? `<div style="font-size: 8.5pt; color: var(--text-muted); margin-top: 4px;">⏱️ Bleed-off: ${p.pool.decayRate}</div>` : ''}
        `;

        poolDiv.querySelectorAll('.pool-step-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const step = parseInt(btn.dataset.step) || 0;
            const res = this.character.setPowerPoolCharge(p.id, curCharge + step);
            if (res) {
              this.recordCharacterEdit(`Adjusted ${p.name} pool to ${res.newVal}/${res.maxVal} (${res.effectsSummary})`, 'power');
              this.render();
            }
          });
        });

        const directInput = poolDiv.querySelector('.pool-direct-input');
        const setBtn = poolDiv.querySelector('.pool-set-btn');
        const applyDirect = (e) => {
          if (e) e.stopPropagation();
          const val = parseInt(directInput.value) || 0;
          const res = this.character.setPowerPoolCharge(p.id, val);
          if (res) {
            this.recordCharacterEdit(`Set ${p.name} pool to ${res.newVal}/${res.maxVal} (${res.effectsSummary})`, 'power');
            this.render();
          }
        };
        if (setBtn) setBtn.addEventListener('click', applyDirect);
        if (directInput) directInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') applyDirect(e);
        });

        card.appendChild(poolDiv);
      }

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
            if (succInfo.neededGreen > 0) parts.push(`<span class="badge-green">${succInfo.neededGreen} Green</span>`);
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

      const powerHelpBtn = card.querySelector('.power-help-btn') || card.querySelector('[data-power-name]');
      if (powerHelpBtn) {
        powerHelpBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showHelpModal('power', p.code || p.id || p.name);
        });
      }

      // Power Menu Toggle
      const menuToggleBtn = card.querySelector(`[data-power-menu-toggle="${idx}"]`);
      const menuEl = card.querySelector(`#power-menu-${idx}`);
      if (menuToggleBtn && menuEl) {
        menuToggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.power-dropdown-menu.show').forEach(m => {
            if (m !== menuEl) m.classList.remove('show');
          });
          menuEl.classList.toggle('show');
        });
      }

      // Operational Switch Button Toggle (On/Off)
      const switchBtn = card.querySelector(`[data-toggle-power-switch="${idx}"]`);
      if (switchBtn) {
        switchBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const res = this.character.togglePowerSwitch(p.id);
          this.recordCharacterEdit(`Toggled ${p.name} switch: ${res.isSwitchedOn ? 'ON' : 'OFF'}`, 'power');
          this.saveState();
          this.render();
        });
      }

      // Configure Trigger action from Menu
      const configTriggerBtn = card.querySelector(`[data-action="configure-power-trigger"][data-power-idx="${idx}"]`);
      if (configTriggerBtn) {
        configTriggerBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (menuEl) menuEl.classList.remove('show');
          this.openPowerTriggerModal(idx);
        });
      }

      // Power Rank Selector Change Event
      const rankSelect = card.querySelector(`[data-power-rank-select="${idx}"]`);
      if (rankSelect) {
        rankSelect.addEventListener('change', (e) => {
          e.stopPropagation();
          const newRankName = e.target.value;
          const res = this.character.setPowerRank(p.id, newRankName);
          if (res) {
            const isExpPwr = !!(p.isExceptional || p.isStarred);
            const isTaxActive = !!(this.superiorOptionCost || (this.character && this.character.superiorOptionCost));
            const newCost = (isExpPwr ? 20 : 10) + (res.newRankValue * (isExpPwr ? 2 : 1)) + ((isTaxActive && p.optionSurcharge) ? p.optionSurcharge : 0);
            this.recordCharacterEdit(`Changed ${p.name} rank: ${res.oldRankName} (${res.oldRankValue}) ➔ ${res.newRankName} (${res.newRankValue}) [${newCost} CP]`, 'power');
            this.saveState();
            this.render();
            this.showStatusToast(`⚡ "${p.name}" changed to ${res.newRankName} (${res.newRankValue}) [${newCost} CP]`);
          }
        });
      }

      // Change Rank action from Power Menu
      const changeRankBtn = card.querySelector(`[data-action="change-power-rank"][data-power-idx="${idx}"]`);
      if (changeRankBtn) {
        changeRankBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (menuEl) menuEl.classList.remove('show');
          if (rankSelect) {
            rankSelect.focus();
            if (typeof rankSelect.showPicker === 'function') {
              try { rankSelect.showPicker(); } catch (_) {}
            }
          }
        });
      }

      // Toggle Disable / Neutralize action from Menu
      const toggleDisableBtn = card.querySelector(`[data-action="toggle-disable-power"][data-power-idx="${idx}"]`);
      if (toggleDisableBtn) {
        toggleDisableBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (menuEl) menuEl.classList.remove('show');
          const willDisable = !p.isDisabled;
          this.character.setPowerDisabled(p.id, willDisable);
          this.recordCharacterEdit(`${willDisable ? 'Disabled / Neutralized' : 'Re-enabled'} power: ${p.name}`, 'power');
          this.saveState();
          this.render();
        });
      }

      // Configure Option action from Menu
      const configOptBtn = card.querySelector(`[data-action="configure-power-option"][data-power-idx="${idx}"]`);
      if (configOptBtn) {
        configOptBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (menuEl) menuEl.classList.remove('show');
          this.openPowerOptionsModal(idx);
        });
      }

      // Option Badge Click to Configure
      const optBadgeEl = card.querySelector('.tag-power-option');
      if (optBadgeEl) {
        optBadgeEl.style.cursor = 'pointer';
        optBadgeEl.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openPowerOptionsModal(idx);
        });
      }

      // Adjust Power action from Menu
      const adjustPowerBtn = card.querySelector(`[data-action="adjust-power"][data-power-idx="${idx}"]`);
      if (adjustPowerBtn) {
        adjustPowerBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (menuEl) menuEl.classList.remove('show');
          if (!this.powerAdjustment) {
            this.powerAdjustment = true;
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('msh_rule_power_adjustment', 'true');
            }
          }
          this.openPowerAdjustmentModal(idx);
        });
      }

      // Remove Power action from Menu
      const removePowerBtn = card.querySelector(`[data-action="remove-power"][data-power-idx="${idx}"]`);
      if (removePowerBtn) {
        removePowerBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (menuEl) menuEl.classList.remove('show');
          this.handleRemovePower(idx, e);
        });
      }

      const rollPowerBtn = card.querySelector(`[data-roll-power="${idx}"]`);
      if (rollPowerBtn) {
        rollPowerBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.rollPowerFEAT(p, e);
        });
      }

      // Delete button (✕) on card header also uses handleRemovePower
      const delPowerBtn = card.querySelector('[data-del-power]');
      if (delPowerBtn) {
        delPowerBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.handleRemovePower(idx, e);
        });
      }

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
    const greenInp = document.getElementById('stunt-green-successes');
    if (greenInp) greenInp.value = '0';

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
    const greenSuccesses = parseInt(document.getElementById('stunt-green-successes')?.value || 0);

    this.character.addPowerStunt(power.id, {
      name,
      description: desc,
      emulatedPowerId,
      emulatedPowerName,
      isLearned,
      redSuccesses,
      yellowSuccesses,
      greenSuccesses,
      attemptsCount: isLearned ? 10 : (redSuccesses + yellowSuccesses + greenSuccesses)
    });

    this.saveState();
    this.renderPowers();
    this.renderAttacks();

    const modal = document.getElementById('stunt-modal');
    if (modal) modal.classList.remove('open');
  },

  openPowerAdjustmentModal(powerIndex) {
    const power = this.character.powers[powerIndex];
    if (!power) return;
    this.activeAdjustmentPowerIndex = powerIndex;

    const modal = document.getElementById('modal-power-adjustment');
    if (!modal) return;

    const pRank = UniversalTableEngine.getRankByName(power.rankName);
    const powerNameEl = document.getElementById('adj-power-name');
    const rankBadgeEl = document.getElementById('adj-power-rank-badge');
    const statusEl = document.getElementById('adj-adjustment-status');
    const metaInfoEl = document.getElementById('adj-power-meta-info');

    if (powerNameEl) powerNameEl.textContent = power.name;
    if (rankBadgeEl) rankBadgeEl.textContent = `${pRank.name} (${power.rankValue})`;

    const isCurrentlyAdjusted = !!(power.adjustments && power.adjustments.shift);
    if (statusEl) {
      if (isCurrentlyAdjusted) {
        statusEl.innerHTML = `<span style="color: #22c55e;">⚡ Active Adjustment (+${power.adjustments.shift} / -${power.adjustments.shift} CS)</span>`;
      } else {
        statusEl.innerHTML = `<span style="color: var(--text-muted);">Unadjusted (Base Stats)</span>`;
      }
    }

    if (metaInfoEl) {
      metaInfoEl.textContent = `Category: ${power.category || 'Superhuman Power'} | Base Power Rank: ${pRank.name} (${power.rankValue})`;
    }

    // Aspects
    const aspects = (typeof getPowerRankAspects === 'function') ? getPowerRankAspects(power, power.rankName) : [];
    const noticeEl = document.getElementById('adj-single-aspect-notice');
    const controlsEl = document.getElementById('adj-controls-container');
    const btnApply = document.getElementById('btn-apply-adj');
    const btnReset = document.getElementById('btn-reset-adj');

    if (aspects.length < 2) {
      if (noticeEl) noticeEl.style.display = 'block';
      if (controlsEl) controlsEl.style.display = 'none';
      if (btnApply) btnApply.style.display = 'none';
      if (btnReset) btnReset.style.display = isCurrentlyAdjusted ? 'inline-block' : 'none';
      modal.classList.add('open');
      return;
    }

    if (noticeEl) noticeEl.style.display = 'none';
    if (controlsEl) controlsEl.style.display = 'flex';
    if (btnApply) btnApply.style.display = 'inline-block';
    if (btnReset) btnReset.style.display = isCurrentlyAdjusted ? 'inline-block' : 'none';

    // Populate aspect selects
    const incSel = document.getElementById('adj-aspect-increase');
    const decSel = document.getElementById('adj-aspect-decrease');
    if (incSel && decSel) {
      incSel.innerHTML = '';
      decSel.innerHTML = '';

      aspects.forEach(asp => {
        const opt1 = document.createElement('option');
        opt1.value = asp.key;
        opt1.textContent = asp.label;
        incSel.appendChild(opt1);

        const opt2 = document.createElement('option');
        opt2.value = asp.key;
        opt2.textContent = asp.label;
        decSel.appendChild(opt2);
      });

      if (isCurrentlyAdjusted) {
        incSel.value = power.adjustments.aspectA?.key || aspects[0].key;
        decSel.value = power.adjustments.aspectB?.key || (aspects[1] ? aspects[1].key : aspects[0].key);
      } else {
        incSel.value = aspects[0].key;
        decSel.value = (aspects[1] ? aspects[1].key : aspects[0].key);
      }
    }

    // Character Creation checkbox
    const charCreationCheck = document.getElementById('adj-char-creation');
    if (charCreationCheck) {
      if (isCurrentlyAdjusted && power.adjustments.isCharCreation !== undefined) {
        charCreationCheck.checked = !!power.adjustments.isCharCreation;
      } else {
        const hasKarma = this.character.hasAccumulatedKarma ? this.character.hasAccumulatedKarma() : false;
        charCreationCheck.checked = !hasKarma;
      }
    }

    // Check if re-adjustment
    const hasPriorAdjustments = isCurrentlyAdjusted || (power.adjustmentHistory && power.adjustmentHistory.length > 0) || (power.adjustments?.history?.length > 0);
    const reqBadge = document.getElementById('adj-rationale-required-badge');
    if (reqBadge) {
      reqBadge.style.display = hasPriorAdjustments ? 'inline' : 'none';
    }

    const rationaleInput = document.getElementById('adj-rationale');
    if (rationaleInput) {
      rationaleInput.value = isCurrentlyAdjusted ? (power.adjustments.rationale || '') : '';
    }

    this.populateAdjustmentShifts();
    this.updateAdjustmentPreview();

    modal.classList.add('open');
  },

  handleAdjustmentAspectChanged(changedType) {
    const incSel = document.getElementById('adj-aspect-increase');
    const decSel = document.getElementById('adj-aspect-decrease');
    if (!incSel || !decSel) return;

    if (incSel.value === decSel.value) {
      const options = Array.from(incSel.options).map(o => o.value);
      const other = options.find(v => v !== (changedType === 'increase' ? incSel.value : decSel.value));
      if (other) {
        if (changedType === 'increase') {
          decSel.value = other;
        } else {
          incSel.value = other;
        }
      }
    }

    this.populateAdjustmentShifts();
    this.updateAdjustmentPreview();
  },

  populateAdjustmentShifts() {
    const power = this.character.powers[this.activeAdjustmentPowerIndex];
    if (!power) return;

    const incSel = document.getElementById('adj-aspect-increase');
    const decSel = document.getElementById('adj-aspect-decrease');
    const shiftSel = document.getElementById('adj-column-shift');
    if (!incSel || !decSel || !shiftSel) return;

    const aspects = (typeof getPowerRankAspects === 'function') ? getPowerRankAspects(power, power.rankName) : [];
    const aspA = aspects.find(a => a.key === incSel.value);
    const aspB = aspects.find(a => a.key === decSel.value);

    if (!aspA || !aspB) return;

    const maxShift = (typeof getMaxAdjustmentShift === 'function')
      ? getMaxAdjustmentShift(aspA.baseRank, aspB.baseRank)
      : 2;

    const prevVal = parseInt(shiftSel.value) || (power.adjustments?.shift || 1);
    shiftSel.innerHTML = '';

    if (maxShift <= 0) {
      const opt = document.createElement('option');
      opt.value = '0';
      opt.textContent = '0 CS (Already at Feeble / Amazing boundary)';
      shiftSel.appendChild(opt);
    } else {
      for (let s = 1; s <= maxShift; s++) {
        const opt = document.createElement('option');
        opt.value = s.toString();
        opt.textContent = `${s} CS (+${s} / -${s} CS)`;
        shiftSel.appendChild(opt);
      }
    }

    if (prevVal <= maxShift && prevVal >= 1) {
      shiftSel.value = prevVal.toString();
    } else if (maxShift >= 1) {
      shiftSel.value = '1';
    }
  },

  updateAdjustmentPreview() {
    const power = this.character.powers[this.activeAdjustmentPowerIndex];
    if (!power) return;

    const incSel = document.getElementById('adj-aspect-increase');
    const decSel = document.getElementById('adj-aspect-decrease');
    const shiftSel = document.getElementById('adj-column-shift');
    const charCreationCheck = document.getElementById('adj-char-creation');
    const previewBody = document.getElementById('adj-preview-body');
    const costText = document.getElementById('adj-cost-text');
    const karmaText = document.getElementById('adj-available-karma');
    const btnApply = document.getElementById('btn-apply-adj');

    if (!incSel || !decSel || !shiftSel || !previewBody) return;

    const aspects = (typeof getPowerRankAspects === 'function') ? getPowerRankAspects(power, power.rankName) : [];
    const aspA = aspects.find(a => a.key === incSel.value);
    const aspB = aspects.find(a => a.key === decSel.value);

    const shift = parseInt(shiftSel.value) || 0;
    const isCharCreation = !!(charCreationCheck && charCreationCheck.checked);
    const cost = (typeof calculatePowerAdjustmentCost === 'function')
      ? calculatePowerAdjustmentCost(shift, isCharCreation)
      : (isCharCreation || shift <= 1 ? 0 : (shift - 1) * 100);

    const availableKarma = this.character.currentKarma || 0;

    if (costText) {
      if (cost === 0) {
        costText.innerHTML = '<span style="color: #22c55e;">0 KP (Free)</span>';
      } else {
        costText.innerHTML = `<span style="color: var(--marvel-gold);">${cost} KP</span>`;
      }
    }

    if (karmaText) {
      karmaText.textContent = `${availableKarma} KP`;
      if (cost > availableKarma && !isCharCreation) {
        karmaText.innerHTML = `<span style="color: #ef4444; font-weight: 700;">${availableKarma} KP (Need ${cost} KP)</span>`;
      }
    }

    if (btnApply) {
      if (shift <= 0 || (cost > availableKarma && !isCharCreation)) {
        btnApply.disabled = true;
        btnApply.style.opacity = '0.5';
        btnApply.style.cursor = 'not-allowed';
      } else {
        btnApply.disabled = false;
        btnApply.style.opacity = '1';
        btnApply.style.cursor = 'pointer';
      }
    }

    if (!aspA || !aspB || shift <= 0) {
      previewBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 10px;">Cannot adjust (at rank limits)</td></tr>`;
      return;
    }

    const rankA = UniversalTableEngine.applyColumnShift(aspA.baseRank, +shift);
    const rankB = UniversalTableEngine.applyColumnShift(aspB.baseRank, -shift);

    const valA_base = aspA.getValue(aspA.baseRank);
    const valA_adj = aspA.getValue(rankA.name);

    const valB_base = aspB.getValue(aspB.baseRank);
    const valB_adj = aspB.getValue(rankB.name);

    previewBody.innerHTML = `
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 6px 10px; font-weight: 700; color: #22c55e;">${aspA.label}</td>
        <td style="padding: 6px 10px;">${aspA.baseRank} (${valA_base})</td>
        <td style="padding: 6px 10px; color: #22c55e; font-weight: 700;">+${shift} CS</td>
        <td style="padding: 6px 10px; font-weight: 700; color: #22c55e;">${rankA.name} (${valA_adj})</td>
      </tr>
      <tr>
        <td style="padding: 6px 10px; font-weight: 700; color: #ef4444;">${aspB.label}</td>
        <td style="padding: 6px 10px;">${aspB.baseRank} (${valB_base})</td>
        <td style="padding: 6px 10px; color: #ef4444; font-weight: 700;">-${shift} CS</td>
        <td style="padding: 6px 10px; font-weight: 700; color: #ef4444;">${rankB.name} (${valB_adj})</td>
      </tr>
    `;
  },

  async handleApplyPowerAdjustment(mouseEvent = null) {
    const power = this.character.powers[this.activeAdjustmentPowerIndex];
    if (!power) return;

    const incSel = document.getElementById('adj-aspect-increase');
    const decSel = document.getElementById('adj-aspect-decrease');
    const shiftSel = document.getElementById('adj-column-shift');
    const charCreationCheck = document.getElementById('adj-char-creation');
    const rationaleInput = document.getElementById('adj-rationale');

    if (!incSel || !decSel || !shiftSel) return;

    const keyA = incSel.value;
    const keyB = decSel.value;
    if (keyA === keyB) {
      await this.showCustomAlert('Please select two different aspects to adjust (one to increase and one to decrease).', 'Invalid Aspects', mouseEvent);
      return;
    }

    const shift = parseInt(shiftSel.value) || 0;
    if (shift <= 0) {
      await this.showCustomAlert('Column shift must be at least 1 CS.', 'Invalid Shift', mouseEvent);
      return;
    }

    const isCurrentlyAdjusted = !!(power.adjustments && power.adjustments.shift);
    const hasPriorAdjustments = isCurrentlyAdjusted || (power.adjustmentHistory && power.adjustmentHistory.length > 0) || (power.adjustments?.history?.length > 0);
    const rationale = (rationaleInput ? rationaleInput.value : '').trim();

    if (hasPriorAdjustments && !rationale) {
      await this.showCustomAlert(
        'Adjusting the same power more than once strictly requires an in-game explanation (e.g. intensive training, mutation evolution, tech modification) approved by your GM.\n\nPlease enter an explanation in the Rationale field before applying.',
        '⚠️ In-Game Explanation Required',
        mouseEvent
      );
      return;
    }

    const isCharCreation = !!(charCreationCheck && charCreationCheck.checked);
    const cost = (typeof calculatePowerAdjustmentCost === 'function')
      ? calculatePowerAdjustmentCost(shift, isCharCreation)
      : (isCharCreation || shift <= 1 ? 0 : (shift - 1) * 100);

    const availableKarma = this.character.currentKarma || 0;
    if (cost > availableKarma && !isCharCreation) {
      await this.showCustomAlert(
        `This adjustment costs ${cost} Karma Points, but you only have ${availableKarma} KP available. Cannot complete adjustment!`,
        '⚠️ Inadequate Karma Points',
        mouseEvent
      );
      return;
    }

    if (cost > 0) {
      const confirmed = await this.showCustomConfirm(
        `Applying a +${shift} / -${shift} CS adjustment costs ${cost} Karma Points.\n\nHero currently has ${availableKarma} KP.\nDo you want to spend ${cost} KP to apply this permanent power adjustment?`,
        '⚡ Confirm Karma Spend',
        mouseEvent,
        `Spend ${cost} KP`,
        'Cancel'
      );
      if (!confirmed) return;

      this.character.updateKarma(-cost, `Power Adjustment: ${power.name} (+${shift}CS ${keyA} / -${shift}CS ${keyB})`);
    }

    const aspects = (typeof getPowerRankAspects === 'function') ? getPowerRankAspects(power, power.rankName) : [];
    const aspA = aspects.find(a => a.key === keyA);
    const aspB = aspects.find(a => a.key === keyB);
    const rankA = UniversalTableEngine.applyColumnShift(aspA.baseRank, +shift);
    const rankB = UniversalTableEngine.applyColumnShift(aspB.baseRank, -shift);

    const existingHistory = (power.adjustments && power.adjustments.history)
      ? [...power.adjustments.history]
      : ((power.adjustmentHistory) ? [...power.adjustmentHistory] : []);

    if (power.adjustments && power.adjustments.shift) {
      existingHistory.push({
        shift: power.adjustments.shift,
        aspectA: power.adjustments.aspectA,
        aspectB: power.adjustments.aspectB,
        karmaCost: power.adjustments.karmaCost,
        rationale: power.adjustments.rationale,
        timestamp: power.adjustments.timestamp
      });
    }

    power.adjustments = {
      shift: shift,
      aspectA: {
        key: aspA.key,
        label: aspA.label,
        shift: +shift,
        baseRank: aspA.baseRank,
        adjustedRank: rankA.name,
        adjustedRankValue: rankA.num,
        adjustedFormatted: aspA.getValue(rankA.name)
      },
      aspectB: {
        key: aspB.key,
        label: aspB.label,
        shift: -shift,
        baseRank: aspB.baseRank,
        adjustedRank: rankB.name,
        adjustedRankValue: rankB.num,
        adjustedFormatted: aspB.getValue(rankB.name)
      },
      karmaCost: cost,
      isCharCreation: isCharCreation,
      rationale: rationale,
      timestamp: new Date().toISOString(),
      history: existingHistory
    };

    delete power.adjustmentHistory;

    this.recordCharacterEdit(`Adjusted power: ${power.name} (+${shift}CS ${aspA.label} / -${shift}CS ${aspB.label})`, 'power');
    this.renderPowers();
    this.renderAttacks();
    this.renderVitals();

    const modal = document.getElementById('modal-power-adjustment');
    if (modal) modal.classList.remove('open');

    await this.showCustomAlert(
      `"${power.name}" adjusted successfully!\n\n• ${aspA.label}: +${shift} CS ➔ ${rankA.name} (${aspA.getValue(rankA.name)})\n• ${aspB.label}: -${shift} CS ➔ ${rankB.name} (${aspB.getValue(rankB.name)})${cost > 0 ? `\n• Karma Spent: ${cost} KP` : ' (Free)'}`,
      '⚡ Power Adjusted',
      mouseEvent
    );
  },

  async handleResetPowerAdjustment(mouseEvent = null) {
    const power = this.character.powers[this.activeAdjustmentPowerIndex];
    if (!power || !power.adjustments) return;

    const confirmed = await this.showCustomConfirm(
      `Reset "${power.name}" back to its base rank statistics?\n\nNote: Any Karma spent on prior adjustments is not refunded.`,
      '↩️ Reset Power Adjustment',
      mouseEvent,
      'Reset to Base',
      'Cancel'
    );
    if (!confirmed) return;

    const existingHistory = (power.adjustments && power.adjustments.history)
      ? [...power.adjustments.history]
      : [];

    if (power.adjustments.shift) {
      existingHistory.push({
        shift: power.adjustments.shift,
        aspectA: power.adjustments.aspectA,
        aspectB: power.adjustments.aspectB,
        karmaCost: power.adjustments.karmaCost,
        rationale: power.adjustments.rationale,
        timestamp: power.adjustments.timestamp,
        action: 'reset'
      });
    }

    power.adjustments = null;
    if (existingHistory.length > 0) {
      power.adjustmentHistory = existingHistory;
    }

    this.recordCharacterEdit(`Reset adjustments for power: ${power.name}`, 'power');
    this.renderPowers();
    this.renderAttacks();
    this.renderVitals();

    const modal = document.getElementById('modal-power-adjustment');
    if (modal) modal.classList.remove('open');

    await this.showCustomAlert(
      `"${power.name}" has been restored to its base rank statistics.`,
      '↩️ Power Reset',
      mouseEvent
    );
  },

  getAllAvailablePowers() {
    return globalThis.MSH_POWERS || [];
  },

  handleAddPower(mouseEvent = null) {
    if (this.character && this.character.isCreationSetupPending) {
      this.showStatusToast('⚠️ Please choose your Starting Tier and Physical Form before spending CP.');
      this.openCreationWizardModal();
      return;
    }
    const powerId = document.getElementById('select-power-catalog').value;
    if (!powerId) {
      this.showCustomAlert('Please select a superpower from the dropdown before adding.', 'Select Power', mouseEvent);
      return;
    }
    const rankName = document.getElementById('select-new-power-rank').value;
    const manualExceptional = document.getElementById('check-power-exceptional') ? document.getElementById('check-power-exceptional').checked : false;

    const allAvailable = this.getAllAvailablePowers();
    const catalogPower = allAvailable.find(p => p.id === powerId || p.code === powerId);
    if (!catalogPower) {
      this.showCustomAlert('Please select a superpower from the dropdown before adding.', 'Select Power', mouseEvent);
      return;
    }

    const isStarred = !!(catalogPower.isStarred || catalogPower.countsAsTwo || catalogPower.powerSlots > 1);
    const isExceptional = isStarred || manualExceptional;

    const rObj = UniversalTableEngine.getRankByName(rankName);

    // Power Options Handling
    const optDef = (typeof globalThis.getPowerOptionsDefinition === 'function') ? globalThis.getPowerOptionsDefinition(catalogPower) : null;
    let selectedOption = null;
    let optionSubChoice = null;
    let optionAcquisitionMethod = 'chosen';
    let optionSurcharge = 0;
    let isSuperiorOption = false;

    if (optDef) {
      selectedOption = this.newPowerOptionSelectedKey || (optDef.choices[0] ? optDef.choices[0].key : null);
      const choiceObj = optDef.choices?.find(c => c.key === selectedOption);
      isSuperiorOption = !!choiceObj?.isSuperior;
      optionAcquisitionMethod = this.newPowerOptionMethod || 'chosen';

      if (choiceObj?.subChoiceList) {
        const subSel = document.querySelector(`#new-power-subchoice-box-${selectedOption} .new-power-subchoice-select`);
        if (subSel) {
          optionSubChoice = subSel.value;
        } else if (choiceObj.subChoiceList[0]) {
          optionSubChoice = choiceObj.subChoiceList[0];
        }
      }

      if (optionAcquisitionMethod === 'chosen' && isSuperiorOption) {
        optionSurcharge = isExceptional ? 20 : 10;
      } else {
        optionSurcharge = 0;
      }
    }

    this.character.addPower({
      id: 'p_' + Date.now(),
      code: catalogPower.code,
      name: catalogPower.name,
      category: catalogPower.category,
      rankName: rObj.name,
      rankValue: rObj.num,
      powerSlots: isStarred ? 2 : 1,
      isExceptional: isExceptional,
      isStarred: isStarred,
      isNpcArchetype: !!catalogPower.isNpcArchetype,
      isCustom: !!catalogPower.isCustom,
      templateKey: catalogPower.templateKey || catalogPower.code,
      pool: catalogPower.pool ? JSON.parse(JSON.stringify(catalogPower.pool)) : null,
      trigger: catalogPower.trigger ? JSON.parse(JSON.stringify(catalogPower.trigger)) : null,
      traitModifiers: catalogPower.traitModifiers ? JSON.parse(JSON.stringify(catalogPower.traitModifiers)) : [],
      range: catalogPower.range,
      duration: catalogPower.duration,
      areaOfEffect: catalogPower.areaOfEffect,
      targets: catalogPower.targets,
      speed: catalogPower.speed,
      selectedOption: selectedOption,
      optionSubChoice: optionSubChoice,
      optionAcquisitionMethod: optionAcquisitionMethod,
      optionSurcharge: optionSurcharge,
      isSuperiorOption: isSuperiorOption,
      notes: catalogPower.rulesText ? (catalogPower.errataNote ? `${catalogPower.rulesText} (${catalogPower.errataNote})` : catalogPower.rulesText) : '',
      stunts: catalogPower.powerStunts || []
    });

    if (this.character.calculateDefenses) {
      this.character.calculateDefenses();
    }

    this.newPowerOptionSelectedKey = null;
    this.newPowerOptionSubChoice = null;
    this.newPowerOptionMethod = 'chosen';
    this.newPowerRolledD100 = null;

    this.recordCharacterEdit(`Added power: ${catalogPower.name} (${rObj.name})`, 'power');
    this.render();

    const pCatSel = document.getElementById('select-power-catalog');
    if (pCatSel) {
      pCatSel.value = '';
      this.syncPowerSelectionUI();
    }
  },

  async handleRemovePower(idx, mouseEvent = null) {
    const p = this.character.powers[idx];
    if (!p) return;
    const isStarredPower = !!p.isStarred;
    const isExp = isStarredPower || !!p.isExceptional;
    const isTaxActive = !!(this.superiorOptionCost || (this.character && this.character.superiorOptionCost));
    const cpRefund = (isExp ? 20 : 10) + (p.rankValue * (isExp ? 2 : 1)) + ((isTaxActive && p.optionSurcharge) ? p.optionSurcharge : 0);

    const confirmed = await this.showCustomConfirm(
      `Remove power "${p.name}" (${p.rankName})?\n\nRemoving this power will refund ${cpRefund} Character Points (CP) to your budget, and this removal will be noted in your Character Log.`,
      '🗑️ Remove Power',
      mouseEvent,
      `Remove & Refund ${cpRefund} CP`,
      'Cancel'
    );

    if (confirmed) {
      const powerName = p.name;
      this.character.powers.splice(idx, 1);
      if (this.character.calculateDefenses) {
        this.character.calculateDefenses();
      }
      this.recordCharacterEdit(`Removed power: ${powerName} (+${cpRefund} CP refunded)`, 'power');
      this.render();
      this.showStatusToast(`🗑️ "${powerName}" removed (+${cpRefund} CP refunded)`);
    }
  },

  renderPowerDropdown(filterText = '') {
    const pCatSel = document.getElementById('select-power-catalog');
    if (!pCatSel) return;

    const allPowers = this.getAllAvailablePowers();
    const previousVal = pCatSel.value;
    const q = (filterText || '').toLowerCase().trim();
    const filtered = q ? allPowers.filter(p => 
      p.name.toLowerCase().includes(q) || 
      (p.id && p.id.toLowerCase().includes(q)) || 
      (p.code && p.code.toLowerCase().includes(q)) || 
      (p.category && p.category.toLowerCase().includes(q)) ||
      ((q === '*' || q === 'star' || q === 'starred') && p.isStarred)
    ) : allPowers;

    let html = '<option value="">-- Select Power --</option>';

    const cats = {};
    filtered.forEach(p => {
      const c = p.category || 'General';
      if (!cats[c]) cats[c] = [];
      cats[c].push(p);
    });

    const sortedCatNames = Object.keys(cats).sort();

    for (const catName of sortedCatNames) {
      cats[catName].sort((a, b) => {
        const nameA = (a.name || '').replace(/^[★⭐\s]+/, '').toLowerCase();
        const nameB = (b.name || '').replace(/^[★⭐\s]+/, '').toLowerCase();
        return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
      });
      html += `<optgroup label="⭐ UPB: ${catName}">`;
      html += cats[catName].map(p => {
        const star = p.isStarred ? '★ ' : '';
        const tag = p.isStarred ? ' (Starred ★)' : '';
        const isNpc = (p.code && p.code.startsWith('NPC_')) || (p.id && p.id.startsWith('NPC_'));
        const codePrefix = isNpc ? '' : `[${p.code || p.id}] `;
        return `<option value="${p.id || p.code}">${codePrefix}${star}${p.name}${tag}</option>`;
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
    if (!pCatSel) return;
    const allPowers = this.getAllAvailablePowers();
    const selectedP = allPowers.find(p => p.id === pCatSel.value || p.code === pCatSel.value);
    const checkExp = document.getElementById('check-power-exceptional');
    const labelExpText = document.getElementById('label-power-exceptional-text');
    const bannerEl = document.getElementById('power-starred-banner');
    const optionsContainer = document.getElementById('power-options-container');

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
      if (optionsContainer) {
        optionsContainer.style.display = 'none';
        optionsContainer.innerHTML = '';
      }
      this.newPowerOptionSelectedKey = null;
      this.newPowerOptionSubChoice = null;
      this.newPowerOptionMethod = 'chosen';
      this.newPowerRolledD100 = null;
      return;
    }

    const isStarred = !!(selectedP.isStarred || selectedP.countsAsTwo || selectedP.powerSlots > 1);

    if (isStarred) {
      if (checkExp) {
        checkExp.checked = true;
        checkExp.disabled = true;
      }
      if (labelExpText) {
        labelExpText.innerHTML = '<strong class="starred-label-text">★ Starred Power (20 CP Base + 2x Rank)</strong>';
      }
      if (bannerEl) {
        bannerEl.style.display = 'block';
        if (selectedP.isNpcArchetype) {
          bannerEl.innerHTML = `🌟 <strong>Reverse-Engineered GHotMU Superpower:</strong> ${selectedP.name}. ${selectedP.source ? '(' + selectedP.source + '). ' : ''}Uses CMF Exceptional point-buy pricing (<strong>20 CP Base + 2× Rank CP</strong>).`;
        } else {
          bannerEl.innerHTML = `★ <strong>Official Starred Power:</strong> Per TSR rules (Player's Book p. 19 & UPB p. 16-19), this heavyweight power uses CMF Exceptional point-buy pricing (<strong>20 CP Base + 2× Rank CP</strong>).`;
        }
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

    // Set default rank if specified
    const rankSel = document.getElementById('select-new-power-rank');
    if (rankSel && selectedP.defaultRank) {
      rankSel.value = selectedP.defaultRank;
    }

    const optDef = (typeof globalThis.getPowerOptionsDefinition === 'function') ? globalThis.getPowerOptionsDefinition(selectedP) : null;
    if (optDef && optionsContainer) {
      optionsContainer.style.display = 'block';
      this.renderPowerOptionsSelector(optDef, selectedP);
    } else if (optionsContainer) {
      optionsContainer.style.display = 'none';
      optionsContainer.innerHTML = '';
      this.newPowerOptionSelectedKey = null;
      this.newPowerOptionSubChoice = null;
      this.newPowerOptionMethod = 'chosen';
      this.newPowerRolledD100 = null;
    }
  },

  renderPowerOptionsSelector(optDef, selectedP) {
    const container = document.getElementById('power-options-container');
    if (!container || !optDef) return;

    this.newPowerOptionSelectedKey = optDef.choices[0] ? optDef.choices[0].key : null;
    this.newPowerOptionMethod = 'chosen';
    this.newPowerRolledD100 = null;

    const checkExp = document.getElementById('check-power-exceptional');
    const isStarred = !!(selectedP.isStarred || selectedP.countsAsTwo || selectedP.powerSlots > 1);
    const isExp = isStarred || (checkExp ? checkExp.checked : false);
    const surchargeAmount = isExp ? 20 : 10;

    let choicesHtml = '';
    optDef.choices.forEach((c, idx) => {
      const isChecked = idx === 0 ? 'checked' : '';
      const subChoiceHtml = c.subChoiceList ? `
        <div class="power-option-subchoice-box" id="new-power-subchoice-box-${c.key}" style="display: ${idx === 0 ? 'block' : 'none'}; margin-top: 6px;">
          <label style="font-size: 9pt; color: var(--text-main); font-weight: 600;">Specialization / Focus:
            <select class="field-input new-power-subchoice-select" style="font-size: 9.5pt; padding: 2px 8px; margin-left: 6px; display: inline-block; width: auto; max-width: 260px;">
              ${c.subChoiceList.map(sc => `<option value="${sc}">${sc}</option>`).join('')}
            </select>
          </label>
        </div>
      ` : '';

      choicesHtml += `
        <label class="power-option-choice-card" style="display: flex; align-items: flex-start; gap: 10px; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; background: rgba(0,0,0,0.2);">
          <input type="radio" name="new-power-option-radio" value="${c.key}" style="margin-top: 3px;" ${isChecked}>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <strong style="color: var(--text-main); font-size: 10pt;">${c.label}</strong>
              ${c.isSuperior ? (this.superiorOptionCost ? `<span class="meta-tag tag-option-superior" style="font-size: 8.5pt;">★ Superior Option (+${surchargeAmount} CP if chosen manually)</span>` : `<span class="meta-tag" style="font-size: 8.5pt; color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);">★ Superior Option (0 CP Surcharge)</span>`) : '<span class="meta-tag" style="font-size: 8.5pt;">Standard (0 CP Surcharge)</span>'}
            </div>
            <div style="font-size: 9pt; color: var(--text-muted); margin-top: 2px;">${c.description}</div>
            ${subChoiceHtml}
          </div>
        </label>
      `;
    });

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
        <div>
          <strong style="font-size: 10.5pt; color: var(--marvel-gold);">⚙️ Power Manifestation &amp; Option: ${optDef.label}</strong>
          <div style="font-size: 9pt; color: var(--text-muted); margin-top: 1px;">Canonical choice required when obtaining this power. Choose manually or roll random manifestation on the canonical subtable.</div>
        </div>
        ${optDef.canRoll ? `
          <button type="button" class="icon-btn" id="btn-roll-new-power-manifestation" style="font-size: 9pt; padding: 4px 10px; background: #1e3a8a; border-color: #3b82f6;" title="Roll d100 on subtable. Accepting roll incurs 0 CP surcharge even for superior options.">
            🎲 Roll Random Manifestation (0 CP Surcharge)
          </button>
        ` : ''}
      </div>

      <div id="new-power-option-roll-result" style="display: none; margin-bottom: 10px; padding: 8px 12px; border-radius: 6px; background: rgba(30, 58, 138, 0.4); border: 1px solid #3b82f6; font-size: 9.5pt;"></div>

      <div class="power-options-list" style="display: flex; flex-direction: column; gap: 8px;">
        ${choicesHtml}
      </div>

      <div id="new-power-option-summary" style="margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--border-color); font-size: 9.5pt; color: var(--text-muted);">
        <span id="new-power-cost-breakdown"></span>
      </div>
    `;

    // Bind Radio listeners
    const radios = container.querySelectorAll('input[name="new-power-option-radio"]');
    radios.forEach(r => {
      r.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.newPowerOptionSelectedKey = e.target.value;
          this.newPowerOptionMethod = 'chosen';
          this.newPowerRolledD100 = null;

          optDef.choices.forEach(c => {
            const scBox = document.getElementById(`new-power-subchoice-box-${c.key}`);
            if (scBox) scBox.style.display = (c.key === e.target.value) ? 'block' : 'none';
          });

          const rollBanner = document.getElementById('new-power-option-roll-result');
          if (rollBanner) rollBanner.style.display = 'none';

          this.updatePowerOptionsPreview();
        }
      });
    });

    // Bind Roll button listener
    const rollBtn = document.getElementById('btn-roll-new-power-manifestation');
    if (rollBtn) {
      rollBtn.addEventListener('click', () => {
        const rolled = globalThis.rollPowerManifestation(optDef);
        if (!rolled) return;
        this.newPowerOptionSelectedKey = rolled.choiceKey;
        this.newPowerOptionMethod = 'rolled';
        this.newPowerRolledD100 = rolled.d100;

        const targetRadio = container.querySelector(`input[name="new-power-option-radio"][value="${rolled.choiceKey}"]`);
        if (targetRadio) targetRadio.checked = true;

        optDef.choices.forEach(c => {
          const scBox = document.getElementById(`new-power-subchoice-box-${c.key}`);
          if (scBox) scBox.style.display = (c.key === rolled.choiceKey) ? 'block' : 'none';
        });

        const rollBanner = document.getElementById('new-power-option-roll-result');
        if (rollBanner) {
          rollBanner.style.display = 'block';
          rollBanner.innerHTML = `🎲 Rolled d100: <strong>${rolled.d100}</strong> ➔ <strong>${rolled.choiceObj.label}</strong> (Dice Accepted: <strong>0 CP Surcharge</strong> applied even if superior!)`;
        }

        this.updatePowerOptionsPreview();
      });
    }

    this.updatePowerOptionsPreview();
  },

  updatePowerOptionsPreview() {
    const pCatSel = document.getElementById('select-power-catalog');
    if (!pCatSel || !globalThis.MSH_POWERS) return;
    const selectedP = globalThis.MSH_POWERS.find(p => p.id === pCatSel.value);
    if (!selectedP) return;
    const optDef = (typeof globalThis.getPowerOptionsDefinition === 'function') ? globalThis.getPowerOptionsDefinition(selectedP) : null;
    if (!optDef) return;

    const rankSel = document.getElementById('select-new-power-rank');
    const rankName = rankSel ? rankSel.value : 'Good';
    const rankObj = (typeof UniversalTableEngine !== 'undefined') ? UniversalTableEngine.getRankByName(rankName) : { name: 'Good', num: 10 };
    const rankVal = rankObj ? rankObj.num : 10;

    const checkExp = document.getElementById('check-power-exceptional');
    const isStarred = !!(selectedP.isStarred || selectedP.countsAsTwo || selectedP.powerSlots > 1);
    const isExp = isStarred || (checkExp ? checkExp.checked : false);

    const curKey = this.newPowerOptionSelectedKey || (optDef.choices[0] ? optDef.choices[0].key : null);
    const curChoice = optDef.choices.find(c => c.key === curKey);

    const baseUnlock = isExp ? 20 : 10;
    const rankCP = rankVal * (isExp ? 2 : 1);
    let surcharge = 0;

    const isTaxActive = !!(this.superiorOptionCost || (this.character && this.character.superiorOptionCost));
    if (this.newPowerOptionMethod === 'chosen' && curChoice?.isSuperior && isTaxActive) {
      surcharge = isExp ? 20 : 10;
    }

    const totalCP = baseUnlock + surcharge + rankCP;

    const breakdownEl = document.getElementById('new-power-cost-breakdown');
    if (breakdownEl) {
      let surchargeText = '<strong style="color: #22c55e;">+0 CP</strong>';
      if (curChoice?.isSuperior && this.newPowerOptionMethod === 'chosen' && !isTaxActive) {
        surchargeText = '<strong style="color: #38bdf8;">+0 CP (House Rule Disabled)</strong>';
      } else if (surcharge > 0) {
        surchargeText = `<strong style="color: var(--marvel-gold); font-weight: 700;">+${surcharge} CP (2× Unlock Surcharge)</strong>`;
      }
      const methodBadge = this.newPowerOptionMethod === 'rolled' 
        ? '<span class="badge-yellow" style="margin-left: 6px;">🎲 Rolled Manifestation (No Surcharge)</span>' 
        : '';

      breakdownEl.innerHTML = `
        Base Unlock: <strong>${baseUnlock} CP</strong> | 
        Superior Option Surcharge: ${surchargeText}${methodBadge} | 
        Rank (${rankName}): <strong>${rankCP} CP</strong> ➔ 
        <strong style="color: var(--text-main); font-size: 10pt;">Total Cost: ${totalCP} CP</strong>
      `;
    }
  },

  openPowerOptionsModal(powerIndex) {
    const power = this.character.powers[powerIndex];
    if (!power) return;
    this.activeOptionPowerIndex = powerIndex;

    const optDef = (typeof globalThis.getPowerOptionsDefinition === 'function') ? globalThis.getPowerOptionsDefinition(power) : null;
    if (!optDef) {
      this.showCustomAlert(`"${power.name}" does not have variable manifestation options.`, 'Power Options');
      return;
    }

    const modal = document.getElementById('modal-power-options');
    if (!modal) return;

    this.modalOptionSelectedKey = power.selectedOption || (optDef.choices[0] ? optDef.choices[0].key : null);
    this.modalOptionSubChoice = power.optionSubChoice || (optDef.choices[0]?.subChoiceList ? optDef.choices[0].subChoiceList[0] : null);
    this.modalOptionMethod = power.optionAcquisitionMethod || 'chosen';
    this.modalOptionRolledD100 = null;

    const pRank = UniversalTableEngine.getRankByName(power.rankName);
    const powerNameEl = document.getElementById('modal-opt-power-name');
    const rankBadgeEl = document.getElementById('modal-opt-rank-badge');
    const statusEl = document.getElementById('modal-opt-current-status');
    const metaEl = document.getElementById('modal-opt-power-meta');

    if (powerNameEl) powerNameEl.textContent = power.name;
    if (rankBadgeEl) rankBadgeEl.textContent = `${pRank.name} (${power.rankValue})`;
    if (metaEl) metaEl.textContent = `Category: ${power.category || 'Superhuman Power'} | ${power.isExceptional ? '★ Exceptional Power' : 'Standard Power'} | Code: ${power.code || 'N/A'}`;

    const curChoice = optDef.choices.find(c => c.key === power.selectedOption);
    const curLabel = curChoice ? curChoice.label : (power.selectedOption || 'Standard');
    const curSub = power.optionSubChoice ? ` (${power.optionSubChoice})` : '';
    const isTaxActive = !!(this.superiorOptionCost || (this.character && this.character.superiorOptionCost));
    const effectiveSurcharge = isTaxActive ? (power.optionSurcharge || 0) : 0;
    const surchargeNote = (!isTaxActive && power.optionSurcharge) ? '+0 CP (Rule Off)' : `+${effectiveSurcharge} CP`;
    if (statusEl) {
      statusEl.innerHTML = `<span style="color: var(--marvel-gold);">Active: ${curLabel}${curSub} [${power.optionAcquisitionMethod || 'chosen'}, ${surchargeNote}]</span>`;
    }

    this.renderModalPowerOptionsContent(optDef, power);
    this.updateModalPowerOptionsSummary(optDef, power);

    modal.classList.add('open');
  },

  renderModalPowerOptionsContent(optDef, power) {
    const contentArea = document.getElementById('modal-opt-content-area');
    if (!contentArea || !optDef) return;

    const isExp = !!(power.isExceptional || power.isStarred);
    const surchargeAmount = isExp ? 20 : 10;
    const isTaxActive = !!(this.superiorOptionCost || (this.character && this.character.superiorOptionCost));

    let choicesHtml = '';
    optDef.choices.forEach(c => {
      const isChecked = c.key === this.modalOptionSelectedKey ? 'checked' : '';
      const subChoiceHtml = c.subChoiceList ? `
        <div class="power-option-subchoice-box" id="modal-subchoice-box-${c.key}" style="display: ${c.key === this.modalOptionSelectedKey ? 'block' : 'none'}; margin-top: 6px;">
          <label style="font-size: 9pt; color: var(--text-main); font-weight: 600;">Specialization / Focus:
            <select class="field-input modal-subchoice-select" style="font-size: 9.5pt; padding: 2px 8px; margin-left: 6px; display: inline-block; width: auto; max-width: 260px;">
              ${c.subChoiceList.map(sc => `<option value="${sc}" ${sc === this.modalOptionSubChoice ? 'selected' : ''}>${sc}</option>`).join('')}
            </select>
          </label>
        </div>
      ` : '';

      const superiorTag = isTaxActive
        ? `<span class="meta-tag tag-option-superior" style="font-size: 8.5pt;">★ Superior Option (+${surchargeAmount} CP if chosen manually)</span>`
        : `<span class="meta-tag" style="font-size: 8.5pt; color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);">★ Superior Option (0 CP Surcharge)</span>`;

      choicesHtml += `
        <label class="power-option-choice-card" style="display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; background: rgba(0,0,0,0.2);">
          <input type="radio" name="modal-power-option-radio" value="${c.key}" style="margin-top: 3px;" ${isChecked}>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <strong style="color: var(--text-main); font-size: 10pt;">${c.label}</strong>
              ${c.isSuperior ? superiorTag : '<span class="meta-tag" style="font-size: 8.5pt;">Standard (0 CP Surcharge)</span>'}
            </div>
            <div style="font-size: 9pt; color: var(--text-muted); margin-top: 2px;">${c.description}</div>
            ${subChoiceHtml}
          </div>
        </label>
      `;
    });

    contentArea.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <span style="font-size: 9.5pt; color: var(--text-main); font-weight: 600;">Select Manifestation or Roll on Subtable:</span>
        ${optDef.canRoll ? `
          <button type="button" class="icon-btn" id="btn-roll-modal-power-manifestation" style="font-size: 9pt; padding: 4px 10px; background: #1e3a8a; border-color: #3b82f6;">
            🎲 Roll Random Manifestation (0 CP Surcharge)
          </button>
        ` : ''}
      </div>

      <div id="modal-opt-roll-result" style="display: none; padding: 8px 12px; border-radius: 6px; background: rgba(30, 58, 138, 0.4); border: 1px solid #3b82f6; font-size: 9.5pt;"></div>

      <div class="power-options-list" style="display: flex; flex-direction: column; gap: 8px;">
        ${choicesHtml}
      </div>
    `;

    // Bind radios
    const radios = contentArea.querySelectorAll('input[name="modal-power-option-radio"]');
    radios.forEach(r => {
      r.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.modalOptionSelectedKey = e.target.value;
          this.modalOptionMethod = 'chosen';
          this.modalOptionRolledD100 = null;

          optDef.choices.forEach(c => {
            const scBox = document.getElementById(`modal-subchoice-box-${c.key}`);
            if (scBox) scBox.style.display = (c.key === e.target.value) ? 'block' : 'none';
          });

          const rollBanner = document.getElementById('modal-opt-roll-result');
          if (rollBanner) rollBanner.style.display = 'none';

          this.updateModalPowerOptionsSummary(optDef, power);
        }
      });
    });

    // Bind subchoice selects
    const subSelects = contentArea.querySelectorAll('.modal-subchoice-select');
    subSelects.forEach(sel => {
      sel.addEventListener('change', (e) => {
        this.modalOptionSubChoice = e.target.value;
      });
    });

    // Bind Roll button
    const rollBtn = document.getElementById('btn-roll-modal-power-manifestation');
    if (rollBtn) {
      rollBtn.addEventListener('click', () => {
        const rolled = globalThis.rollPowerManifestation(optDef);
        if (!rolled) return;
        this.modalOptionSelectedKey = rolled.choiceKey;
        this.modalOptionMethod = 'rolled';
        this.modalOptionRolledD100 = rolled.d100;

        const targetRadio = contentArea.querySelector(`input[name="modal-power-option-radio"][value="${rolled.choiceKey}"]`);
        if (targetRadio) targetRadio.checked = true;

        optDef.choices.forEach(c => {
          const scBox = document.getElementById(`modal-subchoice-box-${c.key}`);
          if (scBox) scBox.style.display = (c.key === rolled.choiceKey) ? 'block' : 'none';
        });

        const rollBanner = document.getElementById('modal-opt-roll-result');
        if (rollBanner) {
          rollBanner.style.display = 'block';
          rollBanner.innerHTML = `🎲 Rolled d100: <strong>${rolled.d100}</strong> ➔ <strong>${rolled.choiceObj.label}</strong> (Dice Accepted: <strong>0 CP Surcharge</strong> applied even if superior!)`;
        }

        this.updateModalPowerOptionsSummary(optDef, power);
      });
    }
  },

  updateModalPowerOptionsSummary(optDef, power) {
    const summaryEl = document.getElementById('modal-opt-surcharge-summary');
    if (!summaryEl || !optDef || !power) return;

    const isExp = !!(power.isExceptional || power.isStarred);
    const curChoice = optDef.choices.find(c => c.key === this.modalOptionSelectedKey);

    let newSurcharge = 0;
    if (this.modalOptionMethod === 'chosen' && curChoice?.isSuperior) {
      newSurcharge = isExp ? 20 : 10;
    }

    const isTaxActive = !!(this.superiorOptionCost || (this.character && this.character.superiorOptionCost));
    const effectiveNewSurcharge = isTaxActive ? newSurcharge : 0;
    const effectiveOldSurcharge = isTaxActive ? (power.optionSurcharge || 0) : 0;
    const diff = effectiveNewSurcharge - effectiveOldSurcharge;
    let diffText = 'No CP cost change';
    if (diff > 0) {
      diffText = `<strong style="color: var(--marvel-gold);">+${diff} CP additional surcharge</strong>`;
    } else if (diff < 0) {
      diffText = `<strong style="color: #22c55e;">${diff} CP refund</strong>`;
    }

    let surchargeDisplay = `+${effectiveNewSurcharge} CP`;
    if (!isTaxActive && curChoice?.isSuperior && this.modalOptionMethod === 'chosen') {
      surchargeDisplay = `+0 CP <span style="color: #38bdf8; font-size: 8.5pt;">(House Rule Disabled)</span>`;
    }

    const methodNote = this.modalOptionMethod === 'rolled' ? ' [Dice Rolled: 0 CP Surcharge]' : '';
    summaryEl.innerHTML = `New Surcharge: <strong>${surchargeDisplay}</strong>${methodNote} | Net Impact: ${diffText}`;
  },

  savePowerOptionsModal() {
    if (this.activeOptionPowerIndex === null) return;
    const power = this.character.powers[this.activeOptionPowerIndex];
    if (!power) return;

    const optDef = (typeof globalThis.getPowerOptionsDefinition === 'function') ? globalThis.getPowerOptionsDefinition(power) : null;
    if (!optDef) return;

    const curChoice = optDef.choices.find(c => c.key === this.modalOptionSelectedKey);
    const isExp = !!(power.isExceptional || power.isStarred);

    let subChoice = null;
    if (curChoice?.subChoiceList) {
      const subSel = document.querySelector(`#modal-subchoice-box-${curChoice.key} .modal-subchoice-select`);
      subChoice = subSel ? subSel.value : (this.modalOptionSubChoice || curChoice.subChoiceList[0]);
    }

    let newSurcharge = 0;
    if (this.modalOptionMethod === 'chosen' && curChoice?.isSuperior) {
      newSurcharge = isExp ? 20 : 10;
    }

    power.selectedOption = this.modalOptionSelectedKey;
    power.optionSubChoice = subChoice;
    power.optionAcquisitionMethod = this.modalOptionMethod;
    power.optionSurcharge = newSurcharge;
    power.isSuperiorOption = !!curChoice?.isSuperior;

    if (this.character.calculateDefenses) {
      this.character.calculateDefenses();
    }

    this.recordCharacterEdit(`Updated manifestation for ${power.name}: ${curChoice ? curChoice.label : power.selectedOption}`, 'power');
    this.closePowerOptionsModal();
    this.saveState();
    this.render();
  },

  closePowerOptionsModal() {
    const modal = document.getElementById('modal-power-options');
    if (modal) modal.classList.remove('open');
    this.activeOptionPowerIndex = null;
  },

  openPowerTriggerModal(powerIndex) {
    const power = this.character.powers[powerIndex];
    if (!power) return;

    this.activeTriggerPowerIndex = powerIndex;
    const modal = document.getElementById('modal-power-trigger');
    if (!modal) return;

    const pRank = UniversalTableEngine.getRankByName(power.rankName);
    const pIndexInp = document.getElementById('modal-trigger-power-index');
    const pNameEl = document.getElementById('modal-trigger-power-name');
    const pRankEl = document.getElementById('modal-trigger-power-rank');
    const pStatusBadge = document.getElementById('modal-trigger-status-badge');
    const pMetaEl = document.getElementById('modal-trigger-power-meta');

    if (pIndexInp) pIndexInp.value = powerIndex;
    if (pNameEl) pNameEl.textContent = power.name;
    if (pRankEl) pRankEl.textContent = `${pRank.name} (${power.rankValue})`;
    
    const isOperating = this.character.isPowerOperating(power.id);
    if (pStatusBadge) {
      if (power.isDisabled) {
        pStatusBadge.className = 'meta-tag tag-power-neutralized';
        pStatusBadge.textContent = '🚫 Neutralized';
      } else if (isOperating) {
        pStatusBadge.className = 'meta-tag tag-operating-on';
        pStatusBadge.textContent = '🟢 Operating';
      } else {
        pStatusBadge.className = 'meta-tag tag-operating-off';
        pStatusBadge.textContent = '⚪ Standby / Off';
      }
    }

    const dur = power.duration || 'Not specified';
    if (pMetaEl) {
      const defaultMode = (dur === 'Instantaneous') ? 'Active (requires action each turn)' : 'Passive (switched on/off at will)';
      pMetaEl.textContent = `Category: ${power.category || 'Special'} | UPB Duration: ${dur} | Default: ${defaultMode}`;
    }

    // Operational Type radio
    const opType = power.operationalType || 'passive';
    const radPassive = document.getElementById('trigger-op-passive');
    const radActive = document.getElementById('trigger-op-active');
    if (radPassive && radActive) {
      radPassive.checked = (opType === 'passive');
      radActive.checked = (opType === 'active');
    }

    // Trigger config
    const cfg = power.triggerConfig || { mode: 'default', masterPowerId: null, masterPowerName: null, invert: false, conditionLabel: '' };
    const radDefault = document.getElementById('trigger-link-default');
    const radLinked = document.getElementById('trigger-link-linked');
    if (radDefault && radLinked) {
      radDefault.checked = (cfg.mode !== 'linked');
      radLinked.checked = (cfg.mode === 'linked');
    }

    // Populate Master Power select
    const masterSel = document.getElementById('trigger-master-select');
    if (masterSel) {
      masterSel.innerHTML = '';
      const otherPowers = this.character.powers.filter((_, idx) => idx !== powerIndex);
      if (otherPowers.length === 0) {
        masterSel.innerHTML = '<option value="">(No other powers available)</option>';
      } else {
        otherPowers.forEach(other => {
          const opt = document.createElement('option');
          opt.value = other.id;
          opt.textContent = `${other.name} [${other.rankName || 'Good'}] (${other.operationalType || 'passive'})`;
          if (cfg.masterPowerId === other.id) {
            opt.selected = true;
          }
          masterSel.appendChild(opt);
        });
      }
    }

    // Invert checkbox
    const invertCheck = document.getElementById('trigger-invert-check');
    if (invertCheck) {
      invertCheck.checked = !!cfg.invert;
    }

    // Condition input
    const condInp = document.getElementById('trigger-condition-input');
    if (condInp) {
      condInp.value = cfg.conditionLabel || '';
    }

    // Toggle linked sub-panel
    const linkedDetails = document.getElementById('trigger-linked-details');
    if (linkedDetails) {
      linkedDetails.style.display = (cfg.mode === 'linked') ? 'block' : 'none';
    }

    modal.classList.add('open');
  },

  closePowerTriggerModal() {
    const modal = document.getElementById('modal-power-trigger');
    if (modal) modal.classList.remove('open');
    this.activeTriggerPowerIndex = null;
  },

  savePowerTriggerModal() {
    if (this.activeTriggerPowerIndex === null || this.activeTriggerPowerIndex === undefined) return;
    const power = this.character.powers[this.activeTriggerPowerIndex];
    if (!power) return;

    const radActive = document.getElementById('trigger-op-active');
    const operationalType = radActive?.checked ? 'active' : 'passive';

    const radLinked = document.getElementById('trigger-link-linked');
    const isLinked = !!radLinked?.checked;
    const mode = isLinked ? 'linked' : 'default';

    const masterSel = document.getElementById('trigger-master-select');
    const masterPowerId = (isLinked && masterSel) ? masterSel.value : null;

    const invertCheck = document.getElementById('trigger-invert-check');
    const invert = isLinked && !!invertCheck?.checked;

    const condInp = document.getElementById('trigger-condition-input');
    const conditionLabel = condInp ? (condInp.value || '').trim() : '';

    this.character.configurePowerTrigger(power.id, {
      operationalType,
      mode,
      masterPowerId,
      invert,
      conditionLabel
    });

    const masterName = power.triggerConfig?.masterPowerName || masterPowerId;
    this.recordCharacterEdit(`Configured trigger for ${power.name}: ${operationalType.toUpperCase()}${isLinked ? ' (Linked to ' + masterName + (invert ? ' [Inverted]' : '') + ')' : ' (Independent)'}`, 'power');
    this.closePowerTriggerModal();
    this.saveState();
    this.render();
  },

  resetPowerTriggerModal() {
    if (this.activeTriggerPowerIndex === null || this.activeTriggerPowerIndex === undefined) return;
    const power = this.character.powers[this.activeTriggerPowerIndex];
    if (!power) return;

    const radPassive = document.getElementById('trigger-op-passive');
    const radActive = document.getElementById('trigger-op-active');
    const radDefault = document.getElementById('trigger-link-default');
    const radLinked = document.getElementById('trigger-link-linked');
    const linkedDetails = document.getElementById('trigger-linked-details');
    const invertCheck = document.getElementById('trigger-invert-check');
    const condInp = document.getElementById('trigger-condition-input');

    const defaultOp = (power.duration === 'Instantaneous') ? 'active' : 'passive';
    if (radPassive) radPassive.checked = (defaultOp === 'passive');
    if (radActive) radActive.checked = (defaultOp === 'active');
    if (radDefault) radDefault.checked = true;
    if (radLinked) radLinked.checked = false;
    if (linkedDetails) linkedDetails.style.display = 'none';
    if (invertCheck) invertCheck.checked = false;
    if (condInp) condInp.value = '';
  },

  applyTriggerPreset(presetKey) {
    if (this.activeTriggerPowerIndex === null || this.activeTriggerPowerIndex === undefined) return;
    const power = this.character.powers[this.activeTriggerPowerIndex];
    if (!power) return;

    const radPassive = document.getElementById('trigger-op-passive');
    const radActive = document.getElementById('trigger-op-active');
    const radLinked = document.getElementById('trigger-link-linked');
    const linkedDetails = document.getElementById('trigger-linked-details');
    const masterSel = document.getElementById('trigger-master-select');
    const invertCheck = document.getElementById('trigger-invert-check');
    const condInp = document.getElementById('trigger-condition-input');

    if (presetKey === 'cannonball') {
      // Force Field triggered by Rocket Flight
      if (radPassive) radPassive.checked = true;
      if (radLinked) radLinked.checked = true;
      if (linkedDetails) linkedDetails.style.display = 'block';
      if (invertCheck) invertCheck.checked = false;
      if (condInp) condInp.value = 'In Rocket Flight (also protects touching allies)';
      if (masterSel) {
        const flPwr = Array.from(masterSel.options).find(o => o.text.toLowerCase().includes('flight') || o.text.toLowerCase().includes('rocket'));
        if (flPwr) flPwr.selected = true;
      }
    } else if (presetKey === 'colossus') {
      // Body Armor / Strength triggered by Organic Steel
      if (radPassive) radPassive.checked = true;
      if (radLinked) radLinked.checked = true;
      if (linkedDetails) linkedDetails.style.display = 'block';
      if (invertCheck) invertCheck.checked = false;
      if (condInp) condInp.value = 'Organic Steel Transformation Active';
      if (masterSel) {
        const colPwr = Array.from(masterSel.options).find(o => o.text.toLowerCase().includes('organic steel') || o.text.toLowerCase().includes('steel') || o.text.toLowerCase().includes('transformation'));
        if (colPwr) colPwr.selected = true;
      }
    } else if (presetKey === 'frost') {
      // Inverted: Telepathy disabled during Diamond Form
      if (radPassive) radPassive.checked = true;
      if (radLinked) radLinked.checked = true;
      if (linkedDetails) linkedDetails.style.display = 'block';
      if (invertCheck) invertCheck.checked = true;
      if (condInp) condInp.value = 'Disabled while Diamond Form is active';
      if (masterSel) {
        const diaPwr = Array.from(masterSel.options).find(o => o.text.toLowerCase().includes('diamond') || o.text.toLowerCase().includes('form'));
        if (diaPwr) diaPwr.selected = true;
      }
    } else if (presetKey === 'hulk') {
      // Hyper-Strength triggered by Anger / Adrenalin
      if (radPassive) radPassive.checked = true;
      if (radLinked) radLinked.checked = false;
      if (linkedDetails) linkedDetails.style.display = 'none';
      if (invertCheck) invertCheck.checked = false;
      if (condInp) condInp.value = 'Adrenalin Surge / Anger Trigger';
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
    const sortedCatNames = Object.keys(cats).sort();
    for (const catName of sortedCatNames) {
      cats[catName].sort((a, b) => {
        const nameA = (a.name || '').replace(/^[★⭐\s]+/, '').toLowerCase();
        const nameB = (b.name || '').replace(/^[★⭐\s]+/, '').toLowerCase();
        return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
      });
      html += `<optgroup label="${catName}">`;
      html += cats[catName].map(p => {
        const star = p.isStarred ? '★ ' : '';
        const isNpc = (p.code && p.code.startsWith('NPC_')) || (p.id && p.id.startsWith('NPC_'));
        const codePrefix = isNpc ? '' : `[${p.id || p.code}] `;
        return `<option value="${p.name}">${codePrefix}${star}${p.name}</option>`;
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
          return `<option value="${t.id || t.name}" disabled style="opacity: 0.5;">${starPrefix}${starName} (${costText}) [Already Learned]</option>`;
        } else if (allowsSpec && learnedCount > 0) {
          // Can be learned multiple times with different specializations
          return `<option value="${t.id || t.name}">${starPrefix}${starName} (${costText}) [${learnedCount} learned - Add Specialty]</option>`;
        } else {
          return `<option value="${t.id || t.name}">${starPrefix}${starName} (${costText})</option>`;
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
      return c.includes('weapon') || c.includes('firearm') || c.includes('ammunition') || t.includes('weapon') || t.includes('firearm') || t.includes('shooting') || t.includes('slugthrower') || t.includes('energy') || t.includes('warhead') || t.includes('payload');
    }
    if (k === 'ammo' || k === 'ammunition') {
      return c.includes('ammunition') || t.includes('ammunition') || t.includes('cartridge') || t.includes('magazine') || t.includes('clip') || t.includes('rounds') || t.includes('warhead') || t.includes('payload') || n.includes('ammunition') || n.includes('shot') || n.includes('payload') || n.includes('warhead') || n.includes('arrowhead');
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
      return c.includes('vehicle') || t.includes('vehicle') || n.includes('skycraft') || n.includes('jet') || n.includes('car') || t.includes('watercraft') || t.includes('spacecraft') || t.includes('submersible') || t.includes('gev');
    }
    if (k === 'electronics' || k === 'surveillance' || k === 'communications' || k === 'gear' || k === 'tools') {
      return c.includes('electronics') || c.includes('surveillance') || c.includes('gear') || c.includes('tools') || c.includes('field') || t.includes('electronic') || t.includes('surveillance') || t.includes('sensor') || t.includes('comm');
    }
    if (k === 'hq' || k === 'headquarters' || k === 'real estate') {
      return c.includes('headquarters') || c.includes('hq') || t.includes('real estate') || t.includes('package') || t.includes('facility') || n.includes('headquarters') || n.includes('hq package');
    }
    if (k === 'sundries' || k === 'services' || k === 'salary' || k === 'salaries') {
      return c.includes('sundr') || c.includes('service') || t.includes('payroll') || t.includes('entertainment') || t.includes('apparel') || n.includes('salary') || n.includes('night on the town') || n.includes('respectable clothing');
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
    const activeRankNames = (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.ranks)
      ? UniversalTableEngine.ranks.map(r => r.name)
      : [
        'Shift 0', 'Feeble', 'Poor', 'Typical', 'Good', 'Excellent',
        'Remarkable', 'Incredible', 'Amazing', 'Monstrous', 'Unearthly',
        'Shift X', 'Shift Y', 'Shift Z', 'Class 1000', 'Class 3000', 'Class 5000', 'Beyond'
      ];

    const getVal = (rankName) => {
      if (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.getRankByName) {
        return UniversalTableEngine.getRankByName(rankName).num || 0;
      }
      return 6;
    };

    const heroRankName = (this.character && this.character.resources && this.character.resources.rankName) 
      ? this.character.resources.rankName 
      : 'Typical';
    const heroRankVal = (this.character && this.character.resources && this.character.resources.rankValue !== undefined)
      ? this.character.resources.rankValue
      : (getVal(heroRankName) || 6);

    const heroIdx = Math.max(0, activeRankNames.indexOf(heroRankName));

    // Block commercial procurement for unique artifacts / items
    if (item.isUnique || item.notForSale) {
      return {
        heroRankName,
        heroRankVal,
        effectiveCostRank: item.costRank || 'Unique',
        effectiveCostVal: item.costValue !== undefined ? item.costValue : 0,
        costNote: 'Unique Artifact / Not Available to Buy',
        isLocked: true,
        lockReason: 'Unique items and artifacts cannot be purchased on the commercial or black market.',
        status: 'unique_not_for_sale',
        targetColor: null,
        verdictClass: 'verdict-unaffordable',
        verdictIcon: '🔒',
        verdictHeading: 'Unique Item — Not Available for Purchase',
        verdictDesc: `${item.name} is a unique, one-of-a-kind artifact. Under TSR rules, unique items are not available to buy on the commercial or black market; they may only be awarded as a special storyline or campaign grant.`,
        requiresShieldApproval: false
      };
    }

    // Determine cost rank based on market mode
    const isBlackMarketPurchase = (item.accessType === 'black_market') || (this.storeBlackMarketAccess && item.blackMarketCostRank);
    let effectiveCostRank = item.costRank || 'Typical';
    let effectiveCostVal = item.costValue !== undefined ? item.costValue : (getVal(effectiveCostRank) || 6);
    let costNote = 'Legal Market Price';

    if (isBlackMarketPurchase && item.blackMarketCostRank) {
      effectiveCostRank = item.blackMarketCostRank;
      effectiveCostVal = item.blackMarketCostValue !== undefined ? item.blackMarketCostValue : (getVal(effectiveCostRank) || effectiveCostVal);
      costNote = 'Black Market (+1CS per p. 41)';
    }

    const costIdx = Math.max(0, activeRankNames.indexOf(effectiveCostRank));
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

    let status = 'automatic';
    let targetColor = null;
    let verdictClass = 'verdict-automatic';
    let verdictIcon = '🟢';
    let verdictHeading = 'Automatic Purchase (No Roll Needed)';
    let verdictDesc = '';

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
      requiresShieldApproval
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
      const totalCatalogItems = globalThis.PREBUILT_EQUIPMENT_CATALOG.filter(item => !item.notForSale && !item.isUnique).length;
      const filtered = globalThis.PREBUILT_EQUIPMENT_CATALOG.filter(item => {
        if (item.notForSale || item.isUnique) return false;
        return this.matchesStoreSearchQuery(item, q) && 
               this.matchesStoreCategory(item, cat) &&
               this.matchesStoreAccess(item, access);
      });

      // Ensure equipment is listed alphabetically by name (case-insensitive)
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { sensitivity: 'base' }));

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
        storeResBadge.innerHTML = `
          <span class="res-rank-highlight">Resources: ${resRank} (${resNum})</span>
        `;
        storeResBadge.title = `Standard TSR FEAT Rules: Purchases evaluated via Resource FEAT rolls.`;
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
          let costDisplay = `<span class="meta-tag store-cost-tag">${costAbbr} (${item.costValue})</span>`;
          if (this.storeBlackMarketAccess && item.blackMarketCostRank) {
            const bmRankObj = (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.getRankByName)
              ? UniversalTableEngine.getRankByName(item.blackMarketCostRank)
              : null;
            const bmAbbr = bmRankObj?.abbr || item.blackMarketCostRank;
            costDisplay = `
              <div style="display: flex; flex-direction: column; gap: 2px;">
                <span class="meta-tag store-cost-tag">${costAbbr} (${item.costValue})</span>
                <span class="store-bm-cost">BM: ${bmAbbr} (${item.blackMarketCostValue})</span>
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
      heroResEl.textContent = `${evalRes.heroRankName} (${evalRes.heroRankVal})`;
    }
    const heroResSub = document.getElementById('procure-hero-res-sub');
    if (heroResSub) {
      heroResSub.textContent = `Personal Resource Rank`;
    }

    const itemCostEl = document.getElementById('procure-item-cost');
    if (itemCostEl) {
      itemCostEl.textContent = `${evalRes.effectiveCostRank} (${evalRes.effectiveCostVal})`;
    }
    const itemCostSub = document.getElementById('procure-item-cost-sub');
    if (itemCostSub) {
      itemCostSub.textContent = evalRes.costNote;
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

      if (evalRes.status === 'unique_not_for_sale') {
        const uniqueNotice = document.createElement('div');
        uniqueNotice.style.cssText = 'color: var(--marvel-gold); font-size: 10pt; font-weight: 600; padding: 12px; background: rgba(255, 215, 0, 0.08); border: 1px solid rgba(255, 215, 0, 0.25); border-radius: 6px; text-align: center; margin-bottom: 8px; width: 100%;';
        uniqueNotice.innerHTML = `🔒 <strong>Unique Item / Artifact:</strong> Not available to buy on the commercial or black market per TSR rules. May only be awarded through a special GM storyline grant or campaign event.`;
        actionsContainer.appendChild(uniqueNotice);

        const gmGrantBtn = document.createElement('button');
        gmGrantBtn.type = 'button';
        gmGrantBtn.className = 'icon-btn';
        gmGrantBtn.innerHTML = `⚡ GM Storyline Award (Add to Gear)`;
        gmGrantBtn.title = 'Add this unique item directly to character equipment as a special storyline or campaign award';
        gmGrantBtn.addEventListener('click', (e) => this.finalizeItemAcquisition(item, 'Special GM Storyline Grant', e));
        actionsContainer.appendChild(gmGrantBtn);
      } else if (evalRes.isLocked) {
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
    this.showCustomAlert(`Added "${item.name}" to character equipment!\nReason: ${reasonText}`, '🛍️ Equipment Acquired', mouseEvent);
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

  setPowerAdjustment(enabled) {
    this.powerAdjustment = !!enabled;
    if (this.character) {
      this.character.powerAdjustment = this.powerAdjustment;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('msh_option_power_adjustment', this.powerAdjustment ? 'true' : 'false');
    }
    const opt = document.getElementById('option-power-adjustment');
    if (opt) opt.checked = this.powerAdjustment;
    this.renderPowers();
    this.saveState();
  },

  setKarmicSuccess(enabled) {
    this.karmicSuccess = !!enabled;
    if (this.character) {
      this.character.karmicSuccess = this.karmicSuccess;
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('msh_option_karmic_success', this.karmicSuccess ? 'true' : 'false');
    }
    const opt = document.getElementById('option-karmic-success');
    if (opt) opt.checked = this.karmicSuccess;
    const rollerCheck = this.getRollerEl ? this.getRollerEl('roller-check-karmic-success') : null;
    if (rollerCheck) rollerCheck.checked = this.karmicSuccess;
    const docRollerCheck = document.getElementById('roller-check-karmic-success');
    if (docRollerCheck) docRollerCheck.checked = this.karmicSuccess;
    this.saveState();
  },

  setSuperiorOptionCost(enabled) {
    this.superiorOptionCost = !!enabled;
    if (this.character) {
      this.character.superiorOptionCost = this.superiorOptionCost;
      if (this.character.calculateDefenses) {
        this.character.calculateDefenses();
      }
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('msh_option_superior_option_tax', this.superiorOptionCost ? 'true' : 'false');
    }
    const opt = document.getElementById('option-superior-option-cost') || document.getElementById('option-superior-option-tax');
    if (opt) opt.checked = this.superiorOptionCost;
    this.saveState();
    this.render();
  },

  setSuperiorOptionTax(enabled) {
    this.setSuperiorOptionCost(enabled);
  },

  setUniversalTableMode(mode, save = true) {
    this.universalTableMode = (mode === 'standard') ? 'standard' : 'cmf';
    if (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.setTableMode) {
      UniversalTableEngine.setTableMode(this.universalTableMode);
    }
    if (save && typeof localStorage !== 'undefined') {
      localStorage.setItem('msh_option_universal_table', this.universalTableMode);
    }
    const tableOpt = document.getElementById('option-universal-table');
    if (tableOpt) tableOpt.value = this.universalTableMode;
    const cheatTableOpt = (typeof this.getCheatSheetEl === 'function') ? this.getCheatSheetEl('cheat-table-mode-select') : document.getElementById('cheat-table-mode-select');
    if (cheatTableOpt) cheatTableOpt.value = this.universalTableMode;

    if (this.character && typeof this.character.syncRanksToActiveScheme === 'function') {
      this.character.syncRanksToActiveScheme();
    }

    this.populateDropdowns();
    this.renderCheatSheetTable();
    this.renderCheatSheetMaterials();
    this.renderCheatSheetMovement();
    this.render();
    this.updateRollerPreview();
    this.saveState();
  },

  updateAreaDivisionDisplay() {
    const titleEl = (typeof this.getCheatSheetEl === 'function') ? this.getCheatSheetEl('cheat-active-area-rule') : document.getElementById('cheat-active-area-rule');
    const descEl = (typeof this.getCheatSheetEl === 'function') ? this.getCheatSheetEl('cheat-active-area-rule-desc') : document.getElementById('cheat-active-area-rule-desc');
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
    } else if (this.areaDivisionRule === 'eight') {
      titleEl.textContent = 'Eight Subareas Rule: 8 Subareas of 16.5 Feet (16.5 ft / subarea)';
      if (descEl) {
        descEl.innerHTML = '<strong>Eight Subareas Rule Active:</strong> Each standard 132-foot area square is subdivided into <strong>8 subareas of 16.5 feet</strong> (2&times;4 sub-grid, 16.5 ft / 5.5 yards each). Ideal for high-precision miniature battle-mats, tight indoor corridors, and micro-tactics. Standard 1 area moves traverse 8 subareas.';
      }
    } else {
      titleEl.textContent = 'Standard Full Areas: 1 Area = 132 Feet (Default TSR Rules)';
      if (descEl) {
        descEl.innerHTML = '<strong>Standard Rule Active:</strong> 1 Area is 132 feet across (approx. 44 yards / 1 city block width). Standard movement and combat ranges apply. To adjust between Quarter Area (33 ft quadrants), Six Subareas (22 ft squares), or Eight Subareas (16.5 ft subareas), open <strong>File/Options &rarr; Application Preferences</strong>.';
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
    if (theme === 'four-color') theme = 'slate';
    const validThemes = ['slate', 'manilla', 'aqua'];
    if (!validThemes.includes(theme)) theme = 'slate';
    this.currentTheme = theme;

    if (typeof document !== 'undefined' && document.body) {
      if (typeof document.body.setAttribute === 'function') {
        document.body.setAttribute('data-theme', theme);
      }
    }
    if (this.isRollerPoppedOut && this.isRollerPoppedOut()) {
      try {
        this.rollerPopoutWindow.document.body.setAttribute('data-theme', theme);
      } catch (e) {}
    }
    if (this.isCheatSheetPoppedOut && this.isCheatSheetPoppedOut()) {
      try {
        this.cheatsheetPopoutWindow.document.body.setAttribute('data-theme', theme);
      } catch (e) {}
    }
    const themeSelect = typeof document !== 'undefined' ? document.getElementById('option-theme') : null;
    if (themeSelect) themeSelect.value = theme;

    const themeMenuStatus = typeof document !== 'undefined' ? document.getElementById('menu-item-theme-status') : null;
    if (themeMenuStatus) {
      const displayNames = {
        'slate': 'Slate',
        'four-color': 'Slate',
        'manilla': 'Manilla',
        'aqua': 'Aqua'
      };
      themeMenuStatus.textContent = displayNames[theme] || 'Slate';
    }

    // Update flyout menu checkmark indicators & active states
    if (typeof document !== 'undefined') {
      const checkSlate = document.getElementById('theme-check-slate') || document.getElementById('theme-check-four-color');
      const checkManilla = document.getElementById('theme-check-manilla');
      const checkAqua = document.getElementById('theme-check-aqua');
      if (checkSlate) checkSlate.textContent = (theme === 'slate' || theme === 'four-color') ? '✓' : '';
      if (checkManilla) checkManilla.textContent = theme === 'manilla' ? '✓' : '';
      if (checkAqua) checkAqua.textContent = theme === 'aqua' ? '✓' : '';

      if (typeof document.querySelectorAll === 'function') {
        const themeBtns = document.querySelectorAll('.theme-option-btn');
        if (themeBtns && typeof themeBtns.forEach === 'function') {
          themeBtns.forEach(btn => {
            const btnVal = btn.getAttribute ? btn.getAttribute('data-theme-val') : null;
            if (btn.classList && typeof btn.classList.toggle === 'function') {
              btn.classList.toggle('active', btnVal === theme || (btnVal === 'slate' && theme === 'four-color') || (btnVal === 'four-color' && theme === 'slate'));
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
    const order = ['slate', 'manilla', 'aqua'];
    const curTheme = (this.currentTheme === 'four-color') ? 'slate' : (this.currentTheme || 'slate');
    const currentIndex = order.indexOf(curTheme);
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

  detectRelevantInventionTalent(sourceType = 'tech', category = 'Weapon') {
    const talents = (this.character && Array.isArray(this.character.talents)) ? this.character.talents : [];
    const isMagic = (sourceType === 'magic');

    if (isMagic) {
      const match = talents.find(t => {
        const n = (t.name || '').toLowerCase();
        const c = (t.category || '').toLowerCase();
        return n.includes('occult') || n.includes('mystic') || c.includes('mystic');
      });
      if (match) {
        return { hasTalent: true, talentName: match.name };
      }
      return { hasTalent: false, talentName: '' };
    } else {
      const techKeywords = [
        'engineering', 'electronics', 'physics', 'chemistry', 'biology',
        'genetics', 'computers', 'repair / tinkering', 'repair', 'tinkering'
      ];
      if (category === 'Weapon') {
        techKeywords.push('weapon tinkering', 'weapons tinkering', 'weapon specialist');
      }
      if (category === 'Consumable') {
        techKeywords.push('chemistry', 'pharmaceuticals', 'alchemy', 'medicine');
      }
      const match = talents.find(t => {
        const n = (t.name || '').toLowerCase();
        const c = (t.category || '').toLowerCase();
        return techKeywords.some(kw => n.includes(kw)) || c.includes('scientific');
      });
      if (match) {
        return { hasTalent: true, talentName: match.name };
      }
      return { hasTalent: false, talentName: '' };
    }
  },

  syncInventionTalentAutoDetect(force = false) {
    const talentChk = document.getElementById('inv-opt-talent');
    const badge = document.getElementById('inv-talent-detected-badge');
    if (!talentChk) return;

    const detected = this.detectRelevantInventionTalent(this.invSourceType || 'tech', document.getElementById('inv-cat')?.value || 'Weapon');
    
    if (force || !(talentChk.dataset && talentChk.dataset.userInteracted)) {
      talentChk.checked = detected.hasTalent;
    }

    if (badge) {
      if (detected.hasTalent) {
        badge.textContent = `Hero Talent: ${detected.talentName} (+1CS)`;
        badge.style.color = '#34d399';
        badge.style.borderColor = '#10b981';
      } else {
        badge.textContent = `Hero Talent: None Detected (+0CS)`;
        badge.style.color = 'var(--text-muted)';
        badge.style.borderColor = 'var(--border-color)';
      }
    }
  },

  handleCalculateInvention() {
    const rawName = document.getElementById('inv-name')?.value?.trim() || '';
    const fallbackName = (this.invSourceType === 'magic') ? 'Custom Relic' : 'Custom Gadget';
    const isMagic = (this.invSourceType === 'magic');

    this.syncInventionTalentAutoDetect(false);

    const hasRelevantTalent = !!document.getElementById('inv-opt-talent')?.checked;
    const hasWorkshop = document.getElementById('inv-opt-workshop') ? document.getElementById('inv-opt-workshop').checked : true;
    const isKitBash = !!document.getElementById('inv-opt-kitbash')?.checked;

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
      hasRelevantTalent,
      hasWorkshop,
      isKitBash,

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
    if (daysEl) daysEl.textContent = project.buildTimeDisplay || `${project.estimatedBuildDays} Days`;

    const powerEl = document.getElementById('inv-power-source');
    if (powerEl) {
      powerEl.textContent = `${project.powerSource} (${project.charges})`;
      powerEl.title = `${project.powerSource} (${project.charges})`;
    }

    // Special Requirements Callout (Judge's Book p. 14)
    const specBox = document.getElementById('inv-special-req-box');
    if (specBox && project.specialRequirement) {
      const sr = project.specialRequirement;
      if (sr.requiresSpecial) {
        specBox.style.display = 'block';
        specBox.style.background = 'rgba(245, 158, 11, 0.15)';
        specBox.style.border = '1px solid #f59e0b';
        specBox.style.color = '#fde68a';
        specBox.innerHTML = `<strong>⚠️ Special Requirements (Judge's Book p. 14):</strong> ${sr.summary}`;
      } else {
        specBox.style.display = 'block';
        specBox.style.background = 'rgba(16, 185, 129, 0.1)';
        specBox.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        specBox.style.color = '#a7f3d0';
        specBox.innerHTML = `✓ <strong>Standard Materials:</strong> ${sr.summary}`;
      }
    }

    // Facility & Prototype Warnings
    const facilBox = document.getElementById('inv-facility-warn-box');
    if (facilBox) {
      const warnings = [];
      if (!project.hasWorkshop) {
        warnings.push(`⚠️ <strong>Improvised Facilities:</strong> -1CS to FEATs, 3x build time (Player's Book p. 43).`);
      }
      if (project.isKitBash) {
        warnings.push(`⚡ <strong>Kit-Bash Prototype:</strong> Assembled in hours, -1CS Assembly, temporary 1-scene lifespan (Player's Book p. 43).`);
      }
      if (warnings.length > 0) {
        facilBox.style.display = 'block';
        facilBox.style.background = 'rgba(239, 68, 68, 0.15)';
        facilBox.style.border = '1px solid #ef4444';
        facilBox.style.color = '#fca5a5';
        facilBox.innerHTML = warnings.join('<br>');
      } else {
        facilBox.style.display = 'none';
        facilBox.innerHTML = '';
      }
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

    const bpDescEl = document.getElementById('inv-stage-blueprint-desc');
    if (bpDescEl) {
      const talentText = project.hasRelevantTalent ? ' +1CS Talent' : '';
      const noShopText = !project.hasWorkshop ? ' -1CS Improvised' : '';
      const shiftNotes = (talentText || noShopText) ? ` [${(talentText + noShopText).trim()}]` : '';
      bpDescEl.innerHTML = `${isMagic ? 'Reason / Occult' : 'Reason'} FEAT vs <span id="inv-blueprint-target-text" style="color: #93c5fd; font-weight: 700;">${project.blueprintFeatTarget}</span> (${project.blueprintShift >= 0 ? '+' : ''}${project.blueprintShift} CS${shiftNotes}, Karma allowed)`;
    }

    const resTargetEl = document.getElementById('inv-resource-target-text');
    if (resTargetEl) resTargetEl.textContent = `${project.resourceFeatTarget} (${project.resourceShift >= 0 ? '+' : ''}${project.resourceShift} CS)`;

    const resDescEl = document.getElementById('inv-stage-resource-desc');
    if (resDescEl) {
      const resIdx = UniversalTableEngine.getRankIndex(project.inventorResources);
      const targetIdx = UniversalTableEngine.getRankIndex(project.resourceFeatTarget);
      const rankDiff = (resIdx >= 0 && targetIdx >= 0) ? (resIdx - targetIdx) : 0;
      let reqColorText = 'Green FEAT';
      if (rankDiff >= 3) reqColorText = 'Automatic';
      else if (rankDiff === 0) reqColorText = 'Yellow FEAT';
      else if (rankDiff < 0) reqColorText = 'Red FEAT';

      resDescEl.innerHTML = `Resource FEAT vs <span id="inv-resource-target-text" style="color: #93c5fd; font-weight: 700;">${project.resourceFeatTarget}</span> (${reqColorText}, No Karma per p. 18)`;
    }

    const assTargetEl = document.getElementById('inv-assembly-target-text');
    if (assTargetEl) assTargetEl.textContent = `${project.assemblyFeatTarget} (${project.assemblyShift >= 0 ? '+' : ''}${project.assemblyShift} CS, ${project.buildTimeDisplay})`;

    const assDescEl = document.getElementById('inv-stage-assembly-desc');
    if (assDescEl) {
      const facilNote = project.hasWorkshop ? (isMagic ? 'Sanctum' : 'Workshop') : 'Improvised (-1CS)';
      const kbNote = project.isKitBash ? ', Kit-Bash (-1CS)' : '';
      assDescEl.innerHTML = `${isMagic ? 'Reason / Occult' : 'Reason'} FEAT vs <span id="inv-assembly-target-text" style="color: #93c5fd; font-weight: 700;">${project.assemblyFeatTarget}</span> (${facilNote}${kbNote}, ${project.buildTimeDisplay})`;
    }

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
          <option value="Consumable">Consumable (rune, potion, etc)</option>
        `;
      } else {
        catSelect.innerHTML = `
          <option value="Weapon">Offensive Weapon</option>
          <option value="Battlesuit">Powered Battlesuit / Exosuit</option>
          <option value="Robot/Drone">Robot / Drone (Machines of Doom)</option>
          <option value="Propulsion">Propulsion / Vehicle</option>
          <option value="Utility">Sensory / Utility Device</option>
          <option value="Cybernetics">Cybernetic Enhancement / Implant</option>
          <option value="Consumable">Consumable (gadget, ammo, etc.)</option>
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

    // Update Workshop & Expertise Labels
    const optTitle = document.getElementById('inv-workshop-options-title');
    if (optTitle) {
      optTitle.textContent = isMagic ? '✨ Sanctum & Lore Options (Player\'s Book pp. 41-44)' : '🏭 Workshop & Expertise Options (Player\'s Book pp. 41-44)';
    }

    const optTalentLabel = document.getElementById('inv-opt-talent-label');
    if (optTalentLabel) {
      optTalentLabel.textContent = isMagic ? 'Relevant Mystic / Occult Talent (+1CS)' : 'Relevant Science/Tech Talent (+1CS)';
    }

    const optWorkshopLabel = document.getElementById('inv-opt-workshop-label');
    if (optWorkshopLabel) {
      optWorkshopLabel.textContent = isMagic ? 'Consecrated Sanctum / Ritual Circle' : 'Fully Equipped Workshop / Lab';
    }

    const optKitbashLabel = document.getElementById('inv-opt-kitbash-label');
    if (optKitbashLabel) {
      optKitbashLabel.textContent = isMagic ? 'Makeshift Ritual / Improvised Talisman (1-Scene)' : 'Kit-Bash Prototype (Rush, 1-Scene)';
    }

    this.syncInventionTalentAutoDetect();
    this.handleCalculateInvention();
  },

  handleNewInvention(mouseEvent = null) {
    const nameEl = document.getElementById('inv-name');
    if (nameEl) nameEl.value = '';

    const catEl = document.getElementById('inv-cat');
    if (catEl) catEl.selectedIndex = 0;

    const matEl = document.getElementById('inv-material-rank');
    if (matEl) matEl.value = 'Remarkable';

    const shopChk = document.getElementById('inv-opt-workshop');
    if (shopChk) shopChk.checked = true;

    const kbChk = document.getElementById('inv-opt-kitbash');
    if (kbChk) kbChk.checked = false;

    const talentChk = document.getElementById('inv-opt-talent');
    if (talentChk && talentChk.dataset) {
      delete talentChk.dataset.userInteracted;
    }
    this.syncInventionTalentAutoDetect(true);

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
      const resIdx = UniversalTableEngine.getRankIndex(p.inventorResources);
      const targetIdx = UniversalTableEngine.getRankIndex(p.resourceFeatTarget);
      const rankDiff = (resIdx >= 0 && targetIdx >= 0) ? (resIdx - targetIdx) : 0;
      if (rankDiff >= 3) {
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

      let targetColor = 'Green';
      if (rankDiff === 0) {
        targetColor = 'Yellow';
      } else if (rankDiff < 0) {
        targetColor = 'Red';
      }

      this.openRoller({
        name: isMagic ? `Reagent Procurement: ${p.name}` : `Invention Procurement: ${p.name}`,
        abilityName: `Resources (${p.inventorResources})`,
        initialRank: p.inventorResources,
        shift: p.resourceShift,
        actionType: 'invention_stage',
        inventionStage: 'resource',
        project: p,
        targetColor: targetColor,
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
    let itemName = (p.name && p.name.trim() !== '') ? p.name : defaultName;
    if (p.isKitBash && !itemName.toLowerCase().includes('kit-bash') && !itemName.toLowerCase().includes('prototype')) {
      itemName += ' (Kit-Bashed Prototype)';
    }

    const kitBashNote = p.isKitBash ? " [Kit-Bashed Temporary Prototype: lasts 1 encounter/scene then burns out per Player's Book p. 43]" : "";

    const item = {
      id: 'inv_' + Date.now(),
      name: itemName,
      type: p.category,
      damage: p.powers && p.powers.length ? `${p.powers[0].rankName} (${p.powers[0].rankValue})` : 'None',
      damageValue: p.powers && p.powers.length ? p.powers[0].rankValue : 0,
      range: p.activeBoosts.some(b => b.includes('Extended Range')) ? '6 areas' : '3 areas',
      materialStrength: p.materialRank,
      isKitBash: !!p.isKitBash,
      powers: Array.isArray(p.powers) ? [...p.powers] : [],
      abilityBoosts: Array.isArray(p.abilityBoosts) ? [...p.abilityBoosts] : [],
      notes: `${isMagic ? 'Mystic Forged Relic' : 'Machines of Doom Invention'}${kitBashNote}: Powers: ${pwrNames}. Ability Boosts: ${bstNames}. ${isMagic ? 'Forging' : 'Build'} time: ${p.buildTimeDisplay || p.estimatedBuildDays + ' days'}. ${isMagic ? 'Mystic Conduit' : 'Power source'}: ${p.powerSource}. Boosts: ${p.activeBoosts.join(', ') || 'None'}. Limits: ${p.activeLimits.join(', ') || 'None'}.`,
      equipped: true
    };

    this.character.equipment.push(item);

    // Automatically add to Known Blueprints Archive (Only standard non-kitbash inventions create permanent schematics per Player's Book p. 43)
    if (!p.isKitBash) {
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
    }

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

    const bpMsg = p.isKitBash
      ? ' (Temporary jury-rigged prototype not added to permanent Blueprints archive).'
      : ' Schematic saved to Known Blueprints Archive.';

    this.showCustomAlert(
      `"${item.name}" successfully ${isMagic ? 'consecrated, bound, and equipped' : 'built, calibrated, and installed to Hero\'s Equipment'}!${bpMsg}`,
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
          ${filterText ? 'No blueprints matching search.' : 'No known blueprints yet. Complete a custom invention or reverse-engineer equipment above to master schematics.'}
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

    const totalCP = (this.character.talents || []).reduce((sum, t) => sum + (t.costCP !== undefined ? t.costCP : (t.isStarred ? 20 : 10)), 0);

    if (slotsBadge) {
      slotsBadge.textContent = `${totalCP} CP`;
    }
    if (cardTitle) {
      cardTitle.textContent = `🥋 Talents & Skills (${this.character.talents.length} Learned · ${totalCP} CP)`;
    }

    if (container) {
      container.innerHTML = '';
      this.character.talents.forEach((t, idx) => {
        const card = document.createElement('div');
        card.className = 'attack-card';
        const isStarred = !!t.isStarred;
        const costCP = t.costCP !== undefined ? t.costCP : (isStarred ? 20 : 10);
        const allowsSpec = !!t.allowsSpecialization;

        card.innerHTML = `
          <div class="attack-header">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <button type="button" class="help-circle-btn talent-help-btn" data-help-talent="${(t.name || '').replace(/"/g, '&quot;')}" title="View details for ${(t.name || '').replace(/"/g, '&quot;')}">?</button>
              <strong style="color: #38bdf8; font-size: 11pt;">${t.name}${isStarred ? '*' : ''}</strong>
              ${isStarred ? `<span class="meta-tag tag-starred" title="Starred Talent (20 CP)">★</span>` : ''}
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

        const talentHelpBtn = card.querySelector('.talent-help-btn') || card.querySelector('[data-help-talent]');
        if (talentHelpBtn) {
          talentHelpBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showHelpModal('talent', t.talentId || t.id || t.name);
          });
        }

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
          const talentName = this.character.talents[idx]?.name || 'Talent';
          const res = this.character.removeTalent(idx);
          this.recordCharacterEdit(`Removed talent: ${talentName}`, 'talent');
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
          const cName = this.character.contacts[idx]?.name || 'Contact';
          this.character.contacts.splice(idx, 1);
          this.recordCharacterEdit(`Removed contact: ${cName}`, 'talent');
          this.render();
        });

        cContainer.appendChild(card);
      });
    }
  },

  handleAddTalent(mouseEvent = null) {
    if (this.character && this.character.isCreationSetupPending) {
      this.showStatusToast('⚠️ Please choose your Starting Tier and Physical Form before spending CP.');
      this.openCreationWizardModal();
      return;
    }
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

    this.recordCharacterEdit(`Added talent: ${catTalent.name}`, 'talent');
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
    if (this.character && this.character.isCreationSetupPending) {
      this.showStatusToast('⚠️ Please choose your Starting Tier and Physical Form before spending CP.');
      this.openCreationWizardModal();
      return;
    }
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

    this.recordCharacterEdit(`Added contact: ${name} (${role})`, 'talent');
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

    // Render Financial Resources Card
    const bgResSel = document.getElementById('background-resource-select');
    if (bgResSel && this.character.resources) {
      bgResSel.value = this.character.resources.rankName;
    }

    const bgResVal = document.getElementById('background-resource-val');
    if (bgResVal && this.character.resources) {
      bgResVal.textContent = this.character.resources.rankValue;
    }
  },

  renderCheatSheetTable() {
    const tbody = (typeof this.getCheatSheetEl === 'function') ? this.getCheatSheetEl('cheatsheet-table-body') : document.getElementById('cheatsheet-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const isCMF = (this.universalTableMode === 'cmf');
    const headerRow = (typeof this.getCheatSheetEl === 'function') ? this.getCheatSheetEl('cheatsheet-table-header-row') : document.getElementById('cheatsheet-table-header-row');
    const titleEl = (typeof this.getCheatSheetEl === 'function') ? this.getCheatSheetEl('cheat-table-title') : document.getElementById('cheat-table-title');
    const descEl = (typeof this.getCheatSheetEl === 'function') ? this.getCheatSheetEl('cheat-table-desc') : document.getElementById('cheat-table-desc');

    if (isCMF) {
      if (titleEl) titleEl.textContent = '🎲 Universal Action Table Matrix (CMF 22 Ranks)';
      if (descEl) {
        descEl.innerHTML = 'CMF modified universal action table with 22 ranks (including intermediate <em>Fantastic, Spectacular, Sensational, Awesome</em>) and <strong>Dark Blue Fumble (01-10 down to 01-01)</strong> blunder results:';
      }
      if (headerRow) {
        headerRow.innerHTML = `
          <th style="width: 22%;">Rank &amp; Number</th>
          <th style="width: 15%;"><span class="feat-blue">Dark Blue (Blunder)</span></th>
          <th style="width: 15%;"><span class="feat-white">White (Failure)</span></th>
          <th style="width: 16%;"><span class="feat-green">Green (Standard)</span></th>
          <th style="width: 16%;"><span class="feat-yellow">Yellow (Superior)</span></th>
          <th style="width: 16%;"><span class="feat-red">Red (Critical)</span></th>
        `;
      }

      UniversalTableEngine.ranks.forEach(r => {
        const thresh = (UniversalTableEngine.table && UniversalTableEngine.table[r.name]) || [0, 52, 82, 96];
        const [fumbleMax, greenMin, yellowMin, redMin] = thresh;
        const blueText = fumbleMax > 0 ? (fumbleMax === 1 ? '01' : `01 - ${String(fumbleMax).padStart(2, '0')}`) : 'None';
        let whiteText = '';
        if (fumbleMax === 0) {
          const wMax = greenMin - 1;
          whiteText = wMax > 0 ? `01 - ${String(wMax).padStart(2, '0')}` : 'None';
        } else {
          const wMin = fumbleMax + 1;
          const wMax = greenMin - 1;
          whiteText = (wMin <= wMax) ? `${String(wMin).padStart(2, '0')} - ${String(wMax).padStart(2, '0')}` : 'None';
        }
        const greenText = `${String(greenMin).padStart(2, '0')} - ${String(yellowMin - 1).padStart(2, '0')}`;
        const yellowText = `${String(yellowMin).padStart(2, '0')} - ${String(redMin - 1).padStart(2, '0')}`;
        const redText = `${String(redMin).padStart(2, '0')} - 100`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="rank-name-cell" style="font-weight: 700; color: ${r.color};">${r.name} (${r.num})</td>
          <td class="cell-blue">${blueText}</td>
          <td class="cell-white">${whiteText}</td>
          <td class="cell-green">${greenText}</td>
          <td class="cell-yellow">${yellowText}</td>
          <td class="cell-red">${redText}</td>
        `;
        tbody.appendChild(tr);
      });
    } else {
      if (titleEl) titleEl.textContent = '🎲 Universal Action Table Matrix (All 18 Ranks)';
      if (descEl) {
        descEl.textContent = 'The core engine of the FASERIP system. Roll 1d100 (percentile dice) and cross-reference rank to determine FEAT color result:';
      }
      if (headerRow) {
        headerRow.innerHTML = `
          <th>Rank &amp; Number</th>
          <th><span class="feat-white">White (Failure)</span></th>
          <th><span class="feat-green">Green (Standard)</span></th>
          <th><span class="feat-yellow">Yellow (Superior)</span></th>
          <th><span class="feat-red">Red (Critical)</span></th>
        `;
      }

      UniversalTableEngine.ranks.forEach(r => {
        const thresh = (UniversalTableEngine.table && UniversalTableEngine.table[r.name]) || [51, 81, 98];
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
    }
  },

  renderCheatSheetMaterials() {
    const tbody = (typeof this.getCheatSheetEl === 'function')
      ? this.getCheatSheetEl('cheatsheet-materials-body')
      : document.getElementById('cheatsheet-materials-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const badge = (typeof this.getCheatSheetEl === 'function')
      ? this.getCheatSheetEl('cheat-materials-scheme-badge')
      : document.getElementById('cheat-materials-scheme-badge');

    const isCMF = (this.universalTableMode === 'cmf');
    if (badge) {
      badge.textContent = isCMF ? 'CMF Scheme (22 Ranks)' : 'Standard TSR Scheme (18 Ranks)';
    }

    const matList = (typeof getMaterialStrengths === 'function')
      ? getMaterialStrengths()
      : (globalThis.MATERIAL_STRENGTHS || []);

    matList.forEach(m => {
      const rObj = (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.getRankByName)
        ? UniversalTableEngine.getRankByName(m.rank)
        : null;
      const rankColor = rObj ? rObj.color : '#38bdf8';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="rank-name-cell" style="font-weight: 700; color: ${rankColor};">${m.rank}</td>
        <td style="font-weight: 600; text-align: center;">${m.num}</td>
        <td>
          <strong style="color: var(--text-main);">${m.name}</strong>
          <div style="font-size: 0.88em; color: var(--text-muted, #94a3b8); margin-top: 2px;">${m.examples}</div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderCheatSheetMovement() {
    const groundTbody = (typeof this.getCheatSheetEl === 'function')
      ? this.getCheatSheetEl('cheatsheet-ground-movement-body')
      : document.getElementById('cheatsheet-ground-movement-body');
    const airTbody = (typeof this.getCheatSheetEl === 'function')
      ? this.getCheatSheetEl('cheatsheet-air-movement-body')
      : document.getElementById('cheatsheet-air-movement-body');

    const mode = this.universalTableMode || 'cmf';
    const isCMF = (mode === 'cmf');

    const groundBadge = (typeof this.getCheatSheetEl === 'function')
      ? this.getCheatSheetEl('cheat-ground-movement-scheme-badge')
      : document.getElementById('cheat-ground-movement-scheme-badge');
    const airBadge = (typeof this.getCheatSheetEl === 'function')
      ? this.getCheatSheetEl('cheat-air-movement-scheme-badge')
      : document.getElementById('cheat-air-movement-scheme-badge');

    const badgeText = isCMF ? 'CMF Scheme (22 Ranks)' : 'Standard TSR Scheme (18 Ranks)';
    if (groundBadge) groundBadge.textContent = badgeText;
    if (airBadge) airBadge.textContent = badgeText;

    if (groundTbody) {
      groundTbody.innerHTML = '';
      const groundList = (typeof getGroundMovementTable === 'function')
        ? getGroundMovementTable(mode)
        : (globalThis.CMF_GROUND_MOVEMENT || []);

      groundList.forEach(row => {
        const rObj = (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.getRankByName)
          ? UniversalTableEngine.getRankByName(row.rank)
          : null;
        const rankColor = rObj ? rObj.color : '#38bdf8';
        const numLabel = (row.num !== undefined && row.num < 10000) ? ` (${row.num})` : '';

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="rank-name-cell" style="font-weight: 700; color: ${rankColor};">${row.rank}${numLabel}</td>
          <td style="font-weight: 600; text-align: center;">${row.areas}</td>
          <td style="text-align: center;">${row.mph} mph</td>
          <td style="text-align: center;">${row.feetTurn}</td>
          <td style="text-align: center;">${row.feetSec}</td>
          <td>${row.notes}</td>
        `;
        groundTbody.appendChild(tr);
      });
    }

    if (airTbody) {
      airTbody.innerHTML = '';
      const airList = (typeof getAirMovementTable === 'function')
        ? getAirMovementTable(mode)
        : (globalThis.CMF_AIR_MOVEMENT || []);

      airList.forEach(row => {
        const rObj = (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.getRankByName)
          ? UniversalTableEngine.getRankByName(row.rank)
          : null;
        const rankColor = rObj ? rObj.color : '#38bdf8';
        const numLabel = (row.num !== undefined && row.num < 10000) ? ` (${row.num})` : '';

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="rank-name-cell" style="font-weight: 700; color: ${rankColor};">${row.rank}${numLabel}</td>
          <td style="font-weight: 600; text-align: center;">${row.combatAreas}</td>
          <td style="text-align: center;">${row.mph}</td>
          <td style="font-weight: 600; color: var(--text-main);">${row.category}</td>
          <td>${row.notes}</td>
        `;
        airTbody.appendChild(tr);
      });
    }
  },

  /* Roller Window & Dialog Logic */
  getRollerBox() {
    if (this.rollerPopoutWindow && !this.rollerPopoutWindow.closed) {
      try {
        const box = this.rollerPopoutWindow.document.querySelector('.modal-box.roller-compact');
        if (box) return box;
      } catch (e) {}
    }
    return document.querySelector('.modal-box.roller-compact');
  },

  getRollerEl(id) {
    const box = this.getRollerBox();
    if (box) {
      const el = box.querySelector(`#${id}`);
      if (el) return el;
    }
    return document.getElementById(id);
  },

  isRollerPoppedOut() {
    return !!(this.rollerPopoutWindow && !this.rollerPopoutWindow.closed);
  },

  initRollerWindow() {
    const modal = document.getElementById('roller-modal');
    const modalBox = modal ? modal.querySelector('.modal-box.roller-compact') : null;

    // Close child popout window if main page unloads/reloads
    window.addEventListener('beforeunload', () => {
      if (this.rollerPopoutWindow && !this.rollerPopoutWindow.closed) {
        try {
          this.rollerPopoutWindow.close();
        } catch (e) {}
      }
    });

    // Auto-adjust modal boundaries on window resize when docked
    window.addEventListener('resize', () => {
      if (!this.isRollerPoppedOut()) {
        this.adjustRollerModalBounds();
      }
    });

    // Delegated event listener directly on modalBox so all interactions work in main window OR pop-out window
    if (modalBox) {
      modalBox.addEventListener('click', (e) => {
        // Popout / Dock toggle
        const popBtn = e.target.closest('#btn-roller-popout');
        if (popBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.toggleRollerPopout();
          return;
        }

        // Close / Dock
        const closeBtn = e.target.closest('.modal-close, .modal-close-btn');
        if (closeBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.closeRoller();
          return;
        }

        // Roll Trigger
        const rollBtn = e.target.closest('#btn-roller-roll');
        if (rollBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.executeRollerFEAT();
          return;
        }

        // Column shift down (-1 CS)
        const shiftDownBtn = e.target.closest('#btn-roller-shift-down');
        if (shiftDownBtn) {
          e.preventDefault();
          e.stopPropagation();
          if (this.rollerShift > -5) {
            this.rollerShift--;
            this.updateRollerPreview();
          }
          return;
        }

        // Column shift up (+1 CS)
        const shiftUpBtn = e.target.closest('#btn-roller-shift-up');
        if (shiftUpBtn) {
          e.preventDefault();
          e.stopPropagation();
          if (this.rollerShift < 5) {
            this.rollerShift++;
            this.updateRollerPreview();
          }
          return;
        }

        // Karma spending steppers & Clear button
        const btnKClear = e.target.closest('#btn-karma-spend-clear');
        if (btnKClear) {
          e.preventDefault();
          e.stopPropagation();
          this.updateKarmaSpend(0);
          return;
        }

        const btnKMinus10 = e.target.closest('#btn-karma-spend-minus10');
        if (btnKMinus10) {
          e.preventDefault();
          e.stopPropagation();
          this.updateKarmaSpend(this.rollerKarmaSpend - 10);
          return;
        }
        const btnKMinus1 = e.target.closest('#btn-karma-spend-minus1');
        if (btnKMinus1) {
          e.preventDefault();
          e.stopPropagation();
          this.updateKarmaSpend(this.rollerKarmaSpend - 1);
          return;
        }
        const btnKPlus1 = e.target.closest('#btn-karma-spend-plus1');
        if (btnKPlus1) {
          e.preventDefault();
          e.stopPropagation();
          this.updateKarmaSpend(this.rollerKarmaSpend + 1);
          return;
        }
        const btnKPlus10 = e.target.closest('#btn-karma-spend-plus10');
        if (btnKPlus10) {
          e.preventDefault();
          e.stopPropagation();
          this.updateKarmaSpend(this.rollerKarmaSpend + 10);
          return;
        }
      });

      modalBox.addEventListener('input', (e) => {
        if (e.target.id === 'roller-karma-spend-input') {
          const val = parseInt(e.target.value) || 0;
          this.updateKarmaSpend(val);
        }
      });

      modalBox.addEventListener('change', (e) => {
        if (e.target.id === 'roller-check-karmic-success') {
          this.setKarmicSuccess(e.target.checked);
          this.showStatusToast(e.target.checked 
            ? '✨ Karmic Success ENABLED (refund up to 20 KP on Blue shift)' 
            : 'Karmic Success disabled');
        }
      });
    }
  },

  updateKarmaSpend(newVal) {
    // Karma added to d100 roll (clamped between 0 and 100)
    this.rollerKarmaSpend = Math.max(0, Math.min(100, isNaN(newVal) ? 0 : newVal));
    const inp = this.getRollerEl('roller-karma-spend-input');
    if (inp) inp.value = this.rollerKarmaSpend;
    this.updateRollerKarmaDisplay();
  },

  updateRollerKarmaDisplay() {
    const diceVisual = this.getRollerEl('roller-dice-num');
    if (diceVisual) {
      diceVisual.innerHTML = `-- <span class="dice-kp-badge">+ ${this.rollerKarmaSpend || 0} KP</span>`;
      diceVisual.style.borderColor = 'var(--border-color)';
      diceVisual.style.color = '#fff';
    }
    this.highlightRollerColor(null);
    const effectEl = this.getRollerEl('roller-effect-desc');
    const effectBox = effectEl ? effectEl.closest('.battle-effect-box') : null;
    if (effectEl) {
      effectEl.innerHTML = '';
      if (effectBox) effectBox.style.display = 'none';
    }
  },

  saveRollerPopoutGeometry() {
    const pop = this.rollerPopoutWindow;
    if (!pop || pop.closed) return;
    try {
      const x = pop.screenX !== undefined ? pop.screenX : pop.screenLeft;
      const y = pop.screenY !== undefined ? pop.screenY : pop.screenTop;
      const w = pop.outerWidth || pop.innerWidth;
      const h = pop.outerHeight || pop.innerHeight;
      if (typeof x === 'number' && typeof y === 'number' && typeof w === 'number' && typeof h === 'number' && w >= 250 && h >= 250) {
        const geo = {
          width: Math.round(w),
          height: Math.round(h),
          left: Math.round(x),
          top: Math.round(y)
        };
        localStorage.setItem('msh_roller_popout_geometry', JSON.stringify(geo));
      }
    } catch (e) {}
  },

  getRollerPopoutGeometry() {
    try {
      const stored = localStorage.getItem('msh_roller_popout_geometry');
      if (stored) {
        const geo = JSON.parse(stored);
        if (geo && typeof geo.width === 'number' && typeof geo.height === 'number') {
          const width = Math.max(320, Math.min(geo.width, 2560));
          const height = Math.max(280, Math.min(geo.height, 1600));
          const left = (typeof geo.left === 'number' && !isNaN(geo.left) && Math.abs(geo.left) < 30000) ? Math.round(geo.left) : null;
          const top = (typeof geo.top === 'number' && !isNaN(geo.top) && Math.abs(geo.top) < 30000) ? Math.round(geo.top) : null;
          return { width, height, left, top };
        }
      }
    } catch (e) {}
    return null;
  },

  toggleRollerPopout() {
    if (this.isRollerPoppedOut()) {
      this.dockRoller(true);
    } else {
      this.popoutRoller();
    }
  },

  popoutRoller() {
    const modal = document.getElementById('roller-modal');
    const modalBox = document.querySelector('.modal-box.roller-compact');
    if (!modalBox) return;

    if (this.isRollerPoppedOut()) {
      try {
        this.rollerPopoutWindow.focus();
      } catch (e) {}
      return;
    }

    const savedGeo = this.getRollerPopoutGeometry();
    let width = 560;
    let height = 650;
    let left = null;
    let top = null;

    if (savedGeo) {
      width = savedGeo.width;
      height = savedGeo.height;
      if (savedGeo.left !== null && savedGeo.top !== null) {
        left = savedGeo.left;
        top = savedGeo.top;
      }
    }

    if (left === null || top === null) {
      const screenLeft = (window.screenX !== undefined ? window.screenX : window.screenLeft || 0);
      const screenTop = (window.screenY !== undefined ? window.screenY : window.screenTop || 0);
      const outerW = window.outerWidth || window.innerWidth || 1200;
      left = Math.max(20, screenLeft + outerW - width - 40);
      top = Math.max(20, screenTop + 60);
    }

    let pop = null;
    try {
      pop = window.open('', 'MSH_Universal_Table_Roller', `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`);
      if (pop && !pop.closed) {
        try {
          pop.resizeTo(width, height);
          pop.moveTo(left, top);
        } catch (e) {}
      }
    } catch (err) {
      console.warn('window.open error:', err);
    }

    if (!pop || pop.closed || typeof pop.closed === 'undefined') {
      this.showStatusToast('⚠️ Pop-out window blocked by browser. Please allow popups for this site.');
      return;
    }

    this.rollerPopoutWindow = pop;
    this.rollerPoppedOut = true;

    if (modal) {
      modal.classList.remove('open');
      modal.classList.remove('popped-out');
    }

    const popDoc = pop.document;
    popDoc.open();
    popDoc.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Universal Table FEAT Roller - Marvel Super Heroes</title>
</head>
<body>
  <div class="roller-popout-shell" id="roller-popout-shell"></div>
</body>
</html>`);
    popDoc.close();

    // Copy head link & style elements for fonts and styling
    document.querySelectorAll('link[rel="stylesheet"], style').forEach(node => {
      try {
        popDoc.head.appendChild(node.cloneNode(true));
      } catch (e) {}
    });

    // Popout shell & container styling
    const popStyle = popDoc.createElement('style');
    popStyle.textContent = `
      html, body {
        margin: 0;
        padding: 0;
        min-height: 100%;
        box-sizing: border-box;
      }
      body {
        padding: 12px;
        background: var(--bg-dark, #0b0f19);
        color: var(--text-main, #f1f5f9);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        overflow-y: auto;
      }
      .roller-popout-shell {
        width: 100%;
        max-width: 100%;
        display: flex;
        justify-content: center;
      }
      .modal-box.roller-compact {
        width: 100% !important;
        max-width: 100% !important;
        position: static !important;
        margin: 0 !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
        border: 1px solid var(--border-color, #334155) !important;
        max-height: none !important;
        height: auto !important;
        resize: none !important;
        display: flex !important;
      }
      .modal-header.compact {
        cursor: default !important;
      }
    `;
    popDoc.head.appendChild(popStyle);

    // Sync theme
    const theme = document.body.getAttribute('data-theme');
    if (theme) popDoc.body.setAttribute('data-theme', theme);

    // Move modalBox into popout document
    if (!this.rollerPlaceholder) {
      this.rollerPlaceholder = document.createComment('roller-modal-box-placeholder');
    }
    if (modalBox.parentNode) {
      modalBox.parentNode.insertBefore(this.rollerPlaceholder, modalBox);
    }
    const mount = popDoc.getElementById('roller-popout-shell');
    if (mount) {
      mount.appendChild(modalBox);
    }

    // Update Pop-out button to Dock
    const popBtn = this.getRollerEl('btn-roller-popout');
    if (popBtn) {
      popBtn.textContent = '↘ Dock';
      popBtn.title = 'Dock roller back into main sheet window';
    }

    // Track resizing and movements
    pop.addEventListener('resize', () => {
      this.saveRollerPopoutGeometry();
    });

    // Automatic restoration when popout window closes
    let returned = false;
    const returnModal = () => {
      if (returned) return;
      this.saveRollerPopoutGeometry();
      returned = true;
      if (this.rollerPlaceholder && this.rollerPlaceholder.parentNode) {
        this.rollerPlaceholder.parentNode.insertBefore(modalBox, this.rollerPlaceholder);
        this.rollerPlaceholder.remove();
        this.rollerPlaceholder = null;
      } else {
        const m = document.getElementById('roller-modal');
        if (m && !m.contains(modalBox)) m.appendChild(modalBox);
      }
      this.rollerPopoutWindow = null;
      this.rollerPoppedOut = false;
      modalBox.style.width = '';
      modalBox.style.height = '';
      modalBox.style.position = '';
      modalBox.style.left = '';
      modalBox.style.top = '';
      modalBox.style.margin = '';
      const b = document.getElementById('btn-roller-popout');
      if (b) {
        b.textContent = '↗ Pop-out';
        b.title = 'Pop-out into separate window';
      }
    };

    pop.addEventListener('beforeunload', returnModal);
    pop.addEventListener('unload', returnModal);

    // Watcher interval in case pop window is moved or terminated abruptly
    const checkInterval = setInterval(() => {
      if (!this.rollerPopoutWindow || this.rollerPopoutWindow.closed) {
        clearInterval(checkInterval);
        returnModal();
      } else {
        this.saveRollerPopoutGeometry();
      }
    }, 400);

    this.updateRollerPreview();
    try {
      pop.focus();
    } catch (e) {}

    this.showStatusToast('↗ Die Roller popped out into separate window');
  },

  dockRoller(keepOpenInPage = true) {
    const pop = this.rollerPopoutWindow;
    if (pop && !pop.closed) {
      this.saveRollerPopoutGeometry();
      try {
        pop.close();
      } catch (e) {}
    }
    this.rollerPopoutWindow = null;
    this.rollerPoppedOut = false;

    const modalBox = document.querySelector('.modal-box.roller-compact');
    if (this.rollerPlaceholder && this.rollerPlaceholder.parentNode && modalBox) {
      this.rollerPlaceholder.parentNode.insertBefore(modalBox, this.rollerPlaceholder);
      this.rollerPlaceholder.remove();
      this.rollerPlaceholder = null;
    } else if (modalBox) {
      const m = document.getElementById('roller-modal');
      if (m && !m.contains(modalBox)) m.appendChild(modalBox);
    }

    if (modalBox) {
      modalBox.style.width = '';
      modalBox.style.height = '';
      modalBox.style.position = '';
      modalBox.style.left = '';
      modalBox.style.top = '';
      modalBox.style.margin = '';
    }

    const popBtn = document.getElementById('btn-roller-popout');
    if (popBtn) {
      popBtn.textContent = '↗ Pop-out';
      popBtn.title = 'Pop-out into separate window';
    }

    const modal = document.getElementById('roller-modal');
    if (modal) {
      if (keepOpenInPage) {
        modal.classList.add('open');
        this.positionRollerModal(null);
        this.adjustRollerModalBounds();
      } else {
        modal.classList.remove('open');
      }
    }
    this.showStatusToast('↘ Die Roller docked back into main window');
  },

  closeRoller() {
    if (this.isRollerPoppedOut()) {
      this.dockRoller(false);
    } else {
      const modal = document.getElementById('roller-modal');
      if (modal) modal.classList.remove('open');
    }
  },

  positionRollerModal(clickEvent = null) {
    const modal = document.getElementById('roller-modal');
    const modalBox = modal ? modal.querySelector('.modal-box.roller-compact') : null;
    if (!modalBox) return;

    if (this.isRollerPoppedOut()) return;

    const viewW = window.innerWidth || 1200;
    const viewH = window.innerHeight || 800;

    modalBox.style.maxHeight = `${Math.max(280, viewH - 24)}px`;

    const modalW = modalBox.offsetWidth || 540;
    const modalH = modalBox.offsetHeight || 380;

    // Calculate center of the roll button (#btn-roller-roll) relative to modalBox
    const rollBtn = modalBox.querySelector('#btn-roller-roll');
    let btnCenterX = modalW / 2;
    let btnCenterY = 150;

    if (rollBtn) {
      const boxRect = modalBox.getBoundingClientRect();
      const btnRect = rollBtn.getBoundingClientRect();
      if (btnRect.width > 0 && btnRect.height > 0) {
        btnCenterX = (btnRect.left - boxRect.left) + (btnRect.width / 2);
        btnCenterY = (btnRect.top - boxRect.top) + (btnRect.height / 2);
      }
    }

    let targetLeft = 0;
    let targetTop = 0;

    if (clickEvent && typeof clickEvent.clientX === 'number') {
      targetLeft = clickEvent.clientX - btnCenterX;
      targetTop = clickEvent.clientY - btnCenterY;
    } else {
      targetLeft = (viewW - modalW) / 2;
      targetTop = (viewH - modalH) / 2;
    }

    targetLeft = Math.max(10, Math.min(targetLeft, Math.max(10, viewW - modalW - 10)));
    targetTop = Math.max(10, Math.min(targetTop, Math.max(10, viewH - modalH - 10)));

    modalBox.style.position = 'fixed';
    modalBox.style.left = `${Math.round(targetLeft)}px`;
    modalBox.style.top = `${Math.round(targetTop)}px`;
    modalBox.style.margin = '0';
    modalBox.style.maxHeight = `${Math.max(260, viewH - targetTop - 10)}px`;

    // Micro-correction: ensure mouse is precisely centered over the roll button
    if (rollBtn && clickEvent && typeof clickEvent.clientX === 'number') {
      const finalBtnRect = rollBtn.getBoundingClientRect();
      if (finalBtnRect.width > 0 && finalBtnRect.height > 0) {
        const currentBtnCenterX = finalBtnRect.left + (finalBtnRect.width / 2);
        const currentBtnCenterY = finalBtnRect.top + (finalBtnRect.height / 2);
        const diffX = clickEvent.clientX - currentBtnCenterX;
        const diffY = clickEvent.clientY - currentBtnCenterY;

        if (Math.abs(diffX) > 0.5 || Math.abs(diffY) > 0.5) {
          targetLeft += diffX;
          targetTop += diffY;
          targetLeft = Math.max(10, Math.min(targetLeft, Math.max(10, viewW - modalW - 10)));
          targetTop = Math.max(10, Math.min(targetTop, Math.max(10, viewH - modalH - 10)));
          modalBox.style.left = `${Math.round(targetLeft)}px`;
          modalBox.style.top = `${Math.round(targetTop)}px`;
        }
      }
    }
  },

  adjustRollerModalBounds() {
    if (this.isRollerPoppedOut()) return;
    const modal = document.getElementById('roller-modal');
    const modalBox = modal ? modal.querySelector('.modal-box.roller-compact') : null;
    if (!modalBox || !modal || !modal.classList.contains('open')) return;

    const viewH = window.innerHeight || 800;
    const viewW = window.innerWidth || 1200;
    const rect = modalBox.getBoundingClientRect ? modalBox.getBoundingClientRect() : {
      bottom: (parseInt(modalBox.style.top) || 0) + (modalBox.offsetHeight || 440),
      right: (parseInt(modalBox.style.left) || 0) + (modalBox.offsetWidth || 540),
      top: parseInt(modalBox.style.top) || 0,
      left: parseInt(modalBox.style.left) || 0,
      height: modalBox.offsetHeight || 440,
      width: modalBox.offsetWidth || 540
    };

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

    if (rect.right > viewW - 10) {
      const overflowX = rect.right - (viewW - 10);
      const currentLeft = parseInt(modalBox.style.left) || rect.left || 10;
      modalBox.style.left = `${Math.max(10, Math.round(currentLeft - overflowX))}px`;
    }
  },

  highlightRollerColor(winningColor) {
    const box = this.getRollerBox();
    if (!box) return;
    const threshBoxes = box.querySelectorAll('.thresh-box');
    threshBoxes.forEach(el => {
      el.classList.remove('lit', 'dimmed');
    });

    if (!winningColor) return;

    const norm = String(winningColor).trim().toLowerCase();
    threshBoxes.forEach(el => {
      const colAttr = (el.getAttribute('data-color') || '').toLowerCase();
      const isMatch = el.classList.contains(norm) || colAttr === norm;
      if (isMatch) {
        el.classList.add('lit');
      } else if (el.style.display !== 'none') {
        el.classList.add('dimmed');
      }
    });
  },

  openRoller(params, clickEvent = null) {
    this.activeRoller = { ...params, actionShift: params.shift || 0 };
    this.rollerShift = params.shift || 0;
    this.rollerKarmaSpend = 0;

    const modal = document.getElementById('roller-modal');
    const titleEl = this.getRollerEl('roller-title');
    if (titleEl) titleEl.textContent = params.name;
    const abilityEl = this.getRollerEl('roller-ability');
    if (abilityEl) abilityEl.textContent = params.abilityName;

    // Reset pre-roll Karma expenditure
    const availKarmaEl = this.getRollerEl('roller-avail-karma');
    if (availKarmaEl) {
      availKarmaEl.textContent = (this.karmaMode === 'test') ? '∞' : (this.character ? this.character.currentKarma : 0);
    }
    const karmaInp = this.getRollerEl('roller-karma-spend-input');
    if (karmaInp) {
      karmaInp.value = '0';
    }

    // Sync Karmic Success House Rule checkbox in roller
    const rollerKarmicCheck = this.getRollerEl('roller-check-karmic-success');
    if (rollerKarmicCheck) {
      rollerKarmicCheck.checked = !!this.karmicSuccess;
    }

    // Per TSR Player's Book p. 18: Karma may NEVER be added to Resource FEATs
    const currentBox = this.getRollerBox();
    const karmaSpendRow = currentBox ? currentBox.querySelector('.roller-karma-spend-row') : null;
    const karmaHintEl = currentBox ? currentBox.querySelector('.karma-spend-label .karma-avail-hint') : null;
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
      const isTest = this.karmaMode === 'test';
      if (karmaHintEl) {
        const availText = isTest ? '∞' : (this.character ? this.character.currentKarma : 0);
        karmaHintEl.innerHTML = `(Avail: <strong id="roller-avail-karma">${availText}</strong> KP)`;
      }
    }

    const diceVisual = this.getRollerEl('roller-dice-num');
    if (diceVisual) {
      diceVisual.innerHTML = '-- <span class="dice-kp-badge">+ 0 KP</span>';
      diceVisual.style.borderColor = 'var(--border-color)';
      diceVisual.style.color = '#fff';
    }

    const effectEl = this.getRollerEl('roller-effect-desc');
    const effectBox = effectEl ? effectEl.closest('.battle-effect-box') : null;
    if (effectEl) {
      effectEl.innerHTML = '';
      if (effectBox) effectBox.style.display = 'none';
    }
    this.highlightRollerColor(null);

    this.updateRollerPreview();

    if (this.isRollerPoppedOut()) {
      try {
        this.rollerPopoutWindow.focus();
      } catch (e) {}
    } else {
      if (modal) {
        modal.classList.add('open');
        this.positionRollerModal(clickEvent);
        this.adjustRollerModalBounds();
      }
    }
  },

  updateRollerPreview() {
    if (!this.activeRoller) return;
    const shift = this.rollerShift || 0;
    const shiftValEl = this.getRollerEl('roller-shift-val');
    if (shiftValEl) {
      shiftValEl.textContent = (shift >= 0 ? '+' : '') + shift + ' CS';
    }

    this.highlightRollerColor(null);
    const effectEl = this.getRollerEl('roller-effect-desc');
    const effectBox = effectEl ? effectEl.closest('.battle-effect-box') : null;
    if (effectEl) {
      effectEl.innerHTML = '';
      if (effectBox) effectBox.style.display = 'none';
    }

    const isCMF = (typeof UniversalTableEngine !== 'undefined' && UniversalTableEngine.tableMode === 'cmf');
    const blueBox = this.getRollerEl('roller-thresh-blue-box');
    if (blueBox) {
      blueBox.style.display = isCMF ? 'flex' : 'none';
    }

    const effRank = UniversalTableEngine.applyColumnShift(this.activeRoller.initialRank, shift);

    const prevEl = this.getRollerEl('roller-rank-preview');
    if (prevEl) {
      prevEl.textContent = `${effRank.name} (${effRank.num})`;
      prevEl.style.color = effRank.color;
    }

    if (isCMF) {
      const thresh = (UniversalTableEngine.table && UniversalTableEngine.table[effRank.name]) || [0, 52, 82, 96];
      const [fumbleMax, greenMin, yellowMin, redMin] = thresh;

      const blueEl = this.getRollerEl('roller-thresh-blue');
      if (blueEl) {
        blueEl.textContent = fumbleMax > 0 ? (fumbleMax === 1 ? '01' : `01-${String(fumbleMax).padStart(2, '0')}`) : 'None';
      }
      const whiteEl = this.getRollerEl('roller-thresh-white');
      if (whiteEl) {
        if (fumbleMax === 0) {
          const wMax = greenMin - 1;
          whiteEl.textContent = wMax > 0 ? `01-${String(wMax).padStart(2, '0')}` : 'None';
        } else {
          const wMin = fumbleMax + 1;
          const wMax = greenMin - 1;
          whiteEl.textContent = (wMin <= wMax) ? `${String(wMin).padStart(2, '0')}-${String(wMax).padStart(2, '0')}` : 'None';
        }
      }
      const greenEl = this.getRollerEl('roller-thresh-green');
      if (greenEl) greenEl.textContent = `${greenMin}+`;
      const yellowEl = this.getRollerEl('roller-thresh-yellow');
      if (yellowEl) yellowEl.textContent = `${yellowMin}+`;
      const redEl = this.getRollerEl('roller-thresh-red');
      if (redEl) redEl.textContent = `${redMin}+`;
    } else {
      const thresh = (UniversalTableEngine.table && UniversalTableEngine.table[effRank.name]) || [51, 81, 98];
      const whiteMax = Math.max(0, thresh[0] - 1);
      const whiteEl = this.getRollerEl('roller-thresh-white');
      if (whiteEl) {
        whiteEl.textContent = whiteMax > 0 ? `01-${String(whiteMax).padStart(2, '0')}` : 'None';
      }
      const greenEl = this.getRollerEl('roller-thresh-green');
      if (greenEl) greenEl.textContent = `${thresh[0]}+`;
      const yellowEl = this.getRollerEl('roller-thresh-yellow');
      if (yellowEl) yellowEl.textContent = `${thresh[1]}+`;
      const redEl = this.getRollerEl('roller-thresh-red');
      if (redEl) redEl.textContent = `${thresh[2]}+`;
    }

    // Update CS Details Row below action row
    const csDetailsEl = this.getRollerEl('roller-cs-details-text');
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
    if (!this.isRollerPoppedOut()) {
      this.adjustRollerModalBounds();
    }
  },

  executeRollerFEAT(forcedRoll = null) {
    if (!this.activeRoller) return;
    const shift = this.rollerShift || 0;
    const isResourceFEAT = !!(this.activeRoller && this.activeRoller.isResourceFEAT);
    
    // Commit and deduct pre-roll Karma expenditure (Disallowed for Resource FEATs per Player's Book p. 18)
    let spentKarma = 0;
    const isTestMode = this.karmaMode === 'test';
    if (!isResourceFEAT) {
      spentKarma = Math.max(0, this.rollerKarmaSpend || 0);
      if (spentKarma > 0 && this.character && !isTestMode) {
        const availKarma = Math.max(0, this.character.currentKarma || 0);
        const deduction = Math.min(availKarma, spentKarma);
        if (deduction > 0) {
          this.character.updateKarma(-deduction, `Pre-roll Karma committed on ${this.activeRoller.name}`);
          this.saveState();
          this.renderVitals();
          const availKarmaEl = this.getRollerEl('roller-avail-karma');
          if (availKarmaEl) availKarmaEl.textContent = this.character.currentKarma;
        }
      }
    }
    this.rollerKarmaSpend = 0;
    const spendInp = this.getRollerEl('roller-karma-spend-input');
    if (spendInp) spendInp.value = '0';

    let rawRoll = forcedRoll;
    if (typeof rawRoll !== 'number' || isNaN(rawRoll) || rawRoll < 1 || rawRoll > 100) {
      rawRoll = Math.floor(Math.random() * 100) + 1;
    }

    const finalRoll = Math.min(100, rawRoll + spentKarma);

    const featResult = UniversalTableEngine.resolveFEAT(this.activeRoller.initialRank, finalRoll, shift);
    const rawResult = UniversalTableEngine.resolveFEAT(this.activeRoller.initialRank, rawRoll, shift);

    // Karmic Success House Rule:
    // When a player spending KP shifts a blue result to something higher,
    // they get back up to 20 KP of any KP they spent.
    const isKarmicSuccess = !!(
      this.karmicSuccess &&
      spentKarma > 0 &&
      rawResult.color === 'Blue' &&
      featResult.color !== 'Blue'
    );
    const refundKarma = isKarmicSuccess ? Math.min(20, spentKarma) : 0;

    // Track last Karma spent on a roll for vitals display & persistence
    this.lastKarmaSpentOnRoll = {
      spent: spentKarma,
      refund: refundKarma,
      name: this.activeRoller ? this.activeRoller.name : 'FEAT Roll'
    };
    if (this.character) {
      this.character.lastKarmaSpentOnRoll = this.lastKarmaSpentOnRoll;
    }

    if (isKarmicSuccess && refundKarma > 0 && this.character && !isTestMode) {
      this.character.updateKarma(refundKarma, `✨ Karmic Success refund (+${refundKarma} KP on Blue shift)`);
      this.saveState();
      const availKarmaEl = this.getRollerEl('roller-avail-karma');
      if (availKarmaEl) availKarmaEl.textContent = this.character.currentKarma;
    } else if (this.character) {
      this.saveState();
    }

    this.renderVitals();

    if (isKarmicSuccess) {
      this.showStatusToast(`✨ Karmic Success! Blue result shifted to ${featResult.color} FEAT (+${refundKarma} KP refunded)`);
    }

    const battleEffect = UniversalTableEngine.getBattleEffect(
      this.activeRoller.actionType,
      featResult.color,
      this.activeRoller.damageValue
    );

    const isManilla = document.body && document.body.getAttribute('data-theme') === 'manilla';
    const colorMap = {
      'Blue': isManilla ? '#1e3a8a' : '#38bdf8',
      'White': isManilla ? '#000000' : '#cbd5e1',
      'Green': isManilla ? '#065f46' : '#10b981',
      'Yellow': isManilla ? '#78350f' : '#f59e0b',
      'Red': isManilla ? '#991b1b' : '#ef4444'
    };
    const c = colorMap[featResult.color] || '#fff';

    // Show '[roll] + [KP] KP' in the roll result's box with colored KP badge
    const diceVisual = this.getRollerEl('roller-dice-num');
    if (diceVisual) {
      const refundBadge = (isKarmicSuccess && refundKarma > 0)
        ? ` <span class="karmic-refund-badge" title="Karmic Success: +${refundKarma} KP refunded">(↩+${refundKarma})</span>`
        : '';
      diceVisual.innerHTML = `${rawRoll} <span class="dice-kp-badge">+ ${spentKarma} KP${refundBadge}</span>`;
      diceVisual.style.borderColor = c;
      diceVisual.style.color = c;
    }

    // Highlight winning color in the color result row
    this.highlightRollerColor(featResult.color);

    // Update CS Details Row below action row
    const csDetailsEl = this.getRollerEl('roller-cs-details-text');
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

    const effectEl = this.getRollerEl('roller-effect-desc');
    const effectBox = effectEl ? effectEl.closest('.battle-effect-box') : null;
    if (effectEl) {
      const labelText = featResult.color === 'Blue' ? 'DARK BLUE FUMBLE!' : `${featResult.color.toUpperCase()} FEAT!`;
      let effectHtml = `<span style="color:${c}; font-weight:900; font-size:11pt;">${labelText} (${finalRoll} on ${featResult.effectiveRank})</span><div style="color:var(--text-main); font-size:10pt; margin-top: 2px;">${battleEffect.desc}</div>`;
      if (isKarmicSuccess) {
        effectHtml += `
          <div class="karmic-success-callout">
            <span style="font-size: 14pt;">✨</span>
            <div>
              <strong>Karmic Success Triggered!</strong><br>
              Raw roll was a <strong>Blue fumble (${rawRoll})</strong>. By spending <strong>${spentKarma} KP</strong>, you successfully shifted it to a <strong>${featResult.color} FEAT</strong>!<br>
              House rule refund: <strong>+${refundKarma} KP</strong> (up to 20 KP refunded) restored to your Karma pool.
            </div>
          </div>
        `;
      }
      effectEl.innerHTML = effectHtml;
      if (effectBox) effectBox.style.display = 'block';
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
    if (!this.isRollerPoppedOut()) {
      this.adjustRollerModalBounds();
    }
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

  /* Rules Cheat Sheet Popout Window Logic */
  getCheatSheetBox() {
    if (this.cheatsheetPopoutWindow && !this.cheatsheetPopoutWindow.closed) {
      try {
        const box = this.cheatsheetPopoutWindow.document.querySelector('.modal-box.cheatsheet-modal-box');
        if (box) return box;
      } catch (e) {}
    }
    return document.querySelector('.modal-box.cheatsheet-modal-box');
  },

  getCheatSheetEl(id) {
    const box = this.getCheatSheetBox();
    if (box) {
      const el = box.querySelector(`#${id}`);
      if (el) return el;
    }
    return document.getElementById(id);
  },

  isCheatSheetPoppedOut() {
    return !!(this.cheatsheetPopoutWindow && !this.cheatsheetPopoutWindow.closed);
  },

  saveCheatSheetPopoutGeometry() {
    const pop = this.cheatsheetPopoutWindow;
    if (!pop || pop.closed) return;
    try {
      const x = pop.screenX !== undefined ? pop.screenX : pop.screenLeft;
      const y = pop.screenY !== undefined ? pop.screenY : pop.screenTop;
      const w = pop.outerWidth || pop.innerWidth;
      const h = pop.outerHeight || pop.innerHeight;
      if (typeof x === 'number' && typeof y === 'number' && typeof w === 'number' && typeof h === 'number' && w >= 300 && h >= 300) {
        const geo = {
          width: Math.round(w),
          height: Math.round(h),
          left: Math.round(x),
          top: Math.round(y)
        };
        localStorage.setItem('msh_cheatsheet_popout_geometry', JSON.stringify(geo));
      }
    } catch (e) {}
  },

  getCheatSheetPopoutGeometry() {
    try {
      const stored = localStorage.getItem('msh_cheatsheet_popout_geometry');
      if (stored) {
        const geo = JSON.parse(stored);
        if (geo && typeof geo.width === 'number' && typeof geo.height === 'number') {
          const width = Math.max(400, Math.min(geo.width, 3840));
          const height = Math.max(350, Math.min(geo.height, 2160));
          const left = (typeof geo.left === 'number' && !isNaN(geo.left) && Math.abs(geo.left) < 30000) ? Math.round(geo.left) : null;
          const top = (typeof geo.top === 'number' && !isNaN(geo.top) && Math.abs(geo.top) < 30000) ? Math.round(geo.top) : null;
          return { width, height, left, top };
        }
      }
    } catch (e) {}
    return null;
  },

  toggleCheatSheetPopout() {
    if (this.isCheatSheetPoppedOut()) {
      this.dockCheatSheet(true);
    } else {
      this.popoutCheatSheet();
    }
  },

  popoutCheatSheet(isAutoStartup = false) {
    const modal = document.getElementById('cheatsheet-modal');
    const modalBox = document.querySelector('.modal-box.cheatsheet-modal-box');
    if (!modalBox) return false;

    if (this.isCheatSheetPoppedOut()) {
      try {
        this.cheatsheetPopoutWindow.focus();
      } catch (e) {}
      return true;
    }

    const savedGeo = this.getCheatSheetPopoutGeometry();
    let width = 900;
    let height = 800;
    let left = null;
    let top = null;

    if (savedGeo) {
      width = savedGeo.width;
      height = savedGeo.height;
      if (savedGeo.left !== null && savedGeo.top !== null) {
        left = savedGeo.left;
        top = savedGeo.top;
      }
    }

    if (left === null || top === null) {
      const screenLeft = (window.screenX !== undefined ? window.screenX : window.screenLeft || 0);
      const screenTop = (window.screenY !== undefined ? window.screenY : window.screenTop || 0);
      const outerW = window.outerWidth || window.innerWidth || 1200;
      left = Math.max(20, screenLeft + Math.round((outerW - width) / 2));
      top = Math.max(20, screenTop + 40);
    }

    let pop = null;
    try {
      pop = window.open('', 'MSH_Rules_Cheat_Sheet', `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`);
      if (pop && !pop.closed) {
        try {
          pop.resizeTo(width, height);
          pop.moveTo(left, top);
        } catch (e) {}
      }
    } catch (err) {
      console.warn('window.open error:', err);
    }

    if (!pop || pop.closed || typeof pop.closed === 'undefined') {
      if (!isAutoStartup) {
        this.showStatusToast('⚠️ Pop-out window blocked by browser. Please allow popups for this site.');
      }
      return false;
    }

    this.cheatsheetPopoutWindow = pop;
    this.cheatsheetPoppedOut = true;
    try {
      localStorage.setItem('msh_cheatsheet_popped_out', 'true');
    } catch (e) {}

    if (modal) {
      modal.classList.remove('open');
    }

    const popDoc = pop.document;
    popDoc.open();
    popDoc.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rules Cheat Sheet - Marvel Super Heroes</title>
</head>
<body>
  <div class="cheatsheet-popout-shell" id="cheatsheet-popout-shell"></div>
</body>
</html>`);
    popDoc.close();

    // Copy head link & style elements for fonts and styling
    document.querySelectorAll('link[rel="stylesheet"], style').forEach(node => {
      try {
        popDoc.head.appendChild(node.cloneNode(true));
      } catch (e) {}
    });

    // Provide App and parent references to popup window scope so inline onclick="App.switchCheatTab(...)" works
    try {
      pop.App = this;
      pop.window.App = this;
    } catch (e) {}

    // Popout shell & container styling
    const popStyle = popDoc.createElement('style');
    popStyle.textContent = `
      html, body {
        margin: 0;
        padding: 0;
        min-height: 100%;
        height: 100%;
        box-sizing: border-box;
      }
      body {
        padding: 10px;
        background: var(--bg-dark, #0b0f19);
        color: var(--text-main, #f1f5f9);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        justify-content: center;
        align-items: stretch;
        overflow: hidden;
      }
      .cheatsheet-popout-shell {
        width: 100%;
        height: 100%;
        display: flex;
        flex: 1;
        min-height: 0;
      }
      .modal-box.cheatsheet-modal-box {
        width: 100% !important;
        max-width: 100% !important;
        height: 100% !important;
        max-height: 100% !important;
        position: static !important;
        margin: 0 !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
        border: 1px solid var(--border-color, #334155) !important;
        resize: none !important;
        display: flex !important;
        flex-direction: column !important;
      }
      .modal-box.cheatsheet-modal-box .modal-header {
        padding: 6px 18px !important;
        flex-shrink: 0 !important;
      }
      .modal-box.cheatsheet-modal-box .modal-title {
        font-size: 1.3rem !important;
        line-height: 1.2 !important;
      }
      .modal-box.cheatsheet-modal-box .cheatsheet-tabs-bar {
        flex-shrink: 0 !important;
        padding: 6px 18px !important;
      }
      .modal-box.cheatsheet-modal-box .modal-body {
        flex: 1 !important;
        overflow-y: auto !important;
        min-height: 0 !important;
      }
      .cheatsheet-close-btn {
        display: inline-flex !important;
        align-items: center !important;
        gap: 2px !important;
        background: #1e293b !important;
        border: 1px solid var(--border-color, #334155) !important;
        color: var(--text-main, #f1f5f9) !important;
        font-size: 10pt !important;
        font-weight: 700 !important;
        padding: 2px 8px !important;
        border-radius: 4px !important;
        cursor: pointer !important;
        min-height: 28px !important;
      }
      .cheatsheet-close-btn .close-x-icon {
        color: #ef4444 !important;
        font-weight: 800 !important;
        font-size: 1.15em !important;
        line-height: 1 !important;
      }
      .cheatsheet-close-btn:hover {
        background: #ef4444 !important;
        border-color: #dc2626 !important;
        color: #ffffff !important;
      }
      .cheatsheet-close-btn:hover .close-x-icon {
        color: #ffffff !important;
      }
    `;
    popDoc.head.appendChild(popStyle);

    // Sync theme
    const theme = document.body.getAttribute('data-theme');
    if (theme) popDoc.body.setAttribute('data-theme', theme);

    // Move modalBox into popout document
    if (!this.cheatsheetPlaceholder) {
      this.cheatsheetPlaceholder = document.createComment('cheatsheet-modal-box-placeholder');
    }
    if (modalBox.parentNode) {
      modalBox.parentNode.insertBefore(this.cheatsheetPlaceholder, modalBox);
    }
    const mount = popDoc.getElementById('cheatsheet-popout-shell');
    if (mount) {
      mount.appendChild(modalBox);
    }

    // Update Pop-out button to Dock
    const popBtn = this.getCheatSheetEl('btn-cheatsheet-popout');
    if (popBtn) {
      popBtn.textContent = '↘ Dock';
      popBtn.title = 'Dock cheat sheet back into main window';
    }

    // Track resizing and movements
    pop.addEventListener('resize', () => {
      this.saveCheatSheetPopoutGeometry();
    });

    // Automatic restoration when popout window closes
    let returned = false;
    const returnModal = () => {
      if (returned) return;
      this.saveCheatSheetPopoutGeometry();
      returned = true;
      if (this.cheatsheetPlaceholder && this.cheatsheetPlaceholder.parentNode) {
        this.cheatsheetPlaceholder.parentNode.insertBefore(modalBox, this.cheatsheetPlaceholder);
        this.cheatsheetPlaceholder.remove();
        this.cheatsheetPlaceholder = null;
      } else {
        const m = document.getElementById('cheatsheet-modal');
        if (m && !m.contains(modalBox)) m.appendChild(modalBox);
      }
      this.cheatsheetPopoutWindow = null;
      this.cheatsheetPoppedOut = false;
      if (!this.isClientUnloading) {
        try {
          localStorage.setItem('msh_cheatsheet_popped_out', 'false');
        } catch (e) {}
      }
      modalBox.style.width = '';
      modalBox.style.height = '';
      modalBox.style.position = '';
      modalBox.style.left = '';
      modalBox.style.top = '';
      modalBox.style.margin = '';
      const b = document.getElementById('btn-cheatsheet-popout');
      if (b) {
        b.textContent = '↗ Pop-out';
        b.title = 'Pop-out into separate window';
      }
    };

    pop.addEventListener('beforeunload', returnModal);
    pop.addEventListener('unload', returnModal);

    // Watcher interval in case pop window is moved or terminated abruptly
    const checkInterval = setInterval(() => {
      if (!this.cheatsheetPopoutWindow || this.cheatsheetPopoutWindow.closed) {
        clearInterval(checkInterval);
        returnModal();
      } else {
        this.saveCheatSheetPopoutGeometry();
      }
    }, 400);

    if (this.activeCheatTab === 'table') {
      this.renderCheatSheetTable();
    } else if (this.activeCheatTab === 'materials') {
      this.renderCheatSheetMaterials();
    } else if (this.activeCheatTab === 'movement') {
      this.renderCheatSheetMovement();
    }
    try {
      pop.focus();
    } catch (e) {}

    if (!isAutoStartup) {
      this.showStatusToast('↗ Rules Cheat Sheet popped out into separate window');
    }
    return true;
  },

  dockCheatSheet(keepOpenInPage = true) {
    const pop = this.cheatsheetPopoutWindow;
    if (pop && !pop.closed) {
      this.saveCheatSheetPopoutGeometry();
      try {
        pop.close();
      } catch (e) {}
    }
    this.cheatsheetPopoutWindow = null;
    this.cheatsheetPoppedOut = false;
    if (!this.isClientUnloading) {
      try {
        localStorage.setItem('msh_cheatsheet_popped_out', 'false');
      } catch (e) {}
    }

    const modalBox = document.querySelector('.modal-box.cheatsheet-modal-box');
    if (this.cheatsheetPlaceholder && this.cheatsheetPlaceholder.parentNode && modalBox) {
      this.cheatsheetPlaceholder.parentNode.insertBefore(modalBox, this.cheatsheetPlaceholder);
      this.cheatsheetPlaceholder.remove();
      this.cheatsheetPlaceholder = null;
    } else if (modalBox) {
      const m = document.getElementById('cheatsheet-modal');
      if (m && !m.contains(modalBox)) m.appendChild(modalBox);
    }

    if (modalBox) {
      modalBox.style.width = '';
      modalBox.style.height = '';
      modalBox.style.position = '';
      modalBox.style.left = '';
      modalBox.style.top = '';
      modalBox.style.margin = '';
    }

    const popBtn = document.getElementById('btn-cheatsheet-popout');
    if (popBtn) {
      popBtn.textContent = '↗ Pop-out';
      popBtn.title = 'Pop-out into separate window';
    }

    const modal = document.getElementById('cheatsheet-modal');
    if (modal) {
      if (keepOpenInPage) {
        modal.classList.add('open');
      } else {
        modal.classList.remove('open');
      }
    }
    if (this.activeCheatTab === 'table') {
      this.renderCheatSheetTable();
    } else if (this.activeCheatTab === 'materials') {
      this.renderCheatSheetMaterials();
    } else if (this.activeCheatTab === 'movement') {
      this.renderCheatSheetMovement();
    }
    this.showStatusToast('↘ Rules Cheat Sheet docked back into main window');
  },

  closeCheatSheet() {
    if (this.isCheatSheetPoppedOut()) {
      this.dockCheatSheet(false);
    } else {
      const modal = document.getElementById('cheatsheet-modal');
      if (modal) modal.classList.remove('open');
    }
  },

  initCheatSheetWindow() {
    const modalBox = document.querySelector('.modal-box.cheatsheet-modal-box');
    if (!modalBox) return;

    modalBox.addEventListener('click', (e) => {
      const popBtn = e.target.closest('#btn-cheatsheet-popout');
      if (popBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.toggleCheatSheetPopout();
        return;
      }

      const closeBtn = e.target.closest('.modal-close, .modal-close-btn, #btn-cheatsheet-close');
      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.closeCheatSheet();
        return;
      }

      const tabBtn = e.target.closest('[id^="cheat-tab-btn-"]');
      if (tabBtn) {
        e.preventDefault();
        e.stopPropagation();
        const tabKey = tabBtn.id.replace('cheat-tab-btn-', '');
        this.switchCheatTab(tabKey);
        return;
      }
    });

    modalBox.addEventListener('change', (e) => {
      if (e.target && e.target.id === 'cheat-table-mode-select') {
        this.setUniversalTableMode(e.target.value);
      }
    });

    window.addEventListener('beforeunload', () => {
      if (this.cheatsheetPopoutWindow && !this.cheatsheetPopoutWindow.closed) {
        try {
          this.isClientUnloading = true;
          this.saveCheatSheetPopoutGeometry();
          localStorage.setItem('msh_cheatsheet_popped_out', 'true');
          this.cheatsheetPopoutWindow.close();
        } catch (e) {}
      }
    });
  },

  openHelpGuide() {
    window.open('help.html', '_blank');
  },

  openCheatSheet() {
    if (this.isCheatSheetPoppedOut && this.isCheatSheetPoppedOut()) {
      try {
        this.cheatsheetPopoutWindow.focus();
      } catch (e) {}
      return;
    }

    const wasPoppedOut = (typeof localStorage !== 'undefined' && localStorage.getItem('msh_cheatsheet_popped_out') === 'true');
    if (wasPoppedOut && this.cheatsheetAutoPopout !== false) {
      this.popoutCheatSheet();
      return;
    }

    const modal = document.getElementById('cheatsheet-modal');
    if (modal) modal.classList.add('open');
    if (this.activeCheatTab === 'table') {
      this.renderCheatSheetTable();
    } else if (this.activeCheatTab === 'materials') {
      this.renderCheatSheetMaterials();
    } else if (this.activeCheatTab === 'movement') {
      this.renderCheatSheetMovement();
    }
  },

  restoreCheatSheetPopoutOnStartup() {
    if (this.isCheatSheetPoppedOut()) return;

    const success = this.popoutCheatSheet(true);
    if (success && this.isCheatSheetPoppedOut()) {
      this.showStatusToast('↗ Rules Cheat Sheet auto-restored in separate window');
    } else {
      // Browser popup blocker prevented automatic popout on startup without user gesture
      this.showStatusToast('↗ Rules Cheat Sheet was popped out last session. Click to pop out', 8000, () => {
        this.popoutCheatSheet();
      });
    }
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
      const standardPowers = (typeof globalThis.MSH_POWERS !== 'undefined' && globalThis.MSH_POWERS.length)
        ? globalThis.MSH_POWERS
        : (globalThis.POWERS_CATALOG || []);
      const powers = [
        ...standardPowers,
        ...((typeof globalThis.MSH_NPC_PRESET_POWERS !== 'undefined' && globalThis.MSH_NPC_PRESET_POWERS.length) ? globalThis.MSH_NPC_PRESET_POWERS : [])
      ];
      const p = powers.find(x => (x.id && x.id.toLowerCase() === q) || (x.code && x.code.toLowerCase() === q)) ||
                powers.find(x => x.name && x.name.toLowerCase() === q) ||
                powers.find(x => x.name && x.name.toLowerCase().includes(q)) ||
                powers.find(x => x.name && q.includes(x.name.toLowerCase()));

      if (p) {
        const isStarred = !!(p.isStarred || p.countsAsTwo || p.powerSlots === 2);
        const isNpc = (p.code && p.code.startsWith('NPC_')) || (p.id && p.id.startsWith('NPC_'));
        const codeBadge = isNpc ? '' : (p.code || p.id || '');
        title = `${isStarred ? '★ ' : '⚡ '}${codeBadge ? '[' + codeBadge + '] ' : ''}${p.name}`;

        const fullText = (p.rulesText || p.description || 'Standard superhuman power effect.').trim();
        const paragraphs = fullText.split(/\n\s*\n|\r\n\r\n/).map(s => s.trim()).filter(Boolean);
        const formattedDesc = paragraphs.length > 1
          ? paragraphs.map(para => `<p style="margin-bottom: 12px; line-height: 1.68;">${para.replace(/\n/g, '<br/>')}</p>`).join('')
          : `<p style="line-height: 1.68;">${fullText.replace(/\n/g, '<br/>')}</p>`;

        const powerDetails = (typeof globalThis.getPowerDetails === 'function') ? globalThis.getPowerDetails(p, p.defaultRank || 'Typical') : {};
        const detailBadges = [];
        if (powerDetails.range) detailBadges.push(`<span>🎯 <strong>Range:</strong> ${powerDetails.range}</span>`);
        if (powerDetails.duration) detailBadges.push(`<span>⏳ <strong>Duration:</strong> ${powerDetails.duration}</span>`);
        if (powerDetails.areaOfEffect) detailBadges.push(`<span>🌐 <strong>Area:</strong> ${powerDetails.areaOfEffect}</span>`);
        if (powerDetails.targets) detailBadges.push(`<span>👥 <strong>Targets:</strong> ${powerDetails.targets}</span>`);
        if (powerDetails.speed) detailBadges.push(`<span>⚡ <strong>Speed:</strong> ${powerDetails.speed}</span>`);

        const detailsBar = detailBadges.length > 0 ? `
          <div class="power-stats-badges" style="display: flex; gap: 8px 14px; flex-wrap: wrap; margin: 10px 0 14px 0; padding: 8px 12px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 6px; font-size: 9.5pt;">
            ${detailBadges.join('<span style="opacity: 0.35;">|</span>')}
          </div>
        ` : '';

        const optDef = (typeof globalThis.getPowerOptionsDefinition === 'function') ? globalThis.getPowerOptionsDefinition(p) : (p.optionsDefinition || null);
        let optionsSection = '';
        if (optDef && optDef.choices && optDef.choices.length > 0) {
          const hasRoll = !!(optDef.canRoll && optDef.rollTable && optDef.rollTable.length > 0);
          const rows = optDef.choices.map(c => {
            let rollRange = '-';
            if (hasRoll) {
              const match = optDef.rollTable.find(([min, max, key]) => key === c.key);
              if (match) rollRange = match[0] === match[1] ? `${match[0]}` : `${match[0]}–${match[1]}`;
            }
            const isTaxActive = !!(this.superiorOptionCost || (this.character && this.character.superiorOptionCost));
            const surchargeBadge = c.isSuperior
              ? (isTaxActive
                  ? `<span style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); padding: 1px 6px; border-radius: 4px; font-size: 8.5pt; font-weight: 600;">+100% (2× Base)</span>`
                  : `<span style="color: #38bdf8; font-size: 8.5pt; font-weight: 600;">0 CP (Rule Off)</span>`)
              : `<span style="color: var(--rank-green, #10b981); font-size: 8.5pt; font-weight: 600;">0 CP (Standard)</span>`;
            
            const subChoices = (c.subChoiceList && c.subChoiceList.length)
              ? `<div style="font-size: 8.5pt; color: var(--text-dim, #94a3b8); margin-top: 4px;"><strong>Choices:</strong> ${c.subChoiceList.join(', ')}</div>`
              : '';

            return `
              <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.07);">
                ${hasRoll ? `<td style="padding: 6px 8px; font-family: var(--font-mono); font-size: 9pt; color: var(--marvel-gold); white-space: nowrap;">${rollRange}</td>` : ''}
                <td style="padding: 6px 8px; font-weight: 600; font-size: 9.5pt; vertical-align: top;">
                  ${c.label}
                  ${c.rankShift ? ` <span style="color: var(--marvel-gold); font-size: 8.5pt;">(+${c.rankShift}CS)</span>` : ''}
                </td>
                <td style="padding: 6px 8px; font-size: 9pt; color: var(--text-muted); vertical-align: top;">
                  ${c.description || ''}
                  ${subChoices}
                </td>
                <td style="padding: 6px 8px; text-align: right; vertical-align: top; white-space: nowrap;">
                  ${surchargeBadge}
                </td>
              </tr>
            `;
          }).join('');

          optionsSection = `
            <div class="calc-rule-callout" style="margin-top: 14px; border-left: 4px solid var(--marvel-gold); background: rgba(245, 158, 11, 0.07); padding: 12px 14px; border-radius: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 8px;">
                <strong style="color: var(--marvel-gold); font-size: 10.5pt; display: flex; align-items: center; gap: 6px;">
                  🎲 Manifestation Options: ${optDef.label || 'Power Configuration'}
                </strong>
                ${hasRoll ? `<span style="font-size: 8.5pt; color: var(--text-dim, #94a3b8);">(Random d100 roll or player choice)</span>` : ''}
              </div>
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                  <thead>
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.15); font-size: 8.5pt; color: var(--text-dim, #94a3b8); text-transform: uppercase; letter-spacing: 0.5px;">
                      ${hasRoll ? `<th style="padding: 4px 8px; width: 65px;">d100</th>` : ''}
                      <th style="padding: 4px 8px; width: 28%;">Manifestation</th>
                      <th style="padding: 4px 8px;">Rules Effect</th>
                      <th style="padding: 4px 8px; width: 110px; text-align: right;">CP Surcharge</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rows}
                  </tbody>
                </table>
              </div>
            </div>
          `;
        }

        const stunts = p.powerStunts || p.stunts || [];
        const stuntsSection = stunts.length ? `
          <div style="margin-top: 14px;">
            <strong class="rulebook-stunts-title" style="font-size: 11pt; color: var(--marvel-gold);">Documented Power Stunts:</strong>
            <ul class="rulebook-stunts-list" style="padding-left: 20px; line-height: 1.7; margin-top: 6px; font-size: 10pt;">
              ${stunts.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
        ` : '';

        const errata = p.errataNote || p.errataNotes || '';
        const errataSection = errata ? `
          <div class="calc-rule-callout" style="margin-top: 14px;">
            <strong>⚖️ Errata / Rules Note:</strong> ${errata}
          </div>
        ` : '';

        content = `
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;">
            <span class="meta-tag" style="color: var(--marvel-gold); font-weight:700;">Category: ${p.category || 'General'}</span>
            ${isStarred ? '<span class="meta-tag"><span class="starred-label-text">★ Starred Power</span></span>' : ''}
            <span class="meta-tag">Source: ${p.source || 'Player Book / UPB'}</span>
            ${p.defaultRank ? `<span class="meta-tag">Default Rank: ${p.defaultRank}</span>` : ''}
          </div>
          ${isStarred ? `
            <div class="calc-rule-callout starred-power-banner" style="margin-bottom: 12px;">
              <strong class="starred-label-text">★ TSR Starred Superpower (Player's Book p. 19 / UPB p. 16):</strong>
              This power is exceptionally potent. In CMF Point-Buy, it costs <strong>20 CP Base</strong> (instead of 10 CP) and <strong>2× Rank CP</strong>.
            </div>
          ` : ''}
          ${detailsBar}
          <div class="rulebook-desc" style="margin: 12px 0; font-size: 10.5pt;">
            ${formattedDesc}
          </div>
          ${optionsSection}
          ${stuntsSection}
          ${errataSection}
        `;
      } else {
        title = `⚡ Superpower: ${queryKey}`;
        content = `<p style="color: var(--text-muted);">Details could not be found for superpower "${queryKey}".</p>`;
      }
    } else if (type === 'talent') {
      const talents = globalThis.MSH_TALENTS || [];
      const t = talents.find(x => (x.id && x.id.toLowerCase() === q) || (x.talentId && x.talentId.toLowerCase() === q)) ||
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
            ${isStarred ? `<span class="meta-tag tag-starred">★ Starred</span>` : ''}
            ${t.allowsSpecialization ? `<span class="meta-tag" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);">🎯 Allows Multiple Specialties</span>` : ''}
            ${t.minResourcesRank ? `<span class="meta-tag" style="color: #4ade80; border-color: rgba(74, 222, 128, 0.4);">💰 Min Resources: ${t.minResourcesRank} (${t.minResourcesRankValue})</span>` : ''}
            ${t.bonus ? `<span class="meta-tag" style="color: #38bdf8;">Bonus: ${t.bonus}</span>` : ''}
            ${t.statAffected ? `<span class="meta-tag">Stat Affected: ${t.statAffected}</span>` : ''}
            <span class="meta-tag">Source: ${t.source || "Player's Book"}</span>
          </div>
          ${isStarred ? `
            <div class="calc-rule-callout starred-power-banner" style="margin-bottom: 12px;">
              <strong class="starred-label-text">★ TSR Starred Talent (Player's Book p. 10, Table 8):</strong>
              Talents marked with an asterisk (*) cost <strong>20 CP</strong> in CMF Point-Buy (instead of 10 CP).
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

  async newCharacter(mouseEvent = null) {
    const confirmed = await this.showCustomConfirm(
      'Are you sure you want to create a new character?\n\nAny unsaved changes to your current character will be replaced with a fresh CMF point-buy sheet.',
      '📄 New Character',
      mouseEvent,
      'Create New',
      'Cancel'
    );
    if (!confirmed) return;

    const currentTier = (this.character && this.character.pointTier) ? this.character.pointTier : '400';
    this.character = FASERIPCharacter.createBlankCharacter(currentTier);
    this.character.isCreationSetupPending = true;
    if (this.powerAdjustment !== undefined) {
      this.character.powerAdjustment = this.powerAdjustment;
    }
    if (this.superiorOptionCost !== undefined) {
      this.character.superiorOptionCost = this.superiorOptionCost;
    }
    this.karmaMode = 'session';
    this.advancementSnapshot = null;
    this.testModeSnapshot = null;
    this.saveState();
    this.switchTab('main-stats');
    this.render();
    this.showStatusToast('✨ Fresh character initialized. Choose starting Tier and Physical Form to begin.');
    this.openCreationWizardModal();
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
        this.karmaMode = 'session';
        this.advancementSnapshot = null;
        this.testModeSnapshot = null;
        if (!this.character.editLog || this.character.editLog.length === 0) {
          this.character.recordEdit(`Imported character: ${this.character.name}`, 'initial');
        }
        this.saveState();
        this.render();
        this.updateHistoryNavButtons();
        this.renderEditLog();
        this.showCustomAlert(`Successfully imported "${this.character.name}"!`, '📁 Character Loaded');
      } catch (err) {
        this.showCustomAlert('Failed to load .msh character file: ' + err.message, '⚠️ Load Error');
      }
    };
    reader.readAsText(file);
  },

  openPrintPreview() {
    const modal = document.getElementById('print-preview-modal');
    if (!modal) return;
    modal.classList.add('open');
    this.renderPrintSheet();
  },

  closePrintPreview() {
    const modal = document.getElementById('print-preview-modal');
    if (modal) modal.classList.remove('open');
  },

  renderPrintSheet() {
    const sheet = document.getElementById('print-sheet-content');
    if (!sheet || !this.character) return;

    const heroTag = document.getElementById('print-preview-hero-tag');
    if (heroTag) heroTag.textContent = this.character.name || 'Hero';

    const isCompact = document.getElementById('print-opt-compact')?.checked ?? true;
    const incInventions = document.getElementById('print-opt-inventions')?.checked ?? true;
    const incHistory = document.getElementById('print-opt-history')?.checked ?? false;

    const hero = this.character;
    const abs = hero.getActiveAbilities();

    // Secondary stats
    const maxHealth = hero.calculateMaxHealth ? hero.calculateMaxHealth() : (hero.abilities.fighting.rankValue + hero.abilities.agility.rankValue + hero.abilities.strength.rankValue + hero.abilities.endurance.rankValue);
    const curHealth = hero.currentHealth ?? maxHealth;
    const baseKarma = hero.calculateBaseKarma ? hero.calculateBaseKarma() : (hero.abilities.reason.rankValue + hero.abilities.intuition.rankValue + hero.abilities.psyche.rankValue);
    const curKarma = hero.currentKarma ?? baseKarma;
    const resRank = hero.resources?.rankName || 'Typical';
    const resNum = hero.resources?.rankValue || 6;
    const pop = hero.currentPopularity ?? 10;

    // Defenses
    if (hero.calculateDefenses) {
      hero.calculateDefenses();
    }
    const ba = hero.defenses?.bodyArmor || {};
    const ff = hero.defenses?.forceField || {};
    const resList = (hero.defenses?.resistances || []).map(r => `${r.name || r.type} (${r.rank || r.rankName})`).join(', ') || 'None';

    // Compiled Attacks
    const attacks = (hero.compileAttacks ? hero.compileAttacks() : []).filter(a => a);

    // Powers
    const powers = (hero.powers || []);

    // Talents & Contacts
    const talents = (hero.talents || []);
    const contacts = (hero.contacts || []);

    // Equipment
    const equipment = (hero.equipment || []);

    // Inventions
    const blueprints = (hero.knownBlueprints || []);

    // Escape helper
    const esc = (s) => (s == null ? '' : String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));

    let html = `
      <!-- Header / Identity Card -->
      <div class="print-header">
        <div style="flex: 1;">
          <div class="print-hero-name">${esc(hero.name || 'Unnamed Hero')}</div>
          <div class="print-hero-sub">${esc(hero.realName ? `Real Name: ${hero.realName}` : 'Identity: Secret')} • ${esc(hero.formName || 'Normal Human')}</div>
          
          <div class="print-meta-grid">
            <div class="print-meta-item"><span class="print-meta-label">Identity:</span> <span class="print-meta-val">${esc(hero.identity || 'Secret')}</span></div>
            <div class="print-meta-item"><span class="print-meta-label">Affiliation:</span> <span class="print-meta-val">${esc(hero.groupAffiliation || 'None / Solo')}</span></div>
            <div class="print-meta-item"><span class="print-meta-label">Base:</span> <span class="print-meta-val">${esc(hero.baseOfOperations || 'Unknown')}</span></div>
            <div class="print-meta-item"><span class="print-meta-label">Gender:</span> <span class="print-meta-val">${esc(hero.gender || 'Unknown')}</span></div>
            <div class="print-meta-item"><span class="print-meta-label">Age:</span> <span class="print-meta-val">${esc(hero.age || 'Adult')}</span></div>
            <div class="print-meta-item"><span class="print-meta-label">Height:</span> <span class="print-meta-val">${esc(hero.height || "5'10\"")}</span></div>
            <div class="print-meta-item"><span class="print-meta-label">Weight:</span> <span class="print-meta-val">${esc(hero.weight || '175 lbs')}</span></div>
            <div class="print-meta-item"><span class="print-meta-label">Eyes:</span> <span class="print-meta-val">${esc(hero.eyes || 'Brown')}</span></div>
            <div class="print-meta-item"><span class="print-meta-label">Hair:</span> <span class="print-meta-val">${esc(hero.hair || 'Brown')}</span></div>
          </div>
        </div>
        <div style="text-align: right; min-width: 140px;">
          <div style="font-family: var(--font-display), Impact, sans-serif; font-size: 13pt; font-weight: 800; color: #0f172a; text-transform: uppercase;">MARVEL SUPER HEROES</div>
          <div style="font-size: 7pt; font-weight: 700; color: #64748b;">OFFICIAL FASERIP CHARACTER RECORD</div>
          ${hero.pointTier ? `<div style="font-size: 7.5pt; font-weight: 700; color: #1e3a8a; margin-top: 3px;">CMF Tier: ${esc(hero.pointTier)} CP</div>` : ''}
          ${hero.isSwarmForm ? `<div style="font-size: 7.5pt; font-weight: 700; color: #d97706; margin-top: 2px;">⚡ S32 Swarm Collective Profile</div>` : ''}
        </div>
      </div>

      <!-- SECTION: MAIN STATS & ACTIONS -->
      <section class="print-section">
        <div class="print-section-divider">
          <span>Primary &amp; Secondary Statistics</span>
          <span class="print-divider-tag">Main Stats &amp; Vitals</span>
        </div>

        <!-- FASERIP Abilities Grid -->
        <div class="print-faserip-grid">
          <div class="print-faserip-col">
            <div class="print-ability-abbr">F</div>
            <div class="print-ability-name">Fighting</div>
            <div class="print-ability-rank">${esc(abs.fighting.rankName)}</div>
            <div class="print-ability-num">${abs.fighting.rankValue}</div>
          </div>
          <div class="print-faserip-col">
            <div class="print-ability-abbr">A</div>
            <div class="print-ability-name">Agility</div>
            <div class="print-ability-rank">${esc(abs.agility.rankName)}</div>
            <div class="print-ability-num">${abs.agility.rankValue}</div>
          </div>
          <div class="print-faserip-col">
            <div class="print-ability-abbr">S</div>
            <div class="print-ability-name">Strength</div>
            <div class="print-ability-rank">${esc(abs.strength.rankName)}</div>
            <div class="print-ability-num">${abs.strength.rankValue}</div>
          </div>
          <div class="print-faserip-col">
            <div class="print-ability-abbr">E</div>
            <div class="print-ability-name">Endurance</div>
            <div class="print-ability-rank">${esc(abs.endurance.rankName)}</div>
            <div class="print-ability-num">${abs.endurance.rankValue}</div>
          </div>
          <div class="print-faserip-col">
            <div class="print-ability-abbr">R</div>
            <div class="print-ability-name">Reason</div>
            <div class="print-ability-rank">${esc(abs.reason.rankName)}</div>
            <div class="print-ability-num">${abs.reason.rankValue}</div>
          </div>
          <div class="print-faserip-col">
            <div class="print-ability-abbr">I</div>
            <div class="print-ability-name">Intuition</div>
            <div class="print-ability-rank">${esc(abs.intuition.rankName)}</div>
            <div class="print-ability-num">${abs.intuition.rankValue}</div>
          </div>
          <div class="print-faserip-col">
            <div class="print-ability-abbr">P</div>
            <div class="print-ability-name">Psyche</div>
            <div class="print-ability-rank">${esc(abs.psyche.rankName)}</div>
            <div class="print-ability-num">${abs.psyche.rankValue}</div>
          </div>
        </div>

        <!-- Vitals Row -->
        <div class="print-vitals-row">
          <div class="print-vital-box">
            <div class="print-vital-label">Health</div>
            <div class="print-vital-val" style="color: #b91c1c;">${curHealth} / ${maxHealth}</div>
            <div class="print-vital-sub">F + A + S + E</div>
          </div>
          <div class="print-vital-box">
            <div class="print-vital-label">Karma</div>
            <div class="print-vital-val" style="color: #15803d;">${curKarma}</div>
            <div class="print-vital-sub">Base: ${baseKarma} (R + I + P)</div>
          </div>
          <div class="print-vital-box">
            <div class="print-vital-label">Resources</div>
            <div class="print-vital-val" style="color: #0369a1;">${esc(resRank)} (${resNum})</div>
            <div class="print-vital-sub">Standard FEAT</div>
          </div>
          <div class="print-vital-box">
            <div class="print-vital-label">Popularity</div>
            <div class="print-vital-val" style="color: #7c3aed;">${pop}</div>
            <div class="print-vital-sub">Base: ${hero.basePopularity ?? 10}</div>
          </div>
        </div>

        <!-- Defenses & Movement Row -->
        <div class="print-defenses-movement">
          <div class="print-def-box">
            <div class="print-def-title">🛡️ Armor &amp; Defenses</div>
            <div><strong>Body Armor:</strong> ${ba.rankName && ba.rankName !== 'None' ? `${esc(ba.rankName)} (${ba.physical || 0} Phys / ${ba.energy || 0} Energy)` : 'None'}</div>
            <div><strong>Force Field:</strong> ${ff.rankName && ff.rankName !== 'None' ? `${esc(ff.rankName)} (${ff.protection || 0} Prot)` : 'None'}</div>
            <div><strong>Resistances:</strong> ${esc(resList)}</div>
          </div>
          <div class="print-def-box">
            <div class="print-def-title">🏃 Movement &amp; Tactics</div>
            <div><strong>Standard Ground Movement:</strong> 3 areas/turn (approx. 45 mph sprint)</div>
            ${hero.powers?.some(p => /flight/i.test(p.name)) ? `<div><strong>Flight:</strong> ${hero.powers.find(p => /flight/i.test(p.name)).rankName} Speed</div>` : ''}
            <div><strong>Tactical Shift:</strong> 1 Area = 132 feet (approx. 44 yards)</div>
          </div>
        </div>

        <!-- Compiled Combat Actions Table -->
        <div style="font-weight: 800; font-size: 7.5pt; text-transform: uppercase; color: #1e293b; margin: 4px 0 2px 0;">⚔️ Compiled Combat Actions &amp; Attacks</div>
        <table class="print-table">
          <thead>
            <tr>
              <th style="width: 22%;">Attack / Action</th>
              <th style="width: 14%;">Type</th>
              <th style="width: 16%;">To-Hit Rank</th>
              <th style="width: 18%;">Damage / Effect</th>
              <th style="width: 12%;">Range</th>
              <th style="width: 18%;">Special Notes</th>
            </tr>
          </thead>
          <tbody>
            ${attacks.length > 0 ? attacks.map(a => `
              <tr>
                <td><strong>${esc(a.name)}</strong></td>
                <td>${esc(a.category || a.actionType || 'Action')}</td>
                <td><strong>${esc(a.abilityName || 'Fighting')}</strong> ${a.columnShift ? `(${a.columnShift > 0 ? '+' : ''}${a.columnShift}CS)` : ''}</td>
                <td><strong>${esc(a.damage || '--')}</strong></td>
                <td>${esc(a.range || 'Touch')}</td>
                <td>${esc(a.notes || '--')}</td>
              </tr>
            `).join('') : `
              <tr>
                <td colspan="6" class="print-empty-note" style="text-align:center;">No specific combat actions compiled. Standard Slugfest applies.</td>
              </tr>
            `}
          </tbody>
        </table>
      </section>

      <!-- SECTION: SUPERPOWERS -->
      <section class="print-section">
        <div class="print-section-divider">
          <span>Superpowers &amp; Power Stunts (${powers.length})</span>
          <span class="print-divider-tag">Powers Tab</span>
        </div>

        ${powers.length > 0 ? `
          <div class="print-powers-grid ${!isCompact ? 'single-column' : ''}">
            ${powers.map(p => {
              const adj = p.adjustments;
              const hasAdj = adj && adj.shifts;
              return `
                <div class="print-power-card">
                  <div class="print-power-header">
                    <span class="print-power-name">${p.isStarred ? '★ ' : ''}${esc(p.name)}</span>
                    <span class="print-power-rank">${esc(p.rankName)} (${p.rankValue})</span>
                  </div>
                  <div style="margin-bottom: 2px;">
                    <span class="print-power-tag">${esc(p.category || 'Special')}</span>
                    ${p.powerSlots > 1 ? `<span class="print-power-tag" style="background: #fef08a; color: #854d0e;">★ ${p.powerSlots} Slots</span>` : ''}
                    ${hasAdj ? `<span class="print-power-tag" style="background:#fed7aa; color:#9a3412;">⚡ +${adj.shifts}CS ${esc(adj.aspectIncreased)} / -${adj.shifts}CS ${esc(adj.aspectDecreased)}</span>` : ''}
                  </div>
                  <div style="font-size: 7pt; color: #475569; display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 2px;">
                    ${p.range ? `<span><strong>Range:</strong> ${esc(p.range)}</span>` : ''}
                    ${p.duration ? `<span><strong>Duration:</strong> ${esc(p.duration)}</span>` : ''}
                    ${p.areaOfEffect ? `<span><strong>Area:</strong> ${esc(p.areaOfEffect)}</span>` : ''}
                    ${p.targets ? `<span><strong>Targets:</strong> ${esc(p.targets)}</span>` : ''}
                  </div>
                  ${p.notes ? `<div style="color: #334155; margin-top: 2px;">${esc(p.notes)}</div>` : ''}
                  ${p.stunts && p.stunts.length > 0 ? `
                    <div style="font-weight: 700; font-size: 7pt; color: #1e3a8a; margin-top: 3px;">Power Stunts:</div>
                    <ul class="print-stunts-list">
                      ${p.stunts.map(s => `<li><strong>${esc(s.name)}</strong>: ${esc(s.description || '')} (${s.isLearned ? '✓ Learned' : `${s.attemptsCount || 0}/3 attempts`})</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div class="print-empty-note">No superhuman powers recorded. Character relies on natural abilities, talents, and equipment.</div>
        `}
      </section>

      <!-- SECTION: TALENTS & CONTACTS -->
      <section class="print-section">
        <div class="print-section-divider">
          <span>Talents &amp; Contacts</span>
          <span class="print-divider-tag">Talents &amp; Contacts Tab</span>
        </div>

        <div class="print-two-col ${!isCompact ? 'single-column' : ''}">
          <!-- Talents Column -->
          <div>
            <div class="print-col-subheading">🥋 Talents (${talents.length})</div>
            ${talents.length > 0 ? talents.map(t => `
              <div class="print-item-box">
                <div style="display: flex; justify-content: space-between;">
                  <span class="print-item-title">${t.isStarred ? '★ ' : ''}${esc(t.displayName || t.name)}</span>
                  ${t.csBonus ? `<span style="font-weight: 800; color: #15803d;">+${t.csBonus}CS ${esc(t.statAffected || '')}</span>` : ''}
                </div>
                <div style="font-size: 6.5pt; color: #64748b; text-transform: uppercase;">${esc(t.category || 'General')}</div>
                ${t.description ? `<div style="font-size: 7pt; color: #334155; margin-top: 1px;">${esc(t.description)}</div>` : ''}
              </div>
            `).join('') : `<div class="print-empty-note">No talents recorded.</div>`}
          </div>

          <!-- Contacts Column -->
          <div>
            <div class="print-col-subheading">🤝 Contacts (${contacts.length})</div>
            ${contacts.length > 0 ? contacts.map(c => `
              <div class="print-item-box">
                <div style="display: flex; justify-content: space-between;">
                  <span class="print-item-title">${esc(c.name || 'Unnamed')}</span>
                  <span style="font-size: 6.5pt; font-weight: 700; color: #0369a1; text-transform: uppercase;">${esc(c.type || c.category || 'Contact')}</span>
                </div>
                ${(c.description || c.notes) ? `<div style="font-size: 7pt; color: #334155; margin-top: 1px;">${esc(c.description || c.notes)}</div>` : ''}
              </div>
            `).join('') : `<div class="print-empty-note">No contacts recorded.</div>`}
          </div>
        </div>
      </section>

      <!-- SECTION: EQUIPMENT & GEAR -->
      <section class="print-section">
        <div class="print-section-divider">
          <span>Equipment &amp; Inventory (${equipment.length})</span>
          <span class="print-divider-tag">Equipment Tab</span>
        </div>

        ${equipment.length > 0 ? `
          <table class="print-table">
            <thead>
              <tr>
                <th style="width: 25%;">Item Name</th>
                <th style="width: 15%;">Type</th>
                <th style="width: 15%;">Damage / Effect</th>
                <th style="width: 12%;">Range</th>
                <th style="width: 13%;">Material</th>
                <th style="width: 20%;">Notes &amp; Packaging</th>
              </tr>
            </thead>
            <tbody>
              ${equipment.map(eq => `
                <tr>
                  <td><strong>${esc(eq.name)}</strong>${eq.equipped ? ' <span style="font-size: 6.5pt; color: #15803d; font-weight:700;">[Equipped]</span>' : ''}</td>
                  <td>${esc(eq.type || eq.category || 'Gear')}</td>
                  <td>${esc(eq.damage || '--')}</td>
                  <td>${esc(eq.range || '--')}</td>
                  <td>${esc(eq.materialStrength || '--')}</td>
                  <td>${esc(eq.shots ? `Shots: ${eq.shots}. ` : '')}${esc(eq.notes || '--')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : `
          <div class="print-empty-note">No personal equipment or carried weapons recorded.</div>
        `}
      </section>

      <!-- SECTION: INVENTION LAB (OPTIONAL) -->
      ${incInventions ? `
        <section class="print-section">
          <div class="print-section-divider">
            <span>Invention Lab &amp; Known Blueprints (${blueprints.length})</span>
            <span class="print-divider-tag">Invention Lab Tab</span>
          </div>

          <div style="font-size: 7.5pt; color: #334155; margin-bottom: 4px;">
            <strong>Lab Rank:</strong> ${esc(hero.inventionLabRank || 'Typical')} &bull; 
            <strong>Research &amp; Tech Modifier:</strong> ${esc(hero.inventionTechModifier || '+0CS')} &bull;
            <strong>Active Projects:</strong> ${esc(hero.activeInventions?.length || 0)}
          </div>

          ${blueprints.length > 0 ? `
            <table class="print-table">
              <thead>
                <tr>
                  <th style="width: 30%;">Blueprint / Schematic</th>
                  <th style="width: 18%;">Category</th>
                  <th style="width: 20%;">Target Effect / Rank</th>
                  <th style="width: 14%;">Difficulty</th>
                  <th style="width: 18%;">Build Days / Source</th>
                </tr>
              </thead>
              <tbody>
                ${blueprints.map(bp => `
                  <tr>
                    <td><strong>${esc(bp.name)}</strong></td>
                    <td>${esc(bp.category || 'Hardware')}</td>
                    <td>${esc(bp.targetPowerName || 'Boost')} (${esc(bp.targetPowerRank || 'Gd')})</td>
                    <td><strong>${esc(bp.effectiveDifficultyRank || bp.resourceRank || 'Typical')}</strong></td>
                    <td>${esc(bp.buildDays || bp.estimatedBuildDays || 3)} days (${esc(bp.powerSource || 'Tech')})</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : `
            <div class="print-empty-note">No known blueprints or schematics recorded in laboratory archive.</div>
          `}
        </section>
      ` : ''}

      <!-- SECTION: BACKGROUND, FORM & BIO -->
      <section class="print-section">
        <div class="print-section-divider">
          <span>Background, Form &amp; Roleplaying Notes</span>
          <span class="print-divider-tag">Background &amp; Form Tab</span>
        </div>

        <div style="font-size: 7.5pt; line-height: 1.4; color: #1e293b; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 3px; padding: 6px 10px;">
          ${hero.notes ? `<div style="white-space: pre-wrap;">${esc(hero.notes)}</div>` : `<div class="print-empty-note">No detailed biographical or origin notes recorded.</div>`}
        </div>
      </section>

      <!-- SECTION: ADVANCEMENT & EDIT HISTORY (OPTIONAL) -->
      ${incHistory ? `
        <section class="print-section">
          <div class="print-section-divider">
            <span>Advancement Ledger &amp; Edit History</span>
            <span class="print-divider-tag">Edit Log</span>
          </div>

          <div style="font-size: 7.5pt; margin-bottom: 4px;"><strong>Advancement Karma Ledger:</strong></div>
          ${hero.advancementLog && hero.advancementLog.length > 0 ? `
            <table class="print-table">
              <thead>
                <tr>
                  <th style="width: 25%;">Date / Timestamp</th>
                  <th style="width: 50%;">Reason / Award / Expense</th>
                  <th style="width: 25%;">Karma Change</th>
                </tr>
              </thead>
              <tbody>
                ${hero.advancementLog.slice(-10).map(entry => `
                  <tr>
                    <td>${esc(entry.date || entry.timestamp || '--')}</td>
                    <td>${esc(entry.reason || entry.description || '--')}</td>
                    <td style="font-weight: 700; color: ${(entry.points || 0) >= 0 ? '#15803d' : '#b91c1c'};">${(entry.points || 0) >= 0 ? '+' : ''}${entry.points || 0} KP</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : `<div class="print-empty-note">No advancement karma ledger entries recorded.</div>`}

          <div style="font-weight: 800; font-size: 7.5pt; text-transform: uppercase; color: #1e293b; margin: 6px 0 2px 0;">Recent Modification History:</div>
          ${hero.editLog && hero.editLog.length > 0 ? `
            <table class="print-table">
              <thead>
                <tr>
                  <th style="width: 30%;">Time</th>
                  <th style="width: 70%;">Action Description</th>
                </tr>
              </thead>
              <tbody>
                ${hero.editLog.slice(-8).reverse().map(log => `
                  <tr>
                    <td>${esc(new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}</td>
                    <td>${esc(log.description || '--')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : `<div class="print-empty-note">No edit history recorded.</div>`}
        </section>
      ` : ''}

      <!-- Continuous Sheet Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 4px; margin-top: 8px; font-size: 6.5pt; color: #64748b;">
        <span>Marvel Super Heroes (FASERIP) Character Record &bull; Generated via Marvel Character Editor</span>
        <span>Date: ${new Date().toLocaleDateString()}</span>
      </div>
    `;

    sheet.innerHTML = html;
  },

  printCharacterSheet() {
    const heroName = (this.character?.name || 'Hero').replace(/[^a-zA-Z0-9_-]/g, '_');
    const oldTitle = (typeof document !== 'undefined') ? document.title : '';
    if (typeof document !== 'undefined') {
      document.title = `${heroName}_Character_Sheet`;
    }

    const restoreTitle = () => {
      if (typeof document !== 'undefined') {
        document.title = oldTitle;
      }
      if (typeof window !== 'undefined' && window.removeEventListener) {
        window.removeEventListener('afterprint', restoreTitle);
      }
    };
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('afterprint', restoreTitle);
    }

    if (typeof window !== 'undefined' && window.print) {
      window.print();
    }

    setTimeout(() => {
      restoreTitle();
    }, 2000);
  },

  async exportCharacterPDF() {
    await this.showCustomAlert(
      'To export to PDF, select <strong>"Save as PDF"</strong> (or Microsoft Print to PDF) as your Destination in the print dialog.',
      '📄 Export to PDF'
    );
    this.printCharacterSheet();
  },

  handleHistoryUndo() {
    if (!this.character || !this.character.canUndo()) return;
    const targetEntry = this.character.undoEdit();
    if (!targetEntry || !targetEntry.snapshot) return;

    const preservedLog = this.character.editLog;
    const preservedIndex = this.character.editHistoryIndex;

    this.character = FASERIPCharacter.fromJSON(targetEntry.snapshot);
    this.character.editLog = preservedLog;
    this.character.editHistoryIndex = preservedIndex;

    this.saveState();
    this.render();
    this.updateHistoryNavButtons();
    this.renderEditLog();

    const stepNum = preservedIndex + 1;
    const totalSteps = preservedLog.length;
    this.showStatusToast(`⮜ Restored: ${targetEntry.description} (${stepNum}/${totalSteps})`);

    if (preservedIndex === 0) {
      this.character.isCreationSetupPending = true;
      this.renderPointBuy();
      this.openCreationWizardModal();
    }
  },

  handleHistoryRedo() {
    if (!this.character || !this.character.canRedo()) return;
    const targetEntry = this.character.redoEdit();
    if (!targetEntry || !targetEntry.snapshot) return;

    const preservedLog = this.character.editLog;
    const preservedIndex = this.character.editHistoryIndex;

    this.character = FASERIPCharacter.fromJSON(targetEntry.snapshot);
    this.character.editLog = preservedLog;
    this.character.editHistoryIndex = preservedIndex;

    this.saveState();
    this.render();
    this.updateHistoryNavButtons();
    this.renderEditLog();

    const stepNum = preservedIndex + 1;
    const totalSteps = preservedLog.length;
    this.showStatusToast(`⮞ Restored: ${targetEntry.description} (${stepNum}/${totalSteps})`);
  },

  handleRollbackToEdit(targetIdx) {
    if (!this.character || !this.character.editLog || !this.character.editLog[targetIdx]) return;
    const targetEntry = this.character.editLog[targetIdx];
    if (!targetEntry || !targetEntry.snapshot) return;

    const preservedLog = this.character.editLog;
    this.character = FASERIPCharacter.fromJSON(targetEntry.snapshot);
    this.character.editLog = preservedLog;
    this.character.editHistoryIndex = targetIdx;

    if (targetIdx === 0) {
      this.character.isCreationSetupPending = true;
    }

    this.saveState();
    this.render();
    this.updateHistoryNavButtons();
    this.renderEditLog();

    const stepNum = targetIdx + 1;
    const totalSteps = preservedLog.length;
    this.showStatusToast(`↺ Rolled back to: "${targetEntry.description}" (${stepNum}/${totalSteps})`);

    if (targetIdx === 0) {
      this.openCreationWizardModal();
    }
  },

  updateHistoryNavButtons() {
    if (typeof document === 'undefined' || !this.character) return;
    const btnBack = document.getElementById('btn-history-back');
    const btnForward = document.getElementById('btn-history-forward');

    const canUndo = this.character.canUndo();
    const canRedo = this.character.canRedo();

    if (btnBack) {
      btnBack.disabled = !canUndo;
      const prev = this.character.getPreviousEdit();
      btnBack.title = canUndo && prev ? `Undo: ${prev.description}` : 'Undo / Step back (No previous edits)';
    }

    if (btnForward) {
      btnForward.disabled = !canRedo;
      const next = this.character.getNextEdit();
      btnForward.title = canRedo && next ? `Redo: ${next.description}` : 'Redo / Step forward (At latest edit)';
    }
  },

  renderEditLog() {
    if (typeof document === 'undefined' || !this.character) return;
    const container = document.getElementById('character-edit-log-container');
    const badge = document.getElementById('edit-log-count-badge');
    if (!container) return;

    const log = this.character.editLog || [];
    const activeIdx = this.character.editHistoryIndex;

    if (badge) {
      badge.textContent = `${log.length} Edit${log.length === 1 ? '' : 's'}`;
    }

    if (log.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted); font-size: 10pt; padding: 8px 12px; margin: 0;">No edits recorded yet.</p>';
      return;
    }

    // Display newest first, with active step highlighted
    const html = [...log].reverse().map((entry, revIdx) => {
      const origIdx = log.length - 1 - revIdx;
      const isActive = origIdx === activeIdx;
      const d = new Date(entry.timestamp);
      const timeStr = isNaN(d.getTime()) ? '' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const catClass = `cat-${entry.category || 'general'}`;
      const activeClass = isActive ? ' active-step' : '';
      const activeIndicator = isActive ? '<span style="color: #38bdf8; font-weight: 800; margin-right: 4px;">▶</span>' : '';

      return `
        <div class="edit-log-item${activeClass}" data-edit-idx="${origIdx}" title="${isActive ? 'Current Revision (Active)' : `Click to roll back to: ${entry.description}`}">
          <div class="edit-log-desc">${activeIndicator}${entry.description}</div>
          <div class="edit-log-meta">
            <span class="edit-log-badge ${catClass}">${entry.category || 'edit'}</span>
            <span class="edit-log-time">${timeStr}</span>
            ${isActive ? `
              <span class="edit-log-current-pill">Current</span>
            ` : `
              <button type="button" class="icon-btn compact edit-log-rollback-btn" data-rollback-idx="${origIdx}" title="Roll back to this point">↺ Roll Back</button>
            `}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;

    // Attach click events to roll back to clicked revision
    container.querySelectorAll('.edit-log-item').forEach(item => {
      item.addEventListener('click', async (e) => {
        const idx = parseInt(item.getAttribute('data-edit-idx'), 10);
        if (isNaN(idx)) return;
        if (idx === this.character.editHistoryIndex) {
          this.showStatusToast('ℹ️ Already at this revision.');
          return;
        }
        const entry = this.character.editLog[idx];
        if (!entry) return;

        const isRollback = idx < this.character.editHistoryIndex;
        const actionWord = isRollback ? 'Roll back' : 'Fast-forward';
        const confirmed = await this.showCustomConfirm(
          `${actionWord} character state to revision #${idx + 1}?\n\n"${entry.description}"\n\n(Timestamp: ${new Date(entry.timestamp).toLocaleTimeString()})`,
          `↺ ${actionWord} to Revision #${idx + 1}`
        );
        if (!confirmed) return;

        this.handleRollbackToEdit(idx);
      });
    });
  },

  copyEditLogToClipboard() {
    if (!this.character || !this.character.editLog) return;
    const lines = this.character.editLog.map((e, idx) => {
      const d = new Date(e.timestamp).toLocaleString();
      return `[${idx + 1}] ${d} - [${e.category || 'edit'}] ${e.description}`;
    });
    const text = `Character Edit Log: ${this.character.name}\n${'='.repeat(40)}\n` + lines.join('\n');
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showCustomAlert('Character edit log copied to clipboard!', '📋 Log Copied');
      }).catch(() => {
        this.showCustomAlert(text, '📋 Character Edit Log');
      });
    } else {
      this.showCustomAlert(text, '📋 Character Edit Log');
    }
  },

  showStatusToast(message, duration = 2400, actionCallback = null) {
    if (typeof document === 'undefined') return;
    let toast = document.getElementById('app-status-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-status-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      toast.style.background = '#0f172a';
      toast.style.color = '#38bdf8';
      toast.style.border = '1px solid #38bdf8';
      toast.style.borderRadius = '6px';
      toast.style.padding = '8px 14px';
      toast.style.fontSize = '10pt';
      toast.style.fontWeight = '700';
      toast.style.zIndex = '999999';
      toast.style.boxShadow = '0 4px 16px rgba(0,0,0,0.8)';
      toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    if (typeof actionCallback === 'function') {
      toast.style.cursor = 'pointer';
      toast.onclick = (e) => {
        e.stopPropagation();
        try {
          actionCallback();
        } catch (err) {}
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
      };
    } else {
      toast.style.cursor = 'default';
      toast.onclick = null;
    }
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    if (this._toastTimer) clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, duration);
  },

  initEasterEgg() {
    const logoEl = document.getElementById('msh-brand-logo');
    const modalEl = document.getElementById('easter-egg-modal');
    if (!logoEl || !modalEl) return;

    let hoverTimer = null;
    let isUnlocked = false;
    let currentAudio = null;

    const audioCandidates = [
      'abomination-english-abomination-emotes-bank02-18-emotes-abomination-abm-45-wav-roar.mp3',
      'abom.mp3',
      'Abom.mp3'
    ];

    const closeEasterEgg = () => {
      modalEl.classList.remove('open');
      if (currentAudio) {
        try {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        } catch (e) {}
      }
      logoEl.textContent = 'MSH FASERIP';
      logoEl.classList.remove('easter-egg-unlocked');
      logoEl.setAttribute('title', 'Marvel Super Heroes (FASERIP)');
      isUnlocked = false;
    };

    logoEl.addEventListener('mouseenter', () => {
      if (modalEl.classList.contains('open')) return;
      hoverTimer = setTimeout(() => {
        isUnlocked = true;
        logoEl.textContent = 'MSH A-BOMB';
        logoEl.classList.add('easter-egg-unlocked');
        logoEl.setAttribute('title', 'Click to unleash A-BOMB!');
      }, 1000);
    });

    logoEl.addEventListener('mouseleave', () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        hoverTimer = null;
      }
      if (isUnlocked && !modalEl.classList.contains('open')) {
        setTimeout(() => {
          if (!modalEl.classList.contains('open')) {
            try {
              if (logoEl.matches && logoEl.matches(':hover')) return;
            } catch (e) {}
            logoEl.textContent = 'MSH FASERIP';
            logoEl.classList.remove('easter-egg-unlocked');
            logoEl.setAttribute('title', 'Marvel Super Heroes (FASERIP)');
            isUnlocked = false;
          }
        }, 2000);
      }
    });

    logoEl.addEventListener('click', (e) => {
      if (!isUnlocked) return;
      e.stopPropagation();

      modalEl.classList.add('open');

      try {
        if (!currentAudio) {
          currentAudio = new Audio(audioCandidates[0]);
        } else {
          currentAudio.currentTime = 0;
        }

        currentAudio.onended = () => {
          closeEasterEgg();
        };

        currentAudio.onerror = () => {
          if (audioCandidates[1] && currentAudio.src.indexOf(audioCandidates[1]) === -1) {
            currentAudio.src = audioCandidates[1];
            currentAudio.play().catch(() => {});
          }
        };

        const playPromise = currentAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.warn('Audio play was prevented or failed:', err);
          });
        }
      } catch (err) {
        console.warn('Audio initialization error:', err);
      }
    });

    modalEl.addEventListener('click', (e) => {
      const imgEl = document.getElementById('easter-egg-img');
      if (e.target !== imgEl) {
        closeEasterEgg();
      }
    });

    if (typeof document.addEventListener === 'function') {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalEl.classList.contains('open')) {
          closeEasterEgg();
        }
      });
    }
  },

  // =========================================================================
  // KARMA OPERATING MODES (SESSION, ADVANCEMENT, TEST)
  // =========================================================================

  openKarmaModeModal() {
    const modal = document.getElementById('modal-karma-mode');
    if (!modal) return;

    const curMode = this.karmaMode || 'session';

    // Update modal header badge
    const badge = document.getElementById('karma-mode-modal-badge');
    if (badge) {
      if (curMode === 'test') {
        badge.textContent = 'Current: Test Mode (∞)';
        badge.style.color = '#fbbf24';
      } else if (curMode === 'advancement') {
        badge.textContent = 'Current: Advancement Mode';
        badge.style.color = '#c084fc';
      } else {
        badge.textContent = 'Current: Session Mode';
        badge.style.color = '#60a5fa';
      }
    }

    // Sync radio cards selection
    document.querySelectorAll('.karma-mode-card').forEach(card => {
      const mode = card.getAttribute('data-mode');
      const radio = card.querySelector('input[type="radio"]');
      if (mode === curMode) {
        card.classList.add('active');
        if (radio) radio.checked = true;
      } else {
        card.classList.remove('active');
        if (radio) radio.checked = false;
      }
    });

    // Advancement Mode active strip & revert button
    const advStrip = document.getElementById('adv-mode-active-strip');
    const advSummary = document.getElementById('adv-mode-changes-summary');
    const revertBtn = document.getElementById('btn-revert-adv-in-modal');
    const openAdvBtn = document.getElementById('btn-open-adv-from-mode');

    if (curMode === 'advancement') {
      if (advStrip) advStrip.style.display = 'flex';
      const hasChanges = !!(this.advancementSnapshot && JSON.stringify(this.character.toJSON()) !== this.advancementSnapshot);
      if (advSummary) {
        advSummary.textContent = hasChanges
          ? '⚠️ Trait advancements have been made in this session.'
          : 'Advancement Mode active (no rank changes made yet).';
      }
      if (revertBtn) {
        revertBtn.style.display = hasChanges ? 'inline-block' : 'none';
      }
      if (openAdvBtn) openAdvBtn.style.display = 'inline-block';
    } else {
      if (advStrip) advStrip.style.display = 'none';
      if (openAdvBtn) openAdvBtn.style.display = (curMode === 'test') ? 'inline-block' : 'none';
    }

    modal.classList.add('open');
  },

  async promptAdvancementModeSwitch() {
    const confirmed = await this.showCustomConfirm(
      'Character Advancement is locked during Session Mode to prevent accidental Karma spending during live play.\n\n' +
      'Would you like to switch to Advancement Mode now to spend KP on permanent rank increases?',
      '📈 Switch to Advancement Mode?'
    );
    if (confirmed) {
      const ok = await this.setKarmaMode('advancement');
      if (ok) {
        this.openAdvancementModal();
      }
    }
  },

  async setKarmaMode(targetMode, force = false) {
    if (!targetMode) return false;
    const currentMode = this.karmaMode || 'session';
    if (targetMode === currentMode) return true;

    // 1. If currently in Test Mode and switching away:
    if (currentMode === 'test') {
      if (!force) {
        const confirmExit = await this.showCustomConfirm(
          'Warning: Exiting Test Mode will clear all test changes, roll experiments, and planned rank increases, restoring your character to their pre-test state.\n\n' +
          'Are you sure you want to discard test changes and switch modes?',
          '⚠️ Discard Test Changes?'
        );
        if (!confirmExit) {
          // Re-sync UI radio to test
          const radioTest = document.getElementById('radio-mode-test');
          if (radioTest) radioTest.checked = true;
          document.querySelectorAll('.karma-mode-card').forEach(c => {
            if (c.getAttribute('data-mode') === 'test') c.classList.add('active');
            else c.classList.remove('active');
          });
          return false;
        }
      }

      // Restore pre-test character snapshot
      if (this.testModeSnapshot) {
        try {
          this.character = FASERIPCharacter.fromJSON(JSON.parse(this.testModeSnapshot));
        } catch (e) {
          console.error('Failed to restore test mode snapshot', e);
        }
      }
      this.testModeSnapshot = null;
      this.showStatusToast('🧪 Test Mode ended. Character restored to pre-test state.');
    }

    // 2. If currently in Advancement Mode and switching away:
    if (currentMode === 'advancement') {
      const hasChanges = !!(this.advancementSnapshot && JSON.stringify(this.character.toJSON()) !== this.advancementSnapshot);
      if (hasChanges && !force) {
        const keepAdvancements = await this.showCustomConfirm(
          'You have made trait advancements during this Advancement session.\n\n' +
          'Select "Keep Advancements" to permanently save your rank increases, or "Revert Advancements" to undo all changes made during this session.',
          '📈 Trait Advancements Made',
          null,
          'Keep Advancements',
          'Revert Advancements'
        );

        if (!keepAdvancements) {
          // User chose Revert
          try {
            this.character = FASERIPCharacter.fromJSON(JSON.parse(this.advancementSnapshot));
            this.showStatusToast('↺ Trait advancements reverted.');
          } catch (e) {
            console.error('Failed to revert advancement snapshot', e);
          }
        } else {
          this.showStatusToast('✅ Trait advancements permanently saved.');
        }
      }
      this.advancementSnapshot = null;
    }

    // 3. Entering Test Mode:
    if (targetMode === 'test') {
      this.testModeSnapshot = JSON.stringify(this.character.toJSON());
      this.showStatusToast('🧪 Test Mode active: Infinite KP granted. (Changes will be cleared upon exit)');
    }

    // 4. Entering Advancement Mode:
    if (targetMode === 'advancement') {
      this.advancementSnapshot = JSON.stringify(this.character.toJSON());
      this.showStatusToast('📈 Advancement Mode active: Trait advancement unlocked.');
    }

    // 5. Entering Session Mode:
    if (targetMode === 'session') {
      this.showStatusToast('🎮 Session Mode active: Standard play rules engaged.');
    }

    // Apply mode
    this.karmaMode = targetMode;
    this.saveState();
    this.render();
    this.renderVitals();

    // Update open Die Roller if any
    const availKarmaEl = this.getRollerEl('roller-avail-karma');
    if (availKarmaEl) {
      availKarmaEl.textContent = (this.karmaMode === 'test') ? '∞' : (this.character ? this.character.currentKarma : 0);
    }

    // Update open Advancement modal if any
    const advModal = document.getElementById('modal-advancement');
    if (advModal && advModal.classList.contains('open')) {
      this.updateAdvancementPreview();
    }

    // Update open Karma Mode modal if any
    const karmaModal = document.getElementById('modal-karma-mode');
    if (karmaModal && karmaModal.classList.contains('open')) {
      this.openKarmaModeModal();
    }

    return true;
  },

  async revertAdvancementChanges() {
    if (!this.advancementSnapshot) {
      await this.showCustomAlert('No trait advancements to revert.', '↺ Revert Advancements');
      return;
    }

    const confirmed = await this.showCustomConfirm(
      'Revert all advancements made in this session?\n\n' +
      'All spent Karma and trait rank increases will be undone, restoring your character to the start of this Advancement session.',
      '↺ Revert Advancements'
    );
    if (!confirmed) return;

    try {
      this.character = FASERIPCharacter.fromJSON(JSON.parse(this.advancementSnapshot));
      this.saveState();
      this.render();
      this.renderVitals();

      // Refresh modals
      const advModal = document.getElementById('modal-advancement');
      if (advModal && advModal.classList.contains('open')) {
        this.populateAdvancementItems();
        this.updateAdvancementPreview();
      }

      const karmaModal = document.getElementById('modal-karma-mode');
      if (karmaModal && karmaModal.classList.contains('open')) {
        this.openKarmaModeModal();
      }

      this.showStatusToast('↺ All advancements reverted to session start.');
    } catch (e) {
      console.error('Failed to revert advancement snapshot', e);
      await this.showCustomAlert('Error reverting advancements.', 'Revert Failed');
    }
  },

  // =========================================================================
  // CHARACTER ADVANCEMENT (RANK INCREASE VIA KARMA SPEND)
  // =========================================================================

  openAdvancementModal(category = 'ability', identifier = null) {
    if (!this.character) return;
    const modal = document.getElementById('modal-advancement');
    if (!modal) return;

    // Refresh Karma badge
    const karmaBadge = document.getElementById('adv-karma-badge');
    if (karmaBadge) {
      const isTest = this.karmaMode === 'test';
      karmaBadge.textContent = isTest ? 'Avail: ∞ KP' : `Avail: ${this.character.currentKarma || 0} KP`;
    }

    const catSelect = document.getElementById('adv-category-select');
    if (catSelect) {
      catSelect.value = category;
    }

    this.populateAdvancementItems(identifier);
    this.updateAdvancementPreview();

    const notesInput = document.getElementById('adv-custom-notes');
    if (notesInput) notesInput.value = '';

    modal.classList.add('open');
  },

  populateAdvancementItems(preferredIdentifier = null) {
    if (!this.character) return;
    const catSelect = document.getElementById('adv-category-select');
    const itemSelect = document.getElementById('adv-item-select');
    if (!catSelect || !itemSelect) return;

    const category = catSelect.value;
    itemSelect.innerHTML = '';

    if (category === 'ability') {
      const abilities = [
        { key: 'fighting', name: 'Fighting (F)' },
        { key: 'agility', name: 'Agility (A)' },
        { key: 'strength', name: 'Strength (S)' },
        { key: 'endurance', name: 'Endurance (E)' },
        { key: 'reason', name: 'Reason (R)' },
        { key: 'intuition', name: 'Intuition (I)' },
        { key: 'psyche', name: 'Psyche (P)' }
      ];
      abilities.forEach(ab => {
        const stat = this.character.abilities[ab.key] || { rankName: 'Typical', rankValue: 6 };
        const opt = document.createElement('option');
        opt.value = ab.key;
        opt.textContent = `${ab.name} — ${stat.rankName} (${stat.rankValue})`;
        itemSelect.appendChild(opt);
      });
    } else if (category === 'power') {
      const powers = this.character.powers || [];
      if (powers.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = '-- No Superpowers on Character --';
        opt.disabled = true;
        itemSelect.appendChild(opt);
      } else {
        powers.forEach((p, idx) => {
          const opt = document.createElement('option');
          opt.value = p.id || p.name;
          opt.textContent = `${p.name} — ${p.rankName} (${p.rankValue})`;
          itemSelect.appendChild(opt);
        });
      }
    } else if (category === 'resources') {
      const res = this.character.resources || { rankName: 'Typical', rankValue: 6 };
      const opt = document.createElement('option');
      opt.value = 'resources';
      opt.textContent = `Resources — ${res.rankName} (${res.rankValue})`;
      itemSelect.appendChild(opt);
    }

    if (preferredIdentifier && itemSelect.querySelector(`option[value="${preferredIdentifier}"]`)) {
      itemSelect.value = preferredIdentifier;
    }
  },

  updateAdvancementPreview() {
    if (!this.character) return;
    const catSelect = document.getElementById('adv-category-select');
    const itemSelect = document.getElementById('adv-item-select');
    const curRankDisplay = document.getElementById('adv-current-rank-display');
    const targetRankSelect = document.getElementById('adv-target-rank-select');
    const karmaCostEl = document.getElementById('adv-calc-karma-cost');
    const trainingDaysEl = document.getElementById('adv-calc-training-days');
    const remainingKarmaEl = document.getElementById('adv-calc-remaining-karma');
    const applyBtn = document.getElementById('btn-apply-adv');

    // Update Mode Banner in Advancement Modal
    const modeBanner = document.getElementById('adv-modal-mode-banner');
    const bannerIcon = document.getElementById('adv-banner-icon');
    const bannerTitle = document.getElementById('adv-banner-title');
    const bannerDesc = document.getElementById('adv-banner-desc');
    const btnRevertInAdvModal = document.getElementById('btn-revert-adv-in-advmodal');
    const btnSwitchInAdvModal = document.getElementById('btn-switch-mode-from-advmodal');

    const mode = this.karmaMode || 'session';
    if (modeBanner) {
      modeBanner.className = `adv-modal-banner mode-banner-${mode}`;
    }

    if (mode === 'session') {
      if (bannerIcon) bannerIcon.textContent = '🔒';
      if (bannerTitle) bannerTitle.textContent = 'Session Mode (Locked)';
      if (bannerDesc) bannerDesc.textContent = 'Advancement locked during live play.';
      if (btnRevertInAdvModal) btnRevertInAdvModal.style.display = 'none';
      if (btnSwitchInAdvModal) {
        btnSwitchInAdvModal.style.display = 'inline-block';
        btnSwitchInAdvModal.textContent = '📈 Switch to Advancement Mode';
      }
    } else if (mode === 'advancement') {
      if (bannerIcon) bannerIcon.textContent = '📈';
      if (bannerTitle) bannerTitle.textContent = 'Advancement Mode Active';
      if (bannerDesc) bannerDesc.textContent = 'Spending KP permanently increases trait ranks.';
      const hasChanges = !!(this.advancementSnapshot && JSON.stringify(this.character.toJSON()) !== this.advancementSnapshot);
      if (btnRevertInAdvModal) {
        btnRevertInAdvModal.style.display = hasChanges ? 'inline-block' : 'none';
      }
      if (btnSwitchInAdvModal) {
        btnSwitchInAdvModal.style.display = 'inline-block';
        btnSwitchInAdvModal.textContent = '🎮 Return to Session Mode';
      }
    } else if (mode === 'test') {
      if (bannerIcon) bannerIcon.textContent = '🧪';
      if (bannerTitle) bannerTitle.textContent = 'Test Mode (Infinite KP / Sandbox)';
      if (bannerDesc) bannerDesc.textContent = 'Changes are temporary and cleared when exiting Test Mode.';
      if (btnRevertInAdvModal) btnRevertInAdvModal.style.display = 'none';
      if (btnSwitchInAdvModal) {
        btnSwitchInAdvModal.style.display = 'inline-block';
        btnSwitchInAdvModal.textContent = '🎮 Exit Test Mode';
      }
    }

    if (!catSelect || !itemSelect || !targetRankSelect) return;

    const category = catSelect.value;
    const identifier = itemSelect.value;

    if (!identifier) {
      if (curRankDisplay) curRankDisplay.textContent = '--';
      if (targetRankSelect) targetRankSelect.innerHTML = '<option value="">--</option>';
      if (karmaCostEl) karmaCostEl.textContent = '0 KP';
      if (trainingDaysEl) trainingDaysEl.textContent = '0 Days';
      if (remainingKarmaEl) remainingKarmaEl.textContent = (mode === 'test') ? '∞ KP' : `${this.character.currentKarma || 0} KP`;
      if (applyBtn) applyBtn.disabled = true;
      return;
    }

    let currentRankName = 'Typical';
    let currentRankNum = 6;
    if (category === 'ability') {
      const stat = this.character.abilities[identifier];
      if (stat) {
        currentRankName = stat.rankName;
        currentRankNum = stat.rankValue;
      }
    } else if (category === 'power') {
      const power = this.character.powers.find(p => p.id === identifier || p.name.toLowerCase() === identifier.toLowerCase());
      if (power) {
        currentRankName = power.rankName;
        currentRankNum = power.rankValue;
      }
    } else if (category === 'resources') {
      currentRankName = this.character.resources?.rankName || 'Typical';
      currentRankNum = this.character.resources?.rankValue || 6;
    }

    if (curRankDisplay) {
      curRankDisplay.textContent = `${currentRankName} (${currentRankNum})`;
    }

    // Populate target ranks (all ranks above current)
    const allRanks = (typeof UniversalTableEngine !== 'undefined' && (UniversalTableEngine.ranks || UniversalTableEngine.RANKS))
      ? (UniversalTableEngine.ranks || UniversalTableEngine.RANKS)
      : ((typeof RANKS !== 'undefined') ? RANKS : []);
    const curIdx = allRanks.findIndex(r => r.name.toLowerCase() === currentRankName.toLowerCase());

    const prevSelectedTarget = targetRankSelect.value;
    targetRankSelect.innerHTML = '';

    if (curIdx === -1 || curIdx >= allRanks.length - 1) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = 'Maximum Rank Achieved (Beyond)';
      targetRankSelect.appendChild(opt);
      if (karmaCostEl) karmaCostEl.textContent = '0 KP';
      if (trainingDaysEl) trainingDaysEl.textContent = '0 Days';
      if (remainingKarmaEl) remainingKarmaEl.textContent = (mode === 'test') ? '∞ KP' : `${this.character.currentKarma} KP`;
      if (applyBtn) applyBtn.disabled = true;
      return;
    }

    for (let i = curIdx + 1; i < allRanks.length; i++) {
      const r = allRanks[i];
      const opt = document.createElement('option');
      opt.value = r.name;
      opt.textContent = `${r.name} (${r.num}) [+${i - curIdx} CS]`;
      targetRankSelect.appendChild(opt);
    }

    if (prevSelectedTarget && targetRankSelect.querySelector(`option[value="${prevSelectedTarget}"]`)) {
      targetRankSelect.value = prevSelectedTarget;
    } else {
      targetRankSelect.selectedIndex = 0;
    }

    const selectedTarget = targetRankSelect.value;
    const calc = this.character.calculateAdvancement(category, currentRankName, selectedTarget);

    if (calc && calc.valid) {
      if (karmaCostEl) karmaCostEl.textContent = `${calc.karmaCost} KP`;
      if (trainingDaysEl) trainingDaysEl.textContent = `${calc.trainingDays} Day${calc.trainingDays > 1 ? 's' : ''}`;

      if (mode === 'session') {
        const remaining = this.character.currentKarma - calc.karmaCost;
        if (remainingKarmaEl) {
          remainingKarmaEl.textContent = `${remaining} KP`;
          remainingKarmaEl.style.color = remaining >= 0 ? '#4ade80' : '#ef4444';
        }
        if (applyBtn) {
          applyBtn.disabled = true;
          applyBtn.title = 'Advancement is locked in Session Mode. Switch to Advancement Mode.';
        }
      } else if (mode === 'test') {
        if (remainingKarmaEl) {
          remainingKarmaEl.textContent = '∞ KP';
          remainingKarmaEl.style.color = '#4ade80';
        }
        if (applyBtn) {
          applyBtn.disabled = false;
          applyBtn.title = 'Apply Test Advancement (Infinite KP)';
        }
      } else {
        const remaining = this.character.currentKarma - calc.karmaCost;
        if (remainingKarmaEl) {
          remainingKarmaEl.textContent = `${remaining} KP`;
          remainingKarmaEl.style.color = remaining >= 0 ? '#4ade80' : '#ef4444';
        }
        if (applyBtn) {
          applyBtn.disabled = remaining < 0;
          applyBtn.title = remaining < 0 ? `Need ${calc.karmaCost} KP (You only have ${this.character.currentKarma} KP)` : '';
        }
      }
    } else {
      if (karmaCostEl) karmaCostEl.textContent = '0 KP';
      if (trainingDaysEl) trainingDaysEl.textContent = '0 Days';
      if (applyBtn) applyBtn.disabled = true;
    }
  },

  async handleApplyAdvancement() {
    if (!this.character) return;
    if (this.karmaMode === 'session') {
      await this.showCustomAlert(
        'Trait advancement is locked in Session Mode to prevent accidental spending during live play.\n\n' +
        'Please switch to Advancement Mode or Test Mode.',
        '🔒 Advancement Locked'
      );
      return;
    }

    const catSelect = document.getElementById('adv-category-select');
    const itemSelect = document.getElementById('adv-item-select');
    const targetRankSelect = document.getElementById('adv-target-rank-select');
    const notesInput = document.getElementById('adv-custom-notes');

    if (!catSelect || !itemSelect || !targetRankSelect) return;

    const category = catSelect.value;
    const identifier = itemSelect.value;
    const targetRankName = targetRankSelect.value;
    const customNotes = notesInput ? notesInput.value.trim() : '';

    if (!identifier || !targetRankName) {
      await this.showCustomAlert('Please select a trait and target rank to advance.', 'Advancement Incomplete');
      return;
    }

    const isTest = this.karmaMode === 'test';
    const result = this.character.applyAdvancement(category, identifier, targetRankName, customNotes, isTest);
    if (!result.success) {
      await this.showCustomAlert(result.error || 'Failed to apply advancement.', 'Cannot Advance Rank');
      return;
    }

    const targetDesc = identifier.charAt(0).toUpperCase() + identifier.slice(1);
    const modeTag = isTest ? ' [Test Mode]' : '';
    this.recordCharacterEdit(`Advanced ${targetDesc} to ${targetRankName}${modeTag} (-${result.calc.karmaCost} KP)`, 'advancement');

    this.saveState();
    this.render();
    this.renderVitals();

    const modal = document.getElementById('modal-advancement');
    if (modal) modal.classList.remove('open');

    if (isTest) {
      await this.showCustomAlert(
        `🧪 [Test Mode] Advanced ${targetDesc} to ${targetRankName}!\n\n` +
        `Required Karma Cost: ${result.calc.karmaCost} KP\n` +
        `Training Time: ${result.calc.trainingDays} day(s)\n` +
        `Karma Balance: ∞ KP\n\n` +
        `Note: All test-mode changes will be cleared when you switch away from Test Mode.`,
        '🧪 Test Advancement Applied'
      );
    } else {
      await this.showCustomAlert(
        `Successfully advanced ${targetDesc} to ${targetRankName}!\n\n` +
        `Karma Cost: ${result.calc.karmaCost} KP\n` +
        `Training Time: ${result.calc.trainingDays} day(s)\n` +
        `Karma Balance: ${this.character.currentKarma} KP`,
        '📈 Rank Advance Successful'
      );
    }
  },

  // =========================================================================
  // PROGRAM UPDATE CHECKER & AUTOMATION
  // =========================================================================

  initUpdateChecker() {
    // Load stored update settings
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('msh_update_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          this.updateSettings = Object.assign(this.updateSettings, parsed);
        } catch (e) {
          console.warn('Failed to parse msh_update_settings', e);
        }
      }
    }

    // Sync UI elements
    const chkStartup = document.getElementById('option-update-on-startup');
    if (chkStartup) chkStartup.checked = !!this.updateSettings.onStartup;

    const verTag = document.getElementById('update-version-tag');
    if (verTag) verTag.textContent = `v${this.VERSION}`;

    this.updateLastCheckedUI();
  },

  saveUpdateSettings() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('msh_update_settings', JSON.stringify(this.updateSettings));
    }
  },

  setupUpdateSchedule() {
    if (this.updateScheduleTimer) {
      clearInterval(this.updateScheduleTimer);
      this.updateScheduleTimer = null;
    }
  },

  updateLastCheckedUI() {
    const textEl = document.getElementById('update-last-checked-text');
    if (!textEl) return;

    if (!this.updateSettings.lastChecked) {
      textEl.textContent = 'Never';
      return;
    }

    try {
      const d = new Date(this.updateSettings.lastChecked);
      textEl.textContent = `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } catch (e) {
      textEl.textContent = this.updateSettings.lastChecked;
    }
  },

  compareVersions(v1, v2) {
    if (!v1 || !v2) return 0;
    const clean = (s) => String(s).replace(/^[v^~]/i, '').trim();
    const p1 = clean(v1).split('.').map(n => parseInt(n, 10) || 0);
    const p2 = clean(v2).split('.').map(n => parseInt(n, 10) || 0);
    const maxLen = Math.max(p1.length, p2.length);
    for (let i = 0; i < maxLen; i++) {
      const num1 = p1[i] || 0;
      const num2 = p2[i] || 0;
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  },

  async checkForUpdates({ trigger = 'manual', silent = false } = {}) {
    const now = Date.now();
    // Throttle automated checks to at most once per 20 seconds to prevent rapid network spam
    if (trigger !== 'manual' && this._lastUpdateCheckTime && (now - this._lastUpdateCheckTime < 20000)) {
      return;
    }
    this._lastUpdateCheckTime = now;

    const badgeEl = document.getElementById('update-status-badge');
    if (badgeEl && !silent) {
      badgeEl.textContent = 'Checking...';
      badgeEl.style.color = '#38bdf8';
    }

    // Quick offline detection if available in browser
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      if (badgeEl && !silent) {
        badgeEl.textContent = 'Offline';
        badgeEl.style.color = '#ef4444';
      }
      if (!silent) {
        await this.showCustomAlert(
          'You appear to be offline. Please connect to the internet to check for program updates.',
          '⚠️ Offline'
        );
      }
      return;
    }

    const currentVer = this.VERSION || '1.5.2';
    const localBuildDate = this.BUILD_DATE || '2026-09-24';
    const localCommitSha = this.COMMIT_SHA || '6a15ff5';
    const repoOwner = this.REPO_OWNER || 'captainload';
    const repoName = this.REPO_NAME || 'marvel-character-editor';
    const branch = 'main';

    let updateAvailable = false;
    let isUpToDate = false;
    let remoteVersion = null;
    let remoteReleaseDate = null;
    let remoteNotes = '';
    let remoteUrl = `https://github.com/${repoOwner}/${repoName}`;
    let checkSource = '';
    let lastError = null;

    // Strategy 1: Check GitHub raw version.json
    try {
      const rawUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/version.json?_t=${now}`;
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null;
      const resp = await fetch(rawUrl, {
        cache: 'no-store',
        signal: controller ? controller.signal : undefined
      });
      if (timeoutId) clearTimeout(timeoutId);
      if (resp && resp.ok) {
        const data = await resp.json();
        if (data && data.version) {
          remoteVersion = data.version;
          remoteReleaseDate = data.releaseDate || null;
          remoteNotes = data.releaseNotes || '';
          if (data.repo) remoteUrl = data.repo;
          checkSource = 'version.json';
          const cmp = this.compareVersions(remoteVersion, currentVer);
          if (cmp > 0) updateAvailable = true;
          else isUpToDate = true;
        }
      }
    } catch (err) {
      lastError = err.message;
    }

    // Strategy 2: Check GitHub Releases API
    if (!remoteVersion) {
      try {
        const releaseUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null;
        const resp = await fetch(releaseUrl, {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
          cache: 'no-store',
          signal: controller ? controller.signal : undefined
        });
        if (timeoutId) clearTimeout(timeoutId);
        if (resp && resp.ok) {
          const data = await resp.json();
          if (data && data.tag_name) {
            remoteVersion = data.tag_name.replace(/^v/i, '');
            remoteReleaseDate = data.published_at ? data.published_at.slice(0, 10) : null;
            remoteNotes = data.body || '';
            if (data.html_url) remoteUrl = data.html_url;
            checkSource = 'GitHub Releases';
            const cmp = this.compareVersions(remoteVersion, currentVer);
            if (cmp > 0) updateAvailable = true;
            else isUpToDate = true;
          }
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    // Strategy 3: Check GitHub Commits API on default branch
    if (!remoteVersion && !isUpToDate) {
      try {
        const commitUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits/${branch}`;
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null;
        const resp = await fetch(commitUrl, {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
          cache: 'no-store',
          signal: controller ? controller.signal : undefined
        });
        if (timeoutId) clearTimeout(timeoutId);
        if (resp && resp.ok) {
          const data = await resp.json();
          if (data && data.sha) {
            const commitSha = data.sha.slice(0, 7);
            const commitDate = data.commit?.committer?.date || data.commit?.author?.date || '';
            const commitMsg = (data.commit?.message || '').split('\n')[0];
            checkSource = `GitHub Repository (${branch})`;

            const verMatch = commitMsg.match(/\bv?(\d+\.\d+\.\d+)\b/);
            if (verMatch) {
              remoteVersion = verMatch[1];
              const cmp = this.compareVersions(remoteVersion, currentVer);
              if (cmp > 0) updateAvailable = true;
              else isUpToDate = true;
            } else {
              const remoteTime = new Date(commitDate).getTime();
              const localTime = new Date(localBuildDate).getTime();
              if (remoteTime > (localTime + 86400000) && commitSha !== localCommitSha) {
                updateAvailable = true;
                remoteVersion = `commit ${commitSha}`;
              } else {
                isUpToDate = true;
                remoteVersion = currentVer;
              }
            }
            remoteReleaseDate = commitDate ? commitDate.slice(0, 10) : null;
            remoteNotes = `Latest commit on ${branch}: "${commitMsg}" (${commitSha})`;
          }
        } else if (resp && resp.status === 403) {
          lastError = 'GitHub API rate limit exceeded. Please wait a moment and try again.';
        } else if (resp) {
          lastError = `GitHub responded with HTTP status ${resp.status}`;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    // Strategy 4: Fallback to local ./version.json if running via http:// or https:// web server
    if (!remoteVersion && !isUpToDate && typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      try {
        const resp = await fetch(`./version.json?_t=${now}`, { cache: 'no-store' });
        if (resp && resp.ok) {
          const data = await resp.json();
          if (data && data.version) {
            remoteVersion = data.version;
            remoteReleaseDate = data.releaseDate || null;
            remoteNotes = data.releaseNotes || '';
            checkSource = 'Local version.json';
            const cmp = this.compareVersions(remoteVersion, currentVer);
            if (cmp > 0) updateAvailable = true;
            else isUpToDate = true;
          }
        }
      } catch (err) {}
    }

    // If all strategies failed to connect to GitHub
    if (!updateAvailable && !isUpToDate) {
      if (badgeEl && !silent) {
        badgeEl.textContent = 'Check failed';
        badgeEl.style.color = '#ef4444';
      }
      if (!silent) {
        await this.showCustomAlert(
          `Could not check for updates.\n\n` +
          `Details: ${lastError || 'Unable to reach GitHub repository'}\n\n` +
          `Please check your internet connection or visit:\n${remoteUrl}`,
          '⚠️ Update Check'
        );
      }
      return;
    }

    // Update settings timestamp
    this.updateSettings.lastChecked = new Date().toISOString();
    this.updateSettings.lastKnownRemoteVersion = remoteVersion || currentVer;
    this.saveUpdateSettings();
    this.updateLastCheckedUI();

    if (updateAvailable) {
      if (badgeEl) {
        badgeEl.textContent = `Update available: v${remoteVersion}`;
        badgeEl.style.color = '#f59e0b';
      }

      if (silent) {
        this.showStatusToast(`🔄 Update Available: New version (${remoteVersion}) is available on GitHub!`);
      } else {
        const notes = remoteNotes ? `\n\nRelease / Commit Info:\n${remoteNotes}` : '';
        await this.showCustomAlert(
          `A new version of Marvel Character Editor is available!\n\n` +
          `Current Version: v${currentVer}\n` +
          `New Version: ${remoteVersion.startsWith('v') ? remoteVersion : 'v' + remoteVersion} (${remoteReleaseDate || 'Latest'})\n` +
          `Repository: ${remoteUrl}` +
          notes,
          '🚀 Program Update Available'
        );
      }
    } else {
      // Up to date
      if (badgeEl) {
        badgeEl.textContent = `Up to date (v${currentVer})`;
        badgeEl.style.color = '#4ade80';
      }

      if (!silent) {
        const notes = remoteNotes ? `\n\n${remoteNotes}` : '';
        await this.showCustomAlert(
          `You are running the latest version of Marvel Character Editor (v${currentVer}).\n\n` +
          `Connected to: ${checkSource}\n` +
          `Repository: ${remoteUrl}` +
          notes,
          '✅ Program Up to Date'
        );
      }
    }
  },

  /* Character Creation Setup Wizard (Starting Tier & Form) */
  openCreationWizardModal() {
    const modal = document.getElementById('modal-character-init');
    if (!modal) return;

    const nameInput = document.getElementById('init-char-name');
    if (nameInput) {
      nameInput.value = this.character ? (this.character.name || 'New Superhero') : 'New Superhero';
    }

    const tierSelect = document.getElementById('init-tier-select');
    const customRow = document.getElementById('init-custom-tier-row');
    const customBudgetInp = document.getElementById('init-custom-budget');

    if (tierSelect && this.character) {
      const curTier = this.character.pointTier || '400';
      tierSelect.value = curTier;
      if (customRow) {
        customRow.style.display = curTier === 'custom' ? 'flex' : 'none';
      }
      if (customBudgetInp) {
        customBudgetInp.value = this.character.pointBudget || 400;
      }
    }

    const formSelect = document.getElementById('init-form-select');
    if (formSelect && globalThis.PHYSICAL_FORMS) {
      formSelect.innerHTML = globalThis.PHYSICAL_FORMS.map(f =>
        `<option value="${f.id}">${f.name} (${f.category || 'Standard'})</option>`
      ).join('');
      const curFormKey = (this.character && this.character.formKey) ? this.character.formKey : 'mutant';
      formSelect.value = curFormKey;
      this.updateCreationFormPreview(curFormKey);
    }

    modal.classList.add('open');
  },

  closeCreationWizardModal() {
    const modal = document.getElementById('modal-character-init');
    if (modal) modal.classList.remove('open');
  },

  updateCreationFormPreview(formId) {
    const forms = globalThis.PHYSICAL_FORMS || [];
    const f = forms.find(x => x.id === formId) || forms[0];
    if (!f) return;

    const nameEl = document.getElementById('init-form-preview-name');
    const catEl = document.getElementById('init-form-preview-cat');
    const descEl = document.getElementById('init-form-preview-desc');
    const rulesEl = document.getElementById('init-form-preview-rules');

    if (nameEl) nameEl.textContent = f.name;
    if (catEl) catEl.textContent = f.category || f.source || 'Standard';
    if (descEl) descEl.textContent = f.description || '';
    if (rulesEl) {
      let rulesText = '';
      if (Array.isArray(f.specialRules)) {
        rulesText = f.specialRules.join(' ');
      } else if (f.specialRules) {
        rulesText = f.specialRules;
      }
      rulesEl.textContent = rulesText ? `Special: ${rulesText}` : '';
    }
  },

  applyCreationWizardSetup() {
    if (!this.character) return;

    const nameInput = document.getElementById('init-char-name');
    const heroName = nameInput ? nameInput.value.trim() : '';

    const tierSelect = document.getElementById('init-tier-select');
    const tier = tierSelect ? tierSelect.value : '400';

    const customBudgetInp = document.getElementById('init-custom-budget');
    const customBudget = customBudgetInp ? parseInt(customBudgetInp.value, 10) : 400;

    const formSelect = document.getElementById('init-form-select');
    const formId = formSelect ? formSelect.value : 'mutant';

    if (typeof this.character.applyCreationSetup === 'function') {
      this.character.applyCreationSetup(tier, formId, customBudget, heroName);
    } else {
      if (heroName) this.character.name = heroName;
      const forms = globalThis.PHYSICAL_FORMS || [];
      const f = forms.find(x => x.id === formId);
      if (f) {
        this.character.formKey = f.id;
        this.character.formName = f.name;
        this.character.isSwarmForm = (f.id === 's32_collective_mass' || f.id === 'swarm_collective');
      }
      if (tier === 'custom') {
        this.character.setPointTier('custom', customBudget);
      } else {
        this.character.setPointTier(tier);
      }
      this.character.isCreationSetupPending = false;
      this.character.recordEdit(`Creation setup confirmed: ${this.character.name} (${this.character.pointBudget} CP, ${this.character.formName})`, 'creation');
    }

    const headerNameInp = document.getElementById('header-char-name');
    if (headerNameInp && heroName) {
      headerNameInp.value = heroName;
    }

    this.saveState();
    this.closeCreationWizardModal();
    this.render();
    this.showStatusToast(`✨ Hero creation setup complete: ${this.character.pointBudget} CP budget | ${this.character.formName}`);
  },

  updateCPSpendingLockUI(isLocked) {
    // 1. Ability rank dropdowns
    ['fighting', 'agility', 'strength', 'endurance', 'reason', 'intuition', 'psyche'].forEach(k => {
      const sel = document.getElementById(`select-rank-${k}`);
      if (sel) {
        sel.disabled = isLocked;
        if (isLocked) {
          sel.classList.add('cp-spending-locked');
          sel.title = 'Choose Starting Tier & Physical Form in the setup dialog to spend CP';
        } else {
          sel.classList.remove('cp-spending-locked');
          sel.title = '';
        }
      }
    });

    // 2. Add Power Button
    const addPowerBtn = document.getElementById('btn-add-power');
    if (addPowerBtn) {
      addPowerBtn.disabled = isLocked;
      if (isLocked) {
        addPowerBtn.classList.add('cp-spending-locked');
        addPowerBtn.title = 'Choose Starting Tier & Physical Form in the setup dialog to spend CP';
      } else {
        addPowerBtn.classList.remove('cp-spending-locked');
        addPowerBtn.title = '';
      }
    }

    // 3. Add Talent & Add Contact Buttons
    const addTalentBtn = document.getElementById('btn-add-talent');
    if (addTalentBtn) {
      addTalentBtn.disabled = isLocked;
      if (isLocked) {
        addTalentBtn.classList.add('cp-spending-locked');
        addTalentBtn.title = 'Choose Starting Tier & Physical Form in the setup dialog to spend CP';
      } else {
        addTalentBtn.classList.remove('cp-spending-locked');
        addTalentBtn.title = '';
      }
    }
    const addContactBtn = document.getElementById('btn-add-contact');
    if (addContactBtn) {
      addContactBtn.disabled = isLocked;
      if (isLocked) {
        addContactBtn.classList.add('cp-spending-locked');
        addContactBtn.title = 'Choose Starting Tier & Physical Form in the setup dialog to spend CP';
      } else {
        addContactBtn.classList.remove('cp-spending-locked');
        addContactBtn.title = '';
      }
    }

    // 4. Resources Selectors
    const resSel = document.getElementById('select-rank-resources');
    if (resSel) {
      resSel.disabled = isLocked;
      if (isLocked) {
        resSel.classList.add('cp-spending-locked');
        resSel.title = 'Choose Starting Tier & Physical Form in the setup dialog to spend CP';
      } else {
        resSel.classList.remove('cp-spending-locked');
        resSel.title = '';
      }
    }
    const bgResSel = document.getElementById('background-resource-select');
    if (bgResSel) {
      bgResSel.disabled = isLocked;
      if (isLocked) {
        bgResSel.classList.add('cp-spending-locked');
        bgResSel.title = 'Choose Starting Tier & Physical Form in the setup dialog to spend CP';
      } else {
        bgResSel.classList.remove('cp-spending-locked');
        bgResSel.title = '';
      }
    }
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

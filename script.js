document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    // I. MASTER DATA & CONSTANTS
    // ===================================================================
    const SKILL_DATA = {
        "": { maxLevel: 0 },
        "악취 내성": { maxLevel: 2 },
        "아이템 사용 강화": { maxLevel: 3 },
        "위협": { maxLevel: 3 },
        "동반자 지휘": { maxLevel: 5 },
        "회심격【특수】": { maxLevel: 3 },
        "번개속성 공격 강화": { maxLevel: 3 },
        "완충": { maxLevel: 1 },
        "회심격【속성】": { maxLevel: 3 },
        "관통탄/용화살 강화": { maxLevel: 1 },
        "회복 속도": { maxLevel: 3 },
        "회피 거리 UP": { maxLevel: 3 },
        "재난대처능력": { maxLevel: 5 },
        "회피 장전": { maxLevel: 1 },
        "번개 내성": { maxLevel: 3 },
        "환경 이용 지식": { maxLevel: 3 },
        "환경 적응": { maxLevel: 2 },
        "회피 성능": { maxLevel: 5 },
        "가드 성능": { maxLevel: 3 },
        "가드 강화": { maxLevel: 3 },
        "기절 내성": { maxLevel: 3 },
        "강화 지속": { maxLevel: 3 },
        "급습": { maxLevel: 3 },
        "버섯 애호가": { maxLevel: 3 },
        "역습": { maxLevel: 3 },
        "클라이머": { maxLevel: 1 },
        "연찬": { maxLevel: 1 },
        "KO술": { maxLevel: 3 },
        "멸기병 추가": { maxLevel: 1 },
        "속박 내성": { maxLevel: 3 },
        "얼음속성 공격 강화": { maxLevel: 3 },
        "곤충박사": { maxLevel: 1 },
        "공세": { maxLevel: 5 },
        "얼음 내성": { maxLevel: 3 },
        "광역화": { maxLevel: 5 },
        "혼신": { maxLevel: 3 },
        "공격": { maxLevel: 7 },
        "고속 변형": { maxLevel: 3 },
        "교격": { maxLevel: 5 },
        "칼날 연마": { maxLevel: 3 },
        "전화위복": { maxLevel: 3 },
        "산탄/강사 강화": { maxLevel: 1 },
        "앙심": { maxLevel: 5 },
        "쇄인자격": { maxLevel: 5 },
        "식생학": { maxLevel: 4 },
        "집중": { maxLevel: 3 },
        "심안": { maxLevel: 3 },
        "약점 특효": { maxLevel: 5 },
        "점프 철인": { maxLevel: 1 },
        "스태미나 급속 회복": { maxLevel: 3 },
        "수면 내성": { maxLevel: 3 },
        "스태미나 탈취": { maxLevel: 3 },
        "수면속성 강화": { maxLevel: 3 },
        "수면병 추가": { maxLevel: 1 },
        "공격적인 방어": { maxLevel: 3 },
        "정령의 가호": { maxLevel: 3 },
        "섬광 강화": { maxLevel: 1 },
        "정비": { maxLevel: 5 },
        "속사 강화": { maxLevel: 1 },
        "속성 변환": { maxLevel: 3 },
        "속성 피해 내성": { maxLevel: 3 },
        "속성 흡수": { maxLevel: 3 },
        "장인": { maxLevel: 5 },
        "달인의 재주": { maxLevel: 1 },
        "모으기 타격 강화": { maxLevel: 1 },
        "체술": { maxLevel: 5 },
        "체력 회복량 UP": { maxLevel: 3 },
        "내진": { maxLevel: 3 },
        "탄도 강화": { maxLevel: 3 },
        "슈퍼회심": { maxLevel: 5 },
        "차지 마스터": { maxLevel: 3 },
        "지질학": { maxLevel: 3 },
        "힘의 해방": { maxLevel: 5 },
        "도전자": { maxLevel: 5 },
        "통상탄/통상화살 강화": { maxLevel: 1 },
        "특수 사격 강화": { maxLevel: 2 },
        "뛰어들기": { maxLevel: 1 },
        "숫돌 사용 고속화": { maxLevel: 2 },
        "독 내성": { maxLevel: 3 },
        "둔기 사용": { maxLevel: 3 },
        "독 대미지 강화": { maxLevel: 1 },
        "독병 추가": { maxLevel: 1 },
        "독속성 강화": { maxLevel: 3 },
        "납도술": { maxLevel: 3 },
        "배고픔 내성": { maxLevel: 3 },
        "빨리 먹기": { maxLevel: 3 },
        "헌터 생활": { maxLevel: 1 },
        "파괴왕": { maxLevel: 3 },
        "폭파병 추가": { maxLevel: 1 },
        "발도술【기】": { maxLevel: 3 },
        "발도술【힘】": { maxLevel: 3 },
        "폭파속성 강화": { maxLevel: 3 },
        "폭파 피해 내성": { maxLevel: 3 },
        "불속성 공격 강화": { maxLevel: 3 },
        "불 내성": { maxLevel: 3 },
        "비연": { maxLevel: 1 },
        "움찔 감소": { maxLevel: 3 },
        "포스샷": { maxLevel: 3 },
        "퍼스트샷": { maxLevel: 3 },
        "풍압 내성": { maxLevel: 3 },
        "완전 충전": { maxLevel: 5 },
        "피리 명인": { maxLevel: 2 },
        "포탄 장전": { maxLevel: 2 },
        "포술": { maxLevel: 3 },
        "방어력 DOWN 내성": { maxLevel: 3 },
        "방어": { maxLevel: 7 },
        "보머": { maxLevel: 3 },
        "마비병 추가": { maxLevel: 1 },
        "만족감": { maxLevel: 3 },
        "마비 내성": { maxLevel: 3 },
        "마비속성 강화": { maxLevel: 3 },
        "물가/기름 진흙 적응": { maxLevel: 2 },
        "물 내성": { maxLevel: 3 },
        "귀마개": { maxLevel: 3 },
        "간파": { maxLevel: 5 },
        "물속성 공격 강화": { maxLevel: 3 },
        "무아지경": { maxLevel: 3 },
        "런너": { maxLevel: 3 },
        "용 내성": { maxLevel: 3 },
        "용속성 공격 강화": { maxLevel: 3 },
        "열상 내성": { maxLevel: 3 },
        "연격": { maxLevel: 5 },
        "명검": { maxLevel: 3 }
    };
    const ALL_SKILLS = Object.keys(SKILL_DATA).sort();

    let charmsData = [];
    
    // NEW: State variables for filter controls
    let isAutoFilterEnabled = false;
    let areSlotsIncludedInFilter = false;
    
    // UI Element References
    const searchContainer = document.getElementById('search');
    const listContainer = document.getElementById('list');
    const csvInput = document.getElementById('csv-input');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const autoFilterToggle = document.getElementById('auto-filter-toggle');
    const slotsFilterToggle = document.getElementById('slots-filter-toggle');
    const manualSearchBtn = document.getElementById('manual-search-btn');
    const clearFilterBtn = document.getElementById('clear-filter-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');

    const importBtn = document.getElementById('import-btn');
    const exportClipboardBtn = document.getElementById('export-clipboard-btn');
    const importModal = document.getElementById('import-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const importCsvBtn = document.getElementById('import-csv-btn');
    const charmCountDisplay = document.getElementById('charm-count-display');

    // ===================================================================
    // II. NEW: MODAL FUNCTIONS
    // ===================================================================
    const openModal = () => {
        importModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    };
    const closeModal = () => {
        importModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    };    

    // ===================================================================
    // III. CORE DATA & RENDER FUNCTIONS (FIXED)
    // ===================================================================

    const saveToLocalStorage = () => localStorage.setItem('charmsData', JSON.stringify(charmsData));
    const loadFromLocalStorage = () => { charmsData = JSON.parse(localStorage.getItem('charmsData')) || []; };

    /** Main function to render the list. It re-filters the data every time. */
    const renderList = () => {
        const filteredCharms = getFilteredCharms();
        // NEW: Create a reversed copy for LIFO (stack) display order.
        // The original charmsData array is NOT mutated.
        const charmsToDisplay = [...filteredCharms].reverse();

        // ADDITION 1: Update the charm count display
        charmCountDisplay.textContent = `(${filteredCharms.length} / ${charmsData.length})`;

        listContainer.innerHTML = '';
        charmsToDisplay.forEach(charm => {
            const charmElement = document.createElement('div');
            charmElement.className = `charm-entry list-item ${charm.isEditing ? 'is-editing' : ''}`;
            charmElement.dataset.id = charm.id;
            
            charmElement.innerHTML = charm.isEditing ? createEditHTML(charm) : createDisplayHTML(charm);
            listContainer.appendChild(charmElement);
        });
        
        if (document.querySelector('.is-editing')) {
            initializeEditFormAutocompletes();
        }
    };

    // ===================================================================
    // IV. HTML TEMPLATE GENERATORS (Unchanged)
    // ===================================================================

    // createSkillHTML, createSlotsHTML, createDisplayHTML are the same as the previous correct version
    const createSkillHTML = (skill) => `<div class="list-group">${skill.name ? `<span>${skill.name}</span><strong>${skill.level}</strong>` : '<span>-</span>'}</div>`;
    const createSlotsHTML = (slots) => {
        const weaponSlot = slots.slice(3).find(s => s > 0) || '-';
        const armorSlots = slots.slice(0, 3).filter(s => s > 0).join('-') || '-';
        return `<div class="list-group slots-group">
            <img src="greatsword.png" alt="Weapon Slot Icon"> ${weaponSlot}
            <img src="head.png" alt="Armor Slot Icon"> ${armorSlots}
        </div>`;
    };
    const createDisplayHTML = (charm) => `
        ${charm.skills.map(createSkillHTML).join('')}
        ${createSlotsHTML(charm.slots)}
        <div class="list-group actions-group">
            <button data-action="edit" data-id="${charm.id}">수정</button>
            <button data-action="delete" data-id="${charm.id}" class="delete-btn">삭제</button>
        </div>`;

    const createEditHTML = (charm) => {
        const skillInputsHTML = charm.skills.map((skill, index) => createSkillEditGroupHTML(`skill-${charm.id}-${index}`, skill.name, skill.level)).join('');
        const armorVal = charm.slots.slice(0, 3).filter(s => s > 0).join('-') || '-';
        const weaponVal = charm.slots.slice(3).find(s => s > 0) || 0; // Use 0 for none
        
        const armorOptions = ['-', '1', '1-1', '1-1-1', '2', '2-1', '3'].map(v => `<option value="${v}" ${v === armorVal ? 'selected' : ''}>${v}</option>`).join('');
        const weaponOptions = [
            `<option value="-" ${weaponVal === 0 ? 'selected' : ''}>-</option>`,
            `<option value="1" ${weaponVal === 1 ? 'selected' : ''}>1</option>`
        ].join('');

        return `${skillInputsHTML}
            <div class="search-group slots-group">
                <img src="greatsword.png" alt="Weapon Slot Icon"> <select data-type="weapon-slots">${weaponOptions}</select>
                <img src="head.png" alt="Armor Slot Icon"> <select data-type="armor-slots">${armorOptions}</select>
            </div>
            <div class="list-group actions-group">
                <button data-action="save" data-id="${charm.id}">저장</button>
                <button data-action="cancel" data-id="${charm.id}">취소</button>
            </div>`;
    };

    // UPGRADED: The search box now includes slots and an "Add" button
    const createSearchBoxHTML = () => {
        const armorOptions = ['-', '1', '1-1', '1-1-1', '2', '2-1', '3'].map(v => `<option value="${v}">${v}</option>`).join('');
        const weaponOptions = ['-', '1'].map(v => `<option value="${v}">${v}</option>`).join('');

        return `
            ${createSkillEditGroupHTML('search-1', '', 0, '스킬 1...')}
            ${createSkillEditGroupHTML('search-2', '', 0, '스킬 2...')}
            ${createSkillEditGroupHTML('search-3', '', 0, '스킬 3...')}
            <div class="search-group slots-group">
                <img src="greatsword.png" alt="Weapon Slot Icon">
                <select id="search-weapon-slots">${weaponOptions}</select>
                <img src="head.png" alt="Armor Slot Icon">
                <select id="search-armor-slots">${armorOptions}</select>
            </div>
            <div class="list-group actions-group">
                <button data-action="add" class="add-btn">추가</button>
            </div>
        `;
    };
    
    // ... all other HTML template functions are correct and unchanged from the previous version.
    const createSkillEditGroupHTML = (id, name = '', level = 0, placeholder = '') => {
        // NEW: Check if it's a touch device to add the 'readonly' attribute.
        const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth < 768;
        const readOnlyAttr = isMobile ? 'readonly' : '';

        return `
            <div class="search-group skill-group">
                <div class="input-wrapper">
                    <input type="text" id="input-${id}" placeholder="${placeholder}" value="${name}" autocomplete="off" ${readOnlyAttr}>
                    <!-- ADDITION 2: Add tabindex="-1" to the clear button -->
                    <button class="clear-skill-btn" data-target-id="${id}" tabindex="-1">&times;</button>
                    <div id="results-${id}" class="autocomplete-results hidden"></div>
                </div>
                <select id="level-${id}">${createLevelOptionsHTML(name, level)}</select>
            </div>`;
    }

    const createLevelOptionsHTML = (skillName, selectedLevel = 0) => {
        const skillInfo = SKILL_DATA[skillName];
        if (!skillInfo) return '<option value="0">-</option>';
        let options = '<option value="0">-</option>';
        for (let i = 1; i <= skillInfo.maxLevel; i++) {
            options += `<option value="${i}" ${i === selectedLevel ? 'selected' : ''}>${i}</option>`;
        }
        return options;
    };
    // ===================================================================
    // V. FILTERING & SEARCH LOGIC (Unchanged)
    // ===================================================================
    
    // NEW Helper: Calculates a numerical "score" for a slot configuration
    const getSlotScore = (slotsArray) => {
        // e.g., [2, 1, 0] becomes 2 + 1 + 0 = 3
        return slotsArray.reduce((sum, current) => sum + current, 0);
    };

    const parseSlotString = (slotStr) => {
        if (!slotStr || slotStr === '-') return [0, 0, 0];
        const slots = slotStr.split('-').map(Number);
        while (slots.length < 3) slots.push(0);
        return slots;
    };
    const slotsMeetOrExceed = (charmSlots, filterSlots) => {
        const sortedCharm = [...charmSlots].sort((a, b) => b - a);
        const sortedFilter = [...filterSlots].sort((a, b) => b - a);

        for (const requiredSlot of sortedFilter) {
            if (requiredSlot === 0) continue; // No requirement
            // Find the first available charm slot that can fit this required slot
            const fittingSlotIndex = sortedCharm.findIndex(charmSlot => charmSlot >= requiredSlot);
            
            if (fittingSlotIndex === -1) {
                return false; // No fitting slot found for this requirement
            }
            // "Use up" this charm slot so it can't be used again
            sortedCharm.splice(fittingSlotIndex, 1);
        }
        return true; // All required slots were accommodated
    };
    const getSearchValues = () => {
        const skills = [];
        for (let i = 1; i <= 3; i++) {
            const name = document.getElementById(`input-search-${i}`)?.value;
            const level = parseInt(document.getElementById(`level-search-${i}`)?.value);
            if (name) {
                skills.push({ name, level });
            }
        }
        return {
            skills,
            armorSlots: document.getElementById('search-armor-slots')?.value,
            weaponSlot: document.getElementById('search-weapon-slots')?.value
        };
    };

    const getFilteredCharms = () => {
        const filters = getSearchValues();        // Check if any filters are active AT ALL
        const hasFilters = filters.skills.length > 0 || 
                         (areSlotsIncludedInFilter && (filters.armorSlots !== '-' || filters.weaponSlot !== '-'));

        if (!hasFilters) return charmsData;
        
        return charmsData.filter(charm => {
            // 1. Skill Filtering (with level check)
            const skillMatch = filters.skills.every(filterSkill => 
                charm.skills.some(charmSkill => 
                    charmSkill.name === filterSkill.name && charmSkill.level >= filterSkill.level
                )
            );
            if (!skillMatch) return false;

            // 2. Slot Filtering (with new logic)
            if (areSlotsIncludedInFilter) {
                if (filters.armorSlots !== '-') {
                    const filterArmorSlots = filters.armorSlots.split('-').map(Number);
                    if (!slotsMeetOrExceed(charm.slots.slice(0, 3), filterArmorSlots)) return false;
                }
                if (filters.weaponSlot !== '-') {
                    const filterWeaponSlot = parseInt(filters.weaponSlot) || 0;
                    const charmWeaponSlot = charm.slots.slice(3).find(s => s > 0) || 0;
                    if (charmWeaponSlot < filterWeaponSlot) return false;
                }
            }

            return true;
        });
    };
    
    // UPGRADED: handleFilter now respects the auto-filter toggle
    const handleFilter = () => {
        if (!isAutoFilterEnabled) return;
        renderList();
    };

    // NEW: Function to clear all filter inputs
    const clearFilters = () => {
        searchContainer.innerHTML = createSearchBoxHTML();
        initializeSearchBoxAutocompletes();
        renderList(); // Re-render to show all items
    };
    // ===================================================================
    // VI. CRUD & EVENT HANDLERS (Unchanged)
    // ===================================================================

    // NEW: Delegated event listener for the "X" buttons
    document.querySelector('.card').addEventListener('click', (e) => {
        if (e.target.matches('.clear-skill-btn')) {
            const targetId = e.target.dataset.targetId;
            const inputEl = document.getElementById(`input-${targetId}`);
            const levelEl = document.getElementById(`level-${targetId}`);
            if (inputEl) inputEl.value = '';
            if (levelEl) levelEl.innerHTML = '<option value="0">-</option>';
            handleFilter(); // Re-filter after clearing
        }
    });

    // It correctly calls renderList() at the end.
    searchContainer.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (action !== 'add') return;

        const values = getSearchValues();
        const skillLevels = [
            parseInt(document.getElementById('level-search-1').value),
            parseInt(document.getElementById('level-search-2').value),
            parseInt(document.getElementById('level-search-3').value)
        ];

        if (values.skills.length === 0) {
            return alert("호석을 추가하려면 적어도 하나의 스킬을 선택하세요.");
        }

        const newCharm = {
            id: Date.now(), // FIX: Use integer timestamp for a valid ID.
            skills: [
                { name: values.skills[0]?.name || '', level: values.skills[0]?.level || 0 },
                { name: values.skills[1]?.name || '', level: values.skills[1]?.level || 0 },
                { name: values.skills[2]?.name || '', level: values.skills[2]?.level || 0 },
            ],
            slots: [
                ...(parseSlotString(values.armorSlots)),
                parseInt(values.weaponSlot) || 0, 0, 0
            ]
        };

        charmsData.push(newCharm);
        saveToLocalStorage();
        // Clear the search form
        searchContainer.innerHTML = createSearchBoxHTML();
        initializeSearchBoxAutocompletes();
        renderList(); // Re-render the full list
    });
    
    listContainer.addEventListener('click', (e) => {
        // Use .closest() to robustly find the button that was clicked,
        // even if the user clicks the text inside the button.
        const button = e.target.closest('button[data-action]');
        
        // If the click wasn't on or inside a button with a data-action, do nothing.
        if (!button) return;

        const action = button.dataset.action;
        const id = parseInt(button.dataset.id); 

        // Now that we have a valid ID, this find operation will succeed.
        const charm = charmsData.find(c => c.id === id);
        if (!charm) return; // Safety check in case the charm is not found

        switch (action) {
            case 'delete':
                if (confirm('Are you sure you want to delete this charm?')) {
                    charmsData = charmsData.filter(c => c.id !== id);
                    saveToLocalStorage();
                    renderList();
                }
                break;
            case 'edit':
                charmsData.forEach(c => delete c.isEditing); // Ensure only one can be edited at a time
                charm.isEditing = true;
                renderList();
                break;
            case 'cancel':
                delete charm.isEditing;
                renderList();
                break;
            case 'save':
                const charmEl = button.closest('.charm-entry');
                for (let i = 0; i < 3; i++) {
                    const name = charmEl.querySelector(`#input-skill-${id}-${i}`).value;
                    const level = parseInt(charmEl.querySelector(`#level-skill-${id}-${i}`).value);
                    charm.skills[i] = { name: name, level: name ? level : 0 };
                }
                const armorVal = charmEl.querySelector('[data-type="armor-slots"]').value.split('-').map(Number);
                const weaponVal = parseInt(charmEl.querySelector('[data-type="weapon-slots"]').value) || 0;
                charm.slots = [armorVal[0]||0, armorVal[1]||0, armorVal[2]||0, weaponVal, 0, 0];
                
                delete charm.isEditing;
                saveToLocalStorage();
                renderList();
                break;
        }
    });

    // ===================================================================
    // VI. AUTOCOMPLETE LOGIC (FINAL ENHANCEMENT)
    // ===================================================================
    
    const initializeSearchBoxAutocompletes = () => {
        for (let i = 1; i <= 3; i++) {
            const id = `search-${i}`;
            const input = document.getElementById(`input-${id}`);
            const results = document.getElementById(`results-${id}`);
            const levelSelect = document.getElementById(`level-${id}`);
            
            // FIX: Add event listener to the level select to trigger auto-filter
            levelSelect.addEventListener('change', handleFilter);

            createAutocomplete(input, results, ALL_SKILLS, (skillName) => {
                levelSelect.innerHTML = createLevelOptionsHTML(skillName, 0);
                handleFilter();
            });
            input.addEventListener('input', handleFilter);
        }
        document.getElementById('search-armor-slots').addEventListener('change', handleFilter);
        document.getElementById('search-weapon-slots').addEventListener('change', handleFilter);
    };
    
    const initializeEditFormAutocompletes = () => {
        const editingCharm = charmsData.find(c => c.isEditing);
        if (!editingCharm) return;
        
        for (let i = 0; i < 3; i++) {
            const id = `skill-${editingCharm.id}-${i}`;
            const input = document.getElementById(`input-${id}`);
            const results = document.getElementById(`results-${id}`);
            const levelSelect = document.getElementById(`level-${id}`);
            createAutocomplete(input, results, ALL_SKILLS, (skillName) => {
                levelSelect.innerHTML = createLevelOptionsHTML(skillName, 0);
            });
        }
    };

    function createAutocomplete(inputEl, resultsEl, skillsArray, onSkillSelect) {
        let activeIndex = -1; // Keep track of the highlighted item
        
        // NEW HELPER: Updates the visual highlight on dropdown items
        const updateActiveItem = (items) => {
            items.forEach(item => item.classList.remove('active'));
            if (activeIndex > -1) {
                const activeItem = items[activeIndex];
                activeItem.classList.add('active');
                
                // NEW: Scroll the new active item into the visible area of the dropdown.
                activeItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest' // 'nearest' is less jarring than 'center' for this
                });
            }
        };

        const render = (query = '') => {
            resultsEl.innerHTML = '';
            activeIndex = -1; // Reset index whenever the list is re-rendered
            const filtered = skillsArray.filter(s => s.toLowerCase().includes(query.toLowerCase()));
            if (filtered.length > 0) {
                filtered.forEach(skill => {
                    const item = document.createElement('div');
                    item.textContent = skill;
                    item.addEventListener('mousedown', () => {
                        inputEl.value = skill;
                        resultsEl.classList.add('hidden');
                        if (onSkillSelect) onSkillSelect(skill);
                    });
                    resultsEl.appendChild(item);
                });
                resultsEl.classList.remove('hidden');
            } else {
                resultsEl.classList.add('hidden');
            }
        };

        // The keydown listener is correct and unchanged
        inputEl.addEventListener('keydown', (e) => {
            const items = resultsEl.querySelectorAll('div');
            if (resultsEl.classList.contains('hidden') || items.length === 0) return;

            if (e.key === 'Tab') {
                resultsEl.classList.add('hidden'); // Close the dropdown
                return; // Stop processing so the default Tab behavior can continue
            }

            // The existing logic for Arrow keys, Enter, and Escape
            if (items.length === 0) return;
            if (e.key === 'ArrowDown') {
                e.preventDefault(); // Prevent cursor from moving in the input
                activeIndex = (activeIndex + 1) % items.length;
                updateActiveItem(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault(); // Prevent cursor from moving in the input
                activeIndex = (activeIndex - 1 + items.length) % items.length;
                updateActiveItem(items);
            } else if (e.key === 'Enter') {
                if (activeIndex > -1) {
                    e.preventDefault(); // Prevent form submission if it's ever in a form
                    items[activeIndex].dispatchEvent(new Event('mousedown'));
                }
            } else if (e.key === 'Escape') {
                resultsEl.classList.add('hidden');
            }
        });

        inputEl.addEventListener('focus', () => {
            // FIX: When one input is focused, close all OTHER dropdowns.
            document.querySelectorAll('.autocomplete-results').forEach(el => {
                if (el !== resultsEl) {
                    el.classList.add('hidden');
                }
            });
            render(inputEl.value);

            // 3. NEW: Smart scroll for mobile devices
            // Check if we are likely on a touch device to avoid this on desktops.
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            if (isTouchDevice) {
                // After a short delay to allow the keyboard to appear...
                setTimeout(() => {
                    // ...scroll the input element to the middle of the visible screen.
                    inputEl.scrollIntoView({
                        behavior: 'smooth', // For a nice, smooth scroll
                        block: 'center',    // Vertically align to the center
                    });
                }, 300); // A 300ms delay is usually enough.
            }
        });

        // The input listener for typing is correct and unchanged
        inputEl.addEventListener('input', () => render(inputEl.value));

        //
        // THIS IS THE NEW, MINIMAL ADDITION
        //
        // Add a 'blur' event listener that fires when the user tabs or clicks away.
        inputEl.addEventListener('blur', () => {
            const currentText = inputEl.value;

            // Check if the text typed by the user is an exact match for a valid skill.
            // We use .find() on ALL_SKILLS to ensure case-insensitivity isn't a problem,
            // although in our case, it's not strictly necessary.
            const perfectMatch = ALL_SKILLS.find(skill => skill.toLowerCase() === currentText.toLowerCase());

            if (perfectMatch) {
                // If there's a perfect match, normalize the capitalization
                // and trigger the callback to populate the level select.
                inputEl.value = perfectMatch;
                if (onSkillSelect) {
                    onSkillSelect(perfectMatch);
                }
            }
            
            // After a very short delay, hide the results. The delay prevents the dropdown
            // from disappearing before a click on a result item can be registered.
            setTimeout(() => {
                resultsEl.classList.add('hidden');
            }, 150);
        });
    }
        
    // The global click listener for hiding dropdowns remains correct
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.input-wrapper')) {
            document.querySelectorAll('.autocomplete-results').forEach(el => el.classList.add('hidden'));
        }
    });
    // ===================================================================
    // VIII. CSV IMPORT / EXPORT (UPGRADED)
    // ===================================================================
    
    const parseCSV = (text) => {
        return text.trim().split('\n').map((row, index) => { // <-- Added 'index' here
            const cols = row.split(',');
            if (cols.length < 12) return null;
            return {
                id: Date.now() + index, 
                skills: [
                    { name: cols[0] || '', level: parseInt(cols[1]) || 0 },
                    { name: cols[2] || '', level: parseInt(cols[3]) || 0 },
                    { name: cols[4] || '', level: parseInt(cols[5]) || 0 }
                ],
                slots: cols.slice(6, 12).map(Number)
            };
        }).filter(Boolean); // Filter out any null (invalid) rows
    };
    
    const formatForCSV = () => 
        charmsData.map(c => [
            ...c.skills.flatMap(s => [s.name, s.level]), ...c.slots
        ].join(',')).join('\n');

    importBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    importModal.addEventListener('click', (e) => {
        // Close modal if user clicks on the dark overlay
        if (e.target === importModal) {
            closeModal();
        }
    });

    importCsvBtn.addEventListener('click', () => { // Note: this is the button INSIDE the modal
        const newCharms = parseCSV(csvInput.value);
        if (newCharms.length > 0) {
            charmsData.push(...newCharms);
            saveToLocalStorage();
            renderList();
            csvInput.value = '';
            closeModal(); // Close modal on successful import
            alert(`${newCharms.length}개의 호석을 성공적으로 가져왔습니다!`);
        } else {
            alert('유효한 호석을 찾을 수 없습니다. CSV 형식을 확인하세요.');
        }
    });

    // UPGRADED: Export now copies to clipboard
    exportClipboardBtn.addEventListener('click', () => {
        if (charmsData.length === 0) return alert('내보낼 호석이 없습니다.');
        
        const csvContent = formatForCSV();
        console.log(navigator.clipboard)
        navigator.clipboard.writeText(csvContent).then(() => {
            // Success feedback
            const originalText = exportClipboardBtn.textContent;
            exportClipboardBtn.textContent = '복사완료!';
            setTimeout(() => {
                exportClipboardBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            // Error feedback
            console.error('Failed to copy to clipboard:', err);
            alert('클립보드에 복사하는 데 실패했습니다. 브라우저 권한을 확인해 주세요.');
        });
    });


    // ===================================================================
    // IX. THEME & INITIALIZATION (Unchanged)
    // ===================================================================
    
    function setTheme(theme) {
        htmlEl.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
        themeToggleBtn.textContent = theme === 'dark' ? '라이트 모드' : '다크 모드';
    }
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = htmlEl.classList.contains('dark') ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // --- NEW: Event Listeners for Filter Controls ---
    autoFilterToggle.addEventListener('change', (e) => {
        isAutoFilterEnabled = e.target.checked;
        manualSearchBtn.classList.toggle('hidden', isAutoFilterEnabled);
        
        // FIX: If the user just RE-ENABLED auto-filter, run a search immediately.
        if (isAutoFilterEnabled) {
            handleFilter();
        }
        localStorage.setItem('isAutoFilterEnabled', isAutoFilterEnabled);
    });
    
    slotsFilterToggle.addEventListener('change', (e) => {
        areSlotsIncludedInFilter = e.target.checked;
        handleFilter(); // Re-filter immediately when this changes
        localStorage.setItem('areSlotsIncludedInFilter', areSlotsIncludedInFilter);
    });
    
    manualSearchBtn.addEventListener('click', () => {
        renderList(); // Manually trigger a render/filter
    });

    clearFilterBtn.addEventListener('click', clearFilters);

    // --- NEW: Event Listener for Delete All Button ---
    deleteAllBtn.addEventListener('click', () => {
        if (charmsData.length === 0) {
            return alert('삭제할 호석이 없습니다.');
        }

        if (confirm('모든 호석을 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.')) {
            charmsData = []; // Wipe the data array
            saveToLocalStorage(); // Persist the empty array
            renderList(); // Re-render the now-empty list
        }
    });

    // --- App Initialization ---
    searchContainer.innerHTML = createSearchBoxHTML();
    loadFromLocalStorage();
    renderList(); // Initial render
    initializeSearchBoxAutocompletes();
    setTheme(localStorage.getItem('theme') ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    
    isAutoFilterEnabled = localStorage.getItem('isAutoFilterEnabled') === 'true';
    areSlotsIncludedInFilter = localStorage.getItem('areSlotsIncludedInFilter') === 'true';
 

    autoFilterToggle.checked = isAutoFilterEnabled;
    slotsFilterToggle.checked = areSlotsIncludedInFilter;
    manualSearchBtn.classList.toggle('hidden', isAutoFilterEnabled);
});
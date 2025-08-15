document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    // I. MASTER DATA & CONSTANTS
    // ===================================================================
    const SKILL_DATA = {
        "공격": { maxLevel: 3 }, "간파": { maxLevel: 3 }, "납도술": { maxLevel: 3 },
        "체력회복": { maxLevel: 3 }, "슈퍼회심": { maxLevel: 1 }, "약점특효": { maxLevel: 1 },
        "가드 성능": { maxLevel: 2 }, "공격적인 방어": { maxLevel: 1 }, "숫돌 사용 고속화": { maxLevel: 1 },
    };
    const ALL_SKILLS = Object.keys(SKILL_DATA).sort();
    let charmsData = [];
    
    // NEW: State variables for filter controls
    let isAutoFilterEnabled = true;
    let areSlotsIncludedInFilter = true;
    
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
            <img src="/greatsword.png" alt="Weapon Slot Icon"> ${weaponSlot}
            <img src="/head.png" alt="Armor Slot Icon"> ${armorSlots}
        </div>`;
    };
    const createDisplayHTML = (charm) => `
        ${charm.skills.map(createSkillHTML).join('')}
        ${createSlotsHTML(charm.slots)}
        <div class="list-group actions-group">
            <button data-action="edit" data-id="${charm.id}">Edit</button>
            <button data-action="delete" data-id="${charm.id}" class="delete-btn">Delete</button>
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
                <img src="/greatsword.png" alt="Weapon Slot Icon"> <select data-type="weapon-slots">${weaponOptions}</select>
                <img src="/head.png" alt="Armor Slot Icon"> <select data-type="armor-slots">${armorOptions}</select>
            </div>
            <div class="list-group actions-group">
                <button data-action="save" data-id="${charm.id}">Save</button>
                <button data-action="cancel" data-id="${charm.id}">Cancel</button>
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
                <img src="/greatsword.png" alt="Weapon Slot Icon">
                <select id="search-weapon-slots">${weaponOptions}</select>
                <img src="/head.png" alt="Armor Slot Icon">
                <select id="search-armor-slots">${armorOptions}</select>
            </div>
            <div class="list-group actions-group">
                <button data-action="add" class="add-btn">Add Charm</button>
            </div>
        `;
    };
    
    // ... all other HTML template functions are correct and unchanged from the previous version.
    const createSkillEditGroupHTML = (id, name = '', level = 0, placeholder = '') => `
        <div class="search-group skill-group">
            <div class="input-wrapper">
                <input type="text" id="input-${id}" placeholder="${placeholder}" value="${name}" autocomplete="off">
                <div id="results-${id}" class="autocomplete-results hidden"></div>
            </div>
            <select id="level-${id}">${createLevelOptionsHTML(name, level)}</select>
        </div>`;

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
    
    const parseSlotString = (slotStr) => {
        if (!slotStr || slotStr === '-') return [0, 0, 0];
        const slots = slotStr.split('-').map(Number);
        while (slots.length < 3) slots.push(0);
        return slots;
    };
    const slotsMeetOrExceed = (charmSlots, filterSlots) => {
        // Sort both arrays descending to compare biggest slots first
        const sortedCharm = [...charmSlots].sort((a, b) => b - a);
        const sortedFilter = [...filterSlots].sort((a, b) => b - a);
        // Every required filter slot must be met or exceeded by a charm slot
        for (let i = 0; i < sortedFilter.length; i++) {
            if (sortedFilter[i] === 0) continue; // Don't need to check empty filter slots
            if (sortedCharm[i] < sortedFilter[i]) {
                return false; // Charm doesn't meet requirement
            }
        }
        return true;
    };

    const getSearchValues = () => {
        return {
            skills: [
                document.getElementById('input-search-1')?.value,
                document.getElementById('input-search-2')?.value,
                document.getElementById('input-search-3')?.value
            ].filter(term => term && term.trim() !== ''),
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
            // 1. Skill Filtering (AND logic)
            const charmSkills = charm.skills.map(s => s.name);
            if (!filters.skills.every(term => charmSkills.includes(term))) return false;

            // 2. Slot Filtering (Now conditional)
            if (areSlotsIncludedInFilter) {
                // Armor Slot Filtering
                if (filters.armorSlots !== '-') {
                    const charmArmorSlotString = charm.slots.slice(0, 3).filter(s => s > 0).join('-') || '-';
                    if (charmArmorSlotString !== filters.armorSlots) return false;
                } else if (charm.slots.slice(0, 3).some(s => s > 0)) return false;

                // Weapon Slot Filtering
                if (filters.weaponSlot !== '-') {
                    const charmWeaponSlot = charm.slots.slice(3).find(s => s > 0) || 0;
                    if (String(charmWeaponSlot) !== filters.weaponSlot) return false;
                } else if (charm.slots.slice(3).some(s => s > 0)) return false;
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
            return alert("Please select at least one skill to add a charm.");
        }

        const newCharm = {
            id: Date.now(), // FIX: Use integer timestamp for a valid ID.
            skills: [
                { name: values.skills[0] || '', level: values.skills[0] ? skillLevels[0] : 0 },
                { name: values.skills[1] || '', level: values.skills[1] ? skillLevels[1] : 0 },
                { name: values.skills[2] || '', level: values.skills[2] ? skillLevels[2] : 0 },
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
        alert("Charm added successfully!");
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
    // VII. AUTOCOMPLETE LOGIC (Unchanged)
    // ===================================================================
    
    const initializeSearchBoxAutocompletes = () => {
        for (let i = 1; i <= 3; i++) {
            const input = document.getElementById(`input-search-${i}`);
            const results = document.getElementById(`results-search-${i}`);
            const levelSelect = document.getElementById(`level-search-${i}`);
            createAutocomplete(input, results, ALL_SKILLS, (skillName) => {
                levelSelect.innerHTML = createLevelOptionsHTML(skillName, 0);
                handleFilter();
            });            
            input.addEventListener('input', handleFilter); // This now correctly calls the wrapper.
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
        const render = (query = '') => {
            resultsEl.innerHTML = '';
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
        inputEl.addEventListener('focus', () => render(inputEl.value));
        inputEl.addEventListener('input', () => render(inputEl.value));
    }
    
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
            alert(`${newCharms.length} charm(s) imported successfully!`);
        } else {
            alert('No valid charms found. Please check the CSV format.');
        }
    });

    // UPGRADED: Export now copies to clipboard
    exportClipboardBtn.addEventListener('click', () => {
        if (charmsData.length === 0) return alert('No charms to export.');
        
        const csvContent = formatForCSV();
        console.log(navigator.clipboard)
        navigator.clipboard.writeText(csvContent).then(() => {
            // Success feedback
            const originalText = exportClipboardBtn.textContent;
            exportClipboardBtn.textContent = 'Copied!';
            setTimeout(() => {
                exportClipboardBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            // Error feedback
            console.error('Failed to copy to clipboard:', err);
            alert('Failed to copy to clipboard. Check browser permissions.');
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
    });
    
    slotsFilterToggle.addEventListener('change', (e) => {
        areSlotsIncludedInFilter = e.target.checked;
        handleFilter(); // Re-filter immediately when this changes
    });
    
    manualSearchBtn.addEventListener('click', () => {
        renderList(); // Manually trigger a render/filter
    });

    clearFilterBtn.addEventListener('click', clearFilters);

    // --- NEW: Event Listener for Delete All Button ---
    deleteAllBtn.addEventListener('click', () => {
        if (charmsData.length === 0) {
            return alert('There are no charms to delete.');
        }

        if (confirm('Are you sure you want to delete ALL charms? This action cannot be undone.')) {
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
});
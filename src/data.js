import './style.css';
const allBtn = document.getElementById('btn-all');
const actvBtn = document.getElementById('btn-actv');
const inactvBtn = document.getElementById('btn-inactv');
const itemsList = document.getElementById('item-list');
const brightBtn = document.getElementById('bright');
const darkBtn = document.getElementById('dark');

let items = [];
let currentFilter = 'all';

//loading data from the data.json file
async function loadData() {
    try {
        const response = await fetch('data.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        items = await response.json(); // parsing the JSON data

        renderItems('all');

    } catch (error) {
        console.error(`Error fetching or processing data: ${error}`);
    }
}

function renderItems(filter) {
    itemsList.innerHTML = '';

    //using the all, active, inactive buttons to render cards based on the button selected
    const filtered = items.filter(item => {
        if (filter === 'all') {
            allBtn.classList.add('background-color');
            actvBtn.classList.remove('background-color');
            inactvBtn.classList.remove('background-color');
            allBtn.classList.add('hoverState');
            actvBtn.classList.remove('hoverState');
            inactvBtn.classList.remove('hoverState');
            return true;
        }
        if (filter === 'active') {
            allBtn.classList.remove('background-color');
            actvBtn.classList.add('background-color');
            inactvBtn.classList.remove('background-color');
            actvBtn.classList.add('hoverState');
            allBtn.classList.remove('hoverState');
            inactvBtn.classList.remove('hoverState');
            return item.isActive === true;
        }
        if (filter === 'inactive') {
            allBtn.classList.remove('background-color');
            actvBtn.classList.remove('background-color');
            inactvBtn.classList.add('background-color');
            inactvBtn.classList.add('hoverState');
            allBtn.classList.remove('hoverState');
            actvBtn.classList.remove('hoverState');
            return item.isActive === false;
        }
    });

    //looping through each item using forEach
    filtered.forEach(item => {
        const extDiv = document.createElement('div'); //create new list item

        extDiv.classList.add('ext-card');

        extDiv.innerHTML = `
            <div class="card-header">
                <img class="card-logo" src="${item.logo}">
                <div class="card-info">
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-desc">${item.description}</p>
                </div>
            </div>
            <div class="card-actions">
                <button class="remove">${item.remove}</button>
                <label class="switch">
                <input type="checkbox" class="toggle" ${item.isActive ? "checked" : ""}>
                <span class="slider"></span>
                </label>
            </div>`;

        itemsList.appendChild(extDiv);

        //accesses the active button that is to be rendered as an on/off btn
        const toggleBtn = extDiv.querySelector('.toggle');
        toggleBtn.type = 'checkbox';
        toggleBtn.id = 'toggleSwitch';

        toggleBtn.addEventListener("change", () => {
            console.log(`Toggle changed to ${toggleBtn.checked}`);

            //change the item's isActive property to either false or true based on toggled switch
            item.isActive = toggleBtn.checked;
        });

        const toggleLabel = document.createElement('label');
        toggleLabel.htmlFor = 'toggleSwitch';
        toggleLabel.classList.add('switch-style');


        const removeBtn = extDiv.querySelector('.remove');
        //remove button is clicked and items are returned without the removed item in the new render
        removeBtn.addEventListener('click', () => {
            items = items.filter(i => i.name !== item.name);
            //console.log(`Item popped: ${item.name}`); :TESTING
            renderItems(currentFilter);
        });

    });

}


allBtn.addEventListener('click', () => {
    currentFilter = 'all';
    renderItems('all');
});
actvBtn.addEventListener('click', () => {
    currentFilter = 'active';
    renderItems('active');
});
inactvBtn.addEventListener('click', () => {
    currentFilter = 'inactive';
    renderItems('inactive');
});

function toggleButtns() {
    if (!darkBtn.classList.contains('hidden')) {
        darkBtn.classList.add('hidden');
        brightBtn.classList.remove('hidden');
    }
    else {
        brightBtn.classList.add('hidden');
        darkBtn.classList.remove('hidden');
    }
}

brightBtn.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
    toggleButtns();
});

darkBtn.addEventListener('click', () => {
    document.body.classList.add('dark-mode');
    toggleButtns();
});

export { loadData };
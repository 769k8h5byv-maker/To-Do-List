let lists = [
    {
        id: 1,
        name: "My To-Do List",
        tasks: []
    }
];

let currentListId = 1;


// SHOW TABS
function renderTabs() {

    const tabs = document.getElementById("tabs");

    tabs.innerHTML = "";

    lists.forEach(function(list) {

        const tab = document.createElement("button");

        tab.className = "listTab";

        if (list.id === currentListId) {
            tab.classList.add("activeTab");
        }

        const name = document.createElement("span");

        name.textContent = list.name;


        const x = document.createElement("span");

        x.textContent = "×";

        x.className = "deleteTab";


        x.onclick = function(event) {

            event.stopPropagation();

            if (lists.length === 1) {
                return;
            }

            lists = lists.filter(function(item) {
                return item.id !== list.id;
            });

            currentListId = lists[0].id;

            renderTabs();
        };


        tab.appendChild(name);

        tab.appendChild(x);


        tab.onclick = function() {

            currentListId = list.id;

            renderTabs();

            document.getElementById("listTitle").textContent =
                list.name;
        };


        tabs.appendChild(tab);

    });


    const addButton =
        document.createElement("button");

    addButton.className = "addTab";

    addButton.textContent = "+";


    addButton.onclick = function() {

        const name =
            prompt("Name your new list:");

        if (!name || name.trim() === "") {
            return;
        }


        const newList = {

            id: Date.now(),

            name: name.trim(),

            tasks: []

        };


        lists.push(newList);

        currentListId = newList.id;

        renderTabs();

        document.getElementById("listTitle").textContent =
            newList.name;

    };


    tabs.appendChild(addButton);
}


// DATE

const today = new Date();

document.getElementById("date").textContent =
    today.toLocaleDateString("en-CA", {

        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"

    });


// START

renderTabs();

document.getElementById("listTitle").textContent =
    "My To-Do List";

const today = new Date();

document.getElementById("date").textContent =
    today.toLocaleDateString("en-CA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });


// -------------------------
// LISTS
// -------------------------

let lists = JSON.parse(localStorage.getItem("todoLists"));

if (!lists || lists.length === 0) {
    lists = [
        {
            name: "My To-Do List",
            tasks: []
        }
    ];
}

let currentList = 0;


// -------------------------
// SAVE
// -------------------------

function saveLists() {
    localStorage.setItem("todoLists", JSON.stringify(lists));
}


// -------------------------
// SHOW TABS
// -------------------------

function displayTabs() {

    const tabs = document.getElementById("tabs");

    tabs.innerHTML = "";

    lists.forEach(function(list, index) {

        const tab = document.createElement("button");

        tab.textContent = list.name;

        if (index === currentList) {
            tab.classList.add("activeTab");
        }

        tab.onclick = function() {

            currentList = index;

            displayTabs();
            displayCurrentList();
        };

        tabs.appendChild(tab);
    });


    const addTab = document.createElement("button");

    addTab.textContent = "+";
    addTab.classList.add("addTab");

    addTab.onclick = addList;

    tabs.appendChild(addTab);
}


// -------------------------
// DISPLAY CURRENT LIST
// -------------------------

function displayCurrentList() {

    document.getElementById("listTitle").textContent =
        lists[currentList].name;

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    lists[currentList].tasks.forEach(function(task) {

        createSavedTask(task);
    });
}


// -------------------------
// ADD NEW LIST
// -------------------------

function addList() {

    const name = prompt("Name your new list:");

    if (!name || name.trim() === "") {
        return;
    }

    lists.push({
        name: name.trim(),
        tasks: []
    });

    currentList = lists.length - 1;

    saveLists();

    displayTabs();
    displayCurrentList();
}


// -------------------------
// RENAME LIST
// -------------------------

function editListTitle() {

    const title = document.getElementById("listTitle");

    const button = document.getElementById("editTitleButton");

    const input = document.createElement("input");

    input.type = "text";
    input.id = "listTitleInput";
    input.value = lists[currentList].name;

    title.replaceWith(input);

    input.focus();
    input.select();

    button.textContent = "✓";

    input.onkeydown = function(event) {

        if (event.key === "Enter") {
            saveListTitle();
        }
    };

    button.onclick = saveListTitle;
}


function saveListTitle() {

    const input = document.getElementById("listTitleInput");

    if (!input) {
        return;
    }

    const newTitle = input.value.trim();

    if (newTitle === "") {
        return;
    }

    lists[currentList].name = newTitle;

    saveLists();

    displayTabs();
    displayCurrentList();
}


// -------------------------
// ADD TASK
// -------------------------

function addTask() {

    const taskList = document.getElementById("taskList");

    const task = document.createElement("label");

    task.innerHTML = `
        <input type="checkbox">
        <input
            type="text"
            class="taskText"
            placeholder="Type your task here..."
        >
        <button>Accept</button>
    `;

    taskList.appendChild(task);

    const checkbox =
        task.querySelector("input[type='checkbox']");

    const textBox =
        task.querySelector(".taskText");

    const acceptButton =
        task.querySelector("button");


    checkbox.onchange = function() {
        toggleTask(this);
    };


    textBox.onkeydown = function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            acceptTask(acceptButton);
        }
    };


    acceptButton.onclick = function() {

        acceptTask(this);
    };


    textBox.focus();
}


// -------------------------
// ACCEPT TASK
// -------------------------

function acceptTask(button) {

    const task = button.parentElement;

    const textBox = task.querySelector(".taskText");

    const checkbox =
        task.querySelector("input[type='checkbox']");

    const text = textBox.value.trim();

    if (text === "") {
        return;
    }

    textBox.readOnly = true;

    button.textContent = "Edit";

    button.onclick = function() {
        editTask(this);
    };


    const deleteButton =
        document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.onclick = function() {

        deleteTask(this);
    };

    task.appendChild(deleteButton);


    // Save it
    lists[currentList].tasks.push({
        text: text,
        completed: checkbox.checked
    });

    saveLists();
}


// -------------------------
// EDIT TASK
// -------------------------

function editTask(button) {

    const task = button.parentElement;

    const textBox =
        task.querySelector(".taskText");

    textBox.readOnly = false;

    textBox.focus();

    button.textContent = "Accept";

    button.onclick = function() {

        updateTask(this);
    };
}


// -------------------------
// UPDATE TASK
// -------------------------

function updateTask(button) {

    const task = button.parentElement;

    const textBox =
        task.querySelector(".taskText");

    const newText =
        textBox.value.trim();

    if (newText === "") {
        return;
    }

    const taskIndex =
        Array.from(task.parentElement.children)
            .indexOf(task);

    lists[currentList].tasks[taskIndex].text =
        newText;

    textBox.readOnly = true;

    button.textContent = "Edit";

    button.onclick = function() {

        editTask(this);
    };

    saveLists();
}


// -------------------------
// DELETE TASK
// -------------------------

function deleteTask(button) {

    const task = button.parentElement;

    const taskIndex =
        Array.from(task.parentElement.children)
            .indexOf(task);

    lists[currentList].tasks.splice(taskIndex, 1);

    task.remove();

    saveLists();
}


// -------------------------
// CHECK TASK
// -------------------------

function toggleTask(checkbox) {

    const task = checkbox.parentElement;

    const textBox =
        task.querySelector(".taskText");

    if (checkbox.checked) {

        textBox.style.textDecoration =
            "line-through";

        textBox.style.opacity = "0.5";

    } else {

        textBox.style.textDecoration =
            "none";

        textBox.style.opacity = "1";
    }


    const taskIndex =
        Array.from(task.parentElement.children)
            .indexOf(task);

    lists[currentList].tasks[taskIndex].completed =
        checkbox.checked;

    saveLists();
}


// -------------------------
// LOAD SAVED TASK
// -------------------------

function createSavedTask(savedTask) {

    const taskList =
        document.getElementById("taskList");

    const task =
        document.createElement("label");

    task.innerHTML = `
        <input type="checkbox">
        <input type="text" class="taskText">
        <button>Edit</button>
        <button>Delete</button>
    `;

    taskList.appendChild(task);


    const checkbox =
        task.querySelector("input[type='checkbox']");

    const textBox =
        task.querySelector(".taskText");

    const buttons =
        task.querySelectorAll("button");


    textBox.value = savedTask.text;

    textBox.readOnly = true;

    checkbox.checked =
        savedTask.completed;


    checkbox.onchange = function() {

        toggleTask(this);
    };


    buttons[0].onclick = function() {

        editTask(this);
    };


    buttons[1].onclick = function() {

        deleteTask(this);
    };


    if (savedTask.completed) {

        textBox.style.textDecoration =
            "line-through";

        textBox.style.opacity = "0.5";
    }
}


// -------------------------
// START
// -------------------------

alert("SCRIPT IS WORKING");

displayTabs();

displayCurrentList();

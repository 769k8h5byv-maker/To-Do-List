// ==============================
// DATA
// ==============================

let lists = JSON.parse(localStorage.getItem("todoLists")) || [];

if (lists.length === 0) {
    lists.push({
        id: Date.now(),
        name: "My To-Do List",
        tasks: []
    });
}

let currentListId = lists[0].id;


// ==============================
// SAVE
// ==============================

function saveLists() {
    localStorage.setItem("todoLists", JSON.stringify(lists));
}


// ==============================
// CURRENT LIST
// ==============================

function getCurrentList() {
    return lists.find(list => list.id === currentListId);
}


// ==============================
// DATE
// ==============================

const today = new Date();

document.getElementById("date").textContent =
    today.toLocaleDateString("en-CA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });


// ==============================
// RENDER APP
// ==============================

function renderApp() {
    renderTabs();
    renderTitle();
    renderTasks();
}


// ==============================
// TABS
// ==============================

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


        const deleteTab = document.createElement("span");

        deleteTab.textContent = "×";

        deleteTab.className = "deleteTab";


        deleteTab.onclick = function(event) {

            event.stopPropagation();

            if (lists.length === 1) {
                return;
            }

            const answer = confirm(
                'Delete "' + list.name + '"?'
            );

            if (!answer) {
                return;
            }

            lists = lists.filter(function(item) {
                return item.id !== list.id;
            });

            currentListId = lists[0].id;

            saveLists();

            renderApp();
        };


        tab.appendChild(name);
        tab.appendChild(deleteTab);


        tab.onclick = function() {

            currentListId = list.id;

            renderApp();
        };


        tabs.appendChild(tab);

    });


    // PLUS BUTTON

    const addTab = document.createElement("button");

    addTab.className = "addTab";

    addTab.textContent = "+";


 addTab.onclick = function() {

    const box = document.getElementById("newListBox");

    const input = document.getElementById("newListName");

    box.style.display = "block";

    input.value = "";

    input.focus();

};


    tabs.appendChild(addTab);
}


// ==============================
// NEW LIST BOX
// ==============================

function openNewListBox() {

    const box =
        document.getElementById("newListBox");

    const input =
        document.getElementById("newListName");

    box.classList.add("show");

    input.value = "";

    input.focus();
}


function closeNewListBox() {

    document
        .getElementById("newListBox")
        .classList.remove("show");
}


document
    .getElementById("cancelList")
    .onclick = function() {

        closeNewListBox();

    };


document
    .getElementById("createList")
    .onclick = function() {

        createNewList();

    };


document
    .getElementById("newListName")
    .onkeydown = function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            createNewList();
        }

        if (event.key === "Escape") {

            closeNewListBox();
        }
    };


function createNewList() {

    const input =
        document.getElementById("newListName");

    const name =
        input.value.trim();

    if (name === "") {
        return;
    }


    const newList = {

        id: Date.now(),

        name: name,

        tasks: []

    };


    lists.push(newList);

    currentListId = newList.id;

    saveLists();

    closeNewListBox();

    renderApp();
}


// ==============================
// TITLE
// ==============================

function renderTitle() {

    const list = getCurrentList();

    document.getElementById("listTitle").textContent =
        list.name;
}


document
    .getElementById("editTitleButton")
    .onclick = function() {

        const title =
            document.getElementById("listTitle");

        const button =
            document.getElementById("editTitleButton");

        const input =
            document.createElement("input");


        input.type = "text";

        input.id = "listTitleInput";

        input.value =
            getCurrentList().name;


        title.replaceWith(input);

        input.focus();

        input.select();


        button.textContent = "✓";


        function saveTitle() {

            const newName =
                input.value.trim();

            if (newName === "") {
                renderApp();
                return;
            }


            getCurrentList().name =
                newName;

            saveLists();

            renderApp();
        }


        input.onkeydown = function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                saveTitle();
            }

            if (event.key === "Escape") {

                renderApp();
            }
        };


        button.onclick = saveTitle;
    };


// ==============================
// ADD TASK
// ==============================

document
    .getElementById("addTaskButton")
    .onclick = function() {

        addTask();

    };


function addTask() {

    const taskList =
        document.getElementById("taskList");

    const task =
        document.createElement("label");


    task.innerHTML = `

        <input
            type="checkbox"
            class="taskCheck"
        >

        <input
            type="text"
            class="taskText"
            placeholder="Type your task here..."
        >

        <button class="taskAction">
            Accept
        </button>

    `;


    taskList.appendChild(task);


    const text =
        task.querySelector(".taskText");

    const checkbox =
        task.querySelector(".taskCheck");

    const button =
        task.querySelector(".taskAction");


    checkbox.onchange = function() {

        toggleTask(this);

    };


    button.onclick = function() {

        acceptTask(this);

    };


    text.onkeydown = function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            acceptTask(button);

        }
    };


    text.focus();
}


// ==============================
// ACCEPT TASK
// ==============================

function acceptTask(button) {

    const task =
        button.parentElement;

    const text =
        task.querySelector(".taskText");

    const checkbox =
        task.querySelector(".taskCheck");


    if (text.value.trim() === "") {
        return;
    }


    const list =
        getCurrentList();


    const newTask = {

        id: Date.now(),

        text: text.value.trim(),

        completed: checkbox.checked

    };


    list.tasks.push(newTask);

    saveLists();


    text.readOnly = true;

    task.dataset.taskId =
        newTask.id;


    button.textContent = "Edit";


    button.onclick = function() {

        editTask(this);

    };


    const deleteButton =
        document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.className = "deleteTask";


    deleteButton.onclick = function() {

        deleteTask(newTask.id);

    };


    task.appendChild(deleteButton);
}


// ==============================
// EDIT TASK
// ==============================

function editTask(button) {

    const task =
        button.parentElement;

    const text =
        task.querySelector(".taskText");


    text.readOnly = false;

    text.focus();


    button.textContent = "Accept";


    button.onclick = function() {

        saveEditedTask(this);

    };


    text.onkeydown = function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            saveEditedTask(button);

        }
    };
}


// ==============================
// SAVE EDITED TASK
// ==============================

function saveEditedTask(button) {

    const task =
        button.parentElement;

    const text =
        task.querySelector(".taskText");


    const taskId =
        Number(task.dataset.taskId);


    const list =
        getCurrentList();


    const savedTask =
        list.tasks.find(
            item => item.id === taskId
        );


    if (!savedTask) {
        return;
    }


    if (text.value.trim() === "") {
        return;
    }


    savedTask.text =
        text.value.trim();


    saveLists();


    text.readOnly = true;

    button.textContent = "Edit";


    button.onclick = function() {

        editTask(this);

    };
}


// ==============================
// DELETE TASK
// ==============================

function deleteTask(taskId) {

    const list =
        getCurrentList();


    list.tasks =
        list.tasks.filter(
            task => task.id !== taskId
        );


    saveLists();

    renderTasks();
}


// ==============================
// CHECK TASK
// ==============================

function toggleTask(checkbox) {

    const task =
        checkbox.parentElement;

    const taskId =
        Number(task.dataset.taskId);


    const text =
        task.querySelector(".taskText");


    const list =
        getCurrentList();


    const savedTask =
        list.tasks.find(
            item => item.id === taskId
        );


    if (!savedTask) {

        return;
    }


    savedTask.completed =
        checkbox.checked;


    if (checkbox.checked) {

        text.style.textDecoration =
            "line-through";

        text.style.opacity =
            "0.5";

    } else {

        text.style.textDecoration =
            "none";

        text.style.opacity =
            "1";
    }


    saveLists();
}


// ==============================
// RENDER TASKS
// ==============================

function renderTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";


    const list =
        getCurrentList();


    list.tasks.forEach(function(savedTask) {

        const task =
            document.createElement("label");


        task.dataset.taskId =
            savedTask.id;


        task.innerHTML = `

            <input
                type="checkbox"
                class="taskCheck"
                ${savedTask.completed ? "checked" : ""}
            >

            <input
                type="text"
                class="taskText"
                value=""
                readonly
            >

            <button class="taskAction">
                Edit
            </button>

            <button class="deleteTask">
                Delete
            </button>

        `;


        taskList.appendChild(task);


        const text =
            task.querySelector(".taskText");

        text.value =
            savedTask.text;


        const checkbox =
            task.querySelector(".taskCheck");


        checkbox.onchange = function() {

            toggleTask(this);

        };


        if (savedTask.completed) {

            text.style.textDecoration =
                "line-through";

            text.style.opacity =
                "0.5";
        }


        task.querySelector(".taskAction")
            .onclick = function() {

                editTask(this);

            };


        task.querySelector(".deleteTask")
            .onclick = function() {

                deleteTask(savedTask.id);

            };

    });
}


// ==============================
// START
// ==============================

saveLists();

renderApp();

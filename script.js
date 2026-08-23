const today = new Date();

document.getElementById("date").textContent =
    today.toLocaleDateString("en-CA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });


// -------------------------
// RENAME LIST
// -------------------------

function editListTitle() {

    const title = document.getElementById("listTitle");
    const button = document.getElementById("editTitleButton");

    const input = document.createElement("input");

    input.type = "text";
    input.id = "listTitleInput";
    input.value = title.textContent;

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

    const input =
        document.getElementById("listTitleInput");

    if (!input) {
        return;
    }

    const newTitle =
        input.value.trim();

    if (newTitle === "") {
        return;
    }

    const title =
        document.createElement("h1");

    title.id = "listTitle";
    title.textContent = newTitle;

    input.replaceWith(title);

    const button =
        document.getElementById("editTitleButton");

    button.textContent = "✎";
    button.onclick = editListTitle;
}


// -------------------------
// ADD TASK
// -------------------------

function addTask() {

    const taskList =
        document.getElementById("taskList");

    const task =
        document.createElement("label");

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

    const task =
        button.parentElement;

    const textBox =
        task.querySelector(".taskText");

    if (textBox.value.trim() === "") {
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
}


// -------------------------
// EDIT TASK
// -------------------------

function editTask(button) {

    const task =
        button.parentElement;

    const textBox =
        task.querySelector(".taskText");

    textBox.readOnly = false;

    textBox.focus();

    button.textContent = "Accept";

    button.onclick = function() {
        acceptTask(this);
    };
}


// -------------------------
// DELETE TASK
// -------------------------

function deleteTask(button) {

    button.parentElement.remove();
}


// -------------------------
// CHECK TASK
// -------------------------

function toggleTask(checkbox) {

    const textBox =
        checkbox.nextElementSibling;

    if (checkbox.checked) {

        textBox.style.textDecoration =
            "line-through";

        textBox.style.opacity = "0.5";

    } else {

        textBox.style.textDecoration =
            "none";

        textBox.style.opacity = "1";
    }
}


// -------------------------
// NEW LIST PANEL
// -------------------------

const addTab =
    document.querySelector(".addTab");

const newListPanel =
    document.getElementById("newListPanel");

const newListInput =
    document.getElementById("newListInput");

const createNewList =
    document.getElementById("createNewList");

const cancelNewList =
    document.getElementById("cancelNewList");


addTab.onclick = function() {

    newListPanel.classList.add("show");

    newListInput.value = "";

    newListInput.focus();
};


cancelNewList.onclick = function() {

    newListPanel.classList.remove("show");
};


createNewList.onclick = function() {

    createNewListTab();
};


newListInput.onkeydown = function(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        createNewListTab();
    }

    if (event.key === "Escape") {

        newListPanel.classList.remove("show");
    }
};


function createNewListTab() {

    const name =
        newListInput.value.trim();

    if (name === "") {
        return;
    }


    const newTab =
        document.createElement("button");

    newTab.className = "listTab";


    const nameSpan =
        document.createElement("span");

    nameSpan.textContent = name;


    const deleteButton =
        document.createElement("span");

    deleteButton.textContent = "×";

    deleteButton.className = "deleteTab";


    deleteButton.onclick = function(event) {

        event.stopPropagation();

        showDeletePanel(newTab, name);
    };


    newTab.appendChild(nameSpan);
    newTab.appendChild(deleteButton);


    newTab.onclick = function() {

        alert("You clicked " + name);
    };


    document.getElementById("tabs").insertBefore(
        newTab,
        document.querySelector(".addTab")
    );


    newListPanel.classList.remove("show");
}


// -------------------------
// DELETE LIST PANEL
// -------------------------

const deletePanel =
    document.getElementById("deletePanel");

const deleteMessage =
    document.getElementById("deleteMessage");

const cancelDelete =
    document.getElementById("cancelDelete");

const confirmDelete =
    document.getElementById("confirmDelete");

let tabToDelete = null;


function showDeletePanel(tab, name) {

    tabToDelete = tab;

    deleteMessage.textContent =
        'Are you sure you want to delete "' +
        name +
        '"?';

    deletePanel.classList.add("show");
}


cancelDelete.onclick = function() {

    deletePanel.classList.remove("show");

    tabToDelete = null;
};


confirmDelete.onclick = function() {

    if (tabToDelete) {

        tabToDelete.remove();
    }

    deletePanel.classList.remove("show");

    tabToDelete = null;
};


// -------------------------
// ORIGINAL TAB DELETE
// -------------------------

const firstDelete =
    document.querySelector(".deleteTab");


firstDelete.onclick = function(event) {

    event.stopPropagation();

    showDeletePanel(
        firstDelete.parentElement,
        "My To-Do List"
    );
};

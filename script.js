const today = new Date();

document.getElementById("date").textContent =
    today.toLocaleDateString("en-CA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });


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
    const input = document.getElementById("listTitleInput");

    if (!input) {
        return;
    }

    const newTitle = input.value.trim();

    if (newTitle === "") {
        return;
    }

    const title = document.createElement("h1");

    title.id = "listTitle";
    title.textContent = newTitle;

    input.replaceWith(title);

    const button = document.getElementById("editTitleButton");

    button.textContent = "✎";
    button.onclick = editListTitle;
}


function addTask() {
    const taskList = document.getElementById("taskList");

    const task = document.createElement("label");

    task.innerHTML = `
        <input type="checkbox" onchange="toggleTask(this)">
        <input 
            type="text" 
            class="taskText" 
            placeholder="Type your task here..."
            onkeydown="if (event.key === 'Enter') { event.preventDefault(); acceptTask(this.nextElementSibling); }"
        >
        <button onclick="acceptTask(this)">Accept</button>
    `;

    taskList.appendChild(task);

    task.querySelector(".taskText").focus();
}


function acceptTask(button) {
    const task = button.parentElement;
    const textBox = task.querySelector(".taskText");

    if (textBox.value.trim() === "") {
        return;
    }

    textBox.readOnly = true;

    button.textContent = "Edit";

    button.onclick = function() {
        editTask(this);
    };

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.onclick = function() {
        deleteTask(this);
    };

    task.appendChild(deleteButton);
}


function editTask(button) {
    const task = button.parentElement;
    const textBox = task.querySelector(".taskText");

    textBox.readOnly = false;
    textBox.focus();

    button.textContent = "Accept";

    button.onclick = function() {
        acceptTask(this);
    };
}


function deleteTask(button) {
    button.parentElement.remove();
}


function toggleTask(checkbox) {
    const taskText = checkbox.nextElementSibling;

    if (checkbox.checked) {
        taskText.style.textDecoration = "line-through";
        taskText.style.opacity = "0.5";
    } else {
        taskText.style.textDecoration = "none";
        taskText.style.opacity = "1";
    }
}

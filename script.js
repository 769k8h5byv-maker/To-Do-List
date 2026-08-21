const today = new Date();

document.getElementById("date").textContent =
    today.toLocaleDateString("en-CA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

function addTask() {
    const taskList = document.getElementById("taskList");

    const task = document.createElement("label");

    task.innerHTML = `
        <input type="checkbox" onchange="toggleTask(this)">
        <input type="text" placeholder="Type your task here...">
        <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(task);
}

function toggleTask(checkbox) {
    const taskText = checkbox.nextElementSibling;

    if (checkbox.checked) {
        taskText.style.textDecoration = "line-through";
    } else {
        taskText.style.textDecoration = "none";
    }
}

function deleteTask(button) {
    button.parentElement.remove();
}

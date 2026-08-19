function toggleTask(checkbox) {
    const task = checkbox.nextElementSibling;

    if (checkbox.checked) {
        task.style.textDecoration = "line-through";
    } else {
        task.style.textDecoration = "none";
    }
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value;

    if (taskText === "") {
        return;
    }

    const taskList = document.getElementById("taskList");

    const label = document.createElement("label");

    label.innerHTML = `
        <input type="checkbox" onchange="toggleTask(this)">
        <span>${taskText}</span>
    `;

    taskList.appendChild(label);
    input.value = "";
}

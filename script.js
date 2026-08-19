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
    const taskList = document.getElementById("taskList");

    const task = document.createElement("label");
  task.innerHTML = `
    <input type="checkbox">
    <span>${input.value}</span>
`;

    taskList.appendChild(task);

    input.value = "";
}

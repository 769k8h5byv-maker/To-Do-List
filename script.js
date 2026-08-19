function toggleTask(checkbox) {
    const task = checkbox.nextElementSibling;

    if (checkbox.checked) {
        task.style.textDecoration = "line-through";
    } else {
        task.style.textDecoration = "none";
    }
}

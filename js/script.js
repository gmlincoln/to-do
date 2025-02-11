document.addEventListener('DOMContentLoaded', loadTasks);

// Load tasks from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Add a new task
function addTask() {
    let textInput = document.getElementById('taskInput');
    let taskText = textInput.value.trim();

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    addTaskToDOM(taskText);

    // Save to localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    textInput.value = "";
}

// Display task in the DOM
function addTaskToDOM(taskText) {
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
        <span>${taskText}</span>
        <span>
            <button class="btn btn-warning btn-sm me-2" onclick="editTask(this)">✏️ Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">❌ Delete</button>
        </span>
    `;

    ul.appendChild(li);
}

// Edit a task
function editTask(element) {
    let li = element.parentElement.parentElement;
    let oldTask = li.firstElementChild.innerText;

    let newTask = prompt("Edit your task:", oldTask);
    if (newTask !== null && newTask.trim() !== "") {
        li.firstElementChild.innerText = newTask;

        // Update in localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let index = tasks.indexOf(oldTask);
        if (index !== -1) {
            tasks[index] = newTask;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
}

// Delete a task
function deleteTask(element) {
    let li = element.parentElement.parentElement;
    let taskText = li.firstElementChild.innerText;

    li.remove();

    // Remove from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

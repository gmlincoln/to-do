document.addEventListener('DOMContentLoaded', loadTask);

        function loadTask() {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || []
            tasks.forEach(task => addTaskToDOM(task));
        }

        function addTask() {
            let textInput = document.getElementById('taskInput');
            let taskText = textInput.value;

            if (taskText.trim() === "") return;

            addTaskToDOM(taskText)

            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(tasks))
            textInput.value = "";
        }

        function addTaskToDOM(taskText) {
            let ul = document.getElementById('taskList');
            let li = document.createElement('li');
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">Delete</button>
            `;
            ul.appendChild(li);
        }

        function deleteTask(element) {
            let li = element.parentElement;
            let taskText = li.firstElementChild.innerText;
            li.remove()

            let tasks = JSON.parse(localStorage.getItem("tasks")) || []
            tasks = tasks.filter(task => task !== taskText)
            localStorage.setItem("tasks", JSON.stringify(tasks))
        }
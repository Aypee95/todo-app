document.addEventListener("DOMContentLoaded", function () {
    // Load tasks from localStorage when the page is loaded
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        var todoList = document.getElementById("todoList");

        var li = document.createElement("li");
        li.className = "todoItem";
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="deleteButton" onclick="removeTask(this)">Delete</button>
        `;

        todoList.appendChild(li);

        // Save tasks to localStorage
        saveTasks();

        // Clear input field
        taskInput.value = "";
    }
}

function removeTask(button) {
    var todoItem = button.closest(".todoItem");
    todoItem.remove();

    // Save tasks to localStorage after removing a task
    saveTasks();
}

function saveTasks() {
    var todoList = document.getElementById("todoList");
    var tasks = [];

    // Extract task text from each list item and store in the tasks array
    todoList.querySelectorAll(".todoItem span").forEach(function (task) {
        tasks.push(task.textContent);
    });

    // Save the tasks array to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var todoList = document.getElementById("todoList");
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Create list items for each task in the tasks array
    tasks.forEach(function (taskText) {
        var li = document.createElement("li");
        li.className = "todoItem";
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="deleteButton" onclick="removeTask(this)">Delete</button>
        `;

        todoList.appendChild(li);
    });
}
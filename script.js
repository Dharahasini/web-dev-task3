const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="priority">⭐</span>
            <span class="task-text">${taskText}</span>
            <button onclick="toggleTaskStatus(event)">Complete</button>
            <button onclick="editTask(event)">Edit</button>
            <button onclick="deleteTask(event)">Delete</button>
        `;
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();
    }
}

function toggleTaskStatus(event) {
    const task = event.target.parentNode;
    task.classList.toggle('completed');
    saveTasks();
}

function editTask(event) {
    const task = event.target.parentNode;
    const taskText = task.querySelector('.task-text').textContent;
    const newText = prompt('Edit Task:', taskText);
    if (newText !== null) {
        task.querySelector('.task-text').textContent = newText;
        saveTasks();
    }
}

function deleteTask(event) {
    const task = event.target.parentNode;
    task.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.querySelector('.task-text').textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="priority">⭐</span>
                <span class="task-text">${task.text}</span>
                <button onclick="toggleTaskStatus(event)">Complete</button>
                <button onclick="editTask(event)">Edit</button>
                <button onclick="deleteTask(event)">Delete</button>
            `;
            if (task.completed) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);
        });
    }
}

loadTasks(); // Load tasks when the page is loaded

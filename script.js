// Función para cargar tareas desde localStorage
function loadTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Función para guardar tareas en localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para actualizar el contador de tareas pendientes
function updateTaskCounter() {
    const tasks = loadTasks();
    const pendingTasks = tasks.filter(task => !task.completed).length;
    document.getElementById('pending-tasks').textContent = pendingTasks;
}

// Función para renderizar la lista de tareas sin usar innerHTML
function renderTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = loadTasks();
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const item = document.createElement('div');
        item.className = 'task-item' + (task.completed ? ' completed' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;

        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '🗑️';

        item.appendChild(checkbox);
        item.appendChild(textSpan);
        item.appendChild(deleteBtn);
        taskList.appendChild(item);
    });

    updateTaskCounter();
}

document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function handleAddTask() {
        const text = taskInput.value.trim();
        if (text) {
            const tasks = loadTasks();
            tasks.push({ text, completed: false });
            saveTasks(tasks);
            renderTasks();
            taskInput.value = '';
        }
    }

    addTaskBtn.addEventListener('click', handleAddTask);

    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });

    taskList.addEventListener('click', (e) => {
        const tasks = loadTasks();
        if (e.target.classList.contains('task-checkbox')) {
            const taskItem = e.target.parentElement;
            const index = Array.from(taskItem.parentElement.children).indexOf(taskItem);
            tasks[index].completed = e.target.checked;
            saveTasks(tasks);
            renderTasks();
        } else if (e.target.classList.contains('delete-btn')) {
            const taskItem = e.target.parentElement;
            const index = Array.from(taskItem.parentElement.children).indexOf(taskItem);
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        }
    });

    // Inicializar la aplicación
    renderTasks();
});

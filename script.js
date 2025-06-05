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
    const pendingTasks = tasks.filter(task => task.status !== 'completada').length;
    document.getElementById('pending-tasks').textContent = pendingTasks;
}

// Función para renderizar la lista de tareas sin usar innerHTML
function renderTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = loadTasks();
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const item = document.createElement('div');
        item.className = 'task-item' + (task.status === 'completada' ? ' completed' : '');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.status === 'completada';
        checkbox.dataset.index = index;

        const info = document.createElement('div');
        info.className = 'task-info';

        const title = document.createElement('span');
        title.className = 'task-title';
        title.textContent = task.title;

        const desc = document.createElement('p');
        desc.className = 'task-desc';
        desc.textContent = task.description;

        const status = document.createElement('span');
        status.className = 'task-status';
        status.textContent = task.status;

        info.appendChild(title);
        info.appendChild(desc);
        info.appendChild(status);

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = '✏️';
        editBtn.dataset.index = index;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '🗑️';
        deleteBtn.dataset.index = index;

        item.appendChild(checkbox);
        item.appendChild(info);
        item.appendChild(editBtn);
        item.appendChild(deleteBtn);
        taskList.appendChild(item);
    });

    updateTaskCounter();
}

document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task');
    const titleInput = document.getElementById('task-title');
    const descInput = document.getElementById('task-desc');
    const statusInput = document.getElementById('task-status');
    const taskList = document.getElementById('task-list');
    const themeToggle = document.getElementById('theme-toggle');
    let editIndex = null;

    function loadTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    function applyTheme(theme) {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    themeToggle.addEventListener('click', () => {
        const current = loadTheme();
        const next = current === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });

    applyTheme(loadTheme());

    function handleAddTask() {
        const title = titleInput.value.trim();
        const description = descInput.value.trim();
        const status = statusInput.value;

        if (!title) {
            return;
        }

        const tasks = loadTasks();

        if (editIndex !== null) {
            tasks[editIndex] = { title, description, status };
            editIndex = null;
            addTaskBtn.textContent = 'Agregar Tarea';
        } else {
            tasks.push({ title, description, status });
        }

        saveTasks(tasks);
        renderTasks();

        titleInput.value = '';
        descInput.value = '';
        statusInput.value = 'pendiente';
    }

    addTaskBtn.addEventListener('click', handleAddTask);

    titleInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });

    taskList.addEventListener('click', (e) => {
        const tasks = loadTasks();
        if (e.target.classList.contains('task-checkbox')) {
            const index = parseInt(e.target.dataset.index, 10);
            tasks[index].status = e.target.checked ? 'completada' : 'pendiente';
            saveTasks(tasks);
            renderTasks();
        } else if (e.target.classList.contains('delete-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        } else if (e.target.classList.contains('edit-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            const task = tasks[index];
            titleInput.value = task.title;
            descInput.value = task.description;
            statusInput.value = task.status;
            editIndex = index;
            addTaskBtn.textContent = 'Guardar Cambios';
        }
    });

    // Inicializar la aplicación
    renderTasks();
});

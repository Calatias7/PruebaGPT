// Función para cargar tareas desde localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
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

// Función para renderizar la lista de tareas
function renderTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = loadTasks();
    
    taskList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button class="delete-btn">🗑️</button>
        </div>
    `).join('');
    
    updateTaskCounter();
}

// Event listener para agregar tarea
document.getElementById('add-task').addEventListener('click', () => {
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    
    if (text) {
        const tasks = loadTasks();
        tasks.push({ text, completed: false });
        saveTasks(tasks);
        renderTasks();
        input.value = '';
    }
});

// Event listener para el contenedor de tareas
document.getElementById('task-list').addEventListener('click', (e) => {
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

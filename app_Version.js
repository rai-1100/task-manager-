// Retrieve tasks from localStorage or start with an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const taskList = document.getElementById('task-list');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'task-details';

    const descSpan = document.createElement('span');
    descSpan.className = 'task-desc';
    descSpan.textContent = task.text;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date';
    dateSpan.textContent = `Due: ${task.dueDate}`;

    detailsDiv.appendChild(descSpan);
    detailsDiv.appendChild(dateSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(idx, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(detailsDiv);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  if (text && dueDate) {
    tasks.push({ text, dueDate });
    saveTasks();
    renderTasks();
    taskInput.value = '';
    dueDateInput.value = '';
  }
});

// Initial render
renderTasks();
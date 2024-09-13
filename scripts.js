const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoDatetime = document.querySelector('.todo-datetime');
const todoList = document.querySelector('.todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function formatDateTime(dateTimeString) {
    if (!dateTimeString) return '';
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const time = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <label class="todo-checkbox">
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="checkmark"></span>
            </label>
            <span class="todo-text">${todo.text}</span>
            <span class="todo-datetime">${formatDateTime(todo.datetime)}</span>
            <div class="todo-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const checkbox = li.querySelector('input[type="checkbox"]');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        checkbox.addEventListener('change', () => {
            todos[index].completed = checkbox.checked;
            li.classList.toggle('completed');
            saveTodos();
        });

        editBtn.addEventListener('click', () => {
            const newText = prompt('Edit task:', todo.text);
            if (newText !== null) {
                todos[index].text = newText;
                li.querySelector('.todo-text').textContent = newText;
                saveTodos();
            }
        });

        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            renderTodos();
            saveTodos();
        });

        todoList.appendChild(li);
    });
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    const datetime = todoDatetime.value;
    if (text) {
        todos.push({ text, completed: false, datetime });
        todoInput.value = '';
        todoDatetime.value = '';
        renderTodos();
        saveTodos();
    }
});

renderTodos();

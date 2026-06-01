let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const todoCount = document.querySelector('#todoCount');
const filterBtns = document.querySelectorAll('.filters button');
const clearCompletedBtn = document.querySelector('#clearCompleted');

function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
}

function render() {
    todoList.innerHTML = '';
    
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.dataset.id = todo.id;
        if (todo.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.textContent = todo.text;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = todo.text;

        const destroyBtn = document.createElement('button');
        destroyBtn.className = 'destroy';
        destroyBtn.textContent = '❌';

        li.append(span, editInput, destroyBtn);
        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

// Add Todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;
    todos.push({ id: Date.now(), text, completed: false });
    todoInput.value = '';
    saveAndRender();
});

// Event Delegation cho #todoList
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = Number(li.dataset.id);

    if (e.target.classList.contains('destroy')) {
        todos = todos.filter(t => t.id !== id);
        saveAndRender();
    } else if (e.target.tagName === 'SPAN') {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        saveAndRender();
    }
});

// Double click to edit
todoList.addEventListener('dblclick', (e) => {
    if (e.target.tagName === 'SPAN') {
        const li = e.target.closest('li');
        li.classList.add('editing');
        const input = li.querySelector('.edit-input');
        input.focus();
    }
});

// Save edit content on Enter key
todoList.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('edit-input') && e.key === 'Enter') {
        const li = e.target.closest('li');
        const id = Number(li.dataset.id);
        const todo = todos.find(t => t.id === id);
        const newText = e.target.value.trim();
        if (newText) {
            todo.text = newText;
        }
        li.classList.remove('editing');
        saveAndRender();
    }
});

// Save edit content on blur (click away)
todoList.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('edit-input')) {
        const li = e.target.closest('li');
        if (li && li.classList.contains('editing')) {
            const id = Number(li.dataset.id);
            const todo = todos.find(t => t.id === id);
            const newText = e.target.value.trim();
            if (newText) {
                todo.text = newText;
            }
            li.classList.remove('editing');
            saveAndRender();
        }
    }
});

// Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        render();
    });
});

// Clear Completed
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveAndRender();
});

render();
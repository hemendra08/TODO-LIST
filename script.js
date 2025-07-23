// Get elements from the page
var todoInput = document.getElementById('todoInput');
var addBtn = document.getElementById('addBtn');
var todoList = document.getElementById('todoList');

// Array to store all todos
var todos = [];

// Function to add a new todo
function addTodo() {
    var todoText = todoInput.value.trim();
    
    // Check if input is not empty
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create new todo object
    var newTodo = {
        id: Date.now(), // Simple way to create unique ID
        text: todoText,
        completed: false
    };
    
    // Add to todos array
    todos.push(newTodo);
    
    // Clear input
    todoInput.value = '';
    
    // Update the display
    displayTodos();
}

// Function to display all todos
function displayTodos() {
    // Clear the list
    todoList.innerHTML = '';
    
    // If no todos, show empty message
    if (todos.length === 0) {
        todoList.innerHTML = '<div class="empty-message">No tasks yet. Add one above!</div>';
        return;
    }
    
    // Loop through todos and create HTML
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        
        // Create todo item HTML
        var todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        
        todoItem.innerHTML = 
            '<input type="checkbox" class="checkbox" ' + 
            (todo.completed ? 'checked' : '') + 
            ' onchange="toggleTodo(' + todo.id + ')">' +
            '<span class="todo-text ' + (todo.completed ? 'completed' : '') + '">' + 
            todo.text + '</span>' +
            '<button class="delete-btn" onclick="deleteTodo(' + todo.id + ')">Delete</button>';
        
        todoList.appendChild(todoItem);
    }
}

// Function to toggle todo completion
function toggleTodo(id) {
    // Find the todo and toggle its completed status
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].completed = !todos[i].completed;
            break;
        }
    }
    
    // Update display
    displayTodos();
}

// Function to delete a todo
function deleteTodo(id) {
    // Remove todo from array
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos.splice(i, 1);
            break;
        }
    }
    
    // Update display
    displayTodos();
}

// Add event listeners
addBtn.addEventListener('click', addTodo);

// Allow adding todo by pressing Enter
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial display
displayTodos();
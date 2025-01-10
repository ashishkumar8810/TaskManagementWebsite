// Show Password Logic for Login and Register
document.getElementById('showPassword')?.addEventListener('change', function () {
    const passwordField = document.getElementById('password');
    passwordField.type = this.checked ? 'text' : 'password';
});

document.getElementById('showPasswordRegister')?.addEventListener('change', function () {
    const passwordField = document.getElementById('newPassword');
    const confirmPasswordField = document.getElementById('confirmPassword');
    passwordField.type = this.checked ? 'text' : 'password';
    confirmPasswordField.type = this.checked ? 'text' : 'password';
});

// Registration
document.getElementById('registerForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
});

// Login
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials');
    }
});

// Task Management
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('taskCategory');
    const dueDateInput = document.getElementById('taskDueDate');
    if (taskInput.value.trim() !== '') {
        const newTask = {
            task: taskInput.value.trim(),
            status: 'In Progress',
            category: categorySelect.value,
            dueDate: dueDateInput.value,
            date: new Date().toLocaleDateString(),
        };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        displayTasks();
    } else {
        alert("Please enter a task.");
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the task list before re-rendering

    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Sort by due date

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add(task.status.toLowerCase());
        li.innerHTML = `
            <div>
                <strong>${task.task}</strong>
                <span class="task-category">${task.category}</span>
                <span class="task-due-date">${task.dueDate}</span>
                <span class="task-status ${task.status === 'In Progress' ? 'in-progress' : 'completed'}" onclick="toggleStatus(${index})">
                    ${task.status}
                </span>
            </div>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function toggleStatus(index) {
    tasks[index].status = tasks[index].status === 'In Progress' ? 'Completed' : 'In Progress';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login successful');
});

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Registration successful');
});

function logout() {
    window.location.href = 'index.html';
}

// Logout functionality
document.getElementById('logoutBtn')?.addEventListener('click', function () {
    // Clear session-related data (if any)
    sessionStorage.clear(); // Clear session storage
    localStorage.clear();  // Clear local storage (optional)

    // Redirect to login page
    window.location.href = 'index.html';
});

// Add Task Functionality
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskCategory = document.getElementById('taskCategory');
    const taskDueDate = document.getElementById('taskDueDate');
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];

    if (!taskInput.value || !taskDueDate.value) {
        alert("Please fill out all fields.");
        return;
    }

    const newRow = taskTable.insertRow();
    newRow.innerHTML = `
        <td>${taskInput.value}</td>
        <td>${taskCategory.value}</td>
        <td>${taskDueDate.value}</td>
        <td>
            <button onclick="deleteTask(this)" class="btn btn-danger">Delete</button>
        </td>
    `;

    taskInput.value = '';
    taskCategory.selectedIndex = 0;
    taskDueDate.value = '';
}

// Delete Task Functionality
function deleteTask(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}



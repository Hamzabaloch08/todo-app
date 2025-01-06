// Select elements
const addButton = document.getElementById('add-button');
const input = document.getElementById('todo-input'); // Correctly referenced as 'Input'
const todoList = document.getElementById('todo-list');
const clearAllButton = document.getElementById('clear-all-button');

// Function to add a todo item
let addTodoList = () => {
    const todo = input.value.trim(); // Use 'Input' here instead of 'todoInput'
    if (todo !== '') { // Fix the variable name to match the correct one
        const todoItem = document.createElement('div');
        todoItem.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-100', 'p-3', 'mb-2', 'rounded-md');
        todoItem.innerHTML = ` <input type="text" value="${todo}" class="bg-gray-100 outline-none focus:outline-none" readonly>
        <div class="flex pl-5 gap-5">
        <button class="text-blue-500 hover:text-blue-700 edit-btn">Edit</button>
            <button class="text-red-500 hover:text-red-700 delete-btn">Delete</button>
            </div>`;
        // Append the new todo item to the list
        todoList.appendChild(todoItem);
        input.value = '';
        checkScroll();

        // Select the buttons and input field
        const deleteButton = todoItem.querySelector('.delete-btn');
        const editButton = todoItem.querySelector('.edit-btn');
        const todoInputField = todoItem.querySelector('input');

        // Add event listeners to the buttons

        deleteButton.addEventListener('click', () => {
            todoItem.remove(); // Remove the specific todo item when the delete button is clicked
            checkScroll();
        });

        editButton.addEventListener('click', () => {
            if (editButton.textContent == 'Edit') {
                todoInputField.removeAttribute('readonly');
                todoInputField.focus();
                todoInputField.setSelectionRange(todoInputField.value.length, todoInputField.value.length);
                editButton.textContent = 'Save';
            } else {
                todoInputField.setAttribute('readonly', true);
                todoInputField.blur();
                editButton.textContent = 'Edit';
            }

        });
    }
}

let checkScroll = () => {
    if (todoList.children.length >= 4) {
        todoList.classList.add('overflow-y-scroll')
        clearAllButton.classList.remove('hidden')
    } else {
        todoList.classList.remove('overflow-y-scroll')
        clearAllButton.classList.add('hidden')
    }
}

clearAllButton.addEventListener('click', () => {
    todoList.innerHTML = '';
    // Hide the Clear All button and remove scrollable styles
    clearAllButton.classList.add('hidden');
    todoList.classList.remove('overflow-y-scroll');
});



// Add event listener to the "Add" button
addButton.addEventListener('click', addTodoList);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodoList();
    }
})


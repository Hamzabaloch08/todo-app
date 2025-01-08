// Select elements
const addButton = document.getElementById('add-button');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearAllButton = document.getElementById('clear-all-button');

// Function to add a todo item
let addTodoList = () => {
    const todo = input.value.trim();
    if (todo !== '') {
        const todoItem = document.createElement('div');
        todoItem.classList.add(
            'flex',
            'justify-between',
            'items-center',
            'bg-gray-100',
            'p-3',
            'mb-2',
            'rounded-md',
            'max-md:p-2'
        );
        todoItem.innerHTML = `
            <input 
                type="text" 
                value="${todo}" 
                class="bg-gray-100 outline-none focus:outline-none w-[70%] max-md:w-[60%]" 
                readonly
                maxlength="20"
            >
            <div class="flex pl-2 gap-2">
                <button class="text-blue-500 hover:text-blue-700 edit-btn max-sm:text-sm">Edit</button>
                <button class="text-red-500 hover:text-red-700 delete-btn max-sm:text-sm">Delete</button>
            </div>
        `;
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
            todoItem.remove();
            checkScroll();
        });

        editButton.addEventListener('click', () => {
            if (editButton.textContent === 'Edit') {
                todoInputField.removeAttribute('readonly');
                todoInputField.focus();
                todoInputField.setSelectionRange(
                    todoInputField.value.length,
                    todoInputField.value.length
                );
                editButton.textContent = 'Save';
            } else {
                todoInputField.setAttribute('readonly', true);
                todoInputField.blur();
                editButton.textContent = 'Edit';
            }
        });
    }
};

// Function to check scrollable state and Clear All button visibility
let checkScroll = () => {
    if (todoList.children.length >= 4) {
        todoList.classList.add('overflow-y-scroll', 'h-[60vh]', 'max-md:h-[50vh]');
        clearAllButton.classList.remove('hidden');
    } else {
        todoList.classList.remove('overflow-y-scroll', 'h-[60vh]', 'max-md:h-[50vh]');
        clearAllButton.classList.add('hidden');
    }
};

// Clear All functionality
clearAllButton.addEventListener('click', () => {
    todoList.innerHTML = '';
    clearAllButton.classList.add('hidden');
    todoList.classList.remove('overflow-y-scroll', 'h-[60vh]', 'max-md:h-[50vh]');
});

// Add event listener to the "Add" button
addButton.addEventListener('click', addTodoList);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodoList();
    }
});

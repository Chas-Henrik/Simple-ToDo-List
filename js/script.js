debugger;

const todoForm = document.getElementById("form");
const addBtn = document.getElementById("add");
const todoUL = document.getElementById("todo-list");

const todoList = [];
let nextId = 1;


function findIndexById(id) {
    return todoList.findIndex((item) => item.id === Number(id));
}

// Appends one item to the todo list
function appendElement(item) {
    const li = document.createElement("li");
    li.innerHTML = `<button type="button">X</button><p>${item.text}</p>`;
    li.dataset.id = item.id;
    todoUL.classList.remove("collapsed");
    todoUL.appendChild(li);
}

// Form submit event listener
addBtn.addEventListener("click", (e) => { 

    if(todoForm.textarea.value === "") {
        return;
    }

    e.preventDefault();

    const todo = {
        id: nextId++,
        text: todoForm.textarea.value,
        done: false
    };
    todoList.push(todo);
    appendElement(todo);
    todoForm.reset();
})


todoUL.addEventListener("click", (e) => {
    const element = e.target;
    if(e.target.tagName === 'BUTTON') {
        const liElement = element.parentElement;
        todoList.splice(findIndexById(liElement.dataset.id), 1);
        todoUL.removeChild(liElement);
        if(todoList.length === 0) {
            todoUL.classList.add("collapsed");
        }
    } else if (e.target.tagName === 'LI') {
        const todoParagraph = element.querySelector("p");
        todoList[findIndexById(element.dataset.id)].done = true;
        todoParagraph.style.textDecoration = "line-through";
    } else if (e.target.tagName === 'P') {
        const liElement = element.parentElement;
        todoList[findIndexById(liElement.dataset.id)].done = true;
        element.style.textDecoration = "line-through";
    }
});


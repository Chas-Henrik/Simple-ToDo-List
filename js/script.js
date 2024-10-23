debugger;

const todoForm = document.getElementById("form");
const addBtn = document.getElementById("add");
const doneChkBox = document.getElementById("checkbox-done");
const todoUL = document.getElementById("todo-list");

const todoList = [];
let nextId = 1;

function removeToDo(id) {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === id) {
            todoList.splice(i, 1);
            break;
        }
    }
}

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
    renderToDoList();
    todoForm.reset();
})

function renderToDoList() {
    todoUL.innerHTML = "";
    todoList.forEach(function(item) {
        const li = document.createElement("li");
        li.innerHTML = `<button type="button">X</button><p>${item.text}</p>`;
        li.addEventListener("click", (e) => {
            if(e.target.tagName === 'BUTTON') {
                console.log("button was clicked");
                removeToDo(item.id);
                renderToDoList();
            } else if (e.target.tagName === 'LI' || e.target.tagName === 'P') {
                item.done = true;
                renderToDoList();
            }
        });
        console.log(li);
        todoUL.appendChild(li);

        const todoParagraph = li.querySelectorAll("p");
        todoParagraph.forEach((p) => p.style.textDecoration = item.done ? "line-through" : "none" );
    });
    
    if(todoList.length === 0) {
        todoUL.classList.add("collapsed");
    } else {
        todoUL.classList.remove("collapsed");
    }
}

renderToDoList();
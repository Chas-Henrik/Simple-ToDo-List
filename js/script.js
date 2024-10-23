debugger;

const todoForm = document.getElementById("form");
const addBtn = document.getElementById("add");
const todoUL = document.getElementById("todo-list");

const todoList = [];
let nextId = 1;

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
    renderToDoList();
    todoForm.reset();
})

function renderToDoList() {
    todoUL.innerHTML = "";
    todoList.forEach(function(item, index) {
        const li = document.createElement("li");
        li.innerHTML = `<button type="button">X</button><p>${item.text}</p>`;
        // Add event listeners to button, li & p
        li.addEventListener("click", (e) => {
            if(e.target.tagName === 'BUTTON') {
                console.log("button was clicked");
                todoList.splice(index, 1);
                renderToDoList();
            } else if (e.target.tagName === 'LI' || e.target.tagName === 'P') {
                item.done = true;
                renderToDoList();
            }
        });
        todoUL.appendChild(li);
        // Add strikethrough if item is done
        const todoParagraph = li.querySelector("p");
        todoParagraph.style.textDecoration = item.done ? "line-through" : "none";
    });
    
    if(todoList.length === 0) {
        todoUL.classList.add("collapsed");
    } else {
        todoUL.classList.remove("collapsed");
    }
}

renderToDoList();
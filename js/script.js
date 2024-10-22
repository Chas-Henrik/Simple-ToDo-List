debugger;

const todoForm = document.getElementById("form");
const addBtn = document.getElementById("add");
const doneChkBox = document.getElementById("checkbox-done");
const todoUL = document.getElementById("todo-list");

const todoList = [];

addBtn.addEventListener("click", (e) => { 
    e.preventDefault();
    const todo = {
        id: todoList.length + 1,
        text: todoForm.textarea.value,
        done: false
    };
    console.log(todo);
    todoList.push(todo);
    console.log(todoList);
    renderToDoList();
    todoForm.reset();
})


function renderToDoList() {
    todoUL.innerHTML = "";
    todoList.forEach(function(item) {
        const li = document.createElement("li");
        li.innerHTML = `<button type="button">X</button> ${item.text}`;
        li.style.textDecoration = item.done ? "line-through" : "none";
        li.addEventListener("click", (e) => {
            if(e.target.tagName === 'BUTTON') {
                e.preventDefault();
                console.log("button was clicked");
                for (let i = 0; i < todoList.length; i++) {
                    if (todoList[i].id === item.id) {
                        todoList.splice(i, 1);
                        break;
                    }
                }
                renderToDoList();
            } else if (e.target.tagName === 'LI') {
                item.done = true;
                renderToDoList();
            }
        })
        console.log(li);
        todoUL.appendChild(li);
    });
}

renderToDoList();
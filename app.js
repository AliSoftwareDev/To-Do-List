const divTodos = document.getElementById("todos");
const frmTodos = document.getElementById("frmTodos");
const txtTitle = document.getElementById("title");
let todos = [
    {
        title: "Learn JavaScript",
        done: false
    },
    {
        title: "Do Shopping",
        done: false
    },
    {
        title: "Eat Food",
        done: true
    },
    {
        title: "Read a Book",
        done: true
    },
];

function listTodos() {
    saveData();
    todos.sort((a,b) => a.done -b.done);
    divTodos.innerHTML = "";
    for (const todo of todos) {
        let div = document.createElement("div");
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.checked = todo.done;
        input.onchange = (e) => toggleTodo(todo);
        div.append(input);
          let span = document.createElement("span");
          span.textContent = todo.title;
          div.append(span);
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.onclick = (e) => deleteTodo(todo);  
        button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
          div.append(button);
        divTodos.append(div);
    }
}

function saveData() {
    localStorage["data"] = JSON.stringify(todos);
}

function loadData () {
    let json = localStorage["data"];
    if (!json) return;
    try {
        todos = JSON.parse(json);
    }
    catch {}
}

function toggleTodo(todo) {
    todo.done = !todo.done;
    listTodos();

}

function deleteTodo(todo) {
    let i = todos.indexOf(todo);
    todos.splice(i, 1);
    listTodos();
}


frmTodos.onsubmit = function(event) {
    event.preventDefault();
    todos.push({
        title: txtTitle.value.trim(),
        done: false
    });
    listTodos();
    txtTitle.value = "";
};
loadData();
listTodos();


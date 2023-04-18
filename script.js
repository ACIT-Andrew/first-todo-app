const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todo-list");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoLi = document.createElement("li");

    const textDiv = document.createElement("div");
    textDiv.className = "textDiv";

    const removeDiv = document.createElement("div");
    removeDiv.className = "remove";

    const removeButton = document.createElement("button");
    removeButton.setAttribute("type", "button");
    removeButton.id = "remove";
    removeButton.innerText = "X";

    todoLi.appendChild(textDiv);
    todoLi.appendChild(removeDiv);
    removeDiv.appendChild(removeButton);

    // Let's change the text only with style class="completed", instead of the whole list item
    if (todo && todo.completed) {
      textDiv.classList.add("completed");
    }

    textDiv.innerText = todoText;

    todoLi.addEventListener("click", () => {
      textDiv.classList.toggle("completed");

      updateLS();
    });

    // todoLi.addEventListener("contextmenu", (e) => {
    //     e.preventDefault();

    //     todoLi.remove();

    //     updateLS();
    // });

    removeButton.addEventListener("click", (e) => {
      todoLi.remove();

      updateLS();
    });

    todosUL.appendChild(todoLi);

    input.value = "";

    updateLS();
  }
}

function updateLS() {
  const todoItems = document.querySelectorAll("li");
  const textDivs = document.querySelectorAll(".textDiv");

  const todos = [];

  textDivs.forEach((textDiv) => {
    todos.push({
      text: textDiv.innerText,
      completed: textDiv.parentElement.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

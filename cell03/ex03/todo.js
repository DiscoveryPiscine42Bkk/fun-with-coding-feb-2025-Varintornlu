window.onload = function () {
  loadTodos();
};

function loadTodos() {
  const savedTodos = getCookie("todos");
  if (savedTodos) {
    const todoArray = JSON.parse(savedTodos);
    todoArray.reverse().forEach((todoText) => {
      addTodo(todoText, false);
    });
  }
}

function saveTodosCookies() {
  const todos = [];
  document.querySelectorAll("#ft_list div").forEach((todo) => {
    todos.push(todo.innerText);
  });
  document.cookie =
    "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/;";
}

function addTodo(text, saveFlag = true) {
  if (!text) return;

  const ftList = document.getElementById("ft_list");
  const todo = document.createElement("div");
  todo.textContent = text;
  todo.classList.add("todo-item");

  todo.addEventListener("click", () => {
    const confirmDelete = confirm("Do you want to remove this TO-DO?");
    if (confirmDelete) {
      todo.remove();
      saveTodosCookies();
    }
  });

  ftList.prepend(todo);

  if (saveFlag) saveTodosCookies();
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

document.getElementById("newToDoBtn").addEventListener("click", () => {
  const todoText = prompt("Enter a new TO-DO:");
  if (todoText) addTodo(todoText);
});

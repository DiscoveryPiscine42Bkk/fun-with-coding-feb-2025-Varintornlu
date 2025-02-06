$(document).ready(function () {
  loadTodos();

  $("#newToDoBtn").click(function () {
    const todoText = prompt("Enter a new TO-DO:");
    if (todoText) addTodo(todoText);
  });
});

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

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
  $("#ft_list div").each(function () {
    todos.push($(this).text());
  });
  document.cookie =
    "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/;";
}

function addTodo(text, saveFlag = true) {
  if (!text) return;

  const $ftList = $("#ft_list");
  const $todo = $("<div></div>").text(text).addClass("todo-item");

  $todo.click(function () {
    const confirmDelete = confirm("Do you want to remove this TO-DO?");
    if (confirmDelete) {
      $(this).remove();
      saveTodosCookies();
    }
  });

  $ftList.prepend($todo);

  if (saveFlag) saveTodosCookies();
}

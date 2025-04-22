export const todoArray = JSON.parse(localStorage.getItem("todoArray")) || [];

function saveToLocalStorage() {
  localStorage.setItem("todoArray", JSON.stringify(todoArray));
}

export function addTodo(task, deadline = null) {
  const newTodo = {
    text: task,
    completed: false,
  };

  if (deadline) {
    newTodo.deadline = deadline;
  }

  todoArray.push(newTodo);
  saveToLocalStorage();
}

export function removeTodo(index) {
  todoArray.splice(index, 1);
  saveToLocalStorage();
}

export function toggleTodo(index) {
  todoArray[index].completed = !todoArray[index].completed;
  saveToLocalStorage();
}

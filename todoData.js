export const todoArray = JSON.parse(localStorage.getItem("todoArray")) || [];

function saveToLocalStorage() {
  localStorage.setItem("todoArray", JSON.stringify(todoArray));
}

export function addTodo(task) {
  todoArray.push({ text: task, completed: false });
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

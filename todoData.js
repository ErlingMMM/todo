export const todoArray = [];

export function addTodo(task) {
  todoArray.push({ text: task, completed: false });
}

export function removeTodo(index) {
  todoArray.splice(index, 1);
}

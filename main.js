import { addTodo } from "./todoData.js";
import { renderList } from "./renderList.js";

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");

function addTask() {
  const newTask = input.value.trim();
  if (newTask !== "") {
    addTodo(newTask);
    input.value = "";
    renderList();
  }
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

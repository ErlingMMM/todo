import { addTodo } from "./todoData.js";
import { renderList, setCurrentFilter } from "./renderList.js";

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const filterSelect = document.getElementById("filter-select");

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

filterSelect.addEventListener("change", () => {
  setCurrentFilter(filterSelect.value);
  renderList();
});

renderList();

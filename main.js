import { addTodo } from "./todoData.js";
import { renderList, setCurrentFilter } from "./renderList.js";
import { applyTheme } from "./theme.js";

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const filterSelect = document.getElementById("filter-select");
const dateInput = document.getElementById("todo-deadline");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.getElementById("main-body");
const mainDiv = document.getElementById("main-div");
const allInputs = document.querySelectorAll("input, select");

let isDark = localStorage.getItem("theme") === "dark";

applyTheme(isDark, body, mainDiv, darkModeToggle, allInputs, renderList);

function addTask() {
  const newTask = input.value.trim();
  const deadline = dateInput.value;

  if (newTask !== "") {
    addTodo(newTask, deadline || null);
    input.value = "";
    dateInput.value = "";
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

darkModeToggle.addEventListener("click", () => {
  isDark = !isDark;
  localStorage.setItem("theme", isDark ? "dark" : "light");
  applyTheme(isDark, body, mainDiv, darkModeToggle, allInputs, renderList);
  renderList();
});

renderList();

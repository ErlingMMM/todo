import { todoArray, removeTodo } from "./todoData.js";

function isDarkMode() {
  return document.body.classList.contains("bg-black");
}

const todoList = document.getElementById("todo-list");
let currentFilter = "all";

export function setCurrentFilter(filter) {
  currentFilter = filter;
  renderList();
}

export function renderList() {
  todoList.innerHTML = "";

  const filteredTodos = todoArray
    .map((todo, i) => ({ ...todo, index: i }))
    .filter((todo) => {
      if (currentFilter === "done") return todo.completed;
      if (currentFilter === "pending") return !todo.completed;
      return true;
    });

  filteredTodos.forEach(({ text, completed, deadline, index }) => {
    const li = document.createElement("li");
    li.setAttribute("data-index", index);
    li.className = `
      ${isDarkMode() ? "bg-gray-800 text-white" : "bg-gray-200 text-black"} 
      px-3 py-2 rounded opacity-0 translate-y-2 transition-all duration-300
    `;

    requestAnimationFrame(() => {
      li.classList.remove("opacity-0", "translate-y-2");
      li.classList.add("opacity-100", "translate-y-0");
    });

    const topRow = document.createElement("div");
    topRow.className = "flex justify-between items-center";

    const textWrapper = document.createElement("div");
    const span = document.createElement("span");
    span.textContent = text;
    if (completed) {
      span.classList.add("line-through", "text-gray-500");
    }
    textWrapper.appendChild(span);

    if (deadline) {
      const deadlineElement = document.createElement("div");
      deadlineElement.className = `text-xs mt-1 ${
        isDarkMode() ? "text-gray-400" : "text-gray-600"
      }`;
      deadlineElement.textContent = `Deadline: ${new Date(
        deadline
      ).toLocaleString()}`;
      textWrapper.appendChild(deadlineElement);
    }

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "flex space-x-2";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = !completed ? "Pending" : "Completed";
    completeBtn.className = `
      text-sm px-3 py-1 rounded-full
      ${
        !completed
          ? "bg-yellow-400 text-black hover:bg-yellow-500"
          : "bg-green-500 text-white hover:bg-green-600"
      }
    `;
    completeBtn.addEventListener("click", () => {
      todoArray[index].completed = !todoArray[index].completed;
      renderList();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = `
      text-red-500 hover:text-red-700 
      hover:bg-red-100 
      rounded-full 
      p-2 
      transition duration-400
    `;
    deleteBtn.addEventListener("click", () => {
      li.classList.add("opacity-0", "translate-x-4");
      li.classList.remove("opacity-100", "translate-x-0");
      setTimeout(() => {
        removeTodo(index);
        renderList();
      }, 500);
    });

    buttonGroup.appendChild(completeBtn);
    buttonGroup.appendChild(deleteBtn);

    topRow.appendChild(textWrapper);
    topRow.appendChild(buttonGroup);

    li.appendChild(topRow);
    todoList.appendChild(li);
  });
}

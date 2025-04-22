import { todoArray, removeTodo } from "./todoData.js";

function isDarkMode() {
  return document.body.classList.contains("bg-black");
}

const todoList = document.getElementById("todo-list");

let currentFilter = "all";

export function setCurrentFilter(filter) {
  currentFilter = filter;
}

export function renderList() {
  todoList.innerHTML = "";

  todoArray
    .filter((todo) => {
      if (currentFilter === "done") return todo.completed;
      if (currentFilter === "pending") return !todo.completed;
      return true;
    })
    .forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = `
  ${isDarkMode() ? "bg-gray-800 text-white" : "bg-gray-200 text-black"} 
  px-3 py-2 rounded
`;

      const topRow = document.createElement("div");
      topRow.className = "flex justify-between items-center";

      const textWrapper = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = todo.text;
      if (todo.completed) {
        span.classList.add("line-through", "text-gray-500");
      }
      textWrapper.appendChild(span);

      const buttonGroup = document.createElement("div");
      buttonGroup.className = "flex space-x-2";

      const completeBtn = document.createElement("button");
      completeBtn.textContent = !todo.completed ? "Pending" : "Completed";
      completeBtn.className = `
        text-sm px-3 py-1 rounded-full
        ${
          !todo.completed
            ? "bg-yellow-400 text-black hover:bg-yellow-500"
            : "bg-green-500 text-white hover:bg-green-600"
        }
      `;

      completeBtn.addEventListener("click", () => {
        todo.completed = !todo.completed;
        renderList();
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = `
        text-red-500 hover:text-red-700 
        hover:bg-red-100 
        rounded-full 
        p-2 
        transition duration-200
      `;

      textWrapper.appendChild(span);

      if (todo.deadline) {
        const deadlineElement = document.createElement("div");
        deadlineElement.className = `text-xs mt-1 ${
          isDarkMode() ? "text-gray-400" : "text-gray-600"
        }`;

        deadlineElement.textContent = `Deadline: ${new Date(
          todo.deadline
        ).toLocaleString()}`;
        textWrapper.appendChild(deadlineElement);
      }

      deleteBtn.addEventListener("click", () => {
        removeTodo(index);
        renderList();
      });

      buttonGroup.appendChild(completeBtn);
      buttonGroup.appendChild(deleteBtn);

      topRow.appendChild(textWrapper);
      topRow.appendChild(buttonGroup);

      li.appendChild(topRow);
      todoList.appendChild(li);
    });
}

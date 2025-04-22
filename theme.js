export function applyTheme(
  isDark,
  body,
  mainDiv,
  darkModeToggle,
  allInputs,
  renderList
) {
  if (isDark) {
    body.classList.remove("bg-gray-100");
    body.classList.add("bg-black");
    mainDiv.classList.remove("bg-white", "text-black");
    mainDiv.classList.add("bg-black", "text-white");
    darkModeToggle.textContent = "Light";

    allInputs.forEach((el) => {
      el.classList.remove("bg-white", "text-black", "border-gray-300");
      el.classList.add("bg-gray-800", "text-white", "border-white");
    });
  } else {
    body.classList.remove("bg-black");
    body.classList.add("bg-gray-100");
    mainDiv.classList.remove("bg-black", "text-white");
    mainDiv.classList.add("bg-white", "text-black");
    darkModeToggle.textContent = "Dark";

    allInputs.forEach((el) => {
      el.classList.remove("bg-gray-800", "text-white", "border-white");
      el.classList.add("bg-white", "text-black", "border-gray-300");
    });
  }

  renderList();
}

const inputBox = document.getElementById("task-input");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");

window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
  checkEmpty();
};

addButton.addEventListener("click", () => {
  const taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  renderTask(taskText, false);
  saveTasks();
  inputBox.value = "";
  checkEmpty();
});

// Render a task
function renderTask(text, completed) {
  const li = document.createElement("li");
  li.className = "task";
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.innerText = text;

  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✔";
  completeBtn.classList.add("complete-btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "✖";

  // Toggle complete
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete task
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
    checkEmpty();
  });

  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach(task => {
    tasks.push({
      text: task.querySelector("span").innerText,
      completed: task.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show/hide empty message
function checkEmpty() {
  const hasTasks = taskList.querySelectorAll(".task").length > 0;
  emptyMsg.style.display = hasTasks ? "none" : "block";
}

// Filter logic
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Toggle active class
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    document.querySelectorAll(".task").forEach(task => {
      switch (filter) {
        case "all":
          task.style.display = "flex";
          break;
        case "completed":
          task.style.display = task.classList.contains("completed") ? "flex" : "none";
          break;
        case "pending":
          task.style.display = task.classList.contains("completed") ? "none" : "flex";
          break;
      }
    });
  });
});

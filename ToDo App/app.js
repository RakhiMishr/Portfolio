const newTaskInput = document.getElementById("new-task");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filters = document.querySelectorAll(".filters button");
const countSpan = document.getElementById("count");
const clearCompletedBtn = document.getElementById("clear-completed");
const clearAllBtn = document.getElementById("clear-all");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  taskList.innerHTML = "";
  let filtered = tasks.filter(t =>
    filter === "all" ? true : filter === "active" ? !t.completed : t.completed
  );

  filtered.forEach(t => {
    const div = document.createElement("div");
    div.className = "task" + (t.completed ? " completed" : "");
    div.setAttribute("role", "listitem");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = t.completed;
    checkbox.setAttribute("aria-checked", t.completed);
    checkbox.onchange = () => toggleTask(t.id);

    const label = document.createElement("label");
    label.textContent = t.text;
    label.ondblclick = () => editTask(t.id);

    const del = document.createElement("button");
    del.textContent = "✖";
    del.onclick = () => removeTask(t.id);

    div.append(checkbox, label, del);
    taskList.appendChild(div);
  });

  countSpan.textContent = `${tasks.filter(t => !t.completed).length} items left`;
}

function addTask() {
  const text = newTaskInput.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, completed: false });
  newTaskInput.value = "";
  save();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  save();
  render();
}

function editTask(id) {
  const t = tasks.find(t => t.id === id);
  const newText = prompt("Edit Task:", t.text);
  if (newText !== null) {
    t.text = newText.trim();
    save();
    render();
  }
}

function removeTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

filters.forEach(btn => {
  btn.onclick = () => {
    filters.forEach(b => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    filter = btn.dataset.filter;
    render();
  };
});

addBtn.onclick = addTask;
newTaskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

clearCompletedBtn.onclick = () => {
  tasks = tasks.filter(t => !t.completed);
  save();
  render();
};

clearAllBtn.onclick = () => {
  tasks = [];
  save();
  render();
};

render();

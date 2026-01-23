let tasks = [];
let currentFilter = "all";

function addTask() {
    const text = document.getElementById("taskInput").value;
    const date = document.getElementById("dateInput").value;

    if (text === "" || date === "") return;

    tasks.push({
        name: text,
        due: new Date(date),
        completed: false
    });

    tasks.sort((a, b) => a.due - b.due);

    document.getElementById("taskInput").value = "";
    document.getElementById("dateInput").value = "";

    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks;

    if (currentFilter === "completed") {
        filtered = tasks.filter(t => t.completed);
    } else if (currentFilter === "pending") {
        filtered = tasks.filter(t => !t.completed);
    }

    filtered.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.name + " - " + task.due.toDateString();

        span.onclick = () => {
            task.completed = !task.completed;
            span.style.textDecoration = task.completed ? "line-through" : "none";
        };

        const del = document.createElement("button");
        del.textContent = "Delete";
        del.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
        };

        li.appendChild(span);
        li.appendChild(del);
        list.appendChild(li);
    });
}

function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

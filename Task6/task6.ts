enum Status {
    Pending,
    Completed
}

class Task {
    title: string;
    dueDate: Date;
    status: Status;

    constructor(title: string, dueDate: Date) {
        this.title = title;
        this.dueDate = dueDate;
        this.status = Status.Pending;
    }

    toggle(): void {
        if (this.status === Status.Pending) {
            this.status = Status.Completed;
        } else {
            this.status = Status.Pending;
        }
    }
}

let taskArr: Task[] = [];
let currentFilter: "all" | "completed" | "pending" = "all";

const titleInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const listBox = document.getElementById("taskList");

function addTask(): void {
    if (
        !(titleInput instanceof HTMLInputElement) ||
        !(dateInput instanceof HTMLInputElement) ||
        !(listBox instanceof HTMLUListElement)
    ) {
        return;
    }

    if (titleInput.value === "" || dateInput.value === "") return;

    const task = new Task(
        titleInput.value,
        new Date(dateInput.value)
    );

    taskArr.push(task);

    taskArr.sort((a, b) => {
        return a.dueDate.getTime() - b.dueDate.getTime();
    });

    titleInput.value = "";
    dateInput.value = "";

    showTasks();
}

function showTasks(): void {
    if (!(listBox instanceof HTMLUListElement)) return;

    listBox.innerHTML = "";

    let list: Task[] = taskArr;

    if (currentFilter === "completed") {
        list = taskArr.filter(t => t.status === Status.Completed);
    }

    if (currentFilter === "pending") {
        list = taskArr.filter(t => t.status === Status.Pending);
    }

    list.forEach((item, index) => {
        const li = document.createElement("li");

        const text = document.createElement("span");
        text.innerText = item.title + " - " + item.dueDate.toDateString();

        if (item.status === Status.Completed) {
            text.style.textDecoration = "line-through";
        }

        text.onclick = () => {
            item.toggle();
            showTasks();
        };

        const delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.onclick = () => {
            taskArr.splice(index, 1);
            showTasks();
        };

        li.appendChild(text);
        li.appendChild(delBtn);
        listBox.appendChild(li);
    });
}

function filterTasks(type: "all" | "completed" | "pending"): void {
    currentFilter = type;
    showTasks();
}

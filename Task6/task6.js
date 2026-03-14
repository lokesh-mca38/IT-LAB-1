var Status;
(function (Status) {
    Status[Status["Pending"] = 0] = "Pending";
    Status[Status["Completed"] = 1] = "Completed";
})(Status || (Status = {}));

var Task = (function () {
    function Task(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
        this.status = Status.Pending;
    }
    Task.prototype.toggle = function () {
        if (this.status === Status.Pending) {
            this.status = Status.Completed;
        }
        else {
            this.status = Status.Pending;
        }
    };
    return Task;
}());

var taskArr = [];
var currentFilter = "all";

var titleInput = document.getElementById("taskInput");
var dateInput = document.getElementById("dateInput");
var listBox = document.getElementById("taskList");

function addTask() {
    if (titleInput.value === "" || dateInput.value === "")
        return;

    var task = new Task(
        titleInput.value,
        new Date(dateInput.value)
    );

    taskArr.push(task);

    taskArr.sort(function (a, b) {
        return a.dueDate.getTime() - b.dueDate.getTime();
    });

    titleInput.value = "";
    dateInput.value = "";

    showTasks();
}

function showTasks() {
    listBox.innerHTML = "";

    var list = taskArr;

    if (currentFilter === "completed") {
        list = taskArr.filter(function (t) { return t.status === Status.Completed; });
    }

    if (currentFilter === "pending") {
        list = taskArr.filter(function (t) { return t.status === Status.Pending; });
    }

    list.forEach(function (item, index) {
        var li = document.createElement("li");

        var text = document.createElement("span");
        text.innerText = item.title + " - " + item.dueDate.toDateString();

        if (item.status === Status.Completed) {
            text.style.textDecoration = "line-through";
        }

        text.onclick = function () {
            item.toggle();
            showTasks();
        };

        var delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.onclick = function () {
            taskArr.splice(index, 1);
            showTasks();
        };

        li.appendChild(text);
        li.appendChild(delBtn);
        listBox.appendChild(li);
    });
}

function filterTasks(type) {
    currentFilter = type;
    showTasks();
}

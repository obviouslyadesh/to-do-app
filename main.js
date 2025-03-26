let form = document.getElementById("taskForm");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let msg = document.getElementById("msg");
let editIndex = document.getElementById("editIndex");

let data = JSON.parse(localStorage.getItem("data")) || [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    saveTask();
});

let saveTask = () => {
    if (textInput.value.trim() === "") {
        msg.innerHTML = "Task cannot be blank";
        return;
    } 
    msg.innerHTML = "";

    let taskData = {
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    };

    if (editIndex.value === "") {
        data.push(taskData);
    } else {
        data[editIndex.value] = taskData;
        editIndex.value = "";
    }

    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
    resetForm();
    let modal = bootstrap.Modal.getInstance(document.getElementById('form'));
    modal.hide();
};

let createTasks = () => {
    tasks.innerHTML = "";
    data.forEach((task, index) => {
        tasks.innerHTML += `
        <div class="task-card" id="task-${index}">
            <p><strong>${task.text}</strong></p>
            <p>Due: ${task.date}</p>
            <p>${task.description}</p>
            <div class="task-actions">
                <i onClick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit text-primary"></i>
                <i onClick="deleteTask(${index})" class="fas fa-trash-alt text-danger"></i>
            </div>
        </div>
        `;
    });
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

let deleteTask = (index) => {
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
};

let editTask = (index) => {
    let task = data[index];
    textInput.value = task.text;
    dateInput.value = task.date;
    textarea.value = task.description;
    editIndex.value = index;
};

createTasks();

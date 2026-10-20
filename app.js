const form = document.querySelector(".form");
const input = document.querySelector(".text");
const colorSelect = document.querySelector(".color-select");
const todo = document.querySelector("#todo .cards-container");
const delSpan = document.getElementById("delete-count");

let delCount = 0;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!input.value.trim()) return; 

    const card = document.createElement("div");

    card.className = "card";
    card.textContent = input.value.trim();
    card.draggable = true;
    card.style.borderLeftColor = colorSelect.value;

    card.ondblclick = () => { card.contentEditable = true; card.focus(); };
    card.onblur = () => card.contentEditable = false;
    card.ondragstart = () => card.classList.add("dragging");
    card.ondragend = () => { card.classList.remove("dragging"); updateCounts(); };

    todo.append(card);
    input.value = "";
    updateCounts();
});

document.querySelectorAll(".cards-container").forEach(box => {
    box.ondragover = (e) => {
        e.preventDefault();
        const card = document.querySelector(".dragging");

        if (!card) return;

        if (box.parentElement.id === "trash") {
            card.remove();
            delSpan.textContent = ++delCount;
        } else {
            box.append(card);
            card.classList.toggle("line", box.parentElement.id === "accomplished");
        }
        updateCounts();
    };
});

function updateCounts() {
    document.querySelectorAll(".zone").forEach(z => {
        const c = z.querySelector(".count");
        if (c) c.textContent = z.querySelectorAll(".card").length;
    });

    const todoCount = document.querySelectorAll("#todo .card").length;
    const importantCount = document.querySelectorAll("#important .card").length;
    const accomplishedCount = document.querySelectorAll("#accomplished .card").length;

    const totalActive = todoCount + importantCount + accomplishedCount;
    let percentage = 0;

    if (totalActive > 0) {
        percentage = Math.round((accomplishedCount / totalActive) * 100);
    }

    const progressText = document.getElementById("progress-text");
    const progressFill = document.getElementById("progress-fill");

    if (progressText && progressFill) {
        progressText.textContent = `${accomplishedCount} of ${totalActive} tasks accomplished (${percentage}%)`;
        progressFill.style.width = `${percentage}%`;
    }
}

function loadTasksFromServer() {
    fetch('/api/tasks')
        .then(res => res.json())
        .then(tasks => {
            console.log("Serverdan kelgan ma'lumotlar:", tasks);
        });
}

function saveTasksToServer(updatedTasksList) {
    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTasksList)
    });
}
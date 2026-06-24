const tabs = document.querySelectorAll(".tab");
const screens = document.querySelectorAll(".screen");
const nextButtons = document.querySelectorAll(".next");

function showScreen(name) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.screen === name);
  });

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === `screen-${name}`);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => showScreen(tab.dataset.screen));
});

nextButtons.forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.next));
});

const lighterPlanButton = document.getElementById("lighterPlan");

if (lighterPlanButton) {
  lighterPlanButton.addEventListener("click", () => {
    const plan = document.getElementById("planList");
    if (!plan) return;

    plan.innerHTML = `
    <li><span>19:00 - 19:30</span> Ôn Linear Algebra quiz</li>
    <li><span>19:30 - 19:40</span> Nghỉ ngắn</li>
    <li><span>19:40 - 20:35</span> Làm CS assignment phần quan trọng nhất</li>
    <li><span>20:35 - 20:50</span> Checklist câu hỏi còn vướng</li>
  `;
    showScreen("draft");
  });
}

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
const customizePlanButton = document.getElementById("customizePlan");
const customizePanel = document.getElementById("customizePanel");
const applyCustomPlanButton = document.getElementById("applyCustomPlan");

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

if (customizePlanButton && customizePanel) {
  customizePlanButton.addEventListener("click", () => {
    customizePanel.hidden = !customizePanel.hidden;
  });
}

if (applyCustomPlanButton) {
  applyCustomPlanButton.addEventListener("click", () => {
    const plan = document.getElementById("planList");
    const subject = document.getElementById("prioritySubject")?.value;
    const intensity = document.getElementById("planIntensity")?.value;
    const note = document.getElementById("customNote")?.value.trim();
    if (!plan) return;

    const plans = {
      balanced: {
        normal: [
          ["19:00 - 19:30", "Ôn Linear Algebra quiz vì diễn ra sáng mai."],
          ["19:30 - 19:40", "Nghỉ ngắn để giảm mệt."],
          ["19:40 - 20:55", "Làm phần quan trọng nhất của CS assignment."],
          ["20:55 - 21:10", "Checklist câu hỏi còn vướng trước khi nghỉ."],
        ],
        light: [
          ["19:00 - 19:25", "Ôn Linear Algebra quiz phần công thức chính."],
          ["19:25 - 19:35", "Nghỉ ngắn."],
          ["19:35 - 20:25", "Làm một phần CS assignment có điểm cao nhất."],
          ["20:25 - 20:40", "Ghi lại việc còn lại cho ngày mai."],
        ],
        deep: [
          ["19:00 - 19:45", "Ôn Linear Algebra quiz và làm 2 bài mẫu."],
          ["19:45 - 20:00", "Nghỉ."],
          ["20:00 - 21:30", "Deep work cho CS assignment phần khó nhất."],
          ["21:30 - 21:45", "Review lỗi và checklist nộp bài."],
        ],
      },
      cs: {
        normal: [
          ["19:00 - 20:20", "Làm CS assignment phần quan trọng nhất."],
          ["20:20 - 20:30", "Nghỉ ngắn."],
          ["20:30 - 21:00", "Ôn Linear Algebra quiz phần chắc điểm."],
          ["21:00 - 21:15", "Checklist và ghi câu hỏi cần hỏi TA."],
        ],
        light: [
          ["19:00 - 19:55", "Hoàn thành một mục CS assignment có thể nộp được."],
          ["19:55 - 20:05", "Nghỉ."],
          ["20:05 - 20:30", "Ôn nhanh Linear Algebra quiz."],
          ["20:30 - 20:40", "Chốt việc còn lại."],
        ],
        deep: [
          ["19:00 - 20:45", "Deep work CS assignment, tắt thông báo."],
          ["20:45 - 21:00", "Nghỉ."],
          ["21:00 - 21:35", "Ôn Linear Algebra quiz phần rủi ro cao."],
          ["21:35 - 21:50", "Review và chuẩn bị nộp."],
        ],
      },
      math: {
        normal: [
          ["19:00 - 20:00", "Ôn Linear Algebra quiz và làm bài mẫu."],
          ["20:00 - 20:10", "Nghỉ ngắn."],
          ["20:10 - 21:00", "Làm CS assignment phần tối thiểu cần xong."],
          ["21:00 - 21:15", "Checklist câu hỏi còn vướng."],
        ],
        light: [
          ["19:00 - 19:40", "Ôn Linear Algebra quiz phần công thức và ví dụ."],
          ["19:40 - 19:50", "Nghỉ."],
          ["19:50 - 20:25", "Làm một task nhỏ của CS assignment."],
          ["20:25 - 20:40", "Ghi lại plan ngày mai."],
        ],
        deep: [
          ["19:00 - 20:20", "Deep work Linear Algebra quiz, làm đề mẫu."],
          ["20:20 - 20:35", "Nghỉ."],
          ["20:35 - 21:30", "Làm CS assignment phần có deadline gần."],
          ["21:30 - 21:45", "Review lỗi thường gặp."],
        ],
      },
    };

    const selectedPlan = plans[subject]?.[intensity] ?? plans.balanced.normal;
    const noteItem = note ? `<li><span>Ghi chú</span>${note}</li>` : "";
    plan.innerHTML = selectedPlan
      .map(([time, task]) => `<li><span>${time}</span> ${task}</li>`)
      .join("") + noteItem;
    showScreen("draft");
  });
}

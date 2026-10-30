const questions = [
  ["处于搏命（化险为夷）期间可以进行的交互是", ["滑滑梯", "坐过山车", "翻箱子", "上电车"]],
  ["红教堂的哪个位置不会刷新地窖", ["墓地", "小木屋", "侧门废墟", "南危墙"]],
  ["以下哪种情况下屠夫可以出刀", ["丢假伞后尚未收伞的宿伞之魂", "处于洄游状态的渔女", "处于轮型状态的破轮", "出镐后尚未收镐的愚人金"]],
  ["溜鬼队友发的哪个信号最不可能是开机信号", ["快走，我走地窖", "专心破译", "站着别动，我来帮你", "监管者转移目标，注意周围"]],
  ["处于搏命（化险为夷）期间可以使用技能的是", ["小女孩（传送）", "医生（扎针）", "调酒师（喝酒）", "冒险家（挖书页）"]],
  ["以下哪个不会降低求生者的交互速度", ["噩梦的渡鸦", "杂货商的碎石", "黄衣的触手", "使徒的猫"]],
  ["先知的鸟能抵挡的伤害是", ["渔女的水汽伤害", "破轮的悲观伤害", "蜡像的热蜡伤害", "约瑟夫的镜像结算伤害"]],
  ["下列行为不会触发恐惧震慑的是", ["玩老头的控制台时被打中", "开/关箱子过程中被打中", "翻箱子过程中被打中", "治疗队友时被打中"]],
  ["以下不能卡狗（巡视者）的是", ["高低差", "切换蹲起模式", "飞轮", "卡板/窗交互"]],
  ["未受其他效果影响下，求生者开启大门的时间为", ["15s", "18s", "20s", "22s"]],
  ["柜子的功能不包括", ["消渔女的水汽", "消隐士的电极", "消蜡像的蜡油", "消噩梦的乌鸦"]],
  ["月亮河公园过山车的乘坐cd是", ["20s", "25s", "30s", "33s"]],
  ["以下情况下修机速度最快的是", ["队友上椅时的空军", "摇过两个怀表的大副", "跟女求生（除心理学家）一同修机的病患", "跟他人一同修机的入殓师"]],
  ["以下选项中不可以卡耳鸣的是", ["机械师的傀儡", "记者的奥菲", "昆虫学者的虫群", "幻灯师的定格影像"]],
  ["以下天赋中，不影响求生者开门速度的是", ["幽闭恐惧", "恐慌", "恶化", "崩坏"]],
  ["下列行为不会触发恐惧震慑的是", ["拆椅子时被打中", "拆除安息松时被打中", "帮助队友拔出穿刺时被打中", "推倒危墙时被打中"]],
  ["永眠镇电车每站停靠时间", ["5s", "7s", "8s", "10s"]],
  ["永眠镇电车首次抵达墓地的时间", ["30s", "35s", "37s", "40s"]],
  ["下列行为会触发恐惧震慑的是", ["交互时被厂长的木炭打中", "交互时被厂长的傀儡打中", "使用魔术棒时被打中本体（非魔术师）", "交互时被孽蜥坠击"]],
  ["火灾调查员原地放置气囊包裹自身模型后开启大门，该状态下不能免疫的行为是", ["梦之女巫寄生", "伊斯人寄宿", "台球手主球", "记录员记录"]]
];

const answerKey = [2, 1, 3, 3, 0, 3, 0, 2, 1, 1, 3, 3, 1, 2, 3, 1, 3, 2, 2, 2];

const ranks = [
  { max: 5, title: "三阶选手", copy: "这些排位的小知识对你来说有点冷啦！但你一定是其他模式的高手吧！偶尔尝试一下排位和匹配，去感受一下另一种体验下的心跳加速吧！" },
  { max: 10, title: "五阶选手", copy: "这些排位的小知识你都略有些了解呢，但排位是否到了瓶颈期？别急着继续冲分，多看比赛多复盘，细节才能决定成败~" },
  { max: 15, title: "七阶选手", copy: "这些排位的小知识你了解得不少呢，还想进步的话要多看看机制和数值才行呢，积累了足够的知识才能有底气地去赛后呀。" },
  { max: 20, title: "巅七选手", copy: "这些排位的小知识对你来说根本没有难度呢，钻研机制和数值的玩家希望能多多遇见才好，要不是容易被黑我已经推荐你去打职业啦。" }
];

const letters = ["A", "B", "C", "D"];
const $ = (selector) => document.querySelector(selector);
const screens = { start: $("#start-screen"), quiz: $("#quiz-screen"), result: $("#result-screen") };
let current = 0;
let answers = [];
let locked = false;

function show(name) {
  Object.entries(screens).forEach(([key, node]) => { node.hidden = key !== name; });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  locked = false;
  const [question, options] = questions[current];
  const displayNumber = String(current + 1).padStart(2, "0");
  $("#question-number").textContent = displayNumber;
  $("#question-label-number").textContent = displayNumber;
  $("#question-text").textContent = question;
  const percent = ((current + 1) / questions.length) * 100;
  $("#progress-bar").style.width = `${percent}%`;
  $("#progress-text").textContent = `进度 ${Math.round(percent)}%`;
  const container = $("#options");
  container.replaceChildren();

  options.forEach((text, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.innerHTML = `<b aria-hidden="true"><span>${letters[index]}</span></b><span>${text}</span>`;
    button.setAttribute("aria-label", `${letters[index]}，${text}`);
    button.addEventListener("click", () => selectAnswer(index, button));
    container.append(button);
  });

  requestAnimationFrame(() => container.querySelector("button")?.focus({ preventScroll: true }));
}

function selectAnswer(index, button) {
  if (locked) return;
  locked = true;
  answers[current] = index;
  button.classList.add("selected");
  document.querySelectorAll(".option").forEach((option) => { option.disabled = true; });

  window.setTimeout(() => {
    current += 1;
    if (current < questions.length) renderQuestion();
    else showResult();
  }, 320);
}

function showResult() {
  const score = answers.reduce((sum, answer, index) => sum + Number(answer === answerKey[index]), 0);
  const rank = ranks.find((item) => score <= item.max);
  $("#score").textContent = score;
  $("#result-title").textContent = rank.title;
  $("#result-copy").textContent = rank.copy;
  $("#result-stat").textContent = `答对 ${score} 题 · 正确率 ${Math.round((score / questions.length) * 100)}%`;
  show("result");
  const circumference = 2 * Math.PI * 61;
  $("#score-arc").style.strokeDashoffset = String(circumference * (1 - score / questions.length));
  $("#restart-button").focus({ preventScroll: true });
}

$("#start-button").addEventListener("click", () => {
  current = 0;
  answers = [];
  show("quiz");
  renderQuestion();
});

$("#restart-button").addEventListener("click", () => {
  current = 0;
  answers = [];
  $("#score-arc").style.strokeDashoffset = "383.27";
  show("start");
  $("#start-button").focus({ preventScroll: true });
});

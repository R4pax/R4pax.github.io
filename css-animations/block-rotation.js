const FLOOR = document.querySelector(".floor");
const vars = {
  width: 128,
  height: 64,
  radius: 25,
  count: 3,
  duration: 20,
};

function updateCssVars() {
  const opacity = (0.8 - vars.count / 180).toFixed(2);
  document.documentElement.style.setProperty("--o", opacity);
  document.documentElement.style.setProperty("--br", vars.radius);
  document.documentElement.style.setProperty("--bw", vars.width + "px");
  document.documentElement.style.setProperty("--bh", vars.height + "px");
  document.documentElement.style.setProperty(`--a-dur`, vars.duration + "s");
}

function createElement(i) {
  const delay = -((i * vars.duration) / vars.count).toFixed(2) + "s";
  const div = document.createElement("div");
  div.classList.add("block");
  div.style.setProperty(`--a-del`, delay);
  return div;
}

function reDrawBlocks() {
  FLOOR.innerHTML = "";
  for (let i = 0; i < vars.count; i++) {
    FLOOR.append(createElement(i));
  }
}

function inputChanged(e) {
  const elem = e.currentTarget;
  const id = elem.id;
  const unit = elem.dataset.unit || "";
  document.querySelector(`label[for=${id}]`).textContent = `${elem.id} : ${elem.value}${unit}`;
  vars[id] = elem.value;
  updateCssVars();
  if (["duration", "count"].indexOf(id) > -1) {
    reDrawBlocks();
  }
}

function init() {
  document.querySelectorAll("input").forEach((input) => {
    const id = input.id;
    const unit = input.dataset.unit || "";
    input.value = vars[id];
    document.querySelector(`label[for=${id}]`).textContent = `${id} : ${input.value}${unit}`;
    input.addEventListener("input", inputChanged);
  });
  updateCssVars();
  reDrawBlocks();
}

init();

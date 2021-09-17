const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

let cw, ch, cx, cy;

const setCanvasSize = () => {
  cw = canvas.width = innerWidth;
  ch = canvas.height = innerHeight;
  cx = cw / 2;
  cy = ch / 2;
};

const init = () => {
  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);

  loop();
};

const loop = () => {
  requestAnimationFrame(loop);
};

class Dot {
  constructor() {
    this.pos = { x: cx, y: cy };
  }

  reDraw() {
    let color = "red";
    let size = 12;
    let x = this.pos - size / 2;
  }
}

init();

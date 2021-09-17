const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

let w = (canvas.width = innerWidth);
let h = (canvas.height = innerHeight);

const particles = [];
const properties = {
  bgColor: "rgba(17, 17, 19, 1)",
  particleColor: "rgba(255, 40, 40, 1)",
  particleRadius: 2,
  particleCount: 150,
  particleMaxVelocity: 0.5,
  lineLenth: 150,
  particleLife: 600,
};

const setCanvasSize = () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
};

const reDrawBackground = () => {
  ctx.fillStyle = properties.bgColor;
  ctx.fillRect(0, 0, w, h);
};

const reDrawParticles = () => {
  particles.forEach((particle) => {
    particle.reCalcLife();
    particle.position();
    particle.reDraw();
  });
};

const drawLines = () => {
  let x1, x2, y1, y2, lenth, opacity;

  for (let i in particles) {
    for (let j in particles) {
      x1 = particles[i].x;
      y1 = particles[i].y;
      x2 = particles[j].x;
      y2 = particles[j].y;
      lenth = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

      if (lenth < properties.lineLenth) {
        opacity = 1 - lenth / properties.lineLenth;
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = `rgba(255, 40, 40, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
};

const loop = () => {
  reDrawBackground();
  reDrawParticles();
  drawLines();
  requestAnimationFrame(loop);
};

const init = () => {
  for (let i = 0; i < properties.particleCount; i++) {
    particles.push(new Particle());
  }

  document.body.append(canvas);
  window.addEventListener("resize", setCanvasSize);

  loop();
};

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.velocityX =
      Math.random() * (properties.particleMaxVelocity * 2) -
      properties.particleMaxVelocity;
    this.velocityY =
      Math.random() * (properties.particleMaxVelocity * 2) -
      properties.particleMaxVelocity;
    this.life = Math.random() * properties.particleLife * 60;
  }

  reCalcLife() {
    if (this.life < 1) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.velocityX =
        Math.random() * (properties.particleMaxVelocity * 2) -
        properties.particleMaxVelocity;
      this.velocityY =
        Math.random() * (properties.particleMaxVelocity * 2) -
        properties.particleMaxVelocity;
      this.life = Math.random() * properties.particleLife * 60;
    }
    this.life--;
  }

  position() {
    (this.x + this.velocityX > w && this.velocityX > 0) ||
    (this.x + this.velocityX < 0 && this.velocityX < 0)
      ? (this.velocityX *= -1)
      : this.velocityX;

    (this.y + this.velocityY > h && this.velocityY > 0) ||
    (this.y + this.velocityY < 0 && this.velocityY < 0)
      ? (this.velocityY *= -1)
      : this.velocityY;

    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  reDraw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = properties.particleColor;
    ctx.fill();
  }
}

init();

(function() {
  const canvas = document.querySelector('.canvas');
  const ctx = canvas.getContext('2d');

  const DEFAULT_DOTS_COUNT  = 2;
  const DOT_RADIUS          = 10;
  const DOT_COLOR           = '#f00';
  const MAX_LIGHT_DISTANCE  = 800;
  const STEP_LENGTH         = 2;
  const MAX_OFFSET          = 6;

  let w = canvas.width  = window.innerWidth * 2;
  let h = canvas.height = window.innerHeight * 2;
  let activeDotIdx  = 0;
  let activeDotPosX = Math.random() * w;
  let activeDotPosY = Math.random() * h;

  class Dot {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    draw(x = this.x, y = this.y) {
      this.x = x
      this.y = y

      ctx.lineWidth = 1;
      ctx.fillStyle = DOT_COLOR;
      ctx.strokeStyle = 'white';

      ctx.beginPath()
      ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2)
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(x, y, DOT_RADIUS * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    }
  }

  const dots = createDots();

  function createDots(count = DEFAULT_DOTS_COUNT) {
    return new Array(count).fill('_').map(() => {
      return new Dot(Math.random() * w, Math.random() * h);
    })
  }

  function createLightening() {
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const distance = getDistance(dots[i], dots[j]);
        const chance = distance / MAX_LIGHT_DISTANCE;
        if (Math.random() < chance) continue;

        const color = Math.round(chance * 255);
        const stepsCount = distance / STEP_LENGTH;
        let sx = dots[i].x;
        let sy = dots[i].y;

        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);

        for (let k = stepsCount; k > 1; k--) {
          const pathLength = getDistance(dots[i], {x: sx, y: sy});
          const offset = Math.sin(pathLength / distance * Math.PI) * MAX_OFFSET;

          sx += (dots[j].x - sx) / k + Math.random() * offset * 2 - offset;
          sy += (dots[j].y - sy) / k + Math.random() * offset * 2 - offset;
          ctx.lineTo(sx, sy);
        }

        ctx.strokeStyle = `rgb(255, ${color}, ${color})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  function getDistance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
  }

  function resetCanvasSize() {
    w = canvas.width  = window.innerWidth * 2;
    h = canvas.height = window.innerHeight * 2;
  }

  function changeActiveDot() {
    activeDotIdx = activeDotIdx === dots.length - 1 ? 0 : activeDotIdx += 1;
  }

  function changePositionActiveDot(e) {
    activeDotPosX = e.clientX * 2;
    activeDotPosY = e.clientY * 2;
  }

  function loop() {
    ctx.clearRect(0, 0, w, h);

    dots.forEach((dot, idx) => {
      activeDotIdx === idx ? dot.draw(activeDotPosX, activeDotPosY) : dot.draw()
    });

    createLightening();

    requestAnimationFrame(loop);
  }

  loop();

  window.addEventListener('resize', resetCanvasSize);
  canvas.addEventListener('mousemove', changePositionActiveDot);
  canvas.addEventListener('click', changeActiveDot);
})()
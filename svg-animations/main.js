const value = 1256.64;
const time = 1000;
const speed = value / time;

function anima(timestamp) {
  let current = value - timestamp * speed;
  if (current < 0) current = 0;
  console.log(current);
  if (current > 0) requestAnimationFrame(anima);
}
requestAnimationFrame(anima);

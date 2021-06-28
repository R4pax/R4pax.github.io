export const createHole = () => {
  const x = Math.floor(Math.random() * 100);
  const y = Math.floor(Math.random() * 100);
  const css = document.createElement("style");
  css.innerHTML = `.black-hole {
    z-index: 100500;
    position: fixed;
    animation: black-hole 10s linear;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 100vw 100vh  #000;
    width: 20vw;
    height: 20vw;
  }
  @keyframes black-hole {
    0% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 20vw;
      height: 20vw;
    }
  } 
  `;
  document.head.appendChild(css);
  const elem = document.createElement("div");
  elem.className = "black-hole";
  elem.style = `left: -${x}vw;top: -${y}vh;`;
  document.body.appendChild(elem);
  setTimeout(createHole, 2000);
};
setTimeout(createHole, 20000);

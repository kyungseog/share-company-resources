'use strict'

const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const boxes = [];
const mousePos = {x: 0, y: 0};
let panel;
let selectedBox; // 클릭된 box
let oX;
let oY;
let step; // 애플리케이션의 상태(단계)를 저장 1 ~ 4
let rafId;

context.font = 'bold 30px sans-serif';

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  let box;
  for (let i = 0; i < boxes.length; i++) {
    box = boxes[i];
    box.draw();
  }

  switch (step) {
    case 1:
      for (let i = 0; i < boxes.length; i++) {
        box = boxes[i];
        box.x += box.speed;
        if (box.x > canvas.width) {
          box.x = -box.width;
        }
      }
      break;

    case 2:
      panel.scale = panel.scale + (1 - panel.scale)*0.1;
      panel.angle = panel.scale * 720;
      panel.draw();
      if (panel.scale >= 0.999) {
        panel.scale = 1;
        panel.angle = 720;
        step = 3;
      }
      break;

    case 3:
      panel.draw();
      break;
  }

  rafId = requestAnimationFrame(render);
  if (step === 3) {
    panel.showContent();
    cancelAnimationFrame(rafId);
  }
}

let tempX, tempY, tempSpeed, tempW, tempH;

function init() {
  step = 1;
  oX = canvas.width / 2;
  oY = canvas.height / 2;
  for (let i = 0; i < 78; i++) {
    tempX = Math.random() * canvas.width * 0.8;
    tempY = Math.random() * canvas.height * 0.8;
    tempSpeed = Math.random() * 4 + 1;
    tempW = Math.random() * 50 + 50;
    tempH = tempW; //정사각형
    boxes.push(new Box(i, tempX, tempY, tempSpeed, tempW, tempH));
  }

  panel = new Panel();

  render();
}

canvas.addEventListener('click', e => {
  mousePos.x = e.layerX;
  mousePos.y = e.layerY;

  let box;
  for (let i = 0; i < boxes.length; i++) {
    box = boxes[i];
    if (mousePos.x > box.x &&
      mousePos.x < box.x + box.width &&
      mousePos.y > box.y &&
      mousePos.y < box.y + box.height) {
      
      selectedBox = box;
    }
  }

  if (step === 1 && selectedBox) {
    // console.log(selectedBox.index);
    step = 2;
  } else if (step === 3) {
    step = 1;
    panel.scale = 0.01;
    selectedBox = null;
    render();
  }
});

init();
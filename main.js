const container = document.querySelector('.container');
const canvasWidth = 64;
const canvasHeight = 64;

for (i = 0; i < canvasWidth * canvasHeight; i++) {
    const div = document.createElement('div');
    div.classList.add('pixel');
    const r = Math.ceil(Math.random()*255);
    const g = Math.ceil(Math.random()*255);
    const b = Math.ceil(Math.random()*255);

    div.style.width = `${100/canvasWidth}%`;
    div.style.height = `${100/canvasHeight}%`;
    div.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    container.appendChild(div);
}
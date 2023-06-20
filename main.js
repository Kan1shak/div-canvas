var canvasWidth = 25;
var canvasHeight = 25;

function createCanvas(canvasWidth, canvasHeight){
    const container = document.createElement('div');
    container.classList.add('container');
    for (i = 0; i < canvasWidth * canvasHeight; i++) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        const r = Math.ceil((1/Math.cos(i))*255);
        const g = Math.ceil((1/Math.sin(i))*255);
        const b = Math.ceil(Math.random()*Math.sin(i)*255);
    
        div.style.width = `${100/canvasWidth}%`;
        div.style.height = `${100/canvasHeight}%`;
        div.style.backgroundColor = `rgb(${r}, ${g}, ${g})`;
        container.appendChild(div);
    }
    document.body.appendChild(container);

}
createCanvas(canvasWidth,canvasWidth)


const slider = document.querySelector('#slider');
slider.addEventListener('input', (inp) =>{
    canvasWidth = slider.value;
    console.log(canvasWidth);
    createCanvas(canvasWidth,canvasWidth)
    const container = document.querySelector('.container');
    container.remove();
    const pixels = document.querySelectorAll('.pixel');

pixels.forEach((pixel)=>{
    //check if mouse is over the pixel
    pixel.addEventListener("mouseover", () => {
        isMouseOver = true;
        checkEvents();
      });
    //check if it went out of the pixel
      pixel.addEventListener("mouseout", () => {
        isMouseOver = false;
      });
    //check if mouse is pressed down
      pixel.addEventListener("mousedown", () => {
        isMouseDown = true;
        checkEvents();
      });
    //check if mouse released
      pixel.addEventListener("mouseup", () => {
        isMouseDown = false;
      });
      
      const checkEvents = () => {
        //works only if both mouse is over the pixel and pressed down
        if (isMouseOver && isMouseDown) {
          pixel.style.backgroundColor = "gold";
        }
      };
});
});
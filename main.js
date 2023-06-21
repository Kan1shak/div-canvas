var canvasWidth = 24;
var canvasHeight = 24;
var colorOption;
var borderOption = false;
const r = document.querySelector(':root');
const mainContainer = document.querySelector('.main-container');
const container = document.querySelector('.container');
const resetButton = document.querySelector('.reset');
const toggeleButtons = document.querySelectorAll('.toggle');
const gridSlider = document.querySelector('#gridSlider');
const toggleBorder = document.querySelector('.toggle-border');

function RandomColor() {
    const r = Math.ceil(Math.random()*255);
    const g = Math.ceil(Math.random()*255);
    const b = Math.ceil(Math.random()*255);
    return `rgb(${r}, ${g}, ${b})`
}
    

function Shading(intensity){
    //getting the intensity of Red
    var r = intensity.split(",")[0];
    r = r.substring(4, r.length);
    const intensityOutr = Math.ceil(parseInt(r) - (255/10));
    //console.log(intensityOutr);
    
    //getting the intensity of Green
    var g = intensity.split(",")[1];
    g = g.substring(1, g.length);
    const intensityOutg = Math.ceil(parseInt(g) - (255/10));
    //console.log(intensityOutg);
    
    //getting the intensity of Blue
    var b = intensity.split(",")[2];
    b = b.substring(1, b.length-1);
    const intensityOutb = Math.ceil(parseInt(b) - (255/10));
    //console.log(intensityOutb);
    return `rgb(${intensityOutr}, ${intensityOutg}, ${intensityOutb})`;
}

function DefaultCanvasColors(i=1){
    const r = Math.ceil((1/Math.cos(i))*255);
    const g = Math.ceil((1/Math.sin(i))*255);
    const b = Math.ceil(Math.random()*Math.sin(i)*255);
    return `rgb(${r}, ${g}, ${g})`
}

function SingleColour(r=0,g=0,b=0){
    return `rgb(${r}, ${g}, ${b})`
}

function createCanvas(canvasWidth, canvasHeight){
    const container = document.createElement('div');
    container.classList.add('container');
    for (i = 1  ; i <= canvasWidth * canvasHeight; i++) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        div.style.backgroundColor = DefaultCanvasColors(i);
        div.style.width = `${100/canvasWidth}%`;
        div.style.height = `${100/canvasHeight}%`;
        container.appendChild(div);
    }
    mainContainer.appendChild(container);
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
        
        
        if (colorOption === 'RGB'){
            pixel.style.backgroundColor = RandomColor();
        }
        else if (colorOption === 'Shading'){
            pixel.style.backgroundColor = Shading(pixel.style.backgroundColor);
        }
        else if(colorOption === 'Black'){
            pixel.style.backgroundColor = SingleColour(0,0,0);
        }
        else{
            pixel.style.backgroundColor = SingleColour(255,80,255);
        }
    }
    };
});

resetButton.addEventListener('click', ()=>{
    pixels.forEach((pixel)=>{
        pixel.style.backgroundColor = 'rgb(255,255,255)';
    });
});
}

toggeleButtons.forEach(
    (button) => {
        button.addEventListener('click', ()=> { 
            colorOption = button.textContent;
        });
    }
);

gridSlider.addEventListener('input', (gridSize)=>{
    const container = document.querySelector('.container');
    canvasWidth = gridSlider.value;
    const gridSizeDisplay = document.querySelector('.grid-text');
    gridSizeDisplay.textContent = `${canvasWidth} x ${canvasWidth}`;
    container.remove();
    createCanvas(canvasWidth,canvasWidth);
    allowPixelColor()
});

toggleBorder.addEventListener('click', ()=>{
    borderOption = !borderOption;
    if (borderOption){
        r.style.setProperty('--borderSize', '0px');
    } else{
        r.style.setProperty('--borderSize', '1px');
    }
});
createCanvas(canvasWidth,canvasWidth);
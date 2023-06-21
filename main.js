const canvasWidth = 32;
const canvasHeight = 32;
var r,g,b;
var colorOption;
const container = document.querySelector('.container');
// const rgbButton = document.querySelector('.rgb');
// const shadingButton = document.querySelector('.shading');
// const singleColorButton = document.querySelector('.single-color');
const resetButton = document.querySelector('.reset');
const toggeleButtons = document.querySelectorAll('.toggle');
function RandomColor() {
    const r = Math.ceil(Math.random() * 300);
    const g = Math.ceil(Math.random() * 300);
    const b = Math.ceil(Math.random() * 300);
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
    const r = (Math.ceil((1/Math.cos(Math.PI/256*i))/5)*255);
    const g = Math.ceil((1/Math.sin(Math.PI/128 *i)/2)*255);
    const b = Math.ceil(Math.tan(i)*255);
    return `rgb(${r}, ${g}, ${g})`
}

function SingleColour(r=0,g=0,b=0){
    return `rgb(${r}, ${g}, ${b})`
}

for (i = 1  ; i <= canvasWidth * canvasHeight; i++) {
    const div = document.createElement('div');
    div.classList.add('pixel');
    div.style.backgroundColor = DefaultCanvasColors(1);
    div.style.width = `${100/canvasWidth}%`;
    div.style.height = `${100/canvasHeight}%`;
    container.appendChild(div);
}

toggeleButtons.forEach(
    (button) => {
        button.addEventListener('click', ()=> { 
            colorOption = button.textContent;
        });
    }
);

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
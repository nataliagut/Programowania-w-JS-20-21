
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let maxFlakes = 500;
let flakesArr = [];
let w,h;
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;
document.addEventListener('mousemove', onMouseMove);
let stormBtn = document.querySelector('#stormBtn');
stormBtn.addEventListener('click', storm);
let mX, mY;

//mouseX = -50;
//mouseY = -50;
//storm po kliknięciu
/* btnClicked = false;
stormBtn.addEventListener('click',function(){
    btnClicked = true;
}) */
//wybranie losowej liczby z zakresu
function random(min, max) {
    return min + Math.random() * (max - min + 1);
};



function snowFlake() {
    for(var i = 0; i < maxFlakes; i++){
        flakesArr.push({
            x: Math.random() * w,  
            y: -50,
            r:random(0.5, 6),  
            opacity: Math.random(),  
            speedX: random(-7, 2), 
            speedY: random(1, 3),    
            
        })
        
    }

};

function drawSnowFlakes(){
    for(var i = 0; i < flakesArr.length; i++){    
        
            ctx.beginPath(); 
            ctx.arc(
            flakesArr[i].x,  
            flakesArr[i].y,  
            flakesArr[i].r,  
            0,                         
            Math.PI*2,                 
            false                     
            );

        ctx.fillStyle = "rgba(255,255,255," + flakesArr[i].opacity + ")";
        ctx.fill();                 
    }
};

function anime(){
    for (var i = 0; i < flakesArr.length; i++) {
        
        flakesArr[i].x += flakesArr[i].speedX;     
        flakesArr[i].y += flakesArr[i].speedY;     

        if (flakesArr[i].y > h) {                                                                               
            flakesArr[i].x = Math.random() * w * 1.5;
            flakesArr[i].y = -50;
        }

        
    
}
}

function storm() {
    for (var i = 0; i < flakesArr.length; i++){
        maxFlakes = 2000;
        flakesArr[i].speedX = random(-3, 15);
        flakesArr[i].speedY = random(3, 9);
        flakesArr[i].r = random(4, 9);
    }
    }
function onMouseMove(ev){
 mX = ev.clientX;
 mY = ev.clientY;
 flakesArr.forEach(el => {
    dist = (el.x - mX)*(el.x - mX)+(el.y - mY)*(el.y - mY)
     let distFlakeMouse = Math.sqrt(dist);
    if( dist < 1200 ){
        el.x = Math.random() * w;
        el.y = -10; 
     }
});
}
function updateSnowFall  () {
    ctx.clearRect(0, 0, w, h);
    drawSnowFlakes();
    anime();
};

/* canvas.addEventListener("mousemove", function(e) {
    minusX = e.clientX,
    minusY = e.clientY
}); */
function clientResize(ev){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};
window.addEventListener("resize", clientResize);
window.requestAnimationFrame(anime);
//setInterval(updateSnowFall,33);
snowFlake();
setInterval(updateSnowFall,33);
/* canvas.addEventListener("mousemove", function(e){
if(particlesArray[i].x && particlesArray[i].y == e.clientX && e.clientY){
    particlesArray[i].x += 200;
    particlesArray[i].y += 200;
} 
});*/
/* particlesArray[i].x = flakeX
particlesArray[i].y = flakeY;
minDistance = 150;
mouseX = 0;
mouseY = 0;
dMouseFlake = 0;
document.addEventListener("mousemove", runFromMouse)
var runFromMouse = function (ev) {
//położenie kursora    
mouseX = ev.clientX;
mouseY = ev.clientY; 

dMouseFlake = Math.sqrt((flakeX - mouseX)*(flakeX - mouseX)+(flakeY-mouseY));
if(dMouseFlake < minDistance){
    flakeX += 150;
    flakeY += 150;
}
} */
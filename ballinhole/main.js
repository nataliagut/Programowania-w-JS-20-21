let ball= document.querySelector("#ball");
let container = document.getElementsByClassName("container")[0];
let btnStart = document.getElementById("start");
let holes = [];
let gameStart=false;
let score = 0;
let speedX = 0, speedY = 0;
let posX = 20, posY = 20;
let startTime;
let currentTime;
window.addEventListener('deviceorientation', zmianaPolozenia);
/* function counter(startTime){
    deltaT = new Date(1000) - startTime;
    console.log( deltaT );
    console.log(startTime);
}
setInterval(() => {
    counter(startTime);
  }, 1000); */

function start(){  
    /* startTime = new Date(1000);
    counter(startTime);
    console.log(startTime);  */
    window.requestAnimationFrame(moveBall);
    putHole();
    moveBall();
    btnStart.hidden=true;
    timer = document.createElement('span');
    timer.classList.add("timer");
    timer.innerHTML = "Time: ";
    container.appendChild(timer);
}
btnStart.addEventListener('click', start);

function zmianaPolozenia(e){
    speedX=e.gamma/30
    speedY=e.beta/30
}
//rozmiar kulki 50px
function moveBall(){
    if(Math.sign(posX+speedX) < window.innerWidth -50){ 
        posX+=speedX;
        ball.style.left=posX+'px';        
    }
    if(Math.sign(posY+speedY) < window.innerHeight -50){
        posY+=speedY;
        ball.style.top=posY+'px';        
    }

    if(Math.sign(posX+speedX) < window.innerWidth -50){
        posX+=speedX;
        ball.style.left=posX+'px';        
    }
    if(Math.sign(posY+speedY) < window.innerHeight -50){
        posY+=speedY;
        ball.style.top=posY+'px';        
    }
    
} 
 

function putHole(){
    //for(i=0; i < 5; i++){}
        let hole = document.createElement('div');
        hole.classList.add("hole");
        hole.style.left= Math.random() * window.innerWidth + 'px';
        hole.style.top= Math.random() * window.innerHeight +'px';
        holes.push(hole);
        container.appendChild(hole);
    }
    


//
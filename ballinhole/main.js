

//gamma od 0 do 90 w prawo
//gamma od -90 do 0 w lewo
//beta od 90(standard) do 0 w górę
//beta od 90 do 180 w dół

let hole;
let timer;
let ball= document.querySelector("#ball");
let container = document.getElementsByClassName("container")[0];
let instruction = document.getElementById("instructionForm");
let btnStart = document.getElementById("start");
let score = 0;
let speedX = 0, speedY = 0;
let posX = 20, posY = 20;
let h = 0; 
let m = 0;
let s = -2;
//window.addEventListener('deviceorientation', zmianaPolozenia);
window.addEventListener('deviceorientation', horizontalPosition);
window.addEventListener('deviceorientation', verticalPosition);

//mierzenie czasu
function counter(){
    s++
    if (s == 60){
        s = 0;
        m++;
    }
    if (m == 60){
        m = 0;
        h++;
    }
    displayTime();
}
 function displayTime(){
     let time;
     if(s < 10 ){
        displayS = "0" + s;
     }
     else displayS = s;
     if(m < 10){
         displayM = "0" + m;
     }
     else displayM = m;
     if(h < 10){
         displayH = "0" + h;
     }
     else displayH = h;
     time = displayH + ":" + displayM + ":" + displayS;
     timer.innerHTML = "Time: " + time;
 }
setInterval(() => {
    counter();
  }, 1000);

//start gry
function start(){  
    //window.requestAnimationFrame(moveBall);
    putHole();
    instruction.style.visibility = "hidden";
    timer = document.createElement('span');
    timer.classList.add("timer");
    container.appendChild(timer);
    counter();

    scoreCounter = document.createElement('span');
    scoreCounter.classList.add("scoreCounter");
    container.appendChild(scoreCounter);
    //wypisanie punktów
    setInterval(() => {
        scoreCounter.innerHTML = " Scores: " + score + "/10";
    }, 1000);
    
}
btnStart.addEventListener('click', start);

// function zmianaPolozenia(){
//     // moveBall();
//     verticalPosition();
//     horizontalPosition();
//     moveBall();
// }
function verticalPosition(e){
//w górę
if(e.beta > 0 && e.beta <= 45){
    speedY = Math.abs(e.gamma/35);
}
if(e.beta > 45 && e.beta <= 90){
    speedY = Math.abs(e.gamma/30);
}
//w dół
if(e.beta > 0 && e.beta <= 45){
    speedY = Math.abs(e.gamma/35);
}
if(e.beta > 45 && e.beta <= 90){
    speedY= Math.abs(e.gamma/30);
}
moveBall();
}

function horizontalPosition(){
    //prawo
    if(e.gamma > 0 && e.gamma <= 45){
        speedX = Math.abs(e.beta/35);
    }
    if(e.gamma > 45 && e.gamma <= 90){
        speedX = Math.abs(e.beta/30);
    }
    //lewo
    if(e.gamma > -90 && e.gamma <= -45){
        speedX = Math.abs(e.beta/35);
    }
    if(e.gamma > -45 && e.gamma <= 0){
        speedX = Math.abs(e.beta/30);
    }
    moveBall();
}
//rozmiar kulki 50px
function moveBall(){
    if((posX+speedX) < (window.innerWidth -50)){ 
        posX+=speedX;
        ball.style.left=posX+'px';        
    }
    if((posY+speedY) < (window.innerHeight -50)){
        posY+=speedY;
        ball.style.top=posY+'px';   
    }
    
} 
 

function putHole(){
    //for(i=0; i < 5; i++){}
        hole = document.createElement('div');
        hole.classList.add("hole");
        hole.style.left= Math.random() * container.clientWidth + 'px';
        hole.style.top= Math.random() * window.innerHeight +'px';
        container.appendChild(hole);
    }
    //sprawdzenie czy kulka trafiła do dziury
    // function checkCollision(){
        //pobrać współrzędne środka dziury?
    //     if(odległość miedzy środkiem dziury, a środkiem kuli - promień dziury <= promień dziury){
    //     collisionDone();
    //     }
    // }
    function collisionDone(){
    score++; //dodanie punktu
    if(score == 10){
         window.alert(`Koniec gry! Twój czas to: ${time}`)
    }
    else {
    container.removeChild(hole);
    putHole();
    }
    }


// setInterval(checkCollision, 1000);


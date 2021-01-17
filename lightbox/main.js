// pobranie referencji
const imgSrcs = [];
const gallery = document.querySelectorAll('.gallery img');
const galleryCount = gallery.length;
let currentImg = document.getElementById("current");
let currentIdx;
// zapisanie się na zdarzenie click
for (let idx = 0; idx < gallery.length; idx++) {
    const img = gallery[idx];
    img.addEventListener('click', showLightbox);
    imgSrcs.push(img.src);
}
console.log(imgSrcs)
//wyświetlane zdjęcie
const nextArrow = document.querySelector('.nextArrow');
const prevArrow = document.querySelector('.prevArrow');
//przesunięcie po kliknięciu
nextArrow.addEventListener('click', function () {
    currentIdx++;
    changeImg(currentIdx);
    checkArrow(currentIdx);
});
prevArrow.addEventListener('click', function () {
    currentIdx--;
    changeImg(currentIdx);
    checkArrow(currentIdx);
});



function showLightbox(ev) {
    currentIdx = imgSrcs.indexOf(ev.target.src);
    checkArrow(currentIdx);
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.add('visible');
    currentImg.src = imgSrcs[currentIdx];
    //funkcja znajdująca zdjecie po zmianie
    //changeImg(ev.target);
    countingPhotos(currentIdx);
}
function changeImg(index) {
    currentImg.src = imgSrcs[index];
    countingPhotos(currentIdx);
}

function checkArrow(index) {
    if (index == 0) {
        prevArrow.style.display = "none";
        return;
    }
    if (index == imgSrcs.length - 1) {
        nextArrow.style.display = "none";
        return;
    }
    prevArrow.style.display = "block";
    nextArrow.style.display = "block";
}
const mainLightbox = document.querySelector('.lightbox');
mainLightbox.addEventListener('click', hideLightbox);
function hideLightbox(event){
    console.log(event.target);
    if(event.target.id != 'prev' && event.target.id != 'current' && event.target.id != 'next')
        mainLightbox.classList.toggle('visible');
}

function countingPhotos(currentIdx){
    let counterDiv = document.querySelector('#counter');
    const counterText = document.querySelector('p');
    let text = (currentIdx + 1) + ' z ' + (imgSrcs.length);
    
    counterText.innerHTML = text;
    counterText.setAttribute('style','position: absolute; bottom: 5vh; font-size: medium; color: white;');
    counterDiv.appendChild(counterText);
}
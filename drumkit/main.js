document.body.addEventListener('keypress', onKeyPress);
document.querySelector('#recordBtn').addEventListener('click', onRecordBtn);
document.querySelector('#playBtn').addEventListener('click', onPlayBtn);

let recordedSound = [];
let recordStartTime;
function onKeyPress(ev) {
    let soundId;
    switch (ev.code) {
        case 'KeyA':
            soundId = 'boom';
            break;
        case 'KeyS':
            soundId = 'clap';
            break;
        case 'KeyD':
            soundId = 'hihat';
            break;
        case 'KeyF':
            soundId = 'kick';
            break;
        case 'KeyQ':
            soundId = 'openhat';
            break;
        case 'KeyW':
            soundId = 'ride';
            break;
        case 'KeyE':
            soundId = 'snare';
            break;
        case 'KeyZ':
            soundId = 'tink';
            break;
        case 'KeyX':
            soundId = 'tom';
            break;
    }
    if (soundId) {
        const soundTime = Date.now() - recordStartTime;
        const soundObj = {
            soundId: soundId, 
            time: soundTime
        };
        playSound(soundId);
        recordedSound.push(soundObj);
    }
}

function onRecordBtn() {
    recordStartTime = Date.now();
}
function onPlayBtn() {
    for (let index = 0; index < recordedSound.length; index++) {
        const soundObj = recordedSound[index];
        setTimeout(()=> {
            playSound(soundObj.soundId);
        },
        soundObj.time
        );

    }   
}

function playSound(soundId) {
    const sound = document.querySelector('#' + soundId);
    sound.play();
}

//NodeList zdjęć klawiszy
var images = document.getElementsByClassName('keyboardImg');
let image;
let imgId;
for (var i = 0; i < images.length; i++) {
    image = images[i];
    imgId = image.id;
    console.log(imgId);
    images.item(i).addEventListener('click', checkSound);
}
//odtwórz dźwięk odpowiadający danemu klawiszowi(img)
function checkSound(ev) {
    console.log(ev.target.id);
    imgId = ev.target.id;
    switch (ev.target.id) {
        case 'imgA':
            soundToPlay = 'boom';
            break;
        case 'imgS':
            soundToPlay = 'clap';
            break;
        case 'imgD':
            soundToPlay = 'hihat';
            break;
        case 'imgF':
            soundToPlay = 'kick';
            break; 
        case 'imgQ':
            soundToPlay = 'openhat';
            break;
        case 'imgW':
            soundToPlay = 'ride';
            break;
        case 'imgE':
            soundToPlay = 'snare';
            break;
        case 'imgZ':
            soundToPlay = 'tink';
            break;
        case 'imgX':
            soundToPlay = 'tom';
            break;
    }
    playSound(soundToPlay);
} 

    

 
 
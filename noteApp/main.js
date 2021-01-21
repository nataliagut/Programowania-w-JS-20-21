const notesKey = 'notes';
let notes = [];
let btnAdd = document.querySelector('#noteAdd');
let noteForm = document.getElementById("noteForm");
let noteAddBtn = document.getElementById("noteAdd");
//pokazanie formularza po kliknięciu w button, ukrycie po zatwierdzeniu notatki

window.onload = loadStorageNotes()

function showNoteForm() {
    
    noteForm.style.visibility = "visible";
    noteAddBtn.style.display = "none";
    //czyszczenie inputów
    document.querySelector('#noteTitle').value = "";
    document.querySelector('#noteContent').value = "";
    document.querySelector('#noteColor').value = 'default';
    document.querySelector('#isPinned').checked = false;

}
noteAddBtn.addEventListener('click', showNoteForm);
function hideNoteForm() {
    noteForm.style.visibility = "hidden";
    noteAddBtn.style.display = "block";

}

// add note btn listener

document.getElementById("btnOK").addEventListener('click', function () {
    const title = document.querySelector('#noteTitle').value;
    const isPinned = document.querySelector('#isPinned').checked;
    let color = document.querySelector('#noteColor').value;
    const colorNote = document.querySelector('#noteColor').value;
    const content = document.querySelector('#noteContent').value;
    const reminderDate = new Date(document.querySelector("#reminderDate").value);
    const createDate = new Date();
    color = color.replace("#", "");
    addNote(title, isPinned, color, content, createDate, reminderDate, notes.length);
})


function loadStorageNotes() {
    const notesFromLocalStorage = JSON.parse(localStorage.getItem(notesKey));

    if (notesFromLocalStorage != null) {
        notesFromLocalStorage.forEach((note) => {
            addNote(note.title, note.isPinned, note.color, note.content, note.createDate, note.reminderDate, note.index)
        })
    }
}

//usuwanie notatki
function removeNote(id) {
    let removeIndex = 0
    notes.forEach((note, index) => {
        if (note.id == id) {
            removeIndex = index;
        }
    })
    notes.splice(removeIndex, 1)
    localStorage.setItem(notesKey, JSON.stringify(notes));

}

// dodawanie notatki
function addNote(title, isPinned, color, content, createDate, reminderDate, index) {

    //tworzenie html za pomocą js
    const htmlDiv = document.createElement('div');
    const htmlTitle = document.createElement('h1');
    const htmlContent = document.createElement('p');
    const htmlDate = document.createElement('p');
    htmlDiv.id = `note${index}`;
    
    const removeIcon = document.createElement('img');
    
    htmlDiv.classList.add('note');
    htmlDiv.style.backgroundColor = `#${color}`;

    hideNoteForm();
    // kolor tła dziesiętnie
    let decimalBackgroundColor = parseInt(color, 16);
    if (decimalBackgroundColor < 5723991) {
        htmlDiv.style.color = "white";
    }
    else htmlDiv.style.color = "black";
    // remove icon
    if (decimalBackgroundColor < 5723991) {
        removeIcon.src = 'xwhite.png';
    }
    else removeIcon.src = 'xblack.png';
    
    
    htmlTitle.innerHTML = title;
    htmlContent.innerHTML = content;
    htmlDate.innerHTML = createDate.toLocaleString();

    htmlDiv.appendChild(removeIcon);
    htmlDiv.appendChild(htmlTitle);
    htmlDiv.appendChild(htmlContent);
    htmlDiv.appendChild(htmlDate);

    const main = document.querySelector('main');
    if (isPinned) main.prepend(htmlDiv);
    else main.appendChild(htmlDiv);

    let id = Math.random().toString() + Math.random().toString()

    const note = {
        id: id,
        title: title,
        content: content,
        isPinned: isPinned,
        color: color,
        reminderDate: reminderDate.toLocaleString(),
        createDate: createDate.toLocaleString()
    }

    removeIcon.onclick = function () {
        removeNote(id);
        main.innerHTML = "";
        notes = [];
        loadStorageNotes();
    }

    notes.push(note);
    localStorage.setItem(notesKey, JSON.stringify(notes));
}

let notifies = [];

//notifications

/* function checkForNotifications(note) {
    const timestamp = new Date().getTime() //aktualny czas
    const reminderD = note.createDate.getTime()
    var timeLeft = reminderD - timestamp

    notifies = notes.filter(note => Math.abs(timeLeft) < 3600000 );
    console.log(notifies);
    if (notifies.length > 0) {
        alert('hello');
    }
}
notes.forEach(note => {
setInterval(() => {
    checkForNotifications(note);
}, 1000); }); */
function hideNotify(){
    notifyForm = document.querySelector('.notification');
    notifyForm.style.display = 'none';
}
function checkForNotifications(){
    let actualDate = new Date().toLocaleString();
    notes.forEach(note => {
    notifies = notes.filter(note => note.reminderDate === actualDate);
    if (notifies.length > 0) {
        for(let i of notifies){
        //show notify
        notifyForm = document.querySelector('.notification');
        notifyText = document.querySelector('.textNotify');
        notifyForm.style.display = 'block';
        notifyText.innerText = `Przypomnienie dla notatki ${i.title}`;
        notifies.splice(0);
        setTimeout(() => {
            hideNotify();
        }, 3000);
       // notifies.splice(i.index,1);
        break;
        }
    }
    });
}
setInterval(() => {
    checkForNotifications(notes);
}, 1000);

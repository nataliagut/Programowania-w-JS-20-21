//pokazanie formularza po kliknięciu w button
function showNoteForm() {
    var noteForm = document.getElementById("noteForm");
    noteForm.style.visibility = "visible";

}
let notes = [];

/* const note = {
    title: '',
    content: '',
    /* color: '#ff0000',
    pinned: false, 
    createDate: new Date(),
}; */

function createNewNote() {

    const title = document.querySelector('#noteTitle').value;
    const isPinned = document.querySelector('#isPinned').checked;
    let color = document.querySelector('#noteColor').value;


    const content = document.querySelector('#noteContent').value;
    const date = new Date();

    //console.log(title, content);
    //tworzenie html za pomocą js
    const htmlDiv = document.createElement('div');
    const htmlTitle = document.createElement('h1');
    const htmlContent = document.createElement('p');
    const htmlDate = document.createElement('p');
    // htmlDiv.setAttribute("style", "width:250px; height: 250px; padding: 25px;  box-shadow:0px 10px 24px 0px rgba(0,0,0,0.75); background-color: red; margin-top: 10px; margin-right: 10px; float: left;");
    // htmlContent.setAttribute("style", "font-size: 26px;");
    // htmlDate.setAttribute("style", "font-size: 10px; float: right; position: relative; bottom: 0; right: 0;")
    // htmlTitle.setAttribute("style", "text-align: center; width: 250px;, height: 250px;")
    htmlDiv.classList.add('note');
    htmlDiv.style.backgroundColor = color;
    color = color.replace("#", "");

    // kolor tła dziesiętnie
    let decimalBackgroundColor = parseInt(color, 16);
    if (decimalBackgroundColor < 5723991) {
        htmlDiv.style.color = "white";
    }
    else htmlDiv.style.color = "black";

    htmlTitle.innerHTML = title;
    htmlContent.innerHTML = content;
    htmlDate.innerHTML = new Date().toLocaleString();

    htmlDiv.appendChild(htmlTitle);
    htmlDiv.appendChild(htmlContent);
    htmlDiv.appendChild(htmlDate);

    const main = document.querySelector('main');
    if (isPinned) main.prepend(htmlDiv);
    else main.appendChild(htmlDiv);
    //notes.push(note)
    noteToList(title, content, date);
}
function noteToList(title, content, createDate) {
    const note = {
        title: title,
        content: content,
        //pinned: isPinned,
        createDate: createDate,

    }
    notes.push(note);
}
/* function addNote(){
    createNewNote(note);
notes.push(note);
console.log(notes);
} */

/* for (const note of notes) {
    const htmlSection = document.createElement('section');
    const htmlTitle = document.createElement('h1');
    const htmlContent = document.createElement('p');
    const htmlDate = document.createElement('h4');

    htmlSection.classList.add('note');
    htmlTitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlDate.innerHTML = note.createDate.toLocaleString();

    htmlSection.appendChild(htmlTitle);
    htmlSection.appendChild(htmlContent);
    htmlSection.appendChild(htmlDate);

    const main = document.querySelector('main');
    main.appendChild(htmlSection);
} */



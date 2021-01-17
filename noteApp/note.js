//example of refactoring
class Note {
    constructor(title, content, /* color = 'yellow', pinned = false */) {        
        this.title  = title;
        this.content = content;
        //this.color = color;
        //this.pinned = pinned;
        this.createDate = new Date();
        this.reminderDate = new Date(Date.now() + 1000*60*10 );
        
        this.id = Date.now();
    }    
}
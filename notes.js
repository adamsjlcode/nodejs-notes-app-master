const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const dupNote = notes.find((note) => note.title === title);
    if (!dupNote){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'))
    }else{
        console.log(chalk.red.inverse('Note title taken'))
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title);
    if (newNotes.length !== notes.length){
        console.log(chalk.green.inverse('Removed: ' + title))
    }else{
      console.log(chalk.red.inverse('Title did ot match any notes'))
    }

    saveNotes(newNotes)
};

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length > 0){
        console.log(chalk.inverse('Your Notes'));
        notes.forEach((note) => {
            console.log(note.title)
        })
    }else{
        console.log(chalk.red.inverse('There are no notes'))
    }
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse('No Note matches title'))
    }
};

const saveNotes = (notes) => {
    const dataJSONString = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSONString);
};

const loadNotes = () => {
    try {
        const notesDataBuffer = fs.readFileSync('notes.json');
        const dataJSON = notesDataBuffer.toString();
        return JSON.parse(dataJSON)
    }catch (e) {
        console.log(chalk.red('Error'+ e));
        return []
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};
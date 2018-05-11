const fs = require("fs");

//Fetch-Save notes
const fetchNotes =()=>{
  try{
    let noteString = fs.readFileSync("notes-data.json");
    return JSON.parse(noteString);
  } catch(e){
    return []
  }
}

const saveNotes =(notes)=>{
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}


// ACTIONS

//Add note
const addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  };
  let duplicateNotes = notes.filter((note)=>{
    return note.title===title
  })
  if(duplicateNotes.length===0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

//Get All notes
const getAll = () => {
  return fetchNotes();
};

//Get Note
const getNote = (title) => {
  let notes = fetchNotes();
  let filteredNotes = notes.filter((note)=>{
    return note.title === title
  });

  return filteredNotes[0];
};

//Remove Note
const removeNote = (title) => {
  let notes = fetchNotes();
  let filteredNotes = notes.filter((note)=>{
    return note.title !== title
  });

  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

const logNote = (note)=>{
  debugger;
  console.log("---");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`)
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote,
  getAll
};



const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleArg = {
  describe:"Title of note",
  demand: true,
  alias: "t"
};

const bodyArg = {
  describe:"Body of note",
  demand: true,
  alias: "b"
}

const argv = yargs
.command("add","Add a new note!",{
  title: titleArg,
  body: bodyArg
})
.command("list","List all notes")
.command("read", "Read a note",{
  title: titleArg
})
.command("remove","Removing a note",{
  title: titleArg
})
.help()
.argv;
var command = argv._[0];


//add
if (command === 'add') {
  let note = notes.addNote(argv.title, argv.body);

  if(note){
    console.log("Note creating");
    notes.logNote(note)
  }
  else{
    console.log("Note title taken!")
  }

//list
} else if (command === 'list') {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => {
  notes.logNote(note)
  });

//read
} else if (command === 'read') {
  let note = notes.getNote(argv.title);
  if(note){
    console.log("Note found");
    notes.logNote(note);
  }else{
    console.log("Note not found!")
  }

//remove  
} else if (command === 'remove') {
  let noteRemoved = notes.removeNote(argv.title);
  let message = noteRemoved ? "Note was removed" : "Note note found!";
  console.log(message);

} else {
  console.log('Command not recognized');
}

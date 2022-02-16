import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import CreateArea from "./components/CreateArea/CreateArea";
import Note from "./components/Note";
import Footer from "./components/Footer";
import { BACKEND_URL } from "./constants/APIrequestUrl";
import { CreateAreaContext } from "./CreateAreaContext";

const initialState = {
  Title: "", 
  Content: ""
}

const App = () => {
  
  /* STATES */

  // Initialize the states
  const [notes, setNotes] = useState([]); // Storing the notes in an array and setting acc. to changes
  const [createArea, setCreateArea] = useState(initialState);
  const [isExpanded, setExpanded] = useState(false);
  const [editOrCreate, setEditOrCreate] = useState("create");
  const [editNoteId, setEditNoteId] = useState(""); // Passing the id of the note on which Edit button is clicked

  /* EVENT HANDLERS */

  // Fetch all notes from MongoDB
  useEffect( () => {
    async function fetchNotes() {
      const response = await axios.get(BACKEND_URL);
      setNotes(response.data);
    }
    fetchNotes();
  }, [notes]);

  // Display new note after creation
  const addNote = (note) => {
      setNotes(prevNotes => {
        return [...prevNotes, note];
      });
  }

  // Delete the note
  const removeNote = (id) => {
    const url = new URL("delete/", BACKEND_URL)
    axios
      .delete(url + id)
      .then((res) => console.log(res.data));
    
      setNotes(prevNotes => {
      return prevNotes.filter(noteItem => noteItem._id !== id)
    });
  }

  // Edit notes
  const editNote = (id) => {
    const editItem = notes.find((currentNote) => {
      return currentNote._id === id;
    })
    
    setCreateArea({
      Title: editItem.Title,
      Content: editItem.Content
    });
    setExpanded(true);
    setEditOrCreate("edit");
    setEditNoteId(id);
  }
  
  // Render all notes from the DB
  const NotesList = () => {
    return notes.map((currentNote) => {
      return (
        <CreateAreaContext.Provider value={{ notes, createArea, setCreateArea, isExpanded, setExpanded, editOrCreate, setEditOrCreate, setEditNoteId }}>
          <Note
            key={currentNote._id}
            id={currentNote._id}
            onDelete={removeNote}
            Title={currentNote.Title}
            Content={currentNote.Content}
            onEdit={editNote}
          />
        </CreateAreaContext.Provider>
      );
    });
  }

  /* COMPONENT */
  return (
    <>
      <Header />
      <CreateAreaContext.Provider value={{ createArea, setCreateArea, isExpanded, setExpanded, editOrCreate, setEditOrCreate }}>
        <CreateArea onAdd={addNote} id={editNoteId} />
        <div className="content">{NotesList()}</div>
      </CreateAreaContext.Provider>
      {<Footer />}
    </>
  );
}

export default App;

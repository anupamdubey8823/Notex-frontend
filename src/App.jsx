import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
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
  }, []);

  // Display new note after creation
  const addNote = (note) => {
      setNotes(prevNotes => {
        return [...prevNotes, note];
      });
  }
  
  // Render all notes from the DB
  const NotesList = () => {
    return notes.map((currentNote) => {
      return (
          <Note
            key={currentNote._id}
            id={currentNote._id}
            Title={currentNote.Title}
            Content={currentNote.Content}
          />
      );
    });
  }

  /* COMPONENT */
  return (
    <>
      <Header />
      <CreateAreaContext.Provider value={{ notes, setNotes, createArea, setCreateArea, isExpanded, setExpanded, editOrCreate, setEditOrCreate, setEditNoteId }}>
        <CreateArea onAdd={addNote} id={editNoteId} />
        <div className="content">{NotesList()}</div>
      </CreateAreaContext.Provider>
      {<Footer />}
    </>
  );
}

export default App;

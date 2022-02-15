import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import CreateArea from "./components/CreateArea/CreateArea";
import Note from "./components/Note";
import Footer from "./components/Footer";
import EditArea from "./components/EditArea";
import { BACKEND_URL } from "./constants/APIrequestUrl";


const App = () => {
  
  /* STATES */

  // Initialize the states
  const [notes, setNotes] = useState([]); // Storing the notes in an array and setting acc. to changes
  const [editInfo, setEditInfo] = useState({
    Title: "",
    Content: "",
  }); // Handling changes in the Edit Area
  const [editNoteId, setEditNoteId] = useState(""); // Passing the id of the note on which Edit button is clicked
  const [showEditArea, setEditArea] = useState(false); // Toggle the Edit Area

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
    
    setEditArea(true);
    setEditInfo({
      Title: editItem.Title,
      Content: editItem.Content
    });
    setEditNoteId(id);
  }

  // Render all notes from the DB
  const NotesList = () => {
    return notes.map((currentNote) => {
      return (
        <Note
          key={currentNote._id}
          id={currentNote._id}
          onDelete={removeNote}
          Title={currentNote.Title}
          Content={currentNote.Content}
          onEdit={editNote}
        />
      );
    });
  }

  /* COMPONENT */
  return (
    <>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="content">{NotesList()}</div>
      {showEditArea && <EditArea id={editNoteId} Title={editInfo.Title} Content={editInfo.Content} />}
      {<Footer />}
    </>
  );
}

export default App;

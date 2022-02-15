import React, { useState } from "react";
import "./CreateArea.css";
import AddIcon from "@material-ui/icons/Add";
import { Fab, Zoom } from "@material-ui/core";
import axios from "axios";
import { BACKEND_URL } from "../../constants/APIrequestUrl";


const CreateArea = (props) => {
  
  /* STATES */
  
  const [isExpanded, setExpanded] = useState(false); // Toggle the size of the Create Area if it is clicked on

  const [createArea, setCreateArea] = useState({
    Title: "",
    Content: "",
  }); // Handling changes in the Create Area

  /* EVENT HANDLERS */

  const handleChange = event => {
    const { name, value } = event.target;
    setCreateArea((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const submitNote = event => {
    event.preventDefault();
    if (createArea.Title !== "" && createArea.Content === "") {
      window.alert("Add Content to the note");
    }
    else if (createArea.Title === "" && createArea.Content !== "") {
      window.alert("Add Title to the note");
    }
    else if (createArea.Title === "" && createArea.Content === "") {
      window.alert("Cannot add empty note!");
    } 

    else {
      props.onAdd(createArea);
      setCreateArea({
        Title: "",
        Content: "",
      });
      const url = new URL("add", BACKEND_URL)
      
      axios
        .post(url, createArea)
        .then((res) => console.log(res.data));
    }
  }

  const expand = () => setExpanded(true);

  /* COMPONENT */
  return (
    <div className="createnote">
      <form id="createarea-form">
        {isExpanded ? (
          <h1>
            <input
              onChange={handleChange}
              name="Title"
              placeholder="Title"
              value={createArea.Title}
            />
          </h1>
        ) : null}

        <textarea
          onClick={expand}
          onChange={handleChange}
          name="Content"
          placeholder="Write a note..."
          value={createArea.Content}
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded ? true : false}>
          <Fab onClick={submitNote} aria-label="Add a note">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

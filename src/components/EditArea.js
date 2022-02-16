import React, { useState } from "react";
import axios from "axios";
import SendIcon from "@material-ui/icons/Send";
import "./EditArea.css";
import styled from "styled-components"
import { BACKEND_URL } from "../constants/APIrequestUrl";

const EditArea = ({id, Title, Content}) =>  {
    
    /* STATES */

    // State for the Edit Area which initially has the same content as the note which is chosen to edit
    const [edit, setEdit] = useState({
        Title: Title,
        Content: Content
    })

    /* EVENT HANDLERS */

    // Event handler for editing the contents of the Edit Area
    const handleChange = event => {
        const {name, value} = event.target;
        setEdit( (prevNote) => {
            return {
                ...prevNote,
                [name]: value,
            };
        })
    }
    // Event handler for the submitting the edited note
    const handleClick = event => {
        event.preventDefault();
        const url = new URL("update/" + id, BACKEND_URL)
        axios 
            .post(url, edit)
            .then(res => console.log(res.data))
       
        setTimeout( () => {
            window.location.reload()
        }, 320);
    }

    /* COMPONENT */
    return (
        <>
            <form id="EditArea" className="edit-form">  
                <h1>
                    <input 
                        name="Title" 
                        placeholder="Title"
                        value={edit.Title} 
                        onChange={handleChange}
                    />
                </h1>

                <textarea 
                    name="Content"
                    placeholder="Content"
                    value={edit.Content}
                    rows={3}
                    onChange={handleChange}
                />

                <SendIconDiv>
                    <button onClick={handleClick} aria-label="Update Note">
                        <SendIcon />
                    </button>
                </SendIconDiv>
            </form>
        </>
    )
}

/*
STYLED COMPONENTS
*/

const SendIconDiv = styled.div`
    display: flex;
    justify-content: flex-end;

    button {
        color: #f5ba13;
        border: none;
        cursor: pointer;
        outline: none;
    }
`;

export default EditArea;
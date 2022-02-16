import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styled from "styled-components";
import { CreateAreaContext } from '../CreateAreaContext';

const Note = (props) => {

    const {
        notes,
        setCreateArea,
        setExpanded,
        setEditOrCreate,
        setEditNoteId
    } = useContext(CreateAreaContext);
    
    /* EVENT HANDLERS */

    // Here, another id is passed to the Note component because 'key' cannot be passed in a component.
    const handleDelete = () => {
        props.onDelete(props.id);
    }
    const handleEdit = () => {
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
        editNote(props.id);
    }

    /* COMPONENT */
    return (
        <NoteContainer>
            <Card>
                <h1>{props.Title}</h1>
                <p>{props.Content}</p>
                <ButtonDiv>
                    <button onClick={handleEdit} aria-label="Edit Note">
                        <EditIcon />
                    </button>
                    <button onClick={handleDelete} aria-label="Delete Note">
                        <DeleteIcon />
                    </button>
                </ButtonDiv>
            </Card>
        </NoteContainer>
    );
};

/*
STYLED COMPONENTS
*/

// .note{}
const NoteContainer = styled.div`
    display: inline-flex;
    padding: 10px;
    margin: 16px;
`;

// card{}
const Card = styled.div`
    background: #fff;
    border-radius: 7px;
    box-shadow: 0 2px 5px #ccc;
    padding: 1.5% 4.5%;
    text-align: left;
    width: 240px;
    height: auto;
    overflow-wrap: break-word;
    
    // .card h1{}
    h1 {
        font-size: 1.1em;
        margin: 8px 0 5px 0;
    }

    // .card p{}
    p {
        font-size: 1.1em;
        margin-top: 6px;
    }
`;

// .button{}
const ButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;

    // .button button{}
    button {
        background-color: #fff;
        outline: none;
        border: none;
        color: #f5ba13;
        padding-right: 0%;
        cursor: pointer;
    }
`;

export default Note;
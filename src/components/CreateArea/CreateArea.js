import React, { useContext, useEffect } from "react";
import "./CreateArea.css";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { Fab, Zoom } from "@material-ui/core";
import axios from "axios";
import { BACKEND_URL } from "../../constants/APIrequestUrl";
import { CreateAreaContext } from "../../CreateAreaContext";

const CreateArea = ({ onAdd, id }) => {
    /* STATES */

    // Toggle the size of the Create Area if it is clicked on
    const {
        createArea,
        setCreateArea,
        isExpanded,
        setExpanded,
        editOrCreate,
    } = useContext(CreateAreaContext);

    /* EVENT HANDLERS */

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCreateArea((prevNote) => {
            return {
                ...prevNote,
                [name]: value,
            };
        });
    };

    const submitNote = (event) => {
        event.preventDefault();

        if (createArea.Title === "" && createArea.Content === "") {
            window.alert("Cannot add empty note!");
        } else {
            onAdd(createArea);
            setCreateArea({
                Title: "",
                Content: "",
            });
            setExpanded(false);
            const url = new URL("add", BACKEND_URL);

            axios.post(url, createArea).then((res) => console.log(res.data));
        }
    };

    const submitEditedNote = (event) => {
        event.preventDefault();
        const url = new URL("update/" + id, BACKEND_URL);
        setCreateArea({
            Title: "",
            Content: "",
        });
        setExpanded(false);

        axios.post(url, createArea).then((res) => console.log(res.data));
    };

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
                    onClick={() => setExpanded(true)}
                    onChange={handleChange}
                    name="Content"
                    placeholder="Write a note..."
                    value={createArea.Content}
                    rows={isExpanded ? 3 : 1}
                />
                <Zoom in={isExpanded ? true : false}>
                    <Fab onClick={editOrCreate === "create" ? submitNote : submitEditedNote} aria-label="Add a note" >
                        {editOrCreate === "create" ? <AddIcon /> : <EditIcon />}
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
};

export default CreateArea;

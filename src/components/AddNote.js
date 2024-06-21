// AddNote.js
import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext); // Importing NoteContext
    const {addnote} = context; // Destructuring addnote from context

    // Setting initial state of note
    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Calling addnote function from context
        addnote(note.title, note.description, note.tag);

        // Resetting note state
        setNote({
            title: "",
            description: "",
            tag: "default"
        });

        // Displaying success alert
        props.showAlert('Note Added Successfully', 'success');
    };

    // Function to handle input change
    const onChange = (e) => {
        setNote(() => ({
            ...note,
            [e.target.name]: e.target.value
        }));
    };


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card text-bg-dark border-secondary">

                        <div className="card-header border-secondary">
                            <h3>Add a New Note</h3>
                        </div>

                        <div className="card-body rounded-bottom bg-black">

                            <form onSubmit={handleSubmit} >
                                <div className="form-group mb-3">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control bg-black text-white mt-2" id="title" name='title' value={note.title} placeholder="Enter note title" onChange={onChange} minLength={3} required/>
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control bg-black text-white mt-2" id="description" name="description" value={note.description} rows="4" placeholder="Enter note description" onChange={onChange} minLength={5} required
                                    ></textarea>
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="tag">Tags</label>
                                    <input type="text" className="form-control bg-black text-white mt-2" id="tag" name="tag" value={note.tag} placeholder="Enter note tag" onChange={onChange}
                                    />
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-dark me-2">Add Note</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNote;

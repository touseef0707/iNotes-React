import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

const UpdateNote = (props) => {
    const context = useContext(NoteContext); // Importing NoteContext
    const { updatenote } = context; // Destructuring updatenote from context
    const location = useLocation(); // Importing useLocation
    const initialNote = location.state; // Getting initialNote from location.state
    const navigate = useNavigate(); // Importing useNavigate
    const {id} = useParams(); // Importing useParams

    // Setting initial state of note
    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    // Setting initial note values
    useEffect(() => {
        if (initialNote) {
            setNote({
                title: initialNote.title,
                description: initialNote.description,
                tag: initialNote.tag
            });
        }
    }, [initialNote]);

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Preventing default form submission
        updatenote(id, note); // Calling updatenote function from context
        navigate(`/note/${id}`); // Redirecting to note page

        // Displaying success alert
        props.showAlert('Note Updated Successfully', 'success');
    };

    // Function to handle cancel button
    const handleCancel = () => {
        navigate(`/note/${id}`); 
    }

    // Function to handle input change
    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container pt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card text-bg-dark border-secondary">
                        <div className="card-header border-secondary">
                            <h4>Update Note</h4>
                        </div>

                        <div className="card-body rounded-bottom bg-black">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group my-2">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control bg-black text-white mt-2" id="title" name="title" value={note.title} onChange={onChange} placeholder="Enter note title" minLength={3} required
                                    />
                                </div>

                                <div className="form-group my-2">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control bg-black text-white mt-2" id="description" name="description" rows="4" value={note.description} onChange={onChange} placeholder="Enter note description" minLength={5} required
                                    ></textarea>
                                </div>

                                <div className="form-group my-2">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" className="form-control bg-black text-white mt-2" id="tag" name="tag" value={note.tag} onChange={onChange} placeholder="Enter note tag"
                                    />
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-dark me-2" onClick={handleCancel}>Cancel</button>
                                    <button type="submit" className="btn btn-primary me-2">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateNote;

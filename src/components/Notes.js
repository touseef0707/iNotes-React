import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

const Notes = (props) => {
    const { notes, deletenote } = useContext(NoteContext); // Importing notes and deletenote from NoteContext
    const navigate = useNavigate(); // Importing useNavigate

    const [noteToDelete, setNoteToDelete] = useState(null); // State to keep track of the note to be deleted

    // Redirect to login page if not logged in
    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            navigate('/login');
        }
    }, [navigate]);

    // Function to handle update button click
    const handleUpdate = (note) => {
        navigate(`/updatenote/${note._id}`, { state: note });
    };

    // Function to handle delete button click
    const handleDelete = (note) => {
        setNoteToDelete(note);
    };

    // Function to confirm delete
    const confirmDelete = async () => {
        if (noteToDelete) {
            await deletenote(noteToDelete._id);
            props.showAlert('Note Deleted Successfully', 'success');
        }
    };

    return (
        <div className="container my-5">
            <h1 className='text-center text-white'>My Notes</h1>
            <hr />
            <div className="row d-flex align-items-start">
                {notes.length === 0 ? <h3 className='text-secondary text-center mb-5'>No Notes To Display :(</h3> : notes.map(note => (
                    <div className="col-md-4 mb-4" key={note._id}>
                        <div className="card text-bg-dark border-secondary h-100 custom-card-tile">
                            <div className="card-header border-secondary d-flex justify-content-between" onClick={() => navigate(`/note/${note._id}`)}>
                                <h4>{note.title.length > 17 ? note.title.substring(0, 17) + '...' : note.title}</h4>
                                <div className="buttons">
                                    <button className="btn btn-link p-1" onClick={(e) => { e.stopPropagation(); handleUpdate(note); }}>
                                        <i className="fa-solid fa-pen-to-square" style={{ color: "#7b7bff" }}></i>
                                    </button>
                                    <button className="btn btn-link p-1" onClick={(e) => { e.stopPropagation(); handleDelete(note); }} data-bs-toggle="modal" data-bs-target="#deleteModal">
                                        <i className="fa-solid fa-trash" style={{ color: "#df9090" }}></i>
                                    </button>
                                </div>
                            </div>

                            <div className="card-body bg-black rounded-bottom" onClick={() => navigate(`/note/${note._id}`)}>
                                <p className="card-text">
                                    {note.description.length > 40 ? note.description.substring(0, 40) + '...' : note.description}
                                </p>

                                <p className="card-text">
                                    <small className="">Tags: {note.tag}</small> 
                                    <br/>
                                    <small className="text-secondary">Created on: {new Date(note.date).toLocaleDateString()}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content text-bg-dark">
                        <div className="modal-header" data-bs-theme="dark">
                            <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this note?
                        </div>
                        <div className="modal-footer border-top-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={confirmDelete} data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notes;

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const { id } = useParams(); // Importing useParams
    const navigate = useNavigate(); // Importing useNavigate

    // Importing notes and deletenote function from NoteContext
    const { notes, deletenote } = useContext(NoteContext); 

    // Setting initial state of note
    const [note, setNote] = useState(null);

    // Function to handle update button click
    const handleUpdateClick = () => {
        navigate(`/updatenote/${note._id}`, { state: note });
    };

    // Fetching note by id
    useEffect(() => {
        const fetchNote = () => {
            const foundNote = notes.find(note => note._id === id);
            if (foundNote) {
                setNote(foundNote);
            }
        };

        fetchNote();
    }, [id, notes]);

    // Function to delete note
    const deleteNote = async () => {
        deletenote(id);
        navigate('/');
        props.showAlert('Note Deleted Successfully', 'success');
    };

    // Displaying loading message if note is not found
    if (!note) {
        return <div className='text-white'>Loading...</div>;
    }

    return (
        <div className="container pt-5">
            <div className="card bg-black text-white border-0">
                            
                <div className="card-body">

                    <div className='card-header d-flex justify-content-between'>
                        <h3 className="card-title ">{note.title}</h3>
                        <div className="">
                            <button className="btn btn-primary me-2" onClick={handleUpdateClick}>Update</button>
                            <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                        </div>
                    </div>

                    <div className="card-header d-flex justify-content-between">
                        
    
                        <p className='card-text'><small className="text-secondary">Created on: {new Date(note.date).toLocaleDateString()}</small></p>

                        <p className="card-text"><small className="text-secondary"> <strong className=''>Tags:</strong> {note.tag}</small></p>
                    
                    </div>
                    <p className="card-text">{note.description}</p>
                    

                    
                </div>
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
                            <button type="button" className="btn btn-danger" onClick={deleteNote} data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default NoteItem;

import React, {useState, useEffect} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    
    const host = 'http://localhost:5000'
    const authToken = localStorage.getItem('auth-token');
    const [notes, setNotes] = useState([]);

    // useEffect to fetch all notes
    useEffect(() => {
        try{
            // Fetch all notes
            const fetchAllNotes = async () => {

                // Make a GET request to the server to fetch all notes
                const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': authToken
                    }
                });
                
                // Parse the response body as JSON and set the notes state
                const data = await response.json();
                if (response.ok) {
                    setNotes(data.reverse());
                } else {
                    console.error('Failed to fetch notes:', data);
                }
            };
            
            // If the user is logged in, fetch all notes
            if (authToken){
                fetchAllNotes();
            }
 
        }catch(error){
            console.error('Failed to fetch notes:', error);
        }
        
    }, [host, authToken]);
    

    // Add a new note
    const addnote = async (title, description, tag) => {
        const note = {'title':title, 'description':description, 'tag':tag};

        // Make a POST request to the server to add the note
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify(note)
        });
        
        // Parse the response body as JSON and add the new note to the notes state
        const data = await response.json();
        if (response.ok){
            setNotes([data, ...notes]);
        } else {
            console.error('Failed to add note')
        }
    }

    // Delete a note
    const deletenote = async (id) =>{

        // Make a DELETE request to the server to delete the note
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken // Replace with actual auth token
            }
        });

        // If the request is successful, filter out the note with the given id from the notes state
        if (response.ok) {
            setNotes(notes.filter(note => note._id !== id));
        } else {
            console.error('Failed to delete note');
        }
    }

    // Update a note
    const updatenote = async (id, note) =>{

        // Make a PUT request to the server to update the note
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify(note)
        });

        // Parse the response body as JSON and update the notes state with the updated note
        const data = await response.json();
        if (response.ok){

            // first filter out the note that is updated
            const index = notes.findIndex(note => note._id === id);

            if (index !== -1) {
                // Create a new array with the updated note replacing the old one
                const updatedNotes = [...notes];

                // Replace the old note with the updated note
                updatedNotes[index] = data.note; 

                // Update the state with the new array of notes
                setNotes(updatedNotes);
            } else {
                console.error('Note not found in current state');
            }

        } else {
            console.error('Failed to update note')
        }
    }

    // Return the NoteContext.Provider with the notes state and the addnote, deletenote, and updatenote functions as values
    return (
        <NoteContext.Provider value={{notes, setNotes, addnote, deletenote, updatenote}}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;
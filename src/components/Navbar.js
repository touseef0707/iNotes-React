import React, {useContext} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext';

const Navbar = () => {
    let location = useLocation(); // Importing useLocation
    const navigate = useNavigate(); // Importing useNavigate
    const context = useContext(NoteContext);
    const {setNotes} = context;

    // Function to scroll to all notes section in Home page
    const handleScroll = (sectionId) => {
        navigate('/'); // Redirecting to Home page
    
        // Scrolling to the specified section
        setTimeout(() => {
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        }, 0);
    };
    

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        setNotes([]);
        navigate('/login');
    }
     
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-body-dark fixed-top">
            <div className="container-fluid">

            <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/logo192.png" className='rounded' alt="Logo" style={{ maxWidth: '30px', marginRight: '10px' }} />
                    iNotes
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
                    </li>
                    {/* If not logged in do not display all notes link */}
                    {localStorage.getItem('auth-token') && 
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={() => handleScroll('all-notes')}>MyNotes</Link>
                        </li>
                    }
                    {localStorage.getItem('auth-token') && 
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={() => handleScroll('add-note')}>Add Note</Link>
                        </li>
                    }
                </ul>

                {/* if logged in display logout button */}
                {!localStorage.getItem("auth-token") ? <div className="d-flex">
                    <Link className="btn btn-dark me-1" to="/login">Login</Link>
                    <Link className="btn btn-dark me-1" to="/signup">Signup</Link>
                </div> :  <button className="btn btn-dark" onClick={handleLogout}>Logout</button> }
                </div>
            </div>
        </nav>
    )
}

export default Navbar

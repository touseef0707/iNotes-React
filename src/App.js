import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteItem from './components/NoteItem';
import UpdateNote from './components/UpdateNote';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/notestate';
import Alert from './components/Alert';


function App() {

  // Function to show alerts
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <NoteState>
      <Router>
        <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/note/:id" element={<NoteItem showAlert={showAlert} />} />
            <Route exact path="/updatenote/:id" element={<UpdateNote showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
    
  );
}

export default App;

import React from 'react';

const About = () => {
  return (
    <div className="container text-white py-3">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark text-white mb-3">
            <div className="card-body">
              <h1 className="card-title text-center">About iNotes</h1>
              <p className="card-text">
                Welcome to <strong>iNotes</strong>, a simple and efficient web application for managing your notes. Our platform offers a range of functionalities to help you keep your thoughts and tasks organized:
              </p>
              <ul>
                <li><strong>Register:</strong> Create a personal account with a simple and secure registration process.</li>
                <li><strong>Login:</strong> Access your account securely with your credentials.</li>
                <li><strong>Add Notes:</strong> Quickly add new notes with ease, providing a title and detailed description.</li>
                <li><strong>Update Notes:</strong> Edit and update your existing notes to keep information current.</li>
                <li><strong>View Notes:</strong> View all your notes in one place, with a clean and organized interface.</li>
                <li><strong>Delete Notes:</strong> Remove notes you no longer need with a single click.</li>
              </ul>
              <p className="card-text">
                This project was developed using the MERN stack, which includes:
              </p>
              <ul>
                <li><strong>M</strong>ongoDB: A NoSQL database for efficient data storage and retrieval.</li>
                <li><strong>E</strong>xpress.js: A robust backend framework to handle API requests and server-side logic.</li>
                <li><strong>R</strong>eact.js: A powerful frontend library for building a dynamic and responsive user interface.</li>
                <li><strong>N</strong>ode.js: A scalable server environment for running JavaScript on the server side.</li>
              </ul>

              {/* TODO */}
              {/* <p className="card-text">
                <strong>Additional Features:</strong>
              </p>
              <ul>
                <li><strong>Search Functionality:</strong> Quickly find notes by searching for keywords in the title or content.</li>
                <li><strong>Tagging System:</strong> Organize your notes with tags for better categorization and filtering.</li>
              </ul> */}
              <p className="card-text">
                Special thanks to <a href="https://www.youtube.com/c/CodeWithHarry" target="_blank" rel="noopener noreferrer" className="text-info">Code With Harry</a> for his excellent tutorials and guidance on React and MERN stack development. His content made my learning journey easier and more enjoyable.
              </p>
              <p className="card-text text-center">
                Thank you for using iNotes!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

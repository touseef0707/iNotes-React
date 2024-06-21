import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="container-fluid text-white text-center pt-4 rounded">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <img 
            src="logo512.png" 
            alt="iNotes Logo" 
            className="img-fluid mb-4 rounded" 
            style={{ width: '150px', height: '150px' }}
          />
          <h1 className="display-4">Welcome to iNotes</h1>
          <p className="lead">Your ultimate solution for managing personal notes efficiently.</p>
          <div className="mt-4">
            <Link to="/signup" className="btn btn-primary btn-lg mx-2">Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

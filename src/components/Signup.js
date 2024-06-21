import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Signup = (props) => {

    // Initial state of credentials
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""});
    const host = "http://localhost:5000"
    const navigate = useNavigate();

    // Function to handle input change
    const onChange = (e) => {
        setCredentials(() => ({
            ...credentials,
            [e.target.name]: e.target.value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Preventing default form submission

        // Checking if password and confirm password match
        if(credentials.password === credentials.cpassword){

            // Making a POST request to the server to create a new user
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name, 
                    email: credentials.email, 
                    password: credentials.password
                })
            });

            // Parsing the response body as JSON
            const json = await response.json();

            // If success is true, set auth-token in local storage and navigate to home page
            if (json.success){
                localStorage.setItem("auth-token", json.auth_token);
                navigate('/');
                props.showAlert('Account created successfully', 'success')
            } else {
                props.showAlert('Invalid credentials', 'danger')
            }
            
        } else {
            props.showAlert('Ensure Confirm password matches password', 'danger')
        }
    }


    return (
        <div className='d-flex justify-content-center pt-5'>
            <div className="card w-75 text-bg-dark border-secondary">
                <div className="card-header text-center border-secondary ">
                    <h4>SignUp to start using iNotes!</h4>
                </div>
                <div className="card-body bg-black rounded-bottom">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            {/* <label htmlFor="name" className="form-label">Full Name</label> */}
                            <input type="text" name="name" value={credentials.name} onChange={onChange} className="form-control bg-black text-white mt-2" placeholder='Enter Your Full Name' id="name" required/>
                        </div>
                        <div className="mb-3">
                            {/* <label htmlFor="email" className="form-label">Email address</label> */}
                            <input type="email" name="email" value={credentials.email} onChange={onChange} className="form-control bg-black text-white mt-2" placeholder='name@example.com' id="email" aria-describedby="emailHelp" required/>
                            <div id="emailHelp" className="form-text text-secondary">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            {/* <label htmlFor="password" className="form-label">Password</label> */}
                            <input type="password" name="password" value={credentials.password} onChange={onChange} className="form-control bg-black text-white mt-2" placeholder='Set new password' id="password" required/>
                        </div>
                        <div className="mb-3">
                            {/* <label htmlFor="cpassword" className="form-label">Confirm Password</label> */}
                            <input type="password" name="cpassword" value={credentials.cpassword} onChange={onChange} className="form-control bg-black text-white mt-2" placeholder='Confirm password' id="cpassword" minLength={8} required/>
                        </div>
                        <div className="text-center" >
                            <button type="submit" className="btn btn-primary">SignUp</button>
                            
                            <p className="text-white mt-2">
                                Already have an account? <Link className='text-info' to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup

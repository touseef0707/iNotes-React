import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';


const Login = (props) => {

    // Initial state of credentials
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const host = "http://localhost:5000";
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Making a POST request to the server to login
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        // Parsing the response body as JSON
        const json = await response.json();

        // If success is true, set auth-token in local storage and navigate to home page
        if (json.success){
            localStorage.setItem("auth-token", json.auth_token);
            navigate('/');
            props.showAlert('Logged in successfully', 'success');
        } else {
            props.showAlert('Invalid credentials', 'danger');
        }

    }

    // Function to handle input change
    const onChange = (e) => {
        setCredentials(() => ({
            ...credentials,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className='d-flex justify-content-center pt-5'>
            <div className="card w-75 text-bg-dark border-secondary">
                <div className="card-header text-center border-secondary ">
                    <h4>Login</h4>
                </div>
                <div className="card-body bg-black rounded-bottom">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            {/* <label htmlFor="email" className="form-label">Email address</label> */}
                            <input type="email" name="email" value={credentials.email} onChange={onChange} className="form-control bg-black text-white mt-2" placeholder='Enter your email' id="email" aria-describedby="emailHelp" required/>
                        </div>

                        <div className="mb-3">
                            {/* <label htmlFor="password" className="form-label">Password</label> */}
                            <input type="password" name="password" value={credentials.password} onChange={onChange} className="form-control bg-black text-white mt-2" placeholder='Enter your password' id="password" required/>
                        </div>

                        <div className="text-center" >
                            <button type="submit" className="btn btn-primary">Login</button>
                            <p className="text-white mt-2">
                                Do not have an account? <Link className='text-info' to="/signup">SignUp</Link>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login

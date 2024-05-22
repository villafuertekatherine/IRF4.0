import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';  // Adjust the path as necessary

function LoginPage() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', credentials);
            console.log('Login successful:', response.data);
            // Redirect to a protected route or homepage
            navigate('/home');
        } catch (error) {
            setError('Login failed: ' + (error.response ? error.response.data : 'Server error'));
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="input-box">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-box">
                    <input type="submit" value="Login" />
                </div>
                <div>
                    <Link to="/" className="link-button">Back to Home</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;

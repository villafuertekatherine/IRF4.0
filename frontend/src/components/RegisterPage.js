import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useNavigate } from 'react-router-dom';
import '../css/App.css';  // Adjust the path as necessary
import axios from 'axios';

function RegisterPage() {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');  // State to store success or error messages
  const [isSubmitting, setIsSubmitting] = useState(false); //Sate to track submission status
  const navigate = useNavigate();

  // Function to handle changes in form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Form data:", formData);
      setError('');
      setMessage('');
      setIsSubmitting(true); // Set isSubmitting to true when submission starts

      try {
          const response = await axios.post('http://localhost:8080/register', formData);
          console.log('Registration Successful:', response.data);
          setMessage('Registration successful! Redirecting... Please Wait');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
     } catch (error) {
         setIsSubmitting(false);  // Ensure button is re-enabled if there's an error
         if (error.response) {
             // Check specific status codes if needed
             if (error.response.status === 500) {
                 setError('A user with this username already exists. Please choose another username.');
                 setIsSubmitting(true);
             } else {
                 setError('Registration failed: ' + error.response.data);
             }
         } else {
             setError('Registration failed: The server is not responding. Please try again later.');
         }
     }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>} {/* Display error messages */}
        {message && <p className="message">{message}</p>} {/* Display success messages */}
        <div className="input-box">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className="input-box">
           <input type="submit" value="Register" disabled={isSubmitting} />
        </div>
        <div>
            <Link to="/" className={`link-button ${isSubmitting ? 'disabled' : ''}`} onClick={(e) => isSubmitting && e.preventDefault()}>Back to Home</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;

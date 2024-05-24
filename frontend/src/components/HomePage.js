import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HomePage.css'; // Make sure this CSS file is imported

const HomePage = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [censusDate, setCensusDate] = useState('');
    const [error, setError] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleStartDateChange = (e) => {
        const date = new Date(e.target.value);
        if (date.getDay() !== 0) {
            setError('Start date must be a Monday.');
            setStartDate('');
            setEndDate('');
        } else {
            setError('');
            setStartDate(e.target.value);
            const sunday = new Date(date);
            sunday.setDate(sunday.getDate() + 6);
            setEndDate(sunday.toISOString().split('T')[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (new Date(startDate).getDay() !== 0) {
            setError('Start date must be a Monday.');
        } else {
            navigate('/pre-admissions', { state: { startDate, endDate } });
        }
    };

    const handleCensusSubmit = (e) => {
        e.preventDefault();
        if (!censusDate) {
            setError('Please select a date for the Census Page.');
        } else {
            navigate('/census', { state: { censusDate } });
        }
    };

    const handleLogout = () => {
        // Clear the user's session or token (this example assumes token in local storage)
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="homepage-container">
            <h1>Home Page</h1>
            <button onClick={() => setShowLogoutModal(true)} className="button logout-button">Log Out</button>
            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Are you sure you want to log out?</h2>
                        <div className="modal-buttons">
                            <button onClick={handleLogout} className="button">Yes</button>
                            <button onClick={() => setShowLogoutModal(false)} className="button">No</button>
                        </div>
                    </div>
                </div>
            )}
            <section>
                <h2>Pre-Admissions Page - Week Selection</h2>
                <p>
                    Select a start date for the week you wish to view on the Pre-Admissions Page.
                    The start date must be a Monday. The end date will automatically be set to the following Sunday.
                </p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Week Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Week End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            readOnly
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="button">View Pre-Admissions Data</button>
                </form>
            </section>
            <section>
                <h2>Census Page - Date Selection</h2>
                <p>Please select a date to view the Census Page</p>
                <form onSubmit={handleCensusSubmit}>
                    <div>
                        <label>Census Date:</label>
                        <input
                            type="date"
                            value={censusDate}
                            onChange={e => setCensusDate(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="button">View Census Data</button>
                </form>
            </section>
        </div>
    );
};

export default HomePage;

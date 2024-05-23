import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../css/CensusPage.css'; // Make sure this CSS file is styled appropriately
import Modal from '../notifications/DischargeModal'; // Assuming you have a separate DischargeModal component

const CensusPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const [censusData, setCensusData] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [dischargeDate, setDischargeDate] = useState('');
    const [isDischargeModalOpen, setIsDischargeModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Add this line

    useEffect(() => {
        const fetchCensusData = async () => {
            const { censusDate } = location.state;
            try {
                const response = await axios.get('http://localhost:8080/api/census', {
                    params: { censusDate }
                });
                setCensusData(response.data || []);
            } catch (error) {
                console.error('Failed to fetch census data:', error);
            }
        };

        if (location.state && location.state.censusDate) {
            fetchCensusData();
        }
    }, [location.state]);

    const isSameDate = (date1, date2) => {
        return new Date(date1).toISOString().split('T')[0] === new Date(date2).toISOString().split('T')[0];
    };

    const handleOpenDischargeModal = (patientId) => {
        setSelectedPatientId(patientId);
        setIsDischargeModalOpen(true);
    };

    const handleCloseDischargeModal = () => {
        setIsDischargeModalOpen(false);
        setDischargeDate('');
        setErrorMessage(''); // Reset the error message when closing the modal
    };

    const handleDischarge = async () => {
        if (!dischargeDate) {
            setErrorMessage("Please select a discharge date before submitting.");
            return;
        }
        try {
            await axios.post(`http://localhost:8080/api/update-discharge-date/${selectedPatientId}`, {
                dischargeDate
            });
            handleCloseDischargeModal();
            window.location.reload(); // Reload the page to reflect changes
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set the error message from the backend
            } else {
                setErrorMessage('Failed to update discharge date. Please try again.');
            }
            console.error('Failed to update discharge date:', error);
        }
    };

    return (
        <div className="census-container">
            <h1>Census Page</h1>
            <button onClick={() => navigate('/home')} className="back-button">Back to Home Page</button> {/* Add Back to Home button */}
            <section>
                <h2>Census Data for {location.state?.censusDate}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>Admission Date</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Plan</th>
                            <th>DX</th>
                            <th>Discharge Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {censusData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.roomNumber}</td>
                                <td>{data.admissionDate}</td>
                                <td className={
                                    isSameDate(data.admissionDate, location.state.censusDate) ? "highlight-admission" :
                                    isSameDate(data.dischargeDate, location.state.censusDate) ? "highlight-discharge" :
                                    (data.name === "" ? "empty-room" : "")
                                }>
                                    {data.name}
                                </td>
                                <td>{data.age}</td>
                                <td>{data.sex}</td>
                                <td>{data.plan}</td>
                                <td>{data.dx}</td>
                                <td>{data.dischargeDate}</td>
                                <td>
                                    {data.name && (
                                        <button onClick={() => handleOpenDischargeModal(data.id)}>
                                            Set Discharge Date
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {isDischargeModalOpen && (
                <Modal
                    isOpen={isDischargeModalOpen}
                    onClose={handleCloseDischargeModal}
                    onConfirm={handleDischarge}
                    dischargeDate={dischargeDate}
                    setDischargeDate={setDischargeDate}
                    errorMessage={errorMessage} // Pass the error message to the modal
                />
            )}
        </div>
    );
};

export default CensusPage;

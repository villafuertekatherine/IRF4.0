import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/CensusPage.css'; // Make sure this CSS file is styled appropriately

const CensusPage = () => {
    const location = useLocation();
    const [censusData, setCensusData] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [dischargeDate, setDischargeDate] = useState('');
    const [isDischargeModalOpen, setIsDischargeModalOpen] = useState(false);

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

    const openDischargeModal = (patientId) => {
        setSelectedPatientId(patientId);
        setIsDischargeModalOpen(true);
    };

    const closeDischargeModal = () => {
        setIsDischargeModalOpen(false);
        setDischargeDate('');
    };

    const handleDischarge = async () => {
        if (selectedPatientId && dischargeDate) {
            try {
                const payload = { dischargeDate };
                await axios.post(`http://localhost:8080/api/update-discharge-date/${selectedPatientId}`, payload);
                closeDischargeModal();
                window.location.reload();
            } catch (error) {
                console.error('Failed to update discharge date:', error);
                alert(error.response?.data || 'Failed to update discharge date. Please try again.');
            }
        } else {
            alert("Please select a discharge date before submitting.");
        }
    };

    return (
        <div className="census-container">
            <h1>Census Page</h1>
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
                                <td className={isSameDate(data.admissionDate, location.state.censusDate) ? "highlight-admission" : (data.name === "" ? "empty-room" : "")}>
                                    {data.name}
                                </td>
                                <td>{data.age}</td>
                                <td>{data.sex}</td>
                                <td>{data.plan}</td>
                                <td>{data.dx}</td>
                                <td>{data.dischargeDate}</td>
                                <td>
                                    {data.name && (
                                        <button onClick={() => openDischargeModal(data.id)}>Set Discharge Date</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            {isDischargeModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Select the discharge date:</h3>
                        <input
                            type="date"
                            value={dischargeDate}
                            onChange={e => setDischargeDate(e.target.value)}
                            style={{ margin: '10px 0', display: 'block', width: '100%' }}
                        />
                        <button onClick={handleDischarge}>Confirm</button>
                        <button onClick={closeDischargeModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CensusPage;

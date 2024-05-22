import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/PreAdmissionsPage.css';
import ConfirmationModal from '../notifications/ConfirmationModal';
import SuccessModal from '../notifications/SuccessModal';

const PreAdmissionsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [patients, setPatients] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [showAdmitSuccessModal, setShowAdmitSuccessModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [admissionDate, setAdmissionDate] = useState('');
    const [weekStartDate, setWeekStartDate] = useState('');
    const [weekEndDate, setWeekEndDate] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/patients');
                setPatients(response.data || []);
            } catch (error) {
                console.error('Failed to fetch patients:', error);
            }
        };

        const fetchAdmissionsWithDates = async () => {
            const { startDate, endDate } = location.state;
            setWeekStartDate(startDate);
            setWeekEndDate(endDate);
            try {
                const response = await axios.get('http://localhost:8080/api/admissions/date-range', {
                    params: { startDate, endDate }
                });
                const sortedAdmissions = response.data.sort((a, b) => new Date(a.admissionDate) - new Date(b.admissionDate));
                setAdmissions(sortedAdmissions || []);
            } catch (error) {
                console.error('Failed to fetch admissions:', error);
            }
        };

        fetchPatients();
        if (location.state && location.state.startDate && location.state.endDate) {
            fetchAdmissionsWithDates();
        }
    }, [location.state]);

    const isValidPatient = (patient) => {
        return patient.status && patient.source && patient.name && patient.age &&
               patient.sex && patient.plan && patient.dx && patient.presented &&
               patient.notes && patient.mso && patient.sixtyPercentRule;
    };

    const handleAdmit = async () => {
        if (selectedPatientId && selectedRoom) {
            try {
                const payload = {
                    room_number: selectedRoom,
                    admission_date: new Date().toISOString().split('T')[0]  // Use today's date for simplicity
                };
                await axios.post(`http://localhost:8080/api/admit-patient/${selectedPatientId}`, payload);
                closeModal();
                setShowAdmitSuccessModal(true);
            } catch (error) {
                console.error('Failed to admit patient:', error);
                alert(error.response?.data || 'Failed to admit patient. Please try again.');
                closeModal();
            }
        } else {
            alert("Please select a room before submitting.");
        }
    };

    const handleAssign = async () => {
        if (selectedPatientId && admissionDate) {
            try {
                const payload = {
                    admission_date: admissionDate
                };
                await axios.post(`http://localhost:8080/api/assign-patient/${selectedPatientId}`, payload);
                closeAssignModal();
                setShowAdmitSuccessModal(true);
            } catch (error) {
                console.error('Failed to assign patient:', error);
                closeAssignModal();
            }
        } else {
            alert("Please select a date before submitting.");
        }
    };

    const openModal = (patientId) => {
        setSelectedPatientId(patientId);
        setIsModalOpen(true);
    };

    const openAssignModal = (patientId) => {
        setSelectedPatientId(patientId);
        setIsAssignModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeAssignModal = () => {
        setIsAssignModalOpen(false);
    };

    return (
        <div className="page-container">
            <h1>Pre-Admissions Page</h1>
            <section>
                <h2>Admissions</h2>
                {weekStartDate && weekEndDate && (
                    <p>Showing admissions from {weekStartDate} to {weekEndDate}</p>
                )}
                <table>
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Room</th>
                            <th>Admission Date</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Plan</th>
                            <th>DX</th>
                            <th>Notes</th>
                            <th>60% Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(admissions) && admissions.map((admission) => (
                            <tr key={admission.id}>
                                <td>
                                    <button onClick={() => navigate(`/edit-admission/${admission.id}`)}>Edit</button>
                                </td>
                                <td>{admission.roomNumber}</td>
                                <td>{admission.admissionDate}</td>
                                <td>{admission.name}</td>
                                <td>{admission.age}</td>
                                <td>{admission.sex}</td>
                                <td>{admission.plan}</td>
                                <td>{admission.dx}</td>
                                <td>{admission.notes}</td>
                                <td>{admission.sixtyPercentRule}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <section>
                <button onClick={() => navigate('/add-possible-admission')}>Add a new Possible Admission</button>
            </section>
            <section>
                <h2>Possible Admissions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Status</th>
                            <th>Source</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Plan</th>
                            <th>DX</th>
                            <th>Presented</th>
                            <th>Notes</th>
                            <th>MSO</th>
                            <th>60% Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(patients) && patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>
                                    <button onClick={() => navigate(`/edit-patient/${patient.id}`)}>Edit</button>
                                    {isValidPatient(patient) && (
                                        <>
                                            <button className="assign-button" onClick={() => openAssignModal(patient.id)}>
                                                Assign
                                            </button>
                                            {patient.assigned && (
                                                <button className="admit-button" onClick={() => openModal(patient.id)}>
                                                    Admit
                                                </button>
                                            )}
                                        </>
                                    )}
                                </td>
                                <td>{patient.status}</td>
                                <td>{patient.source}</td>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.sex}</td>
                                <td>{patient.plan}</td>
                                <td>{patient.dx}</td>
                                <td>{patient.presented}</td>
                                <td>{patient.notes}</td>
                                <td>{patient.mso}</td>
                                <td>{patient.sixtyPercentRule}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleAdmit}
                message="Are you sure you want to admit this patient? If so select a room:"
                confirmButtonText="Confirm Admission"
                cancelButtonText="Cancel"
            >
                <select
                    value={selectedRoom}
                    onChange={e => setSelectedRoom(e.target.value)}
                    style={{ margin: '10px 0', display: 'block', width: '100%' }}
                >
                    <option value="">Select a Room</option>
                    {Array.from({ length: 20 }, (_, i) => 480 + i).map(room => (
                        <option key={room} value={room}>{room}</option>
                    ))}
                </select>
            </ConfirmationModal>
            <ConfirmationModal
                isOpen={isAssignModalOpen}
                onClose={closeAssignModal}
                onConfirm={handleAssign}
                message="Are you sure you want to assign this patient? If so select a date of admission:"
                confirmButtonText="Confirm Assignment"
                cancelButtonText="Cancel"
            >
                <input
                    type="date"
                    value={admissionDate}
                    onChange={e => setAdmissionDate(e.target.value)}
                    style={{ margin: '10px 0', display: 'block', width: '100%' }}
                />
            </ConfirmationModal>
            <SuccessModal
                isOpen={showAdmitSuccessModal}
                onClose={() => {
                    setShowAdmitSuccessModal(false);
                    window.location.reload();
                }}
                message="Patient has been admitted/assigned successfully."
            />
        </div>
    );
};

export default PreAdmissionsPage;

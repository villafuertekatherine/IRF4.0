import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from '../notifications/ConfirmationModal';
import SuccessModal from '../notifications/SuccessModal';



const EditAdmissionPage = () => {
    const { id } = useParams();  // Get the id from the URL
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    const [admission, setAdmission] = useState({
        name: '',
        age: '',
        status: '',
        source: '',
        sourceOther: '',
        sex: '',
        plan: '',
        planOther: '',
        dx: '',
        presented: '',
        notes: '',
        mso: '',
        sixtyPercentRule: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/admissions/${id}`)
            .then(response => {
                const fetchedAdmission = response.data;
                 const predefinedPlans = [
                    "SSSA", "SSSP", "MMMA", "PMCA", "FMP", "FMA", "MCSP", "MAF", "MEDPR", "PRM",
                    "FMV", "SSSV", "HUMA", "HUMP", "PSMP", "PSMV", "MMMV", "TRI"
                 ];
                 // Handling for plan
                 if (!predefinedPlans.includes(fetchedAdmission.plan)) {
                     fetchedAdmission.planOther = fetchedAdmission.plan;
                     fetchedAdmission.plan = 'Other';
                 }
                 setAdmission(fetchedAdmission);
            })
            .catch(error => console.error('Error fetching admission details:', error));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdmission(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    // Update the source field if 'Other' is selected
    const finalAdmissionData = {
       ...admission,
       plan: admission.plan === 'Other' ? admission.planOther : admission.plan
    };

        axios.put(`http://localhost:8080/api/admissions/${id}`, finalAdmissionData)
             .then(() => {
                 navigate('/pre-admissions');  // Redirect back to the admissions page
             })
             .catch(error => {
                 console.error('Failed to update admission:', error);
             });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/admissions/${id}`)
            .then(() => {
                setShowSuccessModal(true); // Show success modal
            })
            .catch(error => {
                console.error('Failed to delete admission:', error);
                alert("There was a problem deleting the admission.");
            });
    };

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="form-container">
            <h1>Edit Admitted Patient Record</h1>
            <form onSubmit={handleSubmit}>
                {/* Repeat the form fields similarly to AddPossibleAdmission, utilizing handleInputChange for updates */}
                <label>
                    Name:
                    <input type="text" name="name" value={admission.name} onChange={handleInputChange} />
                </label>
                <label>
                    Age:
                    <input type="number" name="age" value={admission.age} onChange={handleInputChange} />
                </label>
                <label>
                    Sex:
                    <select name="sex" value={admission.sex || ''} onChange={handleInputChange}>
                        <option value="" disabled>Select Option</option>
                        <option value="F">F</option>
                        <option value="M">M</option>
                    </select>
                </label>
                <label>
                    Plan:
                    <select name="plan" value={admission.plan || ''} onChange={handleInputChange}>
                        <option value="" disabled>Select Option</option>
                            <option value="SSSA">SSSA</option>
                            <option value="SSSP">SSSP</option>
                            <option value="MMMA">MMMA</option>
                            <option value="PMCA">PMCA</option>
                            <option value="FMP">FMP</option>
                            <option value="FMA">FMA</option>
                            <option value="MCSP">MCSP</option>
                            <option value="MAF">MAF</option>
                            <option value="MEDPR">MEDPR</option>
                            <option value="PRM">PRM</option>
                            <option value="FMV">FMV</option>
                            <option value="SSSV">SSSV</option>
                            <option value="HUMA">HUMA</option>
                            <option value="HUMP">HUMP</option>
                            <option value="PSMP">PSMP</option>
                            <option value="PSMV">PSMV</option>
                            <option value="MMMV">MMMV</option>
                            <option value="TRI">TRI</option>
                        {/* Add other plan options similarly */}
                        <option value="Other">Other</option>
                    </select>
                </label>
                {admission.plan === 'Other' && (
                    <label>
                        Plan-Other:
                        <input
                            type="text"
                            name="planOther"
                            value={admission.planOther || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                )}
                <label>
                    DX:
                    <input type="text" name="dx" value={admission.dx || ''} onChange={handleInputChange} />
                </label>
                <label>
                    Notes:
                    <textarea name="notes" value={admission.notes || ''} onChange={handleInputChange} />
                </label>
                <label>
                    60% Rule:
                    <select name="sixtyPercentRule" value={admission.sixtyPercentRule || ''} onChange={handleInputChange}>
                        <option value="" disabled>Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={openDeleteModal} className="delete-button">Delete Admission</button>
            </form>
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this patient record from admissions?"
                confirmButtonText="Confirm Delete"
                cancelButtonText="Cancel"
            />
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    navigate('/pre-admissions'); // Navigate after closing the modal
                }}
                message="Admission has been deleted successfully."
            />
      </div>
    );
};

export default EditAdmissionPage;

import React from 'react';
import '../css/DischargeModal.css';

const DischargeModal = ({ isOpen, onClose, onConfirm, dischargeDate, setDischargeDate }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Select the discharge date:</h2>
                <input
                    type="date"
                    value={dischargeDate}
                    onChange={(e) => setDischargeDate(e.target.value)}
                />
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="confirm-button">Confirm</button>
                    <button onClick={onClose} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DischargeModal;

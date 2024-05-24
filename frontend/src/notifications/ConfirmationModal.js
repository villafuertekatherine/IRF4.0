import React from 'react';
import '../css/ConfirmationModal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message, confirmButtonText, cancelButtonText, children, errorMessage }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{message}</h2>
                {children}
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display the error message */}
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="confirm-button">{confirmButtonText}</button>
                    <button onClick={onClose} className="cancel-button">{cancelButtonText}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;

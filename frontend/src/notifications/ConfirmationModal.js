import React from 'react';
import '../css/ConfirmationModal.css';

// Inside ConfirmationModal.js
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message, confirmButtonText, cancelButtonText, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                {/* This will render any extra content passed into the modal */}
                {children}
                <button onClick={onConfirm}>{confirmButtonText}</button>
                <button onClick={onClose} className="button-cancel">{cancelButtonText}</button>
            </div>
        </div>
    );
};

export default ConfirmationModal;

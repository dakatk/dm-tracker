import React from "react";
import './Modal.css';

function Modal({ show, close }) {
    return show && (
        <div id="modal-parent">
            Modal
            <button 
                id="modal-close-btn" 
                onClick={() => close()}>X
            </button>
        </div>
    );
}

export default Modal;
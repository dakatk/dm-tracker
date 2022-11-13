import React from "react";
import './style/AttackModal.scss';

function AttackModal({ show, close, encounterData }) {
    return show && (
        <div id="attack-modal-parent">
            Modal
            <button 
                id="attack-modal-close-btn" 
                onClick={() => close()}>X
            </button>
        </div>
    );
}

export default AttackModal;
import React, { useState } from 'react';
import  { FormField, FormFooter, validate } from './FormFields';

import Modal from '../../common/Modal';

import './style/NewEncounterModal.scss';

function NewEncounterModal({ onSave, onClose }) {
    const modalContents = () => {

    }

    const onAttemptSave = () => {

    }

    const modalFooter = () => {
        return (
            <FormFooter 
                onSave={onAttemptSave}
                onClose={onClose}
            />
        );
    }

    return (
        <Modal
            title='Add Encounter'
            close={onClose}
            contents={modalContents()}
            footer={modalFooter()}
        />
    );
}

export default NewEncounterModal;
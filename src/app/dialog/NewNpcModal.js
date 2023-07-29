import React, { useState } from 'react';
import  { FormField, FormFooter, validate } from './FormFields';

import Modal from '../../common/Modal';

import './style/NewNpcModal.scss';

function NewNpcModal({ onClose, onSave }) {

    const [name, updateName] = useState('');
    const [type, updateType] = useState('');
    const [occupation, updateOccupation] = useState('');
    const [description, updateDescription] = useState('');
    const [validationErrors, updateValidationErrors] = useState({});

    const modalContents = () => {
        return (
            <div className='new-npc-contents'>
                <FormField
                    type='text'
                    label='Name'
                    id='new-npc-name'
                    className='new-npc-input'
                    value={name}
                    updateValue={updateName}
                    validationMessage={validationErrors.name}
                />
                <FormField
                    type='text'
                    label='Type'
                    id='new-npc-type'
                    className='new-npc-input'
                    value={type}
                    updateValue={updateType}
                    validationMessage={validationErrors.type}
                />
                <FormField
                    type='text'
                    label='Occupation'
                    id='new-npc-occupation'
                    className='new-npc-input'
                    value={occupation}
                    updateValue={updateOccupation}
                    validationMessage={validationErrors.occupation}
                />
                <FormField
                    type='textarea'
                    label='Description'
                    id='new-npc-description'
                    className='new-npc-input'
                    value={description}
                    updateValue={updateDescription}
                    validationMessage={validationErrors.description}
                    metadata={{rows: 3}}
                />
            </div>
        );  
    }

    const onAttemptSave = () => {
        const nextValidationErrors = {
            ...validate(name, 'name'),
            ...validate(type, 'type'),
            ...validate(occupation, 'occupation'),
            ...validate(description, 'description')
        };

        if (!Object.keys(nextValidationErrors).length) {
            onSave({
                'name': name,
                'type': type,
                'occupation': occupation,
                'description': description
            });
        }
        updateValidationErrors(nextValidationErrors);
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
            title='Create NPC'
            close={onClose}
            contents={modalContents()}
            footer={modalFooter()}
        />
    );
}

export default NewNpcModal;
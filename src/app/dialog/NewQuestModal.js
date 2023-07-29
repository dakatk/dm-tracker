import React, { useState } from 'react';
import  { FormField, FormFooter, validate } from './FormFields';

import Modal from '../../common/Modal';

import './style/NewQuestModal.scss';

function NewQuestModal({ onClose, onSave }) {

    const [name, updateName] = useState('');
    const [type, updateType] = useState('');
    const [reward, updateReward] = useState('');
    const [description, updateDescription] = useState('');
    const [validationErrors, updateValidationErrors] = useState({});

    const modalContents = () => {
        return (
            <div className='new-quest-contents'>
                <FormField
                    type='text'
                    label='Name'
                    id='new-quest-name'
                    className='new-quest-input'
                    value={name}
                    updateValue={updateName}
                    validationMessage={validationErrors.name}
                />
                <FormField
                    type='text'
                    label='Type'
                    id='new-quest-type'
                    className='new-quest-input'
                    value={type}
                    updateValue={updateType}
                    validationMessage={validationErrors.type}
                />
                <FormField
                    type='text'
                    label='Reward'
                    id='new-quest-reward'
                    className='new-quest-input'
                    value={reward}
                    updateValue={updateReward}
                    validationMessage={validationErrors.occupation}
                />
                <FormField
                    type='textarea'
                    label='Description'
                    id='new-quest-description'
                    className='new-quest-input'
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
            ...validate(reward, 'reward'),
            ...validate(description, 'description')
        };

        if (!Object.keys(nextValidationErrors).length) {
            onSave({
                'name': name,
                'type': type,
                'reward': reward,
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
            title='Create Quest'
            close={onClose}
            contents={modalContents()}
            footer={modalFooter()}
        />
    );
}

export default NewQuestModal;
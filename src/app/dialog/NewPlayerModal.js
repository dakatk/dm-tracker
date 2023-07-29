import React, { useState } from 'react';
import  { FormField, FormFooter, validate } from './FormFields';

import Modal from '../../common/Modal';

import './style/NewPlayerModal.scss';

function NewPlayerModal({ onSave, onClose }) {
    const [name, updateName] = useState('');
    const [maxHealth, updateMaxHealth] = useState('');
    const [ac, updateAc] = useState('');
    const [dexMod, updateDexMod] = useState('');
    const [conMod, updateConMod] = useState('');
    const [validationErrors, updateValidationErrors] = useState({});

    const modalContents = () => {
        return (
            <div className='new-player-contents'>
                <div className='new-player-contents-top-row'>
                    <FormField
                        type='text'
                        label='Name'
                        id='new-player-name'
                        className='new-player-input'
                        value={name}
                        updateValue={updateName}
                        validationMessage={validationErrors.name}
                    />
                </div>

                <div className='new-player-contents-bottom-row'>
                    <div className='new-player-contents-bottom-section'>
                        <FormField
                            type='number'
                            label='Max Health'
                            id='new-player-max-health'
                            className='new-player-input'
                            value={maxHealth}
                            updateValue={updateMaxHealth}
                            validationMessage={validationErrors.maxHealth}
                        />
                        <FormField
                            type='number'
                            label='Armor Class'
                            id='new-player-ac'
                            className='new-player-input'
                            value={ac}
                            updateValue={updateAc}
                            validationMessage={validationErrors.ac}
                        />
                    </div>
                    <div className='new-player-contents-bottom-section'>
                        <FormField
                            type='number'
                            label='Con. Mod'
                            id='new-player-con-mod'
                            className='new-player-input'
                            value={conMod}
                            updateValue={updateConMod}
                            validationMessage={validationErrors.conMod}
                        />
                        <FormField
                            type='number'
                            label='Dex. Mod'
                            id='new-player-dex-mod'
                            className='new-player-input'
                            value={dexMod}
                            updateValue={updateDexMod}
                            validationMessage={validationErrors.dexMod}
                        />
                    </div>
                </div>
            </div>
        );
    }

    const onAttemptSave = () => {
        const nextValidationErrors = {
            ...validate(name, 'name'),
            ...validate(maxHealth, 'maxHealth'),
            ...validate(ac, 'ac'),
            ...validate(conMod, 'conMod'),
            ...validate(dexMod, 'dexMod')
        };

        if (!nextValidationErrors.ac && ac < 10) {
            nextValidationErrors.ac = 'AC cannot be less than 10';
        }

        if (!Object.keys(nextValidationErrors).length) {
            onSave({
                'name': name,
                'maxHealth': maxHealth,
                'ac': ac,
                'conMod': conMod,
                'dexMod': dexMod
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
            title='Add Player'
            close={onClose}
            contents={modalContents()}
            footer={modalFooter()}
        />
    );
}

export default NewPlayerModal;
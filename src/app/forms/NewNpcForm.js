import React, { useState } from 'react';

import Form from '../../common/Form';
import { FormField } from '../../common/FormField';

import './style/NewNpcForm.scss';

function NewNpcForm({ onCreateNpc, currentName, currentType, currentOccupation, currentDescription }) {
    const [name, updateName] = useState(currentName || '');
    const [type, updateType] = useState(currentType || '');
    const [occupation, updateOccupation] = useState(currentOccupation || '');
    const [description, updateDescription] = useState(currentDescription || '');

    return (
        <Form 
            title='Create NPC'
            onSubmit={() => onCreateNpc({
                'name': name,
                'type': type,
                'occupation': occupation,
                'description': description
            })}
        >
            <div className='new-npc-contents'>
                <FormField
                    type='text'
                    label='Name'
                    id='new-npc-name'
                    className='new-npc-input'
                    required={true}
                    value={name}
                    updateValue={updateName}
                />
                <FormField
                    type='text'
                    label='Type'
                    id='new-npc-type'
                    className='new-npc-input'
                    required={true}
                    value={type}
                    updateValue={updateType}
                />
                <FormField
                    type='text'
                    label='Occupation'
                    id='new-npc-occupation'
                    className='new-npc-input'
                    required={true}
                    value={occupation}
                    updateValue={updateOccupation}
                />
                <FormField
                    type='textarea'
                    label='Description'
                    id='new-npc-description'
                    className='new-npc-input'
                    required={true}
                    value={description}
                    updateValue={updateDescription}
                    metadata={{rows: 3}}
                />
            </div>
        </Form>
    );
}

export default NewNpcForm;
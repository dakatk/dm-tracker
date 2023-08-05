import React, { useState } from 'react';

import Form from '../../common/Form';
import { FormField } from '../../common/FormField';

import './style/NewNpcForm.scss';

function NewNpcForm({ onCreateNpc }) {
    const [name, updateName] = useState('');
    const [type, updateType] = useState('');
    const [occupation, updateOccupation] = useState('');
    const [description, updateDescription] = useState('');

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
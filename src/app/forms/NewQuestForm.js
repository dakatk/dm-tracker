import React, { useState } from 'react';

import Form from '../../common/Form';
import { FormField } from '../../common/FormField';

import './style/NewQuestForm.scss';

function NewQuestForm({ onCreateQuest }) {
    const [name, updateName] = useState('');
    const [type, updateType] = useState('');
    const [reward, updateReward] = useState('');
    const [description, updateDescription] = useState('');

    return (
        <Form
            title='Create Quest'
            onSubmit={() => onCreateQuest({
                'name': name,
                'type': type,
                'reward': reward,
                'description': description
            })}
        >
            <div className='new-quest-contents'>
                <FormField
                    type='text'
                    label='Name'
                    id='new-quest-name'
                    className='new-quest-input'
                    required={true}
                    value={name}
                    updateValue={updateName}
                />
                <FormField
                    type='text'
                    label='Type'
                    id='new-quest-type'
                    className='new-quest-input'
                    required={true}
                    value={type}
                    updateValue={updateType}
                />
                <FormField
                    type='text'
                    label='Reward'
                    id='new-quest-reward'
                    className='new-quest-input'
                    required={true}
                    value={reward}
                    updateValue={updateReward}
                />
                <FormField
                    type='textarea'
                    label='Description'
                    id='new-quest-description'
                    className='new-quest-input'
                    required={true}
                    value={description}
                    updateValue={updateDescription}
                    metadata={{rows: 3}}
                />
            </div>
        </Form>
    );
}

export default NewQuestForm;
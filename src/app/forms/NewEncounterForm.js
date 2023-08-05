import React, { useState } from 'react';

import Form from '../../common/Form';
import  { FormField } from '../../common/FormField';

import './style/NewEncounterForm.scss';

function NewEncounterForm({ onCreateEncounter }) {
    const [encounterName, updateEncounterName] = useState('');

    return (
        <Form
            title='Add Encounter'
            onSubmit={() => onCreateEncounter({

            })}
        >
            <div className='new-encounter-contents'>
                <FormField
                    type='text'
                    label='Name'
                    id='new-encounter-name'
                    className='new-encounter-input'
                    required={true}
                    value={encounterName}
                    updateValue={updateEncounterName}
                />
            </div>
        </Form>
    );
}

export default NewEncounterForm;
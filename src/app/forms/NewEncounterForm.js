import React, { useReducer, useState } from 'react';

import Tabs from '../../common/Tabs';
import Form from '../../common/Form';
import  { FormField } from '../../common/FormField';

import { arrayReducer } from '../../util/reducers';

import './style/NewEncounterForm.scss';

function NewEncounterForm({ onCreateEncounter }) {
    const [encounterName, updateEncounterName] = useState('');
    const [enemyNames, dispatchEnemyNames] = useReducer(arrayReducer, []);
    const [nextEnemyName, updateNextEnemyName] = useState('');

    const addEnemyPrompt = () => {
        return (
            <div className='new-encounter-enemy-row'>
                <label
                    className='new-encounter-label'
                    htmlFor='new-encounter-add-enemy-name'
                >
                    Add Enemy
                </label>

                <input
                    className='widget-input new-encounter-input new-encounter-text-input' 
                    id='new-encounter-add-enemy-name'
                    name='new-encounter-add-enemy-name'
                    type='text'
                    value={nextEnemyName}
                    onChange={(e) => updateNextEnemyName(e.target.value)}
                />

                <button
                    className='widget-btn new-encounter-input new-encounter-add-btn'
                    onClick={() => {
                        const enemyName = nextEnemyName?.trim();
                        if (enemyName && !enemyNames.includes(enemyName)) {
                            dispatchEnemyNames({ type: 'add', value: nextEnemyName });
                            updateNextEnemyName('');
                        }
                    }}
                    disabled={!nextEnemyName?.trim()}
                >+</button>
            </div>
        );
    }

    return (
        <Form
            title='Add Encounter'
            onSubmit={() => {}}
        >
            <div className='new-encounter-form-wrapper'>
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
                    {addEnemyPrompt()}
                </div>

                <div className='new-encounter-tabs-wrapper'>
                    {enemyNames.length !== 0 && <Tabs
                        labels={enemyNames}
                        content={(tabName) => EnemyType({ 
                            name: tabName,
                            onRemove: (value) => dispatchEnemyNames({ type: 'remove', value })
                        })}
                    />}
                </div>
            </div>
        </Form>
    );
}

function EnemyType({ name, onRemove }) {
    const [enemyHealth, updateEnemyHealth] = useState(1);
    const [enemyAc, updateEnemyAc] = useState(1);
    const [enemyCount, updateEnemyCount] = useState(1);

    return (
        <div 
            className='enemy-type-contents'
            key={`enemy-type-${name}`}
        >
            <FormField
                type='number'
                label='Health'
                id={`enemy-type-health-${name.replaceAll(/\s+/g, '-')}`}
                className='new-encounter-input'
                required={true}
                value={enemyHealth}
                updateValue={updateEnemyHealth}
                metadata={{ min: 1, max: 1000 }}
            />

            <FormField
                type='number'
                label='Armor Class'
                id={`enemy-type-ac-${name.replaceAll(/\s+/g, '-')}`}
                className='new-encounter-input'
                required={true}
                value={enemyAc}
                updateValue={updateEnemyAc}
                metadata={{ min: 1, max: 30 }}
            />

            <FormField
                type='number'
                label='Count'
                id={`enemy-type-count-${name.replaceAll(/\s+/g, '-')}`}
                className='new-encounter-input'
                required={true}
                value={enemyCount}
                updateValue={updateEnemyCount}
                metadata={{ min: 1, max: 10 }}
            />

            <button
                className='widget-btn new-encounter-input'
                onClick={() => onRemove(name)}
            >
                Remove
            </button>
        </div>
    );
}

export default NewEncounterForm;
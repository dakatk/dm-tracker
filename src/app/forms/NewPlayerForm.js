import React, { useState } from 'react';

import Form from '../../common/Form';
import  { FormField } from '../../common/FormField';

import './style/NewPlayerForm.scss';

function NewPlayerForm({ onCreatePlayer }) {
    const [name, updateName] = useState('');
    const [maxHealth, updateMaxHealth] = useState('');
    const [ac, updateAc] = useState('');
    const [dexMod, updateDexMod] = useState('');
    const [conMod, updateConMod] = useState('');

    return (
        <Form
            title='Add Player'
            onSubmit={() => onCreatePlayer({
                'name': name,
                'maxHealth': maxHealth,
                'ac': ac,
                'conMod': conMod,
                'dexMod': dexMod
            })}
        >
            <div className='new-player-contents'>
                <div className='new-player-contents-top-row'>
                    <FormField
                        type='text'
                        label='Name'
                        id='new-player-name'
                        className='new-player-input'
                        required={true}
                        value={name}
                        updateValue={updateName}
                    />
                </div>

                <div className='new-player-contents-bottom-row'>
                    <div className='new-player-contents-bottom-section'>
                        <FormField
                            type='number'
                            label='Max Health'
                            id='new-player-max-health'
                            className='new-player-input'
                            required={true}
                            value={maxHealth}
                            updateValue={updateMaxHealth}
                            validate={(value) => value < 5 ? "'Max Health' cannot be less than 5" : null}
                        />
                        <FormField
                            type='number'
                            label='Armor Class'
                            id='new-player-ac'
                            className='new-player-input'
                            required={true}
                            value={ac}
                            updateValue={updateAc}
                            validate={(value) => value < 10 ? "'AC' cannot be less than 10" : null}
                        />
                    </div>
                    <div className='new-player-contents-bottom-section'>
                        <FormField
                            type='number'
                            label='Con. Mod'
                            id='new-player-con-mod'
                            className='new-player-input'
                            required={true}
                            value={conMod}
                            updateValue={updateConMod}
                            validate={(value) => value < -2 ? "'Con. Mod' cannot be less than -2" : null}
                        />
                        <FormField
                            type='number'
                            label='Dex. Mod'
                            id='new-player-dex-mod'
                            className='new-player-input'
                            required={true}
                            value={dexMod}
                            updateValue={updateDexMod}
                            validate={(value) => value < -2 ? "'Dex. Mod' cannot be less than -2" : null}
                        />
                    </div>
                </div>
            </div>
        </Form>
    );
}

export default NewPlayerForm;
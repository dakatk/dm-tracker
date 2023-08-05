import React, { useContext, useState } from 'react';

import { CampaignContext } from '../Context';

import Tabs from '../../common/Tabs';
import Form from '../../common/Form';
import  { FormField } from '../../common/FormField';

import './style/EditPlayersForm.scss';

function EditPlayersForm({ onUpdatePlayers }) {
    const campaign = useContext(CampaignContext);

    const tabNames = campaign.players.map(({ name }) => name);
    const players = campaign.players;

    const [allPlayers, updateAllPlayers] = useState(players.map(player => {
        return {...player}
    }));
    const [currentTab, updateCurrentTab] = useState(tabNames[0]);
    const [name, updateName] = useState(players[0].name);
    const [maxHealth, updateMaxHealth] = useState(players[0].maxHealth);
    const [ac, updateAc] = useState(players[0].ac);
    const [dexMod, updateDexMod] = useState(players[0].dexMod);
    const [conMod, updateConMod] = useState(players[0].conMod);

    const updatePlayer = (playerName, prop, value) => {
        const nextAllPlayers = [...allPlayers];
        const playerIndex = tabNames.indexOf(playerName);
        const player = nextAllPlayers[playerIndex];

        player[prop] = value;

        updateAllPlayers(allPlayers);
    }

    const onChangeTab = (tabName) => {
        const playerIndex = tabNames.indexOf(tabName);
        const player = allPlayers[playerIndex];

        updateName(player.name);
        updateMaxHealth(player.maxHealth);
        updateAc(player.ac);
        updateDexMod(player.dexMod);
        updateConMod(player.conMod);
    }

    const onValidationError = (formFieldId) => {
        const tabName = formFieldId.split('-').slice(-1);
        updateCurrentTab(tabName);
        onChangeTab(tabName);
    }

    const tabContents = () => {
        return (
            <div className='edit-players-contents'>
                <div className='edit-players-contents-top-row'>
                    <FormField
                        type='text'
                        label='Name'
                        id={`edit-players-name-${currentTab}`}
                        className='edit-players-input'
                        required={true}
                        value={name}
                        updateValue={(value) => {
                            updateName(value);
                            updatePlayer(currentTab, 'name', value);
                        }}
                    />
                </div>

                <div className='edit-players-contents-bottom-row'>
                    <div className='edit-players-contents-bottom-section'>
                        <FormField
                            type='number'
                            label='Max Health'
                            id='edit-players-max-health'
                            className='edit-players-input'
                            required={true}
                            value={maxHealth}
                            updateValue={(value) => {
                                updateMaxHealth(value);
                                updatePlayer(currentTab, 'maxHealth', value);
                            }}
                            validate={(value) => value < 5 ? "'Max Health' cannot be less than 5" : null}
                        />
                        <FormField
                            type='number'
                            label='Armor Class'
                            id='edit-players-ac'
                            className='edit-players-input'
                            required={true}
                            value={ac}
                            updateValue={(value) => {
                                updateAc(value);
                                updatePlayer(currentTab, 'ac', value);
                            }}
                            validate={(value) => value < 10 ? "'AC' cannot be less than 10" : null}
                        />
                    </div>
                    <div className='edit-players-contents-bottom-section'>
                        <FormField
                            type='number'
                            label='Con. Mod'
                            id='edit-players-con-mod'
                            className='edit-players-input'
                            required={true}
                            value={conMod}
                            updateValue={(value) => {
                                updateConMod(value);
                                updatePlayer(currentTab, 'conMod', value);
                            }}
                            validate={(value) => value < -2 ? "'Con. Mod' cannot be less than -2" : null}
                        />
                        <FormField
                            type='number'
                            label='Dex. Mod'
                            id='edit-players-dex-mod'
                            className='edit-players-input'
                            required={true}
                            value={dexMod}
                            updateValue={(value) => {
                                updateDexMod(value);
                                updatePlayer(currentTab, 'dexMod', value);
                            }}
                            validate={(value) => value < -2 ? "'Dex. Mod' cannot be less than -2" : null}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Form
            title='Edit Players'
            onSubmit={() => onUpdatePlayers(allPlayers)}
            onValidationError={onValidationError}
        >
            <Tabs 
                labels={tabNames}
                value={currentTab}
                content={tabContents}
                onChange={onChangeTab}
            />
        </Form>
    );
}

export default EditPlayersForm;
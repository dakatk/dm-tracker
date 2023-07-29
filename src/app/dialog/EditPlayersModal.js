import React, { useState } from 'react';
import  { FormField, FormFooter, validate } from './FormFields';

import Modal from '../../common/Modal';
import Tabs from '../../common/Tabs';

import './style/EditPlayersModal.scss';

function EditPlayersModal({ players, pages, onSave, onClose }) {
    const [allPlayers, updateAllPlayers] = useState(players.map(player => {
        return {...player}
    }));
    const [currentTab, updateCurrentTab] = useState(pages[0]);
    const [name, updateName] = useState(players[0].name);
    const [maxHealth, updateMaxHealth] = useState(players[0].maxHealth);
    const [ac, updateAc] = useState(players[0].ac);
    const [dexMod, updateDexMod] = useState(players[0].dexMod);
    const [conMod, updateConMod] = useState(players[0].conMod);
    const [validationErrors, updateValidationErrors] = useState({});

    const updatePlayer = (playerName, prop, value) => {
        const nextAllPlayers = [...allPlayers];
        const playerIndex = pages.indexOf(playerName);
        const player = nextAllPlayers[playerIndex];

        player[prop] = value;

        updateAllPlayers(allPlayers);
    }

    const tabContents = (tabName) => {
        return (
            <div className='edit-players-contents'>
                <div className='edit-players-contents-top-row'>
                    <FormField
                        type='text'
                        label='Name'
                        id='edit-players-name'
                        className='edit-players-input'
                        value={name}
                        updateValue={(value) => {
                            updateName(value);
                            updatePlayer(tabName, 'name', value);
                        }}
                        validationMessage={validationErrors[tabName]?.name}
                    />
                </div>

                <div className='edit-players-contents-bottom-row'>
                    <div className='edit-players-contents-bottom-section'>
                        <FormField
                            type='number'
                            label='Max Health'
                            id='edit-players-max-health'
                            className='edit-players-input'
                            value={maxHealth}
                            updateValue={(value) => {
                                updateMaxHealth(value);
                                updatePlayer(tabName, 'maxHealth', value);
                            }}
                            validationMessage={validationErrors[tabName]?.maxHealth}
                        />
                        <FormField
                            type='number'
                            label='Armor Class'
                            id='edit-players-ac'
                            className='edit-players-input'
                            value={ac}
                            updateValue={(value) => {
                                updateAc(value);
                                updatePlayer(tabName, 'ac', value);
                            }}
                            validationMessage={validationErrors[tabName]?.ac}
                        />
                    </div>
                    <div className='edit-players-contents-bottom-section'>
                        <FormField
                            type='number'
                            label='Con. Mod'
                            id='edit-players-con-mod'
                            className='edit-players-input'
                            value={conMod}
                            updateValue={(value) => {
                                updateConMod(value);
                                updatePlayer(tabName, 'conMod', value);
                            }}
                            validationMessage={validationErrors[tabName]?.conMod}
                        />
                        <FormField
                            type='number'
                            label='Dex. Mod'
                            id='edit-players-dex-mod'
                            className='edit-players-input'
                            value={dexMod}
                            updateValue={(value) => {
                                updateDexMod(value);
                                updatePlayer(tabName, 'dexMod', value);
                            }}
                            validationMessage={validationErrors[tabName]?.dexMod}
                        />
                    </div>
                </div>
            </div>
        );
    }

    const onChangeTab = (tabName) => {
        const playerIndex = pages.indexOf(tabName);
        const player = allPlayers[playerIndex];

        updateName(player.name);
        updateMaxHealth(player.maxHealth);
        updateAc(player.ac);
        updateDexMod(player.dexMod);
        updateConMod(player.conMod);
    }

    const modalContents = () => {
        return (
            <Tabs 
                labels={pages}
                value={currentTab}
                content={tabContents}
                onChange={onChangeTab}
            />
        );
    }

    const onAttemptSave = () => {
        let hasError = false;
        const allValidationErrors = {};

        for (const playerIndex in allPlayers) {
            const player = allPlayers[playerIndex];
            const tabName = pages[playerIndex];

            const nextValidationErrors = {
                ...validate(player.name, 'name', 'Name'),
                ...validate(player.maxHealth, 'maxHealth', 'Max Health'),
                ...validate(player.ac, 'ac', 'Armor Class'),
                ...validate(player.conMod, 'conMod', 'Con, Mod'),
                ...validate(player.dexMod, 'dexMod', 'Dex. Mod')
            };

            if (!nextValidationErrors.ac && player.ac < 10) {
                nextValidationErrors.ac = 'AC cannot be less than 10';
            }

            if (Object.keys(nextValidationErrors).length) {
                if (!hasError) {
                    updateCurrentTab(tabName);
                    onChangeTab(tabName);
                }
                allValidationErrors[tabName] = nextValidationErrors;
                hasError = true;
            }
        }

        if (!hasError) {
            onSave(allPlayers);
        }
        updateValidationErrors(allValidationErrors);
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
            title='Edit Players'
            close={onClose}
            contents={modalContents()}
            footer={modalFooter()}
        />
    );
}

export default EditPlayersModal;
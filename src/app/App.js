import React, { useEffect, useState } from 'react';

import blurBackground from '../util/dialog';
import { saveSession } from '../util/session';
import { saveJson, loadFromJson } from '../util/io';

import { 
    ATTACK_MODAL,
    NEW_QUEST_MODAL,
    NEW_NPC_MODAL,
    NEW_PLAYER_MODAL,
    EDIT_PLAYERS_MODAL,
    NEW_ENCOUNTER_MODAL
} from './dialog/constants';

import Dialog from './Dialog';
import MenuBar from './MenuBar';
import Players from './Players';
import Enemies from './Enemies';
import Encounter from './Encounter';
import Npcs from './Npcs';
import Quests from './Quests';

import './style/App.scss';

function App({ session }) {    
    const [players, setPlayers] = useState(session.players);
    const [encounterOptions, setEncounterOptions] = useState(session.encounterOptions)
    const [currentEncounter, setCurrentEncounter] = useState(session.encounterName);
    const [npcs, setNpcs] = useState(session.npcs);
    const [quests, setQuests] = useState(session.quests);
    const [showModal, setShowModal] = useState(null);

    // TODO Re-write?
    const updatePlayerState = (newValue, index, property) => {
        const updatedState = [...players];

        if (index === undefined) {
            for (const [i, value] of Object.entries(newValue ?? {})) {
                updatedState[i][property] = value;
            }
        } else if (Array.isArray(index)) {
            for (const [i, value] of Object.entries(index)) {
                updatedState[value][property] = newValue[i];
            }
        } else {
            updatedState[index][property] = newValue;
        }
        setPlayers(updatedState);
    }

    const updateEnemyState = (newValue, index, property) => {
        if (index === undefined) {
            return;
        }
        const updatedState = [...encounterOptions[currentEncounter]];
        updatedState[index][property] = newValue;

        setEncounterOptions({...encounterOptions, [currentEncounter]: updatedState});
    }

    const updateEncounter = (encounterName) => {
        if (!encounterName) {
            setShowModal(NEW_ENCOUNTER_MODAL);
        } else {
            setCurrentEncounter(encounterName);
        }
    }

    const updateAppState = (modalValues) => {
        switch (showModal) {
            case ATTACK_MODAL:
                for (const {index, value} of modalValues) {
                    const currHealth = players[index].health;
                    players[index].health = Math.max(0, currHealth - value);
                }
                setPlayers(players);
                break;
            case NEW_QUEST_MODAL:
                setQuests([...quests, modalValues]);
                break;
            case NEW_NPC_MODAL:
                setNpcs([...npcs, modalValues]);
                break;
            case NEW_PLAYER_MODAL:
                setPlayers([...players, modalValues]);
                break;
            case EDIT_PLAYERS_MODAL:
                setPlayers(modalValues);
                break;
            case NEW_ENCOUNTER_MODAL:
                const encounterName = modalValues.name;
                setEncounterOptions({
                    ...encounterOptions, 
                    [encounterName]: modalValues.enemies
                });
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        saveSession(players);
    }, [players]);

    useEffect(() => {
        saveSession(null, encounterOptions);
    }, [encounterOptions]);

    useEffect(() => {
        saveSession(null, null, currentEncounter);
    }, [currentEncounter]);

    useEffect(() => {
        saveSession(null, null, null, npcs);
    }, [npcs]);

    useEffect(() => {
        saveSession(null, null, null, null, quests);
    }, [quests]);

    return (
        <div id='app-parent'>
            <Dialog
                modalName={showModal}
                players={players}
                encounterOptions={encounterOptions}
                currentEncounter={currentEncounter}
                onSave={updateAppState}
                onClose={() => setShowModal(null)}
            />

            <div className={blurBackground('app-header', !!showModal)}>
                <div id='app-menu'>
                    <MenuBar
                        onSave={(fileName) => {
                                saveJson(fileName, { 
                                    players, 
                                    encounterOptions, 
                                    currentEncounter, 
                                    npcs,
                                    quests
                                });
                            }
                        }
                        onLoad={(file) => {
                                loadFromJson(file, {
                                    setPlayers,
                                    setEncounterOptions,
                                    setCurrentEncounter,
                                    setNpcs,
                                    setQuests
                                })
                            }
                        }
                        disabled={showModal}
                    />
                </div>
            </div>

            <div className={blurBackground('app-widgets', !!showModal)}>
                <div id='app-players'>
                    <Players
                        players={players}
                        updateHealth={
                            (health, index) => updatePlayerState(health, index, 'health')
                        }
                        updateInitiative={
                            (initiative, index) => updatePlayerState(initiative, index, 'initiative')
                        }
                        updateStarveDays={
                            (starveDays, index) => updatePlayerState(starveDays, index, 'starveDays')
                        }
                        onAdd={() => setShowModal(NEW_PLAYER_MODAL)}
                        onEdit={() => setShowModal(EDIT_PLAYERS_MODAL)}
                        disabled={showModal}
                    />
                </div>

                <div id='app-enemies'>
                    <Enemies
                        encounterOptions={encounterOptions}
                        currentEncounter={currentEncounter}
                        updateHealth={
                            (health, index) => updateEnemyState(health, index, 'health')
                        }
                        updateInitiative={
                            (initiative, index) => updateEnemyState(initiative, index, 'initiative')
                        }
                        onAttack={() => setShowModal(ATTACK_MODAL)}
                        disabled={showModal}
                    />
                </div>
            </div>

            <div className={blurBackground('app-widgets', !!showModal)}>
                <Encounter
                    encounterOptions={encounterOptions}
                    currentEncounter={currentEncounter}
                    selectEncounter={updateEncounter}
                    players={players}
                    disabled={showModal}
                />
            </div>

            <div className={blurBackground('app-widgets', !!showModal)} id='app-name-lists'>
                <div id='app-npcs'>
                    <Npcs
                        npcs={npcs}
                        updateNpcs={(npcs) => setNpcs(npcs)}
                        onAdd={() => setShowModal(NEW_NPC_MODAL)}
                        disabled={showModal}
                    />
                </div>
                <div id='app-quests'>
                    <Quests
                        quests={quests} 
                        updateQuests={(quests) => setQuests(quests)}
                        onAdd={() => setShowModal(NEW_QUEST_MODAL)}
                        disabled={showModal}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;

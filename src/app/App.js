import React, { useEffect, useReducer, useState } from 'react';

import { CampaignContext } from './Context';

import { blurBackground } from '../util/style';
import { saveSession } from '../util/session';
import { saveJson, loadFromJson } from '../util/io';
import { playerReducer, encounterReducer } from '../util/reducers';

import FormController from './FormController';
import MenuBar from './MenuBar';
import Players from './Players';
import Enemies from './Enemies';
import Encounter from './Encounter';
import { Npcs, Quests } from './Details';

import './style/App.scss';

function App({ session }) {
    const [players, dispatchPlayers] = useReducer(playerReducer, session.players);
    const [encounterOptions, dispatchEncounters] = useReducer(encounterReducer, session.encounterOptions)
    const [currentEncounter, setCurrentEncounter] = useState(session.encounterName);
    const [npcs, setNpcs] = useState(session.npcs);
    const [quests, setQuests] = useState(session.quests);

    const attackPlayers = (damageValues) => {
        dispatchPlayers({ type: 'damage', value: damageValues });
    }

    const addQuest = (quest) => {
        setQuests(prevState => [...prevState, quest]);
    }

    const addNpc = (npc) => {
        setNpcs(prevState => [...prevState, npc]);
    }

    const addPlayer = (player) => {
        dispatchPlayers({ type: 'add', value: player });
    }

    const updatePlayers = (updatedPlayers) => {
        dispatchPlayers({ type: 'set', value: updatedPlayers });
    }

    const addEncounter = ({ name, enemies }) => {
        dispatchEncounters({ type: 'add', value: enemies, name });
    }

    const updateEncounters = (updatedEncounters) => {
        dispatchEncounters({ type: 'set', value: updateEncounters });
    }

    useEffect(() => {
        saveSession({ players });
    }, [players]);

    useEffect(() => {
        saveSession({ encounterOptions });
    }, [encounterOptions]);

    useEffect(() => {
        saveSession({ currentEncounter });
    }, [currentEncounter]);

    useEffect(() => {
        saveSession({ npcs });
    }, [npcs]);

    useEffect(() => {
        saveSession({ quests });
    }, [quests]);

    const renderAppContents = (isFormOpen) => {
        return (
            <div id='app-parent'>
                <div className={blurBackground('app-header', isFormOpen)}>
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
                                        setPlayers: updatePlayers,
                                        setEncounterOptions: updateEncounters,
                                        setCurrentEncounter,
                                        setNpcs,
                                        setQuests
                                    })
                                }
                            }
                            disabled={isFormOpen}
                        />
                    </div>
                </div>

                <div className={blurBackground('app-widgets', isFormOpen)}>
                    <div id='app-players'>
                        <Players
                            updateHealth={
                                (health, index) => dispatchPlayers({
                                    type: 'health',
                                    value: health,
                                    index 
                                })
                            }
                            updateInitiative={
                                (initiative, index) => dispatchPlayers({ 
                                    type: 'intiative',
                                    value: initiative,
                                    index
                                })
                            }
                            updateStarveDays={
                                (starveDays, index) => dispatchPlayers({
                                    type: 'starveDays',
                                    value: starveDays,
                                    index
                                })
                            }
                            disabled={isFormOpen}
                        />
                    </div>

                    <div id='app-enemies'>
                        <Enemies
                            currentEncounter={currentEncounter}
                            updateHealth={
                                (health, index) => dispatchEncounters({
                                    type: 'health',
                                    value: health,
                                    index,
                                    currentEncounter
                                })
                            }
                            updateInitiative={
                                (initiative, index) => dispatchEncounters({
                                    type: 'initiative',
                                    value: initiative,
                                    index,
                                    currentEncounter
                                })
                            }
                            disabled={isFormOpen}
                        />
                    </div>
                </div>

                <div className={blurBackground('app-widgets', isFormOpen)}>
                    <Encounter
                        currentEncounter={currentEncounter}
                        setCurrentEncounter={setCurrentEncounter}
                        disabled={isFormOpen}
                    />
                </div>

                <div className={blurBackground('app-widgets', isFormOpen)} id='app-name-lists'>
                    <div id='app-npcs'>
                        <Npcs
                            npcs={npcs}
                            updateNpcs={setNpcs}
                            disabled={isFormOpen}
                        />
                    </div>
                    <div id='app-quests'>
                        <Quests
                            quests={quests}
                            updateQuests={setQuests}
                            disabled={isFormOpen}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CampaignContext.Provider value={{ players, npcs, quests, encounterOptions, currentEncounter }}>
            <FormController
                renderMainContents={renderAppContents}
                onAttackPlayers={attackPlayers}
                onCreateQuest={addQuest}
                onCreateNpc={addNpc}
                onCreatePlayer={addPlayer}
                onEditPlayers={updatePlayers}
                onCreateEncounter={addEncounter}
            />
        </CampaignContext.Provider>
    );
}

export default App;

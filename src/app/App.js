import React, { useEffect, useState } from 'react';
import { saveSync } from 'save-file';

import blurBackground from '../util/blurBackground';
import { saveSession } from '../util/session';

import MenuBar from './MenuBar';
import AttackModal from './AttackModal';
import Players from './Players';
import Enemies from './Enemies';
import Encounter from './Encounter';
import Npcs from './Npcs';
import Quests from './Quests';

import './style/App.scss';

function App({ session }) {    
    const [players, setPlayers] = useState(session.players);
    const [enemies, setEnemies] = useState(session.enemies);
    const [npcs, setNpcs] = useState(session.npcs);
    const [quests, setQuests] = useState(session.quests);
    
    const [encounterOptions, setEncounterOptions] = useState([]);
    const [encounterData, setEncounterData] = useState(undefined);
    const [encounterName, setEncounterName] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [autoDamage, setAutoDamage] = useState([]);

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
        enemies[encounterName][index][property] = newValue;
        setEnemies(enemies);
    }

    const loadEncounter = (name) => {
        const enemiesData = enemies[name];
        setEncounterData(enemiesData);
        setEncounterName(name);
    }

    const saveJson = (fileName) => {
        const combined = {
            players,
            enemies,
            npcs,
            quests
        };

        saveSync(JSON.stringify(combined, null, 4), fileName);
        saveSession(players, enemies, npcs, quests);
    }

    const loadFromJson = (file) => {
        file.text()
            .then(text => {
                const combined = JSON.parse(text);
                const playersJson = combined['players'] || [];
                const enemiesJson = combined['enemies'] || {};
                const npcsJson = combined['npcs'] || [];
                const questsJson = combined['quests'] || [];

                setPlayers(playersJson);
                setEnemies(enemiesJson);
                setNpcs(npcsJson);
                setQuests(questsJson);

                saveSession(playersJson, enemiesJson, npcsJson, questsJson);
            });
    }

    const damagePlayers = (attackData) => {
        const autoDamageValues = [];
        for (const attackValues of attackData) {
            if (!attackValues.damages) {
                continue;
            }

            const rawDamage = attackValues.damages.map(({ damage }) => damage);
            const playerIndex = players.findIndex(({ name }) => name === attackValues.target);

            autoDamageValues.push({
                index: playerIndex,
                value: rawDamage.reduce((a, b) => a + b, 0)
            });
        }
        setAutoDamage(autoDamageValues);
    }

    useEffect(() => {
        for (const {index, value} of autoDamage) {
            const currHealth = players[index].health;
            players[index].health = Math.max(0, currHealth - value);
        }
        setPlayers(players);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoDamage]);

    useEffect(() => {
        setEncounterOptions(Object.keys(enemies));
    }, [enemies]);

    useEffect(() => {
        saveSession(players);
    }, [players]);

    useEffect(() => {
        saveSession(null, enemies);
    }, [enemies]);

    useEffect(() => {
        saveSession(null, null, npcs);
    }, [npcs]);

    useEffect(() => {
        saveSession(null, null, null, quests);
    }, [quests]);

    return (
        <div id='app-parent'>
            {showModal && <div id='app-modal-mask'></div>}
            <div id='app-modal'>
                {showModal && encounterData && <AttackModal
                    close={() => setShowModal(false)} 
                    attack={damagePlayers}
                    playerData={players
                        .filter(({ health }) => health > 0)
                        .map(({ name, ac }) => { return { name, ac }; })
                    }
                    encounterData={encounterData} />}
            </div>

            <div className={blurBackground('app-header', showModal)}>
                <div id='app-menu'>
                    <MenuBar
                        onSave={saveJson}
                        onLoad={loadFromJson} />
                </div>
            </div>

            <div className={blurBackground('app-widgets', showModal)}>
                <div id='app-players'>
                    <Players
                        playersJson={players}
                        updateHealth={
                            (health, index) => updatePlayerState(health, index, 'health')
                        }
                        updateInitiative={
                            (initiative, index) => updatePlayerState(initiative, index, 'initiative')
                        }
                        updateStarveDays={
                            (starveDays, index) => updatePlayerState(starveDays, index, 'starveDays')
                        }
                        autoDamage={autoDamage} />
                </div>

                <div id='app-enemies'>
                    <Enemies
                        enemiesJson={encounterData}
                        updateHealth={
                            (health, index) => updateEnemyState(health, index, 'health')
                        }
                        updateInitiative={
                            (initiative, index) => updateEnemyState(initiative, index, 'initiative')
                        }
                        onAttack={() => setShowModal(true)} />
                </div>
            </div>

            <div className={blurBackground('app-widgets', showModal)}>
                <Encounter
                    encounterOptions={encounterOptions}
                    selectEncounter={loadEncounter}
                    enemies={encounterData}
                    players={players} />
            </div>

            <div className={blurBackground('app-widgets', showModal)} id='app-name-lists'>
                <div id='app-npcs'>
                    <Npcs
                        npcsJson={npcs}
                        updateNpcs={(npcs) => setNpcs(npcs)} />
                </div>
                <div id='app-quests'>
                    <Quests
                        questsJson={quests} 
                        updateQuests={(quests) => setQuests(quests)} />
                </div>
            </div>
        </div>
    );
}

export default App;

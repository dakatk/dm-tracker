import React, { useState } from "react";
import { saveSync } from "save-file";
import playersJson from "./data/players.json";
import enemiesJson from "./data/enemies.json";
import npcsJson from "./data/npcs.json";
import questsJson from "./data/quests.json";
import DataTable from "./DataTable";
import OrderedTable from "./OrderedTable";
import Selector from "./Selector";
import AttackModal from "./AttackModal";
import NameList from "./NameList";
import "./style/App.scss";

// TODO Generic styles + color theme selector?
// FIXME Update health after attacks
function App() {
    const [initiative, setInitiative] = useState(playersJson.map(value => value.initiative));
    const [encounterData, setEncounterData] = useState(undefined);
    const [encounterName, setEncounterName] = useState('');
    const [showModal, setShowModal] = useState(false);

    const encounterOptions = Object.keys(enemiesJson);

    const loadEncounter = (key) => {
        const enemiesData = enemiesJson[key];
        const defaultInitiative = playersJson
            .concat(enemiesData)
            .map(value => value.initiative);

        setInitiative(defaultInitiative);
        setEncounterData(enemiesData);
        setEncounterName(key);
    }

    const savePlayers = (health, starveDays) => {
        const updatedPlayersJson = [...playersJson];
        for (const i in updatedPlayersJson) {
            updatedPlayersJson[i].health = health[i];
            updatedPlayersJson[i].starveDays = starveDays[i];
        }
        saveSync(JSON.stringify(updatedPlayersJson, null, 4), "players.json");
    }

    const saveEnemies = (health) => {
        if (encounterName === '') {
            return;
        }
        const updatedEnemiesJson = {...enemiesJson};
        for (const i in updatedEnemiesJson[encounterName]) {
            updatedEnemiesJson[encounterName][i].health = health[i];
        }
        saveSync(JSON.stringify(updatedEnemiesJson, null, 4), "enemies.json");
    }

    const damagePlayers = (attackData) => {
        for (const attackValues of attackData) {
            if (!attackValues.damages) {
                continue;
            }

            const rawDamage = attackValues.damages.map(({ damage }) => damage);
            const player = playersJson.find(({ name }) => name === attackValues.target);

            if (player.health === 0) {
                continue;
            }

            console.log(player.health);
            player.health -= rawDamage.reduce((a, b) => a + b, 0);
            player.health = Math.max(player.health, 0);
            console.log(player.health);
            console.log(playersJson);
        }
    }

    const blurWhenModal = (className) => {
        return `${className} ${showModal ? "app-blur" : ""}`;
    } 

    return (
        <div id="app-parent">
            <div id="app-modal">
                {showModal && encounterData && <AttackModal
                    close={() => setShowModal(false)} 
                    attack={damagePlayers}
                    playerData={playersJson
                        .filter(({ health }) => health > 0)
                        .map(({ name, ac }) => { return { name, ac }; })
                    }
                    encounterData={encounterData} />}
            </div>

            <div className={blurWhenModal("app-widgets")}>
                <div id="app-players">
                    <DataTable
                        data={playersJson} 
                        initiative={initiative} 
                        setInitiative={setInitiative} 
                        canRest={true} 
                        canStarve={true} 
                        save={savePlayers} />
                </div>

                {encounterData && <div id="app-enemies">
                    <DataTable
                        data={encounterData} 
                        initiative={initiative} 
                        setInitiative={setInitiative} 
                        initiativeIndex={playersJson.length} 
                        canAttack={true} 
                        attack={() => setShowModal(true)} 
                        save={saveEnemies} />
                </div>}
            </div>

            <div className={blurWhenModal("app-widgets")}>
                <div id="app-encounter-selector">
                    {encounterOptions.length && <Selector
                        options={encounterOptions}
                        onConfirm={loadEncounter}
                    />}
                </div>

                <div id="app-ordered-table">
                    {encounterData && <OrderedTable
                        firstDataSet={playersJson}
                        secondDataSet={encounterData}
                        initiative={initiative}
                    />}
                </div>
            </div>

            <div className={blurWhenModal("app-widgets")} id="app-name-lists">
                <div id="app-npcs">
                    <NameList list={npcsJson.list} descriptorKeys={npcsJson.descriptorKeys} />
                </div>
                <div id="app-quests">
                    <NameList list={questsJson.list} descriptorKeys={questsJson.descriptorKeys} />
                </div>
            </div>
        </div>
    );
}

export default App;

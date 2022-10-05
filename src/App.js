import React, { useState } from 'react';
import playersJson from './data/players.json';
import enemiesJson from './data/enemies.json';
import DataTable from './DataTable';
import OrderedTable from './OrderedTable';
import Selector from './Selector';
import Modal from './Modal';
import './App.css';

function App() {
    const [initiative, setInitiative] = useState(playersJson.map(value => value.initiative));
    const [encounterData, setEncounter] = useState(undefined);
    const [showModal, setShowModal] = useState(false);

    const encounterOptions = Object.keys(enemiesJson);

    function loadEncounter(key) {
        const enemiesData = enemiesJson[key];
        const defaultInitiative = playersJson
            .concat(enemiesData)
            .map(value => value.initiative);

        setInitiative(defaultInitiative);
        setEncounter(enemiesData);
    }

    return (
        <div id="app-parent">
            <div id="app-modal">
                <Modal 
                    show={showModal} 
                    close={() => setShowModal(false)} />
            </div>

            <div className="app-widgets">
                <div id="app-players">
                    <DataTable
                        data={playersJson} 
                        initiative={initiative} 
                        setInitiative={setInitiative} 
                        canRest={true} 
                        canStarve={true} 
                        fileName={'players.json'} />
                </div>

                {encounterData && <div id="app-enemies">
                    <DataTable
                        data={encounterData} 
                        initiative={initiative} 
                        setInitiative={setInitiative} 
                        initiativeIndex={playersJson.length} 
                        canAttack={true} 
                        attack={() => {/*setShowModal(true)*/}} 
                        fileName={'enemies.json'} />
                </div>}
            </div>

            <div className="app-widgets">
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
        </div>
    );
}

export default App;

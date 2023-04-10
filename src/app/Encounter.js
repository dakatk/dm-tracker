import React from 'react';

import Selector from '../common/Selector';
import OrderedTable from '../common/OrderedTable';

import './style/Encounter.scss';

function Encounter({ encounterOptions, selectEncounter, enemies, players }) {
    const initiative = () => {
        let playerInitiative = [];
        let enemyInitiative = [];

        if (players?.length) {
            playerInitiative = players.map(({ initiative }) => initiative);
        }
        if (enemies?.length) {
            enemyInitiative = enemies.map(({ initiative }) => initiative);
        }
        return [...playerInitiative, ...enemyInitiative]
    }

    return <>
        <div id='encounter-selector'>
            {encounterOptions?.length && <Selector
                options={encounterOptions}
                onConfirm={selectEncounter}
            />}
        </div>

        <div id='encounter-ordered-table'>
            {players?.length && enemies?.length && <OrderedTable
                firstDataSet={players}
                secondDataSet={enemies}
                initiative={initiative()}
            />}
        </div>
    </>
}

export default Encounter;
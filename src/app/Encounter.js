import React from 'react';

import Selector from '../common/Selector';
import OrderedTable from '../common/OrderedTable';

function Encounter({ encounterOptions, selectEncounter, enemies, players }) {
    const playerInitiative = players.map(({ initiative }) => initiative);
    const enemyInitiative = enemies.map(({ initiative }) => initiative);

    const initiative = [...playerInitiative, ...enemyInitiative];

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
                initiative={initiative}
            />}
        </div>
    </>
}

export default Encounter;
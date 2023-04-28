import React, { useEffect, useState } from 'react';

import Selector from '../common/Selector';
import OrderedTable from '../common/OrderedTable';

import './style/Encounter.scss';

function Encounter({ encounterOptions, currentEncounter, selectEncounter, players, disabled }) {
    const defaultEncounterNames = Object.keys(encounterOptions);
    const [encounterNames, setEncounterNames] = useState(defaultEncounterNames);

    const initiative = () => {
        let playerInitiative = [];
        let enemyInitiative = [];

        const enemies = encounterOptions[currentEncounter];

        if (players?.length) {
            playerInitiative = players.map(({ initiative }) => initiative);
        }
        if (enemies?.length) {
            enemyInitiative = enemies.map(({ initiative }) => initiative);
        }
        return [...playerInitiative, ...enemyInitiative]
    }

    useEffect(() => {
        setEncounterNames(defaultEncounterNames);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [encounterOptions]);

    if (players?.length) {
        return (
            <>
                <div id='encounter-selector'>
                    <Selector
                        options={encounterNames}
                        currentSelection={currentEncounter}
                        onConfirm={selectEncounter}
                        disabled={disabled}
                    />
                </div>

                <div id='encounter-ordered-table'>
                    {(currentEncounter in encounterOptions) && <OrderedTable
                        firstDataSet={players}
                        secondDataSet={encounterOptions[currentEncounter]}
                        initiative={initiative()}
                    />}
                </div>
            </>
        );
    }
}

export default Encounter;

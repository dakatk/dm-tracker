import React from 'react';
import DataTable from '../common/DataTable';

function Enemies({ encounterOptions, currentEncounter, updateHealth, updateInitiative, onAttack }) {
    if (currentEncounter in encounterOptions) {
        return <DataTable
            data={encounterOptions[currentEncounter]}
            updateInitiative={updateInitiative}
            updateHealth={updateHealth}
            canAttack={true}
            attack={onAttack} />
    }
}

export default Enemies;
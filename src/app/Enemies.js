import React from 'react';
import DataTable from '../common/DataTable';

function Enemies({ enemiesJson, updateHealth, updateInitiative, onAttack }) {
    return <DataTable
        data={enemiesJson}
        updateInitiative={updateInitiative}
        updateHealth={updateHealth}
        canAttack={true}
        attack={onAttack} />
}

export default Enemies;
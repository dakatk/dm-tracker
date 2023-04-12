import React from 'react';
import DataTable from '../common/DataTable';

function Players({ players, updateHealth, updateInitiative, updateStarveDays, autoDamage }) {
    if (players?.length) {
        return <DataTable
            data={players}
            updateInitiative={updateInitiative}
            updateHealth={updateHealth}
            updateStarveDays={updateStarveDays}
            canRest={true}
            canStarve={true}
            autoDamage={autoDamage} />
    }
}

export default Players;
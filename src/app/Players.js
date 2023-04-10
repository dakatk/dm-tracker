import React from 'react';
import DataTable from '../common/DataTable';

function Players({ playersJson, updateHealth, updateInitiative, updateStarveDays, autoDamage }) {
    if (playersJson?.length) {
        return <DataTable
            data={playersJson}
            updateInitiative={updateInitiative}
            updateHealth={updateHealth}
            updateStarveDays={updateStarveDays}
            canRest={true}
            canStarve={true}
            autoDamage={autoDamage} />
    }
}

export default Players;
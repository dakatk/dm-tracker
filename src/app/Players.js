import React from 'react';

import DataTable from '../common/DataTable';

function Players({ players, updateHealth, updateInitiative, updateStarveDays, onAdd, onEdit }) {
    if (players?.length) {
        return (
            <DataTable
                data={players}
                updateInitiative={updateInitiative}
                updateHealth={updateHealth}
                updateStarveDays={updateStarveDays}
                canRest={true}
                canStarve={true}
                canAdd={true}
                onAdd={onAdd}
                canEdit={true}
                onEdit={onEdit}
            />
        );
    }
}

export default Players;

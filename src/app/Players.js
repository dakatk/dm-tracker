import React, { useContext } from 'react';

import { CampaignContext, FormContext } from './Context';

import DataTable from '../common/DataTable';

function Players({ updateHealth, updateInitiative, updateStarveDays, disabled }) {
    const campaign = useContext(CampaignContext);
    const form = useContext(FormContext);

    const onAdd = () => {
        form.openNewPlayerForm();
    }

    const onEdit = () => {
        form.openEditPlayersForm();
    }
    
    if (campaign.players?.length) {
        return (
            <DataTable
                data={campaign.players}
                updateInitiative={updateInitiative}
                updateHealth={updateHealth}
                updateStarveDays={updateStarveDays}
                canRest={true}
                canStarve={true}
                canAdd={true}
                onAdd={onAdd}
                canEdit={true}
                onEdit={onEdit}
                disabled={disabled}
            />
        );
    }
}

export default Players;

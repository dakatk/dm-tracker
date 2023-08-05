import React, { useContext } from 'react';

import { CampaignContext, FormContext } from './Context';

import DataTable from '../common/DataTable';

function Enemies({ currentEncounter, updateHealth, updateInitiative, disabled }) {
    const campaign = useContext(CampaignContext);
    const form = useContext(FormContext);

    const onAttack = () => {
        form.openAttackForm();
    }
    
    if (campaign.encounterOptions && (currentEncounter in campaign.encounterOptions)) {
        return (
            <DataTable
                data={campaign.encounterOptions[currentEncounter]}
                updateInitiative={updateInitiative}
                updateHealth={updateHealth}
                canAttack={true}
                onAttack={onAttack}
                disabled={disabled}
            />
        );
    }
}

export default Enemies;

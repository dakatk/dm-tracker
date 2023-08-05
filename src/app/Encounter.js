import React, { useContext } from 'react';

import { CampaignContext, FormContext } from './Context';

import Selector from '../common/Selector';
import OrderedTable from '../common/OrderedTable';

import './style/Encounter.scss';

function Encounter({ currentEncounter, setCurrentEncounter, disabled }) {
    const campaign = useContext(CampaignContext);
    const form = useContext(FormContext);

    const encounterOptions = campaign.encounterOptions || {};
    const encounterNames = Object.keys(encounterOptions);

    const initiative = () => {
        let playerInitiative = [];
        let enemyInitiative = [];

        const enemies = encounterOptions[currentEncounter];

        if (campaign.players?.length) {
            playerInitiative = campaign.players.map(({ initiative }) => initiative);
        }
        if (enemies?.length) {
            enemyInitiative = enemies.map(({ initiative }) => initiative);
        }
        return [...playerInitiative, ...enemyInitiative]
    }

    const selectEncounter = (encounterName) => {
        if (!encounterName) {
            form.openNewEncounterForm();
        } else {
            setCurrentEncounter(encounterName);
        }
    }

    if (campaign.players?.length) {
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
                        firstDataSet={campaign.players}
                        secondDataSet={encounterOptions[currentEncounter]}
                        initiative={initiative()}
                    />}
                </div>
            </>
        );
    }
}

export default Encounter;

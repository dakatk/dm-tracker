import React from 'react';

import AttackModal from './dialog/AttackModal';
import EditPlayersModal from './dialog/EditPlayersModal';
import NewEncounterModal from './dialog/NewEncounterModal';
import NewNpcModal from './dialog/NewNpcModal';
import NewPlayerModal from './dialog/NewPlayerModal';
import NewQuestModal from './dialog/NewQuestModal';

import { 
    ATTACK_MODAL,
    EDIT_PLAYERS_MODAL,
    NEW_ENCOUNTER_MODAL,
    NEW_NPC_MODAL,
    NEW_PLAYER_MODAL,
    NEW_QUEST_MODAL,
    isModal
} from './dialog/constants';


function Dialog({ modalName, players, encounterOptions, currentEncounter, onSave, onClose }) {
    const damagePlayers = (attackData) => {
        const autoDamageValues = [];
        for (const attackValues of attackData) {
            if (!attackValues.damages) {
                continue;
            }

            const rawDamage = attackValues.damages.map(({ damage }) => damage);
            const playerIndex = players.findIndex(({ name }) => name === attackValues.target);

            autoDamageValues.push({
                index: playerIndex,
                value: rawDamage.reduce((a, b) => a + b, 0)
            });
        }
        onSave(autoDamageValues);
    }

    const renderSSelectedModal = () => {
        switch (modalName) {
            case ATTACK_MODAL: 
                return (
                    <AttackModal
                        encounterOptions={encounterOptions}
                        currentEncounter={currentEncounter}
                        onClose={onClose}
                        onAttack={damagePlayers}
                        playerData={players
                            .filter(({ health }) => health > 0)
                            .map(({ name, ac }) => { return { name, ac }; })
                        }
                    />
                );
            
            case EDIT_PLAYERS_MODAL: 
                return (
                    <EditPlayersModal
                        onSave={onSave}
                        onClose={onClose}
                        pages={players.map(({ name }) => name)}
                        players={players}
                    />
                );
            
            case NEW_ENCOUNTER_MODAL: 
                return (
                    <NewEncounterModal
                        onSave={onSave}
                        onClose={onClose}
                    />
                );
            
            case NEW_NPC_MODAL: 
                return (
                    <NewNpcModal
                        onSave={onSave}
                        onClose={onClose}
                    />
                );
            
            case NEW_PLAYER_MODAL: 
                return (
                    <NewPlayerModal
                        onSave={onSave}
                        onClose={onClose}
                    />
                );
            
            case NEW_QUEST_MODAL: 
                return (
                    <NewQuestModal
                        onSave={onSave}
                        onClose={onClose}
                    />
                );
            
            default: 
                break;
        }
    }

    if (isModal(modalName)) {
        return (
            <>
                {<div id='dialog-modal-mask'></div>}
                <div id='dialog-modal'>
                    {renderSSelectedModal()}
                </div>
            </>
        );
    }
}

export default Dialog;

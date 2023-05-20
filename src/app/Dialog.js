import React from 'react';

import AttackModal from './dialog/AttackModal';
import FormFieldModal from './dialog/FormFieldModal';

import QuestCreateForm from './dialog/forms/QuestCreateForm.json';
import NpcCreateForm from './dialog/forms/NpcCreateForm.json';
import EditPlayersForm from './dialog/forms/EditPlayersForm.json';

import { 
    ATTACK_MODAL,
    NEW_QUEST_MODAL,
    NEW_NPC_MODAL,
    NEW_PLAYER_MODAL,
    EDIT_PLAYERS_MODAL,
    NEW_ENCOUNTER_MODAL,
    isModal
} from './dialog/constants';
import FormPageModal from './dialog/FormPageModal';

const modalForms = {
    [NEW_QUEST_MODAL]: QuestCreateForm,
    [NEW_NPC_MODAL]: NpcCreateForm,
    [NEW_PLAYER_MODAL]: null,
    [EDIT_PLAYERS_MODAL]: EditPlayersForm,
    [NEW_ENCOUNTER_MODAL]: null
};

const pageModals = [
    EDIT_PLAYERS_MODAL,
    NEW_ENCOUNTER_MODAL
]

function Dialog({ modalName, players, encounterOptions, currentEncounter, onSave, onClose }) {
    const formPages = () => {
        switch (modalName) {
            case EDIT_PLAYERS_MODAL:
                return players.map(({ name }) => name);
            case NEW_ENCOUNTER_MODAL:
                return ['Enemies', 'Attacks'];
            default:
                break;
        }
    }

    const formDefaultValues = () => {
        switch (modalName) {
            case EDIT_PLAYERS_MODAL:
                const playerFormValues = {};
                for(const player of players) {
                    playerFormValues[player.name] = player;
                }
                return playerFormValues;
            default:
                break;
        }
    }

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

    const renderSelectedModal = () => {
        if (modalName === ATTACK_MODAL) {
            return (
                <AttackModal
                    encounterOptions={encounterOptions}
                    currentEncounter={currentEncounter}
                    close={onClose}
                    attack={damagePlayers}
                    playerData={players
                        .filter(({ health }) => health > 0)
                        .map(({ name, ac }) => { return { name, ac }; })
                    }
                />
            );
        } else if (pageModals.includes(modalName)) {
            return (
                <FormPageModal
                    form={modalForms[modalName]}
                    save={onSave}
                    close={onClose}
                    defaultValues={formDefaultValues()}
                    pages={formPages()}
                />
            );
        } else {
            return (
                <FormFieldModal
                    form={modalForms[modalName]}
                    save={onSave}
                    close={onClose}
                    defaultValues={formDefaultValues()}
                />
            );
        }
    }

    if (isModal(modalName)) {
        return (
            <>
                {<div id='dialog-modal-mask'></div>}
                <div id='dialog-modal'>
                    {renderSelectedModal()}
                </div>
            </>
        );
    }
}

export default Dialog;

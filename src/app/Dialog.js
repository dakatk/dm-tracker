import React from 'react';

import AttackModal from './dialog/AttackModal';
import FormFieldModal from './dialog/FormFieldModal';

import QuestCreateForm from './dialog/QuestCreateForm.json';
import NpcCreateForm from './dialog/NpcCreateForm.json';

const ATTACK_MODAL = 'attack';
const NEW_QUEST_MODAL = 'new-quest';
const NEW_NPC_MODAL = 'new-npc';
const NEW_PLAYER_MODAL = 'new-player';
const EDIT_PLAYERS_MODAL = 'edit-players';
const NEW_ENCOUNTER_MODAL = 'new-encounter';

const modalOptions = [
    ATTACK_MODAL,
    NEW_QUEST_MODAL,
    NEW_NPC_MODAL,
    NEW_PLAYER_MODAL,
    EDIT_PLAYERS_MODAL,
    NEW_ENCOUNTER_MODAL
];

const modalForms = {
    [NEW_QUEST_MODAL]: QuestCreateForm,
    [NEW_NPC_MODAL]: NpcCreateForm
};

export {
    ATTACK_MODAL,
    NEW_QUEST_MODAL,
    NEW_NPC_MODAL,
    NEW_PLAYER_MODAL,
    EDIT_PLAYERS_MODAL,
    NEW_ENCOUNTER_MODAL
}

function Dialog({ modalName, players, encounterOptions, currentEncounter, onSave, onClose }) {
    const isAttackModal = () => modalName === ATTACK_MODAL;
    const isFormFieldModal = () => modalName in modalForms;

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

    if (modalOptions.includes(modalName)) {
        return (
            <>
                {<div id='dialog-modal-mask'></div>}
                <div id='dialog-modal'>
                    {isAttackModal() && <AttackModal
                        encounterOptions={encounterOptions}
                        currentEncounter={currentEncounter}
                        close={onClose}
                        attack={damagePlayers}
                        playerData={players
                            .filter(({ health }) => health > 0)
                            .map(({ name, ac }) => { return { name, ac }; })
                        } />}
                    {isFormFieldModal() && <FormFieldModal
                        form={modalForms[modalName]}
                        save={onSave}
                        close={onClose}
                    />}
                </div>
            </>
        );
    }
}

export default Dialog;

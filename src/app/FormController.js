import { useState } from 'react';

import { FormContext } from './Context';

import AttackForm from './forms/AttackForm';
import EditPlayersForm from './forms/EditPlayersForm';
import NewEncounterForm from './forms/NewEncounterForm';
import NewNpcForm from './forms/NewNpcForm';
import NewPlayerForm from './forms/NewPlayerForm';
import NewQuestForm from './forms/NewQuestForm';

const ATTACK_FORM = 'attack';
const NEW_QUEST_FORM = 'new-quest';
const NEW_NPC_FORM = 'new-npc';
const NEW_PLAYER_FORM = 'new-player';
const EDIT_PLAYERS_FORM = 'edit-players';
const NEW_ENCOUNTER_FORM = 'new-encounter';

function FormController({ renderMainContents, onAttackPlayers, onCreateQuest, onCreateNpc, onCreatePlayer, onUpdatePlayers, onCreateEncounter }) {
    const [formId, setFormId] = useState(null);
    const [validationErrors, updateValidationErrors] = useState({});

    const formOptions = {
        [ATTACK_FORM]: <AttackForm onAttackPlayers={onAttackPlayers} />,
        [EDIT_PLAYERS_FORM]: <EditPlayersForm onUpdatePlayers={onUpdatePlayers} />,
        [NEW_ENCOUNTER_FORM]: <NewEncounterForm onCreateEncounter={onCreateEncounter} />,
        [NEW_NPC_FORM]: <NewNpcForm onCreateNpc={onCreateNpc} />,
        [NEW_PLAYER_FORM]: <NewPlayerForm onCreatePlayer={onCreatePlayer} />,
        [NEW_QUEST_FORM]: <NewQuestForm onCreateQuest={onCreateQuest} />
    };

    return (
        <FormContext.Provider value={{
            formId,
            validationErrors,
            updateValidationErrors,
            closeForm: () => setFormId(null),
            openAttackForm: () => setFormId(ATTACK_FORM),
            openNewQuestForm: () => setFormId(NEW_QUEST_FORM),
            openNewNpcForm: () => setFormId(NEW_NPC_FORM),
            openNewPlayerForm: () => setFormId(NEW_PLAYER_FORM),
            openEditPlayersForm: () => setFormId(EDIT_PLAYERS_FORM),
            openNewEncounterForm: () => setFormId(NEW_ENCOUNTER_FORM)
        }}>
            {formId !== null && <>
                {<div id='dialog-form-mask'></div>}
                <div id='dialog-form'>
                    {formOptions[formId]}
                </div>
            </>}
            {renderMainContents(formId !== null)}
        </FormContext.Provider>
    )
}

export default FormController;
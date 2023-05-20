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

const isModal = (modalName) => {
    return modalOptions.includes(modalName);
}

export {
    ATTACK_MODAL,
    NEW_QUEST_MODAL,
    NEW_NPC_MODAL,
    NEW_PLAYER_MODAL,
    EDIT_PLAYERS_MODAL,
    NEW_ENCOUNTER_MODAL,
    isModal
}
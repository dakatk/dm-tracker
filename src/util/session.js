export const saveSession = (players, enemies, npcs, quests) => {
    if (players !== null && players !== undefined) {
        localStorage.setItem('PLAYERS_JSON', JSON.stringify(players));
    }

    if (enemies !== null && enemies !== undefined) {
        localStorage.setItem('ENEMIES_JSON', JSON.stringify(enemies));
    }

    if (npcs !== null && npcs !== undefined) {
        localStorage.setItem('NPCS_JSON', JSON.stringify(npcs));
    }

    if (quests !== null && quests !== undefined) {
        localStorage.setItem('QUESTS_JSON', JSON.stringify(quests));
    }
}

export const loadFromSession = () => {
    const playersJson = localStorage.getItem('PLAYERS_JSON');
    const enemiesJson = localStorage.getItem('ENEMIES_JSON');
    const npcsJson = localStorage.getItem('NPCS_JSON');
    const questsJson = localStorage.getItem('QUESTS_JSON');

    let players = [];
    let enemies = {};
    let npcs = [];
    let quests = [];

    if (playersJson !== null) {
        players = JSON.parse(playersJson);
    }

    if (enemiesJson !== null) {
        enemies = JSON.parse(enemiesJson);
    }

    if (npcsJson !== null) {
        npcs = JSON.parse(npcsJson);
    }

    if (questsJson !== null) {
        quests = JSON.parse(questsJson);
    }

    return {
        players,
        enemies,
        npcs,
        quests
    };
}
export const saveSession = (players, encounterOptions, currentEncounter, npcs, quests) => {    
    if (players !== null && players !== undefined) {
        localStorage.setItem('PLAYERS_JSON', JSON.stringify(players));
    }

    if (encounterOptions !== null && encounterOptions !== undefined) {
        localStorage.setItem('ENCOUNTER_OPTIONS_JSON', JSON.stringify(encounterOptions));
    }

    if (currentEncounter !== null && currentEncounter !== undefined) {
        localStorage.setItem('CURRENT_ENCOUNTER', currentEncounter);
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
    const encounterOptionsJson = localStorage.getItem('ENCOUNTER_OPTIONS_JSON');
    const currentEncounterJson = localStorage.getItem('CURRENT_ENCOUNTER_JSON');
    const npcsJson = localStorage.getItem('NPCS_JSON');
    const questsJson = localStorage.getItem('QUESTS_JSON');

    let players = [];
    let encounterOptions = {};
    let currentEncounter = '';
    let npcs = [];
    let quests = [];

    if (playersJson !== null) {
        players = JSON.parse(playersJson);
    }

    if (encounterOptionsJson !== null) {
        encounterOptions = JSON.parse(encounterOptionsJson);
    }

    if (currentEncounterJson !== null) {
        currentEncounter = currentEncounterJson;
    }

    if (npcsJson !== null) {
        npcs = JSON.parse(npcsJson);
    }

    if (questsJson !== null) {
        quests = JSON.parse(questsJson);
    }

    return {
        players,
        encounterOptions,
        currentEncounter,
        npcs,
        quests
    };
}
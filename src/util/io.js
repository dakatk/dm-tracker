import { saveSync } from 'save-file';
import { saveSession } from './session';

const saveJson = (fileName, { players, encounterOptions, currentEncounter, npcs, quests }) => {
    const combined = {
        players,
        encounterOptions,
        currentEncounter,
        npcs,
        quests
    };

    saveSync(JSON.stringify(combined, null, 4), fileName);
    saveSession(players, encounterOptions, currentEncounter, npcs, quests);
}

const loadFromJson = (file, { setPlayers, setEncounterOptions, setCurrentEncounter, setNpcs, setQuests }) => {
    file.text()
        .then(text => {
            const combined = JSON.parse(text);
            const playersJson = combined['players'] || [];
            const encounterOptionsJson = combined['encounterOptions'] || {};
            const currentEncounterJson = combined['currentEncounter'] || '';
            const npcsJson = combined['npcs'] || [];
            const questsJson = combined['quests'] || [];

            setPlayers?.call && setPlayers(playersJson);
            setEncounterOptions?.call && setEncounterOptions(encounterOptionsJson);
            setCurrentEncounter?.call && setCurrentEncounter(currentEncounterJson);
            setNpcs?.call && setNpcs(npcsJson);
            setQuests?.call && setQuests(questsJson);

            saveSession(playersJson, encounterOptionsJson, currentEncounterJson, npcsJson, questsJson);
        });
}

export { saveJson, loadFromJson }
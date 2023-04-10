import React from 'react';
import NameList from '../common/NameList';

function Quests({ questsJson, updateQuests }) {
    const descriptorKeys = ['type', 'reward', 'description'];

    const addNpc = (newNpc) => {
        const updatedQuests = [...questsJson, newNpc];
        updateQuests(updatedQuests);
    }

    const removeNpc = (index) => {
        const updatedQuests = [...questsJson];
        updatedQuests.splice(index, 1);
        updateQuests(updatedQuests);
    }

    if (questsJson?.length) {
        return <NameList 
            list={questsJson} 
            descriptorKeys={descriptorKeys}
            onAdd={addNpc} 
            onRemove={removeNpc} />
    }
}

export default Quests;
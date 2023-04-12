import React from 'react';
import NameList from '../common/NameList';

function Quests({ quests, updateQuests }) {
    const descriptorKeys = ['type', 'reward', 'description'];

    const addNpc = (newNpc) => {
        const updatedQuests = [...quests, newNpc];
        updateQuests(updatedQuests);
    }

    const removeNpc = (index) => {
        const updatedQuests = [...quests];
        updatedQuests.splice(index, 1);
        updateQuests(updatedQuests);
    }

    if (quests?.length) {
        return <NameList 
            list={quests} 
            descriptorKeys={descriptorKeys}
            onAdd={addNpc} 
            onRemove={removeNpc} />
    }
}

export default Quests;
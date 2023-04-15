import React from 'react';

import NameList from '../common/NameList';

function Quests({ quests, updateQuests, onAdd }) {
    const descriptorKeys = ['type', 'reward', 'description'];

    const removeNpc = (index) => {
        const updatedQuests = [...quests];
        updatedQuests.splice(index, 1);
        updateQuests(updatedQuests);
    }

    if (quests?.length) {
        return (
            <NameList 
                list={quests} 
                descriptorKeys={descriptorKeys}
                onAdd={onAdd}
                onRemove={removeNpc} 
            />
        );
    }
}

export default Quests;

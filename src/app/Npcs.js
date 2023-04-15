import React from 'react';
import NameList from '../common/NameList';

function Npcs({ npcs, updateNpcs, onAdd }) {
    const descriptorKeys = ['type', 'occupation', 'description'];

    const removeNpc = (index) => {
        const updatedNpcs = [...npcs];
        updatedNpcs.splice(index, 1);
        updateNpcs(updatedNpcs);
    }

    if (npcs?.length) {
        return (
            <NameList 
                list={npcs} 
                descriptorKeys={descriptorKeys} 
                onAdd={onAdd} 
                onRemove={removeNpc}
            />
        );
    }
}

export default Npcs;

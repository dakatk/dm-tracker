import React from 'react';
import NameList from '../common/NameList';

function Npcs({ npcs, updateNpcs }) {
    const descriptorKeys = ['type', 'occupation', 'description'];

    const addNpc = (newNpc) => {
        const updatedNpcs = [...npcs, newNpc];
        updateNpcs(updatedNpcs);
    }

    const removeNpc = (index) => {
        const updatedNpcs = [...npcs];
        updatedNpcs.splice(index, 1);
        updateNpcs(updatedNpcs);
    }

    if (npcs?.length) {
        return <NameList 
            list={npcs} 
            descriptorKeys={descriptorKeys} 
            onAdd={addNpc} 
            onRemove={removeNpc} />
    }
}

export default Npcs;
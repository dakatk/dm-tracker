import React from 'react';
import NameList from '../common/NameList';

function Npcs({ npcsJson, updateNpcs }) {
    const descriptorKeys = ['type', 'occupation', 'description'];

    const addNpc = (newNpc) => {
        const updatedNpcs = [...npcsJson, newNpc];
        updateNpcs(updatedNpcs);
    }

    const removeNpc = (index) => {
        const updatedNpcs = [...npcsJson];
        updatedNpcs.splice(index, 1);
        updateNpcs(updatedNpcs);
    }

    if (npcsJson?.length) {
        return <NameList 
            list={npcsJson} 
            descriptorKeys={descriptorKeys} 
            onAdd={addNpc} 
            onRemove={removeNpc} />
    }
}

export default Npcs;
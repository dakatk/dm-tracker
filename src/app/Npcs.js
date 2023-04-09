import React from 'react';
import NameList from '../common/NameList';

function Npcs({ npcsJson }) {
    const descriptorKeys = ['type', 'occupation', 'description'];
    return <NameList list={npcsJson} descriptorKeys={descriptorKeys} />
}

export default Npcs;
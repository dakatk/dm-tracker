import React from 'react';
import NameList from '../common/NameList';

function Quests({ questsJson }) {
    const descriptorKeys = ['type', 'reward', 'description'];
    return <NameList list={questsJson} descriptorKeys={descriptorKeys} />
}

export default Quests;
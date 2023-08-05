import React, { useContext } from 'react';

import { FormContext } from './Context';

import NameList from '../common/NameList';

function Details({ descriptorKeys, values, updateValues, onAdd, disabled }) {    
    const onRemoveValue = (index) => {
        updateValues(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(index, 1);
            return updatedState;
        });
    }

    if (values?.length) {
        return (
            <NameList
                list={values}
                descriptorKeys={descriptorKeys}
                onAdd={onAdd}
                onRemove={onRemoveValue}
                disabled={disabled}
            />
        );
    }
}

export function Npcs({ npcs, updateNpcs, disabled }) {
    const form = useContext(FormContext);

    return (
        <Details
            descriptorKeys={['type', 'occupation', 'description']}
            values={npcs}
            updateValues={updateNpcs}
            onAdd={form.openNewNpcForm}
            disabled={disabled}
        />
    );
}

export function Quests({ quests, updateQuests, disabled }) {
    const form = useContext(FormContext);

    return (
        <Details
            descriptorKeys={['type', 'reward', 'description']}
            values={quests}
            updateValues={updateQuests}
            onAdd={form.openNewQuestForm}
            disabled={disabled}
        />
    );
}

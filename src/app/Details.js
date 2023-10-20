import React, { useContext } from 'react';

import { FormContext } from './Context';

import NameList from '../common/NameList';

function Details({ descriptorKeys, values, updateValues, disabled, onAdd, onEdit }) {    
    const onRemoveValue = (index) => {
        updateValues(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(index, 1);
            return updatedState;
        });
    }

    const onEditValue = (index) => {
        onEdit(values[index]);
    }

    if (values?.length) {
        return (
            <NameList
                list={values}
                descriptorKeys={descriptorKeys}
                onAdd={onAdd}
                disabled={disabled}
                onEdit={onEditValue}
                onRemove={onRemoveValue}
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
            onEdit={() => {}} // TODO form.openNpcForm
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
            onEdit={() => {}} // TODO form.openQuestForm
            disabled={disabled}
        />
    );
}

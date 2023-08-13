const arrayActions = {
    add: (state, { value }) => [...state, value],
    remove: (state, { value }) => state.filter(element => element !== value),
    fill: (state, { value }) => [...state].fill(value),
    setAt: (state, { value, index }) => {
        const updatedState = [...state];
        updatedState[index] = value;
        return updatedState;
    } 
};

const arrayReducer = (state, action) => {
    if (action.type in arrayActions) {
        return arrayActions[action.type](state, action);
    } else {
        return action.value;
    }
}

const objectActions = {
    remove: (state, { name }) => {
        const updatedState = [...state];
        delete updatedState[name];
        return updatedState;
    },
    setAt: (state, { name, value }) => {
        return { ...state, [name]: value };
    }
};

const objectReducer = (state, action) => {
    if (action.type in objectActions) {
        return objectActions[action.type](state, action);
    } else {
        return action.value;
    }
}

const playerActions = {
    set: (_, { value }) => value,
    add: (state, { value }) => arrayActions.add(state, { value }),
    damage: (state, { value }) => {
        const updatedState = [...state];
        for (const { index, damageValue } of value) {
            const currHealth = updatedState[index].health;
            updatedState[index].health = Math.max(0, currHealth - damageValue);
        }
        return updatedState;
    },
    updateProp: (state, { type, index, value }) => {
        const updatedState = [...state];
        
        if (index === undefined) {
            for (const [i, valueAt] of Object.entries(value ?? {})) {
                updatedState[i][type] = valueAt;
            }
        } else if (Array.isArray(index)) {
            for (const [i, valueAt] of Object.entries(index)) {
                updatedState[valueAt][type] = valueAt[i];
            }
        } else {
            updatedState[index][type] = value;
        }
        return updatedState;
    }
};

const playerReducer = (state, action) => {
    if (action.type in playerActions) {
        return playerActions[action.type](state, action);
    } else {
        return playerActions.updateProp(state, action);
    }
}

const encounterActions = {
    set: (_, value) => value,
    add: (state, { name, value }) => objectActions.setAt(state, { name, value }),
    updateProp: (state, { type, index, value, currentEncounter }) => {
        if (index === undefined) {
            return state;
        }
        const updatedEncounter = [...state[currentEncounter]];
        updatedEncounter[index][type] = value;

        return {
            ...state,
            [currentEncounter]: updatedEncounter
        }
    }
};

const encounterReducer = (state, action) => {
    if (action.type in encounterActions) {
        return encounterActions[action.type](state, action);
    } else {
        return encounterActions.updateProp(state, action);
    }
}

export {
    arrayReducer,
    objectReducer,
    playerReducer,
    encounterReducer
}
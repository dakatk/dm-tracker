export const baseReducer = (_, { value }) => {
    return value;
}

export const arrayAddReducer = (state, { value }) => {
    return [...state, value];
}

export const arrayRemoveReducer = (state, { value }) => {
    return state.filter(element => element !== value);
}

const arrayActions = {
    add: (state, action) => arrayAddReducer(state, action),
    remove: (state, action) => arrayRemoveReducer(state, action)
};

export const arrayReducer = (state, action) => {
    if (action.type in arrayActions) {
        return arrayActions[action.type](state, action);
    } else {
        return action.value;
    }
}

export const objectAddReducer = (state, { name, value }) => {
    return { ...state, [name]: value }
}

export const objectRemoveReducer = (state, { name }) => {
    const updatedState = [...state];
    delete updatedState[name];
    return updatedState;
}

const objectActions = {
    add: (state, action) => arrayAddReducer(state, action),
    remove: (state, action) => arrayRemoveReducer(state, action)
};

export const objectReducer = (state, action) => {
    if (action.type in objectActions) {
        return objectActions[action.type](state, action);
    } else {
        return action.value;
    }
}

const playerActions = {
    set: (state, action) => baseReducer(state, action),
    add: (state, action) => arrayAddReducer(state, action),
    damage: (state, action) => {
        const updatedState = [...state];
        for (const {index, value} of action.value) {
            const currHealth = updatedState[index].health;
            updatedState[index].health = Math.max(0, currHealth - value);
        }
        return updatedState;
    },
    updateProp: (state, action) => {
        const updatedState = [...state];
        
        if (action.index === undefined) {
            for (const [i, value] of Object.entries(action.value ?? {})) {
                updatedState[i][action.type] = value;
            }
        } else if (Array.isArray(action.index)) {
            for (const [i, value] of Object.entries(action.index)) {
                updatedState[value][action.type] = action.value[i];
            }
        } else {
            updatedState[action.index][action.type] = action.value;
        }
        return updatedState;
    }
};

export const playerReducer = (state, action) => {
    if (action.type in playerActions) {
        return playerActions[action.type](state, action);
    } else {
        return playerActions.updateProp(state, action);
    }
}

const encounterActions = {
    set: (state, action) => baseReducer(state, action),
    add: (state, action) => objectAddReducer(state, action),
    updateIndex: (state, action) => {
        if (action.index === undefined) {
            return state;
        }
        const updatedEncounter = [...state[action.currentEncounter]];
        updatedEncounter[action.index][action.type] = action.value;

        return {
            ...state,
            [action.currentEncounter]: updatedEncounter
        }
    }
};

export const encounterReducer = (state, action) => {
    if (action.type in encounterActions) {
        return encounterActions[action.type](state, action);
    } else {
        return encounterActions.updateIndex(state, action);
    }
}
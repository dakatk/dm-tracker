export const playerReducer = (state, action) => {
    if (action.type === 'set') {
        return action.value;
    } else if (action.type === 'add') {
        return [...state, action.value];
    } else if (action.type === 'damage') {
        const updatedState = [...state];
        for (const {index, value} of action.value) {
            const currHealth = updatedState[index].health;
            updatedState[index].health = Math.max(0, currHealth - value);
        }
        return updatedState;
    } else {
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
}

export const encounterReducer = (state, action) => {
    if (action.type === 'set') {
        return action.value;
    } else if (action.type === 'add') {
        return {
            ...state,
            [action.name]: action.value
        };
    } else {
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
}
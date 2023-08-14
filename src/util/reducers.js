const arrayReducer = (state, { type, value, index }) => {
    switch (type) {
        case 'add':
            return [...state, value];
        case 'remove':
            return state.filter(element => element !== value);
        case 'fill':
            return [...state].fill(value);
        case 'setAt':
            const updatedState = [...state];
            updatedState[index] = value;
            return updatedState;
        default:
            return value;
    }
}

const objectReducer = (state, { type, value, name }) => {
    switch (type) {
        case 'remove':
            const updatedState = [...state];
            delete updatedState[name];
            return updatedState;
        case 'setAt':
            return { ...state, [name]: value };
        default:
            return value;
    }
}

const playerReducer = (state, { type, value, index }) => {
    switch (type) {
        case 'set':
            return value;
        case 'add':
            return [...state, value];
        case 'damage':
            let updatedState = [...state];
            for (const { index, damageValue } of value) {
                const currHealth = updatedState[index].health;
                updatedState[index].health = Math.max(0, currHealth - damageValue);
            }
            return updatedState;
        default:
            updatedState = [...state];
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
}

const encounterReducer = (state, { type, value, index, name, currentEncounter }) => {
    switch (type) {
        case 'set':
            return value;
        case 'add':
            return { ...state, [name]: value };
        default:
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
}

export {
    arrayReducer,
    objectReducer,
    playerReducer,
    encounterReducer
}
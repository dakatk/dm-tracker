import { createContext } from 'react';

export const ThemeContext = createContext({
    // Global base color
    primary: '',
    // Global background color
    background: '',
    widget: {
        // Widget border color
        border: '',
        // Widget shadow color
        shadow: '',
        // Widget error text color
        error: '',
        // Widget background colors
        backgroundPrimary: '',
        backgroundSecondary: '',
        input: {
            // Widget input text colors
            text: '',
            active: '',
            disabled: '',
            // Widget input shadow color
            shadow: '',
            // Widget input field background colors
            background: '',
            backgroundHover: '',
            backgroundActive: '',
            backgroundDisabled: '',
        }
    }
});

export const CampaignContext = createContext({ 
    players: [],
    npcs: [],
    quests: [],
    encounterOptions: {},
    currentEncounter: ''
});

export const FormContext = createContext({
    formId: null,
    validationErrors: {},
    updateValidationErrors: (validationErrors) => {},
    closeForm: () => {},
    openAttackForm: () => {},
    openNewQuestForm: () => {},
    openNewNpcForm: () => {},
    openNewPlayerForm: () => {},
    openEditPlayersForm: () => {},
    openNewEncounterForm: () => {}
});
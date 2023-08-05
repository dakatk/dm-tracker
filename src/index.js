import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeContext } from './app/Context';
import { loadFromSession } from './util/session';

import App from './app/App';

import './style/index.scss';

const theme = {
    // Global base color
    primary: '#efc6a4',
    // Global background color
    background: '#1e1e1e',
    widget: {
        // Widget border color
        border: '#f6d8c09f',
        // Widget shadow color
        shadow: '#0b0b0b',
        // Widget error text color
        error: '#ee3131',
        // Widget background colors
        backgroundPrimary: '#272727',
        backgroundSecondary: '#303030',
        input: {
            // Widget input text colors
            text: '#f3c49e',
            active: '#d7b08f',
            disabled: '#f6d8c09f',
            // Widget input shadow color
            shadow: '#1a1a1a',
            // Widget input field background colors
            background: '#49494d',
            backgroundHover: '#3f3f42',
            backgroundActive: '#363639',
            backgroundDisabled: '#49494d82',
        }
    }
};

document.documentElement.style.setProperty('--theme-color', theme.primary);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeContext.Provider value={theme}>
        <React.StrictMode>
            <App session={loadFromSession()} />
        </React.StrictMode>
    </ThemeContext.Provider>
);

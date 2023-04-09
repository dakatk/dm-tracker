import React from 'react';
import ReactDOM from 'react-dom/client';

import { loadFromSession } from './util/session';

import App from './app/App';

import './style/index.scss';

document.documentElement.style.setProperty('--theme-color', '#efc6a4');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App session={loadFromSession()}/>
  </React.StrictMode>
);

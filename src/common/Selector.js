import React, { useState } from 'react';

import { capitalize } from '../util/string';

import './style/Selector.scss';

function Selector({ options, currentSelection, onConfirm, disabled }) {
    const [selection, setSelection] = useState(currentSelection || '');

    const updateSelection = (e) => {
        const selectedValue = e.target.value;
        setSelection(selectedValue);
    }

    const renderOptions = () => {
        return options.map(value => {
            return (
                <option value={value} key={value}>
                    {capitalize(value)}
                </option>
            );
        });
    }
    
    return (
        <div className='widget-box selector-container'>
            <span className='selection'>
                <select
                    className='widget-btn widget-dropdown selector-dropdown'
                    value={selection}
                    title={selection}
                    onChange={updateSelection}
                    disabled={disabled}
                >
                    <option value=''>Create New...</option>
                    {renderOptions()}
                </select>
            </span>

            <span className='selector-confirm-button'>
                <button 
                    className='widget-btn'
                    onClick={() => onConfirm(selection)}
                    disabled={disabled}
                >{selection === '' ? 'Create' : 'Confirm'}
                </button>
            </span>
        </div>
    )
}

export default Selector;

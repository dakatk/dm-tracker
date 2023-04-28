import React, { useState } from 'react';

import capitalize from '../util/capitalize';

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
        <div className='widget-box' id='selector-widget'>
            <span id='selection'>
                <select
                    id='selector-dropdown'
                    className='widget-input'
                    value={selection}
                    title={selection}
                    onChange={updateSelection}
                    disabled={disabled}
                >
                    <option value=''>Create New...</option>
                    {renderOptions()}
                </select>
            </span>

            <span id='selector-confirm-button'>
                <button 
                    className='widget-input'
                    onClick={() => onConfirm(selection)}
                    disabled={disabled}
                >{selection === '' ? 'Create' : 'Confirm'}
                </button>
            </span>
        </div>
    )
}

export default Selector;

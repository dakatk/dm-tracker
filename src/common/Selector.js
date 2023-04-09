import React, { useState } from 'react';

import capitalize from '../util/capitalize';

import './style/Selector.scss';

function Selector({ options, onConfirm }) {
    const [selection, setSelection] = useState('');

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
                    onChange={updateSelection}>
                        <option value=''>Select One...</option>
                        {renderOptions()}
                </select>
            </span>

            <span id='confirm-button'>
                <button 
                    className='widget-input' 
                    disabled={selection === ''}
                    onClick={() => onConfirm(selection)}>
                        Confirm
                </button>
            </span>
        </div>
    )
}

export default Selector;
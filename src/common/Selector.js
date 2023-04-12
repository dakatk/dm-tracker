import React, { useState } from 'react';

import capitalize from '../util/capitalize';

import './style/Selector.scss';

function Selector({ options, currentSelection, onConfirm }) {
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

    // TODO Change default option to 'Create New...' and change button text to be 'Create'
    // when the default option is selected. Upon pressing this button, a modal should appear
    // that allows the user to create new enemies with stats/attacks/weaknesses and save as a
    // new encounter (modal should contain a text box at the top for the encounter name)
    return (
        <div className='widget-box' id='selector-widget'>
            <span id='selection'>
                <select
                    id='selector-dropdown'
                    className='widget-input'
                    value={selection}
                    title={selection}
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
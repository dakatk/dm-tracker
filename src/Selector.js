import React, { useState } from 'react';
import './style/Selector.scss';

function Selector({ options, onConfirm }) {
    const [selection, setSelection] = useState(options[0]);

    function updateSelection(e) {
        setSelection(e.target.value);
    }

    function renderOptions() {
        const optionTags = [];
        for (const optionValue of options) {
            optionTags.push(
                <option value={optionValue} key={optionValue}>
                    {optionValue.charAt(0).toUpperCase() + optionValue.slice(1)}
                </option>
            );
        }
        return optionTags;
    }

    return (
        <div id="selector-box">
            <span id="selection">
                <select 
                    id="selector-dropdown"
                    className="selector-input"
                    value={selection} 
                    onChange={updateSelection}>
                        {renderOptions()}
                </select>
            </span>

            <span id="confirm-button">
                <button 
                    className="selector-input" 
                    onClick={() => onConfirm(selection)}>
                        Confirm
                </button>
            </span>
        </div>
    )
}

export default Selector;
import React, { useState } from 'react';
import './style/Selector.scss';
import capitalize from './util/capitalize';

// TODO CSS for disabled confirm button
function Selector({ options, onConfirm }) {
    const [selection, setSelection] = useState("");

    const updateSelection = (e) => {
        setSelection(e.target.value);
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
        <div className="widget-box" id="selector-widget">
            <span id="selection">
                <select 
                    id="selector-dropdown"
                    className="selector-input"
                    value={selection} 
                    onChange={updateSelection}>
                        <option value="">Select One...</option>
                        {renderOptions()}
                </select>
            </span>

            <span id="confirm-button">
                <button 
                    className="selector-input" 
                    disabled={selection === ""}
                    onClick={() => onConfirm(selection)}>
                        Confirm
                </button>
            </span>
        </div>
    )
}

export default Selector;
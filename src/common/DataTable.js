import React from 'react';

import './style/DataTable.scss';

function DataTable({ data, updateHealth, updateInitiative, updateStarveDays, canRest, canAttack, canStarve, canAdd, canEdit, onAttack, onAdd, onEdit, disabled }) {
    const health = data.map(({ health }) => health);
    const initiative = data.map(({ initiative }) => initiative);
    const starveDays = data.map(({ starveDays }) => starveDays || 0);

    const maxHealth = data.map(({ maxHealth }) => maxHealth);
    const maxStarveDays = data.map(({ conMod }) => Math.max(1, conMod + 1));

    const allRest = () => {
        if (updateHealth?.call) {
            updateHealth(maxHealth);
        }
    }

    const allStarve = () => {
        if (updateStarveDays?.call) {
            updateStarveDays(starveDays.map(value => value - 1));
        }
    }

    const allEat = () => {
        if (updateStarveDays?.call) {
            updateStarveDays(maxStarveDays);
        }
    }

    const starve = (index) => {
        if (updateStarveDays?.call) {
            updateStarveDays(starveDays[index] - 1, index);
        }
    }

    const eat = (index) => {
        if (updateStarveDays?.call) {
            updateStarveDays(maxStarveDays[index], index);
        }
    }

    const rest = (index) => {
        if (updateHealth?.call) {
            updateHealth(maxHealth[index], index);
        }
    }

    const setHealth = (e, index) => {
        if (updateHealth?.call) {
            updateHealth(e.target.value, index);
        }
    }

    const setInitiative = (e, index) => {
        if (updateInitiative?.call) {
            updateInitiative(e.target.value, index);
        }
    }

    const renderSingleRow = (name, ac, index) => {
        return (
            <tr className='data-table-row' key={index}>
                <td className='data-table-bordered'>{name}</td>
                <td className='data-table-bordered'>{ac}</td>
                <td className='data-table-bordered'>
                    <button 
                        title='Rest'
                        className='data-table-update-btn data-table-rest-btn'
                        onClick={() => rest(index)}
                        disabled={disabled}
                    >✓
                    </button>
                    <input 
                        className='data-table-number-input'
                        type='number' 
                        max={maxHealth[index]}
                        min={0}
                        value={health[index]} 
                        onChange={e => setHealth(e, index)}
                        disabled={disabled}
                    ></input>
                </td>
                <td className='data-table-bordered'>
                    <input 
                        className='data-table-number-input'
                        type='number'
                        max={40}
                        min={-5}
                        value={initiative[index]} 
                        onChange={e => setInitiative(e, index)}
                        disabled={disabled}
                    ></input>
                </td>
                {canStarve && 
                    <td id='data-table-starve-days' className='data-table-bordered'>
                        <button 
                            title='Starve'
                            className='data-table-update-btn'
                            onClick={() => starve(index)}
                            disabled={disabled}
                        >-
                        </button>
                        &nbsp;{starveDays[index]}&nbsp;
                        <button 
                            title='Eat'
                            style={{ fontSize: '11px' }}
                            className='data-table-update-btn'
                            onClick={() => eat(index)}
                            disabled={disabled}
                        >✓
                        </button>
                    </td>}
            </tr>
        );
    }

    const renderAllRows = () => {
        const rows = data.map((value, index) => 
            renderSingleRow(value.name, value.ac, index)
        );
        
        return (
            <table id='data-table-parent'>
                <thead>
                    <tr className='data-table-header'>
                        <th className='data-table-bordered'>Name</th>
                        <th className='data-table-bordered'>AC</th>
                        <th className='data-table-bordered'>Health</th>
                        <th className='data-table-bordered'>Init.</th>
                        {canStarve && 
                            <th className='data-table-bordered'>Starve Days</th>}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    return (
        <div className='widget-box'>
            {renderAllRows()}
            {canRest && <button
                className='widget-input data-table-btn' 
                onClick={() => allRest()}
                disabled={disabled}
            >Rest
            </button>}
            {canAttack && <button
                className='widget-input data-table-btn' 
                onClick={() => onAttack?.call()}
                disabled={disabled}
            >Attack
            </button>}
            {canStarve && <>
                <button 
                    className='widget-input data-table-btn' 
                    onClick={() => allStarve()}
                    disabled={disabled}
                >All Starve
                </button>
                <button
                    className='widget-input data-table-btn' 
                    onClick={() => allEat()}
                    disabled={disabled}
                >All Eat
                </button>
            </>}
            {canAdd && <button
                className='widget-input data-table-btn'
                onClick={() => onAdd?.call()}
                disabled={disabled}
            >Add
            </button>}
            {canEdit && <button
                className='widget-input data-table-btn'
                onClick={() => onEdit?.call()}
                disabled={disabled}
            >Edit
            </button>}
        </div>
    );
}

export default DataTable;

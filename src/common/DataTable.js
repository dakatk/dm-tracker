import React, { useEffect } from 'react';
import './style/DataTable.scss';

function DataTable(props) {
    const health = props.data.map(({ health }) => health);
    const initiative = props.data.map(({ initiative }) => initiative);
    const starveDays = props.data.map(({ starveDays }) => starveDays || 0);

    const maxHealth = props.data.map(({ maxHealth }) => maxHealth);
    const maxStarveDays = props.data.map(({ conMod }) => Math.max(1, conMod + 1));

    useEffect(() => {
        if (!props.autoDamage) {
            return;
        }

        for (const damage of props.autoDamage) {
            const currentHealth = health[damage.index];
            health[damage.index] = Math.max(currentHealth - damage.value, 0);
        }
        
        props.updateHealth(health);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.autoDamage]);

    const allRest = () => {
        if (props.updateHealth !== undefined) {
            props.updateHealth(maxHealth);
        }
    }

    const allStarve = () => {
        if (props.updateStarveDays !== undefined) {
            props.updateStarveDays(starveDays.map(value => value - 1));
        }
    }

    const allEat = () => {
        if (props.updateStarveDays !== undefined) {
            props.updateStarveDays(maxStarveDays);
        }
    }

    const starve = (index) => {
        if (props.updateStarveDays !== undefined) {
            props.updateStarveDays(starveDays[index] - 1, index);
        }
    }

    const eat = (index) => {
        if (props.updateStarveDays !== undefined) {
            props.updateStarveDays(maxStarveDays[index], index);
        }
    }

    const rest = (index) => {
        if (props.updateHealth !== undefined) {
            props.updateHealth(maxHealth[index], index);
        }
    }

    const updateHealth = (e, index) => {
        props.updateHealth(e.target.value, index);
    }

    const updateInitiative = (e, index) => {
        props.updateInitiative(e.target.value, index);
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
                        onClick={() => rest(index)}>✓
                    </button>
                    <input 
                        className='data-table-number-input'
                        type='number' 
                        max={maxHealth[index]}
                        min={0}
                        value={health[index]} 
                        onChange={e => updateHealth(e, index)}
                    ></input>
                </td>
                <td className='data-table-bordered'>
                    <input 
                        className='data-table-number-input'
                        type='number'
                        max={40}
                        min={-10}
                        value={initiative[index]} 
                        onChange={e => updateInitiative(e, index)}
                    ></input>
                </td>
                {props.canStarve && 
                    <td id='data-table-starve-days' className='data-table-bordered'>
                        <button 
                            title='Starve'
                            className='data-table-update-btn'
                            onClick={() => starve(index)}>-
                        </button>
                        &nbsp;{starveDays[index]}&nbsp;
                        <button 
                            title='Eat'
                            style={{ fontSize: '11px' }}
                            className='data-table-update-btn'
                            onClick={() => eat(index)}>✓
                        </button>
                    </td>}
            </tr>
        );
    }

    const renderAllRows = () => {
        const rows = props.data.map((value, index) => 
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
                        {props.canStarve && 
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
            {props.canRest && 
                <button 
                    className='widget-input data-table-btn' 
                    onClick={() => allRest()}>Rest
                </button>
            }
            {props.canAttack &&
                <button 
                    className='widget-input data-table-btn' 
                    onClick={() => props.attack()}>Attack
                </button>
            }
            {props.canStarve && <>
                <button 
                    className='widget-input data-table-btn' 
                    onClick={() => allStarve()}>All Starve
                </button>
                <button 
                    className='widget-input data-table-btn' 
                    onClick={() => allEat()}>All Eat
                </button>
            </>}
        </div>
    );
}

export default DataTable;
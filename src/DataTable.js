import React, { useEffect, useState } from 'react';
import './DataTable.scss';

function DataTable(props) {
    const defaultHealth = props.data.map(({ health }) => health);
    const defaultStarveDays = props.data.map(({ starveDays }) => starveDays || 0);

    const maxHealth = props.data.map(({ maxHealth }) => maxHealth);
    const maxStarveDays = props.data.map(({ conMod }) => Math.max(1, conMod + 1));

    const initiativeIndex = props.initiativeIndex || 0;

    const [health, setHealth] = useState(defaultHealth);
    const [starveDays, setStarveDays] = useState(defaultStarveDays);

    useEffect(() => {
        setHealth(defaultHealth);
        setStarveDays(defaultStarveDays);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    function allRest() {
        setHealth(maxHealth);
    }

    function allStarve() {
        const currentStarveDays = [...starveDays];
        setStarveDays(currentStarveDays.map(value => value - 1));
    }

    function allEat() {
        setStarveDays(maxStarveDays);
    }

    function playerStarve(index) {
        const currentStarveDays = [...starveDays];
        currentStarveDays[index] -= 1;
        setStarveDays(currentStarveDays);
    }

    function playerEat(index) {
        const currentStarveDays = [...starveDays];
        currentStarveDays[index] = maxStarveDays[index];
        setStarveDays(currentStarveDays);
    }

    function playerRest(index) {
        const currentHealth = [...health];
        currentHealth[index] = maxHealth[index];
        setHealth(currentHealth);
    }

    function updateHealth(e, index) {
        const currentHealth = [...health];
        currentHealth[index] = e.target.value;
        setHealth(currentHealth);
    }

    function updateInitiative(e, index) {
        const currentInitiative = [...props.initiative];
        currentInitiative[index] = e.target.value;
        props.setInitiative(currentInitiative);
    }

    function renderSingleRow(name, ac, index) {
        return (
            <tr className="data-table-row" key={index}>
                <td className="data-table-bordered">{name}</td>
                <td className="data-table-bordered">{ac}</td>
                <td className="data-table-bordered">
                    <button 
                        title="Rest"
                        style={{ fontSize: '11px', marginRight: '0.5em' }}
                        className="data-table-update-btn"
                        onClick={() => playerRest(index)}>✓
                    </button>
                    <input 
                        className="data-table-input"
                        type="number" 
                        max={defaultHealth[index]}
                        min={0}
                        value={health[index]} 
                        onChange={e => updateHealth(e, index)}
                    ></input>
                </td>
                <td className="data-table-bordered">
                    <input 
                        className="data-table-input"
                        type="number"
                        max={40}
                        min={-10}
                        value={props.initiative[index + initiativeIndex]} 
                        onChange={e => updateInitiative(e, index + initiativeIndex)}
                    ></input>
                </td>
                {props.canStarve && 
                    <td id="data-table-starve-days" className="data-table-bordered">
                        <button 
                            title="Starve"
                            className="data-table-update-btn"
                            onClick={() => playerStarve(index)}>-
                        </button>
                        &nbsp;{starveDays[index]}&nbsp;
                        <button 
                            title="Eat"
                            style={{ fontSize: '11px' }}
                            className="data-table-update-btn"
                            onClick={() => playerEat(index)}>✓
                        </button>
                    </td>}
            </tr>
        );
    }

    function renderAllRows() {
        const rows = props.data.map((value, index) => 
            renderSingleRow(value.name, value.ac, index)
        );
        return (
            <table id="data-table-parent">
                <thead>
                    <tr className="data-table-header">
                        <th className="data-table-bordered">Name</th>
                        <th className="data-table-bordered">AC</th>
                        <th className="data-table-bordered">Health</th>
                        <th className="data-table-bordered">Init.</th>
                        {props.canStarve && 
                            <th className="data-table-bordered">Starve Days</th>}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    return (
        <div id="widget-box">
            {renderAllRows()}
            {props.canRest && 
                <button className="data-table-btn" onClick={() => allRest()}>Rest</button>}
            {props.canAttack &&
                <button className="data-table-btn" onClick={() => props.attack()}>Attack</button>}
            {props.canStarve && <>
                <button className="data-table-btn" onClick={() => allStarve()}>All Starve</button>
                <button className="data-table-btn" onClick={() => allEat()}>All Eat</button>
            </>}
            <button 
                className="data-table-btn" 
                onClick={() => props.save(health, starveDays)}
            >Save</button>
        </div>
    );
}

export default DataTable;
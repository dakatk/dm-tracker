import React, { useState } from 'react';
import './DataTable.css';

function DataTable(props) {
    const defaultHealth = props.data.map(({ health }) => health);
    const defaultStarveDays = props.data.map(({ starveDays }) => starveDays);
    const initiativeIndex = props.initiativeIndex || 0;

    const [health, setHealth] = useState(defaultHealth);
    const [starveDays, setStarveDays] = useState(defaultStarveDays);

    function save() {
        if (!props.fileName) {
            return;
        }
        // const newData = props.data.map((value, index) => {
        //     return {
        //         ...value,
        //         health: health[index],
        //         staveDays: starveDays[index]
        //     };
        // });
        // fs.writeFileSync(props.fileName, JSON.stringify(newData));
    }

    function allRest() {
        setHealth(defaultHealth);
    }

    function allStarve() {
        const currentStarveDays = [...starveDays];
        setStarveDays(currentStarveDays.map(value => value - 1));
    }

    function allEat() {
        setStarveDays(defaultStarveDays);
    }

    function playerStarve(index) {
        const currentStarveDays = [...starveDays];
        currentStarveDays[index] -= 1;
        setStarveDays(currentStarveDays);
    }

    function playerEat(index) {
        const currentStarveDays = [...starveDays];
        currentStarveDays[index] = defaultStarveDays[index];
        setStarveDays(currentStarveDays);
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
                            className="data-table-update-btn"
                            onClick={() => playerStarve(index)}>-
                        </button>
                        &nbsp;{starveDays[index]}&nbsp;
                        <button 
                            style={{ fontSize: '11px' }}
                            className="data-table-update-btn"
                            onClick={() => playerEat(index)}>✓
                        </button>
                    </td>}
            </tr>
        );
    }

    function renderAllRows() {
        const rows = [];
        props.data.forEach((obj, index) => 
            rows.push(renderSingleRow(obj.name, obj.ac, index))
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
        <div id="data-table-box">
            {renderAllRows()}
            {props.canRest && 
                <button className="data-table-btn" onClick={() => allRest()}>Rest</button>}
            {props.canAttack &&
                <button className="data-table-btn" onClick={() => props.attack()}>Attack</button>}
            {props.canStarve && <>
                <button className="data-table-btn" onClick={() => allStarve()}>All Starve</button>
                <button className="data-table-btn" onClick={() => allEat()}>All Eat</button>
            </>}
            <button disabled={!props.fileName} className="data-table-btn" onClick={() => save()}>Save</button>
        </div>
    );
}

export default DataTable;
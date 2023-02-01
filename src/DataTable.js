import React, { useEffect, useState } from "react";
import "./style/DataTable.scss";

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

    useEffect(() => {
        if (!props.autoDamage) {
            return;
        }
        for (const damage of props.autoDamage) {
            const currentHealth = [...health];
            currentHealth[damage.index] = Math.max(currentHealth[damage.index] - damage.value, 0);
            setHealth(currentHealth);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.autoDamage]);

    const allRest = () => {
        setHealth(maxHealth);
    }

    const allStarve = () => {
        const currentStarveDays = [...starveDays];
        setStarveDays(currentStarveDays.map(value => value - 1));
    }

    const allEat = () => {
        setStarveDays(maxStarveDays);
    }

    const starve = (index) => {
        const currentStarveDays = [...starveDays];
        currentStarveDays[index] -= 1;
        setStarveDays(currentStarveDays);
    }

    const eat = (index) => {
        const currentStarveDays = [...starveDays];
        currentStarveDays[index] = maxStarveDays[index];
        setStarveDays(currentStarveDays);
    }

    const rest = (index) => {
        const currentHealth = [...health];
        currentHealth[index] = maxHealth[index];
        setHealth(currentHealth);
    }

    const updateHealth = (e, index) => {
        const currentHealth = [...health];
        currentHealth[index] = e.target.value;
        setHealth(currentHealth);
    }

    const updateInitiative = (e, index) => {
        const currentInitiative = [...props.initiative];
        currentInitiative[index] = e.target.value;
        props.setInitiative(currentInitiative);
    }

    const renderSingleRow = (name, ac, index) => {
        return (
            <tr className="data-table-row" key={index}>
                <td className="data-table-bordered">{name}</td>
                <td className="data-table-bordered">{ac}</td>
                <td className="data-table-bordered">
                    <button 
                        title="Rest"
                        className="data-table-update-btn data-table-rest-btn"
                        onClick={() => rest(index)}>✓
                    </button>
                    <input 
                        className="data-table-number-input"
                        type="number" 
                        max={defaultHealth[index]}
                        min={0}
                        value={health[index]} 
                        onChange={e => updateHealth(e, index)}
                    ></input>
                </td>
                <td className="data-table-bordered">
                    <input 
                        className="data-table-number-input"
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
                            onClick={() => starve(index)}>-
                        </button>
                        &nbsp;{starveDays[index]}&nbsp;
                        <button 
                            title="Eat"
                            style={{ fontSize: '11px' }}
                            className="data-table-update-btn"
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
        <div className="widget-box">
            {renderAllRows()}
            {props.canRest && 
                <button 
                    className="widget-input data-table-btn" 
                    onClick={() => allRest()}>Rest
                </button>
            }
            {props.canAttack &&
                <button 
                    className="widget-input data-table-btn" 
                    onClick={() => props.attack()}>Attack
                </button>
            }
            {props.canStarve && <>
                <button 
                    className="widget-input data-table-btn" 
                    onClick={() => allStarve()}>All Starve
                </button>
                <button 
                    className="widget-input data-table-btn" 
                    onClick={() => allEat()}>All Eat
                </button>
            </>}
            <button 
                className="widget-input data-table-btn" 
                onClick={() => props.save(health, starveDays)}>Save
            </button>
        </div>
    );
}

export default DataTable;
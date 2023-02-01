import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import capitalize from "./util/capitalize";
import isString from "./util/isString";
import d from "./util/roll";
import "./style/AttackModal.scss";

// TODO Disable widget layer below open modal
function AttackModal({ close, attack, encounterData, playerData }) {
    const defaultAttackSelection = encounterData.map(value => value?.attacks[0]);
    const defaultTargetSelection = encounterData.map(() => playerData[0]?.name);
    const defaultEnabledRows = encounterData.map(() => false);

    const [selectedAttacks, setSelectedAttacks] = useState(defaultAttackSelection);
    const [selectedTargets, setSelectedTargets] = useState(defaultTargetSelection);
    const [enabledRows, setEnabledRows] = useState(defaultEnabledRows);
    const [results, setResults] = useState([]);

    useEffect(() => {
        setSelectedAttacks(defaultAttackSelection);
        setSelectedTargets(defaultTargetSelection);
        setEnabledRows(defaultEnabledRows);
        setResults([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [/*playerData, */encounterData]);

    const doAttack = () => {
        const attackValues = selectedAttacks.map(attackJson => {
            if (isString(attackJson)) {
                return JSON.parse(attackJson);
            }
            return attackJson;
        });

        const newResults = enabledRows.map((value, index) => {
            if (!value) {
                return undefined;
            } else {
                return parseResults(index, attackValues, selectedTargets);
            }
        }).filter(value => value !== undefined);
        
        setResults(newResults);
        attack(newResults);
    }

    const parseResults = (index, attacks, targets) => {
        const attack = attacks[index];
        const target = targets[index];
        const attackerName = encounterData[index].name;

        const hit = d(20);
        const player = playerData.find(({name}) => name === target);
        
        let damages = [];
        let str = `${attackerName} missed.`;

        if (hit === 1) {
            str = `${attackerName} missed critically!`;
        } else if (hit === 20 || (hit + attack.hitBonus >= player.ac)) {
            const damageData = calcDamage(attack, hit === 20);
            
            str = `${attackerName} hit ${target} for ${damageData.str}`;
            damages = damageData.values;
        }

        return {
            damages,
            str,
            target: player.name
        };
    }

    const calcDamage = (attack, critical) => {
        const {diceType, attackBonus, diceCount, damageType} = attack;

        let values = [];
        if (Array.isArray(diceType)) {
            values = rollAttackDice(diceType, attackBonus, diceCount, damageType, critical);
        } else {
            values = rollAttackDice([diceType], [attackBonus], [diceCount], [damageType], critical);
        }

        const str = values.map(value => 
            `${value.damage} ${value.type} damage`
        ).join(',');

        return { values, str };
    }

    const rollAttackDice = (diceTypes, attackBonuses, diceCounts, damageTypes, critical) => {
        return diceTypes.map((diceType, index) => {
            const attackBonus = (Array.isArray(attackBonuses) && attackBonuses[index]) || attackBonuses;
            const diceCount = (Array.isArray(diceCounts) && diceCounts[index]) || diceCounts;
            const type = (Array.isArray(damageTypes) && damageTypes[index]) || damageTypes;

            let damage = d(diceType, diceCount) + attackBonus;
            if (critical) {
                damage *= 2;
            }
            
            return { damage, type };
        });
    }

    const showResults = () => {
        return (
            <div>Results: {results && 
                <ol>
                    {results.map((value, index) => 
                        <li key={index}>{value.str}</li>
                    )}
                </ol>
            }</div>
        );
    }

    const attackRow = (enemy, index) => {
        return (
            <div className="attack-modal-row" key={index}>
                <input 
                    className="widget-input attack-modal-input"
                    checked={enabledRows[index]}
                    onChange={e => enableRow(e, index)} 
                    type="checkbox" /> {enemy.name}&nbsp;&nbsp;&nbsp;{attackOptions(enemy.attacks, index)} {targetOptions(index)}
            </div>
        );
    }

    const enableRow = (event, index) => {
        const nextEnabledRows = [...enabledRows];
        nextEnabledRows[index] = event.target.checked;
        setEnabledRows(nextEnabledRows);
    }

    const enableAllRows = (event) => {
        const nextEnabledRows = [...enabledRows];
        nextEnabledRows.fill(event.target.checked); 
        setEnabledRows(nextEnabledRows);
    }

    const attackOptions = (attacks, rowIndex) => {
        return (
            <select 
                className="widget-input attack-modal-input"
                value={selectedAttacks[rowIndex]} 
                onChange={event => selectOption(event, rowIndex, selectedAttacks, setSelectedAttacks)}>
                    {attacks.map((attack, index) =>
                        <option key={index} value={JSON.stringify(attack)}>{capitalize(attack.name)}</option>
                    )}
            </select>
        );
    }

    const targetOptions = (rowIndex) => {
        return (
            <select 
                className="widget-input attack-modal-input"
                value={selectedTargets[rowIndex]} 
                onChange={event => selectOption(event, rowIndex, selectedTargets, setSelectedTargets)}>
                    {playerData.map(({name}, index) => 
                        <option key={index} value={name}>{name}</option>
                    )}
            </select>
        );
    }

    const selectOption = (event, index, prevState, setState) => {
        const targetValue = event.target.value;
        const nextState = [...prevState];

        nextState[index] = targetValue;
        setState(nextState);
    }

    return (
        <div id="attack-modal-parent" className="widget-box">
            <div id="attack-modal-header">
                Enemy Attacks
                <FontAwesomeIcon 
                    icon={faXmark} 
                    id="attack-modal-close-btn"
                    onClick={() => close()} />
            </div>

            <div id="attack-modal-contents">
                <div id="attack-modal-target">
                    <div id="attack-modal-select-all">
                        <input
                            className="widget-input"
                            onChange={e => enableAllRows(e)}
                            type="checkbox" />&nbsp;&nbsp;&nbsp;Select All
                    </div>
                    {encounterData.map(attackRow)}
                </div>
                <div id="attack-modal-results">
                    {showResults()}
                </div>
            </div>

            <div id="attack-modal-footer">
                <button
                    className="widget-input attack-modal-input"
                    onClick={() => doAttack()}>Attack
                </button>
            </div>
        </div>
    );
}

export default AttackModal;
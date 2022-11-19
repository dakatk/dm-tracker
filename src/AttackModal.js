import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import capitalize from "./util/capitalize";
import isString from "./util/isString";
import d from "./util/roll";
import './style/AttackModal.scss';

function AttackModal({ show, close, attack, encounterData, playerData }) {
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
    }, [encounterData]);

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
        // console.log(`hit: ${hit}`);
        // console.log(`hitBonus: ${attack.hitBonus}`);
        // console.log(`ac: ${player.ac}`);
        // console.log(`isHit: ${hit + attack.attackBonus >= player.ac}`);
        
        let damages = [0];
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
            const attackBonus = attackBonuses[index];
            const diceCount = diceCounts[index];

            let damage = d(diceType, diceCount) + attackBonus;
            if (critical) {
                damage *= 2;
            }

            return {
                damage,
                type: damageTypes[index]
            }
        });
    }

    const showResults = () => {
        return (
            <div>Results: {results && results.map(
                (value, index) => <div key={index}>{value.str}</div>
            )}</div>
        );
    }

    const attackRow = (enemy, index) => {
        return (
            <div className="attack-modal-row" key={index}>
                <input 
                    checked={enabledRows[index]}
                    onChange={e => enableRow(e, index)} 
                    type="checkbox" /> {enemy.name} {attackOptions(enemy.attacks, index)} {targetOptions(index)}
            </div>
        );
    }

    const enableRow = (event, index) => {
        const nextEnabledRows = [...enabledRows];
        nextEnabledRows[index] = event.target.checked;
        setEnabledRows(nextEnabledRows);
    }

    const attackOptions = (attacks, rowIndex) => {
        return (
            <select value={selectedAttacks[rowIndex]} onChange={event => selectOption(event, rowIndex, selectedAttacks, setSelectedAttacks)}>
                {attacks.map((attack, index) =>
                    <option key={index} value={JSON.stringify(attack)}>{capitalize(attack.name)}</option>
                )}
            </select>
        );
    }

    const targetOptions = (rowIndex) => {
        return (
            <select value={selectedTargets[rowIndex]} onChange={event => selectOption(event, rowIndex, selectedTargets, setSelectedTargets)}>
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

    return show && (
        <div id="attack-modal-parent">
            <div id="attack-modal-header">
                Enemy Attacks
                <FontAwesomeIcon 
                    icon={faXmark} 
                    id="attack-modal-close-btn"
                    onClick={() => close()} />
            </div>

            <div id="attack-modal-contents">
                {encounterData.map(attackRow)}
            </div>

            <div id="attack-modal-results">
                {showResults()}
            </div>

            <div id="attack-modal-footer">
                <button onClick={() => doAttack()}>Attack</button>
            </div>
        </div>
    );
}

export default AttackModal;
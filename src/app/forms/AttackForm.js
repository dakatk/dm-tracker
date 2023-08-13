import React, { useContext, useReducer, useState } from 'react';

import { arrayReducer } from '../../util/reducers';
import { isString, capitalize } from '../../util/string';
import { d } from '../../util/roll';

import { CampaignContext } from '../Context';

import Form from '../../common/Form';

import './style/AttackForm.scss';

function AttackForm({ onAttackPlayers }) {
    const campaign = useContext(CampaignContext);

    const playerOptions = campaign.players
        .filter(({ health }) => health > 0)
        .map(({ name, ac }) => { return { name, ac }; });
    
    const enemies = campaign.encounterOptions[campaign.currentEncounter];
    
    const defaultAttackSelection = enemies?.map(value => value?.attacks[0]) ?? [];
    const defaultTargetSelection = enemies?.map(() => playerOptions[0]?.name) ?? [];
    const defaultEnabledRows = enemies?.map(() => false) ?? [];

    const [selectedAttacks, dispatchSelectedAttacks] = useReducer(arrayReducer, defaultAttackSelection);
    const [selectedTargets, dispatchSelectedTargets] = useReducer(arrayReducer, defaultTargetSelection);
    const [enabledRows, dispatchEnabledRows] = useReducer(arrayReducer, defaultEnabledRows);
    const [results, setResults] = useState([]);

    const doAttack = () => {
        const attackValues = selectedAttacks.map(attackJson => {
            if (isString(attackJson)) {
                return JSON.parse(attackJson);
            }
            return attackJson;
        });

        const newResults = enabledRows.map(
            (value, index) => {
                if (!value) {
                    return undefined;
                } else {
                    return parseResults(index, attackValues, selectedTargets);
                }
            })
            .filter(value => value !== undefined);
        
        setResults(newResults);
        damagePlayers(newResults);
    }

    const parseResults = (index, attacks, targets) => {
        const attack = attacks[index];
        const target = targets[index];
        const attackerName = enemies[index].name;

        const hit = d(20);
        const player = playerOptions.find(({ name }) => name === target);
        
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

    const damagePlayers = (attackData) => {
        const autoDamageValues = [];
        for (const attackValues of attackData) {
            if (!attackValues.damages) {
                continue;
            }

            const rawDamage = attackValues.damages.map(({ damage }) => damage);
            const playerIndex = campaign.players.findIndex(({ name }) => name === attackValues.target);

            autoDamageValues.push({
                index: playerIndex,
                damageValue: rawDamage.reduce((a, b) => a + b, 0)
            });
        }
        onAttackPlayers(autoDamageValues);
    }

    const attackRow = (enemy, index) => {
        return (
            <div 
                className='attack-form-row' 
                key={index}
            >
                <input
                    className='widget-btn'
                    id={`attack-form-row-chk-${index}`}
                    name={`attack-form-row-chk-${index}`}
                    checked={enabledRows[index]}
                    onChange={e => dispatchEnabledRows({
                        type: 'setAt', value: e.target.checked, index
                    })}
                    type='checkbox'
                />

                <label
                    className='attack-form-label'
                    htmlFor={`attack-form-row-chk-${index}`}
                >
                    {enemy.name}
                </label>
                
                {attackOptions(enemy.attacks, index)}
                {targetOptions(index)}
            </div>
        );
    }

    // TODO Make these two generic:
    const attackOptions = (attacks, rowIndex) => {
        return (
            <select 
                className='widget-btn widget-dropdown attack-form-input'
                value={selectedAttacks[rowIndex]} 
                onChange={e => dispatchSelectedAttacks({
                    type: 'setAt', index: rowIndex, value: e.target.value
                })}
            >
                {attacks.map((attack, index) =>
                    <option
                        key={`attack-option-${index}`}
                        value={JSON.stringify(attack)}
                    >
                        {capitalize(attack.name)}
                    </option>
                )}
            </select>
        );
    }

    const targetOptions = (rowIndex) => {
        return (
            <select 
                className='widget-btn widget-dropdown attack-form-input'
                value={selectedTargets[rowIndex]} 
                onChange={e => dispatchSelectedTargets(
                    { type: 'setAt', index: rowIndex, value: e.target.value }
                )}
            >
                {playerOptions.map(({name}, index) => 
                    <option 
                        key={`target-option-${index}`} 
                        value={name}
                    >
                        {name}
                    </option>
                )}
            </select>
        );
    }
    //

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

    return (
        <Form
            title='Enemy Attacks'
            submitText='Attack'
            submitToolTip='Attack'
            onSubmit={doAttack}
        >
            <div className='attack-form-contents'>
                <div className='attack-form-select-all'>
                    <input
                        className='widget-btn'
                        id='attack-form-select-all-chk'
                        name='attack-form-select-all-chk'
                        onChange={e => dispatchEnabledRows({ 
                            type: 'fill', value: e.target.checked
                        })}
                        type='checkbox'
                    />
                    
                    <label 
                        className='attack-form-label'
                        htmlFor='attack-form-select-all-chk'
                    >
                        Select All
                    </label>
                </div>
                {enemies?.map(attackRow)}
            </div>

            <div className='attack-form-results'>
                {showResults()}
            </div>
        </Form>
    );
}

export default AttackForm;

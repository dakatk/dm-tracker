import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { capitalize } from '../util/string';

import './style/NameList.scss';

function NameList({ list, descriptorKeys, onAdd, onRemove, disabled }) {
    const [expanded, setExpanded] = useState([]);

    const toggleExpand = (index) => {
        if (disabled) {
            return;
        }

        const nextExpanded = [...expanded];
        if (nextExpanded[index] !== undefined) {
            nextExpanded[index] = undefined;
        } else {
            nextExpanded[index] = true;
        }
        setExpanded(nextExpanded);
    };

    const onRemoveClicked = (index) => {
        if (disabled) {
            return;
        }
        onRemove(index);
    }

    const description = (key, value, bordered) => {
        return (
            <div className={`name-list-description-line ${bordered && 'name-list-separator'}`}>
                {capitalize(key)}: {value[key]}
            </div>
        );
    }

    const details = (value, index) => {
        return (
            <div 
                className='name-list-entry name-list-details' 
                key={`details-${index}`}>
                    <div className='name-list-description'>
                        {descriptorKeys.map((key, index) => {
                            const bordered = index < description.length - 1;
                            return description(key, value, bordered);
                        })}
                    </div>
            </div>
        )
    };

    const rowClassNames = () => {
        let classNames = 'name-list-entry name-list-heading';

        if (disabled) {
            classNames += ' disabled';
        }
        return classNames;
    }

    const displayRow = (value, index) => {
        return (
            <tr key={`tr-${index}`}>
                <td key={`td-${index}`}>
                    <div 
                        className={rowClassNames()}
                        onClick={() => toggleExpand(index)}
                        key={`name-${index}`}
                        disabled={disabled}
                    >
                        {value.name}

                        <FontAwesomeIcon
                            title='Expand'
                            key={`expand-icon-${index}`}
                            icon={expanded[index] ? faChevronUp : faChevronDown} 
                            className='name-list-accordian-arrow'
                        />

                        <FontAwesomeIcon
                            title={`Delete ${value.name}`}
                            key={`delete-icon-${index}`}
                            icon={faTrashCan} 
                            className='name-list-delete'
                            onClick={() => onRemoveClicked(index)}
                        />
                    </div>
                    {expanded[index] && details(value, index)}
                </td>
            </tr>
        )
    }

    return (
        <div className='widget-box'>
            <table id='name-list-table'>
                <tbody>
                    {list.map(displayRow)}
                </tbody>
            </table>

            <button 
                className='widget-input name-list-add-btn'
                onClick={() => onAdd()}
                disabled={disabled}
            >Add
            </button>
        </div>
    );
}

export default NameList;

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

        setExpanded(prevState => {
            const updatedState = [...prevState];
            if (updatedState[index] !== undefined) {
                updatedState[index] = undefined;
            } else {
                updatedState[index] = true;
            }
            return updatedState;
        });
    };

    const onRemoveClicked = (index) => {
        if (disabled) {
            return;
        }
        onRemove(index);
    }

    const description = (key, value, bordered) => {
        return (
            <div
                className={`name-list-description-line ${bordered && 'name-list-separator'}`}
                key={key}
            >
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
            <tr key={`name-list-tr-${index}`}>
                <td key={`name-list-td-${index}`}>
                    <div
                        className={rowClassNames()}
                        onClick={() => toggleExpand(index)}
                        key={`name-list-entry-${index}`}
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
            <table className='name-list-container'>
                <tbody className='name-list-contents'>
                    {list.map(displayRow)}
                </tbody>
            </table>

            <button 
                className='widget-btn name-list-add-btn'
                onClick={() => onAdd()}
                disabled={disabled}
            >Add
            </button>
        </div>
    );
}

export default NameList;

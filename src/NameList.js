import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './style/NameList.scss'

function NameList({ list, descriptorKeys }) {
    const [expanded, setExpanded] = useState([]);

    const description = (key, value, bordered) => {
        const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        return (
            <div 
                className={`name-list-description-line ${bordered && "name-list-separator"}`}
                >{capitalize(key)}: {value[key]}
            </div>
        );
    }

    const details = (value, index) => {
        // TODO Add details based on descriptorKeys
        return (
            <div 
                className="name-list-entry name-list-details" 
                key={`details-${index}`}
                >
                    <div className="name-list-description">
                        {descriptorKeys.map((key, index) => {
                            let bordered = index < description.length - 1;
                            return description(key, value, bordered);
                        })}
                    </div>
            </div>
        )
    };

    const toggleExpand = (index) => {
        let nextExpanded = [...expanded];
        if (nextExpanded[index] !== undefined) {
            nextExpanded[index] = undefined;
        } else {
            nextExpanded[index] = true;
        }
        setExpanded(nextExpanded);
    };

    const displayRow = (value, index) => {
        return (
            <tr key={`tr-${index}`}>
                <td key={`td-${index}`}>
                    <div 
                        className="name-list-entry"
                        onClick={() => toggleExpand(index)}
                        key={`name-${index}`}
                        >{value.name} 
                            <FontAwesomeIcon 
                                icon={expanded[index] ? faChevronUp : faChevronDown} 
                                className="name-list-accordian-arrow"
                            />
                    </div>
                    {expanded[index] && details(value, index)}
                </td>
            </tr>
        )
    }

    return (
        <div id="widget-box">
            <table id="name-list-table">
                <tbody>
                    {list.map(displayRow)}
                </tbody>
            </table>
        </div>
    );
}

export default NameList;
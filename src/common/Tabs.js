import { useEffect, useReducer } from 'react';

import './style/Tabs.scss';

function Tabs({ labels, value, content, onChange }) {
    const changeTabReducer = (state, action) => {
        if (labels.includes(action)) {
            return action;
        } else {
            return state;
        }
    };
    const [selectedTab, dispatchSelectedTab] = useReducer(changeTabReducer, labels[0]);//useState(value);

    useEffect(() => {
        dispatchSelectedTab(value);
    }, [value]);

    const onTabSelect = (label) => {
        if (selectedTab !== label) {
            dispatchSelectedTab(label);

            if (onChange?.call) {
                onChange(label);
            }
        }
    }

    const tabClassNames = (label) => {
        let classNames = ['tab-label'];

        if (selectedTab === label) {
            classNames.push('tab-active');
        }
        if (labels.indexOf(label) === 0) {
            classNames.push('tab-first');
        }
        if (labels.indexOf(label) === labels.length - 1) {
            classNames.push('tab-last');
        }
        return classNames.join(' ');
    }

    return (
        <div className='tabs-container'>
            <div className='tab-labels-container'>
                {[...labels].reverse().map(label => 
                    <div
                        key={label}
                        className={`widget-btn ${tabClassNames(label)}`}
                        onClick={() => onTabSelect(label)}
                    >{label}
                    </div>
                )}
            </div>
            <div className='tab-contents-container'>
                {content && content(selectedTab)}
            </div>
        </div>
    );
}

export default Tabs;
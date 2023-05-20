import { useState } from 'react';

import './style/Tabs.scss';

function Tabs({ labels, content, onChange }) {
    const [selectedTab, updateSelectedTab] = useState(labels[0]);

    const onTabSelect = (label) => {
        if (selectedTab !== label) {
            updateSelectedTab(label);

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
        } else if (labels.indexOf(label) === labels.length - 1) {
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
                        className={`widget-input ${tabClassNames(label)}`}
                        onClick={() => onTabSelect(label)}
                    >{label}
                    </div>
                )}
            </div>
            <div className='tab-contents-container'>
                {content && content[selectedTab]}
            </div>
        </div>
    );
}

export default Tabs;
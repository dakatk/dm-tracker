import React, { useRef, useState } from 'react';

import './style/MenuBar.scss';

function MenuBar({ onSave, onLoad, disabled }) {
    const openFile = useRef(null);
    const [fileCount, setFileCount] = useState(1);

    const saveFile = () => {
        onSave(`session_${fileCount}.json`);
        setFileCount(fileCount + 1);
    }

    const loadFile = () => {
        openFile?.current?.click();
    }

    const onFileChange = () => {
        if (openFile?.current?.files.length) {
            onLoad(openFile.current.files[0]);
        }
    }

    return (
        <div className='widget-box menu-container'>
            <button 
                className='widget-btn menu-button' 
                onClick={() => saveFile()}
                disabled={disabled}
            >
                Save
            </button>

            <button 
                className='widget-btn menu-button'
                onClick={() => loadFile()}
                disabled={disabled}
            >
                Load
            </button>

            <input
                id='menu-file-dialog'
                type='file'
                onChange={onFileChange}
                ref={openFile}
                disabled={disabled}
            />
        </div>
    );
}

export default MenuBar;

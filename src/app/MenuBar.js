import React, { useRef, useState } from 'react';
import './style/MenuBar.scss';

function MenuBar({ onSave, onLoad }) {
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

    return <div className='menu-bar'>
        <button 
            className='menu-button' 
            onClick={() => saveFile()}
        >Save
        </button>

        <button 
            className='menu-button'
            onClick={() => loadFile()}
        >Load
        </button>

        <input
            style={{display: 'none'}}
            id='menu-file-dialog'
            type='file'
            onChange={onFileChange}
            ref={openFile} />
    </div>
}

export default MenuBar;
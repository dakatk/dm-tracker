import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import './style/Modal.scss';

function Modal({ title, close, contents, footer }) {
    return (
        <div id='modal-parent' className='widget-box'>
            <div id='modal-header'>
                {title}
                <FontAwesomeIcon 
                    icon={faXmark} 
                    id='modal-close-btn'
                    onClick={() => close()} />
            </div>

            <div id='modal-contents'>
                {contents}
            </div>

            <div id='modal-footer'>
                {footer}
            </div>
        </div>
    );
}

export default Modal;

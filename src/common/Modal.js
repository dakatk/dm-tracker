import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import './style/Modal.scss';

function Modal({ title, contents, footer, onClose }) {
    return (
        <div className='widget-box modal-container'>
            <div className='modal-header'>
                {title}
                <FontAwesomeIcon
                    icon={faXmark}
                    className='modal-close-btn'
                    onClick={() => onClose()} />
            </div>

            <div className='modal-contents'>
                {contents}
            </div>

            <div className='modal-footer'>
                {footer}
            </div>
        </div>
    );
}

export default Modal;

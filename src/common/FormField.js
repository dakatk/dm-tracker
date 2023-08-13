import { useContext } from 'react';

import { FormContext } from '../app/Context';

import './style/FormField.scss';

const textInput = (id, value, updateValue) => {
    return (
        <input
            className='widget-input form-field-modal-input form-field-modal-text-input' 
            type='text'
            id={id}
            name={id}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
        />
    );
}

const numberInput = (id, value, updateValue, min, max) => {
    return (
        <input
            className='widget-input form-field-modal-input form-field-modal-number-input' 
            type='number'
            id={id}
            name={id}
            value={value}
            min={min}
            max={max}
            onChange={(e) => updateValue(e.target.value)}
        />
    );
}

const selectInput = (id, value, updateValue, options) => {
    return (
        <select 
            className='widget-input form-field-modal-input form-field-modal-select-input'
            id={id}
            name={id}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
        >
            {options?.map(
                option => (
                    <option
                        key={`${id}-${option}`}
                        value={option}
                    >
                        {option}
                    </option>
                )
            )}
        </select>
    );
}

const textAreaInput = (id, value, updateValue, rows) => {
    return (
        <textarea
            className='widget-input form-field-modal-input form-field-modal-textarea-input'
            id={id}
            name={id}
            rows={rows ?? 1}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
        >
        </textarea>
    );
}

const checkboxInput = (id, value, updateValue) => {
    return (
        <input 
            className='widget-input form-field-modal-input form-field-modal-checkbox-input' 
            type='checkbox'
            id={id}
            name={id}
            checked={!!value}
            onChange={(e) => updateValue(e.target.checked)}
        />
    );
}

const renderInputType = (type, id, value, updateValue, metadata) => {
    switch (type?.toLowerCase()) {
        case 'select':
            return selectInput(id, value, updateValue, metadata?.options);
        case 'textarea':
            return textAreaInput(id, value, updateValue, metadata?.rows);
        case 'checkbox':
            return checkboxInput(id, value, updateValue);
        case 'number':
            return numberInput(id, value, updateValue, metadata?.min, metadata?.max);
        default:
            return textInput(id, value, updateValue);
    }
}

const FormField = ({ type, label, id, className, required, value, updateValue, metadata }) => {
    const form = useContext(FormContext);

    // TODO Render orange asterisk next to required field labels
    return (
        <div
            key={metadata?.key}
            className={`form-field-modal-row ${className}`}
        >
            <label 
                className='form-field-modal-label'
                htmlFor={id}
            >
                {label}
            </label>

            {renderInputType(type, id, value, updateValue, metadata)}
            {form.validationErrors[id] && 
                <div 
                    className='form-field-modal-validation'
                >
                    {form.validationErrors[id]}
                </div>
            }
        </div>
    );
}

const FormFooter = ({ saveText, closeText, saveToolTip, closeToolTip, onSave, onClose }) => {
    return (
        <>
            <button
                className='widget-btn form-field-modal-btn'
                title={saveToolTip ?? 'Save'}
                onClick={() => onSave()}
            >
                {saveText ?? 'Save'}
            </button>

            <button
                className='widget-btn form-field-modal-btn'
                title={closeToolTip ?? 'Close'}
                onClick={() => onClose()}
            >
                {closeText ?? 'Close'}
            </button>
        </>
    )
}

const validate = (value, prop, label) => {
    if (!(value === 0 || value === '0') && (value === '' || !value)) {
        return { [prop]: `Missing value for '${label || prop}'` };
    } else {
        return {};
    }
}

export {
    FormField,
    FormFooter,
    validate
}
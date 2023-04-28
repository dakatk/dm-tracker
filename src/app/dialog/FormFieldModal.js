import { useState } from 'react';
import Modal from '../../common/Modal';

import './style/FormFieldModal.scss';

function FormFieldModal({ form, save, close, defaultValues }) {
    const [formValues, setFormValues] = useState(defaultValues || {});
    const [validationErrors, setValidationErrors] = useState({});

    const updateField = (field, value) => {
        setFormValues({ ...formValues, [field.prop]: value });
    }

    const validateForm = () => {
        const validationResults = {};

        for (const field of form.fields) {
            if (!field.required) {
                continue;
            }

            const formValue = formValues[field.prop];
            if (!formValue || !formValue?.trim()) {
                validationResults[field.prop] = `'${field.label}' is required`;
            }
        }
        return validationResults;
    }

    const saveForm = () => {
        const validationResults = validateForm();
        setValidationErrors(validationResults);

        if (Object.keys(validationResults).length === 0) {
            save(formValues);
        }
    }

    const formInputId = (field) => {
        const formName = form.title
            .replace(/\s+/g, '-');

        const fieldName = field.prop
            .replace(/(\s+|\s*_+\s*)/g, '-');

        return `${formName}-${fieldName}`
            .toLowerCase();
    } 

    const textInput = (field) => {
        return (
            <input 
                className='widget-input form-field-modal-input form-field-modal-text-input' 
                type='text'
                id={formInputId(field)}
                name={formInputId(field)}
                onChange={(e) => updateField(field, e.target.value)}
            />
        );
    }

    const selectInput = (field) => {
        return (
            <select 
                className='widget-input form-field-modal-input form-field-modal-select-input'
                id={formInputId(field)}
                name={formInputId(field)}
                onChange={(e) => updateField(field, e.target.value)}
            >
                {field.options?.map(
                    fieldOption => (
                        <option
                            key={`${field.prop}-${fieldOption}`}
                            value={fieldOption}
                        >
                            {fieldOption}
                        </option>
                    )
                )}
            </select>
        );
    }

    const textAreaInput = (field) => {
        return (
            <textarea
                className='widget-input form-field-modal-input form-field-modal-textarea-input'
                id={formInputId(field)}
                name={formInputId(field)}
                rows={field.rows ?? 1}
            >
            </textarea>
        );
    }

    const checkboxInput = (field) => {
        return (
            <input 
                className='widget-input form-field-modal-input form-field-modal-checkbox-input' 
                type='checkbox'
                id={formInputId(field)}
                name={formInputId(field)}
                onChange={(e) => updateField(field, e.target.checked)}
            />
        );
    }

    const renderFieldInput = (field) => {
        switch (field.type?.toLowerCase()) {
            case 'select':
                return selectInput(field);
            case 'textarea':
                return textAreaInput(field);
            case 'checkbox':
                return checkboxInput(field);
            default:
                return textInput(field);
        }
    }

    const renderValidationError = (field) => {
        if (field.prop in validationErrors) {
            return validationErrors[field.prop];
        }
    }

    const renderField = (field) => {
        if (field.prop) {
            return (
                <div 
                    key={field.prop} 
                    className='form-field-modal-row'
                >
                    <label 
                        className='form-field-modal-label'
                        htmlFor={formInputId(field)}
                    >{field.label}
                    </label>

                    {renderFieldInput(field)}
                    {renderValidationError(field)}
                </div>
            );
        }
    }

    const modalContents = () => {
        return (
            <div id='form-field-modal-body'>
                {form.fields.map(renderField)}
            </div>
        );
    }

    const modalFooter = () => {
        return (
            <>
                <button
                    className='widget-input form-field-modal-btn'
                    onClick={() => saveForm()}>Save
                </button>

                <button
                    className='widget-input form-field-modal-btn'
                    onClick={() => close()}>Close
                </button>
            </>
        )
    }

    return (
        <Modal
            title={form.title}
            close={close}
            contents={modalContents()}
            footer={modalFooter()}
        />
    );
}

export default FormFieldModal;

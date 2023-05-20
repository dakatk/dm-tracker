import { useState } from 'react';

import Modal from '../../common/Modal';

import './style/FormFieldModal.scss';

function FormFieldModal({ form, save, close, defaultValues, onUpdateField, onSaveForm, getFormValue, renderModalContents }) {
    const [formValues, setFormValues] = useState(defaultValues || {});
    const [validationErrors, setValidationErrors] = useState({});

    const updateField = (field, value) => {
        if (onUpdateField?.call) {
            onUpdateField(formValues, setFormValues, field, value);
        } else {
            setFormValues({ ...formValues, [field.prop]: value });
        }
    }

    const defaultInputValue = (type) => {
        switch (type) {
            case 'number':
                return 0;
            case 'checkbox':
                return false;
            default:
                return '';
        }
    }

    const fieldValue = (field, page) => {
        if (page && (page in formValues)) {
            return formValues[page][field.prop] ||
                defaultInputValue(field.type);
        } else {
            return formValues[field.prop] || 
                defaultInputValue(field.type);
        }
    }

    const validateForm = () => {
        const validationResults = {};

        for (const field of form.fields) {
            if (!field.required) {
                continue;
            }
            
            let formValue;
            if (getFormValue?.call) {
                formValue = getFormValue(formValues, field.prop);
            } else {
                formValue = formValues[field.prop];
            }

            if (
                (formValue === null || formValue === undefined) ||
                (formValue?.trim && !formValue?.trim())
            ) {
                validationResults[field.prop] = `'${field.label}' is required`;
            }
        }
        return validationResults;
    }

    const saveForm = () => {
        const validationResults = validateForm();
        setValidationErrors(validationResults);

        if (Object.keys(validationResults).length === 0) {
            if (onSaveForm?.call) {
                onSaveForm(formValues);
            } else {
                save(formValues);
            }
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

    const basicInput = (field, page, type) => {
        return (
            <input
                className='widget-input form-field-modal-input form-field-modal-text-input' 
                type={type || 'text'}
                id={formInputId(field)}
                name={formInputId(field)}
                value={fieldValue(field, page)}
                onChange={(e) => updateField(field, page, e.target.value)}
            />
        );
    }

    const selectInput = (field, page) => {
        return (
            <select 
                className='widget-input form-field-modal-input form-field-modal-select-input'
                id={formInputId(field)}
                name={formInputId(field)}
                // value={fieldValue(field, page)}
                onChange={(e) => updateField(field, page, e.target.value)}
            >
                {field.options?.map(
                    fieldOption => (
                        <option
                            key={`${field.prop}-${fieldOption}`}
                            value={fieldOption}
                        >{fieldOption}
                        </option>
                    )
                )}
            </select>
        );
    }

    const textAreaInput = (field, page) => {
        return (
            <textarea
                className='widget-input form-field-modal-input form-field-modal-textarea-input'
                id={formInputId(field)}
                name={formInputId(field)}
                rows={field.rows ?? 1}
                // value={fieldValue(field, page)}
                onChange={(e) => updateField(field, page, e.target.value)}
            >
            </textarea>
        );
    }

    const checkboxInput = (field, page) => {
        return (
            <input 
                className='widget-input form-field-modal-input form-field-modal-checkbox-input' 
                type='checkbox'
                id={formInputId(field)}
                name={formInputId(field)}
                checked={!!fieldValue(field, page)}
                onChange={(e) => updateField(field, page, e.target.checked)}
            />
        );
    }

    const renderFieldInput = (field, page) => {
        switch (field.type?.toLowerCase()) {
            case 'select':
                return selectInput(field, page);
            case 'textarea':
                return textAreaInput(field, page);
            case 'checkbox':
                return checkboxInput(field, page);
            case 'number':
                return basicInput(field, page, 'number');
            default:
                return basicInput(field, page);
        }
    }

    const renderValidationError = (field) => {
        if (field.prop in validationErrors) {
            return validationErrors[field.prop];
        }
    }

    const renderField = (field, page) => {
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

                    {renderFieldInput(field, page)}
                    {renderValidationError(field)}
                </div>
            );
        }
    }

    const renderFormFields = (page) => {
        return (
            <div className='form-field-modal-body tabbed'>
                {form.fields.map(field => renderField(field, page))}
            </div>
        );
    }

    const modalContents = () => {
        if (renderModalContents?.call) {
            return renderModalContents(renderFormFields);
        } else {
            return renderFormFields();
        }
    }

    const modalFooter = () => {
        return (
            <>
                <button
                    className='widget-input form-field-modal-btn'
                    onClick={() => saveForm()}
                >Save
                </button>

                <button
                    className='widget-input form-field-modal-btn'
                    onClick={() => close()}
                >Close
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

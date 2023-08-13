import { useContext } from 'react';

import { FormContext } from '../app/Context';

import Modal from './Modal';
import { FormField, FormFooter } from './FormField';

const findFormFieldProps = (children) => {
    if (!children) {
        return null;
    }

    if (!children.map) {
        children = [children];
    }
    return children.map(child => {
        if (child.type === FormField) {
            return child.props;
        } else {
            return findFormFieldProps(child.props?.children);
        }
    })
}

function Form({ title, submitText, closeText, submitToolTip, closeToolTip, onSubmit, onValidationError, ignoreValidation, children }) {
    const form = useContext(FormContext);

    const formFieldProps = ignoreValidation !== false ?
        findFormFieldProps(children)
            .flat(2)
            .filter(child => child !== null) : [];

    const onAttemptSubmit = () => {
        if (ignoreValidation || !formFieldProps.length) {
            onSubmit();
            return;
        }

        let hasError = false;
        const nextValidationErrors = {};

        for (const formField of formFieldProps) {
            let validationError = errorMessage(formField.value, formField.label, formField.required);

            if (!validationError && formField.validate?.call) {
                validationError = formField.validate(formField.value);
            }
            if (validationError) {
                if (!hasError) {
                    if (onValidationError?.call) {
                        onValidationError(formField.id, validationError);
                    }
                    hasError = true;
                }
                nextValidationErrors[formField.id] = validationError;
            }
        }

        if (!hasError) {
            onSubmit();
        }
        form.updateValidationErrors(nextValidationErrors);
    }

    const errorMessage = (value, label, required) => {
        if (!required) {
            return null;
        } else if (!(value === 0 || value === '0') && (value === '' || !value)) {
            return `'${label}' is required`;
        }
    }

    const onClose = () => {
        form.closeForm();
        form.updateValidationErrors({});
    }

    return (
        <Modal 
            title={title}
            close={onClose}
            contents={children}
            footer={<FormFooter
                saveText={submitText}
                closeText={closeText}
                saveToolTip={submitToolTip}
                closeToolTip={closeToolTip}
                onSave={onAttemptSubmit}
                onClose={onClose}
            />}
        />
    );
}

export default Form;
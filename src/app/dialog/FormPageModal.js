import { useState } from 'react';

import Tabs from '../../common/Tabs';
import FormFieldModal from './FormFieldModal';

function FormPageModal({ form, save, close, defaultValues, pages }) {
    const [currentPage, setCurrentPage] = useState(pages[0]);

    const updateFieldForPage = (formValues, setFormValues, field, value) => {
        setFormValues({
            ...formValues,
            [currentPage]: {
                ...formValues[currentPage],
                [field.prop]: value
            }
        });
    }

    const saveFormPages = (formValues) => {
        const formValuesArray = new Array(pages.length);
        for (const [page, formValuesForPage] of Object.entries(formValues)) {
            const index = pages.indexOf(page);
            if (index < 0) {
                continue;
            }
            formValuesArray[index] = formValuesForPage;
        }
        save(formValuesArray);
    }

    const getFormValueForPage = (formValues, prop) => {
        return formValues[currentPage][prop];
    }

    const renderModalPages = (renderFormFields) => {
        const tabContentsDict = {};
        for (const page of pages) {
            tabContentsDict[page] = renderFormFields(page);
        }
        return (
            <Tabs 
                labels={pages}
                content={tabContentsDict}
                onChange={setCurrentPage}
            />
        );
    }

    return (
        <FormFieldModal
            form={form}
            save={save}
            close={close}
            defaultValues={defaultValues}
            onUpdateField={updateFieldForPage}
            onSaveForm={saveFormPages}
            getFormValue={getFormValueForPage}
            renderModalContents={renderModalPages}
        />
    );
}

export default FormPageModal;
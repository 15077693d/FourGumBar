import {useState} from 'react';

const useForm = (initForm) => {
     const [form, setForm] = useState(initForm)
     const setFormInput = (key,value) => {
        let newForm  = JSON.parse(JSON.stringify(form))
        newForm[key] = value
        setForm(newForm)
     }
     const resetFormInputs = () => {
      setForm(initForm)
     }
    return (
        {
       ...form,
        setFormInput,
        resetFormInputs
        }
    );
};

export default useForm;
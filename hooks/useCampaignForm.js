import {useState} from 'react';

const useCampaignForm = () => {
     const [form, setForm] = useState({
        title:"",
        category:"",
        minETH:"",
        targetETH:"",
        description:"",
        setFormInpu:""
     })
     const setFormInput = (key,value) => {
        let newForm  = JSON.parse(JSON.stringify(form))
        newForm[key] = value
        setForm(newForm)
     }
     const resetFormInputs = () => {
      setForm({
         title:"",
         category:"",
         minETH:"",
         targetETH:"",
         description:"",
         setFormInpu:""
      })
     }
    return (
        {
       ...form,
        setFormInput,
        resetFormInputs
        }
    );
};

export default useCampaignForm;
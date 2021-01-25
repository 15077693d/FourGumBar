import React from 'react';
import { column_space_between,  blue_big_btn, medium_margin_bottom } from '../../styles/common.module.css'
import { form_input, form_textarea, form_container } from '../../styles/components/createCampaignForm.module.css'
import ProcessingNodes from '../processNodes'
import useForm from '../../hooks/useForm'
import { addCampaignBudget } from '../../ethereum/campaign'
import useProcess from '../../hooks/useProcess'
const createBudgetForm = ({manager,campaignAddress}) => {
    const processData= useProcess()
    const { status,setAddress,hash,setHash,setStatus} = processData
    const finalAddress=processData.address

    const { name,amount,address,description,setFormInput, resetFormInputs} = useForm({name:"",amount:"",address:"",description:""})
    async function handleSubmit(e) {
        e.preventDefault()
        setStatus("confirmed")
        try {
            await addCampaignBudget(campaignAddress,{name,value:amount,recipient:address,description},manager,setHash)
            setStatus("succeed")
            resetFormInputs()
        } catch (error) {
            console.log(error)
            setStatus("error")
        }
    }
    
   
    const formNode = <form className={column_space_between} onSubmit={handleSubmit}>
    <div>
        <input onChange={(e) => setFormInput('name',e.target.value)} value={name} className={form_input} type="text" placeholder="預算名稱" required />
        <input onChange={(e) => setFormInput('amount',e.target.value)} value={amount} className={form_input} step="0.01" type="number" placeholder="預算金額" required />
        <input onChange={(e) => setFormInput('address',e.target.value)} value={address} className={form_input} type="text" placeholder="收款地址" required />
        <textarea onChange={(e) => setFormInput('description',e.target.value)} value={description} className={form_textarea} placeholder="描述" required />
    </div>
    <button className={`${blue_big_btn} ${medium_margin_bottom}`} type="submit">確定</button>
</form>

return (
    <div className={form_container}>
        <div></div>
        <ProcessingNodes address={finalAddress} basedNode={formNode}  status={status}  hash={hash} 
        clickConfirmed={()=>{setStatus("based");}} />
         <div></div>
    </div>
);
};

export default createBudgetForm;
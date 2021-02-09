import React from 'react';
import { column_space_between, blue_btn, space_between, bold, blue, blue_big_btn, medium_margin_bottom } from '../../styles/common.module.css'
import { form_input, form_textarea, form_container } from '../../styles/components/createCampaignForm.module.css'
import { createCampaign, getCampaignAddresses } from "../../ethereum/campaign"
import useForm from '../../hooks/useForm'
import ProcessingNodes from '../processNodes'
import useProcess from '../../hooks/useProcess'
const CreateCampaignForm = ({ renewCampaigns, handleClickAdd, renewBalance }) => {
   const { status,address,setAddress,hash,setHash,setStatus} = useProcess()
    const { title,category,minETH,targetETH,description,setFormInput, resetFormInputs} = useForm({
        title:"",category:"",minETH:"",targetETH:"",description:""
    })
    async function handleSubmit(e) {
        e.preventDefault()
        setStatus("confirmed")
        try {
            await createCampaign(minETH, category, description, title, targetETH, setHash)
            if (renewCampaigns) {
                let [b, c, addresses] = await Promise.all(
                    [
                        renewCampaigns(),
                        renewBalance(),
                        getCampaignAddresses()
                    ]
                )
                setAddress(addresses[addresses.length - 1])
            } else {
                let [b, addresses] = await Promise.all(
                    [
                        renewBalance(),
                        getCampaignAddresses()
                    ]
                )
                setAddress(addresses[addresses.length - 1])
            }
            setStatus("succeed")
            resetFormInputs()
        } catch (error) {
            console.log(error)
            setStatus("error")
        }
        // await createCampaign("0.6","科技","根據愛因斯坦的相對論，時間旅行從理論上是成立的，需要資金投資。","時光機 — 你能夠穿越任何時間","100",setHash)
        //await createCampaign("0.3", "家居", "這款將科學與零食相結合的機器能夠集酷炫、美味與古怪三者於一體。", "食物球化小用具", "2", setHash)
    }

    const formNode = <form className={column_space_between} onSubmit={handleSubmit}>
        <div>
            <input onChange={(e) => setFormInput('title',e.target.value)} value={title} className={form_input} id="title" type="text" placeholder="項目名稱" required />
            <select onChange={(e) => setFormInput('category',e.target.value)} value={category} className={form_input} id="category" name="項目類別" required>
                <option value="" selected disabled >項目類別</option>
                <option value="科技">科技</option>
                <option value="家居">家居</option>
                <option value="創意">創意</option>
                <option value="生活">生活</option>
            </select>
            <input onChange={(e) => setFormInput('minETH',e.target.value)} value={minETH} className={form_input} step="0.01" id="minETH" type="number" placeholder="最少支付(ETH)" required />
            <input onChange={(e) => setFormInput('targetETH',e.target.value)} value={targetETH} className={form_input} step="0.01" id="targetETH" type="number" placeholder="目標投資(ETH)" required />
            <textarea onChange={(e) => setFormInput('description',e.target.value)} value={description} className={form_textarea} id="description" placeholder="描述" required />
        </div>
        <button className={`${blue_big_btn} ${medium_margin_bottom}`} type="submit">確定</button>
    </form>

    return (
        <div className={form_container}>
            <div style={{ height: '10%' }} className={`${space_between} ${medium_margin_bottom}`}>
                <span className={`${bold} ${blue}`}>增加項目</span>
                <button onClick={handleClickAdd} className={blue_btn}>返回</button>
            </div>
            <ProcessingNodes loadingSentence={"正在處理你的項目......"} successSentence={"你的項目完成上傳！"} address={address} basedNode={formNode}  status={status}  hash={hash} clickConfirmed={()=>{setStatus("based");handleClickAdd();}} />
            <div></div>
        </div>
    );
};

export default CreateCampaignForm;
import React from 'react';
import { yellow_btn, space_between, bold, blue, blue_big_btn, medium_margin_bottom } from '../styles/common.module.css'
import { form_input, form_textarea, form_container, loading } from '../styles/components/createCampaignForm.module.css'
import { createCampaign } from "../ethereum/campaign"
import { SpinnerCircular } from 'spinners-react';
import Checkmark from './checkmark';
import { useState } from "react"
const CreateCampaignForm = ({ handleClickAdd }) => {
    const [confirmed, setConfirmed] = useState(false)
    const [succeed, setSucceed] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()
        const title = document.getElementById("title").value
        const category = document.getElementById("category").value
        const minETH = document.getElementById("minETH").value
        const targetETH = document.getElementById("targetETH").value
        const description = document.getElementById("description").value
        setConfirmed(!confirmed)
        // const receipt = await createCampaign(minETH, category, description, title, targetETH)
        const receipt = await createCampaign("0.3", "家居", "這款將科學與零食相結合的機器能夠集酷炫、美味與古怪三者於一體。", "食物球化小用具", "2")
        setSucceed(true)
        // createCampaign("0.6","科技","根據愛因斯坦的相對論，時間旅行從理論上是成立的，需要資金投資。","時光機 — 你能夠穿越任何時間","100")
    }
    const successNode = (address) => {
        const url = `https://rinkeby.etherscan.io/tx/${address}`
        return <div className={loading}>
            <Checkmark />
            <div>你的項目完成上傳！</div>
            <a className={bold} style={{ color: "#452ba0" }} href={url}>點擊了解項目詳情</a>
            <button style={{ marginTop: 40 }} className={blue_big_btn} >創建項目</button>
        </div>
    }
    const formNode = <form onSubmit={handleSubmit}>
        <input className={form_input} id="title" type="text" placeholder="項目名稱" />
        <select className={form_input} id="category" name="項目類別">
            <option value="" selected disabled >項目類別</option>
            <option value="科技">科技</option>
            <option value="家居">家居</option>
            <option value="創意">創意</option>
            <option value="生活">生活</option>
        </select>
        <input className={form_input} step="0.01" id="minETH" type="number" placeholder="最少支付(ETH)" />
        <input className={form_input} step="0.01" id="targetETH" type="number" placeholder="目標投資(ETH)" />
        <textarea className={form_textarea} id="description" placeholder="描述" />
        <button className={blue_big_btn} type="submit">確定</button>
    </form>
    const loadingNode = (hash) => {
        const url = `https://rinkeby.etherscan.io/tx/${hash}`
        return <div className={loading}>
            <SpinnerCircular size={150} thickness={100} speed={100} color="#452ba0" secondaryColor="rgba(0, 0, 0, 0.44)" />
            <div>正在處理你的項目......</div>
            <a className={bold} style={{ color: "#452ba0" }} href={url}>點擊了解處理進度</a>
        </div>
    }
    return (
        <div id="form_container" className={form_container}>
            <div className={`${space_between} ${medium_margin_bottom}`}>
                <span className={`${bold} ${blue}`}>增加項目</span>
                <button onClick={handleClickAdd} className={yellow_btn}>返回</button>
            </div>
            <div style={{ display: succeed ? "none" : "block" }}>
                {confirmed ? loadingNode("123") : formNode}
            </div>
            <div style={{ display: succeed ? "block" : "none" }}>
                {successNode("123")}
            </div>
        </div>
    );
};

export default CreateCampaignForm;
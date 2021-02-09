import React from 'react';
import { blue_big_btn, dark_grey, space_between, column_space_between } from '../styles/common.module.css'
import { pay_pad, bar_shape, pay_pad_value } from '../styles/components/payBtn.module.css';
import { useState } from 'react';
import useProcess from '../hooks/useProcess' 
import { contribute } from '../ethereum/campaign'
import ProcessingNodes from '../components/processNodes'
const PayBtn = ({renewContributions,setRecentETH,recentETH, minETH, active, setActive, campaignAddress,renewCampaign }) => {
    const { status,hash,setHash,setStatus} = useProcess()
    const [eth, setETH] = useState(minETH)
    async function handleSubmit (e) {
        let userETH = Number(document.getElementById('userETH').textContent.split(' ')[0]) - Number(eth)
        e.preventDefault();
        setStatus('confirmed')
        try{
            await contribute(eth, campaignAddress,setHash)
            if (renewCampaign){
                renewCampaign(campaignAddress)
            }
            setRecentETH(Number(eth)+Number(recentETH))
            setStatus('succeed')
            renewContributions()
            document.getElementById('userETH').textContent = `${userETH.toFixed(2)} ETH`
        }catch (e){
            console.log(e)
            setStatus("error")
        }
    }

    const formNode =  <form onSubmit={handleSubmit} className={`${pay_pad} ${column_space_between}`}>
    <div className={bar_shape}></div>
    <div className={pay_pad_value}>
        <span className={dark_grey}>金額</span>
        <div className={space_between}>
            <input min={minETH} value={eth} onChange={(e) => setETH(e.target.value)} placeholder={minETH} type="number" step="0.001" />
            <span>ETH</span>
        </div>
    </div>
         <button  type="submit" className={blue_big_btn} >我要課金！</button>
    </form>
    if (active) {
        return status==="based"?<ProcessingNodes isPayment={true} address={campaignAddress} basedNode={formNode}  status={status}  hash={hash} clickConfirmed={()=>{setStatus("based")}} />
        :<div className={`${pay_pad}`}>
<ProcessingNodes loadingSentence={"正在處理你的款項......"} successSentence={"你的款項已過帳到項目！"}  address={campaignAddress} basedNode={formNode}  isPayment={true} status={status}  hash={hash} clickConfirmed={()=>{setStatus("based");setActive(false);}} />
        </div>
    } else {
        return (
            <button onClick={() => setActive(true)} className={blue_big_btn} >我要課金！</button>
        );
    }
};

export default PayBtn;
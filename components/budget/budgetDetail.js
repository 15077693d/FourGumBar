import React, {useState, useEffect} from 'react';
import EthBar from '../ethBar';
import { form_input, form_textarea } from '../../styles/components/createCampaignForm.module.css'
import { blue_big_btn, space_around } from '../../styles/common.module.css'
import {approveRequest,executeRequest} from '../../ethereum/campaign'
import {SpinnerCircular} from 'spinners-react'
const BudgetDetail = ({ isContributor,addOneVoteOnBudget,completeBudget,isManager, budget }) => {
    let { eth, address, description, amount, total, index, campaignAddress, complete } = budget
    const [status, setStatus] = useState()
    const pass = Number(amount) * 100 / Number(total) > 0.5
    useEffect(()=>{
        if (!complete){
            if(isManager){
                setStatus('executeinit')
            }else{
                setStatus('voteinit')
            }
        }else{
            setStatus('ed')
        }
    },[isManager])
    const handleVoteClick = async () => {
        setStatus("ing")
        try{
            await approveRequest(campaignAddress,index)
            setStatus("ed")
            addOneVoteOnBudget(budget.index)
        }catch{
            setStatus("voteinit")    
        }
    }

    const handleExecuteClick = async () => {
        setStatus("ing")
        try{
            await executeRequest(campaignAddress,index)
            setStatus("ed")
            completeBudget(budget.index)
            location.reload();
        }catch{
            setStatus("executeinit")    
        }
    }

    let btnNode;
    switch (status) {
        case "ing":
            btnNode =   <button  style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={blue_big_btn}>
                <SpinnerCircular size={50} thickness={150} speed={100} color="#ffffff" secondaryColor="rgba(0, 0, 0, 0.44)" />
            </button>
            break;
        case "voteinit":
            btnNode =  isContributor?<button onClick={handleVoteClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={blue_big_btn}>
            通過
            </button>:null
            break;
        case "executeinit":
            btnNode =  pass?<button onClick={handleExecuteClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={blue_big_btn} >
            執行
            </button>:null
            break;
        default:
            btnNode = null
            break
    }
    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around" }} >
            <EthBar bgColor={complete?"#F2F4F5":undefined} denominator={total} numerator={amount} isVote/>
            <div style={{ marginTop:20 }} className={`${form_input} ${space_around}`} >
                <span>金額</span>
                <span style={{ width: "40%", wordBreak: "break-all" }}>{eth} ETH</span>
            </div>
            <div className={`${form_input} ${space_around}`}>
                <span>地址</span>
                <span style={{ width: "40%", wordBreak: "break-all" }}>{address}</span>
            </div>

            <div className={`${form_textarea} ${space_around}`}>
                <span>描述</span>
                <span style={{ width: "40%", wordBreak: "break-all" }}>
                    {description}
                </span>
            </div>
            {btnNode}
        </div>
    );
};

export default BudgetDetail;
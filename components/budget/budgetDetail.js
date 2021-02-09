import React, {useState} from 'react';
import EthBar from '../ethBar';
import { form_input, form_textarea } from '../../styles/components/createCampaignForm.module.css'
import { blue_big_btn, space_around } from '../../styles/common.module.css'
import {approveRequest} from '../../ethereum/campaign'
import {SpinnerCircular} from 'spinners-react'
const BudgetDetail = ({addOneVoteOnBudget, budget, initStatus }) => {
    let { eth, address, description, amount, pass, total, index, campaignAddress } = budget

    const [status, setStatus] = useState(initStatus)
    const handleClick = async () => {
        setStatus("voting")
        try{
            await approveRequest(campaignAddress,index)
            setStatus("voted")
            addOneVoteOnBudget(budget.index)
        }catch{
            setStatus("init")    
        }
    }

    let btnNode;
    switch (status) {
        case "voted":
            btnNode =  <button onClick={handleClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={blue_big_btn} disabled>
            通過
        </button>
            break;
        case "voting":
            btnNode =   <button onClick={handleClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={blue_big_btn}>
                <SpinnerCircular size={50} thickness={150} speed={100} color="#ffffff" secondaryColor="rgba(0, 0, 0, 0.44)" />
            </button>
            break;
        default:
            btnNode =  <button onClick={handleClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={blue_big_btn}>
            通過
        </button>
            break;
    }
    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around" }} >
            <EthBar denominator={total} numerator={amount} isVote/>
            <div className={`${form_input} ${space_around}`}>
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
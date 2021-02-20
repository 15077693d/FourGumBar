import React, {useState, useEffect,useContext} from 'react';
import EthBar from '../ethBar';
import { form_input, form_textarea } from '../../styles/components/createCampaignForm.module.css'
import { blue_big_btn, space_around } from '../../styles/common.module.css'
import {approveRequest,executeRequest} from '../../ethereum/campaign'
import {SpinnerCircular} from 'spinners-react'
import {accountContext} from '../../hooks/accountContext'
import {managerContext} from '../../hooks/managerContext'
const BudgetDetail = ({addOneVoteOnBudget,completeBudget, budget }) => {
    let { eth, address, description, amount, total, index, campaignAddress, complete } = budget
    const [status, setStatus] = useState()
    const account = useContext(accountContext)
    const {theManager} = useContext(managerContext)
    useEffect(()=>{
        if (!complete){
            if(account===theManager){
                setStatus('executeinit')
            }else{
                setStatus('voteinit')
            }
        }
    },[])
    const handleVoteClick = async () => {
        setStatus("ing")
        try{
            await approveRequest(campaignAddress,index)
            setStatus("voted")
            addOneVoteOnBudget(budget.index)
        }catch{
            setStatus("voteinit")    
        }
    }

    const handleExecuteClick = async () => {
        setStatus("ing")
        try{
            await executeRequest(campaignAddress,index)
            setStatus("executed")
            completeBudget(budget.index)
        }catch{
            setStatus("executeinit")    
        }
    }

    let btnNode;
    btnNode = <button onClick={handleExecuteClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={blue_big_btn} >
             執行
         </button>
    switch (status) {
        // case "voted":
        //     btnNode =  <button  style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={blue_big_btn} disabled>
        //     通過
        //     </button>
        //     break;
        case "ing":
            btnNode =   <button  style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={blue_big_btn}>
                <SpinnerCircular size={50} thickness={150} speed={100} color="#ffffff" secondaryColor="rgba(0, 0, 0, 0.44)" />
            </button>
            break;
        case "voteinit":
            btnNode =  <button onClick={handleVoteClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={blue_big_btn}>
            通過
            </button>
            break;
        case "executeinit":
            btnNode =  <button onClick={handleExecuteClick} style={{display:'flex',alignItems:'center',justifyContent:'center'}} className={blue_big_btn} >
            執行
            </button>
            break;
        default:
            btnNode = null
            break
    }
    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around" }} >
            <EthBar bgColor={complete?"#F2F4F5":undefined} denominator={total} numerator={amount} isVote/>
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
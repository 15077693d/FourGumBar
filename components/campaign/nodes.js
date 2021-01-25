import React from 'react';
import { useState, useEffect } from 'react'
import { column_space_between, blue_big_btn, blue_btn, yellow_btn, space_between, bold, blue, small_margin_bottom, medium_margin_bottom } from '../../styles/common.module.css'
import { budgetItems } from '../../styles/components/budgetItem.module.css'
import { form_container } from '../../styles/components/createCampaignForm.module.css'
import EthBar from '../ethBar'
import CampaignDetail from './campaignDetail'
import PayBtn from '../payBtn'
import { getContributions, getCampaignBudgets } from '../../ethereum/campaign'
import BudgetItem from '../budget/budgetItem'
import CreateBudgetForm from '../budget/createBudgetForm'
import BudgetDetail from '../budget/budgetDetail'

export const CampaignDetailNode = ({ setPage, campaign, renewCampaign, setActive, handleBack, active }) => {
    let { category, title, target, minETH, address } = campaign
    const [recentETH, setRecentETH] = useState(campaign.recentETH)
    const [contributions, setContributions] = useState(null)
    const renewContributions = () => {
        getContributions(address).then(_contributions => setContributions(_contributions))
    }
    useEffect(() => {
        renewContributions()
    }, [])
    return <div className={`${form_container} ${column_space_between}`}>
        <div className={`${space_between} ${medium_margin_bottom}`}>
            <span className={`${bold} ${blue}`}>{category}</span>
            <button onClick={() => setPage('budgets')} className={yellow_btn}>支岀預算</button>
            <button onClick={handleBack} className={blue_btn}>返回</button>
        </div>
        <div className={`${bold} ${small_margin_bottom}`}>{title}</div>
        <EthBar numerator={recentETH} denominator={target} className={medium_margin_bottom} />
        <CampaignDetail contributions={contributions} campaign={campaign} />
        <PayBtn renewContributions={renewContributions} recentETH={recentETH} setRecentETH={setRecentETH} renewCampaign={renewCampaign} campaignAddress={address} minETH={Number(minETH)} active={active} setActive={setActive} />
    </div>
}

export const BudgetsNode =  ({ isManager, setPage, handleClickBudget, address }) => {
    const [budgets, setBudgets] = useState([])
    useEffect(async ()=>{
        setBudgets(await getCampaignBudgets(address))
    },[])
    return <div className={`${form_container}`}>
        <div className={`${space_between} ${medium_margin_bottom}`}>
            <span className={`${bold} ${blue}`}>支岀預算</span>
            <button onClick={() => setPage('details')} className={blue_btn}>返回</button>
        </div>
        <div className={budgetItems}>
            {budgets.map((budget,i) =>
                <BudgetItem key={i} handleClick={() => handleClickBudget(budget)} budget={budget} />)}
        </div>
        <button onClick={() => setPage('addBudgets')} className={blue_big_btn} >增加預算</button>
    </div>
}


export const AddBudgetNode = ({ setPage,manager,campaignAddress }) => {
    console.log(manager)
    return <div className={`${form_container} ${column_space_between}`}>
        <div className={`${space_between} ${medium_margin_bottom}`}>
            <span className={`${bold} ${blue}`}>增加支岀預算</span>
            <button onClick={() => setPage('budgets')} className={blue_btn}>返回</button>
        </div>
        <CreateBudgetForm manager={manager} campaignAddress={campaignAddress}/>
    </div>
}


export const BudgetDetailNode = ({ budget, setPage }) => {
    return <div className={`${form_container} ${column_space_between}`}>
        <div className={`${space_between} ${medium_margin_bottom}`}>
            <span className={`${bold} ${blue}`}>{budget.item}</span>
            <button onClick={() => setPage("budgets")} className={blue_btn}>返回</button>
        </div>
        <BudgetDetail budget={budget} />
    </div>
}
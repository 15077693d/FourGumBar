import React from 'react';
import { useState, useEffect, useContext } from 'react'
import { overlay } from '../../styles/common.module.css'
import { campaign_container } from '../../styles/pages/index.module.css'
import { Router } from '../../routes'
import { CampaignDetailNode, BudgetsNode, AddBudgetNode, BudgetDetailNode } from './nodes'
import { getCampaignBudgets } from '../../ethereum/campaign'
import useBudgets from '../../hooks/useBudgets'
import {managerContext} from '../../hooks/managerContext'
const Campagin = ({ setSelectedCampaign, campaign, renewCampaign }) => {
    const {setManager} = useContext(managerContext)
    let [active, setActive] = useState(false)
    let [page, setPage] = useState('details')
    const {currectBudget, setCurrentBudget,budgets,setBudgets,appendBudget,addOneVoteOnBudget, completeBudget} = useBudgets(campaign.approverCount)
    useEffect(async ()=>{
        setManager(campaign.manager)
        setBudgets(await getCampaignBudgets(campaign.address))
    },[])
    function handleClick() {
        setActive(!active)
    }
    function handleBackHome() {
        window.history.replaceState(null, null, `/`);
        if (setSelectedCampaign) {
            setSelectedCampaign(false)
        } else {
            Router.pushRoute('home')
        }
    }
    function handleClickBudget(budget) {
        setCurrentBudget(budget)
        setPage("budgetDetails")
    }
    return <div className={campaign_container}>
        {active ? <div onClick={handleClick} className={overlay}></div> : null}
        <CampaignDetailNode style={{display:page==="details"?"":"none"}} setPage={setPage} handleBack={handleBackHome} active={active} campaign={campaign} renewCampaign={renewCampaign} setActive={setActive} />
        <BudgetsNode  style={{display:page==="budgets"?"":"none"}}  setPage={setPage} handleClickBudget={handleClickBudget} budgets={budgets} />
        <AddBudgetNode latestIndex={budgets.length} style={{display:page==="addBudgets"?"":"none"}} appendBudget={appendBudget} setPage={setPage} manager={campaign.manager} campaignAddress={campaign.address}/>
        <BudgetDetailNode completeBudget={completeBudget} addOneVoteOnBudget={addOneVoteOnBudget} style={{display:page==="budgetDetails"?"":"none"}} campaignAddress={campaign.address} budget={currectBudget} setPage={setPage} />
    </div>
};
export default Campagin;
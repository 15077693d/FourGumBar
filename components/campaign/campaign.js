import React from 'react';
import { useState, useEffect, useContext } from 'react'
import { overlay } from '../../styles/common.module.css'
import { campaign_container } from '../../styles/pages/index.module.css'
import { Router } from '../../routes'
import { CampaignDetailNode, BudgetsNode, AddBudgetNode, BudgetDetailNode } from './nodes'
import { getCampaignBudgets,getContributions } from '../../ethereum/campaign'
import useBudgets from '../../hooks/useBudgets'
import {managerContext} from '../../hooks/managerContext'
import {accountContext} from '../../hooks/accountContext'
const Campagin = ({ setSelectedCampaign, campaign, renewCampaign }) => {
    const {setManager} = useContext(managerContext)
    const [contributions, setContributions] = useState(null)
    const account = useContext(accountContext)
    let isContributor = false
    if(contributions){
        isContributor = contributions.map(contribution => contribution['地址']).includes(account)
    }
    let [active, setActive] = useState(false)
    let [page, setPage] = useState('details')
    const isManager = account===campaign.manager
    const {currectBudget, setCurrentBudget,addOneTotal,budgets,setBudgets,appendBudget,addOneVoteOnBudget, completeBudget} = useBudgets(campaign.approverCount)
    const renewContributions = () => {
        getContributions(campaign.address).then(_contributions => setContributions(_contributions))
    }
    async function resetBudgets() {
        setBudgets(await getCampaignBudgets(campaign.address))
    }
    useEffect(async ()=>{
        renewContributions()
        setManager(campaign.manager)
        resetBudgets()
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
        <CampaignDetailNode resetBudgets={resetBudgets}  addOneTotal={addOneTotal} renewContributions={renewContributions} contributions={contributions} isManager={isManager} style={{display:page==="details"?"":"none"}} setPage={setPage} handleBack={handleBackHome} active={active} campaign={campaign} renewCampaign={renewCampaign} setActive={setActive} />
        <BudgetsNode  isManager={isManager} style={{display:page==="budgets"?"":"none"}}  setPage={setPage} handleClickBudget={handleClickBudget} budgets={budgets} />
        <AddBudgetNode latestIndex={budgets.length} style={{display:page==="addBudgets"?"":"none"}} appendBudget={appendBudget} setPage={setPage} manager={campaign.manager} campaignAddress={campaign.address}/>
        <BudgetDetailNode  isContributor={isContributor}  isManager={isManager} completeBudget={completeBudget} addOneVoteOnBudget={addOneVoteOnBudget} style={{display:page==="budgetDetails"?"":"none"}}  budget={currectBudget} setPage={setPage} />
    </div>
};
export default Campagin;
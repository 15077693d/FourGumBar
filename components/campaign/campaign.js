import React from 'react';
import { useState } from 'react'
import { overlay } from '../../styles/common.module.css'
import { campaign_container } from '../../styles/pages/index.module.css'
import { Router } from '../../routes'
import { CampaignDetailNode, BudgetsNode, AddBudgetNode, BudgetDetailNode } from './nodes'
import { getContributions } from '../../ethereum/campaign'
const Campagin = ({ setSelectedCampaign, campaign, renewCampaign }) => {
    let [active, setActive] = useState(false)
    let [page, setPage] = useState('details')
    let [currectBudget, setBudget] = useState("")
    function handleClick() {
        getContributions(campaign.address)
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
        setPage("budgetDetails")
        setBudget(budget)
    }

    let pageNode;
    switch (page) {
        case "details":
            pageNode = <CampaignDetailNode setPage={setPage} handleBack={handleBackHome} active={active} campaign={campaign} renewCampaign={renewCampaign} setActive={setActive} />
            break;
        case "budgets":
            pageNode = <BudgetsNode setPage={setPage} handleClickBudget={handleClickBudget} budgets={
                [{ item: "test", eth: "1.00", amount: 12, total: 20, pass: true, address: "123", description: "test123" },{ item: "test", eth: "1.00", amount: 12, total: 20, pass: true, address: "123", description: "test123" }]
            } />
            break;
        case "addBudgets":
            pageNode = <AddBudgetNode setPage={setPage} />
            break;
        case "budgetDetails":
            pageNode = <BudgetDetailNode budget={currectBudget} setPage={setPage} />
            break
        default:
            break;
    }
    return <div className={campaign_container}>
        {active ? <div onClick={handleClick} className={overlay}></div> : null}
        {pageNode}
    </div>
};
export default Campagin;
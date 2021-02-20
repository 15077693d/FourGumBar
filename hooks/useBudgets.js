import { useState, useEffect } from 'react'

const useBudgets = (approverCount) => {
    const [budgets, setBudgets] = useState([])
    const [currectBudget, setCurrentBudget] = useState([])
    
    const appendBudget = (budget) => {
        budget.total = approverCount
        setBudgets(budgets.concat(budget)) 
    }

    const completeBudget = (i) => {
        let newBudgets = JSON.parse(JSON.stringify(budgets))
        newBudgets[i].complete = true
        let newCurrectBudget = JSON.parse(JSON.stringify(currectBudget))
        newCurrectBudget.complete = true
        setCurrentBudget(newCurrectBudget)
        setBudgets(newBudgets) 
    }

    const addOneVoteOnBudget = (index) => {
        let newBudgets = JSON.parse(JSON.stringify(budgets))
        newBudgets[index].amount=Number(newBudgets[index].amount)+1
        setBudgets(newBudgets)
        let newCurrectBudget = JSON.parse(JSON.stringify(currectBudget))
        newCurrectBudget.amount=newCurrectBudget.amount+1
        setCurrentBudget(newCurrectBudget)
    }

    return {
        budgets,
        setBudgets,
        appendBudget,
        addOneVoteOnBudget,
        currectBudget, 
        setCurrentBudget,
        completeBudget
    }
};

export default useBudgets;
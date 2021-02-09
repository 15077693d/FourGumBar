import { useState, useEffect } from 'react'

const useBudgets = (approverCount) => {
    const [budgets, setBudgets] = useState([])
    const [currectBudget, setCurrentBudget] = useState([])
    
    const appendBudget = (budget) => {
        budget.total = approverCount
        setBudgets(budgets.concat(budget)) 
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
        setCurrentBudget
    }
};

export default useBudgets;
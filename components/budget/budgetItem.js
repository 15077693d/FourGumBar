import React from 'react';
import {container,title,right} from '../../styles/components/budgetItem.module.css'


const BudgetItem = ({budget, handleClick}) => {
    const {item,eth,amount,total,pass} = budget
    return (
        <div onClick={handleClick} className={container}>
            <div className={title}>
                {item}
            </div>
            <div className={right} style={
                {backgroundColor:pass?"#C5F8C9":"#F5B9B6"}
            }>
                <p className="eth">{eth} ETH</p>
                <p className="vote">{amount}/{total}</p>
            </div>
        </div>
    );
};

export default BudgetItem;
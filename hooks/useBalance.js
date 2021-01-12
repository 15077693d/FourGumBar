import React from 'react';
import { useState } from 'react'
import { getAccountBalance } from '../ethereum/campaign';
const useBalance = (initBalance) => {
    const [balance, setBalance] = useState(initBalance)
    async function renewBalance() {
        setBalance(await getAccountBalance())
    }
    return {
        balance, renewBalance
    }
};

export default useBalance;
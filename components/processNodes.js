import React from 'react';
import { bold, blue_big_btn} from '../styles/common.module.css'
import {  loading } from '../styles/components/createCampaignForm.module.css'
import { SpinnerCircular } from 'spinners-react';
import Checkmark from './checkmark';
const ProcessNodes = ({loadingSentence,successSentence,isPayment,basedNode,status,address,hash,clickConfirmed}) => {
    const loadingNode = (hash) => {
        const url = `https://rinkeby.etherscan.io/tx/${hash}`
        return <div className={loading}>
            <SpinnerCircular size={150} thickness={100} speed={100} color="#452ba0" secondaryColor="rgba(0, 0, 0, 0.44)" />
            <div>{loadingSentence}</div>
            <a target="blank" className={bold} style={{ color: "#452ba0" }} href={url}>點擊了解處理進度</a>
        </div>
    }

    const errorNode = <div className={loading}>
        <div>抱歉，請重試。</div>
        <button style={{ marginTop: 30 }} onClick={clickConfirmed} className={blue_big_btn} type="submit">確定</button>
    </div>

    const successNode = (address) => {
        const url = `https://rinkeby.etherscan.io/address/${address}`
        return <div className={loading}>
            <Checkmark />
            <div>{successSentence}</div>
            <a target="blank" className={bold} style={{ color: "#452ba0" }} href={url}>點擊了解詳情</a>
            <button style={{ marginTop: 30 }} onClick={clickConfirmed} className={blue_big_btn} type="submit">確定</button>
        </div>
    }

    switch (status) {
        case "confirmed":
            return loadingNode(hash)
        case "succeed":
            return successNode(address)
        case "based":
            return basedNode
        case "error":
            return errorNode
    }
};

export default ProcessNodes;
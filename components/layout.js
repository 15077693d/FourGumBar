import React from 'react';
import { Link } from '../routes';
import { layout, logo, add_btn, eth_price, usd_price, prices } from "../styles/components/layout.module.css";
import { space_between, medium_margin_bottom } from '../styles/common.module.css'
import CreateCampaignForm from './campaign/createCampaignForm'
import { useEffect, useState } from 'react'
import useBalance from '../hooks/useBalance'
import {getAccount} from '../ethereum/campaign'
import {accountContext} from '../hooks/accountContext'
import {managerContext} from '../hooks/managerContext'
const Layout = ({ children, renewCampaigns, _balance }) => {
    const [added, setAdded] = useState(false)
    const { balance, renewBalance } = useBalance(_balance ? _balance : 'XXX')
    const [ account, setAccount  ] = useState()
    const [ theManager, setManager  ] = useState()
    function handleClickAdd() {
        setAdded(!added)
    }
    useEffect(() => {
        const getBalance = async () => {
            await renewBalance()
            setAccount(await getAccount())
        }
        getBalance()
    }, [])
    return (
        <accountContext.Provider value={account}>
        <managerContext.Provider value={{theManager,setManager}}>
             <div className={layout}>
            <div style={{ height: "20vh" }}>
                <div className={`${space_between} ${medium_margin_bottom}`}>
                    <Link route='home'>
                        <a className={logo}>
                            課金吧
                    </a>
                    </Link>
                    <button className={add_btn} onClick={handleClickAdd}>
                        +
                    </button>
                </div>
                <div className={prices}>
                    <span id="userETH" className={eth_price}>{balance==='XXX'?"XXX":String(Number(balance).toFixed(2))} ETH</span>
                    <span className={usd_price}>/ XXXX USD</span>
                </div>
            </div>
            <div style={{ position: 'relative', height: "80vh", display: added ? "none" : "block" }}>
                {children}
            </div>
            <div style={{ height: "80vh", display: added ? "block" : "none" }}>
                <CreateCampaignForm renewBalance={renewBalance} renewCampaigns={renewCampaigns} handleClickAdd={handleClickAdd} />
            </div>
        </div>
        </managerContext.Provider>
        </accountContext.Provider>
       
    );
};

export default Layout;
import React from 'react';
import { Link } from '../routes';
import { layout, logo, add_btn, eth_price, usd_price, prices } from "../styles/components/layout.module.css";
import { space_between, medium_margin_bottom } from '../styles/common.module.css'
import CreateCampaignForm from '../components/createCampaignForm'
import { useEffect, useState } from 'react'
import useBalance from '../hooks/useBalance'
const Layout = ({ children, renewCampaigns, _balance }) => {
    const [added, setAdded] = useState(false)
    const { balance, renewBalance } = useBalance(_balance ? _balance : 'XXX')
    function handleClickAdd() {
        setAdded(!added)
    }
    useEffect(() => {
        const getBalance = async () => {
            await renewBalance()
        }
        getBalance()
    }, [])
    return (
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
                    <span className={eth_price}>{String(balance).substr(0, 5)} ETH</span>
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
    );
};

export default Layout;
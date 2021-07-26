import React, { useEffect } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Notification from '../components/notification';
import * as styles from '../styles/layout/base-layout.module.scss';
import { useDispatch } from 'react-redux';
import { getPoolData, getWalletData } from '../actions'
// import * as utils from '../utils';

const BaseLayout = ({children}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getPoolData());
      dispatch(getWalletData());
    }, []);
    return (
        <div>
            <NavBar/>
            <SideBar/>
            <div className={styles.mainContainer}>
                <Notification/>
                {children}
            </div>
        </div>
    )
}

export default BaseLayout;
import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Notification from '../components/notification';
import * as styles from '../styles/layout/base-layout.module.scss';

const BaseLayout = ({children}) => {
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
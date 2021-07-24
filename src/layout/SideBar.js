import React from 'react';
import * as styles from '../styles/components/side-bar.module.scss';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { connectKeplrWallet } from '../actions'

const SideBar = () => {
  const dispatch = useDispatch();

  const [popupMenu, setPopupMenu] = React.useState(false);
  const connectWallet = async () => {
    dispatch(connectKeplrWallet());
  }
  const wallet = useSelector(state => state.wallet.account);

  return (
    <div className={styles.sideBarWrapper}>
      <div className={styles.logoWrapper}>
        <div className={styles.imgWrapper}>
          <img src="img/logo.png" alt="logo" />
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.secret}>secret</div>
          <div className={styles.pizza}>pizza</div>
        </div>
      </div>
      <div className={styles.routeWrapper}>
        <Link href='/'><div className={styles.routeItem}>Pizza</div></Link>
        <Link href='/donate'><div className={styles.routeItem}>Donate</div></Link>
        <Link href='/history'><div className={styles.routeItem}>History</div></Link>
      </div>
      <div className={styles.footWrapper}>
        <button className={styles.walletButton} onClick={connectWallet}>{wallet ? "Connected" : "Keplr Wallet"}</button>
      </div>
      <div className={styles.menuWrapper} >
        <button className={styles.menuButton} onClick={() => { setPopupMenu(!popupMenu) }}>=</button>
      </div>
      {(popupMenu) && (
        <div className={styles.routeWrapperMobile}>
          <Link href='/'><div className={styles.routeItemMobile} onClick={() => { setPopupMenu(!popupMenu) }}>Pizza</div></Link>
          <Link href='/donate'><div className={styles.routeItemMobile} onClick={() => { setPopupMenu(!popupMenu) }}>Donate</div></Link>
          <Link href='/history'><div className={styles.routeItemMobile} onClick={() => { setPopupMenu(!popupMenu) }}>History</div></Link>
        </div>
      )
      }
    </div>
  );
};

export default SideBar;

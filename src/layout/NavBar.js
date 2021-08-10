import React from 'react';
import * as styles from '../styles/components/nav-bar.module.scss';
import * as utils from '../utils';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const pool = useSelector(state => state.pool.account);
  const transactions = useSelector(state => state.transaction.list);
  const poolBalance = utils.getBalance(pool, "uscrt");
  const recipients = utils.getRecipients(transactions);
  const donors = utils.getDonors(transactions);

  return (
    <div className={styles.navBarWrapper}>
      <div className={styles.title}>Pizza Orders</div>
      <div className={styles.detail}>
        <div className={styles.detailItem}>
          <div className={styles.subTitle}>Pizza Pool</div>
          <div className={styles.value}>
            <div className={styles.number}>{poolBalance}</div>
            <div className={styles.text}>scrt</div>
          </div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.subTitle}># of Recipients</div>
          <div className={styles.value}>
            <div className={styles.number}>{recipients}</div>
            <div className={styles.text}>users</div>
          </div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.subTitle}># of Donors</div>
          <div className={styles.value}>
            <div className={styles.number}>{donors}</div>
            <div className={styles.text}>donors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

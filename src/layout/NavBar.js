import React from 'react';
import * as styles from '../styles/components/nav-bar.module.scss';

const NavBar = () => {
  return (
    <div className={styles.navBarWrapper}>
      <div className={styles.title}>Pizza Orders</div>
      <div className={styles.detail}>
        <div className={styles.detailItem}>
          <div className={styles.subTitle}>Pizza Pool</div>
          <div className={styles.value}>
            <div className={styles.number}>1,305</div>
            <div className={styles.text}>scrt</div>
          </div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.subTitle}># of Recipients</div>
          <div className={styles.value}>
            <div className={styles.number}>246</div>
            <div className={styles.text}>users</div>
          </div>
        </div>
        <div className={styles.detailItem}>
          <div className={styles.subTitle}># of Donors</div>
          <div className={styles.value}>
            <div className={styles.number}>35</div>
            <div className={styles.text}>donors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

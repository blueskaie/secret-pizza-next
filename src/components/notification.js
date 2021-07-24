import React from 'react';
import * as styles from '../styles/components/notification.module.scss';
import { useSelector, useDispatch } from 'react-redux'
import { closeNotification } from '../actions'


const Notification = () => {
    const dispatch = useDispatch();
    const onCloseNotification = async () => {
        dispatch(closeNotification());
      }

      
    const notification = useSelector(state => state.notification);
    return (
        <div className={styles.notificationContainer}>
            {notification.is_open && <div className={styles.notificationWrapper}>
                <div className={styles.notificationMarkWrapper}>
                    <div className={styles.infoMark}>i</div>
                    <div className={styles.oblique} />
                </div>
                <div className={styles.message}>{notification.message}</div>
                <div className={styles.closeButton} onClick={onCloseNotification}>X</div>
            </div>}
        </div>
    )
}

export default Notification

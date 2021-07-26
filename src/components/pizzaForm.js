import React, {useState, useEffect} from 'react';
import * as styles from '../styles/components/pizza-form.module.scss';
import { useSelector, useDispatch } from 'react-redux'
import { openNotification, sendDonate, getPoolData } from '../actions'
import * as utils from '../utils';

const PizzaForm = ({tab}) => {
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [donateAmount, setDonateAmount] = useState(0);
    const [tabIndex, setTabIndex] = React.useState(tab);

    const wallet = useSelector(state => state.wallet.account);
    
    useEffect(()=>{
        if (wallet) {
            setAddress(wallet.address);
            setBalance(utils.getBalance(wallet, "uscrt"))
        }
    }, [wallet]);

    const onAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const onDonateChange = (e) => {
        setDonateAmount(e.target.value);
    }

    const withdraw = (e) => {
        dispatch(openNotification("Secret Pizza is made possible from our incredible donors, Help donate!"));
    }

    const donate = (e) => {
        console.log("donateAmount=====>", donateAmount);
        if (donateAmount!=balance) {
            dispatch(sendDonate(donateAmount*1000000));
        } else {
            dispatch(openNotification("The amount is beyond the balance."));
        }
        
    }

    return (
        <div className={styles.pizzaFormContainer}>
            { tabIndex === 1 
                ? <div className={styles.pizzaFormWrapper}>
                    <div className={[styles.withdrawTab, styles.active].join(' ')} onClick={() => { setTabIndex(1) }}>
                        <p>Withdraw</p>
                        <div className={styles.obliqueActive} />
                    </div>
                    <div className={[styles.donateTab, styles.inActive].join(' ')} onClick={() => { setTabIndex(2) }}>
                        <p>Donate</p>
                        <div className={styles.obliqueActive} />
                    </div>
                    <div className={styles.titleWrapper}>
                        <div className={styles.title}>Secret Address</div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <div className={styles.input}>
                            <input className={styles.content} type="text" onChange={onAddressChange} value={address} placeholder={'Connect Keplr Wallet'}/>
                        </div>
                    </div>
                    <div className={styles.balanceWrapper}>
                        Balance: <span>{`${balance} SCRT`}</span>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.withdrawButton} onClick={withdraw}>Withdraw</button>
                    </div>
                </div>
                : <div className={styles.pizzaFormWrapper}>
                    <div className={[styles.withdrawTab, styles.inActive].join(' ')} onClick={() => { setTabIndex(1) }}>
                        <p>Withdraw</p>
                        <div className={styles.obliqueInActive} />
                    </div>
                    <div className={[styles.donateTab, styles.active].join(' ')} onClick={() => { setTabIndex(2) }}>
                        <p>Donate</p>
                        <div className={styles.obliqueInActive} />
                    </div>
                    <div className={styles.titleWrapper}>
                        <div className={styles.title}>Amount</div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <div className={styles.input}>
                            <input className={styles.content} type="number" onChange={onDonateChange} value={donateAmount} placeholder={'Please input the donate amount'} />
                        </div>
                    </div>
                    <div className={styles.balanceWrapper}>
                        Balance: <span>{`${balance} SCRT`}</span>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className={styles.withdrawButton} onClick={donate}>Donate</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default PizzaForm
import React, {useState, useEffect} from 'react';
import * as styles from '../styles/components/pizza-form.module.scss';
import { useSelector, useDispatch } from 'react-redux'
import { openNotification, sendDonate, withdraw, getPoolData } from '../actions'
import * as utils from '../utils';
import ReCAPTCHA from "react-google-recaptcha";


const PizzaForm = () => {
    const defaultWithdrawAmount = process.env.NEXT_PUBLIC_WITHDRAW_AMOUNT ? parseFloat(process.env.NEXT_PUBLIC_WITHDRAW_AMOUNT) : 0.25;

    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [donateAmount, setDonateAmount] = useState(0);
    const [tabIndex, setTabIndex] = useState(2);
    const [loading, setLoading] = useState(false);

    const wallet = useSelector(state => state.wallet.account);
    const recaptchaRef = React.createRef();

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

    const withdrawMoney = async (e) => {
        window.recaptchaOptions = {
            useRecaptchaNet: true,
          };
        const recaptchaValue = recaptchaRef.current.getValue();
        
        if (recaptchaValue) {
            dispatch(withdraw(defaultWithdrawAmount*1000000));
        } else {
            dispatch(openNotification("You should pass google captcha to prove that you are human"));
        }
    }

    const donate = (e) => {
        if (donateAmount!=balance) {
            dispatch(sendDonate(donateAmount*1000000));
        } else {
            dispatch(openNotification("The amount is beyond the balance."));
        }
        
    }

    const onChange = (e) => {
        console.log("onChange==>", e);
    }

    return (
        <div className={styles.pizzaFormContainer}>
            { tabIndex === 1 
                ? <div className={styles.pizzaFormWrapper}>
                    <div className={styles.withdrawTab} onClick={() => { setTabIndex(1) }}>
                        <p>Withdraw</p>
                        <div className={styles.oblique} />
                    </div>
                    <div className={styles.donateTab} onClick={() => { setTabIndex(2) }}>
                        <p>Donate</p>
                        <div className={styles.oblique} />
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
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPCHA_CLIENT_KEY}//127.0.0.1
                        onChange={onChange}
                    />
                    <div className={styles.buttonWrapper}>
                        <button className={styles.withdrawButton} onClick={withdrawMoney} disabled={loading}>Withdraw</button>
                    </div>
                </div>
                : <div className={styles.pizzaFormWrapper}>
                    <div className={styles.withdrawTab} onClick={() => { setTabIndex(1) }}>
                        <p>Withdraw</p>
                        <div className={styles.oblique} />
                    </div>
                    <div className={styles.donateTab} onClick={() => { setTabIndex(2) }}>
                        <p>Donate</p>
                        <div className={styles.oblique} />
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
                        <button className={styles.donateButton} onClick={donate} disabled={loading}>Donate</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default PizzaForm
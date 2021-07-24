import * as types from './types'
import axios from 'axios';

// CONNECT KEPLR WALLET
export function connectKeplrWallet() {
  return async dispatch => {
      dispatch(request());
      try {
            if (window.keplr) {
                await window.keplr.enable(process.env.NEXT_PUBLIC_SECRET_CHAIN_ID);
                const offlineSigner = window.getOfflineSigner(process.env.NEXT_PUBLIC_SECRET_CHAIN_ID);
                const accounts = await offlineSigner.getAccounts();
                const res = await axios.post('/api/wallet', {address: accounts[0].address});
                dispatch(success(res.data));
            } else {
                dispatch(openNotification("Please install keplr wallet!!"))   
            }
      } catch (error) {
          console.error(error);
          dispatch(failure(error))
      }
  }
  function request() { return { type: types.CONNECT_REQUEST} }
  function success(payload) { return { type: types.CONNECT_SUCCESS, payload } }
  function failure(error) { return { type: types.CONNECT_FAILURE, error } }
}

// OPEN NOTIFICATION
export function openNotification(message) {
    return async dispatch => {
        dispatch({type: types.OPEN_NOTIFICATION, payload: message})
    }
}

export function closeNotification() {
    return async dispatch => {
        dispatch({type: types.CLOSE_NOTIFICATION});
    }
}
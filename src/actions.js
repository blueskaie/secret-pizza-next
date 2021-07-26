import * as types from './types'
import axios from 'axios';
import { CosmWasmClient, SigningCosmWasmClient } from 'secretjs';

// CONNECT KEPLR WALLET
export function connectKeplrWallet() {
    return async dispatch => {
        try {
            if (window.keplr) {
                await window.keplr.enable(process.env.NEXT_PUBLIC_SECRET_CHAIN_ID);
                dispatch(getWalletData());                
            } else {
                dispatch(openNotification("Please install keplr wallet!!"));  
            }
        } catch (error) {
            dispatch(openNotification(error.message));  
        }
    }
}

export function getWalletData() {
  return async dispatch => {
        dispatch(request());
        try {
            if (window.keplr && window.getOfflineSigner && window.getEnigmaUtils) {
                const offlineSigner = window.getOfflineSigner(process.env.NEXT_PUBLIC_SECRET_CHAIN_ID);
                const accounts = await offlineSigner.getAccounts();
                const client = new CosmWasmClient(process.env.NEXT_PUBLIC_SECRET_REST_URL);
                const account = await client.getAccount(accounts[0].address);
                dispatch(success(account));
            }
        } catch (error) {
            dispatch(failure(error))
        }
  }
  function request() { return { type: types.CONNECT_REQUEST} }
  function success(payload) { return { type: types.CONNECT_SUCCESS, payload } }
  function failure(error) { return { type: types.CONNECT_FAILURE, error } }
}

export function getPoolData() {
    return async dispatch => {
        dispatch(request());
        try {
            const client = new CosmWasmClient(process.env.NEXT_PUBLIC_SECRET_REST_URL);
            const pool = await client.getAccount(process.env.NEXT_PUBLIC_POOL_ADDRESS);
            console.log(pool);
            dispatch(success(pool));
        } catch (error) {
            console.error(error);
            dispatch(failure(error))
        }
    }
    function request() { return { type: types.POOL_CONNECT_REQUEST} }
    function success(payload) { return { type: types.POOL_CONNECT_SUCCESS, payload } }
    function failure(error) { return { type: types.POOL_CONNECT_FAILURE, error } }
}

export function sendDonate(amount) {
    return async dispatch => {
        try {
            // const res = await axios.post('/api/donate', {amount: amount});
            const keplrOfflineSigner = window.getOfflineSigner(process.env.NEXT_PUBLIC_SECRET_CHAIN_ID);
            const accounts = await keplrOfflineSigner.getAccounts();
            const client = new SigningCosmWasmClient(
                process.env.NEXT_PUBLIC_SECRET_REST_URL,
                accounts[0].address,
                keplrOfflineSigner,
                window.getEnigmaUtils(process.env.NEXT_PUBLIC_SECRET_CHAIN_ID),
                {
                    // 300k - Max gas units we're willing to use for init
                    init: {
                        amount: [{ amount: "300000", denom: "uscrt" }],
                        gas: "300000",
                    },
                    // 300k - Max gas units we're willing to use for exec
                    exec: {
                        amount: [{ amount: "300000", denom: "uscrt" }],
                        gas: "300000",
                    },
                }
            );
            const sent = await client.sendTokens(process.env.NEXT_PUBLIC_POOL_ADDRESS, [{amount: amount.toString(), denom: 'uscrt'}]);
            dispatch(getPoolData());
            dispatch(openNotification("Thank you for your contribution... You make Secret Pizza Parior possible"));
        } catch (error) {
            dispatch(openNotification(error.message()));
        }
    }
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
import { combineReducers } from 'redux'
import * as types from './types'

// WALLET REDUCER
const walletReducer = (state = {}, action) => {
    switch (action.type) {
        case types.CONNECT_REQUEST:
            return {
                is_loading: true
            }
        case types.CONNECT_SUCCESS:
            return {
                is_loading: false,
                account: action.payload,
                error: null
            }
        case types.CONNECT_FAILURE:
            return {
                is_loading: false,
                data: null,
                error: action.error
            }
        default:
            return state
    }
}

// POOL REDUCER
const poolReducer = (state = {}, action) => {
    switch (action.type) {
        case types.POOL_CONNECT_REQUEST:
            return {
                is_loading: true
            }
        case types.POOL_CONNECT_SUCCESS:
            return {
                is_loading: false,
                account: action.payload,
                error: null
            }
        case types.POOL_CONNECT_FAILURE:
            return {
                is_loading: false,
                data: null,
                error: action.error
            }
        default:
            return state
    }
}

// TRANSACTION REDUCER
const transactionReducer = (state = {}, action) => {
    switch (action.type) {
        case types.TX_REQUEST:
            return {
                is_loading: true
            }
        case types.TX_LIST_SUCCESS:
            return {
                is_loading: false,
                list: [...action.payload],
                error: null
            }
        case types.TX_ADD_SUCCESS:
            return {
                is_loading: false,
                list: [...list, action.payload],
                error: null
            }
        case types.TX_FAILURE:
            return {
                is_loading: false,
                list: [],
                error: action.error
            }
        default:
            return state
    }
}

// DONOR REDUCER
const donorReducer = (state = {}, action) => {
    switch (action.type) {
        case types.DONOR_REQUEST:
            return {
                is_loading: true
            }
        case types.DONOR_LIST_SUCCESS:
            return {
                is_loading: false,
                list: [...action.payload],
                error: null
            }
        case types.DONOR_FAILURE:
            return {
                is_loading: false,
                list: [],
                error: action.error
            }
        default:
            return state
    }
}


// NOTIFICATION REDUCER
const notificationReducer = (state = {}, action) => {
  switch (action.type) {
      case types.OPEN_NOTIFICATION:
          return {
              is_open: true,
              message: action.payload
          }
      case types.CLOSE_NOTIFICATION:
          return {
              is_open: false,
              message: null
          }
      default:
          return state
  }
}


// COMBINED REDUCERS
const reducers = {
  wallet: walletReducer,
  pool: poolReducer,
  notification: notificationReducer,
  transaction: transactionReducer,
  donor: donorReducer
}

export default combineReducers(reducers)

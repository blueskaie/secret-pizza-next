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

// WALLET REDUCER
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
  notification: notificationReducer
}

export default combineReducers(reducers)

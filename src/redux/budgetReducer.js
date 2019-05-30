import axios from "axios";

const iniitialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

export function requestBudgetData() {
    let budget = axios.get('/api/budget-data').then(res => res.data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: budget
    }
}

export function addPurchase(price, description, category) {
    let purchase = axios.post('/api/budget-data/purchase', { description, price, category })
    .then(res => res.data)
    return { 
        action: ADD_PURCHASE,
        payload: purchase
    }
}

export function removePurchase(id){
    let item = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
    return {
        type: REMOVE_PURCHASE,
        payload: item
    }
}

function budgetReducer(state = iniitialState, action) {
    const {type, payload} = action
    switch (type) {
        case REQUEST_BUDGET_DATA + '_PENDING':
            return {
                ...state,
                loading: true
            }
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return {
                ...state,
                ...payload,
                loading: false
            }
        case ADD_PURCHASE + '_PENDING':
            return{
                ...state,
                loading: true
            }
        case ADD_PURCHASE + '_FULFILLED':
            return {
                ...state,
                purchases: payload,
                loading: false
            }
        case REMOVE_PURCHASE + '_PENDING':
            return {
                ...state,
                loading: true
            }
        case REMOVE_PURCHASE + '_FULFILLED':
            return {
                ...state,
                loading: false,
                purchars: payload
            }
        default:
            return state
        }
    }


export default budgetReducer
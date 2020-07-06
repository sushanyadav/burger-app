import {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCESSS,
    FETCH_ORDERS_FAIL,
    DELETE_ORDER,
    FETCH_DELETE_START
} from './actionTypes'
import axios from '../../axios-orders'
import { history } from '../../App'


export const purchaseBurgerSuccess = (id, orderData) => ({
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
})

export const purchaseBurgerFail = (error) => ({
    type: PURCHASE_BURGER_FAIL,
    error: error
})

export const purchaseBurgerStart = () => ({
    type: PURCHASE_BURGER_START
})


export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, orderData).then((res) => {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))
            history.push('/')
        }).catch((err) => {
            dispatch(purchaseBurgerFail(err))
        })

    };
};

export const purchaseInit = () => ({
    type: PURCHASE_INIT
})


export const fetchOrderSuccess = (orders) => ({
    type: FETCH_ORDERS_SUCESSS,
    orders: orders
})

export const fetchOrderFail = (error) => ({
    type: FETCH_ORDERS_FAIL,
    error: error
})

export const fetchOrderStart = () => ({
    type: FETCH_ORDERS_START
})

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + queryParams).then(res => { //only with token
            let fetchedOrders = []
            for (let key in res.data) { //object loop
                fetchedOrders.push({
                    ...res.data[key], //key vitra ko data
                    id: key
                })
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
        }).catch((err) => {
            dispatch(fetchOrderFail(err))
        })

    };
};

export const fetchDeleteStart = () => ({
    type: FETCH_DELETE_START
})


export const deleteOrder = (id) => ({
    type: DELETE_ORDER,
    id: id
})


export const startDeleteOrder = (id) => {
    return (dispatch, getState) => {
        dispatch(fetchDeleteStart())
        const token = getState().auth.token
        axios.delete(`/orders/${id}.json?auth=` + token).then(res => {
            dispatch(deleteOrder(id))
        }).catch((err) => {

        })

    };
};


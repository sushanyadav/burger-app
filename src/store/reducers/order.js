import {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCESSS,
    FETCH_ORDERS_FAIL,
    DELETE_ORDER,
    FETCH_DELETE_START
} from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    orders: [],
    loading: false
}


export default (state = initialState, action) => {
    switch (action.type) {

        case PURCHASE_BURGER_START:
            return updateObject(state, { loading: true })

        case PURCHASE_BURGER_SUCCESS:

            const newOrder = updateObject(action.orderData, { id: action.orderId })

            return updateObject(state, {
                loading: false,
                orders: state.orders.concat(newOrder)
            })

        case PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false })

        case FETCH_ORDERS_START:
            return updateObject(state, { loading: true })

        case FETCH_ORDERS_SUCESSS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            })

        case FETCH_ORDERS_FAIL:
            return updateObject(state, { loading: false })

        case FETCH_DELETE_START:
            return updateObject(state, { loading: true })

        case DELETE_ORDER:
            return updateObject(state, {
                orders: state.orders.filter((order) => order.id !== action.id),
                loading: false
            })
        default:
            return state
    }
};

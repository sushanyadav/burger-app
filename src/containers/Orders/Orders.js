import React, { useEffect } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import WithErrorHandler from '../../components/withErrorHandler/WithErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import { fetchOrders } from '../../store/actions/index'
import { Link } from 'react-router-dom'

const Orders = ({ orders, onFetchOrders, loading, error, token, userId }) => {

    useEffect(() => {
        onFetchOrders(token, userId)
        // eslint-disable-next-line 
    }, [])



    return (
        loading ? <Spinner /> :
            (<div>
                {
                    orders.length <= 0 && error ?
                        (<p style={{ textAlign: 'center', color: 'grey' }}>No order has been placed yet. Place your order <Link to='/'>here</Link> </p>)
                        :
                        orders.map((order) => (<Order key={order.id} id={order.id} ingredients={order.ingredients} price={order.price} />))
                }
            </div>)
    )
}

const mapStateToProps = (state) => ({
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.auth.error,
    token: state.auth.token,
    userId: state.auth.userId
});
const mapDispatchToProps = (dispatch) => ({
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios))

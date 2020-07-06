import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'



const Checkout = ({ ings, history, match }) => {

    const checkoutCancelledHandler = () => {
        history.goBack()
    }


    const checkoutContinuedHandler = () => {
        history.replace('/checkout/contact-data')
    }

    let summary = <Redirect to='/' />

    if (ings) {
        summary = (
            <div>
                <CheckoutSummary ingredients={ings} checkoutCancelled={checkoutCancelledHandler} checkoutContinued={checkoutContinuedHandler} />
                <Route path={match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }

    return summary

}

const mapStateToProps = (state) => ({
    ings: state.BurgerBuilder.ingredients
})




export default connect(mapStateToProps)(Checkout)

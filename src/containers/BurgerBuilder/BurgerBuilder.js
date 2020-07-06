import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../components/withErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, initIngredients, setAuthRedirectPath } from '../../store/actions/index';




class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.oninitIngredients()
    }



    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map((ingredient) => {
            return ingredients[ingredient]
        }).reduce((sum, el) => {
            return sum + el
        }, 0)

        return sum > 0

    }



    purchaseHandler = () => {
        if (this.props.isAuthnticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }

    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) { //loop through all the ingredients
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        // disabledInfo = {salad:true, meat:false , ....}

        let orderSummary = null

        let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {

            burger = (
                <>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        purchaseHandler={this.purchaseHandler}
                        isAuth={this.props.isAuthnticated}
                        price={this.props.price} />
                </>
            )

            orderSummary = <OrderSummary ingredients={this.props.ings}
                purchaseCancelHandler={this.purchaseCancelHandler}
                purchaseContinueHandler={this.purchaseContinueHandler}
                price={this.props.price}
            />

        }



        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = state => ({

    ings: state.BurgerBuilder.ingredients,
    price: state.BurgerBuilder.totalPrice,
    error: state.BurgerBuilder.error,
    isAuthnticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
    oninitIngredients: () => dispatch(initIngredients()),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
})




export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios))

import React, { useState } from 'react'
import classNames from 'classnames/bind';
import styles from './Order.module.scss'
import { connect } from 'react-redux'
import { startDeleteOrder } from '../../store/actions/index'
import Button from '../UI/Button/Button'
import Spinner from '../UI/Spinner/Spinner'
import SweetAlert from 'react-bootstrap-sweetalert';

const Order = ({ ingredients, price, id, onOrderDelete, loading }) => {

    var cx = classNames.bind(styles);
    const [alert, setAlert] = useState(null)

    const displayedIngredients = []

    for (let ingredientsName in ingredients) {
        displayedIngredients.push({
            name: ingredientsName,
            amount: ingredients[ingredientsName]
        })
    }

    const ingredientOutput = displayedIngredients.map((ingredient, i) => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0px 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ingredient.name}>{ingredient.name} ({ingredient.amount}) </span>
    })

    if (loading) {
        return <Spinner />
    }


    const showAlert = (id) => {
        setAlert(<SweetAlert
            danger
            showCancel
            title="Are you sure?"
            onConfirm={() => onOrderDelete(id)}
            onCancel={hideAlert}
            style={{ backgroundColor: '#ffe277' }}
            customButtons={
                <React.Fragment>
                    <button className={cx("button", "button--cancel")} onClick={hideAlert}>Cancel</button>
                    <button className={cx("button", "button--confirm")} onClick={() => onOrderDelete(id)}>Yes, Delete Order</button>
                </React.Fragment>
            }
        >
            You will not be able to undo this process!
                </SweetAlert>)


    }

    const hideAlert = () => {
        setAlert(null)
    }





    return (
        <div className={styles.Order}>
            <p style={{ marginBottom: '2rem' }}>Ingredrients: {ingredientOutput}</p>
            <p>Price: <strong>USD {price}</strong></p>
            <Button btnType='Danger' onClick={() => showAlert(id)}>DELETE ORDER</Button>
            {alert}
        </div>
    )

}

const mapStateToProps = (state) => ({
    loading: state.order.loading
});
const mapDispatchToProps = (dispatch) => ({
    onOrderDelete: (id) => dispatch(startDeleteOrder(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Order)

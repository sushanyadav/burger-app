import React from 'react'
import Button from '../../UI/Button/Button'
import styles from './OrderSummary.module.scss'


const OrderSummary = ({ ingredients, purchaseCancelHandler, purchaseContinueHandler, price }) => {
    const ingredientSummary = Object.keys(ingredients).map((igkey) => {
        return <li key={igkey}>
            <span style={{ textTransform: 'capitalize' }}>{igkey}</span>: {ingredients[igkey]}
        </li>
    })
    return (
        <>
            <h1>Your Order</h1>
            <p>A delicious burger with the following ingredients:</p>
            <ul className={styles.ok}>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {price.toFixed(2)}</strong></p>
            <p>Contine to Checkout ?</p>

            <Button onClick={purchaseCancelHandler} btnType="Danger" >CANCEL</Button>

            <Button btnType="Success" onClick={purchaseContinueHandler}>CONTINE</Button>

        </>
    )
}


export default OrderSummary

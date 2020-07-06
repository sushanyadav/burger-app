import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import styles from './BuildControls.module.scss'

const controls = [
    { label: "Salad", type: 'salad' },
    { label: "Bacon", type: 'bacon' },
    { label: "Cheese", type: 'cheese' },
    { label: "Meat", type: 'meat' }
]

const BuildControls = ({ addIngredient, removeIngredient, disabled, price, purchaseable, purchaseHandler, isAuth }) => {
    return (
        <div className={styles.BuildControls}>
            <p><strong>Current Price: {price.toFixed(2)}</strong></p>
            {
                controls.map((control) => {

                    return <BuildControl
                        label={control.label}
                        key={control.label}
                        addIngredienthandler={() => addIngredient(control.type)}
                        removeIngredienthandler={() => removeIngredient(control.type)}
                        disabled={disabled[control.type]}
                    />
                })
            }
            <button
                className={styles.OrderButton}
                onClick={purchaseHandler}
                disabled={!purchaseable}>{isAuth ? "Order Now" : 'Sign Up To Order'}</button>
        </div>
    )
}

export default BuildControls

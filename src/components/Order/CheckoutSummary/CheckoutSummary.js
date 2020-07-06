import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import styles from './CheckoutSummary.module.scss'

const CheckoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well !</h1>
            <div style={{ width: '100%', margin: "auto" }}>
                <Burger ingredients={ingredients} />
            </div>
            <Button btnType="Danger" onClick={checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" onClick={checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary

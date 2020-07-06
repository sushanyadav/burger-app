import React from 'react'
import styles from './BuildControl.module.scss'

const BuildControl = ({ label, removeIngredienthandler, addIngredienthandler, disabled }) => {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{label}</div>
            <button onClick={removeIngredienthandler} className={styles.Less} disabled={disabled}>Less</button>
            <button onClick={addIngredienthandler} className={styles.More}>More</button>
        </div>
    )
}

export default BuildControl

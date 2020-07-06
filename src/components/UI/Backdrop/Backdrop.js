import React from 'react'
import styles from './Backdrop.module.scss'
const Backdrop = ({ show, clicked }) => {
    return (
        show && <div className={styles.Backdrop} onClick={clicked}> </div>
    )
}

export default Backdrop

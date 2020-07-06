import React from 'react'
import styles from './DrawerToggler.module.scss'

const DrawerToggeler = ({ clicked }) => {
    return (
        <div className={styles.DrawerToggle} onClick={clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DrawerToggeler

import React from 'react'
import styles from './NavigationItems.module.scss'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = ({ isAuthenticated }) => {

    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link='/' exact>Burger Builder</NavigationItem>
            {
                isAuthenticated && <NavigationItem link='/orders'>Orders</NavigationItem>
            }

            {
                !isAuthenticated ? <NavigationItem link='/auth'>Authenticate</NavigationItem> : <NavigationItem link='/logout'>Logout</NavigationItem>
            }

        </ul>
    )
}

export default NavigationItems

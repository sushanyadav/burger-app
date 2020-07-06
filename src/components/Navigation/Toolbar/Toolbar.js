import React from 'react'
import styles from './Toolbar.module.scss'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggeler from '../SideDrawer/DrawerToggler/DrawerToggeler'


const Toolbar = ({ SideDrawerToggleHadler, isAuth }) => {


    return (
        <header className={styles.Toolabar}>
            <DrawerToggeler clicked={SideDrawerToggleHadler} />
            <div className={styles.Logo}>
                <Logo />
            </div>



            <nav className={styles.DesktopOnly}>
                <NavigationItems isAuthenticated={isAuth} />
            </nav>

        </header>
    )
}

export default Toolbar

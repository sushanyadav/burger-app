import React from 'react'
import classNames from 'classnames/bind'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './SideDrawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'


const SideDrawer = ({ open, closed, isAuth }) => {

    let cx = classNames.bind(styles)
    let attachedClasses = [styles.SideDrawer, styles.Close]
    if (open) {
        attachedClasses = [styles.SideDrawer, styles.Open]
    }


    return (
        <>
            <Backdrop show={open} clicked={closed} />

            <div className={cx(attachedClasses)} onClick={closed} >
                <div className={styles.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems isAuthenticated={isAuth} />
                </nav>
            </div>
        </>
    )
}

export default SideDrawer

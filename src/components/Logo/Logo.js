import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <div className={styles.Logo}>
            <Link to='/'><img src={burgerLogo} alt="Burger" /></Link>
        </div>
    )
}

export default Logo

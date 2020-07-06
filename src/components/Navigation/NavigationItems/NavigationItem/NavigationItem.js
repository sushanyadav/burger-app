import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavigationItem.module.scss'


const NavigationItem = (props) => {
    return (
        <div>
            <li className={styles.NavigationItem}>
                <NavLink to={props.link} exact={props.exact} activeClassName={styles.active}>
                    {props.children}
                </NavLink>
            </li>
        </div>
    )
}

export default NavigationItem

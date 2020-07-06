import React from 'react'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'


const Button = ({ children, btnType, btnSmall, onClick, disabled }) => {
    let cx = classNames.bind(styles)

    return (
        <button className={cx("Button", btnType, btnSmall)} onClick={onClick} disabled={disabled}>{children}</button>
    )
}

export default Button

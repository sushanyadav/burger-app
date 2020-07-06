import React from 'react'
import classNames from 'classnames/bind'
import styles from './Input.module.scss'

const Input = ({ label, elementType, touched, shouldvalidate, invalid, value, changed, ...props }) => {
    let inputElement = null


    const cx = classNames.bind(styles);
    //{...props} = remaining props. in here which is porps.elementConfig which is {type: "text", placeholder: "Your Name"}

    const inputElClassnames = cx("InputElement", { "Invaild": invalid && shouldvalidate && touched })

    switch (elementType) {
        case 'input':
            inputElement = <input
                className={inputElClassnames}
                value={value}
                {...props.elementConfig}
                onChange={changed}

            /> //{...props} = {elementConfig}
            break;
        case 'textarea':
            inputElement = <textarea
                className={inputElClassnames}
                value={value}
                {...props.elementConfig}
                onChange={changed}
            />
            break;
        case 'select':
            inputElement = <select
                className={inputElClassnames}
                value={value}
                onChange={changed}>
                {
                    props.elementConfig.options.map((option) => <option key={option.value} value={option.value}>{option.displayValue}</option>)
                }

            </select>
            break;
        default:
            inputElement = <input
                className={inputElClassnames}
                value={value} {...props.elementConfig}
                onChange={changed}

            />
            break;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{label}</label>
            {inputElement}
        </div>
    )
}

export default Input

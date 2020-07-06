// eslint-disable-next-line
import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.scss'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import WithErrorHandler from '../../../components/withErrorHandler/WithErrorHandler'
import { purchaseBurger } from '../../../store/actions/index'


const ContactData = ({ ings, price, loading, onOrderBurger, token, userId }) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [orderForm, setOrderForm] = useState(
        {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    maxLength: 5,
                    minLength: 5,
                    isNumeric: true
                },
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    email: true
                },
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        }
    )





    const orderHandler = (e) => {

        e.preventDefault()

        const formData = {}
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value
        }
        formData.email = formData.email.toLowerCase()

        const order = {
            ingredients: ings,
            price,
            orderData: formData,
            userId: userId
        }


        onOrderBurger(order, token)
    }


    const checkvalidity = (value, rules) => {
        let isValid = true
        if (!rules) {
            return true
        }

        if (rules.email) {
            /* eslint-disable-next-line */
            const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            isValid = re.test(String(value).toLowerCase()) && isValid

        }

        if (rules.isNumeric) {
            isValid = /^\d*$/.test(value) && isValid
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }


    const inputChangedHandler = (e, inputIdentifier) => {
        const updatedOrderform = {
            ...orderForm
        }
        const updatedFormElement = {
            ...updatedOrderform[inputIdentifier]
        }

        updatedFormElement.value = e.target.value
        updatedFormElement.valid = checkvalidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderform[inputIdentifier] = updatedFormElement

        let formValidity = true
        for (let inputIdentifer in updatedOrderform) {
            formValidity = updatedOrderform[inputIdentifer].valid && formValidity
        }


        setFormIsValid(formValidity)


        setOrderForm(updatedOrderform)

    }

    const formElemetsArray = [];
    for (let key in orderForm) {
        formElemetsArray.push({
            id: key,
            config: orderForm[key]
        })

    }

    return (

        <div className={styles.ContactData}>
            <h4>Enter the contact data.</h4>

            {loading ? <Spinner /> :

                <form onSubmit={orderHandler}>
                    {
                        formElemetsArray.map((formElement) => (
                            <Input
                                label={formElement.id}
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig} //{type: "text", placeholder: "Your Name"}
                                value={formElement.config.value}
                                changed={(e) => inputChangedHandler(e, formElement.id)}
                                invalid={!formElement.config.valid}
                                touched={formElement.config.touched}
                                shouldvalidate={formElement.config.validation}
                            />
                        ))
                    }
                    <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
                </form>

            }


        </div>
    )
}

const mapStateToProps = (state) => ({
    ings: state.BurgerBuilder.ingredients,
    price: state.BurgerBuilder.totalPrice.toFixed(2),
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = (dispatch) => ({
    onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios))

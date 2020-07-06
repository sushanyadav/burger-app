import React, { useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Auth.module.scss';
import { auth, setAuthRedirectPath } from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import TextTransition, { presets } from "react-text-transition";
import { Redirect } from 'react-router-dom';

const Auth = ({ onAuth, error, loading, isAuthnticated, authRedirectPath, building, onSetAuthRedirectPath }) => {
    const [isSignup, setIsSignup] = useState(true)
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true,
                email: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    })

    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            onSetAuthRedirectPath()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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


        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid
    }


    const inputChangedHandler = (e, inputIdentifier) => {
        const updatedAuthform = {
            ...authForm,
            [inputIdentifier]: {
                ...authForm[inputIdentifier],
                value: e.target.value,
                valid: checkvalidity(e.target.value, authForm[inputIdentifier].validation),
                touched: true
            }
        }
        // const updatedFormElement = {
        //     ...updatedAuthform[inputIdentifier]
        // }

        // updatedFormElement.value = e.target.value
        // updatedFormElement.valid = checkvalidity(updatedFormElement.value, updatedFormElement.validation)
        // updatedFormElement.touched = true
        // updatedAuthform[inputIdentifier] = updatedFormElement



        setAuthForm(updatedAuthform)

    }

    const switchAuthmodeHandler = () => {
        setIsSignup(!isSignup)
    }


    const authHandler = (e) => {
        e.preventDefault()
        onAuth(authForm.email.value, authForm.password.value, isSignup)
    }


    const formElemetsArray = [];
    for (let key in authForm) {
        formElemetsArray.push({
            id: key,
            config: authForm[key]
        })

    }



    if (isAuthnticated) {
        return <Redirect to={authRedirectPath} />
    }


    return (
        <div className={styles.Auth}>
            <div className={styles.switchmode}>
                <h1><TextTransition text={isSignup ? 'SIGN UP' : "SIGN IN"} springConfig={presets.gentle} /></h1>
                <button className={styles.switchSignup} onClick={switchAuthmodeHandler}>
                    <i className={styles.arrowRight}></i>{isSignup ? 'SWITCH TO SIGN IN' : "SWITCH TO SIGN UP"}</button>
            </div>
            <div>
                {
                    error && <h6 className={styles.errorMessage}><span style={{ color: 'red' }}>Error: </span>{error}</h6>
                }
            </div>
            {
                loading ? <Spinner /> :

                    <form onSubmit={authHandler}>
                        {
                            formElemetsArray.map((formElement) => (
                                <Input
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
                        <Button btnType="Success">SUBMIT</Button>


                    </form>
            }

        </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthnticated: state.auth.token !== null,
    building: state.BurgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
});
const mapDispatchToProps = (dispatch) => ({
    onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth)


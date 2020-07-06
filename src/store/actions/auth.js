import axios from 'axios'


import { AUTH_START, AUTH_SUCCESSS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from './actionTypes'

export const authStart = () => ({
    type: AUTH_START
})

export const authSuccess = (idToken, userId) => ({
    type: AUTH_SUCCESSS,
    idToken,
    userId
})

export const authFail = (error) => ({
    type: AUTH_FAIL,
    error
})

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: AUTH_LOGOUT
    }
}



export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}


export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8mCMAY7tZMs_Tza9APNKULihvIK4bx8M`

        if (!isSignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8mCMAY7tZMs_Tza9APNKULihvIK4bx8M`
        }
        axios.post(url, authData)
            .then((res) => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeOut(res.data.expiresIn))
            }).catch((err) => {
                dispatch(authFail(err.response.data.error.message))
            });
    };
};

export const setAuthRedirectPath = (path) => ({
    type: SET_AUTH_REDIRECT_PATH,
    path
})

export const authCheckState = () => {
    return (dispatch) => {

        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))
            }

        }
    };
};
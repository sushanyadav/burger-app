import { AUTH_START, AUTH_SUCCESSS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from '../actions/actionTypes'
import { updateObject } from '../utility'


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}


export default (state = initialState, { type, idToken, userId, error, path }) => {
    switch (type) {

        case AUTH_START:
            return updateObject(state, { error: null, loading: true })

        case AUTH_SUCCESSS:
            return updateObject(state, { token: idToken, userId: userId, error: null, loading: false })

        case AUTH_FAIL:
            return updateObject(state, { error: error, loading: false })

        case AUTH_LOGOUT:
            return updateObject(state, { token: null, userId: null })


        case SET_AUTH_REDIRECT_PATH:
            return updateObject(state, { authRedirectPath: path })
        default:
            return state
    }
}

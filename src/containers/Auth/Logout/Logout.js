import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../../../store/actions/index'


const Logout = ({ onlogout }) => {

    useEffect(() => {
        onlogout()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Redirect to='/' />

}


const mapDispatchToProps = (dispatch) => ({
    onlogout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Logout)

import React, { Component } from 'react';
import styles from './Layout.module.scss'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux';

class Layout extends Component {


    state = {
        showSideDrawer: false
    }

    SideDrawerCloseHadler = () => {
        this.setState({ showSideDrawer: false })
    }

    SideDrawerToggleHadler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <>
                <Toolbar
                    SideDrawerToggleHadler={this.SideDrawerToggleHadler}
                    isAuth={this.props.isAuthenticated} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.SideDrawerCloseHadler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.token !== null
})



export default connect(mapStateToProps)(Layout);


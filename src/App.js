import React, { useEffect } from 'react';
import { authCheckState } from './store/actions/index';
import Logout from './containers/Auth/Logout/Logout';
import Auth from './containers/Auth/Auth';
import createHistory from 'history/createBrowserHistory'
import Orders from './containers/Orders/Orders';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './components/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import './defaultstyles/_base.scss'
import { connect } from 'react-redux';

export const history = createHistory()

const App = ({ onTryAutoSignup, isAuthnticated }) => {
  useEffect(() => {
    onTryAutoSignup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  let routes = (
    <Switch>
      <Route path="/auth" exact component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  )

  if (isAuthnticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <Router history={history}>
      <Layout>
        {routes}
      </Layout>
    </Router>
  );
}


const mapStateToProps = (state) => ({
  isAuthnticated: state.auth.token !== null
});


const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(authCheckState())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);




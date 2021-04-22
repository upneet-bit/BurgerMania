import React, { Component } from 'react';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';
import {Redirect, Route, Switch} from "react-router-dom";
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions';
import { connect } from 'react-redux';
import asyncComponent from './hoc/AsyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth');
})


class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }

    render() {
      let routes = (
        <Switch>
          <Route path="/auth" component={asyncAuth}></Route>
          <Route path="/" component={BurgerBuilder}></Route>
        </Switch>
      );
      if(this.props.isAuthenticated){
        routes=(
          <Switch>
          <Route path="/auth" component={asyncAuth}></Route>
          <Route path="/checkout" component={asyncCheckout}></Route>
          <Route path="/orders" component={asyncOrders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/" />
        </Switch>
        )
      }
      return (
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
      );
    }
}

const mapStateToProps= state=>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchtoProps= dispatch =>{
  return{
    onTryAutoSignup: ()=> dispatch(authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(App);
////withRouter(......)
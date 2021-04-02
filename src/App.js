import React, { Component } from 'react';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';
import {Route, Switch} from "react-router-dom";
import Orders from './containers/Orders/Orders';

////EROORHANDLER DOESN'T WORK PROPERLY!1!
class App extends Component {
  
    render() {
      return (
        <div>
          <Layout>
              <Switch>
                <Route path="/checkout" component={Checkout}></Route>
                <Route path="/orders" component={Orders}></Route>
                <Route path="/" exact component={BurgerBuilder}></Route>
              </Switch>
          </Layout>
        </div>
      );
    }
}

export default App;
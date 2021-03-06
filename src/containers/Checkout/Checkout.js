import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Redirect, Route} from "react-router-dom";
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    componentDidMount(){
        // console.log("CHECKOUT CALLED!");
    }
  
    checkoutCancelledHandler = ()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        // console.log(this.props.ings);
        let summary= <Redirect to="/" />

        if(this.props.ings){
            const purchasedRedirect= this.props.purchased ? <Redirect to="/checkout" /> : null;
            summary=(
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                path={this.props.match.path +"/contact-data"}
                component={ContactData}
                />
            </div>
            )
        }

        return summary; 
    }
}

const mapStatetoProps= state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};


export default connect(mapStatetoProps)(Checkout);
import React, { Component } from 'react';
import * as actions from "../../store/actions";

import Aux from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {

    state={
        purchasing:false,
        loading: false,
        error: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }


    updatePurchaseState = (ingredients)=>{
      
        const sum= Object.keys(ingredients)
                .map(igKey =>{
                    return ingredients[igKey];
                })
                .reduce((sum, el)=>{
                    return sum+el;
                },0);
            return sum>0;
    }

    purchaseHandler =()=>{
        this.setState({purchasing: true})
    }

    purchaseCancelHandler =()=>{
        this.setState({purchasing: false})
    }

    purchaseContinueHandler =() =>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        console.log(this.props.history);
    }

    render() {
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary= null;
        let burger=this.props.error? <p>Burger couldn't be loaded!!</p> : <Spinner/>

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                    ingredientAdded={this.props.addedIngredient} 
                    ingredientRemoved={this.props.removedIngredient}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    price={this.props.totalPrice} 
                    ordered={this.purchaseHandler} />
                </Aux> );

            orderSummary =  <OrderSummary
            purchaseCancelled={this.purchaseCancelHandler}
            prchaseContinued={this.purchaseContinueHandler}
            ingredients={this.props.ings} 
            price={this.props.totalPrice} />
        }

        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

const mapStatetoProps= state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchtoProps= dispatch =>{
    return{
        addedIngredient :(igName)=> dispatch(actions.addIngredients(igName)),
        removedIngredient:(igName)=> dispatch(actions.removeIngredients(igName)),
        onInitIngredients: ()=> dispatch(actions.initIngredients()),
        onInitPurchase: ()=> dispatch(actions.purchaseInit())
    }
};

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));
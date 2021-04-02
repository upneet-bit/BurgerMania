import React, { Component } from 'react';
import Aux from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES={
    salad: 0.5,
    cheese:0.4,
    meat: 1.3,
    bacon:0.7
}

class BurgerBuilder extends Component {

    state={
        ingredients:null,
        totalPrice: 4,
        purchasable: false,
        purchasing:false,
        loading: false,
        error: false
    }

    componentDidMount(){
        console.log(this.props);
        axios.get('https://burger-app-react-932d5-default-rtdb.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({ingredients : response.data})
        })
        .catch(err =>{
            this.setState({error: true})
        })
    }

    updatePurchaseState = (ingredients)=>{
      
        const sum= Object.keys(ingredients)
                .map(igKey =>{
                    return ingredients[igKey];
                })
                .reduce((sum, el)=>{
                    return sum+el;
                },0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients ={
            ...this.state.ingredients
        }
        updatedIngredients[type] =updatedCount;
        const priceAddition= INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice= oldPrice + priceAddition;
        this.updatePurchaseState(updatedIngredients);

        this.setState({totalPrice: newPrice, ingredients:updatedIngredients})
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients ={
            ...this.state.ingredients
        }
        updatedIngredients[type]=updatedCount;
        const priceReduction= INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice= oldPrice - priceReduction;
        this.updatePurchaseState(updatedIngredients);

        this.setState({totalPrice: newPrice, ingredients:updatedIngredients})
    }

    purchaseHandler =()=>{
        this.setState({purchasing: true})
    }

    purchaseCancelHandler =()=>{
        this.setState({purchasing: false})
    }

    purchaseContinueHandler =() =>{

        const queryParams =[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+ this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+ queryString
        })
        // console.log(this.props.history);
    }

    render() {
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary= null;
        let burger=this.state.error? <p>Burger couldn't be loaded!!</p> : <Spinner/>

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} 
                    ordered={this.purchaseHandler} />
                </Aux> );

            orderSummary =  <OrderSummary
            purchaseCancelled={this.purchaseCancelHandler}
            prchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice} />
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
}

export default withErrorHandler(BurgerBuilder, axios);
import React, { Component } from 'react';
import Aux from "../../../hoc/Auxilary";
import Button from "../../UI/Button/Button"

class OrderSummary extends Component{
    // THIS CAN BE A FUNCTIONAL COMPONENT!!!
    // componentDidUpdate(){
    //     // console.log("ORDERSUMMARY HAS UPDATED!!");
    // }
    
render(){
    const price= this.props.price.toFixed(2);
    const ingredientSummary= Object.keys(this.props.ingredients)
            .map(igKey =>{
                return(
                    <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}
                    </span>
                        : {this.props.ingredients[igKey]} 
                        </li>)
            })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Burger ready for checkout with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price -${price}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.prchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;
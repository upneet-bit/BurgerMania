import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from "./ContactData.module.css";
import axios from "../../../axios/axios-orders";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from "../../../store/actions";
import {updateObject, checkValidity} from "../../../shared/utility";

class ContactData extends Component {
    state={
        orderForm:{
            name:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Street'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your PIN-CODE'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength:5 
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Country'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder:'Email Id'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        deliveryMethod:{
            elementType: 'select',
            elementConfig:{
               options:[
                   {value: 'fastest', displayValue: 'Fastest'},
                   {value: 'nearest', displayValue: 'Nearest'}
               ]
            },
            value: 'fastest',  ///'fastest' as in for ui by default we must have something rather than an empty string
            validation:{},
            valid: true
        }
    },
        formIsValid: false
}
   
    inputChangedHandler=(event, inputIdentifier)=>{

        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
            value: event.target.value,
            valid:checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched:true
        });

        const updatedOrderForm= updateObject(this.state.orderForm,{
            [inputIdentifier] : updatedFormElement  ////dynamic approach []:  ....  //by this it implie the properties of the object
        })

        let formIsValid= true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid= updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        // console.log(formIsValid);
        this.setState({orderForm : updatedOrderForm, formIsValid: formIsValid})
    }

    orderHandler = (event)=>{
        event.preventDefault();
        // console.log(this.props.ings);

        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order ={
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);

    }

    render() {
        const formElementArray=[];
        for(let key in this.state.orderForm){
                formElementArray.push({
                    id: key,
                    config:this.state.orderForm[key]
                })
        }

        let form= (
            <form onSubmit={this.orderHandler} >

            {formElementArray.map(formElement => (
                <Input key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                changed={(event)=> this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value} />
            ))}

            <Button
            disabled={!this.state.formIsValid}
            btnType="Success">
            ORDER </Button>                   
        </form>
        );

        if(this.props.loading){
            form= <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
               {form}
            </div>
        );
    }
}

const mapStatetoProps= state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token : state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchtoProps = dispatch =>{
   return{
       onOrderBurger: (orderData, token)=> dispatch(orderActions.purchaseBurger(orderData, token))
   }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(ContactData, axios));
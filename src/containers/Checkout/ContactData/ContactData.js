import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';

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
            value: '',  ///'fastest' as in for ui by default we must have something rather than an empty string
            validation:{},
            valid: true
        }
    },
        loading: false,
        formIsValid: false
}

    checkValidity=(value, rules)=>{ 
        
        let isValid= true;

        if(rules){

            if(rules.required){
                isValid= value.trim() !== '' && isValid;
            }
    
            if(rules.minLength){
                isValid= value.length >= rules.minLength && isValid;
            }
    
            if(rules.maxLength){
                isValid= value.length <= rules.maxLength && isValid;
            }
    
        }
        return isValid;   
    }

   
    inputChangedHandler=(event, inputIdentifier)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement ={
            ...this.state.orderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            //   console.log(updatedFormElement);
        updatedFormElement.touched= true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid= true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid= updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        // console.log(formIsValid);

        this.setState({orderForm : updatedOrderForm, formIsValid: formIsValid})
    }

    orderHandler = (event)=>{
        event.preventDefault();
        // console.log(this.props.ingredients);
        this.setState({loading : true});

        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading : false})
            console.log(response);
            // this.props.history.push('/')       //THIS CAN WORK USING hoc of withRouter() or passing in props individually
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading : false})
            console.log(error);
        })
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

            {/* <Input elementType="..." elementConfig="..." value="..." /> */}

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
        if(this.state.loading){
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

export default ContactData;
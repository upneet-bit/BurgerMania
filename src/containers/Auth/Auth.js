import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from "./Auth.module.css";
import * as actions from "../../store/actions";
import { connect } from 'react-redux';
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from 'react-router';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state={
        controls:{
            email:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your email-id'
                },
                value: '',
                vaildation:{
                    required: true,
                isEmail: true  
                },
                valid :false,
                touched: false
            },
            password:{
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder:'Password'
                },
                value: '',
                vaildation:{
                    required: true,
                    minLength: 6    ///Adjust this according to your backend  
                },
                valid :false,
                touched: false
            }
        },
        isSignUp: true
    };

    componentDidMount(){
        // console.log("AUTH HERE CHECKINg ROUTED PARAMS", this.props.authRedirectPath, this.props.burgerBuilding);
        if(!this.props.burgerBuilding && this.props.authRedirectPath !== '/' ){
            this.props.onSetRedirectPath();
        }
    }

    inputChangedHandler=(event, controlName)=>{
        const updatedControls = updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName], {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid:checkValidity(event.target.value, this.state.controls[controlName].vaildation),
                touched: true
            })
        });
        this.setState({controls : updatedControls });
    }

    switchAuthModeHandler =() =>{
        this.setState(prevState =>{
            return{
                isSignUp: !prevState.isSignUp
            }
        })
    }



    SubmitHandler= (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render() {
        const formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config:this.state.controls[key]
            });
        }

        let form= formElementsArray.map(formElement=>(
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                changed={(event)=> this.inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                value={formElement.config.value} 
            />
        ))

        if(this.props.loading){
            form= <Spinner/>
        }
        
        let errorMessage= null;
        if(this.props.error){
            errorMessage=(
                <p>
                    {this.props.error}
                </p>
            )
        }

        let authRedirect= null;
        if(this.props.isAuthenticated)(
            authRedirect= <Redirect to={this.props.authRedirectPath} />
        )

        return (
            <div  className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.SubmitHandler}>
                    {form}
                <Button btnType="Success"> Submit </Button>
                </form>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP' } </Button>
            </div>
        );
    }
}

const mapStateToProps= (state)=>{
    return{
        loading: state.auth.loading,
        error  : state.auth.error,
        isAuthenticated: state.auth.token !== null,
        burgerBuilding: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth : (email, password, isSignUp )=> dispatch(actions.auth(email, password, isSignUp )),
        onSetRedirectPath: ()=> dispatch(actions.setAuthRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
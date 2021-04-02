import React from 'react';
import classes from "./Input.module.css";

const Input = (props) => {
            let inputElement= null;
            const inputClasses= [classes.InputElement];
            
            let validationError = null;
            if (props.invalid && props.touched) 
            {
                validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
            }


            if(props.invalid && props.shouldValidate && props.touched){
                inputClasses.push(classes.Invalid)
            }

            switch (props.elementType) {
                case ('input'):
                    inputElement = <input
                     className={inputClasses.join(' ')}
                      {...props.elementConfig} 
                      onChange={props.changed}
                      value={props.value} />
                    break;
                case ('textarea'):
                    inputElement = <textarea 
                     className={inputClasses.join(' ')} 
                     {...props.elementConfig} 
                     onChange={props.changed}
                     value={props.value}/>
                    break;
                case ('select'):
                    inputElement=
                    <select
                    className={inputClasses.join(' ')} 
                    onChange={props.changed}
                    value={props.value}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value}
                            value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                    break;
                
                default:
                    inputElement = <input
                     className={inputClasses.join(' ')}
                      {...props.elementConfig} 
                      onChange={props.changed}
                      value={props.value}/>
                    break;
            }

        return(
            <div className={classes.Input}>
                <label className={classes.label} >{props.label}</label>
                {inputElement}
                {validationError}
            </div>
        )
    }

export default Input;
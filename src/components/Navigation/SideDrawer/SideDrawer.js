import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Logo from "../../Logo/Logo";
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";

const SideDrawer= (props) => {
    let attachedClasses= [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses= [classes.SideDrawer , classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.close} />
        <div className={attachedClasses.join(' ')} onClick={props.close} >
            <div className={classes.Logo}>
                 <Logo/>
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </div>
            
        </Aux>
    );
}

export default SideDrawer;
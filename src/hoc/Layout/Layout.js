import React, { Component } from "react";
import Aux from "../Auxilary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component{
    state={
        showSideDrawer: false
    }

    SideDrawerCloseHandler =()=>{
        this.setState({showSideDrawer: false})
    }

    ToggleSideDrawer = ()=>{
        let show= this.state.showSideDrawer;
        this.setState({showSideDrawer: !show});
        ////OR DIRECTLY
        // this.setState((prevState)=>{
        //     return {showSideDrawer :!prevState.showSideDrawer}
        // })
    }

    render(){
        return(
            <Aux>
                <Toolbar
                toggleDrawer={this.ToggleSideDrawer} />
                <SideDrawer 
                close={this.SideDrawerCloseHandler}
                open={this.state.showSideDrawer} />
                <main className={classes.Content} >
                    {this.props.children}
                </main>
            </Aux>
            );
    }
}

export default Layout;
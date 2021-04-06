import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(){
            super();
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error: null})
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res=>res, error =>{
                this.setState({error: error})
            })
        }
     
        state={
            error: null
        }

        componentWillMount(){
           this.reqInterceptor =  axios.interceptors.request.use(req =>{
                this.setState({error: null})
                return req;
            })
             this.resInterceptor = axios.interceptors.response.use(res=>res, error =>{
                this.setState({error: error})
            })
        }

        componentWillUnmount(){
            // console.log("Unmount called---",this.reqInterceptor,this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = ()=>{
            this.setState({error: null})
        }

        render(){
            return(
                <Aux>
                    <Modal 
                        show={this.state.error? true: false} 
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}     
export default withErrorHandler;
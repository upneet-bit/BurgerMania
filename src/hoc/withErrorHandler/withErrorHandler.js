import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state={
            error: null
        };
        
        // constructor(){
        //     super();
        //     this.reqInterceptor =  axios.interceptors.request.use(req =>{
        //         console.log(req);
        //          this.setState({error: null});
        //          console.log("CALLED OFF VIA REQUEST");
        //          return req;
        //      }, error=>{
        //          console.log(error);
        //          this.setState({error: error});
        //          return Promise.reject(error);
        //      });
 
        //      this.resInterceptor = axios.interceptors.response.use(res=>{
        //          console.log(res);
        //          return res;
        //      }, error=>{
        //          console.log(error);
        //          this.setState({error: error});
        //          return Promise.reject(error);
        //      })
        // }

        componentWillMount(){
           this.reqInterceptor =  axios.interceptors.request.use(req =>{
            //    console.log(req);
                this.setState({error: null});
                // console.log("CALLED OFF VIA REQUEST");
                return req;
            }, error=>{
                // console.log(error);
                this.setState({error: error});
                return Promise.reject(error);
            });

            this.resInterceptor = axios.interceptors.response.use(res=>{
                // console.log(res);
                return res;
            }, error=>{
                // console.log(error);
                this.setState({error: error});
                return Promise.reject(error);
            })
        }

        componentWillUnmount(){
            // console.log("Unmount called---",this.reqInterceptor,this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = ()=>{
            this.setState({error: null});
            // console.log("ERROR-CLOSED");
        }

        render(){
            // console.log(this.state.error);
            return(
                <Aux>
                    <Modal 
                        show={this.state.error ? true: false} 
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
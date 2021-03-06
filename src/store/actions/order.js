import axios from '../../axios/axios-orders';
import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess= (id, orderData)=>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData    
    }
}

export const purchaseBurgerFail= (error)=>{
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart =()=>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token)=>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json?auth='+ token , orderData)
        .then(response => {
            // console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const purchaseInit= ()=>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess= (orders)=>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail= (error)=>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart =()=>{
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId)=>{
    return dispatch =>{
        ////You can get this by using getstate here 
        // return (dispatch, getState)

        dispatch(fetchOrdersStart());
        ///easyy for firebase as it has a method for queryParams orderBy="userId"
        const queryParams = '?auth='+ token +'&orderBy="userId"&equalTo="' +userId + '"';
        
        axios.get('/orders.json' + queryParams)
        .then(res =>{
            const fetchedOrders=[];
            // console.log(res.data);
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            };
            console.log(fetchedOrders);
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err =>{
            dispatch(fetchOrdersFail(err));
        })
    }

}
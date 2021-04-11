import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
  return {
      type: actionTypes.PURCHASE_BURGER_START
  }
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders?authtoken=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrderSuccess = (orders) =>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrderStart = () => {
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?authtoken=' + token + '&orderBy=' + userId;
        axios.get('/orders' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data.data) {
                    fetchedOrders.push({
                        ...res.data.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrderFail(err))
            })
    }
};

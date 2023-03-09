import axios from "axios";
import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, ORDER_ADD_ITEM, ORDER_CLEAR, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_QUEUE_LIST_FAIL, ORDER_QUEUE_LIST_REQUEST, ORDER_QUEUE_LIST_SUCCESS, ORDER_REMOVE_ITEM, ORDER_SET_PAYMENT_TYPE, ORDER_SET_TYPE, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, SCREEN_SET_WIDTH } from "./constants"

export const setOrderType = (dispatch, orderType) => {
    return dispatch({
        type: ORDER_SET_TYPE,
        payload: orderType
    })
};

export const listCategories = async (dispatch) => {
    dispatch({type: CATEGORY_LIST_REQUEST});
    try {
        const { data } = await axios.get('/api/categories');
        dispatch({type: CATEGORY_LIST_SUCCESS, payload: data});
    } catch (e) {
        return dispatch({type: CATEGORY_LIST_FAIL, payload: e.message});
    }
};

export const listProducts = async (dispatch, categoryName = '') => {
    dispatch({type: PRODUCT_LIST_REQUEST});
    try {
        const { data } = await axios.get(`/api/products?category=${categoryName}`);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (e) {
        return dispatch({type: PRODUCT_LIST_FAIL, payload: e.message});
    }
};

export const addToOrder = async (dispatch, item) => {
    dispatch({type: ORDER_ADD_ITEM, payload: item});
};

export const removeFromOrder = async (dispatch, item) => {
    dispatch({type: ORDER_REMOVE_ITEM, payload: item});
};

export const clearOrder = async (dispatch) => {
    dispatch({type: ORDER_CLEAR});
};

export const setPaymentType = async (dispatch, paymentType) => {
    dispatch({type: ORDER_SET_PAYMENT_TYPE, payload: paymentType});
};

export const createOrder = async (dispatch, order) => {
    dispatch({type: ORDER_CREATE_REQUEST, loading: true});
    try {
        const { data } = await axios.post('/api/orders', order);
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data});
        dispatch({type: ORDER_CLEAR});
    } catch (e) {
        dispatch({type: ORDER_CREATE_FAIL, payload: e.message});
    }
};

export const listOrders = async (dispatch) => {
    dispatch({type: SCREEN_SET_WIDTH});
    dispatch({type: ORDER_LIST_REQUEST, loading: true});
    try {
        const { data } = await axios.get('/api/orders');
        dispatch({type: ORDER_LIST_SUCCESS, payload: data});
    } catch (e) {
        dispatch({type: ORDER_LIST_FAIL, payload: e.message});
    }
};

export const listQueue = async (dispatch) => {
    dispatch({type: SCREEN_SET_WIDTH});
    dispatch({type: ORDER_QUEUE_LIST_REQUEST, loading: true});
    try {
        const { data } = await axios.get('/api/orders/queue');
        dispatch({type: ORDER_QUEUE_LIST_SUCCESS, payload: data});
    } catch (e) {
        dispatch({type: ORDER_QUEUE_LIST_FAIL, payload: e.message});
    }
};
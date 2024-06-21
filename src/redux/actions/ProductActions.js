import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/ProductConstants"
import axios from 'axios';
import { logout } from "./UserActions";
import api from './../../api';

// ALL PRODUCTS
export const listProducts = (keyword = " ") => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST})

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await api.get(`/api/products/all?keyword=${keyword}`, config)
        
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data})

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: message,
        })
    }
}

// DELETE PRODUCT
export const deleteProduct = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST})

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await api.delete(`/api/products/${id}`, config)
        
        dispatch({ type: PRODUCT_DELETE_SUCCESS })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }

        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message,
        })
    }
}

// CREATE PRODUCT
export const createProduct = (name, price, description, image, countInStock, category) => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST})

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await api.post(`/api/products/`, { name, price, description, image, countInStock , category }, config)
        
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }

        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message,
        })
    }
}

// EDIT PRODUCT
export const editProduct = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_EDIT_REQUEST})
        const {data} = await api.get(`/api/products/${id}`)
        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data})
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }

        dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload: message,
        })
    }
}

// UPDATE PRODUCT
export const updateProduct = (product) => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST})

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await api.put(`/api/products/${product._id}`, product, config)
        
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }

        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        })
    }
}
import { ORDER_DELIVERED_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/OrderConstants"
import axios from 'axios';
import { logout } from "./UserActions";
import api from './../../api';


// ALL ORDERS
// export const listOrders = (pageNumber = '', pageSize = '', keyword = '') => async(dispatch, getState) => {
//     try {
//         dispatch({ type: ORDER_LIST_REQUEST})

//         const { userLogin: { userInfo }} = getState()

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const {data} = await axios.get(`/api/orders/all?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}`, config)
        
//         dispatch({ type: ORDER_LIST_SUCCESS, payload: data})

//     } catch (error) {
//         const message = error.response && error.response.data.message ? error.response.data.message : error.message

//         if (message === "Not Authorized, Token Failed") {
//             dispatch(logout())
//         }

//         dispatch({
//             type: ORDER_LIST_FAIL,
//             payload: message,
//         })
//     }
// }

export const listOrders = () => async(dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST})

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await api.get(`/api/orders/all`, config)
        
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data})

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }

        dispatch({
            type: ORDER_LIST_FAIL,
            payload: message,
        })
    }
}

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await api.get(`/api/orders/${id}`, config)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data})

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message,
        })
    }
}

// ORDER DELIVER
export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVERED_REQUEST})

        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await api.put(`/api/orders/${order._id}/delivered`,{}, config)
        dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data})

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload: message,
        })
    }
}
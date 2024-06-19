import axios from 'axios';
import { logout } from './UserActions';
import { IMAGE_UPLOAD_FAIL, IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS } from "../constants/ImageConstatns";
import api from './../../api';

export const uploadProductImage = (image) => async(dispatch, getState) => {
    try {
        dispatch({ type: IMAGE_UPLOAD_REQUEST})

        const { userLogin: { userInfo }} = getState()

        const formData = new FormData()
        formData.append('image', image)

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await api.post(`/api/images/upload-image`, formData, config)
        
        dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: data.url })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }

        dispatch({
            type: IMAGE_UPLOAD_FAIL,
            payload: message,
        })
    }
}

export const deleteProductImage = (image) => async(dispatch, getState) => {
    try {
        dispatch({ type: IMAGE_UPLOAD_REQUEST})

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await api.post(`/api/images/delete-image`, { image }, config)
        
        dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        if (message === "Not Authorized, Token Failed") {
            dispatch(logout())
        }

        dispatch({
            type: IMAGE_UPLOAD_FAIL,
            payload: message,
        })
    }
}
import { DISCOUNT_CREATE_FAIL, DISCOUNT_CREATE_REQUEST, DISCOUNT_CREATE_SUCCESS, DISCOUNT_DELETE_FAIL, DISCOUNT_DELETE_REQUEST, DISCOUNT_DELETE_SUCCESS, DISCOUNT_EDIT_FAIL, DISCOUNT_EDIT_REQUEST, DISCOUNT_EDIT_SUCCESS, DISCOUNT_LIST_FAIL, DISCOUNT_LIST_REQUEST, DISCOUNT_LIST_SUCCESS, DISCOUNT_UPDATE_FAIL, DISCOUNT_UPDATE_REQUEST, DISCOUNT_UPDATE_SUCCESS } from "../constants/DiscountConstants";
import axios from 'axios';
import { logout } from "./UserActions";
import api from './../../api';

export const listDiscounts = () => async (dispatch, getState) =>
{
  try {
    dispatch({ type: DISCOUNT_LIST_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await api.get(`/api/discounts`, config)

    dispatch({ type: DISCOUNT_LIST_SUCCESS, payload: data })

  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message

    if (message === "Not Authorized, Token Failed") {
      dispatch(logout())
    }

    dispatch({
      type: DISCOUNT_LIST_FAIL,
      payload: message,
    })
  }
}

// CREATE DISCOUNT
export const createDiscount = (name, description, type, value, max_value, code, start_date, end_date, max_uses, max_uses_per_user, min_order_value, is_active) => async (dispatch, getState) =>
{
  try {
    dispatch({ type: DISCOUNT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.post(
      `/api/discounts/`,
      { name, description, type, value, max_value, code, start_date, end_date, max_uses, max_uses_per_user, min_order_value, is_active },
      config
    );

    dispatch({ type: DISCOUNT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === 'Not Authorized, Token Failed') {
      dispatch(logout());
    }

    dispatch({
      type: DISCOUNT_CREATE_FAIL,
      payload: message,
    });
  }
};


 
// EDIT DISCOUNT
export const editDiscount = (id) => async(dispatch) => {
  try {
      dispatch({ type: DISCOUNT_EDIT_REQUEST})
      const {data} = await api.get(`/api/discounts/${id}`)
      dispatch({ type: DISCOUNT_EDIT_SUCCESS, payload: data})
  } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message

      if (message === "Not Authorized, Token Failed") {
          dispatch(logout())
      }

      dispatch({
          type: DISCOUNT_EDIT_FAIL,
          payload: message,
      })
  }
}

// UPDATE DISCOUNT
export const updateDiscount = (id, name, description, type, value, max_value, code, start_date, end_date, max_uses, max_uses_per_user, min_order_value, is_active) => async (dispatch, getState) => {
  try {
    dispatch({ type: DISCOUNT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await api.put(
      `/api/discounts/${id}`,
      { name, description, type, value, max_value, code, start_date, end_date, max_uses, max_uses_per_user, min_order_value, is_active },
      config
    );

    dispatch({ type: DISCOUNT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not Authorized, Token Failed") {
      dispatch(logout());
    }

    dispatch({
      type: DISCOUNT_UPDATE_FAIL,
      payload: message,
    });
  }
};

// DELETE DISCOUNT
export const deleteDiscount = (id) => async(dispatch, getState) => {
  try {
      dispatch({ type: DISCOUNT_DELETE_REQUEST})

      const { userLogin: { userInfo }} = getState()

      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      }

      await api.delete(`/api/discounts/${id}`, config)
      
      dispatch({ type: DISCOUNT_DELETE_SUCCESS })

  } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message

      if (message === "Not Authorized, Token Failed") {
          dispatch(logout())
      }

      dispatch({
          type: DISCOUNT_DELETE_FAIL,
          payload: message,
      })
  }
}
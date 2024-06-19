import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userListReducer, userLoginReducer } from './reducers/UserReducers';
import { productCreateReducer, productDeleteReducer, productEditReducer, productListReducer, productUpdateReducer } from "./reducers/ProductReducers";
import { orderDeliveredReducer, orderDetailsReducer, orderListReducer } from "./reducers/OrderReducers";
import { categoryCreateReducer, categoryDeleteReducer, categoryEditReducer, categoryListReducer, categoryUpdateReducer } from "./reducers/CategoryReducers";
import { discountCreateReducer, discountDeleteReducer, discountEditReducer, discountListReducer, discountUpdateReducer } from './reducers/DiscountReducers';
import { imageProductUploadReducer } from './reducers/ImageReducers';

const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    productList: productListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productEdit: productEditReducer,
    productImageUpload: imageProductUploadReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    orderDeliver: orderDeliveredReducer,
    categoryDelete: categoryDeleteReducer,
    categoryCreate: categoryCreateReducer,
    categoryList: categoryListReducer,
    categoryEdit: categoryEditReducer,
    categoryUpdate: categoryUpdateReducer,
    discountDelete: discountDeleteReducer,
    discountCreate: discountCreateReducer,
    discountList: discountListReducer,
    discountEdit: discountEditReducer,
    discountUpdate: discountUpdateReducer,
})

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null


const initialState = {
    userLogin: {
        userInfo: userInfoFromLocalStorage
    }
}

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
})

export default store
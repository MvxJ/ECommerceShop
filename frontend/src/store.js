import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { productListReducer } from "./reducers/productReducer";
import { productDetailsReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer
} from "./reducers/userReducer";
import { orderCreateReducer, orderDetailsReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userProfileUpdate: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null;
const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
};
const middleWare = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
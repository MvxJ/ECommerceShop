import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { productListReducer } from "./reducers/productReducer";
import { productDetailsReducer } from "./reducers/productReducer";

const initialState = {};
const middleWare = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
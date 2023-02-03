import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//setup store
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"

//slices
import productReducer, { productsFetch } from './features/productSlice';
import { productsApi } from './features/productsApi';
import cartReducer, { getTotals } from './features/cartSlice';
import authReducer, { loadUser } from './features/authSlice';


//store
const store = configureStore({
  reducer:{
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(productsApi.middleware)
  
});

//when it loads
store.dispatch(productsFetch())
store.dispatch(getTotals())
store.dispatch(loadUser(null));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <App />
  </Provider>
  
);



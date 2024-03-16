import { configureStore } from "@reduxjs/toolkit";
import userAuth from './userAuth'
import productReducer from "./productReducer"; // Import the product reducer from the products file


const store = configureStore({
    reducer: {
    
      auth : userAuth,
      products: productReducer, 
    },
  });
  
  export default store;
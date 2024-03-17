import "bootstrap/dist/css/bootstrap.min.css";

import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registretion from "./components/Signup/Registretion";
import Login from "./components/Signup/Login/Login";
import Admin from "./components/isAdmin/Admin";
import Home from "./pages/Home/Home";
import Createproduct from "./components/isAdmin/CreateProduct/Createproduct";
import Createcategory from "./components/isAdmin/Createcategory/Createcategory";
import Deatails from "./components/Productdetailes/Deatails";
import Mens from "./components/menproducts/Mens";
import Womens from "./components/WomesProducts/Womens";
import Cart from "./components/Cart/Cart";

import Shope from "./components/shope/Shope";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setProducts } from "./Redux/productReducer";

import EditProducts from "./components/isAdmin/CreateProduct/EditProducts";

function App() {
  const dispatch = useDispatch();
  const mensProduct = useSelector((state) => state.products.mensProduct);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/products");
        dispatch(setProducts(res.data.productList));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  console.log(mensProduct);
  return (
  
      <BrowserRouter>
      
        <Routes>
        
     
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registretion />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product-creation" element={<Createproduct />} />
          <Route path="/category-creation" element={<Createcategory />} />
          <Route path="/product-detaile/:id" element={<Deatails />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shope" element={<Shope />} />
          <Route path="/editproducts/:id" element={<EditProducts />} />       
      
        </Routes>

      </BrowserRouter>

  );
}

export default App;

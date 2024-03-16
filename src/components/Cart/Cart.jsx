import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from '@mui/icons-material/Done';
import "./cart.css";
import Header from "../Header/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const [cartlist, setCartList] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getCartList = async () => {
      try {
        const res = await axios.get("http://localhost:4000/cartlist");

        setCartList(res.data.cart);

    if(res.data.success){
           toast.success(res.data.message)
    }else{
        toast.error(res.data.message)
    }

      } catch (error) {
       toast.error("Error fetching cart list:", error);
      }
    };
    getCartList();
  }, [cartlist]);

 const handleQuantityChange= async (products) => {
    const responce = axios.post("http://localhost:4000/singlecart", {
      products,
      quantity
    });
  };
  const userCart = cartlist.filter((item) => item.userId && item.userId._id === user?._id
  );


  return (
    <div>
        <Header length={userCart.length}/>
      <Container>
        <Row style={{ display: "flex",flexDirection: "column" }}>
          {userCart ?
            userCart.map((v) => (
              <Col>
                <div className="d-flex cart">
                  <div>
                    <div className="cart-image">
                      <img
                        style={{ width: "100%" }}
                        src={`http://localhost:4000/${v.products.photograph}`}
                        alt=""
                      />
                    </div>
                    <div className="cart-button">
                      {/* <p>Quantity: {quantity}</p> */}

                      <button
                        className="quantity-button"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <AddIcon />
                      </button>
                      <div className="quantity-count">
                        <p>{v.quantity}</p>
                      </div>
                      <button
                        className="quantity-button"
                        onClick={() =>setQuantity(quantity - 1)}
                      >
                        <RemoveIcon />
                      </button>
                      <button
                        className="quantity-button"
                        onClick={() => handleQuantityChange(v.products._id)}
                      >
                       <DoneIcon/>
                      </button>
                    </div>
                  </div>
                  <div className="cart-text">
                    <h2 className="pt-2 fs-5 fw-semibold">{v.products.name}</h2>
                    <h4 className="pt-2">Total Price: ${v.products.price * v.quantity}</h4>
                    <h5 className="pt-2">remove button</h5>
                  </div>
                </div>
              </Col>
             
            )):<h1>jkdfhkj</h1>}
         
        </Row>
      </Container>
    </div>
  );
}
export default Cart;

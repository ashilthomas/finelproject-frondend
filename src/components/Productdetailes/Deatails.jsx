import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./detaile.css";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
function Deatails() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
   const quantity = 1

  useEffect(() => {
    const getNewProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/products/${id}`);
        setDetail(res.data.oneProduct);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getNewProduct();
  }, [id]);


console.log(detail);
  const addtocart = async (productId) => {
    try {
      const response = await axios.post("http://localhost:4000/cart", {
        userId,
        products: productId,
        quantity

      });
      if (response.data.success) {
        toast.success(response.data.message);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        navigate("/cart");

      }else{
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


  return (
    <div>
      
      <ToastContainer />
      <Header/>
      <Container style={{ marginTop: "30px" }}>
        
        <Row className="m-0 mt-50">
          <Col className="ml-4 ">
            <div
              className=" d-flex justify-content-center align-items-center  "
              style={{ width: "100%", maxWidth: "500px", marginLeft: "100px" }}
            >
              <img
                className="w-100"
                src={`http://localhost:4000/${detail.photograph}`}
                alt="Product"
              />
            </div>
          </Col>
          <Col>
            <div>
              <div>
                <p className="mt-3">
                  Lorem ipsum dolor sit amet consectetur adipis
                </p>
                <h3 className="mt-3">{detail.name}</h3>

                <Rating
                  className="mt-1"
                  name="size-small"
                  defaultValue={2}
                  size="small"
                />
                <h4 className="mt-1">${detail.price}</h4>
                <p className="mt-1">
                  {" "}
                  Nulla, optio nam cum Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Reprehenderit ut expedita impedit, atque
                  facilis corrupti! Architecto aut inventore voluptates maiores
                  omnis cupiditate, molestias, dolorum aspernatur vero animi
                  sunt amet nemo!
                </p>
              </div>
              <div>
                <SizeBox />
              </div>
              <div className="mt-3">
                <Button
                  onClick={() => addtocart(detail._id)}
                  className="Cart-button"
                >
                  Add to Cart
                </Button>
                <Button className="ml-5 inhertance">Buy Now</Button>
              </div>
            </div>
          </Col>
        </Row>{" "}
      </Container>
    </div>
  );
}

const SizeBox = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ["S", "M", "L", "XL"]; // Add your available sizes

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    // You can add additional logic here, e.g., trigger an action when a size is selected
  };

  return (
    <div>
      <p>Select Size:</p>
      <div className="size-box-container">
        {sizes.map((size) => (
          <div
            key={size}
            className={`size-box ${selectedSize === size ? "selected" : ""}`}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </div>
        ))}
      </div>
      {selectedSize && <p>You selected: {selectedSize}</p>}
    </div>
  );
};
export default Deatails;

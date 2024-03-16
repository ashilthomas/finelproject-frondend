import axios from "axios";
import React, { useEffect, useState } from "react";
import {  Col, Container, Row } from "react-bootstrap";
import "./newproduct.css";

import { Link } from "react-router-dom";
function Newproduct() {
  const [products, setData] = useState([]);

  useEffect(() => {
    const getNewProduct = async () => {
      try {
        const res = await axios.get("http://localhost:4000/products");
        setData(res.data.productList);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getNewProduct();
  }, []);
  const filtere = products.filter((val) => val.category == "womens");

  const a = products.slice(0, 8);

  console.log(a);
  console.log(products);
  return (
    <div>
      <Container>
        <div className="newProduct-sections">
          <h2 className="text-center">New Products</h2>
          <div className="cards-container">
<div className="cards">
  {a.map((card) => (
    <div key={card.id} className="card">
      <Link to={`/product-detaile/${card._id}`}>
        {" "}
        <img
          src={`http://localhost:4000/${card.photograph}`}
          alt=""
          className="product-image"
        />
      </Link>
      <h3>{card.name}</h3>
      <p className="product-price">{card.price}</p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  ))}
</div>
</div>

        </div>
      </Container>
    </div>
  );
}

export default Newproduct;




{/* <Row>
{a &&
  a.map((res, i) => (
    <Col className="m-0">
      <div className="product-card">
      <Link to={`/product-detaile/${res._id}`}>

          <img
          src={`http://localhost:4000/${res.photograph}`}
          alt={res.name}
          className="product-image"
        />
      </Link>
      
        <div className="product-details">
          <h3 className="product-name">{res.name}</h3>
          <p className="product-price">${res.price}</p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>{" "}
    </Col>
  ))}
</Row> */}
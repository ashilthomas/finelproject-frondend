import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import './women.css'
import { useSelector } from "react-redux";

const Womens = () => {
  const [clothingType, setClothingType] = useState("");
  const mensProduct = useSelector((state) => state.products.products);

  const handleRadioChange = (event) => {
    setClothingType(event.target.value);
  };
   
  // Filter products that belong to the "womens" category
  const women = mensProduct.filter((val) => val.category && val.category.name === "womens");

  // Apply additional filtering based on selected clothing type
  const filteredData = clothingType
    ? women.filter((item) => item.category?.name === clothingType)
    : women;

  return (
    <>
  
      <div className="dashboard-container">
        <div className="categories-container">
          <h2>Categories</h2>
          <ul>
            <div>
              <div style={{ margin: "auto", padding: "20px" }}>
                <form
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      value="shirt"
                      checked={clothingType === "shirt"}
                      onChange={handleRadioChange}
                    />
                    Shirt
                  </label>
                  <label style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      value="pants"
                      checked={clothingType === "pants"}
                      onChange={handleRadioChange}
                    />
                    Pants
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="tshirt"
                      checked={clothingType === "tshirt"}
                      onChange={handleRadioChange}
                    />
                    T-Shirt
                  </label>
                </form>
              </div>
            </div>
          </ul>
        </div>

        <div className="cards-container">
          <div className="cards">
            {filteredData.map((card) => (
              <div key={card.id} className="card">
                <Link to={`/product-detaile/${card._id}`}>
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
    </>
  );
};

export default Womens;



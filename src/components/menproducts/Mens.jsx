import React, { useState } from "react";
import Header from "../Header/Header";


import { Link } from "react-router-dom";

import { useSelector } from "react-redux";


const Mens = () => {

    const [clothingType, setClothingType] = useState("");
    const mensProduct = useSelector((state) => state.products.products);
  
    const handleRadioChange = (event) => {
      setClothingType(event.target.value);
    };
     
 
    const mens = mensProduct.filter((val) => val.category && val.category.name === "mens");
  

    const filteredData = clothingType
      ? mens.filter((item) => item.name === clothingType || item.category?.name== clothingType)
      : mens;

console.log(filteredData);
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
                  <label>
                    <input
                      type="radio"
                      value="mens"
                      checked={clothingType === "mens"}
                      onChange={handleRadioChange}
                    />
                  All
                  </label>
                </form>
              </div>
            </div>
          </ul>
        </div>

        <div className="cards-container">
          <div className="cards">

            {
          
            
            
            
        filteredData &&    filteredData.map((card) => (
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
    </>
  );
};



export default Mens;

// function Mens() {
//   const [mensProduct, setMensData] = useState([]);
//   const [clothingType, setClothingType] = useState('');

//   useEffect(() => {
//     const getNewProduct = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/products");
//         setMensData(res.data.productList);
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };

//     getNewProduct();
//   }, []);

//   const handleRadioChange = (event) => {
//     setClothingType(event.target.value);
//   };

//   const mens = mensProduct.filter((val) => val.category.name === "mens");

//   const filteredData =  clothingType
//     ? mens.filter((item) => item.name === clothingType)
//     : mens;

//     console.log(mens);

//   return (
//     <div>

// <Header/>
// <Container>

//         <Row>
//         <Col className="col-md-2">
//               <div className="admin">
//                 <div className="admin-name">Category</div>
//                 <div className="dashbord-data">
//                   <div>
//                     <div style={{ margin: "auto", padding: "20px" }}>
//                       <form
//                         style={{
//                           marginBottom: "10px",
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: "10px",
//                         }}
//                       >
//                         <label style={{ marginRight: "10px" }}>
//                           <input
//                             type="radio"
//                             value="shirt"
//                             checked={clothingType === "shirt"}
//                             onChange={handleRadioChange}
//                           />
//                           Shirt
//                         </label>
//                         <label style={{ marginRight: "10px" }}>
//                           <input
//                             type="radio"
//                             value="pants"
//                             checked={clothingType === "pants"}
//                             onChange={handleRadioChange}
//                           />
//                           Pants
//                         </label>
//                         <label>
//                           <input
//                             type="radio"
//                             value="tshirt"
//                             checked={clothingType === "tshirt"}
//                             onChange={handleRadioChange}
//                           />
//                           T-Shirt
//                         </label>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Col>

//           {filteredData &&
//             filteredData.map((d) => (
//               <>

//          {/* <Col key={d._id}  className="" style={{width:'18%'}}> */}

//                 <div className="product-card d-flex" style={{width:'18%', flexDirection:'row'}}>
//                   <div>
//                        <Link to={`/product-detaile/${d._id}`}>
//                     <img
//                       src={`http://localhost:4000/${d.photograph}`}
//                       alt=""
//                       className="product-image"
//                     />
//                   </Link>

//                   <div className="product-details">
//                     <h3 className="product-name">{d.name}</h3>
//                     <p className="product-price">{d.price}</p>
//                     <button className="add-to-cart">Add to Cart</button>
//                   </div>
//                   </div>

//                 </div>

//               </>
//             ))}
//         </Row>
//      </Container>
//     </div>
//   );
// }
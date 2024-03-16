import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// function Shope() {

//     const [mensProduct, setMensData] = useState([]);
//     const [clothingType, setClothingType] = useState("");
  
//     useEffect(() => {
//       const getNewProduct = async () => {
//         try {
//           const res = await axios.get("http://localhost:4000/products");
//           setMensData(res.data.productList);
//         } catch (error) {
//           console.error("Error fetching data:", error.message);
//         }
//       };
  
//       getNewProduct();
//     }, []);
  
//     const handleRadioChange = (event) => {
//       setClothingType(event.target.value);
//     };
  
//     const mens = mensProduct.filter((val) => val.category.name === "womens");
  
//     const filteredData = clothingType
//       ? mens.filter((item) => item.name === clothingType)
//       : mens;
  
//   return (
//     <div>   <div className="dashboard-container">
//     <div className="categories-container">
//       <h2>Categories</h2>
//       <ul>
//         <div>
//           <div style={{ margin: "auto", padding: "20px" }}>
//             <form
//               style={{
//                 marginBottom: "10px",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "10px",
//               }}
//             >
//               <label style={{ marginRight: "10px" }}>
//                 <input
//                   type="radio"
//                   value="shirt"
//                   checked={clothingType === "shirt"}
//                   onChange={handleRadioChange}
//                 />
//                 Shirt
//               </label>
//               <label style={{ marginRight: "10px" }}>
//                 <input
//                   type="radio"
//                   value="pants"
//                   checked={clothingType === "pants"}
//                   onChange={handleRadioChange}
//                 />
//                 Pants
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="tshirt"
//                   checked={clothingType === "tshirt"}
//                   onChange={handleRadioChange}
//                 />
//                 T-Shirt
//               </label>
//             </form>
//           </div>
//         </div>
//       </ul>
//     </div>

//     <div className="cards-container">
//       <div className="cards">
//         {filteredData.map((card) => (
//           <div key={card.id} className="card">
//             <Link to={`/product-detaile/${card._id}`}>
//               {" "}
//               <img
//                 src={`http://localhost:4000/${card.photograph}`}
//                 alt=""
//                 className="product-image"
//               />
//             </Link>
//             <h3>{card.name}</h3>
//             <p className="product-price">{card.price}</p>
//             <button className="add-to-cart">Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div></div>
//   )
// }




const Shope = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.get(`http://localhost:4000/products${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    }

    setIsLoading(false);
  };

  const handleResultClick = (id) => {
    // Handle navigation to the detail page using the id
    // Example: history.push(`/details/${id}`);
    console.log(`Navigating to detail page for item with id ${id}`);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter search term..."
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}

      <ul>
        {searchResults.map((result) => (
          <li key={result.id} onClick={() => handleResultClick(result.id)}>
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};



export default Shope
import React, { useState } from 'react'

function SearchBar() {

    const [input, setInput] = useState("");

    const fetchData = (value) => {
      fetch("")
        .then((response) => response.json('http://localhost:4000/products'))
        .then((json) => {
          const results = json.filter((user) => {
            return (
              value &&
              user &&
              user.name &&
              user.name.toLowerCase().includes(value)
            );
          });
          setResults(results);
        });
    };
  
    const handleChange = (value) => {
      setInput(value);
      fetchData(value);
    };
  return (
    <div>SearchBar</div>
  )
}

export default SearchBar
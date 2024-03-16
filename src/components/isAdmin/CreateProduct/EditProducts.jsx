import { Form, Row } from "react-bootstrap";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProducts = () => {
  const { id } = useParams();
  const [categorys, setCategorys] = useState([]);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photograph, setPhotograph] = useState(null);

  useEffect(() => {
    const getCategory = async () => {
      const resCategory = await axios.get("http://localhost:4000/categories");
      setCategorys(resCategory.data.categories);
    };
    getCategory();
  }, [id]);

  useEffect(() => {
    const getOneProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/products/${id}`
        );
        setName(data.oneProduct.name);
        setPrice(data.oneProduct.price);
        setDescription(data.oneProduct.discription);
        setCategory(data.oneProduct.category);
        setQuantity(data.oneProduct.quantity);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getOneProduct();
  }, []);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handilProductName = (e) => {
    setName(e.target.value);
  };

  const handilProductPrice = (e) => {
    setPrice(e.target.value);
  };

  const handilDescription = (e) => {
    setDescription(e.target.value);
  };

  const handilProductQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handilProductPhotograph = (e) => {
    setPhotograph(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("discription", discription);
        formData.append("category", category);
        formData.append("photograph", photograph);
        formData.append("quantity", quantity);

        const res = await axios.put(
          `http://localhost:4000/products/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    setValidated(true);
  };

  return (
    <div>
      <div>
        <Container>
          <Row className="admin-row">
          
            <Col sm={2} className="admin-col">
              <div className="admin">
                <div className="admin-name">Admin name</div>
                <div className="dashbord-data">
                  <ul>
                    <li>
                      <Link to={"/"} eventKey="2" title="Item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to={"/admin"} eventKey="2" title="Item">
                        Admin
                      </Link>
                    </li>
                    <li>
                      <Link to={"/category-creation"} eventKey="2" title="Item">
                        Create category
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col sm={10}>   <div>
            <ToastContainer />
            <h2>Edit Product</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <InputLabel htmlFor="category-select">Category</InputLabel>
                <Select
                  style={{ backgroundColor: "white" }}
                  labelId="category-select"
                  id="category-select"
                  value={category}
                  onChange={handleChange}
                >
                  {categorys.map((val) => (
                    <MenuItem key={val._id} value={val._id}>
                      {val.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Other product fields */}
              <Row className="mb-3">
                <Form.Group>
                  <Form.Label>Enter name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={name}
                    placeholder="Enter name"
                    onChange={handilProductName}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label>Enter Price</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={price}
                    placeholder="Enter price"
                    onChange={handilProductPrice}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>discription</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={discription}
                    placeholder="Enter description"
                    onChange={handilDescription}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Enter Quantity</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={quantity}
                    placeholder="Enter quantity"
                    onChange={handilProductQuantity}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              {/* File upload */}
              <Form.Group controlId="photograph" className="mb-3">
                <Form.Label>Product Photograph</Form.Label>
                <Form.Control type="file" onChange={handilProductPhotograph} />
              </Form.Group>
              {/* Submit button */}
              <Button type="submit">Submit form</Button>
            </Form>
          </div>
          </Col>
          </Row>
      
       
        </Container>
      </div>
    </div>
  );
};

export default EditProducts;

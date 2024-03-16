import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Createproduct() {
  const [categorys, setCategorys] = useState([]);

  const [validated, setValidated] = useState(false);

  const [name, setname] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDiscription] = useState("");

  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photograph, setPhotograph] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategory = async () => {
      const resCategory = await axios.get("http://localhost:4000/categories");

      setCategorys(resCategory.data.categories);
    };
    getCategory();
  }, []);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handilproductName = (e) => {
    setname(e.target.value);
  };
  const handilproductPrice = (e) => {
    setPrice(e.target.value);
  };
  const handildiscription = (e) => {
    setDiscription(e.target.value);
  };
  const handilProductquantity = (e) => {
    setQuantity(e.target.value);
  };
  const handilProductPhotograph = (e) => {
    setPhotograph(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        const formData = new FormData(form);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("discription", discription);
        formData.append("category", category);
        formData.append("photograph", photograph);
        formData.append("quantity", quantity);

        const res = await axios.post(
          "http://localhost:4000/productlist",
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
        toast.error(error.responce.data.message);
      }
    }

    setValidated(true);
  };
  const mensProduct = useSelector((state) => state.products.products);
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
                        Creat category
                      </Link>
                    </li>
                  </ul>


                </div>
              </div>
            </Col>
            <Col sm={10}>
              <div>
                <ToastContainer />
                <h2>Create Product</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="demo-simple-select-label">
                    Category
                    </InputLabel>
                    <Select
                      style={{ backgroundColor: "white" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      value={category}
                      onChange={handleChange}
                    >
                      {categorys.map((val) => (
                        
                        <MenuItem 
                      
                        key={val._id} value={val._id}>
                          {val.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom01">
                      <Form.Label>Enter name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter name"
                        onChange={handilproductName}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom01">
                      <Form.Label>Enter price</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter price"
                        onChange={handilproductPrice}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom01">
                      <Form.Label>Enter Discription</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter Discription"
                        onChange={handildiscription}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="validationCustom01">
                      <Form.Label>Enter quantity</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter new Category....."
                        onChange={handilProductquantity}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Default file input example</Form.Label>
                      <Form.Control
                        onChange={handilProductPhotograph}
                        type="file"
                      />
                    </Form.Group>
                  </Row>

                  <Button type="submit">Submit form</Button>
                </Form>
              </div>
              <Table  responsive>
              <thead className="table-header">
                <tr>
                  <th>#</th>
                  <th> Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                 
                
                </tr>
              </thead>
              <tbody className="bg-dark">
                {mensProduct &&
                 mensProduct.map((v, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{v.name}</td>
                     
                    <td>
                      <Link to={`/editproducts/${v._id}`}>     <Button >edit</Button>
                      </Link>
                 </td>
                    <td><Button>Delete</Button></td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            </Col>
          </Row>
        
        </Container>
      </div>
    </div>
  );
}

export default Createproduct;

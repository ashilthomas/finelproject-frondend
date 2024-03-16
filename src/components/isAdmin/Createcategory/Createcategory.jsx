

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditCategory from "./EditCategory";
import Delete from "./Delete";

function Createcategory() {
  const [validated, setValidated] = useState(false);
  const [name, setCategory] = useState("");

  const [allCategory, setCategorys] = useState([]);


  useEffect(() => {
    const getCategorys = async () => {
      const resCategory = await axios.get("http://localhost:4000/categories");

      setCategorys(resCategory.data.categories);
    };
    getCategorys();
  }, [allCategory]);

  function handilCategoryName(e) {
    setCategory(e.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        const res = await axios.post("http://localhost:4000/create-category", {
          name,
        });

        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        console.error("Error creating category:", error.message);
        console.log("Request config:", error.config);
      }
    }

    setValidated(true);
  };

  return (
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
                < Link to={'/admin'} eventKey="2" title="Item">
                   Admin
                    </Link>
                  </li>
                   <li> 
                < Link to={'/product-creation'} eventKey="2" title="Item">
                    Create producte
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col sm={10}>
            <div>
              <ToastContainer />
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group controlId="validationCustom01">
                    <Form.Label>Enter new Category.....</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter new Category....."
                      onChange={handilCategoryName}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Button type="submit">Submit form</Button>
              </Form>
              <div style={{ marginTop: "20px" }}>
                <Category allCategory={allCategory} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
const Category = ({ allCategory }) => {
 
 
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allCategory &&
            allCategory.map((val, i) => (
              <tr>
                <td>{i+1}</td>
                <td>{val.name}</td>
                <td>
                <EditCategory categoryId={val._id} allCategory={allCategory} />
                 
                </td>
                <td>
                  <Delete categoryId={val._id} allCategory={allCategory} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Createcategory;

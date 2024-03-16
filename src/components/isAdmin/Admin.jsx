import React from "react";
import { Button, Col, Container, Nav, Row, Table } from "react-bootstrap";
import "./admin.css";

import Users from "./Userpage/Users";
import { Link } from "react-router-dom";




function Admin() {
 
  return (
    <div>
    
      <Container>
        <Row className="admin-row"> 
          <Col sm={2} className="admin-col">
            <div className="admin" >
              <div className="admin-name">Admin name</div>
              <div className="dashbord-data">
                <ul>
                  <li>
                    <Link to={"/"} eventKey="2" title="Item">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"/product-creation"} eventKey="2" title="Item">
                      Create producte
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
          <Col sm={10}>
            <Users />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Admin;

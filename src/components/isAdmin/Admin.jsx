import React from "react";
import { Button, Col, Container, Nav, Row, Table } from "react-bootstrap";
import "./admin.css";

import Users from "./Userpage/Users";
import { Link } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';


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
                      <HomeIcon />
                      <span className="ps-2"
                      >Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/product-creation"} eventKey="2" title="Item">
                    <CreateIcon/>
                      <span className="ps-2"
                      >Create producte</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/category-creation"} eventKey="2" title="Item">
                      <CategoryIcon/>
                     <span className="ps-2">Create Category</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col sm={10}>
            <div className="users-details" >
                  <Users />
            </div>
        
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Admin;

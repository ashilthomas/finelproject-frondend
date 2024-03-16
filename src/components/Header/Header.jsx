import React, { useEffect, useState } from "react";
import "./header.css";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Avatar, IconButton } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import jscookie from "js-cookie";
import Badge from "@mui/material/Badge";
// or

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlogout } from "../../Redux/userAuth";

import { styled } from "@mui/material/styles";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

function Header({length}) {



  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const [showList, setShowList] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);  const [cartlist, setCartList] = useState([]);
  const navigate = useNavigate();
  const handleClick = () => {
    setShowList(!showList);
  };
  function handilLogout() {
    dispatch(userlogout());

    jscookie.remove("token");
    navigate("/login");
  }




  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getCartList = async () => {
      try {
        const res = await axios.get("http://localhost:4000/cartlist");

        setCartList(res.data.cart);

   
  

      } catch (error) {
      //  toast.error("Error fetching cart list:", error);
      }
    };
    getCartList();
  }, []);


  const userCart = cartlist.filter((item) => item.userId && item.userId._id === user?._id
  );
  

  return (
   
      <Container>
        <Row>
          <Col>
            <Navbar expand="lg">
              <Container className="header-container">
                <Navbar.Brand style={{color:'#6c7ae0'}}
                  as={Link}
                  to={"/"}
                  href="#home"
                  className="fw-bold fs-4"
                >
                  Shope
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto nave">
                    <Nav.Link
                      as={Link}
                      to="/mens"
                      className=" nave-links"
                      href="#home"
                    >
                      mens
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/womens"
                      className=" nave-links"
                      href="#home"
                    >
                      womens
                    </Nav.Link>
                    <Nav.Link className=" nave-links" href="#link">
                      Kids
                    </Nav.Link>
                    <Nav.Link as={Link} to={'/shope'} className=" nave-links" href="#home">
                      Shopes
                    </Nav.Link>
                  </Nav>
                  <Nav className="search-bar">
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      className=" mr-sm-2"
                    />
                  </Nav>

                  <Nav className="Login">
                    {isAuthenticated ? (
                      ""
                    ) : (
                      <Link to="/register">
                        <Button className="login-button">Signup</Button>
                      </Link>
                    )}
                  </Nav>
                  <Nav className="justify-content-end">
                    <Nav.Link as={Link} to={"/cart"} href="#home">
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={userCart.length} color="error">
                          <ShoppingCartIcon />
                        </StyledBadge>
                      </IconButton>
                    </Nav.Link>
                 
                    <Nav.Link href="#link"></Nav.Link>
                  </Nav>
                  <Nav className="Dropdown">
                    <Avatar
                      onClick={handleClick}
                      sx={{ bgcolor: deepOrange[500] }}
                      alt="Remy Sharp"
                      src={
                        "https://th.bing.com/th/id/OIP.XKCAD3gGAbDEhCNWK09P3wHaJ4?rs=1&pid=ImgDetMain"
                      }
                    />
                    <div className="drope-down">
                      <div
                        className={`list-container ${showList ? "show" : ""}`}
                      >
                        <ul>
                          <Link to={"/admin"}> 
                            <li>
                                  User
                         </li>
                          </Link>
                      
                        
                          <li>
                            <Link to={"/admin"}>dashbord</Link>
                          </li>
                          {isAuthenticated ? (
                            <li>
                              <a href="" onClick={handilLogout}>
                                logout
                              </a>
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </div>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>
      </Container>
 
  );
}

export default Header;

import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import "./register.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {  Link, useNavigate } from "react-router-dom";
function Registretion () {
  const [validated, setValidated] = useState(false);

 const [fullname,setfullname] = useState('')
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const handleFullname = (e) => {
    setfullname(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        try {
            const res = await axios.post('http://localhost:4000/register', {
                fullname,
                email,
                password
            });
      if(res.data.success){
       toast.success(res.data.message)
       await new Promise((resolve) => setTimeout(resolve, 2000));
       navigate('/login')
      }else{
     
      }
          } catch (error) {
            console.error('Error while sending data:', error);
          }
    }
  
    setValidated(true);
  };

  

  return (
    <div>
          <ToastContainer
          autoClose={1000}
          theme="dark"
           />
      <Container  
        fluid
        className="d-flex align-items-center justify-content-center  gap-5"
        style={{ height: "100vh", backgroundColor: "#D4D4D4" }}
      >  
        <Row className="formRow" style={{ width: "400px" }}>
    
          <div className="form-section">
            <h2>Sign Up</h2>
            <Form
              className="form"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Form.Group controlId="validationCustom01">
                <Form.Label>Fullname</Form.Label>
                <Form.Control
                  className="from-controler"
               
                  onChange={handleFullname}
                  required
                  type="text"
                  placeholder="Fullname"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="from-controler"
             
                  onChange={handleEmail}
                  required
                  type="email"
                  placeholder="Email"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="from-controler"
                
                  onChange={handlePassword}
                  required
                  type="Password"
                  placeholder="Password"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
             
               
              <Button type="submit" className="formSubmit">Register</Button>
              
            </Form>
            <div className="toLogin">
            <p>Already have an account?</p>
            <Link to={"/login"} eventKey="2" title="Item">
                 Login
                    </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Registretion;

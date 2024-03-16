import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import "../register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { authUserSuccess } from "../../../Redux/userAuth";

function Login() {
  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      try {
        const res = await axios.post(
          "http://localhost:4000/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast(res.data.message);
          if (res.data.isAuthenticated) {
            dispatch(
              authUserSuccess({
                user: res.data.user,
                isAuthenticated: res.data.isAuthenticated,
              })
            );
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));

          navigate("/");
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
      <Container
        fluid
        className="d-flex align-items-center justify-content-center  gap-5"
        style={{ height: "100vh", backgroundColor: "#919191" }}
      >
        <ToastContainer />
        <Row className="formRow" style={{ width: "400px" }}>
          <div className="form-section">
            <h2>Login</h2>
            <Form
              className="form"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Form.Group controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="from-controler"
                  onChange={handleEmail}
                  required
                  type="email"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="from-controler"
                  onChange={handlePassword}
                  required
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Button type="submit" className="formSubmit">
                Login
              </Button>
            </Form>
            <div className="toLogin">
              <p>You don't have an account</p>

              <Link to={"/register"} eventKey="2" title="Item">
                Signup
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Login;

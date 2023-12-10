import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/auth/authSlice";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let { name, email, password } = formData;
  const { isAuthenticated, userLoading, isRegister } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const redirect = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isRegister) {
    redirect("/login");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <>
      {userLoading ? (
        <Spinner animation="border" />
      ) : isAuthenticated ? (
        <Navigate to="/books" />
      ) : (
        <Container>
          <Row>
            <Col>
              <h2>Register</h2>
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Your Name"
                    onChange={changeHandler}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email Address"
                    onChange={changeHandler}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={changeHandler}
                  />
                </Form.Group>
                <p>
                  Already register? <NavLink to="/login">login here</NavLink>
                </p>
                <Button type="submit">Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Register;

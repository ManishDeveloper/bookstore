import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/authSlice";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { NavLink, Navigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  let { email, password } = formData;
  const { isAuthenticated, userLoading, loginLoading, isError } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
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
              <h2>Login</h2>
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
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
                  No register? <NavLink to="/register">register here</NavLink>
                </p>
                <Button type="submit" className="mb-3">
                  {loginLoading ? "Wait..." : "Submit"}
                </Button>
                {isError && <Alert variant="danger">{isError}</Alert>}
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Login;

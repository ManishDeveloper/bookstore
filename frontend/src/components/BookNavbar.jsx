import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/authSlice";
import { NavLink } from "react-router-dom";

const BookNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-dark">
      <Container fluid>
        <NavLink to="/books">
          <Navbar.Brand>Book Store</Navbar.Brand>
        </NavLink>
        <Nav className="ml-auto">
          <Navbar.Text>WELCOME {user.name.toUpperCase()}</Navbar.Text>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={logoutHandler}>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default BookNavbar;

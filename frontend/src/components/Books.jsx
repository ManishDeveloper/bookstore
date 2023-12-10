import { Container, Row, Col, Table, Alert, Button } from "react-bootstrap";
import BookNavbar from "./BookNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadBooks } from "../redux/books/bookSlice";
import { NavLink } from "react-router-dom";

const Books = () => {
  const { bookList } = useSelector((state) => state.book);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBooks());
  }, [dispatch]);
  return (
    <>
      <BookNavbar />
      <Container className="mt-5">
        <Row>
          <Col>
            {bookList.length > 0 ? (
              <>
                <NavLink to="/addbook">
                  <Button>Add Book</Button>
                </NavLink>
                <Table className="mt-3" striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookList.map((book, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>Edit</td>
                        <td>Delete</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <Alert variant="warning">
                No Books available! <NavLink to="/addbook">Add Book</NavLink>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Books;

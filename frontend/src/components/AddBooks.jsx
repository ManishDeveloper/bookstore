import { Col, Container, Row, Form, Button } from "react-bootstrap";
import BookNavbar from "./BookNavbar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { newBook } from "../redux/books/bookSlice";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const [formData, setFormData] = useState({ title: "", author: "" });
  let { title, author } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(newBook(formData)).then(() => navigate("/books"));
  };

  return (
    <>
      <BookNavbar />
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Add Book</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  placeholder="Title"
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={author}
                  placeholder="Author"
                  onChange={changeHandler}
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddBooks;

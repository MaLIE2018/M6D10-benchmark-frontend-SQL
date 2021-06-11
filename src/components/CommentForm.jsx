import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import CommentSection from "./CommentSection";
class CommentForm extends React.Component {
  state = {
    review: {
      comment: "",
      rate: "",
    },
    update: false,
  };

  handleChange = (e) => {
    let id = e.target.id;
    this.setState((state) => {
      return {
        review: {
          ...state.review,
          [id]: e.target.value,
        },
      };
    });
  };

  handleUpdate = () => {
    this.setState({ update: false });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    try {
      const response = await fetch(
        `http://localhost:3001/reviews/${this.props.productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.review),
        }
      );
      if (!response.ok) throw new Error(response.message);
      this.setState({ update: true, review: { comment: "", rate: 1 } });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              id='rate'
              as='select'
              value={this.state.rate}
              onChange={this.handleChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              id='comment'
              value={this.state.comment}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant='warning' className='mt-3' type='submit'>
            Add review
          </Button>
        </Form>
        <h5 className='my-5'>Comments from other users</h5>
        <CommentSection
          productId={this.props.productId}
          update={this.state.update}
          onUpdate={this.handleUpdate}
        />
      </Container>
    );
  }
}

export default CommentForm;

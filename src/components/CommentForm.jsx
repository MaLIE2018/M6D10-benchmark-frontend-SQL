import React from "react"
import { Form, Container, Row, Col, Button } from "react-bootstrap"

class CommentForm extends React.Component {
  state = {
    comment: "",
    rate: "",
  }

  handleChange = (e) => {
    let id = e.target.id
    this.setState({ [id]: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state)
    try {
      const response = await fetch(
        `http://localhost:3001/products/${this.props.productId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state),
        }
      )
      if (response.ok) {
        const data = await response.json()
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              id="rate"
              as="select"
              value={this.state.rate}
              onChange={this.handleChange}
            >
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
              as="textarea"
              rows={3}
              id="comment"
              value={this.state.comment}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="warning" className="mt-3" type="submit">
            Add review
          </Button>
        </Form>
      </Container>
    )
  }
}

export default CommentForm

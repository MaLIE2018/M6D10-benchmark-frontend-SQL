import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Accordion,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.CollapseAccordionRef = React.createRef();
    this.state = {
      comments: [],
      api: process.env.REACT_APP_BE_URL,
      update: false,
      review: {
        comment: "",
        rate: "",
      },
    };
  }

  componentDidMount = async () => {
    try {
      let response = await fetch(
        `http://localhost:3001/reviews/${this.props.productId}`
      );
      if (response.ok) {
        let data = await response.json();
        console.log("data:", data);
        this.setState({ comments: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.update !== this.props.update) {
      try {
        let response = await fetch(
          `http://localhost:3001/reviews/${this.props.productId}`
        );
        if (response.ok) {
          let data = await response.json();
          console.log("data:", data);
          this.setState({ comments: data });
          this.props.onUpdate();
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (prevState.update !== this.state.update) {
      try {
        let response = await fetch(
          `http://localhost:3001/reviews/${this.props.productId}`
        );
        if (response.ok) {
          let data = await response.json();
          this.setState({ comments: data });
          this.setState({ update: false });
        }
      } catch (error) {
        console.log(error);
      }
    }
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

  render() {
    const api = process.env.REACT_APP_BE_URL;
    return (
      <Container>
        {this.state.comments.map((c) => {
          return (
            <Row key={c.id} className='mt-2'>
              <Col xs={1}>
                <img
                  className='img-fluid'
                  src='https://place-hold.it/100x100'
                  alt=''
                />
              </Col>
              <Col xs={9}>
                <h6>UserX</h6>
                <b>{c.rate}/5</b>
                <p className='side-text'>{c.comment}</p>
              </Col>
              <Col xs={1}>
                <Button
                  className='btn btn-secondary'
                  onClick={async () => {
                    await fetch(this.state.api + `/reviews/${c.id}`, {
                      method: "DELETE",
                    });
                    this.setState({ update: true });
                  }}>
                  Del
                </Button>
              </Col>
              <Accordion className='d-inline' ref={this.CollapseAccordionRef}>
                <Col xs={1}>
                  <Accordion.Toggle
                    as={Button}
                    variant='warning'
                    eventKey='0'
                    onClick={() =>
                      this.setState({
                        review: { comment: c.comment, rate: c.rate },
                      })
                    }>
                    Edit
                  </Accordion.Toggle>
                </Col>
                <Col>
                  <Accordion.Collapse eventKey='0'>
                    <Form>
                      <Form.Group className='mb-3' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <FormControl
                          as='textarea'
                          aria-label='With textarea'
                          onChange={this.handleChange}
                          value={this.state.review.comment}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='rate'>
                        <Form.Group>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            id='rate'
                            as='select'
                            onChange={this.handleChange}
                            value={this.state.review.rate}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Control>
                        </Form.Group>
                      </Form.Group>
                      <Button
                        onClick={async () => {
                          const res = await fetch(api + `/reviews/${c.id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(this.state.review),
                          });
                          if (res.ok) this.setState({ update: true });
                        }}>
                        Update
                      </Button>
                    </Form>
                  </Accordion.Collapse>
                </Col>
              </Accordion>
            </Row>
          );
        })}
      </Container>
    );
  }
}

export default CommentSection;

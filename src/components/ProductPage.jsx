import React from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import CommentSection from "./CommentSection"
import CommentForm from "./CommentForm"

class ListItem extends React.Component {
  state = {
    product: {},
  }

  componentDidMount = async () => {
    try {
      let response = await fetch(
        `http://localhost:3001/products/${this.props.match.params.id}`
      )

      if (response.ok) {
        let data = await response.json()
        this.setState({ product: data })
        console.log(this.state.product)
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col xs={10}>
            <Row>
              <Col xs={3}>
                <img
                  className="img-fluid"
                  src={this.state.product.imageUrl}
                  alt=""
                />
                <div
                  className="mt-4 pointer"
                  onClick={() =>
                    this.props.history.push(
                      `/editProduct/${this.state.product._id}`
                    )
                  }
                >
                  Edit Item
                </div>
              </Col>
              <Col xs={7}>
                <h5>{this.state.product.name}</h5>
                <p className="side-text no-mb">
                  From: <b>{this.state.product.brand}</b>
                </p>
                <p className="side-text">
                  Category: {this.state.product.category}
                </p>
                <p>{this.state.product.description}</p>
                <h4>€ {this.state.product.price}</h4>
              </Col>
            </Row>
            <div className="mt-5">
              <CommentForm productId={this.props.match.params.id} />
              <h5 className="my-5">Comments from other users</h5>
              <CommentSection productId={this.props.match.params.id} />
            </div>
          </Col>
          <Col xs={2}>
            <Card>
              <Card.Body>
                <Card.Title>€ {this.state.product.price}</Card.Title>
                <Card.Text className="side-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <p>
                  Arrives: <b>Thursday, June 10</b>
                </p>
                <h6 className="text-success my-4 ">In stock</h6>
                <Button
                  variant="warning"
                  style={{ width: "8rem" }}
                  className="my-2"
                >
                  Add to Cart
                </Button>
                <Button variant="secondary" style={{ width: "8rem" }}>
                  Buy now
                </Button>
                <p className="mt-5 side-text">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Alias totam pariatur magnam a cupiditate nihil eaque fugiat
                  possimus optio distinctio et maiores, iusto, voluptates
                  assumenda deleniti atque? Officiis, autem voluptate.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ListItem

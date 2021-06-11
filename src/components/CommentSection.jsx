import React from "react"
import { Container, Row, Col } from "react-bootstrap"

class CommentSection extends React.Component {
  state = {
    comments: [],
  }

  componentDidMount = async () => {
    try {
      console.log("propsId", this.props.productId)
      let response = await fetch(
        `http://localhost:3001/products/${this.props.productId}/comments`
      )
      if (response.ok) {
        let data = await response.json()
        this.setState({ comments: data })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Container>
        {this.state.comments.map((c) => {
          return (
            <Row key={c._id}>
              <Col xs={1}>
                <img
                  className="img-fluid"
                  src="https://place-hold.it/100x100"
                  alt=""
                />
              </Col>
              <Col xs={9}>
                <h6>UserX</h6>
                <b>{c.rate}/5</b>
                <p className="side-text">{c.comment}</p>
              </Col>
            </Row>
          )
        })}
      </Container>
    )
  }
}

export default CommentSection

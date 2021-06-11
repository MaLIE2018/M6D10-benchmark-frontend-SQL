import React from "react"
import { Container, Row, Col } from "react-bootstrap"

class ListItem extends React.Component {
  state = {
    query: "",
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={2}>
            <img
              className="img-fluid"
              src="https://m.media-amazon.com/images/I/81afsli5ctL._AC_UY218_.jpg"
              alt=""
            />
          </Col>
          <Col xs={10}>
            <h5>grpisrhgèsroih</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
              veniam nemo magnam atque! Quidem eos excepturi laboriosam quae et
              molestias repellat dolore magni voluptate eaque ea, cupiditate
              blanditiis earum consectetur!
            </p>
            <h4>€ 299.99</h4>
          </Col>
          <hr className="my-3"></hr>
        </Row>
      </Container>
    )
  }
}

export default ListItem

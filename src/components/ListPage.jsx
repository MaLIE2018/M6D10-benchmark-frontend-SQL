import React from "react"
import { Container, Row, Col, Pagination } from "react-bootstrap"
import { Link, withRouter } from "react-router-dom"
import SideFilter from "./SideFilter"
class ListPage extends React.Component {
  render() {
    const count = this.props.products.length
    const items = []
    let active = 2

    for (let number = 1; number <= count / 6; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          as={Link}
          to="/products/"
        >
          {number}
        </Pagination.Item>
      )
    }

    return (
      <Container className="mt-4">
        <Row>
          <Col xs={2}>
            <SideFilter products={this.props.products} />
          </Col>

          <Col xs={10}>
            {this.props.products.map((p) => {
              return (
                <Container
                  key={p._id}
                  className="pointer"
                  onClick={() => this.props.history.push(`/product/${p._id}`)}
                >
                  <Row>
                    <Col xs={2}>
                      <img className="img-fluid" src={p.imageUrl} alt="" />
                    </Col>
                    <Col xs={10}>
                      <h5>{p.name}</h5>
                      <p>{p.description}</p>
                      <h4>{p.price}</h4>
                    </Col>
                    <hr className="my-3"></hr>
                  </Row>
                  <hr></hr>
                </Container>
              )
            })}
          </Col>
        </Row>
        <Pagination>{items}</Pagination>
      </Container>
    )
  }
}

export default withRouter(ListPage)

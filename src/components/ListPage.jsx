import React from "react";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import SideFilter from "./SideFilter";
class ListPage extends React.Component {
  state = {
    active: 1,
  };
  render() {
    const items = [];

    for (let number = 1; number <= Math.ceil(this.props.total / 4); number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === this.state.active}
          as={Link}
          onClick={() => {
            this.setState({ active: number });
            this.props.onOffsetChange(number);
          }}>
          {number}
        </Pagination.Item>
      );
    }
    if (this.props.products) {
      return (
        <Container className='mt-4'>
          <Row>
            <Col xs={2}>
              <SideFilter filters={this.props.filters} />
            </Col>

            <Col xs={10}>
              {this.props.products.map((p) => {
                return (
                  <Container
                    key={p._id}
                    className='pointer'
                    onClick={() => this.props.history.push(`/product/${p.id}`)}>
                    <Row>
                      <Col xs={2}>
                        <img className='img-fluid' src={p.imageUrl} alt='' />
                      </Col>
                      <Col xs={10}>
                        <h5>{p.name}</h5>
                        <p>{p.description}</p>
                        <h4>{p.price}</h4>
                      </Col>
                      <hr className='my-3'></hr>
                    </Row>
                    <hr></hr>
                  </Container>
                );
              })}
            </Col>
          </Row>
          <Row className='d-flex justify-content-center'>
            <Pagination>{items}</Pagination>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container className='mt-4'>
          <Row>
            <Col xs={10}>Loading....</Col>
          </Row>
        </Container>
      );
    }
  }
}

export default withRouter(ListPage);

import React from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import "../PostForm.css";

class ProductForm extends React.Component {
  state = {
    product: {},
    image: null,
    api: process.env.REACT_APP_BE_URL,
  };

  handlePost = async (e) => {
    console.log("submitting");
    e.preventDefault();
    const endpoint = `http://localhost:3001/products`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.product),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const productId = data.id;
        if (this.state.image) {
          const imageRes = await fetch(
            `http://localhost:3001/products/${productId}/upload`,
            {
              method: "POST",
              body: this.state.image,
            }
          );
          if (imageRes.ok) {
            const imgData = await imageRes.json();
            console.log(imgData);
          }
        }
        this.props.history.push("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handlePut = async (e) => {
    console.log("putting");
    e.preventDefault();
    const endpoint = `http://localhost:3001/products/${this.props.match.params.id}`;
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.product),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (this.state.image) {
          const imageRes = await fetch(
            `http://localhost:3001/products/${this.props.match.params.id}/imageupload`,
            {
              method: "POST",
              body: this.state.image,
            }
          );
          if (imageRes.ok) {
            const imgData = await imageRes.json();
          }
        }
        this.props.history.push("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = async () => {
    const endpoint = `http://localhost:3001/products/${this.props.match.params.id}`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (e) => {
    const id = e.target.id;
    id === "price"
      ? this.setState({
          product: { ...this.state.product, [id]: parseInt(e.target.value) },
        })
      : this.setState({
          product: { ...this.state.product, [id]: e.target.value },
        });
  };

  selectImage = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    this.setState({ image: formData });
  };

  componentDidMount = async () => {
    if (this.props.action === "PUT") {
      try {
        let response = await fetch(
          `http://localhost:3001/products/${this.props.match.params.id}`
        );

        if (response.ok) {
          let data = await response.json();
          this.setState({ product: data });
          console.log(this.state.product);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    return (
      <Container className='pad-top'>
        <Row>
          <Col xs={{ offset: 3, span: 6 }}>
            <Form>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type='text'
                  id='name'
                  placeholder="insert your product's name..."
                  value={this.state.product.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as='textarea'
                  id='description'
                  rows={3}
                  value={this.state.product.description}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Product Brand</Form.Label>
                <Form.Control
                  type='text'
                  id='brand'
                  placeholder="insert your product's brand..."
                  value={this.state.product.brand}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <div className='my-2'>
                <p className='mb-1'>Product Cover Image</p>
                <Form.Group>
                  <Form.File
                    id='exampleFormControlFile1'
                    onChange={this.selectImage}
                  />
                </Form.Group>
              </div>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  id='price'
                  placeholder='insert your price in €...'
                  value={this.state.product.price}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  id='category'
                  placeholder="insert your product's category..."
                  value={this.state.product.category}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <hr />
              {this.props.formType === "add" && (
                <Button
                  variant='warning'
                  type='button'
                  onClick={this.handlePost}>
                  Add Product
                </Button>
              )}
              {this.props.formType === "edit" && (
                <div className='d-flex justify-content-between'>
                  <Button
                    variant='warning'
                    type='button'
                    onClick={this.handlePut}>
                    Edit Product
                  </Button>
                  <Button
                    variant='secondary'
                    type='button'
                    onClick={this.handleDelete}>
                    Delete Product
                  </Button>
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ProductForm);

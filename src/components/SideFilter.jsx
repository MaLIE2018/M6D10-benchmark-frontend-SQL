import { FormGroup } from "@material-ui/core";
import { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

class SideFilter extends Component {
  state = {
    brand: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    uniqueBrands: [],
    uniqueCategories: [],
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  filterSubmit = (e) => {
    e.preventDefault();
    let query = [];
    // this.setState((state) => {
    //   return {
    //     ...state,
    //     brand: "",
    //     category: "",
    //     minPrice: "",
    //     maxPrice: "",
    //   };
    // });
    let priceF = "";
    let brandF = "";
    let catF = "";
    //?brand=fdfsdf&category=books&price<3&price>10
    if (this.state.brand) {
      brandF += `brand=${this.state.brand}`;
      query.push(brandF);
    }
    if (this.state.category) {
      catF += `category=${this.state.category}`;
      query.push(catF);
    }
    if (this.state.minPrice && this.state.maxPrice) {
      priceF += `price<${this.state.maxPrice}&price>${this.state.minPrice}`;
      query.push(priceF);
    }
    const queryString = query.join("&");
    this.props.history.push(this.props.match.path + `products?${queryString}`);
  };

  componentDidUpdate(prevProps, preState) {
    if (prevProps.products !== this.props.products) {
      const products = this.props.products;

      let brands = [];
      let categories = [];

      products.forEach((elem) => {
        brands.push(elem.brand);
        categories.push(elem.category);
      });
      console.log(brands, categories);

      let uniqueSetBrands = new Set(brands);
      let uniqueBrands = [...uniqueSetBrands];
      this.setState({
        uniqueBrands,
      });

      let uniqueSetCategories = new Set(categories);
      let uniqueCategories = [...uniqueSetCategories];
      this.setState({
        uniqueCategories,
      });
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={(e) => this.filterSubmit(e)}>
          <Form.Group className='mt-3'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              size='sm'
              as='select'
              id='category'
              value={this.state.category}
              onChange={(e) => this.handleChange(e)}>
              <option></option>
              {this.state.uniqueCategories.map((elem) => {
                return <option>{elem}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group className='mt-3'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              size='sm'
              as='select'
              id='brand'
              value={this.state.brand}
              onChange={(e) => this.handleChange(e)}>
              <option></option>
              {this.state.uniqueBrands.map((elem) => {
                return <option>{elem}</option>;
              })}
            </Form.Control>
          </Form.Group>

          <Form.Label>Price:</Form.Label>
          <div className='price-container'>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='from'
                size='sm'
                id='minPrice'
                value={this.state.minPrice}
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='to'
                size='sm'
                id='maxPrice'
                value={this.state.maxPrice}
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
          </div>

          <Button variant='primary' type='submit' className='filter-Button'>
            Filter
          </Button>
          <Button
            variant='primary'
            type='button'
            className='filter-Button'
            onClick={() => this.props.history.push("/")}>
            ClearFilter
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(SideFilter);

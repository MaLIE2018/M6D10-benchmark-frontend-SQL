import React,{useState,useEffect} from "react"
import "./App.css"
import {Route, withRouter } from "react-router-dom"
import ProductForm from "./components/ProductForm"
import Header from "./components/Header"
import ProductPage from "./components/ProductPage"
import ListPage from "./components/ListPage"


const App = (props) => {
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState("")
  const [offset, setOffset] = useState(0)
  const [filters, setFilter] = useState([])

  useEffect(() => {
    const get =  async() =>{
      try {
         const api = process.env.REACT_APP_BE_URL
         const res = await fetch(api + `/products?skip=${offset}&limit=4${props.location.search?`&${props.location.search.slice(1)}`:''}`)
         if(!res.ok) throw new Error("ProductFetch failed")
         let data = await res.json()
         setProducts(data.products)
         setTotal(data.total)
         setFilter([data.brands, data.categories])
      } catch (error) {
         console.log(error)
      }
    }
    get()
  },[query,offset, props])


  return (
  <>
      <Header onQueryChange={(query) => setQuery(query)} searchWord={query}/>
      <Route path="/products" render={(state)=> <ListPage products={products} total={total} onOffsetChange={setOffset} filters={filters}/>} />
      <Route path="/product/:id" component={ProductPage} />
      <Route
        path="/addProduct"
        exact
        render={(props) => (
          <ProductForm formType="add" action="POST" {...props} />
        )}
      />
      <Route
        path="/editProduct/:id"
        exact
        render={(props) => (
          <ProductForm formType="edit" action="PUT" {...props} />
        )}
      />
   </>
  )
}

export default withRouter(App)

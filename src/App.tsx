import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Products, ProductsSliceI, saveProduct } from './Redux/Reducers/ProductsReducers';
import axios from 'axios';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import _ from 'lodash';

function App() {
  const products = useSelector<ProductsSliceI>(
    ({ ProductsSlice }) => ProductsSlice.products
  )

  const dispatch = useDispatch()

  const getProducts = async () => {
    try {
      const results = await axios.get('https://5d6da1df777f670014036125.mockapi.io/api/v1/product')
      const Products: Array<Products> = results.data
      dispatch(saveProduct(Products))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const publicRoutes = [
    { path: "/", component: () => <>Oi</> }
  ]

  if (_.isEmpty(products)) return <>loading</>

  return (
    <Router>
      <Switch>
        {publicRoutes.map(({ path, component }) => {
          return <Route path={path} exact component={component} />
        })}
      </Switch>
    </Router>
  );
}

export default App;

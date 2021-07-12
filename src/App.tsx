import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Products, ProductsSliceI, saveProduct } from './Redux/Reducers/ProductsReducers';
import axios from 'axios';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import _ from 'lodash';
import { Home } from './pages/home/home';
import { Spin } from 'antd';
import { NavBar } from './components/navBar';
import { Cart } from './pages/cart/cart';
import { saveCart } from './Redux/Reducers/CartReducer';

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

  const getCart = () => {
    const cart: string = localStorage.getItem('myCart') ?? "[]"
    dispatch(saveCart(cart))
  }

  useEffect(() => {
    getProducts()
    getCart()
  }, [])


  const publicRoutes = [
    { path: "/", component: () => <Home /> },
    { path: "/cart", component: () => <Cart /> }
  ]

  if (_.isEmpty(products)) return <div className="loading-page"><Spin size="large" /></div>

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        <NavBar />
        <Switch>
          {publicRoutes.map(({ path, component }, index) => {
            return <Route key={"route" + index} path={path} exact component={component} />
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Products, ProductsSliceI, saveProduct } from './Redux/Reducers/ProductsReducers';
import axios from 'axios';
import { useEffect } from 'react';

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

  console.log('bubu', products)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

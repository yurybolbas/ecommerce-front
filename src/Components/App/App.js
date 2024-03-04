import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Box from '@mui/material/Box';
import Footer from './../Footer/Footer';
import Header from './../Header/Header';
import Categories from '../Categories/Categories';
import Category from '../Category/Category';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import Checkout from '../Checkout/Checkout';
import OrderConfirmation from '../OrderConfirmation/OrderConfirmation';

function App() {
  return (
	<Box maxWidth="100%" className="App">
		<Header />
		<Routes>
			<Route path='/' element={<Categories />} />
			<Route path='/category/:id' element={<Category />} />
			<Route path='/product/:id' element={<Product />} />
			<Route path='/cart' element={<Cart />} />
			<Route path='/checkout' element={<Checkout />} />
			<Route path='/orderconfirmation' element={<OrderConfirmation />} />
		</Routes>
		<Footer />
	</Box>
  );
}

export default App;

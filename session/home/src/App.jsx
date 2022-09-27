import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import Header from './components/Header';
import AllProduct from './Containers/AllProduct';
import ProductPreview from './Containers/ViewProduct';
import Cart from 'cart/primaryCart';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Checkout from 'checkout/checkout';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Router>
    <Header />
    <ToastContainer />
    <Switch>
      <Route exact path="/">
        <AllProduct />
      </Route>
      <Route path="/product/:id">
        <ProductPreview />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/checkout">
        <Checkout />
      </Route>
    </Switch>
  </Router>
);
ReactDOM.render(<App />, document.getElementById('app'));

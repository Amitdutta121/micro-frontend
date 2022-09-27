import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "remixicon/fonts/remixicon.css";
import "../index.scss";

import Header from "home/Header";
import Footer from "home/Footer";
import PDPContent from "pdp/PDPContent";
import HomeContent from "home/HomeContent";
import CartContent from "cart/CartContent";
import CheckoutContent from "checkout/CheckoutContent";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout() {
  return (
    <Router>
        <Header />
          <Switch>
            <Route exact path="/" component={HomeContent} />
            <Route path="/checkout" component={CheckoutContent} />
            <Route path="/product/:id" component={PDPContent} />
            <Route path="/cart" component={CartContent} />
          </Switch>
        <Footer />
      <ToastContainer />
    </Router>
  );
}

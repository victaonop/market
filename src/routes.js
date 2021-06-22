import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";
import purchaseHistory from "./pages/PurchaseHistory";

// import { Container } from './styles';

function Routes() {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={Cart} path="/cart" />
      <Route component={purchaseHistory} path="/history" />
      <Route component={Settings} path="/settings" />
    </BrowserRouter>
  );
}

export default Routes;

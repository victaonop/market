import React from "react";
import { Route, BrowserRouter, HashRouter  } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";
import purchaseHistory from "./pages/PurchaseHistory";

// import { Container } from './styles';

function Routes() {
  return (
    <HashRouter>
      <Route component={Home} path="/" exact />
      <Route component={Cart} path="/cart" />
      <Route component={purchaseHistory} path="/history" />
      <Route component={Settings} path="/settings" />
    </HashRouter>
  );
}

export default Routes;

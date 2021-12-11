import React from "react";
import { Switch } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import AdPage from "./pages/AdPage";
import AddAd from "./pages/AddAd";
import Ads from "./pages/Ads";
import MyAcc from "./pages/MyAcc2";

import RouteHandle from './components/ComponentRoute'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <Switch>
      <RouteHandle component={Home} exact path="/">
        {/* <Home /> */}
      </RouteHandle>
      <RouteHandle exact path="/sobre">
        <About />
      </RouteHandle>
      <RouteHandle exact path="/signin">
        <Signin />
      </RouteHandle>
      <RouteHandle exact path="/signup">
        <Signup />
      </RouteHandle>
      <RouteHandle exact path="/ad/:id">
        <AdPage />
      </RouteHandle>
      <RouteHandle private exact path="/post-an-ad">
        <AddAd />
      </RouteHandle>
      <RouteHandle exact path="/ads">
        <Ads />
      </RouteHandle>
      <RouteHandle private exact path="/my-account">
        <MyAcc />
      </RouteHandle>
      <RouteHandle>
        <NotFound></NotFound>
      </RouteHandle>
    </Switch>
  );
};

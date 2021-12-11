import { React } from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import { Template } from "./components/MainComponent";
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";

import "./App.css";

const App = (props) => {
  return (
    <BrowserRouter>
      <Template>
        <Header></Header>
        <Routes />
        <Footer></Footer>
      </Template>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

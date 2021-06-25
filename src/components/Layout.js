import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import {Container,Row,Col} from "react-bootstrap"

const Layout = () => {
  return (
    <>
      <Header />
      {this.props.children}
      <Footer />
    </>
  )
}
export default Layout;

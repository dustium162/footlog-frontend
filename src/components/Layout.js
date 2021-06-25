import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import {Container,Row,Col} from "react-bootstrap"

export default class Layout extends React.Component {
  constructor() {
    super();
    // this.name = "Tsutomu";
  }
  render() {
    return (
      <>
        <Header />
        {this.props.children}
        <Footer />
      </>
    );
  }
} 

// const Layout = () => {
//   return (
//     <>
//       <Header />
//       {this.props.children}
//       <Footer />
//     </>
//   )
// }
// export default Layout;

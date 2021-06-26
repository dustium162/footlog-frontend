import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </ div>
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

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
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

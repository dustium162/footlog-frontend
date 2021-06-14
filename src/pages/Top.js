import React from 'react';
import Layout from "../components/Layout";

import Introduce from "../components/Introduce"

export default class Home extends React.Component {
  render() {
    return (
      <Layout>
        <Introduce />
      </Layout>
    );
  }
}
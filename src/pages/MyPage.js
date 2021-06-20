import React from 'react';
import Layout from "../components/Layout";

import UserInfo from '../components/UserInfo'
import UserTabs from '../components/UserTabs'

import {Row} from 'react-bootstrap'

export default class MyPage extends React.Component {
  render() {
    return (
      <Layout>
        <Row><UserInfo /></Row>
        <Row><UserTabs /></Row>
      </Layout>
    );
  }
}
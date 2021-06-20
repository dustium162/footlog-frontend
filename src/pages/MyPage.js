import React from 'react';
import Layout from "../components/Layout";

import UserInfo from '../components/UserInfo'
import UserTabs from '../components/UserTabs'

export default class MyPage extends React.Component {
  render() {
    return (
      <Layout>
        <UserInfo />
        <UserTabs />
      </Layout>
    );
  }
}
import React from 'react';

import {Image,Container} from "react-bootstrap"
import Layout from "../components/Layout";

import UserInfo from '../components/UserInfo'
import SupportInfo from "../components/SupportInfo"
import UserTabs from '../components/UserTabs'

import {Row} from 'react-bootstrap'

const MyPage = () => {
  return (
    <Layout>
      <Row><UserInfo /></Row>
      <Row><SupportInfo /></Row>
      <Row><UserTabs /></Row>
    </Layout>
  )
}
export default MyPage;

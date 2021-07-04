import React from 'react';
import Layout from "../../components/Layout";
// import {Row} from "react-bootstrap"

import {Container,Nav} from "react-bootstrap"

import { LinkContainer } from 'react-router-bootstrap';

const AdminMain = () => {
  return (
    <Layout>
      <Container>
        <LinkContainer to="/admin/add_match">
          <Nav.Link>試合情報の追加</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_team">
          <Nav.Link>チーム情報の追加</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_stadium">
          <Nav.Link>スタジアム情報の追加</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_information">
          <Nav.Link>お知らせの追加</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_term">
          <Nav.Link>規約情報の追加</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_privacy">
          <Nav.Link>プライバシーポリシーの追加</Nav.Link>
        </LinkContainer>
      </Container>
    </Layout>
  )
}
export default AdminMain;

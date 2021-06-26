import React from 'react';
import Layout from "../../components/Layout";
import {Row} from "react-bootstrap"

import {Container,Nav} from "react-bootstrap"

import { LinkContainer } from 'react-router-bootstrap';

const AdminMain = () => {
  return (
    <Layout>
      <Container>
        <LinkContainer to="/admin/add_information">
          <Nav.Link>お知らせの追加</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_scraping">
          <Nav.Link>試合情報の追加(Scrapingモデル)</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_json">
          <Nav.Link>試合情報の追加(Jsonモデル)</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_team">
          <Nav.Link>チーム情報の追加</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_term">
          <Nav.Link>規約情報の追加</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_privacy">
          <Nav.Link>プライバシーポリシーの追加</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/manage_job">
          <Nav.Link>ジョブの管理</Nav.Link>
        </LinkContainer>
      </Container>
    </Layout>
  )
}
export default AdminMain;

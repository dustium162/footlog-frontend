import React from 'react';
import Layout from '../../components/Layout';
import { useHistory } from 'react-router-dom';
// import {Row} from 'react-bootstrap'

import {Container,Nav} from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap';

const AdminMain = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if(!(user && user.is_admin)) {
    history.push('/sign_in')
  }
  return (
    <Layout>
      <Container>
        <LinkContainer to="/admin/match/new">
          <Nav.Link>試合情報の新規作成</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/match/edit">
          <Nav.Link>試合情報の投稿</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_team">
          <Nav.Link>Teamの追加</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_club">
          <Nav.Link>Clubの追加</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/add_title">
          <Nav.Link>タイトル情報の追加</Nav.Link>
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
        <LinkContainer to="/admin/contacts">
          <Nav.Link>お問い合わせの確認</Nav.Link>
        </LinkContainer>
      </Container>
    </Layout>
  )
}
export default AdminMain;

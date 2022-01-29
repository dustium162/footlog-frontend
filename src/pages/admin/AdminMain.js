import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import {Container,Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AdminMain = () => {
  
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/matches/new`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    }).catch((error) => {
      if(error.response && error.response.status === 401){
        history.push('/sign-in');
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
      }
    })
  },[history])

  return (
    <Layout>
      <Container>
        {errorMessage ? <div className="my-3 text-danger">{errorMessage}</div> : <div></div>}
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

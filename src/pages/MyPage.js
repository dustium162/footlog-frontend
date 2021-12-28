import React from 'react';
import Layout from "../components/Layout";

import UserInfo from '../components/UserInfo'
import UserStats from '../components/UserStats'

import { Container } from 'react-bootstrap'
import PostsForm from '../components/PostsForm';

const MyPage = () => {
  // const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem('currentUser')).id
  return (
    <Layout>
      <UserInfo />
      <Container>
        <UserStats userId={userId}/>
        <div className="mt-5">
          <PostsForm />
        </div>
      </Container>
    </Layout>
  )
}
export default MyPage;

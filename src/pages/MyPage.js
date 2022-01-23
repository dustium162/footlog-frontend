import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Head from '../components/Head';
import Layout from '../components/Layout';
import UserInfo from '../components/UserInfo'
import UserStats from '../components/UserStats'
import { Container } from 'react-bootstrap'
import PostsForm from '../components/PostsForm';

const MyPage = () => {
  // const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem('currentUser')).id;
  const userName = JSON.parse(localStorage.getItem('currentUser')).name;
  return (
    <HelmetProvider>
      <Layout>
        <Head title={userName} />
        <UserInfo />
        <Container className="mb-5">
          <div className="mt-5">
            <UserStats userId={userId}/>
          </div>
          <div className="mt-5">
            <PostsForm />
          </div>
        </Container>
      </Layout>
    </HelmetProvider>
  )
}
export default MyPage;

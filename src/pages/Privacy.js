import React,{useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { HelmetProvider } from 'react-helmet-async';
import Head from '../components/Head';
import Layout from '../components/Layout';
import axios from 'axios'

const Privacy = () => {
  const [privacy,setPrivacy] = useState('')
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/privacies/edit`,
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    ).then(response => response.data).then(data => setPrivacy(data.text))
  },[])
  return (
    <HelmetProvider>
      <Layout>
        <Head title="プライバシーポリシー" />
        <Container>
          <div className="my-3">
            <h2 className="h3">プライバシーポリシー</h2>
            {
              privacy.split('\n').map((str, index) => (
                <React.Fragment key={index}>{str}<br /></React.Fragment>
              ))
            }
          </div>
        </Container>
      </Layout>
    </HelmetProvider>
  )
}
export default Privacy;

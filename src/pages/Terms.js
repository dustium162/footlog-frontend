import React,{useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import { HelmetProvider } from 'react-helmet-async';
import Head from '../components/Head';
import Layout from '../components/Layout';
import axios from 'axios'

const Terms = () => {

  const [term,setTerm] = useState('');

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/terms`).then((response) => {
      return response.data
    }).then((data) => {
      setTerm(data.text);
    })
  },[]);

  return (
    <HelmetProvider>
      <Layout>
        <Head title="利用規約" />
        <Container>
          <div className="my-3">
            <h2 className="h3">利用規約</h2>
            {
              term.split('\n').map((str, index) => (
                <React.Fragment key={index}>{str}<br /></React.Fragment>
              ))
            }
          </div>
        </Container>
      </Layout>
    </HelmetProvider>
  )
}

export default Terms;
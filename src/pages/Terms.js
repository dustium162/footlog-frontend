import React,{useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Layout from '../components/Layout';
import axios from 'axios'

const Terms = () => {
  const [term,setTerm] = useState('')
  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/terms/edit`,
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    )
    .then(response => response.data).then((data) => setTerm(data.text))
  },[])
  return (
    <Layout>
      <Container>
        <h2 className="h3">利用規約</h2>
        {
          term.split('\n').map((str, index) => (
            <React.Fragment key={index}>{str}<br /></React.Fragment>
          ))
        }
      </Container>
    </Layout>
  )
}
export default Terms;

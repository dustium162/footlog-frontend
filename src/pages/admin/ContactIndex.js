import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import axios from 'axios'
import { Container, Table } from 'react-bootstrap'

const ContactIndex = () => {

  const [messages,setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/contacts`,
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    ).then((response) => {
      if(response.status === 200){
        setMessages(response.data);
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
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
        <Table className="my-3" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>名前</th>
              <th>メールアドレス</th>
              <th>メッセージ</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((content, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{content.name}</td>
                <td>{content.email}</td>
                <td>{content.message}</td>
              </tr>
              )
            )}
          </tbody>
        </Table>
      </Container>
    </Layout>
  )
}
export default ContactIndex;
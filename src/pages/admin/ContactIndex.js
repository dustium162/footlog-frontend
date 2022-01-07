import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import axios from 'axios'
import { Container, Table } from 'react-bootstrap'

const ContactIndex = () => {
  const [messages,setMessages] = useState([]);
  const history = useHistory();

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/contacts`,
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    ).then(response => response.data).then((data) => {
      setMessages(data);
    }).catch((error) => {
      console.log(error);
      history.push('/sign_in');
    })
  },[history])

  return (
    <Layout>
      <Container>
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
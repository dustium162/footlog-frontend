import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Container, Row, Col} from 'react-bootstrap'
import MatchEdit from './MatchEdit';
import Layout from '../../components/Layout';

const UnpublishedPosts = () => {

  const [matches,setMatches] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/matches/publish`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    }).then( response => {
      setMatches(response.data);
    }).catch((error) => {
      history.push('/sign_in');
      console.log(error);
    })
  },[history])

  return (
    <Layout>
      <Container>
        <Row xs={1} md={2} className="g-2">
          {matches.map((match, index) => {
            return (
              <Col key={index}>
                <MatchEdit match={match}/>
              </Col>
              )
            })}
        </Row>
      </Container>
  </Layout>
  );
}

export default UnpublishedPosts;

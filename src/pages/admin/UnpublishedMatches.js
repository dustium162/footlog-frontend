import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Container, Row, Col} from 'react-bootstrap'
import MatchPublish from './MatchPublish';
import Layout from '../../components/Layout';
import {TransitionMotion,spring} from 'react-motion'

const PreEditedMatches = () => {

  const [matches,setMatches] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/matches`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      },
      params: {
        index_type: 'unpublished_index'
      }
    }).then( response => {
      setMatches(response.data);
    }).catch((error) => {
      history.push('/sign-in');
      console.log(error);
    })
  },[history])

  const willLeave = () => {
    return {height: spring(0,{stiffness:240,dumping:30})}
  }

  const filterMatches = (matchId) => {
    setMatches((matches.filter(match => match.id !== matchId)))
  }

  return (
    <Layout>
      <Container>
        <Row xs={1} md={1} className="g-2">
          <TransitionMotion
            willLeave={willLeave}
            styles={
              matches.map((match) => (
                {
                  key: String(match.id),
                  data: match,
                  style: {height: match.height}
                }
              ))
            }
          >
            {interpolatingStyles =>
              <>
              {interpolatingStyles.map(interpolatingStyle => {
                return (
                  <Col key={interpolatingStyle.key}>
                    <MatchPublish match={interpolatingStyle.data} filterMatches={filterMatches} height={interpolatingStyle.style.height}/>
                  </Col>
                )
              })}
              </>
            }
          </TransitionMotion>
        </Row>
      </Container>
  </Layout>
  );
}

export default PreEditedMatches;

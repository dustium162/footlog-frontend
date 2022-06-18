import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Container, Row, Col} from 'react-bootstrap'
import MatchEdit from './MatchEdit';
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
        index_type: 'pre_edited_index'
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
        <Row><Col>入力形式：選手名,時間;選手名,時間;選手名,時間（※ 末尾にセミコロンは入れないこと）</Col></Row>
        <Row><Col>オウンゴールの場合はオウンゴールと入力すること</Col></Row>
        <Row><Col>ロスタイムは例えば93分の得点の場合は90+3とする</Col></Row>
        <Row xs={1} md={1} className="g-2">
          <TransitionMotion
            willLeave={willLeave}
            styles={
              matches.map((match,id) => (
                {
                  key: String(match.id),
                  data: match,
                  style: {height: 600}
                }
              ))
            }
          >
            {interpolatingStyles =>
              <>
              {interpolatingStyles.map(interpolatingStyle => {
                return (
                  <Col key={interpolatingStyle.key}>
                    <MatchEdit match={interpolatingStyle.data} filterMatches={filterMatches} height={interpolatingStyle.style.height}/>
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

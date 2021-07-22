import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout";
import axios from "axios"
import {Row,Col} from "react-bootstrap"
import MatchInfo from "../components/MatchInfo"
const Posts = () => {
  const [matches,setMatches] = useState([])
  // const [loading,setLoading] = useState(false)
  useEffect(() => {
    axios.get("http://localhost:3000/v1/matches", {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    // apiのJsonの形式を検討する必要あり（2021-07-19 浦郷）
      .then(response => response.data.data )
      .then(data => { setMatches(data) })
    }
  ,[])
  return (
    <Layout>
      <div>Posts Page!</div>
      <Row xs={1} md={2} className="g-4">
        {Object.keys(matches).map(match_id => (
          <Col>
            <MatchInfo match={matches[match_id]} match_id={match_id}/>
          </Col>
        ))}
      </Row>
    </Layout>
  )
}
export default Posts;
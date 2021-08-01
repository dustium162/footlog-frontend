import React,{useState,useEffect} from 'react';

import InfiniteScroll from "react-infinite-scroller"

import Layout from "../components/Layout";
import axios from "axios"
import {Row,Col} from "react-bootstrap"
import MatchInfo from "../components/MatchInfo"
const Posts = () => {
  const [matches,setMatches] = useState([])
  // const [loading,setLoading] = useState(false)

  const [hasMore,setHasMore] = useState(true)

  const loadMore = async (page) => {

    const response = await axios(`http://localhost:3000/v1/matches?page=${page}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    });
    const data = response.data
    if (data.length < 1) {
      setHasMore(false);
      return;
    }
    setMatches([...matches,...data])
  }

  const loader = <div className="loader" key={0}>Loading ...</div>

  useEffect(() => {
    axios.get("http://localhost:3000/v1/matches", {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    // apiのJsonの形式を検討する必要あり（2021-07-19 浦郷）
      .then(response => response.data )
      .then(data => { setMatches(data); console.log(matches) })
    }
  ,[])
  return (
    <Layout>
        <Row xs={1} md={2} className="g-4">
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
          {matches.map(match => (
            <Col>
              <MatchInfo match={match}/>
            </Col>
          ))}
          {/* {Object.keys(matches).map(match_id => (
            <Col key={match_id}>
            <MatchInfo match={matches[match_id]} match_id={match_id}/>
            </Col>
          ))} */}
      </InfiniteScroll>
        </Row>
    </Layout>
  )
}
export default Posts;
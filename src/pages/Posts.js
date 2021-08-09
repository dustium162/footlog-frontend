import React,{useState,useEffect} from 'react';

import InfiniteScroll from "react-infinite-scroller"

import Layout from "../components/Layout";
import axios from "axios"
import {Row,Col,Spinner} from "react-bootstrap"
import MatchInfo from "../components/MatchInfo"
import PostGuideModal from "../components/PostGuideModal"
const Posts = () => {
  const [matches,setMatches] = useState([])
  // const [loading,setLoading] = useState(false)
  const [hasMore,setHasMore] = useState(true)

  const [modalShow, setModalShow] = useState(false);
  
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

  const loader =  <Spinner animation="border" variant="danger" />
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

  const removeCard = () => {

  }

  return (
    <Layout>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
        <Row xs={1} md={2} className="g-4 mx-0">
          {matches.map(match => (
            <Col key={match.id}>
              {match.id}
              <MatchInfo match={match} />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
      <PostGuideModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Layout>
  )
}
export default Posts;
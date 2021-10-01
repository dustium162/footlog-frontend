import React,{useState,useEffect} from 'react';

import InfiniteScroll from "react-infinite-scroller"

import Layout from "../components/Layout";
import axios from "axios"
import {Container, Spinner} from "react-bootstrap"
import MatchCard from "../components/MatchCard"
import PostGuideModal from "../components/PostGuideModal"

import {TransitionMotion,spring} from "react-motion"

const Posts = () => {
  const [matches,setMatches] = useState([])
  const [hasMore,setHasMore] = useState(true)

  const [modalShow, setModalShow] = useState(false)

  const loadMore = async (page) => {

    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/matches?page=${page}`, {
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
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/matches`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    // apiのJsonの形式を検討する必要あり（2021-07-19 浦郷）
    .then(response => response.data )
    .then(data => setMatches(data))
    }
  ,[])

  const willLeave = () => {
    return {height: spring(0)}
  }

  const onClickPost = (match_id) => {
    const arr = []
    matches.map(match => {
      if (match.match_id !== match_id) {
        arr.push(match)
      }
    })
    setMatches(arr)
  }

  return (
    <Layout>
      <Container>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader}>
          <TransitionMotion
            styles={
              matches.map((match,id) => (
                {key: match.match_id, data:{...match,id},style:{height: 700}} //styleを指定する必要あり。
                ))
              }
              willLeave={willLeave}
              >
            {interpolatingStyles =>
              <>
              {interpolatingStyles.map(interpolatingStyle => {
                return <MatchCard match={interpolatingStyle} onClickPost={onClickPost}/>
              })}
              </>
            }
          </TransitionMotion>
        </InfiniteScroll>
        <PostGuideModal show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
    </Layout>
  )
}
export default Posts;
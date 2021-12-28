import React,{useState,useEffect} from 'react';

import InfiniteScroll from "react-infinite-scroller"

import Layout from "../components/Layout";
import axios from "axios"
import {Container, Spinner} from "react-bootstrap"
import MatchCard from "../components/MatchCard"

import {TransitionMotion,spring} from "react-motion"

const Matches = () => {
  const [matches,setMatches] = useState([])
  const [hasMore,setHasMore] = useState(true)

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

  const loader = <Spinner key={0} animation="border" variant="secondary" />
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
    return {height: spring(0,{stiffness:240,dumping:30})}
  }

  const onClickPost = (match_id) => {
    setMatches(matches.filter(match => match.match_id !== match_id))
  }
  return (
    <Layout>
      <Container>
        <div className="mt-4">
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader} className="text-center">
            <TransitionMotion
              willLeave={willLeave}
              styles={
                matches.map((match,id) => (
                  {
                    key: String(match.match_id),
                    data:{...match,id},
                    style:{height: match.height}
                  }
                ))
              }
            >
              {interpolatingStyles =>
                <>
                {interpolatingStyles.map(interpolatingStyle => {
                  return (
                    <MatchCard key={interpolatingStyle.key} match={interpolatingStyle} onClickPost={onClickPost}/>
                  )
                })}
                </>
              }
            </TransitionMotion>
          </InfiniteScroll>
        </div>
      </Container>
    </Layout>
  )
}
export default Matches;
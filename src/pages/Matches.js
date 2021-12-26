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

  const getStyles = () => {
    // const {todos, value, selected} = this.state;
    // return todos.filter(({data: {isDone, text}}) => {
    //   return text.toUpperCase().indexOf(value.toUpperCase()) >= 0 &&
    //     (selected === 'completed' && isDone ||
    //     selected === 'active' && !isDone ||
    //     selected === 'all');
    // })
    // .map((todo, i) => {
    //   return {
    //     ...todo,
    //     style: {
    //       height: spring(60, presets.gentle),
    //       opacity: spring(1, presets.gentle),
    //     }
    //   };
    // });
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
                    key: match.match_id,
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
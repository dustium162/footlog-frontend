import React,{useState,useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroller'
import Head from '../components/Head';
import Layout from '../components/Layout';
import axios from 'axios';
import {Container, Spinner} from 'react-bootstrap';
import MatchCard from '../components/MatchCard';
import {TransitionMotion,spring} from 'react-motion';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [matchIds, setMatchIds] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    console.log(matchIds)
    if(matchIds.length !== 0){
      const data = await getMatches();
      console.log(data);
      console.log(matchIds);
      console.log(matches);
      if (data.length < 10) {
        setHasMore(false);
        return;
      }
      if(matches.length !== 0){
        setMatches([...matches,...data])
      } else {
        setMatches(data);
      }
    }
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
    .then(response => response.data)
    .then(data => {
      setMatchIds(data);
      return matchIds;
    })
  },[])

  const getMatches = async () => {
    console.log(matchIds[3]);
    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/matches/add?match_ids=${matchIds[page]}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    });
    console.log(response.data);
    setPage(() => page+1);
    // console.log(response.data);
    return response.data
  }

  const willLeave = () => { 
    return {height: spring(0,{stiffness:240,dumping:30})}
  }

  const onClickPost = (matchId) => {
    setMatches(matches.filter(match => match.match_id !== matchId))
  }
  return (
    <Layout>
      <Head title="観戦記録の作成" />
      <Container>
        <div className="mt-4">
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader} className="text-center">
            <TransitionMotion
              willLeave={willLeave}
              styles={
                matches.map((match) => (
                  {
                    key: String(match.match_id),
                    data: match,
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
import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Head from '../components/Head';
import Layout from '../components/Layout';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller'
import { Container, Spinner } from 'react-bootstrap';
import MatchCard from '../components/MatchCard';
import { TransitionMotion, spring } from 'react-motion';

const Matches = () => {

  const [matches, setMatches] = useState([]);
  const [matchIds, setMatchIds] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetcing] = useState(false);

  const loadMore = async () => {
    setIsFetcing(true);
    try {
      if(matchIds.length !== 0){
        const data = await getMatches();
        if (data.length < 10) {
          setHasMore(false);
          return;
        }
        if(matches.length !== 0){
          setMatches([...matches,...data]);
        } else {
          setMatches(data);
        }
      }
    } finally {
      setIsFetcing(false);
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
    }).then((response) => {
      return response.data;
    }).then((data) => {
      setMatchIds(data);
    })
  },[]);

  const getMatches = async () => {
    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/matches/add?match_ids=${matchIds[page].join(',')}`,
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    );
    setPage(() => page+1);

    return response.data
  }

  const willLeave = () => { 
    return {height: spring(0, {stiffness:240, dumping:30})}
  }

  const onClickPost = (matchId) => {
    setMatches(matches.filter((match) => match.match_id !== matchId))
  }

  return (
    <HelmetProvider>
      <Layout>
        <Head title="観戦記録の作成" />
        <Container>
          <div className="mt-4">
            <InfiniteScroll loadMore={loadMore} hasMore={!isFetching && hasMore} loader={loader} className="text-center">
              <TransitionMotion
                willLeave={willLeave}
                styles={
                  matches.map((match) => (
                    {
                      key: String(match.match_id),
                      data: match,
                      style: {height: match.height}
                    }
                  ))
                }
              >
                {interpolatingStyles =>
                  <>
                    {interpolatingStyles.map((interpolatingStyle) => {
                      return (
                        <MatchCard key={interpolatingStyle.key} match={interpolatingStyle} onClickPost={onClickPost} />
                      );
                    })}
                  </>
                }
              </TransitionMotion>
            </InfiniteScroll>
          </div>
        </Container>
      </Layout>
    </HelmetProvider>
  )
}

export default Matches;
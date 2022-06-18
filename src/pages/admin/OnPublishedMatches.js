import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Head from '../../components/Head';
import Layout from '../../components/Layout';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller'
import { Container, Spinner } from 'react-bootstrap';
import OnPublishedMatch from './OnPublishedMatch';
import ReturnTopButton from '../../components/ReturnTopButton';

const OnPublishedMatches = () => {

  const [matches, setMatches] = useState([]);
  const [hasMore,setHasMore] = useState(true);

  const loadMore = async (page) => {
    const data = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/matches`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      },
      params: {
        index_type: 'on_published_index',
        page: page
      }
    }).then((response) => {
      return response.data;
    })
    if (data.length < 1) {
      setHasMore(false);
      return;
    }
    setMatches([...matches,...data]);
  }

  const loader = <Spinner key={0} animation="border" variant="secondary" />

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/matches`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      },
      params: {
        index_type: 'on_published_index'
      }
    }).then((response) => {
      return response.data;
    }).then((data) => {
      setMatches(data);
    })
  },[]);

  return (
    <HelmetProvider>
      <Layout>
        <Head title="観戦記録の作成" />
        <Container>
          <div className="mt-4">
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader} className="text-center">
              {matches.map((match) => (
                <OnPublishedMatch match={match}/>
              )
              )}
            </InfiniteScroll>
          </div>
        </Container>
      </Layout>
      <ReturnTopButton />
    </HelmetProvider>
  )
}

export default OnPublishedMatches;
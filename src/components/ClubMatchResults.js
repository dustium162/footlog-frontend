import React, { useState,useEffect } from 'react';
import { Carousel } from 'react-bootstrap'
import Opponent from './Opponent'
import axios from 'axios'

const ClubMatchResults = ({userId}) => {
  const [clubMatchResults,setClubMatchResults] = useState([])
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}/club-match-results` ,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    .then(response => response.data)
    .then(data => {
      setClubMatchResults(data);
    })
  },[userId])
  return (
    <>
      {clubMatchResults.length === 0 ? 
      <></>
      :
      <>
      <h3 className="h5">クラブ別対戦成績</h3>
      <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      slide={true}
      interval={null}
      indicators={false}
      >
        {clubMatchResults.map(clubMatchResult => (
          <Carousel.Item key={clubMatchResult.team.club_id}>
            <Opponent clubMatchResult={clubMatchResult} />
          </Carousel.Item>)
        )}
      </Carousel>
      </>
      }
    </>
    );
  }
  export default ClubMatchResults;
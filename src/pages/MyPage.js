import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import Layout from "../components/Layout";

import axios from "axios"

import UserInfo from '../components/UserInfo'
import ClubMatchResults from '../components/ClubMatchResults'
import NewUserPostTabs from '../components/NewUserPostTabs'
import MatchResults from '../components/MatchResults'
import UserStats from '../components/UserStats'

import { Container } from 'react-bootstrap'
import FormUserPosts from '../components/FormUserPosts';

const MyPage = () => {
  // const [loading, setLoading] = useState(true);
  const [info,setInfo] = useState({})
  const userId = JSON.parse(localStorage.getItem('currentUser')).id
  const handlePrompt = (count) => {
    if(count > 0) {
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}` ,{
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      })
      .then(response => response.data)
      .then(data => {
        setInfo(data);
      })
      return (
        <>
          <div className="my-4">
            <MatchResults matchResults={info.stats.match_results} />
          </div>
          <div className="mx-5">
            <hr />
          </div>
          <div className="my-4">
            <ClubMatchResults clubMatchResults={info.stats.club_match_results}/>
          </div>
        </>
      );
    } else {
      return (
        <div className="my-4 text-center bg-light rounded border py-3">
          まだ現地観戦記録がありません。<br />
          下のボタンから観戦記録を作成しましょう！<br />
          <Link to="/posts" className="btn btn-secondary mt-3">観戦記録を作る</Link>
        </div>
      );      
    }
  };
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}` ,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    .then(response => response.data)
    .then(data => {
      setInfo(data);
    })
  }
  ,[])

  return (
    <Layout>
      <UserInfo />
      <Container>
        <UserStats userId={userId}/>
        <div className="mt-5">
          <FormUserPosts />
          {/* <NewUserPostTabs/> */}
        </div>
      </Container>
    </Layout>
  )
}
export default MyPage;

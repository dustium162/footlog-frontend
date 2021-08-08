import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout";

import axios from "axios"

import UserInfo from '../components/UserInfo'
import SupportInfo from "../components/SupportInfo"
import ClubMatchResults from '../components/ClubMatchResults'
import UserTabs from '../components/UserTabs'

import {Row} from 'react-bootstrap'

const MyPage = () => {
  // const [loading, setLoading] = useState(true);
  const [info,setInfo] = useState({})
  const userId = JSON.parse(localStorage.getItem('currentUser')).id
  useEffect(() => {
    axios.get(`http://localhost:3000/v1/users/${userId}` ,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    .then(response => response.data)
    .then(data => {
      setInfo(data);
      // setLoading(false);
    })
  }
  ,[])

  return (
    <Layout>
      {info.user ? <Row><UserInfo user={info.user}/></Row> : <Row>Loading...</Row>}
      {info.support_info ? <Row><SupportInfo support_info={info.support_info}/></Row> : <Row>Loading...</Row>}
      <Row><ClubMatchResults/></Row>
      {info.posts_info ? <Row><UserTabs posts_info={info.posts_info}/></Row>: <Row>Loading...</Row>}
    </Layout>
  )
}
export default MyPage;

import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout";

import axios from "axios"

import UserInfo from '../components/UserInfo'
import SupportInfo from "../components/SupportInfo"
import UserTabs from '../components/UserTabs'

import {Row} from 'react-bootstrap'

const MyPage = () => {
  const [info,setInfo] = useState({})
  useEffect(() => {
    axios.get("http://localhost:3000/v1/" ,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    .then(response => response.data)
    .then(data => { setInfo(data)})
  }
  ,[])
  return (
    <Layout>
      <Row><UserInfo /></Row>
      <Row><SupportInfo /></Row>
      <Row><UserTabs /></Row>
    </Layout>
  )
}
export default MyPage;

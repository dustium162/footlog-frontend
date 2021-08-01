import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout";

import axios from "axios"

import UserInfo from '../components/UserInfo'
import SupportInfo from "../components/SupportInfo"
import ClubMatchResults from '../components/ClubMatchResults'
import UserTabs from '../components/UserTabs'

import {Row} from 'react-bootstrap'

const MyPage = () => {
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
    .then(data => { setInfo(data);
                    console.log(data); })
  }
  ,[])
  const hash = {
    user: {
      name: "dustium162",
      icon: "my_page_header.jpeg",
      header: "top3.jpg",
      biography: "よろしくおねがいします。"
    },
    support_info: {
      club_id: 12,
      win: 10,
      lose: 5,
      draw: 3,
      first_match: "2013-03-24",
      latest_match: "2021-05-11",
    },
    posts_info: {
        1: {
          post_id: 1,
          title :"明治安田生命J1リーグ",
          home_or_away_or_neutral: "Home",
          date_time: "2021-03-01",
          opponent_name: "柏レイソル",
          opponent_emblem: "emblem.png",
          home_score: 3,
          away_score: 2,
          mobilization: 3263,
        },
        2: {
          post_id: 2,
          title :"明治安田生命J1リーグ",
          home_or_away_or_neutral: "Away",
          date_time: "2021-03-12",
          opponent_name: "鹿島アントラーズ",
          opponent_emblem: "emblem.png",
          home_score: 1,
          away_score: 0,
          mobilization: 9999,
        },
      },
    club_match_result_for_user: [
    {
      opponent_name: "鹿島アントラーズ",
      image: "kashima",
      win: 99,
      lose: 0,
      draw: 1,
    },
    {
      opponent_name: "ガンバ大阪",
      image: "gamba",
      win: 49,
      lose: 49,
      draw: 10,
    },
    ]
  }
  return (
    <Layout>
      <Row><UserInfo user={hash.user}/></Row>
      <Row><SupportInfo support_info={hash.support_info}/></Row>
      <Row><ClubMatchResults/></Row>
      <Row><UserTabs posts_info={hash.posts_info}/></Row>
    </Layout>
  )
}
export default MyPage;

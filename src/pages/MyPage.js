import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout";

import axios from "axios"

import UserInfo from '../components/UserInfo'
// import SupportInfo from "../components/SupportInfo"
import ClubMatchResults from '../components/ClubMatchResults'
import UserPostTabs from '../components/UserPostTabs'
import MatchResults from '../components/MatchResults'

import {Container,Button} from 'react-bootstrap'

const MyPage = () => {
  // const [loading, setLoading] = useState(true);
  const [info,setInfo] = useState({})
  const userId = JSON.parse(localStorage.getItem('currentUser')).id
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
      // setLoading(false);
    })
  }
  ,[])

  return (
    <Layout>
      {info.user && info.team && info.support_info ? <UserInfo user={info.user} team={info.team} support_info={info.support_info}/> : <>Loading...</>}
        <Container>
          {info.stats &&
            <>
            <div>
              まだ観戦記録がありません。<br />
              下のボタンから観戦記録を作成しましょう！<br />
              <Button>観戦記録を作る</Button>
            </div>
            <div className="my-4">
              <MatchResults matchResults={info.stats.match_results} />
            </div>
            <div className="mx-5">
              <hr />
            </div>
            <div className="my-4">
              <ClubMatchResults clubMatchResults={info.stats.club_match_results}/>
            </div>
            <UserPostTabs />
            </>
          }
          {/* {info.posts &&
            <UserPostTabs posts={info.posts}/>
          } */}
        </Container>
    </Layout>
  )
}
export default MyPage;

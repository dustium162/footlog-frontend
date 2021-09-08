import React,{useState,useEffect} from "react";

import axios from "axios"


import {Row,Col} from "react-bootstrap"
import MatchEdit from "./MatchEdit";
import Layout from "../../components/Layout";

const UnpublishedPosts = () => {
  const [matches,setMatches] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/v1/matches/publish")
      .then( response => {
        setMatches(response.data)
      })
      .catch(error => console.log(error))
  },[])

  const array = [
    {
      match_id: 1,
      title: "リーグ戦",
      date_time: "2020-09-22",
      home_team: "浦和レッズ",
      away_team: "鹿島アントラーズ",
      home_score: 2,
      away_score: 1,
      stadium: "浦和駒場スタジアム"
    },
    {
      match_id: 1,
      title: "カップ戦",
      date_time: "2020-09-22",
      home_team: "浦和レッズ",
      away_team: "アルビレックス新潟",
      home_score: 2,
      away_score: 1,
      stadium: "空き地"
    },
    {
      match_id: 1,
      title: "しょぼいリーグ",
      date_time: "2020-09-22",
      home_team: "浦和レッズ",
      away_team: "富良野ユナイテッド",
      home_score: 2,
      away_score: 1,
      stadium: "南極スタジアム"
    },
  ]
  return (
    <Layout>

    <Row xs={1} md={2} className="g-2">
      {matches.map(match => {
        return (
          <Col><MatchEdit match={match}/></Col>
          )
        })}
    </Row>
  </ Layout>
  );
}

export default UnpublishedPosts;

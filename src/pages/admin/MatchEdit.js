import React, {useState} from "react"

import axios from "axios"

import {Row,Col,Form,Button,Card} from "react-bootstrap"


const MatchEdit = ({match}) => {

  const [home_score,setHomeScore] = useState(0)
  const [away_score,setAwayScore] = useState(0)
  const [home_score_players,setHomeScorePlayers] = useState("")
  const [home_red_players,setHomeRedPlayers] = useState("")
  const [away_score_players,setAwayScorePlayers] = useState("")
  const [away_red_players,setAwayRedPlayers] = useState("")
  const [mobilization,setMobilization] = useState(0)

  const handleHomeScore = (e) => {
    setHomeScore(e.target.value)
  }

  const handleAwayScore = (e) => {
    setAwayScore(e.target.value)
  }

  const handleHomeScorePlayers = (e) => {
    setHomeScorePlayers(e.target.value)
  }

  const handleAwayScorePlayers = (e) => {
    setAwayScorePlayers(e.target.value)
  }

  const handleHomeRedPlayers = (e) => {
    setHomeRedPlayers(e.target.value)
  }

  const handleAwayRedPlayers = (e) => {
    setAwayRedPlayers(e.target.value)
  }

  const handleMobilization = (e) => {
    setMobilization(e.target.value)
  }

  const publishMatch = () => {
    axios.patch(`http://localhost:3000/v1/matches/${match.id}`,{
      home_score: home_score,
      away_score: away_score,
      home_score_players: home_score_players,
      home_red_players: home_red_players,
      away_score_players: away_score_players,
      away_red_players: away_red_players,
      mobilization: mobilization
    },
    {
          headers: {
            uid: localStorage.getItem('uid'),
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client')
          }
    })
    .catch(error => console.log(error))
  }

  return (
    <Card>
      <Form>
        <Row>
          <h5>{match.title}</h5>
          <h5>{match.id}</h5>
          <h6>{match.date_time}</h6>
          <h6>{match.home_team} (Home) VS {match.away_team} (Away)</h6>
          <h6>@{match.stadium}</h6>
        </Row>
        <Row>
          <Col>入力形式：選手名,時間;選手名,時間;選手名,時間;</Col>
        </Row>
        <Row><Col>選手名と時間のペアをセミコロンで区切る</Col></Row>
        <Row><Col>選手名と時間はコロンで区切る</Col></Row>
        <Row><Col>オウンゴールは”オウンゴール”と入力すること</Col></Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>ホーム得点</Form.Label>
            <Form.Control value={home_score} onChange={handleHomeScore}></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>アウェイ得点</Form.Label>
              <Form.Control value={away_score} onChange={handleAwayScore}></Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>ホームの得点者</Form.Label>
            <Form.Control value={home_score_players} onChange={handleHomeScorePlayers}></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>アウェイの得点者</Form.Label>
              <Form.Control value={away_score_players} onChange={handleAwayScorePlayers}></Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>ホームの退場者</Form.Label>
              <Form.Control value={home_red_players} onChange={handleHomeRedPlayers}></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>アウェイの退場者</Form.Label>
            <Form.Control value={away_red_players} onChange={handleAwayRedPlayers}></Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Label>動員数</Form.Label>
          <Form.Control type="integer" value={mobilization} onChange={handleMobilization} />
        </Row>
      </Form>
      <Button onClick={publishMatch}>試合情報投稿</Button>
    </Card>
  )
}
export default MatchEdit;

import React, {useState,useEffect} from "react"
import Layout from "../../components/Layout";

import axios from "axios"

import {Row,Col,Form,Button} from "react-bootstrap"


const MatchEdit = () => {
  const [title,setTitle] = useState("")
  const [date_time,setDate] = useState("")
  const [home_team,setHomeTeam] = useState("")
  const [away_team,setAwayTeam] = useState("")
  const [stadium,setStadium] = useState("")

  const [home_score,setHomeScore] = useState(0)
  const [away_score,setAwayScore] = useState(0)
  const [mobilization,setMobilization] = useState(0)

  const handleHomeScore = (e) => {
    setHomeScore(e.target.value)
  }
  const handleAwayScore = (e) => {
    setAwayScore(e.target.value)
  }
  const handleMobilization = (e) => {
    setMobilization(e.target.value)
  }


  useEffect(() => {
    // テスト用のためidを1に固定中
    axios.get("http://localhost:3000/v1/matches/1/edit")
      .then( response => {
        console.log(response.data.data)
        setTitle(response.data.data["title"])
        setDate(response.data.data["date_time"])
        setHomeTeam(response.data.data["home_team"])
        setAwayTeam(response.data.data["away_team"])
        setStadium(response.data.data["stadium"])
      })
      .catch(error => console.log(error))
  },[])

  const publishMatch = () => {
    axios.patch("http://localhost:3000/v1/matches/1",{
      home_score: home_score,
      away_score: away_score,
      mobilization: mobilization
    })
    .catch(error => console.log(error))
  }

  return (
    <Layout>
      <Form>
        <Row>
          <h1>{title}</h1>
          <h1>{date_time}</h1>
          <h1>{home_team} (Home) VS {away_team} (Away)</h1>
          <h1>@{stadium}</h1>
        </Row>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>ホームの得点を入力</Form.Label>
          <Form.Control as="select" value={home_score} onChange={handleHomeScore}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Form.Control>
          <Form.Label>ホームの得点者を入力</Form.Label>
            <Form.Control></Form.Control>
          <Form.Label>アウェイの得点を入力</Form.Label>
          <Form.Control as="select" value={away_score} onChange={handleAwayScore}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Form.Control>
          <Form.Label>アウェイの得点者を入力</Form.Label>
            <Form.Control></Form.Control>
        <Form.Label>動員数を入力</Form.Label>
          <Form.Control type="integer" value={mobilization} onChange={handleMobilization} />
        </Form.Group>
      </Form>
      <Button onClick={publishMatch}>試合情報投稿</Button>
    </Layout>
  )
}
export default MatchEdit;

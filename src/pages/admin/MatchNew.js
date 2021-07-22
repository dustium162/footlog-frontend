import React, {useState,useEffect} from "react"
import Layout from "../../components/Layout";

import axios from "axios"

import {Row,Form,Button} from "react-bootstrap"


const MatchNew = () => {
  const [teams,setTeams] = useState({})
  const [stadia,setStadia] = useState({})
  const [titles,setTitles] = useState({})

  const [home_team,setHomeTeam] = useState("")
  const [away_team,setAwayTeam] = useState("")
  const [stadium,setStadium] = useState("")
  const [title,setTitle] = useState(0)
  const [neutral,setNeutral] = useState(0)

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleHomeTeam = (e) => {
    setHomeTeam(e.target.value)
  }
  const handleAwayTeam = (e) => {
    setAwayTeam(e.target.value)
  }
  const handleStadium = (e) => {
    setStadium(e.target.value)
  }
  const handleNeutral = (e) => {
    setNeutral(e.target.value)
  }

  useEffect(() => {
    axios.get("http://localhost:3000/v1/matches/new")
      .then( response => {
        setTitles(response.data["titles"])
        setTeams(response.data["teams"])
        setStadia(response.data["stadia"])
      })
      .catch(error => console.log(error))
  },[])

  const createNewMatch = () => {
    axios.post("http://localhost:3000/v1/matches",{
      title: title,
      home_team: home_team,
      away_team: away_team,
      stadium: stadium,
      neutral: neutral
    })
    // .then(response => console.log("hoge"))
    .catch(error => console.log(error))
  }

  const hash = {
    titles: [
      {title_id:1, name:"りーぐせんその１"},
      {title_id:2, name:"りーぐせんその２"},
      {title_id:3, name:"すごい大会"},
      {title_id:4, name:"しょぼい大会"},
    ],
    teams: {
      //sign_upと同じ感じで(20210722浅見)
      j1: [
        {team_id: 1, name: "北海道コンサドーレ札幌"},
        {team_id: 2, name: "ベガルタ仙台"},
        {team_id: 3, name: "浦和レッズ"},
      ],
      j2: [
        {team_id: 1, name: "北海道コンサドーレ札幌"},
        {team_id: 2, name: "ベガルタ仙台"},
        {team_id: 3, name: "浦和レッズ"},
      ],
      j3: [
        {team_id: 1, name: "北海道コンサドーレ札幌"},
        {team_id: 2, name: "ベガルタ仙台"},
        {team_id: 3, name: "浦和レッズ"},
      ],
      // Jリーグチーム以外(20210722浅見)
      others: [
        {team_id: 1, name: "北海道コンサドーレ札幌"},
        {team_id: 2, name: "ベガルタ仙台"},
        {team_id: 3, name: "浦和レッズ"},
      ],
    },
    stadia: [

    ]
  }

  return (
    <Layout>
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>大会</Form.Label>
          <Form.Control as="select" value={title} onChange={handleTitle}>
            <option>大会を選択</option>
            {
              Object.keys(titles).map(title_id => {
                return <option>{titles[title_id]}</option>
              })
            }
          </Form.Control>
          <Form.Label>試合日程</Form.Label>
          <Form.Control type = "date" />
          <div key="inline-radio" className="mb-3">
            <Form.Check inline label="J1" type="radio" name="home_div"/>
            <Form.Check inline label="J2" type="radio" name="home_div"/>
            <Form.Check inline label="J3" type="radio" name="home_div"/>
            <Form.Check inline label="Other" type="radio" name="home_div"/>
          </div>
          <Form.Label>ホームチーム</Form.Label>
          {/* ラジオボタンで選択したものに応じてリストの中身を変えたい。(20210722浅見) */}
          <Form.Control as="select" onChange={handleHomeTeam}>
            <option>ホームチームを選択</option>
            {
              Object.keys(teams).map(team_id => {
                return <option value={team_id}>{teams[team_id]}</option>
              })
            }
          </Form.Control>
          <div key="inline-radio" className="mb-3">
            <Form.Check inline label="J1" type="radio" name="away_div"/>
            <Form.Check inline label="J2" type="radio" name="away_div"/>
            <Form.Check inline label="J3" type="radio" name="away_div"/>
            <Form.Check inline label="Other" type="radio" name="away_div"/>
          </div>
          <Form.Label>アウェイチーム</Form.Label>
            {/* ラジオボタンで選択したものに応じてリストの中身を変えたい。(20210722浅見) */}
          <Form.Control as="select" value={away_team} onChange={handleAwayTeam}>
            <option>アウェイチームを選択</option>
            {
              Object.keys(teams).map(team_id => {
                return <option value={team_id}>{teams[team_id]}</option>
              })
            }
          </Form.Control>
          <Form.Label>スタジアム</Form.Label>
          <Form.Control as="select" value={stadium} onChange={handleStadium}>
            <option>スタジアムを入力</option>
            {
              Object.keys(stadia).map(stadium_id => {
                return <option value={stadium_id}>{stadia[stadium_id]}</option>
              })
            }
          </Form.Control>
          <div key={`custom-checkbox`} className="mb-3">
            <Form.Check
              custom
              type={"checkbox"}
              value={neutral}
              id={`custom-checkbox`}
              label={`中立地開催？`}
              onChange={handleNeutral}
            />
          </div>
        </Form.Group>
        <Button type="submit" onClick={createNewMatch}>試合情報作成</Button>
      </Form>
    </Layout>
  )
}
export default MatchNew;

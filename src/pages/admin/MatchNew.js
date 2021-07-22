import React, {useState,useEffect} from "react"
import Layout from "../../components/Layout";

import axios from "axios"

import {Row,Form,Button} from "react-bootstrap"


const MatchNew = () => {
  const [teams,setTeams] = useState({})
  const [stadia,setStadia] = useState({})
  const [titles,setTitles] = useState({})

  const [home_team_id,setHomeTeamId] = useState(0)
  const [away_team_id,setAwayTeamId] = useState(0)
  const [stadium_id,setStadiumId] = useState(0)
  const [date_time,setDateTime] = useState("")
  const [title_id,setTitleId] = useState(0)
  const [is_neutral,setNeutral] = useState(false)

  const handleTitleId = (e) => {
    setTitleId(e.target.value)
  }
  const handleDateTime = (e) => {
    setDateTime(e.target.value)
  }
  const handleHomeTeamId = (e) => {
    setHomeTeamId(e.target.value)
  }
  const handleAwayTeamId = (e) => {
    setAwayTeamId(e.target.value)
  }
  const handleStadiumId = (e) => {
    setStadiumId(e.target.value)
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
      title_id: title_id,
      home_team_id: home_team_id,
      away_team_id: away_team_id,
      date_time: date_time,
      stadium_id: stadium_id,
      is_neutral: is_neutral
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
      {stadium_id: 1, name:"大きなスタジアム"},
      {stadium_id: 2, name:"小さなスタジアム"},
      {stadium_id: 3, name:"野球場"},
      {stadium_id: 3, name:"空き地"},
    ]
  }
  console.log(hash.titles)
  return (
    <Layout>
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>大会</Form.Label>
          <Form.Control as="select" value={title_id} onChange={handleTitleId}>
            <option>大会を選択</option>
            {/* {
              Object.keys(titles).map(title_id => {
                return <option>{titles[title_id]}</option>
              })
            } */}
            {
              hash.titles.map(title => {
                return <option value={title.title_id}>{title.name}</option>
              })
            }
          </Form.Control>
          <Form.Label>試合日程</Form.Label>
          <Form.Control type = "date" value={date_time} onChange={handleDateTime}/>
          <div key="inline-radio" className="mb-3">
            <Form.Check inline label="J1" type="radio" name="home_div"/>
            <Form.Check inline label="J2" type="radio" name="home_div"/>
            <Form.Check inline label="J3" type="radio" name="home_div"/>
            <Form.Check inline label="Other" type="radio" name="home_div"/>
          </div>
          <Form.Label>ホームチーム</Form.Label>
          {/* ラジオボタンで選択したものに応じてリストの中身を変えたい。(20210722浅見) */}
          <Form.Control as="select" value={home_team_id} onChange={handleHomeTeamId}>
            <option>ホームチームを選択</option>
            {/* {
              Object.keys(teams).map(team_id => {
                return <option value={team_id}>{teams[team_id]}</option>
              })
            } */}
            {
              hash.teams.j1.map(team => {
                return <option value={team.team_id}>{team.name}</option>
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
          <Form.Control as="select" value={away_team_id} onChange={handleAwayTeamId}>
            <option>アウェイチームを選択</option>
            {/* {
              Object.keys(teams).map(team_id => {
                return <option value={team_id}>{teams[team_id]}</option>
              })
            } */}
            {
              hash.teams.j1.map(team => {
                return <option value={team.team_id}>{team.name}</option>
              })
            }
          </Form.Control>
          <Form.Label>スタジアム</Form.Label>
          <Form.Control as="select" value={stadium_id} onChange={handleStadiumId}>
            <option>スタジアムを入力</option>
            {/* {
              Object.keys(stadia).map(stadium_id => {
                return <option value={stadium_id}>{stadia[stadium_id]}</option>
              })
            } */}
            {
              hash.stadia.map(stadium => {
                return <option value={stadium.stadium_id}>{stadium.name}</option>
              })
            }
          </Form.Control>
          <div key={`custom-checkbox`} className="mb-3">
            <Form.Check
              custom
              type={"checkbox"}
              value={is_neutral}
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

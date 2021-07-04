import React, {useState,useEffect} from "react"
import Layout from "../../components/Layout";

import axios from "axios"

import {Row,Col,Form,Button} from "react-bootstrap"


const MatchNew = () => {
  const [teams,setTeams] = useState([])
  const [stadia,setStadia] = useState([])
  const [titles,setTitles] = useState([])

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
        console.log(response.data.data)
        setTitles(response.data.data["titles"])
        setTeams(response.data.data["teams"])
        setStadia(response.data.data["stadia"])
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

  return (
    <Layout>
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>大会</Form.Label>
          <Form.Control as="select" value={title} onChange={handleTitle}>
            <option>大会を選択</option>
            <option>{titles[0]}</option>
            <option>{titles[1]}</option>
            <option>{titles[2]}</option>
            <option>{titles[3]}</option>
          </Form.Control>
          <Form.Label>試合日程</Form.Label>
          <Form.Control type = "date" />
          <Form.Label>ホームチーム</Form.Label>
          <Form.Control as="select" value={home_team} onChange={handleHomeTeam}>
            <option>ホームチームを選択</option>
            <option>{teams[0]}</option>
            <option>{teams[1]}</option>
            <option>{teams[2]}</option>
            <option>{teams[3]}</option>
          </Form.Control>
          <Form.Label>アウェイチーム</Form.Label>
          <Form.Control as="select" value={away_team} onChange={handleAwayTeam}>
            <option>アウェイチームを選択</option>
            <option>{teams[0]}</option>
            <option>{teams[1]}</option>
            <option>{teams[2]}</option>
            <option>{teams[3]}</option>
          </Form.Control>
          <Form.Label>スタジアム</Form.Label>
          <Form.Control as="select" value={stadium} onChange={handleStadium}>
            <option>スタジアムを入力</option>
            <option>{stadia[0]}</option>
            <option>{stadia[1]}</option>
            <option>{stadia[2]}</option>
            <option>{stadia[3]}</option>
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

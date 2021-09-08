import React, {useState,useEffect} from "react"
import Layout from "../../components/Layout";
import axios from "axios"
import {Row,Form,Button} from "react-bootstrap"
import Select from 'react-select';

const MatchNew = () => {
  const [teams,setTeams] = useState({})
  const [stadia,setStadia] = useState([])
  const [titles,setTitles] = useState([])

  const [home_team_id,setHomeTeamId] = useState(0)
  const [away_team_id,setAwayTeamId] = useState(0)
  const [stadium_id,setStadiumId] = useState(0)
  const [date_time,setDateTime] = useState("")
  const [title_id,setTitleId] = useState(0)
  const [is_neutral,setNeutral] = useState(false)

  const [home_teams_list, setHomeTeamsList] = useState([])
  const [away_teams_list, setAwayTeamsList] = useState([])

  const handleTitleId = (e) => {
    setTitleId(e.target.value)
  }
  const handleDateTime = (e) => {
    setDateTime(e.target.value)
  }
  const handleStadium = (e) => {
    if(e) {
      setStadiumId(e.value)
    }
    console.log(stadium_id)
  }
  const handleNeutral = (e) => {
    setNeutral(e.target.value)
  }

  const handleHomeTeam = (e) => {
    if(e) {
      setHomeTeamId(e.value);
    }
  }
  const handleHomeTeamType = (e) => {
    setHomeTeamsList(teams[e.target.value])
  }

  const handleAwayTeam = (e) => {
    if(e) {
      setAwayTeamId(e.value);
    }
  }
  const handleAwayTeamType = (e) => {
    setAwayTeamsList(teams[e.target.value])
  }

  useEffect(() => {
    axios.get("http://localhost:3000/v1/matches/new")
      .then( response => {
        console.log(response.data)
        setTitles(response.data.titles)
        setTeams(response.data.teams)
        setStadia(response.data.stadia)
        setHomeTeamsList(response.data.teams['j1'])
        setAwayTeamsList(response.data.teams['j1'])
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
    .catch(error => console.log(error))
  }

  return (
    <Layout>
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>大会</Form.Label>
          <Form.Control as="select" value={title_id} onChange={handleTitleId}>
            <option>大会を選択</option>
            {titles ? titles.map(title => {
              return <option value={title.value}>{title.label}</option>
            }) : <div></div>}
          </Form.Control>
          <Form.Label>試合日程</Form.Label>
          <Form.Control type = "date" value={date_time} onChange={handleDateTime}/>

          <Form.Label>ホームチーム</Form.Label>
          <div key="inline-radio" className="mb-3">
            <Form.Check inline label="J1" type="radio" name="home_div" id="home_j1" value="j1" onChange={handleHomeTeamType} checked />
            <Form.Check inline label="J2" type="radio" name="home_div" id="home_j2" value="j2" onChange={handleHomeTeamType} />
            <Form.Check inline label="J3" type="radio" name="home_div" id="home_j3" value="j3" onChange={handleHomeTeamType} />
            <Form.Check inline label="Other" type="radio" name="home_div" id="home_other" value="other" onChange={handleHomeTeamType} />
          </div>
          <Select options={home_teams_list} placeholder="ホームチームを選択" onChange={handleHomeTeam} isClearable />

          <Form.Label>アウェイチーム</Form.Label>
          <div key="inline-radio" className="mb-3">
            <Form.Check inline label="J1" type="radio" name="away_div" id="away_j1" onChange={handleAwayTeamType} checked />
            <Form.Check inline label="J2" type="radio" name="away_div" id="away_j2" onChange={handleAwayTeamType} />
            <Form.Check inline label="J3" type="radio" name="away_div" id="away_j3" onChange={handleAwayTeamType} />
            <Form.Check inline label="Other" type="radio" name="away_div" id="away_other" onChange={handleAwayTeamType} />
          </div>
          <Select options={away_teams_list} placeholder="アウェイチームを選択" onChange={handleAwayTeam} isClearable />

          <Form.Label>スタジアム</Form.Label>
          <Select options={stadia} placeholder="スタジアムを選択" onChange={handleStadium} isClearable />
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
        <Button type="submit" onClick={createNewMatch} disabled={!title_id || !home_team_id || !away_team_id || !date_time || !stadium_id }>試合情報作成</Button>
      </Form>
      </Layout>
      )
    }
    export default MatchNew;

import React,{useState,useEffect} from "react"
import Layout from "../../components/Layout";

import axios from "axios"

import {Row,Col} from "react-bootstrap"

const AddStadium = () => {
  const [teams,setTeams] = useState({})
  useEffect(() => {
    axios.get("http://localhost:3000/v1/teams/")
      .then( response => {
        console.log(response.data.data)
        setTeams(response.data.data)
      })
      .catch(error => console.log(error))
  },[])
  return (
    <Layout>
      <Row>
        <Col>club_id</Col>
        <Col>team_id</Col>
        <Col>team_name</Col>
        <Col>color_and_abbreviate</Col>
      </Row>
      {Object.keys(teams).map(club_id => (
        <Row>
        <Col>
          {Object.keys(teams[club_id]).map(team_id => (
            <Row>
              <Col>{club_id}</Col>
              <Col>{teams[club_id][team_id][0]}</Col>
              <Col>{teams[club_id][team_id][1]}</Col>
              <Col style={{backgroundColor:`rgba(${teams[club_id][team_id][3][0]},${teams[club_id][team_id][3][1]},${teams[club_id][team_id][3][2]},0.33)`,color:`rgba(${teams[club_id][team_id][3][0]},${teams[club_id][team_id][3][1]},${teams[club_id][team_id][3][2]},1)`}}>{teams[club_id][team_id][2]}</Col>
              <Col style={{backgroundColor:`rgba(${teams[club_id][team_id][3][0]},${teams[club_id][team_id][3][1]},${teams[club_id][team_id][3][2]},1`}}>{teams[club_id][team_id][2]}</Col>
            </Row>
          ))}
        </Col>
        </Row>
        ))}
    </Layout>
  )
}
export default AddStadium;
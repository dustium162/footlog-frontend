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
      </Row>
      {Object.keys(teams).map(title_type_id => (
        <Row>
        <Col>
          {Object.keys(teams[title_type_id]).map(title_id => (
            <Row>
              <Col>{title_type_id}</Col>
              <Col>{teams[title_type_id][title_id][0]}</Col>
              <Col>{teams[title_type_id][title_id][1]}</Col>
            </Row>
          ))}
        </Col>
        </Row>
        ))}
    </Layout>
  )
}
export default AddStadium;
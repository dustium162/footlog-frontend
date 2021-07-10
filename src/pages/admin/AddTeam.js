import React,{useState,useEffect} from "react"
import Layout from "../../components/Layout";

import axios from "axios"

import {Row,Col} from "react-bootstrap"

const AddStadium = () => {
  const [teams,setTeams] = useState({})
  useEffect(() => {
    axios.get("http://localhost:3000/v1/teams/")
      .then( response => {
        setTeams(response.data.data["teams"])
        console.log(response.data.data)
        console.log(response.data.data["teams"])
      })
      .catch(error => console.log(error))
  },[])
  return (
    <Layout>
      <h1>チーム情報の追加</h1>
      <Row>
        <Col>club_id</Col>
        <Col>
          <Row>
            <Col>team_id</Col>
            <Col>チーム名</Col>
          </Row>
          <Row>
            <Col>team_id</Col>
            <Col>チーム名</Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>club_id</Col>
        <Col>
          <Row>
            <Col>team_id</Col>
            <Col>チーム名</Col>
          </Row>
          <Row>
            <Col>team_id</Col>
            <Col>チーム名</Col>
          </Row>
          <Row>
            <Col>team_id</Col>
            <Col>チーム名</Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}
export default AddStadium;
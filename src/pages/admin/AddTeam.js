import React from "react"
import Layout from "../../components/Layout";

import {Row,Col} from "react-bootstrap"

const AddStadium = () => {
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
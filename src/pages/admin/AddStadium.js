import React from "react"
import Layout from "../../components/Layout";

import {Row,Col} from "react-bootstrap"

const AddStadium = () => {
  return (
    <Layout>
      <h1>スタジアム情報の追加</h1>
      <Row>
        <Col>studium_id</Col>
        <Col>
          <Row>
            <Col>studium_name_id</Col>
            <Col>スタジアム名</Col>
          </Row>
          <Row>
            <Col>studium_name_id</Col>
            <Col>スタジアム名</Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>stadium_id</Col>
        <Col>
          <Row>
            <Col>studium_name_id</Col>
            <Col>スタジアム名</Col>
          </Row>
          <Row>
            <Col>studium_name_id</Col>
            <Col>スタジアム名</Col>
          </Row>
          <Row>
            <Col>studium_name_id</Col>
            <Col>スタジアム名</Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}
export default AddStadium;
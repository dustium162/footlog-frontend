import React,{useState,useEffect} from "react"
import Layout from "../../components/Layout";

import axios from "axios"

import {Row,Col} from "react-bootstrap"

const AddStadium = () => {
  const [stadia,setStadia] = useState({})
  useEffect(() => {
    axios.get("http://localhost:3000/v1/stadia/")
      .then( response => {
        console.log(response.data.data)
        setStadia(response.data.data)
      })
      .catch(error => console.log(error))
  },[])
  return (
    <Layout>
      <Row>
        <Col>stadium_type_id</Col>
        <Col>stadium_id</Col>
        <Col>stadium_name</Col>
      </Row>
      {Object.keys(stadia).map(stadium_type_id => (
        <Row>
        <Col>
          {Object.keys(stadia[stadium_type_id]).map(stadium_id => (
            <Row>
              <Col>{stadium_type_id}</Col>
              <Col>{stadia[stadium_type_id][stadium_id][0]}</Col>
              <Col>{stadia[stadium_type_id][stadium_id][1]}</Col>
            </Row>
          ))}
        </Col>
        </Row>
        ))}    </Layout>
  )
}
export default AddStadium;
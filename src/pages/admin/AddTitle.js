import React, {useState,useEffect} from "react"
import Layout from "../../components/Layout";

import axios from "axios"

import {Row,Col} from "react-bootstrap"


const AddTitle = () => {
  const [titles,setTitles] = useState({})
  useEffect(() => {
    axios.get("http://localhost:3000/v1/titles/")
      .then( response => {
        console.log(response.data.data)
        setTitles(response.data.data)
      })
      .catch(error => console.log(error))
  },[])
  return (
    <Layout>
      <Row>
        <Col>title_type_id</Col>
        <Col>title_id</Col>
        <Col>title_name</Col>
      </Row>
      {Object.keys(titles).map(title_type_id => (
        <Row>
        <Col>
          {Object.keys(titles[title_type_id]).map(title_id => (
            <Row>
              <Col>{title_type_id}</Col>
              <Col>{titles[title_type_id][title_id][0]}</Col>
              <Col>{titles[title_type_id][title_id][1]}</Col>
            </Row>
          ))}
        </Col>
        </Row>
        ))}
    </Layout>
  )
}
export default AddTitle;
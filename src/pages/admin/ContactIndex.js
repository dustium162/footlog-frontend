import React,{useState, useEffect} from "react"
import Layout from "../../components/Layout";
import axios from "axios"

import {Row,Col} from "react-bootstrap"

const ContactIndex = () => {
  const [messages,setMessages] = useState([])

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/contacts`)
    .then(response => response.data)
    .then(data => setMessages(data))
  },[])

  return (
    <Layout>
      {messages.map(content => (
        <Row>
          <Col>{content.name}</Col>
          <Col>{content.email}</Col>
          <Col>{content.message}</Col>
        </Row>
        )
      )}
    </Layout>
  )
}
export default ContactIndex;
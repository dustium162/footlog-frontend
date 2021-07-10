import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout";
import axios from "axios"
import {Row,Col} from "react-bootstrap"
import MatchInfo from "../components/MatchInfo"
const Posts = () => {
  const [character,setCharacter] = useState([])
  // const [loading,setLoading] = useState(false)
  useEffect(() => {
    axios.get("http://localhost:3000/v1/matches")
      .then(response => response.json())
      .then(data => { setCharacter(data.data) })
    }
  ,[])
  return (
    <Layout>
      <div>Posts Page!</div>
      <div>{character}</div>
      <Row xs={1} md={2} className="g-4">
        <Col><MatchInfo /></Col>
      </Row>
    </Layout>
  )
}
export default Posts;
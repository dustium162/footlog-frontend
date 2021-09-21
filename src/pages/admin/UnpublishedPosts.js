import React,{useState,useEffect} from "react";

import axios from "axios"


import {Row,Col} from "react-bootstrap"
import MatchEdit from "./MatchEdit";
import Layout from "../../components/Layout";

const UnpublishedPosts = () => {
  const [matches,setMatches] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/v1/matches/publish")
      .then( response => {
        setMatches(response.data)
      })
      .catch(error => console.log(error))
  },[])

  return (
    <Layout>

    <Row xs={1} md={2} className="g-2">
      {matches.map(match => {
        return (
          <Col><MatchEdit match={match}/></Col>
          )
        })}
    </Row>
  </ Layout>
  );
}

export default UnpublishedPosts;

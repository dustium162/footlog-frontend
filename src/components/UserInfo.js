import { Link } from 'react-router-dom';
import React,{useState,useEffect} from "react";

import {Container,Image,Row,Col,Button} from "react-bootstrap"

const UserInfo = ({user}) => {
  const [icon,setIcon] = useState("")
  const [name,setName] = useState("")
  const [header,setHeader] = useState("")
  const [biography,setBiography] = useState("")

  useEffect(() => {
    setIcon(user.icon)
    setName(user.name)
    setHeader(user.header)
    setBiography(user.biography)
  })
  return (

    <Container className="user_info" fluid>
      <Row className="nx-0 px-0">
        <Container className="icon_and_name">
          <Row><Image className="my_icon" src={`${process.env.PUBLIC_URL}/${icon}`} roundedCircle /></Row>
          <Row><h5>{name}</h5></Row>
        </Container>
        <Row><Image className="my_header" src={`${process.env.PUBLIC_URL}/${header}`} fluid/></Row>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col><Link to="/user/edit" className="btn btn-right btn btn-outline-secondary">プロフィール編集</Link></Col>
        </Row>
      </Row>
      <Row>
        <Col></Col>
        <Col>{biography}</Col>
      </Row>
    </Container>
  );
}
export default UserInfo;
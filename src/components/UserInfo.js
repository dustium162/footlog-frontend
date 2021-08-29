import { Link } from 'react-router-dom';
import React,{useState,useEffect} from "react";

import {Container,Image,Row,Col,Button} from "react-bootstrap"

const UserInfo = ({user}) => {
  const [image,setImage] = useState("")
  const [name,setName] = useState("")
  const [header_image,setHeaderImage] = useState("")
  const [biography,setBiography] = useState("")

  useEffect(() => {
    setImage(user.image)
    setName(user.name)
    setHeaderImage(user.header_image)
    setBiography(user.biography)
  })
  return (

    <Container className="user_info" fluid>
      <Row className="nx-0 px-0">
        <Container className="icon_and_name">
          <Row><Image className="my_icon" src={`${process.env.PUBLIC_URL}/${image}`} roundedCircle /></Row>
          <Row><h5>{name}</h5></Row>
        </Container>
        <Row><Image className="my_header" src={`${process.env.PUBLIC_URL}/${header_image}`} fluid/></Row>
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
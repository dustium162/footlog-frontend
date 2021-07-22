import React from "react";

import {Container,Image,Row,Col,Button} from "react-bootstrap"

const UserInfo = ({user}) => {
  return (
    <Container className="user_info" fluid>
      <Row className="nx-0 px-0">
        <Container className="icon_and_name">
          <Row><Image className="my_icon" src={`${process.env.PUBLIC_URL}/${user.icon}`} roundedCircle /></Row>
          <Row><h5>{user.name}</h5></Row>
        </Container>
        <Row><Image className="my_header" src={`${process.env.PUBLIC_URL}/${user.header}`} fluid/></Row>
        <Row>
          {/* <Col></Col>
          <Col><SupportInfo /></Col> */}
          <Col><Button className="right" variant="outline-secondary">プロフィール編集</Button></Col>
        </Row>
      </Row>
      <Row>
        <Col></Col>
        <Col>{user.biography}</Col>
      </Row>
    </Container>
  );
}
export default UserInfo;
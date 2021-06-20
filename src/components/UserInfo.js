import React from "react";

import {Container,Image,Row,Col,Button} from "react-bootstrap"

const UserInfo = () => {
  return (
    <Container className="user_info" fluid>
      <Row>
        <Container className="icon_and_name">
          <Row><Image className="my_icon" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle /></Row>
          <Row><h5>user_name</h5></Row>
        </Container>
        <Row><Image className="my_header" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} fluid/></Row>
        <Row>
          {/* <Col></Col>
          <Col><SupportInfo /></Col> */}
          <Col><Button className="right" variant="outline-secondary">プロフィール編集</Button></Col>
        </Row>
      </Row>
    </Container>
  );
}
export default UserInfo;
import React from "react";

import {Container,Image,Row,Col,Button} from "react-bootstrap"

import SupportInfo from "./SupportInfo"

const UserInfo = () => {
  return (
    <Container fluid>
     <div className="icon_and_name">
        <Image className="my_icon" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
        {/* <h5>user_name</h5> */}
        <h5>dustium162</h5>
      </div>
      <Row><Image className="my_header" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} fluid/></Row>
      <Row>
        <Col></Col>
        <Col><SupportInfo /></Col>
        <Col><Button className="right" variant="outline-secondary">プロフィール編集</Button></Col>
      </Row>
    </Container>
  );
}
export default UserInfo;
import React from "react";

import {Container,Image,Row,Col,Button} from "react-bootstrap"

const UserInfo = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Image className="emblem" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
        </Col>
        <Col>
          <Row><h6>○勝○敗○分</h6></Row>
          <Row><h6>初観戦:○年</h6></Row>
          <Row><h6>最近の観戦:○年</h6></Row>
        </Col>
      </Row>
      <Row>
        <Col>このサービスを開発しています！footlogをご利用いただき、ありがとうございます。</Col>
      </Row>
    </Container>
  );
}
export default UserInfo;
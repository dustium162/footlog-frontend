import React from "react";

import {Container,Image,Row,Col,Button} from "react-bootstrap"

export default class UserInfo extends React.Component {
  // constructor() {
  //   super();
  // }
  render() {
    return (
      <Container fluid>
        <Row className="box">
          <Col id="for_user_header">
            <Image className="user_header" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} fluid />
            <div className="user_icon_and_name">
              <Image className="user_icon" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
              <h5>user_name</h5>
            </div>
          </Col>
        </Row>
        <Col className="text-right">
          <Button className="pull-right">
            プロフィール編集
          </Button>
        </Col>
        <h5>support_info</h5>
        <h5>bio</h5>
      </Container>
    );
  }
}
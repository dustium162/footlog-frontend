import React from "react";

import {Container,Image,Row,Col,Button} from "react-bootstrap"

export default class UserInfo extends React.Component {
  // constructor() {
  //   super();
  // }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Image src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} fluid />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <Image src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
          </Col>
        </Row>
        <h5>user_name</h5>
        <Button>
          <h5>user_imfo_edit</h5>
        </Button>
        <h5>support_info</h5>
        <h5>bio</h5>
      </Container>
    );
  }
}
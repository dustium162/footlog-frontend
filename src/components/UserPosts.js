import React from "react";

import {Container,Image,Row,Col,Button} from "react-bootstrap"
import PostInfo from "./PostInfo";

const UserPosts = () => {
  return (
    <Container>
        <Row xs={1} md={2} className="g-2">
          {/* <Col><MatchInfo /></Col> */}
          <Col><PostInfo /></Col>
          <Col><PostInfo /></Col>
          <Col><PostInfo /></Col>
          <Col><PostInfo /></Col>
        </Row>
    </Container >
  );
}

export default UserPosts;

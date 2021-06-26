import React from "react";

import {Row,Col} from "react-bootstrap"
import PostInfo from "./PostInfo";

const UserPosts = () => {
  return (
    <Row xs={1} md={2} className="g-2">
      {/* <Col><MatchInfo /></Col> */}
      <Col><PostInfo /></Col>
      <Col><PostInfo /></Col>
      <Col><PostInfo /></Col>
      <Col><PostInfo /></Col>
    </Row>
  );
}

export default UserPosts;

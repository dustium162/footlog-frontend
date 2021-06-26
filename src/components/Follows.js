import React from "react";
import FollowingUser from "./FollowingUser";

import {Row,Col} from "react-bootstrap"

const Follow = () => {
  return (
    <Row md={2} className="g-2">
      <Col><FollowingUser /></Col>
      <Col><FollowingUser /></Col>
      <Col><FollowingUser /></Col>
      <Col><FollowingUser /></Col>
    </Row>
  )
}
export default Follow;
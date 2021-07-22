import React from "react";

import {Row,Col} from "react-bootstrap"
import PostInfo from "./PostInfo";

const UserPosts = ({posts_info}) => {
  return (
    <Row xs={1} md={2} className="g-2">
      {posts_info.map(post_info => {
        return (
          <Col><PostInfo post_info={post_info}/></Col>
        )
      })}
    </Row>
  );
}

export default UserPosts;

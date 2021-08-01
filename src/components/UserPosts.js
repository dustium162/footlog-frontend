import React from "react";

import {Row,Col} from "react-bootstrap"
import PostInfo from "./PostInfo";

const UserPosts = ({posts_info}) => {
  console.log(posts_info)
  return (
    <Row xs={1} md={2} className="g-2">
      {Object.keys(posts_info).map(post_id => (
        <Col key={post_id}>
          <PostInfo post_info={posts_info[post_id]}/>
        </Col>
      ))}
    </Row>
  );
}  

export default UserPosts;


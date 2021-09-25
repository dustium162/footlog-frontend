import React from "react";

import {Container,Row,Col,Tabs,Tab} from "react-bootstrap"

import UserPosts from "./UserPosts"
import Follows from "./Follows"
import Followers from "./Followers"
import Accomplishments from "./Accomplishments"

const UserPostTabs = ({posts_info}) => {
  return (
    <Container>
      <Row>
        <Col>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="posts" title="">
            <UserPosts posts_info={posts_info}/>
          </Tab>
          <Tab eventKey="accomplishments" title="実績">
            <Accomplishments />
          </Tab>
          <Tab eventKey="accomplishments" title="実績">
            <Accomplishments />
          </Tab>
          <Tab eventKey="accomplishments" title="実績">
            <Accomplishments />
          </Tab>
        </Tabs>
        </Col>
      </Row>
    </Container>
    );
}
export default UserPostTabs;

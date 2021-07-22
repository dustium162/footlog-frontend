import React from "react";

import {Container,Row,Col,Tabs,Tab} from "react-bootstrap"

import UserPosts from "../components/UserPosts"
import Follows from "../components/Follows"
import Followers from "../components/Followers"
import Accomplishments from "../components/Accomplishments"

const UserTabs = ({posts_info}) => {
  return (
    <Container>
      <Row>
        <Col>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="posts" title="観戦記録">
            <UserPosts posts_info={posts_info}/>
          </Tab>
          <Tab eventKey="follow" title="フォロー">
            <Follows />
          </Tab>
          <Tab eventKey="followers" title="フォロワー">
            <Followers />
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
export default UserTabs;

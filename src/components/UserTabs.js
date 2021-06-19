import React from "react";

import {Tabs,Tab} from "react-bootstrap"

import UserPosts from "../components/UserPosts"
import Follows from "../components/Follows"
import Followers from "../components/Followers"
import Accomplishments from "../components/Accomplishments"

export default class UserTabs extends React.Component {
  // constructor() {
  //   super();
  // }
  render() {
    return (
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="posts" title="観戦記録">
          <UserPosts />
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
    );
  }
}
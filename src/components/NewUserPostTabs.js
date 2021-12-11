import React,{useState} from "react";

import {Tab, Nav} from "react-bootstrap"
import axios from "axios"
import NewUserPosts from "./NewUserPosts"

const NewUserPostTabs = () => {
  const [postType,setPostType] = useState(1);
  const [onsiteSelected, setOnsiteSelected] = useState(true);
  const [onlineSelected, setOnlineSelected] = useState(false);
  const [notWatchingSelected, setNotWatchingSelected] = useState(false);
  const [forgetSelected, setForgetSelected] = useState(false);

  const handlePostType = (postType) => {
    setPostType(postType);
    if(postType === 1) {
      setOnsiteSelected(true);
      setOnlineSelected(false);
      setNotWatchingSelected(false);
      setForgetSelected(false);
    } else if(postType === 2) {
      setOnsiteSelected(false);
      setOnlineSelected(true);
      setNotWatchingSelected(false);
      setForgetSelected(false);
    } else if(postType === 3) {
      setOnsiteSelected(false);
      setOnlineSelected(false);
      setNotWatchingSelected(true);
      setForgetSelected(false);
    } else if(postType === 4) {
      setOnsiteSelected(false);
      setOnlineSelected(false);
      setNotWatchingSelected(false);
      setForgetSelected(true);
    }
  };

  // const [matchType,setMatchType] = useState("onsite")
  return (
    //onSelectでmatchTypeを変更すれば良い？そうするとNewUserPostsのuseEffectが発火するように出来ると思う。
    // それよりも、Tab.Paneの中(NewUserPosts)をタブ選択時に初めてレンダリングさせるようにできれば良いんだけど。
    <Tab.Container id="left-tabs-example" defaultActiveKey="onsite">
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="onsite" className="px-2 small text-muted" onClick={() => {handlePostType(1)}} >現地観戦</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="online" className="px-2 small text-muted" onClick={() => {handlePostType(2)}} >オンライン</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="notWatching" className="px-2 small text-muted" onClick={() => {handlePostType(3)}} >観てない</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="forget" className="px-2 small text-muted" onClick={() => {handlePostType(4)}} >忘れた</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="onsite" className="py-3">
          <NewUserPosts postType={1} isSelected={onsiteSelected} />
        </Tab.Pane>
        <Tab.Pane eventKey="online" className="py-3">
          <NewUserPosts postType={2} isSelected={onlineSelected} />
        </Tab.Pane>
        <Tab.Pane eventKey="notWatching" className="py-3">
          <NewUserPosts postType={3} isSelected={notWatchingSelected} />
        </Tab.Pane>
        <Tab.Pane eventKey="forget" className="py-3">
          <NewUserPosts postType={4} isSelected={forgetSelected} />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
    );
}
export default NewUserPostTabs;

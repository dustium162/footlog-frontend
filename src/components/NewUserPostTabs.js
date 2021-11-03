import React,{useState} from "react";

import {Tab, Nav} from "react-bootstrap"
import axios from "axios"
import NewUserPosts from "./NewUserPosts"

// import Follows from "./Follows"
// import Followers from "./Followers"
// import Accomplishments from "./Accomplishments"

const NewUserPostTabs = () => {
  const [postType,setPostType] = useState(1)
  const [displayNone,setDisplayNone] = useState([false,false,false,false])
  const handlePostType = (postType) => {
    setPostType(postType)
    if (postType === 1) {
      setDisplayNone([false,true,true,true])
    } else if (postType === 2) {
      setDisplayNone([true,false,true,true])
    } else if (postType === 3) {
      setDisplayNone([true,true,false,true])
    } else if (postType === 4) {
      setDisplayNone([true,true,true,false])
    }
  }

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
          <NewUserPosts postType={postType} displayNone={displayNone[0]}/>
        </Tab.Pane>
        <Tab.Pane eventKey="online" className="py-3">
          <NewUserPosts postType={postType} displayNone={displayNone[1]}/>
        </Tab.Pane>
        <Tab.Pane eventKey="notWatching" className="py-3">
          <NewUserPosts postType={postType} displayNone={displayNone[2]}/>
        </Tab.Pane>
        <Tab.Pane eventKey="forget" className="py-3">
          <NewUserPosts postType={postType} displayNone={displayNone[3]}/>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
    );
}
export default NewUserPostTabs;

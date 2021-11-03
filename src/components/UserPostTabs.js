import React,{useState} from "react";

import {Tab, Nav} from "react-bootstrap"
import axios from "axios"
import UserPosts from "./UserPosts"

// import Follows from "./Follows"
// import Followers from "./Followers"
// import Accomplishments from "./Accomplishments"

const UserPostTabs = () => {
// const UserPostTabs = ({posts}) => {
  const [onsitePosts,setOnsitePosts] = useState([])
  const [hasMoreOnsitePosts,setHasMoreOnsitePosts] = useState(true)
  const loadMoreOnsitePosts = async (page) => {
    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/posts/index/1?page=${page}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    });
    const data = response.data
    if (data.length < 1) {
      setHasMoreOnsitePosts(false);
      return;
    }
    setOnsitePosts([...onsitePosts,...data])
  }


  const [onlinePosts,setOnlinePosts] = useState([])
  const [hasMoreOnlinePosts,setHasMoreOnlinePosts] = useState(true)
  const loadMoreOnlinePosts = async (page) => {
    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/posts/index/2?page=${page}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    });
    const data = response.data
    if (data.length < 1) {
      setHasMoreOnlinePosts(false);
      return;
    }
    setOnlinePosts([...onlinePosts,...data])
  }

  const [forgetPosts,setForgetPosts] = useState([])
  const [hasMoreForgetPosts,setHasMoreForgetPosts] = useState(true)
  const loadMoreForgetPosts = async (page) => {
    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/posts/index/3?page=${page}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    });
    const data = response.data
    if (data.length < 1) {
      setHasMoreForgetPosts(false);
      return;
    }
    setForgetPosts([...forgetPosts,...data])
  }

  const [notWatchingPosts,setNotWatchingPosts] = useState([])
  const [hasMoreNotWatchingPosts,setHasMoreNotWatchingPosts] = useState(true)
  const loadMoreNotWatchingPosts = async (page) => {
    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/posts/index/4?page=${page}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    });
    const data = response.data
    if (data.length < 1) {
      setHasMoreNotWatchingPosts(false);
      return;
    }
    setOnlinePosts([...notWatchingPosts,...data])
  }

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="onsite">
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="onsite" className="px-2 small text-muted">現地観戦</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="online" className="px-2 small text-muted">オンライン</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="notWatching" className="px-2 small text-muted">観てない</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="forget" className="px-2 small text-muted">忘れた</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="onsite" className="py-3">
          <UserPosts posts={onsitePosts} postType={1} setPosts={setOnsitePosts} hasMore={hasMoreOnsitePosts} setHasMore={setHasMoreOnsitePosts} loadMore={loadMoreOnsitePosts}/>
        </Tab.Pane>
        <Tab.Pane eventKey="online" className="py-3">
          <UserPosts posts={onlinePosts} postType={2} setPosts={setOnlinePosts} hasMore={hasMoreOnlinePosts} setHasMore={setHasMoreOnlinePosts} loadMore={loadMoreOnlinePosts}/>
        </Tab.Pane>
        <Tab.Pane eventKey="notWatching" className="py-3">
          <UserPosts posts={notWatchingPosts} postType={3} setPosts={setNotWatchingPosts} hasMore={hasMoreNotWatchingPosts} setHasMore={setHasMoreNotWatchingPosts} loadMore={loadMoreNotWatchingPosts}/>
        </Tab.Pane>
        <Tab.Pane eventKey="forget" className="py-3">
          <UserPosts posts={forgetPosts} postType={4} setPosts={setForgetPosts} hasMore={hasMoreForgetPosts} setHasMore={setHasMoreForgetPosts} loadMore={loadMoreForgetPosts}/>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
    );
}
export default UserPostTabs;

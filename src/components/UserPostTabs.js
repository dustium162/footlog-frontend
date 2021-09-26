import React,{useState} from "react";

import {Tabs,Tab} from "react-bootstrap"
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
      setHasMoreOnlinePosts(false);
      return;
    }
    setOnlinePosts([...onlinePosts,...data])
  }

  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="onsite" title="現地観戦">
        <UserPosts posts={onsitePosts} postType={1} setPosts={setOnsitePosts} hasMore={hasMoreOnsitePosts} setHasMore={setHasMoreOnsitePosts} loadMore={loadMoreOnsitePosts}/>
        {/* <UserPosts posts={onsitePosts} hasMoreOnsitePosts={hasMoreOnsitePosts} loadMoreOnsitePosts={loadMoreOnsitePosts}/> */}
      </Tab>
      <Tab eventKey="online" title="オンライン観戦">
        <UserPosts posts={onlinePosts} postType={2} setPosts={setOnlinePosts} hasMore={hasMoreOnlinePosts} setHasMore={setHasMoreOnlinePosts} loadMore={loadMoreOnlinePosts}/>
        {/* <UserPosts posts={onlinePosts} hasMoreOnlinePosts={hasMoreOnlinePosts} loadMoreOnlinePosts={loadMoreOnlinePosts}/> */}
      </Tab>
      <Tab eventKey="forget" title="忘れた">
        <UserPosts posts={forgetPosts} postType={3} setPosts={setForgetPosts} hasMore={hasMoreForgetPosts} setHasMore={setHasMoreForgetPosts} loadMore={loadMoreForgetPosts}/>
        {/* <UserPosts posts={forgetPosts} hasMoreForgetPosts={hasMoreForgetPosts} loadMoreForgetPosts={loadMoreForgetPosts}/> */}
      </Tab>
      <Tab eventKey="not_watching" title="観戦していない">
        <UserPosts posts={notWatchingPosts} postType={4} setPosts={setNotWatchingPosts} hasMore={hasMoreNotWatchingPosts} setHasMore={setHasMoreNotWatchingPosts} loadMore={loadMoreNotWatchingPosts}/>
        {/* <UserPosts posts={notWatchingPosts} hasMoreNotWatchingPosts={hasMoreNotWatchingPosts} loadMoreNotWatchingPosts={loadMoreNotWatchingPosts}/> */}
      </Tab>
      {/* <Tab eventKey="accomplishments" title="実績">
        <Accomplishments />
      </Tab> */}
    </Tabs>
    );
}
export default UserPostTabs;

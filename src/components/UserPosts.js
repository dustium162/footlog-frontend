import React,{useEffect} from "react";
import InfiniteScroll from "react-infinite-scroller"
import {Row,Col, Spinner} from "react-bootstrap"
import axios from "axios"
import PostCard from "./PostCard";

const UserPosts = ({posts,postType,setPosts,hasMore,loadMore}) => {

  const loader =  <Spinner animation="border" variant="danger" />
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts/index/${postType}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    // apiのJsonの形式を検討する必要あり(2021-07-19 浦郷)
    .then(response => response.data)
    .then(data => setPosts(data))
    }
  ,[])
  return (
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader} pageStart={1}>
        {posts.map(post => (
            <PostCard post={post}/>
        ))}
    </InfiniteScroll>
  );
}  

export default UserPosts;


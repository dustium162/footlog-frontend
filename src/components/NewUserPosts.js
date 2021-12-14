import React,{useState,useEffect} from "react";
import InfiniteScroll from "react-infinite-scroller"
import { Spinner } from "react-bootstrap"
import axios from "axios"
import PostCard from "./PostCard";
import {TransitionMotion,spring} from "react-motion"

const NewUserPosts = ({postType, isSelected}) => {
  // console.log(String(postType) + String(isSelected));
  const [posts,setPosts] = useState([])
  const [hasMore,setHasMore] = useState(true)
  const loadMore = async (page) => {
    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/posts/index/${postType}?page=${page}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    });
    const data = response.data
    if (data.length < 1) {
      setHasMore(false);
      return;
    }
    setPosts([...posts,...data])
  }

  const loader =  <Spinner key={0} animation="border" variant="danger" />
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
  ,[isSelected])

  const willLeave = () => {
    return {height: spring(0)}
  }

  const onClickEdit = (post_id) => {
    const arr = []
    posts.map(post => {
      if (post.id !== post_id) {
        arr.push(post)
      }
    })
    setPosts(arr)
  }

  if(isSelected){
    return (
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader} pageStart={1}>
        <TransitionMotion
          styles={
            posts.map(post => (
              {key: post.id, data: post,style:{height: post.match.height}}
              ))
            }
            willLeave={willLeave}
            >
          {interpolatingStyles =>
            <>
              {interpolatingStyles.length !== 0 ?
                interpolatingStyles.map((interpolatingStyle, index) => {
                  return (
                    <PostCard key={index} post={interpolatingStyle} onClickEdit={onClickEdit}/>
                    )
                  })
                  :
                  <div className="my-2 text-center bg-light rounded border py-3">
                  この区分の観戦記録はありません
                </div>
              }
            </>
          }
        </TransitionMotion>
      </InfiniteScroll>
    );  
  } else {
    return '';
  }
}

export default NewUserPosts;


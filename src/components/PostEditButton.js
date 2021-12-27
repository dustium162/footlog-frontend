import React from "react"

import {Button} from "react-bootstrap"
import axios from "axios"

import {ReactComponent as Onsite} from '../images/onsite.svg';
import {ReactComponent as Online} from '../images/online.svg';
import {ReactComponent as NotWatching} from '../images/notwatching.svg';
import {ReactComponent as Forget} from '../images/forget.svg';

const PostEditButton = ({post_id,msg,postType,handleEditClose,is_selected,color,is_opponent_text_black}) => {
  const postTypeIcon = (postType,is_selected) => {
    if (postType === 1) {
      return <Onsite style={{width: "30px", height: "30px"}} fill={is_selected === "true" ? color : "gray"} stroke={is_selected === "true" && (is_opponent_text_black ? "black" : "none")}/>
    } else if (postType === 2) {
      return <Online style={{width: "30px", height: "30px"}} fill={is_selected === "true" ? color : "gray"} stroke={is_selected === "true" && is_opponent_text_black ? "black" : "none"}/>
    } else if (postType === 3) {
      return <NotWatching style={{width: "30px", height: "30px"}} fill={is_selected === "true" ? color : "gray"} stroke={is_selected === "true" && is_opponent_text_black ? "black" : "none"}/>
    } else {
      return <Forget style={{width: "30px", height: "30px"}} fill={is_selected === "true" ? color : "gray"} stroke={is_selected === "true" && is_opponent_text_black ? "black" : "none"}/>
    }
  } 
  const editPost = () => {
    axios.patch(`http://localhost:3000/v1/posts/${post_id}`,
    {
      post_type: postType,
    },
    {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      },
    })
    .then(() => handleEditClose(postType))
    .catch(error => console.log(error))
  }
  return (
    <Button variant="link text-secondary button_link" type="submit" onClick={editPost}>
      {postTypeIcon(postType,is_selected)}
      <p>{msg}</p>
    </Button>
  )
}
export default PostEditButton;

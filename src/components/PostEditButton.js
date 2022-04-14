import React from 'react'

import {Button} from 'react-bootstrap'
import axios from 'axios'

import {ReactComponent as Onsite} from '../images/onsite.svg';
import {ReactComponent as Online} from '../images/online.svg';
import {ReactComponent as NotWatching} from '../images/notwatching.svg';
import {ReactComponent as Forget} from '../images/forget.svg';

const PostEditButton = ({postId,msg,postType,handleEditClose,isSelected,color,isTextBlack}) => {
  const postTypeIcon = (postType,isSelected) => {
    if (postType === 1) {
      return <Onsite style={{width: "40px", height: "40px"}} fill={isSelected ? color : "gray"} stroke={(isSelected && isTextBlack) ? "gray" : "none"} strokeWidth="10"/>
    } else if (postType === 2) {
      return <Online style={{width: "40px", height: "40px"}} fill={isSelected ? color : "gray"} stroke={(isSelected && isTextBlack) ? "gray" : "none"} strokeWidth="10"/>
    } else if (postType === 3) {
      return <NotWatching style={{width: "40px", height: "40px"}} fill={isSelected ? color : "gray"} stroke={(isSelected && isTextBlack) ? "gray" : "none"} strokeWidth="10"/>
    } else {
      return <Forget style={{width: "40px", height: "40px"}} fill={isSelected ? color : "gray"} stroke={(isSelected && isTextBlack) ? "gray" : "none"} strokeWidth="10"/>
    }
  } 
  const editPost = () => {
    axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/posts/${postId}`,
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
      {postTypeIcon(postType,isSelected)}
      <div className="small">{msg}</div>
    </Button>
  )
}
export default PostEditButton;

import React from "react"

import {Button,Image} from "react-bootstrap"
import axios from "axios"

const PostEditButton = ({post_id,img_src,msg,post_type,onClickEdit,handleEditClose}) => {
  const editPost = () => {
    axios.patch(`http://localhost:3000/v1/posts/${post_id}`,
    {
      post_type: post_type,
    },
    {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      },
    })
    .then(() => onClickEdit(post_id))
    .then(() => handleEditClose())
    .catch(error => console.log(error))
  }
  return (
    <Button variant="link text-secondary button_link" type="submit" onClick={editPost}>
      <Image className="emblem" src={`${process.env.PUBLIC_URL}/${img_src}.png`} roundedCircle />
      <p>{msg}</p>
    </Button>
  )
}
export default PostEditButton;

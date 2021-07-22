import React from "react"

import {Button,Image} from "react-bootstrap"
import axios from "axios"

const PostButton = (match_id) => {
  const src = match_id.img_src
  const msg = match_id.msg
  const createPost = () => {
    axios.post("http://localhost:3000/v1/posts",{
      match_id: match_id.match_id,
      // user_id: user_id,
      post_type: 3,
    })
    // .then(response => setUser[...user,])
    .catch(error => console.log(error))
  }
  return (
    <Button variant="link text-secondary button_link" type="submit" onClick={createPost}>
      <Image className="emblem" src={`${process.env.PUBLIC_URL}/${src}.png`} roundedCircle />
      <p>{msg}</p>
    </Button>
  )
}
export default PostButton;

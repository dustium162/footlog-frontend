import React from "react"

import {Button,Image} from "react-bootstrap"
import axios from "axios"

const PostButton = (match_id) => {
  const createPost = (is_post) => {
    if (is_post === "true") {
      axios.post("http://localhost:3000/v1/posts",{
        match_id: match_id.match_id,
        user_id: JSON.parse(localStorage.currentUser).id,
        post_type: match_id.post_type,
      })
      .catch(error => console.log(error))
    } else {
      // posts/editの内容を書く
    }
  }
  return (
    <Button variant="link text-secondary button_link" type="submit" onClick={createPost(match_id.is_post)}>
      <Image className="emblem" src={`${process.env.PUBLIC_URL}/${match_id.img_src}.png`} roundedCircle />
      <p>{match_id.msg}</p>
    </Button>
  )
}
export default PostButton;

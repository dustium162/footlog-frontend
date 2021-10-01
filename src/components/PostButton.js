import React from "react"

import {Button,Image} from "react-bootstrap"
import axios from "axios"

const PostButton = ({match_team_property_id, match_id,img_src, msg, post_type,onClickPost,handleClose}) => {
  const createPost = () => {
      axios.post(`${process.env.REACT_APP_API_ENDPOINT}/posts`,
      {
        match_team_property_id: match_team_property_id,
        user_id: JSON.parse(localStorage.currentUser).id,
        post_type: post_type,
      },
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      },
      )
      .then(response => response.data)
      .then(data => { onClickPost(match_id) })
      .then(data => handleClose())
      .catch(error => console.log(error))
  }
  return (
    <Button variant="link text-secondary button_link" type="submit" onClick={createPost}>
      <Image className="emblem" src={`${process.env.PUBLIC_URL}/${img_src}.png`} roundedCircle />
      <p>{msg}</p>
    </Button>
  )
}
export default PostButton;

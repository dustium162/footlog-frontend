import React from 'react'

import {Button} from 'react-bootstrap'
import axios from 'axios'

import {ReactComponent as Onsite} from '../images/onsite.svg';
import {ReactComponent as Online} from '../images/online.svg';
import {ReactComponent as NotWatching} from '../images/notwatching.svg';
import {ReactComponent as Forget} from '../images/forget.svg';

const PostButton = ({match_team_property_id, match_id, msg, postType,onClickPost}) => {
  const postTypeIcon = (postType) => {
    if (postType === 1) {
      return <Onsite fill="#505050" style={{width: "30px", height: "30px"}}/>
    } else if (postType === 2) {
      return <Online fill="#505050" style={{width: "30px", height: "30px"}}/>
    } else if (postType === 3) {
      return <NotWatching fill="#505050" style={{width: "30px", height: "30px"}}/>
    } else {
      return <Forget fill="#505050" style={{width: "30px", height: "30px"}}/>
    }
  } 
  const createPost = () => {
      axios.post(`${process.env.REACT_APP_API_ENDPOINT}/posts`,
      {
        match_team_property_id: match_team_property_id,
        user_id: JSON.parse(localStorage.currentUser).id,
        post_type: postType,
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
      .then(() => { onClickPost(match_id) })
      .catch(error => console.log(error))
  }
  return (
    <Button variant="link text-secondary button_link" className="px-0" type="submit" onClick={createPost}>
      {postTypeIcon(postType)}
      <div className="small">{msg}</div>
    </Button>
  )
}
export default PostButton;

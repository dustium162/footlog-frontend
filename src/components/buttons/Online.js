import {Button ,Image} from "react-bootstrap"

import axios from "axios"

const Online = (match_id) => {
  const createPost = () => {
    axios.post("http://localhost:3000/v1/posts",{
      match_id: match_id.match_id,
      // user_id: user_id,
      post_type: 2,
    })
    // .then(response => setUser[...user,])
    .catch(error => console.log(error))
  }
  return (
    <Button variant="link text-secondary button_link" type="submit" onClick={createPost}>
      <Image className="emblem" src={`${process.env.PUBLIC_URL}/monitor.png`} roundedCircle />
      <p>オンライン</p>
    </Button>

  )
}
export default Online;
import {Button ,Image} from "react-bootstrap"

import axios from "axios"

const Stadium = (match_id) => {
  const createPost = () => {
    axios.post("http://localhost:3000/v1/posts",{
      match_id: match_id.match_id,
      // user_id: user_id,
      post_type: 1,
    })
    // .then(response => setUser[...user,])
    .catch(error => console.log(error))
  }
  return (
    <Button variant="link text-secondary button_link" type="submit" onClick={createPost}>
      <Image className="emblem" src={`${process.env.PUBLIC_URL}/stadium.png`} roundedCircle />
    <p>現地観戦</p>
    </Button>

  )
}
export default Stadium;
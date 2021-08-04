import {useState} from "react"
import {Row,Col,Button,Image,Modal} from "react-bootstrap"
import axios from "axios"
import PostButton from "./PostButton"
const PostEditButton = (post_info) => {
  const [editShow,setEditShow] = useState(false);
  const handleEditShow = () => setEditShow(true);
  const handleEditClose = () => setEditShow(false);

  const editPost = () => {
  //   // axios.post("http://localhost:3000/v1/posts",{
  //   //   match_id: match_id.match_id,
  //   //   user_id: JSON.parse(localStorage.currentUser).id,
  //   //   post_type: match_id.post_type,
  //   })
  //   .catch(error => console.log(error))
  }

  return (
    <Row>
    <Button variant="link text-secondary button_link" type="submit" onClick={handleEditShow}>
      <Image className="emblem" src={`${process.env.PUBLIC_URL}/${post_info.img_src}.png`} />
      <p>{post_info.msg}</p>
    </Button>
    <Modal show={editShow} onHide={handleEditClose}>
      <Modal.Header closeButton>
        <Modal.Title>投稿の編集</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Row>
        <Col><PostButton post_id ={post_info.post_info.post_id} img_src="forget" msg="覚えていない" post_type="4" is_post="false" /></Col>
        <Col><PostButton post_id ={post_info.post_info.post_id} img_src="pass" msg="観ていない" post_type="3" is_post="false" /></Col>
        <Col><PostButton post_id ={post_info.post_info.post_id} img_src="monitor" msg="オンライン" post_type="2" is_post="false" /></Col>
        <Col><PostButton post_id ={post_info.post_info.post_id} img_src="stadium" msg="現地観戦" post_type="1" is_post="false" /></Col>
      </Row>
      </Modal.Body>
    </Modal>
    </Row>
  )
}
export default PostEditButton;

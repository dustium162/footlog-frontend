import React,{useState} from "react"
import {Row,Col,Card,Button,Modal} from "react-bootstrap"
import PostEditButton from "./PostEditButton"
import MatchInfo from "./MatchInfo"
import {ReactComponent as PostEdit} from '../images/post_edit.svg';

const PostCard = ({post}) => {
  const [editShow,setEditShow] = useState(false);
  const handleEditShow = () => setEditShow(true);
  const [postType,setPostType] = useState(post.post_type)
  const handleModalClose = () => setEditShow(false)
  const handleEditClose = (postType) => {
    setPostType(postType);
    setEditShow(false);
  }

  return (
    <Card>
      <MatchInfo match={post.match} postType={postType}/>
      <Card.Footer>
        <Row>
          <Button variant="link text-secondary button_link" type="submit" onClick={handleEditShow}>
            <PostEdit fill="#505050" style={{width: "30",height: "30"}}/>
            <div>投稿の編集</div>
          </Button>
        </Row>
      </Card.Footer>
      <Modal show={editShow} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>投稿の編集</Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
        </Modal.Header>
        <Modal.Body>
        <Row className="text-center">
          <Col className="px-0"><PostEditButton post_id ={post.id} msg="現地観戦" postType={1} setPostType={setPostType} handleEditClose={handleEditClose} is_selected={postType === 1 ? true : false} color={post.match.color_code} is_text_black={post.match.is_text_black}/></Col>
          <Col className="px-0"><PostEditButton post_id ={post.id} msg="オンライン" postType={2} setPostType={setPostType} handleEditClose={handleEditClose} is_selected={postType === 2 ? true : false} color={post.match.color_code} is_text_black={post.match.is_text_black}/></Col>
          <Col className="px-0"><PostEditButton post_id ={post.id} msg="観ていない" postType={3} setPostType={setPostType} handleEditClose={handleEditClose} is_selected={postType === 3 ? true : false} color={post.match.color_code} is_text_black={post.match.is_text_black}/></Col>
          <Col className="px-0"><PostEditButton post_id ={post.id} msg="忘れた" postType={4} setPostType={setPostType} handleEditClose={handleEditClose} is_selected={postType === 4 ? true : false} color={post.match.color_code} is_text_black={post.match.is_text_black}/></Col>
        </Row>
        </Modal.Body>
      </Modal>
    </Card>
  )
}
export default PostCard;
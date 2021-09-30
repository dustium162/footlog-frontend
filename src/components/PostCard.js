import React,{useState} from "react"
import {Row,Col,Card,Button,Image,Modal} from "react-bootstrap"
import PostEditButton from "./PostEditButton"
import MatchInfo from "./MatchInfo"

const PostCard = ({post}) => {
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editShow,setEditShow] = useState(false);
  const handleEditShow = () => setEditShow(true);
  const handleEditClose = () => setEditShow(false);

  return (
    <Card>
      <MatchInfo match={post.match} handleShow={handleShow}/>
      <Card.Footer>
      <Row>
        <Button variant="link text-secondary button_link" type="submit" onClick={handleEditShow}>
          <Image className="emblem" src={`${process.env.PUBLIC_URL}/post_edit.png`} />
          <p>投稿の編集</p>
        </Button>
        <Modal show={editShow} onHide={handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>投稿の編集</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Row>
            <Col><PostEditButton post_id ={post.post_id} img_src="forget" msg="覚えていない" post_type="4"/></Col>
            <Col><PostEditButton post_id ={post.post_id} img_src="pass" msg="観ていない" post_type="3"/></Col>
            <Col><PostEditButton post_id ={post.post_id} img_src="monitor" msg="オンライン" post_type="2"/></Col>
            <Col><PostEditButton post_id ={post.post_id} img_src="stadium" msg="現地観戦" post_type="1"/></Col>
          </Row>
          </Modal.Body>
        </Modal>
      </Row>
      </Card.Footer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>試合詳細</Modal.Title>
        </Modal.Header>
        <Modal.Body>ここに試合詳細情報を表示</Modal.Body>
      </Modal>
    </Card>
  )
}
export default PostCard;
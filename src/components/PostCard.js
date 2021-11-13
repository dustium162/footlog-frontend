import React,{useState} from "react"
import {Row,Col,Card,Button,Image,Modal} from "react-bootstrap"
import PostEditButton from "./PostEditButton"
import MatchInfo from "./MatchInfo"
import MatchDetaliModal from "./MatchDetailModal"

const PostCard = ({post,onClickEdit}) => {
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editShow,setEditShow] = useState(false);
  const handleEditShow = () => setEditShow(true);
  const handleEditClose = () => setEditShow(false);

  return (
    <div key={String(post.key)} style={{height: `${post.style.height}px`,overflow:'hidden'}}>
      <Card>
        <MatchInfo match={post.data.match} handleShow={handleShow}/>
        <Card.Footer>
        <Row>
          <Button variant="link text-secondary button_link" type="submit" onClick={handleEditShow}>
            <Image className="emblem" src={`${process.env.PUBLIC_URL}/post_edit.png`} />
            <div>投稿の編集</div>
          </Button>
        </Row>
        </Card.Footer>
        <Modal show={show} onHide={handleClose}>
          <MatchDetaliModal match={post.data.match} show={show} onHide={handleClose}/>
        </Modal>
        <Modal show={editShow} onHide={handleEditClose}>
          <Modal.Header>
            <Modal.Title>投稿の編集</Modal.Title>
            <button type="button" class="btn-close" aria-label="Close" onClick={handleEditClose}></button>
          </Modal.Header>
          <Modal.Body>
          <Row className="text-center">
            {post.data.post_type !== 1 && <Col><PostEditButton post_id ={post.data.id} img_src="stadium" msg="現地観戦" post_type="1" onClickEdit={onClickEdit} handleEditClose={handleEditClose}/></Col>}
            {post.data.post_type !== 2 && <Col><PostEditButton post_id ={post.data.id} img_src="monitor" msg="オンライン" post_type="2" onClickEdit={onClickEdit} handleEditClose={handleEditClose}/></Col>}
            {post.data.post_type !== 3 && <Col><PostEditButton post_id ={post.data.id} img_src="pass" msg="観ていない" post_type="3" onClickEdit={onClickEdit} handleEditClose={handleEditClose}/></Col>}
            {post.data.post_type !== 4 && <Col><PostEditButton post_id ={post.data.id} img_src="forget" msg="忘れた" post_type="4" onClickEdit={onClickEdit} handleEditClose={handleEditClose}/></Col>}
          </Row>
          </Modal.Body>
        </Modal>
      </Card>
    </div>
  )
}
export default PostCard;
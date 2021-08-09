import React,{useState} from "react"

import {Container,Row,Col,Card,Button,Image,Modal} from "react-bootstrap"

import PostEditButton from "./PostEditButton"

const PostInfo = ({post_info}) => {
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editShow,setEditShow] = useState(false);
  const handleEditShow = () => setEditShow(true);
  const handleEditClose = () => setEditShow(false);

  return (
    <Container>
      <Card>
        <Card.Header className="bg-info">
          <Row>
            <Col className="text-light">{post_info.home_or_away_or_neutral}</Col>
            <Col className="text-light">{post_info.date_time}</Col>
            <Col className="text-light">{post_info.title}</Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Row>
            <Col>{post_info.opponent_name}戦</Col>
            </Row>
          </Card.Title>
          <Card.Text>
            <Row>
              <Col>post_type：{post_info.post_type}</Col>
              <Col><p>観客数{post_info.mobilization}人</p></Col>
            </Row>
            <Row>
              <Col>
                  <Image className="emblem" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
              </Col>
              <Col><h1>{post_info.home_score} - {post_info.away_score}</h1></Col>
              <Col>
                <Button variant="link text-secondary button_link" onClick={handleShow}>
                  <Image className="emblem" src={`${process.env.PUBLIC_URL}/info.png`} roundedCircle />
                  <p>試合詳細</p>
                </Button>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
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
              <Col><PostEditButton post_id ={post_info.post_id} img_src="forget" msg="覚えていない" post_type="4"/></Col>
              <Col><PostEditButton post_id ={post_info.post_id} img_src="pass" msg="観ていない" post_type="3"/></Col>
              <Col><PostEditButton post_id ={post_info.post_id} img_src="monitor" msg="オンライン" post_type="2"/></Col>
              <Col><PostEditButton post_id ={post_info.post_id} img_src="stadium" msg="現地観戦" post_type="1"/></Col>
            </Row>
            </Modal.Body>
          </Modal>
        </Row>
        </Card.Footer>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>試合詳細</Modal.Title>
        </Modal.Header>
        <Modal.Body>ここに試合詳細情報を表示</Modal.Body>
      </Modal>
    </Container>
  )
}
export default PostInfo;
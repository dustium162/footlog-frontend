import React,{useState} from "react"

import {Container,Row,Col,Card,Button,Image,Modal} from "react-bootstrap"

const PostInfo = ({post_info}) => {
  console.log(post_info)
  const [show,setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
              <Col></Col>
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
          <h6>評価：★★★★☆</h6>
          <h6>(MVPや同伴者も載せたいが投稿ロジック的に...)</h6>
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
import React,{useState} from "react"

import {Container,Row,Col,Card,Button,Image,Modal} from "react-bootstrap"

const PostInfo = () => {
  const [show,setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container>
      <Card>
        <Card.Header className="bg-info">
          <Row>
            <Col className="text-light">Away</Col>
            <Col className="text-light">2021</Col>
            <Col className="text-light">J1第19節</Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col>柏レイソル戦</Col>
            </Row>
          </Card.Title>
          <Card.Text>
            <Row>
              <Col></Col>
              <Col><p>観客数3263人</p></Col>
            </Row>
            <Row>
              <Col>
                  <Image className="emblem" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
              </Col>
              <Col><h1>3 - 2</h1></Col>
              <Col>
                <Button variant="link text-secondary button_link" onClick={handleShow}>
                  <Image className="emblem" src={`${process.env.PUBLIC_URL}/question.png`} roundedCircle />
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
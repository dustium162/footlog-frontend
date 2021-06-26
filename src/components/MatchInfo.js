import React, {useState} from "react"

import {Image,Row,Col,Card,Button,Modal} from "react-bootstrap"
import PostButtons from "./PostButtons";


const MatchInfo = () => {
  const [show,setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card>
        <Card.Header className="bg-danger">
          <Row>
            <Col className="text-light">Home</Col>
            <Col className="text-light">2006</Col>
            <Col className="text-light">J1第34節</Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col>ガンバ大阪戦</Col>
            </Row>
          </Card.Title>
          <Card.Text>
            <Row>
              <Col></Col>
              <Col><p>観客数62241人</p></Col>
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
        <Card.Footer><PostButtons /></Card.Footer>
      </Card>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>試合詳細</Modal.Title>
      </Modal.Header>
      <Modal.Body>ここに試合詳細情報を表示</Modal.Body>
      <Modal.Footer><PostButtons /></Modal.Footer>
    </Modal>
    </div>
  )
}

export default MatchInfo;
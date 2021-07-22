import React, {useState} from "react"

import {Image,Row,Col,Card,Button,Modal} from "react-bootstrap"
import PostButton from "./PostButton";


const MatchInfo = (match) => {
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card>
        <Card.Header className="bg-danger">
          <Row>
            <Col className="text-light">{match.match.home_or_away}</Col>
            <Col className="text-light">{match.match.date}</Col>
            <Col className="text-light">{match.match.title}</Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col>{match.match.home_team.name}</Col>
            </Row>
          </Card.Title>
          {/* <Card.Text> */}
            <Row>
              <Col>
                  <Image className="emblem" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
              </Col>
              <Col><h1>{String(match.match.home_score)} - {String(match.match.away_score)}</h1></Col>
              <Col>
                <Button variant="link text-secondary button_link" onClick={handleShow}>
                  <Image className="emblem" src={`${process.env.PUBLIC_URL}/question.png`} roundedCircle />
                  <p>試合詳細</p>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col><p>観客数：{match.match.mobilization}人</p></Col>
            </Row>
          {/* </Card.Text> */}
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col><PostButton match_id={match.match_id} img_src="pass" msg="観ていない"/></Col>
            <Col><PostButton match_id={match.match_id} img_src="monitor" msg="オンライン"/></Col>
            <Col><PostButton match_id={match.match_id} img_src="stadium" msg="現地観戦"/></Col>
          </Row>
        </Card.Footer>
      </Card>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>試合詳細</Modal.Title>
      </Modal.Header>
      <Modal.Body>ここに試合詳細情報を表示</Modal.Body>
      <Modal.Footer>
        <Row>
          <Col><PostButton match_id={match.match_id} img_src="pass" msg="観ていない"/></Col>
          <Col><PostButton match_id={match.match_id} img_src="monitor" msg="オンライン"/></Col>
          <Col><PostButton match_id={match.match_id} img_src="stadium" msg="現地観戦"/></Col>
        </Row>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default MatchInfo;
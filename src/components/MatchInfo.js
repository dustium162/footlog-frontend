import React from "react"

import {Container,Image,Row,Col,Card,Button} from "react-bootstrap"

const MatchInfo = () => {
  return (
    <Container>
      <Row>
        <Col>Home</Col>
        <Col>観客数61214人</Col>
      </Row>
      <Row>
        <Col>ガンバ大阪戦</Col>
        <Col>3-2</Col>
      </Row>
      {/* mdは列の数っぽい */}
      <Col>
        <Card>
          <Card.Img variant="top"src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  )
}

export default MatchInfo;
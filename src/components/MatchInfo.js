import React from "react"

import {Container,Image,Row,Col,Card,Button} from "react-bootstrap"

const MatchInfo = () => {
  return (
    <Container>
      {/* mdは列の数っぽい */}
      <Col>
        <Card>
          <Card.Header className="bg-danger">
            <Row>
              <Col className="text-light">Home</Col>
              <Col className="text-light">J1第34節</Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <Row>
                <Col>
                  <Image className="emblem" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
                </Col>
                <Col>ガンバ大阪戦</Col>
              </Row>
            </Card.Title>
            <Card.Text>
              <Row>
                <Col>Home</Col>
                <Col>観客数61214人</Col>
              </Row>
              <Row>
                <Col></Col>
                <Col><h1>3 - 2</h1></Col>
                <Col></Col>
              </Row>
              <Button>見ていない</Button>
              <Button>オンラインで見た</Button>
              <Button>スタジアムで見た</Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  )
}

export default MatchInfo;
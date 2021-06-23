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
              <Col className="text-light">2006</Col>
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
                <Col>観客数62241人</Col>
              </Row>
              <Row>
                <Col></Col>
                <Col><h1>3 - 2</h1></Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="link">
                      <Image className="emblem" src={`${process.env.PUBLIC_URL}/stadium.png`} roundedCircle />
                  </Button>
                  <p>現地</p>
                </Col>
                <Col>
                  <Button variant="link">
                      <Image className="emblem" src={`${process.env.PUBLIC_URL}/monitor.png`} roundedCircle />
                  </Button>
                  <p>オンライン</p>
                </Col>
                <Col>
                  <Button variant="link">
                      <Image className="emblem" src={`${process.env.PUBLIC_URL}/pass.png`} roundedCircle />
                  </Button>
                  <p>観ていない</p>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  )
}

export default MatchInfo;
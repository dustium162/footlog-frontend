import React from "react"

import {Card,Row,Col,Image,Button} from "react-bootstrap"

const FollowingUser = () => {
  return (
    <Card>
      <Row>
        <Col>
          <Image className="emblem" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
        </Col>
        <Col><p>super user</p></Col>
        <Col></Col>
        <Col><p className="text-secondary">ID:1</p></Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <Button variant="secondary">フォローする</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="secondary">フォローを外す</Button>
            </Col>
          </Row>
        </Col>
        <Col>
        <p>
        世界中のサッカーの試合を全て観戦しています。私自身、プロサッカー選手であり、個人としてはバロ...
        </p>
        </Col>
      </Row>
    </Card>
  )
}
export default FollowingUser;
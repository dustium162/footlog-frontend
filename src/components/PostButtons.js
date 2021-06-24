import React from "react"

import {Container,Image,Row,Col,Card,Button,Modal} from "react-bootstrap"


const PostButtons = () => {
  return (
      <Row>
        <Col>
          <Button variant="link text-secondary button_link">
            <Image className="emblem" src={`${process.env.PUBLIC_URL}/pass.png`} roundedCircle />
            <p>観ていない</p>
          </Button>
        </Col>
        <Col>
          <Button variant="link text-secondary button_link">
            <Image className="emblem" src={`${process.env.PUBLIC_URL}/monitor.png`} roundedCircle />
            <p>オンライン</p>
          </Button>
        </Col>
        <Col>
          <Button variant="link text-secondary button_link">
            <Image className="emblem" src={`${process.env.PUBLIC_URL}/stadium.png`} roundedCircle />
            <p>現地観戦！</p>
          </Button>
        </Col>
       </Row>
  )
}

export default PostButtons;
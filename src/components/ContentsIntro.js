import React from 'react';

import {Container,Image,Row,Col,Button,Carousel} from "react-bootstrap"

const ContentsIntro = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
        <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/top1.jpg`}
            alt="First slide"
            />
          <Carousel.Caption>
            <p>勝率はもちろん</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/top2.jpg`}
            alt="Second slide"
            />
          <Carousel.Caption>
            <p>クラブ別の対戦成績や</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/top3.jpg`}
            alt="Second slide"
            />
          <Carousel.Caption>
            <p>得失点マップなど...</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
export default ContentsIntro;

import React from 'react';

import {Container,Image,Row,Col,Button,Carousel} from "react-bootstrap"

const HowtoUse = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
        <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/top2.jpg`}
            alt="First slide"
          />
          <Carousel.Caption>
            <p>①観戦した試合を見つけて、「記録」ボタンを押します。</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/top3.jpg`}
            alt="Second slide"
          />
          <Carousel.Caption>
            <p>②あなたの観戦記録が積み重なり、あなただけのジンクスや、メモリアルゴールがわかります。</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
export default HowtoUse;

import React from 'react';

import {Container,Image,Row,Col,Button,Carousel} from "react-bootstrap"

const HowtoUse = () => {
  return (
    <Container>
      <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/top2.jpg`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>①観戦した試合を見つけて、「記録」ボタンを押します。</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/top3.jpg`}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>②あなたの観戦記録が積み重なり、あなただけのジンクスや、メモリアルゴールがわかります。</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
export default HowtoUse;

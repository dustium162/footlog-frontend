import React from 'react';

import {Container,Image,Row,Col,Button,Carousel} from "react-bootstrap"

const ContentsIntro = () => {
  return (
    <Container>
      <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/top1.jpg`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>勝率はもちろん</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/top2.jpg`}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>クラブ別の対戦成績や</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/top3.jpg`}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>得失点マップなど...</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
export default ContentsIntro;

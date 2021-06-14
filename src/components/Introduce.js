import React from "react";

import {Container,Image,Row,Col,Button} from "react-bootstrap"

export default class Introduce extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <h1>footlogで観戦記録を積み重ねよう！</h1>
        <Container fluid>
        <Row>
          <Col>
            <Image src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} fluid />
            <h3>①観戦した試合を見つけて、「記録」ボタンを押します。</h3>
          </Col>
          <Col>
            <Image src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
            <h3>②あなたの観戦記録が積み重なり、あなただけのジンクスや、メモリアルゴールがわかります。</h3>
          </Col>
        </Row>
        <h2>例えば...</h2>
        <Row>
          <Col>
            <Image src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
            <h4>勝率はもちろん</h4>
          </Col>
          <Col>
            <Image src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
            <h4>クラブ別の対戦成績や</h4>
          </Col>
          <Col>
            <Image src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
            <h4>得失点マップなど...</h4>
          </Col>
        </Row>
        <Button>
          <h5>ユーザー登録</h5>
        </Button>
        <Button>
          <h5>ログイン</h5>
        </Button>
      </Container>

      </>
    );
  }
}
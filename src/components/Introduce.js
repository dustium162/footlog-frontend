import React from "react";

import {Container,Image,Row,Button} from "react-bootstrap"

import HowtoUse from "./HowtoUse"
import ContentsIntro from "./ContentsIntro"

const Introduce = () => {
  return (
    <Container fluid>
      <Row><Image className="my_header" src={`${process.env.PUBLIC_URL}/top1.jpg`} fluid/></Row>
      <h1>footlogで観戦記録を積み重ねよう！</h1>
      <Row><HowtoUse /></Row>
      <h2>例えば...</h2>
      <Row><ContentsIntro /></Row>
      <Button>
        <h5>ユーザー登録</h5>
      </Button>
      <Button>
        <h5>ログイン</h5>
      </Button>
    </Container>
  );
}
export default Introduce;

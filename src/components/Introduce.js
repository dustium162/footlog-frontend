import React from "react";
import {Link} from 'react-router-dom';

import {Container,Image,Row,Col,Card,Button} from "react-bootstrap"

import HowtoUse from "./HowtoUse"
import ContentsIntro from "./ContentsIntro"

import topImage from '../shutterstock_3.jpg';

const Introduce = () => {
  return (
    <>
      <div style={{backgroundImage: `url(${process.env.PUBLIC_URL}/top-images/shutterstock_3.jpg)`, width: "100%", backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover", color:"black"}}>
        <div style={{background: "rgba(255, 255, 255, 0.17)", display: "flex", justifyContent:"center", alignItems: "center"}}>
          <div style={{paddingTop: "calc(450 / 1000 * 50%)",paddingBottom: "calc(450 / 1000 * 50%)"}}>
          </div>
          <div className="text-center py-2" style={{height: "100%", width:"100%", background: "rgba(255,255,255,0.5)"}}>
            <span className="h1 fw-bold text-dark" style={{textShadow:"1px 1px 0 white,-1px 1px 0 white,1px -1px 0 white,-1px -1px 0 white"}}>観戦記録を積み重ねよう！</span>
          </div>
        </div>
      </div>
      <Container className="my-2">
        <Row className="text-center">
          <Col>
          <Link to="sign_up" className="btn btn-dark rounded-pill py-2 px-2">
            <span className="mx-2">新規登録</span>
          </Link>
          </Col>
          <Col>
            <Link to="/sign_up" className="btn btn-secondary rounded-pill py-2 px-2">
              <span className="mx-2">ログイン</span>
            </Link>
          </Col>
        </Row>
        <h2 style={{textAlign:"center"}}>footlogの使い方</h2>
        <Card>
          <Card.Header>
            観戦記録の作成
          </Card.Header>
          <Card.Body>
            <Card.Text style={{textAlign:"center"}}>
              試合をどう観戦したかを記録します
            </Card.Text>
          </Card.Body>
          <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/top_demo_image_match_card.png`} />
        </Card>
        <Card>
          <Card.Header>
            観戦数のカウント
          </Card.Header>
          <Card.Body>
            <Card.Text style={{textAlign:"center"}}>
              現地での観戦数や戦績がカウントされます
            </Card.Text>
          </Card.Body>
          <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/top_demo_image_match_result.png`} />
        </Card>
        <Card>
          <Card.Header>
            クラブ別対戦成績
          </Card.Header>
          <Card.Body>
            <Card.Text style={{textAlign:"center"}}>
              対戦相手ごとの戦績を見ることもできます
            </Card.Text>
          </Card.Body>
          <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/top_demo_image_club_match_result_component.png`} />
        </Card>
        <Card>
          <Card.Header>
            各種大会への対応
          </Card.Header>
          <Card.Body>
            <Card.Text>
              ACLや天皇杯の記録にも対応しています
            </Card.Text>
          </Card.Body>
          <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/top_demo_image_acl.png`} />
        </Card>
        <Row className="text-center">
          <Col>
          <Link to="sign_up" className="btn btn-dark rounded-pill py-2 px-2">
            <span className="mx-2">新規登録</span>
          </Link>
          </Col>
          <Col>
            <Link to="/sign_up" className="btn btn-secondary rounded-pill py-2 px-2">
              <span className="mx-2">ログイン</span>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Introduce;

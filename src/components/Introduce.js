import React from "react";
import {Link} from 'react-router-dom';

import {Container,Image,Row,Col, Button} from "react-bootstrap"

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
        <Row><HowtoUse /></Row>
        <h2>例えば...</h2>
        <Row><ContentsIntro /></Row>
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

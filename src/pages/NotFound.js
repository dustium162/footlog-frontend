import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Logo from '../logo.png';

const NotFound = () => {
  return (
    <div className="main-content">
      <div className="header py-7 py-lg-8" />
      <Container className="mt-5 pb-5">
        <Row className="justify-content-center">
          <Col lg="8" md="8">
            <Card className="shadow border-0">
              <Card.Body className="px-lg-5 py-lg-5">
                <h1 className="h3">
                  <img
                    src={Logo}
                    width="35"
                    height="35"
                    alt="footlog logo"
                  />
                  404エラー
                </h1>
                <p>お探しのページは見つかりませんでした。</p>
                <Link to='/sign-in'>ログイン画面へ</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NotFound
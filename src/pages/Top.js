import React from 'react';
import { Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Head from '../components/Head';
import Layout from '../components/Layout';
import { Container, Row, Col, Card } from 'react-bootstrap'
import TopImage from '../images/top-images/shutterstock_3.jpg';
import TopDemoImageClubMatchResult from '../images/top-images/top_demo_image_club_match_result.png';
import TopDemoImageMyPage from '../images/top-images/top_demo_image_my_page.png';
import TopDemoImagePosts from '../images/top-images/top_demo_image_posts.png';
import TopDemoImageTitles from '../images/top-images/top_demo_image_titles.png';

const Top = () => {

  const userId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : '';

  return (
    <HelmetProvider>
      <Layout>
        <Head title="footlog" />
        <Container>
          <div style={
            {
              backgroundImage: `url(${TopImage})`,
              width: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              objectFit: 'cover',
              color:'black',
              borderRadius: '0 0 30px 30px'
            }
          }>
            <div style={
              {
                background: 'rgba(255, 255, 255, 0.17)',
                display: 'flex',
                justifyContent:'center',
                alignItems: 'center'
                }
              }>
              <div style={
                {
                  paddingTop: 'calc(450 / 1000 * 50%)',
                  paddingBottom: 'calc(450 / 1000 * 50%)'
                }
              } />
              <div className="text-center py-2" style={
                {
                  height: '100%',
                  width:'100%',
                  background: 'rgba(255,255,255,0.5)'
                }
              }>
                <span className="h1 fw-bold text-dark" style={{textShadow: '1px 1px 0 white,-1px 1px 0 white,1px -1px 0 white,-1px -1px 0 white'}}>????????????????????????????????????</span>
              </div>
            </div>
          </div>
        </Container>
        <Container className="my-5">
          {!userId &&
            <Row className="text-center mb-3">
              <Col>
                <Link to="sign-up" className="btn btn-danger rounded-pill py-2 px-2">
                  <span className="mx-2">????????????</span>
                </Link>
              </Col>
              <Col>
                <Link to="/sign-in" className="btn btn-secondary rounded-pill py-2 px-2">
                  <span className="mx-2">????????????</span>
                </Link>
              </Col>
            </Row>
          }
          <h1 style={{textAlign:'center'}} className="mb-3">footlog??????????????????</h1>
          <Row style={
            {
              display: 'flex',
              flexWrap: 'wrap'
            }
          }>
            <Col xs={12} md={3} className="mb-3">
              <Card className="mx-1 h-100">
                <Card.Header className="h5 bg-dark text-white">
                  ??? ?????????????????????
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    ????????????????????????????????????????????????
                  </Card.Text>
                  <Card.Img variant="top" src={`${TopDemoImagePosts}`} className="border rounded border-4" style={{borderColor: '#dee2e6'}} />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3} className="mb-3">
              <Card className="mx-1 h-100">
                <Card.Header className="h5 bg-dark text-white">
                  ??? ????????????????????????
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    ????????????????????????????????????????????????
                  </Card.Text>
                  <Card.Img variant="top" src={`${TopDemoImageMyPage}`} className="border rounded border-4" style={{borderColor: '#dee2e6'}} />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3} className="mb-3">
              <Card className="mx-1 h-100">
                <Card.Header className="h5 bg-dark text-white">
                  ??? ????????????????????????
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    ????????????????????????????????????????????????
                  </Card.Text>
                  <Card.Img variant="top" src={`${TopDemoImageClubMatchResult}`} className="border rounded border-4" style={{borderColor: '#dee2e6'}} />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3} className="mb-3">
              <Card className="mx-1 h-100">
                <Card.Header className="h5 bg-dark text-white">
                  ??? ????????????????????????
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    ACL???????????????????????????????????????
                  </Card.Text>
                  <Card.Img variant="top" src={`${TopDemoImageTitles}`} className="border rounded border-4" style={{borderColor: '#dee2e6'}} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {!userId &&
            <>
              <hr />
              <div className="text-center my-3">
                <div className="h4 mb-3">?????????????????????????????????????????????</div>
                <Link to="sign-up" className="btn btn-danger btn-lg rounded-pill py-2 px-2">
                  <span className="h1 px-4">????????????</span>
                </Link>
              </div>
            </>
          }
        </Container>
      </Layout>
    </HelmetProvider>
  );
}

export default Top;
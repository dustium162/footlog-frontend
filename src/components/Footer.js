import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
      <footer className="bg-light small border-top text-center">
        <Container className="my-3">
          <div className="row">
            <div className="col-12 px-4 mb-3">
              <div className="text-start">
                <div className="row">
                  <Link to="/terms" className="col-lg-3 col-6 px-1 footer-text">利用規約</Link>
                  <Link to="/privacy" className="col-lg-3 col-6 px-1 footer-text">プライバシーポリシー</Link>
                  <Link to="/contact" className="col-lg-3 col-6 px-1 footer-text">お問い合わせ</Link>
                  <a href="https://www.footlog-blog.net/" className="col-lg-3 col-6 px-1 footer-text">開発者ブログ</a>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="text-center text-muted">
                <p className="small_font mb-0">Copyright (C) 2019- footlog All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </Container>
      </footer>
  )
}
export default Footer;

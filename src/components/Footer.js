import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <footer className="bg-light small">
        <Container className="py-3">
          <div className="row">
            <div className="col-12 px-4 mb-3">
              <div className="text-start">
                <div className="row">
                  <Link to="/terms" className="text-muted col-lg-3 col-6 px-1 text-decoration-none">利用規約</Link>
                  <Link to="/privacy" className="text-muted col-lg-3 col-6 px-1 text-decoration-none">プライバシーポリシー</Link>
                  <Link to="/contact" className="text-muted col-lg-3 col-6 px-1 text-decoration-none">お問い合わせ</Link>
                  <a href="https://www.footlog-blog.net/" className="text-muted col-lg-3 col-6 px-1 text-decoration-none">ブログ</a>
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

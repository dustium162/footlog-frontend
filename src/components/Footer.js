import React from "react";
import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Logo from "../logo.svg";


export default class Footer extends React.Component {
  constructor() {
    super();
    // this.name = "Tsutomu";
  }
  render() {
    return (
      <footer className="bg-light">
        <Container className="py-3">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <a href="/terms" className="text-muted px-1">利用規約</a>
                |
                <a href="/privacy" className="text-muted px-1">プライバシーポリシー</a>
                |
                <a href="/contact" className="text-muted px-1">お問い合わせ</a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="text-center text-muted">
                <p className="small_font mb-0">Copyright (C) 2019- footlog（β） All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    );
  }
}
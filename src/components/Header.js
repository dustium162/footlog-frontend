import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";


export default class Header extends React.Component {
  constructor() {
    super();
    // this.name = "Tsutomu";
  }
  render() {
    return (
      <header>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="py-1">
          <Container>
          <Navbar.Brand href="/">
              <img
                  src={Logo}
                  width="30"
                  height="30"
                  alt="React Bootstrap logo"
              />
              footlog（β）
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
              <Nav className="mr-auto">
              <Nav.Link href="/my_page">マイページ</Nav.Link>
              <Nav.Link href="/posts">試合一覧</Nav.Link>
                <Nav.Link href="/sign_up">新規登録</Nav.Link>
                <Nav.Link href="/sign_in">ログイン</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar >
      </header>
    );
  }
}
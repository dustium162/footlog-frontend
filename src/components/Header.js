import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import Logo from "../logo.svg";

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="py-1">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={Logo}
                width="30"
                height="30"
                alt="React Bootstrap logo"
              />
              footlog（β）
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/my_page">
                <Nav.Link>マイページ</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/posts">
                <Nav.Link>試合一覧</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/sign_up">
                <Nav.Link>新規登録</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/sign_in">
                <Nav.Link>ログイン</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
    </header>
  )
}
export default Header;

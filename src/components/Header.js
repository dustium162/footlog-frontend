import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from "../logo.svg";

const Header = () => {
  
  const history = useHistory();
  
  const handleSignOut = () => {
    axios.delete("http://localhost:3000/v1/auth/sign_out",{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    //レスポンスの一部をローカルストレージに保存するコードが必要
    .then(res => {
      if (res.status === 200) {
        localStorage.removeItem('uid');
        localStorage.removeItem('access-token');
        localStorage.removeItem('client');
        localStorage.removeItem('currentUser')
        console.log('200');
        history.push('/sign_in')
      } else {
        console.log('500');
      }
    })
    .catch(error => console.log(error))
  }

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
              <LinkContainer to="/admin/main">
                <Nav.Link>管理者ページへ</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <button onClick={handleSignOut}>
        サインアウト
      </button >
    </header>
  )
}
export default Header;

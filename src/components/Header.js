import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import axios from 'axios';
import { useHistory, Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from "../logo-copy.png";
// import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "../icon-sample.jpeg";

// library.add(
//   faSignOutAlt
//   // more icons go here
// );

const Header = () => {

  const history = useHistory();

  const handleSignOut = () => {
    axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/auth/sign_out`,{
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
      <Navbar bg="white" variant="light" className="border-bottom p-0">
        <Container>
          <Navbar.Brand>
            <Link to="/top" className="text-decoration-none text-dark">
              <img
                src={Logo}
                width="35"
                height="35"
                alt="React Bootstrap logo"
              />
              <h1 class="h3 d-inline ms-1">footlog</h1>
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            { localStorage.getItem('access-token') == null ? (
              <>
                <LinkContainer to="/sign_up" className="me-3">
                  <Nav.Link className="btn btn-dark rounded-pill text-white px-3">新規登録</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/sign_in" className="me-3">
                  <Nav.Link className="btn btn-secondary rounded-pill text-light px-3">ログイン</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/my_page" className="me-3">
                  <Nav.Link>
                    <img
                      src={icon}
                      width="40"
                      height="40"
                      alt="React Bootstrap logo"
                      className="rounded-circle"
                    />
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/posts" className="me-3">
                  <Nav.Link>
                    <div className="btn btn-secondary rounded-circle py-2 px-2" width="40" height="40" style={{width: "42px"}}>
                      <FontAwesomeIcon className="fa-fw text-white" icon={faEdit}></FontAwesomeIcon>
                    </div>
                  </Nav.Link>
                </LinkContainer>
                <a href="javascript:void(0)" onClick={handleSignOut} className="nav-link">
                  <div  className="btn btn-secondary rounded-circle py-2 px-2" width="40" height="40" style={{width: "42px"}}>
                    <FontAwesomeIcon className="fa-fw text-white" icon={faSignOutAlt}></FontAwesomeIcon>
                  </div>
                </a>
              </>
            ) }
          </Nav>
        </Container>
      </Navbar >
    </header>
  )
}
export default Header;

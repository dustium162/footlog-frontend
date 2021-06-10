import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import Logo from './logo.svg';
import './App.css';


class Header extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <header>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="py-1">
          <Container>
            <Navbar.Brand href="#home">
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
                <Nav.Link href="#sign_up">新規登録</Nav.Link>
                <Nav.Link href="#sing_in">ログイン</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar >
      </header>
    );
  }
}


class Layout extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  // componentDidMount() {
  //   fetch('http://localhost:3000/v1/matches', {method: 'GET'})
  //   .then((response) => {
  //     this.setState({ data: JSON.stringify(response) });
  //     // console.log(JSON.stringify(response));
  //     // this.setState({hoge: JSON.stringify(response)});
  //   });
  // }
  constructor(){
    super()
    this.state = {
      loading:false,
      character: {},
    }
  }
    
  componentDidMount(){
    this.setState({
      loading: true
    })
    // fetch("https://swapi.dev/api/people/1")
    fetch("http://localhost:3000/v1/matches")
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          character: data.data,
          loading: false
        })
      }
    )
  }
  render() {
    const displayText = this.state.loading ? "now loading...." : JSON.stringify(this.state.character)
    return (
      <div>
        {displayText}
      </div>
    )
  }
}

class Footer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <footer className="bg-light">
        <Container className="py-3">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <a href="#" className="text-muted px-1">利用規約</a>
                |
                <a href="#" className="text-muted px-1">プライバシーポリシー</a>
                |
                <a href="#" className="text-muted px-1">お問い合わせ</a>
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

function App() {
  return (
    <div className="App">
      <Header />
      <Layout />
      <Footer />
    </div>
  );
}

export default App;

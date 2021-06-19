import React from "react"

// import axios from 'axios'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css"

import Top from "./pages/Top";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import Posts from "./pages/Posts";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";

function App() {
  // test(); {
  //   axios.post("http://localhost:3000/v1/auth",{
  //     email: document.querySelector('#email').value,
  //     password: document.querySelector('#password').value,
  //     password_confirmation: document.querySelector('#password_confirmation').value,
  //     club_id: 12,
  //     confirm_success_url: "http://localhost:3000/"
  //   })
  //   .then((results) => {
  //     console.log(results.data)
  //     console.log(results.headers)
  //   })
  //   .catch((error) => {
  //     if (error.response) {
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       console.log(error.request);
  //     } else {
  //       console.log('Error', error.message);
  //     }
  //     console.log(error.config);    })
  // }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Top}/>
          <Route path="/sign_in" component={SignIn}/>
          <Route path="/sign_up" component={SignUp}/>
          <Route path="/my_page" component={MyPage}/>
          <Route path="/posts" component={Posts}/>
          <Route path="/terms" component={Terms}/>
          <Route path="/privacy" component={Privacy}/>
          <Route path="/contact" component={Contact}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

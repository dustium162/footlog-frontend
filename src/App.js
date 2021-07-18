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

// 管理者用 書く場所が正しいかは不明なので要相談(20210626浅)
import AdminMain from "./pages/admin/AdminMain"
import MatchNew from "./pages/admin/MatchNew"
import MatchEdit from "./pages/admin/MatchEdit"
import AddTeam from "./pages/admin/AddTeam"
import AddTitle from "./pages/admin/AddTitle"
import AddStadium from "./pages/admin/AddStadium"
import AddInformation from "./pages/admin/AddInformation"
import AddTerm from "./pages/admin/AddTerm"
import AddPrivacy from "./pages/admin/AddPrivacy"

function App() {
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

          {/* 管理者用 書く場所が正しいかは不明なので要相談(20210626浅) */}
          <Route path="/admin/main" component={AdminMain}/>
          <Route path="/admin/match/new" component={MatchNew}/>
          <Route path="/admin/match/edit" component={MatchEdit}/>
          <Route path="/admin/add_team" component={AddTeam}/>
          <Route path="/admin/add_title" component={AddTitle}/>
          <Route path="/admin/add_stadium" component={AddStadium}/>
          <Route path="/admin/add_information" component={AddInformation}/>
          <Route path="/admin/add_term" component={AddTerm}/>
          <Route path="/admin/add_privacy" component={AddPrivacy}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

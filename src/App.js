import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Top from './pages/Top';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Matches from './pages/Matches';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

// 管理者用 書く場所が正しいかは不明なので要相談(20210626浅)
import AdminMain from './pages/admin/AdminMain'
import MatchNew from './pages/admin/MatchNew'
import AddTeam from './pages/admin/AddTeam'
import AddClub from './pages/admin/AddClub'
import AddTitle from './pages/admin/AddTitle'
import AddStadium from './pages/admin/AddStadium'
import AddTerm from './pages/admin/AddTerm'
import AddPrivacy from './pages/admin/AddPrivacy'
import UnpublishedPosts from './pages/admin/UnpublishedPosts';
import ContactIndex from './pages/admin/ContactIndex';
import UserEdit from './pages/UserEdit';
import PasswordEdit from './pages/PasswordEdit';
import PasswordForget from './pages/PasswordForget';
import PasswordReset from './pages/PasswordReset';

import NotFound from './pages/NotFound';

// import InformRenewal from './pages/InformRenewal'

const App = () => {

  const router = useRef(null);

  const isAdmin = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).is_admin : false;

  useEffect(() => {
    router.current.history.listen((location) => {
      window.gtag('config', 'G-55KEKMRHDW', {
        'page_path': `${location.pathname}${location.search}`
      });
    });
  });

  return (
    <div className="App footer-fixed">
      <Router ref={router}>
        <Switch>
          <Route exact path="/" component={Top}/>
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/sign-up" component={SignUp}/>
          <Route path="/my-page" component={MyPage}/>
          <Route path="/matches" component={Matches}/>
          <Route path="/terms" component={Terms}/>
          <Route path="/privacy" component={Privacy}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/user/edit" component={UserEdit}/>
          <Route path="/user/password/edit" component={PasswordEdit}/>
          <Route path="/user/password/forget" component={PasswordForget} />
          <Route path="/user/password/reset" component={PasswordReset} />

          {/* 管理者用 書く場所が正しいかは不明なので要相談(20210626浅) */}
          {isAdmin && 
            <>
              <Route path="/admin/main" component={AdminMain}/>
              <Route path="/admin/match/new" component={MatchNew}/>
              <Route path="/admin/match/edit" component={UnpublishedPosts}/>
              <Route path="/admin/add_team" component={AddTeam}/>
              <Route path="/admin/add_club" component={AddClub}/>
              <Route path="/admin/add_title" component={AddTitle}/>
              <Route path="/admin/add_stadium" component={AddStadium}/>
              <Route path="/admin/add_term" component={AddTerm}/>
              <Route path="/admin/add_privacy" component={AddPrivacy}/>
              <Route path="/admin/contacts" component={ContactIndex}/>
            </>
          }

          <Route component={() => <NotFound />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

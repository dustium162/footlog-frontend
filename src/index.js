import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

ReactDOM.render(
  // <React.StrictMode>
  //   <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY} language="ja">
  //     <App />
  //   </GoogleReCaptchaProvider>
  // </React.StrictMode>,
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

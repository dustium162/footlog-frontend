import {React} from 'react';
import Layout from "../components/Layout";
import { useHistory } from 'react-router-dom';
import axios from 'axios'

import {useState, useEffect} from "react"

import {Form,Button,Container} from "react-bootstrap"

const SignIn = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitDisable, setIsSubmitDisable] = useState(false);
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  useEffect(() => {
    email && password ? setIsSubmitDisable(false) : setIsSubmitDisable(true)
  }, [email, password])

  const login = () => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/sign_in`,{
      email: email,
      password: password,
    })
    //レスポンスの一部をローカルストレージに保存するコードが必要
    .then(res => {
      if (res.status === 200) {
        localStorage.setItem('uid', res.headers.uid)
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('client', res.headers.client)
        localStorage.setItem('currentUser', JSON.stringify(res.data.data))
        console.log('200');
        history.push('/my_page')
      }
      // } else {
      //   console.log(res.status);
      //   if (res.status == 401) {
      //     setErrorMessage('メールアドレスもしくはパスワードが異なります。');
      //   }
      // }
    })
    .catch(error => {
      console.log(error);
      // 401はthenで受け取るように修正予定（2021ｰ09-12 浦郷）
      if(error.response.status === 401) {
        setErrorMessage('メールアドレスもしくはパスワードが異なります。');
      } else {
        setErrorMessage('サーバーエラーが発生しました。')
      }
    })
  }
  return (
    <Layout>
      <Container>
        {errorMessage ? <div className="my-3 text-danger">{errorMessage}</div> : <div></div>}
        <Form onSubmit={handleSubmit} className="my-3">
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control value={email} placeholder="メールアドレスを入力してください" onChange={handleEmailChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>パスワード</Form.Label>
            <Form.Control value={password} type="password" placeholder="パスワードを入力してください" onChange={handlePasswordChange}/>
          </Form.Group>
          <Form.Group className="text-end">
            <Button variant="dark" type="submit" onClick={login} disabled={isSubmitDisable}>
              ログイン
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Layout>
  );
}
export default SignIn;
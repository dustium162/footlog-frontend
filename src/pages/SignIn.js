import React from 'react';
import Layout from "../components/Layout";

import axios from 'axios'

import {useState} from "react"

import {Form,Button,Container} from "react-bootstrap"

const SignIn = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const createNewUser = () => {
    axios.post("http://localhost:3000/v1/auth/sign_in",{
      email: email,
      password: password,
    })
    //レスポンスの一部をローカルストレージに保存するコードが必要
    // .then(response => setUser[...user,])
    .catch(error => console.log(error))
  }
  return (
    <Layout>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control value={email} placeholder="メールアドレスを入力してください" onChange={handleEmailChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>パスワード</Form.Label>
            <Form.Control value={password} type="password" placeholder="パスワードを入力してください" onChange={handlePasswordChange}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={createNewUser}>
            ログイン
          </Button>
        </Form>
      </Container>
    </Layout>
  );
}
export default SignIn;
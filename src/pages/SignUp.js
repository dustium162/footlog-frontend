import React from 'react';
import Layout from "../components/Layout";

import axios from 'axios'

import {useState} from "react"

import {Form,Button, Container} from "react-bootstrap"

const SignUp = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  // const [user,setUser] = useState([])

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const createNewUser = () => {
    axios.post("http://localhost:3000/v1/auth",{
      name: name,
      email: email,
      password: password,
      password_confirmation: password,
      club_id: 12,    })
    // .then(response => setUser[...user,])
    .catch(error => console.log(error))
  }
  return (
    <Layout>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>ユーザー名</Form.Label>
            <Form.Control value={name} placeholder="ユーザー名を入力してください" onChange={handleNameChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control value={email} placeholder="メールアドレスを入力してください" onChange={handleEmailChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>パスワード</Form.Label>
            <Form.Control value={password} type="password" placeholder="パスワードを入力してください" onChange={handlePasswordChange}/>
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" placeholder="Password Confirmation" />
          </Form.Group> */}
          {/* <Form.Select> なんかエラーでる*/}
            <select>
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          {/* </Form.Select> */}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="利用規約に同意する" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={createNewUser}>
            Submit
          </Button>
        </Form>
      </Container>
    </Layout>
  );
}
export default SignUp;
import React from 'react';
import Layout from "../components/Layout";

import axios from "axios"
import { useState } from "react";
import {Button,Form} from "react-bootstrap"

const Contact = () => {
  const [message,setMessage] = useState("")
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")

  const postContact = () => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/contacts`,{
      name: name,
      email: email,
      message: message
    }).then(res => {
      if(res.status === 200){
        console.log('200');
      } else if(res.status === 500){
        console.log('500');
      }
    })
    .catch(error => console.log(error))
  }
  return (
    <Layout>
      <Form>
        <Form.Group>
          <Form.Label>お名前</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group>
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBiography">
          <Form.Label>お問い合わせフォーム</Form.Label>
          <Form.Control as="textarea" value={message} onChange={(e) => setMessage(e.target.value)} style={{ height: '100px' }} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={postContact} disabled={!name || !email || !message}>
          送信
        </Button>
      </Form>
    </Layout>
  )
}
export default Contact;

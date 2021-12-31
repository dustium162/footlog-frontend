import React from 'react';
import Layout from '../components/Layout';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react';
import {Container,Button,Form} from 'react-bootstrap'

const Contact = () => {
  const history = useHistory();

  const [message,setMessage] = useState('')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [sendButtonLabel, setSendButtonLabel] = useState('送信する');

  useEffect(() => {
    name && email && message ? setIsSubmitDisable(false) : setIsSubmitDisable(true);
  }, [name, email, message])

  const postContact = () => {
    setIsSubmitDisable(true);
    setSendButtonLabel('送信中...');
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/contacts`,{
      name: name,
      email: email,
      message: message
    }).then(res => {
      if(res.status === 204){
        history.push('/top');
        console.log('204');
      } else if(res.status === 500){
        console.log('500');
        setIsSubmitDisable(false);
        setSendButtonLabel('送信する');
      }
    })
    .catch(error => {
      console.log(error);
      setIsSubmitDisable(false);
      setSendButtonLabel('送信する');
    })
  }
  return (
    <Layout>
      <Container>
        <Form className="my-3">
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
          <div className="text-end">
            <Button variant="dark" type="submit" onClick={postContact} disabled={isSubmitDisable}>
              {sendButtonLabel}
            </Button>
          </div>
        </Form>
      </Container>
    </Layout>
  )
}
export default Contact;

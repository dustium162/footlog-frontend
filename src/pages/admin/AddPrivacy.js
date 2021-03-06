import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Container, Form, Button} from 'react-bootstrap';

const AddPrivacy = () => {

  const [privacies,setPrivacies] = useState('');
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [submitButtonLabel, setSubmitButtonLabel] = useState('プライバシーポリシー更新');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/privacies`,
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    ).then((response) => {
      if(response.status === 200){
        setPrivacies(response.data);
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
      }
    }).catch((error) => {
      if(error.response && error.response.status === 401){
        history.push('/sign-in');
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
      }
    })
  },[history])

  const handlePrivacy = (e) => {
    setPrivacies(e && e.target ? e.target.value : '');
    setIsSubmitDisable(!privacies);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const updatePrivacies = () => {
    setIsSubmitDisable(true);
    setSubmitButtonLabel('プライバシーポリシー更新中...');
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/privacies`,
      {
        content: privacies
      },
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    ).then((response) => {
      if(response.status === 204){
        history.push('/admin/main');
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
        setIsSubmitDisable(false);
        setSubmitButtonLabel('プライバシーポリシー更新');
      }
    }).catch((error) => {
      console.log(error);
      if(error.response && error.response.status === 401) {
        history.push('/sign-in');
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
        setIsSubmitDisable(false);
        setSubmitButtonLabel('プライバシーポリシー更新');
      }
    })
  }

  return (
    <Layout>
      <Container>
        {errorMessage ? <div className="my-3 text-danger">{errorMessage}</div> : <div></div>}
        <Form onSubmit={handleSubmit} className="my-3">
          <Form.Group className="mb-3" controlId="formPrivacy">
            <Form.Label>プライバシーポリシー</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="プライバシーポリシーを入力してください"
              style={{ height: '500px' }}
              defaultValue={privacies.text ? privacies.text :''}
              onChange={handlePrivacy}
            />
          </Form.Group>
          <Form.Group className="mb-3 text-end">
            <Button variant="dark" type="submit" onClick={updatePrivacies} disabled={isSubmitDisable}>
              {submitButtonLabel}
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Layout>
  )
}
export default AddPrivacy;
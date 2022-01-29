import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Container, Form, Button} from 'react-bootstrap'

const AddTerm = () => {

  const [terms,setTerms] = useState('');
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [submitButtonLabel, setSubmitButtonLabel] = useState('規約更新');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/terms`,
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    ).then((response) => {
      if(response.status === 200){
        setTerms(response.data);
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

  const handleTerm = (e) => {
    setTerms(e && e.target ? e.target.value : '');
    setIsSubmitDisable(!terms);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const updateTerms = () => {
    setIsSubmitDisable(true);
    setSubmitButtonLabel('規約更新中...');
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/terms`,
      {
        content: terms
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
        setSubmitButtonLabel('規約更新');
      }
    }).catch((error) => {
      console.log(error);
      if(error.response && error.response.status === 401) {
        history.push('/sign-in');
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
        setIsSubmitDisable(false);
        setSubmitButtonLabel('規約更新');
      }
    })
  }

  return (
    <Layout>
      <Container>
        {errorMessage ? <div className="my-3 text-danger">{errorMessage}</div> : <div></div>}
        <Form onSubmit={handleSubmit} className="my-3">
          <Form.Group className="mb-3" controlId="formTerm">
            <Form.Label>利用規約</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="利用規約を入力してください"
              style={{ height: '500px' }}
              defaultValue={terms.text ? terms.text :''}
              onChange={handleTerm}
            />
          </Form.Group>
          <Form.Group className="mb-3 text-end">
            <Button variant="dark" type="submit" onClick={updateTerms} disabled={isSubmitDisable}>
              {submitButtonLabel}
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Layout>
  )
}
export default AddTerm;
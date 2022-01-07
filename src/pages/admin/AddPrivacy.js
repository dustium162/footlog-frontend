import React,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Container, Form, Button} from 'react-bootstrap';
// import {InputGroup,FormControl,Button} from 'react-bootstrap';

const AddPrivacy = () => {
  const [privacies,setPrivacies] = useState('');
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [submitButtonLabel, setSubmitButtonLabel] = useState('プライバシーポリシー更新');

  const history = useHistory();

  const handlePrivacy = (e) => {
    setPrivacies(e.target.value);
    setIsSubmitDisable(!privacies);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/privacies`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    .then((response) => response.data).then((data) => {
      setPrivacies(data);
    }).catch((error) => {
      console.log(error);
      history.push('/sign_in');
    })
  },[history])

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
      } else if(response.status === 401) {
        history.push('/sign_in');
      } else {
        console.log(response);
      }
    }).catch((error) => {
      console.log(error);
      history.push('/sign_in');
    })
  }

  return (
    <Layout>
      <Container>
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
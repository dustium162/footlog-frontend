import React,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Container, Form, Button} from 'react-bootstrap'

const AddTerm = () => {
  const [terms,setTerms] = useState('');
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [submitButtonLabel, setSubmitButtonLabel] = useState('規約更新');

  const history = useHistory();

  const handleTerm = (e) => {
    setTerms(e.target.value);
    setIsSubmitDisable(!terms);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/terms`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    }).then((response) => response.data).then((data) => {
      setTerms(data);
    }).catch((error) => {
      console.log(error);
      history.push('/sign_in');
    })
  },[history])

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
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';

const AddStadium = () => {

  const [stadia,setStadia] = useState({});
  const [name,setName] = useState('');
  const [stadiumTypeId,setStadiumTypeId] = useState(0);
  const [isNewStadiumType,setIsNewStadiumType] = useState(false);
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [submitButtonLabel, setSubmitButtonLabel] = useState('スタジアム作成');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/stadia/`,
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    ).then((response) => {
      if(response.status === 200){
        setStadia(response.data);
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

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsSubmitDisable(!((stadiumTypeId && name) || (name && isNewStadiumType)));
  }

  const handleStadiumTypeIdChange = (e) => {
    setStadiumTypeId(e.target.value);
    setIsSubmitDisable(!((stadiumTypeId && name) || (name && isNewStadiumType)));
  }

  const handleIsNewStadiumTypeChange = (e) => {
    setIsNewStadiumType(!isNewStadiumType);
    setIsSubmitDisable(!((stadiumTypeId && name) || (name && !isNewStadiumType)));
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const createStadium = () => {
    setIsSubmitDisable(true);
    setSubmitButtonLabel('スタジアム作成中...');
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/stadia`,
      {
        stadium_type_id: stadiumTypeId,
        name: name,
        is_new_stadium_type: isNewStadiumType
      },
      {
        header: {
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
        setSubmitButtonLabel('スタジアム作成');
      }
    }).catch((error) => {
      console.log(error);
      if(error.response && error.response.status === 401) {
        history.push('/sign-in');
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
        setIsSubmitDisable(false);
        setSubmitButtonLabel('スタジアム作成');
      }
    })
  }

  return (
    <Layout>
      <Container>
      {errorMessage ? <div className="my-3 text-danger">{errorMessage}</div> : <div></div>}
  
        <Form onSubmit={handleSubmit} className="my-3">
          <Form.Group className="mb-3" controlId="formSerialCode">
            <Form.Label>stadiumTypeID</Form.Label>
            <Form.Control value={stadiumTypeId} placeholder="stadiumTypeIdを入力してください" onChange={handleStadiumTypeIdChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTeamName">
            <Form.Label>スタジアム名</Form.Label>
            <Form.Control value={name} placeholder="スタジアム名を入力してください" onChange={handleNameChange}/>
            <div key={`custom-checkbox`} className="mb-3">
              <Form.Check
                custom
                type={"checkbox"}
                value={isNewStadiumType}
                id={`custom-checkbox`}
                label={`新しいStadiumType？`}
                onChange={handleIsNewStadiumTypeChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 text-end">
            <Button variant="dark" type="submit" onClick={createStadium} disabled={isSubmitDisable}>
              {submitButtonLabel}
            </Button>
          </Form.Group>
        </Form>
        <Row>
          <Col>stadium_type_id</Col>
          <Col>stadium_id</Col>
          <Col>stadium_name</Col>
        </Row>
        {Object.keys(stadia).map((id) => (
          Object.keys(stadia[id]).map((stadiumTypeId) => (
            Object.keys(stadia[id][stadiumTypeId]).map((stadiumId, index) => (
              <Row key={index}>
                <Col>{stadiumTypeId}</Col>
                <Col>{stadia[id][stadiumTypeId][stadiumId].value}</Col>
                <Col>{stadia[id][stadiumTypeId][stadiumId].label}</Col>
              </Row>
              ))
            ))
          ))
        }
      </Container>
    </Layout>
  )
}
export default AddStadium;
import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {Container, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';


const AddTitle = () => {
  const [titles,setTitles] = useState({});
  const [name,setName] = useState('');
  const [titleTypeId, setTitleTypeId] = useState(0);
  const [isNewTitleType,setIsNewTitleType] = useState(false);
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [submitButtonLabel, setSubmitButtonLabel] = useState('タイトル作成');

  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/titles/`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    }).then((response) => {
      setTitles(response.data)
    }).catch((error) => {
      console.log(error);
      history.push('/sign_in');
    })
  },[history])

  const handleTitleTypeIdChange = (e) => {
    setTitleTypeId(e.target.value);
    setIsSubmitDisable(!((titleTypeId && name) || (name && isNewTitleType)));
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsSubmitDisable(!((titleTypeId && name) || (name && isNewTitleType)));
  }

  const handleIsNewTitleTypeChange = (e) => {
    setIsNewTitleType(e.target.value);
    setIsSubmitDisable(!((titleTypeId && name) || (name && isNewTitleType)));
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const createTitle = () => {
    setIsSubmitDisable(true);
    setSubmitButtonLabel('タイトル作成中...');
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/titles`,
      {
        title_type_id: titleTypeId,
        name: name,
        is_new_title_type: isNewTitleType
      },
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      },
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
          <Form.Group className="mb-3" controlId="formSerialCode">
            <Form.Label>titleTypeID</Form.Label>
            <Form.Control value={titleTypeId} placeholder="titleTypeIdを入力してください" onChange={handleTitleTypeIdChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTeamName">
            <Form.Label>タイトル名</Form.Label>
            <Form.Control value={name} placeholder="タイトル名を入力してください" onChange={handleNameChange}/>
            <div key={`custom-checkbox`} className="mb-3">
              <Form.Check
                custom
                type={"checkbox"}
                value={isNewTitleType}
                id={`custom-checkbox`}
                label={`新しいTitleType？`}
                onChange={handleIsNewTitleTypeChange}
                />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 text-end">
            <Button variant="dark" type="submit" onClick={createTitle} disabled={isSubmitDisable}>
              {submitButtonLabel}
            </Button>
          </Form.Group>
        </Form>
        <Row>
          <Col>title_type_id</Col>
          <Col>title_id</Col>
          <Col>title_name</Col>
        </Row>
        {/* {titles.map((title_type) => ( */}
        {Object.keys(titles).map((id, index) => (
          <Row key={index}>
            <Col>
              {Object.keys(titles[id]).map((titleTypeId) => (
                Object.keys(titles[id][titleTypeId]).map((titleId, index) => (
                  <Row key={index}>
                    <Col>{titleTypeId}</Col>
                    <Col>{titles[id][titleTypeId][titleId].value}</Col>
                    <Col>{titles[id][titleTypeId][titleId].label}</Col>
                  </Row>
                ))
              ))}
            </Col>
          </Row>
          ))}
      </Container>
    </Layout>
  )
}
export default AddTitle;
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import TeamLabel from '../../components/TeamLabel';

const AddTeam = () => {

  const [name,setName] = useState('');
  const [clubId,setClubId] = useState(0);
  const [abbreviation,setAbbreviation] = useState('');
  const [colorCode,setColorCode] = useState('');
  const [isTextBlack,setIsTextBlack] = useState(false);
  const [teams,setTeams] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitButtonLabel, setSubmitButtonLabel] = useState('チーム作成');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/teams`,
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    ).then((response) => {
      if(response.status === 200){
        setTeams(response.data);
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
      }
    }).catch((error) => {
      if(error.response && error.response.status === 401){
        history.push('/sign_in');
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
      }
    })
  },[history])

  const handleClubIdChange = (e) => {
    // バグあり。数字一桁だと、disableになってしまう
    setClubId(e && e.target ? e.target.value : '');
  }

  const handleNameChange = (e) => {
    setName(e && e.target ? e.target.value : '');
  }

  const handleAbbreviationChange = (e) => {
    setAbbreviation(e && e.target ? e.target.value : '');
  }

  const handleColorCodeChange = (e) => {
    setColorCode(e && e.target ? e.target.value : '');
  }

  const handleIsTextBlackChange = (e) => {
    setIsTextBlack(e && e.target ? e.target.value : '');
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const createTeam = () => {
    setIsSubmitting(true);
    setSubmitButtonLabel('チーム作成中...');
    console.log(clubId);
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/teams`,
      {
        club_id: clubId,
        name: name,
        abbreviation: abbreviation,
        color_code: colorCode,
        is_text_black: isTextBlack
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
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
        setIsSubmitting(false);
        setSubmitButtonLabel('チーム作成');
      }
    }).catch((error) => {
      console.log(error);
      if(error.response && error.response.status === 401) {
        history.push('/sign_in');
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
        setIsSubmitting(false);
        setSubmitButtonLabel('チーム作成');
      }
    })
  }

  return (
    <Layout>
      <Container>
        {errorMessage ? <div className="my-3 text-danger">{errorMessage}</div> : <div></div>}
        <Form onSubmit={handleSubmit} className="my-3">
          <Form.Group className="mb-3" controlId="formClubId">
            <Form.Label>clubId</Form.Label>
            <Form.Control value={clubId} placeholder="clubIdを入力してください" onChange={handleClubIdChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTeamName">
            <Form.Label>チーム名</Form.Label>
            <Form.Control value={name} placeholder="チーム名を入力してください" onChange={handleNameChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAbbreviation">
            <Form.Label>略称</Form.Label>
            <Form.Control value={abbreviation} placeholder="略称を入力してください" onChange={handleAbbreviationChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formColorCode">
            <Form.Label>カラーコード</Form.Label>
            <Form.Control value={colorCode} placeholder="カラーコードを入力してください" onChange={handleColorCodeChange}/>
            <Form.Check
              custom
              type={"checkbox"}
              value={isTextBlack}
              id={`custom-checkbox`}
              label={`灰色で縁取る？`}
              onChange={handleIsTextBlackChange}
            />
          </Form.Group>
          <Form.Group className="mb-3 text-end">
            <Button variant="dark" type="submit" onClick={createTeam} disabled={!(name && abbreviation && colorCode) || isSubmitting}>
              {submitButtonLabel}
            </Button>
          </Form.Group>
        </Form>
        <Row>
          <Col>club_id</Col>
          <Col>team_id</Col>
          <Col>team_name</Col>
          <Col>color_and_abbreviate</Col>
          <Col>pref_code</Col>
          <Col>serial_code</Col>
        </Row>
        <Row>
          {Object.keys(teams).map((id) => (
            Object.keys(teams[id]).map((clubId) => (
              Object.keys(teams[id][clubId]).map((teamId, index) => (
                <Row key={index}>
                  <Col>{clubId}</Col>
                  <Col>{teams[id][clubId][teamId].id}</Col>
                  <Col>{teams[id][clubId][teamId].name}</Col>
                  <Col><TeamLabel team={teams[id][clubId][teamId]} /></Col>
                  <Col>{teams[id][clubId][teamId].pref_code}</Col>
                  <Col>{teams[id][clubId][teamId].serial_code}</Col>
                </Row>
              ))
            ))
          ))}
        </Row>
      </Container>
    </Layout>
  )
}
export default AddTeam;
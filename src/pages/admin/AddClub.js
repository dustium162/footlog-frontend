import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout';

import axios from 'axios'

import {Form,Button,Row,Col} from 'react-bootstrap'

import TeamLabel from '../../components/TeamLabel'

const AddClub = () => {

  const [name,setName] = useState('')
  const [abbreviation,setAbbreviation] = useState('')
  const [colorCode,setColorCode] = useState('')
  const [isTextBlack,setIsTextBlack] = useState(false)

  const [prefCode,setPrefCode] = useState(0)
  const [serialCode,setSerialCode] = useState(0)

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handlePrefCodeChange = (e) => {
    setPrefCode(e.target.value)
  }

  const handleSerialCodeChange = (e) => {
    setSerialCode(e.target.value)
  }

  const handleAbbreviationChange = (e) => {
    setAbbreviation(e.target.value)
  }

  const handleColorCodeChange = (e) => {
    setColorCode(e.target.value)
  }

  const handleIsTextBlackChange = (e) => {
    setIsTextBlack(e.target.value)
  }

  const createClub = () => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/clubs`,
    {
      name: name,
      abbreviation: abbreviation,
      color_code: colorCode,
      is_text_black: isTextBlack,
      pref_code: prefCode,
      serial_code: serialCode,
    },
    {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    },
    ).catch(error => console.log(error))

  }

  const [teams,setTeams] = useState({})
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/teams/`)
      .then( response => setTeams(response.data))
      .catch(error => console.log(error))
  },[])
  return (
    <Layout>
        {/* <Form onSubmit={handleSubmit} className="my-3"> */}
        <Form className="my-3">
          <Form.Group className="mb-3" controlId="formPrefCode">
            <Form.Label>PrefCode</Form.Label>
            <Form.Control value={prefCode} placeholder="都道府県コードを入力してください" onChange={handlePrefCodeChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSerialCode">
            <Form.Label>SerialCode</Form.Label>
            <Form.Control value={serialCode} placeholder="TeamIdを入力してください" onChange={handleSerialCodeChange} />
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
          </Form.Group>
          <div key={`custom-checkbox`} className="mb-3">
              <Form.Check
                custom
                type={"checkbox"}
                value={isTextBlack}
                id={`custom-checkbox`}
                label={`灰色で縁取る？`}
                onChange={handleIsTextBlackChange}
                />
            </div>
          <Form.Group className="text-end">
            {/* <Button variant="dark" type="submit" onClick={createTeam} disabled={isSubmitDisable}> */}
            <Button variant="dark" type="submit" onClick={createClub} >
              作成
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
        {Object.keys(teams).map(id => (
          Object.keys(teams[id]).map(club_id => (
            Object.keys(teams[id][club_id]).map(team_id => (
              <Row>                
                <Col>{club_id}</Col>
                <Col>{teams[id][club_id][team_id].id}</Col>
                <Col>{teams[id][club_id][team_id].name}</Col>
                <Col><TeamLabel team={teams[id][club_id][team_id]} /></Col>
                <Col>{teams[id][club_id][team_id].pref_code}</Col>
                <Col>{teams[id][club_id][team_id].serial_code}</Col>
              </Row>
            ))
          ))
        ))}
      </Row>
    </Layout>
  )
}
export default AddClub;
import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout";

import axios from 'axios'

import {Form,Button, Container} from "react-bootstrap"

const SignUp = () => {

  // const [teams,setTeams] = useState({})

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [club_id,setClubId] = useState(0)
  // const [password_confirmation,setPasswordConfirmation] = useState("")

  // useEffect(() =>{
  //   axios.get("http://localhost:3000/v1/hogehoge")
  //   .then( response => {
  //     console.log(response.data.data)
  //     setTeams(response.data.data)
  //   })
  //   .catch(error => console.log(error))
  // }
  // ,[])

  const teams = {
    // divisionは、最新シーズンのもので判断。
    // Jリーグチームかつis_validがtrueのもののみを拾ってきたい。(20210722浅見)
    j1: [
      {club_id: 1, name:"北海道コンサドーレ札幌"},
      {club_id: 2, name:"ベガルタ仙台"},
      {club_id: 3, name:"浦和レッズ"}
    ],
    j2: [
      {club_id: 1, name:"北海道コンサドーレ札幌"},
      {club_id: 2, name:"ベガルタ仙台"},
      {club_id: 3, name:"浦和レッズ"}
    ],
    j3: [
      {club_id: 1, name:"北海道コンサドーレ札幌"},
      {club_id: 2, name:"ベガルタ仙台"},
      {club_id: 3, name:"浦和レッズ"}
    ],
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleClubId = (e) => {
    setClubId(e.target.value)
  }
  //確認用パスワードとの一致はフロントでやってしまう？(20210722浅見)
  // const handlePasswordConfirmationChange = (e) => {
  //   setPassword(e.target.value)
  // }

  const createNewUser = () => {
    axios.post("http://localhost:3000/v1/auth",{
      name: name,
      email: email,
      password: password,
      password_confirmation: password,
      // password_confirmation: password_confirmation,
      club_id: club_id,
    })
    .catch(error => console.log(error))
  }

  return (
    <Layout>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>ユーザー名</Form.Label>
            <Form.Control value={name} placeholder="ユーザー名を入力してください" onChange={handleNameChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control value={email} placeholder="メールアドレスを入力してください" onChange={handleEmailChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>パスワード</Form.Label>
            <Form.Control value={password} type="password" placeholder="パスワードを入力してください" onChange={handlePasswordChange}/>
          </Form.Group>
          <div key="inline-radio" className="mb-3">
            <Form.Check inline label="J1" type="radio"/>
            <Form.Check inline label="J2" type="radio"/>
            <Form.Check inline label="J3" type="radio"/>
          </div>
            <select onChange={handleClubId}>
              {teams.j1.map(d => {
                return <option value={d.club_id}>{d.name}</option>
              })
              }
            </select>
          {/* </Form.Select> */}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="利用規約に同意する" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={createNewUser}>
            Submit
          </Button>
        </Form>
      </Container>
    </Layout>
  );
}
export default SignUp;
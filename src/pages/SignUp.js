import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout";
import axios from 'axios'
import { useHistory } from 'react-router-dom';

import {Form,Button, Container} from "react-bootstrap"

const SignUp = () => {
  const [name, setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isRevealPassword,setIsRevealPassword] = useState(false)
  const [league, setLeague] = useState("1")
  const [league_list, setLeagueList] = useState([])
  const [club_id,setClubId] = useState(0)
  const [agree, setAgree] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:3000/v1/division_seasons/${league}`)
    .then(response => response.data)
    .then(res => {
      const aryLeaguList = [];
      res.map(data => {
        aryLeaguList.push(data);
      });
      setLeagueList(aryLeaguList);
      setClubId(aryLeaguList[0].club_id);
    });
  }, [league])

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleLeague = (e) => {
    setLeague(e.target.value);
  }
  const handleClubId = (e) => {
    setClubId(e.target.value)
  }

  const handleAgree = () => {
    setAgree(!agree);
  }

  const togglePassword = () => {
    setIsRevealPassword(state => !state);
  }

  //確認用パスワードとの一致はフロントでやってしまう？(20210722浅見)
  // const handlePasswordConfirmationChange = (e) => {
  //   setPassword(e.target.value)
  // }
  const history = useHistory();

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const createNewUser = () => {
    axios.post("http://localhost:3000/v1/auth",{
      name: name,
      email: email,
      password: password,
      password_confirmation: password,
      // password_confirmation: password_confirmation,
      confirm_success_url: "footlog.com",
      club_id: club_id
    }).then(res => {
      if(res.status == 200){
        history.push('/');     
        console.log('200');
      } else if(res.status == 500){
        console.log('500');
      }
    })
    .catch(error => console.log(error))
  }

  return (
    <Layout>
      <Container>
        <Form onSubmit={handleSubmit}>
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
            <Form.Control value={password} type={isRevealPassword ? "text" : "password"} placeholder="パスワードを入力してください" onChange={handlePasswordChange}/>
            <span onClick={togglePassword} role="presentation" className="PasswordReveal">
            {isRevealPassword ? (<i className="fas fa-eye" />) : (<i className="fas fa-eye-slash" />)}
            </span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="forLeague">
            <Form.Check
              inline
              label="Ｊ１"
              name="group1"
              type="radio"
              id="inline-radio-J1"
              value="1"
              onChange={handleLeague}
              checked={league === "1"}
              defaultChecked
            />
            <Form.Check
              inline
              label="Ｊ２"
              name="group1"
              type="radio"
              id="inline-radio-J2"
              value="2"
              onChange={handleLeague}
              checked={league === "2"}
            />
            <Form.Check
              inline
              label="Ｊ３"
              name="group1"
              type="radio"
              id="inline-radio-J3"
              value="3"
              onChange={handleLeague}
              checked={league === "3"}
            />
          </Form.Group>
          <Form.Group controlId="formClub">
            <Form.Label>応援しているクラブ</Form.Label>
            <Form.Control as="select" onChange={handleClubId}>
              {league_list.map(d => {
                return <option value={d.club_id}>{d.name}</option>
              })
              }
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox" onChange={handleAgree}>
            <Form.Check type="checkbox" label="利用規約に同意する"/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={createNewUser} disabled={!agree || !name || !email || !password}>
            Submit
          </Button>
        </Form>
      </Container>
    </Layout>
  );
}
export default SignUp;
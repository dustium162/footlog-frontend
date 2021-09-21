import React,{useState,useEffect} from 'react';
import Layout from "../components/Layout";
import axios from 'axios'
import { useHistory } from 'react-router-dom';

import {Form,Button, Container} from "react-bootstrap"

// import {config, dom, library} from '@fortawesome/fontawesome-svg-core';

// library.add(faEye, faEyeSlash);
// dom.i2svg();
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';

const SignUp = () => {
  const [name, setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isRevealPassword,setIsRevealPassword] = useState(false)
  const [league, setLeague] = useState("1")
  const [leagueList, setLeagueList] = useState([])
  const [clubId,setClubId] = useState(0)
  const [agree, setAgree] = useState(false)
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/division_seasons/${league}`)
    .then(response => response.data)
    .then(res => {
      const aryLeagueList = [];
      res.map(data => {
        aryLeagueList.push(data);
      });
      setLeagueList(aryLeagueList);
      setClubId(aryLeagueList[0].club_id);
    });
  }, [league])

  useEffect(() => {
    name && email && password && clubId && agree ? setIsSubmitDisable(false) : setIsSubmitDisable(true);
  }, [name, email, password, clubId, agree])

  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleLeague = (e) => {
    setLeague(e.target.value);
  }
  const handleClubId = (e) => {
    setClubId(e.target.value);
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
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth`,{
      name: name,
      email: email,
      password: password,
      password_confirmation: password,
      // password_confirmation: password_confirmation,
      club_id: clubId
    }).then(res => {
      if(res.status === 200){
        history.push('/top');
        console.log('200');
      } else if(res.status === 500){
        console.log('500');
      }
    })
    .catch(error => {
      console.log(error);
      // メールアドレスが既に登録されている場合に返される422なのか要確認（2021ｰ09-12 浦郷）
      if(error.response.status === 422) {
        setErrorMessage('入力されたメールアドレスは既に登録されている可能性があります。メールアドスを変更して、再度、登録してください。');
      } else {
        setErrorMessage('サーバーエラーが発生しました。')
      }
    })
  }

  return (
    <Layout>
      <Container>
        {errorMessage ? <div className="my-3 text-danger">{errorMessage}</div> : <div></div>}
        <Form onSubmit={handleSubmit} className="my-3">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="mb-0">ユーザー名</Form.Label>
            <Form.Control value={name} placeholder="ユーザー名を入力してください" onChange={handleNameChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="mb-0">メールアドレス</Form.Label>
            <Form.Control value={email} placeholder="メールアドレスを入力してください" onChange={handleEmailChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="mb-0">パスワード</Form.Label>
            <Form.Control value={password} type={isRevealPassword ? "text" : "password"} placeholder="パスワードを入力してください" onChange={handlePasswordChange}/>
            <span onClick={togglePassword} role="presentation" className="PasswordReveal">
            {isRevealPassword ? (<FontAwesomeIcon icon={faEye}/>) : (<FontAwesomeIcon icon={faEyeSlash}/>)}
            </span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClub">
            <Form.Label className="d-block mb-0">応援しているクラブ</Form.Label>
            <Form.Check
              inline
              label="Ｊ１"
              name="group1"
              type="radio"
              id="inline-radio-J1"
              value="1"
              onChange={handleLeague}
              checked={league === "1"}
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
            <Form.Control as="select" onChange={handleClubId}>
              {leagueList.map(d => {
                return <option key={d.club_id} value={d.club_id}>{d.name}</option>
              })
              }
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="利用規約に同意する" onChange={handleAgree} />
          </Form.Group>
          <Form.Group className="text-end">
            <Button variant="dark" type="submit" onClick={createNewUser} disabled={isSubmitDisable}>
              登録する
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Layout>
  );
}
export default SignUp;
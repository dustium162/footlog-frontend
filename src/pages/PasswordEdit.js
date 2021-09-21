import Layout from "../components/Layout";
import { useHistory } from 'react-router-dom';
import axios from "axios"
import { useState } from "react";
import {Button,Form, Container} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';

const PasswordEdit = () => {

  const userId = JSON.parse(localStorage.getItem('currentUser')).id;
  const history = useHistory();

  const [password,setPassword] = useState("");
  const [isRevealPassword,setIsRevealPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const togglePassword = () => {
    setIsRevealPassword(state => !state);
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
  }
  const updatePassword = () => {
    // const data = new FormData();
    // data.append('password', password);
    // data.append('passowrd_confirmation', password);
    axios.put(`${process.env.REACT_APP_API_ENDPOINT}/auth/password`,
      {
        password: password,
        password_confirmation: password
      },
      {
        headers: {
          'content-type': 'application/json',
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        },
      }
    ).then(res => {
      if(res.status === 200){
        history.push('/my_page');
        console.log('200');
      } else if(res.status === 500){
        console.log('500');
      }
    }).catch(error => console.log(error))
  }

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}` ,{
  //     headers: {
  //       uid: localStorage.getItem('uid'),
  //       'access-token': localStorage.getItem('access-token'),
  //       client: localStorage.getItem('client')
  //     }
  //   })
  //   .then(response => response.data)
  //   .then(data => {
  //     setInfo(data);
  //     setName(data.user.name);
  //     setEmail(data.user.email);
  //     // setImage(data.user.image);
  //     // setHeaderImage(data.user.header_image);
  //     setBiography(data.user.biography);
  //   })
  // },[])

  return (
    <Layout>
      {/* {JSON.stringify(info.user)} */}
      <Container>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>パスワード</Form.Label>
            <Form.Control value={password} type={isRevealPassword ? "text" : "password"} placeholder="パスワードを入力してください" onChange={handlePasswordChange}/>
            <span onClick={togglePassword} role="presentation" className="PasswordReveal">
            {isRevealPassword ? (<FontAwesomeIcon icon={faEye}/>) : (<FontAwesomeIcon icon={faEyeSlash}/>)}
            </span>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={updatePassword} disabled={!password}>
            更新する
          </Button>
        </Form>
      </Container>
    </Layout>
  )
}
export default PasswordEdit;
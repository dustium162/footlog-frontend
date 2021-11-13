import Layout from "../components/Layout";
import { useHistory } from 'react-router-dom';
import axios from "axios"
import { useState, useEffect } from "react";
import {Button,Form, Container} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';

const PasswordEdit = () => {

  const userId = JSON.parse(localStorage.getItem('currentUser')).id;
  const history = useHistory();

  const [password,setPassword] = useState("");
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [updateButtonLabel, setUpdateButtonLabel] = useState('更新する');
  const [isRevealPassword,setIsRevealPassword] = useState(false);

  useEffect(() => {
    password ? setIsSubmitDisable(false) : setIsSubmitDisable(true);
  }, [password])

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
    setIsSubmitDisable(true);
    setUpdateButtonLabel('更新中...');
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
        setIsSubmitDisable(false);
        setUpdateButtonLabel('更新する');
      }
    }).catch(error => {
      console.log(error);
      setIsSubmitDisable(false);
      setUpdateButtonLabel('更新する');
    })
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
        <Form onSubmit={handleSubmit}　className="my-3">
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>パスワード</Form.Label>
            <Form.Control value={password} type={isRevealPassword ? "text" : "password"} placeholder="パスワードを入力してください" onChange={handlePasswordChange}/>
            <span onClick={togglePassword} role="presentation" className="PasswordReveal">
            {isRevealPassword ? (<FontAwesomeIcon icon={faEye}/>) : (<FontAwesomeIcon icon={faEyeSlash}/>)}
            </span>
          </Form.Group>
          <div className="text-end">
            <Button variant="dark" type="submit" onClick={updatePassword} disabled={isSubmitDisable}>
              {updateButtonLabel}
            </Button>
          </div>
        </Form>
      </Container>
    </Layout>
  )
}
export default PasswordEdit;
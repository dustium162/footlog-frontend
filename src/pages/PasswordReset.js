import {React} from 'react';
import Layout from '../components/Layout';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react'
import {Form,Button,Container} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';


const PasswordReset = () => {

  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const [password,setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitDisable, setIsSubmitDisable] = useState(false);
  const [isRevealPassword,setIsRevealPassword] = useState(false);
  const history = useHistory();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const togglePassword = () => {
    setIsRevealPassword(state => !state);
  }

  useEffect(() => {
    password ? setIsSubmitDisable(false) : setIsSubmitDisable(true)
  }, [password])

  const resetPassword = () => {
    axios.put(`${process.env.REACT_APP_API_ENDPOINT}/auth/password`,{
      password: password,
      password_confirmation: password
    },
    {
      headers: {
        //ここに正しく値を入れれば完了しそう(浅見)
        uid: query.get('uid'),
        'access-token': query.get('access-token'),
        client: query.get('client')
      },
    })
    //レスポンスの一部をローカルストレージに保存するコードが必要
    .then(res => {
      if (res.status === 200) {
        console.log('200');
        console.log(res);
        history.push('/sign_in')
      }
      // } else {
      //   console.log(res.status);
      //   if (res.status == 401) {
      //     setErrorMessage('メールアドレスもしくはパスワードが異なります。');
      //   }
      // }
    })
    .catch(error => {
      console.log(error);
      // 401はthenで受け取るように修正予定（2021ｰ09-12 浦郷）
      if(error.response.status === 401) {
        setErrorMessage('メールアドレスが登録されていません。');
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
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>パスワード</Form.Label>
            <div className="input-wrap">
              <Form.Control value={password} type={isRevealPassword ? "text" : "password"} placeholder="新しいパスワードを入力してください" onChange={handlePasswordChange} />
              <span onClick={togglePassword} role="presentation" className="PasswordReveal toggle-pass">
              {isRevealPassword ? (<FontAwesomeIcon icon={faEye}/>) : (<FontAwesomeIcon icon={faEyeSlash}/>)}</span>
            </div>
          </Form.Group>
          <Form.Group className="text-end">
            <Button variant="dark" type="submit" onClick={resetPassword} disabled={isSubmitDisable}>
              更新する
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Layout>
  );
}
export default PasswordReset;
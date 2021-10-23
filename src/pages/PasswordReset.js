import {React} from 'react';
import Layout from "../components/Layout";
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios'

import {useState, useEffect} from "react"

import {Form,Button,Container} from "react-bootstrap"

const SignIn = () => {
  const [email,setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitDisable, setIsSubmitDisable] = useState(false);
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  useEffect(() => {
    email ? setIsSubmitDisable(false) : setIsSubmitDisable(true)
  }, [email])

  const resetPassword = () => {
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/password`,{
      email: email,
      redirect_url: "https://footlog.net/top"
    })
    //レスポンスの一部をローカルストレージに保存するコードが必要
    .then(res => {
      if (res.status === 200) {
        console.log('200');
        history.push('/top')
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
            <Form.Control value={email} placeholder="新しいパスワードを入力してください" onChange={handleEmailChange} />
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
export default SignIn;
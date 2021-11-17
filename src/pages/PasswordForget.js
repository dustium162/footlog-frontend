import {React} from 'react';
import Layout from "../components/Layout";
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios'

import {useState, useEffect} from "react"

import {Form,Button,Container} from "react-bootstrap"

const PasswordForget = () => {
  const [email,setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitDisable, setIsSubmitDisable] = useState(false);
  const [sendButtonLabel, setSendButtonLabel] = useState('再設定用リンクの送付');
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
    setIsSubmitDisable(true);
    setSendButtonLabel('送信中...');
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/password`,{
      email: email,
      redirect_url: `http://localhost:3001/user/password/edit`
      // redirect_url: "https://footlog.net/top"
    })
    //レスポンスの一部をローカルストレージに保存するコードが必要
    .then(res => {
      if (res.status === 200) {
        console.log('200');
        history.push('/top')
        console.log(res);
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
        setIsSubmitDisable(false);
        setSendButtonLabel('再設定用リンクの送付');
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
        setIsSubmitDisable(false);
        setSendButtonLabel('再設定用リンクの送付');
      }
    })
  }
  return (
    <Layout>
      <Container>
        {errorMessage ? <div className="my-3 text-danger">{errorMessage}</div> : <div></div>}
        <Form onSubmit={handleSubmit} className="my-3">
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control value={email} placeholder="メールアドレスを入力してください" onChange={handleEmailChange} />
          </Form.Group>
          <Form.Group className="text-end">
            <Button variant="dark" type="submit" onClick={resetPassword} disabled={isSubmitDisable}>
              {sendButtonLabel}
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Layout>
  );
}
export default PasswordForget;
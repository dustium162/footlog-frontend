import Layout from "../components/Layout";
import { Link } from 'react-router-dom';
import axios from "axios"
import { useEffect, useState } from "react";
import {Row,Col,Button,FormControl,InputGroup} from "react-bootstrap"

const UserEdit = () => {
  const userId = JSON.parse(localStorage.getItem('currentUser')).id
  const [info,setInfo] = useState({})

  const [name,setName] = useState("")
  const [icon,setIcon] = useState("")
  const [header,setHeader] = useState("")
  const [biography,setBiography] = useState("")

  const updateUser = () => {
    axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/auth`,
    {
      // 変更に応じたリクエストボディを記載
    },
    {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      },
    })
    .catch(error => console.log(error))
  }

  const deleteUser = () => {
    axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/auth`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
  }
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}` ,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    .then(response => response.data)
    .then(data => setInfo(data))
  },[])
  return (
    <Layout>
      {/* {JSON.stringify(info.user)} */}
      <Row>
        <Col>ユーザー名</Col>
        <Col>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={info.user ? info.user.name : "ユーザー名"}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            />
          <Button variant="outline-secondary" id="button-addon2" onClick={updateUser}>
            変更
          </Button>
        </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>応援しているチーム(変更不可)</Col>
        <Col>{info.user ? info.user.team_name : "ng"}</Col>
      </Row>
      <Row>
        <Col>メールアドレス</Col>
        <Col>{info.user ? info.user.email : "hoge"}</Col>
        <Col><Button variant="outline-secondary" id="button-addon2">メールアドレスを変更する</Button></Col>
      </Row>
      <Row>
        <Col>パスワード(変更ボタン)</Col>
        <Col><Button variant="outline-secondary" id="button-addon2">パスワードを変更する</Button></Col>
      </Row>
      <Row>
        <Col>アイコン</Col>
        <Col>現在のアイコンを表示？</Col>
        {/* <Col>{info.user ? info.user.icon : "ng"}</Col> */}
        <Col>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={info.user ? info.user.icon : "アイコン名"}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            />
          <Button variant="outline-secondary" id="button-addon2" onClick={updateUser}>
            変更
          </Button>
        </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>ヘッダー画像</Col>
        <Col>現在のヘッダー画像を表示？</Col>
        <Col>
        <InputGroup className="mb-3">
          <FormControl
            placeholder={info.user ? info.user.header : "アイコン名"}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            />
          <Button variant="outline-secondary" id="button-addon2" onClick={updateUser}>
            変更
          </Button>
        </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>自己紹介</Col>
        <Col>
          <InputGroup>
            <InputGroup.Text>自己紹介</InputGroup.Text>
            <FormControl as="textarea" placeholder={info.user? info.user.biography :"よろしくおねがいします"} aria-label="With textarea" />
            <Button variant="outline-secondary" id="button-addon2" onClick={updateUser}>変更</Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col><Link to="/my_page" className="btn btn-right btn btn-outline-secondary">マイページへ戻る</Link></Col>
        <Col><Button className="btn btn-danger" onClick={deleteUser}>ユーザーを消去する(有効なので注意)</Button></Col>
      </Row>
    </Layout>
  )
}
export default UserEdit;
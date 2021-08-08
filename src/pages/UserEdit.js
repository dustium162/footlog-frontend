import Layout from "../components/Layout";
import axios from "axios"
import { useEffect, useState } from "react";
import {Card,Row,Col,Button,FormControl,InputGroup} from "react-bootstrap"

const UserEdit = () => {
  const userId = JSON.parse(localStorage.getItem('currentUser')).id
  const [info,setInfo] = useState({})
  useEffect(() => {
    axios.get(`http://localhost:3000/v1/users/${userId}` ,{
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
          <Button variant="outline-secondary" id="button-addon2">
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
      </Row>
      <Row>
        <Col>自己紹介</Col>
        <Col>
          <InputGroup>
            <InputGroup.Text>自己紹介</InputGroup.Text>
            <FormControl as="textarea" placeholder={info.user? info.user.biography :"よろしくおねがいします"} aria-label="With textarea" />
            <Button variant="outline-secondary" id="button-addon2">変更</Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>パスワード(変更ボタン)</Col>
        <Col><Button variant="outline-secondary" id="button-addon2">変更</Button></Col>
      </Row>
      <Row>
        <Col>アイコン</Col>
        <Col>{info.user ? info.user.icon : "ng"}</Col>
      </Row>
      <Row>
        <Col>ヘッダー画像</Col>
        <Col>{info.user ? info.user.header : "ng"}</Col>
      </Row> 
    </Layout>
  )
}
export default UserEdit;
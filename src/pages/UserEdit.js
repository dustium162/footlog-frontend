import Layout from "../components/Layout";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from "axios"
import { useEffect, useState } from "react";
import {Row,Col,Button,FormControl,InputGroup, Form, Container, Image} from "react-bootstrap"

const UserEdit = () => {

  const userId = JSON.parse(localStorage.getItem('currentUser')).id;
  const history = useHistory();

  const [info,setInfo] = useState({})
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [image,setImage] = useState("")
  const [header_image,setHeaderImage] = useState("")
  const [biography,setBiography] = useState("")

  const processImage = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl);
  }

  const processHeaderImage = (e) => {
    const headerImageFile = e.target.files[0];
    const headerImageUrl = URL.createObjectURL(headerImageFile);
    setHeaderImage(headerImageUrl);
  }

  const updateUser = () => {
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('image', image);
    data.append('header_image', header_image);
    data.append('biography', biography);
    axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`,
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        },
      }
    ).then(res => {
      if(res.status == 200){
        history.push('/my_page');
        console.log('200');
      } else if(res.status == 500){
        console.log('500');
      }
    }).catch(error => console.log(error))
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

  const handleSubmit = (e) =>{
    e.preventDefault();
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
    .then(data => {
      setInfo(data);
      setName(data.user.name);
      setEmail(data.user.email);
      // setImage(data.user.image);
      // setHeaderImage(data.user.header_image);
      setBiography(data.user.biography);
    })
  },[])

  return (
    <Layout>
      {/* {JSON.stringify(info.user)} */}
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>ユーザー名</Form.Label>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClub">
            <Form.Label>応援しているチーム（変更不可）</Form.Label>
            <Form.Control value={info.support_info ? info.support_info.team_name : "応援しているチーム"} disabled="disabled" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMail">
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>パスワード</Form.Label>
            <Form.Control value="●●●●●●●●●●●" disabled="disabled" />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3" controlId="formImage">
            <Form.Label>アイコン画像</Form.Label>
            <Image src={image} rounded />
            <Form.File accept="image/*" onChange={processImage} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3" controlId="formHeaderImage">
            <Form.Label>ヘッダー画像</Form.Label>
            <Image src={header_image} rounded />
            <Form.File accept="image/*" onChange={processHeaderImage} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBiography">
            <Form.Label>自己紹介</Form.Label>
            <Form.Control as="textarea" value={biography} onChange={(e) => setBiography(e.target.value)} style={{ height: '100px' }} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={updateUser} disabled={!name || !email || !biography}>
            更新する
          </Button>
        </Form>
      </Container>
    </Layout>
  )
}
export default UserEdit;
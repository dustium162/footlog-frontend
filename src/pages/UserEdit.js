import Layout from "../components/Layout";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from "axios"
import { useEffect, useState } from "react";
import {Button, Form, Container, Image} from "react-bootstrap";
import Resizer from "react-image-file-resizer";

const resizeFile = (file, height, width) =>
new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    height,
    width,
    "JPEG",
    80,
    0,
    (uri) => {
      resolve(uri);
    },
    "base64"
  );
});

const UserEdit = () => {

  const userId = JSON.parse(localStorage.getItem('currentUser')).id;
  const history = useHistory();

  const [info,setInfo] = useState({})
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [image,setImage] = useState("")
  const [header_image,setHeaderImage] = useState("")
  const [biography,setBiography] = useState("")

  const processImage = async (e) => {
    // const imageFile = await resizeFile(e.target.files[0], 100, 100);
    // setImage(imageFile);
    const res = await axios(`${process.env.REACT_APP_API_ENDPOINT}/s3_direct_post`);
    const s3DirectPost = await res.data;
    const imageFile = await resizeFile(e.target.files[0], 100, 100);
    const fields = s3DirectPost.fields;
    const formData = new FormData()
    for (let key in fields) {
      formData.append(key, fields[key])
    }
    formData.append('file', imageFile);
    console.log(s3DirectPost.url);
    const ret = await axios.put(s3DirectPost.url,
      {
        formData
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    console.log(ret.data);
    const matchedObject = ret.data.match(/<Location>(.*?)<\/Location>/)
    const s3Url = unescape(matchedObject[1])
    setImage(s3Url);
  }

  const processHeaderImage = async (e) => {
    const headerImageFile = await resizeFile(e.target.files[0], 400, 400);
    setHeaderImage(headerImageFile);
  }

  const updateUser = () => {
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('image', image);
    data.append('header_image', header_image);
    data.append('biography', biography);
    axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/auth`,
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
      if(res.status === 200){
        localStorage.setItem('uid', res.headers.uid);
        localStorage.setItem('access-token', res.headers['access-token']);
        localStorage.setItem('client', res.headers.client);
        localStorage.setItem('currentUser', JSON.stringify(res.data.data));
        history.push('/my_page');
        console.log('200');
      } else if(res.status === 500){
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
        <Form onSubmit={handleSubmit} className="my-3">
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
            <Link to="/user/password/edit">パスワードを変更する</Link>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3" controlId="formImage">
            <Form.Label>アイコン画像</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={processImage} />
            <Image src={image} rounded />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3" controlId="formHeaderImage">
            <Form.Label>ヘッダー画像</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={processHeaderImage} />
            <Image src={header_image} rounded />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBiography">
            <Form.Label>自己紹介</Form.Label>
            <Form.Control as="textarea" value={biography} onChange={(e) => setBiography(e.target.value)} style={{ height: '100px' }} />
          </Form.Group>
          <Form.Group className="text-end">
            <Button variant="primary" type="submit" className="mx-1" onClick={updateUser} disabled={!name || !email || !biography}>
              更新する
            </Button>
            <Link className="btn btn-outline-secondary mx-1" to="/my_page">キャンセル</Link>
          </Form.Group>
        </Form>
        <Form.Group className="text-start my-3">
          <Button variant="link" onClick={deleteUser}>
            footlogを退会する方はこちら
          </Button>
        </Form.Group>
      </Container>
    </Layout>
  )
}
export default UserEdit;
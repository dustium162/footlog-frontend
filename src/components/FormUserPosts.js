import React,{useState,useEffect} from "react";
import {Form, Button} from "react-bootstrap"
import { Spinner } from "react-bootstrap"
import axios from "axios"
import PostCards from "./PostCards";

const FormUserPosts = () => {
  const [posts,setPosts] = useState([])
  const [hasMore,setHasMore] = useState(true)
  const [onsiteSelected, setOnsiteSelected] = useState(true);
  const [onlineSelected, setOnlineSelected] = useState(true);
  const [notWatchingSelected, setNotWatchingSelected] = useState(true);
  const [forgetSelected, setForgetSelected] = useState(true);

  const loader = <Spinner key={0} animation="border" variant="danger" />;
  const loadMore = async (page) => {
    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/posts?onsite=${onsiteSelected}&online=${onlineSelected}&notWatching=${notWatchingSelected}&forget=${forgetSelected}&page=${page}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    });
    const data = response.data
    if (data.length < 1) {
      setHasMore(false);
      return;
    }
    console.log(data)
    setPosts([...posts,...data])
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts?onsite=${onsiteSelected}&online=${onlineSelected}&notWatching=${notWatchingSelected}&forget=${forgetSelected}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    // apiのJsonの形式を検討する必要あり(2021-07-19 浦郷)
    .then(response => response.data)
    .then(data => setPosts(data))
    }
  ,[])

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const search = () => {
    console.log(onsiteSelected)
    console.log(onlineSelected)
    console.log(notWatchingSelected)
    console.log(forgetSelected)
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts?onsite=${onsiteSelected}&online=${onlineSelected}&notWatching=${notWatchingSelected}&forget=${forgetSelected}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    // apiのJsonの形式を検討する必要あり(2021-07-19 浦郷)
    .then(response => response.data)
    .then(data => setPosts(data))
    // console.log(Object.keys(posts).length);
    // console.log(typeof posts)
  };

  return (
    <>
      <h3 className="h5">投稿</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formCheckboxOnsite">
          <Form.Check type="checkbox" label="現地観戦" onChange={() => setOnsiteSelected(!onsiteSelected)} checked={onsiteSelected} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCheckboxOnline">
          <Form.Check type="checkbox" label="オンライン観戦" onChange={() => setOnlineSelected(!onlineSelected)} checked={onlineSelected} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCheckboxNotWatching">
          <Form.Check type="checkbox" label="見てない" onChange={() => setNotWatchingSelected(!notWatchingSelected)} checked={notWatchingSelected} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCheckboxForget">
          <Form.Check type="checkbox" label="忘れた" onChange={() => setForgetSelected(!forgetSelected)} checked={forgetSelected} />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="dark" type="submit" onClick={search}>
            絞り込む
          </Button>
        </div>
      </Form>
      <PostCards posts={posts} loadMore={loadMore} hasMore={hasMore} loader={loader} />
    </>
    );
}
export default FormUserPosts;

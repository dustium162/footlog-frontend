import React,{useState,useEffect} from "react";
import {Form, Button} from "react-bootstrap"
import { Spinner } from "react-bootstrap"
import axios from "axios"
import PostCards from "./PostCards";
import InfiniteScroll from "react-infinite-scroller"
import FormUserPostCard from './FormUserPostCard';

const FormUserPosts = () => {
  const [posts,setPosts] = useState([])
  const [hasMore,setHasMore] = useState(true)
  const [onsiteSelected, setOnsiteSelected] = useState(true);
  const [onlineSelected, setOnlineSelected] = useState(true);
  const [notWatchingSelected, setNotWatchingSelected] = useState(true);
  const [forgetSelected, setForgetSelected] = useState(true);
  const [selectPage, setSelectPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitDisable, setIsSubmitDisable] = useState(false);
  const [searchButtonLabel, setSearchButtonLabel] = useState('絞り込む')

  const loader = <Spinner key={0} animation="border" variant="secondary" />;
  const loadMore = async () => {
    // React-infinite-scrollerのデフォルトのページ番号は使用せず、ステートselectPageを使う。
    // 理由は、検索時にページ番号を初期化する必要があるが、引数としてページ番号を渡しているわけではなく、InfiniteScrollコンポーネントの中で計算しており、初期化することができないため。
    try {
      setIsFetching(true);
      {
        console.log(isFetching)
        const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/posts?onsite=${onsiteSelected}&online=${onlineSelected}&notWatching=${notWatchingSelected}&forget=${forgetSelected}&page=${selectPage}`, {
          headers: {
            uid: localStorage.getItem('uid'),
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client')
          }
        });
        const data = response.data
        if (data.length < 1) {
          console.log('falseをセットしたよ！')
          setHasMore(false);
          return;
        }
        if(selectPage == 1) {
          console.log(data)
          setPosts(data);
          setHasMore(true);
        } else {
          console.log(data)
          setPosts([...posts,...data])
        }
        setSelectPage(selectPage+1);
      }
    } finally {
      setIsFetching(false);
      console.log(posts)
    }
  }

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts?onsite=${onsiteSelected}&online=${onlineSelected}&notWatching=${notWatchingSelected}&forget=${forgetSelected}`, {
  //     headers: {
  //       uid: localStorage.getItem('uid'),
  //       'access-token': localStorage.getItem('access-token'),
  //       client: localStorage.getItem('client')
  //     }
  //   })
  //   // apiのJsonの形式を検討する必要あり(2021-07-19 浦郷)
  //   .then(response => response.data)
  //   .then(data => setPosts(data))
  //   }
  // ,[])

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const search = () => {
    setIsSubmitDisable(true);
    setSearchButtonLabel('絞り込み中...');
    setSelectPage(1);
    setHasMore(true);
    console.log(`${process.env.REACT_APP_API_ENDPOINT}/posts?onsite=${onsiteSelected}&online=${onlineSelected}&notWatching=${notWatchingSelected}&forget=${forgetSelected}&page=${selectPage}`)
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/posts?onsite=${onsiteSelected}&online=${onlineSelected}&notWatching=${notWatchingSelected}&forget=${forgetSelected}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    // apiのJsonの形式を検討する必要あり(2021-07-19 浦郷)
    .then(response => response.data)
    .then(data => {
      console.log(data);
      setPosts(data);
      setIsSubmitDisable(false);
      setSearchButtonLabel('絞り込む');
      // console.log(posts)
      // setSelectPage(selectPage+1);
    })
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
          <Button variant="dark" type="submit" onClick={search} disabled={isSubmitDisable}>
            {searchButtonLabel}
          </Button>
        </div>
      </Form>
      <InfiniteScroll loadMore={loadMore} hasMore={!isFetching && hasMore} loader={loader} pageStart={0} className="text-center">
      {posts.length !== 0 ?
        posts.map((post) => {
          return (
            <div class="my-4">
              <FormUserPostCard key={post.id} post={post} />
            </div>
          )
        })
        :
        <div className="my-2 text-center bg-light rounded border py-3">
          対象の観戦記録はありません
        </div>
      }
      </InfiniteScroll>
      {/* <PostCards posts={posts} loadMore={loadMore} hasMore={hasMore} loader={loader} /> */}
    </>
    );
}
export default FormUserPosts;

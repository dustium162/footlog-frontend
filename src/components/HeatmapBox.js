import React,{ useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Modal } from 'react-bootstrap';

const HeatmapBox = () => {
  const userId = JSON.parse(localStorage.getItem('currentUser')).id;
  const now = new Date();
  const thisYear = now.getFullYear();
  const [season, setSeason] = useState(thisYear);
  const [posts, setPosts] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [teamColor, setTeamColor] = useState('white');
  const [modalShow,setModalShow] = useState(false);
  const history = useHistory();

  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}/first_post_season`,
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    ).then((res) => {
      if (res.status === 200) {
        const convertList = (firstSeason) => {
          const thisYear = (new Date()).getFullYear();
          const result = [];
          for(let i = thisYear; i >= firstSeason; i--) {
            result.push(i);
          }
          return result;
        }
        setSeasonList(convertList(res.data));
      }
    })
    // .catch(error => {
    //   console.log(error);
    //   history.push('/sign-in');
    // })
  }, [userId, history])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}/posts-heatmap`,
      {
        params: {
          season: season
        },
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    ).then((res) => {
      if (res.status === 200) {
        console.log(res.data['posts_data']);
        setTeamColor(res.data['color_code']);
        setPosts(formatPosts(res.data['posts_data']));
      }
    })
    // .catch(error => {
    //   console.log(error);
    //   history.push('/sign-in');
    // })
  },[season, userId, history]);

  const handleSeason = (e) => {
    setSeason(e.target.value);
  }

  const formatPosts = (posts) => {
    const result = [];
    let tempArray = [];
    
    posts.forEach((post, index) => {
      if(index%5 === 0 && index !== 0){
        result.push(tempArray)
        tempArray = []
      }
      tempArray.push(post);
    });
    if(tempArray !== []){
      result.push(tempArray);
    }
    return result;
  }

  return (
    <>
      <h3 className="h5">ヒートマップ</h3>
      <Form.Group className="mb-3" controlId="formClub">
        <Form.Control as="select" onChange={handleSeason}>
          {seasonList.map((year, index) => {
            return <option key={index} value={year}>{year}</option>
          })
          }
        </Form.Control>
      </Form.Group>
      <div className="d-flex">
        {
          posts[0] && posts[0].length !== 0 ?
            posts.map((posts, i) => {
              return (
                <div key={i} className="d-block">
                  {posts.map((post, j) => {
                    return (
                      <div key={j}>
                        <div className="border rounded heatmap-cell" style={{background: `${colorStyle(post['post_type'], teamColor)}`, opacity: `${colorOpacity(post['post_type'])}`}} onClick={handleModalShow} />
                        <Modal show={modalShow} onHide={handleModalClose}>
                          <Modal.Header>
                            <Modal.Title>投稿の編集{j}</Modal.Title>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
                          </Modal.Header>
                          <Modal.Body>

                          </Modal.Body>
                        </Modal>
                      </div>
                    )
                  })}
                </div>
              );
            })
          :
          <div className="my-2 text-center bg-light rounded border py-3 w-100">
            {season}シーズンはまだ試合情報がありません
          </div>
        }
      </div>
    </>
  );
}
export default HeatmapBox;
import React,{ useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const Heatmap = () => {
  const userId = JSON.parse(localStorage.getItem('currentUser')).id;
  const now = new Date();
  const thisYear = now.getFullYear();
  const [season, setSeason] = useState(thisYear);
  const [postTypes, setPostTypes] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const history = useHistory();

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
        setSeasonList(convertList(res.data));
      }
    }).catch(error => {
      console.log(error);
      history.push('/sign-in');
    })
  })

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}/posts-heatmap`,
      {
        params: {
          season: season
        }
      },
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }
    ).then((res) => {
      if (res.status === 200) {
        setPostTypes(formatPostTypes(res.data));
      }
    }).catch(error => {
      console.log(error);
      history.push('/sign-in');
    })
  },[season]);

  const handleSeason = (e) => {
    setSeason(e.target.value);
  }

  const formatPostTypes = (postTypes) => {
    const result = [];
    let tempArray = [];
    
    postTypes.forEach((postType, index) => {
      if(index%5 === 0 && index !== 0){
        result.push(tempArray)
        tempArray = []
      }
      tempArray.push(postType);
    });
    if(tempArray !== []){
      result.push(tempArray);
    }
    return result;
  }

  const colorStyle = (postType) => {
    if(postType === 1) {
      return '#00FF11';
    } else if(postType === 2) {
      return '#99FFA0';
    } else if(postType === 3) {
      return '#E6FFF7';
    } else {
      return '#FFFFFF';
    }
  }

  const convertList = (firstSeason) => {
    const thisYear = now.getFullYear();
    const result = [];
    for(let i = thisYear; i >= firstSeason; i--) {
      result.push(i);
    }
    return result;
  }

  // // 0からmax-1までの整数を返す
  // function getRandomInt(max) {
  //   // ランダムな配列
  //   return Math.floor(Math.random() * Math.floor(max));
  // }
  // const samplePostTypes = [];
  // for (let i = 0; i < 70; i++) {
  //   samplePostTypes.push(getRandomInt(5));
  // }
  // const changedPostTypes = [];
  // let tmpArray = [];
  // samplePostTypes.forEach((postType, index) => {
  //   if(index%5 === 0 && index !== 0){
  //     changedPostTypes.push(tmpArray)
  //     tmpArray = []
  //   }
  //   tmpArray.push(postType);
  // });

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
      <div className="d-flex" style={{justifyContent: 'center'}}>
      {/* <div className="d-flex"> */}
        {
          postTypes.map((postTypes, i) => {
            return (
              <div key={i} className="d-block">
                {postTypes.map((postType, j) => {
                  return (
                    <div key={j} className="border rounded heatmap-cell" style={{background: `${colorStyle(postType)}`}} />
                  )
                })}
              </div>
            );
          })
        }
      </div>
    </>
  );
}
export default Heatmap;
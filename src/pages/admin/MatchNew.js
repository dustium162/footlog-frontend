import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form,Button, Container } from 'react-bootstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

const MatchNew = () => {
  
  const [teams,setTeams] = useState({});
  const [stadia,setStadia] = useState([]);
  const [titles,setTitles] = useState([]);
  const [homeTeamId,setHomeTeamId] = useState(0);
  const [awayTeamId,setAwayTeamId] = useState(0);
  const [stadiumId,setStadiumId] = useState(0);
  const [dateTime,setDateTime] = useState('');
  const [titleId,setTitleId] = useState(0);
  const [isNeutral,setNeutral] = useState(false);
  const [homeTeamsList, setHomeTeamsList] = useState([]);
  const [awayTeamsList, setAwayTeamsList] = useState([]);
  const [isSubmitDisable, setIsSubmitDisable] = useState(true);
  const [submitButtonLabel, setSubmitButtonLabel] = useState('試合情報作成');
  const [errorMessage, setErrorMessage] = useState('');
  // 試合作成後に以下のフォームをリセットするためのステート「submitCount」
  // ホームチーム、アウェイチーム、スタジアム、中立地
  const [submitCount, setSubmitCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/titles`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      },
      params: {
        index_type: 'match_new_index',
      }
    }).then( response => {
      setTitles(response.data);
      setIsSubmitDisable(!(titleId && homeTeamId && awayTeamId && dateTime && stadiumId));
    }).catch((error) => {
      history.push('/sign-in');
      console.log(error);
    })
  },[titleId, homeTeamId, awayTeamId, dateTime, stadiumId, history])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/teams`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      },
      params: {
        index_type: 'match_new_index',
      }
    }).then( response => {
      setTeams(response.data);
      setHomeTeamsList(response.data);
      setAwayTeamsList(response.data);
      setIsSubmitDisable(!(titleId && homeTeamId && awayTeamId && dateTime && stadiumId));
    }).catch((error) => {
      history.push('/sign-in');
      console.log(error);
    })
  },[titleId, homeTeamId, awayTeamId, dateTime, stadiumId, history])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/stadia`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      },
      params: {
        index_type: 'match_new_index',
      }
    }).then( response => {
      setStadia(response.data)
      setIsSubmitDisable(!(titleId && homeTeamId && awayTeamId && dateTime && stadiumId));
    }).catch((error) => {
      history.push('/sign-in');
      console.log(error);
    })
  },[titleId, homeTeamId, awayTeamId, dateTime, stadiumId, history])
  
  const handleTitle = (e) => {
    setTitleId(e ? e.value : '');
    setIsSubmitDisable(!(titleId && dateTime && stadiumId && homeTeamId && awayTeamId));
  }

  const handleDateTime = (e) => {
    setDateTime(e && e.target ? e.target.value : '');
    setIsSubmitDisable(!(titleId && dateTime && stadiumId && homeTeamId && awayTeamId));
  }

  const handleStadium = (e) => {
    setStadiumId(e ? e.value : 0);
    setIsSubmitDisable(!(titleId && dateTime && stadiumId && homeTeamId && awayTeamId));
  }
  const handleNeutral = (e) => {
    setNeutral(!isNeutral);
  }

  const handleHomeTeam = (e) => {
    setHomeTeamId(e ? e.value : 0);
    setIsSubmitDisable(!(titleId && dateTime && stadiumId && homeTeamId && awayTeamId));
  }

  const handleAwayTeam = (e) => {
    setAwayTeamId(e  ? e.value : 0);
    setIsSubmitDisable(!(titleId && dateTime && stadiumId && homeTeamId && awayTeamId));
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const createNewMatch = () => {
    setIsSubmitDisable(true);
    setSubmitButtonLabel('試合情報作成中...');
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/matches`,
      {
        title_id: titleId,
        home_team_id: homeTeamId,
        away_team_id: awayTeamId,
        date_time: dateTime,
        stadium_id: stadiumId,
        is_neutral: isNeutral
      },
      {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        },
      }
    ).then((response) => {
      if(response.status === 204){

        // リセットするコンポーネントのステートを初期化
        setHomeTeamId(0);
        setAwayTeamId(0);
        setStadiumId(0);
        setNeutral(false);

        setIsSubmitDisable(false);
        setSubmitCount(submitCount+1);
        setSubmitButtonLabel('試合情報作成');
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
        setIsSubmitDisable(false);
        setSubmitButtonLabel('試合情報作成');
      }
    }).catch((error) => {
      console.log(error);
      if(error.response && error.response.status === 401) {
        history.push('/sign-in');
      } else {
        setErrorMessage('サーバーエラーが発生しました。');
        setIsSubmitDisable(false);
        setSubmitButtonLabel('試合情報作成');
      }
    })
  }

  return (
    <Layout>
      <Container>
        {errorMessage ? <div className="my-3 text-danger">{errorMessage}</div> : <div></div>}
        <Form onSubmit={handleSubmit} className="my-3">
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>大会</Form.Label>
            <Select options={titles} placeholder="大会を選択" onChange={handleTitle} isClearable />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDateTime">
            <Form.Label>試合日程</Form.Label>
            <Form.Control type = "date" value={dateTime} onChange={handleDateTime}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHomeTeam">
            <Form.Label>ホームチーム</Form.Label>
            <Select key={submitCount} options={homeTeamsList} placeholder="ホームチームを選択" onChange={handleHomeTeam} isClearable />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAwayTeam">
            <Form.Label>アウェイチーム</Form.Label>
            <Select key={submitCount} options={awayTeamsList} placeholder="アウェイチームを選択" onChange={handleAwayTeam} isClearable />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStadium">
            <Form.Label>スタジアム</Form.Label>
            <Select key={submitCount} options={stadia} placeholder="スタジアムを選択" onChange={handleStadium} isClearable />
            <div key={`custom-checkbox`} className="mb-3">
            <Form.Check
              key={submitCount}
              custom
              type={"checkbox"}
              value={isNeutral}
              id={`custom-checkbox`}
              label={`中立地開催？`}
              onChange={handleNeutral}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 text-end" controlId="formSubmit">
            <Button variant="dark" type="submit" onClick={createNewMatch} disabled={isSubmitDisable}>{submitButtonLabel}</Button>
          </Form.Group>
        </Form>
        <div className="text-end">
          <Link to="/admin/main" className="btn btn-secondary">管理者ページへ戻る</Link>
        </div>
      </Container>
    </Layout>
  )
}
export default MatchNew;

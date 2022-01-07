import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form,Button, Container } from 'react-bootstrap';
import Select from 'react-select';
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

  const history = useHistory();

  const handleTitle = (e) => {
    setTitleId(e.value);
  }

  const handleDateTime = (e) => {
    setDateTime(e.target.value);
  }

  const handleStadium = (e) => {
    if(e) {
      setStadiumId(e.value);
    }
  }
  const handleNeutral = (e) => {
    setNeutral(!isNeutral);
  }

  const handleHomeTeam = (e) => {
    setHomeTeamId(e.value);
  }
  const handleHomeTeamType = (e) => {
    setHomeTeamsList(teams[e.target.value]);
  }

  const handleAwayTeam = (e) => {
    setAwayTeamId(e.value);
  }
  const handleAwayTeamType = (e) => {
    setAwayTeamsList(teams[e.target.value]);
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/matches/new`,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    }).then( response => {
      setTitles(response.data.titles);
      setTeams(response.data.teams);
      setStadia(response.data.stadia)
      setHomeTeamsList(response.data.teams['j1']);
      setAwayTeamsList(response.data.teams['j1']);
      document.getElementById('home_j1').checked = true;
      document.getElementById('away_j1').checked = true;
      setIsSubmitDisable(!(titleId && homeTeamId && awayTeamId && dateTime && stadiumId));
      // titleId && homeTeamId && awayTeamId && dateTime && stadiumId ? setIsSubmitDisable(false) : setIsSubmitDisable(true);
    }).catch((error) => {
      history.push('/sign_in');
      console.log(error);
    })
  },[titleId, homeTeamId, awayTeamId, dateTime, stadiumId, history])

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
        history.push('/admin/main');
      } else if(response.status === 401) {
        history.push('/sign_in');
      } else {
        console.log(response);
      }
    }).catch((error) => {
      console.log(error);
      // history.push('/sign_in');
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  return (
    <Layout>
      <Container>
        <Form onSubmit={handleSubmit} className="my-3">
          <Form.Group className="mb-3">
            <Form.Label>大会</Form.Label>
            <Select options={titles} placeholder="大会を選択" onChange={handleTitle} isClearable />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>試合日程</Form.Label>
            <Form.Control type = "date" value={dateTime} onChange={handleDateTime}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>ホームチーム</Form.Label>
            <div key="home_teams" className="mb-3">
              <Form.Check inline label="J1" type="radio" name="home_div" id="home_j1" value="j1" onChange={handleHomeTeamType} />
              <Form.Check inline label="J2" type="radio" name="home_div" id="home_j2" value="j2" onChange={handleHomeTeamType} />
              <Form.Check inline label="J3" type="radio" name="home_div" id="home_j3" value="j3" onChange={handleHomeTeamType} />
              <Form.Check inline label="Other" type="radio" name="home_div" id="home_other" value="other" onChange={handleHomeTeamType} />
            </div>
            <Select options={homeTeamsList} placeholder="ホームチームを選択" onChange={handleHomeTeam} isClearable />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>アウェイチーム</Form.Label>
            <div key="away_teams" className="mb-3">
              <Form.Check inline label="J1" type="radio" name="away_div" id="away_j1" value="j1" onChange={handleAwayTeamType} />
              <Form.Check inline label="J2" type="radio" name="away_div" id="away_j2" value="j2" onChange={handleAwayTeamType} />
              <Form.Check inline label="J3" type="radio" name="away_div" id="away_j3" value="j3" onChange={handleAwayTeamType} />
              <Form.Check inline label="Other" type="radio" name="away_div" id="away_other" value="other" onChange={handleAwayTeamType} />
            </div>
            <Select options={awayTeamsList} placeholder="アウェイチームを選択" onChange={handleAwayTeam} isClearable />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>スタジアム</Form.Label>
            <Select options={stadia} placeholder="スタジアムを選択" onChange={handleStadium} isClearable />
            <div key={`custom-checkbox`} className="mb-3">
              <Form.Check
                custom
                type={"checkbox"}
                value={isNeutral}
                id={`custom-checkbox`}
                label={`中立地開催？`}
                onChange={handleNeutral}
                />
            </div>
          </Form.Group>
          <Form.Group className="mb-3 text-end">
            <Button variant="dark" type="submit" onClick={createNewMatch} disabled={isSubmitDisable}>{submitButtonLabel}</Button>
          </Form.Group>
        </Form>
      </Container>
    </Layout>
  )
}
export default MatchNew;

import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {Row,Col,Form,Button,Card} from 'react-bootstrap';
import {ReactComponent as Emblem} from "../../images/emblem.svg"

const MatchEdit = ({match,filterMatches,height}) => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeScorePlayers, setHomeScorePlayers] = useState('');
  const [homeRedPlayers, setHomeRedPlayers] = useState('');
  const [awayScorePlayers, setAwayScorePlayers] = useState('');
  const [awayRedPlayers, setAwayRedPlayers] = useState('');
  const [mobilization, setMobilization] = useState(0);
  const [matchInfo, setMatchInfo] = useState('');

  const history = useHistory();

  const handleHomeScore = (e) => {
    setHomeScore(e && e.target ? e.target.value : '')
  }

  const handleAwayScore = (e) => {
    setAwayScore(e && e.target ? e.target.value : '')
  }

  const handleHomeScorePlayers = (e) => {
    setHomeScorePlayers(e && e.target ? e.target.value : '')
  }

  const handleAwayScorePlayers = (e) => {
    setAwayScorePlayers(e && e.target ? e.target.value : '')
  }

  const handleHomeRedPlayers = (e) => {
    setHomeRedPlayers(e && e.target ? e.target.value : '')
  }

  const handleAwayRedPlayers = (e) => {
    setAwayRedPlayers(e && e.target ? e.target.value : '')
  }

  const handleMobilization = (e) => {
    setMobilization(e && e.target ? e.target.value : '')
  }

  const handleMatchInfo = (e) => {
    setMatchInfo(e && e.target ? e.target.value : '');
    const matchInfoList = e && e.target ? e.target.value.split('@') : '';
    setHomeScore(matchInfoList[0] ? matchInfoList[0] : homeScore);
    setAwayScore(matchInfoList[1] ? matchInfoList[1] : awayScore);
    setHomeScorePlayers(matchInfoList[2] ? matchInfoList[2] : homeScorePlayers);
    setAwayScorePlayers(matchInfoList[3] ? matchInfoList[3] : awayScorePlayers);
    setHomeRedPlayers(matchInfoList[4] ? matchInfoList[4] : homeRedPlayers);
    setAwayRedPlayers(matchInfoList[5] ? matchInfoList[5] : awayRedPlayers);
    setMobilization(matchInfoList[6] ? matchInfoList[6] : mobilization);
  }

  const publishMatch = () => {
    filterMatches(match.id);
    axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/matches/${match.id}`,
      {
        home_score: homeScore,
        away_score: awayScore,
        home_score_players: homeScorePlayers,
        home_red_players: homeRedPlayers,
        away_score_players: awayScorePlayers,
        away_red_players: awayRedPlayers,
        mobilization: mobilization
      },
      {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    }).then((response) => {
      if(response.status === 401) {
        history.push('/sign-in');
      } else {
        console.log(response);
      }
    }).catch((error) => {
      console.log(error);
      // history.push('/sign-in');
    })
  }

  return (
    <Card style={{height: `${height}px`}}>
      <Card.Header style={{backgroundColor: match.is_neutral ? "#4db56a" : "#cccccc"}}>
        <Row>
          <Col xs={3} className="d-flex justify-content-center align-items-center">matchId: {match.id}</Col>
          <Col xs={6} className="d-flex justify-content-center align-items-center small">{match.date_time}</Col>
          <Col xs={3} className="d-flex justify-content-center align-items-center small">{match.title}{match.is_neutral && <span style={{color: "yellow"}}>(中立地)</span>}</Col>
        </Row>
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title>
          <Row className="justify-content-center">
            <Col>
              <Emblem className="me-1" height="25" width="25" fill={`${match.home_team.color_code}`} style={{verticalAlign: "middle"}} stroke="gray" strokeWidth="10"/>
              <span style={{verticalAlign: "middle"}}>{match.home_team.name}</span>
            </Col>
            <Col className="align-items-end">
              <span className="ms-1" style={{verticalAlign: "middle"}}>VS</span>
            </Col>
            <Col>
              <Emblem className="me-1" height="25" width="25" fill={`${match.away_team.color_code}`} style={{verticalAlign: "middle"}} stroke="gray" strokeWidth="10"/>
              <span style={{verticalAlign: "middle"}}>{match.away_team.name}</span>
            </Col>
          </Row>
        </Card.Title>
      </Card.Body>
      <Form id={'matchId' + match.id}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>ホーム得点</Form.Label>
            <Form.Control value={homeScore} onChange={handleHomeScore}></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>アウェイ得点</Form.Label>
              <Form.Control value={awayScore} onChange={handleAwayScore}></Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>ホームの得点者</Form.Label>
            <Form.Control value={homeScorePlayers} onChange={handleHomeScorePlayers}></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>アウェイの得点者</Form.Label>
              <Form.Control value={awayScorePlayers} onChange={handleAwayScorePlayers}></Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>ホームの退場者</Form.Label>
              <Form.Control value={homeRedPlayers} onChange={handleHomeRedPlayers}></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>アウェイの退場者</Form.Label>
            <Form.Control value={awayRedPlayers} onChange={handleAwayRedPlayers}></Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Label>動員数</Form.Label>
            <Form.Control type="integer" value={mobilization} onChange={handleMobilization} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>ブックマークレット用フォーム</Form.Label>
            <Form.Control type="text" value={matchInfo} onChange={handleMatchInfo} />
          </Col>
        </Row>
      </Form>
      <Row className="text-end">
        <Col className="mx-5">
          <hr />
        </Col>
        <Col xs={12}>
          <span className="text-muted">＠ {match.stadium}</span>
        </Col>
      </Row>
      <Card.Footer>
        <Button onClick={publishMatch}>試合情報更新</Button>
      </Card.Footer>
    </Card>
  )
}
export default MatchEdit;
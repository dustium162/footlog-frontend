import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {Row,Col,Form,Button,Card} from 'react-bootstrap';
import {ReactComponent as Emblem} from "../../images/emblem.svg"

const MatchPublish = ({match,filterMatches,height}) => {
  const history = useHistory();

  const publishMatch = () => {
    filterMatches(match.id);
    axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/matches/publish/${match.id}`,
      {},
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
    })
  }

  const unpublishMatch = () => {
    filterMatches(match.id);
    axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/matches/unpublish/${match.id}`,
      {},
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
    })
  }

  return (
    <Card style={{height: `${height}px`}}>
      <Card.Header className="text-center" style={{backgroundColor: '#f8f9fa', color: 'black'}}>
        <Row>
          <Col xs={3} className="d-flex justify-content-center align-items-center"></Col>
          <Col xs={6} className="d-flex justify-content-center align-items-center small">{match.date_time}</Col>
          <Col xs={3} className="d-flex justify-content-center align-items-center small">{match.title}</Col>
        </Row>
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title>
          <Row className="justify-content-center">
            <Col className="align-items-end">
              <Emblem className="me-1" height="25" width="25" fill={`${match.home_team.color_code}`} style={{verticalAlign: "middle"}} stroke="gray" strokeWidth="10"/>
              <span style={{verticalAlign: "middle"}}>{match.home_team.name}</span>
            </Col>
            <Col className="align-items-end">
              <Emblem className="me-1" height="25" width="25" fill={`${match.away_team.color_code}`} style={{verticalAlign: "middle"}} stroke="gray" strokeWidth="10"/>
              <span style={{verticalAlign: "middle"}}>{match.away_team.name}</span>
            </Col>
          </Row>
        </Card.Title>
      <Row>
        <Col xs={3} ></Col>
        <Col xs={6} className="h1">
          <Row>
            <Col xs={5} className="d-flex justify-content-end align-items-center" style={{verticalAlign: "middle"}}>{String(match.home_score)}</Col>
            <Col xs={2} className="d-flex justify-content-center align-items-center" style={{verticalAlign: "middle"}}>-</Col>
            <Col xs={5} className="d-flex justify-content-start align-items-center" style={{verticalAlign: "middle"}}>{String(match.away_score)}</Col>
          </Row>
        </Col>
        <Col xs={3}/>
      </Row>
      { (match.home_team.goal_players) && (match.home_team.goal_players.length > 0 || match.away_team.goal_players.length > 0) && (
        <>
          <div className="mx-5">
            <hr />
          </div>
          <div className="text-center h5 text-secondary">
            得点者
          </div>
          <Row className="text-secondary" style={{fontSize: "0.75rem"}}>
            <Col className="text-start px-3" style={{height: "70px", overflow:"auto"}}>
              {match.home_team.goal_players && match.home_team.goal_players.map((player, index) => (
                <div key={index}>
                  <span>{player.name} ({player.time}')</span>
                </div>
              ))}
            </Col>
            <Col className="text-start ps-1" style={{height: "70px", overflow:"auto"}}>
              {match.away_team.goal_players && match.away_team.goal_players.map((player, index) => (
                <div key={index}>
                  <span>{player.name} ({player.time}')</span>
                </div>
              ))}
            </Col>
          </Row>
        </>
      )}
      {(match.home_team.red_players) && (match.home_team.red_players.length > 0 || match.away_team.red_players.length > 0) && (
        <>
          <div className="mx-5">
            <hr />
          </div>
          <div className="text-center h5 text-secondary mt-3">
            退場者
          </div>
          <Row className="text-secondary" style={{fontSize: "0.75rem"}}>
            <Col className="text-start px-3" style={{height: "30px", overflow:"auto"}}>
              {match.home_team.red_players && match.home_team.red_players.map((player, index) => (
                <div key={index}>
                  <span>{player.name} ({player.time}')</span>
                </div>
              ))}
            </Col>
            <Col className="text-start pe-1" style={{height: "30px", overflow:"auto"}}>
              {match.away_team.red_players && match.away_team.red_players.map((player, index) => (
                <div key={index}>
                  <span>{player.name} ({player.time}')</span>
                </div>
              ))}
            </Col>
          </Row>
        </>
      )}
      <Row className="text-end">
        <Col className="mx-5">
          <hr />
        </Col>
        <Col xs={12}>
          <span className="text-muted small">＠ {match.stadium_name}</span>
        </Col>
        <Col xs={12}>
          <span className="text-muted small">観客数：{match.mobilization}人</span>
        </Col>
      </Row>
      </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <Button onClick={publishMatch}>試合情報投稿</Button>
            </Col>
            <Col className="text-end">
              <Button variant="danger" className="text-end" onClick={unpublishMatch}>試合情報差し戻し</Button>
            </Col>
          </Row>
        </Card.Footer>
    </Card>
  )
}
export default MatchPublish;

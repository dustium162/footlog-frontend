import { Row,Col,Card } from "react-bootstrap"
import {ReactComponent as Emblem} from '../images/emblem.svg';

import {ReactComponent as Onsite} from '../images/onsite.svg';
import {ReactComponent as Online} from '../images/online.svg';
import {ReactComponent as NotWatching} from '../images/notwatching.svg';
import {ReactComponent as Forget} from '../images/forget.svg';

const MatchInfo = ({match,postType}) => {
  const headerStyle = (match) => {
    let backgroundColor;
    let textColor;
    if(match.home_or_away_or_neutral === 'Home') {
      backgroundColor = match.color_code;
      textColor = match.is_text_black ? 'black' : 'white';
    } else if(match.home_or_away_or_neutral === 'Away') {
      backgroundColor = '#6c757d';
      textColor = 'white';
    } else {
      backgroundColor = '#f8f9fa';
      textColor = 'black';
    }
    return {backgroundColor: backgroundColor, color: textColor}
  }

  const postTypeIcon = (postType) => {
    if (postType === 1) {
      return (
        <>
          <Onsite style={{width: "30",height: "30"}}/>
          <br/>現地観戦
        </>
      )
    } else if (postType === 2) {
      return (
        <>
          <Online style={{width: "30",height: "30"}}/>
          <br />オンライン
        </>
      )
    } else if (postType === 3) {
      return (
        <>
          <NotWatching style={{width: "30",height: "30"}}/>
          <br />観ていない
        </>
      )
    } else if (postType === 4) {
      return (
        <>
          <Forget style={{width: "30",height: "30"}}/>
          <br />忘れた
        </>
      )
    }
  }
  return (
    <>
      <Card.Header className="text-center" style={headerStyle(match)}>
        <Row>
          <Col xs={3} className="d-flex justify-content-center align-items-center">{match.home_or_away_or_neutral}</Col>
          <Col xs={6} className="d-flex justify-content-center align-items-center small">{match.date_time}</Col>
          <Col xs={3} className="d-flex justify-content-center align-items-center small">{match.title}</Col>
        </Row>
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title>
          <Row className="justify-content-center">
            <Col className="align-items-end">
              <Emblem className="me-1" height="25" width="25" fill={`${match.opponent_color_code}`} style={{verticalAlign: "middle"}} stroke={match.is_opponent_text_black && "black"}/>
              <span style={{verticalAlign: "middle"}}>{match.opponent_name}</span>
              <span className="ms-1" style={{verticalAlign: "middle"}}>戦</span>
            </Col>
          </Row>
        </Card.Title>
      <Row>
        <Col xs={3} >{postType && postTypeIcon(postType)}</Col>
        <Col xs={6} className="h1">
          <Row>
            <Col xs={5} className="d-flex justify-content-end align-items-center" style={{fontSize: match.is_home ? "3rem": "1.8rem", verticalAlign: "middle"}}>{String(match.home_score)}</Col>
            <Col xs={2} className="d-flex justify-content-center align-items-center" style={{verticalAlign: "middle"}}>-</Col>
            <Col xs={5} className="d-flex justify-content-start align-items-center" style={{fontSize: match.is_home ? "1.8rem" : "3rem", verticalAlign: "middle"}}>{String(match.away_score)}</Col>
          </Row>
        </Col>
        <Col xs={3}/>
      </Row>
      {(match.home_team.goal_players.length > 0 || match.away_team.goal_players.length > 0) && (
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
      {(match.home_team.red_players.length > 0 || match.away_team.red_players.length > 0) && (
        <>
          <div className="mx-5">
            <hr />
          </div>
          <div className="text-center h5 text-secondary mt-3">
            退場者
          </div>
          <Row className="text-secondary" style={{fontSize: "0.75rem"}}>
            <Col className="text-end px-3" style={{height: "30px", overflow:"auto"}}>
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
    </>
  )
}

export default MatchInfo;
import {Image,Row,Col,Card,Button, Container} from "react-bootstrap"
import {ReactComponent as Emblem} from '../emblem.svg';

const MatchCard = ({match,handleShow}) => {
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
  return (
    <>
      <Card.Header className="text-center" style={headerStyle(match)}>
        <Row>
          <Col xs={3} className="d-flex justify-content-center align-items-center">{match.home_or_away_or_neutral}</Col>
          <Col xs={6} className="d-flex justify-content-center align-items-center small">{match.date}</Col>
          <Col xs={3} className="d-flex justify-content-center align-items-center small">ナビスコ</Col>
        </Row>
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title>
          <Row className="justify-content-center">
            <Col className="align-items-end">
              <Emblem className="me-1" height="25" width="25" fill={`${match.opponent_color_code}`} style={{verticalAlign: "middle"}} />
              <span style={{verticalAlign: "middle"}}>{match.opponent_name}</span>
              <span className="ms-1" style={{verticalAlign: "middle"}}>戦</span>
            </Col>
          </Row>
        </Card.Title>
        <Row>
          <Col xs={3} />
          <Col xs={6} className="h1">
            <Row>
              <Col xs={5} className="d-flex justify-content-end align-items-center" style={{fontSize: match.is_home ? "3rem": "1.8rem", verticalAlign: "middle"}}>{String(match.home_score)}</Col>
              <Col xs={2} className="d-flex justify-content-center align-items-center" style={{verticalAlign: "middle"}}>-</Col>
              <Col xs={5} className="d-flex justify-content-start align-items-center" style={{fontSize: match.is_home ? "1.8rem" : "3rem", verticalAlign: "middle"}}>{String(match.away_score)}</Col>
            </Row>
          </Col>
          <Col xs={3}>
            <Button variant="link text-secondary button_link" onClick={handleShow}>
              <Image className="emblem" src={`${process.env.PUBLIC_URL}/info.png`} roundedCircle />
              <div>詳細</div>
            </Button>
          </Col>
        </Row>
        <Row className="text-secondary" style={{fontSize: "0.75rem", height: "7rem"}}>
          <Col className="text-end ps-1">
            {match.home_team.goal_players && match.home_team.goal_players.map((player,id) => (
                id <= 5 && (id !== 5 ?
                <div>
                  <span>{player.name}</span>
                  <span className="d-inline-block" style={{width: "3rem"}}>{player.time}'</span>
                </div>
                :
                <div>…</div>
                )
                ))}
          </Col>
          <Col className="text-start pe-1">
            {match.away_team.goal_players && match.away_team.goal_players.map((player,id) => (
                id <= 5 && (id !== 5 ?
                <div>
                <span className="d-inline-block" style={{width: "3rem"}}>{player.time}'</span>
                <span>{player.name}</span>
                </div>
                :
                <div>…</div>
                )
                ))}
          </Col>
        </Row>
        <Row className="text-end">
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

export default MatchCard;
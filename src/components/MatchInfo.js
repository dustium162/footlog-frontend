import {Image,Row,Col,Card,Button} from "react-bootstrap"
import {ReactComponent as Emblem} from '../emblem.svg';

const MatchCard = ({match,handleShow}) => {
  return (
    <>
      <Card.Header style={{backgroundColor:match.color_code, color: match.is_text_black ? "gray" : "red" }}>
        <Row>
          <Col className="text-light">{match.home_or_away_or_neutral}</Col>
          <Col className="text-light">{match.date}</Col>
          <Col className="text-light">{match.title}</Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>VS {match.opponent_name}</Col>
          </Row>
        </Card.Title>
        <Row>
          <Col>
            <Emblem className="me-1" height="25" width="25" fill={`${match.opponent_color_code}`} style={{verticalAlign: "middle"}} />
          </Col>
          <Col><h1>{String(match.home_score)} - {String(match.away_score)}</h1></Col>
          <Col>
            <Button variant="link text-secondary button_link" onClick={handleShow}>
              <Image className="emblem" src={`${process.env.PUBLIC_URL}/info.png`} roundedCircle />
              <p>試合詳細</p>
            </Button>
          </Col>
        </Row>
        <Row>
          <p>得点者</p>
          <Col>
            {match.home_team.goal_players &&
            match.home_team.goal_players.map(player => (
              <Row>{player.name}： {player.time}'</Row>
              ))}
          </Col>
          <Col>
            {match.away_team.goal_players &&
            match.away_team.goal_players.map(player => (
              <Row>{player.time}' ：{player.name} </Row>
              ))}
          </Col>
        </Row>
        <Row>
          <p>退場者</p>
          <Col>
            {match.home_team.red_players.map(player => (
              <Row>{player.name}： {player.time}'</Row>
              ))}
          </Col>
          <Col>
            {match.away_team.red_players.map(player => (
              <Row>{player.time}' ： {player.name}</Row>
              ))}
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col><p>観客数：{match.mobilization}人</p></Col>
        </Row>
      </Card.Body>
    </>
  )
}

export default MatchCard;
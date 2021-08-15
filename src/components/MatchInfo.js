import { faBorderNone } from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react"

import {Image,Row,Col,Card,Button,Modal} from "react-bootstrap"
import PostButton from "./PostButton";


const MatchInfo = ({match}) => {
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const colors = {
    "Home" : "danger",
    "Away" : "secondary",
    "Neutral" : "info"
  }
  const [display, setDisplay] = useState("block");
  return (
    <div style={{display: display}}>
      <Card>
        <Card.Header className={`bg-${colors[match.home_or_away_or_neutral]}`}>
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
          {/* <Card.Text> */}
            <Row>
              <Col>
                <Image className="emblem" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
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
                {match.home_team.goal_players.map(player => (
                  <Row>{player.name}： {player.time}'</Row>
                  ))}
              </Col>
              <Col>
                {match.away_team.goal_players.map(player => (
                  <Row>{player.name}： {player.time}'</Row>
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
                  <Row>{player.name}： {player.time}'</Row>
                  ))}
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col><p>観客数：{match.mobilization}人</p></Col>
            </Row>
          {/* </Card.Text> */}
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col><PostButton match_team_property_id={match.match_team_property_id} img_src="forget" msg="覚えていない" post_type="4" is_post="true" setDisplay={setDisplay} /></Col>
            <Col><PostButton match_team_property_id={match.match_team_property_id} img_src="pass" msg="観ていない" post_type="3" is_post="true" setDisplay={setDisplay} /></Col>
            <Col><PostButton match_team_property_id={match.match_team_property_id} img_src="monitor" msg="オンライン" post_type="2" is_post="true" setDisplay={setDisplay} /></Col>
            <Col><PostButton match_team_property_id={match.match_team_property_id} img_src="stadium" msg="現地観戦" post_type="1" is_post="true" setDisplay={setDisplay} /></Col>
          </Row>
        </Card.Footer>
      </Card>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>試合詳細</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            {match.home_team.goal_players.map(player => (
              <Row>{player.name}： {player.time}'</Row>
            ))}
          </Col>
          <Col>
            {match.away_team.goal_players.map(player => (
              <Row>{player.name}： {player.time}'</Row>
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            {match.home_team.red_players.map(player => (
              <Row>{player.name}： {player.time}'</Row>
            ))}
          </Col>
          <Col>
            {match.away_team.red_players.map(player => (
              <Row>{player.name}： {player.time}'</Row>
            ))}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Col><PostButton match_id={match.id} img_src="forget" msg="覚えていない" post_type="4" setDisplay={setDisplay} /></Col>
          <Col><PostButton match_id={match.id} img_src="pass" msg="観ていない" post_type="3" /></Col>
          <Col><PostButton match_id={match.id} img_src="monitor" msg="オンライン" post_type="2" /></Col>
          <Col><PostButton match_id={match.id} img_src="stadium" msg="現地観戦" post_type="1" /></Col>
        </Row>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default MatchInfo;
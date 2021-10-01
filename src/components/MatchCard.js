import React, {useState} from "react"

import {Row,Col,Card,Modal} from "react-bootstrap"
import PostButton from "./PostButton";
import MatchInfo from "./MatchInfo"

const MatchCard = ({match,onClickPost}) => {
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Card key={String(match.key)} style={{height: `${match.style.height}px`}}>
      <MatchInfo match={match.data} handleShow={handleShow}/>
      <Card.Footer>
        <Row>
          <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="forget" msg="覚えていない" post_type="4" onClickPost={onClickPost}/></Col>
          <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="pass" msg="観ていない" post_type="3" onClickPost={onClickPost}/></Col>
          <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="monitor" msg="オンライン" post_type="2" onClickPost={onClickPost}/></Col>
          <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="stadium" msg="現地観戦" post_type="1" onClickPost={onClickPost}/></Col>
        </Row>
      </Card.Footer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>試合詳細</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>{match.data.home_team.goal_players.map(player => <Row>{player.name}： {player.time}'</Row>)}</Col>
            <Col>{match.data.away_team.goal_players.map(player => <Row>{player.time}'：{player.name} </Row>)}</Col>
          </Row>
          <Row>
            <Col>{match.data.home_team.red_players.map(player => <Row>{player.name}： {player.time}'</Row>)}</Col>
            <Col>{match.data.away_team.red_players.map(player => <Row>{player.time}'： {player.name}</Row>)}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="forget" msg="覚えていない" post_type="4" onClickPost={onClickPost} handleClose={handleClose} /></Col>
            <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="pass" msg="観ていない" post_type="3" onClickPost={onClickPost} handleClose={handleClose} /></Col>
            <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="monitor" msg="オンライン" post_type="2" onClickPost={onClickPost} handleClose={handleClose} /></Col>
            <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="stadium" msg="現地観戦" post_type="1" onClickPost={onClickPost} handleClose={handleClose} /></Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </Card>
  )
}

export default MatchCard;
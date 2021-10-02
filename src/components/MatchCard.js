import React, {useState} from "react"

import {Image,Row,Col,Card,Modal,Button} from "react-bootstrap"
import PostButton from "./PostButton";
import MatchInfo from "./MatchInfo"
import {ReactComponent as Emblem} from '../emblem.svg';


const MatchCard = ({match,onClickPost}) => {
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div key={String(match.key)} style={{height: `${match.style.height}px`}}>
      <Card>
        <MatchInfo match={match.data} handleShow={handleShow}/>
        <Card.Footer>
          <Row className="text-center">
            <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="stadium" msg="現地観戦" post_type="1" onClickPost={onClickPost}/></Col>
            <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="monitor" msg="オンライン" post_type="2" onClickPost={onClickPost}/></Col>
            <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="pass" msg="観ていない" post_type="3" onClickPost={onClickPost}/></Col>
            <Col><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="forget" msg="忘れた" post_type="4" onClickPost={onClickPost}/></Col>
          </Row>
        </Card.Footer>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <span xs={6} className="small me-3">{match.data.date}</span>
              {/* <Col xs={3} className="small">{match.data.title}</Col> */}
              <span xs={3} className="small">ナビスコ</span>
            </Modal.Title>
            <button type="button" class="btn-close" aria-label="Close" onClick={handleClose}></button>
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-center text-center">
              <Col className="align-items-end h3">
                <Emblem className="me-1" height="25" width="25" fill={`${match.data.opponent_color_code}`} style={{verticalAlign: "middle"}} />
                <span style={{verticalAlign: "middle"}}>{match.data.opponent_name}</span>
                <span className="ms-1" style={{verticalAlign: "middle"}}>戦</span>
              </Col>
            </Row>
            <Row>
              <Col xs={3} />
              <Col xs={6} className="h1">
                <Row>
                  <Col xs={5} className="d-flex justify-content-end align-items-center" style={{fontSize: "1.8rem", verticalAlign: "middle"}}>{String(match.data.home_score)}</Col>
                  <Col xs={2} className="d-flex justify-content-center align-items-center" style={{verticalAlign: "middle"}}>-</Col>
                  <Col xs={5} className="d-flex justify-content-start align-items-center" style={{fontSize: "3rem", verticalAlign: "middle"}}>{String(match.data.away_score)}</Col>
                </Row>
              </Col>
              <Col xs={3} />
            </Row>
            {(match.data.home_team.goal_players.length > 0 || match.data.away_team.goal_players.length > 0) && (
              <>
                <div className="mx-5">
                  <hr />
                </div>
                <div className="text-center h5 text-secondary">
                  得点者
                </div>
              </>
            )}
            <Row className="text-secondary" style={{fontSize: "0.75rem"}}>
              <Col className="text-end ps-1">
                {match.data.home_team.goal_players && match.data.home_team.goal_players.map((player) => (
                  <div>
                    <span>{player.name}</span>
                    <span className="d-inline-block" style={{width: "3rem"}}>{player.time}'</span>
                  </div>
                ))}
              </Col>
              <Col className="text-start pe-1">
                {match.data.away_team.goal_players && match.data.away_team.goal_players.map((player) => (
                  <div>
                    <span className="d-inline-block" style={{width: "3rem"}}>{player.time}'</span>
                    <span>{player.name}</span>
                  </div>
                ))}
              </Col>
            </Row>
            {(match.data.home_team.red_players.length > 0 || match.data.away_team.red_players.length > 0) && (
              <>
                <div className="mx-5">
                  <hr />
                </div>
                <div className="text-center h5 text-secondary mt-3">
                  退場者
                </div>
              </>
            )}
            <Row className="text-secondary" style={{fontSize: "0.75rem"}}>
              <Col className="text-end ps-1">
                {match.data.home_team.red_players && match.data.home_team.red_players.map((player) => (
                  <div>
                    <span>{player.name}</span>
                    <span className="d-inline-block" style={{width: "3rem"}}>{player.time}'</span>
                  </div>
                ))}
              </Col>
              <Col className="text-start pe-1">
                {match.data.away_team.red_players && match.data.away_team.red_players.map((player) => (
                  <div>
                    <span className="d-inline-block" style={{width: "3rem"}}>{player.time}'</span>
                    <span>{player.name}</span>
                  </div>
                ))}
              </Col>
            </Row>
            <Row className="text-end">
              <Col className="mx-5">
                <hr />
              </Col>
              <Col xs={12}>
                <span className="text-muted small">＠ {match.data.stadium_name}</span>
              </Col>
              <Col xs={12}>
                <span className="text-muted small">観客数：{match.data.mobilization}人</span>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="d-block text-center">
            <Row>
              <Col className="px-0"><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="stadium" msg="現地観戦" post_type="1" onClickPost={onClickPost} handleClose={handleClose} /></Col>
              <Col className="px-0"><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="monitor" msg="オンライン" post_type="2" onClickPost={onClickPost} handleClose={handleClose} /></Col>
              <Col className="px-0"><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="pass" msg="観ていない" post_type="3" onClickPost={onClickPost} handleClose={handleClose} /></Col>
              <Col className="px-0"><PostButton match_team_property_id={match.data.match_team_property_id} match_id={match.data.match_id} img_src="forget" msg="忘れた" post_type="4" onClickPost={onClickPost} handleClose={handleClose} /></Col>
            </Row>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  )
}

export default MatchCard;
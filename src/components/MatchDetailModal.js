import {Modal,Row,Col} from "react-bootstrap"
import {ReactComponent as Emblem} from '../emblem.svg';

const MatchDetaliModal = ({match,onHide}) => {
  return (
    <>
    <Modal.Header>
      <Modal.Title>
        <span xs={6} className="small me-3">{match.date}</span>
        <span xs={3} className="small">{match.title} 戦</span>
      </Modal.Title>
      <button type="button" class="btn-close" aria-label="Close" onClick={onHide}></button>
    </Modal.Header>
    <Modal.Body>
      <Row className="justify-content-center text-center">
        <Col className="align-items-end h3">
          <Emblem className="me-1" height="25" width="25" fill={`${match.opponent_color_code}`} style={{verticalAlign: "middle"}} />
          <span style={{verticalAlign: "middle"}}>{match.opponent_name}</span>
          <span className="ms-1" style={{verticalAlign: "middle"}}>戦</span>
        </Col>
      </Row>
      <Row>
        <Col xs={3} />
        <Col xs={6} className="h1">
          <Row>
            <Col xs={5} className="d-flex justify-content-end align-items-center" style={{fontSize: match.is_home ? "3rem": "1.8rem", verticalAlign: "middle"}}>{String(match.home_score)}</Col>
            <Col xs={2} className="d-flex justify-content-center align-items-center" style={{verticalAlign: "middle"}}>-</Col>
            <Col xs={5} className="d-flex justify-content-start align-items-center" style={{fontSize: match.is_home ? "1.8rem" : "3rem", verticalAlign: "middle"}}>{String(match.away_score)}</Col>
          </Row>
        </Col>
        <Col xs={3} />
      </Row>
      {(match.home_team.goal_players.length > 0 || match.away_team.goal_players.length > 0) && (
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
          {match.home_team.goal_players && match.home_team.goal_players.map((player) => (
            <div>
              <span>{player.name}</span>
              <span className="d-inline-block" style={{width: "3rem"}}>{player.time}'</span>
            </div>
          ))}
        </Col>
        <Col className="text-start pe-1">
          {match.away_team.goal_players && match.away_team.goal_players.map((player) => (
            <div>
              <span className="d-inline-block" style={{width: "3rem"}}>{player.time}'</span>
              <span>{player.name}</span>
            </div>
          ))}
        </Col>
      </Row>
      {(match.home_team.red_players.length > 0 || match.away_team.red_players.length > 0) && (
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
          {match.home_team.red_players && match.home_team.red_players.map((player) => (
            <div>
              <span>{player.name}</span>
              <span className="d-inline-block" style={{width: "3rem"}}>{player.time}'</span>
            </div>
          ))}
        </Col>
        <Col className="text-start pe-1">
          {match.away_team.red_players && match.away_team.red_players.map((player) => (
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
          <span className="text-muted small">＠ {match.stadium_name}</span>
        </Col>
        <Col xs={12}>
          <span className="text-muted small">観客数：{match.mobilization}人</span>
        </Col>
      </Row>
    </Modal.Body>
    </>
  )
}
export default MatchDetaliModal;
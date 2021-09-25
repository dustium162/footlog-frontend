import React from "react"
import { Card, Row, Col } from "react-bootstrap"

const OpponentDetail = ({ club_match_result }) => {
  return (
    <>
      <Row className="align-items-end ms-1">
        <Col xs={12} className="text-start" style={{marginBottom: "-2rem"}}>
          <span style={{fontSize: "1.3rem"}}>ホーム＆アウェイ</span>
        </Col>
        <Col xs={7} className="text-end">
          <div>
            <span style={{fontSize: "5rem",Color: "tomato"}} >{club_match_result.win + club_match_result.lose + club_match_result.draw}</span><span>戦</span>
          </div>
          <div style={{marginTop: "-1rem"}}>勝率：<span style={{fontSize: "2rem"}}>{Math.round(parseFloat(club_match_result.win)/(club_match_result.win + club_match_result.lose + club_match_result.draw)*100000)/1000}</span><span style={{fontSize: "0.75rem"}}>%</span></div>
        </Col>
        <Col xs={4} className="text-start" style={{marginLeft: "1.25rem"}}>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{club_match_result.win}</span>勝</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{club_match_result.lose}</span>敗</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{club_match_result.draw}</span>分</div>
        </Col>
      </Row>
      <hr />
      <Row className="align-items-end ms-1">
        <Col xs={12} className="text-start" style={{marginBottom: "-2rem"}}>
          <span style={{fontSize: "1.3rem"}}>ホーム</span>
        </Col>
        <Col xs={7} className="text-end">
          <div>
            <span style={{fontSize: "5rem",Color: "tomato"}} >{club_match_result.detail.home_result.win + club_match_result.detail.home_result.lose + club_match_result.detail.home_result.draw}</span><span>戦</span>
          </div>
          <div style={{marginTop: "-1rem"}}>勝率：<span style={{fontSize: "2rem"}}>{Math.round(parseFloat(club_match_result.detail.home_result.win)/(club_match_result.detail.home_result.win + club_match_result.detail.home_result.lose + club_match_result.detail.home_result.draw)*100000)/1000}</span><span style={{fontSize: "0.75rem"}}>%</span></div>
        </Col>
        <Col xs={4} className="text-start" style={{marginLeft: "1.25rem"}}>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{club_match_result.detail.home_result.win}</span>勝</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{club_match_result.detail.home_result.lose}</span>敗</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{club_match_result.detail.home_result.draw}</span>分</div>
        </Col>
      </Row>
      <hr />
      <Row className="align-items-end ms-1">
        <Col xs={12} className="text-start" style={{marginBottom: "-2rem"}}>
          <span style={{fontSize: "1.3rem"}}>アウェイ</span>
        </Col>
        <Col xs={7} className="text-end">
          <div>
            <span style={{fontSize: "5rem",Color: "tomato"}} >{club_match_result.detail.away_result.win + club_match_result.detail.away_result.lose + club_match_result.detail.away_result.draw}</span><span>戦</span>
          </div>
          <div style={{marginTop: "-1rem"}}>勝率：<span style={{fontSize: "2rem"}}>{Math.round(parseFloat(club_match_result.detail.away_result.win)/(club_match_result.detail.away_result.win + club_match_result.detail.away_result.lose + club_match_result.detail.away_result.draw)*100000)/1000}</span><span style={{fontSize: "0.75rem"}}>%</span></div>
        </Col>
        <Col xs={4} className="text-start" style={{marginLeft: "1.25rem"}}>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{club_match_result.detail.away_result.win}</span>勝</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{club_match_result.detail.away_result.lose}</span>敗</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{club_match_result.detail.away_result.draw}</span>分</div>
        </Col>
      </Row>
    </>
  )
}

export default OpponentDetail;
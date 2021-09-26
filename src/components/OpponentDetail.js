import React from "react"
import { Card, Row, Col } from "react-bootstrap"

const OpponentDetail = ({ clubMatchResultDetail }) => {
  return (
    <>
      <Row className="align-items-end ms-1">
        <Col xs={12} className="text-start" style={{marginBottom: "-2rem"}}>
          <span style={{fontSize: "1.3rem"}}>通算</span>
        </Col>
        <Col xs={7} className="text-end">
          <div>
            <span style={{fontSize: "5rem",Color: "tomato"}} >{clubMatchResultDetail.total.win + clubMatchResultDetail.total.lose + clubMatchResultDetail.total.draw}</span><span>戦</span>
          </div>
          <div style={{marginTop: "-1rem"}}>勝率：<span style={{fontSize: "2rem"}}>{Math.round(parseFloat(clubMatchResultDetail.total.win)/(clubMatchResultDetail.total.win + clubMatchResultDetail.total.lose + clubMatchResultDetail.total.draw)*100000)/1000}</span><span style={{fontSize: "0.75rem"}}>%</span></div>
        </Col>
        <Col xs={4} className="text-start" style={{marginLeft: "1.25rem"}}>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{clubMatchResultDetail.total.win}</span>勝</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{clubMatchResultDetail.total.lose}</span>敗</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{clubMatchResultDetail.total.draw}</span>分</div>
        </Col>
      </Row>
      {clubMatchResultDetail.home.win + clubMatchResultDetail.home.lose + clubMatchResultDetail.home.draw !== 0 &&
      <>
      <hr />
      <Row className="align-items-end ms-1">
        <Col xs={12} className="text-start" style={{marginBottom: "-2rem"}}>
          <span style={{fontSize: "1.3rem"}}>ホーム</span>
        </Col>
        <Col xs={7} className="text-end">
          <div>
            <span style={{fontSize: "5rem",Color: "tomato"}} >{clubMatchResultDetail.home.win + clubMatchResultDetail.home.lose + clubMatchResultDetail.home.draw}</span><span>戦</span>
          </div>
          <div style={{marginTop: "-1rem"}}>勝率：
            <span style={{fontSize: "2rem"}}>
              {clubMatchResultDetail.home.win + clubMatchResultDetail.home.lose + clubMatchResultDetail.home.draw === 0 ? 0: Math.round(parseFloat(clubMatchResultDetail.home.win)/(clubMatchResultDetail.home.win + clubMatchResultDetail.home.lose + clubMatchResultDetail.home.draw)*100000)/1000}
            </span>
            <span style={{fontSize: "0.75rem"}}>%</span>
          </div>
        </Col>
        <Col xs={4} className="text-start" style={{marginLeft: "1.25rem"}}>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{clubMatchResultDetail.home.win}</span>勝</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{clubMatchResultDetail.home.lose}</span>敗</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{clubMatchResultDetail.home.draw}</span>分</div>
        </Col>
      </Row>
      </>
      }
      {clubMatchResultDetail.away.win + clubMatchResultDetail.away.lose + clubMatchResultDetail.away.draw !== 0 &&
      <>
      <hr />
      <Row className="align-items-end ms-1">
        <Col xs={12} className="text-start" style={{marginBottom: "-2rem"}}>
          <span style={{fontSize: "1.3rem"}}>アウェイ</span>
        </Col>
        <Col xs={7} className="text-end">
          <div>
            <span style={{fontSize: "5rem",Color: "tomato"}} >{clubMatchResultDetail.away.win + clubMatchResultDetail.away.lose + clubMatchResultDetail.away.draw}</span><span>戦</span>
          </div>
          <div style={{marginTop: "-1rem"}}>勝率：
            <span style={{fontSize: "2rem"}}>
              {Math.round(parseFloat(clubMatchResultDetail.away.win)/(clubMatchResultDetail.away.win + clubMatchResultDetail.away.lose + clubMatchResultDetail.away.draw)*100000)/1000}
            </span>
            <span style={{fontSize: "0.75rem"}}>%</span>
          </div>
        </Col>
        <Col xs={4} className="text-start" style={{marginLeft: "1.25rem"}}>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{clubMatchResultDetail.away.win}</span>勝</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{clubMatchResultDetail.away.lose}</span>敗</div>
          <div className="pt-2"><span style={{fontSize: "2rem"}}>{clubMatchResultDetail.away.draw}</span>分</div>
        </Col>
      </Row>
      </>
      }
    </>
  )
}

export default OpponentDetail;
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Carousel, Row, Col} from 'react-bootstrap'
import axios from 'axios'
const MatchResults = ({userId}) => {
  const [matchResults,setMatchResults] = useState([])
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}/match-results` ,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    .then(response => response.data)
    .then(data => {
      setMatchResults(data);
    })
  },[userId])
  return (
    <>
      {matchResults.total && (matchResults.total.win + matchResults.total.lose + matchResults.total.draw === 0 ? 
        <div className="my-4 text-center bg-light rounded border py-3">
          まだ現地観戦記録がありません。<br />
          下のボタンから観戦記録を作成しましょう！<br />
          <Link to="/matches" className="btn btn-secondary mt-3">観戦記録を作る</Link>
        </div>
        :
        <>
          <h3 className="h5">現地観戦数</h3>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            slide={true}
            interval={null}
            indicators={false}
            >
            {Object.keys(matchResults).map(type => (
              <Carousel.Item key={type}>
                <Row className="align-items-end ms-1">
                  <Col xs={12} className="text-center" style={{paddingRight: "9rem",marginBottom: "-2rem"}}>
                    <span style={{fontSize: "1.3rem"}}>{matchResults[type]["type"]}通算</span>
                  </Col>
                  <Col xs={7} className="text-end">
                    <div>
                      <span style={{fontSize: "5rem",Color: "tomato"}} >{matchResults[type].win + matchResults[type].lose + matchResults[type].draw}</span><span>戦</span>
                    </div>
                    <div style={{marginTop: "-1rem"}}>勝率：<span style={{fontSize: "2rem"}}>{Math.round(parseFloat(matchResults[type].win)/(matchResults[type].win + matchResults[type].lose + matchResults[type].draw)*100000)/1000}</span><span style={{fontSize: "0.75rem"}}>%</span></div>
                  </Col>
                  <Col xs={4} className="text-start" style={{marginLeft: "1.25rem"}}>
                    <div className="pt-2"><span style={{fontSize: "2rem"}}>{matchResults[type].win}</span>勝</div>
                    <div className="pt-2"><span style={{fontSize: "2rem"}}>{matchResults[type].lose}</span>敗</div>
                    <div className="pt-2"><span style={{fontSize: "2rem"}}>{matchResults[type].draw}</span>分</div>
                  </Col>
                </Row>
              </Carousel.Item>
              )
            )
          }
          </Carousel>
        </>
      )}
    </>
  );
}

export default MatchResults;
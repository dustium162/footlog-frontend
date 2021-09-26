import React, { useState } from "react";
import { Carousel, Row, Col} from "react-bootstrap"

const MatchResults = ({matchResults}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  return (
    <>
      <h3 className="h5">観戦数</h3>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        slide={true}
        interval={null}
        indicators={false}
        >
        {matchResults.map((matchResult,id) => (
          <Carousel.Item key={id}>
            <Row className="align-items-end ms-1">
              <Col xs={12} className="text-center" style={{paddingRight: "9rem",marginBottom: "-2rem"}}>
                <span style={{fontSize: "1.3rem"}}>{matchResult.type}通算</span>
              </Col>
              <Col xs={7} className="text-end">
                <div>
                  <span style={{fontSize: "5rem",Color: "tomato"}} >{matchResult.win + matchResult.lose + matchResult.draw}</span><span>戦</span>
                </div>
                <div style={{marginTop: "-1rem"}}>勝率：<span style={{fontSize: "2rem"}}>{Math.round(parseFloat(matchResult.win)/(matchResult.win + matchResult.lose + matchResult.draw)*100000)/1000}</span><span style={{fontSize: "0.75rem"}}>%</span></div>
              </Col>
              <Col xs={4} className="text-start" style={{marginLeft: "1.25rem"}}>
                <div className="pt-2"><span style={{fontSize: "2rem"}}>{matchResult.win}</span>勝</div>
                <div className="pt-2"><span style={{fontSize: "2rem"}}>{matchResult.lose}</span>敗</div>
                <div className="pt-2"><span style={{fontSize: "2rem"}}>{matchResult.draw}</span>分</div>
              </Col>
            </Row>
          </Carousel.Item>
          )
        )
      }
      </Carousel>
    </>
  );
}

export default MatchResults;
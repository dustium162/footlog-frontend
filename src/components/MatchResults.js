import React, { useState } from "react";
import { Carousel, Row, Col} from "react-bootstrap"

const match_results = [
  {
    "id"  : 1,
    "type" : "",
    "win" : 112,
    "lose" : 82,
    "draw" : 43,
  },
  {
    "id"  : 2,
    "type" : "ホーム",
    "win" : 88,
    "lose" : 60,
    "draw" : 32,
  },
  {
    "id"  : 3,
    "type" : "アウェイ",
    "win" : 20,
    "lose" : 17,
    "draw" : 12,
  }
]

const MatchResults = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  }

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      slide={true}
      interval={null}
      indicators={true}
      >
      {match_results.map(match_result => (
        <Carousel.Item key={match_result.id}>
          <p>{match_result.type}通算</p>
          <Row>
            <Col>
              <div><span style={{fontSize: "84px",Color: "tomato"}} >{match_result.win + match_result.lose + match_result.draw}</span>戦</div>
            </Col>
            <Col>
              <div><span style={{fontSize: "24px"}} >{match_result.win}</span>勝</div>
              <div><span style={{fontSize: "24px"}} >{match_result.lose}</span>敗</div>
              <div><span style={{fontSize: "24px"}} >{match_result.draw}</span>分</div>
            </Col>
          </Row>
        </Carousel.Item>)
      )
    }
    </Carousel>
  );
}

export default MatchResults;
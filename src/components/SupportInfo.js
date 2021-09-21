import React from "react";

import {Container,Image,Row,Col} from "react-bootstrap"
import WatchHeatMap from "./WatchHeatMap";

const SupportInfo = ({support_info}) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Image className="emblem" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
          <h6>{`応援しているチーム：${support_info.team_name}`}</h6>
        </Col>
        <Col>
          <Row><h6>{`${support_info.win}勝${support_info.lose}敗${support_info.draw}分`}</h6></Row>
          <Row><h6>{`初観戦:${support_info.first_match}`}</h6></Row>
          <Row><h6>{`最近の観戦:${support_info.latest_match}`}</h6></Row>
        </Col>
      </Row>
      <WatchHeatMap />
    </Container>
  );
}
export default SupportInfo;
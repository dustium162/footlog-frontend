import React, {useState} from "react"

import {Row,Col,Card,Modal} from "react-bootstrap"
import PostButton from "./PostButton";
import MatchInfo from "./MatchInfo"

const MatchCard = ({match,onClickPost}) => {
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div style={{height: `${match.style.height}px`,overflow:'hidden'}}>
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
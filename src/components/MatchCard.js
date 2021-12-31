import React from 'react'

import {Row,Col,Card} from 'react-bootstrap'
import PostButton from './PostButton';
import MatchInfo from './MatchInfo'

const MatchCard = ({match,onClickPost}) => {
  return (
    <div style={{height: `${match.style.height}px`,overflow:'hidden'}}>
      <Card>
        <MatchInfo match={match.data}/>
        <Card.Footer>
          <Row className="text-center">
            <Col><PostButton matchTeamPropertyId={match.data.match_team_property_id} matchId={match.data.match_id} msg="現地観戦" postType={1} onClickPost={onClickPost}/></Col>
            <Col><PostButton matchTeamPropertyId={match.data.match_team_property_id} matchId={match.data.match_id} msg="オンライン" postType={2} onClickPost={onClickPost}/></Col>
            <Col><PostButton matchTeamPropertyId={match.data.match_team_property_id} matchId={match.data.match_id} msg="観ていない" postType={3} onClickPost={onClickPost}/></Col>
            <Col><PostButton matchTeamPropertyId={match.data.match_team_property_id} matchId={match.data.match_id} msg="忘れた" postType={4} onClickPost={onClickPost}/></Col>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default MatchCard;
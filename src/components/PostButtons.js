import React from "react"

import {Row,Col} from "react-bootstrap"

import Stadium from "./buttons/Stadium"
import Online from "./buttons/Online"
import Omit from "./buttons/Omit"

const PostButtons = (match_id) => {
  return (
      <Row>
        {/* {match_id.match_id} */}
        <Col><Omit match_id={match_id}/></Col>
        <Col><Online match_id={match_id}/></Col>
        <Col><Stadium match_id={match_id}/></Col>
       </Row>
  )
}

export default PostButtons;
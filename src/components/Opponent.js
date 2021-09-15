import React, { useState } from "react"
import { Card, Container, Modal } from "react-bootstrap"
import OpponentDetail from "./OpponentDetail";

const Opponent = ({ club_match_result }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Card style={{ width: '18rem' }} variant="link text-secondary button_link" onClick={handleShow} show={show}>
        <Card.Header>
          {club_match_result.opponent_name}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            勝利数:{club_match_result.win}
          </Card.Text>
          <Card.Text>
            敗戦数:{club_match_result.lose}
          </Card.Text>
          <Card.Text>
            引き分け数:{club_match_result.draw}
          </Card.Text>
          <Card.Text>
            総試合数:{club_match_result.total_match_num}
          </Card.Text>
          <Card.Text>
            勝率:{club_match_result.winning_rate}
          </Card.Text>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <OpponentDetail club_match_result={club_match_result} />
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default Opponent;
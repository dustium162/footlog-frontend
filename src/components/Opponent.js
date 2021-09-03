import React, { useState } from "react"
import { Row, Card, Container, Col } from "react-bootstrap"

const Opponent = ({ club_match_result }) => {
    return (       
                <Col>
                    <Card style={{ width: '18rem' }}>
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
                </Col>
    )
}

export default Opponent;
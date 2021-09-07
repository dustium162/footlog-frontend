import React from "react"
import { Card, Row } from "react-bootstrap"

const OpponentDetail = ({ club_match_result }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>
                {club_match_result.opponent_name}
            </Card.Header>
            <Card.Body>
                <Row>
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
                </Row>
                <Row>
                    <h6>ホーム</h6>
                    <Card.Text>
                        勝利数:{club_match_result.detail.home_result.win}
                    </Card.Text>
                    <Card.Text>
                        敗戦数:{club_match_result.detail.home_result.lose}
                    </Card.Text>
                    <Card.Text>
                        引き分け数:{club_match_result.detail.home_result.draw}
                    </Card.Text>
                    <Card.Text>
                        総試合数:{club_match_result.detail.home_result.total_match_num}
                    </Card.Text>
                    <Card.Text>
                        勝率:{club_match_result.detail.home_result.winning_rate}
                    </Card.Text>
                    <Card.Text>
                        不敗率:{club_match_result.detail.home_result.invincibility_rate}
                    </Card.Text>
                </Row>
                {/* <Row>
                    <h5>アウェイ</h5>
                    <Card.Text>
                        勝利数:{club_match_result.detail.away_result.win}
                    </Card.Text>
                    <Card.Text>
                        敗戦数:{club_match_result.detail.away_result.lose}
                    </Card.Text>
                    <Card.Text>
                        引き分け数:{club_match_result.detail.away_result.draw}
                    </Card.Text>
                    <Card.Text>
                        総試合数:{club_match_result.detail.away_result.total_match_num}
                    </Card.Text>
                    <Card.Text>
                        勝率:{club_match_result.detail.away_result.winning_rate}
                    </Card.Text>
                    <Card.Text>
                        不敗率:{club_match_result.detail.away_result.invincibility_rate}
                    </Card.Text>
                </Row> */}
            </Card.Body>
        </Card>
    )
}

export default OpponentDetail;
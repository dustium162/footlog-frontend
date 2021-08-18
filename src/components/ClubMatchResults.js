import {Row,Col,Image, Card} from "react-bootstrap"

const club_match_results = [
  {
    club_id: 1,
    opponent_name: "鹿島アントラーズ",
    win: 99,
    lose: 0,
    draw: 1,
  },
  {
    club_id: 2,
    opponent_name: "ガンバ大阪",
    win: 49,
    lose: 49,
    draw: 10,
  },
]

const ClubMatchResults = () => {
  return (
    <Row xs={1} md={2} className="g-4">
      {club_match_results.map(club_match_result => (
        <Col key={club_match_result.club_id}>
          <Image className="emblem" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
          {club_match_result.opponent_name}：{club_match_result.win}勝{club_match_result.lose}敗{club_match_result.draw}分
        </Col>
      ))}
    </Row>
  )
}

const ClubMatchResultsCards = () => {
  return (
    <Row>
    {club_match_results.map(club_match_result => (
      <Card style={{ width: '18rem' }}>
        <Card.Header>
          {club_match_result.opponent_name}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Win:{club_match_result.win}
          </Card.Text>
          <Card.Text>
            Lose:{club_match_result.lose}
          </Card.Text>
          <Card.Text>
            Draw:{club_match_result.draw}
          </Card.Text>
        </Card.Body>
      </Card>
    ))}
    </Row>)}

export default ClubMatchResultsCards;
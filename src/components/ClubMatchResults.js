import {Row,Col,Image} from "react-bootstrap"
const club_match_results = [
  {
    opponent_name: "鹿島アントラーズ",
    win: 99,
    lose: 0,
    draw: 1,
  },
  {
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
        <Col>
          <Image className="emblem" src={`${process.env.PUBLIC_URL}/my_page_header.jpeg`} roundedCircle />
          {club_match_result.opponent_name}：{club_match_result.win}勝{club_match_result.lose}敗{club_match_result.draw}分
        </Col>
      ))}
    </Row>
  )
}
export default ClubMatchResults;
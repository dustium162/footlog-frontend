import {Row,Col,Image} from "react-bootstrap"
const club_match_results = [
  {
    club_id: 1,
    opponent_name: "鹿島アントラーズ",
    win: 99,
    lose: 0,
    draw: 1,
    total_match_num : 100,
    winning_rate: 99.0,
    invincibility_rate: 100.0,
    detail : {
      home_result: {
        win: 33,
        lose: 0,
        draw: 1,
        winning_rate: 97.05,
        invincibility_rate: 100.0,
      },
      away_result : {
        win: 33,
        lose: 0,
        draw: 0,
        winning_rate: 100.0,
        invincibility_rate: 100.0,
      },
      neutral_result: {
        win: 33,
        lose: 0,
        draw: 0,
        winning_rate: 100.0,
        invincibility_rate: 100.0,
      }
    }
  },
  {
    club_id: 2,
    opponent_name: "ガンバ大阪",
    win: 49,
    lose: 49,
    draw: 10,
    total_match_num : 108,
    winning_rate: 45.37,
    invincibility_rate: 54.62,
    detail : {
      home_result: {
        win: 49,
        lose: 0,
        draw: 1,
        winning_rate: 98.0,
        invincibility_rate: 100.0,
      },
      away_result : {
        win: 0,
        lose: 49,
        draw: 1,
        winning_rate: 0.0,
        invincibility_rate: 2.0,
      },
      neutral_result: {
        win: 0,
        lose: 0,
        draw: 8,
        winning_rate: 0.0,
        invincibility_rate: 100.0,
      }
    }
  },
  {
    club_id: 3,
    opponent_name: "北海道コンサドーレ札幌",
    win: 2,
    lose: 1,
    draw: 2,
    total_match_num : 5,
    winning_rate: 40.0,
    invincibility_rate: 60.0,
    detail : {
      home_result: {
        win: 1,
        lose: 0,
        draw: 2,
        winning_rate: 33.33,
        invincibility_rate: 33.33,
      },
      away_result : {
        win: 1,
        lose: 1,
        draw: 0,
        winning_rate: 50.0,
        invincibility_rate: 50.0,
      },
    }
  },
  {
    club_id: 4,
    opponent_name: "柏レイソル",
    win: 3,
    lose: 0,
    draw: 0,
    total_match_num : 3,
    winning_rate: 100.0,
    invincibility_rate: 100.0,
    detail : {
      home_result: {
        win: 3,
        lose: 0,
        draw: 0,
        winning_rate: 100.0,
        invincibility_rate: 100.0,
      },
    }
  },
  {
    club_id: 5,
    opponent_name: "サガン鳥栖",
    win: 2,
    lose: 8,
    draw: 0,
    total_match_num : 10,
    winning_rate: 20.0,
    invincibility_rate: 20.0,
    detail : {
      home_result: {
        win: 2,
        lose: 2,
        draw: 0,
        winning_rate: 50.0,
        invincibility_rate: 50.0,
      },
      away_result : {
        win: 0,
        lose: 5,
        draw: 0,
        winning_rate: 0.0,
        invincibility_rate: 0.0,
      },
      neutral_result: {
        win: 0,
        lose: 3,
        draw: 0,
        winning_rate: 0.0,
        invincibility_rate: 0.0,
      }
    }
  },
  {
    club_id: 6,
    opponent_name: "上海上港",
    win: 1,
    lose: 1,
    draw: 2,
    total_match_num : 4,
    winning_rate: 25.0,
    invincibility_rate: 75.0,
    detail : {
      home_result: {
        win: 1,
        lose: 0,
        draw: 1,
        winning_rate: 50.0,
        invincibility_rate: 100.0,
      },
      away_result : {
        win: 0,
        lose: 1,
        draw: 1,
        winning_rate: 0.0,
        invincibility_rate: 50.0,
      },
    }
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
export default ClubMatchResults;
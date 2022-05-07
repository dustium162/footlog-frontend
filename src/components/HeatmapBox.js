import React,{ useState } from 'react';
import axios from 'axios';
import { Modal, Row, Col } from 'react-bootstrap';
import PostButton from './PostButton';
import PostEditButton from './PostEditButton';
import {ReactComponent as Emblem} from '../images/emblem.svg';
import {ReactComponent as Onsite} from '../images/onsite.svg';
import {ReactComponent as Online} from '../images/online.svg';
import {ReactComponent as NotWatching} from '../images/notwatching.svg';
import {ReactComponent as Forget} from '../images/forget.svg';

const HeatmapBox = ({post, teamColor}) => {
  const [modalShow,setModalShow] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const [postType,setPostType] = useState(post.post_type);

  // ヒートマップの一つの箱の押下時に発火する関数
  // match_idをキーに試合の詳細情報を取得する
  const handleModalShow = () => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/matches/${post.match_id}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    }).then((res) => {
      if (res.status === 200) {
        setPostDetail(res.data);
      }
    })
    setModalShow(true);
  }

  const handleModalClose = () => setModalShow(false);

  // postType変更時に発火する関数
  const handleEditClose = (postType) => {
    setModalShow(false);
    setPostType(postType);
  }

  // 新規投稿時に発火する関数
  const onClickPost = (postType) => {
    setModalShow(false);
    setPostType(postType);
  }

  // postTypeに応じて、表示するヒートマップの箱の色を設定する関数
  const colorStyle = (postType, teamColor) => {
    if(postType === 1 || postType === 2) {
      return teamColor;
    } else if(postType === 3) {
      return '#CCCCCC';
    } else {
      return '#FFFFFF';
    }
  }

  // postTypeに応じて、表示するヒートマップの箱の透過度を設定する関数
  const colorOpacity = (postType) => {
    if(postType === 2) {
      return '0.3';
    } else {
      return '1';
    }
  }

  // postTypeに応じて、表示するアイコンを変更するための関数
    const postTypeIcon = (postType) => {
    if (postType === 1) {
      return (
        <>
          <Onsite fill="#696969" style={{width: "40",height: "40"}}/>
          <span className="d-block" style={{fontSize: "0.8rem"}}>現地観戦</span>
        </>
      )
    } else if (postType === 2) {
      return (
        <>
          <Online fill="#696969" style={{width: "40",height: "40"}}/>
          <span className="d-block" style={{fontSize: "0.7rem"}}>オンライン</span>
        </>
      )
    } else if (postType === 3) {
      return (
        <>
          <NotWatching fill="#696969" style={{width: "40",height: "40"}}/>
          <span className="d-block" style={{fontSize: "0.7rem"}}>観ていない</span>
        </>
      )
    } else if (postType === 4) {
      return (
        <>
          <Forget fill="#696969" style={{width: "40",height: "40"}}/>
          <span className="d-block" style={{fontSize: "0.8rem"}}>忘れた</span>
        </>
      )
    } else {
      return (
        <>
          未投稿
        </>
      )
    }
  }

  return (
    <>
      <div className="border rounded heatmap-cell" style={{background: `${colorStyle(postType, teamColor)}`, opacity: `${colorOpacity(postType)}`}} onClick={handleModalShow} />
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>
            {postType === 0 ?
              "新規投稿"
              :
              "投稿の編集"
            }
          </Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
        </Modal.Header>
        <Modal.Body className="px-0 py-0">
          {postDetail !== {} ?
            <>
              <div className="border-bottom py-3">
                <Row>
                  <Col xs={3} className="d-flex justify-content-center align-items-center">{postDetail.home_or_away_or_neutral}</Col>
                  <Col xs={6} className="d-flex justify-content-center align-items-center small">{postDetail.date_time}</Col>
                  <Col xs={3} className="d-flex justify-content-center align-items-center small">{postDetail.title}</Col>
                </Row>
              </div>
              <div className="text-center px-3 pt-3">
                <Row className="justify-content-center">
                  <Col className="align-items-end">
                    <Emblem className="me-1" height="25" width="25" fill={`${postDetail.opponent_color_code}`} style={{verticalAlign: "middle"}} stroke="gray" strokeWidth="10"/>
                    <span style={{verticalAlign: "middle"}}>{postDetail.opponent_name}</span>
                    <span className="ms-1" style={{verticalAlign: "middle"}}>戦</span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={3} >{postTypeIcon(postType)}</Col>
                  <Col xs={6} className="h1">
                    <Row>
                      <Col xs={5} className="d-flex justify-content-end align-items-center" style={{fontSize: postDetail.is_home ? "3rem": "1.8rem", verticalAlign: "middle"}}>{String(postDetail.home_score)}</Col>
                      <Col xs={2} className="d-flex justify-content-center align-items-center" style={{verticalAlign: "middle"}}>-</Col>
                      <Col xs={5} className="d-flex justify-content-start align-items-center" style={{fontSize: postDetail.is_home ? "1.8rem" : "3rem", verticalAlign: "middle"}}>{String(postDetail.away_score)}</Col>
                    </Row>
                  </Col>
                  <Col xs={3}/>
                </Row>
                {(postDetail.home_team) && (postDetail.home_team.goal_players) && (postDetail.home_team.goal_players.length > 0 || postDetail.away_team.goal_players.length > 0) && (
                  <>
                    <div className="mx-5">
                      <hr />
                    </div>
                    <div className="text-center h5 text-secondary">
                      得点者
                    </div>
                    <Row className="text-secondary" style={{fontSize: "0.75rem"}}>
                      <Col className="text-start px-3" style={{height: "70px", overflow:"auto"}}>
                        {postDetail.home_team.goal_players && postDetail.home_team.goal_players.map((player, index) => (
                          <div key={index}>
                            <span>{player.name} ({player.time}')</span>
                          </div>
                        ))}
                      </Col>
                      <Col className="text-start ps-1" style={{height: "70px", overflow:"auto"}}>
                        {postDetail.away_team.goal_players && postDetail.away_team.goal_players.map((player, index) => (
                          <div key={index}>
                            <span>{player.name} ({player.time}')</span>
                          </div>
                        ))}
                      </Col>
                    </Row>
                  </>
                )}
                {(postDetail.home_team) && (postDetail.home_team.red_players) && (postDetail.home_team.red_players.length > 0 || postDetail.away_team.red_players.length > 0) && (
                  <>
                    <div className="mx-5">
                      <hr />
                    </div>
                    <div className="text-center h5 text-secondary mt-3">
                      退場者
                    </div>
                    <Row className="text-secondary" style={{fontSize: "0.75rem"}}>
                      <Col className="text-start px-3" style={{height: "30px", overflow:"auto"}}>
                        {postDetail.home_team.red_players && postDetail.home_team.red_players.map((player, index) => (
                          <div key={index}>
                            <span>{player.name} ({player.time}')</span>
                          </div>
                        ))}
                      </Col>
                      <Col className="text-start pe-1" style={{height: "30px", overflow:"auto"}}>
                        {postDetail.away_team.red_players && postDetail.away_team.red_players.map((player, index) => (
                          <div key={index}>
                            <span>{player.name} ({player.time}')</span>
                          </div>
                        ))}
                      </Col>
                    </Row>
                  </>
                )}
                <Row className="text-end">
                  <Col className="mx-5">
                    <hr />
                  </Col>
                  <Col xs={12}>
                    <span className="text-muted small">＠ {postDetail.stadium_name}</span>
                  </Col>
                  <Col xs={12}>
                    <span className="text-muted small">観客数：{postDetail.mobilization}人</span>
                  </Col>
                </Row>

                <Row className="text-center bg-light border-top mt-3 py-3">
                  {postType === 0 ?
                    <>
                      <Col><PostButton matchTeamPropertyId={post.match_team_property_id} matchId={post.match_id} msg="現地観戦" postType={1} onClickPost={() => onClickPost(1)}/></Col>
                      <Col><PostButton matchTeamPropertyId={post.match_team_property_id} matchId={post.match_id} msg="オンライン" postType={2} onClickPost={() => onClickPost(2)}/></Col>
                      <Col><PostButton matchTeamPropertyId={post.match_team_property_id} matchId={post.match_id} msg="観ていない" postType={3} onClickPost={() => onClickPost(3)}/></Col>
                      <Col><PostButton matchTeamPropertyId={post.match_team_property_id} matchId={post.match_id} msg="忘れた" postType={4} onClickPost={() => onClickPost(4)}/></Col>
                    </>
                    :
                    <>
                      <Col><PostEditButton postId ={post.post_id} msg="現地観戦" postType={1} setPostType={setPostType} handleEditClose={handleEditClose} isSelected={postType === 1 ? true : false} color={postDetail.color_code} isTextBlack={postDetail.is_text_black}/></Col>
                      <Col><PostEditButton postId ={post.post_id} msg="オンライン" postType={2} setPostType={setPostType} handleEditClose={handleEditClose} isSelected={postType === 2 ? true : false} color={postDetail.color_code} isTextBlack={postDetail.is_text_black}/></Col>
                      <Col><PostEditButton postId ={post.post_id} msg="観ていない" postType={3} setPostType={setPostType} handleEditClose={handleEditClose} isSelected={postType === 3 ? true : false} color={postDetail.color_code} isTextBlack={postDetail.is_text_black}/></Col>
                      <Col><PostEditButton postId ={post.post_id} msg="忘れた" postType={4} setPostType={setPostType} handleEditClose={handleEditClose} isSelected={postType === 4 ? true : false} color={postDetail.color_code} isTextBlack={postDetail.is_text_black}/></Col>
                    </>
                  }
                </Row>
              </div>
            </>
            :
            <></>
          }
        </Modal.Body>
      </Modal>
    </>
  );
}
export default HeatmapBox;
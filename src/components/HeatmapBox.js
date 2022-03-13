import React,{ useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Modal, Row, Col } from 'react-bootstrap';
import MatchInfo from './MatchInfo';
import PostEditButton from './PostEditButton';

const HeatmapBox = ({post, color, opacity}) => {
  const [modalShow,setModalShow] = useState(false);
  const [postDetail, setPostDetail] = useState({});
  const [postType,setPostType] = useState(post.post_type)

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

  const handleEditClose = (postType) => {
    setPostType(postType);
    setModalShow(false);
  }

  console.log(postDetail)

  return (
    <>
      <div className="border rounded heatmap-cell" style={{background: `${color}`, opacity: `${opacity}`}} onClick={handleModalShow} />
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>投稿の編集</Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
        </Modal.Header>
        <Modal.Body className="px-0 py-0">
          {postDetail !== {} ?
            <>
              <MatchInfo match={postDetail} postType={post.post_type} />
              <Row className="text-center">
                <Col className="px-0"><PostEditButton postId ={post.id} msg="現地観戦" postType={1} setPostType={setPostType} handleEditClose={handleEditClose} isSelected={postType === 1 ? true : false} color={postDetail.color_code} isTextBlack={postDetail.is_text_black}/></Col>
                <Col className="px-0"><PostEditButton postId ={post.id} msg="オンライン" postType={2} setPostType={setPostType} handleEditClose={handleEditClose} isSelected={postType === 2 ? true : false} color={postDetail.color_code} isTextBlack={postDetail.is_text_black}/></Col>
                <Col className="px-0"><PostEditButton postId ={post.id} msg="観ていない" postType={3} setPostType={setPostType} handleEditClose={handleEditClose} isSelected={postType === 3 ? true : false} color={postDetail.color_code} isTextBlack={postDetail.is_text_black}/></Col>
                <Col className="px-0"><PostEditButton postId ={post.id} msg="忘れた" postType={4} setPostType={setPostType} handleEditClose={handleEditClose} isSelected={postType === 4 ? true : false} color={postDetail.color_code} isTextBlack={postDetail.is_text_black}/></Col>
              </Row>
            </>
            :
            ''
          }
        </Modal.Body>
      </Modal>
    </>
  );
}
export default HeatmapBox;
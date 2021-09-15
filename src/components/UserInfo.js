import { Link } from 'react-router-dom';
import React,{useState,useEffect} from "react";

import {Container,Image,Row,Col,Button} from "react-bootstrap";

import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import HeaderIcon from '../header-icon-sample.jpg';
import icon from "../icon-sample.jpeg";

const UserInfo = ({user}) => {
  const [image,setImage] = useState("")
  const [name,setName] = useState("")
  const [header_image,setHeaderImage] = useState("")
  const [biography,setBiography] = useState("")

  useEffect(() => {
    setImage(user.image)
    setName(user.name)
    setHeaderImage(user.header_image)
    setBiography(user.biography)
  })
  return (

    <>
      <div className="text-center" style={{backgroundImage: `url(${HeaderIcon}`, height: "200px", maxWidth: "100%", backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover"}}>
        <Image className="user-icon border border-white border-2" src={icon} style={{marginTop: "5.75rem"}} roundedCircle />
      </div>
      <div className="mt-4 text-center">
        <div class="h4">{name}</div>
      </div>
      <div className="text-end pe-4" style={{marginTop: "-2.5rem", marginBottom: "2.5rem"}}>
        <Link to="/user/edit" className="btn btn-secondary rounded-circle py-2 px-2" width="40" height="40" style={{width: "42px"}}>
          <FontAwesomeIcon className="fa-fw text-white" icon={faCog}></FontAwesomeIcon>
        </Link>
      </div>
      {/* <Row className="nx-0 px-0">
        <Container className="icon_and_name">
          <Row><Image className="my_icon" src={`${process.env.PUBLIC_URL}/${image}`} roundedCircle /></Row>
          <Row><h5>{name}</h5></Row>
        </Container>
        <Row><Image className="my_header" src={`${process.env.PUBLIC_URL}/${header_image}`} fluid/></Row>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col><Link to="/user/edit" className="btn btn-right btn btn-outline-secondary">プロフィール編集</Link></Col>
        </Row>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          {
            biography.split('\n').map((str, index) => (
              <React.Fragment key={index}>{str}<br /></React.Fragment>
            ))
          }
        </Col>
      </Row> */}
    </>
  );
}
export default UserInfo;
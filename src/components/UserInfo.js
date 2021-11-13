import { Link } from 'react-router-dom';
import React,{useState,useEffect} from "react";

import {Container,Image} from "react-bootstrap";

import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TeamLabel from "./TeamLabel"

const UserInfo = ({user,team,support_info}) => {
  const [image,setImage] = useState("")
  const [name,setName] = useState("")
  const [headerImage,setHeaderImage] = useState("")
  const [biography,setBiography] = useState("")

  useEffect(() => {
    setImage(user.image)
    setName(user.name)
    setHeaderImage(user.header_image)
    setBiography(user.biography)
  },[])
  return (
    <>
      <div style={{backgroundImage: `url(${headerImage ? headerImage : `${process.env.PUBLIC_URL}/default-header-image2.jpg`}`, width: "100%", backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover", color:"black"}}>
        <div style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
          <div style={{paddingTop: "calc(450 / 1000 * 50%)",paddingBottom: "calc(450 / 1000 * 50%)"}}>
          </div>

        </div>
      </div>
      <div className="text-center">
        <Image className="user-icon border border-white border-2" src={image ? image : `${process.env.PUBLIC_URL}/default-user-image.png`} style={{marginTop: "-5.5rem"}} roundedCircle />
      </div>
      {/* <div style={{backgroundImage: `url(${headerImage ? headerImage : `${process.env.PUBLIC_URL}/default-header-image2.jpg`}`, width: "100%", backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover"}}>
        <div className="text-center py-2" style={{height: "100%", width:"100%"}}>
          <Image className="user-icon border border-white border-2" src={image ? image : `${process.env.PUBLIC_URL}/default-user-image.png`} style={{marginTop: "6.5rem"}} roundedCircle />
        </div>
      </div> */}
      {/* <div className="text-center" style={{backgroundImage: `url(${headerImage ? headerImage : `${process.env.PUBLIC_URL}/default-header-image2.jpg`}`, height: "200px", maxWidth: "100%", backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover"}}>
        <Image className="user-icon border border-white border-2" src={image ? image : `${process.env.PUBLIC_URL}/default-user-image.png`} style={{marginTop: "6.5rem"}} roundedCircle />
      </div> */}
      <Container style={{marginTop: "-2.5rem"}}>
        <div className="text-center" style={{marginTop: "2.5rem"}}>
          <div class="h4">{name}</div>
        </div>
        <div className="text-end pe-2" style={{marginTop: "-2.75rem", marginBottom: "2.75rem"}}>
          <Link to="/user/edit" className="btn btn-secondary rounded-pill py-2 px-2">
            <span style={{marginLeft:"2px", marginRight:"2px"}}>
              <FontAwesomeIcon className="fa-fw text-white" icon={faUserCog}></FontAwesomeIcon>
            </span>
            <span className="d-none d-md-inline small">ユーザー情報を編集する</span>
          </Link>
        </div>
        <div className="text-start" style={{marginTop: "-6.5rem", marginBottom: "6.5rem"}}>
          <TeamLabel team={team} />
        </div>
        { user.biography &&
        <div className="border rounded rounded-3 bg-light mb-5 px-3 py-1">
          <div>
            {
              user.biography.split('\n').map((str, index) => (
                <React.Fragment key={index}>{str}<br /></React.Fragment>
                ))
            }
          </div>
        </div>
        }
        {/* {support_info.first_match &&
          <>
            <h6>{`初観戦:${support_info.first_match}`}</h6>
            <h6>{`最近の観戦:${support_info.latest_match}`}</h6>
          </>
        } */}
      </Container>
    </>
  );
}
export default UserInfo;
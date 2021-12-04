import { Link } from 'react-router-dom';
import React,{useState,useEffect} from "react";
import {Container,Image} from "react-bootstrap";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TeamLabel from "./TeamLabel"
import axios from "axios"

const UserInfo = () => {
  const userId = JSON.parse(localStorage.getItem('currentUser')).id
  const [image,setImage] = useState("")
  const [name,setName] = useState("")
  const [headerImage,setHeaderImage] = useState("")
  const [team,setTeam] = useState({})
  const [biography,setBiography] = useState("")

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}` ,{
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    .then(response => response.data)
    .then(data => {
      setImage(data.user.image)
      setName(data.user.name)
      setHeaderImage(data.user.header_image)
      setBiography(data.user.biography)
      setTeam(data.team)
    })
  },[])
  return (
    <>
      <div style={{backgroundImage: `url(${headerImage}`, width: "100%", backgroundSize: "cover", backgroundPosition: "center", objectFit: "cover", color:"black"}}>
        <div style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
          <div style={{paddingTop: "calc(450 / 1000 * 50%)",paddingBottom: "calc(450 / 1000 * 50%)"}}>
          </div>

        </div>
      </div>
      <div className="text-center">
        <Image className="user-icon border border-white border-2" src={image} style={{marginTop: "-5.5rem"}} roundedCircle />
      </div>
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
        {Object.keys(team).length !== 0 &&
          <div className="text-start" style={{marginTop: "-6.5rem", marginBottom: "6.5rem"}}>
            <TeamLabel team={team} />
          </div>
        }
        { biography &&
        <div className="border rounded rounded-3 bg-light mb-5 px-3 py-1">
          <div>
            {
              biography.split('\n').map((str, index) => (
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